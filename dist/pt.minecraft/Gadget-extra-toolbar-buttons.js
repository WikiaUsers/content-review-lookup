/*global mw */
/*jshint strict: false, browser: true, jquery: true */
/**
 * Extra toolbar options
 *  
 *  Description: Adds extra buttons to the old (non-enhanced) editing toolbar.
 *  
 *  Maintainers: [[User:MarkS]], [[User:Voice of All]], [[User:R. Koot]]
 */

function addExtraButtons () {
	mw.toolbar.addButtons(
	{
		imageId: 'button-redirect',
		imageFile: '//upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png',
		speedTip: 'Redirecionar',
		tagOpen: '#REDIRECT[[',
		tagClose: ']]',
		sampleText: 'Nome da página de destino'
	},
	{
		imageId: 'button-strike',
		imageFile: '//upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png',
		speedTip: 'Tachado',
		tagOpen: '<s>',
		tagClose: '</s>',
		sampleText: 'Texto tachado'
	},
	{
		imageId: 'button-enter',
		imageFile: '//upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png',
		speedTip: 'Quebra de linha',
		tagOpen: '<br/>',
		tagClose: '',
		sampleText: ''
	},
	{
		imageId: 'button-subscript',
		imageFile: '//upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png',
		speedTip: 'Sobrescrito',
		tagOpen: '<sub>',
		tagClose: '</sub>',
		sampleText: 'Texto subscrito'
	},
	{
		imageId: 'button-superscript',
		imageFile: '//upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png',
		speedTip: 'Sobrescrito',
		tagOpen: '<sup>',
		tagClose: '</sup>',
		sampleText: 'Texto sobrescrito'
	},
	{
		imageId: 'button-small',
		imageFile: '//upload.wikimedia.org/wikipedia/en/5/58/Button_small.png',
		speedTip: 'Pequeno',
		tagOpen: '<small>',
		tagClose: '</small>',
		sampleText: 'Texto pequeno'
	},
	{
		imageId: 'button-hide-comment',
		imageFile: '//upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png',
		speedTip: 'Inserir comentário oculto',
		tagOpen: '<!-- ',
		tagClose: ' -->',
		sampleText: 'Comentário'
	},
	{
		imageId: 'button-gallery',
		imageFile: '//upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png',
		speedTip: 'Inserir uma galeria de imagens',
		tagOpen: '\n<gallery>\n',
		tagClose: '\n</gallery>',
		sampleText: 'Arquivo:Exemplo.svg|Legenda1\nArquivo:Exemplo.jpg|Legenda2'
	},
	{
		imageId: 'button-blockquote',
		imageFile: '//upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png',
		speedTip: 'Inserir bloco de texto entre aspas',
		tagOpen: '<blockquote>\n',
		tagClose: '\n</blockquote>',
		sampleText: 'Bloco de citação'
	},
	{
		imageId: 'button-insert-table',
		imageFile: '//upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png',
		speedTip: 'Inserir uma tabela',
		tagOpen: '{| class="wikitable"\n|',
		tagClose: '\n|}',
		sampleText: '-\n! cabeçalho 1\n! cabeçalho 2\n! cabeçalho 3\n|-\n| linha 1, célula 1\n| linha 1, célula 2\n| linha 1, célula 3\n|-\n| linha 2, célula 1\n| cabeçalho 2, célula 2\n| cabeçalho 2, célula 3'
	},
	{
		imageId: 'button-insert-reflink',
		imageFile: '//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
		speedTip: 'Inserir uma referência',
		tagOpen: '<ref>',
		tagClose: '</ref>',
		sampleText: 'Inserir texto da nota de rodapé aqui'
	}
	);
}

mw.loader.using( 'user.options', function () {
	// This can be the string "0" if the user disabled the preference ([[bugzilla:52542#c3]])
	if ( mw.user.options.get( 'usebetatoolbar' ) != 1 && mw.user.options.get( 'gadget-legacyToolbar' ) == 1 ) {
		mw.hook("mw.toolbar").add( addExtraButtons );
	}
} );