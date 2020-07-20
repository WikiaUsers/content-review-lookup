/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mw */
 
/**
 * Highlight certain snippets of text when double clicking on them
 */
if (window.getSelection) {
  	$(function ($) {
                "use strict";
		$('pre, p, td, li, dd, dt').dblclick(function () {
			window.getSelection().removeAllRanges();
			var range = document.createRange();
			range.selectNode(this);
			window.getSelection().addRange(range);
		});
	});
}
 
/**
 * AccountNavigationLinks
 * Code by: [[User:Kenkyouta118]]
 * Modified by: [[User:Kenkyouta118]]
 * 
 * Some extra links in my account navigation
 * 
 * Skin(s):  Oasis only
 */
$(function ($) {
	/*jshint laxbreak:true */
	"use strict";
 
	var newLinks = '<li><a data-tracking-label="mycustomlink" href="/wiki/Special:MyContributions">Chỉnh sửa của tôi</a></li>'
		+ '<li><a data-tracking-label="mycustomlink" href="/wiki/Special:Following">Trang đang theo dõi</a></li>'
		+ '<li><a data-tracking-label="mycustomlink" href="/wiki/Special:Mypage/wikia.js">Wikia.js</a></li>'
		+ '<li><a data-tracking-label="mycustomlink" href="/wiki/Special:Mypage/wikia.css">Wikia.css</a></li>';
	// add new links on pageload
	$('.wds-global-navigation__user-menu a[data-tracking-label="account.preferences"]').parent().after(newLinks);
});
 
/**
 * PrefixIndex fix
 * Code by: [[User:Mathmagician]]
 * 
 * In the toolbar, changes the Special:PrefixIndex link to Special:PrefixIndex/<pagename>
 * so that you can see subpages of the current page without having to type the title again
 * 
 * Skin(s):  Oasis only
 */
$(function ($) {
	"use strict";
 
	var prefixIndex = $('#my-tools-menu a[data-name="prefixindex"]'),
		newHref = prefixIndex.attr('href') + '/' + encodeURIComponent(mw.config.get('wgPageName'));
 
	prefixIndex.attr('href', newHref);
});

 
 
/**
 * Link to user's edit count in profile masthead
 * Code by: [[User:Mathmagician]]
 *
 * Skin(s):  Oasis only
 */
$(function ($) {
	"use strict";
 
	var $masthead = $('#UserProfileMasthead');
 
	if ($masthead.length !== 0) { 
		var username = $masthead.children('.masthead-info').children().first().children('h1').text(),
			usernameEncoded = encodeURIComponent(username),
			$em = $masthead.find('.tally').children('em').first(),
			editcount = $em.text();
 
		// create link
		$em.html('<a title="Special:Editcount/' + username + '" href="/wiki/Special:Editcount/' + usernameEncoded + '">' + editcount + '</a>');
	}
});
 
 
 
/**
 * CompactDiffLinks
 * Code by: [[User:Mathmagician]]
 * 
 * Adds a shortened url link at the top of diff pages
 * e.g. c.wikia.com/?diff=983283
 *
 * Skin(s):  Oasis, Monobook
 */
$(function ($) {
	"use strict";
 
	var diff = $.getUrlVar("diff"),
		oldid = $.getUrlVar("oldid"),
		href, hrefShort, url, wgArticleId;
 
	function insertCompactDiffLink(n_diff, n_oldid) {
		href += "/?diff=" + n_diff;
		if (n_oldid) {
			href += "&oldid=" + n_oldid;
		}
		hrefShort = href.substring(7);
		$('#diff-shorthand-url').remove();
		$('#mw-content-text').prepend('<div id="diff-shorthand-url" style="text-align: center; padding: 5px 0;"><a href="' + href + '" title="' + href + '">' + hrefShort + '</a></div>');
	}
 
	if (diff) {
		// special case, c.wikia.com
		href = mw.config.get("wgServer");
		if (href === "http://community.wikia.com") {
			href = "http://c.wikia.com";
		}
 
		// case where diff=next
		if (diff === "next") {
			wgArticleId = mw.config.get("wgArticleId");
			url = "/api.php?action=query&prop=revisions&rvprop=ids&format=json&rvdir=newer&pageids=" + wgArticleId + "&rvstartid=" + oldid;
			$.getJSON(url, function (data) {
				insertCompactDiffLink(data.query.pages[wgArticleId].revisions[1].revid);
			});
		// case where diff=prev
		} else if (diff === "prev") {
			insertCompactDiffLink(oldid);
		} else if ($('.diff-multi').length !== 0) {
		// if there are intermediate revisions, append oldid as well
			insertCompactDiffLink(diff, oldid);
		} else {
			insertCompactDiffLink(diff);
		}
	}
});
 
