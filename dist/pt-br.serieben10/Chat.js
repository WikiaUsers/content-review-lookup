// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Bem-vindo ao chat do S�rie Ben 10. Regras e mais informa��es podem ser encontradas <a href="/wiki/S�rie Ben 10:Pol�tica do Chat" target="_blank" title="S�rie Ben 10:Pol�tica do Chat"><u>aqui</u></a>. FAQs <a href="/wiki/S�rie Ben 10:Pol�tica do Chat/FAQ" target="_blank" title="Diretrizes do Chat"><u>aqui</u></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color: #008B00">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()