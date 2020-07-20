/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */

// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');
 
//Pontuação WAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

//Exclusão Múltipla de Arquivos
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});