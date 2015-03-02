var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var subjectLine;
var emailBody;

//generate OAuth2 token
var generator = require('xoauth2').createXOAuth2Generator({
    user: 'guelph.trashschedule@gmail.com',
    clientId: '79536447689-nv9a79oab7fp1dil3hshsfo3k00ok7al.apps.googleusercontent.com',
    clientSecret: 'XtRmB2ifzp51kpyZP1QSN0KD',
    refreshToken:"1/fETOwhkQDeX7gfYvZl_2n41MPYLLX1Cvp3quaJBdr9A"
})

//Listen for token updates
generator.on('token', function(token){
    console.log('New token for %s: %s',token.user, token.accessToken);
});


// create reusable transporter object using SMTP transport
var transport = nodemailer.createTransport(smtpPool({
    service: 'gmail',
    auth: {
        xoauth2: generator
    },
    maxConnections: 20,
    maxMessages: Infinity
}));

module.exports = function (email, message){
    subjectLine = 'GARBAGE COLLECTION REMINDER!';

    //setup e-mail data
    transport.sendMail({
        from: 'guelph.trashschedule@gmail.com',
        to: email,
        subject: subjectLine,
        text: message,
        attachments:[
            {
                filename: 'ECE290_Notes.pdf',
                path: 'C:/Users/Malcom/Documents/Competitions/Guelph/First One/ECE290_Notes.pdf'
            }
        ]
    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Message sent : " + response.message);
        }
        transport.close();
    });
}