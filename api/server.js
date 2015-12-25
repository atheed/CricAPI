var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');
var parser = require('xml2json');
var app = express();

app.get('/basicBio', function(req, res) {
    // the function that some information retrieval will
    // happen in

    // url for virat kohli -- just for testing
    url = 'http://www.espncricinfo.com/ci/content/player/11728.html';
    //console.log(req.body.pid);

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters:
    // an error, response status code, and the html

    request(url, function(error, response, html) {
        // checking no errors occurred when request was made
        if(!error) {
            // use cheerio library on the returned html -- essentially gives us
            // jQuery functionality
            var $ = cheerio.load(html);

            var name;

            var json = {name: ""};

            // get player's name
            $('.SubnavSubsection').filter(function() {
                var data = $(this);
                name = data.text();
                json.name = name;
            });

            var info = $('.ciPlayerinformationtxt');

            var numBasicInfo = $(info).get().length;

            for(var index = 0; index < numBasicInfo; index++) {
                var label = $(info).get(index).children[0].children[0].data.trim();
                if (label === 'Full Name') {
                    json.fullName = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Born') {
                    json.dob = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Current age') {
                    json.age = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Major teams') {
                    var teamsChildren = $(info).get(index).children;
                    var teams = "";
                    for (var i = 0; i <= teamsChildren.length; i++) {
                        if(i % 2 === 1 && i !== teamsChildren.length) {
                            teams = teams + teamsChildren[i].next.children[0].data.trim() + " ";
                        }
                    } 
                    json.teams = teams.trim();
                } else if (label === 'Nickname') {
                    var nicknamesChildren = $(info).get(index).children;
                    var nicknames = "";
                    for (var i = 0; i <= nicknamesChildren.length; i++) {
                        if(i % 2 === 1 && i !== nicknamesChildren.length) {
                            nicknames = nicknames + nicknamesChildren[i].next.children[0].data.trim() + " ";
                        }
                    }
                    json.nicknames = nicknames.trim(); 
                } else if (label === 'Playing role') {
                    json.role = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Batting style') {
                    json.batting = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Bowling style') {
                    json.bowling = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Height') {
                    json.playerHeight = $(info).get(index).children[1].next.children[0].data.trim();
                } else if (label === 'Education') {
                    json.education = $(info).get(index).children[1].next.children[0].data.trim();
                } else {
                    continue;
                }
            }
        }

        // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
        //     console.log('output.json file successfully written!');
        // })

        // send JSON response
        res.send(json);
    })
});

app.get('/battingStats', function(req, res) {
    url = 'http://www.espncricinfo.com/ci/content/player/253802.html';

    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);
            var name;
            var json = {name: ""};
            // get player's name
            $('.SubnavSubsection').filter(function() {
                var data = $(this);
                name = data.text();
                json.name = name;
            });

            var stats = $('.engineTable');

            numFormats = tabletojson.convert($(stats))[0].length;

            for (var i = 0; i < numFormats; i++) {
                var batting = tabletojson.convert($(stats))[0][i];
                var format = batting['0'];
                delete batting['0'];
                if(format === "Tests") {
                    json.tests = batting;
                } else if(format === "ODIs") {
                    json.ODIs = batting;
                } else if(format === "T20Is") {
                    json.T20Is = batting;
                } else if(format === "First-class") {
                    json.firstClass = batting;
                } else if(format === "List A") {
                    json.listA = batting;
                } else if(format === "Twenty20") {
                    json.twenty20 = batting;
                } else {
                    break;
                }
            }
        }

        // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
        //     console.log('output.json file successfully written!');
        // })

        // send JSON response
        res.send(json);

    });

});


app.get('/bowlingStats', function(req, res) {
    url = 'http://www.espncricinfo.com/ci/content/player/253802.html';

    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);
            var name;
            var json = {name: ""};
            // get player's name
            $('.SubnavSubsection').filter(function() {
                var data = $(this);
                name = data.text();
                json.name = name;
            });

            var stats = $('.engineTable');

            numFormats = tabletojson.convert($(stats))[1].length;

            for (var i = 0; i < numFormats; i++) {
                var bowling = tabletojson.convert($(stats))[1][i];
                var format = bowling['0'];
                delete bowling['0'];
                if(format === "Tests") {
                    json.tests = bowling;
                } else if(format === "ODIs") {
                    json.ODIs = bowling;
                } else if(format === "T20Is") {
                    json.T20Is = bowling;
                } else if(format === "First-class") {
                    json.firstClass = bowling;
                } else if(format === "List A") {
                    json.listA = bowling;
                } else if(format === "Twenty20") {
                    json.twenty20 = bowling;
                } else {
                    break;
                }
            }
        }

        // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
        //     console.log('output.json file successfully written!');
        // })

        // send JSON response
        res.send(json);

    });

});

app.get('/liveScores', function(req, res) {
    url = 'http://static.cricinfo.com/rss/livescores.xml';
    request(url, function(error, response, html) {
        var json = parser.toJson(url); //returns a string containing the JSON structure by default
        console.log(json);
        res.send('Check your console!');
    });
});

app.listen('8001')

console.log('Listening on port 8001');

exports = module.exports = app;


