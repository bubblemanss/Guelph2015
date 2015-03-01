var array = [];  
var reader = require('./parser');
var strData =['street_address.csv','address_collection.csv','collection_schedule.csv','statutory_holidays.csv','schedule_type.csv','schedule_master.csv','waste_collection.csv','waste_program.csv'];
var statutory_holidays = require('./statutory_holidays');
var collection_schedule = require('./collection_schedule');
var address_collection = require('./address_collection');
var street_address = require('./street_address');
var waste_program = require('./waste_program');
var waste_collection = require('./waste_collection');
var schedule_master = require('./schedule_master');
var schedule_type = require ('./schedule_type');
var statutoryHolidays, addressCollection, collectionSchedule, streetAddress, wasteProgram, wasteCollection,scheduleMaster,scheduleType;   

handler();

function handler(){

	var info = [];
	for (i = 0; i < strData.length; i++) {
		reader(__dirname+'/files/'+ strData[i],function(err, data){
			if (err){
				console.log(err);
			}
			else {
				array.push(data);
			}


			setValue(data);
		});
	}
	console.log(scheduleType);
}

function setValue(data){

	if (data.length == 10){
		statutoryHolidays = statutory_holidays(data);
	}
	if (data.length == 6 ){
		wasteProgram = waste_program(data);	
	}
	if (data.length == 1096 ){
		collectionSchedule = collection_schedule(data);
	}
	if (data.length == 7){
		scheduleMaster = schedule_master(data);	
	}
	if (data.length == 4 ){
		scheduleType = schedule_type(data);
	}
	if (data.length == 45940 ){
		//Must account for address collection and street address
		if (data[0].length == 3){
			addressCollection = address_collection(data);
		}
		else {
			streetAddress = street_address(data);
		}
	}
	if (data.length == 9){
		wasteCollection = waste_collection(data);
	}
	
}