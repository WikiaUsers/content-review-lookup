/* Any JavaScript here will be loaded for all users on every page load. */

/* Facebook Like Button */
$(function fBox() {
    $('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=174790955905981&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="280" height="250" scrolling="no" />');
});

/* IRC */
function onloadhookcustom() {
    var replace = document.getElementById("JRChatReplace");
    if (replace !== null) {
        replace.innerHTML = '<iframe src="http://webchat.freenode.net/?channels=Wikia-CSO" width="670" height="400"></iframe>';
        if (window.attachEvent) window.attachEvent("onbeforeunload", confirmexitjrchat);
        else window.onbeforeunload = confirmexitjrchat;
    }
    //alert(document.getElementById("JRChatReplace").innerHTML);
}

if (window.addEventListener) window.addEventListener("load", onloadhookcustom, false);
else if (window.attachEvent) window.attachEvent("onload", onloadhookcustom);

/* Message Wall User Tags */
window.MessageWallUserTags = {
    tagColor: 'black',
    glow: true,
    glowSize: '3px',
    glowColor: 'white',
    users: {
        'Lemoness': 'Administrator',
        'Athener': 'Administrator',
        'ConTraZ_VII': 'Administrator',
        'UserU': 'Administrator',
        'Vampjrehunter': 'Legendary Hunter',
        'NXPumpAction': 'Administrator',
    }
};

/* Tool tips */
var tooltips_list = [{
    classname: 'custom-tooltip-text',
    text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
}, {
    classname: 'custom-tooltip-parse',
    parse: '{|style="white-space:nowrap;"\n!Weapon:\n|<#weapon#>\n|-\n!Buy Price:\n|<#price#>\n|-\n!Damage:\n|<#damage#>\n|-\n!Accuracy:\n|<#accuracy#>\n|-\n!Recoil:\n|<#recoil#>\n|-\n!Fire Rate:\n|<#rof#>\n|-\n!Weight:\n|<#weight#>\n|-\n!Ammo:\n|<#ammo#>\n|-\n!Fire Mode:\n|<#firemode#>\n|-\n!Secondary:\n|<#sf#>\n|-\n!Used By:\n|<#who#>\n|',
}, {
    classname: 'basic-tooltip',
    delay: 500,
    onHide: function() {
        $(this).html('');
    },
}, ];

/* Layout Switch Button */
window.oasisText = "Wikia Layout";
window.mobileText = "Mobile View";

