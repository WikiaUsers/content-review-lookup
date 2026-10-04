$(function() {
    var categoriaNSFW = "NSFW"; 

    // Verificar si estamos en la categoría o en una página con la categoría NSFW
    var categoriasPagina = mw.config.get('wgCategories') || [];
    var esPaginaDeCategoria = (mw.config.get('wgCanonicalNamespace') === 'Category' && mw.config.get('wgTitle') === categoriaNSFW);
    var perteneceACategoria = categoriasPagina.indexOf(categoriaNSFW) !== -1;

    if (esPaginaDeCategoria || perteneceACategoria) {
        
        // Estilos para el modal overlay
        var css = `
            #nsfw-warning-overlay {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(8px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: inherit;
            }
            #nsfw-warning-box {
                background: #1e1e24;
                color: #ffffff;
                padding: 30px;
                border-radius: 12px;
                max-width: 450px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                border: 1px solid #333;
            }
            #nsfw-warning-box h2 {
                margin-top: 0;
                color: #ff4757;
                font-size: 1.5rem;
            }
            #nsfw-warning-box p {
                font-size: 0.95rem;
                line-height: 1.5;
                color: #ccc;
                margin: 15px 0 25px 0;
            }
            .nsfw-btn-container {
                display: flex;
                gap: 10px;
                justify-content: center;
            }
            .nsfw-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
                transition: background 0.2s;
            }
            .nsfw-btn-accept {
                background: #ff4757;
                color: white;
            }
            .nsfw-btn-accept:hover {
                background: #ff6b81;
            }
            .nsfw-btn-cancel {
                background: #3a3b3c;
                color: white;
            }
            .nsfw-btn-cancel:hover {
                background: #4e4f50;
            }
        `;

        // Inyectar CSS
        $('<style>').text(css).appendTo('head');

        // Crear la estructura HTML del modal
        var $overlay =$(`
            <div id="nsfw-warning-overlay">
                <div id="nsfw-warning-box">
                    <h2>⚠️ ADVERTENCIA: CONTENIDO NSFW (+18)</h2>
                    <p>Esta página contiene material clasificado como sensible o no apto para todo público. ¿Deseas continuar?</p>
                    <div class="nsfw-btn-container">
                        <button class="nsfw-btn nsfw-btn-cancel" id="nsfw-cancel-btn">Volver atrás</button>
                        <button class="nsfw-btn nsfw-btn-accept" id="nsfw-accept-btn">Continuar</button>
                    </div>
                </div>
            </div>
        `);

        // Agregar al cuerpo de la página
        $('body').append($overlay);

        // Eventos de los botones
        $('#nsfw-accept-btn').on('click', function() {
            $('#nsfw-warning-overlay').remove();
        });

        $('#nsfw-cancel-btn').on('click', function() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = mw.util.getUrl(mw.config.get('wgMainPageTitle'));
            }
        });
    }
});