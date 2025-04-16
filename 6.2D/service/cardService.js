const mongoose = require('mongoose');

// Define schema here directly
const cardSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Card = mongoose.model('Card', cardSchema);

const getAllCards = async () => {
    return await Card.find();
};

module.exports = {
    getAllCards
};
