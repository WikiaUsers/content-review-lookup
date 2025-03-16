// Sky Seasonal Candle Calculator
// Author: Ray808080
// 
// Description: Gives you information about your Seasonal Candles count for the Season
// Sky Seasonal Candle Calculator
// Author: Ray808080
// Version: 0.1.7
// Description: Gives you information about your Seasonal Candles count for the Season
// Instructions: To use, place the following:
/*  <div id="sky-seasonal-candle-calculator-wrapper">
    <div style="display:none;" id="sky-seasonal-candle-calculator-input">
    <nowiki>
    |SEASON_NAME       = <string>
    |SEASON_START      = <Month DD, YYYY HH:mm:ss PDT/PST>
    |SEASON_END        = <Month DD, YYYY HH:mm:ss PDT/PST>
    |NEED_NO_PASS      = <number>
    |NEED_WITH_PASS    = <number>
    |SKIPPABLE_MESSAGE = <string>
    |DOUBLE_EVENT      = <true/false>
    |DOUBLE_START      = <Month DD, YYYY HH:mm:ss PDT/PST>
    |DOUBLE_END        = <Month DD, YYYY HH:mm:ss PDT/PST>
    |DOUBLE_2_EVENT    = <true/false>
    |DOUBLE_2_START    = <Month DD, YYYY HH:mm:ss PDT/PST>
    |DOUBLE_2_END      = <Month DD, YYYY HH:mm:ss PDT/PST>
    </nowiki>
    </div>
    <div id="sky-seasonal-candle-calculator-output"></div>
    </div>
*/
// Translation Instructions:
// First, change the language string labeled TRANSLATION SECTION 0.
// There are 3 additional sections with strings that need to be translated.
// They will be labeled TRANSLATION SECTION 1 and so on.
// All the strings that need to be translated are variables that start with "translation_".

// This adds toDateInputValue() to Date objects so that they can be transformed
// into a format that the date input can take in as "value".
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

