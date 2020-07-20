/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

// Import [[MediaWiki:Onlyifuploading.js]] 
 
 if (wgCanonicalSpecialPageName == "Upload" && !!$('#wpUploadDescription').length && $('#wpUploadDescription').val()) {
    $('#wpUploadDescription').val(
        "{"+"{Information\n"
           + "|Beachten=\n"
           + "|Beschreibung=\n"
           + "|Quelle=\n"
           + "|Autor=\n"
           + "|Dateispezis=\n"
           + "|Lizenz = \n"
           + "|Andere Versionen=\n"
           + "|Kategorien=\n"
           + "}"+"}"
    );
 }

/* Could probably be removed(?)
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};*/

/* Import CSS */
importArticles({
    type: 'style',
    articles: [
        'w:c:de.harry-grangers-test:MediaWiki:FontAwesome.css'    
    ]
});

/* Genre labels */
if(!!$('.genre-labels').length) {
    $('.genre-labels').appendTo('.header-tally');
}

/* Replaces {{BENUTZERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{BENUTZERNAME}} replacement */


/***********************/
/*  ReferencePopups,   */
/* Navigation expanded */
/***********************/
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:ExtendedNavigation/code.js'
    ]
});

/* Sachen, die nur Administratoren und Helfern angezeigt werden (sysop.js ist ausschließlich den Administratoren vorbehalten) */