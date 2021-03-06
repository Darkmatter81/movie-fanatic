
const omdbApiRoot = 'https://www.omdbapi.com/?apikey=e0a26407';
const movieSearchUrl = omdbApiRoot + '&s=';
const movieTitleUrl = omdbApiRoot + '&plot=full&i=';

const newsapiRoot = 'https://newsapi.org/v2/everything?apiKey=3af66352aab442f195447370226158c6';
const newsTopicSearchUrl = newsapiRoot + '&pageSize=8&sortBy=publishedAt&language=en&q=';

function handlError(error){
    console.warn(error);
}

async function searchMovies(title){
    let movieList = [];
        
    try{
        const response = await fetch(window.encodeURI( movieSearchUrl + title ));
        const movies = await response.json();
        
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
    }  
    catch( error ){
        handlError(error);
    }

    return movieList;
}

async function getMovieTitle(imdbID){
    let movie = {};

    try{
        const response = await fetch(movieTitleUrl + imdbID);
        movie = await response.json();
        
        // Handle movie not found by api,
        if (movie.hasOwnProperty('Title') === false){
            movie = null;
        }
    }
    catch(error){
        handlError(error);
    }

    return movie;
}

async function getMovieNews(topic){
    let articles = null;
    try{
        const response = await fetch(newsTopicSearchUrl + topic);
        const news = await response.json();
        articles = news.articles;
    }
    catch (error){
        handleError(error);
    }

    return articles;
}

export default {
    searchMovies(title){
        return searchMovies(title);
    },
    getMovieTitle(imdbID){
        return getMovieTitle(imdbID);
    },
    getMovieNews(topic){
        return getMovieNews(topic);
    }
};