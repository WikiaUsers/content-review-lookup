// <nowiki>
$(function () {
    if (mw.config.get('wgUserId')) {

        mw.hook('cc.request').add(function (RequestWindow) {
			if  (!$('#portabilidad').length) { return; }
            $('.mensaje-anonimos').hide();
            $('#portabilidad').addClass("wds-button").text("Realizar solicitud").click(function () {

                // Create and append the window manager.
                var windowManager = new OO.ui.WindowManager();
                $(document.body).append(windowManager.$element);

                // Make the window.
                var requestWindow = new RequestWindow({
                    title: "Solicitar una nueva migración de portabilidad",
                    letter: "p",
                    format: "{{Solicitud_de_migración/encabezado|Equipo de portabilidad|Migraciones}}\n=={0}==\n{{Solicitud de migración\n|Estado  = <!-- NO EDITAR finalizado/declinado/pendiente  -->\n|Wiki	 ={0}\n|Enlace  ={1}\n|Tipo	 ={2}\n|Usuario ={3}\n|Infoboxes ={4}\n|Voluntario  = <!-- Escribe solamente el nombre de usuario, sin el prefijo. -->\n|Comentarios ={5} ~~~~}}",
                    sub: "En este formulario podrás solicitar una migración de infoboxes en tu comunidad. Por favor, contacte a la administración si tienes alguna duda.",
                    fields: [
                        { label: "Nombre de la comunidad", help: "Por ejemplo, Dragon Ball Wiki." },
                        {
                            label: "URL de la comunidad",
                            type: "url",
                            help:
                                "Únicamente el dominio raíz (e.g https://dragonball.fandom.com/es/)",
                        },


                        { label: "¿Cuál de estos cargos te describe en la comunidad solicitada?", type: "combo", items: ["Administrador", "Burócrata", "Usuario común"], value: "Usuario común" },
                        { label: "Tu nombre de usuario", disabled: true, value: mw.config.get('wgUserName') },
                        {
                            label:
                                "¿Qué nombre tiene la categoría que recopila todas las infoboxes de la comunidad?",
                            help:
                                "Recuerda que debe existir una donde estén todas. En caso contrario, la solicitud será rechazada.",
                        },
                        { label: "Comentarios", type: "textarea" }

                    ]
                });

                // Add windows to the window manager using the window manager’s addWindows() method.
                windowManager.addWindows([requestWindow]);
                windowManager.openWindow(requestWindow);

            });
        });
    }
});
    // </nowiki>