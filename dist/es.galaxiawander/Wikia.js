// Editar introducción de los artículos
EditIntroButtonText = 'Editar introducción';
importScriptPage('EditIntroButton/code.js', 'dev');
// Menúes desplegables con hover
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
}; 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:ListAdmins/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:RevealAnonIP/usercode.js'
    ]
});
// No comentarios en entradas de blog antiguas
   // 30 días
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog ha sido archivado ya que lleva treinta días inactivo. Por esto, no se permiten nuevos comentarios.",
    nonexpiryCategory: "Blogs permanentes"
};