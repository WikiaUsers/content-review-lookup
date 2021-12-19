/* 
This script is a simplified version of [[MediaWiki:Common.js]] intended to be imported
through [[Special:MyPage/fandommobile.js]]
*/

/* jshint
	esversion: 5, forin: true,
	immed: true, indent: 4,
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/

/* global mw, BannerNotification */

function copyToClipboard(text) {
	window.navigator.clipboard.writeText(text);
	if (BannerNotification)
		new BannerNotification($("<div>", {
			html: "<div>Copied to clipboard</div>",
		}).prop("outerHTML"), "confirm", null, 2000).show();
}

mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.Uri"]).then(function () {

	//##############################################################
	/* ==Small scripts== (W00)*/

	// Small script to change wall text
	$("a[title=\"Message Wall\"]").html("wall");
	$("a.external, a[rel^=\"noreferrer\"]").removeAttr("target");

	// Add custom "focusable" class
	$(".focusable").attr("tabindex", 0);

	/* Script to make page-specific styling (see [[Project:Page Styles]]) */
	$("#mw-content-text > .mw-parser-output").find(".pageStyles").each(function () {
		var $this = $(this);
		var css = $this.text();
		var id = $this.attr("id");

		/* For security purposes, DO NOT REMOVE! */
		function validateCSS(css) {
			return css
				.replaceAll(/([\t ]*)[a-z0-9\-]+\s*:.*url\(["']?(.*?)["']?\)[^;}]*;?[\t ]*/gi, "$1/* url() is not allowed */") // url()
				.replaceAll(/([\t ]*)[a-z0-9\-]+\s*:.*expression\(["']?(.*?)["']?\)[^;}]*;?[\t ]*/gi, "$1/* expression() is not allowed */") // expression()
				.replaceAll(/([\t ]*)@import.*/gi, "$1/* @import is not allowed */") // @import
				.replaceAll(/([\t ]*)[a-z0-9\-]+\s*:[ \t]*["']?javascript:([^;\n]*)?;?[\t ]*/gi, '$1/* javascript: is not allowed */') // javascript:
				.replaceAll(/^([\t ]*)@font-face\s*{[^\0]*?}/gi, "$1/* @font-face is not allowed */"); // @font-face
		}

		$("<style>", {
			text: validateCSS(css),
			type: "text/css",
			class: $this.attr("class") && $this.attr("class").replaceAll(/^pageStyles\s*|pageStyles\s*$/g, ""),
			id: id,
		}).appendTo("head");
	});

	// Add comment guidelines notice (wiki/fandom staff/users with > 100 edits exempt)
	if (!/bureaucrat|content-moderator|threadmoderator|rollback|sysop|util|staff|helper|global-discussions-moderator|wiki-manager|soap/.test(mw.config.get("wgUserGroups").join("\n")) && mw.config.get("wgEditCount") < 100) {
		var api = new mw.Api();
		api.get({
				action: "parse",
				text: "{{MediaWiki:Custom-comment-guidelines-notice}}",
				contentmodel: "wikitext"
			})
			.done(function (data) {
				if (!data.error) {
					$("#articleComments").before($(data.parse.text["*"]));
				}
			});
	}

	// Script to make linking comments easier
	if (mw.config.get("wgPageName").startsWith(new mw.Title("Comment", -1))) {
		var split = mw.config.get("wgPageName").split("/").slice(1);
		if (!split.length) return;
		window.location.replace(new mw.Uri(mw.util.getUrl(split[0]) + "?" + $.param({
			commentId: split[1],
			replyId: split[2]
		})));
	}

	$(document.body).on("click", "ul[class^=\"ActionDropdown_list__\"] > li:first-of-type, [class^=\"Comment_wrapper__\"]", function (e) {
		if (e.ctrlKey) {
			if ($("[class^=\"EditorForm_editor-form\"]").length) return;

			var el = $(e.target).parents("[class^=\"Comment_wrapper__\"]");
			var replyId = el.attr("data-reply-id");

			window.navigator.clipboard.writeText("[[Special:Comment/" + mw.config.get("wgPageName") + "/" + el.attr("data-thread-id") + (replyId ? "/" + replyId : "") + "|comment]]");
		}
	});

	// Small script to change wiki activity/article comments links, and display comment/reply IDs
	var userGroups = mw.config.get("wgUserGroups");
	var canBlock = /sysop|util|staff|helper|global-discussions-moderator|wiki-manager|content-team-member|soap|bureaucrat/.test(userGroups.join("\n"));

	function changeActivityLinks() {
		$(".recent-wiki-activity__details a:contains('A Fandom user')").each(function () {
			var user = decodeURIComponent($(this).attr("href")).replace(
				new RegExp(mw.util.getUrl("") + mw.config.get("wgFormattedNamespaces")[2] + ":|" + new mw.Title("Contributions", -1).getUrl() + "/"), ""
			);

			// Don't reveal IP's if the user is not an admin/bureaucrat/global groups
			if (!canBlock && mw.util.isIPAddress(user, true)) return;

			$(this).text(user);
		});
	}

	if ($(".right-rail-wrapper").length) {
		var activityInter = setInterval(function () {
			if ($("#wikia-recent-activity").length) {
				clearInterval(activityInter);
				changeActivityLinks();
			}
		}, 200);
	}

	function changeCommentLinks() {
		$("span[class^=\"EntityHeader_header-details\"] > div[class^=\"wds-avatar EntityHeader_avatar\"] > a").each(function () {
			var user = decodeURIComponent($(this).attr("href")).replace(
					new RegExp(mw.util.getUrl("") + mw.config.get("wgFormattedNamespaces")[2] + ":|" + new mw.Title("Contributions", -1).getUrl() + "/"), ""
				),
				$link = $(this).parent().parent().children("a:last-of-type:not(.mw-user-anon-link)"),
				$this = $(this);

			// Don't reveal IP's if the user is not an admin/bureaucrat/global groups
			if (!canBlock && mw.util.isIPAddress(user, true)) return;

			$link
				.attr("href", new mw.Title("Contributions/" + user, -1).getUrl())
				.html(user);

			$this.attr("href", new mw.Title("Contributions/" + user, -1).getUrl());

			$link.after(
				"&nbsp;(",
				$("<a>", {
					href: new mw.Title(user, 1200).getUrl(),
					html: "wall",
					title: "Message_wall:" + user,
					class: "mw-user-anon-link",
				}),
				canBlock ? "&nbsp;<b>&bull;</b>&nbsp;" : "",
				canBlock ? $("<a>", {
					href: new mw.Title("Block/" + user, -1).getUrl(),
					html: "block",
					title: "Special:Block/" + user,
					class: "mw-user-anon-link",
				}) : "",
				")"
			);
		});
	}

	function addCommentId() {
		$("[class^=\"Comment_comment\"], [class^=\"Reply_reply\"]").each(function () {
			if ($(this).append) { // if $(this) is a jquery element
				var threadIsComment = $(this).is("[class^=\"Comment_comment\"]");
				var threadClassName = (threadIsComment ? "comment" : "reply") + "-id-display";
				switch ($(this).find("." + threadClassName).length) {
					case 0:
						var replyID = $(this).attr("data-reply-id");
						var commentID = $(this).parent().attr("data-thread-id") || $(this).parent().parent().parent().attr("data-thread-id");
						var threadLink = "commentId=" + commentID + (replyID ? "&replyId=" + replyID : "");
						$(this).append(
							$("<div>", {
								"class": threadClassName,
								"data-link": threadLink,
								html: $("<abbr>", {
									title: "click to copy",
									text: (threadIsComment ? "Comment" : "Reply") + " ID : " + (replyID || commentID),
								}),
							})
						);
						break;
					case 1:
						break; // do nothing
					default:
						$(this).find("." + threadClassName).each(function (i, elem) {
							if (i) /* not zero (i.e. not first element) */ elem.remove();
						});
				}
			}
		});
	}

	function mainCommentHandler() {
		changeCommentLinks();
		addCommentId();
	}

	if ($("#articleComments, #MessageWall").length) {
		var WikiCommentObserver = new MutationObserver(function (mutationsList) {
			var operate = false;
			for (var i in mutationsList) {
				if (true) { // stops fandom from complaining
					var mutation = mutationsList[i];
					if ($(mutation.target).is("[class^=\"CommentList_comment-list\"], [class^=\"ReplyList_container\"], [class^=\"ReplyList_list-wrapper\"]")) {
						operate = true;
						break;
					}
				}
			}
			if (operate) mainCommentHandler();

			var inter = setInterval(function () {
				if ($("[class*=\"Comment_wrapper\"], [class *=\"Message__wrapper\"]").length) {
					clearInterval(inter);
					mainCommentHandler();
				}
			}, 200);
		});

		WikiCommentObserver.observe($("#articleComments, #MessageWall").get(0), {
			childList: true,
			subtree: true,
		});

		$("#articleComments").on("click", ".comment-id-display, .reply-id-display", function () {
			copyToClipboard(mw.config.get("wgServer") + mw.util.getUrl(mw.config.get("wgPageName")) + "?" + ($(this).attr("data-link") || ""));
		});
	}

	var clickCopyCooldown = false;
	// small script to allow copying of text inside class "article-click-copy"
	$(".mw-parser-output").on("click", ".article-click-copy", function () {
		if (!clickCopyCooldown) {
			copyToClipboard($(this).text().trim());
			clickCopyCooldown = true;
			var clickCopyCooldownInterval = setInterval(function () {
				clickCopyCooldown = false;
				clearInterval(clickCopyCooldownInterval);
			}, 30);
		}
	});

	/* Moves ID from {{Text anchor}} onto a parent tr tag (if it exists), allowing the whole row to be styliszed in CSS (using the :target seloector) */
	$((function () {
		function _goToID(id) {
			$("html, body").animate({
				scrollTop: $("#" + id).offset().top - 65
			}, 500);
		}
		// If the element passed is inside of a tabber, the tabber will open to the tab it belongs in
		function _openTabberTabBelongingToChild(element) {
			if (!element) {
				return;
			}
			var closestTabber = element.closest(".wds-tabber");
			var closestTabberContent = element.closest(".wds-tab__content");

			// If table row is in a tabber
			if (closestTabber && closestTabberContent && closestTabberContent.parentNode) {
				// Get a list of tab sections and find out the index of ours in that list
				var indexOfTab = Array.from(closestTabberContent.parentNode.querySelectorAll(":scope > .wds-tab__content")).indexOf(closestTabberContent);

				// Using the index from above, change all tab states to point to the tab containing the element passed in to this function
				closestTabber.querySelectorAll(":scope > .wds-tab__content").forEach(function (elem, i) {
					elem.classList.toggle("wds-is-current", indexOfTab === i);
				});
				closestTabber.querySelectorAll(":scope > .wds-tabs__wrapper .wds-tabs__tab").forEach(function (elem, i) {
					elem.classList.toggle("wds-is-current", indexOfTab === i);
				});
			}
		}
		// Let's you re-add `:target` css without messing anything else up
		// https://stackoverflow.com/a/59013961/1411473
		function _pushHashAndFixTargetSelector(hash) {
			history.pushState({}, document.title, hash); //called as you would normally
			var onpopstate = window.onpopstate; //store the old event handler to restore it later
			window.onpopstate = function () { //this will be called when we call history.back()
				window.onpopstate = onpopstate; //restore the original handler
				history.forward(); //go forward again to update the CSS
			};
			history.back(); //go back to trigger the above function
		}
		$("tr .text-anchor").each(function () {
			var $textAnchor = $(this);
			var id = $(this).attr("id");
			$(this).removeAttr("id");
			$(this).closest("tr").attr("id", id);

			// Re-trigger hash tag
			if (location.hash.replace("#", "") === id) {
				// Show table if collapsed:
				var inCollapseTable = $(this).parents(".mw-collapsed");
				setTimeout(function () {
					if (inCollapseTable.length) {
						var parentTable = $(inCollapseTable[0]);
						parentTable.removeClass("mw-collapsed");
						parentTable.find("tr").stop().show();

						/*if(parentTable.hasClass("mw-made-collapsible")) {
							var collapseID = parentTable.attr("id").replace("mw-customcollapsible-", "");
							$(".mw-customtoggle-"+collapseID).click();
						} else {
							parentTable.removeClass("mw-collapsed");
						}*/
					}
					_pushHashAndFixTargetSelector(location.hash);
					_openTabberTabBelongingToChild($textAnchor[0]);
					_goToID(id);
				}, 1000);
			}
		});

		$(window).on("hashchange", function () {
			var hash = location.hash.replace("#", "");
			$("tr[id]").each(function () {
				var $row = $(this);
				var id = $row.attr("id");
				if (id === hash) {
					var inCollapseTable = $row.parents(".mw-collapsed");
					if (inCollapseTable.length) {
						var $parentTable = $(inCollapseTable[0]);
						var collapseID = $parentTable.attr("id").replace("mw-customcollapsible-", "");
						$(".mw-customtoggle-" + collapseID).click();
					}
					_openTabberTabBelongingToChild($row[0]);
					_goToID(id);
				}
			});
		});
	})());

	// Script to respond to ANI reports
	if (
		mw.config.get("wgUserGroups").find(function (v) {
			return ["bureaucrat", "sysop"].includes(v);
		}) &&
		mw.config.get("wgPageName").includes("Administrator's_Noticeboard") &&
		mw.config.get("wgNamespaceNumber") === 4
	)
		$(".mw-editsection").append(" | ", $("<a>", {
			class: "mw-complete-report",
			text: "mark as complete",
			title: "Mark this report as compelete",
			css: {
				cursor: "pointer",
			},
			click: function () {
				var user = $(this).parent().parent().next().find("li:first-of-type").children("a:first-of-type").text();
				var message = prompt("Enter a message to respond with:");

				if (message === null) return;

				new mw.Api().postWithEditToken({
					action: "edit",
					appendtext: "\n:\{\{AIV|done\}\} " + message + " \{\{Subst:sig\}\}",
					title: mw.config.get("wgPageName"),
					summary: "Marking report of [[Special:Contributions/" + user + "|" + user + "]] as completed",
					section: new mw.Uri($(this).parent().find("a[href*=\"&section=\"]").attr("href")).query.section,
				}).then(console.log, console.warn);
			},
		}));

	// Code to allow making {{Slot}} clickable to show different content
	$(function () {
		if (!$(".sbw-ui-tabber").length) {
			return;
		}

		function clickTab(id) {
			id = "ui-" + id;
			if (!$("#" + id).length) {
				console.warn("No such tab ID \"" + id + "\"");
				return;
			}
			$(".sbw-ui-tab-content#" + id).siblings().addClass("hidden").hide();
			$(".sbw-ui-tab-content#" + id).removeClass("hidden").show();
			// Since images don't load on hidden tabs, force them to load
			$(".sbw-ui-tab-content#" + id + " .lzy[onload]").load();
		}

		// .hidden works on mobile, but not on desktop
		$(".sbw-ui-tab-content.hidden").hide();

		$(".sbw-ui-tabber .invslot").each(function () {
			var classes = Array.from($(this)[0].classList).filter(function (c) {
				return c.indexOf("goto-") === 0 || c.indexOf("ui-") === 0;
			});

			if (classes.length) {
				var className = classes[(classes.length) - 1]
					.replace("goto-", "")
					.replace("ui-", "");

				$(this).click(function () {
					clickTab(className);
				});
			}
		});

		$(".sbw-ui-tabber .sbw-ui-tab").click(function (e) {
			e.preventDefault();
			e.stopImmediatePropagation();

			var id = $(this).data("tab");
			if (id) {
				clickTab(id);
			}
		});

		// makes an extra button to go back to the first UI tab
		$(".sbw-ui-tabber").each(function () {
			var elementId = $(this).find(":first-child").attr("id");

			if (!elementId) return;

			var className = elementId.replace("ui-", "");

			$(this).find(".mcui").append(
				$("<div>").addClass("mcui-returnbutton text-zoom-independent noselect")
				.attr("data-font-size", "22").text("↻")
				.click(function () {
					clickTab(className);
				})
			);
		});
	});

	if (mw.config.get("wgPageName").match(/^S:(.+)$/i)) {
		window.location.replace(mw.util.getUrl("Special:" + mw.config.get("wgPageName").match(/^S:(.+)$/i)[1]));
	}

	//##############################################################
	/* ==Element animator== (B00)*/
	// Taken from https://minecraft.gamepedia.com/MediaWiki:Gadget-site.js
	/**
	 * Element animator
	 *
	 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
	 * Add the "animated" class to the frame containing the elements to animate.
	 * Optionally, add the "animated-active" class to the frame to display first.
	 * Optionally, add the "animated-subframe" class to a frame, and the
	 * "animated-active" class to a subframe within, in order to designate a set of
	 * subframes which will only be cycled every time the parent frame is displayed.
	 * Animations with the "animated-paused" class will be skipped each interval.
	 *
	 * Requires some styling in wiki's CSS.
	 */

	$(function () {
		(function () {
			var $content = $("#mw-content-text");
			var advanceFrame = function (parentElem, parentSelector) {
				var curFrame = parentElem.querySelector(parentSelector + " > .animated-active");
				$(curFrame).removeClass("animated-active");
				var $nextFrame = $(curFrame && curFrame.nextElementSibling || parentElem.firstElementChild);
				return $nextFrame.addClass("animated-active");
			};

			// Set the name of the hidden property
			var hidden;
			if (typeof document.hidden !== "undefined") {
				hidden = "hidden";
			} else if (typeof document.msHidden !== "undefined") {
				hidden = "msHidden";
			} else if (typeof document.webkitHidden !== "undefined") {
				hidden = "webkitHidden";
			}

			setInterval(function () {
				if (hidden && document[hidden]) {
					return;
				}
				$content.find(".animated").each(function () {
					if ($(this).hasClass("animated-paused")) {
						return;
					}

					var $nextFrame = advanceFrame(this, ".animated");
					if ($nextFrame.hasClass("animated-subframe")) {
						advanceFrame($nextFrame[0], ".animated-subframe");
					}

					var hov = $(".invslot-item").filter(function() { return $(this).is(":hover"); });
					if (hov.length)
						hov.eq(0).trigger("mouseenter");
				});
			}, 2000);
		}());

		/**
		 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
		 *
		 * This is so people have a chance to look at the image and click on pages they want to view.
		 */
		$("#mw-content-text").on("mouseenter mouseleave", ".animated-container, .mcui", function (e) {
			$(this).find(".animated").toggleClass("animated-paused", e.type === "mouseenter");
		});

		// A work around to force wikia's lazy loading to fire
		setTimeout(function () {
			$(".animated .lzy[onload]").load();
		}, 1000);
	});

	//##############################################################
	/* ==importArticles== (Y00)*/
	// Imports scripts from other pages/wikis.
	// NOTE: importAricles() is currently broken.

	// window.importScripts = function (pages) {
	// 	if (!Array.isArray(pages)) {
	// 		pages = [pages];
	// 	}

	// 	pages.forEach(function (v) {
	// 		var wiki;
	// 		var match = v.match(/^(?:u|url):(.+?):(.+)$/);
	// 		(match || []).shift();

	// 		wiki = wiki || mw.config.get("wgServer").replace("https://", "").replace(".fandom.com", "");
	// 		match = match || v;

	// 		$.ajax({
	// 			url: "https://" + (Array.isArray(match) ? match[0] : wiki) + ".fandom.com" + mw.util.getUrl(Array.isArray(match) ? match[1] : match) + "?action=raw&ctype=text/javascript",
	// 			dataType: "script",
	// 			cache: true,
	// 		}).then(function () {
	// 			console.log(v + ": Imported Successfuly!");
	// 		});
	// 	});
	// };

	// importScripts([
	// 	"MediaWiki:Common.js/minetip.js",
	// 	"MediaWiki:Common.js/skydate.js",
	// 	"MediaWiki:Common.js/calc.js",
	// 	"MediaWiki:Common.js/staff-tagger.js",
	// 	"MediaWiki:HighlightTable.js",
	// ]);
});

//##############################################################
/* ==importArticle pre-script actions== (X00)*/
// The code in this section is for a script imported below

// AjaxRC
window.ajaxRefresh = 30000;
window.ajaxPages = [
	"Special:RecentChanges",
	"Special:WikiActivity",
	"Special:Watchlist",
	"Special:Log",
	"Special:Contributions",
	"Special:AbuseLog",
];
$.extend(true, window, {
	dev: {
		i18n: {
			overrides: {
				AjaxRC: {
					"ajaxrc-refresh-text": "Auto Refresh",
					"ajaxrc-refresh-hover": "Enable automatically refreshing of this page",
				}
			}
		}
	}
});

//###########################################
/* ===Less=== (X01) */
var mwns = mw.config.get("wgFormattedNamespaces")[8] + ":"; // localized mw namespace

window.lessOpts = window.lessOpts || [];
window.lessOpts.push({
	// this is the page that has the compiled CSS
	target: mwns + "Common.css",
	// this is the page that lists the LESS files to compile
	source: mwns + "Custom-common.less",
	// these are the pages that you want to be able to update the target page from
	// note, you should not have more than one update button per page
	load: ["Common.css", "Custom-common.less", /* test */ "Custom-common.less/minion.less"].map(function (s) {
		return mwns + s;
	}),
	// target page header
	header: mwns + "Custom-css-header/common",
});

window.lessConfig = window.lessConfig || [];
window.lessConfig = {
	// reloads the page after the target page has successfully been updated
	reload: true,
	// wraps the parsed CSS in pre tags to prevent any unwanted links to templates, pages or files
	wrap: true,
	// allowed groups
	allowed: ["codeeditor"],
};