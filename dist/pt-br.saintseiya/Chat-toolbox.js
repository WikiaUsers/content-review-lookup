importScriptPage('MediaWiki:Chat.js/insertAtCaret.js', 'es.ben10');
importScriptPage('MediaWiki:Chat.js/listaEmoticons.js');
importScriptPage('ChatTags/code.js', 'dev');
 
/* Regras do Chat */
function RegrasdoChat() {
    $.showCustomModal( 'Saint Seiya Wiki - Regras do Chat', '<h2 style="border-bottom:solid 3px #9AC0CD;font-size: 20px;font-family: Oswald;margin-top: 11px;overflow: hidden;padding: 0.3em 0.3em;text-transform: uppercase;color: #9AC0CD;"><center>Regras</center></h2><br><ul style="overflow-y:scroll;height: 520px;"><li><b>Regras para Usuários:</b><br> *Links externos são permitidos, mas caso contenham vírus, pirataria, conteúdo sexual ou sites duvidosos serão motivo de banimento por 24 a 72 horas. Caso o Usuário continue com esses atos, ele será expulso do chat por tempo indeterminado.<br> *Xingamentos aos usuários são proibidos no chat. Caso isso ocorra, o usuário que xingou deverá ser chutado do Chat, porém se ele continuar com os Xingamentos, ele será banido por 24 horas. Caso o Usuário continue com esses atos, ele será expulso do chat por tempo indeterminado.<br>Ameaças são totalmente proibidas. Caso ocorra, o usuário que ameaçar sofrerá um banimento por tempo indeterminado.</li><br><li><b>Regras para Moderadores do Chat:</b><br> * Você deverá respeitar as regras acima, se não perderá o seu cargo.<br> * Sua tarefa é manter a ordem no chat, punindo usuários que desrespeitarem as regras acima. Se você não cumprir a tarefa, poderá voltar á ser um usuário comum.</li><br><li><b>Proibições:</b><br> * Vinculação Sexual: A violação desta, poderá fazê-lo imediatamente ser banido do chat e bloqueado a partir da wiki na sua totalidade.<br> * Comportamento ofensivo: Isto inclui o racismo, a intolerância religiosa, a homofobia, etc. Você pode receber um aviso de primeira, dependendo da gravidade da infração ou você pode ser banido imediatamente. Se você for banido.<br> * Xingamentos e Ameaças: manter linguagem limpa no mínimo. Sem xingamentos, sem ameaças, apenas mantê-la limpa.</li><br><li><b>Obs:</b>Você pode recuperar o privilégio de bate-papo se você demonstrar boa conduta e se o motivo da sua expulsão não for muito grave.</li></ul>', {
	    id: "normasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Mais",
		    handler: function () {
				window.open('/wiki/Universo_Ben_10:Regras_do_Chat','_blank');
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
/* Limpiar Chat */
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
 
/* Lista de emoticones */
function ListaEmoticones(){
    $.showCustomModal( 'Listado de emoticones', '<div id="listadeemoticones"><img src="https://images.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
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
 
/* Cancelar mensaje */
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
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
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