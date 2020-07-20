/* The following script was created by [[User:MateyY|MateyY]].
 * Version: 2.1
 * For skins: all
 * JavaScript library used: jQuery
 * Function: Informs user whether comments are removed and/or disabled by changing the text displayed in the button and the heading comment counter on the bottom of the page.
 * Build for use on: all wikis
 * Do NOT copy the code; import it!
 * Thank you!
 */
(function($) {
     function commentsDisabled() {
          if ($(".WikiaArticleComments.loading").length === 0 && commentsInterval) {
               if (commsDisabled) {
                    clearInterval(commentsInterval);
                    return;
               }
               if (skin === "oasis" || skin === "wikia") {
                    if ($("#WikiaArticleComments").length <= 0) $.noop();
                    else if (($("#article-comments").length <= 0) && ($("#WikiaPageHeader").length > 0) && ($("#WikiaPageHeader a.comments:contains('Comments')"))) {
                         if ($("#WikiaPageHeader a.comments").length > 0) $("#WikiaPageHeader a.comments").html(' Comments<span class="commentsbubble">&nbsp;disabled&nbsp;</span>');
                         else if ($("#WikiaPageHeader ul.commentslikes li.comments span.commentsbubble").length > 0 && $('#WikiaPageHeader ul.commentslikes li.comments a[href="#WikiaArticleComments"]').length > 0) $("#WikiaPageHeader ul.commentslikes li.comments span.commentsbubble").html("disabled");
                         $(".controls").remove();
                         $("#article-comments-counter-header").html("Comments are disabled");
                    } else if (($("#article-comments").length <= 0) && ($("#WikiaUserPagesHeader a.comments:contains('Comments')"))) {
                         $(".WikiaBlogPostHeader a.comments").html(' Comments<span class="commentsbubble">&nbsp;disabled&nbsp;</span>');
                         $(".controls").remove();
                         $("#article-comments-counter-header").html("Comments are disabled");
                    } else if ($("#article-comm").is(":disabled") || $(".no-comments-allowed").length > 0) {
                         $(".WikiaBlogPostHeader a.comments").html(' Comments<span class="commentsbubble">&nbsp;disabled&nbsp;</span>');
                         $("#WikiaPageHeader a.comments").html(' Comments<span class="commentsbubble">&nbsp;disabled&nbsp;</span>');
                         $(".controls").remove();
                         $("#article-comments-counter-header").append('&nbsp;<span style="font-size:80%">(disabled)</span>');
                    }
               } else {
                    if ($("#article-comm").is(":disabled") || $(".no-comments-allowed").length > 0) {
                         $("<header id='pageHeader'>").insertBefore($("h1#firstHeading"));
                         $("h1#firstHeading").appendTo($("header#pageHeader"));
                         $("header#pageHeader").append('<span style="float:right; font-size:xx-small"><a href="#WikiaArticleComments">Comments disabled</a></span>');
                         $("#article-comments-counter-header").append('&nbsp;<span style="font-size:80%">(disabled)</span>');
                         $(".controls").remove();
                    } else if ($("#article-comments").length <= 0) {
                         $("<header id='pageHeader'>").insertBefore($("h1#firstHeading"));
                         $("h1#firstHeading").appendTo($("header#pageHeader"));
                         $("header#pageHeader").append('<span style="float:right; font-size:xx-small"><a href="#WikiaArticleComments">Comments disabled</a></span>');
                         $(".controls").remove();
                    $("#article-comments-counter-header").html("Comments are disabled");
                    }
               }
               var commsDisabled = true;
          }
     }
     var commentsInterval = setInterval(commentsDisabled,500);
})(jQuery);