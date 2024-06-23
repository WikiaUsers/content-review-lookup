// Создайте пространство "dev", если его ещё нет:
window.dev = window.dev || {};

// Создайте подпространство для этого дополнения и установите настройки:
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummaries'
};

// Настройки должны вписываться перед импортом, иначе они не заработают!
importArticles({ type: 'script', articles: [ 
	'u:dev:MediaWiki:Standard Edit Summary/code.js'
]});

// тест
const user1EditsElement = document.querySelector('li.has-ripple a strong');
const user1Edits = user1EditsElement ? parseInt(user1EditsElement.textContent) : 0;
if (user1Edits === 376) {
  console.log('Количество правок user1 равно 376');
} else {
  console.log('Количество правок user1 не равно 376');
}