var hyperquest = require('hyperquest');
var cheerio = require('cheerio');
var concat = require('concat-stream');
var moment = require('moment');
var isNaN = require('lodash.isnan');

function parseMatchPage(url, callback) {
  var ret = {};

  var stream = hyperquest(url);

  stream.on('error', callback);

  stream.pipe(concat(function(data) {
    var $ = cheerio.load(data);

    ret.home = {};
    ret.away = {};

    ret.home.name = $('.opponent1 a').text();
    ret.away.name = $('.opponent2 a').text();

    ret.home.roster = [];
    ret.away.roster = [];

    var players = $('.opponent-left td.player');
    players.each(function(i, e) {
      var player = $('a', e).text();
      if (ret.home.roster.indexOf(player) > -1) {
        return;
      }
      ret.home.roster.push(player);
    });

    var players = $('.opponent-right td.player');
    players.each(function(i, e) {
      var player = $('a', e).text();
      if (ret.away.roster.indexOf(player) > -1) {
        return;
      }
      ret.away.roster.push(player);
    });

    ret.score1 = parseInt($('.vs .hidden').children().first().text(), 10);
    ret.score2 = parseInt($('.vs .hidden').children().last().text(), 10);

    ret.date = moment($('.datetime').text() + ' +0100', 'MMMM DD, YYYY at HH:mm ZZ').unix();

    var games = $('.match-game-tab-content');
    if (games.length) {
      ret.rounds = [];
    }
    games.each(function(i, e) {
      var home = parseInt($('.totals span.home.score', e).text(), 10);
      if (isNaN(home)) {
        return;
      }

      var round = ret.rounds[i] = {};
      round.home = home;
      round.away = parseInt($('.totals span.away.score', e).text(), 10);
    });

    if (!ret.rounds || !ret.rounds.length) {
      ret.rounds = null;
    }

    callback(null, ret);
  }));
}

module.exports = parseMatchPage;
