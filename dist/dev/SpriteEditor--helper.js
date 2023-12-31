;(function() {
	'use strict';

	if (window.SpriteEditorModules.helper && window.SpriteEditorModules.helper.loaded) return;
	var shared;
	window.SpriteEditorModules.helper = {
		loaded: true,
		setSharedData: function(data) {
			shared = data;
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
			var cl = shared.root.querySelector('li[data-pos="' + id + '"]');
			var codes = cl.querySelectorAll("code[isSprite]") || [];
			var n = {};
			shared.backgroundSprites[id] = {sprite: cl.querySelector("canvas")};
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
				if (window.SpriteEditorModules.helper.no_md5) {
					return window.SpriteEditorModules.helper.imageURL + '/' + encodeURIComponent(name) + "?format=original&version=" + Date.now();
				} else {
					const hash = window.hex_md5(name);
					return window.SpriteEditorModules.helper.imageURL + '/' + hash.substring(0,1) + '/' + hash.substring(0,2) + '/' + encodeURIComponent(name) + "?format=original&version=" + Date.now();
				}
			} else {
				return '';
			}
		},
		processDialog: function(data) {
			var modal = {};
			var OO = window.SpriteEditorModules.main.OO;
			var wm = window.SpriteEditorModules.helper.windowManager;
			if (!wm) {
				wm = new OO.ui.WindowManager();
				window.SpriteEditorModules.helper.windowManager = wm;
				$('body').append(wm.$element);
			}
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.ProcessDialog);

			SpriteEditorDialog.static.name = data.name;
			SpriteEditorDialog.static.title = data.title;
			SpriteEditorDialog.static.actions = data.actions;

			// initialise dialog, append content
			SpriteEditorDialog.prototype.initialize = function () {
				SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
				this.content = new OO.ui.PanelLayout({
					expanded: false
				});
				this.content.$element.append(data.content());
				this.$body.append(this.content.$element);
				this.$content.addClass('spriteedit-ui-Dialog spriteedit-ui-hiddenFooter');
			};

			// Handle actions
			SpriteEditorDialog.prototype.getActionProcess = function (action) {
				data.action(action);
				if (action === "close")
					return new OO.ui.Process( function () {
			            modal.seDialog.close( { action: action } );
			        } );
				return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
			};

			// Create a new dialog window.
			modal.seDialog = new SpriteEditorDialog({
				size: data.size
			});
			
			// Add window and open
			wm.addWindows([modal.seDialog]);
			wm.openWindow(modal.seDialog);
			modal.windowManager = wm;
			// Close dialog when clicked outside the dialog
			modal.seDialog.$frame.parent().on('click', function (e) {
				if (!$(e.target).closest('.spriteedit-ui-Dialog').length) {
					if (data.onclose)
						data.onclose();
					modal.seDialog.close();
				}
			});
			return modal;
		}
	};
})(window.jQuery, window.mediaWiki);