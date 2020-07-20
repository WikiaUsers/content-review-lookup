if (skin == "oasis" && wgNamespaceNumber == 0 && !window.helplink) {
     addOnloadHook(addhelplink);
}
 
var helplink = true;
 
function addhelplink () {
    $('<section class="module"><h1 style="margin-top:0px; margin-bottom:10px;">On the Wiki</h1><div><p style="text-align:center"><a href="/wiki/Special:MyPage/Sandbox" target="_blank">Sandbox</a> &bull; <a href="/wiki/Special:Forum" target="_blank">Forum</a> &bull; <a href="/wiki/Special:NewFiles" title="New files" target="_blank">Files</a> &bull; <a href="/wiki/Special:NewPages" target="_blank">New pages</a><br /><a href="/wiki/Special:RecentChanges" target="_blank">Recent changes</a> &bull; <a href="/wiki/Project:Policy" target="_blank">Policy</a> &bull; <a href="/wiki/Project:Administrators" target="_blank">Administrators</a><br /><createbox></createbox><br /><a class="button" href="/wiki/Special:MyPage" target="_blank">Profile</a> <a class="button" href="/wiki/Special:Contributions" target="_blank">Contributions</a> <a class="button" href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook" target="_blank">Change skin</a></p></div></section>').insertAfter('.WikiaActivityModule');
}