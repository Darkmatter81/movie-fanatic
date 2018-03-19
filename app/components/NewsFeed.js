import React from 'react';
import api from './../utils/api';
import Loading from './Loading';
import broadcastImg from './../assets/broadcast.jpg'
import PropTypes from 'prop-types';

class NewsFeed extends React.Component {
   static propTypes = {
       news: PropTypes.array.isRequired,
       heading:PropTypes.string
   }; 
    
    state = { 
     
    };

    render() {
        const { news } = this.props;

        return (
            <div>
                <h5 id='related-news-heading'><em>{this.props.heading}</em></h5>

                <table className='table' id='news-feed-table'>
                    <tbody>
                        {news.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td className='news-img-column'>
                                        <img src={item.urlToImage !== null 
                                                ? item.urlToImage
                                                : broadcastImg
                                            } className='img-fluid' />
                                    </td>
                                    <td className='news-snippet'>
                                        <a className='title-link' href={item.url} target='blank'>
                                            <p><strong>{item.title}</strong></p>
                                        </a>
                                        <p>{item.description}</p>
                                        {item.author !== null &&
                                            <cite>- {item.author}</cite>
                                        }
                                            
                                        <a href={item.url} target='blank'>
                                            <p className='read-more-link'>Read full article here</p>
                                        </a>
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

export default NewsFeed;