$(function () {
    if (mw.config.get('wgUserId')) {

        mw.hook('cc.request').add(function (RequestWindow) {
			if  (!$('#design').length) { return; }
            $('.mensaje-anonimos').hide();
            $('#design').addClass("wds-button").text("Realizar solicitud").click(function () {

                // Create and append the window manager.
                var windowManager = new OO.ui.WindowManager();
                $(document.body).append(windowManager.$element);

                // Make the window.
                var requestWindow = new RequestWindow({
                    title: "Solicitar un diseño",
					letter: "d",
                    format: "{{Solicitud/encabezado|Diseños y portadas}}\n== {0} ==\n{{Solicitud de diseño\n|Estado = <!-- NO EDITAR aceptada/rechazada/pendiente/revisando -->\n|Diseñador = <!-- NO EDITAR -->\n|Tema = {2}\n|Wiki = {0}\n|Enlace = {1}\n|Solicitante = {3}\n|Observaciones = {4} ~~\~~\n}}\n",
                    sub: "En este formulario podrás solicitar el rango de bot para una cuenta de edición automatizada en tu comunidad.",
                    fields: [
                        { label: "Nombre de la comunidad", help: "Por ejemplo, Bleach Wiki." },
                        { label: "Interwiki de la comunidad", help: "Únicamente el interwiki (e.g. es.bleach)." },
						{ label: "¿Qué quieres cambiar?", help: "Portada / Logo / Fondo" },
						{ label: "Tu nombre de usuario", disabled: true, value: mw.config.get('wgUserName') },
						{ label: "Observaciones", type: "textarea" }
                    ]
                });

                // Add windows to the window manager using the window manager’s addWindows() method.
                windowManager.addWindows([requestWindow]);
                windowManager.openWindow(requestWindow);

            });
        });
    }
});