/* User Tags */
window.UserTagsJS = {
    modules: {
        inactive: 15,
        mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
        autoconfirmed: false,
        metafilter: {
            sysop: ['bureaucrat'],
            chatmoderator: ['sysop'],
            rollback: ['sysop'],
        },
        newuser: true,
    },
    tags: {
        serg: {
            u: 'Sergeant',
            order: 2
        },
        sserg: {
            u: 'Staff Sergeant',
            order: 1
        },
        corp: {
            u: 'Corporal',
            order: 3
        },
        hier: {
            u: 'Hierarchy',
            order: 1
        },
        fgm: {
            u: 'Former Game Master',
            order: 0
        },
        gm: {
            u: 'Game Master',
            order: 0
        },
        seni: {
            u: 'Senior',
            order: 5
        },
        forum: {
            u: 'Forum Management',
            order: 6
        },
        night: {
            u: 'Nightfall',
            order: 6
        },
        indo: {
            u: 'Indonesian',
            order: 3
        },
        watch: {
            u: 'Watchman',
            order: 4
        },
        kjs: {
            u: 'The One Who Went on a Holiday Trip',
            order: 99
        },
        ssupervise: {
            u: 'Under Strict Supervision',
            order: 0
        },
        supervise: {
            u: 'Under Supervision',
            order: 0
        },
    }
};
UserTagsJS.modules.custom = {
    'Lemoness': [
        'sysop',
        'seni',
        'rollback',
        'chatmoderator',
    ],
    'ConTraZ VII': [
        'sysop',
        'bureaucrat',
        'hier',
        'anadmin',
        'seni',
    ],
    'Athener': ['night'],
    'Vampjrehunter': ['corp'],
    'Ireegg96': ['corp'],
    'Kyroskoh': ['fgm'],
    'Dragoncty': ['gm'],
    'UserU': ['forum'],
    'Orangbiasa': ['watch', 'indo', 'seni'],
    'InspectorWikia': ['indo'],
    'Kjskjs': ['kjs'],
    'Ireegg96': ['ssupervise'],
};
UserTagsJS.modules.userfilter = {
    'Lemoness': ['bureaucrat'],
    'Orangbiasa': ['bureaucrat'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop'];
UserTagsJS.modules.mwGroups = ['rollback'];

/* Auto-Refresh for Wiki Activity */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:WikiActivity"];

/* Spoilers */
window.SpoilerAlert = {
    isSpoiler: function() {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

/* Adds Purge button */
window.PurgeButtonText = 'Refresh';

// *****************************************************
// * Javascript Countdown Timer                        *
// * Version 1.6.0                                     *
// *                                                   *
// * Original script by Splarka                        *
// * Additional script by Eladkse                      *
// * Multi-language support script by Dantman          *
// *****************************************************
//
// Usage Example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2013 00:00:00 GMT</span> until the new year...
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
//  <span class="nomorecountdown">Countdown finished.</span>
//
// Output Example:
//  Only 25 days, 6 hours, 42 minutes and 23 seconds until the new year...
//

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = Math.floor((then.getTime() - now.getTime()) / 1000);

    var userconfig = (window.CountdownConfig) ? window.CountdownConfig : {};
    var config = $.extend(true, {
        'en': {
            and: "and",
            second: "second",
            seconds: "seconds",
            minute: "minute",
            minutes: "minutes",
            hour: "hour",
            hours: "hours",
            day: "day",
            days: "days"
        },
        'fr': {
            and: "et",
            second: "seconde",
            seconds: "secondes",
            minute: "minute",
            minutes: "minutes",
            hour: "heure",
            hours: "heures",
            day: "jour",
            days: "jours"
        },
        'es': {
            and: "y",
            second: "segundo",
            seconds: "segundos",
            minute: "minuto",
            minutes: "minutos",
            hour: "hora",
            hours: "horas",
            day: "día",
            days: "días"
        },
        'de': {
            and: "und",
            second: "Sekunde",
            seconds: "Sekunden",
            minute: "Minute",
            minutes: "Minuten",
            hour: "Stunde",
            hours: "Stunden",
            day: "Tag",
            days: "Tage"
        },
        'it': {
            and: "e",
            second: "secondo",
            seconds: "secondi",
            minute: "minuto",
            minutes: "minuti",
            hour: "ora",
            hours: "ore",
            day: "giorno",
            days: "giorni"
        },
        'pl': {
            and: "i",
            second: "sekund(y)",
            seconds: "sekund(y)",
            minute: "minut(y)",
            minutes: "minut(y)",
            hour: "godzin(y)",
            hours: "godzin(y)",
            day: "dni",
            days: "dni"
        },
        'hu': {
            and: "és",
            second: "másodperc",
            seconds: "másodpercek",
            minute: "perc",
            minutes: "percek",
            hour: "óra",
            hours: "órák",
            day: "nap",
            days: "napok"
        }
    }, userconfig);

    // define language
    function msg(name) {
        if (wgContentLanguage in config && name in config[wgContentLanguage]) {
            return config[wgContentLanguage][name];
        }
        return config.en[name];
    }

    // stop the script when the even date is reached and display the notification
    if (then < now) {
        var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
        for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
        var countdowns = getElementsByClassName(document, 'span', 'countdown');
        for (var i in countdowns) countdowns[i].style.display = 'none';
        var nomorecountdowns = getElementsByClassName(document, 'span', 'nomorecountdown');
        for (var i in nomorecountdowns) nomorecountdowns[i].style.display = 'inline';
        return;
    }

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }



    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
    }

    // calculate the diff
    // seconds
    left = (diff % 60) + ' ' + msg(($(diff % 60)[0] == 1) ? 'second' : 'seconds');

    // minutes
    diff = Math.floor(diff / 60);
    left = (diff % 60) + ' ' + msg(($(diff % 60)[0] == 1) ? 'minute' : 'minutes') + ', ' + msg('and') + ' ' + left;

    // hours
    diff = Math.floor(diff / 60);
    left = (diff % 24) + ' ' + msg(($(diff % 24)[0] == 1) ? 'hour' : 'hours') + ', ' + left;

    // days
    diff = Math.floor(diff / 24);
    left = diff + ' ' + msg(($(diff)[0] == 1) ? 'day' : 'days') + ', ' + left;

    timers[i].firstChild.nodeValue = left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    // hide 'nocountdown' and 'nomorecountdown' and show 'countdown'
    var nomorecountdowns = getElementsByClassName(document, 'span', 'nomorecountdown');
    for (var i in nomorecountdowns) nomorecountdowns[i].style.display = 'none';
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    // set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up 
    }
}
addOnloadHook(checktimers);

// **************************************************
//  End of Code                                     *
// **************************************************

/* Test */
/* Credits to Pad Wiki */

var cond = "";
$(function() {
    $.cachedScript = function(url, options) {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return jQuery.ajax(options);
    };
    // jQuery UI
    $.cachedScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js").done(function(script, textStatus) {
        // something u call after jquery UI ready
        textTip();
    });
    moveModule();
    showIndonesiaLink();
    $("ul.tabbernav a").mouseenter(function() {
        $(this).click()
    });
});

function moveModule() {
    if ($(".page-Counter-Strike_Online_Wiki").length === 0) {
        $("#WikiaRail").append($(".move"));
        $(".move").show();
        $(".move:hidden").remove();
    } else {
        $(".move").show();
    }
}

function showIndonesiaLink() {
    if ($(".WikiaArticleInterlang>ul").length) {
        $(".WikiaArticleInterlang a").text("Bahasa Indonesia");
        $("#WikiaPageHeader [data-id=comment]").after($(".WikiaArticleInterlang>ul").addClass("wikia-menu-button").css("width", "113px").css("overflow", "hidden").css("display", "inline-block"));
        $(".WikiaArticleInterlang").remove();
    }
}

/* File Usage Auto Update */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
    importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});