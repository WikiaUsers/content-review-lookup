/**
 * Custom SpoilerAlert version
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * @author Gguigui1 (original), Fujimaru-kun (edit)
 */
$(function () {
    "use strict";

    function clearstorage(storage) {
        $('div.tally').before('<button id="clearstorage">Clear storage reminding</button>'); //add the reset button
        $('#clearstorage').click(function () {
            storage = $.grep(storage, function (n, i) {
                return n != wgArticleId; //set storage for reminding all the current reminding pages but not the current one
            });
            console.log(storage);
            $.storage.set('ExplicitAlertJS', storage); // Remind choices
            location.reload(); //Reload the page
        });
    }
    window.ExplicitAlert = (function ($, mw, ExplicitAlert) {
        var objects;
        if (!ExplicitAlert) {
            return;
        }
        var reminder = $.storage.get('ExplicitAlertJS');
        if (reminder !== null) {
            if ($.inArray(wgArticleId, reminder) > -1) {
                clearstorage(reminder);
                return; // The choice has been remindered
            }
        } else {
            reminder = [];
        }
        ExplicitAlert = $.extend({
            no: "Non",
            yes: "Oui",
            question: "Cette page comporte des éléments explicites susceptibles de choquer un jeune public ou une âme innocente. Êtes vous sûr de vouloir poursuivre ?"
        }, ExplicitAlert);
        if (ExplicitAlert.pages && $.isArray(ExplicitAlert.pages)) {
            if ($.inArray(wgPageName, ExplicitAlert.pages) > -1) {
                init(); // explicit page
            }
        } else if (ExplicitAlert.categories) {
            if ($.inArray(ExplicitAlert.categories, wgCategories) > -1) {
                init(); // explicit page
            }
        } else if (ExplicitAlert.class) {
            if ($('.' + ExplicitAlert.class).length > 0) {
                init(); // explicit page
            }
        } else {
            //console.log('Not a spoiler page');
            return false;
        }

        function init() {
            var dialog =
                '<table id="dialog" border="0" cellpadding="20" style="background: white; border-radius: 4px; border: 4px solid red;">' +
                '<tr>' +
                '<td colspan="2" id="dialog-question" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' + ExplicitAlert.question +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                '<button id="no">' + ExplicitAlert.no + '</button>' +
                '</td>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                '<button id="yes">' + ExplicitAlert.yes + '</button>' +
                '</td>' +
                '</tr>' +
                '</table>';
            $('#WikiaArticle').find('*').each(function () {
                if ($(this).css('display') == 'none') {
                    $(this).addClass('hidden');
                }
            });
            $('#WikiaArticle div').hide();
            $('#WikiaArticle div:contains(ads)').each(function () {
                $(this).css('display', '');
                $(this).find('*').css('display', '');
            });
            $('#mw-content-text').hide(); //Reforced it
            //console.log('Set up spoiler information');
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
            //console.log('SpoilerAlert: Cannot determine color');
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
            $.storage.set('ExplicitAlertJS', reminder); // Remind choices
            $('#WikiaArticle').find('*').fadeIn(2000);
            $('#WikiaArticle .hidden').each(function () {
                $(this).css('display', 'none');
            });
            clearstorage(reminder);
        });
        $('#dialog').css({
            position: 'absolute',
            left: Math.round(($('#WikiaArticle').width() - $('#dialog').width() - $('.home-top-right-ads').width()) / 2) + 'px'
        });
    })(jQuery, this.mediaWiki, window.ExplicitAlert);
});