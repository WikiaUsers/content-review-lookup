/*фон*/
var bgrandom_list = [
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/d/d6/F1.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/5/52/F2.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/b/b9/F3.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/e/e9/F4.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/7/75/F5.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/b/bd/F6.jpg"];



/* Автообновление вики-активности */
 
var ajaxPages 
= ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText 
= 'Автообновление страницы';
 
/* Последние изменения */
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
            var html = '<div class="lastEdited">Последняя правка совершена <a href="/ru/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> (' + new Date(rv.timestamp).toUTCString().slice(0, 16) + ') </a>, ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC) <a class="lastEdited-diff">(разн)</a></div>';
            $('#PageHeader').after(html);
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
                                window.open('/ru/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
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

 /* Кликабельная деятельность Автор скрипта: Дима*/

function addLinkInActivityModule() {
    if ($("#WikiaRail section").length >= 2)
        $("#wikia-recent-activity .has-icon").wrap("<a href='https://"+ window.location.host +"/ru/wiki/Служебная:WikiActivity'>")
    else
        setTimeout(addLinkInActivityModule, 500)
}
addLinkInActivityModule()