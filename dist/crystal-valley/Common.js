/* Any JavaScript here will be loaded for all users on every page load. */
var oggPlayerButtonOnly = false;

 window.UserTagsJS = {
	modules: {},
	tags: {// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured' },
		inactive: { u:'Inactive' },
		jshelper: { u: 'JavaScript' },
		csshelper: { u: 'CSS' },
		templatehelper: { u: 'Templates' },
		bureaucrat: { u: 'Bcrat' },
		sysop: { u: 'Admin' },
		rollback: { u: 'RB' },
		'chat-moderator': { u: 'Mod' },
		'autoconfirmed-user': { u: 'AU' },
		blocked: { u: 'Annihilated' },
		bannedfromchat: { u: 'Exiled' }
    },
	oasisPlaceBefore: ''
};
 
/* importScriptPages-start */
importArticles({
    type: "style",
    articles: [
        'u:dev:FontAwesome/code.css'
    ]
}, {
    type: 'script',
    articles: [
        // Mediawiki
        'MediaWiki:Common.js/autolock.js',  // 30day blog lock
        'MediaWiki:Common.js/summaries.js', // Standard edit summaries
        'MediaWiki:Gadget-Edittools.js',
 
        'u:dantest:MediaWiki:Search_Fix.js',

        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js', 
        'u:dev:ColorPreview/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:Digital_Clock/code.js',
        'u:dev:FixMultipleUpload/code.js',
        'u:dev:PowerPageMaker/en.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:Toggler.js',
        'u:dev:UserTags/code.js',
        'u:dev:Voice_Dictation/voice.js',
    ]
});
/* importScriptPages-end */
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

mw.loader.using( ['jquery.ui.tabs'], function() {
    var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
    $("[class^=portal_sliderlink]").click(function() { // bind click event to link
        $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
        return false;
    });
    $('#portal_next').click(function() {
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
        return false;
    });
    $('#portal_prev').click(function() { // bind click event to link
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
        return false;
    });
});

/* Mal-written code causing JS errors
window.wikiMusic = (function() {
	var fn = {},
		noRequestsWaiting = true;
	}
 
	// functions
	// add music
	.addMusic = function(node, data) {
		if (!document.querySelector("nav#wiki-music") && data.src) {
			// there is no existing interface already
			var nav = fn.createInterface(),
				audio = nav.querySelector("audio"),
				btn = nav.querySelector("img");
			audio.autoplay = true;
			audio.loop = true;
			audio.src = data.src;
			btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/28px-Media-playback-pause.svg.png";
			btn.title = "Click to pause/unpause the music. Double-click to restart.";
			btn.addEventListener("click", function() {
				// audio[audio.paused ? "play" : "pause"]();
				if (audio.paused) {
					audio.play();
					btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/28px-Media-playback-pause.svg.png";
				} else {
					audio.pause();
					btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Media-playback-start.svg/24px-Media-playback-start.svg.png";
				}
			});
			btn.addEventListener("dblclick", function() {
				// double click - restart
				btn.src = "https\x3a//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Media-playback-pause.svg/28px-Media-playback-pause.svg.png";
				audio.currentTime = 0;
				audio.play();
			});
			document.body.appendChild(nav);
			if (!node.classList.contains("wiki-music-debug")) {
				node.parentNode.removeChild(node);
			}
		} else if (!data.src) {
			fn.getMusicSrc(data.name, function(src) {
				data.src = src;
				fn.addMusic(node, data);
			});
		}
	}
 
	// get music src
	.getMusicSrc = function(name, cb) {
		var a = new XMLHttpRequest();
		a.open("GET", "/api.php?action=query&format=json&prop=imageinfo&iiprop=mime|metadata|url&titles=" + encodeURIComponent("File:" + name), true);
		a.addEventListener("load", function() {
			var b = JSON.parse(a.responseText),
				c = b.query.pages,
				d;
			try {
				for (var pageid in c) {
					if (Number(pageid) < 0) {
						// page exists
						break;
					}
					d = c[pageid].imageinfo[0];
					if (d.mime == "application/ogg") {
						noRequestsWaiting = true;
						cb(d.url);
						break;
					}
				}
			} catch(err) {}
		});
		if (noRequestsWaiting) {
			// send only if no music already exists, to prevent multi-sending many requests if exist on a single page
			noRequestsWaiting = false;
			a.send();
		}
	}
 
	// create interface
	.createInterface = function() {
		var nav = document.createElement("nav"),
			audio = document.createElement("audio"),
			btn = new Image();
		nav.id = "wiki-music";
		audio.id = "wiki-music-src";
		btn.id = "wiki-music-btn";
		nav.appendChild(audio);
		nav.appendChild(btn);
		return nav;
	}
 
	// check node validity
	.checkNode = function(node) {
		var type = node.getAttribute("data-music-type"),
			name = node.getAttribute("data-music-name"),
			isValid = false;
		switch(type) {
			case "file":
				try {
					if (!name.match(/[^A-Za-z0-9 \(\)\+\-\*\=\!\?\.\,\;\:'"\$&\u0080-\uFFFF]/) && name.length > 4) { // special case of 'wgLegalTitleChars'
						isValid = {
							name: name.trim(),
							type: type
						};
					}
				} catch(err) {}
				break;
			case "cp":
				// not implemented yet
				break;
		}
		return isValid;
	}
 
	// scan given '#mw-content-text' element
	.scanPage = function(mct) {
		var found = false;}
		.Array.prototype.forEach.call(mct.querySelectorAll(".wiki-music"), function(node) {
			if (!found) {
				var isValid = fn.checkNode(node); // returns object with data
				if (isValid) {
					fn.addMusic(node, isValid);
				}
			}
		})
    // mutation observer for editing mode
	.obs = new MutationObserver(function(ms) {
		ms.forEach(function(m) {
			// first for removed nodes first
			Array.prototype.forEach.call(m.removedNodes, function(node) {
				var isEditPageDialog = false;
				try {
					if (node.nodeType == 1 && node.id == "EditPageDialog") {
						isEditPageDialog = true;
					}
				} catch(err) {}
				if (isEditPageDialog) {
					var nav = document.querySelector("nav#wiki-music");
					if (nav) {
						nav.querySelector("audio").pause();
						nav.parentNode.removeChild(nav);
					}
				}
			});
			// now check for inserted nodes
			Array.prototype.forEach.call(m.addedNodes, function(node) {
				var isPreviewArticle = false;
				try {
					if (node.nodeType == 1 && node.classList.contains("WikiaArticle") && fn.parents(node, 4).id == "EditPageDialog") {
						isPreviewArticle = true;
					}
				} catch(err) {}
				if (isPreviewArticle) {
					fn.scanPage(node.querySelector("#mw-content-text"));
				}
			});
		});
	}))
 
	// parents
	fn.parents = function(node, depth) {
		if (depth == -1) {
			return node;
		} else {
			try {
				return fn.parents(node.parentNode, depth - 1);
			} catch(err) {
				// end of parents chain
				return null;
			}
		}
	}
 
	// css
	mw.util.addCSS(
		'#wiki-music {\n' +
			'\tposition: fixed;\n' +
			'\ttop: 55px;\n' +
			'\tleft: 15px;\n' +
			'\tz-index: 999999999;\n' +
		'}\n' +
		'img#wiki-music-btn {\n' +
			'\twidth: 24px;\n' +
			'\theight: 24px;\n' +
			'\tbackground-color: #cdc;\n' +
			'\tbackground-image: linear-gradient(to bottom, #b3ffad, #52e452, #cdc);\n' +
			'\tborder: 1px solid #5a5;\n' +
			'\tborder-radius: 7px;\n' +
			'\tanimation: wiki-music-ani 5s linear infinite;\n' +
			'\tcursor: pointer;\n' +
		'}' +
		'\t@keyframes wiki-music-ani {\n' +
			'\t\t0% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px red;\n' +
			'\t\t}\n' +
			'\t\t17% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px yellow;\n' +
			'\t\t}\n' +
			'\t\t33% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px lime;\n' +
			'\t\t}\n' +
			'\t\t50% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px cyan;\n' +
			'\t\t}\n' +
			'\t\t67% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px blue;\n' +
			'\t\t}\n' +
			'\t\t83% {\n' +
				'\t\t\tbox-shadow: 0 0 1px 1px purple;\n' +
			'\t\t}\n' +
			'\t\t100% {box-shadow: 0 0 1px 1px red;}\n' +
		'\t}'
	);
 
	// implementations
	if ([2, 3, 10, 500].indexOf(mw.config.get("wgNamespaceNumber")) > -1) {
		switch(mw.config.get("wgAction")) {
			case "view":
			case "watch":
			case "unwatch":
			case "render":
				// ordinary page
				fn.scanPage(document.querySelector("#mw-content-text"));
				break;
			case "edit":
			case "submit":
				// edit mode (not visual, yuck :P)
				fn.obs.observe(document.body, {
					childList: true,
					subtree: true
				});
		}
	}
	return fn;
(end)();
*/