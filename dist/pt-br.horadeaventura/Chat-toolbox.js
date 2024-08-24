importScriptPage('MediaWiki:Chat.js/insertAtCaret.js');
importScriptPage('MediaWiki:Chat.js/listaEmoticons.js');


//Cabe�alho do chat. Cr�ditos � RuneScape Wiki EN. Lembre-se de escapar simples cita��es no cabe�alho usando \' para evitar que isso quebre.
var chatTopic = '<ul> <li class="button hoverbutaun" onclick="ListaEmoticones();" style=" border: 1px solid transparent; margin:auto; cursor: pointer; font-size:150%; padding-bottom:2px; width: 90%; border-radius: 0;" align="center" title="Lista de Emoticons">Emoticons</li><li class="button hoverbutaun" onclick="ReglasChat();" style=" border: 1px solid transparent; margin:auto; cursor: pointer; font-size:150%; padding-bottom:2px; width: 90%; border-radius: 0;" align="center" title="Regras do chat">Regras</li> <li class="button hoverbutaun" onclick="LimpiarChat();" style=" border: 1px solid transparent; margin:auto; cursor: pointer; font-size:150%; padding-bottom:2px; width: 90%; border-radius: 0;" align="center" title="Limpar o chat">Limpar</li> <li class="button hoverbutaun" onclick="toggleAway();" style=" border: 1px solid transparent;  margin:auto; cursor: pointer; font-size:150%; padding-bottom:2px; width: 90%; border-radius: 0;" align="center" title="Ficar ausente"> Ausente </li><li  class="button hoverbutaun" onclick="ChatTags();" style=" border: 1px solid transparent; margin:auto; cursor: pointer; font-size:150%; padding-bottom:2px; width: 90%; border-radius: 0;" align="center" title="Personaliza��o do texto"> ChatTags </li></ul> </div>'
 
