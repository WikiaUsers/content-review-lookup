function addFuncBtn(id, func, img, title){
 var i=document.createElement('img'); 
 i.className='mw-toolbar-custombutton'; i.id=id
 i.onclick=func; i.src=wgImg(img); i.title=title; i.alt=title.substr(0,3)
 tlb_.appendChild(i)
}

addOnloadHook(function(){
 tlb_ = document.getElementById('toolbar')
 if (!tlb_) return
 appendCSS('img.mw-toolbar-custombutton {height:20px; background-color:#bce; border:1px outset #bce; margin-right:1px; cursor:pointer}')
 addFuncBtn('wikif', Wikify, 'commons/3/38/Button_wikify.png', 'Викификатор — автоматический обработчик текста')
 var i, b
 for (i in mwCustomEditButtons){
  b = mwCustomEditButtons[i]
  if (!b.length) continue
  addFuncBtn(i, b[0], b[1], b[2])
 }
})


function addCustomButton(i,t,o,c,s){
 mwEditButtons.push({'imageFile':wgImg(i),'speedTip':t,'tagOpen':o,'tagClose':c, 'sampleText':s})
}
addOnloadHook(function(){
 addCustomButton('ru/1/1d/Button_redirect_rus.png','Перенаправление','#REDIRECT [[',']]','Название целевой страницы')
 addCustomButton('commons/3/3c/Button_cat_ru.png','Категория','[\[Категория:',']]\n','')
 addCustomButton('en/3/34/Button_hide_comment.png','Комментарий', '<!-- ', ' -->', 'Комментарий')
 addCustomButton('en/f/fd/Button_blockquote.png','Развёрнутая цитата', '<blockquote>\n','\n</blockquote>','Развёрнутая цитата одним абзацем')
 addCustomButton('en/6/60/Button_insert_table.png',
 'Вставить таблицу', '{| class="wikitable"\n|', '\n|}', '-\n! заголовок 1\n! заголовок 2\n! заголовок 3\n|-\n| строка 1, ячейка 1\n| строка 1, ячейка 2\n| строка 1, ячейка 3\n|-\n| строка 2, ячейка 1\n| строка 2, ячейка 2\n| строка 2, ячейка 3')
 addCustomButton('commons/7/79/Button_reflink.png','Сноска','<ref\>','</ref>','Вставьте сюда текст сноски')
 if (mwEditButtons.length >= 6) mwEditButtons[5].tagClose = '|thumb]]'
})