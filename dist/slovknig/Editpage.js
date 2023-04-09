importScript('MediaWiki:Wikificator.js')


//Toolbar buttons

function StandardButtons(){
 if (mwEditButtons.length < 6) return
 mwEditButtons[5].tagClose = '|thumb]]'
} 


function CustomButtons(){
 addCustomButton('http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect.png', 'Перенаправление','#REDIRECT [[',']]','page')
 addCustomButton('http://upload.wikimedia.org/wikisource/ru/a/a6/Button-cat.png','Category','[\[Category:',']]\n','')
 addFuncButton('https://images.wikia.nocookie.net/slovknig/images/d/d1/Button-wikifikator.png', 'Викификатор', function(){Wikify()})
 addFuncButtonNew('http://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Wikify_button.svg/22px-Wikify_button.svg.png', 'Викификатор', function(){Wikify()})
}

function addCustomButton(img, tip, open, close, sample){
 mwCustomEditButtons[mwCustomEditButtons.length] =
  {'imageFile':img, 'speedTip':tip, 'tagOpen':open, 'tagClose':close, 'sampleText':sample}
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
function addFuncButtonNew(img, tip, func){ // via putnik
 var toolbar = document.getElementById('edittoolbar')
 if (!toolbar) return
 var div = document.createElement('div')
 div.className='group first'
 var i = document.createElement('input')
 i.className='tool'
 i.type='image'
 i.src = img
 i.alt = tip;  i.title = tip
 i.onclick = func
 div.appendChild(i)
 toolbar.appendChild(div)
}

//call functions
addOnloadHook(StandardButtons)
addOnloadHook(CustomButtons)
addOnloadHook(SummaryButtons)