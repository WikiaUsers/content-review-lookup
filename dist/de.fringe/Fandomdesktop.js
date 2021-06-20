/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:AdminDashboard JS-Button/code.js',
        
        'MediaWiki:SpecialSkin.js',
        'MediaWiki:AdminNav.js'
    ]
});

/* jQuery Import */
importScriptPage('http://code.jquery.com/jquery-1.11.1.min.js');

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

/* Schneescript */
var date = new Date();
var month = date.getMonth();
//alert(month);
if (month == '11' && wgAction == 'view') {
//alert('Es ist Dezember!');
    importScriptPage('MediaWiki:Snow.js');
}


/* WikiaNotifications */
/* Letzer Text: 'Die&nbsp;Wiederholung&nbsp;von<br />»Fringe&nbsp;-<br />&nbsp;Grenzfälle&nbsp;des&nbsp;FBI«<br />jetzt&nbsp;auf&nbsp;<b>TNT-Serie</b>!<br />----<br />Dabei gibt es einige Probleme: <a href="http://de.fringe.wikia.com/wiki/Benutzer_Blog:Agent_Zuri/Fringe_wird_wiederholt!" alt="blogbeitrag" title="Fringe wird wiederholt">Doch lies selbst!</a>'; */
var WikiaNotificationMessage = 'Pro7 wiederholt endlich »Fringe&nbsp;-<br />&nbsp;Grenzfälle&nbsp;des&nbsp;FBI«!<br /><br /><a href="http://de.fringe.wikia.com/wiki/Benutzer_Blog:Rein-air-/Blog_der_Woche" alt="blogbeitrag" title="Fringe wird wiederholt">Weitere Infos&gt;&gt;</a>';
var expiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');

/* Automatisches Aktualisieren der Seite (Refresh) */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'automatisches Aktualisieren ohne Neuladen der kompletten Seite';
window.ajaxPages = ["Spezial:Letzte_Änderungen", "Spezial:WikiActivity", "Spezial:Beobachtungsliste"];
importScriptPage('AjaxRC/code.js', 'dev');

/* TITLE-Vorlage */
function rewriteTitle() {
    if (typeof (window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }
 
    if ($('#title-meta').length === 0) {
        return;
    }
 
    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header.WikiaPageHeader > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
}
rewriteTitle();

/* 
 * include other pages extension
 * syntax: <div class="getPageContent" data-page="pageToFetch"></div>
 * example: <div class="getPageContent" data-page="Spezial:Forum"></div>
 */
(function () {
    var doChange = true;
    $('body').bind('DOMNodeInserted', function () {
        if ($('.getPageContent').length !== 0 && doChange) {
            $('.getPageContent').each(function () {
                var self = this;
                doChange = false;
                $.ajax('/wiki/' + encodeURIComponent($(self).attr('data-page'))).done(function (data) {
                    $(self).replaceWith($(data).find('#mw-content-text'));
                    doChange = true;
                });
 
            });
        }
    }).trigger('DOMNodeInserted');
})();

/* Mouseoverbilder  */
$('.mouseoverbild').mouseenter(function() {
	$(this).find('.ani').show();
	$(this).find('.preview').hide();
});
$('.mouseoverbild').mouseleave(function() {
	$(this).find('.ani').hide();
	$(this).find('.preview').show();
});

// Die JavaScript-Änderungen an dieser Stelle wirken sich 
// nur auf den neuen Wikia "Oasis"-Skin aus. 
// Siehe auch: [[MediaWiki:Common.js]] und [[MediaWiki:Monobook.js]] //

// ================================================================== //
// Scrollbar
// ================================================================== //

//$('body').scroller();

// ================================================================== //
// Schneescript
// ================================================================== //

var date = new Date();
var month = date.getMonth();
//alert(month);
if (month === 11 || month === 0) {
//alert('Es ist Dezember!');
    importArticle({
        type: "script",
        article: "MediaWiki:Snow.js"
    });
}

// ================================================================== //
// Ausklappfunktionen
// ================================================================== //

$(function(){
    $('div.ausklappbar #inhalt').hide();

    $('div.ausklappbar #ueberschrift').click(function(){
        $('div.ausklappbar #inhalt').toggle();
    });
});

// ================================================================== //
// Versetzt die Bearbeiten-Schaltfläche auf Benutzerseiten in eine 
// logischere Position
// ================================================================== //

$(function() {
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

// ================================================================== //
// Zusätzliche Titel bei den Benutzerrechten
// ================================================================== //
 
$(function() {
    var rights = {
        'Lebata30' : ['Administrator', 'Allgemeiner Ansprechpartner'],
        'Agent Zuri' : ['Administrator', 'Technischer Ansprechpartner'],
        'Rein-air-' : ['Administrator', 'Netscout'],
    },
        newrights = rights[wgTitle];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $( '.UserProfileMasthead .masthead-info span.tag' ).remove();
 
        for ( var i in newrights ) {
            // add new rights
            $( '<span class="tag" style="margin-left:10px;">' + newrights[i] + '</span>' ).appendTo( '.masthead-info hgroup' );
        }
    }
});

// ================================================================== //
// jQuery-Anpassungen
// ================================================================== //

// ================================================================== //
// Sonstiges
// ================================================================== //

$(function(){
    if(!!$('#universenwechsel-charaktere').length) {
        console.log('neue Startseite');
        $('#universenwechsel-charaktere #paralleluniversum').hide();
        $('#universenwechsel-charaktere .caption-buttons .button').click(function() {
            console.log('click',$(this));
            console.log($(this).closest('.caption-buttons').parent().attr('id'));
            $('#' + $(this).closest('.caption-buttons').parent().attr('id')).hide();
            $('#' + $(this).closest('.caption-buttons').parent().attr('id')).siblings().show();
        });
    }
});

/* Ende Wikia JavaScript */