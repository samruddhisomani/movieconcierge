const details = () => {
    const query = document.querySelector('.form__input').value

    const results = document.querySelector('.results');
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    const createCard = (field, response) => {
        const el = document.createElement('div')
        el.textContent = `${field}: ${response.data[field]}`
        el.classList.add('card')
        document.querySelector('.results').append(el)
    }

    axios
        .get(`https://m2v1qgj5n6.execute-api.us-east-1.amazonaws.com/default/vrbo-bootcamp-movies?query=${query}`, {
            "headers": { "Accept": "*/*" }
        }
        )
        .then(response => {
            console.log(response)
            const gif = document.createElement('img')
            gif.src = response.data.gifURL
            document.querySelector('.results').append(gif)

            createCard("Title", response)
            createCard("Released", response)
            createCard("Actors", response)
            createCard("Genre", response)
        }
        )
}