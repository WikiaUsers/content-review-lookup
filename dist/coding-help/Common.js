/* Any JavaScript here will be loaded for all users on every page load. */

if (mw.config.get('wgPageName') === 'User:Moonwatcher_x_Qibli' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}


mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true;
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/e/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});

window.ExternalLinkWarningNamespaces = ['Message_Wall', '0', '1'];


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
Title        :   	UserBlockNotification modded 
Description  :		Whenever a user gets blocked, users will have notification alert. It will prsist, making them inable to interact with the page.
Author       :   	Vastmine1029/Moonwatcher x Qibli
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