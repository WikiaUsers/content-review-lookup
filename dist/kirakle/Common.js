/* Any JavaScript here will be loaded for all users on every page load. */

/* [[Template:RailModule]] - Credits: [[w:c:pragmata:MediaWiki:Common.js]] */
window.AddRailModule = [{
	page: 'Template:RailModule',
	prepend: true,
	maxAge: 0
}];

/* [[w:c:dev:WDSIcons]] for [[Template:RailModule]] - Credits: [[w:c:pragmata:MediaWiki:Common.js]] */
(function() {
    function render() {
        mw.hook('dev.wds').add(function(wds) {
            setTimeout(function() {
                wds.render('#WikiaRail');
                wds.render('.has-dev-wds-icons');
            }, 150); // slightly increased buffer for heavier modules
        });
    }

    mw.hook('AddRailModule.module').add(render);
    mw.hook('wikipage.content').add(render);
})();