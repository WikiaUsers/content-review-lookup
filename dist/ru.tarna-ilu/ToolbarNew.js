function addFuncBtn(id, func, img, title){
 var msg = {}; msg[id] = title;  mw.usability.addMessages(msg)
 $j('#wpTextbox1').wikiEditor('addToToolbar', {
  section:'main', group:'ruwp', tools: {id:{
    type:'button',
    action: {type:'callback', execute: func},
    labelMsg:id,
    icon:wgImg(img)
 }}})
}

$j(document).ready(function(){
 $j('#wpTextbox1').wikiEditor('addToToolbar', { section:'main', groups: {'ruwp':{}}})
 appendCSS('.wikiEditor-ui-toolbar .group-insert {border-right:1px solid #DDD}')
 addFuncBtn('wikif', Wikify, 'commons/0/06/Wikify-toolbutton.png', 'Викификатор — автоматический обработчик текста')
 var i, b
 for (i in mwCustomEditButtons){
  b = mwCustomEditButtons[i]
  if (!b.length) continue
  addFuncBtn(i, b[0], b[1], b[2])
 }
 $j('#toolbar-old').css('float','right').prependTo('#wikiEditor-ui-toolbar')
})

//compatibility w/ old scripts: floating old toolbar
addOnloadHook(function(){addOnloadHook(function(){
  $j('#toolbar').attr('id', 'toolbar-old')
  mwEditButtons=[]
})})