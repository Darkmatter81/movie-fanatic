import React from 'react';
import PropTypes from 'prop-types';
import noPoster from './../filmstrip-icon.png';
import api from './../utils/api';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const ResultsList = (props) =>{
    const {results, title} = props;

    return(       
        <div>
            {results.length > 0 &&
                <p>Results for "{ title }"</p>
            }

            {results.length == 0 &&
                <p>No results for "{ title }"</p>
            }

            <table className='table results-table'>
                <tbody>
                    {results.map(( {imdbID, Year, Poster, Title} )=>{
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

ResultsList.propTypes = {
    title: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired
};


class SearchResults extends React.Component {
    state = { 
        searchResults: [],
        loading: false
    };

    componentDidUpdate(prevProps){
        console.log('did update')
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.searchForMovies (this.props.match.params.title);
        }
    }

    componentDidMount(){
        console.log('did mount')
        const { title } = this.props.match.params;
        this.searchForMovies( title );
    }

    async searchForMovies(title){
        document.title = `Movie Fanatic - Search "${title}"` ;
        
        this.setState(()=>({
            searchResults:[],
            loading: true
        }));
        
        const searchResults = await api.searchMovies(title);
        
        this.setState(()=> ( {
            searchResults, 
            loading: false
        }));
    }

    render() {
        const { searchResults } = this.state;
        const { title } = this.props.match.params;

        return (
            <div className='result-container'>
                {this.state.loading === false &&    
                    <ResultsList results={searchResults} title={title}/>
                }

                {this.state.loading &&
                    <Loading/>
                }
            </div>
        );
    }
}

export default SearchResults;