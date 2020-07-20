/*Original: http://ru.elderscrolls.wikia.com/wiki/MediaWiki:Chat.js*/
$(function() {
    if ($('#HeadLineBar').length) {
        return;
    }
    var headline_styles = 'display:inline-block; width:300px; font-size:12px; text-align:center; line-height:14px; padding:7px 0; color:#3a3a3a; font-weight:bold; position:absolute; right:160px;';
    var headline_bar = '<div id="HeadLineBar" style="' + headline_styles + '">Добро пожаловать в чат Crash Bandicoot Вики.</br><a href="/wiki/Steven_Universe_Wiki:Правила_чата" target="_blank">Правила</a> — <a href="/wiki/MediaWiki:Emoticons" target="_blank">Смайлики</a></div>';
    $('.ChatHeader > .wordmark').append(headline_bar);
});
 
/*********************************/
function loadChatScripts() {
    importArticles({
    type: "script",
    articles: [
        "w:c:dev:ChatObject/code.js",
        "w:c:d97:MediaWiki:TitleNotifications.js"
    ]
    });
 
    mainRoom.maxCharacterLimit = 3000;
    $("#join-alert").remove();
    chatIsLoaded = true;
}
var loadedTester = setInterval(function() {
   if(typeof mainRoom !== "undefined") {
       importScriptPage("MediaWiki:JacobsLadderSuite.js","d97"); // import the API
       setTimeout(function() {
           loadChatScripts();
       },500);
       clearInterval(loadedTester);
       console.log("[CHAT.JS] Chat.js loading complete.");
   } 
},100);
 
function appendTimestamps() {
    if(cwmLoaded === true) {
        timer = new Date();
        hours = timer.getHours() % 12;
        if (hours === 0) { hours = 12; }
        minutes = timer.getMinutes();
        seconds = timer.getSeconds();
        if($("#entry-"+JLAPI.mostRecentMessage.cid()).hasClass('inline-alert')) {
            $("#entry-"+JLAPI.mostRecentMessage.cid()).append("<span class='time' style='font-weight: initial;'>"+hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2)+"</span>");
        } else {
            $("#entry-"+JLAPI.mostRecentMessage.cid()+" > span.time").html(hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2));
        }
    }
}
 
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
 
var chatags = {images: true, videos: true };
 
/*------------------------------------------------------------------------------*/
importScriptPage('SpeedEmoticon/code.js','korniux');
importArticles({
    type:'script',
    articles: [
        // ----
        'w:c:shining-armor:MediaWiki:ChatTags/code.js',
        "w:c:dev:ChatOptions/code.js"
        // ----
        ]
    });