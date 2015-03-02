var twilio = require("./twilio");
var email = require("./email");
var cronJob = require("cron").CronJob;
var job;

var weeklyText = function(garbageDay, phoneNumber, message, holidays){
    try {
        job = new cronJob({
                    cronTime:"0 0 18 * * "+garbageDay,
                    onTick:function(){
                        var check = false;
                        var date = new Date();

                        holidays.forEach(function(entry){
                            if(entry.month == date.getMonth() && entry.day == date.getDate()){
                                check = true;
                            }
                        });

                        if(!check){
                            twilio(phoneNumber, message);
                        }
                        else{
                            holidayText(phoneNumber);
                        }
                    },
                    start:true
                });
    }
    catch(ex){
        console.log("bad");
    }
}

var holidayText = function(phoneNumber){
    twilio(phoneNumber, "Tomorrow is a holiday. No trash pickup!");
}

var cityText = function(){

}

module.exports = function(){

}
