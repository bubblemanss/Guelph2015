function createUser(event){

    //console.log('in');
    //console.log(JSON.stringify(event));
    //event.preventDefault();

    if (localStorage.getItem('data') != null){
    	var userData = JSON.parse(localStorage.getItem('data'));
    	document.getElementById("usermail").innerHTML = userData.email;
    	document.getElementById("password").innerHTML = userData.password;
    	document.getElementById("firstName").innerHTML = userData.firstName;
    	document.getElementById("lastName").innerHTML = userData.lastName;
    	document.getElementById("streetNum").innerHTML = userData.address.streetNum;
    	document.getElementById("streetName").innerHTML = userData.address.streetName;
    	document.getElementById("postalCode").innerHTML = userData.address.postalCode;
    	if(userData.phoneNum) {document.getElementById("phoneNum").innerHTML = userData.phoneNum;}
    	document.getElementById("sendEmail").innerHTML = userData.sendEmail;
    	document.getElementById("sendText").innerHTML = userData.sendText;
    }

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

    jQuery.ajax({
        type:"POST",
        url:url,
        data:JSON.stringify(formData),
        dataType:"json"
    }).done(
        function(data){
            alert(data.message);
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        }
    );
}

function createMessage() {
    event.preventDefault();

    var message = document.getElementById("secretMessage").value;

    var url = "http://127.0.0.1:8080";

    var formData = {
        message : message,
        method : 'find'
    };

    jQuery.ajax({
        type:"POST",
        url:url,
        data:JSON.stringify(formData),
        dataType:"json"
    }).done(
        function(data){
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        }
    );
}

function login(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var url = "http://127.0.0.1:8080";

    var formData = {
        email : email,
        password : password
    };

    jQuery.ajax({
        type:"POST",
        url:url,
        data:JSON.stringify(formData),
        dataType:"json"
    }).done(
        function(data){
            localStorage.setItem("data", JSON.stringify(data));
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        }
    );
}