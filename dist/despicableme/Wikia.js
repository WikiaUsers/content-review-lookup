var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');

var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "default"
};

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 1000;
importScriptPage('InactiveUsers/code.js', 'dev');

massRenameDelay = 1000; // Optional
massRenameSummary = 'automatic'; // Optional
importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}