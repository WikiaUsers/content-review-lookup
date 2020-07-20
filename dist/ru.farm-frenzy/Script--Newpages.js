
var newPages = new function(){

var msg =
{legend:'New pages'
,info:'Pages: $1. <span id=update>Update</span>'
,next:'Request 50 next (200 | 500)'
,showlogs:'Display previous deletions'
,nsall:'all'
,ns0:'(articles)'
}

if( wgUserLanguage == 'ru' ) msg =
{legend:'Недавно созданные страницы'
,info:'Показано страниц: $1. <span id=update>Обновить</span>'
,next:'Показать 50 следующих (200 | 500)'
,'Show only':'Показывать только'
,patrolled:'патрулированные'
,anon:'IP правки'
,redirect:'перенаправления'
,showlogs:'Показать предыдущие удаления'
,nsall:'все'
,ns0:'(статьи)'
}

function mm(txt){ return msg[txt] || txt }


//VARs
var pagesTotal, lastUpdated, isDisplayLogs
var apiNextRC, apiTopRC, apiLog // for simpleQuery




this.start = function (){ //create interface

mw.util.addCSS('\
#output {font-size:88%}\
span.more {color:#0645AD; cursor:pointer}\
#result tr {background-color:white}\
#result tr.viewed td.timestamp {background-color: #ddd}\
span.page-quote {font-size: 90%}\
td.timestamp, td.newlen {text-align:right; font-size:90%}\
tr.patrolled td.title {background:#eaffea}\
td.redirect a {font-style:italic; color:gray}\
.show {opacity:0.4}\
.checked {opacity:1}\
')

$(document.body).children().hide()

var nsOptions = '<option>' + mm('nsall') + '</option>'
  + '<option value=0 selected>'+ mm('ns0') + '</option>'
for (var i in wgFormattedNamespaces){
  if (i <= 0) continue
  nsOptions += '<option value=' + i + '>' + wgFormattedNamespaces[i] + '</option>'
}

 $('<div id=output>\
<div id=messages />\
<fieldset id=dialog><legend>'+mm('legend')+'</legend>\
<form style="display:inline">'
+mm('Show only')
+ ': <select id=namespace>' + nsOptions + '</select>'
+ chooseShow ('anon')
+ chooseShow ('patrolled')
+ chooseShow ('redirect')
+'</form> \
<input type=button id=go value=↓>\
<br /><hr />\
<input type=checkbox id=logs /><label for=logs>' + mm('showlogs') + '</label>\
</fieldset>\
<div id=header />\
<div id=results />\
<div id=js-footer />\
</div>')
.appendTo(document.body)


var chboxes =  $('#dialog').find('input.show')
.click( function(e){ //loop value between '', 'anon', '!anon'
   var ch = $(this), lbl = ch.next(), txt = lbl.attr('title')
   if ( /^!/.test( ch.val() ) )
	  ch.val('')
   else if ( ch.val() ){
	  ch.val( '!' + ch.attr('name') )
	  txt = '<s>' + txt + '</s>'
   }else
     ch.val( ch.attr('name') )
  ch.attr('checked', ch.val() ). toggleClass( 'checked', ch.attr('checked') )
  lbl.html( txt ).toggleClass( 'checked', ch.attr('checked') )
})



$('#go').click( function(){ //prepare RC request parameters
  var sh = ['!bot']
  chboxes.filter(':checked').each (function(){
     sh.push( $(this).val() )
  })
  isDisplayLogs = $('#logs').attr('checked')
  firstRequest( { show: sh.join('|'), namespace: $('#namespace').val() }  )
})


function chooseShow(param){ // 3-way checkbox
 return '<input type=checkbox value="" class=show id=' + param + ' name=' + param + '>'
 + '<label class=show for=' + param + ' title="' + mm(param) + '">' + mm(param) + '</label>'
}


}//start





function firstRequest( rcParams ){

 //default RC parameters
 rcParams = $.extend(
 {type: 'new'
 ,prop: 'user|parsedcomment|flags|timestamp|title|ids|sizes|redirect|patrolled'
 },
 rcParams)

 //define RC queries
 apiNextRC = new apl.simpleQuery( 'rc', rcParams, displayPages )
 apiTopRC = new apl.simpleQuery( 'rc', rcParams, displayPages )

 //query for requesting logs
 apiLog = new  apl.simpleQuery(
  'le',
  { type:'delete', limit:10, prop: 'ids|user|timestamp|details|parsedcomment' },
  displayLogs
 )

 //initialize and do first request
 pagesTotal = 0
 lastUpdated = ''
 $('#result').remove()
 requestNextRC(10)
}



function requestNextRC( N ){
 //spinner2('#dialog form')
 //displayPages( simulate_newpages() )
 apl.spinner('#header')
 if (typeof N != 'number') N = parseInt( $(this).text() ) //when called as onclick event
 apiNextRC.call( N )
}



function requestTopRC(){
  apl.spinner('#header')
  apiTopRC.call ( { start:'', end: lastUpdated, limit:100 } )
}



function displayPages(pages){

 apl.spinner()
 zpages = pages

 //old rows: mark as viewed and update time
 $('#result').find('tr').addClass('viewed')
 .find('td.timestamp').each( function(){
   $(this).find('span:last').html(
      apl.output( $(this).find('span.sort').text(), 'timestamp')
    )
 })

 //check if we have new results
 if (pages.length == 0){
   $('#results').html('No results')
   return
 }


 //create table if needed
 if ( ! $('#result').length ) {
  var addTH = function(tip, ico){
    return '<th title="' + tip + '">' + (ico ? apl.icon(ico, 15) : '') + '</th>'
  }
  $('#results').html('<table class=wikitable id=result><tr>'
   + addTH('Time ago: hh:mm or dd,hh', '2/26/Clock_simple.svg')
   + addTH('User', '1/12/User_icon_2.svg')
   + addTH('Page', '8/8a/Icons-mini-page_new.gif')
   + addTH('Size')
   + addTH('Comment')
   + (isDisplayLogs
     ? addTH('Previous deletions', '9/9a/Fairytale_Trash_Question.svg')
	 : '' )
   + '</tr></table>')
  ts_makeSortable($('#result')[0])
 }

 //update "last updated"
 var isTop
 if ( pages[0].timestamp > lastUpdated ){
   isTop = true
   lastUpdated = pages[0].timestamp
 }

 //add every row and request logs too
 var pg, htmRows = ''
 var addCell = function(kk){  htmRows += apl.output( pg[kk], kk, 'td' ) }
 for ( var i=0; i<pages.length; i++ ){
  pg = pages[i]
  if ( $('#result').find('tr.'+pg.pageid).length ) continue // avoid duplicates
  pagesTotal++
  pg.parsedcomment = simplifyNewPageComment(pg.parsedcomment)
  htmRows +=  '<tr class="' + pg.pageid
  + (typeof pg.patrolled=='string' ? ' patrolled" title="patrolled' : '')
  + '">'
  + apl.outputCell(pg, 'timestamp')
  + apl.outputCell(pg, 'user')
  + apl.outputCell(pg, 'title')
  + apl.outputCell(pg, 'newlen')
  + apl.outputCell(pg, 'parsedcomment')
  if( isDisplayLogs ){
    htmRows += apl.outputCell('<small>(?)</small>', 'log')
    apiLog.call( { title:pages[i].title, requestid:pages[i].pageid } )
 }
 htmRows += '</tr>'
}

 //append to the table
 htmRows = '<tbody>' + htmRows + '</tbody>'
 if (isTop)
   $('#result').find('tbody').eq(0).after( htmRows )
 else
   $('#result').append( htmRows )
 //update top and bottom text
 $('#header').html(   mm('info').replace('$1', pagesTotal) )
 $('#update').addClass('more').click( requestTopRC )

 //if (! apiNextRC.isMore) return // !!! doesn't work yet
 $('#js-footer')
 .html( mm('next').replace(/\d+/g, '<span class=more>$&</span>') )
 .find( 'span.more' )
 .click( requestNextRC )

}



function displayLogs(logs, api){

 //find the cell by pageid
 var cell =
 $( '#result' )
 .find( 'tr.' + api.requestid )
 .find( 'td.log' )
 .empty()

 if (!logs.length) return

 //create popup html
 var htm = ''
 for (var i=0; i<logs.length; i++)
   htm += '<small>' + logs[i].timestamp.replace(/(T|:\d\dZ)/g,' ') + '</small>'
	+ ' : ' + logs[i].user
	+ ' : <small>' + logs[i].parsedcomment + '</small>'
	+ '<br />'

 //put time and save popup HTML as data
 cell
 .append( apl.output(logs[0].timestamp, 'timestamp') )
 .addPopup( htm )

}



function simplifyNewPageComment(txt){
 var ma
 if ( ma = txt.match(/^<a[^>]+>←<\/a> Новая страница: «(.*)»$/) )
   txt = '<span class="page-quote">«' + ma[1] + '»</span>'
 else if ( ma = txt.match(/^<a[^>]+>←<\/a> <a[^>]+>Перенаправление<\/a> на «(.*)»(.*)$/) )
   txt = '→ ' + ma[1] + ma[2]
 else
   txt = '<i>' + txt + '</i>'
 return txt
}


}//main

if( /^Farm Frenzy вики:Скрипты/.test(wgPageName) ){
 importScriptURI('//ru.wikipedia.org/w/index.php?title=user:js/apl01.js&action=raw&ctype=text/javascript')
 newPages.start()
}