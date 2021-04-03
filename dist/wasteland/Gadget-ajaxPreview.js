/* <nowiki> */

/**
 * ajaxPreview
 * Source: http://en.wikipedia.org/wiki/User:Js/ajaxPreview
 * Slightly altered:
 *    1) Original script consists of two pages; combined these into one.
 *    2) Added support for collapsible elements & sortable tables in preview.
 *    3) Made compatible with ResourceLoader.
 *    4) Removed loading syntaxhighlight CSS from en.wikipedia (moved to MediaWiki:Gadget-ajaxPreview.css).
 *    5) Removed diff CSS from bits.wikimedia.org (loading local diff CSS instead).
 */

window.ajaxPreviewPos = 'bottom'

/* ajaxPreview.js
 * Source: http://en.wikipedia.org/wiki/User:Js/ajaxPreview.js
 */

jQuery(function($) {

window.ajaxPreviewMsg =
{emptydiff: 'No changes'
,difftip: 'shift-click the button to show changes compared to this old version'
,diff2old: 'comparison to old version'
,viewtip: 'shift-click the button to update interwiki and categories as well\
 (<a href="//en.wikipedia.org/wiki/User:Js/ajaxPreview#Preview" target=_blank>more</a>)'
}
 
 
function ajaxPreviewButtons(){
 
 var ajaxPreviewPos = window.ajaxPreviewPos || 'right'
 
 if( ajaxPreviewPos != 'bottom' ){
   var previewToolbar = $('<div style="float:'+ajaxPreviewPos+'" />')
   if( $.wikiEditor ){
      $('#wikiPreview').after('<div style="width:100%; clear:both" />', previewToolbar)
   }else{
     var el = $('#toolbar')
   if( el.length ) el.prepend(previewToolbar)
   else $('#editform').before(previewToolbar)
   }
 }
 
 addBtn(window.ajaxPreviewButton, 'wpPreview', window.ajaxPreviewKey || 'p')
 
 if( wgArticleId )
   addBtn(window.ajaxDiffButton, 'wpDiff', window.ajaxDiffKey || 'v')
 
 function addBtn(name, id, akey){
  var btnOld = $('#'+id)
  if( !btnOld ) return
  var btn = $('<input type=button id="'+id+'Live" title="'+btnOld.val() + ' (ajax)" />')
  if( ajaxPreviewPos == 'bottom' ){
    btn.val( btnOld.val() ).insertBefore( btnOld.val('>') )
  }else{
    if( !name ){ //extract last word from standard buttons
      var name = btnOld.val(); var i = name.lastIndexOf(' ') + 1
      name = name.substring(i, i+1).toUpperCase() + name.substring(i+1)
    }
    btn.val(name).css({height:'22px', padding:'0 1px'}).appendTo(previewToolbar)
  }
  if( akey ){ //reassign acces key
    if( btnOld.attr('accesskey') == akey )
      btnOld.removeAttr('accesskey').attr('title', btnOld.attr('title').replace(tooltipAccessKeyRegexp, '') )
  btn.attr('accesskey', akey).attr('title', btn.attr('title') + ' ['+tooltipAccessKeyPrefix+akey+']' )
  }
 }
}
 

 
if( /^(edit|submit)$/.test(wgAction) && wgCanonicalNamespace != 'Special' ){
  ajaxPreviewButtons()

/* preview2.js
 * Source: http://en.wikipedia.org/wiki/User:Js/preview2.js
 */

ajaxPreview = new function(){


var wkPreview  = $('#wikiPreview'), frm = document.editform
if (!wkPreview.length || !frm) return
$('#wpPreviewLive, #wpDiffLive').click(run)

var cssWait, cssDiff, cssPreview, cssOutdated
var isDiff, isFullPreview, btn, oldHeight, htm, scriptTip
var mm = window.ajaxPreviewMsg || {}


function run (e){

 btn = $(this)
 btn.width( btn.outerWidth() ).attr('orig', btn.val())
 btn.val('...')
 
 $('#wikiDiff, #newarticletext').hide()
 oldHeight = wkPreview.height()
 scriptTip = ''
 
 if (!cssWait) cssWait = mw.util.addCSS('#wikiPreview {opacity: 0.3; color:gray} body {cursor:wait }')
 else cssWait.disabled = false

 var url = wgScriptPath + '/api.php?format=json', data, ext
 var txt = frm.wpTextbox1.value

 isDiff = btn.attr('id') == 'wpDiffLive'

 if (isDiff){

   if( !cssDiff ) cssDiff = importStylesheetURI(wgScriptPath + '/load.php?modules=mediawiki.action.history.diff&only=styles')

   url += '&action=query&prop=revisions'
   data = { titles: wgPageName.replace(/_/g,' '),  rvdifftotext: txt}

   if (frm.wpSection.value) url += '&rvsection=' + frm.wpSection.value

   if (frm.oldid.value && frm.oldid.value != '0'){ //can compare to currently edited older version, not to the latest
     if (e.shiftKey)  {
       url += '&rvstartid=' + frm.oldid.value + '&rvendid=' + frm.oldid.value
       scriptTip = mm.diff2old
     }  
     else scriptTip = mm.difftip
   }
   
 }else{ //preview

   if (frm.wpSection.value) txt += '<br /><references />'

   if ( (wgNamespaceNumber==2 || wgNamespaceNumber==8) && (ext = /\.(js|css)$/.exec(wgTitle)) ){
      txt = '<syntaxhighlight lang="' + (ext[1]=='js'?'javascript':'css') + '">' + txt + '</'+'syntaxhighlight>'
   }
  
   url += '&action=parse&pst=&disablepp=&prop=text'
   data = { title: wgPageName, text: txt, summary: frm.wpSummary.value}

   if (window.ajaxPreviewFull || e.shiftKey){
     isFullPreview = true
     url += '|categorieshtml|languageshtml|templates'
   }else{
     isFullPreview = false
     if (wgNamespaceNumber==0) scriptTip = mm.viewtip
   }
 
 }

 //switch to multipart to decrease sent data volume on non-latin languages
 var boundary = '--------123xyz' + Math.random(), dat2 = ''
 for (var nm in data) dat2 += '--' + boundary + '\nContent-Disposition: form-data; name="'+nm+'"\n\n' + data[nm] + '\n'

 //send
 $.ajax({
  url: url,
  type: 'post',
  data : dat2 + '--' + boundary,
  contentType: 'multipart/form-data; charset=UTF-8; boundary='+boundary,
  success: receive
 })

}//run



function receive(resp){

  cssWait.disabled = true
  btn.val(btn.attr('orig'))
  if (window.currentFocused) currentFocused.focus()
 
  htm = ''
 
  try {
    if (isDiff){
      htm = resp.query.pages[wgArticleId].revisions[0].diff['*']
      if (htm)
        htm = '<table class=diff>'
         +'<col class=diff-marker><col class=diff-content><col class=diff-marker><col class=diff-content>'
         + htm + '</table>'
      else
        htm = mm.emptydiff
    }else{
	  resp = resp.parse
      htm = resp.text['*']
      if (frm.wpSection.value == 'new'){ //add summary as H2
        htm = '<h2>' + resp.parsedsummary['*'] + '</h2>' + htm
      }else{
        var $sum = $(frm).find('div.mw-summary-preview') //create summary preview if needed
        if (!$sum.length) $sum = $('<div class=mw-summary-preview />').insertAfter('#wpSummary')
        $sum.html('<span class=comment>'+resp.parsedsummary['*']+'</span>')
      }
    }
  }catch (err) {  var htm = 'error: ' + err } 

  htm = 
   (scriptTip ?
     '<small style="float:right; border:1px dotted gray; padding:0 1em"><span style="color:red">!</span> '
     +scriptTip+'</small>' : '')
   + '<h3 id=ajax-preview-h3>'+btn.val()+' (ajax)</h3><hr>' // font-style:italic; text-align:right
   + htm
  wkPreview.html(htm).show()

  if (window.ajaxPreviewScrollTop) wkPreview[0].scrollIntoView()
  else $(window).scrollTop( $(window).scrollTop() + wkPreview.height() - oldHeight ) 

  if (!isDiff) finalizePreview(resp)

}




function finalizePreview(resp){

  if (!cssPreview) cssPreview =  mw.util.addCSS('span.editsection {display:none} .hiddencats {opacity:0.5}')  // demonstrate that hiddencats will not be updated
 
  if ($('#wikiPreview .mw-collapsible').length) {
     $('#wikiPreview .mw-collapsible').makeCollapsible();
  }
  if (window.ajaxPreviewExec) {
    ajaxPreviewExec(wkPreview[0])
  }
  if ($('#wikiPreview table.sortable').length) {
    mw.loader.using('jquery.tablesorter', function() {
      $('#wikiPreview table.sortable').tablesorter();
    });
  }

  if (!isFullPreview){
    if (!cssOutdated) cssOutdated = mw.util.addCSS('.templatesUsed, #p-lang, #catlinks {opacity:0.5}')
    else cssOutdated.disabled = false
    //$('#p-lang, #catlinks').attr('title', 'Not updated by latest preview')
    return
  }

  //otherwise update other areas
  if (cssOutdated) cssOutdated.disabled = true

  $('#catlinks').replaceWith(resp.categorieshtml['*'])

  htm = resp.languageshtml['*']
  var plang = $('#p-lang')
  if (!plang.length)
    plang = $('#p-tb').clone(true).attr('id','p-lang').insertAfter('#p-tb')
           .find('h5').text( htm.replace(/[:<].+$/,'') ).end()
  plang.find('ul').html(
    '<li>' + htm.replace(/^[^<]*/,'').replace(/<\/a>[^<]+/g,'</a></li><li>') + '</li>'
  )

  htm = ''
  var tt = resp.templates
  for (var i=0; i<tt.length; i++)
    htm += '<li><a href="/wiki'+encodeURIComponent(tt[i]['*'])+'"'
    + (typeof tt[i].exists == 'string' ? '' : ' class=new')
    + '>' + tt[i]['*'] + '</a></li>'
  $('#editform').find('div.templatesUsed').find('ul').html(htm)
 
 }


}

}

});

/* </nowiki> */