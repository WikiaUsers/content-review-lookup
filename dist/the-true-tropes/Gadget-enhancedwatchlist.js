function WLScript(){

var whenPageLoaded = +(new Date()) - 20000 //add 20 sec just in case

var mainTab, hideInterfaceCSS
var alreadySorted, alreadyAddedUnwatch

mw.util.addCSS('\
a.failure {color:red}\
a.unwatched {text-decoration: line-through}\
')

//enwiki
var mm = 
{sortTip:'Sort rows by even namespace number, then by page title'
,sortDone:'Watchlist changes already sorted'
,unwatchTip:'Add (x) quick unwatch links'
,unwatchDone:'Use (x) links to quickly unwatch pages'
,onlynew:'Only new'
,onlynewTip:'Show changes since this page was last loaded'
,expandAll:'Expand multiple edits'
,fullPage:'Hide/Show interface'
}
PngFixDisabled = true


//enhanced RC: make (x) appear by clicking on timestamp
var isEnhanced = mw.util.$content.find('ul.special').length == 0
if( isEnhanced ) mw.util.$content.click(toggleXLink)

//find insertion points for links:  after "days all"
var linksAt = $('#mw-watchlist-options').find('a[href*="&days=7"]').eq(0).next().next()
if( !linksAt.length ) linksAt = $('#mw-watchlist-options').find('hr:last')
//find "Special" tab
mainTab = $('#ca-special, #ca-nstab-special').eq(0)

//"only new" link and tab
addLnk(mm.onlynew, mm.onlynewTip).mousedown(onlyNewEntries).attr('id', 'listSince')
addTab(mm.onlynew, mm.onlynewTip).mousedown(onlyNewEntries)

//"unwatch" link(s)
if( window.unwatchLinksOnLoad ) addXLinks()
else addLnk('x' , mm.unwatchTip).click(addXLinks)

//"sort" link
addLnk('↑↓', mm.sortTip).click(sortWatchlist)

//"expand all" link
if( $('#mw-rc-openarrow-0').length )
  addLnk('±', mm.expandAll).click(expandMultipleEdits)

//"hideInterface" tab
addTab('↸',mm.fullPage).click(hideInterface).attr('href','#')
if( document.cookie.indexOf('wlmax=1') != -1 )
  hideInterface()


function addLnk(txt, tip){
  linksAt.before(' | ')
  return $('<a href=# title="'+tip+'" style="font-style:italic">'+txt+'</a>').insertBefore(linksAt)
}
function addTab(txt, tip){
  if( window.wlNoTabs ) return
  var tab = mainTab.clone(true).removeClass('selected').attr('id','')
  tab.find('a').text(txt).attr('title', tip).attr('accesskey','')
  return tab.appendTo(mainTab.parent())
}

return



function onlyNewEntries(e) {
 var url = window.location.href.split('#')[0]
 var days = ( +(new Date()) - whenPageLoaded)/(1000 * 3600 * 24)
 e.target.href = /[?&]days=/.test(url)
  ? url.replace(/([?&]days=)[^&]*/, '$1'+days)
  : url + (url.indexOf('?') < 0 ? '?':'&') + 'days=' + days
 return true
}



function sortWatchlist(e){
 e.preventDefault()
 if( alreadySorted ) return alert(mm.sortDone)
 mw.util.$content.find('h4').each(function(i, H4){ //sort all days separately
   sortDay($(H4).next('div, ul'))
 })
 alreadySorted = true
}

function sortDay(dayDiv){
 var i, pgname, rowElem, hiddenDiv, rows = dayDiv.find('a[href*="&action=history"]')
 for (i = 0; i < rows.length; i++){
   pgname = getLinkTitle(rows[i])
   ns = getTitleNamespace(pgname)
   if( ns>0 ) pgname = pgname.replace(/^.+?:/,'') //remove prefix
   if( ns%2 ) ns-- //sort talk page as if it was a base page
   rows[i].sortkey = zzz(ns) + ':' + pgname //assign custom tag attribute: namespace+title
 }
 //sort rows array
 rows.sort(function(a,b){
   if( a.sortkey > b.sortkey ) return 1
   else if( a.sortkey < b.sortkey ) return -1
   else return 0
 })
 //sort rows in HTML, by moving all to the bottom
 if( isEnhanced )
   for (i=0; i<rows.length; i++){
     rowElem = rows.eq(i).closest('table')
     hiddenDiv = rowElem.next('div')
     dayDiv.append(rowElem, hiddenDiv)
   }
 else
   for (i=0; i<rows.length; i++){
     rowElem = rows.eq(i).closest('li')
     dayDiv.append(rowElem)
   }
}



function expandMultipleEdits(e){
 e.preventDefault()
 var i = 0, sp, state = $('#mw-rc-openarrow-0')[0].style.display
 while( sp=document.getElementById('mw-rc-openarrow-'+(i++).toString()) )
   if( sp.style.display == state ) $(sp.firstChild).click()
}




function addXLinks(e){
 if( e ) e.preventDefault()
 if( alreadyAddedUnwatch ) return alert(mm.unwatchDone)
 mw.util.$content.find('a[href*="&action=history"]')
 .each( function(i, lnk){ addXLink( $(lnk) ) } )
 alreadyAddedUnwatch = true
}

function addXLink(histLink){ //create and append (x) link to the row with histLink
  var xLnk = $('<a class=aj-unwatch style="font-size:smaller" href="'
            + histLink.attr('href').replace(/&curid=\d+/,'') + '" />')
          .click(ajaxUnwatch)
  if( isEnhanced ) histLink.parent().prepend( xLnk.text('(x)'), ' ' )
  else histLink.after( ' | ', xLnk.text('x') )
  updateXLink(xLnk)
}

function updateXLink(xLnk, state){ //change title and url of (x) link
  if( !xLnk.length ) return
  state = state ? 'watch' : 'unwatch'
  xLnk.attr( 'title', mw.msg(state) )
      .attr( 'href', xLnk.attr('href').replace(/&action=\w+/, '&action='+ state) )
}





function toggleXLink(e){ //add (x) when clicking on timestamp
   if( ! $(e.target).filter('td.mw-enhanced-rc').length ) return
   var tbl = $(e.target).parents('table.mw-enhanced-rc')
   var x = tbl.find('a.aj-unwatch')
   if( x.length ) x.remove()
   else addXLink(tbl.find('a[href*="&action=history"]'))
}


function ajaxUnwatch(e) {
 var xLnk = $(this), errMsg = ''
 var req = { action: 'watch', format: 'json', title: getLinkTitle(xLnk),
             token: mw.user.tokens.get('watchToken') }
 if( /&action=unwatch/.test(xLnk.attr('href')) ) req.unwatch = ''
 $.ajax({ 
   type:'POST', dataType: 'json', 
   url: mw.util.wikiScript( 'api' ),
   data: req,
   timeout: 5000,
   success: function(resp){
     if( resp.error ) errMsg = resp.error.info
     else if( !resp.watch ) errMsg = 'empty response'
     else if( typeof resp.watch.unwatched == 'string') unwatchSuccess( req.title, true )
     else if( typeof resp.watch.watched   == 'string') unwatchSuccess( req.title, false )
     else errMsg = 'unrecognized response'
   },
   error: function(xhr, status, err) {
     errMsg = status + ':' + err
   },
   complete: function(){ //update X link
     if( errMsg ) xLnk.attr( 'title', 'API error: ' + errMsg ).addClass('failure')
     else xLnk.removeClass('failure')
   }
 })
 return false
}



function unwatchSuccess(name, isUnwatched) {
  //find full name of associated talk page (or vice versa)
  var ns = getTitleNamespace(name)
  var name2 = name
  if( ns > 0 ) name2 = name2.replace(/^.+?:/,'') //remove old prefix
  if( ns % 2 )  ns--; else ns++ //switch to  "other" namespace
  if( ns > 0 ) name2 = wgFormattedNamespaces[ns] + ':' +  name2 //add new prefix
  //mark all rows that are either name or name2
  mw.util.$content.find('a[href*="&action=history"]').each(function(){
    var ttl = getLinkTitle(this)
    if( ttl != name && ttl != name2 ) return
    var row = $(this).parent()
    zthis = this
    row.children('a[href^="/wiki"]:first').toggleClass('unwatched', isUnwatched)
    updateXLink( row.children('a.aj-unwatch'), isUnwatched )
       
  })
}



function hideInterface(e){

 if( e ) e.preventDefault()

 if (!hideInterfaceCSS)  hideInterfaceCSS = mw.util.addCSS('\
 div#siteNotice, h1#firstHeading, #siteSub, #contentSub, fieldset#mw-watchlist-options,\
 div.mw-rc-label-legend, #mw-fr-watchlist-pending-notice {display:none}')
 else hideInterfaceCSS.disabled = !hideInterfaceCSS.disabled

 document.cookie = 'wlmax=' + (!hideInterfaceCSS.disabled ? '1' : '0;expires=' + (new Date()).toGMTString() + ';;')

 var a = mainTab.find('a') //replace "Special" tab text with "Watchlist"
 if( hideInterfaceCSS.disabled ){ //restore
     a.text( a.attr('oldtext') )
 }else{//set to "watchlist"
   a.attr('oldtext', a.text())
   a.text($('h1#firstHeading').text())
 }

}



function getTitleNamespace(title){ //returns namespace number
 var prefix = /^(.+?):/.exec(title)
 if( !prefix ) return 0 //no prefix means article
 return wgNamespaceIds[ prefix[1].toLowerCase().replace(/ /g,'_') ] || 0
} 

function getLinkTitle (lnk){ //gets 'title=' part from a link
  var ma = /(&|\?)title=([^&]+)/.exec( $(lnk).attr('href') )
  if( ma ) return decodeURIComponent(ma[2]).replace(/_/g,' ')
  else return ''
}

function zzz(s){ // 5 -> 005
 s = s.toString()
 if( s.length==1 ) return '00'+s
 else if( s.length==2 ) return '0'+s
 else return s
}


}


if( wgCanonicalSpecialPageName == 'Watchlist' && wgAction == 'view' ) $(WLScript)