/* C�digos JavaScript colocados aqui ser�o carregados por todos aqueles que acessarem alguma p�gina desta wiki */

importScriptPage('SpoilerAlert/code.js', 'dev');
 
window.railWAM = {
    logPage:"Project:WAM Log"
};

// Pop-ups em Refer�ncias
importScriptPage('ReferencePopups/code.js', 'dev');
 
/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Autom�tico';
window.AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudan�as_recentes",
    "Especial:WikiActivity",
    "Especial:P�ginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:P�ginas_novas",
    "Especial:Contribui��es"
];