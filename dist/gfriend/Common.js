/* Any JavaScript here will be loaded for all users on every page load. */

/* User Tag Configuration */
window.UserTagsJS = {
	modules: {},
	tags: { stan: { u: 'Buddy'},
            newuser: { u: 'A Mystery Buddy'}
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 15, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.stan = {
	days: 60, // Must have been on the Wiki for 10 days
	edits: 500, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.custom = {
    'K-PopFan12': ['stan'],
    'Yumesuzuki': ['stan'],
	'Eunjung0114': ['stan'],
	'Happ1nessN0te': ['stan']
};

 /*Usertags from Dev Wiki*/
window.UserTagsJS = {
	modules: {},
	tags: {
		sowonbiased: { u:'Sowon Biased'},
		yerinbiased: { u:'Yerin Biased'},
		eunhabiased: { u:'Eunha Biased'},
		yujubiased: { u:'Yuju Biased'},
		sinbbiased: { u: 'SinB Biased'},
		umjibiased: { u: 'Umji Biased'}
	},
	oasisPlaceBefore: ''
};
 
 //Template:USERNAME
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

/*Add Usertags for Users*/
UserTagsJS.modules.custom = {
	'Happ1nessN0te': ['yujubiased'],
	'Meatgrind89': ['umjibiased']
    
};

/* Rail WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Allows for the embedding of videos from vlive.tv (Base Code - KockaAdmiralac) */
mw.hook('wikipage.content').add(function($content) {
    var current = 0;
    $content.find('.Vlive:not(.loaded)').each(function() {
        var el = document.getElementsByClassName("Vlive")[current];
        var video_id = "https://www.vlive.tv/embed/" + el.getAttribute("data-id") + "?autoPlay=false";
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: el.getAttribute("data-height"),
                scrolling: 'no',
                src: video_id,
                width: el.getAttribute("data-width"),
                allow: "fullscreen",
            })
        ).addClass('loaded');
        current += 1;
    });
});

/* Calendar (Credits to Bieberpedia Wiki)*/
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var date = new Date();
var currentMonth = date.getMonth();
var currentDay = date.getDate() - 1;
var viewMonth = currentMonth;
 
function initCalendar() {
    // Parse month and day, not implemented
    loadMonth(currentMonth);
}
 
function loadMonth(month) {
    $('#cal #month').text(months[month]);
    var newMonth = '';
    for (var i = 0; i < days[month]; i++) {
        var classes = (month == currentMonth && i == currentDay) ? "day current" : "day";
        newMonth = newMonth + '<a href="/wiki/Template:Calendar/' + months[month] + '_' + (i+1) + '"><div class="' + classes + '">' + (i+1) + '</div></a>';
    }
    $('#cal #cal-frame').fadeOut('fast', function() {
        $('#cal #cal-frame').html(newMonth).fadeIn('fast');
    });
    viewMonth = month;
}
 
$(document).ready(function() {
    initCalendar();
    $('#cal #prev').click(function() {
        loadMonth((viewMonth - 1 + 12) % 12);
    });
    $('#cal #next').click(function() {
        loadMonth((viewMonth + 1) % 12);
    });
});

// Enable modern behaviour and import BackToTopButton
window.BackToTopModern = true;
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:BackToTopButton/code.js'
});