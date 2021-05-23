/**
 * Name:		BadgeStatusUpdater
 * Version:		v1.0
 * Author:		Caburum
 * Description:	Adds a button to publish the current badge status to User:<Username>/Badges on your user page
 *				Requires achievements extension to be enabled
**/

(function() {
	config = mw.config.get([
		'wgNamespaceNumber',
		'profileUserName',
		'wgUserName'
	]);

	mw.loader.using([
		'mediawiki.api',
		'mediawiki.notify',
	]).then(function() {
		if (config.wgNamespaceNumber == 2 && config.profileUserName == config.wgUserName) {
			button = $('<a>').append($('<br>'), $('<span>', {
					'text': 'Update badge status'
				})
			).css('cursor', 'pointer');
			$($('div.UserProfileAchievementsModule')[1]).append( button);
			button.click(function() {
				update();
				$(this).remove();
			});
		}
	});

	function update() {
		var table = '{| class="wikitable"';

		$('ul.badges-tracks.badges').children().each(function(i) { // List of possible badges
			var image = $(this).find('img.badge-icon').attr('src'),
				// name = $(this).find('div.badge-text').find('strong').text() // Not a system message
				name,
				status = $(this).find('div.badge-text').text().match(/(?<=\( ).*(?= \))/i)[0];

			if (image.match(/\/extensions-ucp\/fandom\/Achievements\/images\/badges\//i)) { // Non-custom image
				name = image.match(/(?<=\/badges\/40\/).*(?=.png)/i)[0].toLowerCase();
				// Leave the image
			} else { // Custom image stored on the wiki
				name = image.match(/(?<=\/Badge-).*(?=.png)/i)[0].toLowerCase();
				image = '[[File:' + image.match(/(?<=\/images\/.\/..\/).*(?=\/revision\/latest\/)/i)[0] + '|40px]]';
			}
			name = '{{int:achievements-badge-name-' + name + '}}';
			table += '\n|-\n| style="padding: 0px;" | ' + image + '\n! ' + name + '\n| ' + status;
		}).promise().done(function() {
			table += '\n|}';
			console.log(table);
			var api = new mw.Api();
			api.post({
				action: 'edit',
				title: 'User:' + config.wgUserName + '/Badges',
				text: table,
				token: mw.user.tokens.get('csrfToken'),
				summary: 'Automatically updating badge status list',
				minor: true,
				bot: true
			}).done(function (d) {	
				if (!d.error && d.edit.result === 'Success') {
					mw.notify('List of badges successfully updated!', {
						type: 'success'
					});
				}
			});
		});		
	}
}());