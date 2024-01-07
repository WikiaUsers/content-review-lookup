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
				shared.addHistory(["sprite-removed", "sprite-added2", secID, id, cl, shared.toShare.highestPos, shared.toShare.highestPos]);
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
		processDialog: function(data) { // also creates MessageDialog
			var modal = {};
			var OO = window.SpriteEditorModules.main.OO;
			var wm = window.SpriteEditorModules.helper.windowManager;
			if (data.isSubdialog) {
				wm = new OO.ui.WindowManager();
				$('body').append(wm.$element);
			} else if (!wm) {
				wm = new OO.ui.WindowManager();
				window.SpriteEditorModules.helper.windowManager = wm;
				$('body').append(wm.$element);
			}
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, data.messageDialog && OO.ui.MessageDialog || OO.ui.ProcessDialog);

			SpriteEditorDialog.static.name = data.name;
			SpriteEditorDialog.static.title = data.title;
			SpriteEditorDialog.static.actions = data.actions;

			// initialise dialog, append content
			var pInitialize = function () { // ProcessDialog
				SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
				this.content = new OO.ui.PanelLayout({
					expanded: false
				});
				this.content.$element.append(data.content());
				this.$body.append(this.content.$element);
				this.$content.addClass('spriteedit-ui-Dialog spriteedit-ui-hiddenFooter');
			};
			var mInitialize = function () { // MessageDialog
				SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
				var b = this.$body.get(0);
				// Adjusting styling
				var mdText = b.querySelector(".oo-ui-messageDialog-text");
				mdText.style.paddingLeft = 0;
				mdText.style.paddingRight = 0;
				b.querySelector(".oo-ui-messageDialog-message").innerHTML = data.content();
				this.$content.addClass('spriteedit-ui-Dialog');
			};
			
			SpriteEditorDialog.prototype.initialize = data.messageDialog && mInitialize || pInitialize;

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
			
			// Add window
			wm.addWindows([modal.seDialog]);
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