/**
 * Created by josh on 3/22/17.
 */
'use strict';

module.exports = function(app) {
    app.intent('AMAZON.CancelIntent', (req, res)=>{
        return res.say('Goodbye. Rock ya later!').shouldEndSession(true).send();
    });
};




