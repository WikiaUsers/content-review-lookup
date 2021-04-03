/*
 * Upcoming matches calendar
 *
 * Powered by Abios Gaming <abiosgaming.com>
 * Authored by Rob Jackson <rjackson.me> on behalf of Gamepedia <gamepedia.com>
 *
 * This script fetches data from Abios' API, caches that data in the user's browser
 * and processes and renders that data to the page.
 */

// ----------------------------------------------------------------------------

/**
 * lscache library
 * Copyright (c) 2011, Pamela Fox
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(a,b){"function"==typeof define&&define.amd?define([],b):"undefined"!=typeof module&&module.exports?module.exports=b():a.lscache=b()}(this,function(){function a(){var a="__lscachetest__",c=a;if(void 0!==m)return m;try{g(a,c),h(a),m=!0}catch(d){m=b(d)?!0:!1}return m}function b(a){return a&&"QUOTA_EXCEEDED_ERR"===a.name||"NS_ERROR_DOM_QUOTA_REACHED"===a.name||"QuotaExceededError"===a.name?!0:!1}function c(){return void 0===n&&(n=null!=window.JSON),n}function d(a){return a+p}function e(){return Math.floor((new Date).getTime()/r)}function f(a){return localStorage.getItem(o+t+a)}function g(a,b){localStorage.removeItem(o+t+a),localStorage.setItem(o+t+a,b)}function h(a){localStorage.removeItem(o+t+a)}function i(a){for(var b=new RegExp("^"+o+t+"(.*)"),c=localStorage.length-1;c>=0;--c){var e=localStorage.key(c);e=e&&e.match(b),e=e&&e[1],e&&e.indexOf(p)<0&&a(e,d(e))}}function j(a){var b=d(a);h(a),h(b)}function k(a){var b=d(a),c=f(b);if(c){var g=parseInt(c,q);if(e()>=g)return h(a),h(b),!0}}function l(a,b){u&&"console"in window&&"function"==typeof window.console.warn&&(window.console.warn("lscache - "+a),b&&window.console.warn("lscache - The error was: "+b.message))}var m,n,o="lscache-",p="-cacheexpiration",q=10,r=6e4,s=Math.floor(864e13/r),t="",u=!1,v={set:function(k,m,n){if(a()){if("string"!=typeof m){if(!c())return;try{m=JSON.stringify(m)}catch(o){return}}try{g(k,m)}catch(o){if(!b(o))return void l("Could not add item with key '"+k+"'",o);var p,r=[];i(function(a,b){var c=f(b);c=c?parseInt(c,q):s,r.push({key:a,size:(f(a)||"").length,expiration:c})}),r.sort(function(a,b){return b.expiration-a.expiration});for(var t=(m||"").length;r.length&&t>0;)p=r.pop(),l("Cache is full, removing item with key '"+k+"'"),j(p.key),t-=p.size;try{g(k,m)}catch(o){return void l("Could not add item with key '"+k+"', perhaps it's too big?",o)}}n?g(d(k),(e()+n).toString(q)):h(d(k))}},get:function(b){if(!a())return null;if(k(b))return null;var d=f(b);if(!d||!c())return d;try{return JSON.parse(d)}catch(e){return d}},remove:function(b){a()&&j(b)},supported:function(){return a()},flush:function(){a()&&i(function(a){j(a)})},flushExpired:function(){a()&&i(function(a){k(a)})},setBucket:function(a){t=a},resetBucket:function(){t=""},enableWarnings:function(a){u=a}};return v});

// ----------------------------------------------------------------------------

// Map of game names to IDs in abios' data
// see http://ext.abiosgaming.com/extension/games
var AbiosGames = {
    'dota_2'      : '1',
    'lol'         : '2',
    'sc2'         : '3',
    'hon'         : '4',
    'csgo'        : '5',
    'hearthstone' : '6',
    'wow'         : '7',
    'smite'       : '8',
    'hots'        : '9'
};

var AbiosDataFeed = {
    vars: {
        debug: false,
        live_matches_url: 'http://ext.abiosgaming.com/extension/live-matches',
        cache_length: 5, // minutes
        games: [ // Games whose data we care about
            AbiosGames.hots
        ]
    },
    getLiveMatches: function(){
        var games = AbiosDataFeed.vars.games,
            cache_key = 'abios_matches' + JSON.stringify(games),
            dfd = jQuery.Deferred();

        if (AbiosDataFeed.vars.debug) {
            console.group("AbiosDataFeed getLiveMatches");
            console.info("Requesting live matches for games: %s", AbiosDataFeed.vars.games);
        }

        // If data is in cache, serve it!
        var data = lscache.get(cache_key);
        if (data) {
            if (AbiosDataFeed.vars.debug) {
                console.info("Data retrieved from cache.");
            }
            dfd.resolve(data);
        }
        else {
            if (AbiosDataFeed.vars.debug) {
                console.info("Data not in cache, requesting from API.");
            }

            $.ajax({
                url: this.vars.live_matches_url,
                type: 'GET',
                data: {
                    games: games
                },
                success: function(data) {
                    if (AbiosDataFeed.vars.debug) {
                        console.info("Data received for: %s; caching.", cache_key);
                    }
                    lscache.set(cache_key, data, AbiosDataFeed.vars.cache_length);
                    dfd.resolve(data);
                }
            });
        }

        if (AbiosDataFeed.vars.debug) {
            console.groupEnd();
        }

        // Returning a deferred so we don't have to wrestle with 50,000
        // callback functions
        return dfd.promise();
    }
};


// ----------------------------------------------------------------------------

var UpcomingMatches = {
    vars: {
        limit: 20  // How many rows to render
    },
    templates: {
        row: '<tr> \
                <td class="tournament"><a href="__TOURNAMENT_URL__" title="__TOURNAMENT_NAME__">__TOURNAMENT_NAME__</a></td> \
                <td class="team"><a href="__TEAM_1_URL__" title="__TEAM_1_NAME__">__TEAM_1_NAME__ <img src="__TEAM_1_SRC__" alt="" height="24"/></a></td> \
                <td>vs</td> \
                <td class="team"><a href="__TEAM_2_URL__" title="__TEAM_2_NAME__"><img src="__TEAM_2_SRC__" alt="" height="24"/> __TEAM_2_NAME__</a></td> \
                <td class="countdown"><span data-timestamp="__MATCH_TIMESTAMP__">__MATCH_TIMESTAMP__</span></td> \
             </tr>'
    },
    renderTo: function(selector, limit){
        // Render the live data feed to the given selector
        limit = limit || UpcomingMatches.vars.limit;
        var $target = jQuery(selector);

        AbiosDataFeed.getLiveMatches().done(function(live_matches){
            live_matches = live_matches.slice(0, limit);
            $.each(live_matches, function(i){

                // Ensure all the data we require is available from the feed. If not skip this row
                if (undefined === this.event       || null === this.event       ||
                    undefined === this.event.wiki  || null === this.event.wiki  ||
                    undefined === this.event.title || null === this.event.title ||
                    undefined === this.displayed   || null === this.displayed   ||
                    undefined === this.start       || null === this.start       ||
                    undefined === this.end         || null === this.end         ||
                    undefined === this.game_id     || null === this.game_id
                ) {
                    console.info("Skipping row due to incomplete data: %s", JSON.stringify(this));
                    return;
                }

                var tournament_url = this.event.wiki.indexOf('gamepedia.com') !== -1 ? this.event.wiki : ('/' + this.event.title),
                    tournament_name = this.event.title,
                    team_1_url = this.displayed.comp_a ? ('/' + this.displayed.comp_a.name) : false,
                    team_1_name = this.displayed.comp_a ? this.displayed.comp_a.name : '&ndash;',
                    team_2_url = this.displayed.comp_b ? ('/' + this.displayed.comp_b.name) : false,
                    team_2_name = this.displayed.comp_b ? this.displayed.comp_b.name : '&ndash;',
                    timestamp_start = this.start,
                    timestamp_end = this.end,
                    livestream_url = this.caster ? this.caster._self : this.event._self,
                    srcA,
                    srcB;

                // Determine image sources (copied straight from abios' chrome extension)
                if (this.displayed.comp_a == null || (this.displayed.comp_a.nation_flag == null)) {
                    srcA = "https://img.abiosgaming.com/flags/Unknown.png";
                } else {
                    srcA = "http://img.abiosgaming.com/flags/"
                        + this.displayed.comp_a.nation_flag.filename;
                }

                if (this.displayed.comp_b == null || (this.displayed.comp_b.nation_flag == null)) {
                    srcB = "https://img.abiosgaming.com/flags/Unknown.png";
                } else {
                    srcB = "http://img.abiosgaming.com/flags/"
                        + this.displayed.comp_b.nation_flag.filename;

                }
                var row_html = UpcomingMatches.templates.row;

                row_html = row_html.replace(/__TOURNAMENT_URL__/g, tournament_url);
                row_html = row_html.replace(/__TOURNAMENT_NAME__/g, tournament_name);
                row_html = row_html.replace(/__TEAM_1_URL__/g, team_1_url);
                row_html = row_html.replace(/__TEAM_1_NAME__/g, team_1_name);
                row_html = row_html.replace(/__TEAM_1_SRC__/g, srcA);
                row_html = row_html.replace(/__TEAM_2_URL__/g, team_2_url);
                row_html = row_html.replace(/__TEAM_2_NAME__/g, team_2_name);
                row_html = row_html.replace(/__TEAM_2_SRC__/g, srcB);
                row_html = row_html.replace(/__MATCH_TIMESTAMP__/g, timestamp_start);

                var $row = $(row_html);

                // If any of the teams are blank, remove the link and replace it with an ndash
                if (team_1_url === false) {
                    $row.find('.team:first a').replaceWith($('<span>&ndash;</span>'));
                }
                if (team_2_url === false) {
                    $row.find('.team:last a').replaceWith($('<span>&ndash;</span>'));
                }

                // Start the countdown
                var row_countdown = countdown(new Date(timestamp_start * 1000),
                    function(ts) {
                        // Check if match is live, over, or coming up
                        var now = Math.floor(new Date().getTime()/1000);
                        countdown.setLabels('|s|m|hr|d||||||','|s|m|hr|d||||||',' ',' ',' ');
                        if (timestamp_end !== null && timestamp_end < now) { // Match over
                            clearInterval(row_countdown);
                            $row.find('.countdown span').html("Finished");
                        }
                        else if (timestamp_start <= now && timestamp_end > now) { // Live
                            $row.find('.countdown span').html('<a href="'+ livestream_url +'">LIVE</a>');
                        }
                        else {
                            $row.find('.countdown span').html(ts.toHTML());
                        }
                        countdown.resetLabels();
                    },
                    countdown.DAYS|countdown.HOURS|countdown.MINUTES);

                $target.append($row);
            });
        });
    }
};

// ----------------------------------------------------------------------------

jQuery(document).ready(function(){
    if (jQuery('#upcoming_matches')) {
        UpcomingMatches.renderTo('#upcoming_matches tbody');
    }
});

/*
 * END Upcoming matches calendar
*/