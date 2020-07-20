//Превью артефактов в таблице (linkpreview)
window.pPreview = $.extend(true, window.pPreview, {
    wholepage: true,
    tlen: 500,
    dock: '#mw-content-text, #forMap',
    defimage: 'https://images.wikia.nocookie.net/supermeatboy/ru/images/thumb/2/2a/Warp_portal.gif/30px-Warp_portal.gif',
     noimage: 'https://images.wikia.nocookie.net/bindingofisaac/ru/images/c/c5/Eff.png',
});
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

switch (wgPageName) {
case 'Категория:Отсылки':
    //config2
    window.pPreview.RegExp.onlyinclude = ['.refinfo'];
    window.pPreview.RegExp.dtag = '<>';
    window.pPreview.RegExp.apid = true;

    importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});
 break;
} 


function mapPreview(){
    if(window.pPreview.f&&window.pPreview.f.main)
        window.pPreview.f.main();
    else
        setTimeout(mapPreview,100);
}
mapPreview();


//Авт
 
var ajaxPages 
= ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText 
= 'Автообновление страницы';
 
//Посл
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