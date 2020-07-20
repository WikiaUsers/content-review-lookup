/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.SpoilerAlertJS = {
    question: 'Здесь, короче, дофига спойлеров, которые могут испортить игру. Хотите продолжить?',
    yes: 'Да.',
    no: 'НЕТ!',
    fadeDelay: 600
};
//insertusername
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});