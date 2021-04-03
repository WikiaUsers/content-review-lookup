/* Remaining issues:
 * Log edits except move (protect, import, revert) show as unpatrolled, despite
   not being real edits that can be patrolled, as there is no way to reliably
   detect them (they just look like normal edits, other than having a particular
   summary, which anyone could fake in any edit)
 * Imported edits show as unpatrolled, as there is no way to tell they are
   imported
 * Rollbacked edits show as unpatrolled if the rollback isn't visible
 */
// TODO: Revert to less ugly version once MW allows ES6+

// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';
// TODO: Use async once MW allows it
$( function() {
	var i18n = {
		autopatrolled: '已自动巡查',
		// $1 is the user, $2 is the timestamp
		patrolled: '由$1巡查（$2）',
		unpatrollable: '无法巡查',
		unpatrolled: '尚未巡查',
		autopatrolledLegend: '自动巡查的编辑',
		patrolledLegend: '已巡查编辑',
		unpatrollableLegend: '无法巡查的编辑',
		unpatrolledLegend: '尚未巡查的编辑',
		error: '无法拉取巡查信息。',
		rightsError: '无法获得自动巡查权限。',
		errorTitle: '巡查复核',
	};
	
	// Only run on real pages
	if ( mw.config.get( 'wgNamespaceNumber' ) === -1 ) {
		return;
	}
	
	// Script only works on history and diff pages
	var mode = mw.config.get( 'wgAction' );
	if ( mode === 'view' && document.querySelector( '.diff' ) ) {
		mode = 'diff';
	}
	if ( mode !== 'history' && mode !== 'diff' ) {
		return;
	}
	
	// Try to format a date in the user's interface language and timezone,
	// falling back to UTC, then falling back to just a plain timestamp
	var formatDate = ( function() {
		var lang = mw.config.get( 'wgUserLanguage' );
		// MW uses normal English date format, despite defaulting to US English
		if ( lang === 'en' ) {
			lang = 'en-GB';
		}
		// This will only work if the user set a timezone name, not a manual offset.
		// Dunno how to give Intl an offset, or convert an offset to a timezone name
		var timezone = mw.user.options.get( 'timecorrection' ).split( '|' )[2];
		if ( !timezone ) {
			timezone = 'UTC';
		}
		// Doesn't seem to be a simple way to test if Intl is supported, as older
		// browsers support just some of the features (timezones), so just have a go
		// and fallback to the timestamp if it doesn't work
		var dateFormatter;
		try {
			dateFormatter = new Intl.DateTimeFormat( lang, {
				day: 'numeric', month: 'long', year: 'numeric',
				hour: 'numeric', minute: 'numeric', hour12: false,
				timeZone: timezone,
			} );
		} catch( e ) {}
		
		return function( date ) {
			return dateFormatter ? dateFormatter.format( new Date( date ) ) : date;
		};
	}() );
	
	var arrayChunk = function( inArr, chunkSize ) {
		var outArr = [];
		for ( var i = 0; i < inArr.length; i += chunkSize ) {
			outArr.push( inArr.slice( i, i + chunkSize ) );
		}
		
		return outArr;
	};
	
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
	
	var makePatrolIcon = function( status, user, timestamp ) {
		var elem = document.createElement( 'span' );
		elem.className = 'revisionpatrol-icon-' + status;
		if ( status === 'patrolled' ) {
			elem.title = i18n[status]
				.replace( /\$1/g, user )
				.replace( /\$2/g, formatDate( timestamp ) );
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
	var users = {};
	var newestRevId;
	var oldestRevId;
	var checkMove = true;
	var rollback;
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
					bucket = revBuckets[prevPage] || {};
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
			
			var user = li.querySelector( '.mw-userlink' );
			if ( user ) {
				users[user.textContent] = true;
			}
			
			if ( li.querySelector( '.mw-tag-marker-mw-rollback' ) ) {
				rollback = true;
			} else if ( rollback ) {
				if ( rollback === true || rollback === user ) {
					rollback = user;
					li.classList.add( 'revisionpatrol-autopatrolled' );
				} else {
					rollback = false;
				}
			}
		} );
		revBuckets[curPage] = bucket;
		oldestRevId = curId;
	} else {
		var newestRev = document.querySelector( '.diff-ntitle' );
		var newestPage = findMovedRev( newestRev );
		var rollback;
		if ( newestPage === false ) {
			newestRevId = mw.config.get( 'wgRevisionId' );
			revBuckets[pageName] = {};
			revBuckets[pageName][newestRevId] = newestRev;
			revBuckets[pageName].end = newestRevId;
			
			var user = newestRev.querySelector( '.mw-userlink' );
			if ( user ) {
				users[user.textContent] = true;
			}
			
			if ( newestRev.querySelector( '.mw-tag-marker-mw-rollback' ) ) {
				rollback = true;
			}
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
			revBuckets[page][oldestRevId] = oldestRev;
			revBuckets[page].end = oldestRevId;
			
			var user = oldestRev.querySelector( '.mw-userlink' );
			if ( user ) {
				users[user.textContent] = true;
			}
			
			if ( rollback && !document.querySelector( '.diff-multi' ) ) {
				oldestRevHead.classList.add( 'revisionpatrol-autopatrolled' );
			}
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
	
	// Get userrights for users on the page, to check if they have autopatrol
	// in chunks of 50. This is done in parallel to the next request as rights
	// seems to be slow to request (and need not delay finding patrolled edits),
	// and to simplify the request, due to how the API handles continuing
	var usersChunks = arrayChunk( Object.keys( users ), 50 );
	var makeRightsReq = function() {
		return api.post( {
			action: 'query',
			list: 'users',
			ususers: usersChunks.shift(),
			usprop: 'rights',
			formatversion: 2,
		} ).then( function( resp ) {
			var apUsers = {};
			resp.query.users.forEach( function( user ) {
				if ( user.rights && user.rights.indexOf( 'autopatrol' ) > -1 ) {
					apUsers[user.name] = true;
				}
			} );
			
			if ( usersChunks.length ) {
				return makeRightsReq().then( function( data ) {
					return Object.assign( apUsers, data );
				} );
			}
			
			return apUsers;
		}, function( code, data ) {
			console.error( code, data.error && data.error.info );
			setTimeout( function() {
				mw.notify(
					i18n.rightsError,
					{ title: i18n.errorTitle, type: 'error', autoHide: false }
				);
			}, 2000 );
		} );
	};
	var rightsReq = makeRightsReq();
	
	// Get:
	// * oldest recentchanges entry to work out what the patrollable age limit is
	// * ids and timestamps for the revisions on the page
	// * if we need to check if the page was moved, also get the other revisions
	//   til the current one, with their tags and parsedcomment.
	// TODO: Use await once MW allows it
	var rcQuery = {
		list: 'recentchanges',
		rcprop: 'timestamp',
		rcdir: 'newer',
		rclimit: 1,
	};
	var revQuery = {
		titles: pageName,
		prop: 'revisions',
		rvprop: [ 'ids', 'timestamp' ],
		rvstartid: oldestRevId,
		rvdir: 'newer',
		rvlimit: 'max',
	};
	if ( checkMove ) {
		revQuery.rvprop.push( 'tags', 'parsedcomment' );
	} else {
		revQuery.rvendid = newestRevId;
	}
	
	var makeRevsRcReq = function( cont ) {
		var query = {
			action: 'query',
			formatversion: 2,
		};
		if ( !cont ) {
			Object.assign( query, rcQuery );
		}
		if ( !cont || cont.rvcontinue ) {
			Object.assign( query, revQuery );
		}
		Object.assign( query, cont );
		
		var revsRcReq = api.get( query )
			.fail( function( code, data ) {
				console.error( code, data.error && data.error.info );
			} );
		
		return revsRcReq.then( function( resp ) {
			var limit;
			var rc = resp.query.recentchanges;
			if ( rc ) {
				limit = new Date( rc[0].timestamp ).getTime();
				
				// Don't continue RC request, we only wanted the first result
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
					var curPage;
					if ( curPageLink ) {
						curPage = pageFromUrl( curPageLink.href );
						revBuckets[curPage] = revBuckets[pageName];
					}
					// If the page was originally the title it is now, then we
					// can just keep the current bucket name
					if ( curPage !== pageName ) {
						// Delete the old page name regardless of if we found the
						// current one as we can't check the patrols without it
						delete revBuckets[pageName];
					}
				}
				if ( rev.revid === newestRevId ) {
					haveAllDates = true;
				}
				return haveAllDates && foundMove;
			} );
			
			cont = resp['continue'];
			
			if ( cont && cont.rvcontinue && ( !haveAllDates || !foundMove ) ) {
				return makeRevsRcReq( cont ).then( function( data ) {
					return { limit: limit, dates: Object.assign( dates, data.dates ) };
				} );
			}
			
			return { limit: limit, dates: dates };
		} );
	};
	
	makeRevsRcReq().then( function( data ) {
		var dates = data.dates;
		var patrolLimit = data.limit;
		var patrolReqs = [ rightsReq ];
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
				leaction: 'patrol/patrol',
				leprop: [ 'details', 'user', 'timestamp' ],
				lestart: dates[endId],
				ledir: 'newer',
				lelimit: 'max',
				formatversion: 2,
			};
			
			var makePatrolReq = function( cont ) {
				// TODO: Use await once MW allows it
				var patrolReq = api.get( Object.assign( {}, patrolQuery, cont ) )
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
						
						var statusElem = mode === 'diff' ?
							revElem.querySelector( 'div > strong' ) : revElem;
						
						// Autopatrols prior to MW 1.27 are marked as normal patrols but
						// with the auto param set
						if ( patrol.params.auto ) {
							statusElem.classList.add( 'revisionpatrol-autopatrolled' );
							--totalRevs;
							return;
						}
						
						statusElem.classList.add( 'revisionpatrol-patrolled' );
						var icon = makePatrolIcon( 'patrolled', patrol.user, patrol.timestamp );
						statusElem.insertBefore( icon, statusElem.firstChild );
						
						// Remove any revisions previously assumed to be autopatrolled
						statusElem.classList.remove( 'revisionpatrol-autopatrolled' );
						
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
				// Anything not marked as patrolled still, is autopatrolled or not patrolled
				rightsReq.then( function( apUsers ) {
					// TODO: Use for..of once MW allows it
					Object.keys( ids ).forEach( function( revId ) {
						var revElem = ids[revId];
						var statusElem = mode === 'diff' ?
							revElem.querySelector( 'div > strong' ) : revElem;
						var status;
						var user = revElem.querySelector( '.mw-userlink' );
						if (
							statusElem.classList.contains( 'revisionpatrol-autopatrolled' ) ||
							( user && apUsers[user.textContent] )
						) {
							status = 'autopatrolled';
						} else {
							status = new Date( dates[revId] ).getTime() < patrolLimit ?
								'unpatrollable' : 'unpatrolled';
						}
						statusElem.classList.add( 'revisionpatrol-' + status );
						var icon = makePatrolIcon( status );
						statusElem.insertBefore( icon, statusElem.firstChild );
					} );
				} );
			}, function() {
				// Mission failed, we'll get 'em next time
				setTimeout( function() {
					mw.notify(
						i18n.error,
						{ title: i18n.errorTitle, type: 'error', autoHide: false }
					);
				}, 2000 );
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
				
				legendElem.innerHTML += '，<span class="revisionpatrol-icon-' +
					status + '-legend"> = ' + i18n[status + 'Legend'] + '</span>';
			};
			legendElem.innerHTML = legendElem.innerHTML.trim().slice( 0, -1 );
			addLegend( 'patrolled' );
			addLegend( 'autopatrolled' );
			addLegend( 'unpatrolled' );
			addLegend( 'unpatrollable' );
			legendElem.innerHTML += '。';
		} );
	}, function() {
		// Not worth looking through all patrols just for the one page
		// If this request failed, the next one probably would too anyway
		setTimeout( function() {
			mw.notify(
				i18n.error,
				{ title: i18n.errorTitle, type: 'error', autoHide: false }
			);
		}, 2000 );
		
		return;
	} );

	// Update diff when page is patrolled
	if ( mode === 'diff' ) {
		$( '.patrollink' ).find( 'a' ).click( function() {
			// The page is considered patrolled once the patrollink is gone
			var checkPatrolStatus = setInterval( function() {
				if ( document.querySelector( '.patrollink' ) ) {
					return;
				}
				
				clearInterval( checkPatrolStatus );
				
				var statusElem = document.querySelector( '#mw-diff-ntitle1 > strong' );
				statusElem.classList.remove( 'revisionpatrol-unpatrolled' );
				statusElem.classList.add( 'revisionpatrol-patrolled' );
				
				var icon = makePatrolIcon( 'patrolled', mw.config.get( 'wgUserName'), Date.now() );
				statusElem.querySelector( '.revisionpatrol-icon-unpatrolled' ).remove();
				statusElem.insertBefore( icon, statusElem.firstChild );
			}, 500 );
		} );
	}
} );