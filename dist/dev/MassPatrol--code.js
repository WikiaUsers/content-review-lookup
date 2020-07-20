/*
 * Name:         MassPatrol
 * Description:  Allows to massively patrol edits
 * Author:       Rendann
 * Support:      Aenn, BertH, Your Own Waifu
 * Scripts used:
 * https://dev.wikia.com/wiki/MediaWiki:AjaxPatrol/code.js
 */
(function( $, mw ) {
    'use strict';
 
    if (window.MassPatrolLoaded) {
        return;
    }
    window.MassPatrolLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    var i18n;
 
    var MP = {
        _state: 0,
 
        defines: $.extend({
            CONSECUTIVE_DIFF: 0,
            NON_CONSECUTIVE_DIFF: 1,
            SPECIAL_NEW_PAGES: 2
        }),
        config: mw.config.get([
            'wgPageName',
            'wgArticleId',
            'wgUserGroups',
            'wgNamespaceNumber'
        ])
    };
 
    var MPFunctions = {
        init: function(i18nData) {
            i18n = i18nData;
            if ( $('.patrollink').exists() ) {
                MP._state = MP.defines.CONSECUTIVE_DIFF;
            // most probably diff with multiple non-consecutive versions
            } else if ( document.URL.match(/.+\/index\.php\?title=.+&diff=\d+&oldid=\d+/) && MPFunctions.isAllowedTo() ) {
                MP._state = MP.defines.NON_CONSECUTIVE_DIFF;
            // special NewPages page
            } else if ( MP.config.wgPageName.match(/.+\:NewPages/) && MPFunctions.isAllowedTo() ) {
                MP._state = MP.defines.SPECIAL_NEW_PAGES;
            } else {
                return;
            }
 
            MPFunctions.addLink();
        },
 
        fetchData: function(ns) {
            if (MPFunctions.isSpecialNewPages()) {
                ns = '';
            }
 
            $.get(mw.util.wikiScript('api'), {
                action: 'query',
                list: 'recentchanges',
                rctoken: 'patrol',
                rcshow: '!patrolled',
                rctype: 'edit|new',
                rclimit: 1000,
                rcnamespace: ns,
                format: 'json'
                }, function (d) {
                    if (MPFunctions.isSpecialNewPages()) {
                        MPFunctions.processSpecial(d, d.query.recentchanges[0].patroltoken);
                    } else {
                        MPFunctions.processDiff(d, d.query.recentchanges[0].patroltoken);
                    }
            });
        },
 
        processDiff: function(data, token) {
            var k = 0;
 
            for ( var i = 0; i < Object.keys(data.query.recentchanges).length; i++ ) {
                if ( data.query.recentchanges[i].pageid === MP.config.wgArticleId ) {
                    MPFunctions.patrolPage( data.query.recentchanges[i].rcid, token );
                    k += 1;
                }
            }
 
            MPFunctions.result(k);
        },
 
        processSpecial: function(data, token) {
                var titles = [];
                var k = 0;
 
                $('.not-patrolled').each(function() {
                    titles.push( $(this).find('.mw-newpages-pagename').attr('title') );
                    $(this).removeClass('not-patrolled');
                });
 
                if (titles.length <= 0) {
                    MPFunctions.result(0);
                    return;
                }
 
                for ( var i = 0; i < Object.keys(data.query.recentchanges).length; i++ ) {
                    if ( titles.indexOf(data.query.recentchanges[i].title) > -1 ) {
                        MPFunctions.patrolPage( data.query.recentchanges[i].rcid, token );
                        k += 1;
                    }
                }
 
                MPFunctions.result(k);
        },
 
        patrolPage: function(rcid, token) {
            $.post(mw.util.wikiScript('api'), {
                action: 'patrol',
                token: token,
                rcid: rcid
                }, function () {
            });
        },
 
        addLink: function() {
            if ( MPFunctions.isConsecutiveDiff() ) {
                $('.patrollink').after( '&nbsp;[<a class="masspatrol">' + i18n.msg('patrol').escape() + '</a>]' );
            } else if ( MPFunctions.isNonConsecutiveDiff() ) {
                $('.diff-multi').append( '&nbsp;[<a class="masspatrol">' + i18n.msg('patrol').escape() + '</a>]' );
            } else {
                $('.mw-submit').append( '&nbsp;[<a class="masspatrol">' + i18n.msg('patrol').escape() + '</a>]' );
            }
 
            $( '.masspatrol' ).on('click', function () {
                $('.masspatrol').html('<img src="//images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif"' +
                                      'style="vertical-align: baseline;" border="0" alt=' + i18n.msg('patrolling').escape() + '/>');
                MPFunctions.fetchData(MP.config.wgNamespaceNumber);
            });
        },
 
        result: function(k) {
            var msg;
 
            if (k > 0) {
                msg = i18n.msg('patrolled').plain().replace('$1', k);
            } else if (k <= 0) {
                msg = i18n.msg('patrolledNothing').plain();
            }
 
            $('.patrollink').empty();
            $('.masspatrol').css('color', 'grey').text(msg);
        },
 
        isAllowedTo: function() {
            if (
                /sysop|content-moderator|vstf|staff|helper/.test(
                    MP.config.wgUserGroups.join()
                )
            ) {
                return true;
            } else {
                return false;
            }
        },
 
        isConsecutiveDiff: function() {
            return MP._state === MP.defines.CONSECUTIVE_DIFF;
        },
 
        isNonConsecutiveDiff: function() {
            return MP._state === MP.defines.NON_CONSECUTIVE_DIFF;
        },
 
        isSpecialNewPages: function() {
            return MP._state === MP.defines.SPECIAL_NEW_PAGES;
        }
    };
    mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('MassPatrol').then(MPFunctions.init);
	});
})(jQuery, mediaWiki);