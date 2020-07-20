importMW('Wikificator')

function wgImg(img){
 return /^http:/i.test(img) ? img : 'http://upload.wikimedia.org/wikipedia/'+img 
} 

mwCustomEditButtons['wikif']  = [function(){Wikify()}, 'commons/0/06/Wikify-toolbutton.png', 'Викификатор — автоматический обработчик текста']


var _cnt
if ($j.wikiEditor){
 appendCSS('#local-toolbar {height:26px; border-right:1px solid #ddd;\
  margin:3px; padding-right:6px} #local-toolbar img {padding:2px}')
  _cnt = '#wikiEditor-ui-toolbar'
}else if (document.getElementById('toolbar')){
  _cnt = '#toolbar'
  importMW('ToolbarOld')
}else{ //no toolbar
  _cnt = '#editform'
  appendCSS('#local-toolbar img {border:1px outset gray; background:#ddd; margin:2px; height:22px}')
}

addOnloadHook(function(){
 //attach local toolbar 
 $j('<div id=local-toolbar style="float:left" />')
 .prependTo(_cnt)
 //attach local buttons
 for (var id in mwCustomEditButtons){
   var b = mwCustomEditButtons[id]
   if (!b.length) continue
     attachFuncBtn(id, b[0], b[1], b[2])
 }  
})


function attachFuncBtn(id, func, img, tip){
 $j('<img id="'+id+'" src="'+wgImg(img)+'" style="cursor:pointer" '
     +'title="'+tip+'" alt="'+tip.substr(0,3)+'" />')
  .appendTo('#local-toolbar')
  .click(func)
}

function addFuncBtn(id, func, img, tip){
 if (document.getElementById('local-toolbar'))
   attachFuncBtn(id, func, img, tip)
 else   
   mwCustomEditButtons[id] = [func, img, tip]
}


//Summary buttons 
function addSumButton(name, text) {
 $j('<a title="'+text+'">'+name+'</a>').click(insertSummary).appendTo(wpSummaryButtons)
}
function insertSummary() {
 var text = this.title, sum = $j('#wpSummary'), vv = sum.val()
 if (vv.indexOf(text) != -1) return 
 if (/[^,; \/]$/.test(vv)) vv += ','
 if (/[^ ]$/.test(vv)) vv += ' '
 sum.val(vv + text)
}
addOnloadHook(function (){
 var sum = document.getElementById('wpSummary')
 if (!sum || (sum.form.wpSection && sum.form.wpSection.value == 'new')) return
 appendCSS('\
 #userSummaryButtonsA a {background:#cef; border:1px solid #adf; padding:0 2px; margin:0 2px;\
  cursor:pointer; font-size:80%; color:#666}\
 #userSummaryButtonsA a:hover {background:#bdf; color:black; text-decoration:none}')
 wpSummaryButtons = $j('<div id=userSummaryButtonsA />').insertAfter(sum) //global var
 var ss = ['викиф.икация', 'оформл.ение', 'стил.евые правки', 'орфогр.афия', 'пункт.уация', 
 'интервики', 'кат.егория', 'шаб.лон', 'иллюстрация', 'доп.олнение', 'обнов.ление данных']
 for (var i=0; i<ss.length; i++)
   addSumButton(ss[i].replace(/\..*/,''), ss[i].replace(/\./,''))
})


//sig reminder
if (wgNamespaceNumber % 2 || wgNamespaceNumber==4)
addOnloadHook(function (){
 var cp = document.getElementById('editpage-copywarn')
 var wpSave = document.getElementById('wpSave')
 if (!cp || !wpSave) return
 if (wgNamespaceNumber == 4 && 
  (!wgTitle.match('^(Форум[/ ]|Голосования/|Опросы/|Обсуждение правил/|Заявки на .*|Запросы.|Кандидаты в .*/|К (удалению|объединению|переименованию|разделению|улучшению)/|Рецензирование/|Проверка участников/|Проект:Инкубатор/(Мини-рецензирование|Стабы|Форум[/ ])|Проект:Работа для бота)') || wgTitle.match ('/Архив'))) return
 var ins = ' <a href=\'javascript:insertTags(" ~~\~~\","","")\'>~~\~~</a>'
 cp.innerHTML += '&nbsp;&nbsp;Не забудьте добавить к вашему сообщению подпись с помощью' + ins
 if (wgUserGroups && wgUserGroups.join().indexOf('autoconfirmed') != -1 && !window.sigWarning) return
 //unreg/new users only
 var warningDone = false
 wpSave.onclick = function(){
   try{   
    if (warningDone || document.editform.wpTextbox1.value.indexOf('~~\~~') >= 0 ) return true
    warningDone = true
    cp.innerHTML = 'Пожалуйста, <b>подпишитесь</b>, добавив  в конце своего сообщения' + ins
    + ' (<a href="' + wgArticlePath.replace(/\$1/, 'Википедия:Подписывайтесь')
    + '" title="(ссылка откроется в новом окне)" target=_blank>подробнее&nbsp;↗</a>)'//→ ↗
    cp.style.background = '#FFD080'
    cp.style.border = '1px solid orange'
    return false
   }catch(e) {return true}
 }
})


if (wgAction=='edit' && / rv:1\.[0-8].+Gecko/.test(navigator.userAgent))
  importMW('Firefox2')