

var parseHandler = require('./parseHandler');
var address = {
	streetNum : '17',
	streetName : 'WILKIE CRES'

}
var csvObjects = [];
parseHandler(address, function(err, data){
    if(!err){
        console.log(data.garbage);
        console.log('---------------------------------------');
        console.log(data.dayOfWeek);
        console.log('---------------------------------------');
        console.log(data.holidays);
    }
    else{
        console.log(err);
    }
});