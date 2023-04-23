/**
 * Any JavaScript here will be loaded for all users on every page load.
 * 所有用戶在加載任何頁面時，這裡的JavaScript都會加載，請管理員小心編輯。
 */
// <syntaxhighlight lang="javascript">

/** @var array conf */
var conf = mw.config.get( [
	'wgCanonicalNamespace',
	'wgCanonicalSpecialPageName',
	'wgAction',
	'wgUserGroups',
] );

/** 對應編輯頁面 */
if (
	conf.wgAction === 'edit' ||
	conf.wgAction === 'submit' || (
		conf.wgCanonicalNamespace === 'Special' &&
		conf.wgCanonicalSpecialPageName === 'Upload'
	)
) {
    importScript( 'MediaWiki:Common.js/edit.js' );
} else if (
	conf.wgCanonicalNamespace === 'Special' &&
	conf.wgCanonicalSpecialPageName === 'Watchlist'
) {
	/** Watchlist scripts */
    importScript( 'MediaWiki:Common.js/watchlist.js' );
}

if ( conf.wgNamespaceNumber === 6 ) {
    importScript( 'MediaWiki:Common.js/file.js' );
}

/**
 * Sysop Javascript
 *
 * Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
 */
function sysopFunctions() {
    if ( conf.wgUserGroups && !window.disableSysopJS ) {
        for ( var g = 0; g < conf.wgUserGroups.length; ++g ) {
            if ( conf.wgUserGroups[g] === 'sysop' ) {
                importScript( 'MediaWiki:Sysop.js' );
                break;
            }
        }
    }
}

// Note: ReferenceError: addOnloadHook is not defined
// Was already disabled
// addOnloadHook(sysopFunctions);

// </syntaxhighlight>

// [[Category:JavaScript頁面]]