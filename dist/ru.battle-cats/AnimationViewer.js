{
const blockedUsers = [];
const betaUsers = ['SweetDonut0', 'AnonymousCrouton', 'Novastrala', 'TheWWRNerdGuy', 'WonderMOMOCO'];

$(document).ready(function () {
	if ($('.animation-container').length == 0 || blockedUsers.includes(mw.config.get('wgUserName'))) {
		return;
	}

	if (betaUsers.includes(mw.config.get('wgUserName'))) {
		mw.loader.load('https://battlecats.miraheze.org/w/index.php?title=MediaWiki:AnimationViewer.css/beta.css&action=raw&ctype=text/css', 'text/css');
		mw.loader.load('https://battlecats.miraheze.org/w/index.php?title=MediaWiki:AnimationViewer.js/beta.js&action=raw&ctype=text/javascript');
		return;
	}

	mw.loader.load('https://battlecats.miraheze.org/w/index.php?title=MediaWiki:AnimationViewer.css&action=raw&ctype=text/css', 'text/css');
	mw.loader.load('https://battlecats.miraheze.org/w/index.php?title=MediaWiki:AnimationViewer.js/script.js&action=raw&ctype=text/javascript');
});
}