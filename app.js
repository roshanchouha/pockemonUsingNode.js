const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./routes/pokemon');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/pokedex', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use('/pokemon', pokemonRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
