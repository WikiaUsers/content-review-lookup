/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Automaticamente recarregar a p�gina a cada 60segs';
AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
ajaxPages = ["Especial:Mudan�as_recentes","Especial:WikiActivity", "Especial:P�ginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:P�ginas_novas", "Especial:Contribui��es"];
importScriptPage('AjaxRC/code.js', 'dev');
yle="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-i