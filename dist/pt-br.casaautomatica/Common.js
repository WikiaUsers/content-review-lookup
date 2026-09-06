/* sem imagem preview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = '';
window.pPreview.RegExp.iparents = ['.hatnote', '#myid', 'div[data-ignore-me=1]'];

(function () {
    'use strict';

    var BUTTON_ID = 'fandom-infobox-image-search-button';
    var MODAL_ID = 'fandom-infobox-image-search-modal';

    var RESULTS_PER_SEARCH = 30;
    var THUMBNAIL_WIDTH = 180;


    /* ============================================================
     * LOCALIZAR O CAMPO "IMAGEM"
     * ============================================================ */

    function encontrarCampoImagem() {

        var paginas = document.querySelectorAll(
            '.ve-ui-mwParameterPage'
        );

        for (var i = 0; i < paginas.length; i++) {

            var pagina = paginas[i];

            var label = pagina.querySelector(
                '.ve-ui-mwParameterPage-label'
            );

            if (!label) {
                continue;
            }

            var texto = (label.textContent || '')
                .trim()
                .toLowerCase();

            if (
                texto !== 'imagem' &&
                texto !== 'image'
            ) {
                continue;
            }

            /*
             * O label aponta diretamente para o campo.
             *
             * Exemplo:
             * <label for="ooui-17">Imagem</label>
             */
            var id = label.getAttribute('for');

            if (!id) {
                continue;
            }

            var campo = document.getElementById(id);

            if (!campo) {
                continue;
            }

            var field = pagina.querySelector(
                '.ve-ui-mwParameterPage-field'
            );

            if (!field) {
                continue;
            }

            return {
                pagina: pagina,
                label: label,
                campo: campo,
                field: field
            };
        }

        return null;
    }


    /* ============================================================
     * ADICIONAR BOTÃO
     * ============================================================ */

    function adicionarBotao() {

        var dados = encontrarCampoImagem();

        if (!dados) {
            return;
        }

        var field = dados.field;

        /*
         * Evita duplicar o botão.
         */
        if (
            field.querySelector(
                '#' + BUTTON_ID
            )
        ) {
            return;
        }


        var botao = document.createElement('button');

        botao.id = BUTTON_ID;

        botao.type = 'button';

        botao.textContent =
            '🔎 Pesquisar imagens';

        botao.title =
            'Pesquisar imagens nesta wiki';


        /*
         * Aparência.
         */
        botao.style.marginTop = '8px';

        botao.style.padding = '7px 12px';

        botao.style.border =
            '1px solid #72777d';

        botao.style.borderRadius = '4px';

        botao.style.background =
            '#2a2d31';

        botao.style.color =
            '#ffffff';

        botao.style.fontSize =
            '13px';

        botao.style.fontWeight =
            '600';

        botao.style.cursor =
            'pointer';

        botao.style.display =
            'inline-block';


        botao.addEventListener(
            'mouseenter',
            function () {

                botao.style.background =
                    '#3a3d43';
            }
        );


        botao.addEventListener(
            'mouseleave',
            function () {

                botao.style.background =
                    '#2a2d31';
            }
        );


        botao.addEventListener(
            'click',
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                abrirPesquisa(
                    dados.campo
                );
            }
        );


        field.appendChild(botao);
    }


    /* ============================================================
     * ABRIR JANELA DE PESQUISA
     * ============================================================ */

    function abrirPesquisa(campo) {

        var antigo =
            document.getElementById(MODAL_ID);

        if (antigo) {
            antigo.remove();
        }


        /*
         * Overlay.
         */
        var overlay =
            document.createElement('div');

        overlay.id = MODAL_ID;

        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.left = '0';

        overlay.style.zIndex = '999999';

        overlay.style.background =
            'rgba(0, 0, 0, 0.72)';

        overlay.style.display = 'flex';

        overlay.style.alignItems =
            'center';

        overlay.style.justifyContent =
            'center';

        overlay.style.padding = '20px';

        overlay.style.boxSizing =
            'border-box';


        /*
         * Janela.
         */
        var janela =
            document.createElement('div');

        janela.style.width = '900px';

        janela.style.maxWidth = '95vw';

        janela.style.height = '700px';

        janela.style.maxHeight = '90vh';

        janela.style.background = '#202225';

        janela.style.color = '#ffffff';

        janela.style.border =
            '1px solid #45484d';

        janela.style.borderRadius = '8px';

        janela.style.boxShadow =
            '0 10px 40px rgba(0,0,0,.55)';

        janela.style.display = 'flex';

        janela.style.flexDirection =
            'column';

        janela.style.overflow = 'hidden';


        /* ========================================================
         * CABEÇALHO
         * ======================================================== */

        var cabecalho =
            document.createElement('div');

        cabecalho.style.display = 'flex';

        cabecalho.style.alignItems =
            'center';

        cabecalho.style.padding =
            '14px 18px';

        cabecalho.style.borderBottom =
            '1px solid #444';


        var titulo =
            document.createElement('strong');

        titulo.textContent =
            'Pesquisar imagem';

        titulo.style.fontSize =
            '18px';


        var fechar =
            document.createElement('button');

        fechar.type = 'button';

        fechar.textContent = '✕';

        fechar.title = 'Fechar';

        fechar.style.marginLeft =
            'auto';

        fechar.style.border =
            'none';

        fechar.style.background =
            'transparent';

        fechar.style.color =
            '#ffffff';

        fechar.style.fontSize =
            '20px';

        fechar.style.cursor =
            'pointer';


        fechar.addEventListener(
            'click',
            function () {

                overlay.remove();
            }
        );


        cabecalho.appendChild(titulo);
        cabecalho.appendChild(fechar);


        /* ========================================================
         * BARRA DE PESQUISA
         * ======================================================== */

        var barra =
            document.createElement('div');

        barra.style.display = 'flex';

        barra.style.gap = '8px';

        barra.style.padding = '15px';

        barra.style.borderBottom =
            '1px solid #444';


        var pesquisa =
            document.createElement('input');

        pesquisa.type = 'search';

        pesquisa.placeholder =
            'Digite o nome da imagem...';

        pesquisa.autocomplete = 'off';

        pesquisa.style.flex = '1';

        pesquisa.style.minWidth = '0';

        pesquisa.style.padding =
            '9px 11px';

        pesquisa.style.border =
            '1px solid #666';

        pesquisa.style.borderRadius =
            '4px';

        pesquisa.style.background =
            '#2b2d31';

        pesquisa.style.color =
            '#ffffff';

        pesquisa.style.fontSize =
            '14px';


        var botaoPesquisar =
            document.createElement('button');

        botaoPesquisar.type =
            'button';

        botaoPesquisar.textContent =
            'Pesquisar';

        botaoPesquisar.style.padding =
            '9px 15px';

        botaoPesquisar.style.cursor =
            'pointer';

        botaoPesquisar.style.border =
            '1px solid #666';

        botaoPesquisar.style.borderRadius =
            '4px';

        botaoPesquisar.style.background =
            '#36393f';

        botaoPesquisar.style.color =
            '#ffffff';

        botaoPesquisar.style.fontWeight =
            '600';


        barra.appendChild(pesquisa);

        barra.appendChild(
            botaoPesquisar
        );


        /* ========================================================
         * STATUS
         * ======================================================== */

        var status =
            document.createElement('div');

        status.style.padding =
            '10px 15px';

        status.style.color =
            '#b9bbbe';

        status.style.fontSize =
            '13px';

        status.textContent =
            'Digite o nome de uma imagem para pesquisar.';


        /* ========================================================
         * RESULTADOS
         * ======================================================== */

        var resultados =
            document.createElement('div');

        resultados.style.flex = '1';

        resultados.style.overflowY =
            'auto';

        resultados.style.padding =
            '0 15px 15px';

        resultados.style.display =
            'grid';

        resultados.style.gridTemplateColumns =
            'repeat(auto-fill, minmax(160px, 1fr))';

        resultados.style.alignContent =
            'start';

        resultados.style.gap = '12px';


        janela.appendChild(cabecalho);

        janela.appendChild(barra);

        janela.appendChild(status);

        janela.appendChild(resultados);


        overlay.appendChild(janela);

        document.body.appendChild(
            overlay
        );


        /* ========================================================
         * FUNÇÃO DE PESQUISA
         * ======================================================== */

        function pesquisarImagens() {

            var termo =
                pesquisa.value.trim();


            resultados.innerHTML = '';


            if (!termo) {

                status.textContent =
                    'Digite algo para pesquisar.';

                return;
            }


            status.textContent =
                'Pesquisando...';


            botaoPesquisar.disabled =
                true;


            /*
             * API MediaWiki.
             */
            var api = new mw.Api();


            /*
             * ====================================================
             * ETAPA 1
             *
             * Pesquisa diretamente no namespace 6 (File).
             *
             * IMPORTANTE:
             *
             * Aqui NÃO usamos:
             *
             *     file:termo
             *
             * porque já estamos restringindo:
             *
             *     srnamespace = 6
             *
             * ====================================================
             */

            api.get({

                action: 'query',

                format: 'json',

                list: 'search',

                srsearch: termo,

                srnamespace: 6,

                srlimit:
                    RESULTS_PER_SEARCH,

                srwhat: 'text'

            }).done(function (dados) {


                /*
                 * Nenhum resultado.
                 */
                if (
                    !dados ||
                    !dados.query ||
                    !dados.query.search
                ) {

                    botaoPesquisar.disabled =
                        false;

                    status.textContent =
                        'Nenhuma imagem encontrada.';

                    return;
                }


                var resultadosBusca =
                    dados.query.search;


                if (
                    !resultadosBusca.length
                ) {

                    botaoPesquisar.disabled =
                        false;

                    status.textContent =
                        'Nenhuma imagem encontrada.';

                    return;
                }


                /*
                 * Pegamos os títulos:
                 *
                 * File:Imagem.jpg
                 */
                var titulos =
                    resultadosBusca
                        .map(function (resultado) {

                            return resultado.title;
                        })
                        .filter(Boolean);


                if (!titulos.length) {

                    botaoPesquisar.disabled =
                        false;

                    status.textContent =
                        'Nenhuma imagem encontrada.';

                    return;
                }


                /*
                 * =================================================
                 * ETAPA 2
                 *
                 * Busca informações reais dos arquivos.
                 * =================================================
                 */

                api.get({

                    action: 'query',

                    format: 'json',

                    titles:
                        titulos.join('|'),

                    prop: 'imageinfo',

                    iiprop:
                        'url|mime|size',

                    iiurlwidth:
                        THUMBNAIL_WIDTH,

                    iilimit: 1

                }).done(function (infoDados) {

                    botaoPesquisar.disabled =
                        false;


                    resultados.innerHTML =
                        '';


                    if (
                        !infoDados ||
                        !infoDados.query ||
                        !infoDados.query.pages
                    ) {

                        status.textContent =
                            'Nenhuma imagem encontrada.';

                        return;
                    }


                    var paginas =
                        Object.values(
                            infoDados.query.pages
                        );


                    /*
                     * Só aceitamos arquivos que
                     * realmente sejam imagens.
                     */
                    var imagens =
                        paginas.filter(
                            function (pagina) {

                                if (
                                    !pagina.imageinfo ||
                                    !pagina.imageinfo.length
                                ) {
                                    return false;
                                }


                                var info =
                                    pagina.imageinfo[0];


                                var mime =
                                    info.mime || '';


                                return mime.indexOf(
                                    'image/'
                                ) === 0;
                            }
                        );


                    if (!imagens.length) {

                        status.textContent =
                            'Nenhuma imagem encontrada.';

                        return;
                    }


                    status.textContent =
                        imagens.length +
                        ' imagem(ns) encontrada(s).';


                    /*
                     * Preserva a ordem da busca.
                     */
                    titulos.forEach(
                        function (titulo) {

                            var pagina =
                                imagens.find(
                                    function (item) {

                                        return item.title ===
                                            titulo;
                                    }
                                );


                            if (pagina) {

                                criarResultado(
                                    pagina
                                );
                            }
                        }
                    );


                }).fail(function (erro) {

                    console.error(
                        '[Infobox Image Search] ' +
                        'Erro ao obter imageinfo:',
                        erro
                    );


                    botaoPesquisar.disabled =
                        false;


                    status.textContent =
                        'Erro ao obter as imagens.';
                });


            }).fail(function (erro) {

                console.error(
                    '[Infobox Image Search] ' +
                    'Erro na pesquisa:',
                    erro
                );


                botaoPesquisar.disabled =
                    false;


                status.textContent =
                    'Erro ao pesquisar imagens.';
            });
        }


        /* ========================================================
         * CRIAR CARD
         * ======================================================== */

        function criarResultado(pagina) {

            var info =
                pagina.imageinfo[0];


            var nome =
                pagina.title.replace(
                    /^File:/i,
                    ''
                );


            var card =
                document.createElement('button');


            card.type = 'button';


            card.style.display = 'flex';

            card.style.flexDirection =
                'column';

            card.style.padding = '8px';

            card.style.border =
                '1px solid #45484d';

            card.style.borderRadius =
                '6px';

            card.style.background =
                '#2b2d31';

            card.style.color =
                '#ffffff';

            card.style.cursor =
                'pointer';

            card.style.textAlign =
                'left';

            card.style.transition =
                'transform .12s, background .12s';

            card.style.minWidth =
                '0';


            card.addEventListener(
                'mouseenter',
                function () {

                    card.style.background =
                        '#36393f';

                    card.style.transform =
                        'translateY(-1px)';
                }
            );


            card.addEventListener(
                'mouseleave',
                function () {

                    card.style.background =
                        '#2b2d31';

                    card.style.transform =
                        'none';
                }
            );


            /*
             * Miniatura.
             */
            var imagem =
                document.createElement('img');


            imagem.src =
                info.thumburl ||
                info.url;


            imagem.alt =
                nome;


            imagem.loading =
                'lazy';


            imagem.style.width =
                '100%';


            imagem.style.height =
                '140px';


            imagem.style.objectFit =
                'contain';


            imagem.style.display =
                'block';


            imagem.style.background =
                '#18191b';


            imagem.style.marginBottom =
                '8px';


            /*
             * Nome do arquivo.
             */
            var texto =
                document.createElement('div');


            texto.textContent =
                nome;


            texto.style.fontSize =
                '13px';


            texto.style.fontWeight =
                '600';


            texto.style.lineHeight =
                '1.3';


            texto.style.wordBreak =
                'break-word';


            texto.style.overflowWrap =
                'anywhere';


            card.appendChild(
                imagem
            );


            card.appendChild(
                texto
            );


            /*
             * Selecionar.
             */
            card.addEventListener(
                'click',
                function () {

                    definirValorCampo(
                        campo,
                        nome
                    );


                    overlay.remove();
                }
            );


            resultados.appendChild(
                card
            );
        }


        /* ========================================================
         * DEFINIR VALOR NO OOUI
         * ======================================================== */

        function definirValorCampo(
            campo,
            valor
        ) {

            try {
                campo.focus();
            } catch (e) {}


            /*
             * Usa o setter nativo do textarea.
             */
            var prototype =
                Object.getPrototypeOf(
                    campo
                );


            var descriptor =
                Object.getOwnPropertyDescriptor(
                    prototype,
                    'value'
                );


            if (
                descriptor &&
                descriptor.set
            ) {

                descriptor.set.call(
                    campo,
                    valor
                );

            } else {

                campo.value =
                    valor;
            }


            /*
             * Dispara input.
             */
            try {

                campo.dispatchEvent(
                    new InputEvent(
                        'input',
                        {
                            bubbles: true,
                            inputType:
                                'insertText',
                            data:
                                valor
                        }
                    )
                );

            } catch (e) {

                campo.dispatchEvent(
                    new Event(
                        'input',
                        {
                            bubbles: true
                        }
                    )
                );
            }


            /*
             * Dispara change.
             */
            campo.dispatchEvent(
                new Event(
                    'change',
                    {
                        bubbles: true
                    }
                )
            );


            /*
             * OOUI/jQuery.
             */
            try {

                $(campo).trigger(
                    'input'
                );

                $(campo).trigger(
                    'change'
                );

            } catch (e) {}
        }


        /* ========================================================
         * EVENTOS
         * ======================================================== */

        botaoPesquisar.addEventListener(
            'click',
            pesquisarImagens
        );


        pesquisa.addEventListener(
            'keydown',
            function (event) {

                if (
                    event.key === 'Enter'
                ) {

                    event.preventDefault();

                    pesquisarImagens();
                }


                if (
                    event.key === 'Escape'
                ) {

                    event.preventDefault();

                    overlay.remove();
                }
            }
        );


        /*
         * Se já existe alguma coisa no campo,
         * usa o conteúdo como pesquisa inicial.
         */
        if (campo.value) {

            pesquisa.value =
                String(campo.value)
                    .replace(
                        /\.(png|jpe?g|gif|webp|svg)$/i,
                        ''
                    );
        }


        pesquisa.focus();


        /*
         * Clicar no fundo fecha.
         */
        overlay.addEventListener(
            'click',
            function (event) {

                if (
                    event.target === overlay
                ) {

                    overlay.remove();
                }
            }
        );
    }


    /* ============================================================
     * OBSERVER
     * ============================================================ */

    var observerIniciado = false;


    function iniciarObserver() {

        if (observerIniciado) {
            return;
        }

        observerIniciado = true;


        if (!document.body) {
            return;
        }


        var observer =
            new MutationObserver(
                function () {

                    /*
                     * O Fandom cria o diálogo dinamicamente.
                     */
                    if (
                        document.querySelector(
                            '.ve-ui-mwParameterPage'
                        )
                    ) {

                        adicionarBotao();
                    }
                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }


    /* ============================================================
     * INICIALIZAÇÃO
     * ============================================================ */

    function iniciar() {

        iniciarObserver();

        adicionarBotao();


        setTimeout(
            adicionarBotao,
            300
        );

        setTimeout(
            adicionarBotao,
            700
        );

        setTimeout(
            adicionarBotao,
            1500
        );

        setTimeout(
            adicionarBotao,
            3000
        );
    }


    $(function () {

        iniciar();
    });


    /* ============================================================
     * HOOKS DO VISUALEDITOR
     * ============================================================ */

    if (
        typeof mw !== 'undefined' &&
        mw.hook
    ) {

        mw.hook(
            've.activationComplete'
        ).add(
            function () {

                iniciar();
            }
        );


        mw.hook(
            've.loadModules'
        ).add(
            function () {

                setTimeout(
                    adicionarBotao,
                    500
                );
            }
        );
    }

})();