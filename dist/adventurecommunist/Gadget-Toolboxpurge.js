/**
 * purge.js
 *
 * Add a purge link to the toolbox. Adding the link directly to
 * a toolbox customization page doesn't work too well because of the server cache.
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
 
if ((wgAction == 'view' || wgAction == 'purge') && wgCanonicalNamespace != 'Special') {
	$(function() {
		var $list = null;
 
		if (skin == 'monobook') {
			$list = $('#p-tb ul').eq(0);
		} else if (skin == 'oasis') {
			$list = $('#my-tools-menu');
		} else {
			// Unhandled skin
			return;
		}
 
		var $a = $('<a />').attr({
			'href': wgScript + '?action=purge&title=' + encodeURIComponent(wgPageName),
			'title': 'Clear the server cache of this page.'
		}).text('Purge this page');
		$list.prepend($('<li />').append($a));
	});
}