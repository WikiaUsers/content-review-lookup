(function()
{
	if (document.readyState == "loading")
		document.addEventListener("readystatechange", newCommentIndicator);
	else
		newCommentIndicator();

	importArticle({
		type: 'style',
		article: 'u:dev:MediaWiki:NewCommentIndicator.css'
	});

	function newCommentIndicator()
	{
		// Script was already loaded in this window
		if (window.dev && window.dev.newCommentIndicator && window.dev.newCommentIndicator.loaded == true)
		{
			console.error("NewCommentIndicator - Not running script more than once on page!");
			return;
		}

		// Get configuration
		window.dev = window.dev || {};
		window.dev.newCommentIndicator = { loaded: true };
		window.dev.newCommentIndicator.config = Object.assign({
			newThreshold: 60 * 60 * 24 * 1 // 1 day in seconds
		}, window.newCommentIndicator);
		delete window.newCommentIndicator;

		var commentObserver;
		var commentSelectors =
		[
			{ root: "#MessageWall", comment: ".Message, .Reply" },
			{ root: "#articleComments", comment: ".Comment_comment__50MD-, .Reply_reply__HFNXA" }
		];

		mw.hook("wikipage.content").add(function()
		{
			// Find the first comments root that exists on the page
			for (var i = 0; i < commentSelectors.length; i++)
			{
				var root = document.querySelector(commentSelectors[i].root);
				if (root)
				{
					initCommentObserver(root, commentSelectors[i].comment);
					break;
				}
			}
		});

		function initCommentObserver(root, commentSelector)
		{
			if (commentObserver || !root) return;

			function processComments(elem)
			{
				var comments = elem.querySelectorAll(commentSelector);
				comments.forEach(onCommentAdded);
			}

			// Process any existing comments under root
			processComments(root);

			// Add a MutationObserver which will catch comments added in the future
			commentObserver = new MutationObserver(function(records, observer)
			{
				for (var i = 0; i < records.length; i++)
				{
					if (records[i].addedNodes.length == 0)
						continue;
			
					records[i].addedNodes.forEach(processComments);
				}
			});
			
			commentObserver.observe(root,
			{
				childList: true,
				subtree: true
			});
		}

		function onCommentAdded(comment)
		{
			// Ignore comments that already have an indicator
			if (comment.querySelector(".new-comment-indicator"))
				return;
			
			// Get HTML5 <time> element from comment
			var timeElem = comment.querySelector("time");
			var commentDate = new Date(timeElem.dateTime);

			var diffMs = Math.abs(commentDate.getTime() - Date.now());
			var diffSec = Math.ceil(diffMs / 1000);
			
			if (diffSec <= window.dev.newCommentIndicator.config.newThreshold)
			{
				var headerDetails = timeElem.closest(".EntityHeader_header-details__-lQuR");
				var indicator = document.createElement("span");
				indicator.className = "new-comment-indicator";
				headerDetails.append(indicator);
			}
		}
	}

})();