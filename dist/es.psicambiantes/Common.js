// Spoiler and Not Final Alert
SpoilerAlert = {
    question: '¡ADVERTENCIA! Esta página contiene SPOILERS o información tentativa que tal vez<br />no desees saber. ¿Aún así quieres leer la información?',
    yes: 'Si, por favor',
    no: 'No, aún no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};
// - end -  Spoiler and Not Final Alert


// Etiqueta Inactivo
InactiveUsers = { text: 'Fuera de la Red' };