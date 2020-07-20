/*** Дополнительные кнопки в редакторе ***/
if ((wgAction == 'edit' || wgAction == 'submit') && mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/b/bf/Button_-.png",
	 "speedTip": "Вставить тире",
	 "tagOpen": "—",
	 "tagClose": "",
	 "sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
	 "speedTip": "Предложить к удалению",
	 "tagOpen": "\{\{delete|reason=",
	 "tagClose": "\}\}",
	 "sampleText": "Причина"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/2/2d/Button_nl.png",
	 "speedTip": "Вставить перенос строки",
	 "tagOpen": "<br/>",
	 "tagClose": "",
	 "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/7/71/Button_%D0%BC%D0%B5%D0%BB%D0%BA%D0%B8%D0%B9.png",
	 "speedTip": "Мелкий шрифт",
	 "tagOpen": "<small>",
	 "tagClose": "</small>",
	 "sampleText": "   "};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/c/ca/Button_%D1%81%D0%BA%D0%BE%D0%B1%D0%BA%D0%B8.png",
	 "speedTip": "Скобки",
	 "tagOpen": "(",
	 "tagClose": ")",
	 "sampleText": "   "};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/7/7e/Button_%D0%B41.png",
	 "speedTip": "Вставить сслыку на первый датабук, Souls",
	 "tagOpen": "<ref>\{\{Сноска/Датабук1|",
	 "tagClose": "\}\}</ref>",
	 "sampleText": "страница"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/5/54/Button_%D0%B42.png",
	 "speedTip": "Вставить сслыку на второй датабук, MASKED",
	 "tagOpen": "<ref>\{\{Сноска/Датабук2|",
	 "tagClose": "\}\}</ref>",
	 "sampleText": "страница"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/8/8f/Button_d3.png",
	 "speedTip": "Вставить сслыку на третий датабук, UNMASKED",
	 "tagOpen": "<ref>\{\{Сноска/Датабук3|",
	 "tagClose": "\}\}</ref>",
	 "sampleText": "страница"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/2/26/Button_%D0%B0.png",
	 "speedTip": "Вставить сслыку на аниме",
	 "tagOpen": "<ref>\{\{Сноска/Аниме|",
	 "tagClose": "\}\}</ref>",
	 "sampleText": "серия"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/1/1f/Button_film.png",
	 "speedTip": "Вставить сслыку на фильм",
	 "tagOpen": "<ref>\{\{Сноска/Фильм|",
	 "tagClose": "\}\}</ref>",
	 "sampleText": "номер"};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/d/d5/Button_%D0%BC.png",
	 "speedTip": "Вставить сслыку на мангу",
	 "tagOpen": "<ref>\{\{Сноска/Манга|",
	 "tagClose": "|\}\}</ref>",
	 "sampleText": "глава"};
}