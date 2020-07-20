//Кнопки для карты
$('.interplu').click(function(){
  $('.specmap').css('transform', 'scale(0.8)');
    $('.specmap').css('top', '-365px');
});

$('.intermin').click(function(){
  $('.specmap').css('transform', 'scale(0.67)');
  $('.specmap').css('top', '-585px');
});

















//<tabber> extension req
//set active tab: https://wikia.wikia.com/page#activeTab
//v2.0, 2017, user:fngplg.
(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    //convert wiki-utf 2 ansi
    nstarget = nstarget.replace(/\./g, '%');
    nstarget = decodeURIComponent(nstarget).replace(/_/g, ' ');
    //console.log('trgt:'+nstarget);
    $(function(){
        setTimeout(function() {
            var $nt2a = $('.tabberlive>.tabbernav>Li>a[title="' + nstarget + '"]');
            $nt2a.click();
        }, 100);//settimeout
    });//doc.rdy    
})(jQuery);


/*превью предметов*/
window.tooltips_list = [{
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Предмет}}'
}];


//стиль общих карт
$('.me-button-uups').hover(function(e) {
    // открытие карт
    $('.WikiaMainContent').toggleClass('uups');
    $(this).toggleClass('wds-is-secondary');
});
 


/*фон*/
var bgrandom_list = [
    "https://images.wikia.nocookie.net/dead-cells/ru/images/5/54/Wall1.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/3/36/Wall2.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/9/90/Wall3.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/3/35/Wall4.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/c/cd/Wall5.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/b/bb/Wall6.jpg",
    "https://images.wikia.nocookie.net/dead-cells/ru/images/9/9b/Wall7.jpg"];





/*map map*/
if ($('#noMap').length) {
$('body').append('<div style="display:block" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
$('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"}); //Отображает её
 
$('#forMap').on('click', function(e){ //Скрывает карту при нажатии на пустое место
    if(e.target.id == "forMap"){
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:none"});
        $('#forMap').attr({"style":"display:none"});
    }
});
 
$('#showMap').on('click', function(e){ //отображает карту при нажатии на кнопку
    $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
    $('#forMap').attr({"style":"display:block"});
});
}

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