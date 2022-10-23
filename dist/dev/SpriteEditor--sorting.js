;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.sorting && window.SpriteEditorModules.sorting.loaded) return;
	window.SpriteEditorModules.sorting = {loaded: true};
	var api = new mw.Api();
	var myData = window.SpriteEditorModules.sorting;
	var modal = {};
	myData.modal = modal;
	var shared;
	var Demo = {};
	var root = document.getElementById('mw-content-text');
	var oldOrder = [];
	var msg;
	myData.setSharedData = function(d) {
		shared = d;
	};
	myData.setSections = function(s) {
		var ele = document.getElementsByClassName("spriteedit-sorting")[0];
		ele.innerHTML = "";
		var items = [];
		oldOrder = [];
		for (var i = 0; i < s.length; i++) {
			items[items.length] = new Demo.DraggableItemWidget( {
				data: 'item' + i,
				icon: 'tag',
				label: s[i].querySelector(".mw-headline").textContent
			} );
			items[items.length - 1].$element.get(0).dataset.sectionId = s[i].dataset.sectionId;
			oldOrder[oldOrder.length] = s[i].dataset.sectionId;
		}
		var Test = new Demo.DraggableGroupWidget( {
			items: items
		} );
		ele.appendChild(Test.$element.get(0));
	};
	// window content
	function formHtml() {
		return '<div class="spriteedit-sorting">' + 
			'</div>';
	}

	mw.loader.using('oojs-ui', 'oojs-ui-core', 'oojs-ui-windows').then( function( require ) {
		var OO = require('oojs');

		// Setting up Draggable objects (Copied from gerrit)
		Demo.SimpleWidget = function DemoSimpleWidget( config ) {
			// Configuration initialization
			config = config || {};
			// Parent constructor
			Demo.SimpleWidget.super.call( this, config );
			// Mixin constructors
			OO.ui.mixin.IconElement.call( this, config );
			OO.ui.mixin.LabelElement.call( this, config );
			// Initialization
			this.$element
				.addClass( 'demo-simpleWidget' )
				.append( this.$icon, this.$label );
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
		// Copy end

		// create window
		myData.createWindow = function() {
			msg = window.SpriteEditorModules.main.msg;
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.ProcessDialog);

			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = msg("sort-section-label").plain();
			SpriteEditorDialog.static.actions = [
				{ label: msg("dialog-button-close").plain(), modes: 'edit', flags: ['safe', 'close'] },
				{ label: msg("save-label").plain(), action: 'saveSorting', flags: ['primary'] }
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
				if (action === 'saveSorting') {
					var newOrder = [];
					var tmp = root.children[0];
					var a = document.createElement("span");
					root.prepend(a);
					var eleList = document.querySelectorAll('div.spriteedit-sorting .oo-ui-draggableElement');
					root.insertBefore(tmp, a);
					for (var i = 0; i < eleList.length; i++) {
						newOrder[newOrder.length] = eleList[i].dataset.sectionId;
						root.insertBefore(document.querySelector('div[data-section-id="' + eleList[i].dataset.sectionId + '"]'), a);
					}
					root.removeChild(a);
					shared.addHistory([
						"move-sections",
						"move-sections",
						oldOrder,
						newOrder
					]);
					modal.seDialog.close();
				}
				return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
			};

			// Create the Dialog and add the window manager.
			modal.windowManager = new OO.ui.WindowManager();
			$('body').append(modal.windowManager.$element);

			// Create a new dialog window.
			modal.seDialog = new SpriteEditorDialog({
				size: 'medium'
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