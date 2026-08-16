/* Import fail safe for [[w:c:dev:WelcomeMessage]] */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WelcomeMessage.js',
    ]
});

/* Config */
window.welcomeMessage = {
	enabled:		true,
	preferTalk:		false,
	adminUsername:	'Sapphire-Diamond-Star',
	adminNickname:	'Sapphire-Diamond-Star',
	messageTitle:	'Welcome to TUIDEpedia, $1!',
	messageText:	'Hi $1. Thank you for your edit to <a href="https://wetuide.fandom.com/wiki/$2">$2</a>.\n‎ \n\n' +
					'Before continuing, please make sure to read the wiki\'s <a href="https://wetuide.fandom.com/wiki/Project:Portal">rules and guidelines</a> to learn more about contributing to the wiki.\n‎ \n\n' +
					'Visit the wiki\'s <a href="https://wetuide.fandom.com/wiki/Special:Community">community portal</a> to find incomplete tasks on the wiki. If you still need help, you can also be part of the larger Fandom family of communities. Visit <a href="https://community.fandom.com/wiki/Community_Wiki">Fandom\'s Community Central</a> to <a href="https://community.fandom.com/wiki/Help:Getting_Started">get started</a>!\n‎ \n\n' +
					'Enjoy your stay on TUIDEpedia!\n‎ \n\n' +
					'(This message is automated. Please do not reply.)'
};