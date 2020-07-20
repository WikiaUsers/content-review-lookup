if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/sims/ru/images/4/44/Knopka_Tire.png",
		"speedTip": "Тире",
		"tagOpen": "—",
		"tagClose": "",
		"sampleText": ""
	};
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
		"speedTip": "На другую строку",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Зачеркнуть",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Зачеркнутый текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
		"speedTip": "Перенаправление",
		"tagOpen": "#перенаправление [[",
		"tagClose": "]]",
		"sampleText": "Ведите текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/4/44/Button_comillas_latinas.png",
                    "speedTip": "Кавычки",
                    "tagOpen": "«",
                    "tagClose": "»",
                    "sampleText": "Текст"
	};
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Шаблон",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Название шаблона"};
	};
}

function addWikifButton() {
	var toolbar = document.getElementById('toolbar');
	if (!toolbar) return;
	var i = document.createElement('img');
	i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
	i.alt = i.title = 'викификатор';
	i.onclick = Wikify;
	i.style.cursor = 'pointer';
	toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
	addOnloadHook(addWikifButton);
}