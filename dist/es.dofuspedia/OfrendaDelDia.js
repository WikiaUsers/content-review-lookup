(function () {
    "use strict";

    var ZONA_PARIS = "Europe/Paris";
    var api = new mw.Api();
    var fechaActual = null;
    var ultimaFechaReal = "";

    function obtenerPartes(fecha, zona) {
        var partes = new Intl.DateTimeFormat("en-US", {
            timeZone: zona,
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).formatToParts(fecha);

        var resultado = {};

        partes.forEach(function (parte) {
            if (parte.type !== "literal") {
                resultado[parte.type] = parte.value;
            }
        });

        return {
            year: Number(resultado.year),
            month: Number(resultado.month),
            day: Number(resultado.day)
        };
    }

    function obtenerFechaParis() {
        return obtenerPartes(new Date(), ZONA_PARIS);
    }

    function obtenerClaveFecha(fecha) {
        return fecha.year + "-" +
            fecha.month + "-" +
            fecha.day;
    }

    function obtenerFechaAnterior(fecha) {
        var anterior = new Date(
            Date.UTC(
                fecha.year,
                fecha.month - 1,
                fecha.day
            )
        );

        anterior.setUTCDate(
            anterior.getUTCDate() - 1
        );

        return {
            year: anterior.getUTCFullYear(),
            month: anterior.getUTCMonth() + 1,
            day: anterior.getUTCDate()
        };
    }

    function obtenerFechaSiguiente(fecha) {
        var siguiente = new Date(
            Date.UTC(
                fecha.year,
                fecha.month - 1,
                fecha.day
            )
        );

        siguiente.setUTCDate(
            siguiente.getUTCDate() + 1
        );

        return {
            year: siguiente.getUTCFullYear(),
            month: siguiente.getUTCMonth() + 1,
            day: siguiente.getUTCDate()
        };
    }

    function esMismaFecha(a, b) {
        return (
            a.year === b.year &&
            a.month === b.month &&
            a.day === b.day
        );
    }

    function obtenerEtiquetaFecha(fecha) {
        var hoy = obtenerFechaParis();
        var anterior = obtenerFechaAnterior(hoy);
        var siguiente = obtenerFechaSiguiente(hoy);

        if (esMismaFecha(fecha, hoy)) {
            return "HOY";
        }

        if (esMismaFecha(fecha, anterior)) {
            return "AYER";
        }

        if (esMismaFecha(fecha, siguiente)) {
            return "MAÑANA";
        }

        return fecha.day + "/" + fecha.month;
    }

    function cargarOfrenda(fecha) {
        var contenedor =
            document.querySelector(".ofrenda-del-dia");

        if (!contenedor) {
            return;
        }

        fechaActual = fecha;

        var etiqueta =
            obtenerEtiquetaFecha(fecha);

        var fechaTexto =
            fecha.day + "/" + fecha.month;

        contenedor.innerHTML =
            '<div style="' +
            'width:100%;' +
            'box-sizing:border-box;' +
            'font-family:Calibri,Arial,sans-serif;' +
            '">' +

            '<div style="' +
            'display:flex;' +
            'align-items:center;' +
            'justify-content:space-between;' +
            'gap:6px;' +
            'margin-bottom:4px;' +
            '">' +

            '<button class="ofrenda-anterior" ' +
            'type="button" ' +
            'aria-label="Ofrenda anterior" ' +
            'style="' +
            'border:1px solid #3a3a3a;' +
            'background:#2a2a2a;' +
            'color:#c5b285;' +
            'border-radius:7px;' +
            'width:32px;' +
            'height:28px;' +
            'font-size:21px;' +
            'line-height:23px;' +
            'padding:0;' +
            'cursor:pointer;' +
            'transition:background .15s,border-color .15s;' +
            '">‹</button>' +

            '<div style="' +
            'flex:1;' +
            'text-align:center;' +
            'line-height:1.1;' +
            '">' +

            '<div class="ofrenda-etiqueta" ' +
            'style="' +
            'font-size:11px;' +
            'font-weight:bold;' +
            'letter-spacing:1px;' +
            'color:#c5b285;' +
            'text-transform:uppercase;' +
            '">' +
            etiqueta +
            '</div>' +

            (
                etiqueta === "HOY" ||
                etiqueta === "AYER" ||
                etiqueta === "MAÑANA"
                    ? '<div style="' +
                      'font-size:10px;' +
                      'color:#777;' +
                      'margin-top:1px;' +
                      '">' +
                      fechaTexto +
                      '</div>'
                    : ''
            ) +

            '</div>' +

            '<button class="ofrenda-siguiente" ' +
            'type="button" ' +
            'aria-label="Ofrenda siguiente" ' +
            'style="' +
            'border:1px solid #3a3a3a;' +
            'background:#2a2a2a;' +
            'color:#c5b285;' +
            'border-radius:7px;' +
            'width:32px;' +
            'height:28px;' +
            'font-size:21px;' +
            'line-height:23px;' +
            'padding:0;' +
            'cursor:pointer;' +
            'transition:background .15s,border-color .15s;' +
            '">›</button>' +

            '</div>' +

            '<div class="ofrenda-contenido" ' +
            'style="' +
            'width:100%;' +
            'margin:0;' +
            'padding:0;' +
            'line-height:1.15;' +
            '">' +

            '<div style="' +
            'text-align:center;' +
            'color:#aaa;' +
            'font-size:12px;' +
            'padding:4px;' +
            '">Cargando...</div>' +

            '</div>' +

            '<div style="' +
            'text-align:center;' +
            'margin-top:3px;' +
            'padding-top:4px;' +
            'border-top:1px solid #303030;' +
            'line-height:1;' +
            '">' +

            '<a href="' +
            mw.util.getUrl("Almanax") +
            '" ' +
            'style="' +
            'font-family:Calibri,Arial,sans-serif;' +
            'font-size:11px;' +
            'color:#c5b285;' +
            'text-decoration:none;' +
            'transition:color .15s;' +
            '">' +
            'Ver todas las ofrendas →' +
            '</a>' +

            '</div>' +

            '</div>';

        var contenido =
            contenedor.querySelector(
                ".ofrenda-contenido"
            );

        var botonAnterior =
            contenedor.querySelector(
                ".ofrenda-anterior"
            );

        var botonSiguiente =
            contenedor.querySelector(
                ".ofrenda-siguiente"
            );

        botonAnterior.addEventListener(
            "mouseenter",
            function () {
                botonAnterior.style.background =
                    "#343434";
                botonAnterior.style.borderColor =
                    "#c5b285";
            }
        );

        botonAnterior.addEventListener(
            "mouseleave",
            function () {
                botonAnterior.style.background =
                    "#2a2a2a";
                botonAnterior.style.borderColor =
                    "#3a3a3a";
            }
        );

        botonSiguiente.addEventListener(
            "mouseenter",
            function () {
                botonSiguiente.style.background =
                    "#343434";
                botonSiguiente.style.borderColor =
                    "#c5b285";
            }
        );

        botonSiguiente.addEventListener(
            "mouseleave",
            function () {
                botonSiguiente.style.background =
                    "#2a2a2a";
                botonSiguiente.style.borderColor =
                    "#3a3a3a";
            }
        );

        botonAnterior.addEventListener(
            "click",
            function () {
                cargarOfrenda(
                    obtenerFechaAnterior(fechaActual)
                );
            }
        );

        botonSiguiente.addEventListener(
            "click",
            function () {
                cargarOfrenda(
                    obtenerFechaSiguiente(fechaActual)
                );
            }
        );

        api.get({
            action: "parse",
            text:
                "{{OfrendaDelDía2|fecha=" +
                fechaTexto +
                "}}",
            prop: "text",
            formatversion: 2,
            disablelimitreport: 1,
            disableeditsection: 1
        }).done(function (datos) {

            if (
                datos &&
                datos.parse &&
                typeof datos.parse.text === "string"
            ) {
                contenido.innerHTML =
                    datos.parse.text;
            } else {
                contenido.innerHTML =
                    '<div style="' +
                    'text-align:center;' +
                    'color:#999;' +
                    'font-size:12px;' +
                    'padding:5px;' +
                    '">No se pudo cargar la ofrenda.</div>';
            }

        }).fail(function () {

            contenido.innerHTML =
                '<div style="' +
                'text-align:center;' +
                'color:#999;' +
                'font-size:12px;' +
                'padding:5px;' +
                '">No se pudo cargar la ofrenda.</div>';
        });
    }

    function comprobarCambioDeDia() {
        var fechaReal =
            obtenerFechaParis();

        var clave =
            obtenerClaveFecha(fechaReal);

        if (clave !== ultimaFechaReal) {
            ultimaFechaReal = clave;
            cargarOfrenda(fechaReal);
        }
    }

    function iniciar() {
        var fechaInicial =
            obtenerFechaParis();

        ultimaFechaReal =
            obtenerClaveFecha(fechaInicial);

        cargarOfrenda(fechaInicial);

        setInterval(
            comprobarCambioDeDia,
            30000
        );
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            iniciar
        );
    } else {
        iniciar();
    }

})();