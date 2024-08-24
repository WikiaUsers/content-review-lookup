/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'Esta página contiene información que puede no ser apta para algunas personas ¿desea seguir?',
    yes: 'Si, quiero entrar en el artículo',
    no: 'No, no quiero seguir',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('CP');
    }
};