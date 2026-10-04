(function () {
    "use strict";

    var activo = null;
    var cantidades = new WeakMap();
    var MAXIMO = 99999;
    var MENSAJE = "Escribe una cantidad";

    function mostrarCantidad(elemento, cantidad) {
        elemento.textContent = String(cantidad);
        elemento.style.color = "#fff";
        cantidades.set(elemento, cantidad);
    }

    function mostrarVacio(elemento) {
        elemento.textContent = MENSAJE;
        elemento.style.color = "#8e8e8e";
        cantidades.delete(elemento);
    }

    function obtenerCantidad(elemento) {
        if (!cantidades.has(elemento)) {
            return 1;
        }

        return cantidades.get(elemento);
    }

    function calcularReceta(calculador, cantidad) {
        var receta = calculador.closest("td");

        if (!receta) {
            return;
        }

        receta.querySelectorAll(".objeto-receta-cantidad").forEach(function (elemento) {
            var base = parseFloat(elemento.getAttribute("data-cantidad-base"));

            if (isNaN(base)) {
                return;
            }

            elemento.textContent = String(base * cantidad);
        });
    }

    function activar(elemento) {
        if (activo && activo !== elemento) {
            activo.style.borderColor = "#51483e";
            activo.style.boxShadow = "none";
        }

        activo = elemento;
        elemento.style.borderColor = "#0bd9a9";
        elemento.style.boxShadow = "0 0 6px rgba(11,217,169,.45),inset 0 0 4px rgba(11,217,169,.12)";

        if (!cantidades.has(elemento)) {
            mostrarVacio(elemento);
        }
    }

    function desactivar() {
        if (!activo) {
            return;
        }

        activo.style.borderColor = "#51483e";
        activo.style.boxShadow = "none";
        activo = null;
    }

    function establecerCantidad(elemento, cantidad) {
        if (!cantidad || cantidad < 1) {
            cantidad = 1;
        }

        if (cantidad > MAXIMO) {
            cantidad = MAXIMO;
        }

        mostrarCantidad(elemento, cantidad);

        var calculador = elemento.closest(".recetas-calculador");

        if (calculador) {
            calcularReceta(calculador, cantidad);
        }
    }

    function restablecer(elemento) {
        mostrarCantidad(elemento, 1);

        var calculador = elemento.closest(".recetas-calculador");

        if (calculador) {
            calcularReceta(calculador, 1);
        }

        desactivar();
    }

    document.addEventListener("click", function (evento) {
        var valor = evento.target.closest(".recetas-valor");

        if (valor) {
            activar(valor);
            return;
        }

        var boton = evento.target.closest(".recetas-restablecer");

        if (boton) {
            var calculador = boton.closest(".recetas-calculador");

            if (calculador) {
                var elemento = calculador.querySelector(".recetas-valor");

                if (elemento) {
                    restablecer(elemento);
                }
            }
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (!activo) {
            return;
        }

        var tecla = evento.key;

        if (/^[0-9]$/.test(tecla)) {
            evento.preventDefault();

            var textoActual = cantidades.has(activo)
                ? String(obtenerCantidad(activo))
                : "";

            var nuevoTexto = textoActual + tecla;
            var cantidad = parseInt(nuevoTexto, 10);

            if (cantidad > MAXIMO) {
                cantidad = MAXIMO;
            }

            establecerCantidad(activo, cantidad);
            return;
        }

        if (tecla === "Backspace") {
            evento.preventDefault();

            if (!cantidades.has(activo)) {
                return;
            }

            var texto = String(obtenerCantidad(activo));

            if (texto.length > 1) {
                texto = texto.slice(0, -1);
                establecerCantidad(activo, parseInt(texto, 10));
            } else {
                mostrarVacio(activo);
            }

            return;
        }

        if (tecla === "Escape") {
            evento.preventDefault();
            restablecer(activo);
            return;
        }

        if (tecla === "Enter") {
            evento.preventDefault();

            if (!cantidades.has(activo)) {
                establecerCantidad(activo, 1);
            }

            desactivar();
        }
    });
}());