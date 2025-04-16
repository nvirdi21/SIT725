const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cardsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema and model
const cardSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Card = mongoose.model('Card', cardSchema);

// Routes
app.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/cards', async (req, res) => {
    try {
        const newCard = new Card(req.body);
        await newCard.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/cards/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/cards/:id', async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCard) return res.status(404).json({ message: 'Card not found' });
        res.json(updatedCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Simple sum calculator
app.get('/add', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Invalid input: both a and b must be numbers");
    }

    const sum = a + b;
    res.send(sum.toString());
});


app.delete('/cards/:id', async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);
        if (!deletedCard) return res.status(404).json({ message: 'Card not found' });
        res.json({ message: 'Card deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = { app, server, Card };
