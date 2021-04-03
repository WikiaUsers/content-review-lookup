/**
 * rcrollback.js
 *
 * Add rollback and undo links to Special:RecentChanges.
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
 
if (wgCanonicalSpecialPageName && wgCanonicalSpecialPageName == 'Recentchanges') {
	$(document).ready(function() {
		var rollbackLinks = new Array();
 
		// Check if user is in a group with rollback rights.
		function userHasRollback() {
			for (var i in wgUserGroups) {
				if (wgUserGroups[i] == 'sysop' || wgUserGroups[i] == 'rollback') {
					return true;
				}
			}
			return false;
		}
 
		// Return true if the given string is a unique rollback link
		function uniqueRollback(str) {
			for (var i in rollbackLinks) {
				if (rollbackLinks[i] == str) {
					return false;
				}
			}
 
			rollbackLinks.push(str);
			return true;
		}
 
		// Add a revert links as a child to the given DOM object.
		function addRevertLinks($obj, title, user, diffLink) {
			var matches = diffLink.match(/diff=([0-9]+)&oldid=([0-9]+)/);
			var $span = $('<span />').addClass('rc-revert');
 
			if (userHasRollback() && uniqueRollback(user + '|' + title)) {
				var $rbSilentLink = $('<a />').addClass('rc-rollbacksilent').attr({'href': '#', 'title': 'Rollback edit(s) to this page and skip the page diff'}).click(function() {
					getRollbackToken($(this).parent(), title, user, true);
				});
 
				var rollbackSilent = (typeof(window.rollbackSilent) == 'undefined' || window.rollbackSilent);
 
				if (wgVersion.split('.')[1] == '14') {
					$span.append('[');
					var $rbLink = $('<a />').addClass('rc-rollback').attr({'href': '#', 'title': '"Rollback" reverts edit(s) to this page of the last contributor in one click'}).click(function() {
						getRollbackToken($(this).parent(), title, user, false);
					});
 
					$rbLink.text('rollback');
					$span.append($rbLink);
					if (rollbackSilent) {
						$rbSilentLink.text('without diff');
						$span.append(' &middot; ').append($rbSilentLink);
					}
					$span.append('] ');
				} else if (rollbackSilent) {
					$span.append('[');
					$rbSilentLink.text('rollback without diff');
					$span.append($rbSilentLink).append('] ');
				}	
			}
 
			$span.append('(');
			var $undoLink = $('<a />').addClass('rc-undo').attr({'href': wgScript + '?action=edit&title=' + encodeURIComponent(title) + '&undoafter=' + matches[2] + '&undo=' + matches[1], 'title': '"Undo" reverts this edit and opens the edit form in preview mode. Allows adding a reason in the summary'});
			$undoLink.text('undo');
			$span.append($undoLink).append(')');
			$obj.append(' ').append($span);
		}
 
		// Perform rollback using AJAX.
		function doRollback($span, title, user, token) {
			$.ajax({
				data: {
					'action': 'rollback',
					'title': title,
					'user': user,
					'token': token,
					'format': 'json'
				},
				dataType: 'json',
				url: wgScriptPath + '/api.php',
				type: 'POST',
				success: function(response) {
					if (response.error) {
						$span.text('[Error: ' + response.error.info + ']');
					} else {
						document.location.href = wgScript + '?title=' + encodeURIComponent(title);
					}
				},
				timeout: 10000
			});
		}
 
		// Get the rollback token.  If silent, the rollback itself is performed via doRollback(), otherwise its done using redirection.
		function getRollbackToken($span, title, user, silent) {
			// Should change to only remove the link, not the entire span.
			$span.empty().append('Please wait... ').append($('<img />').attr({'src': 'http://img196.imageshack.us/img196/4757/loadingw.gif', 'width': '16', 'height': '16', 'alt': '...'}));
 
			$.ajax({
				data: {
					'action': 'query',
					'prop': 'revisions',
					'rvtoken': 'rollback',
					'format': 'json',
					'titles': title
				},
				dataType: 'json',
				url: wgScriptPath + '/api.php',
				type: 'GET',
				success: function(response) {
					var pages = response.query.pages;
					var page = null;
					for (var i in pages) {
						page = pages[i];
					}
 
					var token = page.revisions[0].rollbacktoken;
					if (token) {
						if (silent) {
							doRollback($span, title, user, token);
						} else {
							document.location.href = wgScript + '?title=' + encodeURIComponent(title) + '&action=rollback&from=' + encodeURIComponent(user) + '&token=' + encodeURIComponent(token);
						}
					} else {
						$span.text('[Rollback error]');
					}
				},
				timeout: 10000
			});
		}
 
		var $items = $('ul.special li');
 
		if ($items.length == 0) {
			// User is using enhanced RC.
			var $divs = $('#bodyContent h4 + div');
 
			$divs.each(function() {
				$entries = $(this).find('tr td:nth-child(2)');
				$entries.each(function() {
					$links = $(this).find('a');
					if ($links.length >= 3) {
						if ($links.eq(1).text() == 'diff') { // Nongrouped change
							var diffLink = $links.eq(1).attr('href');
						} else if ($links.eq(2).text() == 'prev') { // Grouped change
							var diffLink = $links.eq(2).attr('href');
						} else {
							return;
						}
 
						addRevertLinks($(this), $links.eq(0).attr('title'), $links.eq(3).text(), diffLink);
					}
				});			
			});
		} else {
			// User is using standard RC.
			$items.each(function() {
				$links = $('a', $(this));
				if ($links.eq(0).text() == 'diff') {
					addRevertLinks($(this), $links.eq(2).text(), $links.eq(3).text(), $links.eq(0).attr('href'));
				}
			});
		}	
	});
}