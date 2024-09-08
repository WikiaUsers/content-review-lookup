// Refrescar automáticamente la WikiActividad y Cambios recientes
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];

importArticles({
   type: 'script',
   articles: [
       'u:dev:AjaxRC/code.js',
       'u:dev:PurgeButton/code.js',
       'u:dev:ReferencePopups/code.js',
       'u:dev:SignatureCheck/code.js',
       'u:dev:WallGreetingButton/code.js',
       'u:dev:YoutubePlayer/code.js'

   ]
});