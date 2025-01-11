const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');
const Inventory = require('./model/vechileModel');
const { getDateRange } = require('./utils/dateRange');
const { calculateMSRP } = require('./utils/msrpCalculation');
const { log } = require('console');
const { calculateMonthlyCount } = require('./utils/calculateMontlycount');
const { calculateMonthlyAverageMsrp } = require('./utils/calculateaAvgmsrp');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(cors({
  origin: "https://admin-panel-vechile-lw24.vercel.app", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  credentials: true // Allow credentials if needed
}));

// Connect to MongoDB 
mongoose.connect('mongodb+srv://jishnutp:qwerty123@cluster0.dzwng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


/// for inser data int ot database with csv file

// fs.createReadStream('./sample-data-v2.csv')
//   .pipe(csv())
//   .on('data', async (row) => {
//     try {
//       const inventoryData = new Inventory({
//         condition: row.condition,
//         description: row.description,
//         title: row.title,
//         brand: row.brand,
//         price: parseFloat(row.price.replace('USD', '').trim()),
//         product_type: row.product_type,
//         custom_label_0: row.custom_label_0,
//         timestamp: new Date(row.timestamp),
//       });

//       await inventoryData.save();
   
//     } catch (err) {
//       console.error('Error saving inventory data:', err);
//     }
//   })
//   .on('end', () => {
//     console.log('CSV file processing completed.');
//   });



// API endpoints
app.get('/api/inventory', async (req, res) => {

    const{timeStamp,brand}= req.query
    const { startDate, endDate } = getDateRange(timeStamp);

    let query = {};

  if (brand) query.brand = brand;
  if (startDate && endDate) {
    query.timestamp = {
      $gte: startDate,  // Greater than or equal to startDate
      $lte: endDate,    // Less than or equal to endDate
    };
  }   
  try {
    const inventoryData = await Inventory.find(query);
    const msrp= calculateMSRP(inventoryData)
    const monthlyData = calculateMonthlyCount(inventoryData);
    const monthmsrp=calculateMonthlyAverageMsrp(inventoryData) 
    res.json({inventoryData,msrp,monthdata:{monthlyData},monthmsrp:{monthmsrp}});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching inventory data' });
  }
});



app.get('/api/tabledata', async (req, res) => {
    try {
      const inventoryData = await Inventory.find();
      const processedData = inventoryData.reduce((acc, item) => {
        const date = new Date(item.timestamp).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { new: [], used: [], cpo: [] };
        }
        acc[date][item.condition]?.push(item.price); 
        return acc;
      }, {});
      const responseData = Object.keys(processedData).map((date) => {
        const newPrices = processedData[date].new;
        const usedPrices = processedData[date].used;
        const cpoPrices = processedData[date].cpo;
  
        const calculateMetrics = (prices) => ({
          count: prices.length,
          totalMSRP: prices.reduce((sum, price) => sum + price, 0),
          avgMSRP: prices.length > 0 ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length) : 0,
        });
  
        return {
          date,
          new: calculateMetrics(newPrices),
          used: calculateMetrics(usedPrices),
          cpo: calculateMetrics(cpoPrices),
        };
      });
      
      
      res.json(responseData); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching inventory data' });
    }
  });
  


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});