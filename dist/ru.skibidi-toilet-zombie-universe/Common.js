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
var defaults = {
  snowColor: '#FFD700',
  snowSpeed: 2,
  snowDensity: 50
};

function mergeDefaults(customSettings) {
  return Object.assign({}, defaults, customSettings);
}