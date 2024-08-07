/* Credit to GFriend Wiki put on https://gfriend.fandom.com/wiki/MediaWiki:Common.js */
/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RestoreRevButton.js',
    ]
});
var bot = require('nodemw');
var download = require('download-file');
// Pass configuration object
var client = new bot({
	protocol: 'https',           // Wikipedia now enforces HTTPS
	server: 'coryxkenshin.fandom.com',  // Host name of MediaWiki-powered site
	path: '',                  // Path to api.php script
	debug: false                 // Is more verbose when set to true
});

client.getPagesInNamespace(6,function(err,data) {
	// Error handling
	if (err) {
		console.error(err);
		return;
	}
	for (p of data) {
		client.getImageInfo(p.title, function(e,d) {
			if (e) {
				console.error(e);
				return;
			}
			if (d == null) {
				console.log(p.title);
				return;
			}
			var options = {
				directory: "./images/",
				filename: d.descriptionurl.replace(/^http.*?\/File:/,"")
			};
			download(d.url, options, function(err) {
				if (err) throw err;
			});
		});
	}
});
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
        newMonth = newMonth + '<a href="/wiki/' + (i+1) + '_' + months[month] + '"><div class="' + classes + '">' + (i+1) + '</div></a>';
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