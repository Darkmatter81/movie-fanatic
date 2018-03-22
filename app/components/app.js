import React from 'react';
import Home from './Home';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import MovieProfile from './MovieProfile';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './../assets/site-logo.png';

export default class App extends React.Component{
    render(){
        return(
            <div className='app-container'>
                {/* <h3 className='text-center'>Movie Fanatic</h3> */}
               
                <BrowserRouter>
                      <div>
                        <div className='row' id='logo-search-box-container'>
                            <div className='col-2'>
                                <a href='/'>
                                    <img id='site-logo' src={logo}/>
                                </a>
                            </div>
                            <div className='col-9 offset-1 offset-sm-0 col-sm-10 col-md-10 col-lg-10' >
                                <SearchBox />     
                            </div>               
                        </div>
                         
                        <div className='row' style={{marginTop: 20}}>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                                <Switch>
                                    <Route exact path='/' component={Home}/>
                                    <Route path='/title/:id' component={MovieProfile}/>
                                    <Route path='/search/:title' component={SearchResults}/>  
                                    <Route component={Home}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}