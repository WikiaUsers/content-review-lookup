//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to Isolated Island'
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// ************
// Chat options import
// ************
window.ignoreBot = "FlutterBot";
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('ChatOptions/code.js','dev');
}
var chatags = { images: true, videos: true };
importScriptPage('ChatTags/code.js', 'dev');
importScriptPage('LightBlock/code.js', 'shining-armor');
importScriptPage('!kick.js', 'dev');
importScriptPage('!mods.js', 'dev');
importScriptPage('ChatModHover.js', 'dev');
importScriptPage('MessageBlocker/code.js', 'dev');
importScriptPage('jumbles/startup.js', 'dev');

importArticles( {
    type: 'script',
    articles: [
        "u:dev:SpellingBee/startup.js"
    ]
} );