/*******************************************************************************************************/
/* Añadir botón para editar el mensaje de bienvenida del muro (Tomado de Avatar Wiki por Diamond Girl */
/*******************************************************************************************************/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
 

/*************************************************************************/
/* Añadir botones extra de edición por Princesa Chicle vs Princesa Llama */
/*************************************************************************/

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insertar plantilla de Personaje",
     "tagOpen": "{{Personajes \n|nombre = ",
     "tagClose": "\n|imagen = \n|titulo =  \n|sexo = \n|edad = \n|especie = \n|ocupación = \n|familiares = \n|introducido = \n|ultima aparición = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/aiura/es/images/5/57/Episodio_bot%C3%B3n.png",
     "speedTip": "Insertar plantilla de Episodio",
     "tagOpen": "{{Episodios \n|imagen = ",
     "tagClose": "\n|temporada = \n|episodio = \n|prod = \n|Fecha de Estreno = \n|director = \n|historia = \n|Storyboard por = \n|Anterior = \n|Siguiente = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214150/es.starwars/images/0/05/Bot%C3%B3n_novela.png",
     "speedTip": "Insertar plantilla de Objeto",
     "tagOpen": "{{Objetos\n|nombre = ",
     "tagClose": "\n|imagen = \n|titulo = \n|origen = \n|tipo = \n|poseedor = \n|introducido = \n|ultima aparición= \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
     "speedTip": "Insertar Esbozo",
     "tagOpen": "{{Esbozo",
     "tagClose": "}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
     "speedTip": "Proponer que el articulo sea borrado",
     "tagOpen": "{{Borrar",
     "tagClose": "}}",
     "sampleText": ""};
}

/*************************************************************************/
/* Contador de visitas (por Flash Sentry!) */
/*************************************************************************/

$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li>  <img style="padding-top:2px;" title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=2081021&counter=26" />  </li>').appendTo('#GlobalNavigation');
    else
        $('#p-navigation ul').append('<li> <img title="Cantidad de visitas en este wiki" src="http://contador-de-visitas.com/hit.php?id=2081021&counter=26" /></li></li>');
});