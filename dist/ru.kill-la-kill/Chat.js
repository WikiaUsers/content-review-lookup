function loadChatScripts() {
    importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatDelay/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatObject/code.js',
        'u:d97:MediaWiki:TitleNotifications.js'
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
        $(welcomeMessage).html('Добро пожаловать в чат Kill la Kill вики!');
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
            $("#entry-"+JLAPI.mostRecentMessage.cid()).append(""+hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2)+"");
        } else {
            $("#entry-"+JLAPI.mostRecentMessage.cid()+" > span.time").html(hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2));
        }
    }
}
 
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
 
// Не дает писать сообщения пустые сообщения
$('[name="message"]').keypress(function(e) {
	if (e.which == 13 && /^[\]\[\s]+$/.test(this.value)) {
		e.preventDefault();
		this.value = ""; //prevent sending the message if contains only [ ] and/or whitespace.
	}
});

// Оригинал: w:c:ru.elderscrolls:MediaWiki:Chat.js*/
$(function() {
    if ($('#HeadLineBar').length) {
        return;
    }
    var headline_styles = 'display:inline-block; width:300px; font-size:12px; text-align:center; line-height:14px; padding:7px 0; color:white; font-weight:bold; position:absolute; right:170px;';
    var headline_bar = '<div id="HeadLineBar" style="' + headline_styles + '">Добро пожаловать в чат Kill la Kill вики!</br><a href="/wiki/Project:Правила_чата" target="_blank">Правила</a> &bull; <a href="/wiki/MediaWiki:Emoticons" target="_blank">Смайлики</a> &bull; <a href="/wiki/Special:Listadmins" target="_blank">Администраторы</a> &bull;  <a href="/wiki/Special:ListUsers/chatmoderator" target="_blank">Модераторы</a></div>';
    $('.ChatHeader > .wordmark').append(headline_bar);
});


/***быстрые смайлы***/
/*http://kocka.wikia.com/wiki/MediaWiki:Emoticons/code.js*/
$(function()
{
    // Adding neccessary CSS
    mw.util.addCSS(".kockaEmoticonsIcon{width:30px;height:30px;border:1px solid black;padding: 10px;border-radius: 5px;background:#8c0502;}.kockaEmoticonsIcon:hover{background:#8c0502;}#kockaEmoticonsModalMain{height:400px;overflow-y:auto;}");
 
    // Initializing variables
    var obj = window.kockaEmoticons || {};
    obj.emoticons = {};
    obj.vocab = obj.vocab || {};
 
    // Parsing emoticons
    EMOTICONS.split("\n").forEach(function(el, index, arr) { if(el[0] === "*" && el[1] !== "*") obj.emoticons[arr[index + 1].substring(2).trim()] = el.substring(1).trim(); }, this);
 
    /**
     * Function for creating an emoticon element
     * @param [String] emote - Emote code
     * @method
     */
    function createEmoteElement(emote)
    {
        var el = document.createElement("img");
        el.className = "kockaEmoticonsIcon";
        el.src = obj.emoticons[emote];
        el.onclick = function()
        {
            var ap = $(".message textarea").last();
            ap.val(ap.attr("value") + emote);
            $("#kockaEmoticonsModal").closeModal();
        };
        $("#kockaEmoticonsModalMain").append(el);
    }
 
    // Creating Emoticons button
    var button = document.createElement("button");
    button.innerHTML = obj.vocab.emoticons || "Смайлики";
    button.className = "kockaEmoticonsSpan";
    button.onclick = function()
    {
        // Show modal
        // TODO: Fix double-initializing to make the modal loading faster.
        $.showCustomModal(obj.vocab.emoticons || "Смайлики", "<div id='kockaEmoticonsModalMain'></div>",
        {
            id: "kockaEmoticonsModal",
            buttons: [{
                id: "kockaEmoticonsClose",
                defaultButton: true,
                message: obj.vocab.close || "Закрыть",
                handler: function(){ $("#kockaEmoticonsModal").closeModal(); }
            }]
        });
 
        // Adding help to modal
        $("#kockaEmoticonsModalMain").append("<span class='kockaEmoticonsHelp'>" + (typeof obj.help === 'undefined' ? "Выберите смайлик и нажмите на него для вставки": obj.help) + "<br/></span>");
 
        // Adding emoticons to modal
        for(var emote in obj.emoticons) if(obj.emoticons.hasOwnProperty(emote)) createEmoteElement(emote);
    };
 
    // Adding button to title
    $('.public.wordmark').first().append(button);
});