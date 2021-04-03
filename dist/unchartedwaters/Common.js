//ImageMapEdit script, more info on:
//https://meta.wikimedia.org/wiki/User:Dapete/ImageMapEdit#English
if (mw.config.get('wgNamespaceNumber') == 6 && wgAction == 'view') {
	mw.loader.load('//tools.wmflabs.org/imagemapedit/ime.js');
}

if (mw.config.get('wgUserGroups').indexOf('Bureaucrat') > -1) {
	massRenameDelay = 1000;
	massRenameSummary = 'automatic';
	importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}