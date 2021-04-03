/**
 * @name TabViewMigrationHelper
 * @author Luqgreg
 */
( function () {
	if ( mw.config.get( 'wgNamespaceNumber' ) !== -1 || !mw.config.get( 'wgTitle' ).endsWith( '/TVMH' ) /*!== 'BlankPage/TVMH'*/ || window.TVMHLoaded ) {
		return;
	}
	window.TVMHLoaded = true;

	/*** MODELS ***/
	/**
	 * @constructor
	 * @param {*} data
	 * @param {string} content
	 */
	function TVMHPage( data, content ) {
		this.pageid = data.page_id;
		this.title = data.title;
		this.content = content;
		this.tabviews = this.findTabViews();
	}

	/** @returns {TVMHTabView[]} */
	TVMHPage.prototype.findTabViews = function () {
		const self = this;
		const parsed = TVMH.domParser.parseFromString( this.content, 'text/html' );
		const out = [];

		if ( !parsed.querySelector( '.parseerror' ) ) {
			const nowikis = parsed.getElementsByTagName( 'nowiki' );
			for ( var i = 0; i < nowikis.length; i++ ) {
				const el = nowikis[i];
				el.parentNode.removeChild( el );
			}

			const tabviews = parsed.getElementsByTagName( 'tabview' );
			for ( var i = 0; i < tabviews.length; i++ ) {
				const el = tabviews[i];
				if ( el.innerHTML ) {
					out.push( el.innerHTML );
				}
			}
		} else {
			var match;
			var content = this.content.replace( TVMH.REGEX_NOWIKI, '' );

			while ( match = TVMH.REGEX_TABVIEW.exec( content ) ) {
				out.push( match[1] );
			}
		}

		return out.reduce( function ( c, v ) {
			const tv = new TVMHTabView( v, self );

			if ( tv.tabs.length ) {
				c.push( tv );
			}

			return c;
		}, [] );
	};

	/** @returns {Promise<string>} */
	TVMHPage.prototype.getProposedChanges = function () {
		const self = this;

		return Promise.all(
			this.tabviews.map( function ( e ) {
				return e.getProposedChanges();
			} )
		).then( function( changes ) {
			var text = self.content;

			for ( var i = 0; i < changes.length; ++i ) {
				text = text.replace( self.tabviews[i].raw, changes[i] );
			}

			return text;
		} );
	};

	/*** OPTION CONTAINER ***/
	/**
	 * @constructor
	 * @param {TVMHOptions} parent
	 */
	function TVMHOptions( parent ) {
		this.__parent = parent || null;
		this.clear();

		if ( !this.__parent ) {
			try {
				var stored = localStorage.getItem( TVMHOptions.LSKEY );
				if ( !stored ) {
					return;
				}

				stored = JSON.parse( stored );
				for ( var i = 0; i < TVMHOptions.KEYS.length; i++ ) {
					const key = TVMHOptions.KEYS[i];
					if ( key in stored ) {
						this[key] = stored[key];
					}
				}
			} catch ( e ) {
				console.warn( '[TVMH] JSON decode error', e );
				localStorage.removeItem( TVMHOptions.LSKEY );
			}
		}
	}

	TVMHOptions.LSKEY = 'TVMH-options';
	TVMHOptions.KEYS = [ 'extract', 'header', 'lede', 'summary', 'template', 'templateCut' ];

	TVMHOptions.prototype.clear = function () {
		if ( !this.__parent ) {
			this.extract = 'First paragraph';
			this.template = '{{Main|$1}}'
			this.templateCut = false;
			this.header = '== $1 ==';
			this.summary = 'Depratecting TabView'
			// this.lede = '';
		} else {
			for ( var i = 0; i < TVMHOptions.KEYS.length; i++ ) {
				const key = TVMHOptions.KEYS[i];
				if ( key in this && key !== 'templateCut' ) {
					delete this[key];
				}
			}

			TVMH.triggerOptionsChange();
		}
	};

	TVMHOptions.prototype.cloneParent = function () {
		if ( this.__parent ) {
			for ( var i = 0; i < TVMHOptions.KEYS.length; i++ ) {
				const key = TVMHOptions.KEYS[i];
				const val = this.get( key );
				if ( val !== undefined ) {
					this[key] = val;
				}
			}

			// TVMH.triggerOptionsChange();
		}
	};

	/**
	 * @param {string} key
	 * @param {any} [def]
	 */
	TVMHOptions.prototype.get = function ( key, def ) {
		if ( key in this ) {
			return this[key];
		}

		return this.__parent ? this.__parent.get( key, def ) : def;
	};

	/**
	 * @param {string} key
	 * @param {*} val
	 */
	TVMHOptions.prototype.set = function( key, val ) {
		this[key] = val;
		TVMH.triggerOptionsChange();

		if ( !this.__parent ) {
			localStorage.setItem( TVMHOptions.LSKEY, this.serialize() );
		}
	}

	/** @returns {string} */
	TVMHOptions.prototype.serialize = function () {
		const out =  {};

		for ( var i = 0; i < TVMHOptions.KEYS.length; i++ ) {
			const key = TVMHOptions.KEYS[i];
			if ( key in this ) {
				out[key] = this[key];
			}
		}

		return JSON.stringify( out );
	}

	/**
	 * @param {string} key
	 * @param {string} prop
	 * @param {Event} e
	 */
	TVMHOptions.prototype.input = function( key, prop, e ) {
		this.set( key, e.target[prop] );
	}

	/**
	 * @param {string} key
	 * @param {string} [prop="value"]
	 * @returns {Function}
	 */
	TVMHOptions.prototype.bind = function ( key, prop ) {
		return this.input.bind( this, key, prop || 'value' );
	}

	/*** OPTION OVERRIDES ***/
	/**
	 * @abstract
	 * @constructor
	 * @param {TVMHOptions} [optionsParent]
	 * @param {string} [checkboxText]
	 */
	function TVMHOverridable( optionsParent, checkboxText ) {
		this.options = new TVMHOptions( optionsParent || TVMH.options );
		this.overrideCheckbox = TVMH.createElement( 'input', { type: 'checkbox' } );
		this.overrideCheckbox.onchange = this.toggleOverrideUI.bind( this );
		this.overrideElement = TVMH.createElement( 'label', { innerText: checkboxText || ' | Override defaults: ' }, [ this.overrideCheckbox ] );
		this.overrideUI = null;
	}

	TVMHOverridable.prototype.toggleOverrideUI = function () {
		if ( this.overrideCheckbox.checked ) {
			this.options.cloneParent();
			this.overrideUI = this.loadOverrideUI();
			this.overrideUI.classList.add( 'tvmh-overrideui' );
			this.overrideElement.after( this.overrideUI );
		} else {
			this.destroyOverrideUI();
			this.overrideUI.remove();
			this.overrideUI = null;
			this.options.clear();
		}
	};

	TVMHOverridable.prototype.destroyOverrideUI = function () {};

	/**
	 * @constructor
	 * @extends TVMHOverridable
	 * @param {string} content
	 */
	function TVMHTabView( content, page ) {
		TVMHOverridable.call( this );
		this.page = page;
		this.raw = '<tabview>' + content + '</tabview>';
		this.tabs = [];

		const lines = content.trim().split( '\n' );
		for ( var i = 0; i < lines.length; i++ ) {
			const tab = lines[i].trim().split( '|' );

			if ( tab[0] ) {
				this.tabs.push( new TVMHTabViewTab( this, tab[0].trim(), ( tab[1] || tab[0].replace( /_/g, ' ' ) ).trim() ) );
			}
		}
	}

	TVMHTabView.prototype = Object.create( TVMHOverridable.prototype );

	/** @returns {Element} */
	/*TVMHTabView.prototype.loadOverrideUI = function () {
		return TVMH.createElement( 'div', {}, [
			TVMH.createElement( 'label', { innerText: 'Main article template: ' }, [
				TVMH.createElement( 'input', { value: TVMH.templateInput.value } )
			] )
		] );
	};*/

	/** @returns {Promise<string>} */
	TVMHTabView.prototype.getProposedChanges = function () {
		return Promise.all(
			this.tabs.map( function( e ) {
				return e.getProposedChanges();
			} )
		).then( function( changes ) {
			return changes.filter( function ( e ) { return e; } ).join( '\n\n\n' );
		} );
	};

	/**
	 * @constructor
	 * @extends TVMHOverridable
	 * @param {TVMHTabView} tabview
	 * @param {string} page
	 * @param {string} label
	 * @property {Element|null} ledeOverride
	 */
	function TVMHTabViewTab( tabview, page, label ) {
		TVMHOverridable.call( this );
		this.tabview = tabview;
		this.page = page;
		this.label = label;
		this.ledeOverride = null;
	}

	TVMHTabViewTab.prototype = Object.create( TVMHOverridable.prototype );

	/** @returns {Element} */
	TVMHTabViewTab.prototype.loadOverrideUI = function ( e ) {
		const self = this;

		this.ledeOverride = TVMH.createElement( 'textarea', { oninput: this.options.bind( 'lede' ) } );
		TVMH.getLeadingParagraph( this.page ).then( function( lede ) {
			self.ledeOverride.textContent = lede;
		} );

		return TVMH.createElement( 'div', {}, [
			TVMH.createElement( 'label', { innerText: 'Section header: ' }, [
				TVMH.createElement( 'input', { value: this.options.get( 'header' ), oninput: this.options.bind( 'header' ) } )
			] ),
			TVMH.createElement( 'label', { innerText: 'Main article template: ' }, [
				TVMH.createElement( 'input', { value: this.options.get( 'template' ), oninput: this.options.bind( 'template' ) } )
			] ),
			TVMH.createElement( 'label', { innerText: 'Content extract method: ' },
				TVMH.createElement( 'select', { onchange: this.options.bind( 'extract' ) },
					Object.keys( TVMH.ledeExtractors ).map( function ( key ) {
						return TVMH.createElement( 'option', Object.assign( { value: key, innerText: key }, self.options.get( 'template' ) === key ? { selected: 'selected' } : {} ) );
					} )
				)
			),
			TVMH.createElement( 'label', { innerText: 'Section content: ' }, [
				TVMH.createElement( 'br' ),
				this.ledeOverride
			] )
		] );
	};

	TVMHTabViewTab.prototype.destroyOverrideUI = function () {
		this.ledeOverride = null;
	};

	/** @returns {Promise<string>} */
	TVMHTabViewTab.prototype.getProposedChanges = function () {
		const self = this;

		return TVMH.getLeadingParagraph( this.page, this.options ).then( function( lede ) {
			const header = self.options.get( 'header' ).replace( /\$1/g, self.label );
			const template = TVMH.getMainArticleTemplate( self, self.options );
			const out = ( ( header ? header + '\n' : '' ) + ( template ? template + '\n\n' : '' ) + self.options.get( 'lede', lede ) ).trim();

			if ( self.ledeOverride ) {
				self.ledeOverride.textContent = self.options.get( 'lede', lede );
			}

			return out;
		} );
	};

	/*** LEDE EXTRACTORS ***/
	/**
	 * @constructor
	 * @param {boolean} [removecomments=true]
	 */
	function TVMHLedeExtractor( removecomments ) {
		this.removecomments = removecomments === undefined ? true : removecomments;
	}

	/**
	 * @memberof TVMHLedeExtractor
	 * @param {string} content
	 * @param {string} [title]
	 * @param {string} [attempt]
	 * @returns {string}
	 */
	TVMHLedeExtractor.prototype.extract = function ( content, title, attempt ) {
		return ( this.removecomments ? ( attempt || content ).replace( TVMH.REGEX_NOINCLUDE, '' ).replace( TVMH.REGEX_COMMENT, '' ) : ( attempt || content ) ).trim();
	};

	/**
	 * @constructor
	 * @extends TVMHLedeExtractor
	 */
	function TVMHLedeExtractor_None() {
		TVMHLedeExtractor.call( this );
	}

	TVMHLedeExtractor_None.prototype = Object.create( TVMHLedeExtractor.prototype );

	/**
	 * @param {string} content
	 * @param {string} [title]
	 * @returns {''}
	 */
	TVMHLedeExtractor_None.prototype.extract = function ( content, title ) {
		return '';
	};

	/**
	 * @constructor
	 * @extends TVMHLedeExtractor
	 */
	function TVMHLedeExtractor_FirstSection() {
		TVMHLedeExtractor.call( this );
		this.REGEX_SECTION = new RegExp( '^(.*?)(?:\\n=|\\n{\\||\\n<).+', 'sm' ); // because Fandom's jsminplus minifier is broken -.-
	}

	TVMHLedeExtractor_FirstSection.prototype = Object.create( TVMHLedeExtractor.prototype );

	/**
	 * @param {string} content
	 * @param {string} [title]
	 * @returns {string}
	 */
	TVMHLedeExtractor_FirstSection.prototype.extract = function ( content, title ) {
		return TVMHLedeExtractor.prototype.extract.call( this, content, title, content.replace( this.REGEX_SECTION, '$1' ) );
	};

	/**
	 * @constructor
	 * @extends TVMHLedeExtractor_FirstSection
	 */
	function TVMHLedeExtractor_FirstParagraph() {
		TVMHLedeExtractor_FirstSection.call( this );
	}

	TVMHLedeExtractor_FirstParagraph.prototype = Object.create( TVMHLedeExtractor_FirstSection.prototype );

	/**
	 * @param {string} content
	 * @param {string} [title]
	 * @returns {string}
	 */
	TVMHLedeExtractor_FirstParagraph.prototype.extract = function ( content, title ) {
		const sections = TVMHLedeExtractor_FirstSection.prototype.extract.call( this, content, title ).split( '\n' ).filter( function( e ) {
			return e && !( e.startsWith( '{{' ) && e.endsWith( '}}' ) ) && !( e.startsWith( '[[' ) && e.endsWith( ']]' ) ) && !e.startsWith( '|' );
		} );

		var paragraph = title ? sections.find( function( e ) {
			return e.includes( title );
		} ) : '';

		if ( !paragraph ) {
			paragraph = sections[0] || ''; // ???
		}

		return paragraph;
	};

	/*** API WRAPPER ***/
	const TVMHApiWrapper = {
		api: null,

		/** @typedef {{ text: string, timestamp: string }} TVMHRevision */
		/** @type {Object<string, TVMHRevision|Promise<TVMHRevision>>} */
		__revisionData: {},

		/**
		 * @param {string} title
		 * @returns {Promise<string>}
		 */
		loadRevisionData: function ( title ) {
			const self = this;

			title = title.trim().replace( /\s/g, '_' );
			if ( title in self.__revisionData ) {
				const cached = self.__revisionData[title];
				if ( cached instanceof Promise ) {
					return cached;
				}

				return new Promise( function ( resolve ) {
					return resolve( cached.text );
				} );
			}

			const promise = new Promise( function ( resolve ) {
				self.api.get( {
					action: 'query',
					titles: title,
					prop: 'revisions',
					rvprop: 'content|timestamp'
				} ).then( function ( r ) {
					if ( r.error ) {
						return resolve();
					}

					const revision = Object.values( r.query.pages )[0].revisions[0];
					self.__revisionData[title] = { text: revision['*'], timestamp: '' };
					resolve( self.__revisionData[title].text );
				} );
			} );

			self.__revisionData[title] = promise;

			return promise;
		},

		__tagsReport: undefined,
		loadTagsReport: function () {
			const self = this;

			// Until tagsrepory refreshes its cache
			if ( mw.config.get( 'wgServer' ) === 'https://luq.fandom.com' ) {
				self.__tagsReport = [ { title: 'TabView', page_id: 393 } ];
			}

			function __fetch( continuetoken ) {
				return new Promise( function ( resolve ) {
					self.api.get(
						Object.assign(
							{ tag: 'tabview', 'continue': continuetoken, limit: 'max' },
							self.isUCP
								? { action: 'list', prop: 'tagsreport' }
								: { action: 'tagsreport' }
						)
					).then( function ( r ) {
						if ( r.error ) {
							return resolve();
						}

						for ( var i = 0; i < r.query.tagsreport.length; i++ ) {
							const tr = r.query.tagsreport[i];

							if (
								!tr.title.startsWith( 'MediaWiki:' )
								|| !( tr.title.endsWith( '.js' ) || tr.title.endsWith( '.css' ) )
							) {
								self.__tagsReport.push( tr );
							}

						}

						if ( r['query-continue'] ) {
							__fetch( r['query-continue'].tagsreport['continue'] ).then( resolve );
						} else {
							resolve();
						}
					} )
				} );
			}

			return new Promise( function ( resolve ) {
				if ( self.__tagsReport ) {
					return resolve( self.__tagsReport );
				}

				self.__tagsReport = [];
				return __fetch().then( function() {
					resolve( self.__tagsReport );
				} );
			} );
		},

		/** @return {Promise<number|false>} */
		publishEdit: function ( title, content, summary ) {
			const self = this;

			return new Promise( function ( resolve ) {
				self.api.post( {
					action: 'edit',
					title: title,
					text: content,
					basetimestamp: ( self.__revisionData[title] || {} ).timestamp,
					nocreate: true,
					summary: summary,
					token: mw.user.tokens.get( 'editToken' )
				} ).then( function ( r ) {
					if ( r.error ) {
						alert( 'Error occurred during publishing an edit: ' + JSON.stringify( r ) );
						return resolve( false );
					}

					if ( r.edit.result === 'Success' ) {
						return resolve( r.edit.newrevid );
					}

					return resolve( false ); // ???
				} );
			} );
		}
	};

	/*** MAIN OBJECT ***/
	const TVMH = {
		isUCP: mw.config.get( 'wgVersion' ) !== '1.19.24',

		// because Fandom's jsminplus minifier is broken -.-
		REGEX_COMMENT: new RegExp( '<!--(.*?)-->', 'gs' ),
		REGEX_NOINCLUDE: new RegExp( '<noinclude>(.*?)<\\/noinclude>', 'gs' ),
		REGEX_NOWIKI: new RegExp( '<nowiki>(.*?)<\\/nowiki>', 'gs' ),
		REGEX_TABVIEW: new RegExp( '<tabview[^>]*>(.*?)<\\/tabview>', 'gs' ),

		/** @var {callable[]} */
		onOptionsChange: [],

		domParser: new DOMParser(),

		options: new TVMHOptions(),

		ledeExtractors: {
			'First paragraph': new TVMHLedeExtractor_FirstParagraph(),
			'First section': new TVMHLedeExtractor_FirstSection(),
			'Whole article (transcluded)': new TVMHLedeExtractor( false ),
			'Whole article': new TVMHLedeExtractor( true ),
			'Nothing': new TVMHLedeExtractor_None()
		},

		init: function () {
			if ( this.isUCP ) {
				alert( 'TagsReport API on UCP is currently broken, which prevents the script from working properly.' );
				return;
			}

			TVMHApiWrapper.api = new mw.Api();

			const title = document.getElementsByTagName( 'title' )[0];
			title.innerText = title.innerText.replace( /^[^|]+/, 'TVHM ' );

			// UCP is broken anyway
			importArticle( {
				type: 'style',
				article: 'u:luq:MediaWiki:TVMH.css',
			} );

			TVMHApiWrapper.loadTagsReport().then( this.loadUI.bind( this ) );
		},

		/** @returns {Element} */
		createElement: function ( tag, args, children ) {
			const el = document.createElement( tag );

			if ( args ) {
				const DIRECT_ARGS = [ 'onclick', 'onchange', 'oninput', 'innerText', 'innerHTML', 'textContent' ];
				for ( var i = 0; i < DIRECT_ARGS.length; i++ ) {
					const arg = DIRECT_ARGS[i];
					if ( arg in args ) {
						el[arg] = args[arg];
						delete args[arg];
					}
				}

				for ( const arg in args ) {
					el.setAttribute( arg, args[arg] );
				}
			}

			if ( children ) {
				if ( !Array.isArray( children ) ) {
					children = [ children ];
				}
				for ( var i = 0; i < children.length; i++ ) {
					el.appendChild( children[i] );
				}
			}

			return el;
		},

		loadUI: function ( targets ) {
			const self = this;

			this.workbench = this.createElement( 'div', { id: 'tvmh-workbench' } );
			this.content = this.createElement(
				'div', { id: 'tvmh-container' },
				[
					this.createElement(
						'ul', { id: 'tvmh-pagelist' },
						targets.map( function ( e ) {
							return self.createElement( 'li', { innerText: e.title, onclick: self.loadWorkbench.bind( self, e ) } );
						} )
					),
					this.workbench,
					this.createElement( 'div', { id: 'tvmh-options' }, [
						this.createElement( 'b', { innerText: 'Default options: ' } ),
						this.createElement( 'label', { innerText: 'Section header: ' },
							this.createElement( 'input', { value: this.options.get( 'header' ), oninput: this.options.bind( 'template' ) } )
						),
						this.createElement( 'label', { innerText: 'Main article template: ' },
							this.createElement( 'input', { value: this.options.get( 'template' ), oninput: this.options.bind( 'template' ) } )
						),
						this.createElement( 'label', { innerText: 'Shorten supbages in arg ' },
							this.createElement( 'input', Object.assign( { type: 'checkbox', onchange: this.options.bind( 'templateCut', 'checked' ) }, this.options.get( 'templateCut' ) ? { checked: 'checked' } : {} ) )
						),
						this.createElement( 'label', { innerText: 'Content extract method: ' },
							this.createElement( 'select', { onchange: this.options.bind( 'extract' ) },
								Object.keys( TVMH.ledeExtractors ).map( function ( key ) {
									return TVMH.createElement( 'option', Object.assign( { value: key, innerText: key }, key === self.options.get( 'extract' ) ? { selected: 'selected' } : {} ) );
								} )
							)
						),
						this.createElement( 'label', { innerText: 'Edit summary: ' },
							this.createElement( 'input', { value: this.options.get( 'summary' ), oninput: this.options.bind( 'summary' ) } )
						)
					] )
				]
			);

			document.querySelector( '#mw-content-text > p' ).replaceWith( this.content );
		},

		triggerOptionsChange: function () {
			for ( var i = 0; i < this.onOptionsChange.length; i++ ) {
				this.onOptionsChange[i]();
			}
		},

		loadWorkbench: function ( data, e ) {
			const self = this;
			const old = this.content.querySelector( 'li.active' );
			if ( old ) {
				old.classList.remove( 'active' );
			}

			e.target.classList.add( 'active' );
			this.workbench.innerHTML = '';

			const loading = this.createElement( 'p', { innerText: 'Loading...' } );
			this.workbench.appendChild(
				this.createElement( 'h3', {}, [
					document.createTextNode( '[' + data.page_id + '] ' ),
					this.createElement( 'a', { href: mw.util.getUrl( data.title ), innerText: data.title } )
				] )
			);
			this.workbench.appendChild( loading );

			TVMHApiWrapper.loadRevisionData( data.title ).then( function( content ) {
				if ( !content ) {
					loading.innerText = 'Unknown error occured, while trying to retreive latest revision, please try again later.';
					return;
				}

				self.currentPage = new TVMHPage( data, content );

				if ( !self.currentPage.tabviews.length ) {
					e.target.classList.add( 'invalid' );
					loading.replaceWith( 'There are no tabviews used on this page, this either cachced result from TagsReport or tabview wrapped in nowiki.' );
				}

				function swapWorkbench( e ) {
					if ( e.target.classList.contains( 'active' ) ) {
						return;
					}

					const oldtab = tabLabelsEl.querySelector( '.active' );
					if ( oldtab ) {
						oldtab.classList.remove( 'active' );
					}
					const oldtabcontent = tabContentsEl.querySelector( '.active' );
					if ( oldtabcontent ) {
						oldtabcontent.classList.remove( 'active' );
					}

					e.target.classList.add( 'active' );
					tabContentsEl.querySelector( '[data-tab="' + e.target.getAttribute( 'data-tab' ) + '"]' ).classList.add( 'active' );
				}

				const allchanges = self.createElement( 'textarea', { textContent: content } );
				self.onOptionsChange = [
					function () {
						self.currentPage.getProposedChanges().then( function ( content ) {
							allchanges.value = content;
						} );
					}
				];

				var tabLabels = [];
				var tabContents = [];
				for ( var i = 0; i < self.currentPage.tabviews.length; i++ ) {
					tabLabels.push( self.createElement( 'li', { innerText: 'Tab View ' + ( i + 1 ), 'data-tab': i, onclick: swapWorkbench } ) );
					tabContents.push( self.createElement( 'div', { 'data-tab': i }, self.loadTabViewWorkbench( self.currentPage.tabviews[i], data ) ) );
				}

				tabLabels.push( self.createElement( 'li', { innerText: 'Raw content', 'data-tab': i, onclick: swapWorkbench } ) );
				tabContents.push( self.createElement( 'pre', { innerText: content, 'data-tab': i } ) );
				tabLabels.push( self.createElement( 'li', { innerText: 'Proposed changes', 'data-tab': ++i, onclick: swapWorkbench } ) );
				tabContents.push( self.createElement( 'div', { 'data-tab': i }, [
					allchanges,
					TVMH.createElement( 'br' ),
					TVMH.createElement( 'button', { innerText: 'Preview', onclick: function() {
						self.loadPreviewModal( allchanges.value, self.currentPage.title );
					} } ),
					TVMH.createElement( 'button', { type: 'submit', innerText: 'Submit', onclick: function () {
						TVMHApiWrapper.publishEdit(
							self.currentPage.title,
							allchanges.value,
							self.options.get( 'summary' )
						).then( function ( r ) {
							if ( r ) {
								self.workbench.innerHTML = '';
								self.workbench.appendChild( document.createTextNode( 'Page edited successfully: ' ) );
								self.workbench.appendChild( self.createElement( 'a', { href: mw.util.getUrl( self.currentPage.title ), innerText: 'page' } ) );
								self.workbench.appendChild( document.createTextNode( ', ' ) );
								self.workbench.appendChild( self.createElement( 'a', { href: mw.util.getUrl( self.currentPage.title, { diff: r } ), innerText: 'diff' } ) );
								self.currentPage = null;
							}
						} );
					} } )
				] ) );

				var tabLabelsEl = self.createElement( 'ul', { 'class': 'tvmh-workbench-tabs' }, tabLabels );
				var tabContentsEl = self.createElement( 'div', { 'class': 'tvmh-workbench-tabs-content' }, tabContents );
				self.triggerOptionsChange();
				loading.replaceWith( tabLabelsEl, tabContentsEl );
			} );
		},

		getMainArticleTemplate: function( tab, options ) {
			var arg = tab.page;
			options = options || TVMH.options;
			if ( options.get( 'templateCut' ) && arg.replace( /_/g, ' ' ).startsWith( tab.tabview.page.title.replace( /_/g, ' ' ) + '/' ) ) {
				arg = arg.substring( tab.tabview.page.title.length )
			}

			return options.get( 'template' ).replace( /\$1/g, arg );
		},

		/**
		 * @param {TVMHTabView} tabview
		 * @param {*} page
		 */
		loadTabViewWorkbench: function ( tabview, page ) {
			const self = this;

			const proposed = this.createElement( 'pre' );
			this.onOptionsChange.push( function () {
				tabview.getProposedChanges().then( function ( content ) {
					proposed.innerText = content;
				} );
			} );

			return [
				this.createElement( 'pre', { innerText: tabview.raw } ),
				this.createElement( 'h4', { innerText: 'Tabs:' } ),
				this.createElement( 'ul', {},
					tabview.tabs.map( function( e ) {
						return self.createElement( 'li', {}, [
							self.createElement( 'a', { href: mw.util.getUrl( e.page ), innerText: e.label } ),
							self.createElement( 'small', {}, [
								document.createTextNode( ' (' ),
								self.createElement( 'a', { href: mw.util.getUrl( e.page, { action: 'raw' } ), innerText: 'raw' } ),
								document.createTextNode( ')' ),
							] ),
							e.overrideElement
						] );
					} )
				),
				this.createElement( 'h4', { innerText: 'Proposed change:' } ),
				proposed,
				TVMH.createElement( 'button', { innerText: 'Preview', onclick: function() {
					self.loadPreviewModal( proposed.innerText, self.currentPage.title );
				} } )
			];
		},

		getLeadingParagraph: function ( title, options ) {
			const self = this;
			options = options || TVMH.options;

			return new Promise( function( resolve ) {
				TVMHApiWrapper.loadRevisionData( title ).then( function ( content ) {
					resolve( self.ledeExtractors[options.get( 'extract', 'First paragraph' )].extract( content, title ) );
				} );
			} );
		},

		loadPreviewModal: function ( wikitext, title ) {
			const self = this;

			this.getPreview( wikitext, title ).then( function ( e ) {
				var modal = TVMH.createElement( 'div', { 'class': 'tvmh-preview' }, [
					TVMH.createElement( 'div', { innerHTML: e } ),
					TVMH.createElement( 'button', { onclick: function () { modal.remove() }, innerText: 'Close' } ),
				] );
				self.content.appendChild( modal );
			} );
		},

		getPreview: function ( wikitext, title ) {
			const self = this;

			return new Promise( function ( resolve ) {
				TVMHApiWrapper.api.get( {
					action: 'parse',
					title: title,
					text: wikitext,
					prop: 'text'
				} ).then( function ( r ) {
					if ( r.error ) {
						resolve( '' );
					}
					resolve( r.parse.text['*'] );
				} )
			} )
		}
	};

	mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] ).then( TVMH.init.bind( TVMH ) );
} )();