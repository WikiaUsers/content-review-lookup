var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');

importScriptPage('AjaxRC/code.js','dev');
 
importScript('MediaWiki:localScript.js');
 
importArticle({
  type: 'script',
  article: 'u:dev:FloatingToc/code.js'
});