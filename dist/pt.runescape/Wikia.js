/** <nowiki>
 * MediaWiki:Wikia.js - Loads for every user using the Oasis skin.
 *
 * For scripts that load in all skins, see [[MediaWiki:Common.js]].
 * For scripts that load in the monobook skin, see [[MediaWiki:Monobook.js]].
 *
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 */

/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
		eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
		latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
		onevar:false, plusplus:true, quotmark:single, undef:true, unused:true,
		strict:true, trailing:true
*/

(function(window, $, mw, rs) {

	if (mw.config.get('wgAction') === 'view') {
		window.importArticles({type: 'script', articles: ['MediaWiki:Wikia.js/sidebar.js']});
	}

}(this, this.jQuery, this.mediaWiki, this.rswiki || {}));