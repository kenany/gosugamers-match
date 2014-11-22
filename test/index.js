var gosugamersMatch = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var isPlainObject = require('lodash.isplainobject');

// why such long urls??
var url = 'http://www.gosugamers.net/counterstrike/tournaments/4767-fragbite-' +
          'masters-cs-go-season-3/1257-playoffs/4772-playoffs/matches/57218-' +
          'team-ldlc-vs-fnatic';

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(gosugamersMatch));
});

test('parses match page', function(t) {
  t.plan(12);

  gosugamersMatch(url, function(error, data) {
    t.ok(isPlainObject(data));
    t.equal(data.opponent1, 'Team LDLC');
    t.equal(data.opponent2, 'fnatic');
    t.equal(data.score1, 1);
    t.equal(data.score2, 3);
    t.equal(data.date, 1415548800);
    t.equal(data.round1.home, 9);
    t.equal(data.round1.away, 16);
    t.equal(data.round2.home, 6);
    t.equal(data.round2.away, 16);
    t.equal(data.round3.home, 19);
    t.equal(data.round3.away, 16);
  });
});