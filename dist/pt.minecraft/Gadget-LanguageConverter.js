// Mantenha a linha abaixo. Ela é usada para conferir o uso global do script por meio da página [[Special:GlobalUsage/User:He7d3r/Tools/LanguageConverter.js]]
// [[File:User:He7d3r/Tools/LanguageConverter.js]] (ver [[phab:T35355]])
/*jslint browser: true, regexp:true, white: true */
/*global mw */
if ( window.LanguageConverter === undefined ) {
	window.LanguageConverter = {};
}
// Define as configurações específicas para a Wikipédia
window.LanguageConverter.config = {
	msg: {
		error_missing_dict: 'Não foi encontrado o seguinte dicionário: ',
		error_missing_dict_name: 'É necessário definir o nome da página do dicionário para ',
		error_word_processing: 'Houve um erro ao processar esta palavra: ',
		error_typo_processing: 'Ocorreu um erro ao processar a seguinte alteração tipográfica:\n',
		help_page_link: 'Página de ajuda',
		show_changes_link: 'Mostrar alterações',
		hide_changes_link: 'Ocultar alterações',
		menu_title: 'Variantes'
	},
	word_chars: 'a-zA-Z0-9áàâãçéêíñóôõúüÁÀÂÃÇÉÊÍÑÓÔÕÚ\'ºª\\-',
	typo_changes: {
		'pt-br': [
			[ '«', '“' ],
			[ '»', '”' ],
			[ /é([mn][aeiou])/g, 'ê$1' ],
			[ /ó([mn][aeiou])/g, 'ô$1' ],
			[ / a ([0-3]?[0-9]) de ([Jj]aneiro|[Ff]evereiro|[Mm]arço|[Aa]bril|[Mm]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[Dd]ezembro)/g, ' em $1 de $2' ],
			[ / A ([0-3]?[0-9]) de ([Jj]aneiro|[Ff]evereiro|[Mm]arço|[Aa]bril|[Mm]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[Dd]ezembro)/g, ' Em $1 de $2' ],
			[ /([Ss])e\(c\)ção/g, '$1eção' ]
		],
		'pt-pt': [
			[ '“', '«' ],
			[ '”', '»' ],
			[ /ê([mn][aeiou])/g, 'é$1' ],
			[ /ô([mn][aeiou])/g, 'ó$1' ],
			[ /([gq])ü([iéêí])/g, '$1u$2' ],
			[ /qüe/g, 'que' ],
			[ /éia(s?[^a-záàâãçéêíóôõúü\-])/g, 'eia$1' ],
			[ /ôo(s?[^a-záàâãçéêíóôõúü\-])/g, 'oo$1' ],
			[ / em ([0-3]?[0-9]) de ([Jj]aneiro|[Ff]evereiro|[Mm]arço|[Aa]bril|[Mm]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[Dd]ezembro)/g, ' a $1 de $2' ],
			[ / Em ([0-3]?[0-9]) de ([Jj]aneiro|[Ff]evereiro|[Mm]arço|[Aa]bril|[Mm]aio|[Jj]unho|[Jj]ulho|[Aa]gosto|[Ss]etembro|[Oo]utubro|[Nn]ovembro|[Dd]ezembro)/g, ' A $1 de $2' ],
                        [ /([Ss])e\(c\)ção/g, '$1ecção' ]
		]
	},
	variants_list: {
		'pt':'Texto original',
		'pt-ao':'Português de Angola',
		'pt-br':'Português do Brasil',
		'pt-pt':'Português de Portugal',
		'gl':'Ortografia galega (beta)'
	},
	ns_list: {
		'0': true, // Main
		'2': true, // User
		'4': true, // Project
		'10': true, // Template
		'14': true, // Category
		'100': true // Portal
	},
	local_dic_id: {
		'pt':'conv-idiomas',
		'pt-ao':'dic-local-AO',
		'pt-br':'dic-local-BR',
		'pt-pt':'dic-local-PT',
		'gl':'dic-local-GL'
	},
	global_dic_page: {
		'pt-ao':'Project:Dicionário/pt-AO',
		'pt-br':'Project:Dicionário/pt-BR',
		'pt-pt':'Project:Dicionário/pt-PT',
		'gl':'Project:Dicionário/gl'
	},
	help_page: 'Minecraft Wiki:Conversor de idiomas',
	show_changes: false,
	show_menu_title: true,
	selection_mode: 'OR',
	max_seq: 3
}; // Config

// Importa [[m:User:He7d3r/Tools/LanguageConverter.js]] para permitir a conversão de idiomas
mw.loader.load( 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/LanguageConverter.js&action=raw&ctype=text/javascript' );

// [[Categoria:!Código-fonte de scripts|LanguageConverter.js]]