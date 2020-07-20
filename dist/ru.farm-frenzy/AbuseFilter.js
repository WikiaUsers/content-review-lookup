
mw.util.addCSS('tr.mw-abusefilter-list-disabled td.TablePager_col_af_public_comments * {opacity:0.5}')

if( /\/examine\//.test(document.URL) ) importMW('AbuseLog')


$(function(){

 //select box: append values to descriptions; was: "Normalise", will be: "Normalise (norm)"
 var key
 $('#wpFilterBuilder').find('option').each( function(i, opt){
     key = /^[a-z\d_]+/.exec(opt.value)
     if( !key ) return
     key = key[0]
     if( opt.text.indexOf(key) == -1 )
       opt.text = opt.text + ' ('+key+')'
     if( opt.title == '' ) opt.title = opt.value
 })

 //text boxes: auto resize
 $('#wpFilterRules, #wpFilterNotes, #wpTestFilter')
 .keyup( autoResizeTBox )
 .each ( autoResizeTBox )
 
})


//400 px ix max height
function autoResizeTBox(){
  var hh = Math.min( 400, Math.max(this.scrollHeight, this.clientHeight) )
  if (hh > this.clientHeight) this.style.height = hh + 'px'
}