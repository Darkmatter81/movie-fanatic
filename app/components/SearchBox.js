import React from 'react';
import PropTypes from 'prop-types';

class SearchSuggestionBox extends React.Component{
    render(){
        const movies = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4', 'Movie 5', 'Movie 6', 'Movie 7', 'Movie 8',]

        return(
            <div className='search-suggestion-box'>
                <div className='search-suggestion-box-content'>
                    <ul>
                        {movies.map((movie)=>{
                            return (
                                <li key={movie}>
                                    <div className='suggested-movie-item'>
                                        <img src='http://via.placeholder.com/40x60'/>
                                        <div>
                                            <p>Movie title (Year)</p>
                                            <p>Actors starring</p>
                                        </div>
                                    </div>
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
    constructor(props){
        super(props)
        this.state = {showSuggestions: false};
    }

    onSearchMovie = (event)=>{
        event.preventDefault();
        this.setState((prevState)=>({
            showSuggestions: !prevState.showSuggestions
        }));
    }

    onEnterTitle = (event)=>{
        const show = event.target.value.length > 3;
        this.setState(()=>({showSuggestions : show }));
    }

    closeSuggestionBox = ()=> {
        this.setState(()=>({showSuggestions: false}));
    }
       
    componentWillMount(){
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = (event) => {
        if (!this.searchBox.contains(event.target)){
            this.closeSuggestionBox();
        }
    }   

    render(){
        return(
            <div className="search-box" 
                 ref={(node)=>{this.searchBox = node}}>
                <div className="search-wrap">
                    <form onSubmit={this.onSearchMovie}>
                        <input autoFocus onChange={this.onEnterTitle}/>
                        <button>Search</button>
                    </form>
                </div>

                {this.state.showSuggestions &&              
                    <SearchSuggestionBox/>
                }
            </div>  
        );
    }
}

