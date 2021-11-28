function sysopDeletePage(){
 var msgDiv, oldValue, curValue, opt, quoteRegExp = /^\/\*(.*)\*\//
 var hiddenGroups = [], hiddenGroupsNames = '', btnUnhide

 var select = document.getElementById('wpDeleteReasonList')
 var reason = document.getElementById('wpReason')
 if (!select || !reason) return
 groups = select.getElementsByTagName('optgroup')

 //simplify list
 for (var i=1; i<select.length; i++){
   opt = select.options[i]
   opt.title = opt.value
   opt.text = opt.value.replace(/\[\[[^|]+\|([^\]]+)\]\]/,'$1')
 }

 if (wgNamespaceNumber == 6) return //file delete page, nothing else to do

 if (!window.opera) hideGroups()

 if (window.delPageExpandSelect) {
   expandSelect()
   select.form.scrollIntoView()
 } 

 guessReasonFromTemplate()

 addHandler(select, 'change', onReasonChange)

 //add "info" link
 var p = select.form.nextSibling
 if (p && p.className && p.className=='mw-delete-editreasons')
   p.innerHTML = '<a href="' + wgArticlePath.replace('$1', 'MediaWiki_talk:Sysop.js') + '">Про скрипт</a> | ' + p.innerHTML
 
 return



// *** FUNCTIONS ***

//remove groups that are not applicable; doesn't work in Opera
 function hideGroups(){
   if (wgNamespaceNumber!=0) hideGroup ('Статьи')
   if (wgNamespaceNumber!=2 && wgNamespaceNumber!=3) hideGroup ('Личные страницы')
   if (wgNamespaceNumber==14) hideGroup ('Перенаправления');  else hideGroup ('Категории')
   //create button to return removed groups
   if (!hiddenGroupsNames) return
   btnUnhide = document.createElement('input')
   btnUnhide.type = 'button';  btnUnhide.value = '*'; btnUnhide.onclick = unHideGroups
   btnUnhide.title = 'вернуть спрятанные группы ' + hiddenGroupsNames  
   btnUnhide.style.cssText = 'margin-left:10px; background:inherit; height:1.2em'
   //if (!delPageExpandSelect)    select.parentNode.insertBefore(btnUnhide, select)
   select.parentNode.insertBefore(btnUnhide, select.nextSibling)
 }
 function hideGroup(name){
  for (var i=0; i<groups.length; i++)  if (groups[i].label == name) break
  if (i==groups.length) return
  hiddenGroups.push( [ groups[i].nextSibling, select.removeChild(groups[i]) ] ) 
  hiddenGroupsNames += (hiddenGroupsNames? ', ':'') + '«'+name+'»'
  //groups[i].style.display = 'none' // doesn't work in IE
 }
 function unHideGroups(){
   for (var i=hiddenGroups.length-1; i>=0; i--)
      select.insertBefore(hiddenGroups[i][1], hiddenGroups[i][0])
   btnUnhide.style.display = 'none'
   expandSelect()
 }


function guessReasonFromTemplate(){ //try to guess reason from the db- template in quote
 var delTemplates = {
 'О1': 'бессвязно|nonsense|абсурд|nocontext',
 'О2': 'тест|test',
 'О3': 'ванд|vand|вандал|vandal',
 'О4': 'повторно|repost',
 'О5': 'автор|author',
 'О6': 'обсужд|talk',
 'О7': 'переим|move|переименование|rename',
 'О8': 'дубль|fork',
 'С1': 'пусто|empty',
 'С2': 'иностр|foreign',
 'С3': 'ссылки|nocontent',
 'С4': 'оскорбление|attack',
 'С5': 'нз|nn|незначимо',
 'С6': 'copyvio|копивио',
 'П1': 'в никуда|redirect|redirnone',
 'П2': 'межпространственный|redirspace',
 'П3': 'опечатка|ошибка|redirtypo',
 'П4': 'падеж|redirflect',
 'П5': 'смысл|redirsense',
 'К1': 'пусткат|catempty',
 'У1': 'владелец|owner|self|user',
 'У2': 'anon|анон',
 'У3': 'несущ|nouser'
}
 var ma
 if (ma=reason.value.match(/\{\{\s*(db|уд)-?([\wа-яА-Я\s]+).*\}\}/i)){
   var dbReason = '|' + ma[2].toLowerCase()
   for (var name in delTemplates)
     if (('|'+delTemplates[name]).indexOf(dbReason) != -1){
        if (setSelect(name))
          dispMsg('Автоматически выбран '+name+' согласно шаблону «' + ma[1]+'-'+ma[2]+'»', '#F4FFF4')
        break
     }
 }else if (ma=reason.value.match(/\{\{К удалению *\| *([^\}]+) *\}\}/i)){
    setReason('по результатам обсуждения на \[\[ПолитВикия:К удалению/'+ma[1]+'#'+wgPageName.replace(/_/g, ' ')+']]')
    dispMsg('Автоматически вставлена ссылка на ПолитВикия:КУ', '#F4FFF4')
    delPageExpandSelect = false
 }else if (ma=reason.value.match(/#REDIRECT ?\[\[([^\]]+:)/i)){
   var ma2 = wgPageName.match(/.+:/)
   if (ma2 && ma[1]!=ma2[0])
     if (setSelect('П2'))
        dispMsg('Автоматически выбран П2', '#F4FFF4')
 }
}


