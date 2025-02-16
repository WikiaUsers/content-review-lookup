mw.loader.using('mediawiki.util').then(function () {
    function inserirCitação() {
        var tipo = prompt("Digite o tipo (tm, tmj ou cdc):", "tm");
        if (!tipo) return;

        var numero = prompt("Número da edição:");
        if (!numero) return;

        var nome = (tipo !== "cdc") ? prompt("Nome da historinha:") : prompt("Nome da edição:");
        if (!nome) return;

        var pagina = prompt("Página (opcional):");
        var quadrinho = prompt("Quadrinho (opcional):");

        var versao = (tipo === "tmj") ? prompt("Versão (1 ou 2, opcional):", "1") : "";

        var predef;
        if (tipo === "tmj") {
            predef = `{{Citar edição |tipo=tmj |número=${numero} |versão=${versao} |nome=${nome}${pagina ? ` |página=${pagina}` : ""}${quadrinho ? ` |quadrinho=${quadrinho}` : ""}}}`;
        } else if (tipo === "cdc") {
            predef = `{{Citar edição |tipo=cdc |número=${numero} |nome=${nome}${pagina ? ` |página=${pagina}` : ""}${quadrinho ? ` |quadrinho=${quadrinho}` : ""}}}`;
        } else {
            var editora = prompt("Editora da edição:");
            predef = `{{Citar edição |nome da edição=${nome} |número da edição=${numero} |editora da edição=${editora}${pagina ? ` |página da edição=${pagina}` : ""}${quadrinho ? ` |quadrinho da edição=${quadrinho}` : ""}}}`;
        }

        mw.toolbar.insertTags(predef, '', '');
    }

    $(document).ready(function () {
        if (mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') {
            mw.util.addPortletLink(
                'p-cactions', 
                '#', 
                'Citar edição', 
                'citar-edicao', 
                'Inserir uma citação de edição', 
                '', 
                ''
            ).addEventListener('click', function (e) {
                e.preventDefault();
                inserirCitação();
            });
        }
    });
});