/* Check for WikiaMobile Skin */
function SkinChecker() {
    $("span.insertSkin").html("WikiaMobile");
    $("span.IsWikiaMobile").html("true");
 }
addOnloadHook(SkinChecker);