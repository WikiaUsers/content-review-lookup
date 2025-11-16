//Loads the rotating content on the front page dynamically to avoid caching.
if (mw.config.get('wgPageName')=== "Let_It_Die_Wiki"){
    mw.loader.using('mediawiki.api').then(function() {
        // Get the current date, day, and hour (UTC) once for use in all the switches
        var currentDate = new Date();
        var currentDay = currentDate.getUTCDay();
        var currentHour = currentDate.getUTCHours();

        var api = new mw.Api();
        
        // Get the weekly quests, reset on Mondays at 10 am
        if(document.getElementById("rotatingWeekly")){
            var weekly;
            var weeklyTime = Math.floor(Date.now() / 604800000) % 4;

            // if it's before Monday at 10 am (UTC), subtract 1. This effectively sets the week to start at that time.
            if(currentDay == 0 || (currentDay == 1 && currentHour<10)){
                weeklyTime -= 1;
            }

            //decide which template to use based on weeklyTime
            switch(weeklyTime) {
                case 0:
                    weekly = "{{BlackThunderWeek}}"
                    break;
                case 1:
                    weekly = "{{PaleWindWeek}}"
                    break;
                case 2:
                    weekly = "{{WhiteSteelWeek}}"
                    break; 
                case 3:
                case -1:
                    weekly = "{{RedNapalmWeek}}"
                    break;
            }

            api.get({
                //get the parsed contents of the template
                action: 'parse',
                text: weekly,
                disablelimitreport: true,
                contentmodel: 'wikitext',
                wrapoutputclass: ''
            }).then(function(data) {
                //find an element with id "rotatingWeekly" and replace its contents with the chosen template
                var weeklyNode = document.getElementById("rotatingWeekly");
                weeklyNode.innerHTML = data.parse.text['*'];
            });
        }

        // Get the weekly Hernia, reset on Thursdays at 10 am
        if(document.getElementById("rotatingHernia")){
            var hernia;
            var herniaTime = Math.floor(Date.now() / 604800000) % 5;

            // if it's before Thursday at 10 am (UTC), subtract 1. This effectively sets the week to start at that time.
            if(currentDay < 4 || (currentDay == 4 && currentHour<10)){
                herniaTime -= 1;
            }

            //decide which template to use based on herniaTime
            switch(herniaTime) {
                case 0:
                    hernia = "{{HerniaBP4}}"
                    break;
                case 1:
                    hernia = "{{HerniaBP5}}"
                    break;
                case 2:
                    hernia = "{{HerniaBP1}}"
                    break; 
                case 3:
                    hernia = "{{HerniaBP2}}"
                    break; 
                case 4:
                case -1:
                    hernia = "{{HerniaBP3}}"
                    break;
            }

            api.get({
                //get the parsed contents of the template
                action: 'parse',
                text: hernia,
                disablelimitreport: true,
                contentmodel: 'wikitext',
                wrapoutputclass: ''
            }).then(function(data) {
                //find an element with id "rotatingHernia" and replace its contents with the template
                var herniaNode = document.getElementById("rotatingHernia");
                herniaNode.innerHTML = data.parse.text['*'];
            });
        }

        // Get the weekly chargers, reset Thursdays at 10 am
        if(document.getElementById("rotatingChargers")){
            var charger;
            var chargerTime = Math.floor(Date.now() / 604800000) % 2;

            // if it's before Thursday at 10 am (UTC), subtract 1. This effectively sets the week to start at that time.
            if(currentDay < 4 || (currentDay == 4 && currentHour<10)){
                chargerTime -= 1;
            }

            //decide which template to use based on chargerTime
            switch(chargerTime) {
                case 0:
                    charger = "{{Chargers2}}"
                    break;
                case 1:
                case -1:
                    charger = "{{Chargers1}}"
                    break;
            }

            api.get({
                //get the parsed contents of the template
                action: 'parse',
                text: charger,
                disablelimitreport: true,
                contentmodel: 'wikitext',
                wrapoutputclass: ''
            }).then(function(data) {
                //find an element with id "rotatingChargers" and replace its contents with the template
                var chargerNode = document.getElementById("rotatingChargers");
                chargerNode.innerHTML = data.parse.text['*'];
            });
        }

        // Get the daily quests, reset at 10 am
        if(document.getElementById("rotatingDaily")){
            var daily;
            var dailyTime = currentDay;

            // if it's before 10 am (UTC), subtract 1. This effectively sets the day to start at that time.
            if(currentHour<10){
                dailyTime -= 1;
            }

            //decide which template to use based on dailyTime
            switch(dailyTime) {
                case 0:
                    daily = "{{Sunday}}"
                    break;
                case 1:
                    daily = "{{Monday}}"
                    break;
                case 2:
                    daily = "{{Tuesday}}"
                    break;
                case 3:
                    daily = "{{Wednesday}}"
                    break;
                case 4:
                    daily = "{{Thursday}}"
                    break;
                case 5:
                    daily = "{{Friday}}"
                    break;
                case 6:
                case -1:
                    daily = "{{Saturday}}"
                    break;
            }

            api.get({
                //get the parsed contents of the template
                action: 'parse',
                text: daily,
                disablelimitreport: true,
                contentmodel: 'wikitext',
                wrapoutputclass: ''
            }).then(function(data) {
                //find an element with id "rotatingDaily" and replace its contents with the template
                var dailyNode = document.getElementById("rotatingDaily");
                dailyNode.innerHTML = data.parse.text['*'];
            });
        }

        // Get the daily express, reset at 10 am
        if(document.getElementById("rotatingExpress")){
            var express;
            var expressTime = Math.floor(Date.now() / 86400000) % 6;

            // if it's before 10 am (UTC), subtract 1. This effectively sets the day to start at that time.
            if(currentHour<10){
                expressTime -= 1;
            }

            //decide which template to use based on expressTime
            switch(expressTime) {
                case 0:
                    express = "{{ExpressDecal3}}"
                    break;
                case 1:
                    express = "{{ExpressDecal4}}"
                    break;
                case 2:
                    express = "{{ExpressDecal5}}"
                    break;
                case 3:
                    express = "{{ExpressDecal6}}"
                    break;
                case 4:
                    express = "{{ExpressDecal1}}"
                    break;
                case 5:
                case -1:
                    express = "{{ExpressDecal2}}"
                    break;
            }

            api.get({
                //get the parsed contents of the template
                action: 'parse',
                text: express,
                disablelimitreport: true,
                contentmodel: 'wikitext',
                wrapoutputclass: ''
            }).then(function(data) {
                //find an element with id "rotatingExpress" and replace its contents with the template
                var expressNode = document.getElementById("rotatingExpress");
                expressNode.innerHTML = data.parse.text['*'];
            });
        }
    });
}