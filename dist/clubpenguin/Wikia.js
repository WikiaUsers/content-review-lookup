// remove links to base page(s) from a sub page for Oasis skin. See Template:Subpagelinkremove
if ($('#WikiaArticle span.base-page-links-remove').length) {
	$("header#WikiaPageHeader h2:last-child").remove();
	$("#WikiaArticle span.base-page-links-remove").remove();
}

// minor edits button help link (discluding wide mode)
$(document).ready(function() {
	if ($("body.editor #EditPage .module_content .checkboxes label.wpMinoredit").length > 0) { // check whether a an older revision exists
		$("body.editor #EditPage .module_content .checkboxes").append('<a id="minor-edit-help" href="/wiki/Help:Minor_edits" title="What is this?" target="_blank" style="font-size: 11px;">(help)</a>');
		$("body.editor #EditPage .module_content .checkboxes .wpMinoredit").css("display","inline-block");
	}
});

// remove image attributions from blogs that contains Category:News
if ($('#catlinks .mw-normal-catlinks a[href="/wiki/Category:News"]').length > 0) {
	$("figure.thumb .thumbcaption .picture-attribution").remove();
}

// Template:ButtonHover - function of the parameter value "|hidebottom= true"

$(".fadeout-container.fadeout-hide-bottom .fadeout").mouseover(function() {
	$(this).parent().find(".fadein").css("visibility","visible");
});
$(".fadeout-container.fadeout-hide-bottom .fadeout").mouseout(function() {
	$(this).parent().find(".fadein").css("visibility","hidden");
});

/* add [[Template:TalkMessage]] when creating a new edit section */

if ( mw.config.get("wgNamespaceNumber") == 3 && mw.config.get("wgPageName") != "User_talk:"+mw.config.get("wgUserName") ) {
	$('#WikiaMainContent nav.wikia-menu-button > a').attr("href",$('#WikiaMainContent nav.wikia-menu-button > a').attr("href")+"&preload=Template:TalkMessage");
} else {
	$('body.ns-talk #WikiaPageHeader nav.wikia-menu-button > a[data-id="addtopic"]').attr("href",$('nav.wikia-menu-button > a[data-id="addtopic"]').attr("href")+"&preload=Template:TalkMessage");
}


/* replace message wall links to talk page links in wiki activity feeds */

$(".activity-ns-2001 a.real-name").each(function() {
	$(this)
		.attr(
			"href",
			$(this).attr("href").replace("/Message_Wall:", "/User_talk:")
		);
});


/* wiki logo votes - add a quick "vote" template */
/* update via [[MediaWiki:Logo-vote-thread]] */

