/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// 1. настройка InactiveUsers
InactiveUsers = {
    months: 2,
    text: 'Неактивен'};

// 2. импорт InactiveUsers
importScriptPage('InactiveUsers/code.js', 'dev');

// 3. настройка BackToTopButton
window.BackToTopModern = true;