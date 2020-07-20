//===================================
// Новый блок "Новые статьи" с [[Шаблон:NewPagesModule]] внутри.
// Стили записаны в MediaWiki:Boxes.css
// 
 
$(function(){
	$('<section class="module"></section>')
		.appendTo('#WikiaRail')
		.load('/index.php?title=Template:NewPagesModule&action=render');
});

//===================================
// Создаёт возможность создавать всплывающие окна
// ПРИМЕЧАНИЕ: автор кода TRJ-VoRoN на вики ru.dead-cells
// Стили записаны в MediaWiki:Wikia.css

if ($('#noMap').length) {
$('body').append('<div style="display: none" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
$('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display: none"}); //Отображает её
 
$('#forMap').on('click', function(e){ //Скрывает окно при нажатии на пустое место
    if(e.target.id == "forMap"){
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display: none"});
        $('#forMap').attr({"style":"display: none"});
    }
});
 
$('#showMap').on('click', function(e){ //отображает окно при нажатии на кнопку
    $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display: block"});
    $('#forMap').attr({"style":"display: block"});
});
}