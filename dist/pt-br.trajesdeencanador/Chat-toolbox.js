importScriptPage('MediaWiki:Chat.js/insertAtCaret.js', 'es.ben10');
importScriptPage('MediaWiki:Chat.js/Emotes.js');


/* Regras do Chat */
function RegrasdoChat() {
    $.showCustomModal( 'Encanamentos Max - Regras do Chat', '<h2 style="border-bottom:solid 3px #038307;font-size: 20px;font-family: Oswald;margin-top: 11px;overflow: hidden;padding: 0.3em 0.3em;text-transform: uppercase;color: #038307;">Regras:</h2><br><ul style="overflow-y:scroll;height: 520px;"><li><b>Seja educado:</b> Todos que estão online no chat também são usuários da Wikia! Trate-os como você quer ser tratado. Os usuários são pessoas reais, portanto fale normalmente como se você estivesse com eles cara a cara. Nada de palavrões, ofensas ou insultos, isso pode deixar o ambiente de interação pesado ou desinteressante. Seja excelente para todos.</li><br><li><b>Seja acolhedor:</b> Novos usuários se juntam à wiki todos os dias, portanto é importante deixar uma boa primeira impressão! Dê logo as boas vindas e se apresente para os novatos como todos fizeram quando você entrou no chat pela primeira vez.</li><br><li><b>Não faça spam:</b> É comum entre os novatos ou veteranos repetir o mesmo termo várias vezes para ter a atenção dos outros usuários. Isso pode ser desagradável e quebrar o ambiente interativo, portanto tente evitar esse comportamento. Usar a tecla caps lock sem interrupção também pode ser um incômodo para os outros usuários.</li><br><li><b>Sem conteúdo impróprio:</b> Grande parte dos usuários do Encanamentos Max é menor de 18 anos, por isso evite falar ou postar conteúdo impróprio no chat. Links suspeitos contendo vírus, arquivos .swf ou que redirecionam para sites duvidosos devem também ser evitados.</li><br><li><b>Seja você mesmo:</b> Se você já tem uma conta registrada na wiki, você não deve criar outras para frequentar o chat. Fingir ser outra pessoa também é um comportamento indesejado, portanto sempre frequente o chat com a sua conta de sempre. Se você quiser começar a usar outra conta, peça permissão ao Alto Conselho para que você possa passar a entrar no chat com esta nova.</li><br><li><b>Respeite os superiores:</b> O chat sempre é frequentado por magistrados e grão-mestres, eles são muito importantes para manter o ambiente livre de quaisquer incômodos. Assim como todo usuário, você também deve respeitar os superiores - eles sempre trabalham numa melhor experiência na wiki.</li><br><li><b>Mantenha a diversão:</b> O principal objetivo do chat, além da interação dos usuários, é o entretenimento, portanto procure sempre participar de discussões amigáveis sobre Ben 10 ou algum outro assunto.</li></ul>', {
	    id: "normasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Mais",
		    handler: function () {
				window.open('/wiki/Encanamentos_Max:Regras_do_Chat','_blank');
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
 
/* Limpar o Chat */
function LimpiarChat() {
	$('.Chat ul li').fadeOut(200,function(){
		$(this).remove();
	});
	setTimeout(function(){
		$('.Chat ul div').fadeOut(500,function(){
			$(this).remove();
		});
	}, 5000);
}
 
/* Emoticons */
function ListaEmoticones(){
    $.showCustomModal( 'Lista de Emoticons', '<div id="listadeemoticones"><img src="http://images3.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
	    id: "listaEmoticones",
	    width: 600,
            height: 400,
	    buttons: [
		{
			id: "cancel",
		    message: "Avançado",
		    handler: function () {
				window.open('/wiki/MediaWiki:Emoticons','_blank');
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
 
/* Cancelar Mensagem */
$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});
 
function ChatTags(){
    $.showCustomModal( 'Códigos de formato', '<a target="_blank" href="/wiki/w:c:dev:ChatTags">ChatTags</a> criado por <a target="_blank" href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a><br /> <table border="1" bordercolor="#A3A3A3" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse;" width="100%" cellpadding="3" cellspacing="3"><tr style="background:#F2F2F2"><th>Código</th><th>Resultado</th></tr><tr><td>[b]Texto em negrito[/b]</td><td><span style="font-weight:bold;">Negrito</span></td></tr><tr><td>[i]Texto en itálica[/b]</td><td><span style="font-style:italic;">Itálico</span></td></tr><tr><td>[s]Linha[/s]</td><td><span style="text-decoration: line-through">Linha</span></td></tr><tr><td>[u]Sublinhado[/u]</td><td><span style="text-decoration:underline;">Sublinhado</span></td></tr><tr><td>[c blue]Cor (exemplo)[/c]</td><td><span style="color:blue;">Cor</span></td></tr><tr><td>[f Comic Sans MS]Fonte[/f]</td><td><span style="font-family:\'Comic Sans MS\'">Fonte</span></td></tr><tr><td>[bg red]Cor do Fundo[/bg]</td><td><span style="background:red;">Cor do Fundo</span></td></tr><tr><td>[p]Pré-Formatação[/p]</td><td><code>Pré-Formatação</code></td></tr><tr><td>[sup]Sobrescrito[/sup]</td><td><sup>Sobrescrito</sup></td></tr><tr><td>[sub]Subscrito[/sub]</td><td><sub>subscrito</sub></td></tr></table>', {
	    id: "ChatTags",
	    width: 600,
            height: 490,
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
// Sonidos de notificación
        $('.sonidonotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="http://images.wikia.com/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Som [OFF]") {
            $('.sonidonotificacion a').html('Som <span style="color:lime;">[ON]</span>');
        } else {
            $('.sonidonotificacion a').html('Som <span style="color:red;">[OFF]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Som [ON]") {
			$("#notificacion")[0].play();
		}
    });
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