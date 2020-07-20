//Imports

importScriptPage('DisplayClock/code.js','dev');
importScript('MediaWiki:Common.js/message.js');
importScript('MediaWiki:Common.js/nav.js');

//TheWWC Page Music - Disabled at current

(function(mw){
if ( mw.config.get( "wgPageName" ) === "User:The WWC" ) {
var music = document.createElement("audio");
music.autoplay=true;
music.src="https://images.wikia.nocookie.net/classikcars/images/5/5d/TheWWC_Background_Music.ogg"; document.body.appendChild(music);
}
}(mediaWiki));