AjaxRCRefreshText = 'Automaticamente recarregar a p�gina a cada 60segs';
AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
window.ajaxSpecialPages = [
    "Especial:Mudan�as_recentes",
    "Especial:WikiActivity",
    "Especial:P�ginas_vigiadas",
    "Especial:Registro",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:P�ginas_novas",
    "Especial:Contribui��es"
];

// Importa��es
importArticles({
    type: 'script',
    articles: [
        'u:dev:ReferencePopups/code.js', // Refer�ncias
        'u:dev:LockForums/code.js', // F�runs
        'u:dev:Countdown/code.js', // Contador
        'u:dev:LastEdited/code.js', // Edi��es
        'u:dev:MessageBlocker/code.js', // Bloqueio de Mensagens
        'u:dev:ShowHide/code.js' // Mostrar e Ocultar
    ]
});