function dispMsg(msg, color){
 if (!msgDiv){ //create DIV for messages
   msgDiv = document.createElement('div')
   msgDiv.style.cssText = 'padding:0 3px 0 3px; border:1px dotted gray; line-height:1.2em; margin-left:20px; float:right; display:none'
   var el = document.getElementById('wpConfirmB')
   if (el) el.parentNode.insertBefore(msgDiv, el)
   else select.form.appendChild(msgDiv)
 } 
 if (msg) {
   msgDiv.innerHTML = msg
   msgDiv.style.display = ''
   msgDiv.style.backgroundColor = color || ''
 }else msgDiv.style.display = 'none'
}


function onReasonChange(){
 select.style.backgroundColor = select.selectedIndex==0 ? '#F5F5F5' : ''
if (/(#О3|#С4|оскорблен|вандализм)/.test(select.value)){ //then remove quote
  if (oldValue) return //user selected one vand criteria after another
  var newV = reason.value
  if (/^\/\*#(redi|пере)/i.test(newV)) newV=newV.replace(/\(автор.*\]\)/, '')
  newV = newV.replace(quoteRegExp,'')
  if (setReason(newV))  dispMsg('Автоматически убрана цитата', '#FFF5F5')
}else if (oldValue && reason.value==curValue){ //return quote back
  setReason(oldValue, true)
  dispMsg()
}else
  dispMsg()
}





function expandSelect(){ //not for Opera (sometimes works in 9.27 though)
 if (!window.delPageExpandSelect) return
 var count = 1
 for (var i=0; i<groups.length; i++)
	 if (groups[i].style.display != 'none') 
		 count += groups[i].getElementsByTagName('option').length + 1
 select.size = count
}


function setSelect(name){
 for (var i=0; i<select.options.length; i++)
    if (select.options[i].value.indexOf('#'+name+'|') != -1 ){
        //messageStays = true
        select.selectedIndex = i
        onReasonChange()
        return true
    }
 return false
}

function setReason(val, forgetOld){
 if (val == reason.value) return false 
 oldValue = reason.value
 curValue = val
 reason.value = curValue
 if (reason.onupdate) reason.onupdate() //for compatibility with "summary preview" script
 if (forgetOld) oldValue = ''
 return true
}  


} //sysopDeletePage



//avoid [move=autoconfirmed] in protection logs
function sysopProtectPage(){
 var inp = document.getElementById('mwProtect-level-edit') 
 if (inp) addHandler(inp, 'change', noMoveAutoconfirmedProtection)
 function noMoveAutoconfirmedProtection(){
   var inp = document.getElementById('mwProtectUnchained')
   if (!inp || inp.checked) return
   inp = document.getElementById('mwProtect-level-move')
   if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
 }
}



function addContentSubLink(url, name){
 var cSub = document.getElementById('contentSub')
 if (!cSub) return
 if (cSub.lastChild.nodeName == 'A') cSub.appendChild(document.createTextNode(' · '))
 var aa=document.createElement('a')
 aa.href=url
 aa.appendChild(document.createTextNode(name))
 cSub.appendChild(document.createTextNode(' '))
 cSub.appendChild(aa)
}

function sysopStart(){
 switch (wgAction){
  case 'delete': sysopDeletePage(); break
  case 'protect': case 'unprotect': sysopProtectPage(); break
  case 'history': switch (wgNamespaceNumber){ case 0: case 6: case 10: case 14: //stabilization link
	addContentSubLink(wgArticlePath.replace('$1', 'Special:Stabilization/'
    +encodeURIComponent(wgPageName)), 'Настройки стабилизации')
  }	 
 }
}


addOnloadHook(sysopStart)