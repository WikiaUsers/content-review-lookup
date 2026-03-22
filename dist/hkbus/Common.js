/**
 * Any JavaScript here will be loaded for all users on every page load.
 * 所有用戶在加載任何頁面時，這裡的JavaScript都會加載，請管理員小心編輯。
 */
// <syntaxhighlight lang="javascript">
// </syntaxhighlight>

/* 當檢測到用戶試圖使用視覺化編輯時，強制重導向至原始碼編輯 */
if ( mw.config.get( 'wgAction' ) === 'view' && ( mw.util.getParamValue( 'veaction' ) === 'edit' || mw.util.getParamValue( 'veaction' ) === 'editsource' ) ) {
    var url = window.location.href.replace( /veaction=(edit|editsource)/, 'action=edit' );
    window.location.href = url;
}

// [[Category:JavaScript頁面]]