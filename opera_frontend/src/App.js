import React from 'react';
import SinglePage from './SinglePage.js'

class App extends React.Component {

	constructor(props) {
      super(props);
		
      this.state = {
         slideNumber: 0,
         presenting: true
      }

      this.increaseSlideNumber = this.increaseSlideNumber.bind(this);
      this.decreaseSlideNumber = this.decreaseSlideNumber.bind(this);
      this.startPresenting = this.startPresenting.bind(this);
      this.stopPresenting = this.stopPresenting.bind(this);
      this.present = this.present.bind(this);
    };

	componentDidMount() {
		this.present();
    }


    present(){
    	setInterval(function() {
    		if(this.state.presenting) this.increaseSlideNumber();
		}.bind(this), 5000);
    }

    increaseSlideNumber(){
    	var number = (this.state.slideNumber+1)%5;
    	this.setState({slideNumber: number});
    };

    decreaseSlideNumber(){
    	var number = (this.state.slideNumber - 1) < 0 ? 4 : (this.state.slideNumber - 1);
    	this.setState({slideNumber: number});
    };

    startPresenting(){
		this.setState({presenting: true});
    };

    stopPresenting(){
    	this.setState({presenting: false});
    };

   render() {
   	  var page = (
        	<SinglePage 
        		currentSlideNumber={this.state.slideNumber}
        		increaseSlideNumber={this.increaseSlideNumber}
        		decreaseSlideNumber={this.decreaseSlideNumber}
        		startPresenting={this.startPresenting}
        		stopPresenting={this.stopPresenting}
        		presenting={this.state.presenting}
        	/>
   	  );

      return (   	  		
      	<div className="application-container">
            {page}
        </div>
      );
   }
}

export default App;