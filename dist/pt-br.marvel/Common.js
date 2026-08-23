/* CUIDADO: qualquer JavaScript colocado aqui será carregado para todos os usuários. */

/*
 * Marvel Wiki — Common.js brasileiro consolidado
 *
 * Identificadores internos do MediaWiki permanecem em inglês por serem APIs
 * canônicas. Textos visíveis, comentários e nomes editoriais estão em pt-BR.
 */
(function (mw, $) {
	'use strict';

	/* ---------------------------------------------------------------------
	 * Scripts estáveis da Fandom Developers Wiki
	 * ------------------------------------------------------------------ */
	window.dev = window.dev || {};
	window.dev.ReferencePopups = window.dev.ReferencePopups || {};
	window.dev.ReferencePopups.lockdown = true;

	window.SpoilerAlertJS = {
		question: 'Esta área contém spoilers. Deseja exibi-la?',
		yes: 'Mostrar spoilers',
		no: 'Manter oculto',
		fadeDelay: 400
	};

	if (typeof window.importScriptPage === 'function') {
		window.importScriptPage('ReferencePopups/code.js', 'dev');
		window.importScriptPage('SpoilerAlert/code.js', 'dev');
	}

	/* ---------------------------------------------------------------------
	 * Link “Criar uma nova página”
	 * ------------------------------------------------------------------ */
	function updateCreatePageLinks() {
		var target = mw.util.getUrl('Marvel Wiki:Criar uma nova página');

		[
			'dynamic-links-write-article-icon',
			'dynamic-links-write-article-link'
		].forEach(function (id) {
			var link = document.getElementById(id);

			if (!link) {
				return;
			}

			link.href = target;
			link.removeAttribute('onclick');
		});
	}

	/* ---------------------------------------------------------------------
	 * Localizador de imagens duplicadas
	 * Executado somente em páginas que possuam #mw-dupimages.
	 * ------------------------------------------------------------------ */
	function initDuplicateImageFinder() {
		var $container = $('#mw-dupimages');

		if (!$container.length) {
			return;
		}

		mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
			var api = new mw.Api();
			var seenFiles = Object.create(null);
			var fileNamespace = (mw.config.get('wgFormattedNamespaces') || {})[6] || 'Arquivo';

			function normalizedTitle(title) {
				return String(title || '').replace(/_/g, ' ');
			}

			function appendDuplicateGroup(page) {
				var title = normalizedTitle(page.title);
				var duplicates = page.duplicatefiles || [];

				if (!duplicates.length || seenFiles[title]) {
					return;
				}

				seenFiles[title] = true;

				var $heading = $('<h3>');
				var $list = $('<ul>');

				$('<a>')
					.attr('href', mw.util.getUrl(title))
					.text(title)
					.appendTo($heading);

				duplicates.forEach(function (duplicate) {
					var duplicateTitle = fileNamespace + ':' + normalizedTitle(duplicate.name);

					seenFiles[duplicateTitle] = true;
					$('<a>')
						.attr('href', mw.util.getUrl(duplicateTitle))
						.text(duplicateTitle)
						.appendTo($('<li>').appendTo($list));
				});

				$container.append($heading, $list);
			}

			function requestBatch(parameters) {
				return api.get(parameters).then(function (data) {
					var pages = data.query && data.query.pages ? data.query.pages : [];

					pages.forEach(appendDuplicateGroup);

					if (!data.continue) {
						return null;
					}

					return new Promise(function (resolve) {
						window.setTimeout(resolve, 750);
					}).then(function () {
						return requestBatch($.extend({}, parameters, data.continue));
					});
				});
			}

			requestBatch({
				action: 'query',
				generator: 'allimages',
				prop: 'duplicatefiles',
				gailimit: 'max',
				formatversion: 2
			});
		});
	}

	/* ---------------------------------------------------------------------
	 * Metadados de categorias: datas, numeração do legado e tipo de mídia
	 * ------------------------------------------------------------------ */
	var metadataCategorySuffixes = [
		'Numeração do Legado', 'Números do Legado', 'Legacy Numbers',
		'Aparições', 'Appearances',
		'Aparições em Manuais', 'Handbook Appearances',
		'Aparições Menores', 'Minor Appearances',
		'Menções', 'Mentions',
		'Menções em Manuais', 'Handbook Mentions',
		'Invocações', 'Invocations',
		'Roteirista', 'Escritor', 'Writer',
		'Desenhista', 'Penciler',
		'Arte-Finalista', 'Inker',
		'Capista', 'Cover Artist',
		'Editor'
	];

	var legacyCategorySuffixes = [
		'Numeração do Legado', 'Números do Legado', 'Legacy Numbers'
	];

	var taskCategorySuffixes = [
		'Mover', 'Move',
		'Mover Realidade', 'Move Reality',
		'Mover Quadrinho', 'Move Comic',
		'Mover Volume', 'Mover Volume de Quadrinhos', 'Move Comic Volume',
		'Mover Imagem', 'Move Image',
		'A Excluir', 'A Ser Excluído', 'To Be Deleted',
		'Mesclar', 'Merge',
		'Dividir', 'Split',
		'Plágio', 'Plagiarism'
	];

	var mediaClasses = {
		Episode: 'category-link-media-tv',
		'Episódio': 'category-link-media-tv',
		Film: 'category-link-media-film',
		Filme: 'category-link-media-film',
		'Video Game': 'category-link-media-game',
		'Jogo Eletrônico': 'category-link-media-game',
		Novel: 'category-link-media-novel',
		Romance: 'category-link-media-novel',
		Sourcebook: 'category-link-media-sourcebook',
		Manual: 'category-link-media-sourcebook'
	};

	function categorySuffix() {
		return String(mw.config.get('wgTitle') || '').split('/').pop();
	}

	function formatPartialDate(year, month, day) {
		if (month === '00') {
			return year;
		}

		if (!day || day === '00') {
			return year + '-' + month;
		}

		return year + '-' + month + '-' + day;
	}

	function dateMetadata(sortKey) {
		var details = [];
		var filmOrTelevision = sortKey.match(/^&nbsp;(\d{4})(\d{2})(\d{2})/);
		var cover = sortKey.match(/^&nbsp;(\d{4})-(\d{2})/);
		var release = sortKey.match(/^&nbsp;\d{4}-\d{2}\s+(\d{4})(\d{2})(\d{2})/);

		if (filmOrTelevision) {
			details.push('lançamento: ' + formatPartialDate(
				filmOrTelevision[1],
				filmOrTelevision[2],
				filmOrTelevision[3]
			));
			return details;
		}

		if (cover) {
			details.push('capa: ' + cover[1] + '-' + cover[2]);
		}

		if (release) {
			details.push('lançamento: ' + formatPartialDate(
				release[1],
				release[2],
				release[3]
			));
		}

		return details;
	}

	function taskMetadata(sortKey) {
		var match = sortKey.match(/TASKDATE:(\d{14});/);

		if (!match) {
			return [];
		}

		return [
			'tarefa: ' + match[1].replace(
				/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
				'$1-$2-$3 $4:$5:$6'
			)
		];
	}

	function initCategoryMetadata() {
		if (mw.config.get('wgCanonicalNamespace') !== 'Category') {
			return;
		}

		var suffix = categorySuffix();
		var isMetadataCategory = metadataCategorySuffixes.indexOf(suffix) !== -1;
		var isTaskCategory = taskCategorySuffixes.indexOf(suffix) !== -1;

		if (!isMetadataCategory && !isTaskCategory) {
			return;
		}

		var $links = $(
			'.mw-category a[title], ' +
			'.mw-category-generated a[title], ' +
			'#mw-pages a[title], ' +
			'.category-page__members a[title]'
		);

		var titles = [];
		var knownTitles = Object.create(null);

		$links.each(function () {
			var title = this.getAttribute('title');

			if (title && !knownTitles[title]) {
				knownTitles[title] = true;
				titles.push(title);
			}
		});

		if (!titles.length) {
			return;
		}

		mw.loader.using('mediawiki.api').then(function () {
			var api = new mw.Api();
			var requests = [];

			for (var offset = 0; offset < titles.length; offset += 50) {
				requests.push(api.get({
					action: 'query',
					prop: 'pageprops',
					ppprop: 'defaultsort',
					titles: titles.slice(offset, offset + 50),
					formatversion: 2
				}));
			}

			Promise.all(requests).then(function (responses) {
				responses.forEach(function (data) {
					var pages = data.query && data.query.pages ? data.query.pages : [];

					pages.forEach(function (page) {
						if (!page.pageprops || !page.pageprops.defaultsort) {
							return;
						}

						var sortKey = page.pageprops.defaultsort;
						var details = isTaskCategory ? taskMetadata(sortKey) : dateMetadata(sortKey);
						var mediaType = sortKey.match(/MEDIA:([^;]+);/);
						var $targets = $links.filter(function () {
							return this.getAttribute('title') === page.title;
						});

						if (mediaType && mediaClasses[mediaType[1]]) {
							$targets.addClass(mediaClasses[mediaType[1]]);
						}

						if (legacyCategorySuffixes.indexOf(suffix) !== -1) {
							var legacy = sortKey.match(/LGY:([^;]+);/);

							if (legacy) {
								details.unshift('LGY ' + legacy[1]);
							}
						}

						if (!details.length) {
							return;
						}

						$targets.each(function () {
							var $target = $(this);

							if ($target.next('.category-link-tooltip').length) {
								return;
							}

							$('<span>')
								.addClass('category-link-tooltip')
								.text(' (' + details.join('; ') + ')')
								.insertAfter($target);
						});
					});
				});
			});
		});
	}

	/* ---------------------------------------------------------------------
	 * Frase aleatória no cabeçalho da comunidade
	 * ------------------------------------------------------------------ */
	function setRandomCommunitySlogan() {
		var slogans = [
			'Avante, Verdadeiros Crentes!',
			"Mês do Silêncio",
			'Excelsior!',
			'Ai, Minha Santa Aquerupita',
			'Avante, Vingadores!',
			'A Mim, Meus X-Men!',
			'Com Grandes Poderes...',
			'Hulk Esmaga!',
			'Snikt!',
			'Tá Na Hora do Pau!',
			'Em Chamas!',
			'Wakanda Para Sempre!',
			'Eu sou o Homem de Ferro.',
			'Eu sou Groot.',
			'Bamf!',
			'Aquele Que Empunhar Este Martelo, Se For Digno...',
			'Pelas Barbas de Odin!',
			'Imperius Rex!',
			'O Melhor Que Existe Naquilo Que Faz...',
			'...espero que sobreviva à experiência!',
			'Doce Natal!',
			'E Houve um Dia, um Dia Como Nenhum Outro...',
			'Thwip!'
		];

		var element = document.querySelector('.fandom-community-header__community-name');

		if (!element) {
			return;
		}

		element.textContent = slogans[Math.floor(Math.random() * slogans.length)];
		element.setAttribute('aria-label', 'Marvel Wiki');
		element.title = 'Marvel Wiki';
	}

	/* ---------------------------------------------------------------------
	 * Barra de ferramentas do WikiEditor
	 * ------------------------------------------------------------------ */
	function formatTemplateField(field) {
		var width = 24;
		var spacing = new Array(Math.max(2, width - field.length + 2)).join(' ');

		return '| ' + field + spacing + '= ';
	}

	function templateInsertion(templateName, fields) {
		var firstFieldIndex = fields.findIndex(function (field) {
			return field !== null;
		});
		var firstField = fields[firstFieldIndex];
		var remaining = fields.slice(firstFieldIndex + 1).map(function (field) {
			return field === null ? '' : formatTemplateField(field);
		});

		return {
			pre: '{{' + templateName + '\n' + formatTemplateField(firstField),
			post: '\n' + remaining.join('\n') + '\n}}'
		};
	}

	function toolbarButton(label, insertion) {
		return {
			label: label,
			type: 'button',
			oouiIcon: 'fa',
			action: {
				type: 'encapsulate',
				options: insertion
			}
		};
	}

	function applyToolbarIcons(iconMap) {
		window.setTimeout(function () {
			Object.keys(iconMap).forEach(function (toolName) {
				var anchors = document.querySelectorAll(
					'.wikiEditor-ui-toolbar span[rel="' + toolName + '"] a'
				);

				anchors.forEach(function (anchor) {
					var icon = document.createElement('span');

					icon.className =
						'oo-ui-indicatorElement-indicator ' +
						'oo-ui-indicatorElement-noIndicator ' +
						'md-fa-toolbar-button fa ' + iconMap[toolName];
					anchor.textContent = '';
					anchor.appendChild(icon);
				});
			});
		}, 0);
	}

	function customizeToolbar($textarea) {
		var characterFields = [
			'Imagem', null,
			'NomeReal', 'NomeOriginal', 'AlterEgo', 'OutrasIdentidades', null,
			'Afiliação', 'Parentes', 'EstadoCivil', null,
			'RefDoPersonagem', 'Gênero', 'Altura', 'Peso', 'Olhos', 'Cabelo', 'CaracterísticasIncomuns', null,
			'Origem', 'Realidade', 'LocalDeNascimento', null,
			'Identidade', 'Cidadania', 'Ocupação', 'Educação', 'BaseDeOperações', null,
			'Criadores', 'Primeira', 'PrimeiraBR', null,
			'História', 'Personalidade', null,
			'Poderes', 'Habilidades', 'Força', 'Fraquezas', null,
			'Equipamento', 'Transporte', 'Armas', null,
			'Notas', 'Curiosidades', 'Marvel', 'Wikipedia', 'Links'
		];

		var teamFields = [
			'Imagem', null,
			'Nome', 'OutrosNomes', 'Status', 'Identidade', 'Realidade', 'BaseDeOperações', null,
			'Líderes', 'MembrosAtuais', 'MembrosAnteriores', 'Aliados', 'Inimigos', null,
			'Origem', 'LocalDeFormação', 'LocalDeDestruição', null,
			'Criadores', 'Primeira', 'Última', null,
			'VisãoGeral', 'História', null,
			'Equipamento', 'Transporte', 'Armas', null,
			'Notas', 'Curiosidades', 'Links'
		];

		var locationFields = [
			'Imagem', null,
			'Nome', 'OutrosNomes', null,
			'Realidade', 'Galáxia', 'SistemaEstelar', 'Planeta', 'Continente',
			'País', 'Região', 'Estado', 'Cidade', 'Localidade', null,
			'População', null,
			'Criadores', 'Primeira', null,
			'História', null,
			'PontosDeInteresse', 'Residentes', null,
			'Notas', 'Curiosidades', 'Links'
		];

		var comicFields = [
			'Imagem1', 'Imagem1_Artista1', 'Imagem2', 'Imagem2_Texto', 'Imagem2_Artista1', null,
			'Evento1', 'Arco1', 'Enredo1', 'EdiçãoAnterior', 'PróximaEdição', null,
			'DataDeLançamento', 'Mês', 'Ano', null,
			'Editor-Chefe', 'Classificação', 'PreçoOriginal', 'Páginas',
			'ISBN', 'ISSN', 'UPC', null,
			'Citação', 'Orador', null,
			'TítuloDaHistória1', 'TítuloOriginal1', 'ReimpressãoDe1',
			'ReimpressãoDaHistória1', 'AdaptadoDe1_1', null,
			'Roteirista1_1', 'Desenhista1_1', 'Arte-Finalista1_1',
			'Colorista1_1', 'Letrista1_1', 'Editor1_1', null,
			'ParteDe1', 'Aparições1', 'Sinopse1', null,
			'Solicitada', 'Notas', 'Curiosidades', 'Recomendado', 'Links'
		];

		var iconMap = {
			strike: 'fa-strikethrough',
			comment: 'fa-comment',
			cat: 'fa-cat',
			character: 'fa-user',
			team: 'fa-users',
			location: 'fa-city',
			comic: 'fa-book-open'
		};

		$textarea.wikiEditor('addToToolbar', {
			section: 'main',
			group: 'format',
			tools: {
				strike: toolbarButton('Tachado', {
					pre: '<s>',
					post: '</s>'
				}),
				comment: toolbarButton('Comentário oculto', {
					pre: '<!-- ',
					post: ' -->'
				})
			}
		});

		$textarea.wikiEditor('addToToolbar', {
			section: 'main',
			group: 'insert',
			tools: {
				cat: toolbarButton('Categorização rápida', {
					pre: '{{subst:Cat',
					post: '}}'
				})
			}
		});

		$textarea.wikiEditor('addToToolbar', {
			section: 'advanced',
			groups: {
				infoboxes: {
					label: 'Predefinições'
				}
			}
		});

		$textarea.wikiEditor('addToToolbar', {
			section: 'advanced',
			group: 'infoboxes',
			tools: {
				character: toolbarButton(
					'Personagem',
					templateInsertion('Marvel Wiki:Predefinição de Personagem', characterFields)
				),
				team: toolbarButton(
					'Equipe',
					templateInsertion('Marvel Wiki:Predefinição de Equipe', teamFields)
				),
				location: toolbarButton(
					'Local',
					templateInsertion('Marvel Wiki:Predefinição de Local', locationFields)
				),
				comic: toolbarButton(
					'Quadrinho',
					templateInsertion('Marvel Wiki:Predefinição de Quadrinho', comicFields)
				)
			}
		});

		applyToolbarIcons(iconMap);
	}
	
