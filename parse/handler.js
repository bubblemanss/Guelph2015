var array = [];  
var reader = require('./parser');
var strData =['street_address.csv','address_collection.csv','collection_schedule.csv','statutory_holidays.csv','schedule_type.csv','schedule_master.csv','waste_collection.csv','waste_program.csv'];
   
handler();

function handler() {

	var info = [];
	for (i = 0; i < strData.length; i++) {
		reader(__dirname+'/files/'+ strData[i],function(err, data){
			if (err){
				console.log(err);
			}
			else {
				array.push(data);
			}
			console.log(array.length);
		});
	}



}