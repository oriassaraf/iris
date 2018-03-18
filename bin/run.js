'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'IIDSS2XM2546IZZNU4OS6526FXTJM3PA';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-329788960100-SIs4dB77B90bce6DNjWnL7je';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function () {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});