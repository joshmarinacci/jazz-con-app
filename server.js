'use strict';

const AlexaAppServer = require('alexa-app-server');

let server = new AlexaAppServer({
    port: process.env.PORT,
    server_root: __dirname,
    app_dir: 'app',
    app_root: '/alexa/',
    public_html: 'public',
    verify: false
    // debug: false
});

server.start();

/*

function sendIt() {
    console.log("doing a publish");
    pubnub.publish({
            channel: 'cook-message',
            message: {
                //"original": "tell me a joke",
                "original":"What is quartz?",
                "originalLanguage": "english"
            }
        },
        function(status, response) {
            console.log("published", status, response);
        }
    );
}


console.log("listening to ");
pubnub.addListener({
    status: function(statusEvent) {
        console.log("status event", statusEvent);
        if (statusEvent.category === "PNConnectedCategory") {
            setTimeout(sendIt,1000);
        }
    },
    message: function(message) {
        console.log("New Message!!", message);
    },
    presence: function(presenceEvent) {
        // handle presence
    }
});
console.log("Subscribing..");
pubnub.subscribe({
    channels: ['cook-message','chatbot-response']
});
*/

