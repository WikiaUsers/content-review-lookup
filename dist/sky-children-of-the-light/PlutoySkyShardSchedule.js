// Plutoy Sky Shard Schedule
// Original Author: Plutoy
// github.com/PlutoyDev/sky-shards
// Code converted by: Ray808080

(function ($) {
    if (typeof window.PlutoySkyShardSchedule !== 'undefined') {
        return false;
    } 
    window.PlutoySkyShardSchedule = {
        version: '0.1.3',
        init: importArticles({
        	type: 'script',
        	articles: [
        		'MediaWiki:Luxon.js',
        	]
        }).then(function () {

            if ($('#plutoy-shard-wrapper').length) {
                earlyOffset = luxon.Duration.fromObject({ minutes: -30 }); //after start
                eruptionOffset = luxon.Duration.fromObject({ minutes: 7 }); //after start
                landOffset = luxon.Duration.fromObject({ minutes: 8, seconds: 40 }); //after start
                endOffset = luxon.Duration.fromObject({ hours: 4 }); //after start

                blackShardInterval = luxon.Duration.fromObject({ hours: 8 });
                redShardInterval = luxon.Duration.fromObject({ hours: 6 });

                realmsFull = ['Daylight Prairie', 'Hidden Forest', 'Valley Of Triumph', 'Golden Wasteland', 'Vault Of Knowledge'];
                realmsNick = ['Prairie', 'Forest', 'Valley', 'Wasteland', 'Vault'];

                shardsInfo = [
                {
                    noShardWkDay: [6, 7], //Sat;Sun
                    interval: blackShardInterval,
                    offset: luxon.Duration.fromObject({
                        hours: 1,
                        minutes: 50,
                    }),
                    maps: ['Butterfly Field', 'Forest Brook', 'Ice Rink', 'Broken Temple', 'Starlight Desert']
                },
                {
                    noShardWkDay: [7, 1], //Sun;Mon
                    interval: blackShardInterval,
                    offset: luxon.Duration.fromObject({
                        hours: 2,
                        minutes: 10,
                    }),
                    maps: ['Village Islands', 'Boneyard', 'Ice Rink', 'Battlefield', 'Starlight Desert']
                },
                {
                    noShardWkDay: [1, 2], //Mon;Tue
                    interval: redShardInterval,
                    offset: luxon.Duration.fromObject({
                        hours: 7,
                        minutes: 40,
                    }),
                    maps: ['Cave', 'Forest Garden', 'Village of Dreams', 'Graveyard', 'Jellyfish Cove']
                },
                {
                    noShardWkDay: [2, 3], //Tue;Wed
                    interval: redShardInterval,
                    offset: luxon.Duration.fromObject({
                        hours: 2,
                        minutes: 20,
                    }),
                    maps: ['Bird Nest', 'Treehouse', 'Village of Dreams', 'Crabfield', 'Jellyfish Cove']
                },
                {
                    noShardWkDay: [3, 4], //Wed;Thu
                    interval: redShardInterval,
                    offset: luxon.Duration.fromObject({
                        hours: 3,
                        minutes: 30,
                    }),
                    maps: ['Sanctuary Island', 'Elevated Clearing', 'Hermit valley', 'Forgotten Ark', 'Jellyfish Cove']
                }
                ];
                
                SKYZONE = 'America/Los_Angeles';
                TODAY = luxon.DateTime.now().setZone(SKYZONE);
                PAST = 'was';
                PRESENT = 'is';
                FUTURE = 'will be';
                DATE_FORMAT = {month: 'long', day: 'numeric', year: 'numeric', weekday: 'long'};
                LOCAL_FORMAT = {month: 'long', day: 'numeric', year: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit'};
                SKY_FORMAT = {month: 'long', day: 'numeric', year: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', timeZone: SKYZONE};

                // Sets up the HTML initially
                document.getElementById('plutoy-shard-wrapper').innerHTML = /*
                */'<div id="plutoy-shard-input" style="text-align:center;">' + /*
                */'<input type="date" id="plutoy_date_picker" name="plutoy_date_picker" onchange="return PlutoySkyShardSchedule.displayResults();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="<" onclick="return PlutoySkyShardSchedule.prev();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="Today" onclick="return PlutoySkyShardSchedule.today();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value=">" onclick="return PlutoySkyShardSchedule.next();">&nbsp;' + /*
                */'</div>' + /*
                */'<br>' + /*
                */'<div id="plutoy-shard-output" style="text-align: center;"></div>' + /*
                */'<div id="plutoy-shard-schedule" style="text-align: center;"></div>' + /*
                */'<br>' + /*
                */'<div style="text-align: center;"><small>' + /*
                */'<b>Credits:</b> Thank you to Plutoy#5022 for creating <a href=https://sky-shards.netlify.app/>Sky Shards</a> and allowing me (Ray808080) to convert the code for the wiki.<br>Thank you to those who helped to discover the patterns shard eruption:<br> Clement#8978, Galerowfylery#1310, RandomZhii#4275, ChristianKingFu#8986, kion_Anzu#1021, Hucker#6095, LN🦇#5792' + /*
                */'</small></div>';
                
                PlutoySkyShardSchedule.today();
            }
        }),

        // Helper function: Gets the date from the date input and current time
        getInput: function () {
            var date_value = document.getElementById("plutoy_date_picker").value;
            var time_value = TODAY.toString().slice(10);
            return luxon.DateTime.fromISO(date_value+time_value);
        },

        // Button function: Puts Today's Date to the date input and recalculates
        today: function () {
            document.getElementById("plutoy_date_picker").value = TODAY.toString().slice(0,10);
            PlutoySkyShardSchedule.displayResults();
        },

        // Button function: Subtracts 1 day date input and recalculates
        prev: function () {
            var input_dt = PlutoySkyShardSchedule.getInput();
            var prev_sky_dt = input_dt.setZone(SKYZONE).minus({days: 1}).toString();
            document.getElementById("plutoy_date_picker").value = prev_sky_dt.slice(0,10);
            PlutoySkyShardSchedule.displayResults();
        },

        // Button function: Adds 1 day date input and recalculates
        next: function () {
            var input_dt = PlutoySkyShardSchedule.getInput();
            var next_sky_dt = input_dt.setZone(SKYZONE).plus({days: 1}).toString();
            document.getElementById("plutoy_date_picker").value = next_sky_dt.slice(0,10);
            PlutoySkyShardSchedule.displayResults();
        },

        // Message fynction: Gives the proper verb tense for the shard messages
        verbTense: function () {
            var input_dt = PlutoySkyShardSchedule.getInput();

            if (input_dt < TODAY) {
                return PAST;
            } else if (input_dt > TODAY) {
                return FUTURE;
            }
            return PRESENT;
        },

        // Message fynction: Gives the red or black shard portion of the shard messages
        isRedText: function (result) {
            if (result.isRed) {
                return '<img style="height:52px" src="https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/32/Red-shard-map-icon-Ray.png">&nbsp;<span style="color:red;"><b>Red Shard</b></span>';
            }
            return '<img style="height:52px" src="https://static.wikia.nocookie.net/sky-children-of-the-light/images/3/38/Black-shard-map-icon-Ray.png/">&nbsp;<b>Black Shard</b>';
        },

        // Shows the shard output message
        displayResults: function () {
            // Extremely important that call calculations are done
            // Based on off the SKYZONE timezone
            var date = PlutoySkyShardSchedule.getInput().setZone(SKYZONE);
            result = PlutoySkyShardSchedule.getShardInfo(date);
            if (result.haveShard) {
                document.getElementById('plutoy-shard-output').innerHTML = 'On ' + date.toLocaleString(DATE_FORMAT) + ', there ' + PlutoySkyShardSchedule.verbTense() + ' a ' + PlutoySkyShardSchedule.isRedText(result) + ' in <b>' + result.map + ', ' + result.realmFull + '</b>.';
            } else {
                document.getElementById('plutoy-shard-output').innerHTML = 'On ' + date.toLocaleString(DATE_FORMAT) + ', there ' + PlutoySkyShardSchedule.verbTense() + ' <b>No Shard</b>.';
            }

            next_red_shard = PlutoySkyShardSchedule.nextShardInfo(date, {limit: 14, daysAdded: 0, colorIsRed: true});
            next_black_shard = PlutoySkyShardSchedule.nextShardInfo(date, {limit: 14, daysAdded: 0, colorIsRed: false});
            x = PlutoySkyShardSchedule.nextOrCurrent(date, true, 0);
            var land = x.phases !== undefined && x.phases.land;
            var end = x.phases !== undefined && x.phases.end;
            var ordinal = x.index !== undefined && ['1st', '2nd', '3rd'][x.index];
            var started = x.phases !== undefined && TODAY > land;
            next = started ? end : land;

            var message = '';
            if (next_red_shard.daysAdded == 0 || next_black_shard.daysAdded == 0) {
                message += ordinal + ' shard';
                if (started) {
                    message += ' has landed, it';
                }
                message += ' will ';
                if (started) {
                    message += 'end';
                } else {
                    message += 'land';
                }
                countdown = PlutoySkyShardSchedule.getCountDown(next);
                message += ' in<br>' + countdown + '<br>at';
                message += '<div style="display:flex;gap:18%;"><div style="flex: 1 1 45%;"><u>Your Time:</u><br>(' + Intl.DateTimeFormat().resolvedOptions().timeZone + ')<br>' + next.setZone('local').toLocaleString(LOCAL_FORMAT) + '</div><div style="flex: 1 1 45%;"><u>Sky Time:</u><br>(America/Los_Angeles)</br>' + next.setZone(SKYZONE).toLocaleString(SKY_FORMAT) + '</div></div>';
            }
            document.getElementById('plutoy-shard-schedule').innerHTML = message;
            setTimeout(PlutoySkyShardSchedule.displayResults, 10000);
        },
        
        // Creates the countdown string, ensure 2-digits
        getCountDown: function(next) {
            var countdown = next.diff(luxon.DateTime.now().setZone(SKYZONE).minus({minutes:30}), ['hours', 'minutes', 'seconds']);
            var countdown_str = '';
            if (String(countdown.hours).length == 1) {
                countdown_str += '0' + countdown.hours + 'h ';
            } else {
                countdown_str += countdown.hours + 'h ';
            }

            if (String(countdown.minutes).length == 1) {
                countdown_str += '0' + countdown.minutes + 'm';
            } else {
                countdown_str += countdown.minutes + 'm';
            }
            return countdown_str;
        },

        // Calculates the shard info
        getShardInfo: function (date) {
            date = date.setZone(SKYZONE).startOf('day');
            var dayOfMth = date.day;
            var dayOfWk = date.weekday;
            var isRed = dayOfMth % 2 === 1;
            var realmIdx = (dayOfMth - 1) % 5;
            var infoIndex = isRed ? (((dayOfMth - 1) / 2) % 3) + 2 : (dayOfMth / 2) % 2;
            var haveShard = !shardsInfo[infoIndex].noShardWkDay.includes(dayOfWk);
            return {
                date: date,
                isRed: isRed,
                haveShard: haveShard,
                offset: shardsInfo[infoIndex].offset,
                interval: shardsInfo[infoIndex].interval,
                realmFull: realmsFull[realmIdx],
                realmNick: realmsNick[realmIdx],
                map: shardsInfo[infoIndex].maps[realmIdx]
            };
        },
        
        phasesFromStart: function (start) {
            var early = start.plus(earlyOffset);
            var end = start.plus(endOffset);
            var eruption = start.plus(eruptionOffset);
            var land = start.plus(landOffset);
            return { 
                early: early, 
                start: start, 
                eruption: eruption, 
                land: land, 
                end: end
            };
        },

        phasesFromEnd: function (end) {
            var start = end.minus(endOffset);
            var early = start.plus(earlyOffset);
            var eruption = start.plus(eruptionOffset);
            var land = start.plus(landOffset);
            return { 
                early: early, 
                start: start, 
                eruption: eruption, 
                land: land, 
                end: end
            };
        },

        nextShardInfo: function (now, resursive) {
            // var { limit = 14, daysAdded = 0, colorIsRed } = recursive;
            var info = PlutoySkyShardSchedule.getShardInfo(now);
            // var { haveShard, isRed } = info;
            if (info.haveShard && (resursive.colorIsRed === undefined || resursive.colorIsRed === info.isRed)) {
                return { 
                    info: info, 
                    daysAdded: resursive.daysAdded, 
                    date: now 
                };
            }
            if (resursive.daysAdded >= resursive.limit) {
                return { 
                    info: info, 
                    daysAdded: resursive.daysAdded,
                    date: now 
                };
            }
            return PlutoySkyShardSchedule.nextShardInfo(now.plus({ days: 1 }), { 
                limit: resursive.limit, 
                daysAdded: resursive.daysAdded + 1, 
                colorIsRed: resursive.colorIsRed
            });
        },

        nextOrCurrent: function (now, recursive, daysAdded) {
            var today = now.startOf('day');
            var info = PlutoySkyShardSchedule.getShardInfo(now);
            // var { haveShard, offset, interval } = info;
            if (!info.haveShard) {
                if (recursive) {
                    return PlutoySkyShardSchedule.nextOrCurrent(today.plus({ days: 1 }), recursive, daysAdded + 1);
                }
                return { info: info, daysAdded: daysAdded };
            }
            
            var firstEnd = today.plus(info.offset).plus(endOffset);
            var ends = Array.from({ length: 3 }, function (_, i) { return firstEnd.plus(info.interval.mapUnits(function (v) { return v * i; })); });
            var index = ends.findIndex(function(end) {
                return now < end;
            });
            var next = ends[index];

            if (next) {
                var phases = PlutoySkyShardSchedule.phasesFromEnd(next);
                return { info: info, index: index, phases: phases, daysAdded: daysAdded };
            }

            if (recursive) {
                return PlutoySkyShardSchedule.nextOrCurrent(today.plus({ days: 1 }), recursive, daysAdded + 1);
            }

            return { info: info, daysAdded: daysAdded };
        }
    };

	mw.hook("wikipage.content").add(PlutoySkyShardSchedule.init);
   
}(jQuery));