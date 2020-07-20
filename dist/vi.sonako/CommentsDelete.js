/* For sysops only */
/* Articles */
window.AjaxCommentDeleteConfig = {
    fastDelete: "Xóa bình luận"
};
$(function()
{
    // If current page doesn't have comments at all, return.
    if (!window.wgIsArticle) return;
 
    // Getting the configuration
    var conf = window.AjaxCommentDeleteConfig || {},
        api  = new mw.Api();
    conf.vocab = conf.vocab || {};
 
    /**
     * Main function of the script
     * Here are contained things that will be executed once user changes the page/loads comments.
     */
    function toBeCalled()
    {
        var array = [], i = 0;
 
        // Creating array of iDs
        $('.comment').each(function() { array.push($(this)[0].id); });
 
        // Adding "Ajax Delete" button.
        $('span.tools > .article-comm-delete').each(function()
        {
            var el = $('<a class="AjaxCommentDeleteLink" style="color:red; fond-weight:bold; cursor:pointer;" title="Xóa nhanh Comment" data-id="' + array[i++] + '">' + (conf.vocab.linkText || "QuickDel") + '</a>');
 
            // Setting what happens when "Ajax Delete" button is clicked.
            el.click(function()
            {
                // Getting current comment iD
                var commid = $(this).data().id;
                // Checking if fast deletion is enabled
                if(conf.fastDelete) deleteComment(commid, conf.fastDelete);
                else
                {
                    // Showing the modal
                    $.showCustomModal((conf.vocab.modalTitle || "Delete comment"), "<div class='AjaxCommentDeleteModalMain'><span class='AjaxCommentDeleteHelpText'>" + (conf.vocab.selectReason || "Enter a proper deletion reason below.") + "<br/></span><input type='text' id='AjaxCommentDeleteReason'></input></div>",
                    {
                        id: "AjaxCommentDeleteModal",
                        buttons: [{
                            id: "AjaxCommentDeleteRemoveButton",
                            defaultButton: true,
                            message: (conf.vocab.deleteText || "Delete"),
                            handler: function()
                            {
                                deleteComment(commid, $('#AjaxCommentDeleteReason').val());
                                $("#AjaxCommentDeleteModal").closeModal();
                            }
                        },
                        {
                            id: "AjaxCommentDeleteCloseButton",
                            defaultButton: true,
                            message: (conf.vocab.close || "Close"),
                            handler: function(){ $("#AjaxCommentDeleteModal").closeModal(); }
                        }]
                    });
                }
            });
            $(this).after(el);
        });
    }
 
    /**
     * Function for deleting a comment.
     * @param [String] id - String containing the ID of the comment page to delete
     * @param [String] reason - Reason for the deletion
     */
    function deleteComment(id, reason)
    {
        // Deleting the post, this part was made by Ozuzanna, mostly
        new mw.Api().post({
            action: 'delete',
            pageid: id.substring(5),
            reason: reason,
            bot: true,
            token: mw.user.tokens.get('editToken')
        })  
        .done(function(d)
        {
            if (!d.error)
            {
                // Hiding the deleted comment
                var el = $("#" + id), next = el.next();
                el.slideToggle();
                if(next.is('ul')) next.slideToggle();
            }
            else new BannerNotification((config.vocab.fail || "Failed to delete comment") + ": " + d.error.code, 'error').show();
        })
        .fail(function() { new BannerNotification((config.vocab.fail || "Failed to delete comment"), 'error').show(); });
    }
 
    // Creating function alias.
    var alias = ArticleComments.init;
 
    /**
     * Function called while initializing comments
     */
    ArticleComments.init = function()
    {
        alias();
        toBeCalled();
    };
 
    /**
     * Function called when comment page has changed
     * Had to be rewritten so a call to the main function could be inserted
     * WARNING: This may cause compatibility issues!
     */
    ArticleComments.setPage = function (e)
    {
        // Regular Wikia code
        ArticleComments.bucky.timer.start('setPage');
        var page = parseInt($(this).attr('page'));
        e.preventDefault();
        ArticleComments.$commentsList.addClass('loading');
        $.getJSON(wgScript + '?action=ajax&rs=ArticleCommentsAjax&method=axGetComments',
        {
            article: wgArticleId,
            order: $('#article-comm-order').attr('value'),
            page: page,
            useskin: window.skin
        },
        function (json)
        {
            ArticleComments.$commentsList.removeClass('loading');
            if (!json.error)
            {
                ArticleComments.$commentsList.html(json.text);
                var $articleCommentsPagination = $('.article-comments-pagination');
                if ($articleCommentsPagination.exists()) $articleCommentsPagination.html(json.pagination);
                ArticleComments.addHover();
            }
            ArticleComments.processing = false;
 
            // Call to the main function
            toBeCalled();
 
            // Regular Wikia code
            ArticleComments.bucky.timer.stop('setPage');
        });
    };
});

/* Forum and Message Wall */
;(function($, mw) {
    if (mw.config.get('wgNamespaceNumber') !== 1201 && mw.config.get('wgNamespaceNumber') !== 1200) {
        return;
    }
 
    qd_functions = {
        revert: function(ID) {
            $.post('/wikia.php', {
                controller: 'WallExternal',
                method: 'undoAction',
                msgid: ID,
                format: 'json'
            }, function(d) {
                if (!d.status) return;
 
                $('[data-id="' + ID + '"]').show();
                $('#msg' + ID).remove();
            });
        },
 
        del: function(ID, reason) {
            $.post('/wikia.php', {
                controller: 'WallExternal',
                method: 'deleteMessage',
                mode: 'remove',
                msgid: ID,
                'formdata[0][name]': reason,
                'formdata[0][value]': 1,
                format: 'json'
            }, function(d) {
                if (!d.status) return;
 
                $('[data-id="' + ID + '"]')
                 .hide()
                 .before(
                    '<center>' +
                        '<div id="msg' + ID + '">' +
                            'Lý do bị xóa: "' + reason + '". ' +
                            '<a onclick="qd_functions.revert(' + ID + ');" style="cursor:pointer">Bỏ xóa?</a>' +
                        '</div>' +
                    '</center>'
                 );
            });
        },
 
        init: function() {
            var qd_but = '<button class="qd_it secondary" style="margin-right:5px;" title="';
 
            $('.msg-toolbar .buttons').prepend(
                qd_but + 'Xúc phạm">X</button>'+
                qd_but + 'Spam">S</button>'
            );
 
            $('.qd_it').click(function() {
                var ID = $(this).parents('li').attr('data-id'),
                    reas = $(this).attr('title');
 
                qd_functions.del(ID, reas);
            });
        }
    };
 
    $(qd_functions.init);
})(this.jQuery, this.mediaWiki);