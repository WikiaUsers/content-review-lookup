// T‰m‰n sivun JavaScript-koodi liitet‰‰n jokaiseen sivulataukseen

// Scriptien tuonti
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:RevealAnonIP/code.js',
		'u:dev:MediaWiki:InactiveUsers/code.js',
		'u:dev:MediaWiki:AjaxRC/code.js',
                'u:dev:MediaWiki:BackToTopButton/code.js'
	]
});




// Ep‰aktiivinen -tagi
InactiveUsers = { 
    months: 2,
    text: 'Ep‰aktiivinen'
};




// RevealAnonIP
window.RevealAnonIP = {
    permissions : ['sysop']
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

mw.hook('wikipage.content').add(function($content) {
    $content.find('.EmulatorFrame:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 600,
                scrolling: 'no',
                src: 'https://e.widgetbot.io/channels/718533584876732437/718533584876732440',
                width: 400
            })
        ).addClass('loaded');
    });
});