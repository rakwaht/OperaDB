import React from 'react';
import SingleCanteen from './SingleCanteen.js'

class CittaView extends React.Component {

	constructor(props) {
	    super(props);

      	this.state = {};

      	this.getDateOfISOWeek = this.getDateOfISOWeek.bind(this);
  		this.render = this.render.bind(this);
    };

    componentDidMount(){
    	let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		let yyyy = today.getFullYear();

    	//let link = '/3weeks_passaggi/' + yyyy + '/' + mm + '/' + dd;

    	// developing purpose
    	let link = '/3weeks_passaggi/2016/06/09';

        fetch(link) 
            .then((response) => {
                return response.json() })   
                    .then( (json) => {
                    	let firstWeek = -1;
                    	if(!json || json.length===0){
                    		return;
                    	}
                    	firstWeek = parseInt(json[0].week); // assuming there is something in the first week
                    	let first_start = this.getDateOfISOWeek(firstWeek, yyyy);
						let first_end=new Date(first_start.getFullYear(),first_start.getMonth(),first_start.getDate()+6)
						let second_start = this.getDateOfISOWeek(firstWeek+1, yyyy);
						let second_end=new Date(second_start.getFullYear(),second_start.getMonth(),second_start.getDate()+6)
						let third_start = this.getDateOfISOWeek(firstWeek+2, yyyy);
						let third_end=new Date(third_start.getFullYear(),third_start.getMonth(),third_start.getDate()+6)

						//
                    	// fill in default data
						//
						let defaultValue = {
							'intero' : '0',
                    		'snack2' : '0',
                    		'snack1' : '0',
                    		'ridotto' : '0',
                    		'pasto_lesto' : '0'
						}
                    	let data = {};
                    	data['tgar'] = {
                    		'0' : {'weekStart' : first_start, 'weekEnd' : first_end, 'weekNumber' : firstWeek, 'value' : defaultValue}, 
            				'1' : {'weekStart' : second_start, 'weekEnd' : second_end, 'weekNumber' : firstWeek+1, 'value' : defaultValue}, 
            				'2' : {'weekStart' : third_start, 'weekEnd' : third_end, 'weekNumber' : firstWeek+2, 'value' : defaultValue}
                    	};
                    	data['24maggio'] = {
                    		'0' : {'weekStart' : first_start, 'weekEnd' : first_end, 'weekNumber' : firstWeek, 'value' : defaultValue}, 
            				'1' : {'weekStart' : second_start, 'weekEnd' : second_end, 'weekNumber' : firstWeek+1, 'value' : defaultValue}, 
            				'2' : {'weekStart' : third_start, 'weekEnd' : third_end, 'weekNumber' : firstWeek+2, 'value' : defaultValue}
                    	};
                    	(json||[]).forEach(function(obj){ 
				    		if(obj && obj['mensa']==='Mensa Via 24 Maggio'){ 
                    			let week_number = parseInt(obj['week']);
                    			let key = (week_number - firstWeek).toString();
                    			data['tgar'][key]['value'] = obj;
				    		}
				    		else if(obj && obj['mensa']==='Mensa Via Tomaso Gar'){ 
                    			let week_number = parseInt(obj['week']);
                    			let key = (week_number - firstWeek).toString();
                    			data['24maggio'][key]['value'] = obj;
				    		}
						});

                        this.setState({data: data});

                    });


    };

    getDateOfISOWeek(w, y) {
	    var simple = new Date(y, 0, 1 + (w - 1) * 7);
	    var dow = simple.getDay();
	    var ISOweekStart = simple;
	    if (dow <= 4)
	        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	    else
	        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	    return ISOweekStart;
	}

    render() {

        let toBeRendered = "";
        if(this.state.data){
        	toBeRendered = (
			  <div className="row">
			    <div className="col-sm-6">
			    	<SingleCanteen 
			    		canteenName="Mensa Via Tomaso Gar"
			    		data={this.state.data['tgar']}
			    	/>
			    </div>
			    <div className="col-sm-6">
			    	<SingleCanteen 
			    		canteenName="Mensa Via 24 Maggio"
			    		data={this.state.data['24maggio']}
			    	/>
			    </div>
			  </div>
    		);
        }

    	return (
			<div className="container">
				{toBeRendered}
			</div>
      	);
    };

}

export default CittaView;