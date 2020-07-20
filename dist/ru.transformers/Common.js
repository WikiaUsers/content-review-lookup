if(mwCustomEditButtons) 
{
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/1/18/Button_quote.png",
		"speedTip": "Кавычки-уголки",
		"tagOpen": "«",
		"tagClose": "»",
		"sampleText": "Текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/5/56/InnerLink_Button.png",
		"speedTip": "Внутренняя ссылка",
		"tagOpen": "[[",
		"tagClose": "]]",
		"sampleText": "Текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/e/eb/InnerLink1_Button.png",
		"speedTip": "Внутренняя ссылка с описанием",
		"tagOpen": "[[Ссылка|",
		"tagClose": "]]",
		"sampleText": "Текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/6/67/Button_character.png",
		"speedTip": "Ссылка на персонажа",
		"tagOpen": "[[Имя (Вселенная/френчайз)|",
		"tagClose": "]]",
		"sampleText": "Текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/4/40/Template_Button.png",
		"speedTip": "Шаблон",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "Текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/6/6e/Template1_Button.png",
		"speedTip": "Шаблон с параметром",
		"tagOpen": "{{Шаблон|",
		"tagClose": "}}",
		"sampleText": "Текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/2/2f/Vertical_Button.png",
		"speedTip": "Вертикальная черта",
		"tagOpen": "|",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/transformers/ru/images/1/1d/Redirect_Button.png",
		"speedTip": "Перенаправление",
		"tagOpen": "#перенаправление [[",
		"tagClose": "]][[Категория:Перенаправления]]",
		"sampleText": "Статья"
	};
/**
 * Auto Update *
 **/
 
 importArticles({
    type: 'script',
    articles: [
        'u:dev:DiscordIntegrator/code.js'
    ]
});
}