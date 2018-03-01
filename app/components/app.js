import React from 'react';
import SearchBox from './SearchBox';

export default class App extends React.Component{
    render(){
        return(
            <div className=' app-container'>
                <h1 className='text-center'>Movie Fanatic</h1>
                
                <div className="main-page-search-box">
                    <SearchBox/>
                </div>
            </div>
        );
    }
}