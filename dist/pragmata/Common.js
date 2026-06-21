/*-----------------------------------*\
   #SCRIPT-CONFIGURATIONS
\*-----------------------------------*/

/**
 * [[w:c:dev:AddRailModule]]
 * Ensure the latest content is displayed immediately
 * [[Template:RailModule]]
 */
window.AddRailModule = [{
	page: 'Template:RailModule',
	prepend: true,
	maxAge: 0
}];

/**
 * [[w:c:dev:WDSIcons]]
 * Help the script render on the rail and dynamic containers
 */
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

/**
 * [[w:c:dev:WelcomeMessage]]
 * Welcome automation for this site
 */
window.welcomeMessage = {
    enabled: true,
    adminUsername: 'ClodaghelmC',
    adminNickname: 'Clodaghelm',
    messageTitle: 'Welcome to Pragmata Wiki, $1!',
    messageText: 'Hi $1, . Welcome and thank you for your edit to the <a href="https://pragmata.fandom.com/wiki/$2">$2</a> page.\n‎ \n\n' +
                 'Please leave a message on my <a href="https://pragmata.fandom.com/wiki/Message_Wall:$4">wall</a> or reach out to the <a href="https://pragmata.fandom.com/wiki/Special:ListAdmins/sysop">other admins</a> if you need help. You can also visit the <a href="https://pragmata.fandom.com/wiki/Special:Community">community portal</a> to find active tasks, and use <a href="https://pragmata.fandom.com/wiki/Special:Forum">Discussions</a> to connect with the community. If you are new to the platform, <a href="https://community.fandom.com">Community Central</a> and <a href="https://community.fandom.com/wiki/Help:Getting_started">Help:Getting started</a> are excellent resources for general help.\n‎ \n\n' +
                 'Enjoy your time at Pragmata Wiki!'
};

/*-----------------------------------*\
   #CUSTOM-SCRIPTS
\*-----------------------------------*/

importArticles({
	type: 'script',
    articles: [
    	'u:clodaghelm:MediaWiki:Custom-DiscordChat.js',
        'u:clodaghelm:MediaWiki:LastModified.js',
        'u:clodaghelm:MediaWiki:RailCarousel.js',
        'u:clodaghelm:MediaWiki:PageFooterPanel.js'
    ]
});