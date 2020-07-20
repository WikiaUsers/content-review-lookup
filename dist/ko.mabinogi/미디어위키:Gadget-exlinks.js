// **********************************************************************
// **                 ***WARNING GLOBAL GADGET FILE***                 **
// **             changes to this file affect many users.              **
// **           please discuss on the talk page before editing         **
// **                                                                  **
// **********************************************************************
addOnloadHook(function() {
    var content = document.getElementById('content');
    if(!content) content = document.getElementById('mw_content');
    if(!content) return;
    var alinks = content.getElementsByTagName('a');
    var tablink, sitename;
    for (var i = 0, leng = alinks.length; i < leng; i++) {
        tablink = alinks[i];
        if (tablink.className.indexOf("external") != -1 && tablink.href.indexOf(wgServer) != 0)
            tablink.target = "_blank";
    }
});