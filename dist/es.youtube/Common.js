/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
/* Barra de carga de la portada - por User:SpacePucky y User:Trollocool de :w:c:de.youtube */
var Barra1=document.createElement("div");
Barra1.classList.add("BarraGris");
$(".wikiaPhotoGallery-slider-body .description-background").prepend(Barra1);
 
var Barra2=document.createElement("div");
Barra2.classList.add("BarraRoja");
$(".BarraGris").append(Barra2);