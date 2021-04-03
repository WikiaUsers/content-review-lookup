/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Desactivación del botón de edición de los temas del foro antiguos
/* Adaptado de Uncyclopedia, autor original: User:Spang */
$(function ArchivarTemaForo() {
    if (typeof(ActivarForoArchivado) != 'undefined' && ActivarForoArchivado) return;
    if (!document.getElementById('ca-edit') || !document.getElementById('ForoArchivado') ) return;
    editLink = document.getElementById('ca-edit').firstChild;
    editLink.removeAttribute('href', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = 'no edites';
});

// Usuarios inactivos
InactiveUsers = { text: 'En el otro mundo' };


// Versión moderna de BackToTopButton
window.BackToTopModern = true;

// LinkPreview
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://vignette.wikia.nocookie.net/dragonball/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200403013922&path-prefix=es',
    noimage: 'https://vignette.wikia.nocookie.net/dragonball/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200403013922&path-prefix=es'
});


// Less
window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
    target: 'MediaWiki:Wikia.css',
    source: 'MediaWiki:Custom-wikia.less',
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-wikia.less'
    ],
    header: 'MediaWiki:Custom-Css-header/common'
} );
 
window.lessConfig = {
    reload: true,
    wrap: true
};