// __NOWYSIWYG__ <source lang="javascript">
/**
 * changes Special:WantedFiles links from edit to upload
 *    and
 * redirects from 404 page to Special:Upload
 */

/** Stammt von hier: http://dev.wikia.com/wiki/FixWantedFiles **/
/** Wurde von http://community.wikia.com/wiki/User:Pecoes erstellt **/

/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/

;(function (mw, $, window) {
    
    'use strict';
    
    function rewriteLinks () {
        if (/WantedFiles/i.test(mw.config.get('wgCanonicalSpecialPageName'))) {
            $(function () {
                $('ol.special a.new').each(function() {
                    var $this = $(this),
                        m = $this.attr('href').match(/(?:wiki\/|title=)File:([^&?]+)/);
                    if (m) {
                        $this.attr({
                            href: '/wiki/Special:Upload?wpDestFile=' + m[1],
                            title: 'Upload ' + m[1]
                        });
                    }
                });
            });
        }
    }

    function addUploadLink () {
        $(function () {
            if (mw.config.get('wgUserName') && window.document.getElementById('mw-imagepage-nofile')) {
                var messages = {
                    'upload':     'Upload photo',
                    'upload-url': 'Special:Upload'
                };
                $.getJSON(
                    '/api.php?action=query&format=json&meta=allmessages&ammessages=upload|upload-url&amlang=' +
                    mw.config.get('wgUserLanguage')
                )
                .done(function (data) {
                    var msg = data && data.query && data.query.allmessages;
                    if (msg) $.each(msg, function (i, m) {
                        if (m.name && m['*'] && messages[m.name]) {
                            messages[m.name] = m['*'];
                        }
                    });
                })
                .always(function () {
                    $('.wikia-button').filter('[data-id="edit"]')
                    .text(messages['upload'])
                    .attr('href',
                        '/wiki/' + messages['upload-url'] +
                        '?wpDestFile=' + mw.config.get('wgTitle')
                    );
                });
            }
        });
    }
    
    var ns = mw.config.get('wgCanonicalNamespace'),
        actions = { Special: rewriteLinks, File: addUploadLink };

    if (actions[ns]) actions[ns]();

}(mediaWiki, jQuery, window));
//</source>