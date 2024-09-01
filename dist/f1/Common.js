/* Any JavaScript here will be loaded for all users on every page load. */

//automatic hourly purge
(function HourlyPurge(window, $, mw) {
	"use strict";
	/*add pages to be purged every hour directly below*/
	const pagesList = [
		'Formula_1_Wiki',
		'Template:Latest_F1_News',
		'Template:Main_OTD'
	].map(function(string) {
		return string.replaceAll(' ', '_');
	});
	if (!pagesList.includes(mw.config.get('wgPageName')))
		return;

	mw.loader.using('mediawiki.api').then(function() {
		try {
			const lastPurgeTimestamp = 
				mw.config.get('wgPageParseReport')
				.cachereport
				.timestamp;

			const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
			const lastPurgeTime = new Date(Date.UTC(
				lastPurgeTimeParts[1],
				lastPurgeTimeParts[2] - 1,
				lastPurgeTimeParts[3],
				lastPurgeTimeParts[4],
				lastPurgeTimeParts[5],
				lastPurgeTimeParts[6]
			));
			
			/* don't purge if page has been purged in the past hour */
			if (Date.now() - lastPurgeTime.valueOf() <= 60 * 60 * 1000)
				return;

		} catch(e) {
			return;
		}

		(new mw.Api()).post({
			action: 'purge',
			titles: mw.config.get('wgPageName')
		});
	});

})(window, jQuery, mediaWiki);