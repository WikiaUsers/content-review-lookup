importScriptPage('MediaWiki:Chat.js/insertAtCaret.js', 'es.ben10');
importScriptPage('MediaWiki:Chat.js/Emotes.js');


/* Regras do Chat */
function RegrasdoChat() {
    $.showCustomModal( 'Encanamentos Max - Regras do Chat', '<h2 style="border-bottom:solid 3px #038307;font-size: 20px;font-family: Oswald;margin-top: 11px;overflow: hidden;padding: 0.3em 0.3em;text-transform: uppercase;color: #038307;">Regras:</h2><br><ul style="overflow-y:scroll;height: 520px;"><li><b>Seja educado:</b> Todos que est�o online no chat tamb�m s�o usu�rios da Wikia! Trate-os como voc� quer ser tratado. Os usu�rios s�o pessoas reais, portanto fale normalmente como se voc� estivesse com eles cara a cara. Nada de palavr�es, ofensas ou insultos, isso pode deixar o ambiente de intera��o pesado ou desinteressante. Seja excelente para todos.</li><br><li><b>Seja acolhedor:</b> Novos usu�rios se juntam � wiki todos os dias, portanto � importante deixar uma boa primeira impress�o! D� logo as boas vindas e se apresente para os novatos como todos fizeram quando voc� entrou no chat pela primeira vez.</li><br><li><b>N�o fa�a spam:</b> � comum entre os novatos ou veteranos repetir o mesmo termo v�rias vezes para ter a aten��o dos outros usu�rios. Isso pode ser desagrad�vel e quebrar o ambiente interativo, portanto tente evitar esse comportamento. Usar a tecla caps lock sem interrup��o tamb�m pode ser um inc�modo para os outros usu�rios.</li><br><li><b>Sem conte�do impr�prio:</b> Grande parte dos usu�rios do Encanamentos Max � menor de 18 anos, por isso evite falar ou postar conte�do impr�prio no chat. Links suspeitos contendo v�rus, arquivos .swf ou que redirecionam para sites duvidosos devem tamb�m ser evitados.</li><br><li><b>Seja voc� mesmo:</b> Se voc� j� tem uma conta registrada na wiki, voc� n�o deve criar outras para frequentar o chat. Fingir ser outra pessoa tamb�m � um comportamento indesejado, portanto sempre frequente o chat com a sua conta de sempre. Se voc� quiser come�ar a usar outra conta, pe�a permiss�o ao Alto Conselho para que voc� possa passar a entrar no chat com esta nova.</li><br><li><b>Respeite os superiores:</b> O chat sempre � frequentado por magistrados e gr�o-mestres, eles s�o muito importantes para manter o ambiente livre de quaisquer inc�modos. Assim como todo usu�rio, voc� tamb�m deve respeitar os superiores - eles sempre trabalham numa melhor experi�ncia na wiki.</li><br><li><b>Mantenha a divers�o:</b> O principal objetivo do chat, al�m da intera��o dos usu�rios, � o entretenimento, portanto procure sempre participar de discuss�es amig�veis sobre Ben 10 ou algum outro assunto.</li></ul>', {
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
		    message: "Avan�ado",
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
    $.showCustomModal( 'C�digos de formato', '<a target="_blank" href="/wiki/w:c:dev:ChatTags">ChatTags</a> criado por <a target="_blank" href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a><br /> <table border="1" bordercolor="#A3A3A3" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse;" width="100%" cellpadding="3" cellspacing="3"><tr style="background:#F2F2F2"><th>C�digo</th><th>Resultado</th></tr><tr><td>[b]Texto em negrito[/b]</td><td><span style="font-weight:bold;">Negrito</span></td></tr><tr><td>[i]Texto en it�lica[/b]</td><td><span style="font-style:italic;">It�lico</span></td></tr><tr><td>[s]Linha[/s]</td><td><span style="text-decoration: line-through">Linha</span></td></tr><tr><td>[u]Sublinhado[/u]</td><td><span style="text-decoration:underline;">Sublinhado</span></td></tr><tr><td>[c blue]Cor (exemplo)[/c]</td><td><span style="color:blue;">Cor</span></td></tr><tr><td>[f Comic Sans MS]Fonte[/f]</td><td><span style="font-family:\'Comic Sans MS\'">Fonte</span></td></tr><tr><td>[bg red]Cor do Fundo[/bg]</td><td><span style="background:red;">Cor do Fundo</span></td></tr><tr><td>[p]Pr�-Formata��o[/p]</td><td><code>Pr�-Formata��o</code></td></tr><tr><td>[sup]Sobrescrito[/sup]</td><td><sup>Sobrescrito</sup></td></tr><tr><td>[sub]Subscrito[/sub]</td><td><sub>subscrito</sub></td></tr></table>', {
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
// Sonidos de notificaci�n
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