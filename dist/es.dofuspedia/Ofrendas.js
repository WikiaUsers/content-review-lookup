(function () {

    var nombresMeses = [
        'Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
    ];

    var coloresTipos = {
        'Recolección de recursos': '#2C832F',
        'Cría de monturas': '#615D41',
        'Botín': '#AD2121',
        'Retos': '#39C928',
        'Economía de ingredientes': '#6D3B6C',
        'Puntos de experiencia': '#323D7F',
        'Día especial': '#8000FF',
        'Objetos de calidad': '#3AAD79',
        'Anomalías temporales': '#3E00FF',
        'Misión repetible': '#0097FF',
        'Fabricación extra': '#FFFF00',
        'Forjamagia mejorada': '#BD328C',
        'Recaudadores': '#C07113',
        'Protectores de recursos': '#26925D',
        'Archimonstruos': '#00FFCD'
    };

    function obtenerFechaParis() {
        var partes = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Europe/Paris',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).formatToParts(new Date());

        var fecha = {};

        for (var i = 0; i < partes.length; i++) {
            if (partes[i].type !== 'literal') {
                fecha[partes[i].type] = partes[i].value;
            }
        }

        return {
            mes: parseInt(fecha.month, 10),
            dia: parseInt(fecha.day, 10)
        };
    }

    function padreConClase(elemento, clase, limite) {
        var actual = elemento;
        var contador = 0;

        while (actual && contador < limite) {
            if (actual.classList && actual.classList.contains(clase)) {
                return actual;
            }

            actual = actual.parentNode;
            contador++;
        }

        return null;
    }

    function textoContraste(color) {
        if (!color) {
            return '#FFFFFF';
        }

        var hex = color.replace('#', '');

        if (hex.length !== 6) {
            return '#FFFFFF';
        }

        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);

        var luminancia = (r * 299 + g * 587 + b * 114) / 1000;

        return luminancia >= 155 ? '#111111' : '#FFFFFF';
    }

    function crearBotonesMeses(calendario) {
        if (calendario.querySelector('.ofrenda-meses-botones')) {
            return;
        }

        var meses = calendario.querySelectorAll('.ofrenda-mes');

        if (!meses.length) {
            return;
        }

        var barra = document.createElement('div');
        barra.className = 'ofrenda-meses-botones';

        for (var i = 0; i < meses.length; i++) {
            var numero = parseInt(
                meses[i].getAttribute('data-ofrenda-mes'),
                10
            );

            var boton = document.createElement('span');

            boton.className = 'ofrenda-mes-boton';
            boton.setAttribute('data-mes', numero);
            boton.setAttribute('role', 'button');
            boton.setAttribute('tabindex', '0');

            boton.appendChild(
                document.createTextNode(nombresMeses[numero - 1])
            );

            barra.appendChild(boton);
        }

        calendario.insertBefore(
            barra,
            calendario.querySelector('.ofrenda-filtros')
        );
    }

    function prepararFiltros(calendario) {
        var filtros = calendario.querySelectorAll('.ofrenda-filtro');

        for (var i = 0; i < filtros.length; i++) {
            var filtro = filtros[i];
            var tipo = filtro.getAttribute('data-filtro');

            if (tipo === 'Todos') {
                filtro.style.backgroundColor = '#c5b285';
                filtro.style.borderColor = '#c5b285';
                filtro.style.color = '#111111';
                filtro.style.fontWeight = 'bold';
                continue;
            }

            var color = coloresTipos[tipo];

            if (!color) {
                continue;
            }

            filtro.style.backgroundColor = color;
            filtro.style.borderColor = color;
            filtro.style.color = textoContraste(color);
        }
    }

    function mostrarMes(calendario, numeroMes) {
        var meses = calendario.querySelectorAll('.ofrenda-mes');
        var botones = calendario.querySelectorAll('.ofrenda-mes-boton');

        for (var i = 0; i < meses.length; i++) {
            var numero = parseInt(
                meses[i].getAttribute('data-ofrenda-mes'),
                10
            );

            if (numero === numeroMes) {
                meses[i].classList.add('ofrenda-mes-activo');
            } else {
                meses[i].classList.remove('ofrenda-mes-activo');
            }
        }

        for (var j = 0; j < botones.length; j++) {
            var numeroBoton = parseInt(
                botones[j].getAttribute('data-mes'),
                10
            );

            if (numeroBoton === numeroMes) {
                botones[j].classList.add('ofrenda-mes-boton-activo');
            } else {
                botones[j].classList.remove('ofrenda-mes-boton-activo');
            }
        }
    }

    function obtenerTipoDia(mes, dia) {
        var contenido = mes.querySelector(
            '.ofrenda-contenido-dia[data-ofrenda-dia="' + dia + '"]'
        );

        if (!contenido) {
            return '';
        }

        var tabla = contenido.querySelector('[data-ofrenda-tipo]');

        if (!tabla) {
            return '';
        }

        return (
            tabla.getAttribute('data-ofrenda-tipo') || ''
        ).replace(/^\s+|\s+$/g, '');
    }

    function mostrarDia(mes, dia) {
        var botones = mes.querySelectorAll('.ofrenda-dia-boton');
        var contenidos = mes.querySelectorAll('.ofrenda-contenido-dia');

        for (var i = 0; i < botones.length; i++) {
            botones[i].classList.remove('ofrenda-dia-activo');
        }

        for (var j = 0; j < contenidos.length; j++) {
            contenidos[j].classList.remove('ofrenda-contenido-activo');
        }

        var boton = mes.querySelector(
            '.ofrenda-dia-boton[data-ofrenda-dia="' + dia + '"]'
        );

        var contenido = mes.querySelector(
            '.ofrenda-contenido-dia[data-ofrenda-dia="' + dia + '"]'
        );

        if (boton) {
            boton.classList.add('ofrenda-dia-activo');

            var tipo = boton.getAttribute('data-ofrenda-tipo');
            var color = coloresTipos[tipo];

            if (color) {
                boton.style.backgroundColor = color;
                boton.style.borderColor = color;
                boton.style.color = textoContraste(color);
            }
        }

        if (contenido) {
            contenido.classList.add('ofrenda-contenido-activo');
        }
    }

    function actualizarContadores(calendario, filtro) {
        var filtros = calendario.querySelectorAll('.ofrenda-filtro');

        for (var i = 0; i < filtros.length; i++) {
            var filtro = filtros[i];
            var tipoFiltro = filtro.getAttribute('data-filtro');

            var contador = 0;
            var meses = calendario.querySelectorAll('.ofrenda-mes');

            for (var m = 0; m < meses.length; m++) {
                var botones = meses[m].querySelectorAll('.ofrenda-dia-boton');

                for (var d = 0; d < botones.length; d++) {
                    var tipo = botones[d].getAttribute('data-ofrenda-tipo');

                    if (
                        tipoFiltro !== 'Todos' &&
                        tipo === tipoFiltro
                    ) {
                        contador++;
                    }

                    if (tipoFiltro === 'Todos') {
                        contador++;
                    }
                }
            }

            var contadorExistente = filtro.querySelector(
                '.ofrenda-filtro-contador'
            );

            if (!contadorExistente) {
                contadorExistente = document.createElement('span');
                contadorExistente.className = 'ofrenda-filtro-contador';
                filtro.appendChild(contadorExistente);
            }

            contadorExistente.textContent = contador;
        }
    }

    function aplicarFiltro(calendario, filtro) {
        var meses = calendario.querySelectorAll('.ofrenda-mes');

        for (var m = 0; m < meses.length; m++) {
            var mes = meses[m];
            var botones = mes.querySelectorAll('.ofrenda-dia-boton');

            var primerValido = null;
            var diaActivo = mes.querySelector(
                '.ofrenda-dia-boton.ofrenda-dia-activo'
            );

            var diaActivoValido = false;

            for (var i = 0; i < botones.length; i++) {
                var boton = botones[i];
                var dia = boton.getAttribute('data-ofrenda-dia');

                var tipo = obtenerTipoDia(mes, dia);

                boton.setAttribute('data-ofrenda-tipo', tipo);

                var valido =
                    filtro === 'Todos' ||
                    tipo === filtro;

                if (valido) {
                    boton.classList.remove('ofrenda-dia-bloqueado');
                    boton.classList.add('ofrenda-dia-visible');

                    var color = coloresTipos[tipo];

                    if (color) {
                        boton.style.borderLeftColor = color;
                    }

                    if (!primerValido) {
                        primerValido = boton;
                    }

                    if (boton === diaActivo) {
                        diaActivoValido = true;
                    }
                } else {
                    boton.classList.add('ofrenda-dia-bloqueado');
                    boton.classList.remove('ofrenda-dia-visible');
                }
            }

            if (!diaActivoValido && primerValido) {
                mostrarDia(
                    mes,
                    primerValido.getAttribute('data-ofrenda-dia')
                );
            }

            if (!primerValido) {
                mes.classList.add('ofrenda-mes-sin-resultados');
            } else {
                mes.classList.remove('ofrenda-mes-sin-resultados');
            }
        }

        actualizarContadores(calendario, filtro);
    }

    function iniciarCalendario(calendario) {
        if (
            calendario.getAttribute('data-ofrendas-iniciado') === '1'
        ) {
            return;
        }

        var meses = calendario.querySelectorAll('.ofrenda-mes');

        if (!meses.length) {
            return;
        }

        calendario.setAttribute(
            'data-ofrendas-iniciado',
            '1'
        );

        crearBotonesMeses(calendario);
        prepararFiltros(calendario);

        var fecha = obtenerFechaParis();

        mostrarMes(calendario, fecha.mes);

        var mesActual = calendario.querySelector(
            '.ofrenda-mes[data-ofrenda-mes="' + fecha.mes + '"]'
        );

        if (mesActual) {
            mostrarDia(mesActual, fecha.dia);
        }

        var filtros = calendario.querySelectorAll('.ofrenda-filtro');

        for (var f = 0; f < filtros.length; f++) {
            if (
                filtros[f].getAttribute('data-filtro') === 'Todos'
            ) {
                filtros[f].classList.add(
                    'ofrenda-filtro-activo'
                );
            }
        }

        aplicarFiltro(calendario, 'Todos');

        calendario.addEventListener('click', function (e) {

            var objetivo = e.target;

            var botonMes = padreConClase(
                objetivo,
                'ofrenda-mes-boton',
                5
            );

            if (botonMes) {
                var numeroMes = parseInt(
                    botonMes.getAttribute('data-mes'),
                    10
                );

                mostrarMes(calendario, numeroMes);

                var mes = calendario.querySelector(
                    '.ofrenda-mes[data-ofrenda-mes="' +
                    numeroMes +
                    '"]'
                );

                if (mes) {
                    var activo = mes.querySelector(
                        '.ofrenda-dia-boton.ofrenda-dia-activo'
                    );

                    if (
                        !activo ||
                        activo.classList.contains(
                            'ofrenda-dia-bloqueado'
                        )
                    ) {
                        var primero = mes.querySelector(
                            '.ofrenda-dia-boton:not(.ofrenda-dia-bloqueado)'
                        );

                        if (primero) {
                            mostrarDia(
                                mes,
                                primero.getAttribute(
                                    'data-ofrenda-dia'
                                )
                            );
                        }
                    }
                }

                return;
            }

            var filtro = padreConClase(
                objetivo,
                'ofrenda-filtro',
                5
            );

            if (filtro) {
                var todosFiltros =
                    calendario.querySelectorAll(
                        '.ofrenda-filtro'
                    );

                for (var x = 0; x < todosFiltros.length; x++) {
                    todosFiltros[x].classList.remove(
                        'ofrenda-filtro-activo'
                    );
                }

                filtro.classList.add(
                    'ofrenda-filtro-activo'
                );

                aplicarFiltro(
                    calendario,
                    filtro.getAttribute('data-filtro') || 'Todos'
                );

                return;
            }

            var botonDia = padreConClase(
                objetivo,
                'ofrenda-dia-boton',
                5
            );

            if (botonDia) {

                if (
                    botonDia.classList.contains(
                        'ofrenda-dia-bloqueado'
                    )
                ) {
                    return;
                }

                var mesDia = padreConClase(
                    botonDia,
                    'ofrenda-mes',
                    5
                );

                if (mesDia) {
                    mostrarDia(
                        mesDia,
                        botonDia.getAttribute(
                            'data-ofrenda-dia'
                        )
                    );
                }
            }
        });
    }

    function iniciar() {
        var calendarios = document.querySelectorAll(
            '.ofrenda-calendario-general'
        );

        for (var i = 0; i < calendarios.length; i++) {
            iniciarCalendario(calendarios[i]);
        }
    }

    function cargarCSS() {

        if (document.getElementById('ofrendas-css')) {
            return;
        }

        var css = '';

        css += '.ofrenda-meses-botones{';
        css += 'display:flex;';
        css += 'flex-wrap:wrap;';
        css += 'gap:4px;';
        css += 'margin:10px auto 6px;';
        css += 'max-width:700px;';
        css += 'justify-content:center;';
        css += '}';

        css += '.ofrenda-mes-boton{';
        css += 'display:inline-block;';
        css += 'padding:6px 10px;';
        css += 'border:1px solid #444;';
        css += 'border-radius:6px;';
        css += 'background:#232321;';
        css += 'color:#ccc;';
        css += 'font-family:Calibri,Tahoma,sans-serif;';
        css += 'font-size:12px;';
        css += 'line-height:1.2;';
        css += 'cursor:pointer;';
        css += 'user-select:none;';
        css += 'transition:filter .12s;';
        css += '}';

        css += '.ofrenda-mes-boton:hover{';
        css += 'filter:brightness(1.2);';
        css += '}';

        css += '.ofrenda-mes-boton-activo{';
        css += 'background:#c5b285!important;';
        css += 'border-color:#c5b285!important;';
        css += 'color:#111!important;';
        css += 'font-weight:bold;';
        css += '}';

        css += '.ofrenda-filtros{';
        css += 'display:flex;';
        css += 'flex-wrap:wrap;';
        css += 'gap:5px;';
        css += 'margin:8px auto 10px;';
        css += 'max-width:700px;';
        css += 'justify-content:center;';
        css += '}';

        css += '.ofrenda-filtro{';
        css += 'display:inline-flex;';
        css += 'align-items:center;';
        css += 'gap:5px;';
        css += 'padding:5px 8px;';
        css += 'border:1px solid #444;';
        css += 'border-radius:6px;';
        css += 'font-family:Calibri,Tahoma,sans-serif;';
        css += 'font-size:12px;';
        css += 'line-height:1.2;';
        css += 'cursor:pointer;';
        css += 'user-select:none;';
        css += 'transition:filter .12s,transform .12s;';
        css += '}';

        css += '.ofrenda-filtro:hover{';
        css += 'filter:brightness(1.15);';
        css += '}';

        css += '.ofrenda-filtro-activo{';
        css += 'outline:2px solid #fff;';
        css += 'outline-offset:1px;';
        css += 'font-weight:bold;';
        css += 'filter:brightness(1.08);';
        css += '}';

        css += '.ofrenda-filtro-contador{';
        css += 'font-size:10px;';
        css += 'font-weight:bold;';
        css += 'opacity:.8;';
        css += '}';

        css += '.ofrenda-mes{';
        css += 'display:none;';
        css += '}';

        css += '.ofrenda-mes.ofrenda-mes-activo{';
        css += 'display:block;';
        css += '}';

        css += '.ofrenda-dias{';
        css += 'display:grid;';
        css += 'grid-template-columns:repeat(7,1fr);';
        css += 'gap:4px;';
        css += 'margin:10px 0;';
        css += '}';

        css += '.ofrenda-dia-boton{';
        css += 'display:block;';
        css += 'padding:6px 3px;';
        css += 'border:1px solid #444;';
        css += 'border-left-width:3px;';
        css += 'border-radius:5px;';
        css += 'background:#232321;';
        css += 'color:#ddd;';
        css += 'font-family:Calibri,Tahoma,sans-serif;';
        css += 'font-size:12px;';
        css += 'line-height:1.2;';
        css += 'text-align:center;';
        css += 'cursor:pointer;';
        css += 'user-select:none;';
        css += 'transition:filter .12s,opacity .12s;';
        css += '}';

        css += '.ofrenda-dia-boton:hover{';
        css += 'filter:brightness(1.2);';
        css += '}';

        css += '.ofrenda-dia-activo{';
        css += 'font-weight:bold;';
        css += 'filter:brightness(1.08);';
        css += 'outline:2px solid #fff;';
        css += 'outline-offset:1px;';
        css += '}';

        css += '.ofrenda-dia-bloqueado{';
        css += 'display:none;';
        css += '}';

        css += '.ofrenda-contenidos{';
        css += 'margin-top:10px;';
        css += '}';

        css += '.ofrenda-contenido-dia{';
        css += 'display:none!important;';
        css += '}';

        css += '.ofrenda-contenido-dia.ofrenda-contenido-activo{';
        css += 'display:block!important;';
        css += '}';

        css += '.ofrenda-mes-sin-resultados:after{';
        css += 'content:"No hay ofrendas de este tipo en este mes";';
        css += 'display:block;';
        css += 'padding:10px;';
        css += 'margin:10px 0;';
        css += 'background:#1b1b1b;';
        css += 'border:1px solid #333;';
        css += 'border-radius:6px;';
        css += 'color:#888;';
        css += 'font-family:Calibri,Tahoma,sans-serif;';
        css += 'font-size:12px;';
        css += 'text-align:center;';
        css += '}';

        css += '@media(max-width:600px){';

        css += '.ofrenda-meses-botones{';
        css += 'flex-wrap:nowrap;';
        css += 'justify-content:flex-start;';
        css += 'overflow-x:auto;';
        css += 'padding:2px 2px 5px;';
        css += 'scrollbar-width:thin;';
        css += '}';

        css += '.ofrenda-mes-boton{';
        css += 'flex:0 0 auto;';
        css += 'padding:5px 8px;';
        css += 'font-size:11px;';
        css += '}';

        css += '.ofrenda-filtros{';
        css += 'gap:4px;';
        css += 'justify-content:flex-start;';
        css += '}';

        css += '.ofrenda-filtro{';
        css += 'font-size:11px;';
        css += 'padding:5px 7px;';
        css += '}';

        css += '.ofrenda-dias{';
        css += 'gap:3px;';
        css += '}';

        css += '.ofrenda-dia-boton{';
        css += 'padding:5px 1px;';
        css += 'font-size:11px;';
        css += '}';

        css += '}';

        var style = document.createElement('style');

        style.id = 'ofrendas-css';

        style.appendChild(
            document.createTextNode(css)
        );

        document.getElementsByTagName('head')[0]
            .appendChild(style);
    }

    cargarCSS();

    if (
        typeof mw !== 'undefined' &&
        mw.hook
    ) {
        mw.hook('wikipage.content').add(function () {
            iniciar();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            iniciar
        );
    } else {
        iniciar();
    }

    setTimeout(iniciar, 100);
    setTimeout(iniciar, 500);
    setTimeout(iniciar, 1000);
    setTimeout(iniciar, 2000);

})();