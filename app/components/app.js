import React from 'react';
import Home from './Home';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default class App extends React.Component{
    render(){
        return(
            <div className='app-container'>
                <h3 className='text-center'>Movie Fanatic</h3>
               
                <BrowserRouter>
                    <div>
                        <div className="search-box-wrap">
                            <SearchBox />
                        </div>
                        
                        <div style={{marginTop: 30}}>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route path='/movie' render={()=><h2>Movie result</h2>}/>
                                <Route path='/search/:title' component={SearchResults}/>  
                                <Route render={()=><h2>Page not found</h2>}/>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}