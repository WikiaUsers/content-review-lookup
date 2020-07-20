//<source lang=javascript>

//import module
importedScripts = {} 
function importScript(page, lang) {
 page = '?title=' + encodeURIComponent(page.replace(' ','_'))
 if (lang) page = 'http://' + lang + '.wikipedia.org/w/index.php' + page
 else page = wgScript + page
 if (importedScripts[page]) return
 importedScripts[page] = true
 var s = document.createElement('script')
 s.type = 'text/javascript'
 s.src = page + '&action=raw&ctype=text/javascript'
 document.getElementsByTagName('head')[0].appendChild(s)
}


//hasClass, from en.wp
var hasClass = (function (){
 var reCache = {}
 return function (element, className){
   return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className)
  }
})()


function addLoadEvent(f) {addOnloadHook(f)} //for backwards compatibility


//fix for sortable tables: comma as decimal dot
function ts_parseFloat(num){
 if (!num) return 0
 num = parseFloat(num.replace(/\./g, '').replace(/,/, '.'))
 return (isNaN(num) ? 0 : num)
}



//{Link FA} & {Link GA}
function LinkFA(){
 var pLang = document.getElementById('p-lang')
 if (!pLang) return
 var iw = pLang.getElementsByTagName('li')
 for (var i=0; i < iw.length; i++)
   if (document.getElementById(iw[i].className+'-fa')){
     iw[i].className += ' FA'
     iw[i].title = 'Эта статья является избранной в другом языковом разделе'
   }else if (document.getElementById(iw[i].className+'-ga')){
     iw[i].className += ' GA'
     iw[i].title = 'Эта статья является хорошей в другом языковом разделе'
   }
}



//{ICQ}
function icqIcons(){
 var a, spans = document.getElementById('content').getElementsByTagName('span')
 for (var i=0; a = spans[i]; i++)
   if (a.className == 'ICQ') 
     a.style.backgroundImage = "url('http://status.icq.com/online.gif?icq="+a.id+"&img=5&randseed="+Math.floor(Math.random()*10000000)+"')"
}


//{Modifynewsectionlink}
function newSectionLink(){
 var plus = document.getElementById('ca-addsection')
 if (!plus) return
 var custom = document.getElementById('add-custom-section')
 if (!custom) return
 plus.firstChild.setAttribute('href', custom.getElementsByTagName('A')[0].href)
}


//{Неверный заголовок} 
function correctTitle(){
 if (window.disableRealTitle) return
 var toHide = document.getElementById('trestrictions_replace')
 if (!toHide) return
 var newTitle = document.getElementById('trestrictions_correct')
 if (!newTitle) return
 document.getElementsByTagName('h1')[0].innerHTML  = newTitle.innerHTML
 toHide.style.display = 'none'
 document.getElementById('trestrictions_replaced').style.display = 'block'
}


//[edit] zero section
function editZeroSection(){
 var body = document.getElementById('bodyContent')
 if (!body || window.disable_zero_section) return
 var h2s = body.getElementsByTagName('H2')
 var h2 = h2s[0]
 if (!h2) return
 if (h2.parentNode.id == 'toctitle') h2 = h2s[1]
 if (!h2) return
 var span = h2.firstChild
 if (!span || span.className != 'editsection') return
 var zero = span.cloneNode(true)
 body.insertBefore(zero, body.firstChild)
 var a = zero.getElementsByTagName('a')[0]
 if (a.href.indexOf('&section=T') == -1 )  a.title = a.title.replace(/:.*$/,': 0')
 else a.title = 'Править секцию: 0'
 a.setAttribute('href', wgScript + '?title='+wgPageName + '&action=edit&section=0')
}


function mainPage(){
 if (wgArticleId == 4401 || wgArticleId == 23){
  addPortletLink('p-lang', wgArticlePath.replace(/\$1/, '') 
  + 'Википедия:Список_Википедий', 'Полный список', 'interwiki-completelist')
  var nstab = document.getElementById('ca-nstab-main')
  if (nstab && wgUserLanguage == 'ru')
     nstab.firstChild.firstChild.nodeValue = 'Заглавная'
 }
}

