/**
 * OldFandomColors.js
 * JS component of [[OldFandomColors]], stylesheet 
 * is located at [[w:c:dev:MediaWiki:OldFandomColors.css]]
 * 
 * @author Thundercraft5 (https://dev.fandom.com/wiki/User:Thundercraft5)
 * @license BSD-3 clause <https://opensource.org/licenses/BSD-3-Clause>
 * @version 1.0
 */
if ($('body:is(.wiki-wikia, .wiki-dev, .wiki-vstf)').length || $('link[rel="shortcut icon"]').attr('href') === '/skins-ucp/common/favicon.ico') {
	$('link[rel="shortcut icon"]').attr('href', getComputedStyle(document.body).getPropertyValue('--site-favicon').replace(/"/g, ''));
}