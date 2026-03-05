/* Revelar IP Anônimo */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};



/* Atualização Automática */
window.ajaxPages = [
    "Especial:RecentChanges",
    "Especial:Watchlist",
    "Especial:Log",
    "Especial:Contributions",
    "Especial:WikiActivity"
];
window.AjaxRCRefreshText = 'Atualização automática';
window.AjaxRCRefreshHoverText = 'Atualizar a página automaticamente';



/* Relógio da Wiki */
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{de Jan;de Fev;de Mar;de Abr;de Maio;de Jun;de Jul;de Ago;de Set;de Out;de Nov;de Dez}m de %Y (GMT -3)';



/* Estilização - Trancar Fórums */
window.LockForums = {
    expiryDays: 7,
    expiryMessage: "Este tópico foi considerado arquivado pois não há novos comentários há mais de 7 dias.",
    forumName: "Fórum" 
};

/* Mensagem de Bloqueio Automática */
window.MessageBlock = {
  title : 'Bloqueado',
  message : 'Você foi bloqueado por $2 pelo(s) seguinte(s) motivo(s): "$1"',
  autocheck : true
};



/* Editado por Último */
window.lastEdited = {
    avatar: true
};



/* Configurações do Mass Protect */
window.massProtectDelay = 1000;



/* Configurações do PageRenameAuto-update */
window.PRAoptions = {
    editSummary: 'Atualizando página (processo automático)'
};



/* Configurações do FileRenameAuto-update */
window.LIRoptions = {
    bottomMessage: '',
    editSummary: 'Atualizando links para arquivos (processo automático)',
    singleButtonText: 'Renomear e Atualizar',
    queueButtonText: 'Colocar na Fila',
    delay: 1000
};



/* Configurações do Link Sweeper (limpador de links) */
linkSweepConfirmation = true;
LinkSweeperDelay = 1000;



/* Substitui {{USERNAME}} pelo nome do usuário que está vendo a página. */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);


/* Link Sweeper (limpador de links) */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Linksweeper/code.js'
    ]
});