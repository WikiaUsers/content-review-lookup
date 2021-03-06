if (mw.config.get('wgPageName') === 'Карта_Халлоунеста') {
    importArticle({ type: 'script', article: 'MediaWiki:MapHK.js' });
}

if (mw.config.get('wgPageName') === 'Шаблон:Map2') {
    importArticle({ type: 'script', article: 'MediaWiki:MapSS.js' });
}



/*map map подложка карты*/
if ($('#noMap').length) {
    $('body').append('<div style="display:block" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
    $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"}); //Отображает её
 
    $('#forMap').on('click', function(e){ //Скрывает карту при нажатии на пустое место
        if(e.target.id == "forMap"){
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:none"});
            $('#forMap').attr({"style":"display:none"});
        }
    });
 
    $('#showMap').on('click', function(e){ //Отображает карту при нажатии на кнопку
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
        $('#forMap').attr({"style":"display:block"});
    });
    
    
    for(i=0;i<$('#forMap .mapMarker a > img').length;i++) //Подгружает маркеры
        $('#forMap .mapMarker a > img')[i].src = $('#forMap .mapMarker a > img')[i].dataset.src
}

window.multipleActivity_changeLink = true