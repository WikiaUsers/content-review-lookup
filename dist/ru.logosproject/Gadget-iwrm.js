/* <nowiki>
 * IWRM.js
 * See [[Проект:Check Wikipedia/Замена прямых интервики-ссылок]]
 * Local and global variables are lowerCamelCase
 * Selectors and DOM nodes are CamelCase
 * Local variables start with _
 */
$( function() {
	if ( mw.config.get( 'wgPageName' ) !== 'Служебная:Пустая_страница' ) {
		return false;
	}
	if ( !window.IWRM ) window.IWRM = {};

	/*
	 * Global settings and variables
	 */
	IWRM.prefs = {
		name: 'IWRM',
		hash: '#/iwrm/',
		loaded: 'is-loaded',

		limit: 50,

		summary: '[[ПРО:CW|CheckWiki:]] замена прямых интервики-ссылок'
	}

	// API requests
	IWRM.api = {};

	// Current article data
	IWRM.data = {
		index: 0,
		title: '',

		code: {
			modified: '',
			old: ''
		}
	}

	// Current article list
	IWRM.list = [];

	// Current search offset
	IWRM.offset = 0;

	// Storage for referenced UI elements
	IWRM.ui = {};

	/*
	 * Local settings and variables
	 */
	var _c = mw.config.get( [
		'wgCommentCodePointLimit',
		'wgContentLanguage',
		'wgDBname',
		'wgTitle',
		'wgUserGroups',
		'wgUserName'
	] );

	// Is user allowed to make edits
	var _isAllowed = (
		_c.wgUserName &&
		(
			_c.wgUserGroups.indexOf( 'autoeditor' ) > -1 ||
			_c.wgUserGroups.indexOf( 'editor' ) > -1 ||
			_c.wgUserGroups.indexOf( 'sysop' ) > -1
		)
	);

	// API handler container
	var _api;

	// Counter for successful savings
	var _counter = 0;

	// Dependencies
	var _deps = [
		'ext.gadget.wikificator',
		'mediawiki.action.view.postEdit',
		'mediawiki.api',
		'mediawiki.ForeignApi',
		'mediawiki.diff.styles',
		'mediawiki.widgets.visibleLengthLimit',
		'oojs',
		'oojs-ui'
	];

	// OOUI dropdown-friendly data
	var _dropdownData = [];

	// Counter for displayed inputs
	var _inputCounter = 0;

	// Normalised prefixes
	var _normalisedPrefixes = {
		'w': 'en',

		'be-x-old': 'be-tarask',
		'cz': 'cs',
		'jp': 'ja',
		'nan': 'zh-min-nan',
		'nb': 'no',
		'yue': 'zh-yue',
		'zh-tw': 'zh'
	};

	// Skipped interwiki links
	var _otherProjects = [
		'b', 'wikibooks',
		'c', 'commons',
		'd', 'wikidata',
		'm', 'meta',
		'mw',
		'n', 'wikinews',
		'q', 'wikiquote',
		's', 'wikisource',
		'species', 'wikispecies',
		'v', 'wikiversity',
		'voy', 'wikivoyage',
		'wikt', 'wiktionary',
		'wmf', 'wikimedia',

		'category', 'file', 'image', 'media', 'wikipedia',

		'betawiki', 'doi', 'translatewiki'
	];

	// Expression for interwiki links: [[$1:$2]]
	var _regularExp = /\[{2}:?([a-zA-Z-]+):([^\[\]\|\n]+)(?:\|([^\[\]\|\n]*))?]{2}/g;

	// Expression for interwiki links in language: [[$1]] ({{lang-$2|$3}}$4
	var _regularExpLangs = /\[{2}([^\[\]\n]+?)\]{2} \(\{{2}[Ll]ang-([a-zA-Z-]+)\|(\[{2}:?[^\]]*?\]{2})\}{2}(\)*)/g;

	// Search auto update limit
	var _searchAutoUpdate = 10;

	// Search API high limit
	var _searchHighLimit = 500;

	// Search request for interwiki links
	var _searchRequest = 'prefer-recent:1,7 insource:/\\[{2}:[a-z-]{2,}:/';

	// Default link without/with {{lang}} syntax
	var _link = '[[$1$2]]';
	var _linkIsLang = '[[$1$2]] ({{lang-$3|$4}}$5';

	// Default template without/with {{lang}} syntax
	var _tmpl = '{{iw||$3|$1|$2}}';
	var _tmplIsLang = '{{iw|$4|$3|$1|$2}} ({{lang-$5|$6}}$7';

	// Default link and template syntax
	var _linkEnd = '|]]';
	var _tmplStart = '{{iw||';

	// UI functions
	var _ui = {};
	_ui.fn = {};

	// Most used selectors
	var _ContentText = $( '#mw-content-text' );
	var _FirstHeading = $( '#firstHeading' );
	var _SiteSub = $( '#siteSub' );

	// Locale
	var _locale = {
		title: 'Замена $1прямых интервики-ссылок',
		titleOne: 'Замена $1прямой интервики-ссылки',
		errors: {
			title: 'Скрипт мог перестать работать',
			text: 'Произошла ошибка. ',
			unidentified: 'Запрос $1 не был выполнен по неизвестной причине.',

			notAllowed: 'Чтобы не распатрулировать статьи, скрипт можно использовать только автопатрулируемым, патрулирующим и администраторам.',

			noArticle: 'Cтатья не найдена. Вероятно, до неё добрались удалисты, переименисты или коммунисты.',
			noLinks: 'Не обнаружено прямых интервики-ссылок. Пропустите страницу.',
			unchangedCode: 'Вы не заполнили первый параметр в одном из шаблонов или не заполнили текст ссылки. Изменения не были записаны, проверьте все поля ввода.',

			noNetwork: 'Запрос $1 не дошёл из-за неполадок с сетью. Проверьте подключение к Интернету.',
			noText: 'В запросе $1 не был передан итоговый текст.',
			noTitle: 'В запросе $1 не был передан заголовок необходимой статьи.',

			articleExists: '$1: $2страница уже существует$3.',
			badInterwiki: '<strong>API Викиданных не может найти раздел Википедии ([[$1:…]]) для одной из ссылок.</strong> Она не будет отредактирована.'
		},
		requests: {
			init: 'по загрузке модулей',

			getFullText: 'для получения текста статьи',
			getRateLimits: 'для выяснения максимального количества доступных вам данных',
			getSearchData: 'для получения списка статей для обработки',
			loadDiff: 'для получения разницы версий',
			submitChanges: 'для записи изменений'
		},

		loading: 'Поиск займёт некоторое время, но это того стоит.',
		loadingTitle: '…',

		loadMore: 'Загрузить ещё $1',
		nearbyPage: {
			previous: 'Предыдущая',
			next: 'Следующая'
		},
		randomPage: 'Случайная статья',

		notice: {
			editSection: 'Править статью вручную (откроется в новой вкладке)',
			viewArticle: 'Просмотр статьи (откроется в новой вкладке)',

			interwiki: 'Интервики-ссылка (откроется в новой вкладке)',
			thiswiki: 'Статья в этом разделе (откроется в новой вкладке)',
			wikidata: 'Элемент Викиданных (откроется в новой вкладке)',

			thiswikiArticle: 'есть статья'
		},
		editParagraph: 'Править весь абзац',
		editSection: 'править вручную',
		viewArticle: 'просмотр',

		summary: 'Описание изменений',
		warrant: 'Вы сами отвечаете за правки, сделанные с помощью скрипта. <br><small>Удалите всё содержимое нужного поля ввода, чтобы не обрабатывать связанную с ним ссылку.</small>',
		submit: 'Записать страницу',
		skipPage: 'Пропустить страницу'
	}

	/*
	 * API requests
	 */

	// Check sitelinks
	IWRM.api.checkSitelinks = function( lang, title ) {
		var foreignApi = new mw.ForeignApi( 'https://www.wikidata.org/w/api.php' );

		return foreignApi.get( {
			action: 'wbgetentities',
			sites: lang + 'wiki',
			sitefilter: _c.wgDBname,
			titles: title,
			props: 'sitelinks',
			normalize: true,
			formatversion: 2
		} );
	}

	// Get full article text
	IWRM.api.getFullText = function( title ) {
		if ( !title ) {
			_ui.fn.showError( 'script', null, {
				replace: _locale.requests.getFullText,
				text: _locale.errors.noTitle
			} );
			return false;
		}

		// Success
		function resolvedWithSuccess( data ) {
			var data_txt = data && data.query && data.query.pages && data.query.pages[0] && data.query.pages[0].revisions && data.query.pages[0].revisions[0] && data.query.pages[0].revisions[0].content;

			if ( data_txt ) {
				IWRM.data.code.old = data_txt;

				// Modify the text prematurely to show the changes
				IWRM.data.code.modified = replaceLinks( data_txt, function( obj, text ) {
					var modified = getTemplate( obj );

					return text.replace( obj.fullText, modified );
				} );
				return;
			}

			var isMissing = data && data.query && data.query.pages && data.query.pages[0] && data.query.pages[0].missing;
			if ( isMissing ) {
				_ui.fn.showError( 'missingtitle', null );
			}
		}

		// Failure
		function resolvedWithFailure( error, data ) {
			_ui.fn.showError( error, data, { replace: _locale.requests.getFullText } );
		}

		// Return a promise
		return _api.get( {
			action: 'query',
			titles: title,
			prop: 'revisions',
			rvprop: 'content',
			formatversion: 2
		} ).done( resolvedWithSuccess ).fail( resolvedWithFailure );
	}

	// Send a request to CheckWiki server
	IWRM.api.submitCheckWiki = function( title ) {
		return $.get( 'https://tools.wmflabs.org/checkwiki/cgi-bin/checkwiki.cgi', {
			project: _c.wgDBname,
			view: 'detail',
			id: 68,
			title: title
		} );
	}

	// Get rate limits for the account
	IWRM.api.getRateLimits = function() {
		// Success
		function resolvedWithSuccess( data ) {
			var data_rl = data && data.query && data.query.userinfo && data.query.userinfo.ratelimits;

			if ( data_rl ) {
				var limitsList = Object.keys( data_rl );
				if ( limitsList.length === 0 ) {
					IWRM.prefs.limit = _searchHighLimit;
				}
			}
		}

		// Failure
		function resolvedWithFailure( error, data ) {
			_ui.fn.showError( error, data, { replace: _locale.requests.getRateLimits } );
		}

		// Return a promise
		return _api.get( {
			action: 'query',
			meta: 'userinfo',
			uiprop: 'ratelimits',
			formatversion: 2
		} ).done( resolvedWithSuccess ).fail( resolvedWithFailure );
	}

	// Get search request data
	IWRM.api.getSearchData = function( offset ) {
		if ( !offset ) {
			offset = 0;
		}

		// Success
		function resolvedWithSuccess( data ) {
			var data_sr = data && data.query && data.query.search;

			if ( data_sr ) {
				for ( var i = 0; i < data_sr.length; i++ ) {
					IWRM.list.push( data_sr[ i ].title );
				}
			}
		}

		// Failure
		function resolvedWithFailure( error, data ) {
			_ui.fn.showError( error, data, { replace: _locale.requests.getSearchData } );
		}

		// Return a promise
		return _api.get( {
			action: 'query',
			list: 'search',
			srprop: '',
			srsearch: _searchRequest,
			sroffset: offset,
			srlimit: IWRM.prefs.limit,
			formatversion: 2
		} ).done( resolvedWithSuccess ).fail( resolvedWithFailure );
	}

	// Request diff with changes
	IWRM.api.loadDiff = function( title ) {
		if ( !title ) {
			_ui.fn.showError( 'script', null, {
				replace: _locale.requests.loadDiff,
				text: _locale.errors.noTitle
			} );
			return false;
		}

		// Failure
		function resolvedWithFailure( error, data ) {
			_ui.fn.showError( error, data, { replace: _locale.requests.loadDiff } );
		}

		// Return a promise
		return _api.post( {
			action: 'compare',
			fromtitle: title,
			totext: IWRM.data.code.modified,
			formatversion: 2
		} ).fail( resolvedWithFailure );
	}

	// Submit changes
	IWRM.api.submitChanges = function( modified, title, summary ) {
		if ( !title ) {
			_ui.fn.showError( 'script', null, {
				replace: _locale.requests.submitChanges,
				text: _locale.errors.noTitle
			} );
			return false;
		}

		if ( !modified ) {
			_ui.fn.showError( 'script', null, {
				replace: _locale.requests.submitChanges,
				text: _locale.errors.noText
			} );
		}

		// Ensure that summary is present
		if ( !summary ) {
			summary = '';
		}

		// Failure
		function resolvedWithFailure( error, data ) {
			_ui.fn.showError( error, data, { replace: _locale.requests.submitChanges } );
		}

		// Return a promise
		return _api.postWithEditToken( {
			action: 'edit',
			title: title,
			summary: summary,
			minor: true,
			text: modified,
			tags: IWRM.prefs.name.toLowerCase(),
			formatversion: 2
		} ).fail( resolvedWithFailure );
	}

	/*
	 * Local functions
	 */

	// Get modified link text
	function getLink( obj, title ) {
		var text = obj.tmpl.text;
		if ( !text ) {
			text = '';
			
			// Use link in text if there is no shown text but titles differ
			if ( obj.tmpl.title && obj.tmpl.title.toLowerCase() !== title.toLowerCase() ) {
				text = obj.tmpl.title;
			}
		}

		// Add missing pipe to text if there is any
		if ( text ) {
			text = '|' + text;
		}

		var result = ( obj.lang ? _linkIsLang : _link );
		result = result.replace( '$1', title ).replace( '$2', text );

		if ( obj.lang ) {
			// Have original title as text if there is none
			var langText = obj.lang.text;
			if ( !langText ) {
				langText = obj.tmpl.origTitle;
			}

			result = result.replace(
				'$3', obj.lang.lang
			).replace(
				'$4', langText.split( '_' ).join( ' ' )
			).replace(
				'$5', obj.lang.after
			);
		}

		return result;
	}

	// Get modified template text
	function getTemplate( obj ) {
		var result = ( obj.lang ? _tmplIsLang : _tmpl );
		result = result.replace(
			'$1', obj.tmpl.lang
		).replace(
			'$2', obj.tmpl.origTitle.split( '_' ).join( ' ' )
		).replace(
			'$3', obj.tmpl.text.split( '_' ).join( ' ' )
		);

		if ( obj.lang ) {
			result = result.replace(
				'$4', obj.tmpl.title.split( '_' ).join( ' ' )
			).replace(
				'$5', obj.lang.lang
			).replace(
				'$6', obj.lang.text.split( '_' ).join( ' ' )
			).replace(
				'$7', obj.lang.after
			);
		}

		return result;
	}

	// Check if OOUI element exists
	function ifUIElementExists( el, does, doesnt ) {
		if ( el !== undefined ) {
			return ( does !== undefined ? does( el ) : true );
		}

		return ( doesnt !== undefined ? doesnt() : false );
	}

	// Return a class name that uses a prefix
	function mainClass( cl, before ) {
		before = ( before ? before : '' );
		var prefix = IWRM.prefs.name.toLowerCase();
		if ( cl ) {
			return before + prefix + '-' + cl;
		}

		return before + prefix;
	}

	// Replace all links to templates
	function replaceLinks( text, callback ) {
		if ( !text ) {
			return false;
		}

		// Bad interwiki links
		var badPrefixes = Object.keys( _normalisedPrefixes );

		// Replace links with {{lang}} template around them
		_regularExpLangs.lastIndex = 0;
		var match = _regularExpLangs.exec( text );
		while ( match !== null ) {
			var link = ( match[1] ? match[1].split( '|' ) : [ '' ] );
			var langLang = match[2].toLowerCase();
			var langText = ( match[3] ? match[3] : '' );
			var after = ( match[4] ? match[4] : '' );

			_regularExp.lastIndex = 0;
			var textMatch = _regularExp.exec( langText );
			if ( textMatch !== null ) {
				var lang = textMatch[1].toLowerCase();
				var title = textMatch[2];
				var shownText = ( textMatch[3] ? textMatch[3] : '' );

				// Skip other projects
				if ( lang && _otherProjects.indexOf( lang ) > -1 ) {
					match = _regularExpLangs.exec( text );
					continue;
				}

				// Trim data
				lang = lang.trim();
				title = title.trim();
				shownText = shownText.trim();

				// Normalise prefixes
				if ( badPrefixes.indexOf( lang ) > -1 ) {
					lang = _normalisedPrefixes[ lang ];
				}

				// Run external function and proceed
				text = callback( {
					fullText: match[0],
					lang: {
						after: after,
						lang: langLang,
						text: shownText
					},
					tmpl: {
						lang: lang,
						origTitle: title,
						title: link[0],
						text: ( link[1] ? link[1] : '' )
					}
				}, text );
			}

			match = _regularExpLangs.exec( text );
		}

		// Replace regular links afterwards
		_regularExp.lastIndex = 0;
		match = _regularExp.exec( text );
		while ( match !== null ) {
			var lang = match[1].toLowerCase();
			var title = match[2];
			var shownText = ( match[3] ? match[3] : '' );

			// Skip other projects
			if ( lang && _otherProjects.indexOf( lang ) > -1 ) {
				match = _regularExp.exec( text );
				continue;
			}

			// Trim data
			lang = lang.trim();
			title = title.trim();
			shownText = shownText.trim();

			// Normalise prefixes
			if ( badPrefixes.indexOf( lang ) > -1 ) {
				lang = _normalisedPrefixes[ lang ];
			}

			// Run external function and proceed
			text = callback( {
				fullText: match[0],
				tmpl: {
					lang: lang,
					origTitle: title,
					text: shownText
				}
			}, text );
			match = _regularExp.exec( text );
		}

		return text;
	}

	// Set OOUI dropdown-friendly data
	function setDropdownData( list, isFirst ) {
		if ( !isFirst ) {
			isFirst = false;
		}
		var data = [];

		for ( var i = 0; i < list.length; i++ ) {
			if ( isFirst && i === 0 ) {
				IWRM.data.title = list[ 0 ];
				IWRM.data.index = 0;
			}

			data.push( {
				data: list[ i ]
			} );
		}

		return data;
	}

	/*
	 * Front-end
	 */

	// Diff area
	_ui.Diff = function() {
		var $Container = $( mainClass( 'diff', '.' ) );
		var $DiffBar = new OO.ui.ProgressBarWidget( {
			progress: false
		} );

		// Render a progress bar
		$Container.removeClass( IWRM.prefs.loaded );
		$Container.html( $DiffBar.$element );

		// HTML parts for diff layout
		var diffOpen = '<table class="diff"><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content">';
		var diffClose = '</table>';

		var title = IWRM.data.title;
		return IWRM.api.getFullText( title ).then( function() {
			IWRM.api.loadDiff( title ).done( function( data ) {
				var Diff = data && data.compare && data.compare.body;

				// Show an error if diff is empty
				if ( !Diff ) {
					var $ErrorText = $( '<div>' ).addClass( mainClass( 'error' ) + ' error' ).text( _locale.errors.noLinks );
					$Container.html( $ErrorText );

					// Remove progress bar and show the message
					$DiffBar.$element.remove();
					$Container.addClass( IWRM.prefs.loaded );

					// Check buttons on validity
					_ui.fn.checkBtns();

					// Enable action buttons
					_ui.fn.disableActions( false );
					return;
				}

				Diff = diffOpen + Diff + diffClose;
				$Container.append( Diff );

				_ui.EditingInterface( $Container, $DiffBar );
				IWRM.data.code.modified = '';
			} );
		} );
	}

	// Main dropdown
	_ui.Dropdown = function() {
		_dropdownData = setDropdownData( IWRM.list, true );
		_FirstHeading.find( 'span' ).text( IWRM.data.title );
		_ui.EditSection( IWRM.data.title );
		_ui.SiteSub();

		// Create the dropdown
		var Dropdown = new OO.ui.DropdownInputWidget( {
			disabled: true,
			options: _dropdownData
		} );

		// Change event callback
		function onDropdownChange( value ) {
			// Disable action buttons
			_ui.fn.disableActions( true );

			// Modify the title
			var oldTitle = IWRM.data.title;
			IWRM.data.title = value;

			if ( IWRM.data.title !== oldTitle ) {
				var title = IWRM.data.title;

				// Update counter
				var Counter = _FirstHeading.find( mainClass( 'counter', '.' ) );
				if ( Counter.data( 'count' ) !== _counter ) {
					if ( Counter.hasClass( 'is-zero' ) && _counter !== 0 ) {
						Counter.removeClass( 'is-zero' );
						Counter.text( '−' + _counter );
					}

					Counter.data( 'count', _counter );
					if ( _counter !== 0 ) {
						Counter.text( '−' + _counter );
					}

					if ( _counter > _searchAutoUpdate ) {
						Counter.addClass( 'is-big' );
					}
				}

				// Update index
				IWRM.data.index = IWRM.list.indexOf( title );

				// Update interface
				_FirstHeading.find( 'span' ).text( title );
				_ui.EditSection( title );
				_ui.SiteSub();

				// Change summary back to default
				ifUIElementExists(
					IWRM.ui.Summary,
					function( el ) {
						el.setValue( IWRM.prefs.summary );
					}
				);

				// Render new diff
				_ui.Diff().then( function() {
					// Load more data if needed
					if ( _searchAutoUpdate !== -1 && IWRM.list.length < _searchAutoUpdate + 1 ) {
						_ui.fn.getMoreData();
					}
				} );
			}
		}

		// Set event listeners
		Dropdown.on( 'change', onDropdownChange );

		return Dropdown;
	}

	// Editing interface
	_ui.EditingInterface = function( $Container, $Bar ) {
		_inputCounter = 0;
		var $ChangedLines = $Container.find( '.diff-deletedline' );

		$ChangedLines.each( function( index, el ) {
			_ui.fn.modifyLine( index, el, $ChangedLines.length, $Container, $Bar );
		} );
	}

	// Edit section link
	_ui.EditSection = function( title ) {
		var Element = $( '.mw-editsection' );
		var Html = '<span class="mw-editsection-bracket">[</span>' +
			'<a href="/wiki/$0" title="$1" target="_blank">$2</a>' +
			'<span style="margin:0 0.25em;">|</span>' +
			'<a href="/wiki/$0?action=edit" title="$3" target="_blank">$4</a>' +
			'<span class="mw-editsection-bracket">]</span>';

		var htmlOpen = '<span class="mw-editsection mw-content-ltr" style="float: right;">';
		var htmlClose = '</span>';

		// Do the replacements
		Html = Html.replace( '$1', _locale.notice.viewArticle ).replace( '$2', _locale.viewArticle ).replace( '$3', _locale.notice.editSection ).replace( '$4', _locale.editSection ).replace( /\$0/g, title.split( ' ' ).join( '_' ) );

		// Render the result
		if ( Element.length ) {
			Element.html( Html );
			return;
		}

		if ( _SiteSub.length ) {
			Html = htmlOpen + Html + htmlClose;
			_SiteSub.before( Html );
		}
	}

	// Footer
	_ui.Footer = function() {
		// Summary field
		IWRM.ui.Summary = new OO.ui.TextInputWidget( {
			value: IWRM.prefs.summary
		} );

		// Submit on Enter
		IWRM.ui.Summary.$input.on( 'keydown', function( e ) {
			if ( e.keyCode === 13 ) {
				e.preventDefault();
				ifUIElementExists(
					IWRM.ui.Submit,
					function( element ) {
						element.$button.click();
					}
				);
			}
		} );

		// Show byte limit
		var currentLimit = _c.wgCommentCodePointLimit - IWRM.prefs.summary.length;
		IWRM.ui.Summary.$input.codePointLimit( currentLimit );
		mw.widgets.visibleCodePointLimit( IWRM.ui.Summary, currentLimit );

		// Submit changes and skip a page
		IWRM.ui.Submit = _ui.Submit();
		IWRM.ui.SkipPage = _ui.SkipPage();

		return new OO.ui.FieldsetLayout( {
			label: null,
			items: [
				new OO.ui.FieldLayout(
					IWRM.ui.Summary,
					{
						align: 'top',
						label: _locale.summary,
						errors: [ new OO.ui.HtmlSnippet( _locale.warrant ) ]
					}
				),
				new OO.ui.FieldLayout( new OO.ui.Widget( {
					content: [
						new OO.ui.HorizontalLayout( {
							items: [
								IWRM.ui.Submit,
								IWRM.ui.SkipPage
							]
						} )
					]
				} ) )
			]
		} );
	}

	// Input field
	_ui.InputField = function( obj ) {
		var isTemplate = true;
		var modified = getTemplate( obj );

		// Success
		function resolvedWithSuccess( data ) {
			var entity;
			var isMissing = data && data.entities && data.entities[ '-1' ];
			if ( !isMissing ) {
				entity = data && data.entities;
				if ( entity ) {
					var keys = Object.keys( entity );
					entity = entity[ keys[0] ];
				}

				// Change the output if a local page is available
				var data_sl = entity.sitelinks && entity.sitelinks[ _c.wgDBname ];
				if ( data_sl ) {
					modified = getLink( obj, data_sl.title );
					isTemplate = false;
				}
			}

			// Create the input
			var Input = new OO.ui.TextInputWidget( {
				placeholder: obj.fullText,
				value: modified
			} );
			Input.$input.data( 'old', obj.fullText );

			// Wikify the data
			Wikify( Input.$input[0] );

			// Render and add an input field
			var Field = new OO.ui.FieldLayout( Input, {
				align: 'top',
				label: null,
				notices: [ _ui.Notice( obj.tmpl.lang, obj.tmpl.origTitle, entity ) ]
			} );

			// Check if article exists in the project
			if ( isTemplate && obj.lang ) {
				_ui.fn.checkArticle( modified, Field );
			}

			var timer;
			Input.$input.on( 'blur', function() {
				var value = this.value.trim();

				clearTimeout( timer );
				_ui.fn.checkArticle( value, Field );
			} );
			Input.$input.on( 'input', function() {
				var value = this.value.trim();

				Field.setErrors( [] );
				clearTimeout( timer );
				timer = setTimeout( function() {
					_ui.fn.checkArticle( value, Field );
				}, 500 );
			} );

			// Keyboard shortcuts
			Input.$input.on( 'keydown', function( e ) {
				// Submit on Ctrl+Enter
				if ( e.ctrlKey && !e.shiftKey && !e.altKey && e.keyCode === 13 ) {
					e.preventDefault();
					ifUIElementExists(
						IWRM.ui.Submit,
						function( element ) {
							element.$button.click();
						}
					);
				}

				// Return to initial value on Esc
				if ( e.keyCode === 27 ) {
					e.preventDefault();
					this.value = this.defaultValue;
					_ui.fn.checkArticle( this.value, Field );
				}
			} );

			// Move cursor if value starts with our template or a link
			Input.$input.on( 'focus', function() {
				var value = this.value.trim();
				var start = -1;
				if ( value.startsWith( _tmplStart ) ) {
					start = _tmplStart.length - 1;
				}

				var endIndex = value.indexOf( _linkEnd );
				if ( endIndex !== -1 ) {
					start = endIndex + 1;
				}

				if ( start !== -1 ) {
					this.setSelectionRange( start, start );
				}
			} );
			
			return $.Deferred().resolve( Field.$element );
		}

		// Failure
		function resolvedWithFailure() {
			_inputCounter--;

			// Add an error message
			return $.Deferred().resolve( '<div class="error">$1</div>'.replace(
				'$1',
				_locale.errors.badInterwiki.replace( '$1', obj.tmpl.lang )
			) );
		}

		// Normalise language prefix for Wikidata
		var wdLang = obj.tmpl.lang.split( '-' ).join( '_' );
		if ( wdLang === 'be_tarask' ) {
			wdLang = 'be_x_old';
		}

		// Return a promise
		return IWRM.api.checkSitelinks(
			wdLang,
			obj.tmpl.origTitle
		).then( resolvedWithSuccess, resolvedWithFailure );
	}

	// Load more button
	_ui.LoadMore = function() {
		var Btn = new OO.ui.ButtonInputWidget( {
			flags: [ 'primary', 'progressive' ],
			icon: 'add',
			label: _locale.loadMore.replace( '$1', IWRM.prefs.limit )
		} );

		// Set event listeners
		Btn.$button.on( 'click', _ui.fn.getMoreData );

		return Btn;
	}

	// Nearby page button (previous / next)
	_ui.NearbyPage = function( type ) {
		var Btn = new OO.ui.ButtonInputWidget( {
			disabled: true,
			flags: [ 'progressive' ],
			icon: type,
			label: _locale.nearbyPage[ type ]
		} );

		// Click event callback
		function onNearbyClick() {
			var index = IWRM.data.index;
			if ( type === 'previous' ) {
				index = ( index - 1 < 0 ? 0 : index - 1 );
			} else {
				index = ( index + 1 > IWRM.list.length - 1 ? IWRM.list.length - 1 : index + 1 );
			}

			ifUIElementExists(
				IWRM.ui.Dropdown,
				function( el ) {
					el.setValue( IWRM.list[ index ] );
				}
			);
		}

		// Set event listeners
		Btn.$button.on( 'click', onNearbyClick );

		return Btn;
	}

	// Notice with links
	_ui.Notice = function( lang, title, entity ) {
		var Notice = '<a class="extiw" href="$1" target="_blank" title="$2">$3</a>';

		if ( entity ) {
			// Add a link to Wikidata page if we got one
			Notice = Notice + ' | <a class="extiw" href="https://www.wikidata.org/wiki/$4" title="$5" target="_blank">wikidata.org</a>'.replace(
				'$4', entity.id
			).replace( '$5', _locale.notice.wikidata );

			// Add a link to local page if it is available
			var thiswiki = entity.sitelinks && entity.sitelinks[ _c.wgDBname ];
			if ( thiswiki ) {
				Notice = Notice + ' | <a href="/wiki/$6" title="$7" target="_blank">$8</a>'.replace(
						'$6', thiswiki.title.split( ' ' ).join( '_' )
					).replace( '$7', _locale.notice.thiswiki ).replace( '$8', _locale.notice.thiswikiArticle );
			}
		}

		// Render first link
		var link = 'https://$1.wikipedia.org/wiki/'.replace( '$1', lang ) + title.split( ' ' ).join( '_' );
		Notice = Notice.replace( '$1', link ).replace( '$2', _locale.notice.interwiki ).replace(
			'$3', '$1.wikipedia.org'.replace( '$1', lang )
		);

		return new OO.ui.HtmlSnippet( Notice );
	}

	// Random page button
	_ui.RandomPage = function() {
		var Btn = new OO.ui.ButtonInputWidget( {
			disabled: true,
			icon: 'die',
			label: _locale.randomPage
		} );

		// Click event callback
		function onRandomClick() {
			var rand = Math.floor( Math.random() * ( IWRM.list.length - 1 - 0 + 1 ) ) + 0;

			ifUIElementExists(
				IWRM.ui.Dropdown,
				function( el ) {
					el.setValue( IWRM.list[ rand ] );
				}
			);
		}

		// Set event listeners
		Btn.$button.on( 'click', onRandomClick );

		return Btn;
	}

	// SiteSub
	_ui.SiteSub = function( count ) {
		count = count || '';
		var text = _locale.title;
		if ( count === 1) {
			text = _locale.titleOne;
		}

		if ( count ) {
			count += ' ';
		}
		text = text.replace( '$1', count );

		// If SiteSub exists
		if ( _SiteSub.length ) {
			_SiteSub.text( text );
			return;
		}

		// If SiteSub doesn’t exist
		_ContentText.parent().prepend(
			$( '<div id="siteSub"></div>' ).text( text )
		);
		_SiteSub = $( '#siteSub' );
		return;
	}

	// Skip a page
	_ui.SkipPage = function() {
		var Btn = new OO.ui.ButtonInputWidget( {
			disabled: true,
			flags: [ 'destructive' ],
			framed: false,
			label: _locale.skipPage
		} );

		// Set event listeners
		Btn.$button.on( 'click', function() {
			_ui.fn.removeArticle( IWRM.data.title );
		} );

		return Btn;
	}

	// Submit changes
	_ui.Submit = function() {
		var Btn = new OO.ui.ButtonInputWidget( {
			disabled: true,
			flags: [ 'primary', 'progressive' ],
			label: _locale.submit
		} );

		// Click event callback
		function onSubmitClick() {
			// Disable action buttons
			_ui.fn.disableActions( true );

			IWRM.data.code.modified = IWRM.data.code.old;
			var unchangedCode = false;

			// Do replacements for everything
			var $Changes = $( mainClass( 'paragraph', '.' ) + ' textarea:not(:disabled), ' + mainClass( 'line', '.' ) + ' input:not(:disabled)' );
			$Changes.each( function( index, el ) {
				var old = $(el).data( 'old' );
				var value = $(el).val();

				// Do not trim textarea, since there can be meaningful spaces
				if ( $( el ).prop( 'tagName' ) === 'INPUT' ) {
					value = value.trim();
				}

				if ( value !== '' || $( el ).prop( 'tagName' ) === 'TEXTAREA' ) {
					// Check if there is unchangedCode anywhere
					if ( value.indexOf( _tmplStart ) !== -1 || value.indexOf( _linkEnd ) !== -1 ) {
						unchangedCode = true;
					}
					var unmodified = IWRM.data.code.modified;

					// Remove entire paragraph for textarea
					if ( value === '' ) {
						IWRM.data.code.modified = IWRM.data.code.modified.replace( old + '\n', value );
						unmodified = IWRM.data.code.modified;
					}

					// Remove other text if no modifications were made
					if ( unmodified === IWRM.data.code.modified ) {
						IWRM.data.code.modified = IWRM.data.code.modified.replace( old, value );
					}
				}
			} );

			// Show an error if user tries to submit a template with unchanged code
			if ( unchangedCode ) {
				IWRM.data.code.modified = '';

				_ui.fn.showError( null, null, { text: _locale.errors.unchangedCode } );
				_ui.fn.disableActions( false );
				return;
			}

			// Change summary
			var summary = IWRM.prefs.summary;
			ifUIElementExists(
				IWRM.ui.Summary,
				function( el ) {
					summary = el.getValue().trim();
				}
			);

			// Submit
			IWRM.api.submitChanges(
				IWRM.data.code.modified,
				IWRM.data.title,
				summary
			).done( function() {
				// Move counter up
				_counter += 1;

				// Send a request to CheckWiki server
				IWRM.api.submitCheckWiki( IWRM.data.title );

				// Remove data for this article
				_ui.fn.removeArticle( IWRM.data.title );

				// Show post-edit confirmation
				mw.hook( 'postEdit' ).fire();
			} );
		}

		// Set event listeners
		Btn.$button.on( 'click', onSubmitClick );

		return Btn;
	}

	// A paragraph editing toggle
	_ui.Toggle = function( Textarea, $FauxLine ) {
		var Toggle = new OO.ui.ToggleSwitchWidget();

		// Change event callback
		function onToggleChange( value ) {
			$FauxLine.toggleClass( 'is-editing-paragraph' );
			Textarea.setDisabled( !value );

			var textareaValue = Textarea.$input.data( 'old' );
			$FauxLine.find( mainClass( 'line', '.' ) + ' input' ).each( function( index, el ) {
				$(el).attr( 'disabled', value );
				if ( value === true ) {
					var old = $(el).data( 'old' );
					var elValue = $(el).val().trim();

					if ( elValue !== '' ) {
						textareaValue = textareaValue.replace( old, elValue );
					}
				}
			} );

			if ( value === true ) {
				Textarea.setValue( textareaValue );
			}
		}

		// Set event listeners
		Toggle.on( 'change', onToggleChange );

		return Toggle;
	}

	// Upper toolbar
	_ui.Toolbar = function() {
		// Should be loaded first and foremost
		IWRM.ui.Dropdown = _ui.Dropdown();

		// Other buttons
		IWRM.ui.LoadMore = _ui.LoadMore();
		IWRM.ui.PreviousPage = _ui.NearbyPage( 'previous' );
		IWRM.ui.NextPage = _ui.NearbyPage( 'next' );
		IWRM.ui.RandomPage = _ui.RandomPage();

		return new OO.ui.Widget( {
			content: [
				new OO.ui.HorizontalLayout( {
					items: [
						IWRM.ui.LoadMore,
						IWRM.ui.PreviousPage,
						IWRM.ui.Dropdown,
						IWRM.ui.NextPage,
						IWRM.ui.RandomPage
					]
				} )
			]
		} );
	}

	// Check if article exists
	_ui.fn.checkArticle = function( value, Field ) {
		var code = /\{\{iw\|(.*?)[\|\}]/g;
		var match = code.exec( value );
		var title = match && match[1];

		// Success
		function resolvedWithSuccess( data ) {
			var entity;
			var isMissing = data && data.entities && data.entities[ '-1' ];

			if ( !isMissing ) {
				var link = '<a href="/wiki/$1" title="$2" target="_blank">'.replace( '$1', title.split( ' ' ).join( '_' ) ).replace( '$2', _locale.notice.thiswiki );
				var error = _locale.errors.articleExists.replace( '$2', link ).replace( '$3', '</a>' ).replace( '$1', title );

				Field.setErrors( [
					new OO.ui.HtmlSnippet( error )
				] );
				return;
			}

			Field.setErrors( [] );
		}

		if ( title ) {
			// Normalise language prefix for Wikidata
			var wdLang = _c.wgContentLanguage.split( '-' ).join( '_' );
			if ( wdLang === 'be_tarask' ) {
				wdLang = 'be_x_old';
			}

			IWRM.api.checkSitelinks(
				wdLang,
				title
			).done( resolvedWithSuccess );
			return;
		}
	}

	// Check nearby pages on validity
	_ui.fn.checkBtns = function() {
		ifUIElementExists(
			IWRM.ui.PreviousPage,
			function( el ) {
				var disablePrevious = ( IWRM.data.index === 0 ? true : false );
				el.setDisabled( disablePrevious );

				// TOPHAB: a hack to remove unnecessary focus styles
				el.$element.removeClass( 'oo-ui-buttonElement-pressed' );
			}
		);
		ifUIElementExists(
			IWRM.ui.NextPage,
			function( el ) {
				var disableNext = ( IWRM.data.index === IWRM.list.length - 1 ? true : false );
				el.setDisabled( disableNext );

				// TOPHAB: a hack to remove unnecessary focus styles
				el.$element.removeClass( 'oo-ui-buttonElement-pressed' );
			}
		);
	}

	// Enable and disable action buttons
	_ui.fn.disableActions = function( value ) {
		// Nearby pages buttons
		if ( value === true ) {
			ifUIElementExists(
				IWRM.ui.PreviousPage,
				function( el ) {
					el.setDisabled( true );
				}
			);
			ifUIElementExists(
				IWRM.ui.NextPage,
				function( el ) {
					el.setDisabled( true );
				}
			);
		}

		// Dropdown
		ifUIElementExists(
			IWRM.ui.Dropdown,
			function( el ) {
				el.setDisabled( value );
			}
		);

		// Random page button
		ifUIElementExists(
			IWRM.ui.RandomPage,
			function( el ) {
				el.setDisabled( value );
			}
		);

		// Footer buttons
		ifUIElementExists(
			IWRM.ui.Submit,
			function( el ) {
				el.setDisabled( value );
			}
		);
		ifUIElementExists(
			IWRM.ui.SkipPage,
			function( el ) {
				el.setDisabled( value );
			}
		);
	}

	// Get more data
	_ui.fn.getMoreData = function() {
		// Disable Load more button
		ifUIElementExists(
			IWRM.ui.LoadMore,
			function( el ) {
				el.setDisabled( true );
			}
		);

		IWRM.api.getSearchData( IWRM.offset + IWRM.prefs.limit ).then( function() {
			IWRM.offset += IWRM.prefs.limit;

			// Push new data 
			for ( var i = 0; i < IWRM.list.length; i++ ) {
				_dropdownData.push( {
					data: IWRM.list[ i ]
				} );
			}

			// Update data in dropdown
			ifUIElementExists(
				IWRM.ui.Dropdown,
				function( el ) {
					el.setOptions( _dropdownData );
				}
			);

			// Enable Load more button
			ifUIElementExists(
				IWRM.ui.LoadMore,
				function( el ) {
					el.setDisabled( false );
				}
			);
		} );
	}

	// Modify a changed line
	_ui.fn.modifyLine = function( index, el, length, $Container, $Bar ) {
		var $Parent = $( el ).parent();

		// Find a future container for inputs
		var $FauxLine = $Parent.find( '.diff-addedline' );
		if ( $FauxLine.length === 0 ) {
			$FauxLine = $Parent.find( '.diff-empty' );

			if ( $FauxLine.length > 0 ) {
				$FauxLine.removeAttr( 'colspan' );
				$FauxLine.before( '<td class="diff-marker"></td>' );

				$Parent.next().remove();
			}
		}

		// Modify input container
		$FauxLine.removeClass( 'diff-addedline' ).removeClass( 'diff-empty' ).addClass( mainClass( 'fauxline' ) );
		var Html = '<div class="' + mainClass( 'paragraph' ) + '"></div><div class="' + mainClass( 'line' ) + '"></div><div class="' + mainClass( 'toggle' ) + '"></div>';
		$FauxLine.html( Html );

		var $InputHolder = $FauxLine.find( mainClass( 'line', '.' ) );

		// Render input fields for each change
		var text = $( el ).text();
		var InputFields = [];
		replaceLinks( text, function( obj, text ) {
			var index = text.indexOf( obj.fullText );
			InputFields[ index ] = _ui.InputField( obj );
			_inputCounter++;

			// Return the dummy modified text to go to next input
			var modified = getTemplate( obj );
			return text.replace( obj.fullText, modified );
		} );

		// Append them all at once synchronously
		Promise.all( InputFields ).then( function( Element ) {
			$InputHolder.append( Element );
		} ).then( function() {
			// Remove progress bar and show the diff
			if ( index === length - 1 ) {
				$Bar.$element.remove();
				$Container.addClass( IWRM.prefs.loaded );

				// Check buttons on validity
				_ui.fn.checkBtns();

				// Enable action buttons
				_ui.fn.disableActions( false );
				
				_ui.SiteSub( _inputCounter );
			}

			// Focus on first element
			var firstInput = $Container.find( mainClass( 'line', '.' ) + ' input' );
			if ( firstInput.length > 0 ) firstInput.eq( 0 ).focus();
		} );

		// Render a hidden textarea
		var Textarea = new OO.ui.MultilineTextInputWidget( {
			autosize: true,
			disabled: true
		} );
		Textarea.$input.data( 'old', text );
		$FauxLine.find( mainClass( 'paragraph', '.' ) ).append( Textarea.$element );

		// Keyboard shortcuts
		Textarea.$input.on( 'keydown', function( e ) {
			// Submit on Ctrl+Enter
			if ( e.ctrlKey && !e.shiftKey && !e.altKey && e.keyCode === 13 ) {
				e.preventDefault();
				ifUIElementExists(
					IWRM.ui.Submit,
					function( element ) {
						element.$button.click();
					}
				);
			}
		} );

		// Render a toggle for changing states
		var toggle = new OO.ui.FieldLayout(
			_ui.Toggle( Textarea, $FauxLine ),
			{
				label: _locale.editParagraph
			}
		);
		$FauxLine.find( mainClass( 'toggle', '.' ) ).append( toggle.$element );
	}

	// Remove an article from the lists
	_ui.fn.removeArticle = function ( title ) {
		// Calculate the index and update the lists
		var index = IWRM.list.indexOf( title );
		if ( index === -1 ) {
			return;
		}

		IWRM.list.splice( index, 1 );
		_dropdownData.splice( index, 1 );
		
		// Set new data to dropdown and update the picked element
		var newIndex = ( index + 1 > IWRM.list.length - 1 ? IWRM.list.length - 1 : index + 1 );
		ifUIElementExists(
			IWRM.ui.Dropdown,
			function( el ) {
				el.setOptionsData( _dropdownData );
				el.setValue( IWRM.list[ index ] );
			}
		);
	}

	// Throw an error notification
	_ui.fn.showError = function ( error, data, options ) {
		var text = options.text;
		var replace = options.replace;

		// Basic notification template
		function notify( text ) {
			return mw.notify( text, {
				autoHide: ( error ? false : true),
				title: ( error ? _locale.errors.title : '' )
			} );
		}

		// Add a default text
		if ( !text ) {
			text = _locale.errors.unidentified;
		}

		if ( error === 'http' ) {
			text = _locale.errors.noNetwork;
		}

		if ( error === 'missingtitle' ) {
			text = _locale.errors.noArticle;
		}

		// Show up some additional text to keep text different
		if ( replace ) {
			text = text.replace( '$1', replace );
		}

		// Get reasoning for showing the popup
		if ( error ) {
			text = _locale.errors.text + text;
		}

		// Other unidentified errors
		return notify( text );
	}

	/*
	 * Initialising
	 */
	IWRM.Init = function() {
		// Check hash and user groups
		var from = window.location.hash;
		if ( !from.startsWith( IWRM.prefs.hash ) ) {
			return;
		}

		if ( !_isAllowed ) {
			_ui.fn.showError( 'script', null, { text: _locale.errors.notAllowed } );
			return;
		}

		// Change page title
		document.title = document.title.replace( _c.wgTitle, _locale.title.replace( '$1', '' ) );
		_FirstHeading.text( '' );
		_FirstHeading.append( $( '<small>', { class: mainClass( 'counter' ) + ' is-zero' } ).text( _counter ) );
		_FirstHeading.append( $( '<span>' ).text( _locale.loadingTitle ) );
		_ui.SiteSub();

		// Start rendering the interface
		_ContentText.addClass( 'mw-parser-output' ).addClass( mainClass() );
		_ContentText.empty();

		mw.loader.using( _deps ).done( function() {
			_api = new mw.Api();

			// Render a progress bar
			var $ContentBar = new OO.ui.ProgressBarWidget( {
				progress: false
			} );
			_ContentText.append( $ContentBar.$element );

			mw.notify( _locale.loading );

			IWRM.api.getRateLimits().then( function() {
				IWRM.api.getSearchData().then( function() {
					// Render toolbar once
					_ContentText.append( _ui.Toolbar().$element );

					// Preload diff area
					_ContentText.append( $( '<div>', { class: mainClass( 'diff' ) } ) );

					_ui.Diff().then( function() {
						_ContentText.append( _ui.Footer().$element );

						// Remove progress bar and show the page
						$ContentBar.$element.remove();
						_ContentText.addClass( IWRM.prefs.loaded );
					} );
				} );
			} );
		} ).fail( function( error, data ) {
			_ui.fn.showError( error, data, { replace: _locale.requests.init } );
		} );
	}

	/* </nowiki>
	 * Starting point
	 */
	IWRM.Init();
} );