var SocialMediaButtons = { 
 position: "bottom",
 colorScheme: "color",
 buttonSize: "45px"
};
importScriptPage('SocialIcons/code.js','dev');

// only load javascript if template exist
if (document.querySelector('.ptt-article.raw, .ptt-format-text.raw')) importScript('MediaWiki:PttHighlight.js')