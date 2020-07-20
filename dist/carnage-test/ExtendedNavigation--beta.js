/**
 * ExtendedNavigation.js
 * Version 2.0.0
 * 
 * Authors:
 * - Spottra (initial version)
 * - Ultimate Dark Carnage (beta version)
 * 
 * Description:
 * This code extends the MediaWiki:Wiki-navigation to enable level 4 and 5
 * submenus. Simply edit the MediaWiki:Wiki-navigation file as normal and use
 * '****' and '*****' to indicate where level 4 and 5 submenues should appear.
 **/

function ExtendedNavigation(){
    this.URLProtocols = mw.config.get('wgURLProtocols');
    this.validProtocols = new RegExp('^(?:' + this.URLProtocols + ')');
    this.validURLPaths = /^\/{1}\w+[\w\/]*/;
    this.intShift = 0;
    this.navSource = 'MediaWiki:Wiki-navigation';
    this.api = new mw.Api();
    this.loadWDS.call(this);
}

ExtendedNavigation.prototype = {
    constructor: ExtendedNavigation,
    baseClasses: {
        dropdown: 'wds-dropdown-level-$n__content',
        toggle: 'wds-dropdown-level-$n__toggle',
        dropdownItem: 'wds-dropdown-level-$n'
    }
};