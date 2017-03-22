'use strict';

let init = function (app) {
    app.launch(function (request, response) {
        response.say('this is my silly test thing');
        response.shouldEndSession(false, 'What did you say?').send();
    });
};

module.exports = init;
