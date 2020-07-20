/* Check for WikiaMobile Skin */
function SkinChecker() {
    $("span.insertSkin").html("WikiaOasis");
    $("span.IsWikiaMobile").html("false");
 }
addOnloadHook(SkinChecker);