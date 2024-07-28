(function()
{
    // Script was already loaded in this window
    if (window.dev && window.dev.newCommentIndicator && window.dev.newCommentIndicator.loaded == true)
    {
        console.error("NewCommentIndicator - Not running script more than once on page!");
        return;
    }

    function init()
    {
        window.dev = window.dev || {};
        window.dev.newCommentIndicator =
        {
            loaded: true,
            NewCommentIndicator: NewCommentIndicator
        };
        
        // Get configuration, combining it with the defaults
        window.dev.newCommentIndicator.config = Object.assign(
        {
            newThreshold: 60 * 60 * 24 * 1, // 1 day in seconds
            hideViewed: false
        }
        , window.newCommentIndicator);

        delete window.newCommentIndicator;

        mw.hook("wikipage.content").add(findCommentRoot);
    }

    function findCommentRoot()
    {
        // Don't process multiple
        if (window.dev.newCommentIndicator.instance != null) return;
        
        var commentSelectors =
        [
            { root: "#MessageWall", comment: ".Message, .Reply" },
            { root: "#articleComments", comment: ".Comment_comment__50MD-, .Reply_reply__HFNXA" }
        ];

        // Find the first comments root that exists on the page
        for (var i = 0; i < commentSelectors.length; i++)
        {
            var root = document.querySelector(commentSelectors[i].root);
            if (root)
            {
                var nci = new NewCommentIndicator(root, commentSelectors[i].comment);
                window.dev.newCommentIndicator.instance = nci;

                // Remove the wikipage.content hook, there will only ever be one comments app per page
                mw.hook("wikipage.content").remove(findCommentRoot)
                break;
            }
        }
    }

    function NewCommentIndicator(root, commentSelector)
    {
        this.root = root;
        this.commentSelector = commentSelector;

        // Get a reference to the config
        this.config = window.dev.newCommentIndicator.config;

        // This holds data for every comment
        this.comments = [];

        // Fetch the "read" states from localStorage
        this.commentsRead = this.importCommentsRead();

        // Write the read states back to localStorage when the window closes
        window.addEventListener("beforeunload", function()
        {
            localStorage.setItem(this.STATES_KEY, JSON.stringify(this.commentsRead));
        
        }.bind(this));

        // Import CSS if it hasn't already been
        this.importStyles();

        // Add a MutationObserver which will catch comments added in the future
        this.commentObserver = new MutationObserver(function(records, observer)
        {
            for (var i = 0; i < records.length; i++)
            {
                if (records[i].addedNodes.length == 0)
                    continue;

                for (var j = 0; j < records[i].addedNodes.length; j++)
                    this.initComments(records[i].addedNodes[j]);
            }

        }.bind(this));
        
        this.commentObserver.observe(root, { childList: true, subtree: true });
        
        // Add an IntersectionObserver which will fire a callback when observed objects become visible in the viewport
        this.intersectionObserver = new IntersectionObserver(function(entries, observer)
        {
            for (var i = 0; i < entries.length; i++)
            {
                if (entries[i].isIntersecting)
                {
                    var comment = entries[i].target;

                    if (!this.commentsRead[comment.dataset.threadId])
                        this.commentsRead[comment.dataset.threadId] = {};

                    // Mark the comment as read
                    this.commentsRead[comment.dataset.threadId][comment.dataset.replyId] = parseInt(comment.dataset.time);

                    // Remove this comment from the IntersectionObserver
                    observer.unobserve(comment);
                }
            }

        }.bind(this), { threshold: 1.0 });

        // Process any existing comments under root
        this.initComments(root);
    }

    NewCommentIndicator.prototype = 
    {
        importStyles: function()
        {
            // Check to see whether the styles have already been added (from being added as an @import,
            // importArticles goes through ResourceLoader, which keeps track of duplicate loads, but
            // @import does no such thing).
    
            // We don't want to bother iterating over the thousands of styles in the document
            // So just create a test element, add it to the document, and check to see whether
            // its computed styles contain our "loaded" flag
            var test = document.createElement("span");
            test.className = "new-comment-indicator";
            document.documentElement.append(test);
            
            if (window.getComputedStyle(test).getPropertyValue("--new-comment-indicator-loaded") == "")
                importArticles({ articles: "u:dev:MediaWiki:NewCommentIndicator.css" });
    
            test.remove();
        },

        STATES_KEY: "mw_NewCommentIndicator_states",

        importCommentsRead: function()
        {
            var utcNowSeconds = Math.ceil(Date.now() / 1000);
            var commentsRead = JSON.parse(localStorage.getItem(this.STATES_KEY)) || {};
    
            for (var threadId in commentsRead)
            {
                if (!commentsRead.hasOwnProperty(threadId)) continue;
    
                // Iterate over comments in thread (the base comment has an id of 0)
                for (var commentId in commentsRead[threadId])
                {
                    if (!commentsRead[threadId].hasOwnProperty(commentId)) continue;
    
                    if (typeof commentsRead[threadId][commentId] != "number")
                        delete commentsRead[threadId][commentId];
    
                    if (Math.abs(utcNowSeconds - commentsRead[threadId][commentId]) > this.config.newThreshold)
                        delete commentsRead[threadId][commentId];
                }
            }

            return commentsRead;
        },

        // This function is called by the MutationObserver callback, and contains a newly-added comment element
        initComment: function(comment)
        {
            // Ignore comments that we've already parsed (they'll have a data-time attribute)
            if (comment.dataset.time) return;
            
            // Get HTML5 <time> element from comment.
            var timeElem = comment.querySelector("time");
            var commentDate = new Date(timeElem.getAttribute("datetime"));

            var time = Math.ceil(commentDate.getTime() / 1000);
            var diffMs = Math.abs(commentDate.getTime() - Date.now());
            var diffSec = Math.ceil(diffMs / 1000);

            // Get the thread ID (comment ID) and reply ID for this comment
            var threadIdElem = comment.closest("[data-thread-id]");
            var replyIdElem = comment.closest("[data-reply-id]");

            var threadId = (!threadIdElem || isNaN(threadIdElem.dataset.threadId)) ? 0 : parseInt(threadIdElem.dataset.threadId);
            var replyId = (!replyIdElem || isNaN(replyIdElem.dataset.replyId)) ? 0 : parseInt(replyIdElem.dataset.replyId);

            comment.dataset.threadId = threadId;
            comment.dataset.replyId = replyId;
            comment.dataset.time = time;
            
            if (diffSec <= this.config.newThreshold)
            {
                var headerDetails = timeElem.closest(".EntityHeader_header-details__-lQuR");
                var indicator = document.createElement("span");
                indicator.className = "new-comment-indicator";

                // When hiding already-viewed indicators, check if we've read this comment before
                if (this.config.hideViewed)
                {
                    // The comment has been read if an entry for it exists in commentsRead
                    if (this.commentsRead[threadId] && this.commentsRead[threadId][replyId])
                        indicator.classList.add("new-comment-indicator-read");
                    else
                        this.intersectionObserver.observe(comment);
                }

                headerDetails.append(indicator);
            }

            var data = 
            {
                elem: comment,
                timeElem: timeElem,
                threadId: threadId,
                replyId: replyId,
                time: time,
                indicator: indicator
            };

            this.comments[threadId] = this.comments[threadId] || {};
            this.comments[threadId][replyId] = data;
        },

        // This function is called directly by the IntersectionObserver
        initComments: function(parent)
        {
            if (parent.matches(this.commentSelector))
                this.initComment(parent);

            var children = parent.querySelectorAll(this.commentSelector);

            for (var i = 0; i < children.length; i++)
                this.initComment(children[i]);
        }
    }
    
    // Find the ResourceLoader module with the Timeago export (we can't rely on the module name since it changes)
    var timeagoModule = Object.entries(mw.loader.moduleRegistry).find(function(obj)
    {
        if (obj[0].startsWith("index-"))
        {
            var m = obj[1];
            return m.module && m.module.exports && m.module.exports.Timeago;
        }
    });

    if (timeagoModule == null)
    {
        console.error("NewCommentIndicator failed to find Timeago module!");
        return;
    }
    else
        timeagoModule = timeagoModule[0];

    // This overrides Timeago to use a correctly-formatted ISO string.
    // Fandom is using Date.toLocaleString, which isn't a valid value for datetime,
    // so if we try to use the <time>.dateTime interface, it's likely to be incorrect
    // Remove all this when it gets fixed!
    mw.loader.using(timeagoModule).then(function(require)
    {
        var exports = require(timeagoModule)
        
        var Timeago = exports.Timeago;
        var TimeagoNew = function(e)
        {
            var iso = new Date(e.datetime).toISOString();
            var elem = Timeago.apply(this, arguments);
            elem.props.dateTime = iso;
            return elem;
        };

        exports.Timeago = TimeagoNew;

        // If articleComments already exists, we're too late, re-call the module
        // to regenerate the comments with the new time strings (it's fairly fast
        // since they're all cached already)
        if (document.querySelector(".article-comments-app"))
        {
            console.log("Article comments loaded too early, resetting...");
            return mw.loader.using('ext.fandom.ArticleComments.js');
        }
    })
    .then(function(require)
    {
        if (document.readyState == "loading")
            document.addEventListener("readystatechange", init);
        else
            init();
    });

})();