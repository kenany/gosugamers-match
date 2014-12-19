var gosugamersMatch = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var isPlainObject = require('lodash.isplainobject');

// why such long urls??
var url = 'http://www.gosugamers.net/counterstrike/tournaments/4767-fragbite-' +
          'masters-cs-go-season-3/1257-playoffs/4772-playoffs/matches/57218-' +
          'team-ldlc-vs-fnatic';

var url2 = 'http://www.gosugamers.net/lol/tournaments/4731-2014-world-' +
           'championship/1245-group-stage/4735-group-d/matches/55832-cloud-9-' +
           'vs-alliance-lol';

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(gosugamersMatch));
});

test('parses match page', function(t) {
  t.plan(3);

  gosugamersMatch(url, function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, {
      opponent1: 'Team LDLC',
      opponent2: 'fnatic',
      score1: 1,
      score2: 3,
      date: 1415548800,
      round1: {
        home: 9,
        away: 16
      },
      round2: {
        home: 6,
        away: 16
      },
      round3: {
        home: 19,
        away: 16
      },
      round4: {
        home: 11,
        away: 16
      }
    });
  });
});

test('parses league match page', function(t) {
  t.plan(7);

  gosugamersMatch(url2, function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.equal(data.opponent1, 'Cloud 9');
    t.equal(data.opponent2, 'Alliance LoL');
    t.equal(data.score1, 0);
    t.equal(data.score2, 1);
    t.equal(data.date, 1411808400);
  });
});