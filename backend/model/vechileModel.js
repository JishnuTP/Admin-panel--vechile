const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    condition: String,
    description: String,
    title: String,
    brand: String,
    price: Number,
    product_type: String,
    custom_label_0: String,
    timestamp: Date,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;