mw.hook('wikiEditor.toolbarReady').add(function(){
	$('head').prepend('<link rel="stylesheet" href="/load.php?modules=ext.fandom.wikiEditorFandomDesktop.css&only=styles">');
});

mw.hook('ve.activationComplete').add(function(){
	var docNode = $('.ve-ce-documentNode');
	docNode.addClass('mw-content-' + docNode.attr('dir') + ' mw-parser-output mw-show-empty-elt');
});