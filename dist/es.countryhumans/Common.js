/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */


/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  * los créditos van a la wiki de Polandball
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];

$('.replyButton').on('click',function(){
    if ($('#autoconfirmed-only').length==1 && wgUserGroups.indexOf("autoconfirmed") < 0) {
        $.showCustomModal('Cannot submit vote', 'You are not an eligible voter, therefore you cannot vote.');
        return false;
    }
});