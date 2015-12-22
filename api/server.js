var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');
var app = express();

app.get('/basicBio', function(req, res) {
    // the function that some information retrieval will
    // happen in

    // url for virat kohli -- just for testing
    url = 'http://www.espncricinfo.com/ci/content/player/253802.html';

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

            var name, dob, name_2;

            var json = {name: ""};

            // get player's name
            $('.SubnavSubsection').filter(function() {
                var data = $(this);
                name = data.text();
                json.name = name;
            });

            var info = $('.ciPlayerinformationtxt');

            json.fullName = $(info).get(0).children[1].next.children[0].data;

            json.dob = $(info).get(1).children[1].next.children[0].data.trim();

            json.age = $(info).get(2).children[1].next.children[0].data.trim();

            // build list of teams player has played for
            var teamsChildren = $(info).get(3).children;
            var teams = "";
            for (var i = 0; i <= teamsChildren.length; i++) {
                if(i % 2 === 1 && i !== teamsChildren.length) {
                    teams = teams + teamsChildren[i].next.children[0].data.trim() + " ";
                }
            }

            json.teams = teams.trim();

            json.role = $(info).get(4).children[1].next.children[0].data.trim();

            json.batting = $(info).get(5).children[1].next.children[0].data.trim();

            json.bowling = $(info).get(6).children[1].next.children[0].data.trim();

        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
            console.log('output.json file successfully written!');
        })

        res.send('Check your console!')
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

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
            console.log('output.json file successfully written!');
        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')

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

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
            console.log('output.json file successfully written!');
        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')

    });

});

app.get('/liveScores', function(req, res) {
    url = 'http://static.cricinfo.com/rss/livescores.xml';
    request(url, function(error, response, html) {
        res.send('Check your console!');
    });
});

app.listen('8001')

console.log('Listening on port 8001');

exports = module.exports = app;


