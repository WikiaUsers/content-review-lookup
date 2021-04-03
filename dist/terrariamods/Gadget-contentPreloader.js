$.when( $.ready ).then(function() {
  // Document is ready.
  if(((mw.config.get('wgAction') != 'edit')&&(mw.config.get('wgAction') != 'submit'))||(mw.config.get('wgCanonicalNamespace')!='')||(mw.config.get('wgPageName').indexOf('/') === -1)||(mw.config.get('wgPageContentModel')) != 'wikitext'){
    return;
  }
  var $editarea = $('#wpTextbox1');
  if(!$editarea){
    return;
  }
  if(!$editarea.val()){
    $editarea.val("{{mod sub-page}}<!--DO NOT REMOVE THIS LINE! It is required for Mod sub-pages to work properly.-->\n");
  }
});