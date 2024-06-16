/*** Rail Module customization ***/
window.AddRailModule = [{prepend: true}];
window.AddRailModule = ['Template:RailModule'];

/*** Back to top button customization ***/
window.BackToTopArrow = true;

/*** Discord widget customization ***/
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'vnTk6ZthHP', // My Life as a Teenage Rabbot Wiki Discord server link (does not expire)
    prependToRail: true
};

/*** Preload templates ***/
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
preloadTemplates_subpage = "case-by-case";
preloadTemplates_namespace = "Template";

/*** Standard Edit Summary ***/
// Create the "dev" namespace if it doesn't exist already:
window.dev = window.dev || {};

// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummaries'
};

// The options need to be set before the import! Otherwise they may not work.
importArticles({ type: 'script', articles: [ 
	'u:dev:MediaWiki:Standard Edit Summary/code.js'
]});

/*** Configuration for ImprovedProseMirror (customized to fit the wiki) ***/
window.dev = window.dev || {};                               // Create Window.dev if it doesn't exist already
window.dev.IPM = {                                           // Create configuration
	insert: [
		{
			button: 'Knock, knock!',                               // Name of preset, shown in the dropdown
			insert: 'Hey! You are being warned for REASON HERE.', // Preset content
			replaceAll: true                                 // Set to true to overwrite existing content in the editor with this preset
		},
		{
			button: 'From',
			insert: 'a fellow Rabbotpedian and yours truly,\n[[Special:MyPage|UserName]] ([[Special:MyTalk|talk]]).'
		}
	]
};