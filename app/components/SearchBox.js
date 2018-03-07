import React from 'react';
import PropTypes from 'prop-types';
import api from './../utils/api';
import noPosterImg from './../filmstrip-icon.png';
import { withRouter } from 'react-router-dom';

class SearchSuggestionBox extends React.Component {
    static propTypes = {
        suggestedMovies:PropTypes.array.isRequired,
        searchTitle:PropTypes.string.isRequired,
        onClickSearchAll:PropTypes.func.isRequired,
        onClickSuggestion:PropTypes.func.isRequired
    };
   
    render(){
        const { suggestedMovies, searchTitle, onClickSuggestion, onClickSearchAll } = this.props; 
              
        return(
            <div className='search-suggestion-box'>
                <div className='search-suggestion-box-content'>
                    <ul>
                        {suggestedMovies.map(( {imdbID, Title, Year, Poster}  )=>{
                            return (
                                <li key={ imdbID }>
                                    <div className='suggested-movie-item' onMouseUp={()=>{onClickSuggestion(imdbID)}}>                                       
                                        <img src={
                                            Poster != 'N/A' ? Poster : noPosterImg
                                        }/>
                                        <div>
                                            <p>{Title} ({Year})</p>
                                        </div>
                                    </div>                                
                                </li>  
                            )
                        })}
                        <li>
                            <div className = 'see-all-results' onMouseUp={onClickSearchAll}>
                                See all results for <em>"{searchTitle}"</em>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

class SearchBox extends React.Component{
    state = {
        suggestedMovies: [],
        searchTitle: '',
        searchSubmitted: false
    };
    
    componentWillMount(){
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount (){
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    onSearchBoxSubmit = (event) =>{
        event.preventDefault();
        this.searchMovie();
    }

    searchMovie = ()=>{
        this.setState(()=>({searchSubmitted : true}));
        this.showSuggestionBox (false);
        this.props.history.push(`/search/${this.state.searchTitle}`);
    }
    
    /**
     * As user types search for movies and populate search
     * suggestion box
     */
    onMovieTitleChange = async (event)=>{
        const movieTitle = event.target.value.trim();
        let movies = [];

        this.setState(()=>({ 
            searchTitle: movieTitle, 
            searchSubmitted: false
        }));
        
        if (movieTitle.length > 2){
            movies = await api.searchMovies(movieTitle);   
            movies = movies.slice(0,6); 
        }
        
        this.setState(()=>({ suggestedMovies:movies }));    
    }
          
    /**
     * Hide suggestion box if user clicks outside of search/search suggestions
     * Show if clicked within and there are suggestions to show
     */
    handleMouseDown = (event) => {
        const { target } = event; 
        const show = this.searchBox.contains(target) &&
                     target !== this.searchButton &&
                     this.state.suggestedMovies.length > 0;

        this.setState(()=>({searchSubmitted : !show}));
        this.showSuggestionBox( show );
    }   

    onClickSuggestion = (suggestedMovieID) => {
        this.setState(()=>({searchSubmitted : true}));
        this.props.history.push(`/title/${suggestedMovieID}`);
    }

    showSuggestionBox = (show) =>{
        this.setState(()=>({showSuggestions: show}));
    }

    render(){
        const showSuggestions = this.state.suggestedMovies.length > 0  && !this.state.searchSubmitted;
        return(
            <div className="search-box"
                ref={(node) =>{this.searchBox = node}}>
                <div className="search-wrap">
                    <form onSubmit={this.onSearchBoxSubmit}>
                        <input onChange={this.onMovieTitleChange}
                               onFocus={this.onMovieTitleChange}
                               value={this.state.movieTitle} 
                               placeholder='Search movies, TV shows' 
                               autoFocus/>
                        
                        <button ref={(node)=>{this.searchButton = node}}>
                            Search
                        </button>
                    </form>
                </div>

                {showSuggestions &&             
                    <SearchSuggestionBox suggestedMovies={this.state.suggestedMovies}
                                         searchTitle={this.state.searchTitle}
                                         onClickSuggestion={this.onClickSuggestion}
                                         onClickSearchAll={this.searchMovie}
                                         />
                }
            </div>  
        );
    }
}

export default withRouter(SearchBox);