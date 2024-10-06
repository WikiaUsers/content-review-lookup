/** [[Special:SpecialPages]]
 * Special page reporting
 * 
 * @athor cblair91
 * @version 1.0
 */

(function($, mw) {
	'use strict';

	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Specialpages') return;

	function getPages(ele) {
		fetch(mw.config.get('wgScriptPath') + '/api.php?' + new URLSearchParams({
			action: 'query',
			list: 'querypage',
			qppage: ele.id,
			qplimit: 'max',
			format: 'json',
			formatversion: 2
		}), {
			method: 'GET'
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			ele.textContent = data.query.querypage.results.length;
		});
	}

	function addLink(page, label) {
		return '<a ' +
			'href="' + mw.config.get('wgArticlePath').replace('$1', 'Special:' + page) + '" ' +
			'title="Special:' + page + '" ' +
			'target="_blank">' + label + ' (<span id="' + page + '"></span>)</a>';
	}

	$('#mw-content-text').before('<div id="spreport">' +
		'<div>' +
			addLink('BrokenRedirects', 'Broken redirects') + ' &bull; ' +
			addLink('DoubleRedirects', 'Double redirects') + ' &bull; ' +
			addLink('Unusedcategories', 'Unused categories') + ' &bull; ' +
			addLink('Unusedimages', 'Unused images') +
		'</div>' +
		'<div>' +
			addLink('Wantedcategories', 'Wanted categories') + ' &bull; ' +
			addLink('Wantedfiles', 'Wanted files') + ' &bull; ' +
			addLink('Wantedpages', 'Wanted pages') + ' &bull; ' +
			addLink('Wantedtemplates', 'Wanted templates') +
	'</div>');

	document.querySelectorAll('#spreport span').forEach(getPages);

})(window.jQuery, window.mediaWiki);