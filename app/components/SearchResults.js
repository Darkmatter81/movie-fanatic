import React from 'react';
import SearchBox from './SearchBox';
import noPoster from './../filmstrip-icon.png';
import api from './../utils/api';

class SearchResults extends React.Component {
    state = { 
        searchResults: [],
    };

    componentWillReceiveProps(){
        this.searchForMovies();
    }

    componentWillMount(){
        this.searchForMovies();
    }

    async searchForMovies(){
        const { title } = this.props.match.params;
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