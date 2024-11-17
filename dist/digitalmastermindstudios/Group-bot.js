// <nowiki>

$(function () {
	// Opt-out
	if ( window.disableBotJS ) {
		return;
	}

	/**
	 * Automatic deletion dropdown
	 *
	 * Looks for CSD/XFD/PROD templates on a page; if one is present, picks up
	 * the deletion reason that's hidden on the template and tweaks the 'delete'
	 * tab link to preload that deletion summary.
	 *
	 * Maintainers: InspectorJoeLJB
	 */
	(function () {
		var link, reason;
		if (document.getElementById('ca-delete') && document.getElementById('delete-criterion')) {
			link = document.getElementById('ca-delete').getElementsByTagName('A')[0];
			reason = document.getElementById('delete-reason').innerHTML;
			link.setAttribute('href' , link.getAttribute('href') + '&wpReason=' + reason);
		}
	})();

	/**
	 * Sensitive IP checker
	 *
	 * Notify admins when they might block a sensitive IP address. IP addresses
	 * may be classed as sensitive for political reasons, or because they
	 * affect bots or other technical services which Wikipedia uses. See
	 * [[wikipedia:WP:SIP]] for more details.
	 *
	 * Maintainers: InspectorJoeLJB
	 */
	if (mw.config.get('wgCanonicalSpecialPageName') === 'Block' || mw.config.get('wgCanonicalSpecialPageName') === 'Contributions') {
		// Load dependencies.
		mw.loader.using([
			'ext.gadget.libSensitiveIPs',
			'mediawiki.api',
			'mediawiki.util',
			'mediawiki.jqueryMsg',
		]).then( function() {
			// Check whether we have a valid IP address or CIDR range, and exit
			// if not. (If the second argument to isIPAddress is true, then
			// CIDR ranges are allowed as well.)
			// Can't use wgRelevantUserName, it isn't defined for IP ranges: [[phab:T206954]]
			if (mw.config.get('wgCanonicalSpecialPageName') === 'Block') {
				$ip = $('input[name=wpTarget]');
			} else if (mw.config.get('wgCanonicalSpecialPageName') === 'Contributions') {
				$ip = $('input[name=target]');
			}
			if (!$ip.length || !mw.util.isIPAddress($ip.val(), true)) {
				return;
			}

			// Test whether the IP or range is sensitive.
			mw.libs.sensitiveIPs.query({
				test: [$ip.val()]
			}).then(function (data) {
				var match = data.sensitiveips.matches[0],
					description,
					$msg;

				if (!match) {
					// The IP address or range is not sensitive, so exit.
					return;
				}

				// The IP or range is sensitive, so notify the user. First,
				// get the description of the entity the IP or range belongs
				// to.
				description = data.sensitiveips.entities[match['entity-id']].description;
				if (!description) {
					throw new Error('No description found for entity with code "' + match['entity-id'] + '"');
				}
				// Vary message according to page
				var action = mw.config.get('wgCanonicalSpecialPageName') === 'Block' ? 'blocking' : 'viewing';

				// Set the message text. The description is in wikitext, so
				// we set the whole message as wikitext and then parse it into
				// HTML with message.parse().
				mw.messages.set({
					'bot-sensitive-ip-block-warning': 'You are ' + action +
						' a sensitive IP address belonging to ' +
						description +
						'. Please be sure to ' +
						'[[User talk:InspectorJoeLJB|notify]] the ' +
						'[[{{SITENAME}}:Administrators|administration staff team]] ' +
						'immediately if blocked.'
				});

				// Assemble the message to notify the user with.
				$msg = $('<table>').append(
					$('<tr>').append(
						$('<td>').css({'vertical-align':'center'}).append(
							$('<img>').attr({'src': '//upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nuvola_apps_important.svg/48px-Nuvola_apps_important.svg.png'})
						)
					).append(
						'<td>' + mw.message('bot-sensitive-ip-block-warning').parse() + '</td>'
					)
				);

				// Send the notification.
				mw.notify($msg);
			});
		});
	}
});

// </nowiki>