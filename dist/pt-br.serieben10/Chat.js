// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Bem-vindo ao chat do Série Ben 10. Regras e mais informações podem ser encontradas <a href="/wiki/Série Ben 10:Política do Chat" target="_blank" title="Série Ben 10:Política do Chat"><u>aqui</u></a>. FAQs <a href="/wiki/Série Ben 10:Política do Chat/FAQ" target="_blank" title="Diretrizes do Chat"><u>aqui</u></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color: #008B00">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()