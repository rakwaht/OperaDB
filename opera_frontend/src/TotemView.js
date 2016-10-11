import React from 'react';
import {Pie} from 'react-chartjs-2';

class TotemView extends React.Component {

	constructor(props) {
	    super(props);

      	this.state = {};
		
		this.loadData = this.loadData.bind(this);

		this.loadData();
    };

    componentDidMount() {
    	this.loadData();
    };

    loadData(){
    	let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		let yyyy = today.getFullYear();

    	let today_link = '/tsop_ricarica//2013/03/01';
    	//let today_link = '/tsop_ricarica/' + yyyy + '/' + mm + '/' + dd;
    	let month_link = '/tsop_ricarica/2013/03';
    	//let month_link = '/tsop_ricarica/' + yyyy + '/' + mm ;

        fetch(today_link) 
            .then((response) => {
                return response.json() })   
                    .then( (json) => {
                        this.setState({todayData: json});
                    });

        fetch(month_link) 
            .then((response) => {
                return response.json() })   
                    .then( (json) => {
                        this.setState({monthData: json});
                    });

    };

    render() {

    	// Povo
    	let povoToday = "";
    	(this.state.todayData||[]).forEach(function(obj){ 
    		if(obj && obj['id_totem']==='3'){
    			povoToday = obj;
    			let num_refill = parseInt(obj['num_refill']);
    			povoToday['average'] = num_refill===0 ? 0 : ((parseInt(obj['total']*1.0)/num_refill)).toFixed(2);
    		}
		});
		let povoMonth = "";
		(this.state.monthData||[]).forEach(function(obj){ 
    		if(obj && obj['id_totem']==='3'){
    			povoMonth = obj;
    			let num_refill = parseInt(obj['num_refill']);
    			povoMonth['average'] = num_refill===0 ? 0 : ((parseInt(obj['total']*1.0)/num_refill)).toFixed(2);
    		}
		});

		//Mesiano
    	let mesianoToday = "";
    	(this.state.todayData||[]).forEach(function(obj){ 
    		if(obj && obj['id_totem']==='2'){
    			mesianoToday = obj;
    			let num_refill = parseInt(obj['num_refill']);
    			mesianoToday['average'] = num_refill===0 ? 0 : ((parseInt(obj['total']*1.0)/num_refill)).toFixed(2);
    		}
		});
		let mesianoMonth = "";
		(this.state.monthData||[]).forEach(function(obj){ 
    		if(obj && obj['id_totem']==='2'){
    			mesianoMonth = obj;
    			let num_refill = parseInt(obj['num_refill']);
    			mesianoMonth['average'] = num_refill===0 ? 0 : ((parseInt(obj['total']*1.0)/num_refill)).toFixed(2);
    		}
		});

		 //T. Gar
    	let tgarToday = "";
    	(this.state.todayData||[]).forEach(function(obj){ 
    		if(obj && obj['id_totem']==='1'){
    			tgarToday = obj;
    			let num_refill = parseInt(obj['num_refill']);
    			tgarToday['average'] = num_refill===0 ? 0 : ((parseInt(obj['total']*1.0)/num_refill)).toFixed(2);
    		}
		});
		let tgarMonth = "";
		(this.state.monthData||[]).forEach(function(obj){ 
    		if(obj && obj['id_totem']==='1'){
    			tgarMonth = obj;
    			let num_refill = parseInt(obj['num_refill']);
    			tgarMonth['average'] = num_refill===0 ? 0 : ((parseInt(obj['total']*1.0)/num_refill)).toFixed(2);
    		}
		});

		var chartData = {
		    labels: [
		        "Povo",
		        "Mesiano",
		        "T. Gar"
		    ],
		    datasets: [
		        {
		            data: [povoMonth['total'], mesianoMonth['total'], tgarMonth['total']],
		            backgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#FFCE56"
		            ]
		        }]
		  };

  		// https://github.com/gor181/react-chartjs-2
  		let pieChart = (
  			<Pie data={chartData} />
  			//width={50}
  			    //height={50}
  			    //options={{
  			    //    maintainAspectRatio: false
  			    //}}
  		);

