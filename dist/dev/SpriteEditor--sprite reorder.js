;(function($) {
	'use strict';

	if (window.SpriteEditorModules.reorder && window.SpriteEditorModules.reorder.loaded) return;
	window.SpriteEditorModules.reorder = {loaded: true};
	var myData = window.SpriteEditorModules.reorder;
	var modal = {};
	var shared = {};
	var Demo = {};
	var sprites = [];
	myData.modal = modal;
	
	myData.setSharedData = function(d) {
		shared = d;
	};
	myData.requestChanges = function() {
		sprites = [];
		var ele = document.getElementsByClassName('spriteedit-reorder')[0];
		ele.style.width = String(shared.options.spritesPerRow * 32) + 'px';
		ele.innerHTML = '';
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
			var c = document.createElement('canvas');
			c.width = shared.imgWidth;
			c.height = shared.imgHeight;
			c.style.width='32px';
			var s = shared.root.querySelector('li[class="spritedoc-box"][data-pos="' + this.data.substr(6) + '"]');
			var ctxOld = c.getContext('2d');
			var p = this.data.substr(6);
			if (!s) {
				ctxOld.drawImage(shared.backgroundSprites[Number(p)].sprite, 0, 0);
				c.style.opacity = 0.2;
			} else {
				sprites[Number(this.data.substr(6))] = s;
				ctxOld.drawImage(s.querySelector('canvas'), 0, 0);
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
			this.$element.css('line-height', '0');
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
		var eleList = document.querySelectorAll('div.spriteedit-reorder .oo-ui-draggableElement');
		const changes = [];
		const changesBackground = [];
		for (var i = 0; i < eleList.length; i++) {
			var old = eleList[i].dataset.spriteid;
			if ((shared.spriteData.settings.pos || -1) === Number(old))
				changes.push(['pos', Number(old), i + 1]);
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
				if (changes[i][0] === 'pos') {
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
	
	// create window
	myData.createWindow = function() {
		var main = window.SpriteEditorModules.main;
		setup_draggable_group(main.OO);
		modal = main.processDialog({
			title: main.msg('reorder-sprites-label').plain(),
			name: 'reorder',
			actions: [
				{ label: main.msg('dialog-button-close').plain(), flags: ['safe', 'close'] },
				{ label: main.msg('save-label').plain(), action: 'close', flags: ['primary'] }
			],
			content: formHtml,
			action: function (action) {
				if (action === 'close') {
					saveSpriteOrder();
				}
			},
			size: 'large'
		});
		myData.modal = modal;
	};
})(window.jQuery);