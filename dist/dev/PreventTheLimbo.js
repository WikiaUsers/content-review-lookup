//@author: DarkBarbarian
//After pressing "Post" or "Reply" the text you typed will be additionally printed into the browser console. This is for you, lovely texts that vanished into the Fandom limbo.
//Don't immediately reload the page if your text has vanished. When reloading, the browser console is cleared which sends your post into the limbo once and for all. So, before reloading make sure you copied the text from the console.
//Also, if you run into performance issues, make sure to message me!

//v1.0 - supports thread and message wall namespaces
//v1.1 - added article and blog comment support
//v1.2 - added support when submitting a wall post via the preview modal
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    if (window.preventTheLimboLoaded) {
        return;
    }
    window.preventTheLimboLoaded = true;
    
    var preventTheLimbo = $.extend({
        refreshDelay: 10000
    }, window.preventTheLimbo);
    
    var commentNS = [0, 500]; //Article and Blog
    var threadNS = [1200, 1201]; //Message Wall and Thread
    var nsNum = mw.config.get("wgNamespaceNumber");
    
    if (!(commentNS.concat(threadNS)).includes(nsNum)) return;
    
    if (threadNS.includes(nsNum)) {
        //Collect all "post" buttons on page
        var buttons = $("ul.replies > li.new-reply > .MiniEditorWrapper > div:nth-child(3) > .replyButton").toArray();
        buttons = buttons.concat($("#WallMessageSubmit").toArray());
        buttons = buttons.concat($('#WallPreviewModal button[data-event="publish"]'));
        
        //Clicking on one of the "post" buttons results in collecting all text input fields and print their current values into the console. This is necessary because it's difficult to tell via jQuery which text input field you were in when pressing the button.
        buttons.forEach(function(button) {
            button.onclick = function() {
                var textareaArr = $("ul.replies > li.new-reply > .MiniEditorWrapper > div:nth-child(2) > .editarea > textarea").toArray();
                textareaArr = textareaArr.concat($("#WallMessageBody").toArray());
                textareaArr.forEach(function(text) {
                    if (text.value.length !== 0) console.log(text.value);
                });
            };
        });
    } else if (commentNS.includes(nsNum)) {
        var buttons2 = [];
        
        //Since most text input fields are added dynamically upon clicking "Reply" (unlike walls where most threads just aren't displayed but can be accessed from the beginning) the script needs to fire in an interval to make sure all typed text can be logged.
        //Current delay is 10 seconds. This means if you open the input field, type a text and post it within 10 seconds the text won't be logged. This shouldn't be much of a big deal though since texts you typed within 10 seconds aren't that much of a loss.
        setInterval(function() {
            //Collect all open "post comment" buttons and text input fields on page
            buttons2 = $(".article-comm-input-text > .buttons > input").toArray();
            buttons2 = buttons2.concat($("#article-comm-submit").toArray());
            
            buttons2.forEach(function(button) {
                button.onclick = function() {
                    var textareaArr2 = $(".article-comm-input-text > .editarea > textarea").toArray();
                    textareaArr2 = textareaArr2.concat($("#article-comm").toArray());
                    textareaArr2.forEach(function(text) {
                        if (text.value.length !== 0) console.log(text.value);
                    });
                };
            });
        }, preventTheLimbo.refreshDelay);
    }
});