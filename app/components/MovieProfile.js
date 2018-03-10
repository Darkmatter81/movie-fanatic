import React from 'react';
import PropTypes from 'prop-types';
import api from './../utils/api';

const MovieRating = (props) =>{
    const { Value:value } = props.rating;
    let ratingValue;

    // are we not dealing with percentage?
    if (value.indexOf('%') === -1){
        const [score, total] = value.split('/');
        
        ratingValue = parseInt( (score / total) * 100 );
    }
    else{
        ratingValue = parseInt( value.split('%')[0] );
    }

    return(
        <div>
            <div className='movie-rating-bar'>
                <div className='movie-rating-score-bar'
                     style={{width:`${ratingValue}%`}}>
                </div>
            </div>
            
        </div>
    );
}

MovieRating.propTypes = {
    rating: PropTypes.object.isRequired
};

class Profile extends React.Component{
    static propTypes = {
        movie:PropTypes.object.isRequired
    };

    render(){
        const { movie } = this.props;
        
        return(
            <div className='' >
                {/* Movie header */}
                <div className='row'>
                    <div className='col-xs-12'>
                        <h2>{movie.Title}</h2>
                        <p>({movie.Year})</p>
                        <p>{movie.Runtime}</p>
                        <p>{movie.Genre}</p>
                        <p>{movie.Released}</p>
                    </div>
                </div>

                {/* Movie poster and description container */}
                <div className='row'>
                    <div className='col-xs-12 col-md-6'>
                        <img src={movie.Poster} className='img-fluid' />
                    </div>
                    <div className='col-xs-12 col-md-6'>
                        <p>{movie.Plot}</p>
                    </div>
                </div>

                {/* Details */}
                <div>
                    <table className='movie-details-table'>
                        <tbody>
                            <tr>
                                <td>Director</td>
                                <td>{movie.Director}</td>
                            </tr>
                            <tr>
                                <td>Stars</td>
                                <td>{movie.Actors}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{movie.Country}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Ratings table */}
                    {movie.Ratings !== undefined &&
                        <table className='movie-ratings-table'>
                            <tbody>
                                <tr>
                                    <th>Ratings</th>
                                </tr>
                                {movie.Ratings.map((rating)=>{
                                    return(
                                        <tr key={rating.Source}>
                                            <td>{rating.Source}</td>
                                            <td>
                                                <MovieRating rating={rating}/>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        );
    }
}

export default class MovieProfile extends React.Component{
    state = {
        loading: false,
        movie: null,
    };

    componentDidUpdate(prevProps){
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.fetchMovieTitle (this.props.match.params.id);
        }
    }

    componentDidMount(){
        console.log('mounted');
        this.fetchMovieTitle(this.props.match.params.id);
    }

    async fetchMovieTitle(imdbID){
        this.setState(()=>({
            loading: true,
            movie: null
        }));

        const movie = await api.getMovieTitle(imdbID);

        this.setState(()=>({
            loading: false,
            movie
        }));
    }

    render(){
        const { movie } = this.state;
        
        return(
            <div className='result-container'>
                {movie !== null &&
                   <Profile movie={movie}/>
                }
            </div>
        );
    }
}