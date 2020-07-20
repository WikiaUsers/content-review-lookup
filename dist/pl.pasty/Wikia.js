/*--- Szablon:Username ---*/
if (wgUserName != 'null') {
        $('.insertusername').html(wgUserName);
};

/*--- Nieaktywni użytkownicy ---*/
InactiveUsers = { 
    months: 1,
    text: 'Nieaktywny'
};
importArticles({
    type: "style",
    article: "http://fonts.googleapis.com/css?family=Nosifer"
});