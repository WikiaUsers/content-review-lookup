/**
 * SpoilerAlert modified version
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * @author Gguigui1
 */
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
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' + SpoilerAlert.question +
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
/**
 * SpoilerAlert modified version
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * @author Gguigui1
 */
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
            no: "Okay...?",
            yes: "Nah, lemme read",
            question: "Bro, this is kinda a secret file so kindly go find another page to read please?"
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
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' + SpoilerAlert.question +
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