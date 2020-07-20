/**
 * lastEdited.js
 * 
 * Adds last edited details to the page
 * @author: [[w:User:Fubuki風吹]]
 */
 
$(function() {
    if (mw.config.get('wgNamespaceNumber') === 0 && !$.getUrlVar('diff') && !$.getUrlVar('oldid')) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            console.log(data);
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
            var html = '<div class="lastEdited">Последняя правка совершена участником <a href="/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> (' + new Date(rv.timestamp).toUTCString().slice(0, 16) + ') </a>, ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC) <a class="lastEdited-diff">(разн)</a></div>';
            $('.header-container').after(html);
            mw.loader.using(['mediawiki.action.history.diff'], function() {
                $('.lastEdited-diff').on('click', function() {
                    $.showCustomModal('Изменения: ' + mw.config.get('wgPageName').replace(/_/g, ' '), rv.diff['*'], {
                        id: 'lastEdited-diff',
                        width: 650,
                        buttons: [{
                            message: 'Link',
                            defaultButton: true,
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/?diff=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Undo',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Cancel',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                            }
                        }]
                    });
                });
            });
        });
    }
});