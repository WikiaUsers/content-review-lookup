AjaxRCRefreshText = 'Automaticamente recarregar a página a cada 60segs';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
window.ajaxSpecialPages = [
    "Especial:Mudanças_recentes",
    "Especial:WikiActivity",
    "Especial:Páginas_vigiadas",
    "Especial:Registro",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
];

// Importações
importArticles({
    type: 'script',
    articles: [
        'u:dev:ReferencePopups/code.js', // Referências
        'u:dev:LockForums/code.js', // Fóruns
        'u:dev:Countdown/code.js', // Contador
        'u:dev:LastEdited/code.js', // Edições
        'u:dev:MessageBlocker/code.js', // Bloqueio de Mensagens
        'u:dev:ShowHide/code.js' // Mostrar e Ocultar
    ]
});