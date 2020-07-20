
$(function (){

if( window.disableDelScript ) return

//"reason" <input> → <textarea>
$('#wpReason').replaceWith(
  $('<textarea id=wpReason name=wpReason rows=3></textarea>').val( $('#wpReason').val() )
) 

var dropdown = $('#wpDeleteReasonList'), 
    reason = $('#wpReason'),
    frm = dropdown.closest('form')
if (!dropdown[0] || !reason[0]) return

//create message div
frm.find('input[type=submit]').eq(0).before('<div id=js-message />')

//wider inputs
mw.util.addCSS('\
table#mw-deleteconfirm-table {width:98%} td.mw-label {width:15%}\
#wpDeleteReasonList {width:90%}\
#wpReason {width:90%}\
#js-message {padding:0 3px 0 3px; border:1px dotted gray; line-height:1.2em; margin-left:20px; float:right}\
')

//"script info" link
frm.next().prepend(
  $('<a>Про скрипт</a>')
  .attr('href', mw.util.getUrl('MediaWiki talk:Deletepage.js') )
  , ' | '
)

//append "insert" buttons
$('<span style="border:1px solid gray; margin:0 2em;"><span>[[]]</span></span>')
.appendTo( $('#wpWatch').closest('div') )
.children('span')
.css({cursor:'pointer', padding:'0 4px'})
.attr('title', 'вставить в поле причины')
.click(function(){  $('#wpReason').val( $('#wpReason').val() + $(this).text() ) }) 

//automatic summary preview
updatePreviewInput = reason
updatePreviewOutput = $('<div id=summary-preview />').insertAfter(frm)
reason.bind('keyup mouseup', function(){
  dispMsg()
  updateSummary() 
})

//simplify dropdown list
dropdown.find('option').each( function(i, opt){
  if( i==0 ) return
  opt.title = opt.value
  opt.text = opt.value.replace(/\[\[[^|]+\|([^\]]+)\]\]/,'$1')
})
 
var delTemplates = {
'О1':'бессвязно|nonsense|абсурд|nocontext',
'О2':'тест|test',
'О3':'ванд|vand|вандал|vandal|attack ',
'О4':'повторно|repost',
'О5':'автор|author',
'О6':'обсужд|talk|doc|док|под|sub|обс|обсуждение|related',
'О7':'переим|move|переименование|rename',
'О8':'дубль|fork',
'О9':'спам|реклама|spam',
'О10':'badtalk',
'О11':'copyvio|копивио',
'С1':'пусто|empty|deleteslow',
'С2':'иностр|foreign|badtranslt',
'С3':'ссылки|nocontent',
'С5':'нз|nn|незначимо',
'П1':'в никуда|redirect|redirnone',
'П2':'межпространственный|redirspace',
'П3':'опечатка|ошибка|redirtypo',
'П4':'падеж|redirflect',
'П5':'смысл|redirsense',
'П6':'redirtalk',
'К1':'пусткат|catempty|emptycat',
'К2':'перекат|rencat',
'У1':'владелец|owner|self|user',
'У2':'anon|анон',
'У3':'несущ|nouser',
'У4':'нецелевое|baduserpage',
'У5':'неактив|inactive'
}

//try to select the reason automatically ...
var dbReason, ma, str_reason;

function selectReason() {
	var result = false;
	if( ma = /\{\{\s*(db|уд)-?([\wа-яА-Я\s]+)(?:\|\s*([а-яА-Я]+))?.*\}\}/i.exec( reason.val().replace("Deleteslow", "db-deleteslow") ) ) {
	dbReason = '|' + ma[2].toLowerCase();
	var freason = '';
	if (ma[3] != undefined) {
		freason = ma[3].toLowerCase();
	}
	for (var name in delTemplates)
	    if (('|'+delTemplates[name]).indexOf(dbReason) != -1) {
	    	if ((name === 'К1') && freason != '') {
				if (freason == 'переименована') {
					selectLabel('',' согласно шаблону «' + ma[1]+'-'+ma[2]+'»', 'Переименована')
				} else if (freason == 'пустая') {
					selectLabel(name,' согласно шаблону «' + ma[1]+'-'+ma[2]+'»', freason)
				} else if (freason == 'разобранная') {
					selectLabel(name,' согласно шаблону «' + ma[1]+'-'+ma[2]+'»', freason)
				} else {
					selectLabel(name,' согласно шаблону «' + ma[1]+'-'+ma[2]+'»')
				}
	    	} else {
				selectLabel(name,' согласно шаблону «' + ma[1]+'-'+ma[2]+'»')
	    	}
	    	result = true;
			break
		}
	}
	return result;
}

//from URL param (added by MediaWiki:Group-sysop.js)
if( dbReason = mw.util.getParamValue('dbreason') ){
	if (! ((dbReason === 'К1') && selectReason()) ) {
  		selectLabel(dbReason, 'согласно шаблону удаления');
	}
//from db-template inside quote 
} else if (selectReason()) {
//from {К удалению|2010-03-18} inside quote
} else if( ma = /\{\{(КУ|к удалению) *\| *(\d\d\d\d)-(\d\d)-(\d\d)/i.exec( reason.val() ) ){
  reason.val(
   'согласно \[\[ВП:К удалению/'
   + ma[4].replace(/^0/,'')+' '
   + 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря'
     .split('|')[parseInt(ma[3],10)-1]
   + ' '+ma[2]
   + '#'+mw.config.get('wgPageName').replace(/_/g, ' ')+']]'
  )
  dispMsg('вставлена ссылка на ВП:КУ')
// for talk page, except user_talk  
} else if( mw.config.get('wgNamespaceNumber') %2 && mw.config.get('wgNamespaceNumber') != 3 ){
  if( $('#ca-talk').prev().hasClass('new') && ! /wpreason=/i.test(document.URL)  ) 
    selectLabel('О6') //orphaned talk page
  else if( /#(redirect|перенаправление) *\[\[обсужден/i.test(reason.val()) )
    selectLabel('П6') //redirect talk page
}

if( mw.config.get('wgNamespaceNumber') == 6 ) return //nothing to do: there is no /*quote*/ when deleting a file

var rxQuote = /\/\* *(.*?) *\*\/ ?/, oldQuote = ''

// /*text quote*/ : automatically remove on "vandalism" reasons
dropdown.change (function (){
  dispMsg()
  removeBadQuote() 
})
removeBadQuote() //also remove on load

// /*text quote*/ : manually toggle with "x" button 
if (rxQuote.test(reason.val()))
 $('<input type=button style="margin-left:3em; background-color:transparent" value=x title="убрать цитату" />')
 .click( function(){toggleQuote(); reason.focus() } )
 .appendTo( $('#wpWatch').closest('div') )


//remove dropdown groups that cannot be used
var hideGroup = function (lbl){
  dropdown.find('optgroup[label="'+lbl+'"]').children().remove()
}
if( mw.config.get('wgNamespaceNumber') != 0 && mw.config.get('wgNamespaceNumber') != 102
    && !/Farm Frenzy вики:.*(инкубатор|черновик)/i.test(mw.config.get('wgPageName')) ) hideGroup ('Статьи')

updateSummary()

return

// FUNC
function dispMsg(msg){
 $('#js-message').text(msg||'').toggle(msg != undefined)
}

function selectLabel(name, msg, rsn) {
	var pattern = 'option[value*="';
	if ((name == '') && (rsn != undefined)) {
		pattern = pattern + rsn;
 	} else {
 		pattern = pattern + name + ']]:';
 		if (rsn != undefined) {
 		  pattern = pattern + ' ' + rsn;	
 		}
 	}
	pattern = pattern + '"]';
 	var opt = dropdown.find(pattern).first()
 	if( opt.length == 0 ) 
 		return
 	opt.attr('selected', 'selected');
 	reason.focus();
 	dispMsg('выбран ' + opt[0].label + ' ' + (msg||''));
}

function toggleQuote(isRemove){
 if (isRemove == undefined) isRemove = (oldQuote == '') //toggle button
 var rr = reason.val()
 if ( isRemove && (oldQuote = rxQuote.exec(rr))){
   oldQuote = oldQuote[0]
   rr = rr.replace(rxQuote, '')
   dispMsg('Цитата убрана')
 }else if ( !isRemove && oldQuote  && ! rxQuote.test(rr)){ //restore
   rr = oldQuote + rr
   oldQuote = ''
   dispMsg('Цитата восстановлена')
 }
 reason.val(rr)
 updateSummary()
}

function removeBadQuote(){
 toggleQuote( /вандализм/.test(dropdown.val()) )
}  

function updateSummary (e){
 var p1 = dropdown.val()
 if( p1 == 'other' ) p1 = ''
 var p2 = reason.val()
 var leftN = updateSummaryPreview( p1 + (p1 && p2 ? ': ' : '') + p2 , 255, 255)
 if (leftN >= 0 || e == 0) return
 reason.val( reason.val().replace(rxQuote, function(s, q){
    var newLen = q.length - (- leftN) - 6
    if (newLen >= 10) return '/*' + q.substring(0, newLen) + '…*/ '
    else return ''  
  }))
 dispMsg('Цитата сокращена')
 updateSummary(0)
}

})//main

mw.util.addCSS('.overfilled {background:#FFEEEE}\
#summary-preview {border:1px solid #D0D0D0; width:100%; padding:1px; font-size:90%;\
  background-color:#F5F5F5; line-height:1.3em}\
#summary-counter {margin-left:10px; margin-right:2px; cursor:default;\
 float:right; border-left:1px dotted gray; border-bottom:1px dotted gray}')

 //needs global vars:    updatePreviewInput, updatePreviewOutput
 
function updateSummaryPreview(text, maxChars, maxBytes){
 //count bytes
 var chars = text.length, bytes = 0, cutAt, bb
 for (var i=0; i<chars; i++){
   bb = text.charCodeAt(i)
   if (bb < 128) bytes++
   else if (bb < 2048) bytes += 2
   else if (bb < 65535) bytes += 3
   else bytes += 4
   if (bytes > maxBytes) cutAt = i
 }
 
 //counter
 var fstyle = 'opacity:'+ chars/maxChars+';'
 var leftN = maxChars - chars
 if (maxBytes-bytes < maxChars-chars) {
   leftN = maxBytes - bytes
   fstyle += 'font-style:italic;'
 }
 if (leftN < 0) fstyle += 'color:red;'
 updatePreviewInput.toggleClass('overfilled', leftN < 0)
 if (leftN < 20) fstyle += 'font-weight:bold;'
 
 //preview
 if (bytes > maxBytes) text = text.substring(0, cutAt)
 text = text
  .replace(/ +/g, ' ')
  .replace(/</g,'&lt;')
  .replace(/\/\* *(.*?) *\*\//, '<span class=autocomment>$1</span>') // /* text */
  .replace(/\[\[:?([^\]><}{|]+)\|?([^\]><]*)?\]\]([a-zа-я]*)/gi, function(str,p1,p2, tail){ //[ [ p1 | p2 ] ]
    if (!p2) p2 = p1
    if (tail) p2 += tail
    return '<a href='+mw.config.get('wgServer')+'/wiki/'  + encodeURI(p1.replace(/\?/g,'%3F').replace(/&/g,'%26'))
    +' title=\'' + p1 + '\'>' + p2 + '</a>' })
 updatePreviewOutput.html(
   '<span id=summary-counter style="'+fstyle
   +'" title="Осталось символов: '+(maxChars-chars)+', байт: '+(maxBytes - bytes)+'">'+leftN+'</span>'
   + (text||'&nbsp;'))
   
  return leftN 
}