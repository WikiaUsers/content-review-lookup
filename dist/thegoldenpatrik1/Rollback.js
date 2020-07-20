/**
 * @name            Rollback
 * @version         v1.2
 * @author          KnazO
 * @author          TheGoldenPatrik1
 * @protect         <nowiki>
 * @description     Script to quickly revert vandalism
 */
require([
    'wikia.window',
    'jquery',
    'mw',
    'BannerNotification'
], function (window, $, mw, BannerNotification) {
	var conf = mw.config.get([
		'wgAction',
		'wgCanonicalSpecialPageName',
		'wgContentLanguage',
		'wgPageName',
		'wgUserGroups'
	]);
    if (
        $('.mw-rollback-link').length ||
        window.ModifiedRollbackLoaded ||
        conf.wgUserGroups.indexOf('autoconfirmed') === -1
    ) {
        return;
	}
	window.ModifiedRollbackLoaded = true;
    var summary = window.ModifiedRollbackSummary || {
		be: '[[w:be:Даведка:Вандалізм|Вандалізм]]',
		ca: '[[w:ca:Ajuda:Vandalisme|Vandalisme]]',
		de: '[[w:de:Hilfe:Vandalismus|Vandalismus]]',
		en: '[[w:Help:Vandalism|Vandalism]]',
		es: '[[w:es:Ayuda:Vandalismo|Vandalismo]]',
		fi: '[[w:fi:Ohje:Vandalismi|Vandalismi]]',
		fr: '[[w:fr:Aide:Vandalisme|Vandalisme]]',
		it: '[[w:it:Aiuto:Vandalismo|Vandalismo]]',
		ja: '[[w:ja:ヘルプ:荒らし|荒らし]]',
		nl: '[[w:nl:Help:Vandalisme|Vandalisme]]',
		pl: '[[w:pl:Pomoc:Wandalizm|Wandalizm]]',
		pt: '[[w:pt:Ajuda:Vandalismo|Vandalismo]]',
		ru: '[[w:ru:Справка:Вандализм|Вандализм]]',
		uk: '[[w:uk:Довідка:Вандалізм|Вандалізм]]',
		vi: '[[w:vi:Trợ giúp:Phá hoại|Phá hoại]]',
		zh: '[[w:zh:Help:破壞|破壞]]'
	};
	var msg = {
        desc: '&quot;Rollback&quot; reverts edit(s) to this page of the last contributor in one click',
        text: 'rollback'
	};
	if (!window.ModifiedRollbackSummary) {
	    summary =
            summary[conf.wgContentLanguage] ||
            summary[conf.wgContentLanguage.split('-')[0]] ||
            summary.en;
	}
	function init () {
    	//History
	    if (
            conf.wgAction === 'history' &&
            $('#pagehistory li').length > 1
        ) { 
	    	$('#pagehistory li:first .mw-history-undo a').before(
	    	    $('<span>', {
	    	        'class': 'mw-custom-rollback-link'
	    	    }).append(
	    	        $('<a>', {
	    	            'title': msg.desc,
	    	            'data': {
	    	                'id': conf.wgPageName,
	    	                'user': $('.mw-userlink:first').text()
	    	            },
	    	            'text': msg.text
	    	        })
	    	    ),
	    	    ' | '
	    	);
        }
    	//Contributions
	    else if (
            conf.wgCanonicalSpecialPageName === 'Contributions'
        ) {
            var $content = $('#mw-content-text ul');
	    	$content.find('li').each(function () {
	    	    $that = $(this);
		    	if ($that.find('.mw-uctop').length) {
			    	$that.append(
	    	            $('<span>', {
	    	                'class': 'mw-custom-rollback-link'
	    	            }).append(
	    	                '[',
	    	                $('<a>', {
	    	                    'title': msg.desc,
	    	                    'data': {
	    	                        'id': $that.find('a:first').attr('title'),
	    	                        'user': conf.wgPageName.split('/')[1]
	    	                    },
	    	                    'text': msg.text
	    	                }),
	    	                ']'
	    	            )
			    	);
		    	}
		    });
		    if ($('.mw-custom-rollback-link').length) {
		        $content.before(
    		        $('<a>', {
	    	            class: 'button',
		                text: 'Rollback All',
    		            click: function () {
	    	                $(this).remove();
		                    doAll();
                        }
		            })
                );
		    }
	    }
	    //Diffs
	    else if (
            ($.getUrlVar('diff') || $.getUrlVar('oldid')) &&
            $('#differences-nextlink').length === 0
        ) {
		    $('.mw-usertoollinks:last').after(
		        '&nbsp;&nbsp;&nbsp;&nbsp;',
	    	    $('<span>', {
	    	        'class': 'mw-custom-rollback-link'
	    	    }).append(
	    	        '[',
	    	        $('<a>', {
	    	            'title': msg.desc,
	    	            'data': {
	    	                'id': conf.wgPageName,
	    	                'user': $('#mw-diff-ntitle2 .mw-userlink').text()
	    	            },
	    	            'text': msg.text
	    	        }),
	    	        ']'
                )
	        );
	    } else {
	        return;
	    }
	    conf.API = new mw.Api();
	    conf.token = mw.user.tokens.values.editToken;	
	    mw.util.addCSS('.mw-custom-rollback-link a { cursor: pointer; }');
	    $('.mw-custom-rollback-link a').click(function () {
		    getRevisionIdAndContent($(this).data('id'),$(this).data('user').replace(/_/g, " "));
		    $(this).parent().remove();
	    });
	}
	function doAll () {
	    $('.mw-custom-rollback-link a').first().click();
	    setTimeout(
	        doAll,
	        200
        );
	}
	function getRevisionIdAndContent (title, target) {
		conf.API.get({
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'user|ids',
            rvlimit: 500,
            cb: new Date().getTime()
		})
		.done(function (d) {
			if (!d.error) {
				var revisions;
				for (var i in d.query.pages) {
					revisions = d.query.pages[i].revisions;
				}
				//Don't rollback if the page has been edited by somebody else
				if (target != revisions[0].user) {
					outputError('Unable to rollback (edit conflict)');
					return;
				}
				var lastUser,
				    revId;
				for (var i in revisions) {
					if (revisions[i].user != target) {
                        //remember last author
						lastUser = revisions[i].user;
						//get revision to revert to
						revId = revisions[i].revid;
						break;
					}
				}
				if (lastUser) {
					conf.API.get({
                        action: 'query',
                        prop: 'revisions',
                        rvprop: 'content',
                        revids: revId,
                        cb: new Date().getTime()
					})
					.done(function (d) {
						if (d.error) {
							outputError('Unable to rollback (failed to get page content): ' + d.error.code);
						} else {
							var content = ''; //can be no content on page
							for (var i in d.query.pages) {
								if (d.query.pages[i].revisions)
									content = d.query.pages[i].revisions[0]["*"];
							}
							performRollback(title,content,target,lastUser);
						}
					})
					.fail(function () {
						outputError('Unable to rollback (failed to get page content)');			
					});
				}
				else {
					outputError("Unable to rollback (no different editor found)");
				}
			}
			else {
				outputError('Unable to rollback (failed to get revisions): ' + d.error.code);
			}
		})
		.fail(function () {
			outputError("Unable to rollback (failed to get revisions)");
		});			
	}
	function performRollback (page, text, user, user2) {
		conf.API.post({
            action: 'edit',
            title: page,
            text: text,
            summary: summary,
            token: conf.token
		})
		.done(function (d) {
			if (d.error) {
				outputError('Unable to rollback (failed to publish edit): ' + d.error.code);			
			} else {
			    new BannerNotification('Rollback successful','confirm').show();	
			}
		})
		.fail(function () {
			outputError("Unable to rollback (failed to publish edit)");
		});	
	}
	function outputError (text) {
		new BannerNotification(text, 'error').show();
	}
	mw.loader.using([
	    'mediawiki.api',
	    'mediawiki.util',
	    'mediawiki.user'
    ]).then(init);
});