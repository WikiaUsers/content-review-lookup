if (mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/mandbuk/pl/images/c/ca/WBudowieIkona.png",
		"speedTip": "Oznacz artykuł, nad którym pracujesz",
		"tagOpen": "{{W budowie|",
		"tagClose": "}}",
		"sampleText": "Twój nick|Czas|Typ błędów"};
}
$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});

SpoilerAlert = {
    'class': "spoiler",
    question: 'Ta strona zwiera spoilery. Znajdować się tu mogą informacje dotyczące fabuły, istotnych elementów lub zakończenia gry. Czy nadal chcesz ją wyświetlić?',
    yes: 'Tak, chcę przejść do treści strony',
    no: 'Nie, nie chcę widzieć treści strony'
};