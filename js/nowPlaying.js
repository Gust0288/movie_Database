import { BASE_URL } from './info.js';
import { API_KEY } from './info.js';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: API_KEY
    }
};


const updateSelectedLink = (selectedId) => {

    document.querySelectorAll('#header-nav nav ul li a').forEach(link => {
        link.classList.remove('selected');
    });
    
    
    const selectedLink = document.getElementById(selectedId);
    if (selectedLink) {
        selectedLink.classList.add('selected');
    }
};



const renderMovies = (movies, templateId = 'movie-cards-1') => {
    
    document.querySelector('.current-list').innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    const movieCardTemplate = document.getElementById(templateId);
    
    movies.forEach(movie => {
        const card = movieCardTemplate.content.cloneNode(true);
        
        card.querySelector('h2').innerText = movie.title || movie.original_title;
        card.querySelector('#org-title').textContent = movie.original_title;
        card.querySelector('#release').textContent = movie.release_date;
        card.querySelector('#desc').textContent = movie.overview;

    const imgElement = card.querySelector('img');
        if (movie.poster_path) {
            imgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            imgElement.alt = movie.title || movie.original_title;
        }
        
        fragment.appendChild(card);
    });
    
    document.querySelector('.current-list').append(fragment);
};




const fetchMovies = async (endpoint) => {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}?language=en-US&page=1`, options);
        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        return [];
    }
};


document.addEventListener('DOMContentLoaded', async () => {
    updateSelectedLink('nowPlaying');

    const nowPlayingMovies = await fetchMovies('now_playing');
    renderMovies(nowPlayingMovies, 'movie-cards-1');
    
    
    document.getElementById('nowPlaying').addEventListener('click', async (e) => {
        e.preventDefault();
        updateSelectedLink('nowPlaying');
        const movies = await fetchMovies('now_playing');
        renderMovies(movies, 'movie-cards-1');
    });
    

    const popularLink = document.getElementById('popular');
    if (popularLink) {
        popularLink.addEventListener('click', async (e) => {
            e.preventDefault();
            updateSelectedLink('popular');
            const movies = await fetchMovies('popular');
            renderMovies(movies, 'movie-cards-2'); 
        });
    }
    

    const topRatedLink = document.getElementById('topRated');
    if (topRatedLink) {
        topRatedLink.addEventListener('click', async (e) => {
            e.preventDefault();
            updateSelectedLink('topRated');
            const movies = await fetchMovies('top_rated');
            renderMovies(movies, 'movie-cards-3');
        });
    }
    
    const upcomingLink = document.getElementById('upcoming');
    if (upcomingLink) {
        upcomingLink.addEventListener('click', async (e) => {
            e.preventDefault();
            updateSelectedLink('upcoming');
            const movies = await fetchMovies('upcoming');
            renderMovies(movies, 'movie-cards-4');
        });
    }
});