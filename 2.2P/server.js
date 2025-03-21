const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const quotes = [
    "Innovation shapes the future.",
    "Your attitude determines your success.",
    "Overcome doubt to achieve greatness.",
    "Success comes from action, not waiting."
];

app.get('/quote', (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
});

app.post('/quote', (req, res) => {
    quotes.push(req.body.quote);
    res.send('Quote added successfully');
});

const calculate = (req, res, operation) => {
    const { num1, num2 } = req.body;
    if (isNaN(num1) || isNaN(num2)) return res.status(400).json({ error: "Invalid input" });

    let result;
    switch (operation) {
        case 'add': result = num1 + num2; break;
        case 'subtract': result = num1 - num2; break;
        case 'multiply': result = num1 * num2; break;
        case 'divide':
            if (num2 === 0) return res.status(400).json({ error: "Cannot divide by zero" });
            result = num1 / num2;
            break;
    }
    res.json({ result });
};

app.post('/add', (req, res) => calculate(req, res, 'add'));
app.post('/subtract', (req, res) => calculate(req, res, 'subtract'));
app.post('/multiply', (req, res) => calculate(req, res, 'multiply'));
app.post('/divide', (req, res) => calculate(req, res, 'divide'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));