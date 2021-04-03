//============================================================
// Новый блок "Новые статьи" с [[Шаблон:NewPagesModule]] внутри.
// Перенесено в Common.js, здесь не загружается.

//------------------------------------//
/* Для скрипта загрузки файлов */
// Параметры для описания загрузки файлов смотреть в истории. Для dev:PreloadFileDescription. Не перенесено.

//------------------------------------//
// Создаёт возможность создавать всплывающие окна. Например, для семейных древ.
// ПРИМЕЧАНИЕ: автор кода TRJ-VoRoN на вики ru.dead-cells
// Стили записаны в MediaWiki:Wikia.css

if ($('#noMap').length) {
$('body').append('<div style="display: none; background: rgba(30, 36, 49, 0);" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
$('#forMap').on('click', function(e){ //Скрывает карту при нажатии на пустое место
    if(e.target.id == "forMap"){
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display: none"});
        $('#forMap').attr({"style":"display:none"});
    }
});
 
$('#showMap').on('click', function(e){ //отображает карту при нажатии на кнопку
    $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
    $('#forMap').attr({"style":"display:block"});
});
}