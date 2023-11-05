/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

//Неактивные пользователи
window.InactiveUsers = { 
    months: 1,
    text: 'Неактивный'
};
importScriptPage('InactiveUsers/code.js', 'dev');

//ProfileTags, предотвращает удаление существующих тегов
(window.dev = window.dev || {}).profileTags = { noHideTags: true };