(function ($) {
    if (typeof window.SkySeasonalCandleCalculator !== 'undefined') {
        return false;
    } 
    window.SkySeasonalCandleCalculator = {
    	version: '0.1.7', // Might need updating, above as well
    	// TRANSLATION SECTION 0
    	language: 'de', // Use the correct subtag from https://en.wikipedia.org/wiki/IETF_language_tag#List_of_common_primary_language_subtags
        init: importArticles({
				type: 'script',
				articles: [
					'MediaWiki:Moment.js',
					'MediaWiki:Moment-Timezone.js'
				]
			}).then(function () {

            if ($('#sky-seasonal-candle-calculator-wrapper').length) {
                console.log('Loaded Sky Seasonal Candle Calculator v.' + SkySeasonalCandleCalculator.version + ' by Ray808080');
                TODAY = new Date();
                TGC_ZONE = 'America/Los_Angeles';
                LOCALE_ZONE = moment.tz.guess(true);
                LOCALE_TZ = TODAY.toLocaleTimeString(SkySeasonalCandleCalculator.language, { timeStyle: "long" }).split(' ').pop();
                NOW = moment().format("HH:mm:ss");

                // Get the initial constants from HTML
                SkySeasonalCandleCalculator.get_data();

                // The end times are always listed as 23:59:59 so a buffer of
                // 1000 ms is needed to round up so that the date calculations are ok
                END_TIME_BUFFER = 1000;
                SEASON_DAYS = SkySeasonalCandleCalculator.diff(SEASON_START, SEASON_END, END_TIME_BUFFER);

                // Assume Double Currency days don't exist and only update their durations
                // After their existances are checked
                DOUBLE_DAYS = 0;
                DOUBLE_2_DAYS = 0;
                if (DOUBLE_EVENT) {
                    DOUBLE_DAYS = SkySeasonalCandleCalculator.diff(DOUBLE_START, DOUBLE_END, END_TIME_BUFFER);
                }
                if (DOUBLE_2_EVENT) {
                    DOUBLE_2_DAYS = SkySeasonalCandleCalculator.diff(DOUBLE_2_START, DOUBLE_2_END, END_TIME_BUFFER);
                }

                // TRANSLATION SECTION 1
                var translation_the_season = "Die"; // Referring to "Season"
                var translation_lasts = "läuft noch";
                var translation_days_long = "Tage";
                var translation_from = "von";
                var translation_to = "bis";
                var translation_the_dsce = "Das"; // Referring to "Double Seasonal Candle Event"
                var translation_a_second = "Ein zweites"; // Referring to "Double Seasonal Candle Event"
                var translation_a = "Ein"; // Referring to "Double Seasonal Candle Event"
                var translation_double_sce = "Doppel-Saisonkerzen-Event";
                var translation_not_announced = "wurde noch nicht angekündigt";
                var translation_to_buy_everything_youll_need = "Um alle Items der Saison zu kaufen, brauchst du";
                var translation_sc_wo_pass = "Saisonkerzen OHNE den Saisonpass";
                var translation_sc_w_pass = "Saisonkerzen MIT dem Saisonpass";
                var translation_takes_approximately = "Dauert etwa";
                var translation_standard_days = "voll ausgenutzte Tage"; // This means 5 SC per day
                var translation_note = "Achtung: Du solltest dich niemals dazu gedrängt fühlen, einen Saisonpass kaufen zu müssen.";
                var translation_choose_date = "Wähle ein Datum";
                var translation_today = "Heute";
                var translation_season_start = "Saisonbeginn";
                var translation_choose_time = "Wähle eine Zeit";
                var translation_now = "Jetzt";
                var translation_reset = "Reset";
                var translation_your_current_sc = "Anzahl Saisonkerzen, die du aktuell besitzt";
                var translation_do_you_have_a_pass = "Hast du einen Saisonpass?";
                var translation_calculate = "Berechnen";
                var translation_clear = "Löschen";

                // Sets up the HTML initially
                document.getElementById('sky-seasonal-candle-calculator-output').innerHTML = /*
                */'<p>' + translation_the_season + ' <b><span id="sscc_season_name"></span></b> ' + translation_lasts + ' <span id="sscc_season_days"></span> ' + translation_days_long + ', ' + translation_from + ' <span id="sscc_season_start"></span> ' + translation_to + ' <span id="sscc_season_end"></span>.</p>' + /*
                */'<p id="sscc_double_event">' + translation_the_dsce + ' <b>' + translation_double_sce + '</b> ' + translation_lasts + ' <span id="sscc_double_days"></span> ' + translation_days_long + ', ' + translation_from + ' <span id="sscc_double_start"></span> ' + translation_to + ' <span id="sscc_double_end"></span>.</p>' + /*
                */'<p id="sscc_double_2_event">' + translation_a_second + '<b>' + translation_double_sce + '</b> ' + translation_lasts + ' <span id="sscc_double_2_days"></span> ' + translation_days_long + ', ' + translation_from + ' <span id="sscc_double_2_start"></span> ' + translation_to + ' <span id="sscc_double_2_end"></span>.</p>' + /*

                */'<p>' + translation_to_buy_everything_youll_need + ':<br>' + /*
                */'- <span id="sscc_need_no_pass"></span> ' + translation_sc_wo_pass + '. <span id="sscc_skippable_message"></span> ' + translation_takes_approximately + ' <span id="sscc_need_no_pass_days"></span> ' + translation_standard_days + '.<br>' + /*
                */'- <span id="sscc_need_with_pass"></span> ' + translation_sc_w_pass + '. ' + translation_takes_approximately + ' <span id="sscc_need_with_pass_days"></span> ' + translation_standard_days + '.</p>' + /*

				*/'<p>' + /*
                */'<i>' + translation_note + '</i>' + /*
				
				*/'<br>' + /*
                */'<label for="sscc_date_picker">' + translation_choose_date + ':</label>&nbsp;' + /*
                */'<input type="date" id="sscc_date_picker" name="sscc_date_picker" onchange="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="' + translation_today + '" onclick="return SkySeasonalCandleCalculator.today();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="' + translation_season_start + '" onclick="return SkySeasonalCandleCalculator.start_date();"><br>' + /*

                */'<label for="sscc_time_picker">' + translation_choose_time + ' (<span id="sscc_locale_tz"></span>):</label>&nbsp;' + /*
                */'<input type="time" id="sscc_time_picker" name="sscc_time_picker" onchange="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /* 
                */'<input type="submit" class="wds-button wds-is-secondary" value="' + translation_now + '" onclick="return SkySeasonalCandleCalculator.now_time();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="' + translation_reset + '" onclick="return SkySeasonalCandleCalculator.reset_time();"><br>' + /*

                */'<label for="sscc_current_count">' + translation_your_current_sc + ':</label>&nbsp;' + /*
                */'<input type="number" id="sscc_current_count" name="sscc_current_count" value="0" min="0" max="550" onchange="return SkySeasonalCandleCalculator.calculate();"><br>' + /*

                */'<label for="sscc_has_pass">' + translation_do_you_have_a_pass + '</label>&nbsp;' + /*
                */'<input type="checkbox" id="sscc_has_pass" name="sscc_has_pass" onclick="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /*
                */'<br><br>' + /*

                */'<input type="submit" class="wds-button" value="' + translation_calculate + '" onclick="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="' + translation_clear + '" onclick="return SkySeasonalCandleCalculator.reset();">' + /*
                
                */'</p>' + /*
                */'<br>' + /*

                */'<p id="sscc_custom_comment"></p>' + /*         
                */'<div id="sscc_general_table"></div>';

                // Fills in the info for the Season
                document.getElementById("sscc_season_name").innerHTML = SEASON_NAME;
                var season_start_string = SEASON_START.toLocaleString(SkySeasonalCandleCalculator.language, { dateStyle: "medium" }) + ' (' + SEASON_START.toLocaleString(SkySeasonalCandleCalculator.language, { timeStyle: "short" }) + ')';
                document.getElementById("sscc_season_start").innerHTML = season_start_string;
                var season_end_string = SEASON_END.toLocaleString(SkySeasonalCandleCalculator.language, { dateStyle: "medium" }) + ' (' + SEASON_END.toLocaleString(SkySeasonalCandleCalculator.language, { timeStyle: "short" }) + ')';
                document.getElementById("sscc_season_end").innerHTML = season_end_string;
                document.getElementById("sscc_season_days").innerHTML = SEASON_DAYS;
                
                // Fills in the info for a Double Event if it exists
                if (DOUBLE_EVENT) {
                	var double_start_string = DOUBLE_START.toLocaleString(SkySeasonalCandleCalculator.language, { dateStyle: "medium"}) + ' (' + DOUBLE_START.toLocaleString(SkySeasonalCandleCalculator.language, { timeStyle: "short" }) + ')';
                    document.getElementById("sscc_double_start").innerHTML = double_start_string;
                    var double_end_string = DOUBLE_END.toLocaleString(SkySeasonalCandleCalculator.language, { dateStyle: "medium" }) + ' (' + DOUBLE_END.toLocaleString(SkySeasonalCandleCalculator.language, { timeStyle: "short" }) + ')';
                    document.getElementById("sscc_double_end").innerHTML = double_end_string;
                    document.getElementById("sscc_double_days").innerHTML = DOUBLE_DAYS;
                } else {
                    document.getElementById("sscc_double_event").innerHTML = translation_a + " <b>" + translation_double_sce + "</b> " + translation_not_announced + ".";
                }

                // Fills in the info for a Second Double Event if it exists
                if (DOUBLE_2_EVENT) {
            		var double_2_start_string = DOUBLE_2_START.toLocaleString(SkySeasonalCandleCalculator.language, { dateStyle: "medium"}) + ' (' + DOUBLE_2_START.toLocaleString(SkySeasonalCandleCalculator.language, { timeStyle: "short" }) + ')';
                    document.getElementById("sscc_double_2_start").innerHTML = double_2_start_string;
                    var double_2_end_string = DOUBLE_2_END.toLocaleString(SkySeasonalCandleCalculator.language, { dateStyle: "medium"}) + ' (' + DOUBLE_2_END.toLocaleString(SkySeasonalCandleCalculator.language, { timeStyle: "short" }) + ')';
                    document.getElementById("sscc_double_2_end").innerHTML = double_2_end_string;
                    document.getElementById("sscc_double_2_days").innerHTML = DOUBLE_2_DAYS;
                } else {
                    // The second Event is a very rare case so nothing will be shown if it is not announced
                    document.getElementById("sscc_double_2_event").innerHTML = "";
                }

                // Fills in the Seasonal Candle requirements for the Season
                document.getElementById("sscc_need_no_pass").innerHTML = NEED_NO_PASS;
                document.getElementById("sscc_need_with_pass").innerHTML = NEED_WITH_PASS;
                document.getElementById("sscc_need_no_pass_days").innerHTML = Math.ceil(NEED_NO_PASS/5);
                document.getElementById("sscc_need_with_pass_days").innerHTML = Math.ceil(NEED_WITH_PASS/6);
                document.getElementById("sscc_skippable_message").innerHTML = SKIPPABLE_MESSAGE;
                
                // Defaults the date input as Today's Date
                document.getElementById("sscc_date_picker").value = TODAY.toDateInputValue();

                // Defaults the time input as Current Time
                document.getElementById("sscc_locale_tz").innerHTML = LOCALE_TZ;
                document.getElementById("sscc_time_picker").value = SkySeasonalCandleCalculator.time_to_input_value(NOW);
            }
        }),

        // Helper function: Grabs the information from the HTML on the page
        get_data: function () {
            var raw_data = document.getElementById('sky-seasonal-candle-calculator-input').innerHTML;
            // Gives an array of all the constants, filters out empty strings
            var raw_data_split = raw_data.trim().replace(/\r?\n|\r/g, '').split('|').filter(Boolean);
            // Gives an array of all the lines having front and back spaces trimmed
            var data = raw_data_split.map(function(x) { return x.trim() });

            // Gives an array of key, value alternating and trimmed
            var data_split = data.join('=').split('=').map(function(x) { return x.trim() });

            // Creates an object of all the constants and their values
            var constants = {};
            var keys = data_split.filter(function(x, index) { return index % 2 === 0 });
            var values = data_split.filter(function(x, index) { return index % 2 === 1});
            keys.forEach(function(k, index) { return constants[k]=values[index]});

            SEASON_NAME = String(constants.SEASON_NAME);
            SEASON_START = new Date(String(constants.SEASON_START));
            SEASON_END = new Date(String(constants.SEASON_END));
            NEED_NO_PASS = Number(constants.NEED_NO_PASS);
            NEED_WITH_PASS = Number(constants.NEED_WITH_PASS);
            SKIPPABLE_MESSAGE = String(constants.SKIPPABLE_MESSAGE);
            DOUBLE_EVENT = (constants.DOUBLE_EVENT.toLowerCase() === 'true');
            DOUBLE_START = new Date(String(constants.DOUBLE_START));
            DOUBLE_END = new Date(String(constants.DOUBLE_END));
            DOUBLE_2_EVENT = (constants.DOUBLE_2_EVENT.toLowerCase() === 'true');
            DOUBLE_2_START = new Date(String(constants.DOUBLE_2_START));
            DOUBLE_2_END = new Date(String(constants.DOUBLE_2_END));
        },

        // ---------- DATE FUNCTIONS ----------------------------------------------------

        // Helper function: Given a datetime and zone, return its offset from GMT/UTC
        // 9This will inform if PT is in PST or PDT)
        get_offset: function (datetime, zone) {
            return -moment(datetime).tz(zone).utcOffset();
        },

        // Helper function: Calculates the day difference between start and end Date objects.
        // Rounds to the nearest whole number of days if SEASON_END or DOUBLE_END is used.
        // Otherwise, rounds up to the next whole number of days.
        // Buffer is used for END dates needing an extra 1s but otherwise is defaulted to 0
        diff: function (start, end, buffer) {
            const ONE_DAY_IN_MS = 86400000;
            // Takes into consideration that the End times are 1 minute off
            if (buffer > 0) {
                return Math.round((Math.abs(end - start) + buffer)/ONE_DAY_IN_MS);
            }
            return Math.ceil((Math.abs(end - start) + buffer)/ONE_DAY_IN_MS);
        },

        // Button function: Puts Today's Date to the date input and recalculates
        today: function () {
            document.getElementById("sscc_date_picker").value = TODAY.toDateInputValue();
            SkySeasonalCandleCalculator.calculate();
            SkySeasonalCandleCalculator.update_timezone();
        },

        // Button function: Puts the Season's Start Date to date input and recalculates
        start_date: function () {
            document.getElementById("sscc_date_picker").value = SEASON_START.toDateInputValue();
            SkySeasonalCandleCalculator.calculate();
            SkySeasonalCandleCalculator.update_timezone();
        },

        // ---------- TIME FUNCTIONS ----------------------------------------------------

        // Helper function: Takes in time in "HH:mm:ss" and returns the time in "HH:mm"
        // so that it can be used in the time input
        time_to_input_value: function (time) {
            var time_value = time.split(':');
            var time_input = time_value[0] + ':' + time_value[1];
            return time_input;
        },

        // Helper function: Takes in a number and returns it as a string with
        // a leading zero, if necessary
        pad_number: function (number) {
            if (String(number).length < 2) {
                return "0" + String(number);
            } else {
                return String(number);
            }
        },

        // Button function: Puts Current Time to the time input and recalculates
        now_time: function () {
            document.getElementById("sscc_time_picker").value = SkySeasonalCandleCalculator.time_to_input_value(NOW);
            SkySeasonalCandleCalculator.calculate();
            SkySeasonalCandleCalculator.update_timezone();
        },

        // Button function: Calculates the Reset Time in the local zone of the Date
        // in the date input, puts the result in the time input, and recalculates
        reset_time: function () {
            var date_value = document.getElementById("sscc_date_picker").value;
            // Gets the very start of the selected date in locale zone
            var locale_lookup = moment.tz(date_value + ' 00:00', LOCALE_ZONE);

            var pt_offset = SkySeasonalCandleCalculator.get_offset(locale_lookup, TGC_ZONE);
            var locale_offset = SkySeasonalCandleCalculator.get_offset(locale_lookup, LOCALE_ZONE);
            
            // Calculates the reset hour and min for the locale zone
            // Takes into consideration if the locale offset is larger
            // Than the PT offset.
            var reset_hour_string, reset_min_string;
            if (pt_offset >= locale_offset) {
                total_offset = pt_offset - locale_offset;
                reset_hour_string = Math.floor(total_offset/60); 
                reset_min_string = total_offset % 60;
            } else {
                total_offset = 24 - (pt_offset - locale_offset);
                reset_hour_string = Math.floor(total_offset/60); 
                reset_min_string = total_offset % 60;
            }

            document.getElementById("sscc_time_picker").value = SkySeasonalCandleCalculator.pad_number(reset_hour_string) + ':' + SkySeasonalCandleCalculator.pad_number(reset_min_string);
            SkySeasonalCandleCalculator.calculate();
            SkySeasonalCandleCalculator.update_timezone();
        },

        // ---------- DISPLAY FUNCTIONS -------------------------------------------------

        // Helper function: Makes sure that the proper locale timezone is showing
        // for the locale zone the user is in for the date and time being chosen
        update_timezone: function () {
            var date_value = document.getElementById("sscc_date_picker").value;
            var time_value = document.getElementById("sscc_time_picker").value;
            var locale_lookup = moment.tz(date_value + " " + time_value, LOCALE_ZONE);
            var locale_tz = new Date().toLocaleTimeString(SkySeasonalCandleCalculator.language, { timeStyle: "long" }).split(' ').pop();
            
            document.getElementById("sscc_locale_tz").innerHTML = locale_tz;
        },

        // Button function: Resets all the inputs on the page
        // and clears out the calculation results
        reset: function () {
            document.getElementById("sscc_date_picker").value = TODAY.toDateInputValue();
            document.getElementById("sscc_locale_tz").innerHTML = LOCALE_TZ;
            document.getElementById("sscc_time_picker").value = SkySeasonalCandleCalculator.time_to_input_value(NOW);
            document.getElementById("sscc_current_count").value = 0;
            document.getElementById("sscc_has_pass").checked = false;

            document.getElementById("sscc_custom_comment").innerHTML = "";
            document.getElementById("sscc_general_table").innerHTML = "";
        },

        // Table Function: Inserts the HTML table so it doesn't show up when page is loaded
        insert_table: function () {

            // TRANSLATION SECTION 2
            var translation_A1 = "Tag(e) in der Saison bisher";
            var translation_B1 = "verbleibende(r) Tag(e) in der Saison";
            var translation_C2 = "Ohne den Saisonpass";
            var translation_C3 = "Mit dem Saisonpass";
            var translation_A2 = "bisher insgesamt sammelbare Saisonkerzen";
            var translation_B2 = "verbleibende sammelbare Saisonkerzen";
            

            document.getElementById("sscc_general_table").innerHTML = '<div class="article-table-wrapper">' + /*
                */'<table class="table article-table">' + /*
                    */'<tbody>' + /* 
                        */'<tr>' + /*
                            */'<th style="text-align:center;" colspan="4" id="sscc_table_header"></th>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<td style="text-align:right;" id="sscc_table_A1"></td>' + /*
                            */'<td>' + translation_A1 + '</td>' + /*
                            */'<td style="text-align:right;" id="sscc_table_B1"></td>' + /*
                            */'<td>' + translation_B1 + '</td>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<th style="text-align:center;" colspan="4">' + translation_C2 + '</th>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<td style="text-align:right;" id="sscc_table_A2"></td>' + /*
                            */'<td>' + translation_A2 + '</td>' + /*
                            */'<td style="text-align:right;" id="sscc_table_B2"></td>' + /*
                            */'<td>' + translation_B2 + '</td>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<th style="text-align:center;" colspan="4">' + translation_C3 + '</th>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<td style="text-align:right;" id="sscc_table_A3"></td>' + /*
                            */'<td>' + translation_A2 + '</td>' + /*
                            */'<td style="text-align:right;" id="sscc_table_B3"></td>' + /*
                            */'<td>' + translation_B2 + '</td>' + /*
                        */'</tr>' + /*
                    */'</tbody>' + /*
                */'</table></div>';
        },

        // Helper function: Gives the min days required to reach the goal
        min_days_required: function (arr, goal) {
            arr = arr.sort();
            var min_sum = 0;
            var min_index = arr.findIndex(function(value, i) {
                return (min_sum += value) >= goal;
            });
            return min_index + 1;
        },

        // Main function: Outputs the General Table and the Custom Commentary
        calculate: function () {
            // Adds the table HTML
            SkySeasonalCandleCalculator.insert_table();
            // Update timezone
            SkySeasonalCandleCalculator.update_timezone();

            // Get the date and time input
            var date_value = document.getElementById("sscc_date_picker").value;
            var time_value = document.getElementById("sscc_time_picker").value;

            // Chosen date is based on the user's zone
            var datetime_value = moment.tz(date_value + " " + time_value, LOCALE_ZONE);

            // Figures out the equivalent situation in GMT/UTC
            var gmt = datetime_value.utc().format().split('T');
            var gmt_date = gmt[0].split('-');
            var gmt_time = gmt[1].split('-')[0].split(':');

            // Selected date is in Date object so that diff() can be used
            var selected_date = new Date(Date.UTC(gmt_date[0], gmt_date[1]-1, gmt_date[2], gmt_time[0], gmt_time[1], 1));
            // Pretty version of the Selected Date
            var selected_pretty = new Date(String(moment.tz(datetime_value, LOCALE_ZONE).format("MMMM DD, YYYY kk:mm z")));
            var selected_date_pretty = selected_pretty.toLocaleString(SkySeasonalCandleCalculator.language, { dateStyle: "medium" });
            var full_pretty_time = selected_pretty.toLocaleTimeString(SkySeasonalCandleCalculator.language, { timeStyle: "long" }).split(' ');
            var selected_tz_pretty = full_pretty_time.pop();
            full_pretty_time[0] = full_pretty_time[0].slice(0,-3);
            var selected_time_pretty = full_pretty_time.join(' ');


            // ---------- LIST CONSTRUCTOR ----------------------------------------------
            NO_PASS_LIST = [0];
            WITH_PASS_LIST = [0];
            
            // Creates a list of Seasonal Candles you can collect baseline, indexed by 
            // the # of days you have collected, so i=0 is None and i=SEASON_DAYS is All
            // Baseline non-SP is maxed out at 5 per day and SP is maxed out at 6 per day
            for (var i = 0; i < SEASON_DAYS; i++) {
                NO_PASS_LIST.push(5);
                WITH_PASS_LIST.push(6);
            }
            
            // Adds extra 1 Seasonal Candle per day that you can get during a
            // Double Candle Event, IF it is already announced.
            if (DOUBLE_EVENT) {
                var double_event_i = SkySeasonalCandleCalculator.diff(SEASON_START, DOUBLE_START, 0) + 1;            
                for (var i = 0; i < DOUBLE_DAYS; i++) {
                    NO_PASS_LIST[double_event_i + i] = 6;
                    WITH_PASS_LIST[double_event_i + i] = 7;
                }
            }

            // Adds extra 1 Seasonal Candle per day that you can get during a
            // SECOND Double Candle Event, IF it is already announced.
            if (DOUBLE_2_EVENT) {
                var double_2_event_i = SkySeasonalCandleCalculator.diff(SEASON_START, DOUBLE_2_START, 0) + 1;
                for (var i = 0; i < DOUBLE_2_DAYS; i++) {
                    NO_PASS_LIST[double_2_event_i + i] = 6;
                    WITH_PASS_LIST[double_2_event_i + i] = 7;
                }
            }

            // Bonus 30 Seasonal Candles for buying Seasonal Pass
            WITH_PASS_LIST[1] += 30;

            // ---------- GENERAL TABLE START -------------------------------------------

            // ---------- COLUMN A ------------------------------------------------------
            // Counting the number of days that have passed in the Season
            var total_collected_days;

            // Catch if date is earlier than Season start date
            if (selected_date < SEASON_START) {
                total_collected_days = 0;
            // Catch if date is later than Season end date
            } else if (selected_date > SEASON_END) {
                total_collected_days = SkySeasonalCandleCalculator.diff(SEASON_START, SEASON_END, END_TIME_BUFFER);
            // Otherwise, the date is between Season start and end 
            } else {
                total_collected_days = SkySeasonalCandleCalculator.diff(SEASON_START, selected_date, 0);
            }

            // Totaling the Seasonal Candles for the days that have passed
            var no_pass_before = 0;
            var with_pass_before = 0;
            for (var i = 0; i <= total_collected_days; i++) {
                no_pass_before += NO_PASS_LIST[i];
                with_pass_before += WITH_PASS_LIST[i];
            }

            // ---------- COLUMN B ------------------------------------------------------
            // Counting the number of remaining days in the Season
            var total_remaining_days = SEASON_DAYS - total_collected_days;

            // Totaling the Seasonal Candles
            var no_pass_total = 0;
            var with_pass_total = 0;
            for (var i = 0; i <= SEASON_DAYS; i++) {
                no_pass_total += NO_PASS_LIST[i];
                with_pass_total += WITH_PASS_LIST[i];
            }
            // Subtracting from the total to get the remaining
            var no_pass_after = no_pass_total - no_pass_before;
            var with_pass_after = with_pass_total - with_pass_before;

            // ---------- GENERAL TABLE END -------------------------------------------

            // ---------- CUSTOM COMMENTARY ------------------------------------------
            var has_pass = document.getElementById("sscc_has_pass").checked;
            var current_count = Number(document.getElementById("sscc_current_count").value);
            var candle_count = Math.max(0, current_count); // Ignores negative inputs
            var missing_candles, candle_goal_with_pass, candle_goal_no_pass;

            var summary_message, missing_message, progress_message, conclusion_message;

            
            // TRANSLATION SECTION 3
            var translation_commentary = "Erläuterung zu deinem Kerzenstand am";
            var translation_at = "um";
            var translation_you_have_collected = "Du hast";
            var translation_you_missed = "Verpasst hast du potentielle";
            var translation_sc = "Saisonkerze(n)";
            var translation_w_pass = "mit einem Saisonpass eingesammelt"; // grammar "collected"
            var translation_wo_pass = "ohne einen Saisonpass eingesammelt"; // grammar "collected"
            var translation_all_the_sc = "<b>alle</b> Saisonkerzen bisher";
            var translation_and_more = "<b>...UND MEHR?</b>";
            var translation_you_would_need = "Du bräuchtest";
            var translation_to_buy_everything = "um alle Kosmetika aus der Saison zu kaufen"
            var translation_if_you_dont_miss = "Du solltest alle Kosmetika kaufen können, aber du darfst"
            var translation_out_of = "von"
            var translation_days_remaining = "verbleibenden/m Tag(en) nicht verpassen" // grammar "dont miss"
            var translation_you_can_buy_everything = "Du kannst alle Kosmetika in dieser Saison kaufen!";
            var translation_you_cannot_buy_everything = "Leider bist du mit der verbleibenden Zeit <b>nicht in der Lage, alle Kosmetika zu kaufen</b>."
            var translation_conditional = "Leider bist du mit der verbleibenden Zeit <b>nicht in der Lage, alle Kosmetika zu kaufen</b>, ES SEI DENN du kaufst den Saisonpass, um die 30 Bonus-Saisonkerzen und die 1 Extra-Saisonkerze pro Tag zu erhalten. Jedoch wirst du nur die nicht-ultimativen Kosmetika kaufen können und darfst";


            // Responses for people with Season Pass
            if (has_pass) {
                summary_message = translation_you_have_collected + " " + candle_count + " " + translation_sc + " " + translation_w_pass + ".";
                                
                // 1. SP Commentary: How many SC you missed
                missing_candles = with_pass_before - candle_count;
                // If someone has all the Seasonal Candles
                if (candle_count == with_pass_before) {
                    missing_message = translation_you_have_collected + " " + translation_all_the_sc + ".";
                // If someone is putting in impossibly large numbers
                } else if (candle_count > with_pass_before) {
                    missing_message = translation_you_have_collected + " " + translation_all_the_sc + " " + translation_and_more;
                // Default response for reasonable numbers
                } else {
                    missing_message = translation_you_missed + " " + missing_candles + " " + translation_sc + ".";
                }

                // 2. SP Commentary: If you are able to buy all the cosmetics with the time remaining
                candle_goal_with_pass = NEED_WITH_PASS - candle_count;
                // If someone has enough SC to buy everything
                if (candle_count >= NEED_WITH_PASS) {
                    progress_message = translation_you_can_buy_everything;
                    conclusion_message = "";
                // If someone can/cannot reach the goal by the Season end
                } else {
                    progress_message = translation_you_would_need + " <b>" + candle_goal_with_pass + " " + translation_sc + "</b> " + translation_to_buy_everything + ".";
                    
                    // If it is a possible goal
                    if (candle_goal_with_pass <= with_pass_after) {
                        var remaining_with_pass_list = WITH_PASS_LIST.slice(SEASON_DAYS - total_remaining_days + 1);
                        var required_days_with_pass = SkySeasonalCandleCalculator.min_days_required(remaining_with_pass_list, candle_goal_with_pass);

                        conclusion_message = translation_if_you_dont_miss + " <b>" + required_days_with_pass + " " + translation_out_of + " " + total_remaining_days + " " + translation_days_remaining + "</b>.";
                    // If it is an impossible goal
                    } else {
                        conclusion_message = translation_you_cannot_buy_everything;
                    }
                }
            // Responses for people without Season Pass
            } else {
                summary_message = translation_you_have_collected + " " + candle_count + " " + translation_sc + " " + translation_wo_pass + ".";
                
                // 1. No-SP Commentary: How many SC you missed
                missing_candles = no_pass_before - candle_count;
                // If someone has all the Seasonal Candles
                if (candle_count == no_pass_before) {
                    missing_message = translation_you_have_collected + " " + translation_all_the_sc + ".";
                // If someone is putting in impossibly large numbers
                } else if (candle_count > no_pass_before) {
                    missing_message = translation_you_have_collected + " " + translation_all_the_sc + translation_and_more;
                // Default response for reasonable numbers
                } else {
                    missing_message = translation_you_missed + " " + missing_candles + " " + translation_sc + ".";
                }

                // 2. No-SP Commentary: If you are able to buy all the cosmetics with the time remaining
                candle_goal_no_pass = NEED_NO_PASS - candle_count;
                // If someone has enough Seasonal Candles to buy everything
                if (candle_count >= NEED_NO_PASS) {
                    progress_message = translation_you_can_buy_everything;
                    conclusion_message = "";
                // If someone can/cannot reach the goal by the Season end
                } else {
                    progress_message = translation_you_would_need + " <b>" + candle_goal_no_pass + " " + translation_sc + "</b> " + translation_to_buy_everything + ".";

                    var required_days_no_pass;
                    // If it is a possible goal
                    if (candle_goal_no_pass <= no_pass_after) {
                        var remaining_no_pass_list = NO_PASS_LIST.slice(SEASON_DAYS - total_remaining_days + 1);
                        var required_days_no_pass = SkySeasonalCandleCalculator.min_days_required(remaining_no_pass_list, candle_goal_no_pass);
                       
                        conclusion_message = translation_if_you_dont_miss + " <b>" + required_days_no_pass + " " + translation_out_of + " " +  total_remaining_days + " " + translation_days_remaining + "</b>.";
                    // If it is possible ONLY if they buy the Season Pass
                    } else if (candle_goal_no_pass <= with_pass_after + 30) {
                        var remaining_with_pass_list = WITH_PASS_LIST.slice(SEASON_DAYS - total_remaining_days + 1);
                        var required_days_with_pass = SkySeasonalCandleCalculator.min_days_required(remaining_with_pass_list, candle_goal_no_pass - 30);
                        
                        conclusion_message = translation_conditional + " <b>" + required_days_with_pass + " " + translation_out_of + " " + total_remaining_days + " " + translation_days_remaining + "</b>.";
                    // If it is an impossible goal
                    } else {
                        conclusion_message = translation_you_cannot_buy_everything;
                    }
                }
            }
            
            // Constructs the comment message
            var title_message = "<b>" + translation_commentary + " " + selected_date_pretty + " " + translation_at + " " + selected_time_pretty + " (" + selected_tz_pretty + "):</b>";

            var message = title_message + "<br>" + summary_message + "<br>" + missing_message + "<br>" + progress_message + " " + conclusion_message;

            // Fill in the table
            document.getElementById("sscc_custom_comment").innerHTML = message;
            document.getElementById("sscc_table_header").innerHTML = selected_date_pretty + " " + translation_at + " " + selected_time_pretty + " (" + selected_tz_pretty + ")";
            document.getElementById("sscc_table_A1").innerHTML = total_collected_days;
            document.getElementById("sscc_table_B1").innerHTML = total_remaining_days;
            document.getElementById("sscc_table_A2").innerHTML = no_pass_before;
            document.getElementById("sscc_table_B2").innerHTML = no_pass_after;
            document.getElementById("sscc_table_A3").innerHTML = with_pass_before;
            document.getElementById("sscc_table_B3").innerHTML = with_pass_after;
        }
    };

	mw.hook("wikipage.content").add(SkySeasonalCandleCalculator.init);

}(jQuery));