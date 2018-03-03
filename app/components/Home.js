import React from 'react';
import SearchBox from './SearchBox';

class Home extends React.Component {
    state = {  };
    render() {
        return (
            <div className="main-page-search-box">
                <SearchBox />
            </div>
        );
    }
}

export default Home;