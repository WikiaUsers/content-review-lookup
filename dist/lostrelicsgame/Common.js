/* Any JavaScript here will be loaded for all users on every page load. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = "https://static.wikia.nocookie.net/lostrelicsgame/images/4/4a/Lost_Relics_logo.png/revision/latest?cb=20201026024810";

importArticles({  
	type: 'script', 
	articles: ['u:dev:MediaWiki:Translator/Translator.js',]});