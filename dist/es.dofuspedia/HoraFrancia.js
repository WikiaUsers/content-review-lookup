(function () {
    "use strict";

    var ZONA_PARIS = "Europe/Paris";
    var ZONA_PERU = "America/Lima";

    function obtenerPartes(fecha, zona) {
        var partes = new Intl.DateTimeFormat("en-US", {
            timeZone: zona,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
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
            day: Number(resultado.day),
            hour: Number(resultado.hour === "24" ? 0 : resultado.hour),
            minute: Number(resultado.minute),
            second: Number(resultado.second)
        };
    }

    function obtenerOffset(fecha, zona) {
        var partes = obtenerPartes(fecha, zona);

        var utc = Date.UTC(
            partes.year,
            partes.month - 1,
            partes.day,
            partes.hour,
            partes.minute,
            partes.second
        );

        return Math.round(
            (utc - fecha.getTime()) / 60000
        );
    }

    function crearFechaZona(year, month, day, hour, minute, second, zona) {
        var fecha = new Date(Date.UTC(
            year,
            month - 1,
            day,
            hour,
            minute,
            second
        ));

        for (var i = 0; i < 5; i++) {
            var offset = obtenerOffset(fecha, zona);

            fecha = new Date(
                Date.UTC(
                    year,
                    month - 1,
                    day,
                    hour,
                    minute,
                    second
                ) - offset * 60000
            );
        }

        return fecha;
    }

    function dos(numero) {
        return String(numero).padStart(2, "0");
    }

    function formatearCuenta(milisegundos) {
        if (milisegundos < 0) {
            milisegundos = 0;
        }

        var segundos = Math.floor(
            milisegundos / 1000
        );

        var dias = Math.floor(
            segundos / 86400
        );

        segundos %= 86400;

        var horas = Math.floor(
            segundos / 3600
        );

        segundos %= 3600;

        var minutos = Math.floor(
            segundos / 60
        );

        segundos %= 60;

        if (dias > 0) {
            return dos(dias) + "d " +
                dos(horas) + "h " +
                dos(minutos) + "m " +
                dos(segundos) + "s";
        }

        return dos(horas) + ":" +
            dos(minutos) + ":" +
            dos(segundos);
    }

    function nombreDia(numero) {
        return [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado"
        ][numero];
    }

    function nombreMes(numero) {
        return [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre"
        ][numero - 1];
    }

    /*
     * ==========================================================
     * HORA DE DOFUS
     * ==========================================================
     *
     * Devuelve la hora actual de París.
     *
     * Se utiliza para:
     * - .hora-dofus-inline
     * - .hora-dofus
     */

    function obtenerHoraParis() {
        return obtenerPartes(
            new Date(),
            ZONA_PARIS
        );
    }

    /*
     * ==========================================================
     * REINICIO DE ENCARGOS Y TIENDA
     * ==========================================================
     *
     * Todos los martes a las 00:00 de Perú.
     */

    function siguienteReinicio() {
        var ahora = new Date();

        var peru = obtenerPartes(
            ahora,
            ZONA_PERU
        );

        var fecha = new Date(Date.UTC(
            peru.year,
            peru.month - 1,
            peru.day
        ));

        var diaActual = fecha.getUTCDay();

        var diasHastaMartes =
            (2 - diaActual + 7) % 7;

        if (
            diasHastaMartes === 0 &&
            (
                peru.hour > 0 ||
                peru.minute > 0 ||
                peru.second > 0
            )
        ) {
            diasHastaMartes = 7;
        }

        fecha.setUTCDate(
            fecha.getUTCDate() +
            diasHastaMartes
        );

        return crearFechaZona(
            fecha.getUTCFullYear(),
            fecha.getUTCMonth() + 1,
            fecha.getUTCDate(),
            0,
            0,
            0,
            ZONA_PERU
        );
    }

    /*
     * ==========================================================
     * TITÁN GARGANDIAS
     * ==========================================================
     *
     * Abre:
     * Viernes 19:00, hora de París.
     *
     * Cierra:
     * Lunes 08:00, hora de París.
     */

    function estadoGargandias() {
        var ahora = new Date();

        var paris = obtenerPartes(
            ahora,
            ZONA_PARIS
        );

        var fechaActual = new Date(Date.UTC(
            paris.year,
            paris.month - 1,
            paris.day
        ));

        var diaActual =
            fechaActual.getUTCDay();

        var diasDesdeViernes =
            (diaActual - 5 + 7) % 7;

        var viernes = new Date(
            fechaActual
        );

        viernes.setUTCDate(
            viernes.getUTCDate() -
            diasDesdeViernes
        );

        var inicio = crearFechaZona(
            viernes.getUTCFullYear(),
            viernes.getUTCMonth() + 1,
            viernes.getUTCDate(),
            19,
            0,
            0,
            ZONA_PARIS
        );

        var lunes = new Date(
            viernes
        );

        lunes.setUTCDate(
            lunes.getUTCDate() + 3
        );

        var fin = crearFechaZona(
            lunes.getUTCFullYear(),
            lunes.getUTCMonth() + 1,
            lunes.getUTCDate(),
            8,
            0,
            0,
            ZONA_PARIS
        );

        /*
         * Actualmente abierto.
         */
        if (
            ahora.getTime() >= inicio.getTime() &&
            ahora.getTime() < fin.getTime()
        ) {
            return {
                activo: true,
                objetivo: fin
            };
        }

        /*
         * Todavía no llegó el viernes.
         */
        if (
            ahora.getTime() < inicio.getTime()
        ) {
            return {
                activo: false,
                objetivo: inicio
            };
        }

        /*
         * Ya pasó el periodo actual.
         * Buscamos el viernes siguiente.
         */
        var siguienteViernes =
            new Date(viernes);

        siguienteViernes.setUTCDate(
            siguienteViernes.getUTCDate() + 7
        );

        var proximaApertura =
            crearFechaZona(
                siguienteViernes.getUTCFullYear(),
                siguienteViernes.getUTCMonth() + 1,
                siguienteViernes.getUTCDate(),
                19,
                0,
                0,
                ZONA_PARIS
            );

        return {
            activo: false,
            objetivo: proximaApertura
        };
    }

    /*
     * ==========================================================
     * RELOJ INLINE
     * ==========================================================
     *
     * Para {{horaDofus}}.
     *
     * Resultado:
     *
     * Hora Dofus: 14:37
     */

    function actualizarRelojesInline(paris) {
        var hora =
            dos(paris.hour) +
            ":" +
            dos(paris.minute);

        document
            .querySelectorAll(
                ".hora-dofus-inline"
            )
            .forEach(function (elemento) {

                elemento.textContent =
                    elemento.textContent = hora;
            });
    }

    /*
     * ==========================================================
     * PANEL COMPLETO
     * ==========================================================
     */

    function actualizarPanel(paris) {
        var ahora = new Date();

        var fechaParis = new Date(Date.UTC(
            paris.year,
            paris.month - 1,
            paris.day
        ));

        var dia = nombreDia(
            fechaParis.getUTCDay()
        );

        var mes = nombreMes(
            paris.month
        );

        var hora =
            dos(paris.hour) +
            ":" +
            dos(paris.minute) +
            ":" +
            dos(paris.second);

        var esDia =
            paris.hour >= 7 &&
            paris.hour < 20;

        /*
         * Reinicio.
         */
        var reinicio =
            siguienteReinicio();

        var tiempoReinicio =
            formatearCuenta(
                reinicio.getTime() -
                ahora.getTime()
            );

        /*
         * Gargandias.
         */
        var gargandias =
            estadoGargandias();

        var tiempoGargandias =
            formatearCuenta(
                gargandias.objetivo.getTime() -
                ahora.getTime()
            );

        document
            .querySelectorAll(".hora-dofus")
            .forEach(function (elemento) {

                elemento.innerHTML =

                    '<div style="' +
                    'width:100%;' +
                    'max-width:100%;' +
                    'box-sizing:border-box;' +
                    'background:' +
                    (
                        esDia
                            ? 'linear-gradient(180deg,#252525 0%,#1c1c1c 100%)'
                            : 'linear-gradient(180deg,#171717 0%,#111111 100%)'
                    ) +
                    ';' +
                    'border:1px solid #343434;' +
                    'border-radius:12px;' +
                    'padding:clamp(9px,2.5vw,12px);' +
                    'font-family:Calibri,Arial,sans-serif;' +
                    'color:#fff;' +
                    'text-align:center;' +
                    'box-shadow:0 3px 10px rgba(0,0,0,.35);' +
                    'overflow:hidden;' +
                    '">' +

                    /*
                     * TÍTULO
                     */
                    '<div style="' +
                    'font-size:clamp(10px,2.5vw,11px);' +
                    'letter-spacing:2px;' +
                    'color:#c5b285;' +
                    'font-weight:bold;' +
                    'text-transform:uppercase;' +
                    'margin-bottom:5px;' +
                    '">' +
                    'HORA DOFUS' +
                    '</div>' +

                    /*
                     * HORA
                     */
                    '<div style="' +
                    'font-size:clamp(21px,7vw,25px);' +
                    'font-weight:bold;' +
                    'line-height:1.1;' +
                    'letter-spacing:1px;' +
                    'color:#f2f2f2;' +
                    'white-space:nowrap;' +
                    '">' +
                    hora +
                    '</div>' +

                    /*
                     * FECHA
                     */
                    '<div style="' +
                    'font-size:clamp(11px,3vw,12px);' +
                    'color:#aaa;' +
                    'margin-top:5px;' +
                    'line-height:1.3;' +
                    '">' +
                    dia +
                    ", " +
                    paris.day +
                    " de " +
                    mes +
                    " de " +
                    paris.year +
                    '</div>' +

                    /*
                     * DÍA / NOCHE
                     */
                    '<div style="' +
                    'font-size:11px;' +
                    'color:' +
                    (
                        esDia
                            ? '#d8c58e'
                            : '#8fa4c7'
                    ) +
                    ';' +
                    'margin-top:6px;' +
                    '">' +
                    (
                        esDia
                            ? '☀ Día'
                            : '☾ Noche'
                    ) +
                    '</div>' +

                    /*
                     * SEPARADOR
                     */
                    '<div style="' +
                    'height:1px;' +
                    'background:#343434;' +
                    'margin:9px 0;' +
                    '"></div>' +

                    /*
                     * ENCARGOS
                     */
                    '<div style="' +
                    'font-size:10px;' +
                    'letter-spacing:1px;' +
                    'color:#888;' +
                    'text-transform:uppercase;' +
                    'line-height:1.2;' +
                    '">' +
                    'ENCARGOS Y TIENDA DEL GREMIO' +
                    '</div>' +

                    '<div style="' +
                    'font-size:clamp(17px,5vw,20px);' +
                    'font-weight:bold;' +
                    'color:#0bd9a9;' +
                    'margin-top:4px;' +
                    'line-height:1.2;' +
                    'white-space:nowrap;' +
                    '">' +
                    tiempoReinicio +
                    '</div>' +

                    '<div style="' +
                    'font-size:10px;' +
                    'color:#777;' +
                    'margin-top:2px;' +
                    '">' +
                    'próximo reinicio' +
                    '</div>' +

                    /*
                     * SEPARADOR
                     */
                    '<div style="' +
                    'height:1px;' +
                    'background:#343434;' +
                    'margin:9px 0;' +
                    '"></div>' +

                    /*
                     * GARGANDIAS
                     */
                    '<div style="' +
                    'font-size:10px;' +
                    'letter-spacing:1px;' +
                    'color:#888;' +
                    'text-transform:uppercase;' +
                    '">' +
                    'TITÁN GARGANDIAS' +
                    '</div>' +

                    '<div style="' +
                    'font-size:12px;' +
                    'font-weight:bold;' +
                    'color:' +
                    (
                        gargandias.activo
                            ? '#7ed957'
                            : '#999'
                    ) +
                    ';' +
                    'margin-top:4px;' +
                    '">' +
                    (
                        gargandias.activo
                            ? '● ACTIVO'
                            : '○ CERRADO'
                    ) +
                    '</div>' +

                    '<div style="' +
                    'font-size:clamp(17px,5vw,19px);' +
                    'font-weight:bold;' +
                    'color:#e0d3b5;' +
                    'margin-top:3px;' +
                    'line-height:1.2;' +
                    'white-space:nowrap;' +
                    '">' +
                    tiempoGargandias +
                    '</div>' +

                    '<div style="' +
                    'font-size:10px;' +
                    'color:#777;' +
                    'margin-top:2px;' +
                    '">' +
                    (
                        gargandias.activo
                            ? 'para que cierre'
                            : 'para que abra'
                    ) +
                    '</div>' +

                    '</div>';
            });
    }

    /*
     * ==========================================================
     * ACTUALIZACIÓN GENERAL
     * ==========================================================
     */

    function actualizar() {
        var paris =
            obtenerHoraParis();

        actualizarRelojesInline(
            paris
        );

        actualizarPanel(
            paris
        );
    }

    /*
     * ==========================================================
     * INICIO
     * ==========================================================
     */

    function iniciar() {
        actualizar();

        setInterval(
            actualizar,
            1000
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