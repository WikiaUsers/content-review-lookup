/* Import jQuery */
importScriptPage('http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js');

var SocialMediaButtonsNamespaces = [0, 4, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "25px",
	wikiTwitterAccount: "wikia_de"
};


importArticles({
    type: "script",
    articles: [
        "u:dev:SocialIcons/code.js",/*
        "l:MediaWiki:Wikia.js/AdminNotify.js",*/
        "w:c:de.harry-grangers-test:MediaWiki:Customization.js"
    ]
});

$(function() {
    var rights = {
        'Agent Zuri'       : ['Technischer Admin'],
        'Jannina'          : ['Gründerin','inaktiv'],
        'Castor Castrorus' : ['Admin'],
        'Harry granger'    : ['Admin', 'Bürokratin'],
        'Sorunome'         : ['Technischer Admin', 'Bürokrat'],
        'ElBosso'          : ['Wikia-Mitarbeiter'],
        'Wikia'            : ['Wikia-Bot']
    },
        newrights = rights[mw.config.get('wgTitle')];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for ( var i in newrights ) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + newrights[i] + '</span>' ).appendTo( '.masthead-info hgroup' );
        }
    }
});