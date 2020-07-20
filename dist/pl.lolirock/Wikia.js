/* {{USERNAME}} */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */
 
/* Nieaktywni */
window.InactiveUsers = { text: 'Uwięzieni Przez Gramorra' };

/* End of Nieaktywni replacement */


/* Moderator Treści */
window.ModeratorTreści = { text: 'Książę Volty' }; 

/* End of the Moderator Treści replacement */

// Przenosi interwiki do stopki na Specjalna:Forum
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });