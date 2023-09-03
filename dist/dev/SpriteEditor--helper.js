;(function() {
	'use strict';

	if (window.SpriteEditorModules.helper && window.SpriteEditorModules.helper.loaded) return;
	var shared;
	var root = document.getElementById('mw-content-text');
	window.SpriteEditorModules.helper = {
		loaded: true,
		setSharedData: function(data) {
			shared = data;
		},
		newSection: function(s) {
			// section header
			var sectionH3Span = document.createElement('span');
			var sectionH3 = document.createElement('h3');
			var spriteSection = document.createElement('div');
			sectionH3.append(sectionH3Span);
			sectionH3Span.id = s.name || undefined;
			sectionH3Span.contentEditable = true;
			sectionH3Span.textContent = s.name;
			sectionH3Span.className = 'mw-headline';
			sectionH3Span.onpaste = function(e) {
				e.preventDefault();
			    var paste = (e.clipboardData || window.clipboardData).getData('text');
			    paste = paste.replace( /\n/g, ' ' ).trim();
			    window.document.execCommand( 'insertText', false, paste );
			};
			sectionH3Span.onkeypress = function(e) {
				if ( e.keyCode === 13 ) {
					e.preventDefault();
					e.target.blur();
				}
			};
			sectionH3Span.addEventListener("focus", function() {
				if (!sectionH3Span.getAttribute("data-placeholder")) {
					sectionH3Span.setAttribute("data-original-text", sectionH3Span.textContent);
				}
			});
			sectionH3Span.addEventListener("blur", function() {
				var orgName = sectionH3Span.getAttribute("data-original-text") || "";
				sectionH3Span.textContent = sectionH3Span.textContent.trim();
				if (orgName.length === 0 && sectionH3Span.textContent.length ) {
					shared.addHistory([
						"section-added",
						"section-removed",
						s.id,
						spriteSection,
						sectionH3Span.textContent,
						Array.from(root.children).indexOf(spriteSection)
					]);
				} else if (sectionH3Span.textContent.length && orgName !== sectionH3Span.textContent) {
					shared.addHistory([
						"section-rename",
						"section-rename",
						s.id,
						orgName,
						sectionH3Span.textContent
					]);
				}
				sectionH3Span.removeAttribute("data-original-text");
				sectionH3Span.removeAttribute('data-placeholder');
				if (!sectionH3Span.textContent.length) {
					var names = spriteSection.querySelectorAll("code[isSprite]");
					var n = {};
					for (var i = 0; i < names.length; i++) {
						n[names[i].textContent] = true;
					}
					if (orgName.length) {
						shared.addHistory([
							"section-removed",
							"section-added",
							s.id,
							spriteSection,
							orgName,
							Array.from(root.children).indexOf(spriteSection)
						]);
					}
					root.removeChild(spriteSection);
					shared.markDuplicateNames(n);
				}
			});

			// section body
			spriteSection.classList = 'spritedoc-section';
			spriteSection.setAttribute('data-section-id',s.id);
			spriteSection.append(sectionH3);
			return spriteSection;
		},
		addSprite: function(positionID, img) {
			var nc = this.newCanvas();
			shared.canvasCollection[positionID] = nc;
			var ctx = nc.getContext('2d');
			ctx.drawImage(img,
				0, 0, img.naturalWidth || img.width, img.naturalHeight || img.height, // Source coords.
				0, 0, shared.imgWidth, shared.imgHeight // Canvas coords.
			);
		},
		removeSprite: function(id, skipHistory) {
			var cl = root.querySelector('li[data-pos="' + id + '"]');
			var codes = cl.querySelectorAll("code[isSprite]") || [];
			var n = {};
			for (var i = 0; i < codes.length; i++) {
				var t = codes[i].textContent;
				n[t] = true;
			}
			var secID = cl.closest('.spritedoc-section').dataset.sectionId;
			if (!skipHistory) {
				shared.addHistory(["sprite-removed", "sprite-added", secID, id, cl, shared.toShare.highestPos, shared.toShare.highestPos]);
			}
			var clBoxes = cl.closest('.spritedoc-boxes');
			clBoxes.removeChild(cl.closest('.spritedoc-box'));
			shared.markDuplicateNames(n);
		},
		newCanvas: function() {
			var c = document.createElement('canvas');
			c.width = shared.imgWidth;
			c.height = shared.imgHeight;
			var ctx = c.getContext('2d');
			ctx.imageSmoothingEnabled = false;
			return c;
		},
		seperatePath: window.SpriteEditorModules.seperatePath,
		filepath: function(name) {
			if (window.hex_md5) {
				const hash = window.hex_md5(name);
				return window.SpriteEditorModules.helper.imageURL + '/' + hash.substring(0,1) + '/' + hash.substring(0,2) + '/' + encodeURIComponent(name) + "?format=original&version=" + Date.now();
			} else {
				return '';
			}
		}
	};
})(window.jQuery, window.mediaWiki);