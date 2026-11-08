/* Any JavaScript here will be loaded for all users on every page load. */

/* Update Railmodule instantly */
window.AddRailModule = [{
	page: 'Template:RailModule',
	maxAge: 0,
	prepend: true,
}];

/* [[w:c:dev:WDSIcons]] */
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

/* Config for [[w:c:dev:InlineCopyable]] */
window.inlineCopyableConfig = {
    tooltipText: 'Copied!',
    requireExplicitClass: true
};