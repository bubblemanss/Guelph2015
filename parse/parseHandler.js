var array = [];  
var objArray = [];
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
var response = require ('./response');



module.exports = function(address, callback){
		reader(function(err, data){
			if (err){
				console.log(err);
			}
			else {
				array = data;
			}
			for (i = 0 ; i < array.length; i++){
				//To check if all the objects are defined
				objArray.push(setValue(data[i]));
					if (objArray.length == 8) {
						setReturnObj(address, callback, err);
					}
			}
		});
}

//function that sets the return obj
//By the time it gets into this function all csv objects are made
function setReturnObj (address, callback, err){
	var addressID;
	var scheduleCode;
	var day;
	var arrayDate = [];
	var arrayType = [];
	var date = new Date();
	for (i = 0 ; i < (streetAddress.street_number).length; i++){
		if (streetAddress.street_number[i] == address.streetNum && streetAddress.street_name[i] == address.streetName)
		{
			//console.log (streetAddress.address_id[i]);
			addressID = streetAddress.address_id[i];
			if (addressID){
				for (j = 0 ; j < (addressCollection.address_id).length; j++ ){
					if (addressCollection.address_id[j] == addressID){
						scheduleCode = addressCollection.schedule_code[j];
						day = addressCollection.collection_day_array[j];

						if (scheduleCode){
							var dateSpacing = Math.abs(date.getUTCDay()+1 - parseInt(day));
							for (k = 0 ; k < (collectionSchedule.schedule_code).length; k++){

								var dateHolder = collectionSchedule.collection_date[k].split ('/') ;
								if (collectionSchedule.schedule_code[k] == scheduleCode && date.getUTCMonth()+1== parseInt(dateHolder[1]) && parseInt(dateHolder[0]) == date.getUTCDate()) {
									for (w = k + dateSpacing ; w < (collectionSchedule.schedule_code).length; w+=7)
									{
										var tempdateHolder = collectionSchedule.collection_date[w].split ('/') ;
										if (collectionSchedule.schedule_code[w] == scheduleCode && date.getUTCMonth()+1== parseInt(tempdateHolder[1])){
											//console.log ("hey");
											arrayDate.push(collectionSchedule.collection_date[w]);
											arrayType.push(collectionSchedule.program_code_array[w]);
										}
									}
								}
								if (k==(collectionSchedule.schedule_code).length-1) {
									//checks for bad month
									if (arrayDate.length<1){
										for (m = 0 ; m < (collectionSchedule.schedule_code).length; m++){
											var dateHolder = collectionSchedule.collection_date[m].split ('/') ;
											if (collectionSchedule.schedule_code[m] == scheduleCode && date.getUTCMonth()+1== parseInt(dateHolder[1]) && parseInt(dateHolder[0]) == date.getUTCDate()) {
												for (w = m + dateSpacing ; w < (collectionSchedule.schedule_code).length; w+=7)
												{
													var tempdateHolder = collectionSchedule.collection_date[w].split ('/') ;
													if (collectionSchedule.schedule_code[w] == scheduleCode && date.getUTCMonth()+2 == parseInt(tempdateHolder[1])){
														arrayDate.push(collectionSchedule.collection_date[w]);
														arrayType.push(collectionSchedule.program_code_array[w]);
													}
												}
											}
											
											if (m==(collectionSchedule.schedule_code).length-1) {
												// console.log(arrayDate.length);
												// console.log(arrayType.length);
												if (arrayDate.length < 5)
												{
													console.log(arrayDate);
													(response(day, arrayDate, arrayType, statutoryHolidays.date));
												}

											}
										}
									}
									else{
										
										if (arrayDate.length < 6)
										{
											
											callback(err, response(day, arrayDate, arrayType, statutoryHolidays.date));
										}

									}
									
								}
							}

						}

					}

				}
			}
		}
	}
}




//Set all csv values depending on the data being passed in
function setValue(data){

	if (data.length == 10){
		statutoryHolidays = statutory_holidays(data);
		return statutoryHolidays;
	}
	if (data.length == 6 ){
		wasteProgram = waste_program(data);	
		return wasteProgram;
	}
	if (data.length == 1096 ){
		collectionSchedule = collection_schedule(data);
		return collectionSchedule;
	}
	if (data.length == 7){
		scheduleMaster = schedule_master(data);	
		return scheduleMaster;
	}
	if (data.length == 4 ){
		scheduleType = schedule_type(data);
		return scheduleType;
	}
	if (data.length == 45940 ){
		//Must account for address collection and street address
		if (data[0].length == 3){
			addressCollection = address_collection(data);
			return addressCollection;
		}
		else {
			streetAddress = street_address(data);
			return streetAddress;
		}
	}
	if (data.length == 9){
		wasteCollection = waste_collection(data);
		return wasteCollection;
	}
	
}