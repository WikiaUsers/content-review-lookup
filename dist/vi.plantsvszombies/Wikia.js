 importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Thông báo của cộng đồng' + '</h1>' + '</section>';
$('.collapse').collapse()
    $('#WikiaRail').append(newSection);
    $.getJSON('/vi/api.php?action=parse&text={{Thông báo cộng đồng}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions',
    'Special:WikiActivity'
];
window.AjaxRCRefreshText = 'Tự động làm mới';
window.AjaxRCRefreshHoverText = 'Tự động làm mới trang';

if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    window.massBlockDelay = 1000;
    importArticles({
        type: 'script',
        articles: [
            'u:dev:ViewRemoved/code.js'
        ]
    });
}

window.chatBlockReason = 'Vi phạm ĐKSD';
window.chatBlockExpiry = '3 months';

window.ArchiveToolConfig = {
    archiveListTemplate: 'Lưu trữ',
    archivePageTemplate: 'Archivepage',
    archiveSubpage: 'Lưu trữ',
    userLang: true
};

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat', 'staff']
};

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = ' ';
    } else {
        var tpm = ' ';
    }

    // calcuate the diff
    var left = (diff % 60) + ' giây';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = Còn lại + (diff % 60) + ' giờ ';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = Còn lại + (diff % 24) + ' giờ ';
    diff = Math.floor(diff / 24);
    if (diff > 0) left = Còn lại + diff + ' ngày ';
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
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});

/* Add extra classes based on category
 * @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 */
(function($, mw) {
    function categorycheck() {
        if ($(this).text() === "Dreamworld levels") {
            $(".wikia-infobox").addClass("dreamworld");
            mw.log("Tìm thấy thể loại!");
            return;
        }
    }
    $("li.category > span.name > a").each(categorycheck);
}(jQuery, mediaWiki));

/* Rail WHAM log */
window.railWAM = {
    logPage:'Project:WAM Log'
};