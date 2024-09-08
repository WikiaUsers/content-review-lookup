/* Codigo para tablas y div desplegables */
var ShowHideConfig = { linkBefore:true };
importScriptPage('ShowHide/code.js', 'dev');


/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Añadir botones al editar artículo en modo normal
 */


/* Añadir botones extra de edición */
if (mwCustomEditButtons) {

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/5/53/1.-_Texto_Negro.png",
"speedTip"  : "Texto/Negro",
"tagOpen"  : "<span style='color:black'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/6/6a/2.-_Texto_Blanco.png",
"speedTip"  : "Texto/Blanco",
"tagOpen"  : "<span style='color:white'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/4/48/3.-Texto_Gris.png",
"speedTip"  : "Texto/Gris",
"tagOpen"  : "<span style='color:DimGray'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/2/26/16.-Texto_Cafe.png",
"speedTip"  : "Texto/Cafe",
"tagOpen"  : "<span style='color:SaddleBrown'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/2/26/1.-_Texto_Cafe_Claro.png",
"speedTip"  : "Texto/Cafe Claro",
"tagOpen"  : "<span style='color:BurlyWood'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/9/99/5.-Texto_Azul_Fuerte.png",
"speedTip"  : "Texto/Azul",
"tagOpen"  : "<span style='color:RoyalBlue'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/a/ab/10.-Texto_Azul_Medio.png",
"speedTip"  : "Texto/Azul Medio",
"tagOpen"  : "<span style='color:SteelBlue '>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/e/e6/17.-_Azul_Cielo.png",
"speedTip"  : "Texto/Azul Claro",
"tagOpen"  : "<span style='color:DeepSkyBlue'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi42.tinypic.com/2j4vm6f.jpg",
"speedTip"  : "Texto/celeste",
"tagOpen"  : "<span style='color:SkyBlue'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi39.tinypic.com/15eu8nl.jpg",
"speedTip"  : "Texto/Verde Fuerte",
"tagOpen"  : "<span style='color:DarkGreen'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi43.tinypic.com/20z8ewn.jpg",
"speedTip"  : "Texto/Verde Medio",
"tagOpen"  : "<span style='color:green'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/c/c9/13.-Texto_Verde_Claro.png",
"speedTip"  : "Texto/Verde Claro",
"tagOpen"  : "<span style='color:LimeGreen'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/c/c5/12.-Texto_Verde-Agua.png",
"speedTip"  : "Texto/Verde-Agua",
"tagOpen"  : "<span style='color:Cyan'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/d/d5/7.-Texto_Rojo.png",
"speedTip"  : "Texto/Rojo",
"tagOpen"  : "<span style='color:Red'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi43.tinypic.com/2yoprma.jpg",
"speedTip"  : "Texto/Anaranjado oscuro",
"tagOpen"  : "<span style='color:OrangeRed'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/a/a9/15.-Texto_Amarillo.png",
"speedTip"  : "Texto/Amarillo",
"tagOpen"  : "<span style='color:Gold'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/9/90/11.-Texto_Salmon.png",
"speedTip"  : "Texto/Salmon",
"tagOpen"  : "<span style='color:Salmon'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi41.tinypic.com/2rgjceg.jpg",
"speedTip"  : "Texto/Rosa oscuro",
"tagOpen"  : "<span style='color:DeepPink '>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi39.tinypic.com/2mzb0oh.jpg",
"speedTip"  : "Texto/Rosado claro",
"tagOpen"  : "<span style='color:Pink'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/8/84/4.-Texto_Morado.png",
"speedTip"  : "Texto/Morado",
"tagOpen"  : "<span style='color:BlueViolet'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi40.tinypic.com/1djyt.jpg",
"speedTip"  : "Texto/Lila",
"tagOpen"  : "<span style='color:Violet'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi44.tinypic.com/o6mvt0.jpg",
"speedTip"  : "Texto/Lavanda",
"tagOpen"  : "<span style='color:#d8d8ff'>",
"tagClose"  : "</span>",
"sampleText": ""};


mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi40.tinypic.com/34ru0lv.jpg",
"speedTip"  : "Texto/Aguamarina",
"tagOpen"  : "<span style='color:Aquamarine'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "http://oi43.tinypic.com/w88cb7.jpg",
"speedTip"  : "Texto/Verde Olivo",
"tagOpen"  : "<span style='color:Olive'>",
"tagClose"  : "</span>",
"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
"imageFile" : "https://images.wikia.nocookie.net/k-poplyrics/es/images/5/52/9.-Texto_Anaranjado.png",
"speedTip"  : "Texto/Anaranjado",
"tagOpen"  : "<span style='color:Orange'>",
"tagClose"  : "</span>",
"sampleText": ""};
 }