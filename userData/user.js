
module.exports = function(data){
    return {
        email:data['email'],
        password:data['password'],
        firstName:data['firstName'],
        lastName:data['lastName'],
        phoneNumber:data['phoneNumber'],
        address:data['address'],
        sendEmail:data['sendEmail'],
        sendText:data['sendText'],
        garbage:data['garbage']
    }
}