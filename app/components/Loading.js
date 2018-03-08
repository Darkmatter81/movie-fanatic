import React from 'react';

export default class Loading extends React.Component{
    constructor(props){
        super(props)
        this.state = {loadingText: 'Loading',
                      ticker: null};
        
    }

    onTicker(){
        let stopper = 'Loading...';
        
        if (this.state.loadingText === stopper){
            this.setState(()=>{
                return {
                    loadingText: 'Loading'
                }
            });
        }
        else{
            this.setState((prevState)=>{
                return{
                    loadingText: prevState.loadingText + '.'
                }
            });
        }
    }

    componentDidMount(){
        this.ticker = window.setInterval(this.onTicker.bind(this), 300);
    }

    componentWillUnmount(){
        window.clearInterval(this.ticker);
    }
    
    render(){
        return(
            <h4 style={{textAlign:'center'}}>{this.state.loadingText}</h4>
        )
    }
}