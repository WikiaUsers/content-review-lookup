/* Any JavaScript here will be loaded for all users on every page load. */

// Image List
switch (true) {
    case /Rollplay/.test(mw.config.get('wgPageName')):
        // Backgrounds for page "Rollplay"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/4/42/Rollplay_Background.jpg/revision/latest"];
        break;
    case /Hardcore_Heroes/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Hardcore_Heroes"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/2/2a/Van%26Mal.jpg/revision/latest"];
        break;
    case /Akuban_Knights/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Akuban_Knights"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/b/b1/Sara%26Bud.jpg/revision/latest"];
        break;
    case /Frozen_Frontier/.test(mw.config.get('wgPageName')):
    case /Homeward_Bound/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Frozen_Frontier" & "Homeward Bound"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/6/6b/FroFro_Background.jpg/revision/latest"];
        break;
    case /Desperate_Measures/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Desperate_Measures"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/1/12/DM_Background.jpg/revision/latest"];
        break;
    case /Dicing_with_Death/.test(mw.config.get('wgPageName')):
    	//Backgrounds for page "Dicing_with_Death"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/5/59/Georg%26Divan.jpg/revision/latest"];
        break;
    case /Of_Dice_and_Men/.test(mw.config.get('wgPageName')):
    	//Backgrounds for page "Of_Dice_and_Men"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/6/6e/Nevets%26Vicho.jpg/revision/latest"];
        break;
    case /Gnomes,_Tomes_%26_Catacombs/.test(mw.config.get('wgPageName')):
    	//Backgrounds for page "Gnomes,_Tomes_%26_Catacombs"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/d/dc/ChadBarbo%26GeraldKnott.jpg"];
        break;
    case /Misscliks:_Devotion/.test(mw.config.get('wgPageName')):
    	//Backgrounds for page "Misscliks:_Devotion"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/8/82/Ransom%26Olivia.jpg"];
        break;
    default:
        //Backgrounds for all the other pages
        window.bgrandom_list = [
        "https://static.wikia.nocookie.net/regalgoblins/images/b/b1/Sara%26Bud.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/2/2a/Van%26Mal.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/4/42/Rollplay_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/1/12/DM_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/5/59/Georg%26Divan.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/7/70/Scoria_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/6/6e/Nevets%26Vicho.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/6/6b/FroFro_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/d/dc/ChadBarbo%26GeraldKnott.jpg",
        "https://static.wikia.nocookie.net/regalgoblins/images/8/82/Ransom%26Olivia.jpg"];
        break;
}
// Import always after you declare your variables or in MediaWiki:ImportJS
importArticles({
    type: 'script',
    articles: [
        'u:dev:RandomBackground/code.js'
    ]
});

// START - FORMAT GOOGLE CALENDAR
// Base Source : https://github.com/MilanLund/FormatGoogleCalendar
// Script gets public Google calendar and displays list of events.
window.formatGoogleCalendar = function () {
    var t = function (e, t) {
            var n = [],
                r = 0,
                values = t.keys.split(", "),
                p = document.querySelector(t.selector);
            if (t.printAll) {
                n = e.items.filter(function (v, i, a) {
                    return values.some(function (key) {
                        return v.summary.includes(key) && a.findIndex(function (t) {
                            return (t.summary === v.summary)
                        }) === i
                    });
                }).sort(l);
                for (r in n) p.insertAdjacentHTML("beforeend", i(n[r], t.itemsTagName));
            } else p.innerHTML = ps(e.items.find(function (v) {
                return values.some(function (key) {
                    return v.summary.includes(key) && !v.summary.toLowerCase().includes('cancelled')
                })
            }));
        },
        n = function (n) {
            e = n;
            var r = n.calendarUrl;
            n && (r = r.concat("&singleEvents=true&orderBy=starttime")), n.timeMin && (r = r.concat("&timeMin=" + n.timeMin)), n.timeMax && (r = r.concat("&timeMax=" + n.timeMax));
            var a = new XMLHttpRequest();
            a.open("GET", r, !0), a.onload = function () {
                if (a.status >= 200 && a.status < 400) {
                    var e = JSON.parse(a.responseText);
                    t(e, n)
                } else console.error(err)
            }, a.onerror = function () {
                console.error(err)
            }, a.send()
        },
        r = function (e, t) {
            var n, r = {};
            for (n in e) r[n] = e[n];
            for (n in t) r[n] = t[n];
            return r
        },
        i = function (t, n) {
            var dateOptions = {
                weekday: 'short',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
                hour12: false
            };
            var i = new Date(t.start.dateTime || t.start.date),
                td = new Date(Date.now());
            var f = i.toLocaleDateString("en-US", dateOptions),
                h,
                l = "<" + n + ">",
                v = t.summary || "";
            if (v.toLowerCase().includes('cancelled')) l = "<" + n + " class='cancelled'>";
            else if (!t.originalStartTime) l = "<" + n + " class='oneTimeEvent'>";
            else if ((JSON.stringify(t.start) !== JSON.stringify(t.originalStartTime))) l = "<" + n + " class='postponed'>";

            l += "<div><span class='summary'>" + v + "</span><span class='date'>" + f + "</span></div><div><span class='start'>Starts in:</span><span class='countDown'>";
            l += ((h = c(i, td, 'day')) > 1) ? (Math.round(h) + ' days') : ((h = c(i, td, 'hour')) > 1) ? (Math.round(h) + ' hours') : ((h = Math.round(c(i, td, 'minute'))) > 0) ? (h + ' minutes') : 'Started';
            l += "</span></div>";
            return l + "</" + n + ">"
        },
        l = function (e, t) {
            return new Date(e.start.dateTime || e.start.date).getTime() - new Date(t.start.dateTime || t.start.date).getTime()
        },
        c = function (a, b, c) {
                var one;
                if (c=='day') one = 24 * 60 * 60 * 1000;
                else if (c=='hour') one = 60 * 60 * 1000;
                else one = 60 * 1000;
                return (a - b) / one;
        },
        ps = function (obj) {
            var dt;
            if (obj == null) return 'Currently Unknown';
            else dt = new Date(obj.start.dateTime || obj.start.date);
            return dt.getDate() + nth(dt.getDate()) + " " + dt.toLocaleString('default', {
                month: 'long'
            });
        },
        nth = function (d) {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        };
    return {
        init: function (e) {
            var calVars = {
                calendarUrl: 'https://www.googleapis.com/calendar/v3/calendars/r66id1eklub8t8d8f3q79tp3ak@group.calendar.google.com/events?key=AIzaSyBADUV8x9CWpF-KxCaF2GynEsNLlHJiieE',
                itemsTagName: 'li',
                selector: '#calendarEvents',
                timeMin: (new Date(Date.now())).toISOString(),
                timeMax: (new Date(Date.now() + 15120e5)).toISOString(),
                keys: '',
                printAll: true,
            };
            calVars = r(calVars, e), n(calVars)
        }
    }
}();
//END - FORMAT GOOGLE CALLENDAR
//START - GOOGLE CALENDAR - INITIALISATION
if ($('body').hasClass('skin-fandomdesktop') && $("#calendarEvents").length !== 0) 
formatGoogleCalendar.init({
    keys: $('#calendarEvents').data('keys')
});
if ($("#singleCalEvent").length !== 0) 
formatGoogleCalendar.init({
    selector: '#singleCalEvent',
    keys: $('#singleCalEvent').data('keys'),
    printAll: false,
});
//END - GOOGLE CALENDAR - INITIALISATION