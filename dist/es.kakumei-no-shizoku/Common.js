/***************************************************************************************************/
/* Añadir botón para editar el mensaje de bienvenida del muro (Tomado de Avatar Wiki por Miai Chan */
/***************************************************************************************************/

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/*************************************************/
/* Añadir botones extra de edición por Miai Chan */
/*************************************************/

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
     "speedTip": "Insertar plantilla de Personaje",
     "tagOpen": "{{Personajes \n|Nombre = ",
     "tagClose": "\n|Imagen = \n|Apodo = \n|Edad = \n|Especie = \n|Puesto = \n|Grupo = \n|Personalidad = \n|Elemento = \n|Arma = \n|Debut = \n|Ultima Aparicion = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/aiura/es/images/5/57/Episodio_bot%C3%B3n.png",
     "speedTip": "Insertar plantilla de Episodio",
     "tagOpen": "{{Episodios \n|imagen = ",
     "tagClose": "\n|temporada = \n|episodio = \n|prod = \n|Estrenado = \n|historia = \n|Anterior = \n|Siguiente = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214150/es.starwars/images/0/05/Bot%C3%B3n_novela.png",
     "speedTip": "Insertar plantilla de Objeto",
     "tagOpen": "{{Objeto\n|Nombre = ",
     "tagClose": "\n|Imagen = \n|Poseedor = \n|Origen = \n|Aparicion = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Insertar plantilla de Grupo",
     "tagOpen": "{{Grupo\n|Nombre del Grupo = ",
     "tagClose": "\n|Imagen = \n|Jefe = \n|Fundador = \n|Miembros = \n|Debut = \n|Ultima Aparicion = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
     "speedTip": "Insertar Esbozo",
     "tagOpen": "{{Esbozo",
     "tagClose": "}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
     "speedTip": "Insertar (en construcción)",
     "tagOpen": "{{En Obras|usuario",
     "tagClose": "}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
     "speedTip": "Proponer que el articulo sea borrado",
     "tagOpen": "{{Borrar",
     "tagClose": "}}",
     "sampleText": ""};

}