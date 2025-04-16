const cardService = require('../services/cardService');

const getCards = async (req, res) => {
    try {
        const cards = await cardService.getAllCards();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCards
};
