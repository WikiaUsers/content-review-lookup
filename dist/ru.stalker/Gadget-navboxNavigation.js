/**
 * Navbox Navigation
 * 
 * Author: Serhio Magpie
 * Licenses: MIT, CC BY-SA
 * Source: https://ru.wikipedia.org/wiki/MediaWiki:Gadget-navboxNavigation.js
 */

// <nowiki>

( function () {
	var _config = {
			name: 'MediaWiki:Gadget-navboxNavigation.js',
			wikilink: '[[MediaWiki:Gadget-navboxNavigation.js]]',
			allowNamespaces: [ 0 ],
			excludeTemplates: [],
			namespace: mw.config.get( 'wgNamespaceNumber' ),
			pageName: mw.config.get( 'wgPageName' ),
			userLanguage: mw.config.get( 'wgUserLanguage' ),
			temlateNamespace: 'Шаблон',
		},
		_strings = {
			ru : {
				'navboxNavigation-load-error' : '$1: Не удалось загрузить содержимое шаблона «$2».',
				'navboxNavigation-title-error' : '$1: Имя навигационного шаблона задано в неправильном формате: «$2».',
				'navboxNavigation-tooltips': 'Нажмите на ссылку, чтобы отобразить навигационный шаблон на этой странице.'
			},
			en: {
				'navboxNavigation-load-error' : '$1: Failed to load the content of the "$2" template.',
				'navboxNavigation-title-error' : '$1: Navbox template name is invalid: «$2».',
				'navboxNavigation-tooltips': 'Click the link to display navbox on this page.'
			}
		},
		_pageName,
		_templateTitleRegExp,
		_navboxNodes = [],
		_navboxItems = [],
		_linkNodes = [],
		_linkItems = [];

	/******* UTILS *******/
	
	$.fn.scrollView = function () {
		return this.each( function () {
			$( 'html, body' ).animate( {
				scrollTop: $( this ).offset().top - 50
			}, 100 );
		} );
	};
	
	function isEmpty( str ) {
		return typeof str === 'undefined' || str.length === 0;
	}

	function inDOM( $node ) {
		var node = $node.get( 0 );
		return $.contains( document.documentElement, node );
	}

	function isNavbox( $node ) {
		var data = $node.data( 'navboxnavigation' );
		return !isEmpty(data) || $node.hasClass( 'navbox' );
	}
	
	function setSelfLink( $node ) {
		return $node
			.removeAttr( 'href title' )
			.addClass( [ 'mw-selflink', 'selflink' ] );
	}
	
	function getNavboxByPageName( pageName ) {
		var navbox;
		$( _navboxItems ).each( function () {
			if ( this.pageName === pageName ) {
				navbox = this;
				return false;
			}
		} );
		return navbox;
	}

	/******* NAVBOX *******/

	function Navbox( $node, navbox, mode ) {
		this.$node = $node;
		this.navbox = navbox;
		this.mode = mode;
		this.name = $node.data( 'name' );
		this.navigation = $node.data( 'navboxnavigation' );
		this.behavior = $node.data( 'navboxnavigation-behavior' );
		this.childs = [];
		this.links = [];

		if ( !isEmpty( this.name ) ) {
			try {
				this.pageName = new mw.Title( this.name, 10 ).getPrefixedText();
			} catch (e) {
				console.warn(
					mw.msg( 'navboxNavigation-title-error', _config.wikilink, this.name )
				);
			}
		}

		if ( this.mode === 'strict' ) {
			this.hasNavigation = this.navigation !== 'undefined' && this.navigation === 1;
		} else {
			this.hasNavigation = !( typeof this.navigation !== 'undefined' && this.navigation === 0 );
		}

		if ( [ 'replace', 'refill' ].indexOf( this.behavior ) === -1 ) {
			this.behavior = 'replace';
		}

		if ( 
			!this.hasNavigation ||
			( this.navbox && this.navbox.isExcluded ) ||
			( this.pageName && _config.excludeTemplates.indexOf( this.pageName ) !== -1 )
		) {
			this.isExcluded = true;
		}

		this.getChilds();
		this.getLinks();

		_navboxItems.push( this );
	}

	Navbox.prototype.setPageName = function ( pageName ) {
		if ( !isEmpty( pageName ) ) {
			this.pageName = pageName;
		}
	};

	Navbox.prototype.getChilds = function () {
		var that = this,
			$nodes;
		if ( that.mode === 'strict') {
			$nodes = that.$node.find( '[data-navboxnavigation="1"]' );
		} else {
			$nodes = that.$node.find( '[data-navboxnavigation], .navbox' );
		}
		$nodes.each( function ( ) {
			var $node = $( this );
			if ( _navboxNodes.indexOf( this ) === -1 ) {
				_navboxNodes.push(  this );
				that.childs.push( new Navbox( $node, that, that.mode ) );
			}
		} );
	};

	Navbox.prototype.getLinks = function () {
		var that = this,
			$links = that.$node.find( 'a[title]' ),
			$include = that.$node.find( '[data-navboxnavigation-link="1"] a' ),
			$exclude = that.$node.find( '[data-navboxnavigation-link="0"] a' );
		$links.each( function () {
			var $node = $( this ),
				title = $node.attr( 'title' ),
				isIncluded = $.inArray( this, $include ) !== -1,
				isExcluded = $.inArray( this, $exclude ) !== -1;
				
			// Mark current page selflinks in the navbox
			if ( !isIncluded && !isEmpty( title ) && title === _pageName ) {
				setSelfLink( $node );
			}
			
			if ( 
				_linkNodes.indexOf( this ) === -1 &&
				( isIncluded || _templateTitleRegExp.test( title ) )
			) {
				_linkNodes.push( this );
				that.links.push(
					new Link( $node, that, that.mode, isIncluded, isExcluded )
				);
			}
		} );
	};

	Navbox.prototype.expand = function () {
		var that = this;
		mw.hook( 'wikipage.collapsibleContent' ).add( function () {
			that.$node.find( '.navbox-inner > tbody > tr > .navbox-title .mw-collapsible-toggle-collapsed' ).click();
		} );
	};

	Navbox.prototype.insertBefore = function ( navbox ) {
		this.$node.insertBefore( navbox.$node );
	};

	Navbox.prototype.detach = function () {
		this.$node.detach();
	};

	Navbox.prototype.isInDOM = function () {
		return inDOM( this.$node );
	};

	/******* LINK *******/

	function Link( $node, navbox, mode, isIncluded, isExcluded ) {
		this.$node = $node;
		this.navbox = navbox;
		this.mode = mode;
		this.isLoading = false;
		this.isIncluded = isIncluded;
		this.isExcluded = isExcluded;
		this.pageName = $node.attr( 'title' );

		if ( this.$node.hasClass( 'new' ) ) {
			this.isNew = true;
			this.isExcluded = true;
		}

		if ( 
			this.$node.hasClass( 'mw-selflink selflink' ) ||
			this.pageName === this.navbox.pageName
		) {
			this.isSelf = true;
			this.navbox.setPageName( this.pageName );
			setSelfLink( this.$node );
		} else {
			this.$node.wrapInner( "<span title='" + mw.msg( 'navboxNavigation-tooltips' ) + "'></span>" ); 
		}

		if ( !this.isExcluded && !this.navbox.isExcluded ) {
			this.$node
				.addClass( 'navboxNavigation-link' )
				.on( 'click', this.onClick.bind( this ) )
				.on( 'keypress', this.onClick.bind( this ) );
		}
		_linkItems.push( this );
	}

	Link.prototype.getPage = function () {
		// Use cached navbox if exists, but prevent populating navboxes that already in dom
		var navbox = getNavboxByPageName( this.pageName );
		if ( navbox && !navbox.isInDOM() ) {
			this.replaceNavboxContent( navbox );
		} else if ( navbox && navbox.isInDOM() ) {
			navbox.expand();
			navbox.$node.scrollView();
		} else if ( !this.isLoading ) {
			this.request();
		}
	};

	Link.prototype.request = function () {
		this.isLoading = true;
		this.showLoader();
		
		var api = new mw.Api(),
			params = {
				action: 'parse',
				prop: 'text',
				title: this.pageName,
				text: '{{' + this.pageName + '}}',
				contentmodel: 'wikitext',
				redirects: true
			};
		return api
			.get( params )
			.then( this.onResponse.bind( this ) )
			.fail( this.onError.bind( this ) );
	};

	Link.prototype.replaceNavboxContent = function ( navbox ) {
		var $container,
			that = this;
		
		if ( navbox ) {
			navbox.insertBefore( that.navbox );
			navbox.expand();
			navbox.$node.scrollView();
		} else {
			if ( that.navbox.behavior === 'refill' ) {
				$container = that.navbox.$node
					.clone()
					.empty()
					.append( that.$templateHTML )
					.insertBefore( that.navbox.$node );
				mw.hook( 'wikipage.content' ).fire( $container );
			} else {
				that.$templateHTML.each( function () {
					$container = $( this );
					$container.insertBefore( that.navbox.$node );
					mw.hook( 'wikipage.content' ).fire( $container );
				} );
			}
		}

		that.navbox.detach();
	};

	Link.prototype.onClick = function ( event ) {
		if ( event.type === 'keypress' && [ 'Enter', 'Space' ].indexOf( event.code ) === -1 ) {
			return;
		}
		event.preventDefault();
		if ( !this.isSelf ) {
			this.getPage();
		}
	};

	Link.prototype.onResponse = function ( data ) {
		this.isLoading = false;
		this.hideLoader();
		if ( !data ) {
			this.notifyError();
			return;
		}

		this.pageContent = data.parse.text['*'];
		this.$pageHTML = $.parseHTML( this.pageContent );
		this.$templateHTML = $( this.$pageHTML ).children();

		this.replaceNavboxContent();
	};
	
	Link.prototype.onError = function ( data ) {
		this.isLoading = false;
		this.hideLoader();
		this.notifyError();
	};
	
	Link.prototype.notifyError = function () {
		new BannerNotification(
			mw.msg( 'navboxNavigation-load-error', _config.wikilink, this.pageName ),
			'error',
			undefined,
			5000
		).show();
	};
	
	Link.prototype.showLoader = function () {
		this.$node.addClass( 'navboxNavigation-link--pending' );
	};
	
	Link.prototype.hideLoader = function () {
		this.$node.removeClass( 'navboxNavigation-link--pending' );
	};

	/******* COLLECTOR *******/

	function Collector( $node, parent, mode ) {
		this.$node = $node;
		this.parent = parent;
		this.mode = mode;
		this.childs = [];
		this.links = [];

		Navbox.prototype.getChilds.call( this );
	}

	/******* MAIN *******/
	
	function prepare() {
		// Set interface strings
		if ( _config.userLanguage === 'ru' ) {
			mw.messages.set( _strings.ru );
		} else {
			mw.messages.set( _strings.en );
		}
		
		_pageName = new mw.Title( _config.pageName ).getPrefixedText();
		_templateTitleRegExp = new RegExp( '^' + _config.temlateNamespace + ':' );
	}

	function init( $content ) {
		if ( !$content ) {
			return;
		}
		if ( _config.allowNamespaces.indexOf( _config.namespace ) !== -1 ) {
			collect( $content, 'all' );
		} else {
			collect( $content, 'strict' );
		}
	}

	function collect( $content, mode ) {
		if ( isNavbox( $content ) ) {
			var navbox = new Navbox( $content, null, mode );
			navbox.expand();
			navbox.$node.scrollView();
		} else {
			new Collector( $content, null, mode );
		}
	}

	/******* INIT *******/
	
	prepare();
	mw.hook( 'wikipage.content' ).add( init );
} )();

// </nowiki>