/* Any JavaScript here will be loaded for sysops only */

$( function() {

	//============= Pages =============

	if ( mw.config.get( 'wgNamespaceNumber' ) >= 0 &&
		mw.config.get( 'wgArticleId' )
	) {
		switch ( mw.config.get( 'wgAction' ) ) {
			case 'view':
				//on [[ВП:БУ]] pages append delete reason to delete tab
				var reason = /[ФПОКУС]\d\d?/.exec( $( '#db-reason' ).text() );
				var $del = $( '#ca-delete' );
				if ( reason && $del.length ) {
					var $lnk = $del.find( 'a' );
					$lnk
						.attr( 'href', lnk.attr( 'href' ) + '&dbreason=' + encodeURIComponent( reason[0].replace( /\./, '' ) ) )
						.css( 'background', '#fee' );
					//also move 'delete' tab to the top
					if ( mw.user.options.get( 'skin' ) === 'vector' ) {
						$del.wrapInner( '<span>' ).insertBefore( '#ca-watch' );
					}
				}

				//highlight "closed" sections in TOC
				if ( mw.config.get( 'wgNamespaceNumber' ) === 4 &&
					/( к администраторам| защиты| спам-листа|Технические запросы)$/.test( mw.config.get( 'wgTitle' ) )
				) {
					mw.util.addCSS( 'li.done { background: #eee; }' );
					$( '#toc li.toclevel-2' ).each( function ( i, li ) {
						if ( $( li ).find( 'span.toctext' ).text() !== 'Итог' ) {
							return;
						}
						$( li ).closest( 'li.toclevel-1' ).addClass( 'done' );
					});
				}

				break;


			case 'protect':
			case 'unprotect': //avoid [move=autoconfirmed] in logs
				$( '#mwProtect-level-edit' ).change( function() {
					if ( !$( '#mwProtectUnchained' ).attr( 'checked' ) &&
						$( '#mwProtect-level-move' ).val() === 'autoconfirmed'
					) {
						$( '#mwProtect-level-move' ).val( '' );
					}
				} );
				break;


			case 'history':
				hideRevDel();
				if ( $.inArray( mw.config.get( 'wgNamespaceNumber' ), [0,6, 10, 14] ) !== -1 ) {
					//stabilization link
					addSysopLink( mw.util.getUrl( 'Special:Stabilization/' + mw.config.get( 'wgPageName' ) ), 'Настройки стабилизации' );
				}
				break;

		}//switch
	}


	//============= Special pages =============

	switch ( mw.config.get( 'wgCanonicalSpecialPageName' ) ) {
		case 'Log':
		case 'Contributions':
			hideRevDel();
			break;

		case 'Userrights':
			importMW( 'Userrights' );
			break;

		case 'Block': // temp fix: https://bugzilla.wikimedia.org/show_bug.cgi?id=35893
			if ( mw.loader.getState( 'mediawiki.special.block' ) !== 'ready' ) {
				mw.loader.load( 'mediawiki.special.block' );
			}
			break;
	}


	//=============

	function hideRevDel() { //initially hide RevDel [[Farm Frenzy вики:Удаление правки]] interface
		if (!window.hrdOff) {
			window.hideRevDelCSS = mw.util.addCSS( '\
				#mw-log-deleterevision-submit input[type="checkbox"],\
				button.mw-log-deleterevision-button,\
				#pagehistory input[type="checkbox"],\
				button.mw-history-revisiondelete-button,\
				span.mw-revdelundel-link {\
					display: none;\
				}' );
			window.revisionDelete = function() {
				window.hideRevDelCSS.disabled = !window.hideRevDelCSS.disabled;
				return false;
			};
			addSysopLink( 'javascript:revisionDelete(); void 0', 'Скрытие правок' );
		}
	}


	function addSysopLink ( url, txt ) {
		var $cSub = $( '#contentSub' );
		if ( $cSub.children().last().prop( 'nodeName' ) === 'A' ) {
			$cSub.append( ' · ' );
		}
		$cSub.append( $( '<a href="' + url + '"><img \
	src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f2/\
	Edit-clear.svg/10px-Edit-clear.svg.png">&nbsp;' + txt + '</a>' ) );
	}

} );