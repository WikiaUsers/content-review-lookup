/*-----------------------------------*\
   #SCRIPT-CONFIGURATIONS
\*-----------------------------------*/

/* [[w:c:dev:AddRailModule]]
 * Ensure the latest content is displayed immediately
 */
window.AddRailModule = [{
	page: 'Template:RailModule', // [[Template:RailModule]]
	prepend: true,
	maxAge: 0
}];

/* [[w:c:dev:WelcomeMessage]]
 * Welcome automation for this site
 */
window.welcomeMessage = {
    enabled: true,
    preferTalk: true,
    adminUsername: 'ClodaghelmC',
    adminNickname: 'Clodaghelm',
    messageTitle: 'Welcome to Wiki of Ender, $1!',
    messageText: '{{' + 'subst:WelcomeMessage|$1|$2|$3|$4|' + '{{' + 'subst:CURRENTTIME}}, {{' + 'subst:CURRENTDAY}} {{' + 'subst:CURRENTMONTHNAME}} {{' + 'subst:CURRENTYEAR}} (UTC)}}' // [[Template:WelcomeMessage]]
};

/* [[w:c:dev:WDSIcons]]
 * Help the script render on the rail and dynamic containers
 */
(function() {
    function render() {
        mw.hook('dev.wds').add(function(wds) {
            setTimeout(function() {
                wds.render('#WikiaRail');
                wds.render('.has-dev-wds-icons');
            }, 150); // Slightly increased buffer for heavier modules
        });
    }

    mw.hook('AddRailModule.module').add(render);
    mw.hook('wikipage.content').add(render);
})();

/*-----------------------------------*\
   #CUSTOM-SCRIPTS
\*-----------------------------------*/

importArticles({
	type: 'script',
    articles: [
        'u:clodaghelm:MediaWiki:FauxRadio.js',
        'u:clodaghelm:MediaWiki:LastModified.js',
        'u:clodaghelm:MediaWiki:RailCarousel.js',
        'u:clodaghelm:MediaWiki:PageFooterPanel.js'
    ]
});