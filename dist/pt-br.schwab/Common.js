/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SpoilerAlert/code.js',
    ]
});

// Alerta de Spoilers e N�o Finalizados
window.SpoilerAlertJS = {
    question: 'ATEN��O! Esta �rea cont�m spoilers ou informa��es provis�rias que voc� pode n�o querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'N�o, ainda n�o',
    fadeDelay: 1600
};