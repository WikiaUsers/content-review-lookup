//<nowiki>
/*********************************************************************
**                ***WARNING: GLOBAL GADGET FILE***                 **
**         any changes to this file will affect many users          **
**          please discuss changes on the talk page or at           **
**             [[Wikipedia talk:Gadget]] before editing             **
**     (consider dropping the script author a note as well...)      **
**********************************************************************
**                                                                  **
**          SOURCED BY [[MediaWiki:Gadget-MoreMenu.js]]             **
**                                                                  **
**********************************************************************
**             Script:        MoreMenu                              **
**            Version:        3.1.7                                 **
**             Author:        MusikAnimal                           **
**      Documentation:        [[User:MusikAnimal/MoreMenu]]         **
**                                                                  **
*********************************************************************/

( function( ) {
	var api = new mw.Api(), admin = false, userGroups = mw.config.get( 'wgUserGroups' ),
		namespaceNumber = mw.config.get( 'wgNamespaceNumber' ), canonicalSpecialPageName = mw.config.get( 'wgCanonicalSpecialPageName' ),
		isPageProtected = ( !!mw.config.get( 'wgRestrictionEdit' ) && mw.config.get( 'wgRestrictionEdit' ).length ) || 
			( !!mw.config.get( 'wgRestrictionCreate' ) && mw.config.get( 'wgRestrictionCreate' ).length ),
		serverName = mw.config.get( 'wgServerName' ), siteName = mw.config.get( 'wgSiteName' ),
		contentLanguage = mw.config.get( 'wgContentLanguage' ), noticeProject = mw.config.get( 'wgNoticeProject' ),
		articleId = mw.config.get( 'wgArticleId' ), mwDBname = mw.config.get( 'wgDBname' ),
		sysopList = [ 'steward', 'sysop', 'global-sysop', 'Global_sysops' ],
		pageName = mw.config.get( 'wgPageName' ), userName = mw.config.get( 'wgRelevantUserName' );
	var escapedPageName = encodeURIComponent( pageName.replace( /[!'()*]/g, escape ) ),
		escapedUserName = encodeURIComponent( userName ).replace( /[!'()*]/g, escape );

	$("#ca-protect,#ca-unprotect,#ca-delete,#ca-undelete,#ca-move").hide();

	for ( var i=0; i < userGroups.length; i++ ) {
		if ( sysopList.indexOf( userGroups[ i ] ) !== -1 ) {
			admin = true;
			break;
		}
	}

	if ( namespaceNumber === 2 || namespaceNumber === 3 || canonicalSpecialPageName == 'Contributions' ) addUserMenu( userName );
	if ( namespaceNumber >= 0 ) addPageMenu();

	addListeners();

	function addUserMenu( userName ) {
		menuList = {
			'User logs' : {
				'All logs' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName } )
				},
				'Block log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'block' } ),
					rights : sysopList
				},
				'Deletion log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'delete' } ),
					rights : sysopList
				},
				'Filter log' : {
					url : mw.util.getUrl( 'Special:AbuseLog', { wpSearchUser: userName } )
				},
				'Mass message log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'massmessage' } ),
					rights : sysopList.concat( [ 'massmessage-sender' ] )
				},
				'Move log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'move' } ),
					rights : [ 'confirmed', 'autoconfirmed' ]
				},
				'Pending changes log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'stable' } ),
					rights : sysopList
				},
				'Protection log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'protect' } ),
					rights : sysopList
				},
				'Review log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'review' } ),
					rights : sysopList.concat( [ 'reviewer' ] )
				},
				'Thanks log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'thanks' } ),
					rights : [ 'user' ]
				},
				'Upload log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'upload' } ),
					rights : [ 'confirmed', 'autoconfirmed' ]
				},
				'User creation log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'newusers' } ),
					rights : sysopList.concat( [ 'accountcreator' ] )
				},
				'User rights log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', user: userName, type: 'rights' } ),
					rights : sysopList.concat( [ 'epcoordinator' ] )
				}
			},
			'RfXs' : {
				'RfAs' : {
					url : mw.util.getUrl( 'Special:PrefixIndex/Wikipedia:Requests_for_adminship/' + userName, { action: 'view' } ),
					title : 'Requests for Adminship'
				},
				'RfBs' : {
					url : mw.util.getUrl( 'Special:PrefixIndex/Wikipedia:Requests_for_bureaucratship/' + userName, { action: 'view' } ),
					title : 'Requests for Bureaucratship'
				},
				'RfAr' : {
					url : mw.util.getUrl( 'Wikipedia:Requests_for_arbitration/' + userName, { action: 'view' } ),
					title : 'Requests for Arbitration'
				},
				'RfC' : {
					url : mw.util.getUrl( 'Wikipedia:Requests_for_comment/' + userName, { action: 'view' } ),
					title : 'Requests for Comment'
				},
				'RfCU' : {
					url : mw.util.getUrl( 'Wikipedia:Requests_for_checkuser/Case/' + userName, { action: 'view' } ),
					title : 'Request for Checkuser'
				},
				'SPI' : {
					url : mw.util.getUrl( 'Wikipedia:Sockpuppet_investigations/' + userName, { action: 'view' } ),
					title : 'Sockpuppet investigations (as the sockmaster)'
				}
			},
			'Blocks' : {
				'Block user' : {
					url : mw.util.getUrl( 'Special:Block/' + userName, { action: 'view' } ),
					userRights : sysopList
				},
				'Unblock user' : {
					url : mw.util.getUrl( 'Special:Unblock/' + userName ),
					userRights : sysopList
				},
				'View block' : {
					url : mw.util.getUrl( 'Special:BlockList', { wpTarget: userName } )
				},
				'View block log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', page: userName, type: 'block' } )
				}
			},
			'Analysis' : {
				'Analysis – Supercount' : {
					url : '//tools.wmflabs.org/supercount/index.php?project=' + serverName + '&user=' + escapedUserName,
					title : 'Cyberpower678s User Analysis Tool'
				},
				'Analysis – WikiChecker' : {
					url : 'http://' + contentLanguage + '.wikichecker.com/user/?l=all&t=' + escapedUserName,
					databaseRestrict : [ 'enwiki', 'jawiki', 'frwiki', 'ruwiki' ],
				},
				'Analysis – XTools' : {
					url : '//tools.wmflabs.org/xtools/ec/?user=' + escapedUserName + '&project=' + serverName
				},
				'Articles created' : {
					url : '//tools.wmflabs.org/xtools/pages/?user=' + escapedUserName + '&project='+ serverName + '&namespace=0&redirects=none',
					rights : ['user']
				},
				'Autoblocks' : {
					url : '//tools.wmflabs.org/xtools/autoblock/?user=' + escapedUserName + '&project=' + serverName
				},
				'Edit summary usage' : {
					url : '//tools.wmflabs.org/xtools/editsummary/index.php?lang=en&wiki=' + siteName + '&name=' + escapedUserName
				},
				'Edit summary search' : {
					url : '//tools.wmflabs.org/sigma/summary.py?name=' + escapedUserName
				},
				'Global contributions' : {
					url : '//tools.wmflabs.org/guc/?user=' + escapedUserName + '&blocks=true'
				},
				'SUL' : {
					url : mw.util.getUrl( 'Special:CentralAuth/' + userName )
				}
			},
			'IP lookup' : {
				'WHOIS' : {
					url : 'http://whois.domaintools.com/' + escapedUserName,
					ipOnly : true
				},
				'rDNS' : {
					url : 'https://www.robtex.com/ip/' + escapedUserName + '.html',
					ipOnly : true
				},
				'Traceroute' : {
					url : 'http://www.domaintools.com/research/traceroute/?query=' + escapedUserName,
					ipOnly : true
				},
				'Geolocate' : {
					url : 'http://whatismyipaddress.com/ip/' + escapedUserName,
					ipOnly : true
				}
			},
			'Change rights' : {
				url : mw.util.getUrl( 'Special:UserRights', { user: 'User:' + userName } ),
				rights : [ 'user' ],
				userRights : sysopList.concat( [ 'epcoordinator' ] )
			},
			'Contributions' : {
				url : mw.util.getUrl( 'Special:Contributions/' + userName )
			},
			'Deleted contributions' : {
				url : mw.util.getUrl( 'Special:DeletedContributions/' + userName ),
				userRights : sysopList
			},
			'Email user' : {
				url : mw.util.getUrl( 'Special:EmailUser/' + userName ),
				rights : [ 'user' ]
			},
			'User groups' : {
				url : mw.util.getUrl( 'Special:ListUsers', { limit: 1, username: userName } ),
				rights : [ 'user' ]
			},
			'User rights changes' : {
				url : mw.util.getUrl( 'Special:Log', { user: '' , page: 'User:' + userName, type: 'rights' } ),
				rights : [ 'user' ]
			},
			'User subpages' : {
				url : mw.util.getUrl( 'Special:PrefixIndex/User:' + userName ),
				rights : [ 'user' ]
			},
			'User thanks received' : {
				url : mw.util.getUrl( 'Special:Log', { user: '' , page: 'User:' + userName, type: 'thanks' } ),
				rights : [ 'user' ]
			}
		};

		addTab( 'User', menuList );

		completeUserLinks( menuList );
	}

	function addPageMenu() {
		menuList = {
			'Page logs' : {
				'All logs' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', page: pageName } )
				},
				'Deletion log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', page: pageName, type: 'delete' } )
				},
				'Move log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', page: pageName, type: 'move' } )
				},
				'Pending changes log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', page: pageName, type: 'stable' } )
				},
				'Protection log' : {
					url : mw.util.getUrl( 'Special:Log', { action: 'view', page: pageName, type: 'protect' } )
				}
			},
			'Anaylsis' : {
				'Analysis – WikiChecker' : {
					url : 'http://' + contentLanguage + '.wikichecker.com/article/?a=' + escapedPageName,
					databaseRestrict : [ 'enwiki', 'jawiki', 'frwiki', 'ruwiki' ],
					pageExists : true
				},
				'Analysis – XTools' : {
					url : '//tools.wmflabs.org/xtools/articleinfo/?article=' + escapedPageName + '&project=' + serverName,
					pageExists : true
				},
				'Basic statistics' : {
					url : mw.util.getUrl( pageName, { action: 'info' } ),
					pageExists : true
				},
				'Search by contributor' : {
					url : '//tools.wmflabs.org/usersearch/index.html?page=' + escapedPageName,
					pageExists : true
				},
				'Search revision history' : {
					url : 'http://wikipedia.ramselehof.de/wikiblame.php?lang=' + contentLanguage + '&project=' + noticeProject + '&article=' + escapedPageName,
					pageExists : true
				},
				'Traffic report' : {
					url : 'http://stats.grok.se/' + contentLanguage + '/latest/' + decodeURIComponent( escapedPageName ),// don't ask about the decode!
					pageExists : true,
					noticeProjectRestrict : [ 'wikipedia' ]
				}
			},
			'Tools' : {
				'Add titles to bare refs' : {
					url : 'http://dispenser.homenet.org/~dispenser/cgi-bin/reflinks.py?lang=en&page=' + escapedPageName + '&autoclick=wpDiff',
					pageExists: true,
					databaseRestrict : [ 'enwiki' ],
					namespaceRestrict : [ 0, 2, 118 ]
				},
				'Check external links' : {
					url : 'http://dispenser.homenet.org/~dispenser/cgi-bin/webchecklinks.py?page=' + escapedPageName,
					pageExists : true
				},
				'Copyright vio detector' : {
					url : '//tools.wmflabs.org/copyvios?lang='+  contentLanguage + '&project=' + noticeProject + '&title=' + escapedPageName + '&oldid=&action=search&use_engine=1&use_links=1',
					pageExists : true,
					title : "Queries search engine for copyright violations. Could take a while, so be patient."
				},
				'Disambiguate links' : {
					url : 'http://dispenser.homenet.org/~dispenser/cgi-bin/dablinks.py?page=' + escapedPageName + '&lang=' + contentLanguage,
					pageExists : true
				},
				'Peer reviewer' : {
					url : 'http://dispenser.homenet.org/~dispenser/view/Peer_reviewer#page:' + escapedPageName,
					pageExists : true,
					databaseRestrict : [ 'enwiki' ],
					namespaceRestrict : [ 0, 2, 118 ]
				}
			},
			'XfDs' : {
				url : 'javascrit:void(0)'
			},
			'Change protection' : {
				url : mw.util.getUrl( pageName, { action: 'protect' } ),
				userRights : sysopList,
				isProtected : true
			},
			'Delete page' : {
				url : mw.util.getUrl( pageName, { action: 'delete' } ) + ($(' #delete-reason ').text() ? '&wpReason=' + $(' #delete-reason ').text() : ''),
				userRights : sysopList,
				pageExists : true
			},
			'Edit intro' : {
				url : mw.util.getUrl( pageName, { action: 'edit', section: 0 } ),
				namespaceRestrict : [ 0, 1, 2, 3, 4, 5, 118 ],
				pageExists : true
			},
			'Latest diff' : {
				url : mw.util.getUrl( pageName, { action: 'view', diff: mw.config.get( 'wgCurRevisionId' ) } ),
				pageExists : true
			},
			'Merge page' : {
				url : mw.util.getUrl( 'Special:MergeHistory', { target: pageName } ),
				userRights : sysopList,
				pageExists : true
			},
			'Move page' : {
				url : mw.util.getUrl( 'Special:MovePage/' + pageName, { action: 'view' } ),
				pageExists : true
			},
			'Protect page' : {
				url : mw.util.getUrl( pageName, { action: 'protect' } ),
				userRights : sysopList
			},
			'Purge cache' : {
				url : mw.util.getUrl( pageName, { action: 'purge', forcelinkupdate: true } ),
				pageExists : true
			},
			'Subpages' : {
				url : mw.util.getUrl( 'Special:PrefixIndex/' + pageName, { action: 'view' } ),
			},
			'Undelete page' : {
				url : mw.util.getUrl( 'Special:Undelete/' + pageName, { action: 'view' } ),
				userRights : sysopList,
				pageDeleted : true
			}
		};

		addTab( 'Page', menuList );
	
		completePageLinks( menuList );
	}

	function sanitize( name ) {
		return name.toLowerCase().replace( / /g, '_' );
	}

	function addListeners() {
		$( '.c2-hover-menu' ).each( function() {
			$( this ).hover( function() {
				$el = $( this ).find( '.submenu' );
				$el.css( {
					left : $( this ).outerWidth(),
					top : '-1px',
					'border-top-width' : 1
				} );
				$el.show();
			}, function() {
				$( this ).find( '.submenu' ).hide();
			} );
		} );
	}

	function addTab(tabName,menuList) {
		var html = 	'<div id="p-' + tabName.toLowerCase() + '2" class="vectorMenu" style="z-index: 100;">' +
					'<h3>' +
						'<span>' + tabName + '</span>' +
						'<a href="#"></a>' +
					'</h3>' +
					'<div class="menu"><ul>';
		html += generateMenuContent( menuList );
		html += '</ul></div></div>';
 
		$( html ).insertAfter( $( '#p-cactions' ) );
	}

	function linkId( name, parent ) {
		return 'c2-' + ( parent ? sanitize( parent ) + '-' : '') + sanitize( name );
	}

	function linkHtml( name, action, parent ) {
		var namespaceConflict = ( action.namespaceRestrict && action.namespaceRestrict.length && action.namespaceRestrict.indexOf( namespaceNumber ) < 0 )
			|| ( action.namespaceExclude && action.namespaceExclude.length && action.namespaceExclude.indexOf(namespaceNumber) > -1 ),
			existenceConditional = ( action.pageExists && articleId > 0 ) || ( !action.pageExists ),
			deletedConditional = ( action.pageDeleted && articleId === 0 && mw.config.get( 'wgIsArticle' ) === false ) || ( !action.pageDeleted ),
			protectedConditional = action.isProtected ? isPageProtected : true,
			isSupportedDatabase = action.databaseRestrict ? action.databaseRestrict.indexOf( mwDBname ) !== -1 : true,
			isSupportedNoticeProject = action.noticeProjectRestrict ? action.noticeProjectRestrict.indexOf( noticeProject ) !== -1 : true;
		if ( !namespaceConflict && !rightsSkip( action.userRights, userGroups ) && existenceConditional && deletedConditional && protectedConditional && isSupportedDatabase && isSupportedNoticeProject ) {
			return '<li id=' + linkId(name, parent) + '><a href="' + action.url + '" title="' + ( action.title || '' ) + '">' + name + '</a></li>';
		} else {
			return '';
		}
	}

	function generateMenuContent( menuList ) {
		var html = '';
		$.each( menuList, function( name, action ) {
			if ( action ) {
				var newHtml = '';
				if ( !action.url ) {
					newHtml += '<li style="position: relative;" id="c2-' + name.toLowerCase().replace( / /g, '_' ) + '" class="c2-hover-menu">' +
								'<a style="font-weight: bold;">' + name + '&hellip;</a>' +
									'<div class="submenu menu" style="display: none; position: absolute;"><ul>';
					$.each( action, function( k, v ) {
						newHtml += linkHtml(k, v, name);
					} );
					newHtml += '</ul></div></li>';
					if ( $( newHtml ).last().find( '.submenu li' ).length === 0 ) {
						newHtml = '';
					}
				} else {
					newHtml += linkHtml(name, action);
				}
				html += newHtml;
			}
		} );
		return html;
	}

	function rightsSkip( permittedRights, rights ) {
		if ( !rights.length ) return false;
		var skip = (permittedRights && permittedRights.length );
		if ( permittedRights && permittedRights.length ) {
			for ( var i = 0; i < permittedRights.length; i++ ) {
			    if ( rights.indexOf( permittedRights[ i ] ) > -1 ) {
			        skip = false;
			        break;
			    }
			}
		}
		return skip;
	}

	function apiGet( params ) {
		return api.get(
			$.extend( params, {
				action: 'query'
			} )
		);
	}

	function completeUserLinks( menuList ) {
		apiGet( {
			list: 'users|blocks',
			ususers: userName,
			bkusers: userName,
			usprop: 'blockinfo|groups',
			bkprop: 'id'
		} ).done( function ( data ) {
			if ( data.query.blocks && data.query.blocks.length ) {
				$( '#c2-blocks-block_user' ).find( 'a' ).text( 'Change block' );
				$( '#c2-blocks-view_block' ).find( 'a' ).css( 'color', '#EE1111' );
			} else {
				$( '#c2-blocks-unblock_user' ).remove();
				$( '#c2-blocks-view_block' ).remove();
			}
 
			if ( data.query && data.query.users[0] ) {
				var rights = data.query.users[0].groups;
 
				$.each( menuList, function( name, action ) {
					if ( action ) {
						if ( !action.url ) {
							$.each( action, function( k, v ) {
								if ( ( rights && rightsSkip( v.rights, rights ) ) || ( !rights && v.rights ) || ( rights && v.ipOnly ) ) {
									$( '#' + linkId( k, name) ).remove();
									$( '#' + linkId( k, name) ).remove();// FIXME: second time's the charm?
								}
							} );
							if ($( '#' + linkId( name ) ).find( 'li' ).length === 0) {
								$( '#' + linkId( name ) ).remove();
							}
						} else {
							if ( (rights && rightsSkip( action.rights, rights ) ) || ( !rights && action.rights ) || ( rights && action.ipOnly) ) {
								$( '#' + linkId( name ) ).remove();
							}
						}
					}
				} );
			}
		} );

		if ( !admin ) $( '#c2-blocks' ).hide();
		apiGet( {
			list: 'logevents',
			letype: 'block',
			letitle: 'User:' + userName,
			lelimit: 1
		} ).done( function( data ) {
			if ( data.query.logevents.length === 0) {
				$( '#c2-blocks-view_block_log' ).remove();
			} else {
				$( '#c2-blocks' ).show();
			}
		} );

		$( '#c2-rfxs' ).hide();
		if ( mwDBname === 'enwiki' ) {
			apiGet( {
				titles: 'Wikipedia:Requests_for_adminship/' + userName + '|Wikipedia:Requests_for_bureaucratship/' + userName + '|Wikipedia:Requests_for_arbitration/' + userName + '|Wikipedia:Requests_for_comment/' + userName + '|Wikipedia:Requests_for_checkuser/Case/' + userName + '|Wikipedia:Sockpuppet_investigations/' + userName,
				prop: 'info'
			} ).done( function( data ) {
				for( var i in data.query.pages ) switch( data.query.pages[ i ].title.split( '/' )[0] ) {
					case 'Wikipedia:Requests for adminship' :
						if ( data.query.pages[ i ].missing === undefined ){
							$( '#c2-rfxs' ).show();
						} else {
							$( '#c2-rfxs-rfas' ).remove();
						}
						break;
					case 'Wikipedia:Requests for bureaucratship' :
						if ( data.query.pages[ i ].missing === undefined ){
							$( '#c2-rfxs' ).show();
						} else {
							$( '#c2-rfxs-rfbs' ).remove();
						}
						break;
					case 'Wikipedia:Requests for arbitration' :
						if ( data.query.pages[ i ].missing === undefined ){
							$( '#c2-rfxs' ).show();
						} else {
							$( '#c2-rfxs-rfar' ).remove();
						}
						break;
					case 'Wikipedia:Requests for comment' :
						if ( data.query.pages[ i ].missing === undefined ){
							$( '#c2-rfxs' ).show();
						} else {
							$( '#c2-rfxs-rfc' ).remove();
						}
						break;
					case 'Wikipedia:Requests for checkuser' :
						if ( data.query.pages[ i ].missing === undefined ){
							$( '#c2-rfxs' ).show();
						} else {
							$( '#c2-rfxs-rfcu' ).remove();
						}
						break;
					case 'Wikipedia:Sockpuppet investigations' :
						if ( data.query.pages[ i ].missing === undefined ){
							$( '#c2-rfxs' ).show();
						} else {
							$( '#c2-rfxs-spi' ).remove();
						}
						break;
				}
			} );
		}
	}

	function completePageLinks( menuList ) {
		$( '#c2-xfds' ).hide();

		if ( mwDBname === 'enwiki' ) {
			apiGet( {
				titles: 'Wikipedia:Articles for deletion/' + pageName + '|Wikipedia:Miscellany for deletion/' + pageName,
				prop: 'info'
			} ).done( function( data ) {
				for( var i in data.query.pages ) {
					if ( i > -1 ) {
						if ( data.query.pages[i].title.split( '/' )[0] === 'Wikipedia:Miscellany for deletion' ) {
							$( '#c2-xfds' ).show().find( 'a' ).text( 'MfDs' ).prop( 'href',
								mw.util.getUrl( 'Special:PrefixIndex/Wikipedia:Miscellany_for_deletion/' + pageName, { action: 'view' } )
							);
						} else if ( data.query.pages[i].title.split( '/' )[0] === 'Wikipedia:Articles for deletion' ) {
							$( '#c2-xfds' ).show().find( 'a' ).text( 'AfDs' ).prop( 'href',
								mw.util.getUrl( 'Special:PrefixIndex/Wikipedia:Articles_for_deletion/' + pageName, { action: 'view' } )
							);
						}
						break;
					}
				}
			});

			if ( mw.user.options.get( 'gadget-edittop' ) === "1" ) {
				$("#c2-edit_intro").remove();
			}
		}
		
		if ( $( '#ca-history' ).css( 'display' ) === 'list-item' ) {
			$( '#p-page2' ).find( 'ul' ).append( $( '#ca-history' ).detach() );
		}
	}
} )( );
//</nowiki>