import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './../utils/api';
import noPosterImg from './../filmstrip-icon.png';

class SearchSuggestionBox extends React.Component {
    static propTypes = {
        suggestedMovies:PropTypes.array.isRequired,
        searchTitle:PropTypes.string.isRequired
    };
    
    render(){
        const { suggestedMovies, searchTitle } = this.props; 
              
        return(
            <div className='search-suggestion-box'>
                <div className='search-suggestion-box-content'>
                    <ul>
                        {suggestedMovies.map(( {imdbID, Title, Year, Poster}  )=>{
                            return (
                                <li key={ imdbID }>
                                    <Link to={`/movie/${ imdbID }`}>
                                        <div className='suggested-movie-item'>
                                            <img src={
                                                Poster != 'N/A' ? Poster : noPosterImg
                                            }/>
                                            <div>
                                                <p>{Title} ({Year})</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>  
                            )
                        })}
                        <li>
                            <Link to='/results'>
                                <div className = 'see-all-results'>
                                    See all results for "<em>{ searchTitle}</em>"
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default class SearchBox extends React.Component{
    state = {
        suggestedMovies: [],
        searchTitle: '',
        showSuggestions: false
    };

    onSearchMovie = (event)=>{
        event.preventDefault();        
    }

    /**
     * As user types search for movies and populate search
     * suggestion box
     */
    onMovieTitleChange = async (event)=>{
        const movieTitle = event.target.value.trim();
        let movies = [];

        this.setState(()=>({searchTitle: movieTitle}));

        if (movieTitle.length > 2){
            movies = await api.searchMovies(movieTitle);   
            movies = movies.slice(0,6); 
        }

        this.setState(()=>({
                suggestedMovies:movies,
                showSuggestions: movies.length > 0 
           }
        ));    
    }
       
    componentWillMount(){
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    sscomponentWillUnmount (){
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Hide suggestion box if user clicks outside of search/search suggestions
     * Show if clicked within and there are suggestions to show
     */
    handleMouseDown = (event) => {
        const show = this.searchBox.contains(event.target) &&
                     this.state.suggestedMovies.length > 0;

        this.showSuggestionBox( show );
    }   

    showSuggestionBox = (show) =>{
        this.setState(()=>({showSuggestions: show}));
    }

    render(){
        return(
            <div className="search-box" 
                 ref={(node)=>{this.searchBox = node}}>
                <div className="search-wrap">
                    <form onSubmit={this.onSearchMovie}>
                        <input onChange={this.onMovieTitleChange}
                               value={this.state.movieTitle} 
                               placeholder='Search movies, TV shows' 
                               autoFocus/>
                        <button>Search</button>
                    </form>
                </div>

                {this.state.showSuggestions &&              
                    <SearchSuggestionBox suggestedMovies={this.state.suggestedMovies}
                                         searchTitle={this.state.searchTitle}/>
                }
            </div>  
        );
    }
}

