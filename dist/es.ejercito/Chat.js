// Menú desplegable
var menuChat = '<ul class="dropdown"><li class="active">Herramientas <span>▼</span></li><li class="primero"><a target="_blank" href="/wiki/Ayuda:Chat">Tutorial</a></li><li><a target="_blank" href="/wiki/Grand_Theft_Encyclopedia:Políticas#Normas_del_Chat">Normas</a><li><a target="_blank" href="/wiki/MediaWiki:Emoticons">Emoticonos</a></li><li><a target="_blank" href="/wiki/Grand Theft Encyclopedia:Administración#Moderadores del chat>Moderadores</a></li><li><a target="_blank" href="/wiki/Especial:Registro de baneos del chat">Baneados</a></li><li><a target="_blank" href="/wiki/Grand Theft Encyclopedia:Vandalismo">Denunciar</a></li><li class="ultimo"><a href="#" onClick="location.reload();">Recargar chat</a></li></ul>'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align: center; position: absolute; margin: 0pt auto; width: 100%; font-size: 15px; color: black;">'+menuChat+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

var menu = $("ul.dropdown");

$(this.document).ready(function(){
	menu.mouseover(function(){
		displayOptions($(this).find("li"));
	});
	menu.mouseout(function(){
		hideOptions($(this));
	});
})

function displayOptions(e){
	e.show();
}

function hideOptions(e){
	e.find("li").hide();
	e.find("li.active").show();
}

// Crear comando /me
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me') {
			this.value = '* '+wgUserName;
		}
	}
}