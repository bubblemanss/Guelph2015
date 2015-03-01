    var fs = require('fs');
    var parse = require('csv-parse');
    var strData =['street_address.csv','address_collection.csv','collection_schedule.csv','statutory_holidays.csv','schedule_type.csv','schedule_master.csv','waste_collection.csv','waste_program.csv'];
    var array = [];    
    //Function to read in CSV file
    module.exports = function(callback){
    	for (i = 0 ; i < strData.length ; i++){
	        var parser = parse(function(err, data){
				if (err){
					console.log(err);
				}
				else {
					array.push(data);
					if (array.length == 8) callback(err, array);
				}		
			});
	        fs.createReadStream(__dirname+'/files/'+ strData[i]).pipe(parser);
		 }
    }
 