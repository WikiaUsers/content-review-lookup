mw.hook('ve.activationComplete').add(function(){
	var docNode = $('.ve-ce-documentNode');
	docNode.addClass('mw-content-' + docNode.attr('dir') + ' mw-parser-output mw-show-empty-elt');
});