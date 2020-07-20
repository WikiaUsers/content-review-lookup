// Variables (Auto delete & delete and protect)
// By [[User:Jr Mime]] - Copyright
var fdButtons = [];
fdButtons[fdButtons.length] = {
        'summary': '[[w:es:Ayuda:Vandalismo|Vandalismo]].',
        'label': 'V'
};
fdButtons[fdButtons.length] = {
	'summary': '[[w:es:Ayuda:Spam|Spam]]',
	'label': 'S'
};
fdButtons[fdButtons.length] = {
	'summary': '[[Project:Mantenimiento|Limpieza]].',
	'label': 'C↑'
};
fdButtons[fdButtons.length] = {
	'summary': '[[w:c:es:Términos de Uso|Violación de los términos de uso]].',
	'label': 'TdU'
};
 
// Import for Delete & Delete and Protect buttons
if (wgNamespaceNumber == 0) {
    importScriptPage('User:The Mol Man/FastDeleteProtect.js', 'a');
    } else {
        importScriptPage('FastDelete/code.js', 'dev');
};