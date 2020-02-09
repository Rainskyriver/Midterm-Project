require('dotenv').config();

var accountSid = process.env.TWILIO_ID; //  Account SID 
var authToken = process.env.AUTH_TOKEN;   //  Auth Token 

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

const sendMessage = (phoneNumber) => {
    client.messages.create({
        body: 'Were cookin!', // "Text Message"
        to: `+1${phoneNumber}`,  // Text this number
        from: process.env.OFFICIAL_PHONE // TWILIO trial number
    })
    .then((message) => console.log(message.sid, "Message successfully sent!"));
}

module.exports = {
    sendMessage
}