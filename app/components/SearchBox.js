import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './../utils/api';
import noPosterImg from './../filmstrip-icon.png';

class SearchSuggestionBox extends React.Component {
    static propTypes = {
        suggestedMovies:PropTypes.array.isRequired
    };
    
    render(){
        const { suggestedMovies } = this.props; 
              
        return(
            <div className='search-suggestion-box'>
                <div className='search-suggestion-box-content'>
                    <ul>
                        {suggestedMovies.map(( movie )=>{
                            return (
                                <li key={movie.imdbID}>
                                    <Link to='/result'>
                                        <div className='suggested-movie-item'>
                                            <img src={
                                                movie.Poster != 'N/A' ? movie.Poster : noPosterImg
                                            }/>
                                            <div>
                                                <p>{movie.Title} ({movie.Year})</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>  
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default class SearchBox extends React.Component{
    state = {
        suggestedMovies: [ ]
    };

    onSearchMovie = (event)=>{
        event.preventDefault();        
    }

    /**
     * As user types search for movies and populate search
     * suggestion box
     */
    onMovieTitleChange = async (event)=>{
        const movieTitle = event.target.value;
        let movies = [];

        if (movieTitle.length > 1){
            const result = await api.searchMovies(movieTitle);        
            movies = (result && result.Search) ? result.Search : [];
        }

        this.setState(()=>({suggestedMovies:movies}));
    }
       
    async componentWillMount(){
        document.addEventListener('mousedown', this.handleMouseDown);

    }

    sscomponentWillUnmount (){
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = (event) => {
        if (!this.searchBox.contains(event.target)){
            this.closeSuggestionBox();
        }
    }   

    closeSuggestionBox = () =>{
        this.setState(()=>({suggestedMovies: []}));
    }

    render(){
        return(
            <div className="search-box" 
                 ref={(node)=>{this.searchBox = node}}>
                <div className="search-wrap">
                    <form onSubmit={this.onSearchMovie}>
                        <input autoFocus onChange={this.onMovieTitleChange}/>
                        <button>Search</button>
                    </form>
                </div>

                {this.state.suggestedMovies.length != 0 &&              
                    <SearchSuggestionBox suggestedMovies={this.state.suggestedMovies}/>
                }
            </div>  
        );
    }
}

