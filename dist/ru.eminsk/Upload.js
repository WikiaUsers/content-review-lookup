function uploadPage(){
 if (window.wgUploadAutoFill){
  upForm = document.getElementById('mw-upload-form')
  upForm.onsubmit = checkUpForm
 }
 var desc = document.getElementById('wpUploadDescription')
 var tmpl = document.getElementById('imageinfo')
 if (wgUploadAutoFill && tmpl && desc && !desc.value) desc.value = tmpl.innerHTML
 appendCSS('a.insertlink { text-decoration: none; }')
 var span = document.getElementById('insertlink-free')
 if (!!span) {
  var a = document.createElement('a')
  a.href = 'javascript:addInfoTemplate("rationale", "imageinfo", 8)'
  a.class = 'insertlink'
  span.parentNode.insertBefore(a, span)
  a.appendChild(span)
 }
 var span = document.getElementById('insertlink-unfree')
 if (!!span) {
  var a = document.createElement('a')
  a.href = 'javascript:addInfoTemplate("imageinfo", "rationale", 16)'
  a.class = 'insertlink'
  span.parentNode.insertBefore(a, span)
  a.appendChild(span)
 }
 var c = document.getElementById('commons-link')
 var c_a = c.lastChild
 c.innerHTML = '<input class="commons-btn" type="button" onclick="window.location.href=\''+c_a.href+'\'" value="'+c_a.text+'"/>'
}
function addInfoTemplate(oldId, newId, rows){
 var desc = document.getElementById('wpUploadDescription')
 var oldTmpl = document.getElementById(oldId)
 var tmpl = document.getElementById(newId)
 if (desc && oldTmpl && desc.value == oldTmpl.innerHTML){
   desc.value = tmpl.innerHTML
   desc.rows = rows
 }
 else if (desc && tmpl && desc.value.indexOf(tmpl.innerHTML.substring(0,8)) == -1){
   desc.value += '\n' + tmpl.innerHTML
   desc.rows = 20
 }
 licList = document.getElementsByTagName('option', document.getElementById('wpLicense'))
 if (newId == 'rationale'){
   licList[licList.length-1].selected='selected'
 }
 else {
   licList[0].selected='selected'
 }
}
function checkUpForm(){
 upForm = document.getElementById('mw-upload-form')
 var desc = document.getElementById('wpUploadDescription')
 var lcns = document.getElementById('wpLicense')
 var wrn = document.createElement('div')
 wrn.innerHTML = ''
 if (lcns.value != '' && /\{\{(fair ?use ?in|ОДИ|Обоснование добросовестного использования)/i.exec(desc.value))
  wrn.innerHTML += '<li>Вы используете устаревшую схему описания несвободных файлов. Пожалуйста, прочтите инструкцию выше.</li>'
 if (lcns.value == '' && /^[^\{\}]*(\{\{(Изображение|Несвободный файл)[^\{\}]+\}\}[^\{\}]*)*$/i.exec(desc.value))
  wrn.innerHTML += '<li>Не указана лицензия. Выберите лицензию в выпадающем списке выше.</li>'
 if (lcns.value != '' && lcns.value != 'subst:ET' && /\{\{Несвободный файл/i.exec(desc.value))
  wrn.innerHTML += '<li>Для несвободного файла выбрана лицензия в выпадающем списке. Возможно, вы где-то ошиблись.</li>'
 if (lcns.value == '' && /\{\{Изображение\s*((\|\s*)+[\s\wа-яё]+=\s*)*(\|\s*)*\}\}/i.exec(desc.value))
  wrn.innerHTML += '<li>Не заполнен шаблон {'+'{Изображение}}.</li>'
 if (lcns.value == '' && /\{\{Несвободный файл\s*((\|\s*)+([\wа-яё]+\s*)+=\s*)*(\|\s*)*\}\}/i.exec(desc.value))
  wrn.innerHTML += '<li>Не заполнен шаблон {'+'{Несвободный файл}}.</li>'
 if (lcns.value == '' && /\{\{Несвободный файл\/ОДИ\s*((\|\s*)+([\wа-яё]+\s*)+=\s*)*(\|\s*)*\}\}/i.exec(desc.value))
  wrn.innerHTML += '<li>Не заполнен шаблон {'+'{Несвободный файл/ОДИ}}.</li>'
 if (/\{\{(Несвободный файл|Изображение)[^\{\}]*Источник\s*=\s*(из|с|http:\/\/(www\.)?)?\s*(интернет|internet|гугл|google|яндекс|yandex|яху|yahoo|рамблер|rambler)[^\{\}]*\}\}/i.test(desc.value))
  wrn.innerHTML += '<li>«Интернет» или поисковая система не являются источником, подтверждающим лицензионный статус изображения. Укажите более конкретный источник.</li>'
 if (wrn.innerHTML != ''){
  wrn.innerHTML = '<p style="text-align:center; font-weight:bold;">Автоматическая проверка выявила следующие ошибки:</p><ul style="font-weight:bold">' + wrn.innerHTML
  wrn.innerHTML += '</ul><p style="padding:0.2em 0.8em">При повторном нажатии на кнопку «Загрузить файл» данное предупреждение будет проигнорировано. Помните, что файлы без лицензии или с некорректной лицензией будут удалены. Если у вас возникли проблемы или вопросы, обращайтесь на <a href="http://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%8F:%D0%A4%D0%BE%D1%80%D1%83%D0%BC/%D0%90%D0%B2%D1%82%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B5_%D0%BF%D1%80%D0%B0%D0%B2%D0%BE">форум по авторскому праву</a>.</p>'
  var oldWrn = document.getElementById('jsUploadWarnings')
  if (oldWrn) {
   return true
  }
  else {
   wrn.style.border = '1px solid red'
   wrn.style.background = '#ffe4e1'
   wrn.id = 'jsUploadWarnings'
   upNode = document.getElementById('mw-htmlform-options').parentNode
   upNode.parentNode.insertBefore(wrn, upNode)
  }
  return false
 }
 else {
  return true
 }
}


/* Hide quick insert */
function uploadHideInsert(){
 qIns = document.getElementById('editpage-specialchars')
 qInsCover = document.createElement('div')
 qInsCover.setAttribute('style', qIns.style.cssText)
 if (typeof(qInsCover.style.setAttribute) == 'function') qInsCover.style.setAttribute('style', qIns.style.cssText) // IE
 qInsCover.innerHTML = '<small><span style="border-bottom:1px dotted gray; cursor:help" title="Позволяет быстро вставлять символы разметки в поле описания">Быстрая вставка</span> (<a href="javascript:uploadExpandInsert()">раскрыть блок</a>)</small>'
 qIns.style.display = 'none'
 qIns.parentNode.appendChild(qInsCover)
}

function uploadExpandInsert(){
 qInsCover.style.display = 'none'
 qIns.style.display = 'block'
}


/* Ajax Preview */
function uploadPreviewRun(){
 wpUploadPreview.innerHTML = ''
 injectSpinner(wpUploadPreview,'preview')
 var aj = sajax_init_object()
 aj.onreadystatechange = function(){
  if (aj.readyState!=4 || aj.status!=200) return
  removeSpinner('preview')
  wpUploadPreview.innerHTML = eval('('+aj.responseText+')')['parse']['text']['*']
  wpUploadPreview.scrollIntoView()
 }
 aj.open('GET', '/w/api.php?action=parse&prop=text&pst&format=json&text=' 
  + encodeURIComponent(wpUploadText.value), true)
 aj.send('')
}

function uploadPreviewInit(){
 wpUploadText = document.getElementById('wpUploadDescription')
 if (!wpUploadText) return
 var bt = create('input','wpDestFile'); bt.type='button'
 bt.style.cssFloat = bt.style.styleFloat = 'right'
 bt.value = 'Предпросмотр'; bt.onclick = uploadPreviewRun
 wpUploadPreview = create('div','wpLicense')
 function create(type, attachTo){
  var el = document.createElement(type)
  attachTo = document.getElementById(attachTo) || wpUploadText
  attachTo.parentNode.appendChild(el)
  return el
 } 
}


addOnloadHook(uploadPage)
addOnloadHook(uploadHideInsert)
addOnloadHook(uploadPreviewInit)