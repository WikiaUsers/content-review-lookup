/*-----------------------------------*\
   #SCRIPT-CONFIGURATIONS
\*-----------------------------------*/

/* [[w:c:dev:AddRailModule]]
 * Ensure the latest content is displayed immediately
 */
window.AddRailModule = [{ page: 'Template:RailModule', maxAge: 0 }]; // [[Template:RailModule]]

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
        'u:clodaghelm:MediaWiki:RailCarousel.js',
        'u:clodaghelm:MediaWiki:PageFooterPanel.js'
    ]
});