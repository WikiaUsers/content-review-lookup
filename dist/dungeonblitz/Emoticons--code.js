$(function()
{
    // Adding neccessary CSS
    // Old CSS (used for compatibility)
    mw.util.addCSS(".kockaEmoticonsIcon{width:19px;height:19px;border:1px solid black;padding: 10px;border-radius: 5px;background:#333333;}.kockaEmoticonsIcon:hover{background:#555555;}");
    // New CSS
    mw.util.addCSS(".EmoticonsWindowIcon{width:19px;height:19px;border:1px solid black;padding: 10px;border-radius: 5px;background:#333333;}.EmoticonsWindowIcon:hover{background:#555555;}#EmoticonsWindowList{height:400px;overflow-y:auto;}");
 
    // Initializing variables
    var obj = window.kockaEmoticons || {};
    obj.emoticons = {};
    obj.vocab = obj.vocab || {};
 
    // Parsing emoticons
    mw.config.get('wgChatEmoticons').split("\n").forEach(function(el, index, arr) { if(el[0] === "*" && el[1] !== "*") obj.emoticons[arr[index + 1].substring(2).trim()] = el.substring(1).trim(); }, this);
 
    // Creating the element to display in the modal
    var mainElement = $("<div id='EmoticonsWindowModalMain'><span class='kockaEmoticonsHelp EmoticonsWindowHelp'>" + (obj.help || 'To insert an emoticon, click it. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Full list.</a>') + "</span></div>");
    var emoticonsList = $("<div id='EmoticonsWindowList'></div>");
 
    /**
     * Function for creating an emoticon element
     * @param [String] emote - Emote code
     * @method
     */
    function createEmoteElement(emote)
    {
        var el = document.createElement("img");
        el.className = "kockaEmoticonsIcon EmoticonsWindowIcon";
        el.src = obj.emoticons[emote];
        el.setAttribute('title', emote);
        emoticonsList.append(el);
    }
 
    for(var emote in obj.emoticons) if(obj.emoticons.hasOwnProperty(emote)) createEmoteElement(emote);
    mainElement.append(emoticonsList);
 
    // Creating Emoticons button
    var button = document.createElement("button");
    button.innerHTML = obj.vocab.emoticons || "Emoticons";
    button.className = "EmoticonsWindowButton kockaEmoticonsSpan";
    button.onclick = function()
    {
        // Show modal
        // TODO: Fix double-initializing to make the modal loading faster.
        $.showCustomModal(obj.vocab.emoticons || "Emoticons", mainElement.prop('outerHTML'),
        {
            id: "EmoticonsWindowModal",
            buttons: [{
                id: "EmoticonsWindowClose",
                defaultButton: true,
                message: obj.vocab.close || "Close",
                handler: function(){ $("#EmoticonsWindowModal").closeModal(); }
            }]
        });
        $(".EmoticonsWindowIcon").click(function(e)
        {
            var ap = $(".message textarea").last();
            ap.val(ap.attr("value") + " " + e.target.title);
            $("#EmoticonsWindowModal").closeModal();
        });
    };
 
    // Adding button to title
    // Steven Universe Wiki is an exception, as requested by [[User:Dorumin]]
    if(wgServer === "http://es.monsterlegends.wikia.com") $('#chatOptionsButton + .chat-button').after(button);
    else $('.public.wordmark').first().append(button);
});