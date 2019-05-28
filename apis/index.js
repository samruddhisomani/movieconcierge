'use strict'

const axios = require('axios');
const fs = require('fs');

const secrets = JSON.parse(fs.readFileSync('secrets.json'));

const getData = (query) => {
    const giphydata = axios
        .get(`https://api.giphy.com/v1/gifs/random?api_key=${secrets.giphyKey}&tag=${query}&rating=G`);
    const omdbdata = axios
        .get(`http://www.omdbapi.com/?apikey=${secrets.omdbKey}&s=${query}`)

    return Promise.all([giphydata, omdbdata]).then(values => {
        const gifURL = values[0].data.data.image_url
        const movieData = values[1].data.Search[0]
        movieData["gifURL"] = gifURL
        return movieData
    })
}

getData("godzilla").then(val => console.log(val))