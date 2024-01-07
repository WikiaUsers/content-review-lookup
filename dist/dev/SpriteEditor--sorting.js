;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.sorting && window.SpriteEditorModules.sorting.loaded) return;
	window.SpriteEditorModules.sorting = {loaded: true};
	var myData = window.SpriteEditorModules.sorting;
	var modal = {};
	myData.modal = modal;
	var shared;
	var Demo = {};
	var oldOrder;
	var newOrder;
	var helper = window.SpriteEditorModules.helper;
	myData.requestChanges = function() {};
    function updateRoot(order) {
        var tmp = shared.root.children[0];
        var a = document.createElement("span");
        shared.root.prepend(a);
        shared.root.insertBefore(tmp, a);
        for (var i = 0; i < order.length; i++) {
            shared.root.insertBefore(order[i], a);
        }
        shared.root.removeChild(a);
    }
	myData.setSharedData = function(d) {
		shared = d;
	};
	myData.setSections = function(order) {
        oldOrder = shared.root.querySelectorAll('div.spritedoc-section');
		var ele = document.getElementsByClassName("spriteedit-sorting")[0];
		ele.innerHTML = "";
		var items = [];
		for (var i = 0; i < order.length; i++) {
			items[items.length] = new Demo.DraggableItemWidget( {
				data: 'item' + i,
				icon: 'draggable',
				label: order[i].querySelector(".mw-headline").textContent
			} );
			items[items.length - 1].$element.get(0).dataset.sectionId = order[i].dataset.sectionId;
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

	function moveSectionElements() {
		var tmp = shared.root.children[0];
		var a = document.createElement("span");
		shared.root.prepend(a);
		var eleList = document.querySelectorAll('div.spriteedit-sorting .oo-ui-draggableElement');
		shared.root.insertBefore(tmp, a);
		for (var i = 0; i < eleList.length; i++) {
			shared.root.insertBefore(document.querySelector('div[data-section-id="' + eleList[i].dataset.sectionId + '"]'), a);
		}
		shared.root.removeChild(a);
	}
	function setup_draggable_widget(OO) {
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
	}
	// create window
	myData.createWindow = function() {
		var msg = window.SpriteEditorModules.main.msg;
		setup_draggable_widget(window.SpriteEditorModules.main.OO);
		modal = helper.processDialog({
			title: msg("sort-section-label").plain(),
			name: "sorting",
			actions: [
				{ label: msg("dialog-button-close").plain(), modes: 'edit', flags: ['safe', 'close'] },
				{ label: msg("save-label").plain(), action: 'close', flags: ['primary'] }
			],
			content: formHtml,
			action: function (action) {
				if (action === 'close') {
                    moveSectionElements();
                    newOrder = shared.root.querySelectorAll('div.spritedoc-section');
                    const _oldOrder = oldOrder;
                    const _newOrder = newOrder;
					shared.addHistory([
						function() {
							updateRoot(_oldOrder);
						},
						function() {
							updateRoot(_newOrder);
						}
					]);
				}
			},
			size: "medium"
		});
		myData.modal = modal;
	};
})(window.jQuery, window.mediaWiki);