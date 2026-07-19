/* display rail content immediately */
window.AddRailModule = [{
	page: 'Template:RailModule', prepend: true, maxAge: 0
}];

/* welcome automation for this site */
window.welcomeMessage = {
    enabled: true,
    preferTalk: true,
    adminUsername: 'ClodaghelmC',
    adminNickname: 'Clodaghelm',
    messageTitle: 'Welcome to Majo to Ryouken Wiki, $1!',
    messageText: '{{' + 'subst:WelcomeMessage|$1|$2|$3|$4|' + '{{' + 'subst:CURRENTTIME}}, {{' + 'subst:CURRENTDAY}} {{' + 'subst:CURRENTMONTHNAME}} {{' + 'subst:CURRENTYEAR}} (UTC)}}'
};

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
        'u:clodaghelm:MediaWiki:Chronoa.js',
        'u:clodaghelm:MediaWiki:Custom-DiscordChat.js',
        'u:clodaghelm:MediaWiki:LastModified.js',
        'u:clodaghelm:MediaWiki:NewPages.js',
        'u:clodaghelm:MediaWiki:RailCarousel.js',
        'u:clodaghelm:MediaWiki:PageFooterPanel.js'
    ]
});