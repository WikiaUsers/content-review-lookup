/* Règles du tchat */
function ReglasChat() {
    $.showCustomModal( 'Règles du tchat', '<ul><li>Le tchat n\'est pas une zone de non-droit. Certains bannissements sur le Tchat se font par paliers successifs.</li><li>Le tchat est un endroit de divertissement, d\'informations, de rigolade, qui peut être visité par des jeunes enfants mineurs. La diffusion d\'une image ou d\'un texte à caractère érotique/pornographique est strictement interdite.</li><li>Soyez respectueux des autres utilisateurs, un manque de respect peut être sanctionner.</li><li>Ne répondez pas aux provocations d\'autres utilisateurs et prévenez les administrateurs du wiki (ou les modérateurs du tchat) en cas de problème.</li><li>N\'insultez pas les autres utilisateurs.</li><li>Tout comportement raciste, homophobique ou autre du même genre est strictement interdit.</li>Le harcèlement est, lui aussi, interdit !<li></li>N\'écrivez pas en langage SMS ou phonétique. Faites attention à votre écriture (nos yeux vous remercient).<li></li>LE FLOOD AINSI QUE LE TROLL SONT STRICTEMENT INTERDITS !<li></li></ul>', {
	    id: "normasChat",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Règles de Picsou Wiki",
		    handler: function () {
				window.open('/wiki/Picsou_Wiki:Règlement','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Fermer",
			handler: function () {
	                         var dialog = $('#normasChat');
	                         dialog.closeModal();
		    }
	    }
		]
	});
}
/* Vider le tchat */
function LimpiarChat() {
	$('.Chat ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('.Chat ul').append('<div class="inline-alert">Tchat réinitialisé</div>');
	setTimeout(function(){
		$('.Chat ul div').fadeOut(500,function(){
			$(this).remove();
		});
	}, 5000);
}

/* Liste d'émoticones */
function ListaEmoticones(){
    $.showCustomModal( 'Liste d\'émoticones', '<div id="listadeemoticones"><img src="https://images.wikia.nocookie.net/pruebasbf10/es/images/c/c0/Blank.gif" onload="obtenerEmoticons()" style="display:none;" /></div>', {
	    id: "listaEmoticones",
	    width: 600,
            height: 400,
	    buttons: [
		{
			id: "cancel",
		    message: "Avancé",
		    handler: function () {
				window.open('/wiki/MediaWiki:Emoticons','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Fermer",
			handler: function () {
	                        var dialog = $('#listaEmoticones');
	                        dialog.closeModal();
		    }
	    }
		]
	});
}

/* Annuler message */
$(function(){
	$('textarea[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			$(this).val('');
		}
	});
});

function ChatTags(){
    $.showCustomModal( 'Codes de formatage', '<a target="_blank" href="/wiki/w:c:dev:ChatTags">ChatTags</a> créé par l\'utilisateur <a target="_blank" href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a><br /><b>Attention</b>: Les codes doivent toujours êtres fermés. <table border="1" bordercolor="#A3A3A3" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse;" width="100%" cellpadding="3" cellspacing="3"><tr style="background:#F2F2F2"><th>Code</th><th>Résultat</th></tr><tr><td>[b]Texte en gras[/b]</td><td><span style="font-weight:bold;">Texte en gras</span></td></tr><tr><td>[i]Texto en italique[/b]</td><td><span style="font-style:italic;">Texte en italique</span></td></tr><tr><td>[s]Texte barré[/s]</td><td><span style="text-decoration: line-through">Texte barré</span></td></tr><tr><td>[u]Texto souligné[/u]</td><td><span style="text-decoration:underline;">Texte souligné</span></td></tr><tr><td>[c blue]Texte de couleur bleu[/c]</td><td><span style="color:blue;">Texte de couleur bleu</span></td></tr><tr><td>[f Comic Sans MS]Texte Comic Sans MS[/f]</td><td><span style="font-family:\'Comic Sans MS\'">Texte Comic Sans MS</span></td></tr><tr><td>[bg red]Texte de fond rouge[/bg]</td><td><span style="background:red;">Texte de fond rouge</span></td></tr><tr><td>[p]Texte préformaté[/p]</td><td><code>Texte préformaté</code></td></tr><tr><td>[sup]Superindice[/sup]</td><td><sup>Superindice</sup></td></tr><tr><td>[sub]Subindice[/sub]</td><td><sub>Subindice</sub></td></tr></table>', {
	    id: "ChatTags",
	    width: 600,
            height: 490,
	    buttons: [
		{
			defaultButton: true,
			message: "Fermer",
			handler: function () {
	                        var dialog3 = $('#ChatTags');
	                        dialog3.closeModal();
		    }
	    }
		]
	});
}

$(function() {
// Sons de notification
        $('.sonidonotificacion a').append(' <span style="color:red;">[OFF]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sons de notification [OFF]") {
            $('.sonidonotificacion a').html('Sons de notification <span style="color:lime;">[ON]</span>');
        } else {
            $('.sonidonotificacion a').html('Sons de notification <span style="color:red;">[OFF]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sons de notification [ON]") {
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