/* =========================================================
 * Formatação dos títulos das Terras
 *
 * Terra-616                    → Terra 616
 * Terra-199999                 → Terra 199.999
 * Peter Parker (Terra-616)     → Peter Parker (Terra 616)
 * Oscorp (Terra-616)           → Oscorp (Terra 616)
 * Vingadores (Terra-616)       → Vingadores (Terra 616)
 *
 * A alteração é apenas visual.
 * O nome verdadeiro da página e os links continuam intactos.
 * ========================================================= */

mw.hook('wikipage.content').add(function () {

	function formatarTerras(texto) {
		return texto.replace(
			/Terra-(\d+)([A-Za-z]*)/g,
			function (correspondencia, numero, sufixo) {

				/* Formata números grandes:
				 * 199999  → 199.999
				 * 1000000 → 1.000.000
				 */
				var numeroFormatado = numero.replace(
					/\B(?=(\d{3})+(?!\d))/g,
					'.'
				);

				return 'Terra ' + numeroFormatado + sufixo;
			}
		);
	}

	/*
	 * Localiza o título principal.
	 */
	var titulo =
		document.querySelector('.mw-page-title-main') ||
		document.querySelector('#firstHeading') ||
		document.querySelector('.page-header__title');

	if (!titulo) {
		return;
	}

	/*
	 * Altera apenas os nós de texto.
	 * Assim, preserva spans, itálicos e outras formatações
	 * que possam existir no DISPLAYTITLE.
	 */
	var walker = document.createTreeWalker(
		titulo,
		NodeFilter.SHOW_TEXT,
		null,
		false
	);

	var nos = [];
	var node;

	while ((node = walker.nextNode())) {
		nos.push(node);
	}

	nos.forEach(function (no) {
		no.nodeValue = formatarTerras(no.nodeValue);
	});

});

	/* ---------------------------------------------------------------------
	 * Inicialização
	 * ------------------------------------------------------------------ */
	$(function () {
		mw.loader.using('mediawiki.util').then(function () {
			updateCreatePageLinks();
			$(window).on('load', updateCreatePageLinks);
			initDuplicateImageFinder();
		});

		initCategoryMetadata();
		setRandomCommunitySlogan();
	});

	if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
		mw.hook('wikiEditor.toolbarReady').add(customizeToolbar);
	}
}(window.mediaWiki, window.jQuery));