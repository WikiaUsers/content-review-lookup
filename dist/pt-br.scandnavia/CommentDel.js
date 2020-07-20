/* globals $: true, mw: true, ArticleComments: true, BannerNotification: true */
/**
 * Name:            AjaxCommentDelete
 * Version:         v1.2
 * Author(s):       KockaAdmiralac <1405223@gmail.com>
 *                  Ozank Cx (formerly Ozuzanna) (for API calls)
 *                  Cqm (for cross-wiki i18n loading)
 * Description:     Allows deleting comments without leaving the page.
 */
$(function()
{
    // If current page doesn't have comments at all, return.
    if (!mw.config.get('wgIsArticle')) return;
 
    /**
     * Loading of i18n data, cross-wiki
     * @author Cqm
     * @author KockaAdmiralac
     */
    $.get("/load.php", { mode: "articles", articles: "MediaWiki:CommentDelJson.js", only: "styles" }, function(d)
    {
        var i18n = JSON.parse(d.replace(/\/\*.*\*\//g, "")),
        AjaxCommentDeleteApiInterval = setInterval(function()
        {
            if(typeof mw !== 'undefined' && typeof mw.Api !== 'undefined')
            {
                clearInterval(AjaxCommentDeleteApiInterval);
                var lang = mw.config.get('wgUserLanguage'),
                    langConfig = i18n[i18n[lang] ? lang : "en"];
                if(typeof langConfig === 'string') langConfig = i18n[langConfig];
                doStuff(langConfig);
            }
        }, 100);
    });
 
    /**
     * Main function
     * @param [Object] i18n - Internationalization data
     */
    function doStuff(i18n)
    {
        /**
         * Main object
         */
        var AjaxCommentDelete = {
            api: new mw.Api(),
            alias: ArticleComments.init,
            config: window.AjaxCommentDeleteConfig || {},
            i18n: $.extend(i18n, window.AjaxCommentDeleteVocab),
            /**
             * Method for initializing plugin hooks
             */
            init: function()
            {
                /**
                 * Function called while initializing comments
                 */
                ArticleComments.init = $.proxy(function()
                {
                    this.alias.call(ArticleComments);
                    this.main();
                }, this);
 
                /**
                 * Function called when comment page has changed
                 * Had to be rewritten so a call to the main function could be inserted
                 * WARNING: This may cause compatibility issues with Wikia code!
                 */
                ArticleComments.setPage = $.proxy(function (e)
                {
                    // Regular Wikia code
                    ArticleComments.bucky.timer.start('setPage');
                    var page = parseInt($(this).attr('page'));
                    e.preventDefault();
                    ArticleComments.$commentsList.addClass('loading');
                    $.getJSON(mw.config.get('wgScript') + '?action=ajax&rs=ArticleCommentsAjax&method=axGetComments',
                    {
                        article: mw.config.get('wgArticleId'),
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
                        this.main();
 
                        // Regular Wikia code
                        ArticleComments.bucky.timer.stop('setPage');
                    });
                }, this);
            },
            /**
             * Main process
             * Here are contained things that will be executed once user changes the page/loads comments.
             */
            main: function()
            {
                $('span.tools').append('<a class="AjaxCommentDeleteLink">' + this.i18n.linkText + '</a>');
                $(".AjaxCommentDeleteLink").click($.proxy(function(e)
                {
                    var id = $(e.currentTarget).closest(".comment")[0].id.substring(5);
                    if(this.config.fastDelete) this.deleteComment(id, this.config.fastDelete);
                    else this.showModal(id);
                }, this));
            },
            /**
             * For showing the deletion reason modal
             */
            showModal: function(id)
            {
                $.showCustomModal(this.i18n.modalTitle, "<div class='AjaxCommentDeleteModalMain'><span class='AjaxCommentDeleteHelpText'>" + this.i18n.selectReason + "<br/></span><input type='text' id='AjaxCommentDeleteReason'></input></div>",
                {
                    id: "AjaxCommentDeleteModal",
                    buttons: [{
                        id: "AjaxCommentDeleteRemoveButton",
                        defaultButton: true,
                        message: this.i18n.deleteText,
                        handler: $.proxy(function()
                        {
                            $("#AjaxCommentDeleteModal").closeModal();
                            this.deleteComment(id, $('#AjaxCommentDeleteReason').val());
                        }, this)
                    },
                    {
                        id: "AjaxCommentDeleteCloseButton",
                        defaultButton: true,
                        message: this.i18n.close,
                        handler: function(){ $("#AjaxCommentDeleteModal").closeModal(); }
                    }]
                });
            },
            /**
             * Function for deleting a comment.
             * @param [String] id - ID of the comment page to delete
             * @param [String] reason - Reason for the deletion
             * @author KockaAdmiralac
             * @author Ozank Cx
             */
            deleteComment: function(id, reason)
            {
                new mw.Api().post({
                    action: 'delete',
                    pageid: id,
                    reason: reason,
                    bot: true,
                    token: mw.user.tokens.get('editToken')
                }).done(function(d)
                {
                    if (d.error) new BannerNotification(this.i18n.fail + ": " + d.error.code, 'error').show();
                    else
                    {
                        // Hiding the deleted comment
                        var el = $("#comm-" + id), next = el.next();
                        el.slideToggle();
                        if(next.is('ul')) next.slideToggle();
                    }
                }).fail(function() { new BannerNotification(this.i18n.fail, 'error').show(); });
            }
        };
        $($.proxy(AjaxCommentDelete.init, AjaxCommentDelete));
    }
});