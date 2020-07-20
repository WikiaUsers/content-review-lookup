/* {{USERNAME}} */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */
 
/* Nieaktywni */
window.InactiveUsers = { text: 'Zniknął w Chlebaku' };

/* End of the Nieaktywni replacement */

// Przenosi interwiki do stopki na Specjalna:Forum
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });