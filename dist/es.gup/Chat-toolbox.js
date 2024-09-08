function ChatTags(){
    $.showCustomModal( 'ChatTags y sus usos', 'Los ChatTags se utilizan solo para el chat y hace que se adapten varios codigos, ejemplos<hr><code>[c="red"]Toluca es Rojo.[/c] -> <span style="color:red;">Toluca es Rojo.</span></code><br><code>[c="#FF0000"]Tambien Veracruz es Rojo.[/c] -> <span style="color:#FF0000;">Tambien Veracruz es Rojo.</span></code><br><code>[bg="red"]Fondo Rojo.[/bg] -> <span style="background:red;">Fondo Rojo.</span></code><br><code>[b]Liga MX en Negritas.[/b] -> <span style="font-weight:bold;">Liga MX en Negritas.</span></code><br><code>[c="red"][b]Toluca en Negritas y Rojo.[/b][/c] -> <span style="color:red;font-weight:bold;">Toluca en Negritas y Rojo.</span></code><hr><h3>Tags</h3><ul><li>Texto de color<ul><li><code>[c="<código de color>"]<mensaje>[/c]</code></li></ul></li><li>Color de fondo<ul><li><code>[bg="<código de color>"]<mensaje>[/bg]</code></li></ul></li><li>(Fuente)<ul><li><code>[font="<nombre de la fuente>"]<mensaje>[/font]</code></li></ul></li><li>Etiqueta code<ul><li><code>[code]<mensaje>[/code]</code></li></ul><li><li>Texto en negritas<ul><li><code>[b]<mensaje>[/b]</code></li></ul></li><li>Texto cursiva<ul><li><code>[i]<mensaje>[/i]</code></li></ul></li><li>Texto grande<ul><li><code>[big]<mensaje>[/big]</code></li></ul></li><li>Texto pequeño<ul><li><code>[small]<mensaje>[/small]</code></li></ul></li><li>Subscrito<ul><li><code>[sub]<mensaje>[/sub]</code></li></ul></li><li>Suprimido<ul><li><code>[sup]<mensaje>[/sup]</code></li></ul></li><li>Texto rayado<ul><li><code>[s]<mensaje>[/s]</code></li></ul></li><li>Subrayado<ul><li><code>[u]<mensaje>[/u]</code></li></ul></li><li>Imagen<ul><li><b>Nota: Dejar el http:// fuera del enlace</b></li><li><code>[img="<imagen>"]</code></li></ul></li><li>Youtube<ul><li><b>Nota</b>: <code>www.youtube.com/watch?v=<b>uQzGxQxn84Y</b></code></li><li><code>[yt="<ID de vídeo>"]</code></li></ul></li></ul>', {
	    id: "ChatTags",
	    width: 950,
            height: 1250,
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