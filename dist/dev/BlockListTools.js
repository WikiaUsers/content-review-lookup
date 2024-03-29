/**
 * blockListTools
 * 
 * Adds a number of tools to the Block List for each user
 * @author Thundercraft5
 * @version 0.1
 * @uses: mediaWiki
 * @UCP Ready: Yes
 */
;(function(mw) {
	'use strict';
	const config = mw.config.get([
		'wgCanonicalSpecialPageName',
		'wgNamespaceNumber',
		'wgArticlePath'
	]);
	var preloads = 2;

	function logMsg(data) {
		return console.log('[BlockListTools]', typeof(data) === 'object' ? data.join(' ') : data);
	}

	if (window.blockListTools && window.blockListTools.Init || config.wgNamespaceNumber !== -1 && config.wgCanonicalSpecialPageName !== 'BlockList') {
		logMsg('Namespace/page is not supported, skipping importing script.');
		return;
	}
	window.blockListTools = window.blockListTools || {};
	window.blockListTools.Init = true;

	function init(i18n) {
		const msg = i18n.msg;
		/* IP tools */
		const targets = document.querySelectorAll('.TablePager_col_ipb_target');
		for (var i = 0; i < targets.length; i++) {
			const target = targets[i];
			const ip = target.querySelector('a > bdi').textContent;
			if (mw.util.isIPAddress(ip)) {
				/* Proxy Check/General Info */
				const proxy = document.createElement('a');
				proxy.title = msg('proxy-check-tooltip', ip).plain();
				proxy.textContent = msg('proxy-check-abbr').plain();
				proxy.href = 'https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/' + ip;

				/* Spam Blacklist check */
				const blacklist = document.createElement('a');
				blacklist.title = msg('spam-blacklist-tooltip', ip).plain();
				blacklist.textContent = msg('spam-blacklist-abbr').plain();
				blacklist.href = 'https://cleantalk.org/blacklists/' + ip;

				/* WhoIs check */
				const whois = document.createElement('a');
				whois.title = msg('whois-tooltip', ip).plain();
				whois.textContent = 'WHOIS';
				whois.href = 'https://cleantalk.org/whois/' + ip;

				const actionLinks = target.querySelector('span.mw-usertoollinks > :last-of-type');
				actionLinks.after(
					document.createTextNode(mw.msg('pipe-separator')),
					proxy,
					document.createTextNode(mw.msg('pipe-separator')),
					blacklist,
					document.createTextNode(mw.msg('pipe-separator')),
					whois
				);
			}
		}
		logMsg('Sucessfully appended IP tool links!');

		/* Action links */
		const table = document.getElementsByClassName('mw-blocklist')[0];
		const rows = table.rows;
		for (var j = 1; j < rows.length; j++) {
			const row = rows[j];
			const user = row.querySelector('.TablePager_col_ipb_target > a > bdi').textContent;
			const blockLinks = row.querySelector('td.TablePager_col_ipb_expiry > span.mw-blocklist-actions');

			// move unblock/block links
			row.querySelector('.TablePager_col_ipb_timestamp').append(blockLinks);
			blockLinks.before(document.createElement('br'));

			// change label and text
			const blockLink = blockLinks.querySelectorAll('a');
			for (var k = 0; k < blockLink.length; k++) {
				const ele = blockLink[k];
				if (ele.textContent === mw.msg('unblocklink')) {
					ele.textContent = msg('unblock-abbr').plain();
					ele.title = msg('unblock-user', user).plain();
				} else if (ele.textContent === mw.msg('change-blocklink')) {
					ele.textContent = msg('change-block-abbr').plain();
					ele.title = msg('change-block-tooltip', user).plain();
				}
			}

			// add abuse log link
			if (window.blockListTools.showAbuseLog) {
				const abuselog = document.createElement('a');
				abuselog.href = config.wgArticlePath.replace('$1', 'Special:AbuseLog?wpSearchUser=' + user);
				abuselog.textContent = msg('abuselog-abbr').plain();
				abuselog.title = msg('abuselog-tooltip', user).plain();

				blockLinks.querySelector(':last-of-type').after(
					document.createTextNode(mw.msg('pipe-separator')),
					abuselog
				);
			}
		}
		logMsg('Sucessfully Modified block list action links!');
	}

	function preload() {
		if (--preloads > 0) return;
		new mw.Api().loadMessagesIfMissing([
			'unblocklink',
			'change-blocklink',
			'pipe-separator'
		]).then(function() {
			window.dev.i18n.loadMessages('BlockListTools').done(init);
		});
	}

	mw.hook('dev.i18n').add(preload);
	mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(preload);

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.mediaWiki);