//Collapsible Tables and Divs, [[ВП:СБ]]

var autoCollapse = 2
var collapseCaption = 'скрыть'
var expandCaption = 'показать'

function collapsibleTables(){
 var Table, HRow, THs, Header, btn, a, tblIdx = 0, colTables = []
 var allTables = document.getElementsByTagName('table')
 for (var i=0; Table = allTables[i]; i++){
   if (!hasClass(Table, 'collapsible')) continue
   if (!(HRow = Table.rows[0])) continue
   THs = HRow.getElementsByTagName('th') 
   if (THs.length == 0) continue
   Header = THs[THs.length-1] //last TH, not 1st like in en.wp
   Table.id = 'collapsibleTable' + tblIdx
   btn = document.createElement('span')
   btn.style.styleFloat = btn.style.cssFloat = 'right'
   btn.style.fontWeight = 'normal'
   a = document.createElement('a')
   a.id = 'collapseButton' + tblIdx
   a.href = 'javascript:collapseTable(' + tblIdx + ');' 
   a.appendChild(document.createTextNode(collapseCaption))
   btn.appendChild(document.createTextNode('['))
   btn.appendChild(a)
   btn.appendChild(document.createTextNode(']'))
   Header.insertBefore(btn, Header.childNodes[0])
   colTables[tblIdx++] = Table
 }
 for (var i=0; i < tblIdx; i++)
   if ((tblIdx > autoCollapse && hasClass(colTables[i], 'autocollapse')) || hasClass(colTables[i], 'collapsed'))
     collapseTable(i)
}

function collapseTable (idx){
 var Table = document.getElementById('collapsibleTable' + idx)
 var btn = document.getElementById('collapseButton' + idx)
 if (!Table || !btn) return false
 var Rows = Table.rows
 var isShown = (btn.firstChild.data == collapseCaption)
 btn.firstChild.data = isShown ?  expandCaption : collapseCaption
 var disp = isShown ? 'none' : Rows[0].style.display
 for (var i=1; i < Rows.length; i++) 
    Rows[i].style.display = disp
}

var NavigationBarHide = '[' + collapseCaption + ']'
var NavigationBarShow = '[' + expandCaption + ']'
var NavigationBarShowDefault = autoCollapse
 
function collapsibleDivs(){
 var navIdx = 0, colNavs = [], i, NavFrame
 var divs = document.getElementById('content').getElementsByTagName('div')
 for (i=0; NavFrame = divs[i]; i++) {
   if (!hasClass(NavFrame, 'NavFrame')) continue
   NavFrame.id = 'NavFrame' + navIdx
   var a = document.createElement('a')
   a.className = 'NavToggle'
   a.id = 'NavToggle' + navIdx
   a.href = 'javascript:collapseDiv(' + navIdx + ');'
   a.appendChild(document.createTextNode(NavigationBarHide))
   // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
   for (var j=0; j < NavFrame.childNodes.length; j++)
     if (hasClass(NavFrame.childNodes[j], 'NavHead'))
       NavFrame.childNodes[j].appendChild(a)
   colNavs[navIdx++] = NavFrame
 }
 for (i=0; i < navIdx; i++)
  if ((navIdx > NavigationBarShowDefault && !hasClass(colNavs[i], 'expanded')) || hasClass(colNavs[i], 'collapsed'))
     collapseDiv(i)
}

function collapseDiv(idx) {
 var div = document.getElementById('NavFrame' + idx)
 var btn = document.getElementById('NavToggle' + idx)
 if (!div || !btn) return false
 var isShown = (btn.firstChild.data == NavigationBarHide)
 btn.firstChild.data = isShown ? NavigationBarShow : NavigationBarHide 
 var disp = isShown ? 'none' : 'block'
 for (var child = div.firstChild;  child != null;  child = child.nextSibling)
   if (hasClass(child, 'NavPic') || hasClass(child, 'NavContent')) 
      child.style.display = disp
}

