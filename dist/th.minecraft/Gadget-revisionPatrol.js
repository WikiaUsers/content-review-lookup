/* Remaining issues:
 * Log edits except move (protect, import, revert) show as unpatrolled, despite
   not being real edits that can be patrolled, as there is no way to reliably
   detect them (they just look like normal edits, other than having a particular
   summary, which anyone could fake in any edit)
 * Imported edits show as unpatrolled, as there is no way to tell they are
   imported
 * Rollbacked edits are not marked as autopatrolled
 */
// TODO: Revert to less ugly version once MW allows ES6+

// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';
// TODO: Use async once MW allows it
$( function() {
	var i18n = {
		autopatrolled: 'Autopatrolled',
		patrolled: 'Patrolled by $1',
		unpatrollable: 'Unpatrollable',
		unpatrolled: 'Unpatrolled',
		autopatrolledLegend: 'autopatrolled edit',
		patrolledLegend: 'patrolled edit',
		unpatrollableLegend: 'unpatrollable edit',
		unpatrolledLegend: 'unpatrolled edit',
		error: 'Failed to retrieve patrol information',
		errorTitle: 'RevisionPatrol',
	};
	
	// Script only works on history and diff pages
	var mode = mw.config.get( 'wgAction' );
	if ( mode === 'view' && document.querySelector( '.diff' ) ) {
		mode = 'diff';
	}
	if ( mode !== 'history' && mode !== 'diff' ) {
		return;
	}
	
	// Gets the page name from a full URL
	// Would've thought MW would have a built-in function for this
	var pageFromUrl = function( url ) {
		return mw.util.getParamValue( 'title', url ) || decodeURIComponent(
			url.slice( (
				mw.config.get( 'wgServer' ) +
				mw.config.get( 'wgArticlePath' ).slice( 0, -2 )
			).length )
		);
	};
	
	// Find the original page name of a moved revision
	// Returns false if it wasn't moved, null if it was moved but the page
	// was unable to be determined, or the page name if it was moved
	var findMovedRev = function( revElem ) {
		if ( !revElem.querySelector( '.mw-tag-marker-move' ) ) {
			return false;
		}
		
		var pageLink = revElem.querySelector( '.comment > a' );
		// Page name was too long to include in the summary, RIP
		if ( !pageLink ) {
			return null;
		}
		
		return pageFromUrl( pageLink.href );
	};
	
	var makePatrolIcon = function( status, user ) {
		var elem = document.createElement( 'span' );
		elem.className = 'revisionpatrol-icon-' + status;
		if ( status === 'patrolled' ) {
			elem.title = i18n[status].replace( /\$1/g, user );
		} else {
			elem.title = i18n[status];
		}
		
		return elem;
	};
	
	var api = new mw.Api();
	var pageName = mw.config.get( 'wgPageName' ).replace( /_/g, ' ' );
	
	// Get the ids for all the revisions on the page, bucketed by page name at
	// the time, and store their associated element
	var revBuckets = {};
	var newestRevId;
	var oldestRevId;
	var checkMove = true;
	if ( mode === 'history' ) {
		var curPage = pageName;
		var bucket = {};
		var curId;
		var revElems = document.querySelectorAll( '#pagehistory li' );
		// TODO: Use for..of once MW allows it
		Array.prototype.forEach.call( revElems, function( li, i ) {
			var prevPage = findMovedRev( li );
			// Start a new bucket for moved revisions
			if ( prevPage !== false ) {
				if ( i === 0 ) {
					checkMove = false;
				} else {
					if ( curPage !== null ) {
						revBuckets[curPage] = bucket;
					}
					bucket = {};
				}
				curPage = prevPage;
				return;
			}
			if ( curPage === null ) {
				return;
			}
			
			var revUrl = li.querySelector( '.mw-changeslist-date' ).href;
			curId = Number( mw.util.getParamValue( 'oldid', revUrl ) );
			if ( !newestRevId ) {
				newestRevId = curId;
			}
			bucket[curId] = li;
			bucket.end = curId;
		} );
		revBuckets[curPage] = bucket;
		oldestRevId = curId;
	} else {
		var newestRev = document.querySelector( '.diff-ntitle' );
		var newestRevHead = document.querySelector( '#mw-diff-ntitle1 > strong' );
		var newestPage = findMovedRev( newestRev );
		if ( newestPage === false ) {
			newestRevId = mw.config.get( 'wgRevisionId' );
			revBuckets[pageName] = {};
			revBuckets[pageName][newestRevId] = newestRevHead;
			revBuckets[pageName].end = newestRevId;
		} else {
			checkMove = false;
		}
		
		var oldestRev = document.querySelector( '.diff-otitle' );
		var page = newestPage || pageName;
		if ( findMovedRev( oldestRev ) === false ) {
			var oldestRevHead = document.querySelector( '#mw-diff-otitle1 > strong' );
			var oldestRevUrl = oldestRevHead.querySelector( 'a' ).href;
			oldestRevId = Number( mw.util.getParamValue( 'oldid', oldestRevUrl ) );
			revBuckets[page] = ( revBuckets[page] || {} );
			revBuckets[page][oldestRevId] = oldestRevHead;
			revBuckets[page].end = oldestRevId;
		}
		oldestRevId = oldestRevId || newestRevId;
		newestRevId = newestRevId || oldestRevId;
	}
	// Nothing patrollable on the page
	if ( !oldestRevId ) {
		return;
	}
	
	// No need to check if the page was moved if we can see the latest revision
	if ( newestRevId === mw.config.get( 'wgCurRevisionId' ) ) {
		checkMove = false;
	}
	
	// Retrieve the oldest recentchanges entry to work out what the patrollable
	// age limit is, and the ids and timestamps for the revisions on the page
	// and if we need to check if the page was moved, also get all the revisions
	// til the latest one with the tags and the parsedcomment.
	// TODO: Use await once MW allows it
	var revsRcQuery = {
		action: 'query',
		list: 'recentchanges',
		rcprop: 'timestamp',
		rcdir: 'newer',
		rclimit: 1,
		titles: pageName,
		prop: 'revisions',
		rvprop: [ 'ids', 'timestamp' ],
		rvstartid: oldestRevId,
		rvdir: 'newer',
		rvlimit: 'max',
		formatversion: 2,
	};
	if ( checkMove ) {
		revsRcQuery.rvprop.push( 'tags', 'parsedcomment' );
	} else {
		revsRcQuery.rvendid = newestRevId;
	}
	var makeRevsRcReq = function( cont, limit ) {
		var dateReq = api.get( Object.assign( revsRcQuery, cont ) )
			.fail( function( code, data ) {
				console.error( code, data.error && data.error.info );
			} );
		
		return dateReq.then( function( resp ) {
			var rc = resp.query.recentchanges;
			if ( rc ) {
				limit = new Date( rc[0].timestamp ).getTime();
				
				// Don't continue RC request, we only wanted the first result
				delete revsRcQuery.list;
				delete revsRcQuery.rcprop;
				delete revsRcQuery.rcdir;
				delete revsRcQuery.rclimit;
				delete resp['continue'].rccontinue;
			}
			
			var dates = {};
			var haveAllDates;
			var foundMove = !checkMove;
			resp.query.pages[0].revisions.some( function( rev ) {
				dates[rev.revid] = rev.timestamp;
				if ( !foundMove && haveAllDates && rev.tags.indexOf( 'move' ) > -1 ) {
					foundMove = true;
					// Update page name
					var comment = $( '<i>' ).html( rev.parsedcomment )[0];
					var curPageLink = comment.querySelector( 'a' );
					if ( curPageLink ) {
						var curPage = pageFromUrl( curPageLink.href );
						revBuckets[curPage] = revBuckets[pageName];
					}
					// Delete the old page name regardless of if we found the
					// current one as we can't check the patrols without it
					delete revBuckets[pageName];
				}
				if ( rev.revid === newestRevId ) {
					haveAllDates = true;
				}
				return haveAllDates && foundMove;
			} );
			
			cont = resp['continue'];
			
			if ( cont && cont.rvcontinue && ( !haveAllDates || !foundMove ) ) {
				return makeRevsRcReq( cont ).then( function( data ) {
					return { dates: Object.assign( dates, data.dates ), limit: limit };
				} );
			}
			
			return { dates: dates, limit: limit };
		} );
	};
	
	makeRevsRcReq().then( function( data ) {
		var dates = data.dates;
		var patrolLimit = data.limit;
		var patrolReqs = [];
		$.each( revBuckets, function( page, ids ) {
			var endId = ids.end;
			if ( !endId ) {
				return;
			}
			delete ids.end;
			var totalRevs = Object.keys( ids ).length;
			// Get all the patrols that happened after the last revision
			var patrolQuery = {
				action: 'query',
				list: 'logevents',
				letitle: page,
				letype: 'patrol',
				leprop: [ 'details', 'user' ],
				lestart: dates[endId],
				ledir: 'newer',
				lelimit: 'max',
				formatversion: 2,
			};
			
			var makePatrolReq = function( cont ) {
				// TODO: Use await once MW allows it
				var patrolReq = api.get( Object.assign( patrolQuery, cont ) )
					.fail( function( code, data ) {
						console.error( code, data.error && data.error.info );
					} );
				
				return patrolReq.then( function( resp ) {
					// Mark off patrolled edits as we go, as older history pages may
					// take multiple requests before all the patrol entries are checked
					// TODO: Use for..of once MW allows it
					resp.query.logevents.forEach( function( patrol ) {
						var revElem = ids[patrol.params.curid];
						if ( !revElem ) {
							return;
						}
						
						var status = patrol.params.auto ? 'autopatrolled' : 'patrolled';
						revElem.classList.add( 'revisionpatrol-' + status );
						var icon = makePatrolIcon( status, patrol.user );
						revElem.insertBefore( icon, revElem.firstChild );
						
						delete ids[patrol.params.curid];
						--totalRevs;
					} );
			
					cont = resp['continue'];
					if ( cont && totalRevs > 0 ) {
						return makePatrolReq( cont );
					}
				} );
			};
			patrolReqs.push( makePatrolReq().then( function() {
				// Anything not marked as patrolled still, hasn't been patrolled
				// TODO: Use for..of once MW allows it
				Object.keys( ids ).forEach( function( revId ) {
					var revElem = ids[revId];
					var status = new Date( dates[revId] ).getTime() < patrolLimit ?
						'unpatrollable' : 'unpatrolled';
					revElem.classList.add( 'revisionpatrol-' + status );
					var icon = makePatrolIcon( status );
					revElem.insertBefore( icon, revElem.firstChild );
				} );
			}, function() {
				// Mission failed, we'll get 'em next time
				mw.notify(
					i18n.error,
					{ title: i18n.errorTitle, type: 'error', autoHide: false }
				);
				return;
			} ) );
		} );
		
		if ( mode !== 'history' ) {
			return;
		}
		
		$.when.apply( null, patrolReqs ).then( function() {
			// Add the patrol icons to the legend
			var legendElem = document.querySelector( '.mw-history-legend > p' );
			var addLegend = function( status ) {
				if ( !document.querySelector( '.revisionpatrol-' + status ) ) {
					return;
				}
				
				legendElem.innerHTML += ', <span class="revisionpatrol-icon-' +
					status + '-legend"> = ' + i18n[status + 'Legend'] + '</span>';
			};
			legendElem.innerHTML = legendElem.innerHTML.trim().slice( 0, -1 );
			addLegend( 'patrolled' );
			addLegend( 'autopatrolled' );
			addLegend( 'unpatrolled' );
			addLegend( 'unpatrollable' );
			legendElem.innerHTML += '.';
		} );
	}, function() {
		// Not worth looking through all patrols just for the one page
		// If this request failed, the next one probably would too anyway
		mw.notify(
			i18n.error,
			{ title: i18n.errorTitle, type: 'error', autoHide: false }
		);
		
		return;
	} );
} );