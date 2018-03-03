
const omdbApiRoot = 'https://www.omdbapi.com/?apikey=e0a26407';
const movieSearchUrl = omdbApiRoot + '&type=movie&s=';

function handlError(error){
    console.warn(error);
    return null;
}

async function searchMovies(title){
    const response = await fetch(window.encodeURI( movieSearchUrl + title ))
        .catch(handlError);
    
    if (!response) return null;

    const movies = await response.json();
    return movies;
}

export default {
    searchMovies(title){
        return searchMovies(title);
    }
};