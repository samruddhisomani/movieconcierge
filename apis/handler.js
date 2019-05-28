'use strict';

module.exports.getData = async (event) => {

  const giphydata = axios
    .get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}&tag=${query}&rating=G`);
  const omdbdata = axios
    .get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`)

  const theGoodStuff = await Promise.all([giphydata, omdbdata]).then(values => {
    const gifURL = values[0].data.data.image_url
    const movieData = values[1].data.Search[0]
    movieData["gifURL"] = gifURL
    return movieData
  })

  return {
    statusCode: 200,
    body: JSON.stringify(theGoodStuff),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
