    var fs = require('fs');
    var parse = require('csv-parse');
    var strData =['street_address.csv','address_collection.csv','collection_schedule.csv','statutory_holidays.csv','schedule_type.csv','schedule_master.csv','waste_collection.csv','waste_program.csv'];
    var array = [];    
    //Function to read in CSV file
    module.exports = function(filepath, callback){
        var parser = parse(callback);
        fs.createReadStream(filepath).pipe(parser);
    }
 