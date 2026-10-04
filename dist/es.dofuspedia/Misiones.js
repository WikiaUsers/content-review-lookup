(function () {
    "use strict";

    var CLAVE = "dofuspedia-misiones";
    var CLAVE_RELACIONES = "dofuspedia-misiones-relaciones";
    var CLAVE_HISTORIAL = "dofuspedia-misiones-historial";

    var progreso = {};
    var relaciones = {
        hijos: {},
        padres: {},
        tipos: {},
        nombres: {}
    };

    var paginasCargando = {};
    var totalMisiones = 0;

    function cargarProgreso() {
        try {
            var datos = localStorage.getItem(CLAVE);
            return datos ? JSON.parse(datos) : {};
        } catch (e) {
            return {};
        }
    }

    function guardarProgreso() {
        try {
            localStorage.setItem(
                CLAVE,
                JSON.stringify(progreso)
            );
        } catch (e) {}
    }

    function cargarHistorial() {
        try {
            var datos = localStorage.getItem(CLAVE_HISTORIAL);

            return datos
                ? JSON.parse(datos)
                : [];
        } catch (e) {
            return [];
        }
    }

    function guardarHistorial(historial) {
        try {
            localStorage.setItem(
                CLAVE_HISTORIAL,
                JSON.stringify(historial)
            );
        } catch (e) {}
    }

    function registrarCompletado(clave, tipo, nombre) {
        if (!clave || !tipo || !nombre) {
            return;
        }

        var historial = cargarHistorial();

        historial = historial.filter(function (elemento) {
            return elemento.clave !== clave;
        });

        historial.unshift({
            clave: clave,
            tipo: tipo,
            nombre: nombre,
            fecha: Date.now()
        });

        historial = historial.slice(0, 5);

        guardarHistorial(historial);
        actualizarUltimosCompletados();
    }

    function actualizarUltimosCompletados() {
        var contenedores = document.querySelectorAll(
            ".tracker-ultimos-completados, .tracker-ultimos-lista"
        );

        if (!contenedores.length) {
            return;
        }

        var historial = [];

        try {
            historial = JSON.parse(
                localStorage.getItem(CLAVE_HISTORIAL) || "[]"
            );
        } catch (e) {
            historial = [];
        }

        contenedores.forEach(function (contenedor) {
            contenedor.innerHTML = "";

            if (!historial.length) {
                contenedor.innerHTML =
                    '<div style="padding:6px 0;color:#777;text-align:center;font-size:10px;">Todavía no has completado nada.</div>';
                return;
            }

            historial.slice(0, 5).forEach(function (item) {
                var tipo =
                    item.tipo === "metalogro"
                        ? "METALOGRO"
                        : item.tipo === "logro"
                        ? "LOGRO"
                        : "MISIÓN";

                var icono =
                    item.tipo === "metalogro"
                        ? "Metalogro.png"
                        : item.tipo === "logro"
                        ? "Logro.png"
                        : "Misión.png";

                var tiempo = obtenerTiempoRelativo(item.fecha);

                var fila = document.createElement("div");

                fila.style.cssText =
                    "display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid #2c2c2c;";

                var iconoDiv = document.createElement("div");

                iconoDiv.style.cssText =
                    "width:22px;min-width:22px;height:22px;display:flex;align-items:center;justify-content:center;";

                var imagen = document.createElement("img");

                imagen.src = mw.util.getUrl(
                    "Especial:Redirect/file/" + icono
                );

                imagen.style.cssText =
                    "width:18px;height:18px;";

                iconoDiv.appendChild(imagen);

                var contenido = document.createElement("div");

                contenido.style.cssText =
                    "min-width:0;flex:1;";

                var nombre = document.createElement("div");

                nombre.style.cssText =
                    "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;";

                var check = document.createElement("span");

                check.textContent = "✓";

                check.style.cssText =
                    "color:#0bd9a9;font-weight:bold;";

                var enlace = document.createElement("span");

                enlace.textContent = " " + item.nombre;

                enlace.style.cssText =
                    "color:#ddd;cursor:pointer;";

                enlace.addEventListener("click", function () {
                    window.location.href = mw.util.getUrl(
                        item.nombre
                    );
                });

                nombre.appendChild(check);
                nombre.appendChild(enlace);

                var detalle = document.createElement("div");

                detalle.textContent =
                    tiempo + " · " + tipo;

                detalle.style.cssText =
                    "margin-top:1px;color:#777;font-size:9px;";

                contenido.appendChild(nombre);
                contenido.appendChild(detalle);

                fila.appendChild(iconoDiv);
                fila.appendChild(contenido);

                contenedor.appendChild(fila);
            });
        });
    }

    function obtenerTiempoRelativo(fecha) {
        var segundos =
            Math.floor(
                (Date.now() - Number(fecha)) / 1000
            );

        if (segundos < 10) {
            return "ahora";
        }

        if (segundos < 60) {
            return "hace " + segundos + " s";
        }

        var minutos =
            Math.floor(segundos / 60);

        if (minutos < 60) {
            return "hace " + minutos + " min";
        }

        var horas =
            Math.floor(minutos / 60);

        if (horas < 24) {
            return "hace " + horas + " h";
        }

        var dias =
            Math.floor(horas / 24);

        if (dias < 7) {
            return (
                "hace " +
                dias +
                (dias === 1 ? " día" : " días")
            );
        }

        return new Date(fecha).toLocaleDateString("es-ES");
    }

    function cargarRelaciones() {
        try {
            var datos =
                localStorage.getItem(
                    CLAVE_RELACIONES
                );

            if (datos) {
                relaciones = JSON.parse(datos);
            }
        } catch (e) {
            relaciones = {
                hijos: {},
                padres: {},
                tipos: {},
                nombres: {}
            };
        }

        if (!relaciones.hijos) {
            relaciones.hijos = {};
        }

        if (!relaciones.padres) {
            relaciones.padres = {};
        }

        if (!relaciones.tipos) {
            relaciones.tipos = {};
        }

        if (!relaciones.nombres) {
            relaciones.nombres = {};
        }
    }

    function guardarRelaciones() {
        try {
            localStorage.setItem(
                CLAVE_RELACIONES,
                JSON.stringify(relaciones)
            );
        } catch (e) {}
    }

    function normalizar(texto) {
        return String(texto)
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                "");
    }

    function claveMision(nombre) {
        return "mision:" + normalizar(nombre);
    }

    function claveLogro(nombre) {
        return "logro:" + normalizar(nombre);
    }

    function claveMetalogro(nombre) {
        return "metalogro:" + normalizar(nombre);
    }

    function obtenerClavePorTipo(tipo, nombre) {
        if (tipo === "metalogro") {
            return claveMetalogro(nombre);
        }

        if (tipo === "logro") {
            return claveLogro(nombre);
        }

        return claveMision(nombre);
    }

    function misionMarcada(nombre) {
        var claveNueva =
            claveMision(nombre);

        var claveAntigua =
            normalizar(nombre);

        return !!(
            progreso[claveNueva] ||
            progreso[claveAntigua]
        );
    }

    function actualizarCheckbox(checkbox, marcado) {
        if (!checkbox) {
            return;
        }

        checkbox.textContent =
            marcado ? "☑" : "☐";

        checkbox.style.color =
            marcado
                ? "#0bd9a9"
                : "#c5b285";

        checkbox.setAttribute(
            "aria-checked",
            marcado ? "true" : "false"
        );

        var mision =
            checkbox.closest(
                ".mision-global"
            );

        if (!mision) {
            return;
        }

        var estado =
            mision.querySelector(
                ".mision-global-estado"
            );

        var texto =
            mision.querySelector(
                ".mision-global-texto"
            );

        if (marcado) {
            mision.style.borderLeftColor =
                "#0bd9a9";

            mision.style.background =
                "linear-gradient(135deg,#151f1d,#202b27,#171c1b)";

            mision.style.boxShadow =
                "inset 0 1px 0 rgba(11,217,169,.08),0 2px 7px rgba(11,217,169,.16)";

            if (estado) {
                estado.style.display = "block";
            }

            if (texto) {
                texto.textContent =
                    "Misión completada";

                texto.style.color =
                    "#d9fff6";
            }
        } else {
            mision.style.borderLeftColor =
                "#c5b285";

            mision.style.background =
                "linear-gradient(135deg,#171717,#25231f,#191919)";

            mision.style.boxShadow =
                "inset 0 1px 0 rgba(255,255,255,.04),0 2px 5px rgba(0,0,0,.35)";

            if (estado) {
                estado.style.display = "none";
            }

            if (texto) {
                texto.textContent =
                    "Marcar como completada";

                texto.style.color =
                    "#e5e5e5";
            }
        }
    }

    function aplicarEstiloLogro(elemento, marcado) {
        var principal =
            elemento.getAttribute(
                "data-tracker-logro-principal"
            ) === "1";

        var tabla =
            elemento.closest(
                ".logro-global"
            );

        if (!tabla) {
            return;
        }

        if (marcado) {
            elemento.classList.add(
                "tracker-completado"
            );

            tabla.classList.add(
                "tracker-completado"
            );

            if (principal) {
                tabla.style.borderLeftColor =
                    "#0bd9a9";

                tabla.style.borderRightColor =
                    "#0bd9a9";

                tabla.style.boxShadow =
                    "inset 0 1px 0 rgba(11,217,169,.08),0 2px 8px rgba(11,217,169,.14)";

                elemento.style.color =
                    "#d9fff6";
            }
        } else {
            elemento.classList.remove(
                "tracker-completado"
            );

            tabla.classList.remove(
                "tracker-completado"
            );

            if (principal) {
                tabla.style.borderLeftColor =
                    "#232321";

                tabla.style.borderRightColor =
                    "#232321";

                tabla.style.boxShadow =
                    "none";

                elemento.style.color =
                    "";
            }
        }
    }

    function registrarTipo(clave, tipo, nombre) {
        if (!clave || !tipo) {
            return;
        }

        relaciones.tipos[clave] =
            tipo;

        if (nombre) {
            relaciones.nombres[clave] =
                nombre;
        }
    }

    function agregarRelacion(padre, hijo) {
        if (
            !padre ||
            !hijo ||
            padre === hijo
        ) {
            return;
        }

        if (!relaciones.hijos[padre]) {
            relaciones.hijos[padre] = [];
        }

        if (
            relaciones.hijos[padre].indexOf(hijo) === -1
        ) {
            relaciones.hijos[padre].push(hijo);
        }

        if (!relaciones.padres[hijo]) {
            relaciones.padres[hijo] = [];
        }

        if (
            relaciones.padres[hijo].indexOf(padre) === -1
        ) {
            relaciones.padres[hijo].push(padre);
        }
    }

    function contarMisiones() {
        var api = new mw.Api();

        function contarPagina(continuar) {
            var parametros = {
                action: "query",
                list: "embeddedin",
                eititle: "Plantilla:Misión/F",
                eilimit: "max",
                format: "json"
            };

            if (continuar) {
                parametros.eicontinue =
                    continuar;
            }

            api.get(parametros)
                .done(function (datos) {
                    if (
                        datos &&
                        datos.query &&
                        datos.query.embeddedin
                    ) {
                        totalMisiones +=
                            datos.query.embeddedin.length;
                    }

                    if (
                        datos &&
                        datos.continue &&
                        datos.continue.eicontinue
                    ) {
                        contarPagina(
                            datos.continue.eicontinue
                        );
                    } else {
                        actualizarContadorGlobal();
                    }
                })
                .fail(function () {
                    totalMisiones = 0;
                });
        }

        totalMisiones = 0;

        contarPagina(null);
    }

    function contarMisionesCompletadas() {
        var completadas = 0;

        Object.keys(progreso).forEach(
            function (clave) {
                if (
                    clave.indexOf("mision:") === 0 &&
                    progreso[clave] === true
                ) {
                    completadas++;
                }
            }
        );

        return completadas;
    }

    function actualizarContadorGlobal() {
        var elementos =
            document.querySelectorAll(
                ".tracker-contador-global"
            );

        if (
            !elementos.length ||
            !totalMisiones
        ) {
            return;
        }

        var completadas =
            contarMisionesCompletadas();

        var porcentaje =
            (completadas / totalMisiones) * 100;

        porcentaje =
            porcentaje
                .toFixed(2)
                .replace(".", ",");

        elementos.forEach(
            function (elemento) {
                elemento.textContent =
                    completadas +
                    " / " +
                    totalMisiones +
                    " · " +
                    porcentaje +
                    "%";
            }
        );
    }

    function actualizarMisiones() {
        document
            .querySelectorAll(
                ".mision-global"
            )
            .forEach(
                function (elemento) {
                    var nombre =
                        elemento.getAttribute(
                            "data-mision-nombre"
                        );

                    if (!nombre) {
                        return;
                    }

                    elemento.setAttribute(
                        "data-mision",
                        normalizar(nombre)
                    );

                    actualizarCheckbox(
                        elemento.querySelector(
                            ".mision-global-checkbox"
                        ),
                        misionMarcada(nombre)
                    );
                }
            );
    }

    function actualizarLogros() {
        document
            .querySelectorAll(
                ".tracker-logro-item"
            )
            .forEach(
                function (elemento) {
                    var tipo =
                        elemento.getAttribute(
                            "data-tracker-tipo"
                        );

                    var nombre =
                        elemento.getAttribute(
                            "data-tracker-nombre"
                        );

                    if (!tipo || !nombre) {
                        return;
                    }

                    var clave =
                        obtenerClavePorTipo(
                            tipo,
                            nombre
                        );

                    var marcado =
                        !!progreso[clave];

                    var checkbox =
                        elemento.querySelector(
                            ".tracker-logro-checkbox"
                        );

                    if (checkbox) {
                        checkbox.textContent =
                            marcado ? "☑" : "☐";

                        checkbox.style.color =
                            marcado
                                ? "#0bd9a9"
                                : "#c5b285";

                        checkbox.setAttribute(
                            "aria-checked",
                            marcado
                                ? "true"
                                : "false"
                        );
                    }

                    aplicarEstiloLogro(
                        elemento,
                        marcado
                    );
                }
            );
    }

    function actualizarTodo() {
        actualizarMisiones();
        actualizarLogros();
        actualizarContadorGlobal();
        actualizarUltimosCompletados();
    }

    function establecerEstadoMision(nombre, marcado) {
        if (!nombre) {
            return;
        }

        var clave =
            claveMision(nombre);

        if (marcado) {
            progreso[clave] = true;
            progreso[normalizar(nombre)] = true;
        } else {
            delete progreso[clave];
            delete progreso[normalizar(nombre)];
        }
    }

    function establecerEstadoElemento(clave, marcado) {
        if (!clave) {
            return;
        }

        if (marcado) {
            progreso[clave] = true;
        } else {
            delete progreso[clave];
        }
    }

    function desmarcarOtrasMisionLibre(
        elemento,
        nombreSeleccionado
    ) {
        var grupo =
            elemento.closest(
                ".mision-ruta-libre"
            );

        if (!grupo) {
            return;
        }

        grupo
            .querySelectorAll(
                ".mision-global"
            )
            .forEach(
                function (otraMision) {
                    var otroNombre =
                        otraMision.getAttribute(
                            "data-mision-nombre"
                        );

                    if (
                        !otroNombre ||
                        otroNombre ===
                            nombreSeleccionado
                    ) {
                        return;
                    }

                    establecerEstadoMision(
                        otroNombre,
                        false
                    );
                }
            );
    }

    function iniciarMisiones() {
        document
            .querySelectorAll(
                ".mision-global"
            )
            .forEach(
                function (elemento) {
                    var nombre =
                        elemento.getAttribute(
                            "data-mision-nombre"
                        );

                    if (!nombre) {
                        return;
                    }

                    var clave =
                        claveMision(nombre);

                    elemento.setAttribute(
                        "data-mision",
                        normalizar(nombre)
                    );

                    actualizarCheckbox(
                        elemento.querySelector(
                            ".mision-global-checkbox"
                        ),
                        misionMarcada(nombre)
                    );

                    if (
                        elemento.getAttribute(
                            "data-mision-iniciado"
                        ) === "1"
                    ) {
                        return;
                    }

                    elemento.setAttribute(
                        "data-mision-iniciado",
                        "1"
                    );

                    elemento.addEventListener(
                        "click",
                        function (evento) {
                            if (
                                evento.target.closest("a")
                            ) {
                                return;
                            }

                            var nuevoEstado =
                                !misionMarcada(nombre);

                            if (nuevoEstado) {
                                desmarcarOtrasMisionLibre(
                                    elemento,
                                    nombre
                                );
                            }

                            establecerEstadoMision(
                                nombre,
                                nuevoEstado
                            );

                            if (nuevoEstado) {
                                registrarCompletado(
                                    clave,
                                    "mision",
                                    nombre
                                );
                            }

                            actualizarMisiones();
                            guardarProgreso();
                            actualizarContadorGlobal();

                            sincronizarPadres(
                                clave
                            );
                        }
                    );
                }
            );
    }

    function iniciarLogros() {
        document
            .querySelectorAll(
                ".tracker-logro-item"
            )
            .forEach(
                function (elemento) {
                    var tipo =
                        elemento.getAttribute(
                            "data-tracker-tipo"
                        );

                    var nombre =
                        elemento.getAttribute(
                            "data-tracker-nombre"
                        );

                    if (!tipo || !nombre) {
                        return;
                    }

                    var clave =
                        obtenerClavePorTipo(
                            tipo,
                            nombre
                        );

                    registrarTipo(
                        clave,
                        tipo,
                        nombre
                    );

                    elemento.setAttribute(
                        "data-tracker-clave",
                        clave
                    );

                    var checkbox =
                        elemento.querySelector(
                            ".tracker-logro-checkbox"
                        );

                    if (!checkbox) {
                        return;
                    }

                    if (
                        elemento.getAttribute(
                            "data-tracker-iniciado"
                        ) === "1"
                    ) {
                        return;
                    }

                    elemento.setAttribute(
                        "data-tracker-iniciado",
                        "1"
                    );

                    checkbox.addEventListener(
                        "click",
                        function (evento) {
                            evento.preventDefault();
                            evento.stopPropagation();

                            cambiarEstadoLogro(
                                elemento
                            );
                        }
                    );
                }
            );

        actualizarLogros();
    }

    function cambiarEstadoLogro(elemento) {
        var tipo =
            elemento.getAttribute(
                "data-tracker-tipo"
            );

        var nombre =
            elemento.getAttribute(
                "data-tracker-nombre"
            );

        if (!tipo || !nombre) {
            return;
        }

        var clave =
            obtenerClavePorTipo(
                tipo,
                nombre
            );

        var nuevoEstado =
            !progreso[clave];

        if (nuevoEstado) {
            progreso[clave] = true;

            registrarCompletado(
                clave,
                tipo,
                nombre
            );
        } else {
            delete progreso[clave];
        }

        actualizarLogros();
        guardarProgreso();

        cargarPagina(
            nombre,
            tipo,
            function () {
                marcarDescendientes(
                    clave,
                    nuevoEstado,
                    {}
                );

                actualizarTodo();
                guardarProgreso();

                sincronizarPadres(
                    clave
                );
            }
        );
    }

    function registrarRelacionesLocales() {
        document
            .querySelectorAll(
                ".tracker-relacion-mision"
            )
            .forEach(
                function (elemento) {
                    var mision =
                        elemento.getAttribute(
                            "data-tracker-mision"
                        );

                    var logro =
                        elemento.getAttribute(
                            "data-tracker-logro"
                        );

                    if (!mision || !logro) {
                        return;
                    }

                    var padre =
                        claveLogro(logro);

                    var hijo =
                        claveMision(mision);

                    registrarTipo(
                        padre,
                        "logro",
                        logro
                    );

                    registrarTipo(
                        hijo,
                        "mision",
                        mision
                    );

                    agregarRelacion(
                        padre,
                        hijo
                    );
                }
            );

        document
            .querySelectorAll(
                ".mision-global[data-tracker-padre]"
            )
            .forEach(
                function (elemento) {
                    var mision =
                        elemento.getAttribute(
                            "data-mision-nombre"
                        );

                    var padre =
                        elemento.getAttribute(
                            "data-tracker-padre"
                        );

                    if (!mision || !padre) {
                        return;
                    }

                    var clavePadre =
                        claveLogro(padre);

                    var claveHijo =
                        claveMision(mision);

                    registrarTipo(
                        clavePadre,
                        "logro",
                        padre
                    );

                    registrarTipo(
                        claveHijo,
                        "mision",
                        mision
                    );

                    agregarRelacion(
                        clavePadre,
                        claveHijo
                    );
                }
            );

        document
            .querySelectorAll(
                ".tracker-logro-item[data-tracker-padre]"
            )
            .forEach(
                function (elemento) {
                    var tipo =
                        elemento.getAttribute(
                            "data-tracker-tipo"
                        );

                    var nombre =
                        elemento.getAttribute(
                            "data-tracker-nombre"
                        );

                    var padre =
                        elemento.getAttribute(
                            "data-tracker-padre"
                        );

                    if (
                        !tipo ||
                        !nombre ||
                        !padre
                    ) {
                        return;
                    }

                    var hijo =
                        obtenerClavePorTipo(
                            tipo,
                            nombre
                        );

                    var padreClave;

                    /*
                     * Un metalogro contiene logros.
                     * Un logro puede contener misiones.
                     *
                     * Si el hijo es un logro, su padre
                     * puede ser un metalogro.
                     *
                     * Si el hijo es un metalogro, su
                     * padre sería un logro.
                     */
                    if (tipo === "metalogro") {
                        padreClave =
                            claveLogro(padre);

                        registrarTipo(
                            padreClave,
                            "logro",
                            padre
                        );
                    } else {
                        padreClave =
                            claveMetalogro(padre);

                        registrarTipo(
                            padreClave,
                            "metalogro",
                            padre
                        );
                    }

                    registrarTipo(
                        hijo,
                        tipo,
                        nombre
                    );

                    agregarRelacion(
                        padreClave,
                        hijo
                    );
                }
            );

        guardarRelaciones();
    }

    function cargarPagina(
        nombre,
        tipo,
        callback
    ) {
        var clave =
            obtenerClavePorTipo(
                tipo,
                nombre
            );

        registrarTipo(
            clave,
            tipo,
            nombre
        );

        if (paginasCargando[clave]) {
            paginasCargando[clave].push(
                callback
            );

            return;
        }

        paginasCargando[clave] = [
            callback
        ];

        var api = new mw.Api();

        api.get({
            action: "parse",
            page: nombre,
            prop: "text",
            formatversion: 2
        })
            .done(function (datos) {
                if (
                    datos &&
                    datos.parse &&
                    datos.parse.text
                ) {
                    analizarPagina(
                        nombre,
                        tipo,
                        datos.parse.text
                    );
                }

                var lista =
                    paginasCargando[clave] || [];

                delete paginasCargando[clave];

                lista.forEach(
                    function (fn) {
                        fn();
                    }
                );
            })
            .fail(function () {
                var lista =
                    paginasCargando[clave] || [];

                delete paginasCargando[clave];

                lista.forEach(
                    function (fn) {
                        fn();
                    }
                );
            });
    }

    function analizarPagina(
        nombre,
        tipo,
        html
    ) {
        var contenedor =
            document.createElement("div");

        contenedor.innerHTML = html;

        var padre =
            obtenerClavePorTipo(
                tipo,
                nombre
            );

        registrarTipo(
            padre,
            tipo,
            nombre
        );

        /*
         * Cuando cargamos una página de logro o
         * metalogro, reconstruimos sus hijos.
         *
         * Esto elimina relaciones antiguas que
         * hayan quedado guardadas incorrectamente.
         */
        if (
            tipo === "logro" ||
            tipo === "metalogro"
        ) {
            var hijosAnteriores =
                relaciones.hijos[padre] || [];

            hijosAnteriores.forEach(
                function (hijoAnterior) {
                    if (
                        relaciones.padres[hijoAnterior]
                    ) {
                        relaciones.padres[
                            hijoAnterior
                        ] =
                            relaciones.padres[
                                hijoAnterior
                            ].filter(
                                function (padreAnterior) {
                                    return (
                                        padreAnterior !==
                                        padre
                                    );
                                }
                            );
                    }
                }
            );

            relaciones.hijos[padre] = [];
        }

        contenedor
            .querySelectorAll(
                ".tracker-logro-item"
            )
            .forEach(
                function (elemento) {
                    var tipoHijo =
                        elemento.getAttribute(
                            "data-tracker-tipo"
                        );

                    var nombreHijo =
                        elemento.getAttribute(
                            "data-tracker-nombre"
                        );

                    var principal =
                        elemento.getAttribute(
                            "data-tracker-logro-principal"
                        );

                    var requisito =
                        elemento.getAttribute(
                            "data-tracker-requisito"
                        );

                    if (requisito === "1") {
                        return;
                    }

                    if (
                        !tipoHijo ||
                        !nombreHijo
                    ) {
                        return;
                    }

                    var hijo =
                        obtenerClavePorTipo(
                            tipoHijo,
                            nombreHijo
                        );

                    registrarTipo(
                        hijo,
                        tipoHijo,
                        nombreHijo
                    );

                    if (
                        principal === "1" &&
                        hijo === padre
                    ) {
                        return;
                    }

                    /*
                     * Solo se consideran hijos de la
                     * página que estamos analizando.
                     *
                     * Así:
                     * Metalogro → Logros
                     * Logro → Misiones/Logros
                     */
                    if (
                        tipo === "logro" ||
                        tipo === "metalogro"
                    ) {
                        agregarRelacion(
                            padre,
                            hijo
                        );
                    }
                }
            );

        contenedor
            .querySelectorAll(
                ".mision-global"
            )
            .forEach(
                function (elemento) {
                    var requisito =
                        elemento.getAttribute(
                            "data-tracker-requisito"
                        );

                    if (requisito === "1") {
                        return;
                    }

                    var nombreMision =
                        elemento.getAttribute(
                            "data-mision-nombre"
                        );

                    if (!nombreMision) {
                        return;
                    }

                    var hijo =
                        claveMision(
                            nombreMision
                        );

                    registrarTipo(
                        hijo,
                        "mision",
                        nombreMision
                    );

                    if (
                        tipo === "logro" ||
                        tipo === "metalogro"
                    ) {
                        agregarRelacion(
                            padre,
                            hijo
                        );
                    }
                }
            );

        contenedor
            .querySelectorAll(
                ".tracker-relacion-mision"
            )
            .forEach(
                function (elemento) {
                    var mision =
                        elemento.getAttribute(
                            "data-tracker-mision"
                        );

                    var logro =
                        elemento.getAttribute(
                            "data-tracker-logro"
                        );

                    if (
                        !mision ||
                        !logro
                    ) {
                        return;
                    }

                    var clavePadre =
                        claveLogro(logro);

                    var claveHijo =
                        claveMision(mision);

                    registrarTipo(
                        clavePadre,
                        "logro",
                        logro
                    );

                    registrarTipo(
                        claveHijo,
                        "mision",
                        mision
                    );

                    agregarRelacion(
                        clavePadre,
                        claveHijo
                    );
                }
            );

        guardarRelaciones();
    }

    function marcarDescendientes(
        clave,
        marcado,
        visitados
    ) {
        if (visitados[clave]) {
            return;
        }

        visitados[clave] = true;

        var hijos =
            relaciones.hijos[clave] || [];

        hijos.forEach(
            function (hijo) {
                var tipoHijo =
                    relaciones.tipos[hijo] || "";

                var nombreHijo =
                    relaciones.nombres[hijo] || "";

                if (tipoHijo === "mision") {
                    establecerEstadoMision(
                        nombreHijo,
                        marcado
                    );
                } else {
                    establecerEstadoElemento(
                        hijo,
                        marcado
                    );
                }

                if (
                    marcado &&
                    tipoHijo &&
                    nombreHijo
                ) {
                    registrarCompletado(
                        hijo,
                        tipoHijo,
                        nombreHijo
                    );
                }

                if (
                    !marcado &&
                    tipoHijo === "mision"
                ) {
                    delete progreso[
                        claveMision(
                            nombreHijo
                        )
                    ];

                    delete progreso[
                        normalizar(
                            nombreHijo
                        )
                    ];
                }

                if (
                    tipoHijo === "mision"
                ) {
                    actualizarCheckboxesPorNombre(
                        nombreHijo
                    );
                } else {
                    actualizarElementoLogroPorClave(
                        hijo
                    );
                }

                if (
                    tipoHijo === "logro" ||
                    tipoHijo === "metalogro"
                ) {
                    marcarDescendientes(
                        hijo,
                        marcado,
                        visitados
                    );
                }
            }
        );
    }

    function actualizarCheckboxesPorNombre(
        nombre
    ) {
        document
            .querySelectorAll(
                ".mision-global"
            )
            .forEach(
                function (elemento) {
                    var nombreElemento =
                        elemento.getAttribute(
                            "data-mision-nombre"
                        );

                    if (
                        nombreElemento ===
                        nombre
                    ) {
                        actualizarCheckbox(
                            elemento.querySelector(
                                ".mision-global-checkbox"
                            ),
                            misionMarcada(nombre)
                        );
                    }
                }
            );
    }

    function actualizarElementoLogroPorClave(
        clave
    ) {
        var tipo =
            relaciones.tipos[clave];

        var nombre =
            relaciones.nombres[clave];

        if (!tipo || !nombre) {
            return;
        }

        document
            .querySelectorAll(
                ".tracker-logro-item"
            )
            .forEach(
                function (elemento) {
                    if (
                        elemento.getAttribute(
                            "data-tracker-tipo"
                        ) === tipo &&
                        elemento.getAttribute(
                            "data-tracker-nombre"
                        ) === nombre
                    ) {
                        var marcado =
                            !!progreso[clave];

                        var checkbox =
                            elemento.querySelector(
                                ".tracker-logro-checkbox"
                            );

                        if (checkbox) {
                            checkbox.textContent =
                                marcado ? "☑" : "☐";

                            checkbox.style.color =
                                marcado
                                    ? "#0bd9a9"
                                    : "#c5b285";
                        }

                        aplicarEstiloLogro(
                            elemento,
                            marcado
                        );
                    }
                }
            );
    }

    function todosLosHijosMarcados(clave) {
        var hijos =
            relaciones.hijos[clave] || [];

        if (!hijos.length) {
            return false;
        }

        return hijos.every(
            function (hijo) {
                var tipo =
                    relaciones.tipos[hijo] || "";

                if (tipo === "mision") {
                    return misionMarcada(
                        relaciones.nombres[hijo] || ""
                    );
                }

                return !!progreso[hijo];
            }
        );
    }

    function sincronizarPadres(
        clave,
        visitados
    ) {
        visitados =
            visitados || {};

        if (visitados[clave]) {
            return;
        }

        visitados[clave] = true;

        var padres =
            relaciones.padres[clave] || [];

        padres.forEach(
            function (padre) {
                var tipoPadre =
                    relaciones.tipos[padre] || "";

                var nombrePadre =
                    relaciones.nombres[padre] || "";

                if (
                    !tipoPadre ||
                    !nombrePadre
                ) {
                    return;
                }

                /*
                 * Antes de decidir si el padre está
                 * completo, cargamos su página.
                 *
                 * Esto es importante:
                 * si acabamos de marcar una misión,
                 * todavía podríamos tener registrada
                 * únicamente esa misión como hija.
                 *
                 * Al cargar el logro se descubren
                 * TODAS sus misiones.
                 */
                cargarPagina(
                    nombrePadre,
                    tipoPadre,
                    function () {
                        var hijos =
                            relaciones.hijos[padre] || [];

                        if (!hijos.length) {
                            return;
                        }

                        var todosMarcados =
                            hijos.every(
                                function (hijo) {
                                    var tipoHijo =
                                        relaciones.tipos[hijo] || "";

                                    if (
                                        tipoHijo ===
                                        "mision"
                                    ) {
                                        var nombreMision =
                                            relaciones.nombres[
                                                hijo
                                            ] || "";

                                        return misionMarcada(
                                            nombreMision
                                        );
                                    }

                                    return !!progreso[
                                        hijo
                                    ];
                                }
                            );

                        if (todosMarcados) {
                            if (
                                !progreso[padre]
                            ) {
                                progreso[padre] =
                                    true;

                                registrarCompletado(
                                    padre,
                                    tipoPadre,
                                    nombrePadre
                                );
                            }
                        } else {
                            if (
                                progreso[padre]
                            ) {
                                delete progreso[
                                    padre
                                ];

                                if (
                                    tipoPadre ===
                                    "mision"
                                ) {
                                    delete progreso[
                                        normalizar(
                                            nombrePadre
                                        )
                                    ];
                                }
                            }
                        }

                        actualizarElementoLogroPorClave(
                            padre
                        );

                        guardarProgreso();

                        /*
                         * Una vez decidido el estado
                         * del padre, continuamos hacia
                         * arriba:
                         *
                         * Misión
                         *   ↓
                         * Logro
                         *   ↓
                         * Metalogro
                         */
                        sincronizarPadres(
                            padre,
                            visitados
                        );
                    }
                );
            }
        );
    }

    function iniciarRestablecerProgreso() {
        document
            .querySelectorAll(
                ".tracker-restablecer"
            )
            .forEach(
                function (boton) {
                    if (
                        boton.getAttribute(
                            "data-tracker-iniciado"
                        ) === "1"
                    ) {
                        return;
                    }

                    boton.setAttribute(
                        "data-tracker-iniciado",
                        "1"
                    );

                    boton.addEventListener(
                        "click",
                        function () {
                            var confirmar =
                                window.confirm(
                                    "¿Seguro que quieres restablecer todo tu progreso?\n\nSe eliminarán las misiones, logros, metalogros y el historial de completados."
                                );

                            if (!confirmar) {
                                return;
                            }

                            localStorage.removeItem(
                                CLAVE
                            );

                            localStorage.removeItem(
                                CLAVE_RELACIONES
                            );

                            localStorage.removeItem(
                                CLAVE_HISTORIAL
                            );

                            progreso = {};

                            relaciones = {
                                hijos: {},
                                padres: {},
                                tipos: {},
                                nombres: {}
                            };

                            actualizarTodo();

                            window.location.reload();
                        }
                    );
                }
            );
    }

    function actualizarNombreAventurero() {
        var elementos =
            document.querySelectorAll(
                ".tracker-nombre-aventurero"
            );

        if (!elementos.length) {
            return;
        }

        var nombre =
            mw.config.get("wgUserName");

        if (!nombre) {
            nombre = "Aventurero";
        }

        elementos.forEach(
            function (elemento) {
                elemento.textContent =
                    nombre;
            }
        );
    }

    function iniciar() {
        progreso =
            cargarProgreso();

        cargarRelaciones();

        registrarRelacionesLocales();

        iniciarMisiones();

        iniciarLogros();

        iniciarRestablecerProgreso();

        actualizarTodo();

        actualizarUltimosCompletados();

        actualizarNombreAventurero();

        contarMisiones();
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

}());