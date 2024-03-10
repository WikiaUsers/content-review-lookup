// Автор Equazcion: http://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: http://terraria-ru.gamepedia.com/User:Alex_Great

var wgPageName = mw.config.get( 'wgPageName' );

if (($('#ca-addsection').length > 0) && (($('.editButtons').length > 0)) 
    || (wgPageName == 'Terraria_Wiki:Запросы_к_администраторам') || (wgPageName == 'Terraria_Wiki:Портал_сообщества')){
$('.editCheckboxes').css('margin-bottom','5px');
var addSigTooltip = 
    'Щёлкните курсором в конце вашего сообщения, затем нажмите на эту ссылку, чтобы оставить подпись.';
var addSigText = '<div style="border:1px #ccc solid; width:95%; padding:10px;"> ' +
    'После того, как закончите писать своё сообщение, ' + 
    'пожалуйста, поставьте курсор мыши в конце сообщения и ' +
    '<a style="font-weight:bold;" href="#ggg" class="addSig" title="' + addSigTooltip + '">' +
    'нажмите здесь, чтобы оставить подпись</a>. <br/>' + 
    '<span style="font-size:90%">Ваша подпись будет отображаться как «&#126;&#126;&#126;&#126;», ' +
    ' а когда нажмёте на кнопку «Записать страницу», она автоматически преобразуется в имя и текущую дату.</span></div>';
$('#editpage-copywarn').before(addSigText);
$('.addSig').click(function(){
		    var caretPos = document.getElementById('wpTextbox1').selectionStart;
		    var textAreaTxt = $("#wpTextbox1").val();
		    var txtToAdd = ' ~' + '~' + '~' + '~';
		    $('#wpTextbox1').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});
}