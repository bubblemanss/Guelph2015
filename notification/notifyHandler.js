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

var cityText = function(phoneNumbers, message){
    phoneNumbers.forEach(function(entry){
        twilio(entry, message);
    });
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

var cityEmail = function(emailAddresses, message){
    emailAddresses.forEach(function(entry){
        email(entry, message);
    });
}

module.exports = function(emailAddress, text, city){
    if(city){
        if(city.textValid){
            cityText(city.phoneNumbers, city.message);
        }
        cityEmail(city.emailAddresses, city.message);
    }
    else {
        if(text.valid){
            weeklyText(text.garbageDay, text.phoneNumber, text.message, text.holidays);
        }
        if(emailAddress.valid){
            weeklyEmail(emailAddress.garbageDay, emailAddress.emails, emailAddress.message, emailAddress.holidays);
        }
    }
}

