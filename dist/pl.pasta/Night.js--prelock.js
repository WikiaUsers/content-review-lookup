/*
 * Prelock
 * Napisane przez Py64
 * Data utworzenia: 18.10.2014r. 13:49
 * Blokuj tagi pre
*/
for(var x=0;x<wgUserGroups.length;x++) {
if(wgUserGroups[x]!='sysop') {
$('div[dir="ltr"]:not(#mw-content-text)').on('contextmenu', function(e) {
    return false;
});
} else {
$('div[dir="ltr"]:not(#mw-content-text)').off('contextmenu');
break;
}
}