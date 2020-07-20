
/////////////////////////////////////////////////////////////////
/// Взято с сайта [[w:c:ru.bindingofisaac:MediaWiki:Ita.js]] ///
/// Тестовая кнопка - [[w:c:ru.dungeoncrusher:Шаблон:Тест]] ///
//////////////////////////////////////////////////////////////

if ($('#noMap').length) {
    $('body').append('<div style="display:none" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
    if (!$('#noMap').is('.hiddenMap')) { //Отображает её, если требуется
          $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 18px; display:block"});
          $('#forMap').attr({"style":"display:block"});
     }
 
    $('#forMap').on('click', function(e){ //Скрывает карту при нажатии на пустое место
        if(e.target.id == "forMap"){
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 18px; display:none"});
            $('#forMap').attr({"style":"display:none"});
        }
    });
 
    $('#showMap').on('click', function(e){ //отображает карту при нажатии на кнопку
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 18px; display:block"});
        $('#forMap').attr({"style":"display:block"});
    });
}