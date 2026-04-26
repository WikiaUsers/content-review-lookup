/* Any JavaScript here will be loaded for all users on every page load. */
window.BackToTopModern = true;

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */

/* to convert a date/time in one timezone to user's local time, code copied from u:valkyriecrusade:MediaWiki:Common.js */
function jstzConvertAll() {
    var l = document.querySelectorAll("[data-jstz]");
    for (var i=0; i<l.length;i++) {
        var date = new Date(l[i].dataset.jstz);
        var format = l[i].dataset.jstzformat ? l[i].dataset.jstzformat : "Y/m/d h:i A";
        var utc = l[i].dataset.jstzutc;
        utc = utc && utc.toLowerCase() === "true";
        if(format && (date instanceof Date)) {
            l[i].innerHTML=jstzFormatDate(date, format, utc);
        }
    }
}
// this function formats the date similarly to the wikis #time function
// see https://www.mediawiki.org/wiki/Help:Extension:ParserFunctions#.23time
// not all options are supported
function jstzFormatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }
    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])Y+/g, "$1" + y);
    format = format.replace(/(^|[^\\])y/g, "$1" + y.toString().substr(2, 2));
    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])F+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])M/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])m/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])n/g, "$1" + M);
    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])l+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])D/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])d/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])j/g, "$1" + d);
    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])H+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])G/g, "$1" + H);
    var h = H > 12 ? H - 12 : H === 0 ? 12 : H;
    format = format.replace(/(^|[^\\])h+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])g/g, "$1" + h);
    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])i+/g, "$1" + ii(m));
    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])s+/g, "$1" + ii(s));
    var tz = -date.getTimezoneOffset();
    var P = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    var O = P;
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        P += ii(tzHrs) + ":" + ii(tzMin);
        O += ii(tzHrs) + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])P/g, "$1" + P);
    format = format.replace(/(^|[^\\])O/g, "$1" + O);
    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])A+/g, "$1" + T);
    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])a+/g, "$1" + t);
    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);
    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);
    format = format.replace(/\\(.)/g, "$1");
    return format;
}
$(jstzConvertAll);

/* For card details on card icon hover */
window.tooltips_list = [
    {
        classname: 'card-images',
        parse: '{{CardImages|<#cardname#>}}'
    }
];
window.tooltips_config = {
    offsetX: 10,
    offsetY: 10
};

$('.advanced-tooltip').hover(function() {
    $(this).find('.tooltip-contents').show();
}, function() {
    $(this).find('.tooltip-contents').hide();
});

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

// Randomises a daily character
//*Code by:[[User:Urexill]]
//
 (function() {
     // console log errors. if things fail, check the console //
     window.handleIconError = function(img) {
        const fallback = img.getAttribute('data-fallback');
        const final = img.getAttribute('data-final');

        if (fallback) {
            console.log("First name icon failed, trying full name...");
            img.src = fallback;
            img.removeAttribute('data-fallback');
        } else if (img.src !== final) {
            console.log("Full name icon failed, using Unknown Person.png fallback...");
            img.src = final;
        }
    };

    mw.hook('wikipage.content').add(function() {
        var display = document.getElementById('daily-spotlight-display');
        if (!display) {
            return;
        }
        var apiParams = "/api.php?action=query&list=categorymembers&cmtitle=Category:Fan_Characters&cmlimit=500&format=json";
        
        fetch(apiParams)
        .then (res => res.json())
        .then (data => {
            var pages = data.query.categorymembers;
            if (!pages || pages.length === 0) {
                display.innerHTML = "No characters found in Category:Fan Characters...";
                return;
            
            }
            
            var now = new Date();
            var seed = (now.getFullYear() * 10000) + ((now.getMonth() + 1) * 100) + now.getDate();
            var chosenPage = pages[seed % pages.length];
            
            var fullName = chosenPage.title; //looks for Lastname Firstname only//
            var nameParts = fullName.split(' ');
            var firstName = nameParts[nameParts.length - 1]; //lets the script use the Name (icon).png variable alongside Full Name (icon).png)//
 
            var firstNameIcon = "/wiki/Special:FilePath/" + encodeURIComponent(firstName + " (icon).png");
            var fullNameIcon = "/wiki/Special:FilePath/" + encodeURIComponent(fullName + " (icon).png");
            var finalFallback = "/wiki/Special:FilePath/Unknown_Person.png"; //uses the unknown person.png for fallback in case it cannot find anything using the two previous variables//
             
            display.innerHTML = `
            <div class="char-daily-box">
            <div class="char-daily-header">🔥Fansekai OC of the Day🔥</div>
            <a href="/wiki/${encodeURIComponent(fullName)}">
            <div class="char-icon-wrapper">
            <img id="daily-char-img"
            src="${firstNameIcon}"
            data-fallback="${fullNameIcon}"
            data-final="${finalFallback}"
            onerror="handleIconError(this)">
            </div>
            <div class="char-daily-name">${fullName}</div>
            </a>
            </div>`;
        })
        .catch(err => {
            console.error("Spotlight Error:", err);
            display.innerHTML = "Error loading character.";
        });
    });
})();