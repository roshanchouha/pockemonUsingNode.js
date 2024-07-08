const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');

router.post('/add', async (req, res) => {
    const { name, breed, description } = req.body;
    try {
        const newPokemon = new Pokemon({ name, breed, description });
        await newPokemon.save();
        res.status(201).send(newPokemon);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/remove/:id', async (req, res) => {
    try {
         console.log("_id",req.params.id)
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!pokemon) {
            return res.status(404).send();
        }
        res.send(pokemon);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/edit/:id', async (req, res) => {
    const { name, breed, description } = req.body;

    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon) {
            return res.status(404).send({ error: 'Pokemon not found!' });
        }

        pokemon.name = name;
        pokemon.breed = breed;
        pokemon.description = description;

        await pokemon.save();
        res.send(pokemon);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

 
router.get('/list', async (req, res) => {
    try {
        const pokemons = await Pokemon.find({});
        res.send(pokemons);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
