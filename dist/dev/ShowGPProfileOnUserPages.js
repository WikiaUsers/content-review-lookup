( function() {
	const IS_GAMEPEDIA = $('body.is-gamepedia').length > 0;
	if ( !IS_GAMEPEDIA ) {
		console.error( "`ShowGPProfileOnUserPages` only works on Gamepedia wikis." );
		return;
	}
	function main() {
		mw.loader.using( 'ext.curseprofile.profilepage.styles' );
		if (
			mw.config.get("wgNamespaceNumber") == 2 || mw.config.get("wgNamespaceNumber") == 3 ||
			(
				mw.config.get("wgCanonicalSpecialPageName") &&
				(
					mw.config.get("wgCanonicalSpecialPageName").toLowerCase() == "contributions" ||
					mw.config.get("wgCanonicalSpecialPageName").toLowerCase() == "userprofileactivity" 
				)
			)
		) {
			$( document ).ready( function() {
					let user;
					if ( mw.config.get("wgNamespaceNumber") == 2 || mw.config.get("wgNamespaceNumber") == 3 ) {
						user = mw.config.get("wgTitle").split("/")[0];
					} else if (mw.config.get("wgNamespaceNumber") == -1) {
						user = mw.config.get("wgTitle").split("/")[1] ? mw.config.get("wgTitle").split("/")[1] : null;
					} else {
						return;
					}
					let $wrapper = $('<div class="profileheader"></div>');
					$( '#userProfileApp' ).prepend( $wrapper );
					// There isn't an easy to use API to fetch the user profile on Gamepedia wikis
					// so just screen scrape and hope for the best
					$.get( mw.config.get( 'wgArticlePath' ).replace( "$1", 'UserProfile:' + user.replace( ' ' , '_' ) ) ).done( function( result ) {
						let $result = $( result );
						$result.find( '.user-profile-navigation' ).remove();
						$result.find( '.user-profile-navigation' ).remove();
						$result.find( '.activity.section' ).remove();
						$result.find( '.comments.section' ).remove();
						$result.find( '.rightcolumn' ).remove();
						$result.find( '.profileedit' ).remove();
						$result.find( '.socialedit' ).remove();
						$wrapper.html( $result.find( '.curseprofile' ).eq(0).prop( 'outerHTML' ) );
					});
			});
		} else if ( mw.config.get('wgNamespaceNumber') == 202 ) {
			// just hoist header before links
			$( '.curseprofile .userinfo.section' ).insertBefore( $( '.curseprofile .user-profile-navigation' ) );
		}
	}
	function startup() {
		if ( $("#userProfileApp").length > 0 || ( mw.config.get('wgNamespaceNumber') == 202 && $( '.curseprofile' ).length > 0 ) ) {
			main();
		} else {
			window.setInterval( startup, 100 );
		}
	}
	startup();
} )();