// Javascript for Collapsible Sidebar Functionality
// If anything gets screwy, just remove these line from this file

var url = "https://raw.github.com/nicklink483/wikia-sidebar-collapse/master/stable-releases/wsc-stable-1_3.js";
$.when($.getScript(url),$.Deferred(function(deferred){$(deferred.resolve);})).done(function(){});

// End of Collapsible Sidebar Javascript


mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 5
 */
// CSS
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	} else {
		alert( 'Only pages from the MediaWiki namespace are allowed.' );
		//mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}
 
// JS
var extraJS = mw.util.getParamValue( 'withJS' );
if ( extraJS ) {
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		importScript( extraJS );
	} else {
		alert( 'Only pages from the MediaWiki namespace are allowed.' );
		//mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
	}
}

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

importArticles({
 type:'script',
 articles:[
  //'MediaWiki:Common2.js', //Extension:SoundManager2Button
  'MediaWiki:Sm2.js', //Extension:SoundManager2Button
  'w:c:luneria:AjaxBatchDelete/code.js',
  'w:c:luneria:AjaxRC/code.js',
  //'w:c:dev:CollapsibleEdittools/code.js',
  'w:c:luneria:CollapsibleInfobox/code.js',
  'w:c:luneria:RevealAnonIP/code.js', //Reveal Anonymous User IP
  'w:c:luneria:ShowHide/code.js'
 ]
});

/***********************************************************/
/* Sliders using jquery by User:Tierrie in Dragon Age Wiki */
/***********************************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

/** Username replace function ([[Template:USERNAME]]) 
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
$(function() {
	if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
	$("span.insertusername").text(mw.config.get('wgUserName'));
});

//HERE IS THE IRC REPLACER. Adds Embedded IRC to RS:IRC made by Green Reaper & ShadowTale
$(function() {
	var nick = (wgUserName == null) ? ('LOL-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-lol&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="660" height="400" style="border:0;"></iframe>');
});
//END IRC CODE


/* End of mw.loader.using callback */
} );

/* Loads MathJax (http://mathjax.org) */
(function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = "http://cdn.mathjax.org/mathjax/latest/MathJax.js";
 
  var config = 'MathJax.Hub.Config({' +
                 'extensions: ["tex2jax.js"],' +
                 'jax: ["input/TeX","output/HTML-CSS"]' +
               '});' +
               'MathJax.Hub.Startup.onload();';
 
  if (window.opera) {script.innerHTML = config}
               else {script.text = config}
 
  document.getElementsByTagName("head")[0].appendChild(script);
})();
/* DO NOT ADD CODE BELOW THIS LINE */