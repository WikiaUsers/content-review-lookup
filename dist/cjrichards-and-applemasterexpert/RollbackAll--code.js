/**
 * A variant of WHAM with a different modal
 * Includes functionality to delete forum/message wall threads and selective
 * deleting of pages, which the original lacks
 * Original "WHAM" - https://dev.wikia.com/wiki/MediaWiki:WHAM/code.js
 * @author Ozank Cx
 */
mw.loader.using('mediawiki.api').then(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgFormattedNamespaces',
        'wgPageName',
        'wgUserGroups',
        'wgUserName'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Contributions' ||
        !/autoconfirmed|vstf|staff|helper|wiki-manager/.test(config.wgUserGroups.join()) ||
        window.RollbackAllLoaded
    ) {
        return;
    }
  window.RollbackAllLoaded = true;
     function doRollback() {
        var $links = $('.mw-rollback-link a'),
            len = $links.length;
        if (len === 0) {
            $('#status-wham').text(i18n.msg('do-rollback-done').plain());
        }
        $links.each(function(i) {
            var href = new mw.Uri($(this).attr('href')).extend({
                bot: 1
            }).toString();
            setTimeout(function() {
                $.get(href);
                $('#status-wham').html(
                    i18n.msg('do-rollback-status').escape() +
                    $('<img>', {
                        src: progress
                    }).prop('outerHTML')
                );
                if (i === len - 1) {
                    $('#status-wham').text(
                        i18n.msg('do-rollback-done').plain()
                    );
                }
            }, i * delay);
        });
    }