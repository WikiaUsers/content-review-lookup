(function () {
    "use strict";

    var CLAVE = "dofuspedia-multicuenta";
    var esMovil = window.matchMedia("(max-width: 767px)").matches;
    var cantidad = parseInt(localStorage.getItem(CLAVE), 10);

    if (!cantidad || cantidad < 1 || cantidad > 8) {
        cantidad = 1;
    }

    function actualizarDescripcion() {
        document.querySelectorAll(".multicuenta-descripcion").forEach(function (elemento) {
            elemento.textContent = cantidad === 1
                ? "Cantidades originales"
                : "Cantidades para " + cantidad + " cuentas";
        });
    }

    function actualizarBotones() {
        document.querySelectorAll(".multicuenta-opcion").forEach(function (boton) {
            var valor = parseInt(boton.getAttribute("data-multicuenta"), 10);
            var activo = valor === cantidad;

            boton.style.background = activo
                ? "linear-gradient(135deg,#0bd9a9,#087f68)"
                : "linear-gradient(135deg,#2a2a2a,#1b1b1b)";

            boton.style.color = activo ? "#111" : "#c5b285";
            boton.style.borderColor = activo ? "#0bd9a9" : "#51483e";
            boton.style.boxShadow = activo
                ? "0 0 6px rgba(11,217,169,.35),inset 0 1px 0 rgba(255,255,255,.12)"
                : "inset 0 1px 0 rgba(255,255,255,.04)";
        });
    }

    function actualizarCantidades() {
        document.querySelectorAll(".multicuenta-cantidad").forEach(function (elemento) {
            var base = parseFloat(elemento.getAttribute("data-cantidad-base"));

            if (isNaN(base)) {
                return;
            }

            var resultado = esMovil ? base : base * cantidad;
            var texto = String(resultado);

            if (elemento.textContent !== texto) {
                elemento.textContent = texto;
            }
        });

        if (!esMovil) {
            actualizarDescripcion();
            actualizarBotones();
        }
    }

    function iniciar() {
        var cantidades = document.querySelectorAll(".multicuenta-cantidad");

        if (!cantidades.length) {
            return;
        }

        if (esMovil) {
            document.querySelectorAll(".multicuenta-panel").forEach(function (panel) {
                panel.style.display = "none";
            });

            actualizarCantidades();
            return;
        }

        document.querySelectorAll(".multicuenta-opcion").forEach(function (boton) {
            boton.addEventListener("click", function () {
                var valor = parseInt(
                    boton.getAttribute("data-multicuenta"),
                    10
                );

                if (!valor || valor < 1 || valor > 8) {
                    return;
                }

                cantidad = valor;
                localStorage.setItem(CLAVE, String(cantidad));

                actualizarCantidades();
            });
        });

        actualizarCantidades();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
}());