const calculateMonthlyAverageMsrp = (data) => {
    const groupByMonthAndCalculateAverage = (data) => {
        const result = {};
    
        data.forEach((item) => {
          // Extract the month in the format "YYYY-MM"
          const month = new Date(item.timestamp).toISOString().slice(0, 7); // "2024-08"
          const condition = item.condition; // "new", "used", or "cpo"
          const price = item.price; // Extract the price
    
          // Initialize the month and condition structure if not already present
          if (!result[month]) {
            result[month] = {
              new: { totalPrice: 0, count: 0 },
              used: { totalPrice: 0, count: 0 },
              cpo: { totalPrice: 0, count: 0 },
            };
          }
    
          // Update the total price and count for the condition
          if (result[month][condition] !== undefined) {
            result[month][condition].totalPrice += price;
            result[month][condition].count += 1;
          }
        });
    
        // Calculate the average price for each condition and month
        const averages = {};
        Object.keys(result).forEach((month) => {
          averages[month] = {
            new:
              result[month].new.count > 0
                ? result[month].new.totalPrice / result[month].new.count
                : 0,
            used:
              result[month].used.count > 0
                ? result[month].used.totalPrice / result[month].used.count
                : 0,
            cpo:
              result[month].cpo.count > 0
                ? result[month].cpo.totalPrice / result[month].cpo.count
                : 0,
          };
        });
    
        return averages;
      };
    
      // Group and calculate averages
      return groupByMonthAndCalculateAverage(data);
    };
    
  
  module.exports = { calculateMonthlyAverageMsrp };
  