if (
	mw.config.get("wgNamespaceNumber") == 1201 && // this is a thread
	$(".SpeechBubble").first().children(".deleteorremove-infobox").length == 0 // thread is not closed
) {
	$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Logo-vote-thread&rvprop=content&cb=" + new Date().getTime(), function(data) {
		var a = data.query.pages;
		for (var pageid in a) {
			var b = a[pageid].revisions[0]["*"],
				currTitle = -1;
			try {
				currTitle = b.match(/\%(\d+)\%/)[1];
			} catch(err) {}
			if (mw.config.get("wgTitle") == currTitle) {
				// this is the current logo vote
				var mainContent = $(".speech-bubble-message .msg-body"),
					gallery = $(mainContent).find(
						$(mainContent).find("#gallery-container").length == 1 ?
						"#gallery-container > .wikia-gallery" :
						".wikia-gallery:first"
					),
					interface = $('<div id="vote-interface-wrapper"><h3>Please select a logo</h3><div id="vote-interface"></div></div>'),
					wordmark = $("#WikiHeader .wordmark img"),
					wordmarkDef = String($(wordmark).attr("src")),
					$vote = {},
					button = $('<a class="button" id="insert-logo-vote">Vote</a>');
				$(".MiniEditorWrapper .toolbar").last().append(button);
				$vote.onOpen = function() {
					$("#vote-interface-wrapper").show();
					$("body").scrollTop(0);
				}
				$vote.onVote = function() {
					$("#vote-interface-wrapper").hide();
					$("body").scrollTop(Infinity);
				}
				$vote.insertVote = function(n) {
					console.log("Vote: " + n);
					var c = $("textarea.new-message")[0];
					c.value += (c.value.length > 0 ? "\n" : "") + '{{WV|' + mw.config.get("wgUserName") + '|' + n + '}}';
				}
				$(button).click(function(e) {
					e.preventDefault();
					$vote.onOpen();
				});
				if (gallery && wordmark) {
					$(gallery).find(".wikia-gallery-item").each(function(i) {
						var caption = $(this).find(".lightbox-caption").html(),
							n = new Array(4 - String(i + 1).length).join("0") + (i + 1);
						$(interface).children("#vote-interface").append(
							'<div data-vote="' + n + '">\n' +
								'\t<img src="' + $(this).find("img").attr("data-src").replace(/\/scale\-to\-width\/\d+/, "/scale-to-width/250") + '" />\n' +
								'\t<span>' + n + '</span>\n' +
							'</div>'
						);
					});
					$("body").append(interface);
					$("#vote-interface > div").mouseover(function() {
						$(wordmark).attr("src", $(this).find("img").attr("src"));
						$(this).css({
							background: "rgba(255, 255, 0, 0.35)",
							color: "#c00"
						});
					}).mouseout(function() {
						$(wordmark).attr("src", wordmarkDef);
						$(this).css({
							background: "transparent",
							color: "#333"
						});
					}).click(function() {
						$vote.onVote();
						$vote.insertVote($(this).find("span").text());
					});

					/* make draggable */
					$("#vote-interface-wrapper").mousedown(function(e) {
						// console.info("mousedown");
						// console.log(e);
						var isPressedOnEdges = false;
						if ($(e.target).parents("#vote-interface-wrapper > #vote-interface").length == 0 && !$(e.target).is("#vote-interface")) {
							// not the logos list section
							isPressedOnEdges = true;
						}
						if (isPressedOnEdges) {
							$(this).addClass("vote-interface-draggable").data({
								drag: {
									x: e.offsetX,
									y: e.offsetY
								}
							});
						}
					}).mouseup(function() {
						$(this).removeClass("vote-interface-draggable");
					});
					$("body").mousemove(function(e) {
						// console.log(e);
						if ($("#vote-interface-wrapper").hasClass("vote-interface-draggable")) {
							var data = $("#vote-interface-wrapper").data();
							$("#vote-interface-wrapper").css({
								top: (e.clientY - data.drag.y) + "px",
								left: (e.clientX - data.drag.x) + "px"
							});
						}
					});

					/* css */
					mw.util.addCSS(
						'#vote-interface-wrapper {\n' +
							'\tdisplay: none;\n' +
							'\tpadding: 10px;\n' +
							'\tposition: fixed;\n' +
							'\ttop: 200px;\n' +
							'\tleft: 100px;\n' +
							'\tz-index: 1000;\n' +
							'\tbackground: #fff;\n' +
							'\tborder: 1px solid #ccc;\n' +
							'\tborder-radius: 10px;\n' +
							'\tbox-shadow: 2px 2px 10px 1px #000;\n' +
							'\tcursor: move;\n' +
						'}\n' +
						'#vote-interface {\n' +
							'\twidth: 300px;\n' +
							'\theight: 400px;\n' +
							'\toverflow: scroll;\n' +
							'\tcursor: default;\n' +
						'}\n' +
						'#vote-interface > div + div {\n' +
							'\tmargin-top: 1px;\n' +
							'\tpadding-top: 1px;\n' +
							'\tborder-top: 1px solid #ccc;\n' +
						'}\n' +
						'#vote-interface img {\n' +
							'\tvertical-align: middle;\n' +
							'\tcursor: pointer;\n' +
						'}\n' +
						'#vote-interface span {\n' +
							'\tfont-weight: bold;\n' +
							'\tvertical-align: middle;\n' +
						'}' +
						'#vote-interface-wrapper h3 {\n' +
							'\tborder-bottom: 1px solid #000;\n' +
							'\tfont-weight: bold;\n' +
							'\tfont-size: 18px;\n' +
							'\tcolor: #ff7e00;\n' +
						'}'
					);
				}

				/* part 2: prevent new users from commenting in logo votes */
				var conf = mw.config.get(["wgUserName", "wgNamespaceIds"]),
					namespaces = [],
					excNs = ["blog", "blog_talk", "board", "board_thread", "media", "message_wall", "message_wall_greeting", "special", "thread", "topic"], // excluded namespaces
					daysold = 14,
					editorList = $(".replies:first > li:last");
				if ($(editorList).hasClass("new-reply") && conf.wgUserName) {
					// thread not closed
					for (var id in conf.wgNamespaceIds) {
						if (excNs.indexOf(id) == -1) {
							namespaces.push(conf.wgNamespaceIds[id]);
						}
					}

					function onInvalid() {
						console.info("invalid");
						$(editorList).find(".MiniEditorWrapper").html('<div style=\"color: #aaa; font-style: italic; text-align: center; cursor: default;\">You must be on the wiki for at least ' + daysold + ' days in order to comment in a logo vote.</div>');
					}

					$.getJSON("/api.php?action=query&format=json&list=usercontribs&ucuser=" + encodeURIComponent(conf.wgUserName) + "&ucnamespace=" + namespaces.join("|") + "&ucdir=newer&ucprop=timestamp&uclimit=1&cb=" + new Date().getTime(), function(data) {
						var a = data.query.usercontribs;
						if (a.length > 0) {
							var time = a[0].timestamp,
								diff = new Date().getTime() - new Date(time).getTime(),
								msInPeriod = 86400000 * daysold; // milliseconds in specified period
							if (diff < msInPeriod) {
								onInvalid();
							}
						} else {
							// not valid
							onInvalid();
						}
					});
				}
			}
		}
	});
}


