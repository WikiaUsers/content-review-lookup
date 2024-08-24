/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog no fue comentado en <expiryDays> días, por lo que es redundante comentarlo.",
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",     // Contador de tiempo
        "w:c:dev:LockOldBlogs/code.js"   // Bloquear blogs viejos
    ]
});

/* Plantilla NOMBREUSUARIO (de Uncyclopedia y arreglado por Ciencia_Al_Poder) */
function UserNameReplace() {
  if (wgUserName) {
    var spans = getElementsByClassName(document, "span", "insertusername");
    for (var i = 0; i < spans.length; i++) {
      spans[i].innerHTML = wgUserName;
    };
  };
};

addOnloadHook(UserNameReplace);