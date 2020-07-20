ajaxPreviewMsg =
{emptydiff: 'Изменений нет'
,difftip: 'shift-клик для сравнения с этой старой версией'
,diff2old: 'это сравнение со старой версией'
,viewtip: 'shift-клик кнопку для обновления также категорий и интервик\
 (<a href=/wiki/Википедия:Гаджеты/Ajax-предпросмотр#preview target=_blank>подробнее</a>)'
}


if( /^(edit|submit)$/.test(wgAction) && wgCanonicalNamespace != 'Special' )
$(function(){

 ajaxPreviewPos = window.ajaxPreviewPos || 'right'

 if( ajaxPreviewPos != 'bottom' ){
   var previewToolbar = $('<div style="float:'+ajaxPreviewPos+'" />')
   if( mw.user.options.get('usebetatoolbar') || $.wikiEditor ){
      $('#wikiPreview').after('<div style="width:100%; clear:both" />', previewToolbar)
   }else{
     var el = $('#toolbar')
     if( el.length ) el.prepend(previewToolbar)
     else $('#editform').before(previewToolbar)
   }
 }
 addBtn(window.ajaxPreviewButton, 'wpPreview', window.ajaxPreviewKey || 'p')
 addBtn(window.ajaxDiffButton, 'wpDiff', window.ajaxDiffKey || 'v')
 mw.loader.load('//en.wikipedia.org/w/index.php?title=User:Js/preview2.js&action=raw&ctype=text/javascript')

 function addBtn(name, id, akey){
  var btnOld = $('#'+id)
  if (!btnOld) return
  var btn = $('<input type=button id="'+id+'Live" title="'+btnOld.val() + ' (ajax)" />')
  if (ajaxPreviewPos == 'bottom'){
    btn.val( btnOld.val() ).insertBefore( btnOld.val('>') )
  }else{
    if (!name){ //extract last word from standard buttons
      var name = btnOld.val(); var i = name.lastIndexOf(' ') + 1
      name = name.substring(i, i+1).toUpperCase() + name.substring(i+1)
    }
    btn.val(name).css('height','22px').css('padding','0 1px').appendTo(previewToolbar)
  }
  if( akey && window.tooltipAccessKeyPrefix ){ //reassign acces key
    if (btnOld.attr('accesskey') == akey)
      btnOld.removeAttr('accesskey').attr('title', btnOld.attr('title').replace(tooltipAccessKeyRegexp, '') )
  btn.attr('accesskey', akey).attr('title', btn.attr('title') + ' ['+tooltipAccessKeyPrefix+akey+']' )
  }
 }
})