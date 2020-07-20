//* SpoilerAlert modified version
//* documentation at: http://dev.wikia.com/wiki/SpoilerAlert
//* @author Gguigui1

/* SakuraRemake custom ver. @author SSR */

$(function () {
    "use strict";
    function clearstorage(storage) {
     $('div.tally').before('<button id="clearstorage">回到萬有之源重新來過</button>');
     $('#clearstorage').click(function() {
     storage = $.grep( storage, function( n, i ) {
        return n != wgArticleId;
     });
     console.log(storage);
     $.storage.set('SpoilerAlertJS', storage);
     location.reload();
     });
    }
    window.SpoilerAlert = (function ($, mw, SpoilerAlert) {
        var objects;
        if (!SpoilerAlert) {
          return;
        }
        var reminder = $.storage.get('SpoilerAlertJS');
        if (reminder !== null) {
          if ($.inArray(wgArticleId, reminder) > -1) {
            clearstorage(reminder);
            return;
          }
        } else {
           reminder = [];
        }
        SpoilerAlert = $.extend({
            no: '我要退學！',
            yes: '我要開學！',
            question: '<img src="https://vignette.wikia.nocookie.net/newsakura/images/d/d0/Main.jpg/revision/latest?cb=20170223024229&path-prefix=zh" width="700" height="393.75" />'
        }, SpoilerAlert);
        console.log(SpoilerAlert);
        if (SpoilerAlert.pages && $.isArray(SpoilerAlert.pages)) {
            if ($.inArray(wgPageName, SpoilerAlert.pages) > -1) {
                init();
            }
        } else if (SpoilerAlert.categories) {
            if ($.inArray(SpoilerAlert.categories, wgCategories) > -1) {
                init();
            }
        } else if (SpoilerAlert.class) {
            if ($('.' + SpoilerAlert.class).length > 0) {
                init();
            }
        } else {
           console.log('Not a spoiler page');
           return false;
        }
        function init() {
            var dialog =
                '<table id="dialog" border="0" cellpadding="20" style="background: black; border-radius: 4px; border: 4px solid black; margin: 0 auto;">' +
                '<tr>' +
                '<td colspan="2" id="dialog-question" style="border-style: none; text-align: center; color: black">' + SpoilerAlert.question +
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
			$('#mw-content-text').hide();
            console.log('Set up spoiler information');
            $('#WikiaArticle').prepend(dialog);
            var borders = getBackgroundColor() || "black";
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
            $.storage.set('SpoilerAlertJS', reminder);
            $('#WikiaArticle').find('*').fadeIn(2000);
            $('#WikiaArticle .hidden').each(function() {
               $(this).css('display', 'none');
            });
            clearstorage(reminder);
            location.reload();
        });
    })(jQuery, this.mediaWiki, window.SpoilerAlert);
});