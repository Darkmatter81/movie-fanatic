import React from 'react';
import Home from './Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default class App extends React.Component{
    render(){
        return(
            <div className='app-container'>
                <h1 className='text-center'>Movie Fanatic</h1>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/movie' render={()=><h2>Movie result</h2>}/>
                            <Route path='/results' render={()=><h2>Movie List Result</h2>}/>  
                            <Route render={()=><h2>Page not found</h2>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}