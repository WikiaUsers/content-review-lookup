function obtenerEmoticons(){
var $chat = $('#listadeemoticones');
var $ul = $('<ul>', {'id': 'listaEmoticones'});
 
        $.ajax({
            'dataType': 'text',
                'data': {
                'title': 'MediaWiki:Emoticons',
                    'action': 'raw',
                    'ctype': 'text/plain'
            },
                'url': wgScript,
                'success': function (data) {
 
var removeReg = /\*+\s+/g;
var lines = data
  .replace(removeReg, '')
  .split('\n');
console.log(lines);
 
for (var i = 0; i < lines.length; i += 2) {
  $ul.append($('<li>')
             .append($('<img>', {src: lines[i]})).attr('data-atajo',lines[i+1])
      .append($('<span>', {text: lines[i+1]}))
    );
}
 
$chat.append($ul);
    $("#listaEmoticones li").click(function() {
        $("textarea[name='message']").insertAtCaret(" " + $(this).attr('data-atajo') + " ", "");
    });
 
                }
        });
}
 
function ListaEmoticones(){
    $.showCustomModal( 'Listado de emoticones', '<div id="listadeemoticones"><img src="https://images.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
	    id: "listaEmoticones",
	    width: 600,
            height: 400,
	    buttons: [
		{
			id: "cancel",
		    message: "Avanzado",
		    handler: function () {
				window.open('/wiki/MediaWiki:Emoticons','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                        var dialog = $('#listaEmoticones');
	                        dialog.closeModal();
		    }
	    }
		]
	});
}