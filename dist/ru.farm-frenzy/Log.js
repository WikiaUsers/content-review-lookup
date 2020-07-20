//global script for [[Special:Log]]; called from [[MediaWiki:Common.js]]

$(function(){


//remove "AbuseFilter label" input: useless in logs
$('label[for="tagfilter"]').closest('p').remove()


//<select>: sort "page-related, then user-related"
var sel =  $('select[name="type"]')  
$.each(
  ['upload','move','protect','review','stable','delete','newusers','rights','renameuser','block'],
  function(i, type){
    sel.children('[value="' + type + '"]').appendTo(sel)
  }
)

 
//<select>: mark useless logs with gray color and move to the bottom
mw.util.addCSS('.log-unused {color:gray}')
sel.children().each(function(i, op){
  if( /gbl|global|abuse|import|merge|patrol/.test( op.value ) )
    $(op).addClass('log-unused').appendTo(sel)
})


//on userright log: option to run alternative "API Log" script
if( /&type=rights|\/rights/.test(document.URL) ){
  $('<span style="float:right; margin-left:1em; color:#0645AD; cursor:pointer">'
   + '[альтернативный вид]</span>')
  .prependTo( mw.util.$content.find('p:first') )
  .click(function(e){
    if( window.rightsLog ) rightsLog()
    else importMW('Tool/RightsLog')
  })
}


})