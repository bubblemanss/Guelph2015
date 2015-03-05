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
			for (var i = 0 ; i < array.length; i++){
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
	var addressID, scheduleCode, day;
	var arrayDate = [];
	var arrayType = [];
	var date = new Date();
	var i = -1, j=-1;
	var streetAddressBool= false;
	var scheduleCodeBool = false;

		while (!streetAddressBool){
			i++;
			//obtain streetaddress then flag the bool
			if (streetAddress.street_number[i] == address.streetNum && streetAddress.street_name[i] == address.streetName){
				addressID = streetAddress.address_id[i];
				streetAddressBool = true;
				
			//bool is set, move onto next grab
			while (!scheduleCodeBool){
				j++;
				//grab data for collection day and schedule code 
				if (addressCollection.address_id[j] == addressID){
					scheduleCode = addressCollection.schedule_code[j];
					day = addressCollection.collection_day_array[j];
					scheduleCodeBool = true;

					//check if flag is set
					if (scheduleCode){

						var thisMonth = date.getUTCMonth()+1;
						var thisDate = date.getUTCDate();
						var thisDay = date.getUTCDay() + 1;
						if (day.length > 2){//OR if addressCollection.split(';').length
							var dateTracker = thisDay-1; //Acts as a indicator of current day

							for (g = 0 ;g < (collectionSchedule.schedule_code).length; g++){
								var dateHolder = collectionSchedule.collection_date[g].split ('/') ;

								//To make sure the same day
								if (collectionSchedule.schedule_code[g] == scheduleCode && thisMonth == parseInt(dateHolder[1]) && parseInt(dateHolder[0]) == thisDate) {
									//If same day then we can properly proceed
									var templocation = g;
									//console.log (templocation);
									//starts from the location we left off at (only run like 40 times cause a month don't got more then that 31 days)
									for (w = templocation ; w < (collectionSchedule.schedule_code).length; w++)
									{

										var tempdateHolder = collectionSchedule.collection_date[w].split ('/') ;
											if (collectionSchedule.schedule_code[w] == scheduleCode && thisMonth== parseInt(tempdateHolder[1])){
												//adds dateTracker
												if (dateTracker == 7) dateTracker = 0;//reached end of the week
												dateTracker ++;

												// console.log ("Date Tracker of PROPER month : " + dateTracker);
												// console.log ("Current date in csv  : " + collectionSchedule.collection_date[w]);

												if (dateTracker != 7 && dateTracker != 1){//Not Sunday or Saturday
													//console.log (collectionSchedule.collection_date[w]);
													arrayDate.push(collectionSchedule.collection_date[w]);
													arrayType.push(collectionSchedule.program_code_array[w]);
												}
												// end of for loop you check to see if the array is good
											}
												if (w==(collectionSchedule.schedule_code).length-1){
													
													dateTracker = thisDay; //reset dateTracker
													//console.log ("dateTracker RESET VALUE : "+ dateTracker);
												if (arrayDate.length<1){
													for (m = 0 ; m < (collectionSchedule.schedule_code).length; m++){
															var dateHolder = collectionSchedule.collection_date[m].split ('/') ;
															if (collectionSchedule.schedule_code[m] == scheduleCode && thisMonth== parseInt(dateHolder[1]) && parseInt(dateHolder[0]) == thisDate) {
																var location = m;
																for (q = location + dateSpacing ; q < (location+40); q++)
																{
																	var tempdateHolder = collectionSchedule.collection_date[w].split ('/') ;
																	if (collectionSchedule.schedule_code[q] == scheduleCode && thisMonth + 1 == parseInt(tempdateHolder[1])){
																		//In the NEXT month
																		//console.log ("dateTracker for NONPROPER MONTH : " + dateTracker);
																		//console.log ("CURRENT CSV DATE FOR NONPROPER MONTH : " + collectionSchedule.collection_date[w]);
																		if (dateTracker == 7) dateTracker = 0;//reached end of the week
																		dateTracker ++;

																		if (dateTracker != 7 && dateTrack != 1){
																			arrayDate.push(collectionSchedule.collection_date[q]);
																			arrayType.push(collectionSchedule.program_code_array[q]);
																		}
																	}
																}
															}
														
														if (m==(collectionSchedule.schedule_code).length-1) {
															// console.log(arrayDate.length);
															// console.log(arrayType.length);
																callback(err, response(day, arrayDate, arrayType, statutoryHolidays.date));

														}
													
													}
												}
												else{
													// console.log(arrayDate.length);
													// console.log(arrayType.length);
													callback(err, response(day, arrayDate, arrayType, statutoryHolidays.date));
												}

											}

										
									}

								}
									
							}


						}
						else {
							var dateSpacing = Math.abs(thisDay - parseInt(day));
							for (k = 0 ; k < (collectionSchedule.schedule_code).length; k++){

								var dateHolder = collectionSchedule.collection_date[k].split ('/') ;
								if (collectionSchedule.schedule_code[k] == scheduleCode && thisMonth == parseInt(dateHolder[1]) && parseInt(dateHolder[0]) == thisDate) {
									
									for (w = k + dateSpacing ; w < (collectionSchedule.schedule_code).length; w+=7)
									{
										
										var tempdateHolder = collectionSchedule.collection_date[w].split ('/') ;
										if (collectionSchedule.schedule_code[w] == scheduleCode && thisMonth== parseInt(tempdateHolder[1])){
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
											if (collectionSchedule.schedule_code[m] == scheduleCode && thisMonth == parseInt(dateHolder[1]) && parseInt(dateHolder[0]) == thisDate) {
												
												for (w = m + dateSpacing ; w < (collectionSchedule.schedule_code).length; w+=7)
												{
													var tempdateHolder = collectionSchedule.collection_date[w].split ('/') ;
													if (collectionSchedule.schedule_code[w] == scheduleCode && thisMonth +1 == parseInt(tempdateHolder[1])){
														arrayDate.push(collectionSchedule.collection_date[w]);
														arrayType.push(collectionSchedule.program_code_array[w]);
													}
												}

											}
											
											if (m==(collectionSchedule.schedule_code).length-1) {
												// console.log(arrayDate.length);
												// console.log(arrayType.length);
												if (arrayDate.length < 7)
												{
													//console.log(arrayDate);
													callback(err, response(day, arrayDate, arrayType, statutoryHolidays.date));
												}

											}
										}
									}
									else{
										
										if (arrayDate.length < 7)
										{
											// console.log(arrayDate.length);
											// console.log(arrayType.length);
											
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