/* mark all category edits from the category section of ?action=view as minor */

if (mw.config.get("wgAction") == "view") {
$("body").mousedown(function(e) {
	window.e = e;
	if (
		$(e.target).is($("button#CategorySelectSave")) && // the element pressed is the button for saving categories on ?action=view
		$("nav#WikiaArticleCategories > .container > ul > li.category.new").length > 0 // 1 or more categories have been added
	) {
		e.preventDefault(); // prevent sending the request via $.nirvana
		$(e.target).attr("disabled","disabled");
		var a = $("nav#WikiaArticleCategories").data("categorySelect").getData(".new"), // data about elements
			b = [], // array of strings of category links, later join to a single string
			c = []; // kinda like b, but this is the output markup
			fn = {
				closeCategorySection: function() {
					$("nav#WikiaArticleCategories").removeClass("editMode").trigger("reset").find(".category.new").remove();
					$(c.join("")).insertBefore("nav#WikiaArticleCategories ul.categories");
				},
				alertSaveError: function() {
					alert("There was a problem saving the new categories. Please try again, or refresh, try again later come back later or add this category through the editor, if you're still getting this error.");
				}
			};
		for (i = 0; i < a.length; i++) {
			if ((a[i].name + a[i].sortKey).search(/\[\]\|#/) == -1) { // # is allowed actually, but is ignored in the dynamic article result, but just in case; these categories sit there like a couch potato and do nothing good to the economy
				// if category name and/or sort key don't include at least one of the characters in the regex, add to the category list
				b.push(
					"[[Category:" +
					a[i].name +
					(
						a[i].name != a[i].sortkey && a[i].sortkey.length > 0 ? // check if sortkey and category name are different
						"|" + a[i].sortkey : // use a sort key if different
						"" // return empty string if are identical
					) +
					"]]"
				);
				c.push(
					'<li class="category normal" data-name="' + encodeURIComponent(a[i].name) +
					'" data-namespace="" data-outertag="" data-sortkey="" data-type="normal"><span class="name"><a href="/wiki/Category:' +
					encodeURIComponent(a[i].name) + '" title="Category:Ex" class="newcategory">' + a[i].name + '</a></span></li>'
				);
				if (i + 1 == a.length) {
					// finished going through all categories
					if (b.length > 0) {
						$.getJSON("/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=" + encodeURIComponent(mw.config.get("wgPageName")) + "&cb=" + new Date().getTime(), function(data) {
							var a = data.query.pages;
							for (pageid in a) {
								var content = encodeURIComponent(a[pageid].revisions[0]["*"] + "\n");
								// save via mediawiki's api
								$.ajax({
									url: "/api.php?format=json&action=edit&title=" + encodeURIComponent(mw.config.get("wgPageName")) + "&text=" + content + encodeURIComponent(b.join("\n")) + "&minor&token=" + encodeURIComponent(mw.user.tokens.get("editToken")),
									type: 'POST',
									success: function(data) {
										if (data && data.edit && data.edit.result == "Success") {
											fn.closeCategorySection(); // categories have been added successfully
										} else {
											fn.alertSaveError(); // an error has occured
										}
									},
									error: function(xhr) {
										fn.alertSaveError(); // an error has occured
									}
								});
							}
						});
					} else {
						// b is an empty array: all categories contained invalid strings - cancel process
						fn.closeCategorySection();
					}
				}
			}
		}
	}
});
}


/* notify people when attempting to rename item articles of mascots */

if (mw.config.get("wgNamespaceNumber") == 0 && mw.config.get("wgAction") == "view") {
	$("#ca-move").click(function() {
		if (mw.config.get("wgCategories").indexOf("Famous Penguins Items") > -1) {
			if (!confirm("Note! This article is about an item worn by mascots. Items such as this don't always necessarily make sense grammatically. Please make sure that the new title is the CORRECT one. Type 'Project:JSON' in the search bar for more info.\nWould you like to proceed anyway?")) {
				return false;
			}
		}
	});
}


/* ====================================================================== *\
	# remove "image" class from info button below ogg player
	# (http://clubpenguin.wikia.com/extensions/OggHandler/info.png)
	# so that audio file link will open when clicked (weird, but it works)
\* ====================================================================== */

if ($(".ogg_player > div:nth-of-type(2)").length) {
	$(".ogg_player > div:nth-of-type(2) > a").removeClass("image");
}