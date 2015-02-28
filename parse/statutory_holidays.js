
    var fs = require('fs');
    var parse = require('csv-parse');
    var strData;
    
    var array = CSVReader(__dirname+'/files/statutory_holidays.csv');

    //Function to read in CSV file
    function CSVReader(filePath , callback)
    {
        var parser = parse(function(err, data){
            console.log(data[2][0]);
            //callback(err, data);
    });

        fs.createReadStream(filePath).pipe(parser);
        
    }
