const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pokemon', async (req, res) => {
    const pokemonName = req.query.name.toLowerCase();
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemon = response.data;
        const pokemonInfo = {
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            height: pokemon.height / 10, // Convert to meters
            weight: pokemon.weight / 10, // Convert to kilograms
            types: pokemon.types.map(typeInfo => typeInfo.type.name).join(', '),
            abilities: pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '),
            base_experience: pokemon.base_experience
        };
        res.render('pokemon', { pokemon: pokemonInfo });
    } catch (error) {
        res.render('pokemon', { pokemon: null });
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
