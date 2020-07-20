// Die JavaScript-Änderungen an dieser Stelle wirken sich 
// nur auf den neuen Wikia "Oasis"-Skin aus. 
// Siehe auch: [[MediaWiki:Common.js]] und [[MediaWiki:Monobook.js]] //

// ================================================================== //
// Zusätzliche Titel bei den Benutzerrechten
// ================================================================== //
 
$(function() {
    var rights = {
        'Einevontausend' : ['Administratorin'],
        'Hedi-Hilli' : ['Administrator', 'Inhaltlicher Ansprechpartner', 'Mädchen für Alles'],
        'Agent Zuri' : ['Administrator', 'Technischer Ansprechpartner'],
    },
        newrights = rights[wgTitle];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $( '.UserProfileMasthead .masthead-info span.tag' ).remove();
 
        for ( var i in newrights ) {
            // add new rights
            $( '<span />').addClass("tag").css("margin-left","10px").html(newrights[i]).appendTo('.masthead-info hgroup');
        }
    }
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:Message/code.js',
        'u:dev:ChatOptions/code.js'
    ]
});