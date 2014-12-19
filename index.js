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

    ret.opponent1 = $('.opponent1 a').text();
    ret.opponent2 = $('.opponent2 a').text();

    ret.score1 = parseInt($('.vs .hidden').children().first().text(), 10);
    ret.score2 = parseInt($('.vs .hidden').children().last().text(), 10);

    ret.date = moment($('.datetime').text() + ' +0100', 'MMMM DD, YYYY at HH:mm ZZ').unix();

    var games = $('.match-game-tab-content');
    ret.rounds = [];
    games.each(function(i, e) {
      var home = parseInt($('.totals span.home.score', e).text(), 10);
      if (isNaN(home)) {
        return;
      }

      var round = ret.rounds[i] = {};
      round.home = home;
      round.away = parseInt($('.totals span.away.score', e).text(), 10);
    });

    callback(null, ret);
  }));
}

module.exports = parseMatchPage;