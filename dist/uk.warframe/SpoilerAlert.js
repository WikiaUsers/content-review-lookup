//<source lang="javascript">
/**
 * SpoilerAlert modified version
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * @author Gguigui1
 */
$(function () {
    "use strict";
    function clearstorage(storage) {
     $('div.tally').before('<button id="clearstorage">Очистити сховище нагадувань</button>'); //add the reset button
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
            no: "Ні",
            yes: "Так",
            question: "Ця сторінка містить спойлери. <br/>Ви впевнені, що хочете прочитати її?"
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
                '<table id="dialog" border="0" cellpadding="20" style="background: rgba(175, 175, 175, 0); border-radius: 7px; border: 1px solid white; box-shadow: 0px 0 3px 1px #004242">' +
                '<tr>' +
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: red; font-size: 21px">' + SpoilerAlert.question +
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
//</source>