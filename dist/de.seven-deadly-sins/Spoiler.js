/* Der Code-Abschnitt zu CSS-Stil-Abruf und der Schreibstil wurde von 
 * SpoilerAlert uebernommen:
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 *
 * Funktionsweise:
 * Wenn ein Leser das Wiki zum ersten Mal besucht, soll er/sie gewarnt werden,
 * dass das Wiki Spoiler enthält. Danach soll der Leser nicht mehr gewarnt werden.
 *
 * Verwendung
 * Jeder ist frei diesen Code zu benutzen. Denk dran den Satz im latschkey zu aendern!
 * Der Schluessel kommt zweimal im Code vor (einmal wegen der Browser-Kompabilitaet).
 */

$(function () {
    "use strict";
 
    window.SpoilerAlert = (function (my, console, Math) {
 
        my = $.extend({
            question: 'Achtung! Dieses Wiki enthält keine Spoilerinformationen. Obwohl man sich an dem Mangastand in Deutschland orientiert, werden ALLE Seiten so gut wie möglich mit dem Rōmaji des jeweiligen Artikel betiteln. Spoiler sind nur im jeweiligen Forum sowie in den Artikelkommentaren erlaubt!',
            ok: 'Ok, ich habe die Warnung gelesen',

/* Die Funktion isVisited prueft, ob der Leser das Wiki bereits besucht hat.
 * Dazu sucht sie im Cookie nach dem Satz - Nanatsu no Taizai Wiki wurde besucht -
 * (function test)
 * Findet die Funktion den Satz gibt sie true (fuer gefunden) zurueck, sonst false.
 * Falls my nicht definiert ist (null) wird die jQuery sie ignorieren.
 */
            isVisited: function () {
                var latschkey = /Nanatsu no Taizai Wiki wurde besucht/g;
                return (latschkey.test(document.cookie));
            },
            back: false
        }, my);
 
        var wgArticleId = (window.mediaWiki && window.mediaWiki.config && window.mediaWiki.config.get('wgArticleId')) || window.wgArticleId;

/* Der Dialogfenster (Spoiler-Warnfenster) in HTML-Code 
 * Im Dialogfenster soll die Frage (my.question) und die Antwortmöglichkeit
 * (my.ok) anzeigen.
 */
        var dialog =
        '<table id="dialog" border="0" cellpadding="20" style="background-color: white; border-radius: 4px; border: 2px solid black;">' +
            '<tr>' +
                '<td colspan="2" style="padding: 20px 30px; border-style: none; text-align: center; color: black">' +
                    my.question +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<td style="padding: 0 30px 20px; text-align: center; border-style: none;">' +
                    '<button id="ok">' + my.ok + '</button>' +
                '</td>' +
            '</tr>' +
        '</table>';

/* Fuer den CSS-Code */
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

/* Aufruf des Dialogfensters
 * Prueft, ob das Wiki besucht wurde. Falls das Wiki nicht besucht wurde
 * (if (!my.isVisited())), soll das Dialogfenster aufgerufen werden.
 * Zudem soll das Layout des Fensters zum Wiki-Layout passen.
 */
        if (!my.isVisited()) {
            var article = $('#WikiaArticle');
            var articleHeight = article.height();
            var dialogHeight;
            $('<div id="blackout">' + dialog + '</div>').prependTo(article).css({
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
                left: Math.round(($('#WikiaArticle').width() - $('#dialog').width() ) / 2) + 'px',
                top:  Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
            });

/* Schaltflaeche OK
 * Klickt der Leser auf die Schaltflaeche, verschwindet das Dialogfenster
 * und im Cookie wird vermerkt, dass das Wiki besucht wurde.
 */
            $('#ok').click(function () {
                $('#dialog').remove();
                $('#blackout').fadeOut(1600, function () {
                    $(this).remove();
                });
            var latschkey = /Nanatsu no Taizai Wiki wurde besucht/g;
            document.cookie = latschkey;
            });
        }
 
        return my;
 
    }) (window.SpoilerAlert, window.console || { log: $.noop }, Math);
 });