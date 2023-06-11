importScript('MediaWiki:Wikificator.js')

function wgImg(img){
 return /^http:/i.test(img) ? img : 'http://upload.wikimedia.org/wikipedia/'+img 
} 

importScript_('MediaWiki:Toolbar'+
 (!window.wgWikiEditorEnabledModules ? 'None' :
  (wgWikiEditorEnabledModules.toolbar ? 'New': 'Old')) +'.js')

 
//Summary buttons 
function SummaryButtons(){
 var sum = document.getElementById('wpSummary')
 if (!sum || (sum.form.wpSection && sum.form.wpSection.value == 'new')) return
 var sp = document.createElement('span'); sp.id = 'userSummaryButtonsA'
 sum.parentNode.insertBefore(sp, sum.nextSibling)
 sum.parentNode.insertBefore(document.createElement('br'), sum.nextSibling)
 addSumButton('викиф.','викификация')
 addSumButton('оформл.','оформление')
 addSumButton('стиль','стилевые правки')
 addSumButton('орфогр.','орфография')
 addSumButton('пункт.','пунктуация')
 addSumButton('интервики','интервики','Исправлены межъязыковые ссылки (интервики)')
 addSumButton('кат.','категория','Исправлена категоризация')
 addSumButton('шаб.','шаблон','Добавлен / изменён шаблон')
 addSumButton('к удал.','к удалению','Страница предложена к удалению')
 addSumButton('доп.','дополнение')
 addSumButton('иллюстрация','иллюстрация')
 addSumButton('обнов.','обновление данных')
}
function addSumButton(name, text, title) {
 var btn = document.createElement('a')
 btn.appendChild(document.createTextNode(name))
 btn.title = title || text
 btn.onclick = function(){insertSummary(text)}
 document.getElementById('userSummaryButtonsA').appendChild(btn)
}
function insertSummary(text) {
 var sum = document.getElementById('wpSummary')
 if (sum.value.indexOf(text) != -1) return 
 if (sum.value.match(/[^,; \/]$/)) sum.value += ','
 if (sum.value.match(/[^ ]$/)) sum.value += ' '
 sum.value += text
}
addOnloadHook(SummaryButtons)


//sig reminder
if (wgNamespaceNumber % 2 || wgNamespaceNumber==4)
addOnloadHook(function (){
 var cp = document.getElementById('editpage-copywarn')
 var wpSave = document.getElementById('wpSave')
 if (!cp || !wpSave) return
 if (wgNamespaceNumber == 4 && 
  (!wgTitle.match('^(Форум[/ ]|Голосования/|Опросы/|Обсуждение правил/|Заявки на .*/|Запросы.|Кандидаты в .*/|К (удалению|объединению|переименованию|разделению|улучшению)/|Рецензирование/|Проверка участников/)') || wgTitle.match ('/Архив'))) return
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
  importScript('MediaWiki:Firefox2.js')