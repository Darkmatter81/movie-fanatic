import React from 'react';
import noPoster from './../filmstrip-icon.png';
import api from './../utils/api';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
    state = { 
        searchResults: [],
    };

    componentDidUpdate(prevProps){
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.searchForMovies (this.props.match.params.title);
        }
    }

    componentDidMount(){
        const { title } = this.props.match.params;
        this.searchForMovies( title );
    }

    async searchForMovies(title){
        document.title = `Movie Fanatic - Search "${title}"` ;
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
                                        <Link to={`/title/${Title}`}>
                                            <img src={Poster !== 'N/A' ? Poster : noPoster} />
                                        </Link>
                                    </td>
                                    <td className='movie-result-item-name'>
                                        <p> 
                                            <Link to={`/title/${imdbID}`}>{ Title }</Link> ({ Year })
                                        </p>
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