}
 
// LockForums and LockOldBlogs
 
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 10
};
 
window.LockOldBlogs = {
    expiryDays: 10
};
 
// Making the chat logs only visible to certain user rights groups
(function(){
    if (!$('pre.ChatLog').exists()) return;
    if (!(/sysop|vstf|staff|wiki-manager|helper|chatmoderator/m.test(mw.config.get('wgUserGroups').join(' ')))) $('pre.ChatLog').hide();
})();