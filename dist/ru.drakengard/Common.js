/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
(function() {
	// Simple Cyrillic to Latin transliteration map
	const cyrillicToLatinMap = {
		'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ё':'Yo','Ж':'Zh','З':'Z','И':'I','Й':'Y',
		'К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F',
		'Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'','Ы':'Y','Ь':'','Э':'E','Ю':'Yu','Я':'Ya',
		'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y',
		'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
		'х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
	};

	function transliterate(text) {
		return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
	}

	function runTransliteration() {
		const header = document.querySelector('.user-identity-header h1[itemprop="name"]');
		console.log('header', document.querySelectorAll('.user-identity-header h1[itemprop="name"]'));
		if (header && /[\u0400-\u04FF]/.test(header.textContent)) {
			header.textContent = transliterate(header.textContent);
		}
	}

	mw.hook('wikipage.content').add(function() {
		runTransliteration();
	});
})();