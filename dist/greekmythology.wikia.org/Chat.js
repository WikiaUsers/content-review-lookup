// ChatTags config
var chatags = { videos: true, images: true, };
 
// Switch to irc button
var irc_button = 'Go to IRC Chat';
 
//  Start Function
 
function addcitadelircButton(){
    var citadelircButton = document.createElement('div');
    $('<div class="citadel-irc-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="citadel-irc-button wikia-button">'+irc_button+'</a></div>').prependTo('.Rail');
}
 
 
function switch_view(){
    if ($('.Rail .citadel-irc-div .citadel-irc-button').text() == irc_button){
        $('.Rail .citadel-irc-button').text(citadel_button);
        citadel_irc();
    } else {
    $('.Rail .citadel-irc-div .citadel-irc-button').text(irc_button);
        $('style#irc').remove()
    }
}
 
if ($('.Rail .citadel-irc-button').text() == ""){
    addcitadelircButton();
}
// Imports (always remember to import scripts last!)
importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',,
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:GiveChatMod/code.js',
        'u:electroboom:MediaWiki:ChatTagsLink.js'
    ]
});