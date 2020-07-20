// Chat Logout Event
var LeaveMessages=[
    'was punished because they stole from the treat jar.',
    'got turned pink and exploded (whose fault it is shall never be revealed...).',
    'was victim to Ayu\'s experiments.',
    'drank to much fuzzle pop soda.',
    'fell victim to GirlyTurtle\'s and Akumation\'s shipping.',
    'touched Yandere-chan\'s senpai.',
    'died of cringe from Percy\'s terrible puns.',
    'fell out of the SAO Fanon House and into the eternal abyss.',
    'pulled Neko Ishi\'s tail.',
    'didn\'t slam and was unwelcome to the jam.',
    'tried to pet Neko Ishi.',
    'claimed they didn\'t like nekos.',
    'got trampled by a herd of Chibi Ishis.',
    'didn\'t find Emy cute. They didn\'t live for long.',
    'has been slain by Yamato.',
    'has left after being severely pestered by Asuka.',
    'has logged out because SAO was cleared.',
    'died because he was caught in between a fight between Snow and another player.',
    'died at the blade of Maximus Caliburn.',
    'was part of Galant\'s hit list and died.',
    'did not let Ishi finish his ramen.',
    'attempted to hit on Luna, but died. Humiliatingly.',
    'was caught by the rain of weapons from Supreme Weapon.',
    'went to the Neko Ishi Parade.'];


$(document).ready(function() {
    // Change the exit message every half second.
    setInterval(function() {
        // Select a random message
        var rand = Math.floor(Math.random() * LeaveMessages.length);
        wgMessages["chat-user-parted"] = LeaveMessages[rand]; //Leaving this here in case.
        mw.messages.values["chat-user-parted"] = LeaveMessages[rand];
    }, 500); //Wait half a second (500 miliseconds) before calling this again.
});
// Chat Topic
var chatTopic = '<font color="#FFFFFF">Welcome to the SAO Fanon Wiki Chat </font>'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// Chat options import
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('ChatOptions/code.js','dev');
}