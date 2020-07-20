if( wgCanonicalSpecialPageName == 'Watchlist' && wgAction == 'view' ) 
$(function (){

var whenPageLoaded = +(new Date()) - 20000 //add 20 sec just in case

var mainTab, hideInterfaceCSS
var sortingDone, allStarsOn, hoverOnTitlesDone

mw.util.addCSS('\
a.failure {border-bottom:1px dotted red}\
.unwatched * {text-decoration: line-through}\
.unwatched a.aj-unwatch img {border:1px outset gray}\
')

//ruwiki
var mm = {
sortTip:'Сортировать страницы по пространствам',
sortDone:'Изменения уже отсортированы',
unwatchTip:'Добавить звёздочки для вычёркивания страниц из списка наблюдения',
onlynew:'Только новые',
onlynewTip:'изменения с момента загрузки этой страницы',
expandAll:'Показать/спрятать все свёрнутые правки',
fullPage:'Спрятать/показать элементы интерфейса'
}

var isEnhanced = mw.util.$content.find('ul.special').length == 0 //RC type in preferences


//find insertion points for links:  after "days all"
var linksAt = $('#mw-watchlist-options').find('a[href*="&days=7"]').eq(0).next().next()
if( !linksAt.length ) linksAt = $('#mw-watchlist-options').find('hr:last')


//UNWATCH links:
//on every line 
if( document.cookie.indexOf('wlunw=1') != -1 ) $(showAllStars)
else $(bindHoverOnTitles) //mouseover on title
//switch for above, saved in a cookie
addLnk('<img alt=x style="width:1em" src="//upload.wikimedia.org/wikipedia/commons/'
+ 'a/a4/Vector_skin_-_page_not_in_the_watchlist.png" />', mm.unwatchTip).click(showAllStars)
//click on timestamp (enhanced RC) / empty space (non-enhanced)


//"sort" link
addLnk('↑↓', mm.sortTip).click(sortWatchlist)

//"expand all" link
if( $('#mw-rc-openarrow-0').length )
  addLnk('±', mm.expandAll).click(expandMultipleEdits)

//"only new" link
addLnk(mm.onlynew, mm.onlynewTip).mousedown(onlyNewEntries).attr('id', 'listSince')


//TABS  
if( window.wlNoTabs ) return
var mainTab = $('#ca-special, #ca-nstab-special').eq(0) //"Special" tab

//change main tab into "watchlist Δ"
var wl = $.trim( $('h1#firstHeading').hide().text() )
mainTab.find('a') //replace "Special" tab text with "Watchlist"
.text(wl + ' △') //Δ is good but monobook makes is lowercase
.attr('title', wl + ' - ' + mm.onlynewTip)
.on('mousedown keydown', onlyNewEntries)
.focus()

//add "hideInterface" tab
mainTab.clone(true).removeClass('selected')
.appendTo(mainTab.parent())
.click(hideInterface)
.attr('id','').attr('href','#')
.find('a')
.text('↸').attr('title', mm.fullPage).attr('accesskey','')

if( document.cookie.indexOf('wlmax=1') != -1 ) hideInterface()


return



  
  
function addLnk(txt, tip){
  linksAt.before(' | ')
  return $('<a href=# title="'+tip+'" style="font-style:italic">'+txt+'</a>').insertBefore(linksAt)
}


function onlyNewEntries(e) {
 var url = window.location.href.split('#')[0]
 var days = ( +(new Date()) - whenPageLoaded)/(1000 * 3600 * 24)
 if( days < 0 ) days = 0.01 //negative might happen when adjusting local time
 e.target.href = /[?&]days=/.test(url)
  ? url.replace(/([?&]days=)[^&]*/, '$1'+days)
  : url + (url.indexOf('?') < 0 ? '?':'&') + 'days=' + days
 return true
}




function sortWatchlist(e){
 e.preventDefault()
 if( sortingDone ) return alert(mm.sortDone)
 mw.util.$content.find('h4').each(function(){ //sort all days separately
   var container = $(this).next('div, ul')
   var rows = container.children('li, table')
   //create sorting keys
   var key
   rows.each( function(i){
     //use built-in class:   either li.watchlist-5-<title> or table.mw-changeslist-ns100-<title> in enhanced RC
     key = /(\d+)-(\S+)/.exec( this.className ) || ['', 0, ' '] //logs might not have this class
     if( key[1] % 2 ) key[1]-- //sort talk page as if it was a base page
     if( window.watchlistSortNamespaceOnly ) key[2] = zzz(i) //keep timestamp order within each NS block
     this.skey = zzz(key[1]) + ':' +  key[2]
   })
   //sort array and then HTML
   rows.sort(function(a,b){ return a.skey > b.skey ? 1 : ( a.skey < b.skey ? -1 : 0 ) })
   for( i=0; i<rows.length; i++ ) container.append( rows.eq(i) )
 })
 sortingDone = true
}



function expandMultipleEdits(e){
 e.preventDefault()
 var i = 0, sp, state = $('#mw-rc-openarrow-0')[0].style.display
 while( sp=document.getElementById('mw-rc-openarrow-'+(i++).toString()) )
   if( sp.style.display == state ) $(sp.firstChild).click()
}





function showAllStars(e){
 if( !allStarsOn ){
   mw.util.$content.find('a[href*="&action=history"]')
   .each( function(i, lnk){ updateStar( getRow(this) ) } )
   document.cookie = 'wlunw=1'
   allStarsOn = true
 }else{ //otherwise remove
   mw.util.$content.find('a.aj-unwatch').not('unwatched').remove()
   document.cookie = 'wlunw=0;expires=' + (new Date()).toGMTString() + ';;'
   if( !hoverOnTitlesDone ) bindHoverOnTitles()
   allStarsOn = false
 }
 return false
}



function bindHoverOnTitles(){ //find all "titles" links and assign hover event
 if( hoverOnTitlesDone ) return
 //$('#mw-content-text').find( isEnhanced ? 'table' : 'li')
 mw.util.$content.find('a[href*="&action=history"]')
 .each( function(){
    getRow(this).find('a[href^="/wiki/"]:first').hover( hoverOnTitle )
 })
 hoverOnTitlesDone = true
}


function hoverOnTitle(e){ //on hover: add "unwatch" star after 1s
 var lnk = $(this)
 if( e.type == 'mouseenter' )
   lnk.data( 'uwTimeout', setTimeout( function(){showStarOnHover(lnk)}, 1000 ) )
 else
   clearTimeout( lnk.data( 'uwTimeout' ) )
} 


function showStarOnHover(lnk){
 var row = getRow(lnk)
 updateStar(row)
 //attach mouseleave to remove the star
 if( row.attr('leaveAssigned') ) return
 row.attr('leaveAssigned', true)
 row.mouseleave( function(e){
  var uw = $(this).find('.aj-unwatch')
  if( uw.length 
    && /unwatch/.test( uw.attr('href') )
    && !/waiting|failure/.test( uw.attr('class') )
    && !allStarsOn
    ) 
    uw.remove()
 }) 

}




function updateStar(row){
 var star = row.find('a.aj-unwatch')
 if( !star.length ){ //create
   star = $('<a class=aj-unwatch href="' 
    + row.find('a[href*="action=history"]').attr('href').replace(/&curid=\d+/,'') 
    + '">x</a>')
   .click(ajaxUnwatch)
   .insertBefore( row.find('a[href^="/wiki/"]:first') )
   .after(' ')
 }
 //update
 var isUnwatched = row.hasClass('unwatched')
 var state = isUnwatched ? 'watch' : 'unwatch'
 star.attr( 'title', mw.msg(state) )
      .attr( 'href', star.attr('href').replace(/&action=\w+/, '&action='+ state) )
      .html('<img alt=x style="width:0.6em" '
       + 'src="//upload.wikimedia.org/wikipedia/commons/'
       + ( isUnwatched
         ? 'a/a4/Vector_skin_-_page_not_in_the_watchlist.png'
         : 'f/f2/Vector_skin_-_page_in_the_watchlist.png'
         )
       + '" />')
}

function getRow(el){
  return $(el).closest(isEnhanced ? 'tr' : 'li')
}  

 


  

  



function ajaxUnwatch(e) {
 var xLnk = $(this), errMsg = ''
 var req = { token: mw.user.tokens.get('watchToken'),
             title: getLinkTitle(xLnk) }
 if( /&action=unwatch/.test(xLnk.attr('href')) ) req.unwatch = ''
 xLnk.addClass('waiting')
 $.ajax({ 
   type:'POST', dataType: 'json',
   url: mw.util.wikiScript('api') + '?action=watch&format=json',
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
     xLnk.removeClass('waiting')
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
    var row = getRow(this)
    row.toggleClass('unwatched', isUnwatched || false)
    updateStar(row)
    if( !isUnwatched && !allStarsOn) row.find('a.aj-unwatch').remove()
  })
}







function hideInterface(e){

 if( e ) e.preventDefault()

 if (!hideInterfaceCSS)  hideInterfaceCSS = mw.util.addCSS('\
 h4 {font-size:90%}\
 div#siteNotice, #contentSub, fieldset#mw-watchlist-options,\
 div.mw-rc-label-legend, #mw-fr-watchlist-pending-notice {display:none}')
 else hideInterfaceCSS.disabled = !hideInterfaceCSS.disabled
 //  h1#firstHeading,
 document.cookie = 'wlmax=' + (!hideInterfaceCSS.disabled ? '1' : '0;expires=' + (new Date()).toGMTString() + ';;')
}



function getTitleNamespace(title){ //returns namespace number
 var prefix = /^(.+?):/.exec(title)
 if( !prefix ) return 0 //no prefix means article
 return wgNamespaceIds[ prefix[1].toLowerCase().replace(/ /g,'_') ] || 0
} 

function getLinkTitle (lnk){ //gets 'title=' part from a link
  return mw.util.getParamValue('title', $(lnk).attr('href')).replace(/_/g,' ')
  //var ma = /(&|\?)title=([^&]+)/.exec( $(lnk).attr('href') )
  //if( ma ) return decodeURIComponent(ma[2]).replace(/_/g,' ')
  //else return ''
}

function zzz(s){ // 5 -> 005
 s = s.toString()
 if( s.length==1 ) return '00'+s
 else if( s.length==2 ) return '0'+s
 else return s
}


})//main