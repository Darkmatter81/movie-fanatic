import React from 'react';
import SearchBox from './SearchBox';
import noPoster from './../filmstrip-icon.png';
import api from './../utils/api';

class SearchResults extends React.Component {
    state = { 
        searchResults: [],
    };

    componentWillReceiveProps(nextProps){
        // has there been a change?
        const title = this.props.match.params.title;
        const newTitle = nextProps.match.params.title;

        if (title !== newTitle){
            this.searchForMovies( newTitle );
        }
    }

    componentWillMount(){
        const { title } = this.props.match.params;
        this.searchForMovies( title );
    }

    async searchForMovies(title){
        const searchResults = await api.searchMovies(title);
        
        this.setState(()=> ( {searchResults}) );
    }

    render() {
        const { searchResults } = this.state;
        const { title } = this.props.match.params;

        return (
            <div className='results-container'>
                <p>Results for "{ title }"</p>
                <table className='results-table'>
                    <tbody>
                        {searchResults.map(( {imdbID, Year, Poster, Title} )=>{
                            return(
                                <tr key={imdbID}>
                                    <td className='movie-result-item-poster'>
                                        <img src={Poster !== 'N/A' ? Poster : noPoster} />
                                    </td>
                                    <td className='movie-result-item-name'>
                                        <p>{ Title } ({ Year })</p>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SearchResults;