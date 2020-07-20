var SocialMediaButtons = { 
	position: 'bottom',
	colorScheme: 'dark',
	buttonSize: '25px'
};
importScriptPage('SocialIcons/code.js','dev');

$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });