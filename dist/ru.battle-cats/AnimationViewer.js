{
const blockedUsers = [];
const betaUsers = [];

$(document).ready(function () {
	if ($('.animation-container').length == 0 || blockedUsers.includes(mw.config.get('wgUserName'))) {
		return;
	}

	if (betaUsers.includes(mw.config.get('wgUserName'))) {
	mw.loader.load('https://battlecats.miraheze.org/w/load.php?lang=en&modules=ext.gadget.AnimationViewerBeta');
		return;
	}
	mw.loader.load('https://battlecats.miraheze.org/w/load.php?lang=en&modules=ext.gadget.AnimationViewer');
});
}