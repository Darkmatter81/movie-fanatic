import React from 'react';
import PropTypes from 'prop-types';
import api from './../utils/api';

const MovieRating = (props) =>{
    const { Value:value } = props.rating;
    let ratingValue;

    // are we dealing with percentage rating?
    if (value.indexOf('%') !== -1){
        ratingValue = parseInt( value.split('%')[0] );
    }
    else{
        const [score, total] = value.split('/');
        ratingValue = parseInt( (score / total) * 100 );
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
            <div className=''>
                {/* Movie header */}
                <div className=' movie-header'>
                    <div className='co1l-12'>
                        <div className='movie-title-year'>
                            <h3>{movie.Title}</h3>
                            <p>({movie.Year})</p>
                        </div>

                        <div className='movie-details'>
                            <p>{movie.Runtime}</p> |
                            <p>{movie.Genre}</p>   |
                            <p>{movie.Released}</p>
                        </div>
                    </div>
                </div>

                {/* Movie poster and description */}
                <div className='row movie-poster-plot'>
                    <div className='col-12 col-sm-4 col-md-3 col-lg-3'>
                        <img src={movie.Poster} className='movie-poster img-fluid mx-auto mx-sm-0 d-block' />
                    </div>

                    <div className='col-12 col-sm-7 col-md-9 col-lg-9'>
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
            <div className='movie-profile-container'>
                {movie !== null &&
                   <Profile movie={movie}/>
                }
            </div>
        );
    }
}