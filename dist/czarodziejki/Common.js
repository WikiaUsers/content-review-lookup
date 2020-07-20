/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

/* Nieaktywny użytkownik */
window.InactiveUsers = {
    text: 'Unicestwiony'
};

/* Przycisk powrotu na górę strony */
$(function ToTop() {
    $('.WikiaBarWrapper .tools')
        .append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
});