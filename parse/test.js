

var parseHandler = require('./parseHandler');
var address = {
	streetNum : '26',
	streetName : 'WHITE PINE WAY'

}
var csvObjects = [];
parseHandler(address, function(err, data){
    if(!err){
        console.log(data.garbage);
    }
    else{
        console.log(err);
    }
});