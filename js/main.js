import printMovies from './api.js';
import searchMovies from './search.js';

document.getElementById('search_button').addEventListener('click', function () {
    const query = document.getElementById('search_input').value;
    searchMovies(query);
});

printMovies()