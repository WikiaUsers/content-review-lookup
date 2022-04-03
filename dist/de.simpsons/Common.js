/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

  // Import [[MediaWiki:Onlyifuploading.js]] 


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
};

importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Aktualisierung';

/* Zum nutzen von adminonly und bureaucratonly */

if ( wgUserGroups ) {
  for ( var g = 0; g < wgUserGroups.length; ++g ) {
    if ( wgUserGroups[g] == "sysop", "vstf", "helper", "staff" ) {
      importStylesheet("MediaWiki:Sysop.css");
      addOnloadHook( function() {
        if ( !window.disableSysopJS ) {
          importScript("MediaWiki:Sysop.js");
        }
      } );
    } 
    else if ( wgUserGroups[g] == "bureaucrat" ) {
      importStylesheet("MediaWiki:Bureaucrat.css");
    }
  }
}