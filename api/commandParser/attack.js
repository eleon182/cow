var async = require('async');
var common = require('../common');
var navigation = require('../json/navigation');
var battleLog = require('../battleLog');
var userProfile = require('../userProfile');

module.exports = attack;

function attack(data, callback) {

    userProfile.getUser({
        noCreate: true,
        username: data.arg[0]
    }, function(err, response) {
        if (err) {
            return callback({
                error: 'Username not found.',
                code: 'userNotFound'
            });
        } else if (response.sector !== data.profile.sector) {
            return callback({
                error: 'That ship is not in the same sector',
                code: 'shipNotFound'
            });
        } else {

            performAttack(data, response, function(err, data) {

                return callback(null, data);
            });
        }
    });

}

function performAttack(user, defender, callback) {
    var compiledResponse = {};
    var attackDmg = randomizeAttack(user.profile.fighters);
    var defenseDmg = randomizeAttack(defender.fighters);
    compiledResponse.attackDmg = attackDmg;
    compiledResponse.defenseDmg = defenseDmg;
    compiledResponse.attackUsername = user.profile.username;
    compiledResponse.defenseUsername = defender.username;

    var loss;

    if (defender.shields < attackDmg) {
        compiledResponse.defenseShieldLost = defender.shields;

        attackDmg -= defender.shields;
        loss = defender.fighters - attackDmg;
        if (loss < 0) loss = 0;
        if (attackDmg > defender.fighters) attackDmg = defender.fighters;

        compiledResponse.defenseFtrLost = attackDmg;
        defender.shields = 0;
        defender.fighters = loss;
    } else {
        defender.shields -= attackDmg;
        compiledResponse.defenseShieldLost = attackDmg;
        compiledResponse.defenseFtrLost = 0;
    }

    if (user.profile.shields < defenseDmg) {
        compiledResponse.attackShieldLost = user.profile.shields;
        defenseDmg -= user.profile.shields;
        loss = user.profile.fighters - defenseDmg;
        if (loss < 0) loss = 0;
        if (defenseDmg > user.profile.fighters) defenseDmg = user.profile.fighters;
        compiledResponse.attackFtrLost = defenseDmg;

        user.profile.shields = 0;
        user.profile.fighters = loss;
    } else {
        user.profile.shields -= defenseDmg;
        compiledResponse.attackShieldLost = defenseDmg;
        compiledResponse.attackFtrLost = 0;
    }
    var rand;

    if (defender.fighters <= 0) {
        rand = Math.floor(Math.random() * (navigation.length - 2)) + 1;
        defender.sector = rand;
        compiledResponse.defenderDead = true;
        defender.fighters = 0;

        loss = defender.currency / 2;
        compiledResponse.defenderCurrencyLost = loss;

        user.profile.currency += loss;
        defender.currency -= loss;
    }
    if (user.profile.fighters <= 0) {
        rand = Math.floor(Math.random() * (navigation.length - 2)) + 1;
        user.profile.sector = rand;
        compiledResponse.attackDead = true;
        user.profile.fighters = 0;

        loss = user.profile.currency / 2;
        compiledResponse.attackCurrencyLost = loss;

        user.profile.currency -= loss;
        defender.currency += loss;
    }
    compiledResponse.attackFtrLeft = user.profile.fighters;
    compiledResponse.attackShieldLeft = user.profile.shields;

    compiledResponse.defenseFtrLeft = defender.fighters;
    compiledResponse.defenseShieldLeft = defender.shields;

    writeLog(compiledResponse);
    async.parallel([

            function(internalCallback) {
                userProfile.updatePostAttack(user.profile, function(err, results) {
                    internalCallback(err, results);
                });

            },
            function(internalCallback) {
                userProfile.updatePostAttack(defender, function(err, results) {
                    internalCallback(err, results);
                });
            }
        ],
        function(err, response) {
            callback(err, buildResponse(compiledResponse));
        });

}

function writeLog(results) {
    var attackResults = results.attackUsername + ' attacked ' + results.defenseUsername + ' for ' + results.attackDmg + ' damage and lost ' + results.attackFtrLost + ' fighters and ' + results.attackShieldLost + ' shields. ';
    if (results.attackDead) {
        attackResults += ' Attacker was killed and lost $' + results.attackCurrencyLost + '.';
    }
    var defenseResults = results.defenseUsername + ' defeneded against ' + results.attackUsername + ' for ' + results.defenseDmg + ' damage and lost ' + results.defenseFtrLost + ' fighters and ' + results.defenseShieldLost + ' shields. ';
    if (results.defenderDead) {
        defenseResults += ' Defender was killed and lost $' + results.defenderCurrencyLost + '.';
    }
    battleLog.log({
        username: results.attackUsername,
        text: attackResults
    });
    battleLog.log({
        username: results.defenseUsername,
        text: defenseResults
    });

}

function randomizeAttack(fighters) {
    return Math.floor(Math.random() * fighters);
}

function buildResponse(data) {
    var response = 'Battle results';
    response += '\n```';
    response += '\nUser: ' + data.attackUsername;
    response += '\nDamage: ' + data.attackDmg;
    response += '\nFighters lost: ' + data.attackFtrLost;
    response += '\nFighters left: ' + data.attackFtrLeft;
    response += '\nShields lost: ' + data.attackShieldLost;
    response += '\nShields left: ' + data.attackShieldLeft;
    if (data.attackDead) {
        response += '\nUser killed!';
        response += '\nCurrency lost: $' + common.moneyFormat(data.attackCurrencyLost);
    }
    response += '\n-----------------------';
    response += '\nUser: ' + data.defenseUsername;
    response += '\nDamage: ' + data.defenseDmg;
    response += '\nFighters lost: ' + data.defenseFtrLost;
    response += '\nFighters left: ' + data.defenseFtrLeft;
    response += '\nShields lost: ' + data.defenseShieldLost;
    response += '\nShields left: ' + data.defenseShieldLeft;
    if (data.defenderDead) {
        response += '\nUser killed!';
        response += '\nCurrency lost: $' + common.moneyFormat(data.defenderCurrencyLost);
    }
    response += '\n```';
    return response;
}
