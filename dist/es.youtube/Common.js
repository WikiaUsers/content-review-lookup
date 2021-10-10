/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Barra de carga de la portada - por User:SpacePucky y User:Trollocool de :w:c:de.youtube */
var Barra1=document.createElement("div");
Barra1.classList.add("BarraGris");
$(".wikiaPhotoGallery-slider-body .description-background").prepend(Barra1);
 
var Barra2=document.createElement("div");
Barra2.classList.add("BarraRoja");
$(".BarraGris").append(Barra2);

/* YouTube Search */
$("span#youtubesearch").replaceWith('<div id="youtubesearch"><img src="https://vignette.wikia.nocookie.net/youtubepedia/images/c/c5/Yt_logo_rgb_dark.png/revision/latest?cb=20191020182843&path-prefix=es" height="20" width="80"><form action="http://www.youtube.com/results" method="get" target="_blank"><input name="search_query" type="text" maxlength="128" /><select name="search_type"><option value="search_videos">Videos</option><option value="search_users">Canales</option></select><input type="submit" value="Buscar" /></form></div>');