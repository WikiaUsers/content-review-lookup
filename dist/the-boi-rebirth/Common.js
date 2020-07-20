/* Any JavaScript here will be loaded for all users on every page load. */

// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================


//Spoiler Tag; Source = http://dev.wikia.com/wiki/SpoilerAlert/code.2.js
SpoilerAlert = {
  categories: "Spoiler",
}
$(function () {
    "use strict";
    function clearstorage(storage) {
     $('div.tally').before('<button id="clearstorage">Clear storage reminding</button>'); //add the reset button
     $('#clearstorage').click(function() {
     storage = $.grep( storage, function( n, i ) {
        return n != wgArticleId; //set storage for reminding all the current reminding pages but not the current one
     });
     console.log(storage);
     $.storage.set('SpoilerAlertJS', storage); // Remind choices
     location.reload(); //Reload the page
     });
    }
    window.SpoilerAlert = (function ($, mw, SpoilerAlert) {
        var objects;
        if (!SpoilerAlert) {
          return;
        }
        var reminder = $.storage.get('SpoilerAlertJS');
        if (reminder != null) {
          if ($.inArray(wgArticleId, reminder) > -1) {
            clearstorage(reminder);
            return; // The choice has been remindered
          }
        } else {
           reminder = [];
        }
        SpoilerAlert = $.extend({
            no: "No, not yet",
            yes: "Yes, please",
            question: "This page contains spoilers. Are you sure you want to read it?"
        }, SpoilerAlert);
        console.log(SpoilerAlert);
        if (SpoilerAlert.pages && $.isArray(SpoilerAlert.pages)) {
            if ($.inArray(wgPageName, SpoilerAlert.pages) > -1) {
                init(); // spoiler page
            }
        } else if (SpoilerAlert.categories) {
            if ($.inArray(SpoilerAlert.categories, wgCategories) > -1) {
                init(); // spoiler page
            }
        } else if (SpoilerAlert.class) {
            if ($('.' + SpoilerAlert.class).length > 0) {
                init(); // spoiler page
            }
        } else {
           console.log('Not a spoiler page');
           return false;
        }
        function init() {
            var dialog =
                '<table id="dialog" border="0" cellpadding="20" style="background: white; border-radius: 4px; border: 4px solid red;">' +
                '<tr>' +
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: white">' + SpoilerAlert.question +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                '<button id="no">' + SpoilerAlert.no + '</button>' +
                '</td>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                '<button id="yes">' + SpoilerAlert.yes + '</button>' +
                '</td>' +
                '</tr>' +
                '</table>';
            $('#WikiaArticle').find('*').each(function () {
               if ($(this).css('display') == 'none') {
                 $(this).addClass('hidden');
               }
            });
            $('#WikiaArticle div').hide();
            $('#WikiaArticle div:contains(ads)').each(function() {
              $(this).css('display', '');
              $(this).find('*').css('display', '');
            });
			$('#mw-content-text').hide(); //Reforced it
            console.log('Set up spoiler information');
            $('#WikiaArticle').prepend(dialog);
            var borders = getBackgroundColor() || "white";
            $('#dialog').css('background-color', borders);
        }
 
        function getBackgroundColor() {
            var color = $('#WikiaPageBackground').css('background-color');
            if ('transparent' !== color) return color;
            color = $('#WikiaPage').css('background-color');
            if ('transparent' !== color) return color;
            color = $('section.module', '#WikiaRail').css('background-color');
            if ('transparent' !== color) return color;
            console.log('SpoilerAlert: Cannot determine color');
            return color;
        }
        $('#no').click(function () {
            $('#dialog').remove();
            if (SpoilerAlert.back) {
              history.back();
            }
        });
        $('#yes').click(function () {
            $('#dialog').remove();
            reminder.push(wgArticleId);
            $.storage.set('SpoilerAlertJS', reminder); // Remind choices
            $('#WikiaArticle').find('*').fadeIn(2000);
            $('#WikiaArticle .hidden').each(function() {
               $(this).css('display', 'none');
            });
            clearstorage(reminder);
        });
        $('#dialog').css({
            position: 'absolute',
            left: Math.round(($('#WikiaArticle').width() - $('#dialog').width() - $('.home-top-right-ads').width()) / 2) + 'px'
            });
    })(jQuery, this.mediaWiki, window.SpoilerAlert);
});

// Auto-refresh
window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

//Auto Message Blocked
var MessageBlock = {
    title: 'Block.',
    message: 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck: true
};

//Last Edited Config
window.lastEdited = {
    avatar: false
};

// ==============================
importArticles({
    type: "script",
    articles: [
        'u:dev:RevealAnonIP/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:FixMultipleUpload/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:LockForums/code.js',
		'u:dev:CleanWantedFiles/code.js',
		'u:dev:BackToTopButton/code.js'
    ]
});

// BackToTopButton settings
var Speed = 600;
var Start = 800;