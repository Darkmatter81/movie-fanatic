
const omdbApiRoot = 'https://www.omdbapi.com/?apikey=e0a26407';
const movieSearchUrl = omdbApiRoot + '&s=';

function handlError(error){
    console.warn(error);
}

async function searchMovies(title){
    try{
        const response = await fetch(window.encodeURI( movieSearchUrl + title ));
        const movies = await response.json();
        
        let movieList = [];
        let ids = [];

        // remove duplicate entries this api sometimes returns
        if (movies.Search){
            movieList = movies.Search.filter((item) => {
                if (ids.indexOf(item.imdbID) === -1){
                    ids.push(item.imdbID);
                    return true;
                } 
                else {
                    return false;
                }
            });
        }

        return movieList;
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