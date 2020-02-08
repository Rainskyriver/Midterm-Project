require('dotenv').config();
var accountSid = process.env.TWILIO_ID; //  Account SID 
var authToken = process.env.AUTH_TOKEN;   //  Auth Token 

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

const sendMessage = () => {
    client.messages.create({
        body: 'Hello from command line',// "Text Message"
        to: '+12506824529',  // Text this number
        from: process.env.OFFICIAL_PHONE // TWILIO trial number
    })
    .then((message) => console.log(message.sid, "Message successfully sent!"));
}

module.exports = {
    sendMessage
}