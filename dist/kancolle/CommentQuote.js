(function($, ArticleComments){
    "use strict";
    console.log("Comment Quotes v036");
    var hasButtons = false;
    
    function htmlEncode(value){ return $('<div/>').text(value).html(); }
    function htmlDecode(value){ return $('<div/>').html(value).text(); }
    
    function AddButtons(){
        if(hasButtons) return false; hasButtons = true;
        
        // Add Quote button to all comment boxes
        $("#article-comments-ul .comment").each(function() {
            if ($(".article-comm-reply", this).length) {
                $('<button type="button" class="wikia-button secondary article-comment-quote">Quote</button>')
                    .insertAfter($(".article-comm-reply", this));
            } else {
               $(".buttons", this).prepend($('<button type="button" class="wikia-button secondary article-comment-quote">Quote</button>'));
            }
        });
        
        // Quote Button Clicked
        $(".article-comment-quote").on("click", function(){
            var thisPost = $(this).closest(".comment");
            var origMsg = htmlEncode($(".article-comm-text", thisPost).html());
            var origUser = $(".edited-by a:eq(1)", thisPost).text();
            
            var parentUL = $(this).closest("ul");
            var origPost = false;
            if(parentUL.hasClass("sub-comments")){
                origPost = parentUL.prev();
            }else{
                origPost = $(this).closest("li");
            }
            origPost.data("quote", origMsg);
            origPost.data("quoted", origUser);
            $(".article-comm-reply", origPost).trigger("click");
            window.location.hash = "";
            window.location.hash = '#'+$(origPost).attr("id");
            setTimeout(function(){ checkTextArea(origPost.attr("id")); }, 500);
            return true;
        });
    }
    
    function checkTextArea(elementId){
        var origPost = $("#"+elementId);
        var editorToolbar = $(".toolbar", origPost);
        if(editorToolbar.length > 0){
            var modeSwitcher = $(".cke_toolbar_mode_switch", origPost);
            if(modeSwitcher.length > 0){
                $(".cke_toolbar_mode_switch", origPost).hide();
                $("a.cke_button_ModeSource", origPost).trigger("click");
                setTimeout(function(){ checkSourceArea(elementId); }, 500);
            }else{
                $("textarea", origPost).text(buildQuoteHTML(
                    origPost.data("quoted").trim(),
                    htmlDecode(origPost.data("quote"))
                ));
            }
        }else{
            setTimeout(function(){ checkTextArea(elementId); }, 500);
        }
    }
    
    function checkSourceArea(elementId){
        var origPost = $("#"+elementId);
        var watched = $(".cke_contents textarea", origPost);
        if(watched.length > 0){
            $(watched).text(buildQuoteHTML(
                origPost.data("quoted").trim(),
                htmlDecode(origPost.data("quote"))
            ));
        }else{
            setTimeout(function(){ checkSourceArea(elementId); }, 500);
        }
    }
    
    function buildQuoteHTML(user, message){
        return "<blockquote class=\"styled\"><span style=\"font-size:12px; color:#444;\">''"+user+" wrote:''</span><br />"+message+"</blockquote>";
    }
    
    if(ArticleComments){
        var real_init = ArticleComments.init;
        ArticleComments.init = function () {
            var result = real_init.apply(this, arguments);
            AddButtons();
            return result;
        };
        
    }
}(jQuery, window.ArticleComments));