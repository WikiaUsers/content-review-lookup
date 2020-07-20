/* Any JavaScript here will be loaded for all users on every page load. */

// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
 function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'special:upload') {
    return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc);

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 

PurgeButtonText = 'Purge';

/* importScriptPages-start */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/Toggler.js',

        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:AllPagesHideRedirect/code.js',
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:ListFiles/code.js', // ListFiles from Dev Wiki
        'u:dev:PurgeButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:ShowHide/code.js',
    ]
}, {
    type: 'style',
    article: 'u:dev:Highlight/code.css'
});
/* importScriptPages-end */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
 
// Fix search result links - taken from pokemon.wikia.com
function fixSearchResultLinks() {
	$('ul.mw-search-results').find('a').each(function() {
		var a = $(this);
		a.attr('href', wgArticlePath.replace('$1', encodeURIComponent(a.text().replace(new RegExp(' ', 'g'), '_')).replace(new RegExp('%3A','g'),':')));
	});
}
 
if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Search') {
	$(fixSearchResultLinks);
}
 
function ttforhandy() {
  var doo = false;
  var agents = new Array(
    'Windows CE', 'Pocket', 'Mobile',
    'Portable', 'Smartphone', 'SDA',
    'PDA', 'Handheld', 'Symbian',
    'WAP', 'Palm', 'Avantgo',
    'cHTML', 'BlackBerry', 'Opera Mini',
    'Nokia', 'Android','Nintendo DSi'
  );
for (var i = 0; !doo && i<agents.length; i++) {
  if(navigator.userAgent.indexOf(agents[i]) > -1){
    doo = true;
  }
}
if(doo){
  var spans = document.getElementsByTagName("span");
   {
    if(spans[i].className == "tt_for_handy"){
      spans[i].style.display = "inline";
    }
  }
}
}
addOnloadHook(ttforhandy);


/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}