// Crédito para Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Bem-vindo a academia Exonaut.
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color: #7CFC00">'Seja bem vindo a wiki Project Exonaut,criada por [[User:Ultragustavo25|Ultragustavo25]]'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()