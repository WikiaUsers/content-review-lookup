$.when(
	mw.loader.using( [ 'mediawiki.api', 'mediawiki.ForeignApi' ] ),
	$.ready
).then( function () {
	var sourceWikiRoot = 'https://bindingofisaacrebirth.fandom.com',
		targetWikiRoot = 'https://bindingofisaacrebirth.fandom.com/fr',
		targetApi      = new mw.Api();

	/**
	* @typedef {{ pageid: number, title: string }} PageQueryResult
	* @typedef {{ fromid: number }} RedirectQueryResult
	* @typedef {{ page: string, revision: string }} CargoQueryResult
	* @typedef {{ source: PageQueryResult?, target: PageQueryResult?, oldRevision: number, newRevision: number }} RowData
	*/

	/**
	 * @constructor
	 * @param {JQuery} $table
	 */
	function TranslationList( $table ) {
		var self      = this,
			namespace = $table.attr( 'data-translation-list-ns' );

		this.$table      = $table;
		this.namespace   = namespace ? +namespace : 0;
		/** @type {PageQueryResult[]} */
		this.sourcePages = [];
		/** @type {PageQueryResult[]} */
		this.targetPages = [];
		/** @type {RowData[]} */
		this.rows        = [];

		Promise.all( [
			this.foreignApiQueryAllPages( sourceWikiRoot ),
			this.apiQueryAllPages( targetApi ),
			this.apiCargoQueryAll(),
			this.foreignApiQueryAllRedirects( sourceWikiRoot ),
			this.apiQueryAllRedirects( targetApi )
		] ).then( function ( data ) {
			self.onDataFetch( data );
		} );
	}

	/**
	 * @param {[ PageQueryResult[], PageQueryResult[], CargoQueryResult[], RedirectQueryResult[], RedirectQueryResult[] ]} data
	 */
	TranslationList.prototype.onDataFetch = function ( data ) {
		var self = this;

		this.sourcePages = data[ 0 ].filter( filter, data[ 3 ] );
		this.targetPages = data[ 1 ].filter( filter, data[ 4 ] );

		Promise.all( data[ 2 ].map( this.linkCargoTuple, this ) ).then( function ( rows ) {
			rows = self.sourcePages.reduce( accUnlinkedSourcePage, rows );
			rows = self.targetPages.reduce( accUnlinkedTargetPage, rows );
			self.rows = rows;
			self.fillTable();
		} );
	};

	/**
	 * @this {RedirectQueryResult[]}
	 * @param {PageQueryResult} p
	 */
	function filter( p ) {
		for ( var i in this ) {
			if ( this[ i ].fromid === p.pageid ) {
				return false;
			}
		}
		return true;
	}

	TranslationList.prototype.fillTable = function () {
		var $table = this.$table,
			$tbody = $table.children( 'tbody' ).empty(),
			rows   = this.rows;

		for ( var i in rows ) {
			var row       = rows[ i ],
				$tr       = $( '<tr>' ).appendTo( $tbody ),
				$targetTd = $( '<td>' ).appendTo( $tr ),
				$lArrowTd = $( '<td>' ).appendTo( $tr ),
				$statusTd = $( '<td>' ).appendTo( $tr ),
				$rArrowTd = $( '<td>' ).appendTo( $tr ),
				$sourceTd = $( '<td>' ).appendTo( $tr );

			// TODO: Check if an existing function can be used instead.
			if ( $table.hasClass( 'mw-collapsed' ) ) {
				$tr.css( 'display', 'none' );
			}

			// Fills the source page cells
			if ( row.source ) {
				$rArrowTd.html( '←' );
				$sourceTd.html(
					'<a href="' + sourceWikiRoot + '/index.php?curid=' + row.source.pageid + '">' +
					row.source.title + '</a>'
				);
			} else {
				$tr.addClass( 'translation-list-nosource' );
				$rArrowTd.css( 'color', 'grey' ).html( '⬾' );
			}

			// Fills the target page cells
			if ( row.target ) {
				$targetTd.html(
					'<a href="' + targetWikiRoot + '/index.php?curid=' + row.target.pageid + '">' +
					row.target.title + '</a>'
				);
				$lArrowTd.html( '→' );
			} else {
				$tr.addClass( 'translation-list-notarget' );
				$lArrowTd.css( 'color', 'grey' ).html( '⥇' );
			}

			// If the source or target page is unlinked.
			if ( !row.source || !row.target ) {
				$statusTd.css( 'color', 'darkred' ).html( '☒' );
				continue;
			}

			// If the translation is up-to-date.
			if ( row.oldRevision === row.newRevision ) {
				$tr.addClass( 'translation-list-uptodate' );
				$statusTd.css( 'color', 'green' ).html( '☑' );
				continue;
			}

			// If the translation is outdated.
			$tr.addClass( 'translation-list-outdated' );
			$targetTd.html(
				'<a href="' + targetWikiRoot + '/index.php?curid=' + row.target.pageid +
				'&action=edit">' + row.target.title + '</a>'
			);
			$statusTd.html(
				'<a href="' + sourceWikiRoot + '/index.php?type=revision&diff=' + row.newRevision +
				'&oldid=' + row.oldRevision + '" style="color: red">☒</a>'
			);
		}
	};

	/**
	 * @param {CargoQueryResult} cargoTuple
	 */
	TranslationList.prototype.linkCargoTuple = function ( cargoTuple ) {
		/** @type {RowData} */
		var row = {
			source: null,
			target: null,
			oldRevision: +cargoTuple.revision,
			newRevision: 0
		};

		var targetPageTitle = cargoTuple.page;
		var targetPage      = this.targetPages.find( function ( targetPage ) {
			return targetPage.title === targetPageTitle;
		} );

		if ( !targetPage ) {
			mw.log.warn( 'Missing page ("' + row.oldRevision + '") with translation template.' );
			return row;
		}

		row.target = {
			pageid: targetPage.pageid,
			title: targetPage.title
		};

		return $.getJSON( sourceWikiRoot + '/api.php', {
			format: 'json',
			action: 'query',
			prop: 'info',
			revids: row.oldRevision
		} ).then( function ( data ) {
			/** @type {?{ [ key: string ]: PageQueryResult & { lastrevid: string } }} */
			var pages = data.query.pages;

			if ( !pages || pages[ '-1' ] ) {
				mw.log.warn(
					'Invalid revision ID ("' + row.oldRevision + '") from translation template ' +
					'on page "' + row.target.title + '".'
				);
				return row;
			}

			for ( var i in pages ) {
				var sourcePage = pages[ i ];
				row.source = {
					pageid: +i,
					title: sourcePage.title
				};
				row.newRevision = +sourcePage.lastrevid;
			}

			return row;
		} );
	};

	/**
	 * Queries all pages.
	 * @param {mwApi} api MediaWiki API.
	 * @returns {PageQueryResult[] | JQuery.Promise<PageQueryResult[]>} The page array promise.
	 */
	TranslationList.prototype.apiQueryAllPages = function ( api ) {
		var args = {
			action: 'query',
			list: 'allpages',
			rawcontinue: true,
			apnamespace: this.namespace,
			aplimit: 500
		};
		return _apiQueryAllPages( api, args, [] );
	};

	/**
	 * Queries all redirects.
	 * @param {mwApi} api MediaWiki API.
	 * @returns {RedirectQueryResult[] | JQuery.Promise<RedirectQueryResult[]>} The page array promise.
	 */
	TranslationList.prototype.apiQueryAllRedirects = function ( api ) {
		var args = {
			action: 'query',
			list: 'allredirects',
			rawcontinue: true,
			arprop: 'ids',
			arnamespace: this.namespace,
			arlimit: 500
		};
		return _apiQueryAllPages( api, args, [] );
	};

	/**
	 * @param {mwApi} api
	 * @param {*} args
	 * @param {PageQueryResult[]} storage
	 * @returns {any[] | JQuery.Promise<any[]>}
	 */
	function _apiQueryAllPages( api, args, storage ) {
		return api.get( args ).then( function ( data ) {
			for ( var arg in data.query ) {
				storage = storage ? storage.concat( data.query[ arg ] ) : data.query[ arg ];
			}
			if ( !data[ 'query-continue' ] ) {
				return storage;
			}
			for ( var i in data[ 'query-continue' ] ) {
				for ( var arg in data[ 'query-continue' ][ i ] ) {
					args[ arg ] = data[ 'query-continue' ][ i ][ arg ];
				}
			}
			return _apiQueryAllPages( api, args, storage );
		} );
	}

	/**
	 * Queries all pages.
	 * @param {string} api MediaWiki API.
	 * @returns {PageQueryResult[] | JQuery.Promise<PageQueryResult[]>} The page array promise.
	 */
	TranslationList.prototype.foreignApiQueryAllPages = function ( api ) {
		var args = {
			format: 'json',
			action: 'query',
			list: 'allpages',
			rawcontinue: true,
			apnamespace: this.namespace,
			aplimit: 500
		};
		return _foreignApiQueryAllPages( api, args, [] );
	};

	/**
	 * Queries all redirects.
	 * @param {string} api MediaWiki API.
	 * @returns {RedirectQueryResult[] | JQuery.Promise<RedirectQueryResult[]>} The page array promise.
	 */
	TranslationList.prototype.foreignApiQueryAllRedirects = function ( api ) {
		var args = {
			format: 'json',
			action: 'query',
			list: 'allredirects',
			rawcontinue: true,
			arprop: 'ids',
			arnamespace: this.namespace,
			arlimit: 500
		};
		return _foreignApiQueryAllPages( api, args, [] );
	};

	/**
	 * @param {string} api
	 * @param {*} args
	 * @param {PageQueryResult[]} storage
	 * @returns {any[] | JQuery.Promise<any[]>}
	 */
	function _foreignApiQueryAllPages( api, args, storage ) {
		return $.getJSON( api + '/api.php', args ).then( function ( data ) {
			for ( var arg in data.query ) {
				storage = storage ? storage.concat( data.query[ arg ] ) : data.query[ arg ];
			}
			if ( !data[ 'query-continue' ] ) {
				return storage;
			}
			for ( var i in data[ 'query-continue' ] ) {
				for ( var arg in data[ 'query-continue' ][ i ] ) {
					args[ arg ] = data[ 'query-continue' ][ i ][ arg ];
				}
			}
			return _foreignApiQueryAllPages( api, args, storage );
		} );
	}

	/**
	 * Queries all tuples from the maintenance Cargo table.
	 * @returns The tuple array promise.
	 */
	TranslationList.prototype.apiCargoQueryAll = function () {
		return targetApi.get( {
			action: 'cargoquery',
			tables: 'maintenance',
			fields: '_pageName=page,revision',
			where: '_pageNamespace=' + this.namespace,
			limit: 500
		} ).then( getCargoDataTitles );
	};

	/**
	 * @param {RowData[]} rows
	 * @param {PageQueryResult} sourcePage
	 */
	function accUnlinkedSourcePage( rows, sourcePage ) {
		var pageid = sourcePage.pageid;

		if ( !rows.find( function ( row ) {
			return row.source && row.source.pageid === pageid;
		} ) ) {
			rows.push( {
				source: {
					pageid: pageid,
					title: sourcePage.title
				},
				target: null,
				oldRevision: 0,
				newRevision: 0
			} );
		}

		return rows;
	}

	/**
	 * @param {RowData[]} rows
	 * @param {PageQueryResult} targetPage
	 */
	function accUnlinkedTargetPage( rows, targetPage ) {
		var pageid = targetPage.pageid;

		if ( !rows.find( function ( row ) {
			return row.target && row.target.pageid === pageid;
		} ) ) {
			rows.push( {
				source: null,
				target: {
					pageid: pageid,
					title: targetPage.title
				},
				oldRevision: 0,
				newRevision: 0
			} );
		}

		return rows;
	}

	/**
	 * Gets the title objects from a Cargo query result.
	 * @param {{ cargoquery: { title: CargoQueryResult }[] }} data 
	 */
	function getCargoDataTitles( data ) {
		return data.cargoquery.map( getTitle );
	}

	/**
	 * Gets the title property of an object.
	 * @template T
	 * @param {{ title: T }} obj Object.
	 * @returns The title property of the given object.
	 */
	function getTitle( obj ) {
		return obj.title;
	}

	$( '.translation-list' ).each( function () {
		new TranslationList( $( this ) );
	} );
} );