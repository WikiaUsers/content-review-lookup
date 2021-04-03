$(function () {
    if (mw.config.get('wgUserId')) {

        mw.hook('cc.request').add(function (RequestWindow) {
			if  (!$('#bot').length) { return; }
            $('.mensaje-anonimos').hide();
            $('#bot').addClass("wds-button").text("Realizar solicitud").click(function () {

                // Create and append the window manager.
                var windowManager = new OO.ui.WindowManager();
                $(document.body).append(windowManager.$element);

                // Make the window.
                var requestWindow = new RequestWindow({
                    title: "Solicitar el rango de bot",
					letter: "b",
                    format: "{{Solicitud/encabezado|Rango de bot}}\n== {0} ==\n{{Solicitud de bot\n|Estado = <!-- NO EDITAR concedido/declinado/pendiente -->\n|Nombre-wiki = {0}\n|Enlace = {1}\n|Cuenta-bot = {2}\n|Hiloaprobación = {3}\n|Programa = {4}\n|Duración = {5}\n|Comentarios = {6} ~~\~~\n}}\n",
                    sub: "En este formulario podrás solicitar el rango de bot para una cuenta de edición automatizada en tu comunidad.",
                    fields: [
                        { label: "Nombre de la comunidad", help: "Por ejemplo, Dragon Ball Wiki." },
                        { label: "Interwiki de la comunidad", help: "Únicamente el interwiki (e.g. es.dragonball)." },
						{ label: "Cuenta del bot", help: "¿Cuál es el nombre de la cuenta que recibirá el rango de bot?" },
						{ label: "Hilo de aprobación", help: "Hilo donde la comunicación está de acuerdo en conceder el rango de bot." },
						{ label: "Programa", type: 'combo', items: [ 'AWB', 'PWB', 'Otro' ] },
						{ label: "Duración", help: "¿Durante cuánto tiempo necesitarás el rango de bot?" },
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