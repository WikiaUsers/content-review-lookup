// Encuentra todos los elementos con la clase 'nodesktop'
var elementos = document.querySelectorAll('.nodesktop');

// Itera sobre cada elemento encontrado
elementos.forEach(function(elemento) {
    // Elimina el elemento del DOM
    elemento.parentNode.removeChild(elemento);
});