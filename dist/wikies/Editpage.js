importMW('Wikificator')
mwCustomEditButtons['wikif'] = [function(){Wikify()}, 'commons/0/06/Wikify-toolbutton.png', 'Викификатор — автоматический обработчик текста']


if( mw.user.options.get('usebetatoolbar') ){
  var gTlbLoc = '#wikiEditor-ui-toolbar'
  mw.util.addCSS('#gadget-toolbar {height:26px; border-right:1px solid #ddd; margin:3px; padding-right:6px} #gadget-toolbar img {padding:2px}')
  $('#wpTextbox1').bind('wikiEditor-toolbar-buildSection-main', function(e, sec){
     sec.groups.insert.tools.file.action.options.post = '|thumb]]'
  })
}else if( document.getElementById('toolbar') ){
   var gTlbLoc = '#toolbar'
   mwCustomEditButtons['wikif'][1] = 'commons/3/38/Button_wikify.png'
   importMW('ToolbarOld')
 }else{
   var gTlbLoc = '#editform'
   importMW('ToolbarNone')
 }


$(function(){
 gToolbar()
 setTimeout(gToolbar, 2000)
 setTimeout(gToolbar, 6000)
})



function gToolbar(){

 if( !document.getElementById('gadget-toolbar') ){
   var where = $(gTlbLoc)
   if( !where.length ) return //beta toolbar not  ready yet
   $('<div id=gadget-toolbar style="float:left" />').prependTo(where)
 }
   
 for( var id in mwCustomEditButtons ){
   var b = mwCustomEditButtons[id]
   if( ! b.length ) continue
   createFuncBtn(id, b[0], b[1], b[2])
   delete mwCustomEditButtons[id]
 }
 
}



function createFuncBtn(id, func, img, tip){
 $('<img id="'+id+'" src="'+wgImg(img)+'" style="cursor:pointer" '
     +'title="'+tip+'" alt="'+tip.substr(0,3)+'" />')
  .appendTo('#gadget-toolbar')
  .click(func)
}


function wgImg(img){
 return '//upload.wikimedia.org/wikipedia/' + img
}


//for userscripts
function addFuncBtn(id, func, img, tip){
 if( document.getElementById('gadget-toolbar') )
   createFuncBtn(id, func, img, tip)
 else
   mwCustomEditButtons[id] = [func, img, tip]
}





//Summary buttons

function insertSummary(txt){
 if( typeof txt != 'string' ) txt = this.title
 var vv = $('#wpSummary').val()
 if( vv.indexOf(txt) != -1 ) return
 if( /[^,; \/]$/.test(vv) ) vv += ','
 if( /[^ ]$/.test(vv) ) vv += ' '
 $('#wpSummary').val(vv + txt)
}
 
function addSumButton(btn, txt){
 $('<a title="' + txt + '">' + btn + '</a>')
 .appendTo('#userSummaryButtonsA')
 .click(insertSummary)
}

$(function(){
 var frm = document.getElementById('editform')
 if( !wgArticleId || !frm || $(frm.wpSection).val() == 'new' ) return
 mw.util.addCSS('\
 input#wpSummary {margin-bottom: 0}\
 #userSummaryButtonsA a {background:#cef; border:1px solid #adf; padding:0 2px;\
  margin:0 2px;cursor:pointer; font-size:80%; color:#666}\
 #userSummaryButtonsA a:hover {background:#bdf; color:black; text-decoration:none}')
 $('<div id=userSummaryButtonsA />').insertAfter('#wpSummary')
 $.each( ['викиф|икация', 'оформл|ение', 'стил|евые правки', 'орфогр|афия',
  'пункт|уация', 'интервики', 'кат|егория', 'шаб|лон', 'к удал|ению', 'иллюстрация',
  'источ|ники', 'доп|олнение', 'уточ|нение', 'обнов|ление данных'],
  function(i,s){  addSumButton( s.replace(/\|.*/,''), s.replace(/\|/,'') )  }
 )
})




//sig reminder
if (wgNamespaceNumber % 2 || wgNamespaceNumber==4)
$(function (){
 var cp = document.getElementById('editpage-copywarn')
 var wpSave = document.getElementById('wpSave')
 if (!cp || !wpSave) return
 if (wgNamespaceNumber == 4 &&
  (!wgTitle.match('^(Форум[/ ]|Голосования/|Опросы/|Обсуждение правил/|Заявки на .*|Запросы.|Кандидаты в .*/|К (удалению|объединению|переименованию|разделению|улучшению)/|Рецензирование/|Проверка участников/|Инкубатор/(Мини-рецензирование|Форум[/ ]))') || wgTitle.match ('/Архив'))) return
 var ins = ' <a href=\'javascript:insertTags(" ~~\~~\","","")\'>~~\~~</a>'
 cp.innerHTML += '&nbsp;&nbsp;Не забудьте добавить к вашему сообщению подпись с помощью' + ins
 if (wgUserGroups && wgUserGroups.join().indexOf('autoconfirmed') != -1 && !window.sigWarning) return
 //unreg/new users only
 var warningDone = false
 wpSave.onclick = function(){
   try{
    if (warningDone || document.editform.wpTextbox1.value.indexOf('~~\~~') >= 0 ) return true
    warningDone = true
    cp.innerHTML = 'Пожалуйста, <b>подпишитесь</b>, добавив  в конце своего сообщения' + ins
    + ' (<a href="' + wgArticlePath.replace(/\$1/, 'Википедия:Подписывайтесь')
    + '" title="(ссылка откроется в новом окне)" target=_blank>подробнее&nbsp;↗</a>)'//→ ↗
    cp.style.background = '#FFD080'
    cp.style.border = '1px solid orange'
    return false
   }catch(e) {return true}
 }
})


if (wgAction=='edit' && / rv:1\.[0-8].+Gecko/.test(navigator.userAgent))
  importMW('Firefox2')


if( window.opera && /11\.6[01]/.test(opera.version()) )
 $('#wpTextbox1')
 .mousedown(function(){ this.sT = this.scrollTop })
 .click(function(){ if( this.scrollTop == 0 ) this.scrollTop = this.sT })