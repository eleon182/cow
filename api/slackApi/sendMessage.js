// 3rd party dependencies
var debug = require('debug')('main');
var q = require('q');

// private dependencies
var common = require('../common');
var config = require('./content/config');

module.exports = {
    sendMessage: sendMessage
};

function sendMessage(params, callback) {
    if (params.text) {
        var httpSettings = {
            path: constructUrl(params, config),
            host: config.basic.host,
            method: 'GET',
        };
        return common.httpService.httpCall(httpSettings);
    } else {
        return q.reject();
    }
}

function constructUrl(params, config) {
    var tmp = {
        token: params.token || config.basic.token,
        channel: params.username || params.channel || config.basic.channel,
        username: config.basic.username,
    };
    var url = config.basic.url + '?token=' + tmp.token + '&username=' + encodeURIComponent(tmp.username) + '&channel=' + encodeURIComponent(tmp.channel) + '&pretty=1&text=';
    if (params.noBlock) {
        url += encodeURIComponent('`' + params.text + '`');
    } else {
        url += encodeURIComponent('```' + params.text + '```');
    }
    return url;
}
