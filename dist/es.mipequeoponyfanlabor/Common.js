/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
 
/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'Esta p�gina contiene informaci�n que puede no ser apta para algunas personas �desea seguir?',
    yes: 'Si, quiero entrar en el art�culo',
    no: 'No, no quiero seguir',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('CP');
    }
};