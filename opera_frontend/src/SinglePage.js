import React from 'react';
import TotemView from './TotemView.js'
import BarView from './BarView.js'
import CollinaView from './CollinaView.js'
import CittaView from './CittaView.js'
import RoveretoView from './RoveretoView.js'

class SinglePage extends React.Component {

	constructor(props) {
      super(props);

      this.state = {};
		
      this.render = this.render.bind(this);
    };

   render() {
   	  var presentingButton;
   	  if(this.props.presenting){
   	  	presentingButton = (
   	  		<span className="spoiler presentingButton" onClick={this.props.stopPresenting}><i className="fa fa-pause" aria-hidden="true"></i></span>
   	  	);
   	  }
   	  else{
   	  	presentingButton = (
   	  		<span className="spoiler presentingButton" onClick={this.props.startPresenting}><i className="fa fa-play" aria-hidden="true"></i></span>
  		  );
   	  }

      var slideContent="";
      if(this.props.currentSlideNumber===0){
          slideContent = (
            <TotemView />
        );
      }
      else if(this.props.currentSlideNumber===1){
        slideContent = (
            <BarView />
        ); 
      }
      else if(this.props.currentSlideNumber===2){
        slideContent = (
            <CollinaView />
        );
      }
      else if(this.props.currentSlideNumber===3){
        slideContent = (
            <CittaView />
        );
      }
      else if(this.props.currentSlideNumber===4){
        slideContent = (
            <RoveretoView />
        );
      }


      return (
         <div className="single-slide">
         	<div className="single-slide-header">
         		<span className="spoiler change-slide-left"><i onClick={this.props.decreaseSlideNumber} className="fa fa-arrow-left" aria-hidden="true"></i></span>
         		<span className="spoiler change-slide-right"><i onClick={this.props.increaseSlideNumber} className="fa fa-arrow-right" aria-hidden="true"></i></span>
				      {presentingButton}         		
         	</div>
         	<div className="single-slide-content">
	         	{slideContent}
         	</div>
         </div>
      );
   }
}

export default SinglePage;