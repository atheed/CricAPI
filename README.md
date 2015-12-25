# CricAPI

This is a REST API built entirely in Node.js that can be used to retrieve information on any player from the world's largest cricket website and database, [Cricinfo](http://www.espncricinfo.com/), and can also retrieve the latest scores in ongoing cricket matches. 

CricAPI can retrieve any player's basic bio information, batting statistics in all formats, and a bowling stats in all formats. This can be done purely through a player's unique *Cricinfo player ID* (the ID that appears in the URL of a player's info page on Cricinfo; if the URL is `http://www.espncricinfo.com/ci/content/player/26421.html`, then `26421` is the unique player ID).  

CricAPI is not an official Cricinfo API, and was simply something I built for fun in my free time. 

## Software Stack and Supporting Frameworks Used

1. Javascript
2. Node.js
    - [Express](http://expressjs.com/en/index.html)
    - [Request](https://github.com/request/request)
    - [Cheerio](https://github.com/cheeriojs/cheerio)
    - [tabletojson](https://www.npmjs.com/package/tabletojson)

##Prerequisites
All that is required to run CricAPI is [Node.js](https://nodejs.org/en/), with `npm` installed.

##Usage
To use the API, first clone/download this repo. Then, perform the following steps:

```
cd CricAPI
npm install
node server.js
```

This will start the CricAPI server, which can be queried to retrieve the required information. 

To query the API, first ensure that you have some cricketer's valid Cricinfo player ID (we will use `19296` as a sample, in this case).

Now, to obtain this player's **basic bio information**, go on to your favourite web browser, and enter the following into the URL bar, and hit enter:

```
http://localhost:8001/basicBio/19296
```

If you would like the player's **batting statistics**, run the following in your web browser (as above):

```
http://localhost:8001/battingStats/19296
```

Finally, if you would like to retrieve a player's **bowling statistics**, run the following, as above:

```
http://localhost:8001/bowlingStats/19296
```

Similarly, if you would like to retrieve this information through your own client (i.e. not through your browser, but through your own code), you can simply send a GET request to `server.js`, with the required data (that is, a valid **player's Cricinfo ID**), in the format described above (i.e. `/GETcall/PlayerID`). You will receive a response in the JSON format outlined below.

##JSON Response Format
Here, we outline (by example) the JSON response format for all of the GET calls described above. We will once again use the example of player `19296`. 

If we execute a `/basicBio` GET call for player `19296`, we will receive a response like this one:

```json
{
    "name": "Kevin Pietersen",
    "fullName": "Kevin Peter Pietersen",
    "dob": "June 27, 1980, Pietermaritzburg, Natal",
    "age": "35 years 181 days",
    "teams": "England, Deccan Chargers, Delhi Daredevils, Dolphins, Hampshire, ICC World XI, KwaZulu-Natal, Natal, Nottinghamshire, Royal Challengers Bangalore, St Lucia Zouks, Sunrisers Hyderabad, Surrey",
    "nicknames": "KP, Kelves, Kapes, Kev",
    "role": "Top-order batsman",
    "batting": "Right-hand bat",
    "bowling": "Right-arm offbreak",
    "playerHeight": "6 ft 4 in",
    "education": "Maritzburg College, University of SA"
}
```

Similarly, for a `/battingStats` GET call for player `19296`, we will receive a response like this one:

```json
{
    "name": "Kevin Pietersen",
    "tests": {
        "50": "35",
        "100": "23",
        "Mat": "104",
        "Inns": "181",
        "NO": "8",
        "Runs": "8181",
        "HS": "227",
        "Ave": "47.28",
        "BF": "13255",
        "SR": "61.72",
        "4s": "985",
        "6s": "81",
        "Ct": "62",
        "St": "0"
    },
    "ODIs": {
        "50": "25",
        "100": "9",
        "Mat": "136",
        "Inns": "125",
        "NO": "16",
        "Runs": "4440",
        "HS": "130",
        "Ave": "40.73",
        "BF": "5128",
        "SR": "86.58",
        "4s": "427",
        "6s": "77",
        "Ct": "40",
        "St": "0"
    },
    "T20Is": {
        "50": "7",
        "100": "0",
        "Mat": "37",
        "Inns": "36",
        "NO": "5",
        "Runs": "1176",
        "HS": "79",
        "Ave": "37.93",
        "BF": "831",
        "SR": "141.51",
        "4s": "119",
        "6s": "32",
        "Ct": "14",
        "St": "0"
    },
    "firstClass": {
        "50": "71",
        "100": "50",
        "Mat": "217",
        "Inns": "358",
        "NO": "26",
        "Runs": "16522",
        "HS": "355*",
        "Ave": "49.76",
        "BF": "",
        "SR": "",
        "4s": "",
        "6s": "",
        "Ct": "152",
        "St": "0"
    },
    "listA": {
        "50": "46",
        "100": "15",
        "Mat": "253",
        "Inns": "233",
        "NO": "34",
        "Runs": "8112",
        "HS": "147",
        "Ave": "40.76",
        "BF": "",
        "SR": "",
        "4s": "",
        "6s": "",
        "Ct": "85",
        "St": "0"
    },
    "twenty20": {
        "50": "22",
        "100": "3",
        "Mat": "139",
        "Inns": "134",
        "NO": "19",
        "Runs": "4038",
        "HS": "115*",
        "Ave": "35.11",
        "BF": "2973",
        "SR": "135.82",
        "4s": "372",
        "6s": "147",
        "Ct": "52",
        "St": "0"
    }
}
```

Finally, for a `/bowlingStats` GET call for player `19296`, we will receive a response like this one:

```json
{
    "name": "Kevin Pietersen",
    "tests": {
        "10": "0",
        "Mat": "104",
        "Inns": "58",
        "Balls": "1311",
        "Runs": "886",
        "Wkts": "10",
        "BBI": "3/52",
        "BBM": "4/78",
        "Ave": "88.60",
        "Econ": "4.05",
        "SR": "131.1",
        "4w": "0",
        "5w": "0"
    },
    "ODIs": {
        "10": "0",
        "Mat": "136",
        "Inns": "23",
        "Balls": "400",
        "Runs": "370",
        "Wkts": "7",
        "BBI": "2/22",
        "BBM": "2/22",
        "Ave": "52.85",
        "Econ": "5.55",
        "SR": "57.1",
        "4w": "0",
        "5w": "0"
    },
    "T20Is": {
        "10": "0",
        "Mat": "37",
        "Inns": "3",
        "Balls": "30",
        "Runs": "53",
        "Wkts": "1",
        "BBI": "1/27",
        "BBM": "1/27",
        "Ave": "53.00",
        "Econ": "10.60",
        "SR": "30.0",
        "4w": "0",
        "5w": "0"
    },
    "firstClass": {
        "10": "0",
        "Mat": "217",
        "Inns": "",
        "Balls": "6443",
        "Runs": "3760",
        "Wkts": "73",
        "BBI": "4/31",
        "BBM": "",
        "Ave": "51.50",
        "Econ": "3.50",
        "SR": "88.2",
        "4w": "",
        "5w": "0"
    },
    "listA": {
        "10": "0",
        "Mat": "253",
        "Inns": "",
        "Balls": "2390",
        "Runs": "2122",
        "Wkts": "41",
        "BBI": "3/14",
        "BBM": "3/14",
        "Ave": "51.75",
        "Econ": "5.32",
        "SR": "58.2",
        "4w": "0",
        "5w": "0"
    },
    "twenty20": {
        "10": "0",
        "Mat": "139",
        "Inns": "30",
        "Balls": "396",
        "Runs": "534",
        "Wkts": "17",
        "BBI": "3/33",
        "BBM": "3/33",
        "Ave": "31.41",
        "Econ": "8.09",
        "SR": "23.2",
        "4w": "0",
        "5w": "0"
    }
}
```

(**Note:** There may be varying amounts of information for any of these REST calls, depending on how much information is available to Cricinfo for a given player)

##License
[MIT License](https://opensource.org/licenses/MIT)