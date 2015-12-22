//<script src="//lightswitch05.github.io/table-to-json/javascripts/jquery.tabletojson.min.js"></script>

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

            var json = {name: "", dob: "", name_2: ""};

            // get player's name
            $('.SubnavSubsection').filter(function() {
                var data = $(this);
                name = data.text();
                json.name = name;
            });

            var info = $('.ciPlayerinformationtxt');

            // info
            var info2 = tabletojson.convert($(info))[0];
            console.log(info2);
            //delete testBatting['0'];
            //json.tests = testBatting;

            // // get player's name
            // $('.SubnavSubsection').filter(function() {
            //     var data = $(this);
            //     name = data.text();
            //     json.name = name;
            //     json.dob = "seventh";
            //     json.num_tests = "eighteen";
            // });

            // var info = $('.ciPlayerinformationtxt');

            // $(info).get(0).children.each(function(i, elem) {

            // });
            // console.log($(info).get(0).children.first-child);

            // $('.ciPlayerinformationtxt').each(function(i, elem) {
            //     console.log(elem.children.get(0).tagName)
            // });
            //console.log($('.ciPlayerinformationtxt').get(0).innerHTML);
            //console.log("found");

            // // get bio
            // $('.ciPlayerinformationtxt').filter(function() {
            //     var data = $(this);
            //     name_2 = $('ciPlayerinformationtxt').eq(0).children().text()
            //     //name_2 = data.eq(2).children().text();
            //     json.name_7 = name_2;
            // })
        }
        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
            console.log('output.json file successfully written!');
        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
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

            // test stats
            var testBatting = tabletojson.convert($(stats))[0][0];
            delete testBatting['0'];
            json.tests = testBatting;

            // ODI stats
            var odiBatting = tabletojson.convert($(stats))[0][1];
            delete odiBatting['0'];
            json.ODIs = odiBatting;

            // T20I stats
            var t20IBatting = tabletojson.convert($(stats))[0][2];
            delete t20IBatting['0'];
            json.T20Is = t20IBatting;

            // first-class stats
            var fcBatting = tabletojson.convert($(stats))[0][3];
            delete fcBatting['0'];
            json.firstClass = fcBatting;

            // List 'A' stats
            var listABatting = tabletojson.convert($(stats))[0][4];
            delete listABatting['0'];
            json.listA = listABatting;

            // Twenty20 stats
            var t20Batting = tabletojson.convert($(stats))[0][5];
            delete t20Batting['0'];
            json.twenty20 = t20Batting;
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

            // test stats
            var testBowling = tabletojson.convert($(stats))[1][0];
            delete testBowling['0'];
            json.tests = testBowling;

            // ODI stats
            var odiBowling = tabletojson.convert($(stats))[1][1];
            delete odiBowling['0'];
            json.ODIs = odiBowling;

            // T20I stats
            var t20IBowling = tabletojson.convert($(stats))[1][2];
            delete t20IBowling['0'];
            json.T20Is = t20IBowling;

            // first-class stats
            var fcBowling = tabletojson.convert($(stats))[1][3];
            delete fcBowling['0'];
            json.firstClass = fcBowling;

            // List 'A' stats
            var listABowling = tabletojson.convert($(stats))[1][4];
            delete listABowling['0'];
            json.listA = listABowling;

            // Twenty20 stats
            var t20Bowling = tabletojson.convert($(stats))[1][5];
            delete t20Bowling['0'];
            json.twenty20 = t20Bowling;
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){ 
            console.log('output.json file successfully written!');
        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')

    });

});


app.listen('8001')

console.log('Listening on port 8001');

exports = module.exports = app;


