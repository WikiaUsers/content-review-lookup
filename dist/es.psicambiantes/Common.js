// Spoiler and Not Final Alert
SpoilerAlert = {
    question: '�ADVERTENCIA! Esta p�gina contiene SPOILERS o informaci�n tentativa que tal vez<br />no desees saber. �A�n as� quieres leer la informaci�n?',
    yes: 'Si, por favor',
    no: 'No, a�n no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};
// - end -  Spoiler and Not Final Alert


// Etiqueta Inactivo
InactiveUsers = { text: 'Fuera de la Red' };