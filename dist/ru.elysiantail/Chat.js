/*Код перенесён из Террария Вики, а также переработан под эту Вики*/
function loadChatScripts() {
    importArticles({
    type: "script",
    articles: [
        "w:c:dev:ChatOptions/code.js",
        "w:c:dev:ChatObject/code.js",
        "MediaWiki:CustomChatTags.js",
        "MediaWiki:SpamLimit.js",
        "MediaWiki:Badwords.js",
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
 
var cwmLoader = setInterval(function() {
    if(typeof $(".Chat > ul > .inline-alert")[0] !== "undefined") {
        welcomeMessage = $(".Chat > ul > .inline-alert")[0]; // Selects the first inline alert.
        $(welcomeMessage).html('Добро пожаловать в чат DaET Вики! Соблюдайте <a href=http://ru.dustanelysiantail.wikia.com/wiki/Dust:_An_Elysian_Tail_вики:Правила>правила</a>, и будьте вежливы!')
        clearInterval(cwmLoader);
        console.log("CWM loaded, tried to change it");
        cwmLoaded = true;
        mainRoom.model.chats.bind("afteradd", function() {
            appendTimestamps();
        });
    } else {
        console.log("CWM isn't loaded");
    }
},50);
 
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
 
// Не дает писать сообщения с одним пустым местом (пробелы, например) 
 
$('[name="message"]').keypress(function(e) {
	if (e.which == 13 && /^[\]\[\s]+$/.test(this.value)) {
		e.preventDefault();
		this.value = ''; //prevent sending the message if contains only [ ] and/or whitespace.
	}
});