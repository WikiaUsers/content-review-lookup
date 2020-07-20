var Elder_Switcher_CantWork = 'Не поддерживается вашим браузером.'
var Elder_Switcher_FullText = 'Выделите фрагмент текста для изменения раскладки.';
 
//Добавляет кнопку
function addSwitcherButton(){
    var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar') )
	var textbox = document.getElementById('wpTextbox1')
    if (!toolbar) return
	var i = document.createElement('img')
	i.src = 'https://vignette.wikia.nocookie.net/corprusarium/images/a/a1/Button-switcher.png/revision/latest?cb=20190110094742&path-prefix=ru'
	i.alt = i.title = 'раскладка'
	i.onclick = Elder_Switcher
	i.style.cursor = 'pointer'
	toolbar.appendChild(i)
}

if (wgAction == 'edit' || wgAction == 'submit') {
    addOnloadHook(addSwitcherButton)
}

//Функция для оформления таблицы
function Elder_Switcher(){
 
 //Проверяем, поддерживает ли браузер регулярные выражения (RegExp)	
 if (('code'.replace(/d/g, 'r') != 'core') 
    || (navigator.appName=='Netscape' && navigator.appVersion.substr (0, 1) < 5))
  { alert(Elder_Switcher_CantWork); return }
 
 var txt, hidden = [], hidIdx = 0, wpTextbox1 = document.editform.wpTextbox1
 var winScroll = document.documentElement.scrollTop //remember window scroll
 wpTextbox1.focus()
 
 if (typeof wpTextbox1.selectionStart != 'undefined' 
    && (navigator.productSub > 20031000 || is_safari)) { //Mozilla/Opera/Safari3
 
    var textScroll = wpTextbox1.scrollTop
    var startPos = wpTextbox1.selectionStart
    var endPos = wpTextbox1.selectionEnd
    txt = wpTextbox1.value.substring(startPos, endPos)
    if (txt == '') {alert(Elder_Switcher_FullText); ShowHelp(); return}
    else{
 
      processText()
      wpTextbox1.value = wpTextbox1.value.substring(0, startPos) + txt + wpTextbox1.value.substring(endPos)
    }
    wpTextbox1.selectionStart = startPos
    wpTextbox1.selectionEnd = startPos + txt.length
    wpTextbox1.scrollTop = textScroll
 
 }else if (document.selection && document.selection.createRange) { //IE
    //alert("IE");
 
   var range = document.selection.createRange()
   txt = range.text
   if (txt == '') {alert(Elder_Switcher_FullText); ShowHelp(); return}
   else{
 
     processText()
     range.text = txt
     //if (!window.opera) txt = txt.replace(/\r/g,'')
     if (range.moveStart) range.moveStart('character', - txt.length)
     range.select() 
   }
 
 }else // Для браузеров, которые не умеют возвращать выделенный фрагмент, выдаем ошибку
   { alert(Elder_Switcher_CantWork); return }
 
 document.documentElement.scrollTop = winScroll // scroll back, for IE/Opera
 
//Здесь производим замену в переменной txt - это отразится на выделенном фрагменте текста 
function processText(){
  //txt = txt.replace(/^\s+|\s+$/g, '')  //Обрезаем пробелы слева и справа
  //txt = txt.replace(/\n/g, '\n|-\n| ') //Концы строк
  
  //q-й
  
  txt = txt.replace(/f/g, 'а');
  txt = txt.replace(/,/g, 'б');
  txt = txt.replace(/d/g, 'в');
  txt = txt.replace(/u/g, 'г');
  txt = txt.replace(/l/g, 'д');
  txt = txt.replace(/t/g, 'е');
  txt = txt.replace(/`/g, 'ё');
  txt = txt.replace(/;/g, 'ж');
  txt = txt.replace(/p/g, 'з');
  txt = txt.replace(/b/g, 'и');
  txt = txt.replace(/q/g, 'й');
  txt = txt.replace(/r/g, 'к');
  txt = txt.replace(/k/g, 'л');
  txt = txt.replace(/v/g, 'м');
  txt = txt.replace(/y/g, 'н');
  txt = txt.replace(/j/g, 'о');
  txt = txt.replace(/g/g, 'п');
  txt = txt.replace(/h/g, 'р');
  txt = txt.replace(/c/g, 'с');
  txt = txt.replace(/n/g, 'т');
  txt = txt.replace(/e/g, 'у');
  txt = txt.replace(/a/g, 'ф');
  txt = txt.replace(/\[/g, 'х');
  txt = txt.replace(/w/g, 'ц');
  txt = txt.replace(/x/g, 'ч');
  txt = txt.replace(/i/g, 'ш');
  txt = txt.replace(/o/g, 'щ');
  txt = txt.replace(/]/g, 'ъ');
  txt = txt.replace(/s/g, 'ы');
  txt = txt.replace(/m/g, 'ь');
  txt = txt.replace(/'/g, 'э');
  txt = txt.replace(/\./g, 'ю');
  txt = txt.replace(/z/g, 'я');

  txt = txt.replace(/F/g, 'А');
  txt = txt.replace(/</g, 'Б');
  txt = txt.replace(/D/g, 'В');
  txt = txt.replace(/U/g, 'Г');
  txt = txt.replace(/L/g, 'Д');
  txt = txt.replace(/T/g, 'Е');
  txt = txt.replace(/~/g, 'Ё');
  txt = txt.replace(/:/g, 'Ж');
  txt = txt.replace(/P/g, 'З');
  txt = txt.replace(/B/g, 'И');
  txt = txt.replace(/Q/g, 'Й');
  txt = txt.replace(/R/g, 'К');
  txt = txt.replace(/K/g, 'Л');
  txt = txt.replace(/V/g, 'М');
  txt = txt.replace(/Y/g, 'Н');
  txt = txt.replace(/J/g, 'О');
  txt = txt.replace(/G/g, 'П');
  txt = txt.replace(/H/g, 'Р');
  txt = txt.replace(/C/g, 'С');
  txt = txt.replace(/N/g, 'Т');
  txt = txt.replace(/E/g, 'У');
  txt = txt.replace(/A/g, 'Ф');
  txt = txt.replace(/\{/g, 'Х');
  txt = txt.replace(/W/g, 'Ц');
  txt = txt.replace(/X/g, 'Ч');
  txt = txt.replace(/I/g, 'Ш');
  txt = txt.replace(/O/g, 'Щ');
  txt = txt.replace(/\}/g, 'Ъ');
  txt = txt.replace(/S/g, 'Ы');
  txt = txt.replace(/M/g, 'Ь');
  txt = txt.replace(/"/g, 'Э');
  txt = txt.replace(/>/g, 'Ю');
  txt = txt.replace(/Z/g, 'Я');
  txt = txt.replace(/\//g, '.');
  txt = txt.replace(/\?/g, ',');
  txt = txt.replace(/\^/g, ':');
  txt = txt.replace(/\$/g, ';');
  
    }	
}