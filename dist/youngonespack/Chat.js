// ************
// Chat options import
// ************
 
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('MediaWiki:ChatOptions/code.js','dev');
}
 
// ****************
// END Chat options import
// ****************
 
// Enables images to be posted in chat
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');