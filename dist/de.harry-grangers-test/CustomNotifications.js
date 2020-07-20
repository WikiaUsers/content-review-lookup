function getCustomNotifications(callback) {
    customNotificationsURL = '/api.php?' + $.param({
        action: 'query',
        titles: 'Cache/Notifications',
        prop: 'revisions',
        rvprop: 'content',
        indexpageids: 1,
        v: Math.round(Math.random() * 10),//prevent caching
        format: 'json'
    });
    $.getJSON(customNotificationsURL,function(data) {
        notifications = JSON.parse(data.query.pages[data.query.pageids[0]].revisions[0]['*']);
        //currentUser = new User(wgUserName);
        user_id = wgTrackID//currentUser.id;
        userNotifications = _.where(notifications,{'recipient_id': user_id,'seen': false});
 
        message = $('<div />').addClass('custom-notification-message').html(userNotifications[0].message);
        callback(userNotifications);
    });
}
 
function openNotificationsModal(user,message) {
    $.showCustomModal('Du hast eine neue Nachricht von ' + user, message, {
        id: 'custom-notification',
        width: 500,
        buttons: [{
            id: 'cancel-button',
            message: 'OK',
            handler: function() {
                $('#custom-notification').closeModal();
            }
        }/*, {
            id: 'save-button',
            message: 'Speichern',
            defaultButton: true,
            handler: save
        }*/]
    });
}
 
function showNotificationsList(notifications) {
	console.log('showNotificationsList',notifications);
	notifications.forEach(function(noti) {
		li = $('<li />',{ class: "notification read"}).append(
			$('<a />',{ href: "http://de.harrypotter.wikia.com/wiki/Diskussionsfaden:32672#13"}).append(
				$('<div />',{ class: "avatars"}).append(
					$('<img />',{ src: "https://images.wikia.nocookie.net/80d3d9bd-cfb7-450a-b899-68f398afc95f/scale-to-width-down/50", width: "30", height: "30", class: "avatar", alt: "Harry granger"})
				),
				$('<div />',{ class: "notification-message"}).append(
					$('<h4 />').text(noti.title),
					$('<time />',{ datetime: "2018-02-08T21:23:15Z"}).text('vor 2 Tagen')
				)
			)
		).appendTo('.notifications-for-wiki-list');
		$.getJSON('https://services.wikia.com/user-attribute/user/' + noti.recipient_id + '/attr/avatar',function(avatar) {
			if(avatar.hasOwnProperty('value')) {
				li.find('.avatars > img').attr('src',avatar.value);
			}
		});
	});
}
 
getCustomNotifications(function(userNotifications) {
    if(!!userNotifications.length) {
        showNotificationsList(userNotifications);
    }
});
 
define('ext.dev.notifications',[],function() {
    notifications = {};
    notifications.save = function save() {
        console.log({
            "sender_id": 0,
            "recipient_id": 0,
            "message": "bla bla",
            "seen": false,
            "type": "dialogue",
            "options": {}
        });
    }
    return notifications;
});
 
$('#notificationsEntryPoint').after(
	$('<div />',{ id: "notificationsEntryPoint2", class: "wds-global-navigation__notifications-menu wds-dropdown notifications-container"}).append(
		$('<div />',{ class: "wds-dropdown__toggle wds-global-navigation__dropdown-toggle", title:"Benachrichtigungen"}).append(
			$('<div />',{ class: "bubbles"}).append(
				$('<div />',{ class: "wds-global-navigation__notifications-menu-counter notifications-count"})
			),
    		'<svg id="wds-icons-mail" alt="Benachrichtigungen" class="wds-icon wds-icon-small" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23 2H1a1 1 0 0 0-1 1v3a1 1 0 0 0 .521.878l11 6a1.003 1.003 0 0 0 .958 0l11-6A1 1 0 0 0 24 6V3a1 1 0 0 0-1-1zM12 15c-.498 0-.994-.126-1.433-.364L0 8.872V21a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V8.872l-10.563 5.762c-.443.24-.939.366-1.437.366z" fill-rule="evenodd"></path></svg>',
			'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"></path></svg>'
		),
		$('<div />',{ id: "notifications", class: "wds-dropdown__content wds-is-right-aligned wds-global-navigation__dropdown-content"}).append(
			$('<ul />',{ id: "GlobalNavigationWallNotifications", class: "WallNotifications global-nav-dropdown show"}).append(
				$('<li />',{ id: "notificationsContainer"}).css("height", "auto").append(
					$('<ul />').append(
						$('<li />',{ class: "notifications-for-wiki show", 'data-notification-key': "5a7f6e72bde8a", 'data-wiki-id':wgCityId, 'data-unread-count':"0"}).append(
							$('<header />',{ class: "notifications-wiki-header" }).css("display", "none").append(
								wgMainPageTitle,
								$('<img />',{ class: "chevron", src: "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"})
                            ),
							$('<ul />',{ class: "notifications-for-wiki-list"})
						)
					)
				)
			)
		)
	)
)