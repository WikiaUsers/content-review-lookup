/* help wdsicons render on the rail and dynamic containers */
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

/* custom scripts */
importArticles({
	type: 'script',
    articles: [
    	'u:clodaghelm:MediaWiki:FauxRadio.js',
        'u:clodaghelm:MediaWiki:LastModified.js',
        'u:clodaghelm:MediaWiki:NewPages.js',
        'u:clodaghelm:MediaWiki:PageFooterPanel.js'
    ]
});