import React from 'react';
import SingleWeek from './SingleWeek.js'

class SingleCanteen extends React.Component {

	constructor(props) {
	    super(props);

      	this.state = {};
		
      	this.formattedDate = this.formattedDate.bind(this);
  		this.render = this.render.bind(this);
    };

	formattedDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [day, month].join('/');
	}

    render() {

    	return (
			<div className="single-cateen">
				<div className="canteen-header">{this.props.canteenName}</div>
				<img  alt="placeholder" className="img-responsive image-centered" src="image_placeholder.jpeg" />
				<SingleWeek 
					weekHeader={this.formattedDate(this.props.data['2']['weekStart']) + '-' + this.formattedDate(this.props.data['2']['weekEnd'])}
					data={this.props.data['2']}
				/>
				<SingleWeek 
					weekHeader={this.formattedDate(this.props.data['1']['weekStart']) + '-' + this.formattedDate(this.props.data['1']['weekEnd'])}
					data={this.props.data['1']}
				/>
				<SingleWeek 
					weekHeader={this.formattedDate(this.props.data['0']['weekStart']) + '-' + this.formattedDate(this.props.data['0']['weekEnd'])}
					data={this.props.data['0']}
				/>
			</div>
      	);
    };

}

export default SingleCanteen;