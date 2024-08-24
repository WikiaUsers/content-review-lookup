// Recargar Chat
function recargar()
{
  location.reload();
}

// Reglas del chat
function reglas() {
    $.showCustomModal( 'Normas del chat', '<h3>Reglas del chat</h3><ul><li>El chat utilizar� el m�todo de <span style="font-style: italic;">kicks</span>. Al cometer una falta a las normas del chat, se dar� un <span style="font-style: italic;">kick</span> despu�s de haber ignorado una advertencia dada por la administraci�n; a los tres kicks consecutivos se banear� al usuario, elimin�ndolo por un tiempo determinado.</li><li><span style="font-style: bold;">No hacer flood:</span> Esto tambi�n se aplica en las siguientes acciones: Repetir un emotic�n cuatro veces o poner emoticones en cadena / mensaje m�s de cinco veces, escribir m�s de cinco mensajes / l�neas seguidos(as), escribir cinco letras / n�meros / car�cteres m�s de cinco vcees seguidas. Tambi�n se incluye el salir y entrar escesivamente al chat.</li><li><span style="font-style: bold;">Moderar el vocabulario:</span> Significa que no debes insultar a otro usuario, a menos que �l y t� sepan que no lo quieres ofender y el mensaje est� enviado de broma. Los insultos utilizados en un pa�s o celebridad no est�n prohibidos pero si las groser�as. Puedes censurar tus palabras reemplazando las vocales por aster�scos, lo que no puedes hacer es reemplazar toda la palabra con signos, ya que es considerado como flood.</li><li>Procura escribir de una manera que sea entendible hacia los otros usuarios presentes. Lo m�s recomendable es escribir adecuadamente y con uso de una buena ortograf�a.</li><li>Procura no abusar de los c�digos de "ChatTags" (ejemplo: el mismo video de Youtube repetido 40 veces).</li><li>Procura no tener actitudes abusivas o provocativas a otros usuarios. Procura no usar las groser�as como medio de insulto a otro/s usuario/s.</li><li><span style="font-style: bold;">No publicar spam:</span> A esto se le aplica poner enlaces a p�ginas que te ayuden a beneficiarte econ�micamente o que no est�n aprovadas con el permiso previo de un administrador (excepci�n: links hacia otras wikis o a Wikipedia o cualquier sitio Wikimedia, adem�s de las redes sociales e imagenes).</li><li>Est� prohibido entrar al chat con varias <span style="font-style: italic;">cuentas t�teres</span>.</li><li>No discutir sobre temas que puedan llevar a un desacuerdo y un debate que concluya en peleas, como la pol�tica y la religi�n.</li><li>Queda estrictamente prohibido las peleas por discusi�n de problemas de otras comunidades en el chat p�blico. Si no se trasladan a mensaje privado, ambos usuarios ser�n baneados.</li><li>Est� prohibido subir cualquier material (ya sea visual (fotos), audiovisual (v�deos) o simplemente audio (reproductores MP3 y alg�n archivo de sonido)) relacionado con el t�pico sexual o con contenidos ilegales.</li><li>No compartir informaci�n personal con otros usuarios, en caso de hacerlo, no nos hacemos responsables puesto que se va a tomar como sabido el hecho de no hacer esto.</li><li>Se permite hablar en otro idioma, pero no abuse de este (utilizar m�s de tres l�neas / mensajes con ese u cualquier otro idioma), ya que los usuarios podr�an no comprender lo que dice y puede resultar molesto.</li><li>No se permite escribir m�s de tres palabras en may�scula por mensaje, si quiere expresar su mensaje como si estuviese gritando, ponga los signos de exclamaci�n (� y !)</li><li><span style="font-style: bold;">No d� advertencias a los otros usuarios:</span> si ve que un usuario rompe una regla, contactar a la administraci�n. Si el usuario sigue rompiendo las reglas, deja un mensaje en el muro de un moderador o administrador (solo en el caso de que ninguno est� presente en el chat) dejando link a su perfil y, si es posible, una foto que muestre que estaba rompiendo las reglas.</li><li><span style="font-style: bold;">Para los moderadores del chat y administradores:</span> No abusar de su poder expulsando o baneando a un usuario sin un motivo que sea comprendible y se afirme ser real (con capturas, a pesar de que pueden ser f�cilmente editadas).</li><li><span style="font-weight: bold;">Cualquier duda sobre las reglas, puedes preguntarle a los administradores presentes.</span></li>', {
	    id: "reglas",
	    width: 600,
	    height: 430,
	    buttons: [
		{
			id: "cancel",
		    message: "Reglas de Los vecinos Green Wiki",
		    handler: function () {
				window.open('/wiki/project:Reglas','_blank');
		    }
		},
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                         var dialog = $('#reglas');
	                         dialog.closeModal();
		    }
	    }
		]
	});
}

// Sonido de notificaci�n

