/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//Colores para administradores en los muros de mensajes

(function() {
    var borde_admin = "6px double ";//+color
    var fondo_admin = "rgba(216, 180, 88, 0.85) url('https://images.wikia.nocookie.net/lotrminecraftmod/images/8/87/Admin_Fondo.png/revision/latest?cb=20200430030852&format=original&path-prefix=es') bottom center no-repeat";
    var admins = [
        {nombre: "Adaneth_Mirim%C3%AB", color:"#9370DB"}
    ];
    
    function obtener_filtro(perfil) {
        return eval("(function() {return $(this).has(\"a[href$=':"+perfil.nombre+"']\").length;})");
    }
    
    var avatares = $(".speech-bubble-avatar");
    
    var i;
    for (i in admins) {
        var admin = admins[i];
        avatares.filter(obtener_filtro(admin)).next().css({
            background: fondo_admin,
            padding: "10px",
            border: borde_admin+admin.color
        });
        avatares.filter(obtener_filtro(admin)).next().addClass("admin");
    }
})();

/* Sustituir nombre del usuario:
 * Este código añade el nombre del usuario en <span class="nombredelusuario"></span>
 * El texto dentro de las etiquetas <span> se verá por los usuarios que no hayan iniciado sesión.
 */
 
if (wgUserName) {
	$(".nombredelusuario").text(wgUserName);
}

/* Reemplazar imágenes WEBP con las versiones PNG/JPG etc. */

//Imágenes en infoboxes
$(".pi-image-thumbnail").each(function(){
    var srcsetvar = $(this).attr("srcset");
    var srcarray = srcsetvar.split(" ");
    $(this).attr("srcset", srcarray[0]+"&format=original");
});

//Imágenes en artículos
$(".WikiaArticle img:not('.avatar, .sprite, .forum-user-avatar, .wds-avatar__image')").on("load", function(){
    var srcvar = $(this).attr("src");
    if(srcvar && !srcvar.endsWith("format=original") && (srcvar.startsWith("https://vignette.wikia.nocookie.net") || srcvar.startsWith("https://images.wikia.nocookie.net"))){
        if(srcvar.includes("?")) {
            $(this).attr("src", srcvar+"&format=original");
        } else {
            $(this).attr("src", srcvar+"?format=original");
        }
    }
}).each(function() {
  if(this.complete) { //imágenes en caché
      $(this).trigger("load");
  }
});

/* Configuración de AjaxRC */
ajaxSpecialPages = ["Contributions","Log","Recentchanges","WikiActivity","Watchlist"];
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Volver a cargar',
    'ajaxrc-refresh-hover': 'Volver a cargar la página automáticamente',
}}}}});

// SCRIPTS EXTERNOS
importArticles({
    type: 'script',
    articles: [
        // Borrar archivos
        'u:dev:MediaWiki:ListFiles/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        // Ajax: Volver a cargar páginas automáticamente
        'u:dev:MediaWiki:AjaxRC.js'
    ]
});