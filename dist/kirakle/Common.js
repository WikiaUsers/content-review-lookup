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

/* [[w:c:dev:WelcomeMessage]] */
window.welcomeMessage = {
	enabled: true,
	adminUsername: 'Sapphire-Diamond-Star',
	adminNickname: 'Sapphire-Diamond-Star',
	messageTitle: 'Welcome to KIRAKLE Wiki, $1!',
	messageText: 'Hi $1, . Thank you for your edit to <a href="https://kirakle.fandom.com/wiki/$2" title="$2">$2</a>.\n‎ \n\n' +
	'Before continuing, please click on the links listed below to learn more about contributing to the wiki:\n‎ \n\n' +
	'{{Project}}\n‎ \n\n' +
	'Visit the wiki%27s <a href="https://kirakle.fandom.com/wiki/Special:Community" title="Special:Community">community portal</a> to find incomplete tasks on the wiki. If you still need help, you can also be part of the larger Fandom family of communities. Visit <a href="https://community.fandom.com/wiki/Community_Wiki" title"w:c:community">Fandom%27s Community Central</a> to <a href="https://community.fandom.com/wiki/Help:Getting_Started" title"w:Help:Getting Started">get started</a>!\n‎ \n\n' +
	'Enjoy your stay on KIRAKLE Wiki!\n‎ \n\n' +
	'<span style="font-size: small; text-align: center;">This message is automated. Please do not reply</span>',
};