$(function () {
    "use strict";
 
    window.SpoilerAlert = (function (my, console, Math) {
 
        my = $.extend({
            question: 'QUESTION',
            yes: 'YES',
            no: 'NO',
            isSpoiler: function () {
                return (/^Spoiler\:/.test(document.title));
            },
            back: false
        }, my); // If my is undefined/null/not-object then jQuery will ignore it
 
        var wgArticleId = (window.mediaWiki && window.mediaWiki.config && window.mediaWiki.config.get('wgArticleId')) || window.wgArticleId;
 
        var dialog = '<table id="dialog" border="0" cellpadding="20" style="background-color: #354959; border-radius: 15px; border: 2px solid #F6BE00; -moz-box-shadow: 0px 0px 20px #000000; -webkit-box-shadow: 0px 0px 20px #000000; box-shadow: 0px 0px 20px #000000; background-image: -moz-radial-gradient(top, #315786 5%, #244163 95%); background-image: -o-radial-gradient(top, #315786 5%, #244163 95%); background-image: -webkit-gradient(radial, left top, left bottom, color-stop(5%, #315786), color-stop(1, #244163)); background-image: -webkit-radial-gradient(top, #315786 5%, #244163 95%); background-image: radial-gradient(to bottom, #315786 5%, #244163 95%);">' +
'<tr>' +
'<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color:#D4D5D8;">' +
my.question +
'</td>' +
'</tr>' +
'<tr>' +
'<td style="padding: 0px 30px 20px; text-align: center; border-style: none;">' +
'<button id="no">'+my.no+'</button>' +
'</td>' +
'<td style="padding: 0px 30px 20px; text-align: center; border-style: none;">' +
'<button id="yes">'+my.yes+'</button>' +
'</td>' +
'</tr>' +
'</table>' ;


        function getBackgroundColor () {
            var color = $('#WikiaPageBackground').css('background-color');
            if ('transparent' !== color) return color;
            color = $('#WikiaPage').css('background-color');
            if ('transparent' !== color) return color;
            color = $('section.module', '#WikiaRail').css('background-color');
            if ('transparent' !== color) return color;
            console.log('SpoilerAlert: Cannot determine color');
            return color;
        }
 
        // Use LocalStorage, it doesn't get sent to the server every HTTP request
        var ids = $.storage.get('SpoilerAlertJS');
        // Backwards compatibility. This block can be removed after a week or so
        if (!ids) {
            ids = $.cookies.get('spoilers');
            if (ids) { // Old cookie found, convert to local storage
                ids = ids.split(',');
                $.cookies.del('spoilers', {hoursToLive:0, path:'/', domain: location.host});
                $.storage.set('SpoilerAlertJS', ids);
            } else {
                ids = [];
            }
        }
        if (my.isSpoiler() && -1 === $.inArray(wgArticleId, ids)) {
            var article = $('article#WikiaMainContent');
            var articleHeight = article.height();
            var dialogHeight;
            $('<div id="blackout">' + dialog + '</div>').appendTo(article).css({
                position: 'absolute',
                top: 0, left: 0,
                right: 0, bottom: 0,
                zIndex: 2000000001,
                backgroundColor: getBackgroundColor(),
                minHeight: (dialogHeight = $('#dialog').height())
            });
            var dialogPadding = 100;
            var topRelativeToWindow = Math.round(
                ($(window).height() - dialogHeight) / 2 - $('#WikiaArticle').offset().top
            );
            var topRelativeToArticle = Math.round((articleHeight - dialogHeight) / 2);
            console.log(
                'window.height: ', $(window).height(),
                ', WikiaArticle.offset.top: ', $('#WikiaArticle').offset().top,
                ', articleHeight:', articleHeight,
                ', dialogHeight:', dialogHeight,
                ', topRelativeToWindow:', topRelativeToWindow,
                ', topRelativeToArticle: ', topRelativeToArticle
            );
            $('#dialog').css({
                position: 'absolute',
                left: Math.round(($('#WikiaArticle').width()  - $('#dialog').width() ) / 2) + 'px',
                top:  Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
            });
            $('#no').click(function () {
                $('#dialog').remove();
                if (my.back) {
                    if (history.length) {
                        history.back();
                    } else {
                        location.href = location.protocol + '//' + location.host;
                    }
                }
            });
            $('#yes').click(function () {
                $('#dialog').remove();
                $('#blackout').fadeOut(1600, function () {
                    $(this).remove();
                });
                ids.push(wgArticleId);
                $.storage.set('SpoilerAlertJS', ids);
            });
        }
 
        return my;
 
    }) (window.SpoilerAlert, window.console || { log: $.noop }, Math);
 });