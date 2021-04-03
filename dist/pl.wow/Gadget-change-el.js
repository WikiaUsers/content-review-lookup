function changeEL() {
$("#wpTextbox1").html($("#wpTextbox1").html().replace(/wowwiki.com\/WoWWiki:/gi, "wowpedia.org/Wowpedia:"));
}
addOnloadHook(changeEL);