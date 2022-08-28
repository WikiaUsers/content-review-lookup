// Sky Seasonal Candle Calculator
// Author: Ray808080
// 
// Description: Gives you information about your Seasonal Candles count for the Season
// Sky Seasonal Candle Calculator
// Author: Ray808080
// Version: 0.1.1
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
    </nowiki>
    </div>
    <div id="sky-seasonal-candle-calculator-output"></div>
    </div>
*/

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
    	version: '0.1.1',
        init: importArticles({
				type: 'script',
				articles: [
					'u:dev:MediaWiki:Moment.js',
					'MediaWiki:Moment-Timezone.js'
				]
			}).then(function () {

            if ($('#sky-seasonal-candle-calculator-wrapper').length) {
                
                TODAY = new Date();
                TGC_ZONE = 'America/Los_Angeles';
                LOCALE_ZONE = moment.tz.guess(true);
                LOCALE_TZ = moment.tz(LOCALE_ZONE).zoneAbbr();
                NOW = moment().format("HH:mm:ss");

                // Get the initial constants from HTML
                SkySeasonalCandleCalculator.get_data();
                SEASON_DAYS = SkySeasonalCandleCalculator.diff(SEASON_START, SEASON_END);
                DOUBLE_DAYS = SkySeasonalCandleCalculator.diff(DOUBLE_START, DOUBLE_END);

                // Sets up the HTML initially
                document.getElementById('sky-seasonal-candle-calculator-output').innerHTML = /*
                */'<p>The <b>Season of <span id="sscc_season_name"></span></b> lasts <span id="sscc_season_days"></span> days long, from <span id="sscc_season_start"></span> to <span id="sscc_season_end"></span>.</p>' + /*
                */'<p id="sscc_double_event">The <b>Double Seasonal Candle Event</b> lasts <span id="sscc_double_days"></span> days long, from <span id="sscc_double_start"></span> to <span id="sscc_double_end"></span>.</p>' + /*

                */'<p>To buy all the cosmetics in the season, you will need:<br>' + /*
                */'- <span id="sscc_need_no_pass"></span> Seasonal Candles with NO Season Pass. <span id="sscc_skippable_message"></span> Takes approximately <span id="sscc_need_no_pass_days"></span> regular days.<br>' + /*
                */'- <span id="sscc_need_with_pass"></span> Seasonal Candles with the Season Pass. Takes approximately <span id="sscc_need_with_pass_days"></span> regular days.</p>' + /*

                */'<i>Note: Please know you should never feel pressured to buy the Season Pass.</i></p>' + /*

                */'<label for="sscc_date_picker">Choose date:</label>&nbsp;' + /*
                */'<input type="date" id="sscc_date_picker" name="sscc_date_picker" onchange="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="Today" onclick="return SkySeasonalCandleCalculator.today();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="Season Start" onclick="return SkySeasonalCandleCalculator.start_date();"><br>' + /*

                */'<label for="sscc_time_picker">Choose time (<span id="sscc_locale_tz"></span>):</label>&nbsp;' + /*
                */'<input type="time" id="sscc_time_picker" name="sscc_time_picker" onchange="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /* 
                */'<input type="submit" class="wds-button wds-is-secondary" value="Now" onclick="return SkySeasonalCandleCalculator.now_time();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="Reset" onclick="return SkySeasonalCandleCalculator.reset_time();"><br>' + /*

                */'<label for="sscc_current_count">Number of Seasonal Candles you currently have:</label>&nbsp;' + /*
                */'<input type="number" id="sscc_current_count" name="sscc_current_count" value="0" min="0" max="550" onchange="return SkySeasonalCandleCalculator.calculate();"><br>' + /*

                */'<label for="sscc_has_pass">Do you have a Season Pass?</label>&nbsp;' + /*
                */'<input type="checkbox" id="sscc_has_pass" name="sscc_has_pass" onclick="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /*
                */'<br><br>' + /*

                */'<input type="submit" class="wds-button" value="Calculate" onclick="return SkySeasonalCandleCalculator.calculate();">&nbsp;' + /*
                */'<input type="submit" class="wds-button wds-is-secondary" value="Clear" onclick="return SkySeasonalCandleCalculator.reset();">' + /*
                */'<br><br>' + /*

                */'<p id="sscc_custom_comment"></p>' + /*         
                */'<div id="sscc_general_table"></div>';

                // Fills in the info for the Season
                document.getElementById("sscc_season_name").innerHTML = SEASON_NAME;
                document.getElementById("sscc_season_start").innerHTML = SEASON_START.toLocaleString("en", { dateStyle: "medium", timeStyle: "short" });
                document.getElementById("sscc_season_end").innerHTML = SEASON_END.toLocaleString("en", { dateStyle: "medium", timeStyle: "short" });
                document.getElementById("sscc_season_days").innerHTML = SEASON_DAYS;
                
                // Fills in the info for a Double Event if it exists
                if (DOUBLE_EVENT) {
                    document.getElementById("sscc_double_start").innerHTML = DOUBLE_START.toLocaleString("en", { dateStyle: "medium", timeStyle: "short" });
                    document.getElementById("sscc_double_end").innerHTML = DOUBLE_END.toLocaleString("en", { dateStyle: "medium", timeStyle: "short" });
                    document.getElementById("sscc_double_days").innerHTML = DOUBLE_DAYS;
                } else {
                    document.getElementById("sscc_double_event").innerHTML = "A <b>Double Seasonal Candle Event</b> has not been announced.";
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
            DOUBLE_EVENT = Boolean(constants.DOUBLE_EVENT);
            DOUBLE_START = new Date(String(constants.DOUBLE_START));
            DOUBLE_END = new Date(String(constants.DOUBLE_END));
            
            SEASON_DAYS = SkySeasonalCandleCalculator.diff(SEASON_START, SEASON_END);
            DOUBLE_DAYS = SkySeasonalCandleCalculator.diff(DOUBLE_START, DOUBLE_END);
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
        diff: function (start, end) {
            const ONE_DAY_IN_MS = 86400000;
            // Takes into consideration that the End times are 1 minute off
            if (start == SEASON_END || start == DOUBLE_END || end == SEASON_END || end == DOUBLE_END) {
                return Math.round((Math.abs(end - start)+1000)/ONE_DAY_IN_MS); 
            }
            return Math.ceil(Math.abs(end - start)/ONE_DAY_IN_MS);
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
            var locale_tz = locale_lookup.zoneAbbr();
            
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
            document.getElementById("sscc_general_table").innerHTML = '<div class="article-table-wrapper">' + /*
                */'<table class="table article-table">' + /*
                    */'<tbody>' + /* 
                        */'<tr>' + /*
                            */'<th style="text-align:center;" colspan="4" id="sscc_table_header"></th>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<td style="text-align:right;" id="sscc_table_A1"></td>' + /*
                            */'<td>Day(s) into the Season</td>' + /*
                            */'<td style="text-align:right;" id="sscc_table_B1"></td>' + /*
                            */'<td>Day(s) left in the Season</td>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<th style="text-align:center;" colspan="4">Without the Season Pass</th>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<td style="text-align:right;" id="sscc_table_A2"></td>' + /*
                            */'<td>Current total collectable Seasonal Candle(s)</td>' + /*
                            */'<td style="text-align:right;" id="sscc_table_B2"></td>' + /*
                            */'<td>Remaining collectable Seasonal Candle(s)</td>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<th style="text-align:center;" colspan="4">With the Season Pass</th>' + /*
                        */'</tr>' + /*
                        */'<tr>' + /*
                            */'<td style="text-align:right;" id="sscc_table_A3"></td>' + /*
                            */'<td>Current total collectable Seasonal Candle(s)</td>' + /*
                            */'<td style="text-align:right;" id="sscc_table_B3"></td>' + /*
                            */'<td>Remaining collectable Seasonal Candle(s)</td>' + /*
                        */'</tr>' + /*
                    */'</tbody>' + /*
                */'</table></div>';
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
            var selected_date_pretty = moment.tz(datetime_value, LOCALE_ZONE).format('MMM DD, YYYY');
            var selected_time_pretty = moment.tz(datetime_value, LOCALE_ZONE).format('LT');
            var selected_time_tz = moment.tz(datetime_value, LOCALE_ZONE).format('z');

            // ---------- GENERAL TABLE START -------------------------------------------

            // ---------- COLUMN A ------------------------------------------------------
            // Counting the number of days that have passed in the Season
            var total_collected_days;

            // Catch if date is earlier than Season start date
            if (selected_date < SEASON_START) {
                total_collected_days = 0;
            // Catch if date is later than Season end date
            } else if (selected_date > SEASON_END) {
                total_collected_days = SkySeasonalCandleCalculator.diff(SEASON_START, SEASON_END + 1000);
            // Otherwise, the date is between Season start and end 
            } else {
                total_collected_days = SkySeasonalCandleCalculator.diff(SEASON_START, selected_date);
            }

            // Converting the days that have passed into Seasonal Candles
            // Baseline is that non-SP is maxed out at 5 per day and
            // SP is maxed out at 6 per day (when there is no Double Candle Event)
            var no_pass_before = total_collected_days*5;
            var with_pass_before = total_collected_days*6;
            if (total_collected_days > 0) {
                with_pass_before += 30; // Bonus for buying SP
            }

            // Need to add the extra 1 Seasonal Candle per day that you can get during
            // Double Candle Events, IF it is already announced.
            // Otherwise, if there is no Double Candle Annoucement, give baseline calculations.
            if (DOUBLE_EVENT) {
                // Include ALL of the extra candles from event
                if (selected_date > DOUBLE_END) {
                    no_pass_before += DOUBLE_DAYS;
                    with_pass_before += DOUBLE_DAYS;
                // Include SOME of the extra candles from event
                } else if (selected_date > DOUBLE_START && selected_date <= DOUBLE_END) {
                    no_pass_before += SkySeasonalCandleCalculator.diff(DOUBLE_START, selected_date);
                    with_pass_before += SkySeasonalCandleCalculator.diff(DOUBLE_START, selected_date);
                }
            }

            // ---------- COLUMN B ------------------------------------------------------
            // Counting the number of remaining days in the Season
            var total_remaining_days = SEASON_DAYS - total_collected_days;

            // Converting the remaining days into Seasonal Candles
            // Baseline is that non-SP is maxed out at 5 per day and
            // SP is maxed out at 6 per day (when there is no Double Candle Event)
            var no_pass_after = total_remaining_days*5;
            var with_pass_after = total_remaining_days*6;

            // Need to add the extra 1 Seasonal Candle per day that you can get during
            // Double Candle Events, IF it is already announced.
            // Otherwise, if there is no Double Candle Annoucement, give baseline calculations.
            if (DOUBLE_EVENT) {
                // Include ALL of the extra candles from event
                if (selected_date < DOUBLE_START) {
                    no_pass_after += DOUBLE_DAYS;
                    with_pass_after += DOUBLE_DAYS;
                // Include SOME of the extra candles from event
                } else if (selected_date > DOUBLE_START && selected_date <= DOUBLE_END) {
                    no_pass_after += SkySeasonalCandleCalculator.diff(selected_date, DOUBLE_END);
                    with_pass_after += SkySeasonalCandleCalculator.diff(selected_date, DOUBLE_END);
                }
            }

            // ---------- GENERAL TABLE END -------------------------------------------

            // ---------- CUSTOM COMMENTARY ------------------------------------------
            var has_pass = document.getElementById("sscc_has_pass").checked;
            var current_count = Number(document.getElementById("sscc_current_count").value);
            var candle_count = Math.max(0, current_count); // Ignores negative inputs
            var missing_candles, candle_goal_with_pass, candle_goal_no_pass;

            var summary_message, missing_message, progress_message, conclusion_message;

            // Responses for people with Season Pass
            if (has_pass) {
                summary_message = "You have collected " + candle_count + " Seasonal Candle(s) with a Seasonal Pass.";
                                
                // 1. SP Commentary: How many SC you missed
                missing_candles = with_pass_before - candle_count;
                // If someone has all the Seasonal Candles
                if (candle_count == with_pass_before) {
                    missing_message = "You've collected <b>all</b> the Seasonal Candles so far.";
                // If someone is putting in impossibly large numbers
                } else if (candle_count > with_pass_before) {
                    missing_message = "You've collected <b>all</b> the Seasonal Candles so far <b>..AND MORE?</b>";
                // Default response for reasonable numbers
                } else {
                    missing_message = "You missed a potential " + missing_candles + " Seasonal Candle(s).";
                }

                // 2. SP Commentary: If you are able to buy all the cosmetics with the time remaining
                candle_goal_with_pass = NEED_WITH_PASS - candle_count;
                // If someone has enough SC to buy everything
                if (candle_count >= NEED_WITH_PASS) {
                    progress_message = "You can buy all the cosmetics this Season!";
                    conclusion_message = "";
                // If someone can/cannot reach the goal by the Season end
                } else {
                    progress_message = "You would need <b>" + candle_goal_with_pass + " Seasonal Candle(s)</b> to buy all the cosmetics in this Season.";
                    
                    // If it is a possible goal
                    if (candle_goal_with_pass <= with_pass_after) {
                        var required_days_with_pass = Math.ceil(candle_goal_with_pass/6);
                        
                        conclusion_message = "You should be able to buy all the cosmetics if you don't miss <b>" + required_days_with_pass + " out of the " + total_remaining_days + " day(s) remaining</b>.";
                    // If it is an impossible goal
                    } else {
                        conclusion_message = "Unfortunately, with the time remaining, <b>you will not be able to buy all the cosmetics</b>.";
                    }
                }
            // Responses for people without Season Pass
            } else {
                summary_message = "You have collected " + candle_count + " Seasonal Candle(s) without a Seasonal Pass.";
                
                // 1. No-SP Commentary: How many SC you missed
                missing_candles = no_pass_before - candle_count;
                // If someone has all the Seasonal Candles
                if (candle_count == no_pass_before) {
                    missing_message = "You've collected <b>all</b> the Seasonal Candles so far.";
                // If someone is putting in impossibly large numbers
                } else if (candle_count > no_pass_before) {
                    missing_message = "You've collected <b>all</b> the Seasonal Candles so far <b>..AND MORE?</b>";
                // Default response for reasonable numbers
                } else {
                    missing_message = "You missed a potential " + missing_candles + " Seasonal Candle(s).";
                }

                // 2. No-SP Commentary: If you are able to buy all the cosmetics with the time remaining
                candle_goal_no_pass = NEED_NO_PASS - candle_count;
                // If someone has enough Seasonal Candles to buy everything
                if (candle_count >= NEED_NO_PASS) {
                    progress_message = "You can buy all the cosmetics this Season!";
                    conclusion_message = "";
                // If someone can/cannot reach the goal by the Season end
                } else {
                    progress_message = "You would need <b>" + candle_goal_no_pass + " Seasonal Candle(s)</b> to buy all the cosmetics in this Season.";

                    var required_days_no_pass;
                    // If it is a possible goal
                    if (candle_goal_no_pass <= no_pass_after) {
                        required_days_no_pass = Math.ceil(candle_goal_no_pass/5);
                        
                        conclusion_message = "With the time remaining, you should be able to buy all the cosmetics if you don't miss <b>" + required_days_no_pass + " out of the " + total_remaining_days + " day(s) remaining</b>.";
                    // If it is possible ONLY if they buy the Season Pass
                    } else if (candle_goal_no_pass <= with_pass_after + 30) {
                        required_days_no_pass = Math.ceil((candle_goal_no_pass-30)/6);
                        
                        conclusion_message = "Unfortunately, with the time remaining, <b>you will not be able to buy all the cosmetics</b> UNLESS you buy the Season Pass. However, you will only be able to buy the non-Ultimate cosmetics and you must not miss <b>" + required_days_no_pass + " out of the " + total_remaining_days + " day(s) remaining</b>.";
                    // If it is an impossible goal
                    } else {
                        conclusion_message = "Unfortunately, with the time remaining, <b>you will not be able to buy all the cosmetics</b>.";
                    }
                }
            }
            
            // Constructs the comment message
            var title_message = "<b>Commentary for your status on " + selected_date_pretty + " at " + selected_time_pretty + " (" + selected_time_tz + "):</b>";

            var message = title_message + "<br>" + summary_message + "<br>" + missing_message + "<br>" + progress_message + " " + conclusion_message;

            // Fill in the table
            document.getElementById("sscc_custom_comment").innerHTML = message;
            document.getElementById("sscc_table_header").innerHTML = selected_date_pretty + " at " + selected_time_pretty + " (" + selected_time_tz + ")";
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