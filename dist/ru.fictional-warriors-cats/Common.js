/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Показ IP анонимов в комментах*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
}; 

//insertusername
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

/*Отображение ника на странице с соответствующим шаблоном*/
(function($, mw) {
    if (!$('.insertusername').length) {
        return;
    }
 
    if (wgUserName !== null) {
        $('.insertusername').text(wgUserName);   
    } else {
        $('.insertusername').text('Анонимный участник');
    }