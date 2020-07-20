
$(function()
{
    // Adding neccessary CSS
    mw.util.addCSS(".kockaEmoticonsIcon{width:19px;height:19px;border:1px solid black;padding: 10px;border-radius: 5px;background:#5F2C60;}.kockaEmoticonsIcon:hover{background:#823C83;}#kockaEmoticonsModalMain{height:400px;overflow-y:auto;}");
 
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
    button.innerHTML = obj.vocab.emoticons || "Emoticons";
    button.className = "kockaEmoticonsSpan";
    button.onclick = function()
    {
        // Show modal
        // TODO: Fix double-initializing to make the modal loading faster.
        $.showCustomModal(obj.vocab.emoticons || "Emoticons", "<div id='kockaEmoticonsModalMain'></div>",
        {
            id: "kockaEmoticonsModal",
            buttons: [{
                id: "kockaEmoticonsClose",
                defaultButton: true,
                message: obj.vocab.close || "Close",
                handler: function(){ $("#kockaEmoticonsModal").closeModal(); }
            }]
        });
 
        // Adding help to modal
        $("#kockaEmoticonsModalMain").append("<span class='kockaEmoticonsHelp'>" + (typeof obj.help === 'undefined' ? "Choose an emoticon by clicking on it.": obj.help) + "<br/></span>");
 
        // Adding emoticons to modal
        for(var emote in obj.emoticons) if(obj.emoticons.hasOwnProperty(emote)) createEmoteElement(emote);
    };
 
    // Adding button to title
    $('.public.wordmark').first().append(button);
});