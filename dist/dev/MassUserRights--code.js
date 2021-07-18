/**
 * @Name            MassUserRights
 * @Version         v2.4
 * @Author          Ozuzanna
 * @Author          TheGoldenPatrik1
 * @Description     Mass add/remove usergroups from listed users
 * @Protect         <nowiki>
 */
 
/* jshint
	esversion: 5, forin: true, 
	immed: true, indent: 4, 
	newcap: true, undef: true,
	unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw, importArticles, importArticle */

mw.loader.using([
    'mediawiki.api',
    'mediawiki.user'
], function () {
    'use strict';
    
    var config = mw.config.get([
        'wgUserGroups',
        'wgUserName',
        'wgVersion'
    ]);
    
    if (
        window.MassUserRightsLoaded ||
        !/sysop|bureaucrat|staff|helper|wiki-representative|util/.test(config.wgUserGroups.join())
    ) {
        return;
    }

    window.MassUserRightsLoaded = true;
    var i18n,
	    placement,
	    rightsModal,
	    preloads = 3,
	    Api = new mw.Api(),
	    paused = true,
	    groups = [
	        'bureaucrat',
	        'sysop',
	        'content-moderator',
	        'threadmoderator',
	        'rollback',
	    ],
	    messages = {},
		customGroups = window.massUserRightsCustom,
		isUCP = config.wgVersion !== '1.19.24';
		
	// Message fetch by KockaAdmiralac
	Api.get({
        action: 'query',
        meta: 'allmessages',
        ammessages: groups.map(function(msg) {
            return (isUCP ?
            'userprofile-global-tag-' :
            'user-identity-box-group-'
        ) + msg;
        }).join('|')
    }).then(function(d) {
        d.query.allmessages.forEach(function(msg, i) {
	        messages[groups[i]] = msg['*'];
	    });
	    
        /**
         * @method generateElement
         * @description Creates an option element
         * @param {String} type - The options's value
         * @param {String} isI18n - If the message uses I18n-js
         */
        function generateElement (type, isI18n) {
            return $('<option>', {
                value: type,
                text: isI18n ? i18n.msg(type).plain() : messages[type]
            });
        }
        
        /**
         * @method formHtml
         * @description Creates the modal HTML
         */
        function formHtml () {
            return $('<form>', {
                'class': 'WikiaForm'
            }).append(
                $('<fieldset>').append(
                    $('<p>', {
                        text: i18n.msg('mode').plain()
                    }).append(
                        $('<select>', {
                            id: 'user-rights-mode'
                        }).append(
                            $('<option>', {
                                value: '0',
                                text: i18n.msg('add').plain()
                            }),
                            $('<option>', {
                                value: '1',
                                text: i18n.msg('remove').plain()
                            })
                        )        
                    ),
                    $('<p>', {
                        text: i18n.msg('type').plain()
                    }).append(
                        $('<select>', {
                            id: 'user-rights-type'
                        }).append(
                            generateElement('bureaucrat'),
                            generateElement('sysop'),
                            generateElement('content-moderator'),
                            generateElement('threadmoderator'),
                            generateElement('rollback', true)
                        )        
                    ),
                    $('<p>', {
                        text: i18n.msg('reason').plain()
                    }).append (
                        $('<input>', {
                            type: 'text',
                            id: 'user-rights-reason'
                        })
                    ),
                    $('<p>', {
                        text: i18n.msg('instructions').plain()
                    }),
                    $('<textarea>', {
                        id: 'text-mass-user-rights'
                    }),
                    $('<div>', {
                        id: 'text-error-output',
                        text: i18n.msg('errors').plain()
                    }).append(
                        $('<br/>')
                    )
                )
            ).prop('outerHTML');
        }
        
        /**
         * @method preload
         * @description Preloads the script and the hooks
         */
        function preload () {
            if (--preloads === 0) {
                placement = window.dev.placement.loader;
                window.dev.i18n.loadMessages('MassUserRights').then(init);
            }
        }
        
        /**
         * @method init
         * @description Initiates the script
         * @param {String} i18nData - Variable for I18n-js
         */
        function init (i18nData) {
            i18n = i18nData;
            placement.script('MassUserRights');
            $(placement.element('tools'))[placement.type('prepend')](
                $('<li>', {
                    'class': 'custom'
                }).append(
                    $('<a>', {
                        id: 't-mu',
                        text: i18n.msg('title').plain(),
                        click: click
                    })
                )
            );
        }
        
        /**
         * @method click
         * @description Opens the MassUserRights modal
         */
        function click () {
            if (rightsModal) {
                rightsModal.show();
                show();
                return;
            }
            rightsModal = new window.dev.modal.Modal({
                content: formHtml(),
                id: 'form-mass-user-rights',
                size: 'medium',
                title: i18n.msg('title').escape(),
                buttons: [
                    {
                        id: 'mur-start',
                        text: i18n.msg('initiate').escape(),
                        primary: true,
                        event: 'start'
                    },
                    {
                        id: 'mur-pause',
                        text: i18n.msg('pause').escape(),
                        primary: true,
                        event: 'pause',
                        disabled: true
                    },
                    {
                        text: i18n.msg('group').escape(),
                        primary: true,
                        event: 'addGroupContents'
                    },
                    {
                        text: i18n.msg('cancel').escape(),
                        event: 'close'
                    }
                ],
                events: {
                    addGroupContents: addGroupContents,
                    pause: pause,
                    start: start
                }
            });
            rightsModal.create().then(show);
            rightsModal.show();
		}
		
		/**
		 * @method show
		 * @description Handles some aspects of the modal
		 */
		function show () {
		    // Removes options admins can't use
			if (!/bureaucrat|staff|helper|wiki-representative|util/.test(config.wgUserGroups.join())) {
				$('#user-rights-type option[value="rollback"],#user-rights-type option[value="sysop"],#user-rights-type option[value="content-moderator"],#user-rights-type option[value="bureaucrat"]').remove();
            }
            // Support for custom groups
			if (customGroups) {
				$.each(customGroups, function(i,v) {
					var split = v.split('|');
					
					if (
                        document.domain.split('.')[0] === split[0]
                        && (typeof(split)[3] === 'string' ? split[3].split(/\s*,\s*/).some(function(v) { return !!~config.wgUserGroups.indexOf(v) }) : true)
                    ) {
						$('#user-rights-type').append(
                            $('<option>', {
                                value: split[1],
                                text: split[2]
                            })
                        );	
                    }
				});
			}
		}
		
		/**
		 * @method pause
		 * @description Pauses the operation
		 */
        function pause () {
            paused = true;
            document.getElementById('mur-pause').setAttribute('disabled', '');
            document.getElementById('mur-start').removeAttribute('disabled');
        }
        
        /**
         * @method start
         * @description Starts the operation
         */
        function start () {
            paused = false;
            document.getElementById('mur-start').setAttribute('disabled', '');
            document.getElementById('mur-pause').removeAttribute('disabled');
            process();
        }
        
		/**
		 * @method process
		 * @description Analyzes the inputted data
		 */
		function process () {
		    if (paused) {
		        return;
		    }
			var txt = document.getElementById("text-mass-user-rights");
			var pages = txt.value.split('\n');
			var currentUser = pages[0];
			if (!currentUser) {
			    pause();
                $('#text-error-output').append(
                    i18n.msg('finished').escape() +
                    ' ' +
                    i18n.msg('done').escape() +
                    '<br/>'
                );
			} 
			else {
				changeRights(currentUser);	
			}
			pages = pages.slice(1,pages.length);
			txt.value = pages.join('\n');
		}
		
		/**
		 * @method addGroupContents
		 * @description Inputs users from a certain usergroup
		 */
		function addGroupContents () {
            var group = prompt(i18n.msg('groupPrompt').plain());
            if (!group) {
                return;
            }
            Api.get({
                action: 'query',
                list: 'allusers|groupmembers',
                augroup: group,
                aulimit: 'max',
                gmgroups: group,
                gmlimit: 'max',
                format: 'json'
            })
            .done(function(d) {
                if (!d.error) {
                    (d.users || d.query.allusers).forEach(function(user) {
                        $('#text-mass-user-rights').val($('#text-mass-user-rights').val() + user.name + '\n');
                    });
                }
                else {
                    sendError(i18n.msg('groupError').escape() + ' ' + group +' : '+ d.error.code);
                }
            })
            .fail(function() {
                sendError(i18n.msg('groupError').escape() + ' ' + group +'!');
            });
        }
        
        /**
         * @method changeRights
         * @description Performs the action
         * @param {String} user - The user whose rights are being changed
         */
        function changeRights (user) {			
            Api.get({
                action: 'query',
                list: 'users',
                ustoken: 'userrights',
                ususers: user,
                meta: 'tokens',
                type: 'userrights'
            }).done(function(d) {
                if (!d.error) {
                    var params = {
                        action: 'userrights',
                        user: user,
                        add: $('#user-rights-type').val(),
                        reason: $('#user-rights-reason').val(),
                        bot: true,
                        token: d.query.tokens ?
                            d.query.tokens.userrightstoken :
                            d.query.users[0].userrightstoken
                    };
                    params[$('#user-rights-mode').val() === 1 ? 'remove' : 'add'] = $('#user-rights-type').val();
                    Api.post(params).done(function(d2) { 
                        if (!d2.error) {
                            console.log(i18n.msg('success', user).plain());
                        }
                        else {
							sendError(i18n.msg('fail1', user, d2.error.code).escape());
						}
					})
					.fail(function(code) {
						sendError(i18n.msg('fail1', user, code).escape());
					});
				}
				else {
					sendError(i18n.msg('fail3', user, d.error.code).escape());
				}
			});
			setTimeout(process, window.massUserRightsDelay || 1000);
		}
		
		/**
		 * @method sendError
		 * @description Handles error notices
		 * @param {String} error - The error to input
		 */
        function sendError (error) {
            console.log(error);
            $('#text-error-output').append(error + '<br/>');
        }
        
        mw.hook('dev.i18n').add(preload);
        mw.hook('dev.modal').add(preload);
        mw.hook('dev.placement').add(preload);
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Modal.js',
                'u:dev:MediaWiki:Placement.js'
            ]
        });
        importArticle({
            type: 'style',
            articles: ['u:dev:MediaWiki:MassUserRights.css']
        });
    });
});