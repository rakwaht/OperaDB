import React from 'react';
import {Pie} from 'react-chartjs-2';

class SingleWeek extends React.Component {

	constructor(props) {
	    super(props);

      	this.state = {};

      	this.render = this.render.bind(this);
    };

    render() {

	    var chartData = {
		    labels: [
		        // "Snack1",
		        // "Snack2",
		        // "Intero",
		        // "Ridotto",
		        // "P.Lesto"
		    ],
		    datasets: [
		        {
		            data: [
		            	parseInt(this.props.data['value']['snack1']), 
		            	parseInt(this.props.data['value']['snack2']), 
		            	parseInt(this.props.data['value']['intero']), 
		            	parseInt(this.props.data['value']['ridotto']), 
		            	parseInt(this.props.data['value']['pasto_lesto'])
	            	],
		            backgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#00cc66",
		                "#ff9900",
		                "#FFCE56"
		            ]
		        }]
		 };

    	return (
	    	<div className="canteen-single-week">
	    		<div className="week-date-title">{this.props.weekHeader}</div>
	    		<div className="inner-data-details fluid-container">
	    			<div className="row">
		    			<div className="col-sm-6 vcenter padding-right-none">
		    				<Pie data={chartData} />
		    			</div>
		    			<div className="col-sm-6 vcenter padding-left-none">
				    		<span className="badge snack1-background">.</span><span>Snack1:</span> <span className="right totem-number-value">{this.props.data['value']['snack1']}</span><br />
			          		<span className="badge snack2-background">.</span><span>Snack2:</span> <span className="right totem-number-value">{this.props.data['value']['snack2']}</span><br />
			          		<span className="badge intero-background">.</span><span>Intero:</span> <span className="right totem-number-value">{this.props.data['value']['intero']}</span><br />
			          		<span className="badge ridotto-background">.</span><span>Ridotto:</span> <span className="right totem-number-value">{this.props.data['value']['ridotto']}</span><br />
			          		<span className="badge lesto-background">.</span><span>Pasto Lesto:</span> <span className="right totem-number-value">{this.props.data['value']['pasto_lesto']}</span>
		    			</div>
	    			</div>
	    		</div>
	    	</div>
      	);
    };

}

export default SingleWeek;