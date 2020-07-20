function obtenerEmoticons(){
var $chat = $('#listadeemoticones');
var $ul = $('<ul style="height: 670px; border:none; overflow-y:scroll;">', {'id': 'listaEmoticones' });
 
        $.ajax({
            'dataType': 'text',
                'data': {
                'title': 'MediaWiki:Emoji.css',
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
             .append($('<div class="emoji">').attr('style',lines[i+2])).attr('data-atajo',lines[i+1])
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