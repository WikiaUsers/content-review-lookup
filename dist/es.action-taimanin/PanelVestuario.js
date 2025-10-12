"use strict";

(() => {
    const paneles = document.querySelectorAll(".vestuario-panel");

    paneles.forEach(panel => {
        const botones = Array.from(panel.querySelectorAll(".vestuario-boton"));

        botones.forEach(boton => {
            const nombre = boton.dataset.nombre;
            const conmutaciones = parseInt(boton.dataset.conmutaciones || "0", 10);
            const tinte = boton.dataset.tinte === "1";
            let posicion = parseInt(boton.dataset.posicion || "1", 10);

            function actualizarClases() {
                boton.classList.remove("activo", "inactivo", "resaltado", "gif");

                if (conmutaciones > 0) {
                    boton.classList.add("activo");

                    if (posicion === conmutaciones && tinte) {
                        boton.classList.add("gif");
                    }
                } else {
                    // Sólo botones: mantiene activo o inactivo
                    if (boton.classList.contains("activo")) {
                        boton.classList.add("activo");
                    } else {
                        boton.classList.add("inactivo");
                    }
                }

                // Actualiza número si existe
                const numero = boton.querySelector(".vestuario-numero");
                if (conmutaciones > 0 && numero) {
                    numero.textContent = posicion;
                }
            }

            boton.addEventListener("mouseenter", () => {
                boton.classList.add("resaltado");
            });

            boton.addEventListener("mouseleave", () => {
                boton.classList.remove("resaltado");
            });

            boton.addEventListener("click", () => {
                if (conmutaciones > 0) {
                    posicion = (posicion % conmutaciones) + 1;
                    boton.dataset.posicion = posicion;
                } else {
                    const estaActivo = boton.classList.contains("activo");
                    boton.classList.toggle("activo", !estaActivo);
                    boton.classList.toggle("inactivo", estaActivo);
                }

                // Lógica especial para botones 4 y 9
                const btn4 = panel.querySelector('div[data-nombre="btn4"]');
                const btn9 = panel.querySelector('div[data-nombre="btn9"]');

                if (nombre === "btn4") {
                    if (posicion === conmutaciones && tinte) {
                        if (btn9) {
                            btn9.classList.remove("inactivo");
                            btn9.classList.add("activo");
                        }
                    } else {
                        if (btn9) {
                            btn9.classList.remove("activo");
                            btn9.classList.add("inactivo");
                        }
                    }
                    if (btn9) actualizarClases.call(btn9);
                }

                if (nombre === "btn9" && boton.classList.contains("activo")) {
                    if (btn4) {
                        btn4.dataset.posicion = conmutaciones;
                        actualizarClases.call(btn4);
                    }
                }

                actualizarClases();
            });

            // Inicialización
            actualizarClases();
        });
    });
})();