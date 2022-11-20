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
					'label': 'Útiles WikiDex',
					'pages': {
						General: {
							label: 'General',
							layout: 'characters',
							characters: [ 'á','Á','é','É','í','Í','ó','Ó','ú','Ú','ü','Ü','ñ','Ñ','æ','Æ','º','ª','¡','¿','€','♂','♀','|','~','–','—','…',_combinado('«','»'),'↑','↓','←','→','−','±','×','✔','†','Pokémon','RΩ','Zα' ]
						},
						MediaWiki: {
							label: 'MediaWiki',
							layout: 'characters',
							characters: [ '\x7E\x7E\x7E\x7E', _combinado( '\x7B{', '}}' ), _combinado('[[', ']]'), _combinado( '[[Categoría:', ']]' ), _combinado( '#REDIRECCIÓN [[', ']]' ),
								_combinado( '<ref>', '</ref>' ), '<references />', _combinado( '<includeonly>', '</includeonly>' ), _combinado( '<noinclude>', '</noinclude>' ), _combinado( '<nowiki>', '</nowiki>' ),
								_combinado( '\x3Cgallery widths="190px">\n', '\n</gallery>' ), _combinado( '<div class="cajaflexible">', '</div>' ), _combinado( '<code>', '</code>' ), '\x7B{PAGENAME}}',
								_combinado( '<!--', '-->' ), _combinado( '\x7B{t|', '}}' ), _combinado( '\x7B{S|', '}}') ]
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
						},
						Licencias: {
							label: 'Plantillas de licencias',
							layout: 'characters',
							characters: [ _combinado('\x7B{Art Oficial|','}}'), '\x7B{CC-BY}}', '\x7B{CC-BY}}', '\x7B{CC-SA}}', '\x7B{CC-BY-SA}}', '\x7B{Carátula}}', '\x7B{Fair use}}', _combinado('\x7B{Fanart|','}}'), '\x7B{GFDL}}', '\x7B{Imagen de Sugimori}}', '\x7B{Imagen de commons}}', '\x7B{LAL}}', '\x7B{PD}}', '\x7B{Pokémon sprite}}', '\x7B{Scan}}', '\x7B{ScreenshotJuego}}', '\x7B{ScreenshotTV}}' ]
						},
						Tipos: {
							label: 'Imágenes para tipos',
							layout: 'characters',
							characters: ['\x7B{t|Acero}}', '\x7B{t|Agua}}', '\x7B{t|Bicho}}', '\x7B{t|Dragón}}', '\x7B{t|Eléctrico}}', '\x7B{t|Fantasma}}', '\x7B{t|Fuego}}', '\x7B{t|Hada}}', '\x7B{t|Hielo}}', '\x7B{t|Lucha}}', '\x7B{t|Normal}}', '\x7B{t|Planta}}', '\x7B{t|Psíquico}}', '\x7B{t|Roca}}', '\x7B{t|Siniestro}}', '\x7B{t|Tierra}}', '\x7B{t|Veneno}}', '\x7B{t|Volador}}', '\x7B{t|Especial}}', '\x7B{t|Físico}}', '\x7B{t|Estado}}']
						},
						Videojuegos: {
							label: 'Enlaces a videojuegos',
							layout: 'characters',
							characters: ['[[Pokémon Verde]], [[Pokémon Rojo]], [[Pokémon Azul]] y [[Pokémon Amarillo]]', '[[Pokémon Oro y Pokémon Plata|Pokémon Oro, Pokémon Plata]] y [[Pokémon Cristal]]',
								'[[Pokémon Rubí y Pokémon Zafiro|Pokémon Rubí, Pokémon Zafiro]] y [[Pokémon Esmeralda]]', '[[Pokémon Rojo Fuego y Pokémon Verde Hoja]]',
								 '[[Pokémon Diamante y Pokémon Perla|Pokémon Diamante, Pokémon Perla]] y [[Pokémon Platino]]', '[[Pokémon Oro HeartGold y Pokémon Plata SoulSilver]]',
								 '[[Pokémon Negro y Pokémon Blanco]]', '[[Pokémon Negro 2 y Pokémon Blanco 2]]', '[[Pokémon X y Pokémon Y]]', '[[Pokémon Rubí Omega y Pokémon Zafiro Alfa]]',
								 '[[Pokémon Sol y Pokémon Luna]]', '[[Pokémon Ultrasol y Pokémon Ultraluna]]', '[[Pokémon: Let\'s Go, Pikachu! y Pokémon: Let\'s Go, Eevee!]]',
								 '[[Pokémon Espada y Pokémon Escudo]]', '[[Pokémon Diamante Brillante y Pokémon Perla Reluciente]]', '[[Leyendas Pokémon: Arceus]]', '[[Pokémon Escarlata y Pokémon Púrpura]]']
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