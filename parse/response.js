    module.exports= function (dayofweek, date, colour, holidays){
        return {
            dayOfWeek: dayofweek,
            garbage: returnGarbage(date, colour),
            holidays: returnHolidayDate(holidays)
        }
    }

    function returnGarbage (date, colour) {
        var garbageData = {};
        garbageData.dates = returnDate(date);
        garbageData.colours = returnColours(colour);
        //console.log (garbageData);
        return garbageData;
    }

    function returnDate (date) {
        var dateData = {};
        var dayArray = [];
        var monthArray = [];
        
        for (i = 0 ; i < date.length ; i++){
            //var gan = date[i].split('/');
            
            dayArray.push ((date[i].split('/'))[0]);
            monthArray.push ((date[i].split('/'))[1]);
            if (dayArray.length == date.length && monthArray.length == date.length ){
                dateData.day = dayArray;
                dateData.month = monthArray;
                if (dateData.day == dayArray && dateData.month == monthArray){
                    //console.log (dateData);
                    return dateData;
                }
            }
        }
    }

    function returnHolidayDate (date) {
        var holidayArray = [];
        var dayArray = [];
        var monthArray = [];

        for (var i = 1 ; i < date.length ; i++){

            var dateData = {};
            dateData.day = ((date[i][0].split('/'))[0]);
            dateData.month = ((date[i][0].split('/'))[1]);
            //console.log (holidayArray);
            holidayArray.push (dateData);

            if (holidayArray.length == date.length-1)
            {
                return holidayArray;
            }
        }
    }

    function returnColours (colour) {
        var colourArray = [];
        for (i = 0 ; i < colour.length ; i++){
            
            colour[i] =colour[i].replace('L', 'X');
            colour[i] =colour[i].replace('O', 'G');
            colour[i] =colour[i].replace('R', 'B');
            colour[i] = (colour[i].replace('S', 'X'));
            
            colourArray.push(colour[i].split(';'));
           
            if (colourArray.length == colour.length){
                //console.log (colourArray);
                return colourArray;
            }
        }
    }