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
                            holidayText(phoneNumber, message);
                        }
                    },
                    start:true
                });
    }
    catch(ex){
        console.log("bad");
    }
}

var holidayText = function(phoneNumber, message){
    twilio(phoneNumber, "Tomorrow is a holiday. No trash pickup!");
    setTimeout(twilio(phoneNumber, message), 86400000);
}

var cityText = function(phoneNumber, message){
    twilio(phoneNumber, message);
}

var weeklyEmail = function(garbageDay, emailAddress, message, holidays){
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
                    email(emailAddress, message);
                }
                else{
                    holidayEmail(emailAddress, message);
                }
            },
            start:true
        });
    }
    catch(ex) {
        console.log("bad");
    }
}

var holidayEmail = function(emailAddress, message){
    email(emailAddress, "Tomorrow is a holiday. No trash pickup!");
    setTimeout(email(emailAddress, message), 86400000);
}

var cityEmail = function(emailAddress, message){
    email(emailAddress, message);
}

module.exports = function(emailAddress, text, city){
    if(city){
        if(city.textValid){
            cityText(city.phoneNumber, city.message);
        }
        if(city.emailValid) {
            cityEmail(city.emailAddress, city.message);
        }
    }
    else {
        if(text){
            weeklyText(text.garbageDay, text.phoneNumber, text.message, text.holidays);
        }
        if(emailAddress){
            weeklyEmail(emailAddress.garbageDay, emailAddress.email, emailAddress.message, emailAddress.holidays);
        }
    }
}

