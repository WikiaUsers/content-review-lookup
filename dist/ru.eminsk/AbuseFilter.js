afTBoxMaxHeight = 350 //px
appendCSS('tr.mw-abusefilter-list-disabled td.TablePager_col_af_public_comments * {opacity:0.5}')

function resizeTextBoxes(){
 fix('wpFilterRules')
 fix('wpFilterNotes')
 fix('wpTestFilter')
 return
function fix(id){
 var t = document.getElementById(id)
 if (!t) return
 addHandler(t, 'keyup', onKeyUp)
 resize(t)
}
function onKeyUp(e){
 e = e || window.event
 var t = e.target || e.srcElement
 resize(t)
}
function resize(t){ 
 var adjHeight = t.clientHeight
 if (adjHeight > afTBoxMaxHeight) return
 adjHeight = Math.max(t.scrollHeight, adjHeight)
 adjHeight = Math.min(afTBoxMaxHeight, adjHeight)
 if (adjHeight > t.clientHeight) t.style.height = adjHeight+'px'
}
}

function improveSelectBox(){
   var sel = document.getElementById('wpFilterBuilder'), opt, key
   if (!sel) return
   for (var i=1; i<sel.length; i++){
     opt = sel.options[i]
     key = opt.value.match(/^[a-z_]+/)
     if (!key) continue
     key = key[0]
     if (opt.text.indexOf(key)==-1)
       opt.text = opt.text + ' ('+key+')'
       //opt.text = key + ': '+  opt.text
     if (opt.title == '') opt.title = opt.value
  }
} 


addOnloadHook(resizeTextBoxes)
addOnloadHook(improveSelectBox)
if (/\/examine\//.test(document.URL)) importScript('MediaWiki:AbuseLog')