
const omdbApiRoot = 'https://www.omdbapi.com/?apikey=e0a26407';
const movieSearchUrl = omdbApiRoot + '&type=movie&s=';

function handlError(error){
    console.warn(error);
}

async function searchMovies(title){
    try{
        const response = await fetch(window.encodeURI( movieSearchUrl + title ));
        const movies = await response.json();
        
        return movies.Search ? movies.Search : [];
    }
    catch( error ){
        handlError(error);
        return [];
    }
}

export default {
    searchMovies(title){
        return searchMovies(title);
    }
};