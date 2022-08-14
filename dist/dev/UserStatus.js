/**
 * @module      UserStatus
 * @description Adds configurable user status to masthead avatars.
 * @notes       Available status settings:
 *              • Online
 *              • Away
 *              • Do Not Disturb (DnD)
 *              • Offline
 *              • Unknown
 *              • Blocked [COMING SOON]
 *              Available config options (UserStatusSettings):
 *              • Colorblind mode (colorBlindMode) - 0/1, default 1
 *              • Light Theme (lightTheme) - 0/1, default 0, requires colorBlindMode
 *              • Display status indicator (statusIndicator) - 0/1, default 1
 *              • Colors: (online, away, dnd, and offline) - string (hexadecimal or color name)
 * @author      Americhino
 * @version     1.0.2
 * @license     CC-BY-SA 3.0
 *
 */
mw.loader.using('mediawiki.api').then(function() {
	mw.hook('dev.i18n').add(function(i18n) {
	    i18n.loadMessages('UserStatus').done(function (i18n) {
	        var config = window.UserStatusSettings || {},
	        colorBlindMode = config.colorBlindMode || 1,
	        lightTheme = config.lightTheme || 0,
	        statusIndicator = config.statusIndicator || 1,
	        avatar = '#userProfileApp .user-identity-avatar',
	        $user = mw.config.get('wgTitle').split('/'),
	        Api = new mw.Api(),
	        interval;
	        
	        if (!mw.config.get('profileUserName')) {
	            return; // "illegal return statement", only comment out when testing outside of a function
	        }
	        
	        function appendToMasthead() {
		        $.ajax({
		                method: 'GET',
		                dataType: 'text',
		                url: mw.util.wikiScript('index'),
		                data: {
		                    title: mw.config.get('wgFormattedNamespaces')[2] + ':' + ($user[1] ? $user[1] : $user[0]) + '/status',
		                    action: 'raw'
		                },
		                complete: function (data) {
		                    // Variables
		                    // Limit responses to valid statuses
		                    var status = ['online', 'away', 'dnd', 'offline'].indexOf(data.responseText) === -1
		                        ? i18n.msg('unknown').plain()
		                        : data.responseText;
		                    var status_masthead = $('<li>');
		                    var status_text = {
		                        'online': i18n.msg('online').plain(),
		                        'away': i18n.msg('away').plain(),
		                        'dnd': i18n.msg('dnd').plain(),
		                        'offline': i18n.msg('offline').plain(),
		                        'unknown': i18n.msg('unknown').plain()
		                    };
		                    // Colors: customizable
		                    var status_color = {
		                        'online': config.online || '#43b581',
		                        'away': config.away || '#faa61a',
		                        'dnd': config.dnd || '#f04747',
		                        'offline': config.offline || '#747f8d',
		                        'unknown': config.offline || '#747f8d',
		                    };
		                    var statusOptions = {
		                        'online': 'online',
		                        'away': 'away',
		                        'dnd': 'dnd',
		                        'offline': 'offline',
		                        'unknown': 'unknown'
		                    };
		                    // Colorblind Icons
		                    var statusIcons = {
	                            'online': '',
	                            'away': '<polygon points="5.254 5.093 8.337 6.922 7.578 8.167 3.758 5.875 3.758 1.5 5.254 1.5" />',
	                            'dnd': '<polygon points="9 5.8 1 5.8 1 4.2 9 4.2" />',
	                            'offline': '<path d="M5,8 C6.65685425,8 8,6.65685425 8,5 C8,3.34314575 6.65685425,2 5,2 C3.34314575,2 2,3.34314575 2,5 C2,6.65685425 3.34314575,8 5,8 Z" />',
	                            'unknown': '<path d="M5,8 C6.65685425,8 8,6.65685425 8,5 C8,3.34314575 6.65685425,2 5,2 C3.34314575,2 2,3.34314575 2,5 C2,6.65685425 3.34314575,8 5,8 Z" />'
	                        };
	                    // Create element
		                if (statusIndicator) {
		                        $(avatar).append(
		                            $('<div>', {
		                                'class': 'status-indicator si-is-not-colorblind si-is-not-blocked status-indicator-' + status,
		                                'title': status_text[status],
		                                css: {
		                                    height: '40px',
		                                    position: 'absolute',
		                                    right: '5px',
		                                    bottom: '5px',
		                                    width: '40px',
		                                    borderRadius: '50%',
		                                    background: status_color[status] || '#747f8d',                                         zIndex: '398'
		                                }
		                            })
		                        );
		                }
		                // Add label on masthead
		                status_masthead
		                    .addClass('status-masthead status-masthead-' + status)
		                    .text(status_text[status] || i18n.msg('unknown').plain());
		                $('ul.user-identity-stats').append(status_masthead);
		                // Console log entry to make sure status is returned
		                console.log('[UserStatus] Status for ' + ($user[1] ? $user[1] : $user[0]) + ':', status_text[status]);
		                    // Colorblind mode
		                if (colorBlindMode) {
		                    $('.si-is-not-colorblind').remove();
		                    if (statusIndicator) {
		                        $(avatar).append(
		                            $('<div>', {
		                                'class': 'status-indicator si-is-colorblind si-is-not-blocked status-indicator-' + status,
		                                'title': status_text[status],
		                                css: {
		                                    height: '40px',
		                                    position: 'absolute',
		                                    right: '5px',
		                                    bottom: '5px',
		                                    width: '40px',
		                                    borderRadius: '50%',
		                                    background: status_color[status] || '#747f8d',
		                                    zIndex: '398'
		                                }
		                            })
		                        ).append(
		                            $('<svg>', {
		                            	xmlns: 'http://www.w3.org/2000/svg',
	                                    height: '40px',
	                                    width: '40px',
		                            	viewBox: '0 0 10 10',
		                                css: {
		                                    position: 'absolute',
		                                    right: '5px',
		                                    bottom: '5px',
		                                    borderRadius: '50%',
		                                    zIndex: '399'
		                                }
		                            }).append(
		                                $(statusIcons[status] || statusIcons.unknown).attr('fill', lightTheme ? '#f6f6f7' : '#2f3136'),
		                                $('<title>').text(status_text[status] || i18n.msg('unknown').plain())
	                            	)
		                        );
		                    }
		                }
		            }
		        });
		    }
		    
		    if ($('#userProfileApp').length) {
		    	appendToMasthead();
		    } else {
		    	interval = setInterval(function() {
		    		if ($('#userProfileApp').length) {
		    			clearInterval(interval);
		    			appendToMasthead();
		    		}
		    	}, 1000);
		    }
	    });
	});
});
window.importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:I18n-js/code.js']
});
window.importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:UserStatus/dropdown.js']
});
window.importArticles({
    type: 'style',
    articles: ['u:dev:MediaWiki:UserStatus.css']
});