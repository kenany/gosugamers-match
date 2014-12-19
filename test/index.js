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
      home: {
        name: 'Team LDLC',
        roster: [
          'NBK',
          'shox',
          'SmithZz',
          'Happy-',
          'kioShiMa'
        ]
      },
      away: {
        name: 'fnatic',
        roster: [
          'flusha',
          'JW',
          'pronax',
          'olofmiester',
          'KRIMZ'
        ]
      },
      score1: 1,
      score2: 3,
      date: 1415548800,
      rounds: [
        {home: 9, away: 16},
        {home: 6, away: 16},
        {home: 19, away: 16},
        {home: 11, away: 16}
      ]
    });
  });
});

test('parses league match page', function(t) {
  t.plan(3);

  gosugamersMatch(url2, function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, {
      home: {
        name: 'Cloud 9',
        roster: [
          'Hai L9',
          'SnEaKyCaStRoO',
          'Balls',
          'Meteos',
          'LemonNation'
        ]
      },
      away: {
        name: 'Alliance LoL',
        roster: [
          'Nyph',
          'Shook',
          'Tabzz',
          'Froggen',
          'Wickd'
        ]
      },
      score1: 0,
      score2: 1,
      date: 1411808400
    });
  });
});