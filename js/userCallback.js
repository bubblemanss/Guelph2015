function createUser(){
    var email = document.getElementById("usermail").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var streetNum = document.getElementById("streetNum").value;
    var streetName = document.getElementById("streetName").value;
    var postalCode = document.getElementById("postalCode").value;
    var phoneNum = document.getElementById("phoneNum").value;
    var sendEmail = document.getElementById("sendEmail").value;
    var sendText = document.getElementById("sendText").value;

    var url = "http://127.0.0.1:8080";

    var formData = {};
    formData.email = email;
    formData.password = password;
    formData.firstName = firstName;
    formData.lastName = lastName;
    formData.address = {
        streetNum : streetNum,
        streetName : streetName,
        postalCode : postalCode
    };
    formData.phoneNum = phoneNum;
    console.log(JSON.stringify(formData));
    jQuery.post(url, JSON.stringify(formData), function(data){
        console.log(data);
    })
}

function createMessage() {
    var message = document.getElementById("secretMessage").value;
    
    var url = "http://127.0.0.1:8080";
    console.log("form");

    var formData = {
        message : message,
        method : 'find'
    };

    console.log(JSON.stringify(formData));
    jQuery.post(url, JSON.stringify(formData), function(data){
        console.log(data);
    })
}