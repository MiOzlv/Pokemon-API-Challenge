const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res)=>{
    // res.send("This is the landing endpoint for our pokedex! Feel free to try out our two endpoints like: \n /get-all-pokemons \n /get-pokemon/:name=");
    res.send({
        "msg": "Try out our differen endpoints",
        "endpoints": {
            "/all-pokemons" : "retrieves info on up to 10 pokemons",
            "/:name" : "retrieves info about a specific name of pokemon"
        }
    })
})

router.get('/all-pokemons', async (req, res)=>{
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
        // it is important to "await" for response or we might not have anything to display
        const data = response.data;
        res.json(data.results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error: could not fetch data from third Party API: Pokemon' });
      }
});

router.get('/:name', async (req, res)=>{
    const pokemonName = req.params.name;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = response.data;
        // res.json(data);
        res.json({
            "name": data.species.name,
            "type": data.types[0].type.name,
            "image": data.sprites.front_default,
            "hp": data.stats[0].base_stat,
            "attack": data.stats[1].base_stat,
            "defense": data.stats[2].base_stat,
            "speed": data.stats[5].base_stat,
            "ability1": data.abilities[0].ability.name,
            "ability2": data.abilities[1].ability.name
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error: could not fetch data from third Party API: Pokimon' });
      }
})


module.exports = router;