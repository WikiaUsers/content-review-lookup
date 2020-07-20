var WLScript = new function(){ //wrapper object

var whenPageLoaded = +(new Date()) - 30000 //add 30 sec just in case
var namespace, content, alreadySorted, alreadyAddedUnwatch, mw, rcm0


mw = {
sort:'↑↓',
sortTitle:'Сортировать страницы по пространствам',
sortDone:'Изменения уже отсортированы',
unwatchTitle:'Добавить (x) ссылки для вычёркивания страниц из списка наблюдения',
unwatchDone:'Для удаления страниц из списка наблюдения используйте появившиеся ссылки (x)',
onlynew:'Только новые',
onlynewTitle: 'Показать изменения с момента загрузки этой страницы',
expandAll: 'Показать/спрятать все свёрнутые правки'
}

if (wgUserLanguage!='ru')
mw = {
sort:'Sort...',
sortTitle:'Sort titles by even namespace number, then by page title',
sortDone:'Watchlist changes already sorted',
unwatchTitle:'Add (x) quick unwatch links',
unwatchDone:'Use (x) links to quickly unwatch pages',
onlynew: 'Only new',
onlynewTitle: 'Show changes since this page was loaded',
expandAll: 'Expand/hide all'
}

mw.unwatch = (window.wgAjaxWatch ? wgAjaxWatch.unwatchMsg : 'Unwatch' )
mw.watch = (window.wgAjaxWatch ? wgAjaxWatch.watchMsg : 'Watch')


this.onLoad = function() {
 PngFixDisabled = true
 init()
 if (!namespace) return
 //find insertion point
 var insert = namespace.form
 while (insert.previousSibling && insert.nodeName != 'BR') insert=insert.previousSibling
 //append "only new" link
 var lnk = addLnk('#', mw.onlynew, mw.onlynewTitle)
 lnk.id = 'listSince'
 lnk.onclick = lnk.onmousedown = onlyNewEntries // react to middle clicks too
 //append other links
 addLnk('javascript:WLScript.addUnwatchLinks()', 'x' , mw.unwatchTitle) //mw.unwatch+'…'
 addLnk('javascript:WLScript.sortWatchlist()', mw.sort, mw.sortTitle)
 if (rcm0=document.getElementById('RCM0'))
   addLnk('javascript:WLScript.expandWatchlist()', '±', mw.expandAll)
 // function adds " | <link>" just before 'insert' element
 function addLnk(url, text, tooltip){ 
   var lnk = document.createElement('a')
   lnk.href = url
   lnk.appendChild(document.createTextNode(text))
   lnk.title = tooltip || ''
   insert.parentNode.insertBefore(document.createTextNode(' | '), insert)
   insert.parentNode.insertBefore(lnk, insert)
   return lnk
 }
}

function init(){
 namespace = document.getElementById('namespace')
 content = document.getElementById('bodyContent') || document.body
}
this.init = init



function onlyNewEntries() {
 var url = window.location.href.split('#')[0]
  var days = ( +(new Date()) - whenPageLoaded)/(1000 * 3600 * 24) 
 if (url.match(/[?&]days=/))
   this.href = url.replace(/([?&]days=)[^&]*/, '$1'+days)
 else
   this.href = url + (url.indexOf('?') < 0 ? '?':'&') + 'days=' + days
 return true
}



this.sortWatchlist = function(){
 if (alreadySorted) return alert(mw.sortDone)
 var H4s = content.getElementsByTagName('h4'), dayDiv, rows, h, i, j, pgname, el, step, last
 //sort all days separately
 for (var h=0; h<H4s.length; h++){
   //get UL or DIV immediately after H4
   dayDiv = H4s[h]
   while ((dayDiv=dayDiv.nextSibling) && (dayDiv.nodeName != 'DIV') && (dayDiv.nodeName != 'UL'));
   //get WL rows, find their namespaces, calculate sortkeys
   rows = getWatchlistRows(dayDiv)
   if (!rows) return
   for (i = 0; i < rows.length; i++){
     pgname = getTitleFromURL(rows[i].href)
     ns = getNSFromTitle(pgname)
     if (ns>0) pgname = pgname.substring(getNamespace(ns).length+1) //title w/o prefix
     if (ns%2) ns-- //sort talk page as if it was a base page
     rows[i].sortkey = zzz(ns) + ':' + pgname //assign custom tag attribute: namespace+title
   }
   //sort rows array
   rows.sort(function(a,b){
    if (a.sortkey > b.sortkey) return 1 
    else if (a.sortkey < b.sortkey) return -1 
    else return 0   
  })
  //sort rows in HTML
  for (i=0; i<rows.length; i++){ //move rows to the dayDiv bottom
    el = last = rows[i]
    if (el.parentNode.nodeName == 'LI') //non-enhanced watchlist
      el.parentNode.parentNode.appendChild(el.parentNode) //move to bottom
    if (el.parentNode.nodeName == 'TD'){ //new enhanced WL, with tables
		  while ((el=el.parentNode) && el.nodeName != 'TABLE');
			if (!el) continue
			do{ //move table bottom, also taking next (hidden) DIV 
			  step = el.nextSibling; el.parentNode.appendChild(el); el = step 
			}while (el && el.nodeName != 'TABLE')
    }else{ //old enhanced WL, in case new is reverted
      //find last row element , which is usually BR
      while ((last=last.nextSibling) && last.nodeName!='BR');
      if (!last) continue //just in case, this should not happen 
      //move to next DIV (if present), containing (collapsed) list of changes with "enhanced RC"
      if ((step=last.nextSibling) && step.nodeName == '#text') last = step //Firefox insists on '\n' being here
      if ((step=last.nextSibling) && step.nodeName == 'DIV')   last = step
      //now get to the 1st element, stopping just before <br> or <div>
      while ((step=el.previousSibling) && step.nodeName!='BR' && step.nodeName!='DIV') el = step
      //move all row elements one by one to the bottom of the day div
      do { step=el.nextSibling;  dayDiv.appendChild(el) } while (el != last && (el=step)) 
    }
  }
 }//for
 alreadySorted = true
}


this.expandWatchlist = function(){
 var i = 0, sp, state = rcm0.style.display
 while (sp=document.getElementById('RCM'+(i++).toString()))
   if (sp.style.display == state) eval(sp.firstChild.href)
}


var uwLinks = [], inProgress = null, timeoutID = null

this.addUnwatchLinks = function() {
 if (alreadyAddedUnwatch) return alert(mw.unwatchDone)
 var rows = getWatchlistRows(content), x, insAt, el
 for (var i = 0; i < rows.length; i++){
   x = document.createElement('a')
   x.href = wgServer+wgScript+'?action=unwatch&title='+encodeURIComponent(rows[i].title) //non-Ajax unwatch
   x.onclick = ajaxUnwatch
   uwLinks.push(x)
   insAt = rows[i]
   if (insAt.parentNode.nodeName == 'LI')
     insAt = insAt.nextSibling.nextSibling //non-enhanced WL: insert before ) after history
   else
     while ((el=insAt.previousSibling) && el.nodeName != 'TT') insAt = el //insert after TT (with time)
   insAt.parentNode.insertBefore(document.createTextNode(' ('), insAt)
   insAt.parentNode.insertBefore(x, insAt)
   insAt.parentNode.insertBefore(document.createTextNode(') '), insAt)
   setUnwatchLink(x, false)
 }
 alreadyAddedUnwatch = true
}

function ajaxUnwatch(e) {
 if (inProgress) return false
 e = e || window.event
 var targ = e.target || e.srcElement
 inProgress = getTitleFromURL(targ.href)
 timeoutID = window.setTimeout( function() {inProgress = null},  10000 )
 //call server
 var action = (targ.innerHTML == 'x') ? 'u' : 'w'
 sajax_do_call('wfAjaxWatch', [inProgress, action], showUnwatch)
 return false
}

function showUnwatch (request) {
  if (timeoutID) window.clearTimeout(timeoutID)
  var response = request.responseText
  if (window.wlUnwatchShowMsg) jsMsg (response.substr(4), 'watch')
  var name = inProgress, state, prefix, idx, pg, i, el
  inProgress = null
  if (/^<u#>/.test(response)) state = true
  else if (/^<w#>/.test(response)) state = false
  else return //unrecognized response
  //find the full name of "other page"
  var ns = getNSFromTitle(name)
  var name2 = name
  if (ns > 0) name2 = name2.substring(getNamespace(ns).length+1) //remove old prefix
  if (ns % 2)  ns--; else ns++ //switch to  "other" namespace
  if (ns > 0) name2 = getNamespace(ns) + ':' +  name2 //add new prefix
  //now mark all rows that are either name or name2
  for (i=0; i<uwLinks.length; i++){
    el = uwLinks[i]
    pg = getTitleFromURL(el.href)
    if (pg != name && pg != name2) continue
    setUnwatchLink (el, state)
    //now mark the whole line
    while ((el=el.nextSibling)  && (el.nodeName!='DIV') && (el.nodeName!='BR')) 
       if (el.style) el.style.textDecoration = state ? 'line-through' : ''
  }
}

function setUnwatchLink (unwatchLink, state) {
  unwatchLink.innerHTML = state ? '+' : 'x'
  unwatchLink.title = state ? mw.watch : mw.unwatch
}


//common functions, some need 'namespace' select element

function getNSFromTitle(title){ //returns namespace number
 var i = title.indexOf(':')
 if (i == -1) return 0
 var prefix = title.substring(0,i+1) //including :
 for (i=2; i < namespace.options.length; i++)
   if (namespace.options[i].text+':' == prefix)
     return i-1
 return 0 // ':' was simply a part of a title
}

function getNamespace(ns){ //returns namespace name
 if (ns==0) return ''
 else return namespace.options[ns+1].text
}
 
function getTitleFromURL (url){ //gets 'title=' part from a link
  var ma = url.match(/(&|\?)title=([^&]+)/)
  if (ma) return decodeURIComponent(ma[2]).replace(/_/g,' ')
  else return ''
}

function getWatchlistRows(parent){ //returns all 'history' links inside 'parent'
 var histLinks = []
 var allLinks = parent.getElementsByTagName('a')
 for (var i = 0; i < allLinks.length; i++)
   if (/[?&]action=history(&|$)/.test(allLinks[i].href)){
     histLinks[histLinks.length] = allLinks[i]
     i += 3 //move counter to speed things up a bit 
   }
 return histLinks
}

function zzz(s){ // 5 -> 005
 s = s.toString()
 if (s.length==1) return '00'+s
 else if (s.length==2) return '0'+s
 else return s
}


}//obj


if (wgCanonicalSpecialPageName && wgCanonicalSpecialPageName == 'Watchlist')
 addOnloadHook(WLScript.onLoad)