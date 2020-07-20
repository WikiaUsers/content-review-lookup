/* ######################################################################### */
/* Status
/* Credit: Curiouscrab and OneTwoThreeFall
/* Documentation: dev.wikia.com/Status
/* ######################################################################### */

(function () {

var inUserNamespace = $.inArray(wgNamespaceNumber, [2, 3, 1200]) !== -1;
var $statusElements = $('span[data-user-status]');

if(!inUserNamespace && !$statusElements.length) {
	return;
}

var date = new Date();
date.setUTCHours(date.getUTCHours() - 1);

function getRecentEdits(userName) {
	userName = encodeURIComponent(userName);
	return $.get('/api.php', {
		action: 'query',
		list: 'usercontribs|logevents',
		ucuser: userName,
		leuser: userName,
		ucend: date.toJSON(),
		leend: date.toJSON(),
		format: 'json'
	});
}

function getUserStatus(data) {
	var recentEdits = data.query && (data.query.usercontribs.length + data.query.logevents.length);
	if(recentEdits > 0 && recentEdits < 2) {
		return {
			status: 'Online',
			color: 'green',
			image: '//vignette3.wikia.nocookie.net/scratchpad/images/5/58/Ledgreen.png/revision/latest/scale-to-width-down/20'
		};
	} else if(recentEdits > 1 && recentEdits < 10) {
		return {
			status: 'Editing',
			color: 'yellow',
			image: '//vignette3.wikia.nocookie.net/scratchpad/images/0/0a/Ledyellow.png/revision/latest/scale-to-width-down/20'
		};
	} else if(recentEdits > 9) {
		return {
			status: 'Busy editing',
			color: 'orange',
			image: '//vignette2.wikia.nocookie.net/scratchpad/images/8/80/Ledorange.png/revision/latest/scale-to-width-down/20'
		};
	} else {
		return {
			status: 'Away',
			color: 'red',
			image: '//vignette3.wikia.nocookie.net/scratchpad/images/6/6d/Ledred.png/revision/latest/scale-to-width-down/20'
		};
	}
}

if(inUserNamespace) {
	var userName = wgTitle.split('/')[0];
	if (!(mw.util.isIPv4Address(userName) || mw.util.isIPv6Address(userName))) {
		getRecentEdits(userName).done(function (data) {
			var userStatus = getUserStatus(data);
			switch(skin) {
				case 'monobook':
					$('<span style="float: right; font-size: initial; margin-right: 10px;"><b>Status: <span style="color: ' + userStatus.color + ';">' + userStatus.status + ' </span></b><img src="' + userStatus.image + '"></span>').appendTo('#firstHeading');
					break;
				case 'oasis':
				case 'wikia':
					$('<li style="color: ' + userStatus.color + ';"><span>Status</span> <b>' + userStatus.status + '</b> <img style="vertical-align: bottom;" src="' + userStatus.image + '"></li>').appendTo('.UserProfileMasthead .details');
					break;
			}
		});
	}
}

if($statusElements.length) {
	$statusElements.each(function () {
		var $element = $(this);
		if ($element.data('userStatus')) {
			getRecentEdits($element.data('userStatus')).done(function (data) {
				var userStatus = getUserStatus(data);
				$element.css('color', userStatus.color).html(userStatus.status + ' <img src="' + userStatus.image + '">');
			});
		}
	});
}

}());

/* ######################################################################### */
/* END Status
/* ######################################################################### */