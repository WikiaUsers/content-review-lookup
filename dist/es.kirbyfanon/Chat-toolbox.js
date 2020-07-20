importScriptPage('ChatOptions/code.js', 'dev');
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
function recargar() {
	location.reload();
}
$(function(){
	$('[name="message"]').bind('keypress', function(e) {
		if(e.keyCode==27){
			e.preventDefault();
			$(this).val('');
		}
	});
});
function chatTags() {
    $.showCustomModal( 'Códigos de formato', '<a target="_blank" href="/wiki/w:c:dev:ChatTags">ChatTags</a> creado por el usuario <a target="_blank" href="/wiki/w:c:dev:User:AnimatedCartoons">AnimatedCartoons</a><br /><b>AVISO</b>: Los códigos siempre deben ser cerrados. <table border="1" bordercolor="#A3A3A3" style="margin:10px 0; background-color:#FAFAFA; border-collapse:collapse;" width="100%" cellpadding="3" cellspacing="3"><tr style="background:#F2F2F2"><th>Código</th><th>Resultado</th></tr><tr><td>[b]Texto en negrita[/b]</td><td><span style="font-weight:bold;">Texto en negrita</span></td></tr><tr><td>[i]Texto en itálica[/b]</td><td><span style="font-style:italic;">Texto en itálica</span></td></tr><tr><td>[s]Texto tachado[/s]</td><td><span style="text-decoration: line-through">Texto tachado</span></td></tr><tr><td>[u]Texto subrayado[/u]</td><td><span style="text-decoration:underline;">Texto subrayado</span></td></tr><tr><td>[c blue]Texto color azul[/c]</td><td><span style="color:blue;">Texto color azul</span></td></tr><tr><td>[font Comic Sans MS]Texto Comic Sans MS[/font]</td><td><span style="font-family:Comic Sans MS">Texto Comic Sans MS</span></td></tr><tr><td>[bg red]Texto con fondo rojo[/bg]</td><td><span style="background:red;">Texto con fondo rojo</span></td></tr><tr><td>[code]Texto preformateado[/code]</td><td><code>Texto preformateado</code></td></tr><tr><td>[sup]Texto en superscript[/sup]</td><td><sup>Texto en superscript</sup></td></tr><tr><td>[sub]Texto en subscript[/sub]</td><td><sub>Texto en subscript</sub></td></tr><tr><td>[big]Texto grande[/big]</td><td><big>Texto grande</big></td></tr><tr><td>[small]Texto pequeño[/small]</td><td><small>Texto pequeño</small></td></tr></table>', {
	    id: "ChatTags",
	    width: 600,
            height: 560,
	    buttons: [
		{
			defaultButton: true,
			message: "Cerrar",
			handler: function () {
	                        var dialog3 = $('#ChatTags');
	                        dialog3.closeModal();
		        }
	        }
	   ]
    });
}