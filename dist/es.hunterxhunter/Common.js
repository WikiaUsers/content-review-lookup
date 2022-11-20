/* <pre>
* Agrega caracteres especiales al wikieditor
*/
;( function( $, mw ) {
	var _init = function() {
		mw.hook( 'wikiEditor.toolbarReady' ).add( _initTextarea );
	},
	_initTextarea = function( $textarea ) {
		$textarea.wikiEditor( 'addToToolbar', {
			'sections': {
				'smash-utiles': {
					'type': 'booklet',
					'label': 'HxH',
					'pages': {
						General: {
							label: 'General',
							layout: 'characters',
							characters: [ 'á','Á','é','É','í','Í','ó','Ó','ú','Ú','ü','Ü','ñ','Ñ','æ','Æ','º','ª','¡','¿','€','♂','♀','|','~','–','—','…',_combinado('«','»'),'↑','↓','←','→','−','±','×','✔','†', 'Hunter × Hunter' ]
						},
						MediaWiki: {
							label: 'MediaWiki',
							layout: 'characters',
							characters: [ '\x7E\x7E\x7E\x7E', _combinado( '\x7B{', '}}' ), _combinado('[[', ']]'), _combinado( '[[Categoría:', ']]' ), _combinado( '#REDIRECCIÓN [[', ']]' ),
								_combinado( '{{Ref|manga=', '|pág=}}' ), '{{Caja de referencias}}', _combinado( '<includeonly>', '</includeonly>' ), _combinado( '<noinclude>', '</noinclude>' ), _combinado( '<nowiki>', '</nowiki>' ),
								_combinado( '<code>', '</code>' ), '\x7B{PAGENAME}}',
								_combinado( '<!--', '-->' ) ]
						},
						Japo1: {
							label: 'Japonés - Katakana',
							layout: 'characters',
							characters: ['ア','ァ','イ','ィ','ウ','ヴ','ゥ','エ','ェ','オ','ォ','カ','ガ','キ','ギ','ク','グ','ケ','ゲ','コ','ゴ','サ','ザ','シ','ジ','ス','ズ','セ','ゼ','ソ','ゾ','タ','ダ','チ','ヂ','ツ','ヅ','ッ','テ','デ','ト','ド','ナ','ニ','ヌ','ネ','ノ','ハ','バ','パ','ヒ','ビ','ピ','フ','ブ','プ','ヘ','ベ','ペ','ホ','ボ','ポ','マ','ミ','ム','メ','モ','ヤ','ャ','ユ','ュ','ヨ','ョ','ラ','リ','ル','レ','ロ','ワ','ヷ','ヰ','ヸ','ヱ','ヹ','ヲ','ヺ','ン','ー','、','。',_combinado('「','」'),_combinado('『','』'),'ゝ','ゞ','々','ヽ','ヾ']
						},
						Japo2: {
							label: 'Japonés - R\u014Dmaji',
							layout: 'characters',
							characters: ['Ā','ā','Ē','ē','Ī','ī','Ō','ō','Ū','ū']
						},
						Fonetico: {
							label: 'Alfabeto fonético',
							layout: 'characters',
							characters: ['ɨ','ʉ','ɯ','ɪ','ʏ','ʊ','ø','ɘ','ɵ','ɤ','ə','ɛ','œ','ɜ','ɞ','ʌ','ɔ','æ','ɐ','ɶ','ɑ','ɒ','ɚ','ɝ','ʰ','ʱ','ʲ','ʴ','ʷ','˞','ˠ','ˤ','ʼ','ˈ','ˌ','ː','ˑ','.','ʈ','ɖ','ɟ','ɢ','ʔ','ɱ','ɳ','ɲ','ŋ','ɴ','ʙ','ʀ','ɾ','ɽ','ɸ','β','θ','ð','ʃ','ʒ','ʂ','ʐ','ʝ','ɣ','χ','ʁ','ħ','ʕ','ɦ','ɬ','ɮ','ʋ','ɹ','ɻ','ɰ','ɭ','ʎ','ʟ','ʍ','ɥ','ʜ','ʢ','ʡ','ɕ','ʑ','ɺ','ɧ','ɡ','ɫ']
						}
					}
				}
			}
		} );
	},
	// Crea una combinación inicio-fin
	_combinado = function( pre, post ) {
		return {
			action: {
				type: 'encapsulate',
				options: {
					pre: pre,
					post: post
				}
			},
			label: pre + ' ' + post
		};
	};
	$( _init );
} )( jQuery, mw );
/* </pre> */

if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload') {
	$(function() {
		importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
	});
}