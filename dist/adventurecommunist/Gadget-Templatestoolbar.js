/* <pre> */
/**
 * templates.js
 *
 * Insert various templates from the edit toolbar.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
var toolbarTemplates = [];
var toolbarFillSummary = 1;
var toolbarFillHeader = 1;
 
$(document).ready(function() {
	// http://www.netlobo.com/url_query_string_javascript.html
	function getParam(name) {
		name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  		var results = regex.exec(window.location.href);
		if (results === null) {
			return '';
		} else {
			return decodeURIComponent(results[1].replace(/\+/g, '%20'));
		}
	}
 
	// Needle and haystack should contain strings.  Each element in haystack will be trimmed before comparison.
	function inArray(needle, haystack) {
		for (var i in haystack) {
			if (needle == $.trim(haystack[i])) {
				return true;
			}
		}
 
		return false;
	}
 
	// Window-based storage requires that no other script uses window.name
	function setWindowStorage(name, value) {
		if (window.name === '' || window.name.indexOf(name + '=') === 0) {
			window.name = name + '=' + value;
		}
	}
 
	function getWindowStorage(name) {
		if (window.name.indexOf(name + '=') === 0) {
			return window.name.substring(name.length + 1);
		}
 
		return '';
	}
 
	var toolbarTemplates = (window.toolbarTemplates instanceof Array) ? window.toolbarTemplates : [];
	var set = (window.toolbarGlobalReferrer) ? setCookie : setWindowStorage;
	var get = (window.toolbarGlobalReferrer) ? getCookie : getWindowStorage;
 
 
	toolbarTemplates = toolbarTemplates.concat([
		{ name: 'Speedy Delete', ns: '|Template|Main|File', open: '{{D|', close: '}}\n\n', sample: 'Reason' },
		{ name: 'Incomplete', ns: '', open: '{{Incomplete|', close: '}}\n\n', sample: 'Reason' },
		{ name: 'Under construction', ns: '|Main|User|Project', open: '{{Under construction}}\n\n', close: '', sample: '' },
		{ name: 'Cleanup', ns: '', open: '{{Cleanup}}\n\n', close: '', sample: '' },
		{ name: 'Historical', ns: '', open: '{{Historical}}\n\n', close: '', sample: '' },
		{ name: 'Request for Deletion', ns: '', open: '{{Delete\n\n', close: '}}', sample: 'Reason' },
		{ name: 'Stub', ns: '', open: '{{stub}}\n\n', close: '', sample: '' },
	]);
 
	/* Try to keep track of the last visited "content" page. */
	if (wgCanonicalNamespace.search(/talk|special/gi) == -1) {
		var page = wgPageName.replace(/_/g, ' ');
		if (wgCanonicalNamespace == 'File') {
			page = ':' + page;
		}
		set('templatesContentReferrer', page);
	}
 
	/* Append template list when editing user talk pages. */
	if (wgAction == 'edit' || wgAction == 'submit') {
		var haveTemplates = false;
 
		var $select = $('<select />').change(function() {
			var i = $(this).val();
 
			if (i == '-1') {
				return;
			}
 
			var tpl = toolbarTemplates[i];
			insertTags(tpl.open, tpl.close, tpl.sample.replace('__CONTENTPAGE__', get('templatesContentReferrer')));
 
			var fillSummary = (typeof(window.toolbarFillSummary) != 'undefined') ? window.toolbarFillSummary : true;
			var fillHeading = (typeof(window.toolbarFillHeader) != 'undefined') ? window.toolbarFillHeader : false;
			var newSection = (getParam('section') == 'new');
 
			if ((newSection && fillHeading) || (!newSection && fillSummary)) {
				var summary = $('#wpSummary').val();
 
				if ($.trim(summary.replace(/\/\*.*?\*\//, '')) === '') {
					$('#wpSummary').val(summary + tpl.name);
				}
			}
		});
 
		$select.append($('<option />').val('-1').text('[Templates]'));
 
		for (var i in toolbarTemplates) {
			var tpl = toolbarTemplates[i];
			var ns = tpl.ns.toLowerCase();
			// normalize namespace list
			ns = ns.replace(/ /g, '_').replace(/main/g, '').replace(/image/g, 'file');
			if (tpl.ns == '*' || inArray(wgCanonicalNamespace.toLowerCase(), ns.split('|'))) {
				$select.append($('<option />').val(i).text(tpl.name));
				haveTemplates = true;
			}
		}
 
		if (haveTemplates) {
			$('#toolbar').prepend($select);
		}
	}
});
/* </pre> */