function imageNotesViewer(){

var annot = [], rect = $(), lastTip

//Message under H1
$('<div id=annot-msg style="float:right" />')
.prependTo(mw.util.$content)
.html('<i>на этом изображении есть <a href="/wiki/Farm Frenzy вики:Примечания_на_изображениях">примечания</i>')

//with support for commons:template:ImageNoteColors
mw.util.addCSS('\
.annot-outer {\
   position:absolute; z-index:10;\
   border:1px solid ' + (getVal('outer') || '#666') + ';\
 }\
.annot-inner {\
   width:100%; height:100%;\
   background: url(//upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif);\
   border:1px solid ' + (getVal('inner') || 'yellow') + ';\
 }\
.annot-outer.active .annot-inner {border-color:' + (getVal('active') || 'orange') + '}\
.annotationboxforwikipedia {display:none}\
')

//define tooltip options
$.extend($.fn.tipsy.defaults, {
 title: 'info', 
 html:true, 
 gravity:'s',
 trigger: 'manual',
 offset:-20
})

//get curent image data
var fullSize = mw.util.$content.find('span.fileInfo').text().replace(/[,\s]/g,'').match(/(\d+)[^\d]+(\d+)/)
if( !fullSize ) return
var imgW = $('#file img').width()
var imgH = $('#file img').height()
var nn, fullW, fullH, cc


//read annotations data into annot[]
iaNotes.each( function(i, el){

 nn = parseInt(/\d+$/.exec(el.id)[0])
 if( !nn ) return

 fullW = getVal('full_width')
 fullH = getVal('full_height')
 if( fullW != fullSize[1] || fullH != fullSize[2]) return //image size was changed
 
 cc = {
  left:   Math.round( getVal('view_x') * imgW / fullW ),
  width:  Math.round( getVal('view_w') * imgW / fullW ),
  top:    Math.round( getVal('view_y') * imgH / fullH ),
  height: Math.round( getVal('view_h') * imgH / fullH )
 }

 annot.push({
  size: cc.width * cc.height,
  coords: cc,
  content: getVal('content')
 })

}) 


//sort by size to prevent big ones overlapping small ones
annot.sort( function(a, b){ return b.size - a.size })


//prepare events
$('#file')
.css({ position:'relative', width: imgW })
.mouseover ( function(e){ 
  //console.log('OVER', e.target, e.relatedTarget)
  annotOn()
  if( lastTip == e.target ) return //moving from tooltip back to rectangle: nothing to do
  hideTip()
  if( /annot-/.test(e.target.className) ) showTip(e.target)
}) 
.mouseleave ( function(e){
  if( ! $(e.relatedTarget).closest('.tipsy').length ) //unless we moved to tooltip ... 
    annotOff()
})


//create rectangles
for( i=0; i< annot.length; i++ ){
 rect = rect.add(
  $('<div class="annot-outer" style="display:none" />')
  .append('<div class="annot-inner" />')
  .attr( 'id', 'ia' + i )
  .attr( 'info', annot[i].content )
  .css( annot[i].coords ) //looks like 'px' is optional
  .tipsy( {offset: - Math.min(annot[i].coords.height/2, 20) } ) //center
  .appendTo( '#file' )
 )
}


//-------------------

function annotOn(){
 if( ! rect.eq(0).is(':visible') ) rect.show()
}  

function annotOff(){
 hideTip()
 rect.hide()
}

function showTip(el){
 if( el.className == 'annot-inner') el = el.parentNode
 $(el).addClass('active').tipsy('show')
 lastTip = el
 $('.tipsy').mouseleave( function(e){
   if( ! $(e.relatedTarget).closest('#file').length ) //unless we moved back to image ...
     annotOff()
 })
}

function hideTip(){
 if( !lastTip ) return
 $(lastTip).removeClass('active').tipsy('hide')
 lastTip = null
}

function getVal(name){ //using nn
 var el = $( '#image_annotation_' + name + (nn ? '_' + nn : '') )
 if( name == 'content' ) return el.html()
 else                    return el.text()
}

}



mw.loader.using('jquery.tipsy', imageNotesViewer)