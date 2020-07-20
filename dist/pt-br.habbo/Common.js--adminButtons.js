/*
 * Load quick delete tools
 */
importScriptPage('FastDelete/code.js','dev');
var fdButtons = [];

/*
 * Add quick delete button for unused category
 */
if(wgCanonicalNamespace == "Categoria") {
	fdButtons[fdButtons.length] = {
		'summary': 'Excluindo categoria não utilizada conforme [[Especial:Categorias não utilizadas]]',
		'label': 'Inutilizada'
	};
}

/*
 * Add quick delete button for unused template
 */
if(wgCanonicalNamespace == "Predefinição") {
	fdButtons[fdButtons.length] = {
		'summary': 'Excluindo predefinição inutilizada conforme [[Especial:Predefinições não utilizadas]]',
		'label': 'Inutilizada'
	};
}

/*
 * Then load the rest of the quick delete buttons
 */

fdButtons[fdButtons.length] = {
  'summary': '[[w:c:help:Help:Spam|Spam]]',
  'label': 'Spam'
};

fdButtons[fdButtons.length] = {
  'summary': '[[w:c:help:Help:Vandalism|Vandalismo]]',
  'label': 'Vandalismo'
};

fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Limpeza'
};

fdButtons[fdButtons.length] = {
  'summary': 'Conteúdo inapropriado',
  'label': 'Conteúdo'
};