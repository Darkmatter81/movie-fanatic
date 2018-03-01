import React from 'react';


class SearchSuggestionBox extends React.Component{
    render(){
        return(
            <div className='search-suggestion-box'>
                <div className='search-suggestion-box-content'>
                    <ul>
                        <li>Movie 1</li>
                        <li>Movie 2</li>
                        <li>Movie 3</li>
                        <li>Movie 4</li>
                        <li>Movie 5</li>
                        <li>Movie 6</li>
                        <li>Movie 7</li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default class SearchBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {showSuggestions: false};
    }

    onSearchClick = (event)=>{
        event.preventDefault();
        this.setState((prevState)=>({
            showSuggestions: !prevState.showSuggestions
        }));
    }

    onEnterTitle = (event)=>{
        const show = event.target.value.length > 3;
        this.setState(()=>({showSuggestions : show }));
    }

    render(){
        return(
            <div className="search-box">
                <div className="search-wrap">
                    <form>
                        <input autoFocus onChange={this.onEnterTitle}/>
                        <button>Search</button>
                    </form>
                </div>

                {this.state.showSuggestions &&
                    <SearchSuggestionBox/>
                }
            </div>  
        );
    }
}