//[[Special:Search]] extended
function searchPage() {
 var search = document.forms['search']
 if (!search) return
 var div = document.createElement('div')
 div.innerHTML = '\
<table style="margin-left:75%;padding-left:4px;"><tr><td>\
<form action="http://www.yandex.ru/yandsearch" name="yandex" target="_blank" id="yandex">\
<input type="hidden" name="text">\
<input type="hidden" name="site" value="ru.wikipedia.org">\
<input type="hidden" name="ras" value="1">\
<input type="hidden" name="site_manually"  value="true">\
<input type="hidden" name="server_name" value="Википедия">\
<input type="button" value="Яндекс по Википедии"  onclick="document.yandex.text.value = document.forms[0].search.value; this.form.submit();" style="width:12em;">\
</form></td></tr><tr><td>\
<form action="http://www.google.com/custom" method="get" name="google" target="_blank" id="google">\
<input type="hidden" name="hl" value="ru">\
<input type="hidden" name="domains" value="ru.wikipedia.org">\
<input type="hidden" name="q">\
<input type="hidden" name="sitesearch" value="ru.wikipedia.org">\
<input type="button" value="Google по Википедии" onclick="document.google.q.value = document.forms[0].search.value; this.form.submit();" style="width:12em;">\
</form></td></tr></table>'
  search.parentNode.insertBefore(div, search.nextSibling)
}


//[[Special:Upload]]: insert {Изображение} automatically, insert {Обоснование добросовестного использования} with click
function uploadPage(){
 var desc = document.getElementById('wpUploadDescription')
 var tmpl = document.getElementById('imageinfo')
 if (tmpl && desc && !desc.value) desc.value = tmpl.innerHTML
 var span = document.getElementById('insertlink')
 if (!span) return
 var a = document.createElement('a')
 a.href = 'javascript:addRationaleTemplate()'
 span.parentNode.insertBefore(a, span)
 a.appendChild(span)
 span.style.display = 'inline'
}
function addRationaleTemplate(){
 var desc = document.getElementById('wpUploadDescription')
 var tmpl = document.getElementById('rationale')
 if (desc && tmpl && desc.value.indexOf(tmpl.innerHTML.substring(0,8)) == -1){
   desc.value += '\n' + tmpl.innerHTML
   desc.rows = 15
 }
}



//Load functions on special pages
if (wgCanonicalNamespace == 'Special'){
  if (wgCanonicalSpecialPageName == 'Upload')
    addOnloadHook(uploadPage)
  else if  (wgCanonicalSpecialPageName == 'Search')
    addOnloadHook(searchPage)

//Load functions on normal pages
}else if (wgAction != 'history'){
  addOnloadHook(editZeroSection)
  addOnloadHook(collapsibleDivs)
  addOnloadHook(collapsibleTables)
  addOnloadHook(correctTitle)
  addOnloadHook(mainPage)
  document.write('<script type="text/javascript" src="http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400"><\/script>')
  if (wgNamespaceNumber == 0)
    addOnloadHook(LinkFA)
  else{
    addOnloadHook(icqIcons)
    addOnloadHook(newSectionLink)
  }
 if (wgAction == 'edit' || wgAction == 'submit')
   document.write('<script type="text/javascript" src="http://ru.wikipedia.org/w/index.php?title=MediaWiki:Editpage.js&action=raw&ctype=text/javascript"><\/script>')
}  


if (navigator.appName == 'Microsoft Internet Explorer') 
 addOnloadHook(function(){
  if (!window.IEFixesDisabled) importScript('MediaWiki:IEFixes.js')
})


if (wgPageName=='Википедия:Выборы_арбитров/Весна_2008/Голосование') 
  importScript('MediaWiki:Voting.js')


if (wgUserGroups) addOnloadHook(function(){
 if (wgUserGroups.join('').indexOf('sysop')!=-1 && !window.disableSysopJS)
    importScript('MediaWiki:Sysop.js')
})


//</source>