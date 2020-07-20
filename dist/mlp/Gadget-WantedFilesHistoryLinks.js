$(document).ready(function(){
if (wgCanonicalSpecialPageName == "Wantedfiles"){
    $(".mw-spcontent li > a:first-child").each(function(){$(this).attr("href", $(this).attr("href").replace("?action=edit&redlink=1", "?action=history"))});
}
});