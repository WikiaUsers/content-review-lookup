//dynamically load Commons-style Edittools
function createEdittoolsLink(){
 //get div.mw-editTools
 var box = document.getElementById('wpTextbox1')
 while (box && box.className!='mw-editTools') box=box.nextSibling
 if (!box) return
 //create a link
 var lnk = document.createElement('a')
 lnk.href =  'javascript:loadCommonsTools()'
 lnk.title = 'Load Commons-style Edittools' 
 lnk.id = 'loadCommonsEdittoos'
 lnk.appendChild(document.createTextNode('[load edittools]'))
 lnk.style.cssText = 'float:right'
 box.appendChild(lnk)
}
function loadCommonsTools(){
 importScript('MediaWiki:Edittools.js')
 var lnk = document.getElementById('loadCommonsEdittoos')
 if (lnk) lnk.parentNode.removeChild(lnk)
}
if (doneOnloadHook) createEdittoolsLink()
else addOnloadHook(createEdittoolsLink)