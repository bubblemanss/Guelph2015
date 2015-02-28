    var fs = require('fs');
    var parse = require('csv-parse');
    var strData;
    
    var array = CSVReader(__dirname+'/files/collection_schedule.csv');
    
    //Function to read in CSV file
    function CSVReader(filePath){

        var parser = parse(function(err, data){
        console.log (data);
        //callback(err,arrayData);
        });

        fs.createReadStream(filePath).pipe(parser);
        //console.log(fs.createReadStream(filePath));
    }