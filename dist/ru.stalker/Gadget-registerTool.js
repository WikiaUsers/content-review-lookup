// См. документацию на
// [[wikipedia:ru:ВП:РСК#Добавление_кнопок_на_панели_инструментов]]

( function () {

var toolsToAdd = {};
var addClassicToolbarToolsHooked = false;

window.registerTool = function ( tool ) {
	function moveProperties( tool, mode ) {
		function generalPropertyToParticular( property ) {
			if ( tool[ property ] && !tool[ mode ][ property ] ) {
				tool[ mode ][ property ] = tool[ property ];
			}
		}

		if ( tool[ mode ] ) {
			[ 'name', 'position', 'title', 'label', 'icon', 'callback', 'addCallback', 'filters' ]
				.forEach( function ( item ) {
					generalPropertyToParticular( item );
				} );
			return tool[ mode ];
		}
	}
	
	function sortTools( mode ) {
		return Object.keys( toolsToAdd ).sort().reduce( function ( result, key ) {
			if ( toolsToAdd[ key ][ mode ] ) {
				result.push( moveProperties( toolsToAdd[ key ], mode ) );
			}
			return result;
		}, [] );
	}

	function addClassicToolbarTools() {
		function addClassicToolbarTool( tool ) {
			var toolObj = {
				section: 'main',
				group: tool.group || 'insert',
				tools: {}
			};
			toolObj.tools[ tool.name ] = {
				label: tool.label,
				type: 'button',
				icon: tool.icon,
				filters: tool.filters || [],
				action: {
					type: 'callback',
					execute: function () {
						tool.callback();
					}
				}
			};
			$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', toolObj );
			$('.toolbar .tool[rel="' + tool.name + '"]')
				.addClass(tool.class || 'adapt-to-dark-theme')
				.css(tool.css || {'--adapt-to-dark-theme--invert': '100%'});
			if ( tool.addCallback ) {
				tool.addCallback();
			}

			// Для совместимости со скриптами, которые опираются на событие добавления иконки
			// Викификатора
			mw.hook( 'wikieditor.toolbar.' + tool.name ).fire();

			delete toolsToAdd[ tool.position ].classic;
		}

		var tools = sortTools( 'classic' );

		for ( var i = 0; i < tools.length; i++ ) {
			addClassicToolbarTool( tools[ i ] );
		}

		addClassicToolbarToolsHooked = false;
	}
	
	function addVeTool( tool ) {
		if ( !ve.init.mw.DesktopArticleTarget ) return;
		
		// Create and register a command
		function Command() {
			Command.parent.call( this, tool.name );
		}
		OO.inheritClass( Command, ve.ui.Command );

		// Forbid the command from being executed in the visual mode
		Command.prototype.isExecutable = function () {
			var surface = ve.init.target.getSurface();
			var mode = surface.getMode();
			return (
				surface &&
				tool.modes &&
				( tool.modes === mode || tool.modes.indexOf( mode ) !== -1 )
			);
		};

		Command.prototype.execute = function () {
			tool.callback();
			return true;
		};

		if ( ve.ui.wikitextCommandRegistry ) {
			ve.ui.wikitextCommandRegistry.register( new Command() );
		}

		// Create and register a tool
		function Tool() {
			Tool.parent.apply( this, arguments );
		}
		OO.inheritClass( Tool, ve.ui.Tool );

		Tool.static.name = tool.name;
		Tool.static.group = tool.group || 'gadgets';
		Tool.static.title = tool.title;
		Tool.static.icon = tool.name;
		Tool.static.commandName = tool.name;
		Tool.static.autoAddToCatchall = false;
		Tool.static.deactivateOnSelect = false;

		Tool.prototype.onUpdateState = function () {
			Tool.parent.prototype.onUpdateState.apply( this, arguments );
			this.setActive( false );
		};

		ve.ui.toolFactory.register( Tool );

		ve.init.mw.DesktopArticleTarget.static.actionGroups[ 1 ].include.push( tool.name );

		mw.util.addCSS(
			'.oo-ui-icon-' + tool.name + ' {' +
				'background-image: url(' + tool.icon + ');' +
			'}'
		);
		
		if ( tool.addCallback ) {
			tool.addCallback();
		}
	}

	function registerVeTools( addPlugin ) {
		function registerVeTool( tool ) {
			addPlugin( function () {
				return mw.loader.using( [
					'ext.visualEditor.core',
					'ext.visualEditor.mwwikitext',
					'ext.visualEditor.mwtransclusion'
				] ).then( function () {
					addVeTool( tool );
				} );
			} );

			delete toolsToAdd[ tool.position ].visual;
		}

		var tools = sortTools( 'visual' );

		for ( var i = 0; i < tools.length; i++ ) {
			registerVeTool( tools[ i ] );
		}
	}

	// So that in the case of index collisions gadgets don't override each other
	while ( toolsToAdd[ tool.position ] ) {
		tool.position++;
	}

	toolsToAdd[ tool.position ] = tool;

	if (
		tool.classic &&
		(
			[ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 &&
			(
				mw.user.options.get( 'visualeditor-newwikitext' ) != 1 ||
				// Switched off visual editor + switched on new wikitext mode + ?action=edit =
				// WikiEditor
				mw.user.options.get( 'visualeditor-betatempdisable' ) == 1
			) &&
			mw.user.options.get( 'usebetatoolbar' ) == 1
		) &&
		!addClassicToolbarToolsHooked
	) {
		$.when(
			mw.loader.using( [ 'ext.wikiEditor' ] ),
			$.ready
		).then( function () {
			if ( mw.config.get( 'wgServerName' ) === 'ru.wikipedia.org' ) {
				mw.hook( 'wikieditor.toolbar.gadgetsgroup' ).add( addClassicToolbarTools );
			} else {
				addClassicToolbarTools();
			}
		} );

		addClassicToolbarToolsHooked = true;
	}

	if (
		tool.visual &&
		(
			mw.config.get( 'wgIsArticle' ) ||
			[ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1
		)
	) {
		if ( tool.visual.addRightAway ) {
			// If a gadget is loaded as a VisualEditor plugin in the first place, for example in
			// [[MediaWiki:Common.js]]
			mw.loader.using( [
				'ext.visualEditor.core',
				'ext.visualEditor.mwwikitext',
				'ext.visualEditor.mwtransclusion'
			] ).then( function () {
				addVeTool( moveProperties( tool, 'visual' ) );
			} );
		} else {
 			mw.hook( 've.loadModules' ).add( function( addPlugin ) {
 				registerVeTools( addPlugin );
 			} );
		}
	}
};

}() );