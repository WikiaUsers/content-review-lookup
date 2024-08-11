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