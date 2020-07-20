/** <nowiki>
 * @name        userStats.js
 * @description Collects various data on users for processing somewhere else
 * @author      cqm <mdowdell244@gmail.com>
 * @license     GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @source      <https://github.com/onei/script/blob/master/userStats/userStats.js>
 * @comment     Due to coppa restrictions we are unable to indiscriminately gather IP addresses.
 * @comment     The most up to date version can be found on github, see @source above.
 *              If this is found elsewhere you may be viewing an out of date version 
 */

/*jshint
    asi: false, bitwise: true, boss: false, camelcase: true, curly: true,
    eqeqeq: true, es3: true, evil: false, expr: false, forin: true,
    funcscope: false, globalstrict: false, immed: true, indent: 4, lastsemic: false,
    latedef: true, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false,
    noarg: true, noempty: true, onevar: true, plusplus: true, quotmark: single,
    undef: true, unused: true, scripturl: false, smarttabs: false, shadow: false,
    strict: true, sub: false, trailing: true, white: true
*/

/*jslint
    ass: true
*/

/*global
    Date: true, Math: true, String: true, isNaN: true, parseFloat: true,
    parseInt: true
*/

(function (window, document, $, mw, mwConfig, navigator) {

    'use strict';

    /**
     * @description Zero pad numbers for toISOString polyfill
     * @source      <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#Description>
     * @param       number - Number to be padded
     */
    function datePad(number) {

        var r = String(number);

        if (r.length === 1) {
            r = '0' + r;
        }

        return r;

    }

    /**
     * @description toISOString polyfill for non-ES5 browsers
     * @source      <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#Description>
     */
    if (!Date.prototype.toISOString) {

        Date.prototype.toISOString = function () {
            return this.getUTCFullYear() +
                   '-' + datePad(this.getUTCMonth() + 1) +
                   '-' + datePad(this.getUTCDate()) +
                   'T' + datePad(this.getUTCHours()) +
                   ':' + datePad(this.getUTCMinutes()) +
                   ':' + datePad(this.getUTCSeconds()) +
                   '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
                   'Z';
        };

    }

    var userStats = {

        init: function () {

            var cookie,
                curPage = mwConfig.wgPageName,
                data,
                i,
                loadCheck,
                loggedIn = false,
                newUser = false,
                prevPage = '',
                referrer = document.referrer,
                session,
                time = (new Date()).toISOString(),
                usergroups = mwConfig.wgUserGroups;

            // don't load twice
            if (!!loadCheck) {
                return;
            }
            loadCheck = true;

            // don't gather data on bots
            // only an issue if someone is using a client side script
            // do I really need this? copied from ga extension
            for (i = 0; i < usergroups.length; i += 1) {
                if (usergroups[i].indexOf('bot') > -1) {
                    return;
                }
            }

            // if a page is reloaded, referrer will be a blank string
            // compensate for that here
            // how to compensate for new tabs being opened and going back to the old tab?

            // do I want to check if cookies are enabled?

            if (!!$.cookie('metricsNew')) {
                newUser = true;
            }

            // create the cookie
            // get overwritten if exists already
            $.cookie('metricsNew', 'true', {
                expires: 365,
                path: '/'
            });

            // check for logged in users
            if (!!mwConfig.wgUserName) {
                loggedIn = true;
            }

            cookie = $.cookie('metricsData');

            if (!cookie) {

                mw.log('no cookie');
                session = userStats.createSession();
                data = userStats.gatherData(true, session, time, loggedIn, referrer, curPage, newUser);

            } else {

                cookie.split('|');
                mw.log(cookie);

                // check the user hasn't left and come back before the cookie expired
                if (referrer.indexOf(cookie[1]) === -1) {

                    mw.log('navigated away');
                    session = userStats.createSession();
                    data = userStats.gatherData(true, session, time, loggedIn, referrer, curPage, newUser);

                } else {

                    mw.log('continue session');
                    data = userStats.gatherData(false, session, time, loggedIn, prevPage, curPage);

                }

            }

            $.cookie('metricsData', session + '|' + curPage + '|' + prevPage, {
                expires: 1, // alter to the session time here
                path: '/'
            });

            userStats.sendData(data);

        },

        /**
         * @source <http://stackoverflow.com/a/10727155/1942596>
         */
        createSession: function () {

            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                i,
                result = '';

            for (i = 0; i < 20; i += 1) {
                result += chars[Math.round(Math.random() * (chars.length - 1))];
            }

            return result;

        },

        /**
         * @param freshData boolean: true if gathering a full set of data
         * @param session   string: session id
         * @param timestamp string: ISO timestamp
         * @param loggedIn  boolean: true if the user is logged in
         * @param previous  string: referring url or name of the previous page
         * @param current   string: name of the current page
         * @param newUser   boolean: optional, true if the user has not visited the site before
         */
        gatherData: function (freshData, session, timestamp, loggedIn, previous, current, newUser) {

            var browser,
                data;

            // check if session exists already
            mw.log(freshData);

            if (freshData) {

                browser = userStats.browserDetect();

                data = {
                    newSession: true,              // boolean: for easy checking when processing on server
                    session: session,
                    time: timestamp,
                    li: loggedIn,
                    refer: previous,               // string: url of the referring site
                    current: current,
                    nu: newUser,
                    sh: window.screen.availHeight, // number: height of the user's screen in pixels
                    sw: window.screen.availWidth,  // number: width of the user's screen in pixels
                    bname: browser.name,           // string: name of the browser @example 'Chrome'
                    bmver: browser.major,          // string: name of the browser with major version @example 'Chrome 28'
                    bfver: browser.full            // string: name of the browser with full version @example 'Chrome 28.000.23.1'
                };

            } else {

                data = {
                    newSession: false,  // boolean: for easy checking when processing on server
                    session: session,
                    time: timestamp,
                    li: loggedIn,
                    previous: previous, // string: name of the previous visited page
                    current: current
                };

            }

            return data;

        },

        /**
         * @source <http://www.javascripter.net/faq/browsern.htm>
         */
        browserDetect: function () {

            var browserName = navigator.appName,
                fullVersion = parseFloat(navigator.appVersion),
                ix,
                majorVersion = parseInt(navigator.appVersion, 10),
                nAgt = navigator.userAgent,
                nameOffset,
                verOffset;

            // In Opera, the true version is after 'Opera' or after 'Version'
            if ((verOffset = nAgt.indexOf('Opera')) > -1) {
                browserName = 'Opera';
                fullVersion = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) > -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }

            // In MSIE, the true version is after 'MSIE' in userAgent
            } else if ((verOffset = nAgt.indexOf('MSIE')) > -1) {
                browserName = 'Microsoft Internet Explorer';
                fullVersion = nAgt.substring(verOffset + 5);

            // In Chrome, the true version is after "Chrome" 
            } else if ((verOffset = nAgt.indexOf('Chrome')) > -1) {
                browserName = 'Chrome';
                fullVersion = nAgt.substring(verOffset + 7);

            // In Safari, the true version is after "Safari" or after "Version" 
            } else if ((verOffset = nAgt.indexOf('Safari')) > -1) {
                browserName = 'Safari';
                fullVersion = nAgt.substring(verOffset + 7);

                if ((verOffset = nAgt.indexOf('Version')) > -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }

            // In Firefox, the true version is after "Firefox" 
            } else if ((verOffset = nAgt.indexOf('Firefox')) > -1) {
                browserName = 'Firefox';
                fullVersion = nAgt.substring(verOffset + 8);

            // In most other browsers, "name/version" is at the end of userAgent 
            } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);

                if (browserName.toLowerCase() === browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }

            // trim the fullVersion string at semicolon/space if present
            if ((ix = fullVersion.indexOf(';')) > -1) {
                fullVersion = fullVersion.substring(0, ix);
            }

            if ((ix = fullVersion.indexOf(' ')) > -1) {
                fullVersion = fullVersion.substring(0, ix);
            }

            majorVersion = parseInt(fullVersion, 10);

            if (isNaN(majorVersion)) {
                fullVersion = parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            majorVersion = browserName + ' ' + majorVersion;
            fullVersion = browserName + ' ' + fullVersion;

            return {
                name: browserName,
                major: majorVersion,
                full: fullVersion
            };

        },

        /**
         *
         */
        sendData: function (data) {

            // <http://stackoverflow.com/questions/298745/how-do-i-send-a-cross-domain-post-request-via-javascript>
            window.console.log(data);

        }

    };

    $(userStats.init());

/*
from the returned data we can calculate the time spent on the page and the trail of pages
time returned will be 0 if only one page is visited
can also detect bounce rate (visit one page and then leave)

time spent on site <http://www.kaushik.net/avinash/standard-metrics-revisited-time-on-page-and-time-on-site/>
*/

}(this, this.document, this.jQuery, this.mediaWiki, this.mediaWiki.config.values, this.navigator));

/*
== How to interact with the server ==
POST the data to a server, which is then transferred to a database (MySQL) via server side scripting (PHP?)
Immo tells me to store the data in proper tables as it's easier to work from
<http://dev.mysql.com/tech-resources/articles/mysql_intro.html>

Then when using the site, query the database to build the graphs, possibly going to need some js library for this
SQL can do this for you according to Immo. It is handy having techs in IRC.

Meiko chat:
<http://www.xlhost.com/hosting/dedicated-servers/?gclid=CPSs8PKz8rgCFU6Z4AodvS8Abw>
brickimedia use ramnode, may be better alternatives
OS Linux, Ubuntu w/ Debian
<https://clientarea.ramnode.com/cart.php?gid=15 2048MB CVZ-E5>

*/

/* </nowiki> */