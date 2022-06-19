( function( window, mw, $ ) { 
	"use strict";
	
	const Menu = { 
		// Class names
		__menuClassMain: "menu",
		__menuItemClass: "menu-item",
		__menuListClass: "menu-list",
		__menuItemLinkClass: "menu-item-link",
		__menuHeaderClass: "menu-header",
		__menuContentClass: "menu-content",
		__menuActiveClass: "menu-active",
		__submenuClass: "menu-submenu",
		__submenuContentClass: "menu-submenu-content",
		__submenuListClass: "menu-submenu-list",
		__submenuItemClass: "menu-submenu-item",
		__submenuItemLinkClass: "menu-submenu-item-link",
		__submenuLevelClass: "menu-submenu-$level",
		__submenuLevelContentClass: "menu-submenu-$level-content",
		__submenuLevelListClass: "menu-submenu-$level-list",
		__submenuLevelItemClass: "menu-submenu-$level-item",
		__submenuLevelItemLinkClass: "menu-submenu-$level-item-link",
		// State properties
		menuAdded: false,
		// Menu item defaults
		__itemDefaults: Object.freeze( {
			name: null,
			title: null,
			link: null,
			click: null,
			submenu: [ ]
		} ),
		// Initializer
		init: function( $content ) { 
			if ( this.menuAdded ) return;
			this.parent = $content[ 0 ];
			
			this.menuElement = document.createElement( "nav" );
			this.menuElement.classList.add( this.__menuClassMain );
			this.parent.append( this.menuElement );
			
			this.menuHeader = document.createElement( "header" );
			this.menuHeader.classList.add( this.__menuHeaderClass );
			this.menuElement.append( this.menuHeader );
			this.generateHeader( );
			
			this.menuContent = document.createElement( "section" );
			this.menuContent.classList.add( this.__menuContentClass );
			this.menuElement.append( this.menuContent );
			
			this.menuItems = [ ];
			this.menuAdded = true;
			
			this.active = false;
			this.pos = { };
			
			this.initialzeEvent( );
		},
		initializeEvent: function( ) { 
			this.menuElement.addEventListener( 
				"contextmenu", 
				this.checkContextMenu.bind( this ),
				false
			);
			
			document.addEventListener( 
				"click", 
				this.checkClickEvent.bind( this ),
				false
			);
		},
		checkContextMenu: function( event ) { 
			if ( !event.ctrlKey ) return true;
			event.preventDefault( );
			
			const rect = this.parent.getBoundingClientRect( );
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			
			this.pos.x = x;
			this.pos.y = y;
			
			this.menuElement.style.left = this.pos.x + "px";
			this.menuElement.style.top = this.pos.y + "px";
			
			this.menuElement.classList.add( this.__menuActive );
			this.active = true;
		},
		checkClickEvent: function( event ) { 
			const isClickedOutside = !this.menuElement.contains( event.target );
			if ( !isClickedOutside ) return true;
			
			this.menuElement.classList.remove( this.__menuActive );
			this.active = false;
		},
		addItem: function( item ) { 
			if ( item.id && this.hasItemId( item.id ) ) 
				throw new Error( "There is already a menu item with the ID (" + id + ")!" );
			
			const menuItem = $.extend( 
				{ }, 
				this.__itemDefaults, 
				item 
			);
			
			menuItem.id = item.id;
			
			this.menuItems.push( menuItem );
			this.generateMenuItems( );
			return this;
		},
		findItemIndex: function( id ) { 
			return this.menuItems.findIndex( function( item ) { 
				return item.id === id;
			} );
		},
		hasItemId: function( id ) { return this.findItemIndex( id ) > -1; },
		removeItem: function( id ) { 
			if ( !this.hasItemId( id ) ) return this;
			const index = this.findItemIndex( id );
			this.menuItems.splice( index, 1 );
			return this;
		},
		generateMenuItems: function( ) { 
			this.menuListElement = document.createElement( "ul" );
			
			if ( this.menuContent.firstElementChild ) 
				this.menuContent.firstElementChild.replaceWith( this.menuListElement );
			else
				this.menuContent.appendChild( this.menuListElement );
			
			this.menuListElement.classList.add( this.__menuListClass );
			this.menuItems.forEach( this.generateMenuItem, this );
		},
		generateMenuItem: function( item ) { 
			
		}
	};
	
	const init = Menu.init.bind( Menu );
	mw.hook( "wikipage.content" ).add( init );
} )( window, mediaWiki, jQuery );