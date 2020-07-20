 // <syntaxhighlight lang="javascript">
// Drew1200/Curiouscrab 
 
var alertMessage;
window.outputWarning = '';
window.badWords = (window.badWords || []).concat(["blocked-test", "pute", "bite", "Pd"]);
 
$('#Write textarea').keydown(function(e) {
    if (e.keyCode == 13 && wordFilter() === true && mainRoom.active === true) {
        for (var i = 0; i < window.badWords.length; i++) {
            window.outputWarning = $('#Write textarea').val();
        }
        $("div.Chat>ul").append("<li class='inline-alert' id='temporary'>" + (alertMessage || "ATTENTION : Le message que vous venez de publier contient un ou des mots inappropriés. Êtes-vous sûr de vouloir envoyer ce message ?") + " ~<br><br>~ <button onclick='ignoreWarning();'>Oui, je souhaite le publier</button> ou <button onclick='endMessage();'>Annuler</button></span></li>");
        $(this).unbind('keypress').val('');
    }
});
 
function ignoreWarning() {
    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:window.outputWarning}).xport());
    $("#temporary").remove();
}
 
function endMessage() {
    $('#temporary').remove();
}
 
function wordFilter() {
    for (var i = 0; i < window.badWords.length; i++) {
        if ($('#Write textarea').val().toLowerCase().indexOf(window.badWords[i]) > -1) {
            return true;
        }
    }
}
// </syntaxhighlight>
 
var chatags = { images: true, videos: true };
 
 /***************************/
/***** Script Imports ******/
/***************************/
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:GiveChatModPrompt/code.js',
        "u:dev:IsTyping/code.js",
        "u:dev:MediaWiki:ChatDelay/code.js",
        'u:dev:MediaWiki:!mods/code.js',
        'u:kocka:MediaWiki:ChatRules/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js'
    ]
});

// variable traductrice
window.ChatRulesConfig = {
    vocab: {
        rules: 'Règlement'
    }
};