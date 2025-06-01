$(function() {
	'use strict';
	var config = mw.config.get([
		    'wgNamespaceNumber',
			'wgTitle'
		]),
		inUserNamespace = $.inArray(config.wgNamespaceNumber, [2, 3, 1200]) !== -1,
		i18n,
		date = new Date();
	if (window.StatusLoaded) {
		return;
	}
	window.StatusLoaded = true;
	date.setUTCHours(date.getUTCHours() - 1);
	function getRecentEdits(userName) {
		return $.get(mw.util.wikiScript('api'), {
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
		if (recentEdits > 0 && recentEdits < 10) {
			return {
				status: i18n.msg('online').plain(),
				color: '72594d',
			};
		} else if (recentEdits > 0) {
			return {
				status: i18n.msg('busy').plain(),
				color: 'b87c60',
			};
		} else {
			return {
				status: i18n.msg('offline').plain(),
				color: '58473f',
			};
		}
	}
	function addToContent($content) {
		var $statusElements = $content.find('span[data-user-status]:not(.loaded)');
		if (!$statusElements.length) {
			return;
		}
		$statusElements.each(function() {
			var $element = $(this).addClass('loaded');
			if (!$element.data('userStatus')) {
				return;
			}
			getRecentEdits($element.data('userStatus')).done(function(data) {
				var userStatus = getUserStatus(data);
				$element
					.css('color', userStatus.color)
					.text(userStatus.status)
					.append(
						' ',
						$('<img>', {
							src: userStatus.image
						})
					);
			});
		});
	}
	function addToMasthead() {
		if (!inUserNamespace) {
			return;
		}
		var userName = config.wgTitle.split('/')[0];
		if (mw.util.isIPv4Address(userName) || mw.util.isIPv6Address(userName)) {
			return;
		}
		getRecentEdits(userName).done(function(data) {
			var userStatus = getUserStatus(data),
			    userProfile = '.user-identity-box .user-identity-stats';

			appendToUserProfile(userStatus, userProfile);
		});
	}
	function appendToUserProfile(userStatus, userProfile, counter) {
		var $userProfile = $(userProfile);
		counter = counter ? counter : 0;

		if ($userProfile.length) {
			$userProfile.append(
                $('<li>').append(
                    $('<span>', {
                        css: {
                            color: userStatus.color,
                            fontWeight: 'bold'
                        },
                        text: i18n.msg('status').plain()
                    }).append(
                        ' ',
                        $('<strong>', {	
                            text: userStatus.status
                        }),
                        ' ',
                        $('<img>', {
                            css: {
                                'vertical-align': 'bottom'
                            },
                            src: userStatus.image
                        })
                    )
                )
            );
		} else {
			counter++;
			if ( counter < 10 ) {
			    setInterval(appendToUserProfile(userStatus, userProfile, counter), 1000);
			}
		}
	}
	mw.hook('dev.i18n').add(function(i18np) {
		i18np.loadMessages('Status').then(function(i18np) {
			i18n = i18np;
			addToContent(mw.util.$content);
			mw.hook('wikipage.content').add(addToContent);
			addToMasthead();
		});
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
});