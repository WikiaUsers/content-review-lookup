/* Small clipboard tools for certain pages

Table of Contents
-----------------------
 * (Tool 1) Bingo Table Generator
*/
/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mw, BannerNotification */

mw.loader.using(["mediawiki.api"]).then(function () {
    "use strict";
    //##############################################################
    /** Common helper functions **/
    // from //stackoverflow.com/questions/46041831
    function copyToClipboard(text, notice) {
        notice = notice ? (notice + "\n\n") : "";
        if (confirm(notice + "The following will be copied to your clipboard:\n\n" + text + "\n\nClick OK to confirm")) {
            var $temp = $("<textarea>");
            var brRegex = /<br\s*[\/]?>/gi;
            $("body").append($temp);
            $temp.val(text.replace(brRegex, "\r\n")).select();
            document.execCommand("copy");
            $temp.remove();
            if (BannerNotification)
                new BannerNotification($("<div>", {
                    html: "<div>Copied to clipboard</div>",
                }).prop("outerHTML"), "confirm", null, 2000).show();
        }
    }

    //##############################################################
    /** (Tool 1) Bingo Table Generator **/
    $(document).ready(function () {
        var ALLOWED_PAGE = "Bingo/Events",
            BUTTON = "#bingodata",
            MONTHS = [
                "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ],
            COLORS_TO_TEMPLATE = [
                "Black", "DarkBlue", "DarkGreen", "DarkAqua", "DarkRed", "DarkPurple", "Gold", "Gray", "DarkGray", "Blue", "Green", "Aqua", "Red", "LightPurple", "Yellow", "White"
            ],
            DIAGONALS = [0, 6, 12, 18, 24];

        // to find diagonals:
        // [0, 1, 2, 3, 4].map(function (n) {
        //     return n * 5 + n
        // });

        if (ALLOWED_PAGE !== mw.config.get("wgPageName") || $(BUTTON).length < 1) return;

        function errorHandler(err) {
            mw.notify("See the web console for details", {
                title: "Uncaught Error",
                type: "error"
            });
            console.error(err);
        }

        function getBingoData() {
            return fetch("https://api.hypixel.net/resources/skyblock/bingo")
                .then(function (response) {
                    return response.json();
                })
                .catch(errorHandler);
        }

        function constructTable(goals) {
            function replfunc(match, pattern1, pattern2, pattern3) {
                return "{{Color|" + COLORS_TO_TEMPLATE[parseInt(pattern1, 16)] + "|" + pattern2 + "}}" + pattern3;
            }

            function processStr(v) {
                var s = v[1] || "";
                while (s.search(/§[0-9a-f]/) > -1) {
                    s = s.replace(/§([0-9a-f])(.*?)(\s*§|\s*{{|$)/g, replfunc);
                }
                return [v[0] || "", s.replace(/{{Gray\|(.*?)}}/g, "$1")];
            }

            function tablize(v) {
                return "|-\n| " + v[0] + " || " + v[1];
            }
            var personal = [],
                community = [];
            goals.forEach(function (v, i) {
                (DIAGONALS.includes(i) ? community : personal).push([v.name, v.lore]);
            });

            personal = personal.map(processStr).map(tablize);
            community = community.map(processStr).map(tablize);

            return "{| class=\"wikitable\"\n! Name !! Requirement\n|-\n! colspan=\"2\" | Personal Goals\n" + personal.join("\n") + "\n|-\n! colspan=\"2\" | Community Goals\n" + community.join("\n") + "\n|}";
        }

        function th(n) {
            var num = n % 100;
            if (num >= 11 && num <= 13)
                return num + "th";
            else if (num % 10 === 1)
                return num + "st";
            else if (num % 10 === 2)
                return num + "nd";
            else if (num % 10 === 3)
                return num + "rd";
            else
                return num + "th";
        }

        function getYear(n) {
            // note: 0 = DEC 2021
            return 2021 + (Math.floor((n - 1) / 12) + 1);
        }

        function getMonth(n) {
            // note: 0 = DEC 2021
            return n % 12 === 0 ? 12 : n % 12;
        }

        function mo(n) {
            // note: 0 = DEC 2021
            return MONTHS[getMonth(n) - 1] + " " + getYear(n);
        }

        $(BUTTON).show().click(function () {
            getBingoData().then(function (data) {
                if (!data.goals)
                    mw.notify("The API supplies no bingo goals at the moment", { title: "No Data Yet", type: "error" });
                else {
                    var notice = "Note: This data is for:\n\n" + th(data.id + 1) + " bingo event (held in " + mo(data.id) + ")",
                    id = "goals-" + getYear(data.id) + "-" + getMonth(data.id);
                    copyToClipboard("{{Collapsible Section Button|id=" + id + "|name=Show/Hide}}\n{{Collapsible Section|id=" + id + "|mode=begin}}\n" + constructTable(data.goals) + "\n{{Collapsible Section|mode=end}}", notice);
                }
            });
        });
    });

});