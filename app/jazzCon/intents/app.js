'use strict';
const makeCard = require('./lib/makeCard.js'),
    //ronSwansonApi = require('./lib/ronSwansonApi.js'),
    _ = require('lodash');

/**
  * Watercooler contains all of the custom and built in intents we are using for the skill.
**/

var PubNub = require('pubnub');

var pubnub = new PubNub({
    publishKey:"pub-c-91ff2cc0-42ff-4783-abfd-e6283ff5348b",
    subscribeKey:"sub-c-b89ea32a-79f1-11e6-9195-02ee2ddab7fe",
});
console.log("listening to ");
var cb = null;
pubnub.addListener({
    status: function(statusEvent) {
        console.log("status event", statusEvent);
        if (statusEvent.category === "PNConnectedCategory") {
            //setTimeout(sendIt,1000);
        }
    },
    message: function(message) {
        console.log("New Message!!", message);
        if(cb) cb(message);
    },
    presence: function(presenceEvent) {
        // handle presence
    }
});
console.log("Subscribing..");
pubnub.subscribe({
    channels: ['chatbot-response']
});


function askMrRockbot(name) {
    return new Promise((res,rej)=>{
        console.log("sending a publish");
        cb = (m) => {
            var mm = m.message.response;
            console.log("got the message", mm);
            cb = null;
            res(mm);
        };

        if(name) {
            pubnub.publish({
                    channel: 'cook-message',
                    message: {
                        //"original": "tell me a joke",
                        "original": `What is ${name}?`,
                        "originalLanguage": "english"
                    }
                },
                function (status, response) {
                    //console.log("published", status, response);
                });
        } else {
            pubnub.publish({
                    channel: 'cook-message',
                    message: {
                        "original": "tell me a joke",
                        "originalLanguage": "english"
                    }
                },
                function (status, response) {
                    //console.log("published", status, response);
                });
        }
    });
}

let jazzCon = function (app) {
    app.makeCard = makeCard;
    //app.ronSwansonApi = ronSwansonApi;
    // app.audiofiles = audiofiles;
    app._ = _;

    /**
     * app.pre is run before every request.
     */
    // app.pre = function (request) {
    //
    // };


    /**
     *  Custom Intents:
     *      launch
     *      getRonSwansonQuote
     *      audioPlayer
     **/
    require('./customIntents/launch.js')(app);
    require('./amazonIntents/cancel')(app);
    //require('./customIntents/ronSwansonQuote.js')(app);

    app.intent('joke', (request, response) => {
        return askMrRockbot().then((ans)=>{
            console.log("doing the joke");
            app.makeCard("a joke", response);
            return response.say(ans.text)
                .shouldEndSession(false, 'Should I look up something else?')
                .send();
        });
    });

    app.intent('lookup', {
        slots: { NAME: 'NAME' }
    }, (request, response) => {
        let name = request.slot('NAME');
        return askMrRockbot(name).then((ans)=>{
            console.log("doing the lookup");
            app.makeCard(name, response);
            return response.say(ans.text)
                .shouldEndSession(false, 'Should I look up something else?')
                .send();
        });
    });



    /**
     *  Amazon built-in intents:
     *      AMAZON.NextIntent,
     *      AMAZON.PauseIntent,
     *      AMAZON.ResumeIntent,
     *      AMAZON.StopIntent,
     *      AMAZON.CancelIntent
     *      AMAZON.HelpIntent
     **/


};

module.exports = jazzCon;