$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[Apagado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sonido de notificaci�n [Apagado]") {
            $('.sonidonotificacion a').html('Sonido de notificaci�n <span style="color:lime;">[Encendido]</span>');
        } else {
            $('.sonidonotificacion a').html('Sonido de notificaci�n <span style="color:red;">[Apagado]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sonido de notificaci�n [Encendido]") {
			$("#notificacion")[0].play();
		}
    });

// Setear estado de ausencia
// Hacer que se reinicie al escribir y no al mover el mouse ni al cambiar la ventana.
    $(window).unbind('mousemove').unbind('focus');
});
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

// Etiquetas del chat
function chatTags(){
    $.showCustomModal( 'Formatos para texto', '<table class="chatTags" width="100%" cellspacing="2" cellpadding="2" style="text-align: center;"><tr><th colspan="3" style="font-size: 180%;"><a href="/wiki/w:c:dev:ChatTags">Etiquetas del chat</a> por <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a></td></tr><tr><th>C�digo a insertar</th><th>Ejemplo</th><th>Resultado</th></tr><tr><td colspan="2">[b]Texto en negritas[/b]</td><td><span style="font-weight: bold;">Texto en negritas</span></td></tr><tr><td>[bg="COLOR"]Texto con fondo[/bg]</td><td>[bg="red"]Texto con fondo rojo[/bg]</td><td><span style="background: red;">Texto con fondo rojo</span></td></tr><tr><td colspan="2">[big]Texto agrandecido[/big]</td><td><big>Texto agrandecido</big></td></tr><tr><td>[c="COLOR"]Texto de color[/c]</td><td>[c="green"]Texto verde[/c]</td><td><span style="color: green;">Texto verde</span></td></tr><tr><td>[font="LETRA FUENTE"]Texto con otra letra fuente[/font]</td><td>[font="Segoe Print"]Texto en Segoe Print[/font]</td><td><span style="font-family: Segoe Print;">Texto en Segoe Print</span></td></tr><tr><td colspan="2">[i]Texto en cursiva[/i]</td><td><span style="font-style: italic;">Texto en cursiva</span></td></tr><tr><td>[img="URL DE LA IMAGEN"]</td><td>[img="images4.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png"]</td><td><img src="https://images.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png" style="max-height: 200px; max-width: 200px;"></td></tr><tr><td colspan="2">[code]Texto desformateado[/code]</td><td><code>Texto desformateado</code></td></tr><tr><td colspan="2">[small]Texto achicado[/small]</td><td><small>Texto achicado</small></td></tr><tr><td colspan="2">[sub]Texto en sub�ndice[/sub]</td><td><sub>Texto en sub�ndice</sub></td></tr><tr><td colspan="2">[sup]Texto en super�ndice[/sup]</td><td><sup>Texto en super�ndice</sup></td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td><span style="text-decoration: underline;">Texto subrayado</span></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[youtube="C�DIGO DE V�DEO"]</td><td>[youtube="dQw4w9WgXcQ"]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/dQw4w9WgXcQ?autohide=1&rel=0" frameborder="0" allowfullscreen /></td></tr><tr><td colspan="2">[spoiler]Texto con spoilers[/spoiler]</td><td><button id="spoil">Show spoiler</button>&nbsp;<span id="spoil2" style="display: none">Texto con spoilers</span></td></tr><tr><td colspan="3"><ul><li>Recuerda siempre cerrar las etiquetas que deben cerrarse.</li><li>El c�digo del v�deo es el que hay despu�s de <span style="font-style: italic;">v=</span> en la URL. Por ejemplo: si el v�deo es <code><nowiki>https://www.youtube.com/watch?v=oB2-vnxy8U8&t=6m22s</nowiki></code>, solo insertar�s <span style="font-weight: bold; font-style: italic;">oB2-vnxy8U8</span></li><li>Al insertar una imagen, debes borrar los http:// y no debe aparecer nada despu�s del formato de imagen (jpg, png, gif, etc.), o la imagen no aparecer�.</li><li>Las im�genes de Facebook no se permiten por defecto; y las de Wikia se deben transformar los links "static" y "vignette" a uno que contenga "images". Ejemplo: de el link <code><nowiki>https://vignette.wikia.nocookie.net/regularshow/images/6/6a/Gordoinvisible.gif/revision/latest?cb=20160116012413&path-prefix=es</nowiki></code> tendr� que quedar esto: <code><nowiki>images1.wikia.nocookie.net/regularshow/es/images/6/6a/Gordoinvisible.gif</nowiki></code></ul></td></tr></table>', {
	    id: "chatTags",
	    width: 700,
        height: 430,
	    buttons: [
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                        var dialog3 = $('#chatTags');
	                        dialog3.closeModal();
		    }
	    }
		]
	});
}
	
// Limpiar chat
function limpiarChat() {
	$('.Chat ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('.Chat ul').append('<div class="inline-alert">Chat limpiado</div>');
	setTimeout(function(){
		$('.Chat ul div').fadeOut(500,function(){
			$(this).remove();
		});
	}, 5000);
}