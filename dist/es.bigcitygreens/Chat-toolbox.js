// Recargar Chat
function recargar()
{
  location.reload();
}

// Reglas del chat
function reglas() {
    $.showCustomModal( 'Normas del chat', '<h3>Reglas del chat</h3><ul><li>El chat utilizará el método de <span style="font-style: italic;">kicks</span>. Al cometer una falta a las normas del chat, se dará un <span style="font-style: italic;">kick</span> después de haber ignorado una advertencia dada por la administración; a los tres kicks consecutivos se baneará al usuario, eliminándolo por un tiempo determinado.</li><li><span style="font-style: bold;">No hacer flood:</span> Esto también se aplica en las siguientes acciones: Repetir un emoticón cuatro veces o poner emoticones en cadena / mensaje más de cinco veces, escribir más de cinco mensajes / líneas seguidos(as), escribir cinco letras / números / carácteres más de cinco vcees seguidas. También se incluye el salir y entrar escesivamente al chat.</li><li><span style="font-style: bold;">Moderar el vocabulario:</span> Significa que no debes insultar a otro usuario, a menos que él y tú sepan que no lo quieres ofender y el mensaje esté enviado de broma. Los insultos utilizados en un país o celebridad no están prohibidos pero si las groserías. Puedes censurar tus palabras reemplazando las vocales por asteríscos, lo que no puedes hacer es reemplazar toda la palabra con signos, ya que es considerado como flood.</li><li>Procura escribir de una manera que sea entendible hacia los otros usuarios presentes. Lo más recomendable es escribir adecuadamente y con uso de una buena ortografía.</li><li>Procura no abusar de los códigos de "ChatTags" (ejemplo: el mismo video de Youtube repetido 40 veces).</li><li>Procura no tener actitudes abusivas o provocativas a otros usuarios. Procura no usar las groserías como medio de insulto a otro/s usuario/s.</li><li><span style="font-style: bold;">No publicar spam:</span> A esto se le aplica poner enlaces a páginas que te ayuden a beneficiarte económicamente o que no estén aprovadas con el permiso previo de un administrador (excepción: links hacia otras wikis o a Wikipedia o cualquier sitio Wikimedia, además de las redes sociales e imagenes).</li><li>Está prohibido entrar al chat con varias <span style="font-style: italic;">cuentas títeres</span>.</li><li>No discutir sobre temas que puedan llevar a un desacuerdo y un debate que concluya en peleas, como la política y la religión.</li><li>Queda estrictamente prohibido las peleas por discusión de problemas de otras comunidades en el chat público. Si no se trasladan a mensaje privado, ambos usuarios serán baneados.</li><li>Está prohibido subir cualquier material (ya sea visual (fotos), audiovisual (vídeos) o simplemente audio (reproductores MP3 y algún archivo de sonido)) relacionado con el tópico sexual o con contenidos ilegales.</li><li>No compartir información personal con otros usuarios, en caso de hacerlo, no nos hacemos responsables puesto que se va a tomar como sabido el hecho de no hacer esto.</li><li>Se permite hablar en otro idioma, pero no abuse de este (utilizar más de tres líneas / mensajes con ese u cualquier otro idioma), ya que los usuarios podrían no comprender lo que dice y puede resultar molesto.</li><li>No se permite escribir más de tres palabras en mayúscula por mensaje, si quiere expresar su mensaje como si estuviese gritando, ponga los signos de exclamación (¡ y !)</li><li><span style="font-style: bold;">No dé advertencias a los otros usuarios:</span> si ve que un usuario rompe una regla, contactar a la administración. Si el usuario sigue rompiendo las reglas, deja un mensaje en el muro de un moderador o administrador (solo en el caso de que ninguno esté presente en el chat) dejando link a su perfil y, si es posible, una foto que muestre que estaba rompiendo las reglas.</li><li><span style="font-style: bold;">Para los moderadores del chat y administradores:</span> No abusar de su poder expulsando o baneando a un usuario sin un motivo que sea comprendible y se afirme ser real (con capturas, a pesar de que pueden ser fácilmente editadas).</li><li><span style="font-weight: bold;">Cualquier duda sobre las reglas, puedes preguntarle a los administradores presentes.</span></li>', {
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

// Sonido de notificación

$(function() {
        $('.sonidonotificacion a').append(' <span style="color:red;">[Apagado]</span>');
	$('#ChatHeader').append('<audio id="notificacion" preload="auto"><source src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg"></source></audio>');
    $('.sonidonotificacion').click(function() {
        if($('.sonidonotificacion a').text() == "Sonido de notificación [Apagado]") {
            $('.sonidonotificacion a').html('Sonido de notificación <span style="color:lime;">[Encendido]</span>');
        } else {
            $('.sonidonotificacion a').html('Sonido de notificación <span style="color:red;">[Apagado]</span>');
        }
    });
    $('.Chat ul').bind('DOMNodeInserted', function(event) {
        if($('.sonidonotificacion a').text() == "Sonido de notificación [Encendido]") {
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
    $.showCustomModal( 'Formatos para texto', '<table class="chatTags" width="100%" cellspacing="2" cellpadding="2" style="text-align: center;"><tr><th colspan="3" style="font-size: 180%;"><a href="/wiki/w:c:dev:ChatTags">Etiquetas del chat</a> por <a href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a></td></tr><tr><th>Código a insertar</th><th>Ejemplo</th><th>Resultado</th></tr><tr><td colspan="2">[b]Texto en negritas[/b]</td><td><span style="font-weight: bold;">Texto en negritas</span></td></tr><tr><td>[bg="COLOR"]Texto con fondo[/bg]</td><td>[bg="red"]Texto con fondo rojo[/bg]</td><td><span style="background: red;">Texto con fondo rojo</span></td></tr><tr><td colspan="2">[big]Texto agrandecido[/big]</td><td><big>Texto agrandecido</big></td></tr><tr><td>[c="COLOR"]Texto de color[/c]</td><td>[c="green"]Texto verde[/c]</td><td><span style="color: green;">Texto verde</span></td></tr><tr><td>[font="LETRA FUENTE"]Texto con otra letra fuente[/font]</td><td>[font="Segoe Print"]Texto en Segoe Print[/font]</td><td><span style="font-family: Segoe Print;">Texto en Segoe Print</span></td></tr><tr><td colspan="2">[i]Texto en cursiva[/i]</td><td><span style="font-style: italic;">Texto en cursiva</span></td></tr><tr><td>[img="URL DE LA IMAGEN"]</td><td>[img="images4.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png"]</td><td><img src="https://images.wikia.nocookie.net/regularshow/es/images/8/89/Wiki-wordmark.png" style="max-height: 200px; max-width: 200px;"></td></tr><tr><td colspan="2">[code]Texto desformateado[/code]</td><td><code>Texto desformateado</code></td></tr><tr><td colspan="2">[small]Texto achicado[/small]</td><td><small>Texto achicado</small></td></tr><tr><td colspan="2">[sub]Texto en subíndice[/sub]</td><td><sub>Texto en subíndice</sub></td></tr><tr><td colspan="2">[sup]Texto en superíndice[/sup]</td><td><sup>Texto en superíndice</sup></td></tr><tr><td colspan="2">[u]Texto subrayado[/u]</td><td><span style="text-decoration: underline;">Texto subrayado</span></td></tr><tr><td colspan="2">[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[youtube="CÓDIGO DE VÍDEO"]</td><td>[youtube="dQw4w9WgXcQ"]</td><td><iframe width="400" height="215" src="http://youtube.com/embed/dQw4w9WgXcQ?autohide=1&rel=0" frameborder="0" allowfullscreen /></td></tr><tr><td colspan="2">[spoiler]Texto con spoilers[/spoiler]</td><td><button id="spoil">Show spoiler</button>&nbsp;<span id="spoil2" style="display: none">Texto con spoilers</span></td></tr><tr><td colspan="3"><ul><li>Recuerda siempre cerrar las etiquetas que deben cerrarse.</li><li>El código del vídeo es el que hay después de <span style="font-style: italic;">v=</span> en la URL. Por ejemplo: si el vídeo es <code><nowiki>https://www.youtube.com/watch?v=oB2-vnxy8U8&t=6m22s</nowiki></code>, solo insertarás <span style="font-weight: bold; font-style: italic;">oB2-vnxy8U8</span></li><li>Al insertar una imagen, debes borrar los http:// y no debe aparecer nada después del formato de imagen (jpg, png, gif, etc.), o la imagen no aparecerá.</li><li>Las imágenes de Facebook no se permiten por defecto; y las de Wikia se deben transformar los links "static" y "vignette" a uno que contenga "images". Ejemplo: de el link <code><nowiki>https://vignette.wikia.nocookie.net/regularshow/images/6/6a/Gordoinvisible.gif/revision/latest?cb=20160116012413&path-prefix=es</nowiki></code> tendrá que quedar esto: <code><nowiki>images1.wikia.nocookie.net/regularshow/es/images/6/6a/Gordoinvisible.gif</nowiki></code></ul></td></tr></table>', {
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