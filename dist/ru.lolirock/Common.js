/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

//Неактивные пользователи
window.InactiveUsers = { 
    months: 1,
    text: 'Неактивен'
};
importScriptPage('InactiveUsers/code.js', 'dev');