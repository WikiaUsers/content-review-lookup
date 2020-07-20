if (mw.toolbar) {
mw.toolbar.addButton(
	'https://vignette.wikia.nocookie.net/naruto/images/9/96/Button_aquote.png/revision/latest?cb=20141212182610&path-prefix=fr',
	'Ajouter des guillemets',
	'«&nbsp;',
	'&nbsp;»',
	'',
	'mw-editbutton-guillemets'
);
}
/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
 
//verrouillage des commentaires, basé sur w:c:dev:LockOldBlogs/code.js
var pages_bloquees = [
       "Traduire_Help:Mobile"
];
 
if ($.inArray(wgPageName, pages_bloquees) > -1)
{
  (function ($, ArticleComments) {
 
    function lockComments() {
       $('#article-comm')
         .attr('disabled', 'disabled')
         .text('Les commentaires ont été désactivés pour cet article');
       $('#article-comm-submit').attr('disabled', 'disabled');
       $('.article-comm-reply').remove();
    }
 
    function init() {
      if (ArticleComments && ArticleComments.addHover) {
        var realFunc = ArticleComments.addHover;
        ArticleComments.addHover = function () {
	        var result = realFunc.apply(ArticleComments, arguments);
          lockComments();
	        return result;
        };
      }
 
      // special case where article comments have already loaded (shouldn't happen much in production)
      if (!$('#WikiaArticleComments').hasClass('loading')) {
         lockComments();
      }
    }
 
    // add onload handler
    $(init);
  } (jQuery, window.ArticleComments));
}

/**
 * To use this script, install it and view:   Special:BlankPage?blankspecial=interlanguage
 */
if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'interlanguage') {
        (function ($, mw) {
                var url = mw.config.get('wgServer') + '/api.php?action=query&meta=siteinfo&siprop=interwikimap&format=json';
                 var interfaceLang = $('html').attr('lang');
 
                //parsing interwikimap jSON string
                $.getJSON(url, function (data) {
                        var interlanguageWikis = [],
                                map = data.query.interwikimap;
 
                        //we browse the map gotten from the jSON string and only grab the elements having language field
                        for (var i = 0, len = map.length; i < len; i++) {
                                if (map[i].language) {
                                        interlanguageWikis[interlanguageWikis.length] = map[i];
                                }
                        }
 
                        // display results as list
                        $(function () {
                                // generate html
                                var wiki, link, html, exists, language;

                                exists = false;
 
                                message = 'This wiki is currently in these languages:';
 
                                html = '<div id="interlanguage-wikis-container">' + message + '<ul>';
 
                                for (var i = 0, len = interlanguageWikis.length; i < len; i++) {
                                        wiki = interlanguageWikis[i];
                                        link = wiki.url.substring(wiki.url.indexOf('http://') + 7);
                                        link = link.substring(0, link.indexOf('/'));
                                        link = '<a href="http://' + link + '">' + wiki.language + '</a>'; 
                                        html += '<li>' + link + '</li>';

                                        switch (wiki.language)
                                        {
                                            case 'English':
                                              language = 'en';
                                              break;
                                            case 'Deutsch':
                                              language = 'de';
                                              break;
                                            case 'Espa\\u00f1ol':
                                              language = 'es';
                                              break;
                                            case 'Fran\\u00e7ais':
                                              language = 'fr';
                                              break;
                                            case 'Polski':
                                              language = 'pl';
                                              break;
                                        }

                                        if (language != null && language == interfaceLang) exists = true;
                                }
                                html += '</ul></div>';

                                html += '<p>Your language is currently set to <i>' + interfaceLang + '</i>';
                                
                                if (exists)
                                {
                                   html += ', congrats there is a wiki in your language!</p>';
                                }
                                else
                                {
                                   html += ', sorry we couldn\'t find a wiki in your language...</p>';
                                }
 
                                // insert html
                                document.title = 'Interlanguage wikis';
                                $('#firstHeading, #WikiaArticle h1').first().text('Interlanguage wikis');
                                $('#mw-content-text').html(html);
                        });
                });
        }(jQuery, mediaWiki));
}

if (wgPageName == "Test_calculatrice")
{
  //désactive l'action de l'inputbox
  $( '.createbox' ).on('submit', function( event ) {
   event.preventDefault();
  });
 
  //calcul
  $('.createboxButton').on('click', function() {
   var res = $('.createboxInput').val() / 2;
   $('#resultat').text(res);
  });
}

$(document).ready( function() {
  $('#twhit20').html('<iframe src="http://twhit20.fr/widget/twhit20/stations-de-ski-france" scrolling="yes" frameborder="0" height="500" width="500"></iframe>');
  $('#google-calendar').html('<iframe src="https://www.google.com/calendar/embed?src=78o97umcpn2j7larltemjdg7os%40group.calendar.google.com&ctz=Europe/London" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>');
});