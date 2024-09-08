/** 
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */
 
$(function () {
 
    window.SpoilerAlert = function (my) {
 
        my = $.extend({
            question: 'This page contains spoilers. Are you sure you want to read it?',
            yes: 'Yes, please',
            no: 'No, not yet',
            isSpoiler: function () {
                return /^Spoiler\:/.test(document.title);
            }
        }, my);
 
        var dialog =
        '<table id="dialog" border="0" cellpadding="20" style="background-color: white; border-radius: 4px; border: 2px solid black;">' +
            '<tr>' +
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' + 
                    my.question +
                '</td>' +
            '</tr>' +
        '</table>';
 
        var cookie = $.cookies.get('spoilers');
        var ids = cookie ? cookie.split(/,/) : [];
        if (my.isSpoiler() && -1 == $.inArray(wgArticleId.toString(), ids)) {
            var articleHeight = $('#WikiaArticle').height();
            $('<div id="blackout">' + dialog + '</div>').appendTo('#WikiaArticle').css({
                position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1000,
                backgroundColor: $('#WikiaPageBackground').css('background-color'),
            });
            var dialogPadding = 100;
            var dialogHeight = $('#dialog').height();
            var topRelativeToWindow  = Math.round(
                ($(window).height() - dialogHeight) / 2 - $('#WikiaArticle').offset().top
            );
            var topRelativeToArticle = Math.round((articleHeight - dialogHeight) / 2);
            console.log('window.height: %u, header.height: %u, articleHeight: %u, dialogHeight: %u, topRelativeToWindow: %u, topRelativeToArticle: %u', $(window).height(), $('#WikiaArticle').offset().top, articleHeight, dialogHeight, topRelativeToWindow, topRelativeToArticle);
            $('#blackout').css({
                height: Math.max(articleHeight, dialogHeight + dialogPadding * 2) + 'px',
            });
            $('#dialog').css({
                position: 'absolute',
                left: Math.round(($('#WikiaArticle').width()  - $('#dialog').width() ) / 2) + 'px',
                top:  Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
            });
            $('#no').click(function () {
                $('#dialog').remove();
                //history.back();
            });
            $('#yes').click(function () {
                $('#dialog').remove();
                $('#blackout').fadeOut(1600, function () {
                    $('#blackout').remove();
                });
                ids.push(wgArticleId);
                $.cookies.set('spoilers', ids.join(','), { path: '/', domain: wgServer.substr('http://'.length), hoursToLive: 365 * 24 });
            });
        }
 
        return my;
 
    } ('undefined' == window.SpoilerAlert ? {} : window.SpoilerAlert)
 });
//