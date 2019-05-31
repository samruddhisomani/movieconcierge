'use strict'

const axios = require('axios');

module.exports.getData = async (event) => {

    const giphydata = axios
        .get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}&tag=${event.queryStringParameters.query}&rating=G`);
    const omdbdata = axios
        .get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${event.queryStringParameters.query}`)

    const theGoodStuff = await Promise.all([giphydata, omdbdata]).then(values => {
        console.log(values[0])
        console.log(values[1])
        const gifURL = values[0].data.data.image_url
        const movieData = values[1].data
        movieData["gifURL"] = gifURL
        return movieData
    })

    return {
        statusCode: 200,
        //arcane cors magic
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        },
        body: JSON.stringify(theGoodStuff),
    };
};
