;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.reorder && window.SpriteEditorModules.reorder.loaded) return;
	window.SpriteEditorModules.reorder = {loaded: true};
	var myData = window.SpriteEditorModules.reorder;
	var modal = {};
	var shared = {};
	var Demo = {};
	var eleList;
	var msg;
	var sprites = [];
	myData.modal = modal;
	
	myData.setSharedData = function(d) {
		shared = d;
	};
	var perRowEle;
	var spacingEle;
	myData.requestChanges = function() {
		sprites = [];
		var ele = document.getElementsByClassName("spriteedit-reorder")[0];
		ele.style.width = String(shared.options.spritesPerRow * 32) + "px";
		ele.innerHTML = "";
		var item_list = [];
		for (var i = 1; i <= shared.toShare.highestPos; i++) {
			item_list[item_list.length] = new Demo.DraggableItemWidget( {
				data: 'sprite' + i
			} );
		}
		var Test = new Demo.DraggableGroupWidget( {
			orientation: 'horizontal',
			items: item_list
		});
		ele.appendChild(Test.$element.get(0));
	};
	function setup_draggable_group(OO) {
		// Setting up Draggable objects (Copied from gerrit)
		Demo.SimpleWidget = function DemoSimpleWidget( config ) {
			// Configuration initialization
			config = config || {};
			// Parent constructor
			Demo.SimpleWidget.super.call( this, config );
			// Initialization
			var c = document.createElement("canvas");
			c.width = shared.imgWidth;
			c.height = shared.imgHeight;
			c.style.width="32px";
			var s = shared.root.querySelector('li[class="spritedoc-box"][data-pos="' + this.data.substr(6) + '"]');
			var ctxOld = c.getContext('2d');
			var p = this.data.substr(6);
			if (!s) {
				ctxOld.drawImage(shared.backgroundSprites[Number(p)].sprite, 0, 0);
				c.style.opacity = 0.2;
			} else {
				sprites[Number(this.data.substr(6))] = s;
				ctxOld.drawImage(s.querySelector("canvas"), 0, 0);
			}
			this.$element
				.addClass( 'demo-simpleWidget' )
				.append( $(c) );
			this.$element.get(0).dataset.spriteid = this.data.substr(6);
			if (!s)
				this.$element.get(0).dataset.spriteidorg = p;
		};
		/* Setup */
		OO.inheritClass( Demo.SimpleWidget, OO.ui.Widget );
		OO.mixinClass( Demo.SimpleWidget, OO.ui.mixin.IconElement );
		OO.mixinClass( Demo.SimpleWidget, OO.ui.mixin.LabelElement );

		Demo.DraggableGroupWidget = function DemoDraggableGroupWidget( config ) {
			// Configuration initialization
			config = config || {};
			// Parent constructor
			Demo.DraggableGroupWidget.super.call( this, config );
			// Mixin constructors
			OO.ui.mixin.DraggableGroupElement.call( this, $.extend( {
				$group: this.$element
			}, config ) );
			this.$element.css("line-height", "0");
		};
		/* Setup */
		OO.inheritClass( Demo.DraggableGroupWidget, OO.ui.Widget );
		OO.mixinClass( Demo.DraggableGroupWidget, OO.ui.mixin.DraggableGroupElement );
		
		Demo.DraggableItemWidget = function DemoDraggableItemWidget( config ) {
			// Configuration initialization
			config = config || {};
			// Parent constructor
			Demo.DraggableItemWidget.super.call( this, config );
			// Mixin constructors
			OO.ui.mixin.DraggableElement.call( this, config );
		};
		/* Setup */
		OO.inheritClass( Demo.DraggableItemWidget, Demo.SimpleWidget );
		OO.mixinClass( Demo.DraggableItemWidget, OO.ui.mixin.DraggableElement );
	}
	// window content
	function formHtml() {
		return '<div class="spriteedit-reorder">' + 
			'</div>';
	}
	function saveSpriteOrder() {
		var tmp = shared.root.children[0];
		var eleList = document.querySelectorAll('div.spriteedit-reorder .oo-ui-draggableElement');
		const changes = [];
		const changesBackground = [];
		for (var i = 0; i < eleList.length; i++) {
			var old = eleList[i].dataset.spriteid;
			if ((shared.spriteData.settings.pos || -1) === Number(old))
				changes.push(["pos", Number(old), i + 1]);
			if (Number(old) === i + 1) continue;
			if (!shared.root.querySelector('li[class="spritedoc-box"][data-pos="' + old + '"]')) { // Moved background
				changesBackground.push([shared.backgroundSprites[Number(old)], old, String(i + 1)]);
				continue;
			}
			changes.push([sprites[Number(old)], old, i + 1]);
		}
		const _func = function(is_undo) {
			var settings = shared.spriteData.settings;
			var i;
			for (i = 0; i < changes.length; i++) {
				if (changes[i][0] === "pos") {
					settings.pos = changes[i][is_undo ? 1 : 2];
					continue;
				}
				changes[i][0].dataset.pos = changes[i][is_undo ? 1 : 2];
			}
			for (i = 0; i < changesBackground.length; i++) {
				delete shared.backgroundSprites[ changesBackground[i][is_undo ? 2 : 1] ];
			}
			for (i = 0; i < changesBackground.length; i++) {
				shared.backgroundSprites[ changesBackground[i][is_undo ? 1 : 2] ] = changesBackground[i][0];
			}
		};
		myData.changedBackgroundTiles = changesBackground;
		if (!changes.length && !changesBackground.length) return;
		_func(false);
		shared.addHistory([
			function() {_func(true);},
			function() {_func(false);}
		]);
	}
	mw.loader.using('oojs-ui', 'oojs-ui-core', 'oojs-ui-windows').then( function( require ) {
		var OO = require('oojs');
		setup_draggable_group(OO);
		// create window
		myData.createWindow = function() {
			msg = window.SpriteEditorModules.main.msg;
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.ProcessDialog);
			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = msg("reorder-sprites-label").plain();
			SpriteEditorDialog.static.actions = [
				{ label: msg("dialog-button-close").plain(), flags: ['safe', 'close'] },
				{ label: msg("save-label").plain(), action: 'saveOrder', flags: ['primary'] }
			];

			// initialise dialog, append content
			SpriteEditorDialog.prototype.initialize = function () {
				SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
				this.content = new OO.ui.PanelLayout({
					expanded: false
				});
				this.content.$element.append(formHtml());
				this.$body.append(this.content.$element);
				this.$content.addClass('spriteedit-ui-Dialog');
				// Hide empty action bar
				var ele = this.$content.get(0);
				ele.children[2].children[0].style.height = 0;
				ele.children[2].style.minHeight = 0;
				ele.children[2].style.display = "none";
			};

			// Handle actions
			SpriteEditorDialog.prototype.getActionProcess = function (action) {
				if (action === 'saveOrder') {
					saveSpriteOrder();
					modal.seDialog.close();
				}
				return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
			};

			// Create the Dialog and add the window manager.
			modal.windowManager = new OO.ui.WindowManager();
			$('body').append(modal.windowManager.$element);

			// Create a new dialog window.
			modal.seDialog = new SpriteEditorDialog({
				size: 'large'
			});

			// Add window and open
			modal.windowManager.addWindows([modal.seDialog]);
			modal.windowManager.openWindow(modal.seDialog);
			// Close dialog when clicked outside the dialog
			modal.seDialog.$frame.parent().on('click', function (e) {
				if (!$(e.target).closest('.spriteedit-ui-Dialog').length) {
					modal.seDialog.close();
				}
			});
		};
	});
})(window.jQuery, window.mediaWiki);