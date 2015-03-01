var url = "http://127.0.0.1:8080"

function createUser(formData){
    //data you post should look lik {firstName:"Bob", lastName:"Smith", other:"..."}
    jQuery.post(url, formData, function(data){
        //I'll be returning success or fail message.
        //If status code is 200, it's success
        //If it's 404, it's fail
    });
}

function loginUser(loginData){
    //data you post should look lik {email:"Bob", password:"Smith"}
    jQuery.post(url, loginData, function(data){
        //I'll be returning the user data
        //If status code is 200, it returns valid data
        //If status code is 404, it couldn't find the user
    });
}

function editUser(user){
    //data you post should look lik {firstName:"Bob", lastName:"Smith", other:"..."}
    // or the ID I've given you, the ID I'm still debating if I should return or not
    jQuery.post(url, user, function(data){
        //I'll be returning the user data
        //This should always work since it's supposed to be used after they log in
    });
}