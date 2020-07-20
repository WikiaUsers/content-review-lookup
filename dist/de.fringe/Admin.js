if (wgUserGroups) {
    for (var g = 0; g < wgUserGroups.length; ++g) {
        if (wgUserGroups[g] == "sysop") {

              /* Browserabfrage */
             /* importArticle({
                 type: "script",
                 article: "MediaWiki:Browser.js"
             });
             if( isMobile.any() ) alert('Mobile');
             else alert('Desktop');
              ImportArticle({
                 type: "script",
                 article: "MediaWiki:URL_Parameter.js"
             }); */
             console.log('ausgeführte Aktion: ' + mw.util.getParamValue( 'action' ));
        }
    }
}