/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Summary filler
 * From RuneScape Wiki
 */

importArticles({
    type: 'script',
    articles: [
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'w:c:dev:RevealAnonIP/usercode.js'
   ]
});


/* Google fonts */

WebFontConfig = {
    google: { families: [ 'Calligraffitti::latin', 'Lusitana::latin', 'IM+Fell+English:400,400italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

var collapseCaption = 'hide';
var expandCaption = 'show';