$(function() {
	$('#Rail').prepend('<div class="chattopic" style="text-align: center; position: inherit; z-index: 0; font-size: 7pt;width: 95%;bottom: 0;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/* Reglas del chat */
function ReglasChat() {
    $.showCustomModal( 'Normas do Chat', '<div style="overflow-y: scroll;height: 670px;"><h2>Regras Gerais</h2>Na Wiki Hora de Aventura, o chat � um ponto de encontro de todos os usu�rios, que se re�nem para falar dos mais variados assuntos. Mesmo sendo uma �tima ferramenta de intera��o, a wiki possui regras que devem ser seguidas em rela��o ao chat para que o mesmo se encontre sempre bem preservado. </br> � importante que todos saibam que quaisquer descumprimentos das regras abaixo pode levar a uma puni��o, dependendo da situa��o que deve ser analisada pela equipe administrativa.<ul><li><b>Seja educado:</b> Todos que est�o online no chat tamb�m s�o usu�rios da Wikia! Trate-os como voc� quer ser tratado. Os usu�rios s�o pessoas reais, portanto fale normalmente como se voc� estivesse com eles cara a cara. N�o ofenda ningu�m, seja excelente para todos.</br> <li><b>Seja acolhedor: </b> Novos usu�rios se juntam � wiki todos os dias, portanto � importante deixar uma boa primeira impress�o! D� logo as boas vindas e se apresente para os novatos.</li> <li> N�o fa�a spam ou flood: � comum entre os novatos repetir o mesmo termo ou caractere v�rias vezes para ter a aten��o dos outros usu�rios. Tente evitar esse comportamento. Usar a tecla Caps Lock a partir de seis vezes tamb�m pode ser um inc�modo para os outros usu�rios. Usar as ChatTags abusivamente tamb�m pode ser ruim. </li> <li> <b>Seja da paz: </b> N�o provoque ou insulte outros usu�rios para causar discuss�es. O chat � uma ferramenta de conversa��o pac�fica e deve ser livre de quaisquer brigas ou conflitos. </li> <li>Sem conte�do impr�prio:</b> Grande parte dos usu�rios da Wiki Hora de Aventura � menor de 18 anos, por isso evite postar conte�do ou assuntos impr�prios para menores no chat. Links suspeitos contendo v�rus, arquivos .swf ou que redirecionam para sites duvidosos devem tamb�m ser evitados. Palavr�es s�o permitidos apenas durante o per�odo da madrugada (meia-noite �s cinco da manh�, no Hor�rio de Bras�lia), e seu uso fora do hor�rio permitido, mesmo normais ou censurados, gera banimento de uma semana.</li> <li> <b>Seja voc� mesmo:</b> Se voc� j� tem uma conta registrada na wiki, voc� n�o deve criar outras para frequentar o chat. Fingir ser outra pessoa tamb�m � um comportamento indesejado, portanto sempre frequente o chat com a sua conta de sempre. Se voc� quiser come�ar a usar outra conta, avise a algum administrador para que n�o pensemos que voc� � uma conta de ataque. </li> <li> <b> Respeite os moderadores:</b> O chat sempre � frequentado por administradores, eles s�o muito importantes para manter o ambiente livre de quaisquer inc�modos. Assim como todo usu�rio, voc� tamb�m deve respeitar os moderadores - eles sempre trabalham numa melhor experi�ncia na wiki.</li> <li><b>Mantenha a divers�o:</b> O principal objetivo do chat, al�m da intera��o dos usu�rios, � o entretenimento, portanto procure sempre participar de discuss�es amig�veis sobre Hora de Aventura ou algum outro assunto.</li></div>', {
	    id: "normasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Regras de BONITOPIA",
		    handler: function () {
				window.open('/wiki/Hora de Aventura: Regras do Chat','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Fechar",
			handler: function () {
	                         var dialog = $('#normasChat');
	                         dialog.closeModal();
		    }
	    }
		]
	});
}
/* Limpiar Chat  */
function LimpiarChat() {
	$('.Chat ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('.Chat ul').append('<div class="inline-alert">O Chat Foi Limpo com Sucesso</div>');
	setTimeout(function(){
		$('.Chat ul div').fadeOut(500,function(){
			$(this).remove();
		});
	}, 5000);
}
 
/* Lista de emoticones */
function ListaEmoticones(){
    $.showCustomModal( 'Lista de Emoticons', '<div style="height: 670px;" id="listadeemoticones"><img src="https://images.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
	    id: "listaEmoticones",
	    width: 600,
        height: 800,
	    buttons: [
		{
			id: "Cancelar",
		    message: "Avan�ado",
		    handler: function () {
				window.open('http://pt-br.horadeaventura.wikia.com/wiki/Hora_de_Aventura_Wiki:Emojis','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Fechar",
			handler: function () {
	                        var dialog = $('#listaEmoticones');
	                        dialog.closeModal();
		    }
	    }
		]
	});
}
 
/* Cancelar mensaje  */
$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});
 
function ChatTags(){
    $.showCustomModal( 'ChatTags', '<table border="1" bordercolor="#A3A3A3" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse;" width="100%" cellpadding="3" cellspacing="3"><tr style="background:#F2F2F2"><th>C�digo</th><th>Resultado</th></tr><tr><td>[b]Texto em negrito[/b]</td><td><span style="font-weight:bold;">Texto em negrito</span></td></tr><tr><td>[i]Texto em it�licoa[/b]</td><td><span style="font-style:italic;">Texto em it�lico</span></td></tr><tr><td>[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[u]Texto sublinhado[/u]</td><td><span style="text-decoration:underline;">Texto sublinhado</span></td></tr><tr><td>[c blue]Texto cor azul[/c]</td><td><span style="color:blue;">Texto cor azul</span></td></tr><tr><td>[f Comic Sans MS]Texto Comic Sans MS[/f]</td><td><span style="font-family:\'Comic Sans MS\'">Texto Comic Sans MS</span></td></tr><tr><td>[bg red]Texto con fondo rojo[/bg]</td><td><span style="background:red;">Texto con fondo rojo</span></td></tr><tr><td>[p]Texto pr�-formatado[/p]</td><td><code>Texto preformatado</code></td></tr><tr><td>[sup]Super-�ndice[/sup]</td><td><sup>Super�ndice</sup></td></tr><tr><td>[sub]Sub-�ndice[/sub]</td><td><sub>Sub�ndice</sub></td></tr><tr><td>[yt P8wrA14TWo0]</td><td>Videos do Youtube</td></tr><tr><td>[img http://goo.gl/6wa8y4]</td><td>Para adicionar imagens</td></tr></table>', {
	    id: "ChatTags",
	    width: 600,
	    buttons: [
		{
			defaultButton: true,
			message: "Fechar",
			handler: function () {
	                        var dialog3 = $('#ChatTags');
	                        dialog3.closeModal();
		    }
	    }
		]
	});
}
 
$(function() {
// Setear estado de ausencia, hacer que se reinicie al escribir y no al mover el mouse ni al cambiar la ventana.
    $(window).unbind('mousemove').unbind('focus');
// Agregar sombra
    $('<div class="sombra"></div>').insertBefore('#Chat_21');
});
 
 
 
NodeChatController.prototype.setAway = function (msg){
		if(!msg) {var msg = '';}
		$().log("Attempting to go away with message: " + msg);
		var setStatusCommand = new models.SetStatusCommand({
			statusState: STATUS_STATE_AWAY,
			statusMessage: msg
		});
		this.socket.send(setStatusCommand.xport());
	}
 
	function toggleAway(msg) {
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == true) {
			mainRoom.setBack();
		}
		else {
			mainRoom.setAway(msg);
		}
	}
	toggleAway.back = function() { //Force back status
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //Force away status
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}