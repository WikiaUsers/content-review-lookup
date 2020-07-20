//Cabeçalho do chat. Lembre-se de escapar simples citações no cabeçalho usando \' para evitar que isso quebre.
var chatTopic = 'Bem-vindo ao chat da Wikisimpsons.<br /><a href="/wiki/Wikisimpsons:Política_do_Chat" target="_blank" title="Wikisimpsons:Política do Chat" style="position:relative;text-decoration:underline;">Política do Chat</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

window.aliases = {};
function createAlias(alias, on, run) {
	window.aliases[alias] = function(e) {
		if (typeof on == 'number') on += '';
		if (typeof on == 'string') on = on.split(/[,\|]/);
		var val = this.value;
		if (on.indexOf(e.which+'')!=-1 && val.toLowerCase().search(new RegExp('/'+alias.toLowerCase()+'\\b')) == 0) {
			val = val.substr(alias.length+(val.charAt(alias.length+1)==' '?2:1));
			if (typeof run == 'string') this.value = run + ' ' + val;
			else if (typeof run == 'function') run(val, e);
			if (e.which!=13) e.preventDefault();
		}
	}
	$('[name="message"]').keypress(window.aliases[alias]);
}

/*Script que faz com que seja fácil de executar funções ao receber mensagens*/
importScript('MediaWiki:Chat.js/novamensagem.js');

/*Permitir que moderadores do chat e administradores expulsem usuários usando /expulsar <nome de usuário>*/
if (wgUserGroups.indexOf('chatmoderator')!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
	createAlias('expulsar', 13, function(toKick,e) {
		if ($('#WikiChatList [data-user="'+toKick+'"]').length) {
			mainRoom.kick({name: toKick})
		} else {
			if (confirm(toKick + ' não está neste chat. Ainda quer tentar expulsá-lo(a)?')) mainRoom.kick({name: toKick});
		}
		e.target.value = '';
	});
}