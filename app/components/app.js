import React from 'react';
import Home from './Home';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import MovieProfile from './MovieProfile';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default class App extends React.Component{
    render(){
        return(
            <div className='c1ontainer app-container'>
                <h3 className='text-center'>Movie Fanatic</h3>
               
                <BrowserRouter>
                      <div >
                        <div className='row'>
                            <div className='col-12 col-sm-12 col-md-8 col-lg-8 offset-lg-2 offset-md-2'>
                                <SearchBox />     
                            </div>               
                        </div>
                         
                        <div className='row' style={{marginTop: 30}}>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                                <Switch>
                                    <Route exact path='/' component={Home}/>
                                    <Route path='/title/:id' component={MovieProfile}/>
                                    <Route path='/search/:title' component={SearchResults}/>  
                                    <Route render={()=><h2>Page not found</h2>}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}