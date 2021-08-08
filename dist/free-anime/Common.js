/* Any JavaScript here will be loaded for all users on every page load. */

window.MessageWallUserTags = {
    tagColor: '#50C5D6',
    glow: false,
    glowSize: '15px',
    glowColor: '#caedf2',
    users: {
        'Celestetwit': 'Bureaucrat • Admin',
        'OOQuietSnowOo': 'Bureaucrat • Admin',
        'KouHime': 'Bureaucrat • Admin'
    }
};

$(function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'special:upload') {
        return;
    }

    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair Use Rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceable       = \r| Other Information = \r}}"));

});

var ShowHideConfig = {
    autoCollapse: 3,
    userLang: false,
    en: {
        show: "show",
        hide: "hide",
        showAll: "show all",
        hideAll: "hide all"
    }
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* End of the {{USERNAME}} replacement */

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        $('.countdown').css({
            "display": 'none !important'
        });
        $('.nocountdown').css({
            "display": 'inline !important'
        });
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
    }
    var tpm = '';

    // Calculate the diff
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' Minute';
        } else {
            left = (diff % 60) + ' Minuten';
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' Stunde und ' + left;
        } else {
            left = (diff % 24) + ' Stunden und ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' Tag, ' + left;
        } else {
            left = diff + ' Tagen, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;



    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = []; // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

// Fix search result links - taken from pokemon.wikia.com
if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Search') {
    $('ul.mw-search-results').find('a').each(function() {
        var a = $(this);
        a.attr('href', wgArticlePath.replace('$1', encodeURIComponent(a.text().replace(new RegExp(' ', 'g'), '_')).replace(new RegExp('%3A', 'g'), ':')));
    });
}

$(function ttforhandy() {
    var doo = false;
    var agents = new Array(
        'Windows CE', 'Pocket', 'Mobile',
        'Portable', 'Smartphone', 'SDA',
        'PDA', 'Handheld', 'Symbian',
        'WAP', 'Palm', 'Avantgo',
        'cHTML', 'BlackBerry', 'Opera Mini',
        'Nokia', 'Android', 'Nintendo DSi'
    );
    for (var i = 0; !doo && i < agents.length; i++) {
        if (navigator.userAgent.indexOf(agents[i]) > -1) {
            doo = true;
        }
    }
    if (doo) {
        var spans = document.getElementsByTagName("span");
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].className == "tt_for_handy") {
                spans[i].style.display = "inline";
            }
        }
    }
});

/* Back to Top Button tweaks */

window.BackToTopFade = 0;