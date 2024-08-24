// Editar introducci�n de los art�culos
EditIntroButtonText = 'Editar introducci�n';
importScriptPage('EditIntroButton/code.js', 'dev');
// Men�es desplegables con hover
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
   // 30 d�as
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog ha sido archivado ya que lleva treinta d�as inactivo. Por esto, no se permiten nuevos comentarios.",
    nonexpiryCategory: "Blogs permanentes"
};