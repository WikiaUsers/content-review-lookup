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