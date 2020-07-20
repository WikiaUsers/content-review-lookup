/* Розміщений тут JavaScript код буде завантажуватися всім користувачам при звертанні до кожної сторінки */
/**
 *
 * English: Open a popup with parameters to generate an array. 
 * The number of rows/columns can be modified. Some additional
 * parameters are related to templates available on :fr
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
function popupTable()
{
  var popup = window.open('','name','height=180,width=300,scrollbars=yes');
 
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); '
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); '
  javaCode += 'var bord = 0; '
  javaCode += 'var styleHeader = false; '
  javaCode += 'var styleLine = false; '
  javaCode += 'var exfield = false; '
  javaCode += 'var align = document.paramForm.inputAlign.value; '
  javaCode += 'var padding = false; '
  javaCode += 'window.opener.generateTableau(col,row,bord,styleHeader,styleLine,exfield,align,padding); '
  javaCode += "alert('Таблиця створена!'); "
  javaCode += 'window.close(); '
  javaCode += '}<\/script>';
 
  popup.document.write('<html><head><title>Створення таблиці</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>Введіть параметри таблиці: </p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('Вирівнювання&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="text" name="inputAlign" value="center" ><p>');
  popup.document.write('Кількість рядків&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('Кількість стовпчиків: <input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()">Вставити таблицю</a>     |');
  popup.document.write('    <a href="javascript:self.close()">Відмінити (зачинити вікно)</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}

/* Маленьке корегування кнопки підпису */
appendCSS('#mw-editbutton-signature { display: none; }');
if (mwCustomEditButtons) {
	mwCustomEditButtons.push({
		'imageFile': 'http://static.uncyc.org/skins/common/images/button_sig.png',
		'speedTip': 'Ваш підпис з часовою міткою',
		'tagOpen': '— ~~\~~',
		'tagClose': '',
		'sampleText': '',
		'imageId': 'editbutton-customsig'
	});
}

/* Всі додаткові скрипти включені нижче */
importScript("MediaWiki:Otherscripts.js");
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('User:Wildream/FluidImage/code.js', 'ru.community');

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
$('.factions img').hide(); 	$('.factions img').removeAttr('width').removeAttr('height'); 	var l=$('.factions tr').eq(1).find('td').height(); 	$('.factions tr').eq(1).find('img').css('max-height', l); 	$('.factions img').show(); 	if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) { 		$('.factions tr').eq(1).find('td').width($('.factions img').width()); 	}
  $('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

importScriptPage('User:Wildream/FluidImage/code.js', 'ru.community');