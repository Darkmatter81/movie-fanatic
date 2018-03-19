import React from 'react';
import NewsFeed from './NewsFeed';
import Loading from './Loading';
import api from './../utils/api';

class Home extends React.Component {
    state = { newsArticles: null, loading: false };

    componentDidMount(){
        this.fetchMovieNews()
    }

    async fetchMovieNews(){
        this.setState(()=>({loading: true}));

        let news = await api.getMovieNews('hollywood films');

        this.setState(()=>({
            loading: false,
            newsArticles: news
        }));
    }


    render() {
        const { newsArticles, loading } = this.state;

        return (
            <div className='content'>
                { newsArticles !== null && newsArticles.length > 0 &&
                    <div>
                        <h4>Movie and enterntainment news</h4>
                        <div id='related-news-wrap'>
                            <NewsFeed news={ newsArticles }/>
                       </div>
                    </div>
                }

                {loading === true &&
                    <Loading/>
                }

            </div>
        );
    }
}

export default Home;