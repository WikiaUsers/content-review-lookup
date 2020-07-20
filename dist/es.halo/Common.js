/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importScriptPage('Countdown/code.js', 'dev');
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog está archivado debido a su inactividad.",
    nonexpiryCategory: "Blog no bloqueable"
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});