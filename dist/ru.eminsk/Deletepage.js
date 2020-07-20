function sysopDelPage(){

if (window.disableDelScript) return

$j('#wpReason').replaceWith('<textarea id=wpReason name=wpReason rows=3>' + $j('#wpReason').val()+'</textarea>')

var dropdown = $j('#wpDeleteReasonList'), reason = $j('#wpReason')
if (!dropdown[0] || !reason[0]) return


var rxQuote = /\/\* *(.*?) *\*\/ ?/
var oldQuote = ''
var frm = $j(reason.attr('form'))


appendCSS ('\
table#mw-deleteconfirm-table {width:98%} td.mw-label {width:15%}\
#wpDeleteReasonList {width:90%}\
#wpReason {width:90%}\
#js-message {padding:0 3px 0 3px; border:1px dotted gray; line-height:1.2em; margin-left:20px; float:right}\
')


//add "info" link
frm.next()
.prepend('<a href="' + wgArticlePath.replace('$1', 'MediaWiki_talk:Deletepage.js') + '">Про скрипт</a>  · ') 


//deletion summary preview
updatePreviewInput = reason
updatePreviewOutput = $j('<div id=summary-preview />').insertAfter(frm)
reason.bind('keyup mouseup', function(){
  dispMsg()
  updateSummary() 
})
var vandalQuote
dropdown.change (function (){
  dispMsg()
  toggleQuote( /вандализм/.test(dropdown.val()) )
})


//simplify dropdown
dropdown.find('option').each( function(i, opt){
  if (i==0) return
  opt.title = opt.value
  opt.text = opt.value.replace(/\[\[[^|]+\|([^\]]+)\]\]/,'$1')
})

 
//exit if file deletion
if (wgNamespaceNumber == 6) return


//"x" button
if (rxQuote.test(reason.val()))
 $j('<input type=button style="margin-left:0.5em; background-color:transparent" value=x title="убрать цитату" />')
 .click( function(){toggleQuote(); reason.focus() } )
 .insertAfter('#wpReason')



//try to automatically select the reason
var delTemplates = {
'О1':'бессвязно|nonsense|абсурд|nocontext',
'О2':'тест|test',
'О3':'ванд|vand|вандал|vandal|attack ',
'О4':'повторно|repost',
'О5':'автор|author',
'О6':'обсужд|talk',
'О7':'переим|move|переименование|rename',
'О8':'дубль|fork',
'С1':'пусто|empty',
'С2':'иностр|foreign',
'С3':'ссылки|nocontent',
'С5':'нз|nn|незначимо',
'С6':'copyvio|копивио',
'П1':'в никуда|redirect|redirnone',
'П2':'межпространственный|redirspace',
'П3':'опечатка|ошибка|redirtypo',
'П4':'падеж|redirflect',
'П5':'смысл|redirsense',
'П6':'redirtalk',
'К1':'пусткат|catempty|emptycat',
'У1':'владелец|owner|self|user',
'У2':'anon|анон',
'У3':'несущ|nouser'
}
var ma = reason.val().match(/\{\{\s*(db|уд)-?([\wа-яА-Я\s]+).*\}\}/i)
if (ma){//from db-template
  var dbReason = '|' + ma[2].toLowerCase()
  for (var name in delTemplates)
    if (('|'+delTemplates[name]).indexOf(dbReason) != -1){
       selectLabel(name,' согласно шаблону «' + ma[1]+'-'+ma[2]+'»')
       break
    }
//from {К удалению|2010-03-18}
}else if (ma=reason.val().match(/\{\{К удалению *\| *(\d\d\d\d)-(\d\d)-(\d\d)/i)){
  reason.val(
   'по результатам обсуждения на \[\[ВП:К удалению/'
   + ma[3].replace(/^0/,'')+' '
   + 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря'
     .split('|')[parseInt(ma[2],10)-1]
   + ' '+ma[1]
   + '#'+wgPageName.replace(/_/g, ' ')+']]'
  )
  dispMsg('Автоматически вставлена ссылка на ВП:КУ')
//when orphaned talk page
}else if ( (wgNamespaceNumber==1 || wgNamespaceNumber==5)
  && $j('#ca-nstab-main.new, #ca-nstab-project.new').length > 0 ){
    selectLabel('О6')
//redirect talk page
}else if ( (wgNamespaceNumber % 2 == 1) 
  && /#(redirect|перенаправление) *\[\[обсужден/i.test(reason.val()) ){
    selectLabel('П6')
}  


//remove dropdown groups that cannot be used
var hideGroup = function (lbl){
  dropdown.find('optgroup[label="'+lbl+'"]').children().remove()
}
if (wgNamespaceNumber!=0 &&  !/википедия:.*(инкубатор|черновик)/i.test(wgPageName)) hideGroup ('Статьи')
if (wgNamespaceNumber!=2 && wgNamespaceNumber!=3) hideGroup ('Личные страницы')
if (wgNamespaceNumber!==14) hideGroup ('Категории')


updateSummary()

return



// FUNC

function dispMsg(msg){
 var msgDiv = $j('#js-message')
 if (msgDiv.length == 0) msgDiv = $j('<div id=js-message />').insertBefore('#wpConfirmB')
 msgDiv.text(msg||'').toggle(msg != undefined)
}


function selectLabel(name, msg){
 var opt = dropdown.find('option[value*='+name+']')
 if (opt.length == 0) return
 opt.attr('selected', 'selected')
 reason.focus()
 dispMsg('Автоматически выбран ' + name + ' ' + (msg||''))
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



function updateSummary (e){
 var sel = $j('#wpDeleteReasonList')
 var p1 = sel.attr('selectedIndex') > 0 ? sel.val() : ''
 var p2 = reason.val()
 var leftN = updateSummaryPreview( p1 + (p1 && p2 ? ': ' : '') + p2 , 255, 255)
 if (leftN >= 0 || e == 0) return
 reason.val( reason.val().replace(rxQuote, function(s, q){
    var newLen = q.length - (- leftN) - 6
    if (newLen >= 10) return '/*' + q.substring(0, newLen) + '...*/ '
    else return ''  
  }))
 dispMsg('Цитата сокращена')
 updateSummary(0)
}



}//sysopDeletePage

addOnloadHook(sysopDelPage)





// COMMON script
//needs global vars (jQuery objects) :    updatePreviewInput, updatePreviewOutput

appendCSS('.overfilled {background:#FFEEEE}\
#summary-preview {border:1px solid #D0D0D0; width:100%; padding:1px; font-size:90%;\
  background-color:#F5F5F5; line-height:1.3em}\
#summary-counter {margin-left:10px; margin-right:2px; cursor:default;\
 float:right; border-left:1px dotted gray; border-bottom:1px dotted gray}')

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
    return '<a href='+wgServer+'/wiki/'  + encodeURI(p1.replace(/\?/g,'%3F').replace(/&/g,'%26'))
    +' title=\'' + p1 + '\'>' + p2 + '</a>' })
 updatePreviewOutput.html(
   '<span id=summary-counter style="'+fstyle
   +'" title="Осталось символов: '+(maxChars-chars)+', байт: '+(maxBytes - bytes)+'">'+leftN+'</span>'
   + (text||'&nbsp;'))
   
  return leftN 
}