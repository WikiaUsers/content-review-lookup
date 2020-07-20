/*** Дополнительные кнопки в редакторе ***/
if ((wgAction == 'edit' || wgAction == 'submit') && mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/b/bf/Button_-.png",
	 "speedTip": "Вставить тире",
	 "tagOpen": "—",
	 "tagClose": "",
	 "sampleText": ""};
	 
	 mwCustomEditButtons[mwCustomEditButtons.length] = {
	 "imageFile": "https://images.wikia.nocookie.net/bleachpedia/ru/images/5/54/Button_%D0%B42.png",
	 "speedTip": "Вставить примечание",
	 "tagOpen": "<ref>",
	 "tagClose": "</ref>",
	 "sampleText": "страница"};
}