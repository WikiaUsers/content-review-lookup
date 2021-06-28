/**
 * @name TabViewMigrationHelper
 * @author Luqgreg
 * <nowiki>
 */
( function () {
	if (
		window.TVMHLoaded
		|| mw.config.get( 'wgNamespaceNumber' ) !== -1
		|| !(
			mw.config.get( 'wgTitle' ) === 'TVMH'
			|| (
				mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Blankpage'
				&& mw.config.get( 'wgTitle' ).endsWith( '/TVMH' )
	   		)
		)
	) {
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
		this.pageid = data.page_id || data.pageid;
		this.title = data.title;
		this.content = content;
		this.tabviews = this.findTabViews();
	}

	/** @returns {TVMHTabView[]} */
	TVMHPage.prototype.findTabViews = function () {
		const self = this;
		const parsed = TVMH.rawDetection && TVMH.domParser.parseFromString( this.content, 'text/html' );
		const out = [];

		if ( parsed && !parsed.querySelector( '.parseerror' ) ) {
			const nowikis = parsed.getElementsByTagName( 'nowiki' );
			for ( var i = 0; i < nowikis.length; i++ ) {
				const el = nowikis[i];
				el.parentNode.removeChild( el );
			}

			const pres = parsed.getElementsByTagName( 'pre' );
			for ( var i = 0; i < pres.length; i++ ) {
				const el = pres[i];
				el.parentNode.removeChild( el );
			}

			const tabviews = parsed.getElementsByTagName( 'tabview' );
			for ( var i = 0; i < tabviews.length; i++ ) {
				const el = tabviews[i];
				if ( el.innerText ) {
					out.push( el.innerText );
				}
			}
		} else {
			var match;
			var content = this.content.replace( TVMH.REGEX_NOWIKI, '' ).replace( TVMH.REGEX_PRE, '' );

			while ( match = TVMH.REGEX_TABVIEW.exec( content ) ) {
				out.push( match[1] );
			}

			while ( match = TVMH.REGEX_TABVIEW_ALT.exec( content ) ) {
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
			this.summary = 'Remediating TabView'
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

			var templateArg = self.page;
			if ( self.options.get( 'templateCut' ) && templateArg.startsWith( self.tabview.page.title + '/' ) ) {
				templateArg = templateArg.substring( tab.tabview.page.title.length )
			}
			const template = self.options.get( 'template' ).replace( /\$1/g, templateArg );

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
		CACHE_KEY: 'TVMH',
		REVCONTENT_LIMIT: 50,
		REVCONTENT_LIMIT_HIGH: 500,

		/** @typedef {{ text: string, timestamp: string }} TVMHRevision */
		/** @type {Object<string, TVMHRevision|Promise<TVMHRevision>>} */
		__revisionData: {},

		/**
		 * @param {string} title
		 * @returns {Promise<string>}
		 */
		loadRevisionData: function ( title ) {
			const self = this;

			title = title.trim().replace( /_/g, ' ' );
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

					resolve( Object.values( self.__handleRawRevisionData( r ) )[0].text );
				} );
			} );

			self.__revisionData[title] = promise;

			return promise;
		},

		/**
		 * @param {string[]} titles
		 * @returns {Promise<Object<string,string>>}
		 */
		loadRevisionDataMultiple: function ( titles ) {
			const self = this;
			const promises = [];
			const tofetch = [];

			for ( var i = 0; i < titles.length; i++ ) {
				const title = titles[i].trim().replace( /_/g, ' ' );

				if ( title in self.__revisionData ) {
					const cached = self.__revisionData[title];
					if ( cached instanceof Promise ) {
						promises.push( cached );
					}

					continue;
				}

				tofetch.push( title );
			}

			for ( var i = 0; i < Math.ceil( tofetch.length / this.REVCONTENT_LIMIT ); i++ ) {
				const part = tofetch.slice( i * this.REVCONTENT_LIMIT, ( i + 1 ) * this.REVCONTENT_LIMIT );

				const promise = new Promise( function ( resolve ) {
					self.api.post( {
						action: 'query',
						titles: part.join( '|' ),
						prop: 'revisions',
						rvprop: 'content|timestamp'
					} ).then( function ( r ) {
						resolve( self.__handleRawRevisionData( r ) );
					} );
				} );

				promises.push( promise );

				for ( var j = 0; j < part.length; j++ ) {
					const title = part[j];
					this.__revisionData[title] = promise.then( function( out ) {
						return out[title].text;
					} );
				}
			}

			return Promise.all( promises ).then( function() {
				const out = {};

				for ( var i = 0; i < titles.length; i++ ) {
					const title = titles[i];
					out[title] = self.__revisionData[title].text;
				}

				return out;
			} );
		},

		__handleRawRevisionData: function ( data ) {
			if ( data.error || !data.query ) {
				return {};
			}

			const out = {};

			for ( const id in data.query.pages ) {
				const page = data.query.pages[id];

				if ( page.hasOwnProperty( 'missing' ) || page.hasOwnProperty( 'invalid' ) ) {
					this.__revisionData[page.title] = { pageid: -1, text: '', timestamp: null };
					out[page.title] = this.__revisionData[page.title];
					continue;
				} else if ( !page.revisions ) {
					continue;
				}

				if ( page.revisions ) {
					const revision = page.revisions[0];
					this.__revisionData[page.title] = { pageid: page.pageid, text: revision['*'], timestamp: revision.timestamp };
					out[page.title] = this.__revisionData[page.title];
				}
			}

			return out;
		},

		/**
		 * EXPENSIVE BOI (used only for deep scan - it's needed because TagsReport is semi-broken on both legacy and UCP)
		 * @returns {Promise<TVMHPage[]>}
		 */
		loadAllPages: function ( callback ) {
			const self = this;

			const out = [];

			function __fetch( namespace, gapfrom, gapcontinue, rvcontinue ) {
				return new Promise( function ( resolve ) {
					self.api.get( {
						action: 'query',
						generator: 'allpages',
						gapnamespace: namespace,
						gapfrom: gapfrom,
						gapcontinue: gapcontinue,
						gaplimit: self.REVCONTENT_LIMIT,
						prop: 'revisions',
						rvcontinue: rvcontinue,
						rvprop: 'content|timestamp'
					} ).then( function ( r ) {
						const data = self.__handleRawRevisionData( r );

						const promises = [];

						if ( r['query-continue'] ) {
							if ( r['query-continue'].allpages && !rvcontinue ) {
								promises.push( __fetch( namespace, r['query-continue'].allpages.gapfrom ) );
							}
							if ( r['query-continue'].revisions ) {
								promises.push( __fetch( namespace, gapfrom, undefined, r['query-continue'].revisions.rvcontinue ) );
							}
						} else if ( r['continue'] ) {
							if ( r['continue'].gapcontinue && !rvcontinue ) {
								promises.push( __fetch( namespace, undefined, r['continue'].gapcontinue ) );
							} else if ( r['continue'].rvcontinue ) {
								promises.push( __fetch( namespace, undefined, gapcontinue, r['continue'].rvcontinue ) );
							}
						}

						for ( title in data ) {
							const page = new TVMHPage( r.query.pages[data[title].pageid], data[title].text ) ;
							out.push( page );
							callback( page );
						}

						Promise.all( promises ).then( resolve )
					} )
				} );
			}

			return new Promise( function ( resolve ) {
				self.api.get( {
					action: 'query',
					meta: 'siteinfo|userinfo',
					siprop: 'namespaces',
					uiprop: 'rights'
				} ).then( function ( r ) {
					if ( r.query.userinfo.rights.includes( 'apihighlimits' ) ) {
						self.REVCONTENT_LIMIT = self.REVCONTENT_LIMIT_HIGH;
					}

					const promises = [];

					for ( const ns in r.query.namespaces ) {
						if ( ns >= 0 ) {
							promises.push( __fetch( ns ) );
						}
					}

					Promise.all( promises ).then( function () {
						resolve( out );
					} );
				} )
			} );
		},

		__tagsReport: undefined,
		/**
		 * NOTE: TagsReport API is broken on UCP
		 * @returns {Promise<TVMHPage[]>}
		 */
		loadTagsReport: function ( callback ) {
			const self = this;

			function __fetch( continuetoken ) {
				return new Promise( function ( resolve ) {
					self.api.get( {
						action: 'tagsreport',
						tag: 'tabview',
						'continue': continuetoken,
						limit: 'max'
					} ).then( function ( r ) {
						if ( r.error ) {
							return resolve();
						}

						const titles = [];
						const data = {};

						for ( var i = 0; i < r.query.tagsreport.length; i++ ) {
							const tr = r.query.tagsreport[i];

							if (
								!tr.title.startsWith( 'MediaWiki:' )
								|| !( tr.title.endsWith( '.js' ) || tr.title.endsWith( '.css' ) )
							) {
								titles.push( tr.title );
								data[tr.title] = tr;
							}
						}

						const promises = [];

						if ( r['query-continue'] ) {
							promises.push( __fetch( r['query-continue'].tagsreport['continue'] ) );
						}

						if ( titles.length ) {
							promises.push(
								self.loadRevisionDataMultiple( titles ).then( function ( contents ) {
									for ( const title in data ) {
										const page = new TVMHPage( data[title], contents[title] );
										if ( page.tabviews.length ) {
											self.__tagsReport.push( page );
											callback( page );
										}
									}
								} )
							);
						}

						Promise.all( promises ).then( resolve );
					} )
				} );
			}

			return new Promise( function ( resolve ) {
				if ( TVMH.isUCP ) {
					return resolve( [] );
				}

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
					bot: true,
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
		REGEX_PRE: new RegExp( '<pre[^>]*>(.*?)<\\/pre>', 'gs' ),
		REGEX_TABVIEW: new RegExp( '<tabview[^>]*>(.*?)<\\/tabview>', 'gs' ),
		REGEX_TABVIEW_ALT: new RegExp( '{{#tag:tabview\\|(.*?)}}', 'gs' ), // it doesn't work with nested templates, just for detection

		rawDetection: false,

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
			const self = this;

			this.rawDetection = !!mw.util.getParamValue( 'rawdetection' );

			/*if ( this.isUCP ) {
				alert( 'TagsReport API on UCP is currently broken, which prevents the script from working properly.' );
				return;
			}*/

			TVMHApiWrapper.api = new mw.Api();

			const title = document.getElementsByTagName( 'title' )[0];
			title.innerText = title.innerText.replace( /^[^|]+/, 'TVHM ' );

			importArticle( {
				type: 'style',
				article: 'u:dev:MediaWiki:TVMH.css',
			} );

			this.loadUI();
			TVMHApiWrapper.loadTagsReport( this.addTarget.bind( this ) ).then( function () {
				self.pagelist.classList.remove( 'loading' );
			} );
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

		loadUI: function () {
			const self = this;

			this.workbench = this.createElement( 'div', { id: 'tvmh-workbench' } );
			this.pagelist = this.createElement( 'ul', { 'class': 'loading' } );
			this.content = this.createElement(
				'div', { id: 'tvmh-container' },
				[
					this.createElement( 'div', { id: 'tvmh-pagelist' }, [
						this.pagelist,
						this.createElement( 'button', { innerText: 'Deep scan', onclick: this.runDeepScan.bind( this ) } )
					] ),
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

		/** @param {TVMHPage} target */
		addTarget: function ( target ) {
			if (
				target.tabviews.length
				&& ( !target.title.startsWith( 'MediaWiki:' ) || !( target.title.endsWith( '.js' ) || target.title.endsWith( '.css' ) ) )
				&& !Array.from( this.pagelist.children ).find( function( e ) { return e.textContent === target.title } )
			) {
				this.pagelist.appendChild(
					this.createElement( 'li', { innerText: target.title, onclick: this.loadWorkbench.bind( this, target ) } )
				);
			}
		},

		triggerOptionsChange: function () {
			for ( var i = 0; i < this.onOptionsChange.length; i++ ) {
				this.onOptionsChange[i]();
			}
		},

		/**
		 * @param {TVMHPage} page
		 * @param {Event} e
		 */
		loadWorkbench: function ( page, e ) {
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
					document.createTextNode( '[' + page.pageid + '] ' ),
					this.createElement( 'a', { href: mw.util.getUrl( page.title ), innerText: page.title } )
				] )
			);
			this.workbench.appendChild( loading );

			if ( !page.content ) {
				loading.innerText = 'Unknown error occured, while trying to retreive latest revision, please try again later.';
				return;
			}

			this.currentPage = page;

			if ( !page.tabviews.length ) {
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

			const allchanges = self.createElement( 'textarea', { textContent: page.content } );
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
				tabContents.push( self.createElement( 'div', { 'data-tab': i }, self.loadTabViewWorkbench( self.currentPage.tabviews[i], page ) ) );
			}

			tabLabels.push( self.createElement( 'li', { innerText: 'Raw content', 'data-tab': i, onclick: swapWorkbench } ) );
			tabContents.push( self.createElement( 'pre', { innerText: page.content, 'data-tab': i } ) );
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
		},

		/**
		 * @param {TVMHTabView} tabview
		 * @param {TVMHPage} page
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
		},

		runDeepScan: function ( e ) {
			const self = this;

			if ( confirm( 'Are you sure? It is an expensive operation, that may take a while.' ) ) {
				e.target.remove();
				this.pagelist.classList.add( 'loading' );
				const oldpe1 = this.workbench.style.pointerEvents;
				const oldpe2 = this.pagelist.style.pointerEvents;
				this.workbench.style.pointerEvents = 'none';
				this.pagelist.style.pointerEvents = 'none';

				TVMHApiWrapper.loadAllPages( this.addTarget.bind( this ) ).then( function() {
					self.pagelist.classList.remove( 'loading' );
					self.workbench.style.pointerEvents = oldpe1;
					self.pagelist.style.pointerEvents = oldpe2;
				} );
			}
		}
	};

	mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] ).then( TVMH.init.bind( TVMH ) );
} )();
/* </nowiki> */