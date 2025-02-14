import { BASE_URL } from './info.js';
import { API_KEY } from './info.js';

const showNowPlaying = async () =>{


    const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: API_KEY
}
};

    await fetch(`${BASE_URL}/now_playing?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(data => {

        const fragment = document.createDocumentFragment();

        data.results.forEach(movie => {
            const card = document.querySelector('#movie-cards').content.cloneNode(true);

            card.querySelector('h2').innerText = movie.original_title;

            fragment.appendChild(card);
        })

        document.querySelector('#now-playing-list').append(fragment);

        console.log(data);

    })
    .catch(err => console.error(err));
}

showNowPlaying();