// User Account Age tag 
window.customUserAccountAge = {
  showFullDate: true
};

//AbuseLogRC 
abuseLogRC_entries = 5;
abuseLogRC_showTo = [ 'content-moderator' ];
//abuseLogRC_users = [ 'USER' , 'USER' ];
abuseLogRC_userInfo = true;

//automatic daily purge

(function DailyPurge(window, $, mw) {
	"use strict";
/*add pages to be purged every 24 hours directly below*/
	const pagesList = [
		'Blog:Staff Blog Posts'
                'Category:Staff Blog Posts'
                'Special:Community'
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
				lastPurgeTimeParts[6],
			));

			if (Date.now() - lastPurgeTime.valueOf() <= 24 * 60 * 60 * 1000)
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

// prevents existing tags from being hidden
(window.dev = window.dev [[:Template:!!]] {}).profileTags = { noHideTags: true };

window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { u: 'Has not edited recently' }
	}
};

window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)',
    interval: 600, /* How often the timer updates in milliseconds (1000=1 second) */
    location: 'header',
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});

// UserTags thingamajigs
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 60, zeroIsInactive: true }; // no edits for 60 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

/*
	Wiki links have a their target page stored in the title attribute, which on many browsers is displayed 
	as a tooltip when hovering over the link. The following snippet (by HumansCanWinElves) adds such 
	titles to redlinks too.
*/

mw.loader.using('mediawiki.Uri').then(function() {
    $('.main-container').on('mouseover', 'a.new:not([title])[href]', function() {
        var regExp = /(?<=\/wiki\/)([^?]+)(?=(\?.+)?)/,
            match = regExp.exec($(this).attr('href')),
            title;

        if (match) {
            title = mw.Uri.decode(match[0]).replace(/_/g, ' ');
            $(this).attr('title', title);
        }
    });   
});

//Message wall greeting for [[Mesage wall:Moonwatcher_x_Qibli]], uses [[User:Moonwatcher_x_Qibli/MWG]]
//Coded by User:Sophiedp
if (mw.config.get('profileUserName') === 'Moonwatcher_x_Qibli' && mw.config.get('profileIsMessageWallPage')) {
    mw.loader.using('mediawiki.api').then(function () {
        new mw.Api().get({
            action: 'parse',
            format: 'json',
            page: 'User:Moonwatcher_x_Qibli/MWG',
            prop: 'text',
            wrapoutputclass: 'greeting',
            disablelimitreport: 1,
            formatversion: '2'
        }).done(function (data) {
            $('#MessageWall').prepend(data.parse.text).find('.greeting').css('margin-bottom', '20px');
        });
    });
}

/*************
Title        :   	UserBlockNotification
Description  :		Whenever a user gets blocked, users will have notification alert. It will prsist, making them inable to interact with the page.
Author       :   	Vastmine1029
Version      :   	1.0
*************/
mw.loader.using('mediawiki.api', function() {
	var api = new mw.Api(), block_data;
	var user = mw.config.get('wgUserName');
	
	// If no user is logged in, abort JS.
	if (!user) {
		console.error("No user is currently logged in. \'BlockUserNotification\' JS aborted!");
		return;
	}
	
	function checkBlockStatus() {
		api.get({
			action: 'query',
			list: 'blocks',
			bkusers: user
		}).then(function(d) {
			block_data = d.query.blocks;
			
			// If user is not blocked, do not continue with the script. Abort JS.
			if (block_data.length < 1) {
				console.error(user + " is not blocked. \'BlockUserNotification\' JS aborted!");
				return;
			}
			
			alert("You are currently blocked. More information about your block here: Special:MyContributions");
			
			// Call the function recursively to keep checking the block status
			checkBlockStatus();
		});
	}
	
	// Initial call to check block status
	checkBlockStatus();
});