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
    formData.method = "create"
    formData.email = email;
    formData.password = password;
    formData.firstName = firstName;
    formData.lastName = lastName;
    formData.address = {
        streetNum : streetNum,
        streetName : streetName,
        postalCode : postalCode
    };
    formData.sendEmail = sendEmail;
    formData.sendText = sendText;
    formData.phoneNum = phoneNum;
    if (sendEmail == 'on'){
        sendEmail = true;
    } else {
        sendEmail = false;
    }
    if (sendText == 'on'){
        sendText = true;
    } else {
        sendText = false;
    }
    formData.sendEmail = sendEmail;
    formData.sendText = sendText;

    jQuery.post(url, JSON.stringify(formData), function(data){
        console.log('in');
        //if (data.status == "200"){
        //    alert("Account created!");
        //} else {
        //    alert("Creating account failed. Email in use");
        //}
    })
}

function createMessage() {
    var message = document.getElementById("secretMessage").value;
    
    var url = "http://127.0.0.1:8080";

    var formData = {
        message : message,
        method : 'find'
    };

    jQuery.post(url, JSON.stringify(formData), function(data){
        if (data.status == "200"){
            alert("Message sent!");
        } else {
            alert("Message failed.");
        }
    })
}