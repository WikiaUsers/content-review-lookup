var SocialMediaButtons = {  
position: "bottom", 
colorScheme: "light", 
buttonSize: "50px", 
wikiTwitterAccount: "wikia_es" 
}; 
importScriptPage('SocialIcons/code.js','dev');

$(function() {
 $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook">Monobook</a>');
 });