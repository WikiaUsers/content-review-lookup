document.write('<script type="text/javascript" src="/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript"><\/script>')


//Toolbar buttons

function StandardButtons(){
 if (mwEditButtons.length < 6) return
 mwEditButtons[0].imageFile = 'http://upload.wikimedia.org/wikipedia/ru/9/9a/Button_boldru.png'
 mwEditButtons[1].imageFile = 'http://upload.wikimedia.org/wikipedia/ru/8/88/Button_italicru.png'
 mwEditButtons[2].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/0/03/Button_internal_link_ukr.png'
 mwEditButtons[5].tagClose = '|thumb]]'
} 


function CustomButtons(){
 addCustomButton('http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png', 'Перенаправление','#REDIRECT [[',']]','название страницы')
 addCustomButton('http://upload.wikimedia.org/wikisource/ru/a/a6/Button-cat.png','Категория','[[Категория:',']]\n','')
 addCustomButton('http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png', 'Комментарий', '<!-- ', ' -->', 'Комментарий')
 addCustomButton('http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png', 'Развёрнутая цитата', '<blockquote>\n', '\n</blockquote>', 'Развёрнутая цитата одним абзацем')
 addCustomButton('http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png',
 'Вставить таблицу', '{| class="wikitable"\n|-\n', '\n|}', '! заголовок 1\n! заголовок 2\n! заголовок 3\n|-\n| строка 1, ячейка 1\n| строка 1, ячейка 2\n| строка 1, ячейка 3\n|-\n| строка 2, ячейка 1\n| строка 2, ячейка 2\n| строка 2, ячейка 3')
}

function addCustomButton(img, tip, open, close, sample){
 mwCustomEditButtons[mwCustomEditButtons.length] =
  {'imageFile':img, 'speedTip':tip, 'tagOpen':open, 'tagClose':close, 'sampleText':sample}
}


function WikifButton(){
 var t = document.getElementById('wpTextbox1')
 if (!t || (!document.selection && t.selectionStart == null)) return
 addFuncButton('http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png', 'Викификатор', Wikify)
}

function addFuncButton(img, tip, func){
 var toolbar = document.getElementById('toolbar')
 if (!toolbar) return
 var i = document.createElement('img')
 i.src = img
 i.alt = tip;  i.title = tip
 i.onclick = func
 i.style.cursor = 'pointer'
 toolbar.appendChild(i)
}


//Edit Summary buttons 

function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling)
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