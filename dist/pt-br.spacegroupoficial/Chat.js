// Cr�dito para Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Seja bem-vindo a Base do Space Group. Regras e mais informa��es podem ser encontradas <a href="/wiki/Wiki Space group oficial:Pol�tica do Chat" target="_blank" title="Wiki Space group oficial:Pol�tica do Chat"><u>aqui</u></a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color: #0047AB">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()