/**
 * ViewSource (lightweight)
 * Code by: [[User:Mathmagician]]
 * 
 * This is a lightweight remake of [[w:c:dev:View Source]] with
 * a slightly different feature set.
 * 
 * Skin(s):  Oasis only
 */
$(function ($) {
	"use strict";
 
	var $header = $('#WikiaPageHeader h1'),
		wgNamespaceNumber = mw.config.get("wgNamespaceNumber"),
		showSource;
 
	if (!$header.length) {
		$header = $('#WikiaUserPagesHeader h1');
	}
 
	if ($header.length && wgNamespaceNumber !== -1 && wgNamespaceNumber < 1000) {
		// create stylesheet
		$('#view-source-style').remove();
		$('head').append('<style id="view-source-style">#WikiaPageHeader h1,#WikiaUserPagesHeader h1{cursor:help}#WikiaMainContent.view-source #mw-content-text,.WikiaRail.view-source,#view-source-div{display:none}#WikiaMainContent.view-source #view-source-div{display:block}#WikiaMainContent.view-source{width:1010px;width:-webkit-calc(100% - 20px);width:-moz-calc(100% - 20px)}#view-source-pre{margin-top:10px}#view-source-div button{margin-right:10px}#view-source-div input{vertical-align:top}</style>');
 
		$header
		.click(function () {
			// update showSource
			showSource = !showSource;
 
			if (document.getElementById('view-source-pre') === null) {
				// insert content
				$.get('/index.php?curid=' + mw.config.get("wgArticleId") + '&oldid=' + mw.config.get("wgRevisionId") + '&action=raw&maxage=0&smaxage=0', function (wikitext) {
					function select() {
						window.getSelection().removeAllRanges();
						var range = document.createRange();
						range.selectNode(document.getElementById('view-source-pre'));
						window.getSelection().addRange(range);
					}
 
					var pre = document.createElement("pre");
					pre.id = "view-source-pre";
					pre.style.whiteSpace = "pre";
					pre.textContent = wikitext;
 
					var button = document.createElement("button");
					button.textContent = "Select All";
					if (window.getSelection) {
						pre.ondblclick = select;
						button.onclick = select;
					}
 
					var label = document.createElement("label");
					var check = document.createElement("input");
					check.type = "checkbox";
					label.appendChild(check);
					label.appendChild(document.createTextNode(" Word Wrap"));
					check.onchange = function () {
						if (this.checked) {
							document.getElementById("view-source-pre").style.whiteSpace = "pre-wrap";
						} else {
							document.getElementById("view-source-pre").style.whiteSpace = "pre";
						}
					};
 
					var div = document.createElement("div");
					div.id = "view-source-div";
					div.appendChild(button);
					div.appendChild(label);
					div.appendChild(document.createElement("br"));
					div.appendChild(pre);
 
					var container = document.getElementById("mw-content-text");
					container.parentElement.insertBefore(div, container);
				});
			}
 
			if (showSource) {
				// display wikitext
				$('#WikiaMainContent, .WikiaRail').addClass('view-source');
			} else {
				// display html
				$('#WikiaMainContent, .WikiaRail').removeClass('view-source');
			}
		})
		.attr('title', 'Click here on the page title to view the source wikitext');
	}
});

$(function ($) {
	"use strict";
	$('.wikia-menu-button a, .editsection a').each(function () {
		var href = this.href;
		if (href.indexOf('action=edit') !== -1 && href.indexOf('useeditor=source') === -1) {
			this.href += "&useeditor=source";
		}
	});
});