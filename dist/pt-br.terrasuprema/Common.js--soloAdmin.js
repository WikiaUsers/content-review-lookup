function hasGroup(group) {
    for (var i in wgUserGroups) {
        if (wgUserGroups[i] == group) return true;
    }
    return false;
}
 
/* Shows messages for Admins */
function showAdmMessage() {
    if (hasGroup('sysop')) {
        $('.administradores').css({'display': 'block'});
    }
}
 
addOnloadHook(showAdmMessage);