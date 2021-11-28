importScript('MediaWiki:Wikificator.js')


//Toolbar buttons

function StandardButtons(){
 if (mwEditButtons.length < 6) return
 mwEditButtons[5].tagClose = '|thumb]]'
} 


function CustomButtons(){
 addCustomButton('http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png', 'Перенаправление','#REDIRECT [[',']]','название страницы')
 addCustomButton('http://upload.wikimedia.org/wikisource/ru/a/a6/Button-cat.png','Категория','[\[Категория:',']]\n','')
 addCustomButton('http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png', 'Комментарий', '<!-- ', ' -->', 'Комментарий')
 addCustomButton('http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png', 'Развёрнутая цитата', '<blockquote>\n', '\n</blockquote>', 'Развёрнутая цитата одним абзацем')
 addCustomButton('http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png',
 'Вставить таблицу', '{| class="wikitable"\n|', '\n|}', '-\n! заголовок 1\n! заголовок 2\n! заголовок 3\n|-\n| строка 1, ячейка 1\n| строка 1, ячейка 2\n| строка 1, ячейка 3\n|-\n| строка 2, ячейка 1\n| строка 2, ячейка 2\n| строка 2, ячейка 3')
 addCustomButton('http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png','Сноска','<ref>','</ref>','')
 addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png',
 'Вставить ассоциацию', '{{Ассоциации | catinfo =  [[|]] \n', '\n}}', '| a1 =  [[:Категория: |  ]] \n| a2 =  [[:Категория: |  ]]')
}



function addCustomButton(img, tip, open, close, sample){
 mwCustomEditButtons[mwCustomEditButtons.length] =
  {'imageFile':img, 'speedTip':tip, 'tagOpen':open, 'tagClose':close, 'sampleText':sample}
}


function addFuncButton(img, tip, func){
 var toolbar = document.getElementById('toolbar')
 if (!toolbar) return
 var i=document.createElement('img')
 i.src=img; i.alt=tip;  i.title=tip; i.onclick=func; i.style.cursor='pointer'
 toolbar.appendChild(i)
}
 
if (window.mwEditButtons){
 
 var u = 'http://upload.wikimedia.org/wikipedia/'
 addCustomButton(u+'ru/1/1d/Button_redirect_rus.png', 'Перенаправление','#REDIRECT [[',']]','название страницы')
 addCustomButton(u+'commons/3/3c/Button_cat_ru.png','Категория','[\[Категория:',']]\n','')
 addCustomButton(u+'en/3/34/Button_hide_comment.png', 'Комментарий', '<!-- ', ' -->', 'Комментарий')
 addCustomButton(u+'en/f/fd/Button_blockquote.png', 'Развёрнутая цитата', '<blockquote>\n', '\n</blockquote>', 'Развёрнутая цитата одним абзацем')
 addCustomButton(u+'en/6/60/Button_insert_table.png',
 'Вставить таблицу', '{| class="wikitable"\n|', '\n|}', '-\n! заголовок 1\n! заголовок 2\n! заголовок 3\n|-\n| строка 1, ячейка 1\n| строка 1, ячейка 2\n| строка 1, ячейка 3\n|-\n| строка 2, ячейка 1\n| строка 2, ячейка 2\n| строка 2, ячейка 3')
 addCustomButton(u+'commons/7/79/Button_reflink.png','Сноска','<ref>','</ref>','')
 
 addOnloadHook(function(){ 
   if (mwEditButtons.length >= 6) mwEditButtons[5].tagClose = '|thumb]]'
 }) 
 
} 


function WikifButton(){
 var t = document.getElementById('wpTextbox1')
 if (!t || (!document.selection && t.selectionStart == null)) return
 addFuncButton('http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png', 'Викификатор', Wikify)
}

//Edit Summary buttons 

function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling)
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling)
 addSumButton('викиф.', 'викификация', 'Произведена викификация')
 addSumButton('оформл.', 'оформление', 'Улучшено оформление')
 addSumButton('стиль', 'стилевые правки', 'Поправлен стиль изложения')
 addSumButton('орфогр.', 'орфография', 'Поправлена орфография')
 addSumButton('пункт.', 'пунктуация', 'Изменена пунктуация')
 addSumButton('интервики', 'интервики', 'Исправлены межъязыковые ссылки (интервики)')
 addSumButton('кат.', 'категория', 'Исправлена категоризация')
 addSumButton('шаб.', 'шаблон', 'Добавлен / изменён шаблон')
 addSumButton('к удал.', 'к удалению', 'Страница предложена к удалению')
 addSumButton('доп.', 'дополнение', 'Добавлены новые сведения')
 addSumButton('иллюстрация', 'иллюстрация', 'Размещена иллюстрация')
 addSumButton('обнов.', 'обновление данных', 'Обновлены устаревшие данные')
}

function addSumButton(name, text, title) {
 var btn = document.createElement('a')
 btn.appendChild(document.createTextNode(name))
 btn.title = title
 btn.onclick = function(){insertSummary(text)}
 wpSummaryBtn.appendChild(btn)
}

function insertSummary(text) {
 var wpSummary = document.getElementById('wpSummary')
 if (wpSummary.value.indexOf(text) != -1) return 
 if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ','
 if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' '
 wpSummary.value += text
}


//call functions
addOnloadHook(StandardButtons)
addOnloadHook(CustomButtons)
addOnloadHook(WikifButton)
addOnloadHook(SummaryButtons)


//sig reminder
if (wgNamespaceNumber % 2 || wgNamespaceNumber==4)
addOnloadHook(function (){
 var cp = document.getElementById('editpage-copywarn')
 var wpSave = document.getElementById('wpSave')
 if (!cp || !wpSave) return
 if (wgNamespaceNumber == 4 && 
  (!wgTitle.match('^(Форум[/ ]|Голосования/|Опросы/|Обсуждение правил/|Заявки на .*/|Запросы.|Кандидаты в .*/|К (удалению|объединению|переименованию|разделению|улучшению)/|Проверка участников/)') || wgTitle.match ('/Архив'))) return
 var ins = ' <a href=\'javascript:insertTags(" ~~\~~\","","")\'>~~\~~</a>'
 cp.innerHTML = 'Не забудьте добавить к вашему сообщению подпись с помощью' + ins
 cp.style.padding = '2px'
 cp.style.background = '#F7F7F7'
 cp.style.border = '1px solid gray'
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