    	return (
			<div className="container">
			  <div className="row">
			    <div className="col-sm-6">
			    	<div className="totem-detail">
					    <img alt="totem-povo" className="img-responsive inline vcenter totem-image" src="image_placeholder.jpeg" />
					    <div className="block-inline vcenter">
					    	<div className="totem-name">Povo</div>
					    	<div className="data-details">
					    		<div className="totem-detail-title">Today</div>
					    		<div className="inner-data-details">
						    		<span>Total:</span> <span className="right totem-number-value">{povoToday===""? 0 : povoToday['total']}€</span><br />
					          		<span>Num. refill:</span> <span className="right totem-number-value">{povoToday===""? 0 : povoToday['num_refill']}</span><br />
					          		<span>Average:</span> <span className="right totem-number-value">{povoToday===""? 0 : povoToday['average']}€</span>
					    		</div>
					    	</div>
					    	<div className="data-details">
					    		<div className="totem-detail-title">This month</div>
					    		<div className="inner-data-details">
						    		<span>Total:</span> <span className="right totem-number-value">{povoMonth===""? 0 : povoMonth['total']}€</span><br />
					          		<span>Num. refill:</span> <span className="right totem-number-value">{povoMonth===""? 0 : povoMonth['num_refill']}</span><br />
					          		<span>Average:</span> <span className="right totem-number-value">{povoMonth===""? 0 : povoMonth['average']}€</span>
					    		</div>
					    	</div>
			          	</div>
		          	</div>
			    </div>
			    <div className="col-sm-6">
			      <div className="totem-detail">
					    <img  alt="totem-mesiano" className="img-responsive inline vcenter totem-image" src="image_placeholder.jpeg" />
					    <div className="block-inline vcenter">
					    	<div className="totem-name">Mesiano</div>
				    		<div className="data-details">
					    		<div className="totem-detail-title">Today</div>
					    		<div className="inner-data-details">
						    		<span>Total:</span> <span className="right totem-number-value">{mesianoToday===""? 0 : mesianoToday['total']}€</span><br />
					          		<span>Num. refill:</span> <span className="right totem-number-value">{mesianoToday===""? 0 : mesianoToday['num_refill']}</span><br />
					          		<span>Average:</span> <span className="right totem-number-value">{mesianoToday===""? 0 : mesianoToday['average']}€</span>
					    		</div>
					    	</div>
					    	<div className="data-details">
					    		<div className="totem-detail-title">This month</div>
					    		<div className="inner-data-details">
						    		<span>Total:</span> <span className="right totem-number-value">{mesianoMonth===""? 0 : mesianoMonth['total']}€</span><br />
					          		<span>Num. refill:</span> <span className="right totem-number-value">{mesianoMonth===""? 0 : mesianoMonth['num_refill']}</span><br />
					          		<span>Average:</span> <span className="right totem-number-value">{mesianoMonth===""? 0 : mesianoMonth['average']}€</span>
					    		</div>
					    	</div>
			          	</div>
		          	</div>
			    </div>
			  </div>
			  <div className="row">
			    <div className="col-sm-6">
			      <div className="totem-detail">
					    <img  alt="totem-gar" className="img-responsive inline vcenter totem-image" src="image_placeholder.jpeg" />
					    <div className="block-inline vcenter">
					    	<div className="totem-name">T. Gar</div>
				    		<div className="data-details">
					    		<div className="totem-detail-title">Today</div>
					    		<div className="inner-data-details">
						    		<span>Total:</span> <span className="right totem-number-value">{tgarToday===""? 0 : tgarToday['total']}€</span><br />
					          		<span>Num. refill:</span> <span className="right totem-number-value">{tgarToday===""? 0 : tgarToday['num_refill']}</span><br />
					          		<span>Average:</span> <span className="right totem-number-value">{tgarToday===""? 0 : tgarToday['average']}€</span>
					    		</div>
					    	</div>
					    	<div className="data-details">
					    		<div className="totem-detail-title">This month</div>
					    		<div className="inner-data-details">
						    		<span>Total:</span> <span className="right totem-number-value">{tgarMonth===""? 0 : tgarMonth['total']}€</span><br />
					          		<span>Num. refill:</span> <span className="right totem-number-value">{tgarMonth===""? 0 : tgarMonth['num_refill']}</span><br />
					          		<span>Average:</span> <span className="right totem-number-value">{tgarMonth===""? 0 : tgarMonth['average']}€</span>
					    		</div>
					    	</div>
			          	</div>
		          </div>
			    </div>
			    <div className="col-sm-6">
			      {pieChart}
			  	</div>  
			  </div>
			</div>
      	);
    };

}

export default TotemView;