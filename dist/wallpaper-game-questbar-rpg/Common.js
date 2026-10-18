/* Questbar RPG Wiki — MediaWiki:Common.js
 *
 * Works on computers, and on phones with "Desktop site" turned on in the browser menu:
 * Fandom never runs JavaScript on its mobile skin. Everything here is an extra — without it the wiki
 * still works, and the ✎ / ＋ buttons open the edit page with the line already written.
 *
 *  1) Remembers the language chosen with the language buttons.
 *  2) Skill Tree map: drag it with the mouse; tap a node to light up the path from the start;
 *     filter the map by type (or show only the nodes that still have no value).
 *  3) Edit in a small window instead of the edit page: map nodes, creatures and stages of the Bestiary.
 *  4) Group edit of map nodes, for administrators: select many nodes and change them all at once.
 *  5) Search and filters on the "All creatures" table of the Bestiary.
 *  6) Rune calculator on the Calculators page: evolve an item, see the new attributes, Gear Score and value,
 *     and compare it with another item. "Choose an item" fills a card with an item of Equipment/Data, and the
 *     numbers then follow the rarity. (Without this script the page shows the multiplier table.)
 *  7) Equipment page: search and filters (name, type, class, level); administrators get a button that
 *     creates the missing item pages ({{Item}}) and the redirects from the Portuguese names.
 *  8) Item pages: choose the enchantment level and see the attributes change; open the item in the rune calculator.
 *
 * The texts come from the modules (data-ed and data-f-* attributes) in the reader's language,
 * so a translation can be fixed in Module:Idioma, Module:Bestiário or Module:Calculadora without touching this page.
 */
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
	'use strict';

	var LINGUAS = ['en', 'es', 'pt', 'fr', 'de', 'ru', 'vi'];
	var ADMINS = ['sysop', 'bureaucrat', 'content-moderator'];
	// English texts, used only when a module does not send its own
	var EN = {
		salvar: 'Save', cancelar: 'Cancel', valor: 'Value (as in the game)', esp: 'Big node (special)', remover: 'Remove this node',
		salvando: 'Saving…', erro: 'Could not save:', completo: 'Open the full editor', tipo: 'Type', linha: 'Line',
		cam: '%d nodes from the start', semcam: 'No known path from the start yet',
		filtro: 'Show only:', semvalor: 'Missing value', tudo: 'Show all', achados: '%d nodes', maistipo: '＋ Type…',
		filtdica: 'Tap the icons in the legend (or pick a type here) to show only those nodes.',
		grupo: '✎ Group edit', grupodica: 'Tap nodes to select them, then change them all at once.', sel: '%d selected',
		iguais: 'Select same', iguaisdica: 'Every node with the same type, value and size as the last one you tapped',
		mesmotipo: 'Same type', visiveis: 'All shown', limpar: 'Clear', editarn: 'Edit %d', sair: 'Exit', grupotit: 'Edit %d nodes',
		mantertipo: 'Keep each node\'s type', mantervalor: 'Empty = keep each node\'s value', espmanter: 'Keep as it is',
		espsim: 'Big (special)', espnao: 'Normal', remsel: 'Delete these %d nodes', confirma: 'Delete %d nodes from the map?',
		novos: 'Choose a type: %d of the selected spaces are empty.', nada: 'Nothing would change.', linhas: 'Lines that will be saved',
		segurar: 'Tip: press and hold a node to start selecting several.',
		imagem: 'Image file', nota: 'Note', habdica: 'Several? Separate them with commas. "Name: description" also works.',
		naosei: 'Don\'t know', regiao: 'Region', incompleta: 'Someone is missing at the start of the list', add: 'Add',
		novo: 'New creature (name as in the game)', escolher: 'Choose a creature…', tirar: 'Remove from this stage',
		ordem: 'In the game\'s order, left to right.', subir: 'Move up', descer: 'Move down',
		todos: 'All', buscar: 'Search a name…', filtrar: 'Filter', mostrando: 'Showing %d of %d', limparf: 'Clear filters',
		classe: 'Class', estilo: 'Fighting style', elem: 'Damage type', gs: 'Gear Score',
		gsdica: 'Added to the account\'s Gear Score, even in reserve', habil: 'Ability', base: 'Base stats (no equipment)',
		naoaplica: 'not applicable',
		itemA: 'Your item', itemB: 'Other item', nivel: 'Level', rar: 'Current rarity', atrs: 'Attributes',
		atrsdica: 'they change with the rune', bons: 'Bonus', bonsdica: 'they don\'t change', addatr: '+ attribute', addbon: '+ bonus',
		valorop: 'Sell value (optional)', evoluir: 'Evolve with the rune', semruna: 'No rune', resultado: 'After the evolution',
		atual: 'now', escada: 'At each rarity', desconhecido: 'We don\'t know yet how much this rune raises the attributes. Add the numbers to %s.',
		novobonus: 'A new bonus may appear after the evolution; the game\'s preview and this calculator don\'t show it.',
		comparar: '＋ Compare with another item', semcomparar: '✕ Remove the comparison', comparacao: 'Comparison',
		diferenca: 'Difference', melhor: '%s is better: %s more Gear Score.', empate: 'Same Gear Score.',
		exemplo: 'Example', exdica: 'Example from the game: %s. Clear it and type the numbers of your item.',
		total: 'The numbers include the bonus lines.',
		escolheritem: 'Choose an item', trocar: 'Change', buscaitem: 'Search an item…', todostipos: 'All types',
		todasclasses: 'All classes', itensach: '%d items', semitem: 'No item found.', nivelc: 'Lv. %d', fechar: 'Close',
		itemdica: 'The attributes follow the rarity you choose. Type the purple bonuses of your copy below.',
		rardesc: 'Nobody knows yet how much this rarity multiplies the attributes. Add the numbers to %s.'
	};
	// map node types: CSS class -> word used in the list
	var TIPOS = [['ouro', 'gold'], ['xp', 'xp'], ['dano', 'damage'], ['velataque', 'attackspeed'], ['critico', 'critchance'],
		['danocritico', 'critdamage'], ['velmov', 'movespeed'], ['alcance', 'range'], ['hp', 'hp'], ['defesa', 'defense'],
		['bloqueio', 'block'], ['esquiva', 'dodge'], ['subjugacao', 'subjugation'], ['drop', 'drop'], ['venda', 'sellprice'],
		['offline', 'offline'], ['inventario', 'inventory'], ['vidasub', 'subjugatedhp'], ['tropa', 'troop'], ['bau', 'chest']];
	var PALAVRA = { inicio: 'start' };
	TIPOS.forEach(function (t) { PALAVRA[t[0]] = t[1]; });
	// Bestiary fields: word in the list -> icon
	var ATRS = [['hp', 'hp'], ['damage', 'dano'], ['attackspeed', 'velataque'], ['critchance', 'critico'], ['critdamage', 'danocritico'],
		['range', 'alcance'], ['defense', 'defesa'], ['dodge', 'esquiva'], ['block', 'bloqueio'], ['movespeed', 'velmov']];
	var CLASSES = [['mage', 'mago'], ['archer', 'arqueiro'], ['knight', 'cavaleiro'], ['universal', 'universal']];
	var ESTILOS = [['melee', 'corpo'], ['ranged', 'dist']];
	var ELEMS = [['physical', 'fisico'], ['earth', 'terra'], ['ice', 'gelo'], ['light', 'luz'], ['water', 'agua'],
		['fire', 'fogo'], ['dark', 'trevas'], ['poison', 'veneno'], ['lightning', 'raio']];
	var CAMPOS = ['class', 'style', 'element', 'gearscore', 'ability', 'note'];

	/* ---------- helpers ---------- */
	function lista(root, sel) {
		return Array.prototype.slice.call((root || document).querySelectorAll(sel));
	}
	function json(el, attr) {
		try { return JSON.parse((el && el.getAttribute(attr)) || '{}') || {}; } catch (e) { return {}; }
	}
	function criar(tag, classe, texto) {
		var el = document.createElement(tag);
		if (classe) { el.className = classe; }
		if (texto !== undefined) { el.textContent = texto; }
		return el;
	}
	function botao(classe, texto, acao) {
		var b = criar('button', classe, texto);
		b.type = 'button';
		if (acao) { b.addEventListener('click', acao); }
		return b;
	}
	function icone(classe) {
		var s = criar('span', 'qb-ico qb-ico-p qb-t-' + classe);
		var t = criar('span', 'qb-tile');
		t.appendChild(criar('span', 'qb-g qb-g-' + classe));
		s.appendChild(t);
		return s;
	}
	// "Edit %d" + 3 -> "Edit 3"
	function fmt(s) {
		var args = arguments, i = 1;
		return String(s).replace(/%[sd]/g, function () { return String(args[i++]); });
	}
	// texts: from the given elements (module attributes), then English
	function textos() {
		var fontes = [];
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i]) { fontes.push(json(arguments[i], 'data-f-tx'), json(arguments[i], 'data-ed')); }
		}
		return function (k) {
			for (var j = 0; j < fontes.length; j++) { if (fontes[j][k]) { return fontes[j][k]; } }
			return EN[k] || k;
		};
	}
	function linguaDe(el) {
		var l = el && el.getAttribute('lang');
		return LINGUAS.indexOf(l) >= 0 ? l : String(mw.config.get('wgUserLanguage') || 'en').slice(0, 2);
	}
	function norm(s) {
		s = String(s || '').toLowerCase();
		if (s.normalize) { s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
		return s.replace(/[\s\-._\/()'’]/g, '');
	}
	function guardar(k, v) {
		try { window.localStorage.setItem(k, v); } catch (e) { /* private window: just don't remember */ }
	}
	function ler(k) {
		try { return window.localStorage.getItem(k); } catch (e) { return null; }
	}
	function ehAdmin() {
		var g = mw.config.get('wgUserGroups') || [];
		for (var i = 0; i < ADMINS.length; i++) { if (g.indexOf(ADMINS[i]) >= 0) { return true; } }
		return false;
	}
	// what a ✎/＋ button would write in the edit box: page, section title and line
	function lerLink(a) {
		var u = new URL(a.href, location.href);
		var m = u.pathname.match(/\/wiki\/(.+)$/);
		var pagina = m ? decodeURIComponent(m[1]) : (u.searchParams.get('title') || '');
		return {
			pagina: pagina.replace(/_/g, ' '),
			titulo: u.searchParams.get('preloadtitle') || '',
			linha: u.searchParams.get('preloadparams[]') || '',
			href: a.href
		};
	}

	/* ---------- 1) remember the language ---------- */
	function lembrarIdioma() {
		var u = new URL(location.href);
		var pedido = (u.searchParams.get('uselang') || '').toLowerCase().slice(0, 2);
		if (LINGUAS.indexOf(pedido) >= 0) { guardar('qb-lingua', pedido); }
		var l = ler('qb-lingua');
		if (LINGUAS.indexOf(l) < 0) { return; }
		var atual = String(mw.config.get('wgUserLanguage') || 'en').toLowerCase().slice(0, 2);
		// a page with the language buttons opened without a language: open it again in the chosen one
		if (!pedido && l !== atual && mw.config.get('wgAction') === 'view' && document.querySelector('.qb-langs')) {
			u.searchParams.set('uselang', l);
			location.replace(u.toString());
			return;
		}
		if (l !== 'en') { levarIdioma(document, l); }
	}
	// address of a wiki page ("Golden Plate Armor" -> /wiki/Golden_Plate_Armor), with an optional query
	function urlPagina(p, q) {
		var t = encodeURIComponent(String(p).replace(/ /g, '_')).replace(/%2F/gi, '/').replace(/%3A/gi, ':');
		var u = String(mw.config.get('wgArticlePath') || '/wiki/$1').replace('$1', t);
		return q ? u + (u.indexOf('?') >= 0 ? '&' : '?') + q : u;
	}
	// links to the wiki's own pages keep the language
	function levarIdioma(root, l) {
		var artigo = String(mw.config.get('wgArticlePath') || '/wiki/$1').replace('$1', '');
		var script = String(mw.config.get('wgScript') || '/index.php');
		lista(root, 'a[href]').forEach(function (a) {
			var h = a.getAttribute('href') || '';
			if (h.charAt(0) === '#' || /^(javascript|mailto):/i.test(h)) { return; }
			var u;
			try { u = new URL(a.href, location.href); } catch (e) { return; }
			if (u.host !== location.host || u.searchParams.get('uselang')) { return; }
			if (u.pathname.indexOf(artigo) !== 0 && u.pathname !== script) { return; }
			u.searchParams.set('uselang', l);
			a.href = u.toString();
		});
	}

	/* ---------- 2) the map ---------- */
	function numClasse(el, re) {
		var m = String(el.className || '').match(re);
		return m ? parseInt(m[1], 10) : null;
	}
	function tipoDe(el) {
		var m = String(el.className || '').match(/\bqb-t-([a-z]+)\b/);
		return m ? m[1] : '';
	}
	// every node of the map with its position (from the rulers: the "0" column and row)
	function indice(tree) {
		if (tree.qbIdx) { return tree.qbIdx; }
		var idx = { mapa: {}, nos: [], vazios: [], pagina: '' };
		tree.qbIdx = idx;
		var grid = tree.querySelector('.qb-grid');
		var rx = grid && grid.querySelector('.qb-rx.qb-r0'), ry = grid && grid.querySelector('.qb-ry.qb-r0');
		if (!rx || !ry) { return idx; }
		var c0 = numClasse(rx, /\bqb-x(\d+)\b/), l0 = numClasse(ry, /\bqb-y(\d+)\b/);
		lista(grid, '.qb-c').forEach(function (c) {
			var col = numClasse(c, /\bqb-x(\d+)\b/), lin = numClasse(c, /\bqb-y(\d+)\b/);
			if (col === null || lin === null) { return; }
			var no = { el: c, x: col - c0, y: l0 - lin };
			no.k = no.x + ',' + no.y;
			c.qbNo = no;
			var a = c.querySelector('a[href*="preloadparams"]');
			if (a && !idx.pagina) { idx.pagina = lerLink(a).pagina; }
			if (c.classList.contains('qb-plus')) { no.novo = true; idx.vazios.push(no); return; }
			no.tipo = tipoDe(c);
			no.esp = c.classList.contains('qb-esp');
			var v = c.querySelector('.qb-info-val');
			var sem = !v || v.classList.contains('qb-info-sem');
			no.semValor = sem && no.tipo !== 'inicio';
			no.valor = sem ? '' : v.textContent.trim();
			idx.mapa[no.k] = no;
			idx.nos.push(no);
		});
		return idx;
	}

	// drag with the mouse; the map opens centered on the start
	function arrastar(scroll) {
		var apertado = false, moveu = false, x0, y0, sl, st;
		var inicio = scroll.querySelector('.qb-start');
		if (inicio && !location.hash) {
			var a = inicio.getBoundingClientRect(), b = scroll.getBoundingClientRect();
			scroll.scrollLeft += a.left - b.left - scroll.clientWidth / 2 + a.width / 2;
			scroll.scrollTop += a.top - b.top - scroll.clientHeight / 2 + a.height / 2;
		}
		scroll.addEventListener('mousedown', function (e) {
			if (e.button !== 0 || e.target.closest('a, button, input, select')) { return; }
			apertado = true; moveu = false;
			x0 = e.clientX; y0 = e.clientY; sl = scroll.scrollLeft; st = scroll.scrollTop;
		});
		window.addEventListener('mousemove', function (e) {
			if (!apertado) { return; }
			var dx = e.clientX - x0, dy = e.clientY - y0;
			if (Math.abs(dx) + Math.abs(dy) > 4) { moveu = true; scroll.style.cursor = 'grabbing'; }
			scroll.scrollLeft = sl - dx; scroll.scrollTop = st - dy;
		});
		window.addEventListener('mouseup', function () { apertado = false; scroll.style.cursor = ''; });
		// a drag is not a click
		scroll.addEventListener('click', function (e) {
			if (moveu) { e.preventDefault(); e.stopImmediatePropagation(); moveu = false; }
		}, true);
	}

	// path from the start (breadth-first search over the known nodes)
	function bfs(idx) {
		if (idx.dist) { return; }
		idx.dist = {}; idx.pai = {};
		var ini = idx.mapa['0,0'];
		if (!ini) { return; }
		idx.dist[ini.k] = 0;
		var fila = [ini], i = 0, a;
		function vizinho(dx, dy) {
			var k = (a.x + dx) + ',' + (a.y + dy);
			if (idx.mapa[k] && idx.dist[k] === undefined) {
				idx.dist[k] = idx.dist[a.k] + 1;
				idx.pai[k] = a.k;
				fila.push(idx.mapa[k]);
			}
		}
		while (i < fila.length) {
			a = fila[i++];
			vizinho(1, 0); vizinho(-1, 0); vizinho(0, 1); vizinho(0, -1);
		}
	}
	function limparCaminho(tree) {
		tree.classList.remove('qb-com-cam');
		lista(tree, '.qb-cam').forEach(function (e) { e.classList.remove('qb-cam'); });
		lista(tree, '.qb-cam-l').forEach(function (e) { e.classList.remove('qb-cam-l'); });
		lista(tree, '.qb-info-cam').forEach(function (e) { e.parentNode.removeChild(e); });
	}
	function mostrarCaminho(tree, no) {
		var idx = indice(tree), t = textos(tree);
		limparCaminho(tree);
		bfs(idx);
		var d = idx.dist[no.k];
		var pos = no.el.querySelector('.qb-info-pos');
		if (pos && no.k !== '0,0') {
			pos.appendChild(criar('span', 'qb-info-cam', ' · ' + (d === undefined ? t('semcam') : fmt(t('cam'), d))));
		}
		if (d === undefined) { return; }
		tree.classList.add('qb-com-cam');
		var k = no.k;
		while (k !== undefined) {
			var atual = idx.mapa[k], kp = idx.pai[k];
			atual.el.classList.add('qb-cam');
			if (kp !== undefined) {
				var p = idx.mapa[kp], liga = null;
				if (p.x === atual.x - 1) { liga = p.el.querySelector('.qb-lr'); }
				else if (p.x === atual.x + 1) { liga = atual.el.querySelector('.qb-lr'); }
				else if (p.y === atual.y + 1) { liga = p.el.querySelector('.qb-ld'); }
				else if (p.y === atual.y - 1) { liga = atual.el.querySelector('.qb-ld'); }
				if (liga) { liga.classList.add('qb-cam-l'); }
			}
			k = kp;
		}
	}

	// filter: types chosen in the legend (or in the bar) and/or "missing value"
	function filtro(tree) {
		if (!tree.qbFiltro) { tree.qbFiltro = { tipos: [], semValor: false }; }
		return tree.qbFiltro;
	}
	function alternarTipo(tree, tipo) {
		var f = filtro(tree), i = f.tipos.indexOf(tipo);
		if (i >= 0) { f.tipos.splice(i, 1); } else { f.tipos.push(tipo); }
		aplicarFiltro(tree);
	}
	function aplicarFiltro(tree) {
		var idx = indice(tree), f = filtro(tree);
		var ativo = f.tipos.length > 0 || f.semValor, n = 0;
		idx.nos.forEach(function (no) {
			var ok = (!f.tipos.length || f.tipos.indexOf(no.tipo) >= 0) && (!f.semValor || no.semValor);
			no.el.classList.toggle('qb-ok', ativo && ok);
			if (ok) { n++; }
		});
		tree.classList.toggle('qb-filtrando', ativo);
		lista(document, '.qb-leg-i').forEach(function (item) {
			item.classList.toggle('qb-leg-on', f.tipos.indexOf(tipoDe(item)) >= 0);
		});
		desenharBarra(tree, ativo, n);
		atualizarGrupo(tree);
	}
	function barraMapa(tree) {
		var t = textos(tree), nomes = json(tree, 'data-nomes'), idx = indice(tree);
		var bar = criar('div', 'qb-fbar');
		bar.setAttribute('lang', linguaDe(tree));
		var l1 = criar('div', 'qb-fbar-l');
		l1.appendChild(criar('span', 'qb-fbar-k', t('filtro')));
		var chips = criar('span', 'qb-fbar-chips');
		l1.appendChild(chips);
		var conta = {};
		idx.nos.forEach(function (no) { conta[no.tipo] = (conta[no.tipo] || 0) + 1; });
		var sel = criar('select', 'qb-fbar-sel');
		sel.appendChild(new Option(t('maistipo'), ''));
		TIPOS.forEach(function (x) {
			if (conta[x[0]]) { sel.appendChild(new Option((nomes[x[0]] || x[1]) + ' (' + conta[x[0]] + ')', x[0])); }
		});
		sel.addEventListener('change', function () {
			if (sel.value && filtro(tree).tipos.indexOf(sel.value) < 0) { alternarTipo(tree, sel.value); }
			sel.value = '';
		});
		l1.appendChild(sel);
		var sv = botao('qb-fbar-b qb-fbar-sv', t('semvalor'), function () {
			filtro(tree).semValor = !filtro(tree).semValor;
			aplicarFiltro(tree);
		});
		l1.appendChild(sv);
		var todos = botao('qb-fbar-b qb-fbar-x', t('tudo'), function () {
			filtro(tree).tipos = []; filtro(tree).semValor = false;
			aplicarFiltro(tree);
		});
		l1.appendChild(todos);
		var n = criar('span', 'qb-fbar-n');
		l1.appendChild(n);
		if (ehAdmin()) {
			var g = botao('qb-fbar-b qb-fbar-g', t('grupo'), function () { alternarGrupo(tree); });
			g.title = t('segurar');
			l1.appendChild(g);
			tree.qbBotaoGrupo = g;
		}
		bar.appendChild(l1);
		var dica = criar('div', 'qb-fbar-dica', t('filtdica'));
		bar.appendChild(dica);
		tree.parentNode.insertBefore(bar, tree);
		tree.qbBarra = { chips: chips, sv: sv, todos: todos, n: n, dica: dica, nomes: nomes, t: t };
		desenharBarra(tree, false, 0);
	}
	function desenharBarra(tree, ativo, n) {
		var b = tree.qbBarra;
		if (!b) { return; }
		var f = filtro(tree);
		b.chips.textContent = '';
		f.tipos.forEach(function (tipo) {
			var c = botao('qb-fchip', '', function () { alternarTipo(tree, tipo); });
			c.appendChild(icone(tipo));
			c.appendChild(document.createTextNode((b.nomes[tipo] || PALAVRA[tipo] || tipo) + ' ✕'));
			b.chips.appendChild(c);
		});
		b.sv.classList.toggle('qb-on', f.semValor);
		b.todos.style.display = ativo ? '' : 'none';
		b.n.textContent = ativo ? fmt(b.t('achados'), n) : '';
		b.dica.style.display = ativo ? 'none' : '';
	}
	function legenda(tree) {
		lista(document, '.qb-leg-i').forEach(function (item) {
			var tipo = tipoDe(item);
			if (!tipo || tipo === 'inicio' || item.getAttribute('data-qb-f')) { return; }
			item.setAttribute('data-qb-f', '1');
			item.setAttribute('role', 'button');
			item.tabIndex = 0;
			item.addEventListener('click', function () { alternarTipo(tree, tipo); });
			item.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternarTipo(tree, tipo); }
			});
		});
	}

	/* ---------- 3) group edit (administrators) ---------- */
	function selecao(tree) {
		if (!tree.qbSel) { tree.qbSel = {}; }
		return tree.qbSel;
	}
	function alternarGrupo(tree, ligar) {
		var on = (ligar === undefined) ? !tree.classList.contains('qb-grupo') : ligar;
		tree.classList.toggle('qb-grupo', on);
		limparCaminho(tree);
		if (document.activeElement && tree.contains(document.activeElement)) { document.activeElement.blur(); }
		if (tree.qbBotaoGrupo) { tree.qbBotaoGrupo.classList.toggle('qb-on', on); }
		if (!on) { limparSel(tree); }
		barraGrupo(tree, on);
	}
	function alternarSel(tree, no, forcar) {
		var sel = selecao(tree);
		var on = (forcar === undefined) ? !sel[no.k] : forcar;
		if (on) {
			sel[no.k] = no;
			if (!no.novo) { tree.qbRef = no; }
		} else {
			delete sel[no.k];
		}
		no.el.classList.toggle('qb-sel', on);
		atualizarGrupo(tree);
	}
	function limparSel(tree) {
		var sel = selecao(tree);
		Object.keys(sel).forEach(function (k) { sel[k].el.classList.remove('qb-sel'); });
		tree.qbSel = {};
		tree.qbRef = null;
		atualizarGrupo(tree);
	}
	function selecionar(tree, teste) {
		indice(tree).nos.forEach(function (no) { if (teste(no)) { alternarSel(tree, no, true); } });
	}
	function barraGrupo(tree, on) {
		var bar = tree.qbGbar;
		if (!on) {
			if (bar && bar.parentNode) { bar.parentNode.removeChild(bar); }
			tree.qbGbar = null;
			return;
		}
		if (bar) { return; }
		var t = textos(tree);
		bar = criar('div', 'qb-gbar');
		bar.setAttribute('lang', linguaDe(tree));
		var q = {};
		q.n = criar('span', 'qb-gbar-n');
		q.iguais = botao('qb-gbar-b', t('iguais'), function () {
			var r = tree.qbRef;
			if (r) { selecionar(tree, function (no) { return no.tipo === r.tipo && no.valor === r.valor && no.esp === r.esp; }); }
		});
		q.iguais.title = t('iguaisdica');
		q.tipo = botao('qb-gbar-b', t('mesmotipo'), function () {
			var r = tree.qbRef;
			if (r) { selecionar(tree, function (no) { return no.tipo === r.tipo; }); }
		});
		q.vis = botao('qb-gbar-b', t('visiveis'), function () {
			selecionar(tree, function (no) { return no.el.classList.contains('qb-ok'); });
		});
		q.limpar = botao('qb-gbar-b', t('limpar'), function () { limparSel(tree); });
		q.ok = botao('qb-gbar-ok', '', function () { editarGrupo(tree); });
		q.sair = botao('qb-gbar-x', t('sair'), function () { alternarGrupo(tree, false); });
		q.dica = criar('div', 'qb-gbar-dica', t('grupodica'));
		[q.n, q.iguais, q.tipo, q.vis, q.limpar, q.ok, q.sair, q.dica].forEach(function (x) { bar.appendChild(x); });
		bar.qb = q;
		document.body.appendChild(bar);
		tree.qbGbar = bar;
		atualizarGrupo(tree);
	}
	function atualizarGrupo(tree) {
		var bar = tree.qbGbar;
		if (!bar) { return; }
		var t = textos(tree), q = bar.qb, n = Object.keys(selecao(tree)).length;
		q.n.textContent = fmt(t('sel'), n);
		q.ok.textContent = fmt(t('editarn'), n);
		q.ok.disabled = !n;
		q.iguais.disabled = q.tipo.disabled = !tree.qbRef;
		q.limpar.disabled = !n;
		q.vis.style.display = tree.classList.contains('qb-filtrando') ? '' : 'none';
		q.dica.style.display = n ? 'none' : '';
	}
	// tap selects in group mode; press and hold a node turns group mode on
	function modoGrupo(tree, scroll) {
		var timer = null, alvo = null, segurou = false, x0 = 0, y0 = 0;
		function cancelar() { if (timer) { clearTimeout(timer); timer = null; } }
		scroll.addEventListener('pointerdown', function (e) {
			if (tree.classList.contains('qb-grupo') || (e.pointerType === 'mouse' && e.button !== 0)) { return; }
			var cel = e.target.closest('.qb-cell');
			var c = cel && cel.parentNode;
			if (!c || !c.qbNo || c.qbNo.novo) { return; }
			alvo = c.qbNo; x0 = e.clientX; y0 = e.clientY; segurou = false;
			cancelar();
			timer = setTimeout(function () {
				timer = null;
				segurou = true;
				alternarGrupo(tree, true);
				alternarSel(tree, alvo, true);
				if (navigator.vibrate) { navigator.vibrate(30); }
			}, 550);
		});
		scroll.addEventListener('pointermove', function (e) {
			if (timer && Math.abs(e.clientX - x0) + Math.abs(e.clientY - y0) > 10) { cancelar(); }
		});
		scroll.addEventListener('pointerup', cancelar);
		scroll.addEventListener('pointercancel', cancelar);
		scroll.addEventListener('scroll', cancelar);
		scroll.addEventListener('contextmenu', function (e) { if (timer || segurou) { e.preventDefault(); } });
		scroll.addEventListener('click', function (e) {
			if (segurou) { e.preventDefault(); e.stopImmediatePropagation(); segurou = false; return; }
			if (!tree.classList.contains('qb-grupo')) { return; }
			var c = e.target.closest('.qb-c');
			e.preventDefault();
			e.stopImmediatePropagation();
			if (c && c.qbNo) { alternarSel(tree, c.qbNo); }
		}, true);
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && tree.classList.contains('qb-grupo') && !document.querySelector('.qb-ed-raiz')) {
				alternarGrupo(tree, false);
			}
		});
	}

	/* ---------- 4) small edit windows ---------- */
	// "x, y | type | value | note | special" <-> parts
	function lerLinhaNo(s) {
		var p = String(s || '').split('|').map(function (x) { return x.trim(); });
		var r = { xy: p[0] || '', tipo: (p[1] && p[1] !== 'TYPE') ? p[1] : '', valor: '', notas: [], esp: false };
		var resto = p.slice(2).filter(function (x) {
			if (/^(special|especial|spécial|★|\*)$/i.test(x)) { r.esp = true; return false; }
			return true;
		});
		r.valor = (resto[0] && resto[0] !== 'VALUE') ? resto[0] : '';
		r.notas = resto.slice(1).filter(function (x) { return x !== ''; });
		return r;
	}
	function montarLinhaNo(r) {
		var p = [r.xy, r.tipo || 'TYPE'];
		if (r.valor || r.notas.length || r.esp) { p.push(r.valor); }
		p = p.concat(r.notas);
		if (r.esp) { p.push('special'); }
		return p.join(' | ');
	}
	function linhaDoNo(no) {
		var a = no.el.querySelector('a[href*="preloadparams"]');
		var d = a ? lerLink(a) : null;
		if (d && d.linha) { return lerLinhaNo(d.linha); }
		return { xy: no.x + ', ' + no.y, tipo: no.novo ? '' : (PALAVRA[no.tipo] || no.tipo), valor: no.valor || '', notas: [], esp: !!no.esp };
	}
	function copiaNo(r) {
		return { xy: r.xy, tipo: r.tipo, valor: r.valor, notas: r.notas.slice(), esp: r.esp };
	}

	function janela(caixa, titulo) {
		lista(document, '.qb-ed-raiz').forEach(function (x) { x.parentNode.removeChild(x); });
		// its own "mw-parser-output" box on the page body: the wiki's icon styles apply,
		// and nothing in Fandom's layout can move the fixed window
		var raiz = criar('div', 'mw-parser-output qb-ed-raiz');
		var fundo = criar('div', 'qb-ed-fundo');
		var jan = criar('div', 'qb-ed');
		jan.setAttribute('lang', linguaDe(caixa));
		jan.setAttribute('role', 'dialog');
		fundo.appendChild(jan);
		raiz.appendChild(fundo);
		jan.appendChild(criar('div', 'qb-ed-t', titulo));
		function esc(e) { if (e.key === 'Escape') { fechar(); } }
		function fechar() {
			if (raiz.parentNode) { raiz.parentNode.removeChild(raiz); }
			document.removeEventListener('keydown', esc);
		}
		document.addEventListener('keydown', esc);
		fundo.addEventListener('click', function (e) { if (e.target === fundo) { fechar(); } });
		document.body.appendChild(raiz);
		return { jan: jan, fechar: fechar };
	}
	function campo(jan, rotulo, valor, exemplo) {
		var l = criar('label', 'qb-ed-k', rotulo);
		var i = criar('input', 'qb-ed-in');
		i.type = 'text';
		i.value = valor || '';
		i.placeholder = exemplo || '';
		l.appendChild(i);
		jan.appendChild(l);
		return i;
	}
	function marcar(jan, rotulo, valor, aoMudar) {
		var l = criar('label', 'qb-ed-ch');
		var c = criar('input');
		c.type = 'checkbox';
		c.checked = !!valor;
		c.addEventListener('change', function () { aoMudar(c.checked); });
		l.appendChild(c);
		l.appendChild(document.createTextNode(' ' + rotulo));
		jan.appendChild(l);
		return c;
	}
	function rodape(j, t, hrefCompleto, aoSalvar) {
		var msg = criar('div', 'qb-ed-msg');
		j.jan.appendChild(msg);
		var b = criar('div', 'qb-ed-b');
		var ok = botao('qb-ed-ok', t('salvar'), aoSalvar);
		b.appendChild(ok);
		b.appendChild(botao('qb-ed-nao', t('cancelar'), j.fechar));
		if (hrefCompleto) {
			var tudo = criar('a', 'qb-ed-full', t('completo'));
			tudo.href = hrefCompleto;
			b.appendChild(tudo);
		}
		j.jan.appendChild(b);
		return { msg: msg, ok: ok };
	}
	// adds a new section with the line(s) to the data page ("the last line wins"), then reloads the page
	function salvar(pagina, titulo, texto, resumo, r, t) {
		if (!pagina) { r.msg.textContent = t('erro') + ' (page?)'; return; }
		r.ok.disabled = true;
		r.msg.textContent = t('salvando');
		var api = new mw.Api();
		api.postWithToken('csrf', {
			action: 'edit', title: pagina, section: 'new', sectiontitle: titulo, text: texto, summary: resumo.slice(0, 480)
		}).then(function () {
			return api.post({ action: 'purge', titles: mw.config.get('wgPageName') }).then(null, function () { return true; });
		}).then(function () {
			location.reload();
		}, function (codigo, resp) {
			r.ok.disabled = false;
			r.msg.textContent = t('erro') + ' ' + ((resp && resp.error && resp.error.info) || codigo);
		});
	}
	function gradeTipos(nomes, atual, aoEscolher, manter) {
		var grade = criar('div', 'qb-ed-grade');
		function opcao(palavra, rotulo, ico) {
			var b = botao('qb-ed-tipo', '', function () {
				lista(grade, '.qb-ed-tipo').forEach(function (x) { x.classList.toggle('qb-ed-on', x === b); });
				aoEscolher(palavra);
			});
			b.setAttribute('data-palavra', palavra);
			if (ico) { b.appendChild(icone(ico)); }
			b.appendChild(criar('span', 'qb-ed-n', rotulo));
			if (palavra === atual) { b.classList.add('qb-ed-on'); }
			grade.appendChild(b);
		}
		if (manter) { opcao('', manter, null); }
		TIPOS.forEach(function (x) { opcao(x[1], nomes[x[0]] || x[1], x[0]); });
		return grade;
	}

	// one map node
	function editorNo(a) {
		var tree = a.closest('.qb-tree');
		var t = textos(tree), nomes = json(tree, 'data-nomes'), d = lerLink(a);
		var r0 = lerLinhaNo(d.linha), r = copiaNo(r0), novo = !r0.tipo, rr;
		var j = janela(tree, (novo ? '＋ ' : '✎ ') + '(' + r0.xy.replace(/-/g, '−') + ')');
		var linha = criar('code', 'qb-ed-linha');
		function montar() { linha.textContent = montarLinhaNo(r); }
		j.jan.appendChild(criar('div', 'qb-ed-k', t('tipo')));
		j.jan.appendChild(gradeTipos(nomes, r.tipo, function (w) { r.tipo = w; montar(); }));
		var iv = campo(j.jan, t('valor'), r.valor, '+2.8%');
		iv.addEventListener('input', function () { r.valor = iv.value.trim(); montar(); });
		marcar(j.jan, t('esp'), r.esp, function (v) { r.esp = v; montar(); });
		if (!novo) {
			j.jan.appendChild(botao('qb-ed-rem', t('remover'), function () {
				salvar(d.pagina, d.titulo, r0.xy + ' | remove', d.titulo + ': remove', rr, t);
			}));
		}
		j.jan.appendChild(linha);
		rr = rodape(j, t, d.href, function () {
			if (!r.tipo) { rr.msg.textContent = '← ' + t('tipo'); return; }
			var s = montarLinhaNo(r);
			salvar(d.pagina, d.titulo, s, d.titulo + ': ' + s, rr, t);
		});
		montar();
	}

	// many map nodes at once
	function editarGrupo(tree) {
		var t = textos(tree), nomes = json(tree, 'data-nomes'), idx = indice(tree), sel = selecao(tree);
		var nos = Object.keys(sel).map(function (k) { return sel[k]; });
		if (!nos.length) { return; }
		var escolha = { tipo: '', valor: '', esp: '' }, linhas = [], rr;
		var j = janela(tree, fmt(t('grupotit'), nos.length));
		j.jan.classList.add('qb-ed-larga');
		j.jan.appendChild(criar('div', 'qb-ed-k', t('tipo')));
		j.jan.appendChild(gradeTipos(nomes, '', function (w) { escolha.tipo = w; montar(); }, t('mantertipo')));
		var iv = campo(j.jan, t('valor'), '', t('mantervalor'));
		iv.addEventListener('input', function () { escolha.valor = iv.value.trim(); montar(); });
		var le = criar('label', 'qb-ed-k', t('esp'));
		var se = criar('select', 'qb-ed-in');
		[['', t('espmanter')], ['sim', t('espsim')], ['nao', t('espnao')]].forEach(function (o) { se.appendChild(new Option(o[1], o[0])); });
		se.addEventListener('change', function () { escolha.esp = se.value; montar(); });
		le.appendChild(se);
		j.jan.appendChild(le);
		var existentes = nos.filter(function (no) { return !no.novo; });
		if (existentes.length) {
			j.jan.appendChild(botao('qb-ed-rem', fmt(t('remsel'), existentes.length), function () {
				if (!window.confirm(fmt(t('confirma'), existentes.length))) { return; }
				var rem = existentes.map(function (no) { return linhaDoNo(no).xy + ' | remove'; });
				salvar(idx.pagina, 'Group edit: ' + rem.length + ' nodes', '<pre>\n' + rem.join('\n') + '\n</pre>',
					'Group edit: remove ' + rem.length + ' nodes', rr, t);
			}));
		}
		j.jan.appendChild(criar('div', 'qb-ed-k', t('linhas')));
		var pre = criar('pre', 'qb-ed-pre');
		j.jan.appendChild(pre);
		rr = rodape(j, t, null, function () {
			if (!linhas.length) { return; }
			var o = [];
			if (escolha.tipo) { o.push('type = ' + escolha.tipo); }
			if (escolha.valor) { o.push('value = ' + escolha.valor); }
			if (escolha.esp) { o.push(escolha.esp === 'sim' ? 'special' : 'not special'); }
			salvar(idx.pagina, 'Group edit: ' + linhas.length + ' nodes', '<pre>\n' + linhas.join('\n') + '\n</pre>',
				'Group edit: ' + linhas.length + ' nodes' + (o.length ? ' (' + o.join(', ') + ')' : ''), rr, t);
		});
		function montar() {
			var semTipo = 0;
			linhas = [];
			nos.forEach(function (no) {
				var antes = linhaDoNo(no), depois = copiaNo(antes);
				if (no.novo) {
					if (!escolha.tipo) { semTipo++; return; }
					depois = { xy: antes.xy, tipo: escolha.tipo, valor: '', notas: [], esp: false };
				}
				if (escolha.tipo) { depois.tipo = escolha.tipo; }
				if (escolha.valor) { depois.valor = escolha.valor; }
				if (escolha.esp === 'sim') { depois.esp = true; }
				if (escolha.esp === 'nao') { depois.esp = false; }
				var s = montarLinhaNo(depois);
				if (no.novo || s !== montarLinhaNo(antes)) { linhas.push(s); }
			});
			pre.textContent = linhas.length ? linhas.join('\n') : '—';
			rr.msg.textContent = semTipo ? fmt(t('novos'), semTipo) : (linhas.length ? '' : t('nada'));
			rr.ok.disabled = !linhas.length || semTipo > 0;
		}
		montar();
	}

	// Bestiary: "Name | Image.png | hp = 10 | ... | class = mage | ..." <-> parts
	function lerLinhaBicho(s) {
		var p = String(s || '').split('|').map(function (x) { return x.trim(); });
		var r = { nome: p[0] || '', imagem: p[1] || '', v: {}, extras: [] };
		var conhecidas = ATRS.map(function (a) { return a[0]; }).concat(CAMPOS);
		p.slice(2).forEach(function (x) {
			var m = x.match(/^([^=]+?)\s*=\s*(.*)$/);
			if (!m) { if (x) { r.extras.push(x); } return; }
			var k = m[1].trim().toLowerCase(), v = m[2].trim();
			if (conhecidas.indexOf(k) >= 0) { r.v[k] = (v === '?') ? '' : v; } else { r.extras.push(m[1].trim() + ' = ' + v); }
		});
		return r;
	}
	function montarLinhaBicho(r) {
		var p = [r.nome, r.imagem || (r.nome + '.png')];
		ATRS.map(function (a) { return a[0]; }).concat(CAMPOS).forEach(function (k) {
			if (r.v[k]) { p.push(k + ' = ' + r.v[k]); }
		});
		return p.concat(r.extras).join(' | ');
	}
	// row of buttons: class / style / damage type
	function escolhas(jan, rotulo, opcoes, nomes, chave, r, t, montar) {
		jan.appendChild(criar('div', 'qb-ed-k', rotulo));
		var g = criar('div', 'qb-ed-esc');
		var atual = String(r.v[chave] || '');
		var conhecido = !atual;
		opcoes.forEach(function (o) { if (o[0] === atual.toLowerCase()) { conhecido = true; } });
		function op(palavra, texto, ico, ligado) {
			var b = botao('qb-ed-tipo qb-ed-op', '', function () {
				lista(g, '.qb-ed-op').forEach(function (x) { x.classList.toggle('qb-ed-on', x === b); });
				r.v[chave] = palavra;
				montar();
			});
			if (ico) { b.appendChild(icone(ico)); }
			b.appendChild(criar('span', 'qb-ed-n', texto));
			if (ligado) { b.classList.add('qb-ed-on'); }
			g.appendChild(b);
		}
		opcoes.forEach(function (o) { op(o[0], nomes[o[0]] || o[0], o[1], o[0] === atual.toLowerCase()); });
		if (!conhecido) { op(atual, atual, null, true); }   // a word the wiki does not know yet: keep it
		op('', t('naosei'), null, !atual);
		jan.appendChild(g);
	}
	function editorBicho(a) {
		var best = a.closest('.qb-best') || document.querySelector('.qb-best') || a.closest('.mw-parser-output');
		var t = textos(best), d = lerLink(a), r = lerLinhaBicho(d.linha), rr;
		var atr = json(best, 'data-f-atr'), bichos = json(best, 'data-f-bichos');
		var j = janela(best, '✎ ' + (bichos[r.nome] || r.nome));
		j.jan.classList.add('qb-ed-larga');
		var linha = criar('code', 'qb-ed-linha');
		function montar() { linha.textContent = montarLinhaBicho(r); }
		escolhas(j.jan, t('classe'), CLASSES, json(best, 'data-f-cls'), 'class', r, t, montar);
		escolhas(j.jan, t('estilo'), ESTILOS, json(best, 'data-f-est'), 'style', r, t, montar);
		escolhas(j.jan, t('elem'), ELEMS, json(best, 'data-f-ele'), 'element', r, t, montar);
		var na = r.v.gearscore === '-';
		var gi = campo(j.jan, t('gs'), na ? '' : r.v.gearscore, '4500');
		gi.inputMode = 'numeric';
		gi.disabled = na;
		gi.addEventListener('input', function () { r.v.gearscore = gi.value.trim(); montar(); });
		j.jan.appendChild(criar('div', 'qb-ed-dica', t('gsdica')));
		marcar(j.jan, t('naoaplica'), na, function (v) {
			gi.disabled = v;
			r.v.gearscore = v ? '-' : gi.value.trim();
			montar();
		});
		j.jan.appendChild(criar('div', 'qb-ed-k', t('base')));
		var grade = criar('div', 'qb-ed-atr');
		ATRS.forEach(function (x) {
			var l = criar('label', 'qb-ed-atr-l');
			l.appendChild(icone(x[1]));
			l.appendChild(criar('span', 'qb-ed-atr-n', atr[x[0]] || x[0]));
			var i = criar('input', 'qb-ed-atr-in');
			i.type = 'text';
			i.value = r.v[x[0]] || '';
			i.placeholder = '?';
			i.addEventListener('input', function () { r.v[x[0]] = i.value.trim(); montar(); });
			l.appendChild(i);
			grade.appendChild(l);
		});
		j.jan.appendChild(grade);
		var hi = campo(j.jan, t('habil'), r.v.ability, 'Healer');
		hi.addEventListener('input', function () { r.v.ability = hi.value.replace(/\|/g, '/').trim(); montar(); });
		j.jan.appendChild(criar('div', 'qb-ed-dica', t('habdica')));
		var ni = campo(j.jan, t('nota'), r.v.note, '');
		ni.addEventListener('input', function () { r.v.note = ni.value.replace(/\|/g, '/').trim(); montar(); });
		var ii = campo(j.jan, t('imagem'), r.imagem, r.nome + '.png');
		ii.addEventListener('input', function () { r.imagem = ii.value.replace(/\|/g, '').trim(); montar(); });
		j.jan.appendChild(linha);
		rr = rodape(j, t, d.href, function () {
			var s = montarLinhaBicho(r);
			salvar(d.pagina, d.titulo, s, d.titulo + ': ' + s, rr, t);
		});
		montar();
	}

	// Bestiary: "number | region | creature, creature, ..."
	function fotosDosBichos(best) {
		var m = {};
		lista(best, '.qb-cr').forEach(function (cr) {
			var a = cr.querySelector('.qb-cr-ed a'), img = cr.querySelector('.qb-thumb img');
			if (!a || !img) { return; }
			var nome = lerLink(a).titulo.replace(/^Creature:\s*/, '');
			var src = img.getAttribute('data-src') || img.currentSrc || img.src;
			if (nome && !m[nome] && src && !/^data:image\/gif/.test(src)) { m[nome] = src; }   // not the lazy-load placeholder
		});
		return m;
	}
	function montarLinhaFase(f) {
		return f.n + ' | ' + f.regiao + ' | ' + (f.inc ? ['...'] : []).concat(f.lista).join(', ');
	}
	function editorFase(a) {
		var best = a.closest('.qb-best') || document.querySelector('.qb-best') || a.closest('.mw-parser-output');
		var t = textos(best), d = lerLink(a), rr;
		var bichos = json(best, 'data-f-bichos'), regs = json(best, 'data-f-reg'), fotos = fotosDosBichos(best);
		var p = d.linha.split('|').map(function (x) { return x.trim(); });
		var f = { n: p[0] || '', regiao: p[1] || '', lista: [], inc: false };
		p.slice(2).join(' ').split(',').forEach(function (x) {
			x = x.trim();
			if (/^(\.\.\.|…)/.test(x)) { f.inc = true; } else if (x) { f.lista.push(x); }
		});
		var j = janela(best, '✎ ' + (regs[f.regiao] || f.regiao) + ' ' + f.n);
		j.jan.classList.add('qb-ed-larga');
		var linha = criar('code', 'qb-ed-linha');
		function montar() { linha.textContent = montarLinhaFase(f); }
		j.jan.appendChild(criar('div', 'qb-ed-dica', t('ordem')));
		var ol = criar('ol', 'qb-ed-lista');
		j.jan.appendChild(ol);
		function mudou() { desenhar(); montar(); }
		function mini(sinal, dica, desligado, acao) {
			var b = botao('qb-ed-mini', sinal, acao);
			b.title = dica;
			b.setAttribute('aria-label', dica);
			b.disabled = desligado;
			return b;
		}
		function desenhar() {
			ol.textContent = '';
			f.lista.forEach(function (nome, i) {
				var li = criar('li', 'qb-ed-li');
				var th = criar('span', 'qb-ed-th', fotos[nome] ? undefined : '?');
				if (fotos[nome]) {
					var img = criar('img');
					img.src = fotos[nome];
					img.alt = '';
					th.appendChild(img);
				}
				li.appendChild(th);
				var nm = criar('span', 'qb-ed-li-n', bichos[nome] || nome);
				if (bichos[nome] && bichos[nome] !== nome) { nm.appendChild(criar('small', '', nome)); }
				li.appendChild(nm);
				li.appendChild(mini('↑', t('subir'), i === 0, function () {
					f.lista.splice(i - 1, 0, f.lista.splice(i, 1)[0]); mudou();
				}));
				li.appendChild(mini('↓', t('descer'), i === f.lista.length - 1, function () {
					f.lista.splice(i + 1, 0, f.lista.splice(i, 1)[0]); mudou();
				}));
				li.appendChild(mini('✕', t('tirar'), false, function () { f.lista.splice(i, 1); mudou(); }));
				ol.appendChild(li);
			});
		}
		var l1 = criar('div', 'qb-ed-add');
		var sel = criar('select', 'qb-ed-in');
		sel.appendChild(new Option(t('escolher'), ''));
		Object.keys(bichos).sort(function (x, y) { return String(bichos[x]).localeCompare(String(bichos[y])); }).forEach(function (n) {
			sel.appendChild(new Option(bichos[n] + (bichos[n] !== n ? ' — ' + n : ''), n));
		});
		l1.appendChild(sel);
		l1.appendChild(botao('qb-ed-addb', t('add'), function () {
			if (sel.value) { f.lista.push(sel.value); sel.value = ''; mudou(); }
		}));
		j.jan.appendChild(l1);
		var l2 = criar('div', 'qb-ed-add');
		var novo = criar('input', 'qb-ed-in');
		novo.type = 'text';
		novo.placeholder = t('novo');
		l2.appendChild(novo);
		l2.appendChild(botao('qb-ed-addb', t('add'), function () {
			var v = novo.value.replace(/[|,]/g, ' ').replace(/\s+/g, ' ').trim();
			if (v) { f.lista.push(v); novo.value = ''; mudou(); }
		}));
		j.jan.appendChild(l2);
		marcar(j.jan, t('incompleta') + ' (...)', f.inc, function (v) { f.inc = v; montar(); });
		var ri = campo(j.jan, t('regiao'), f.regiao, '');
		ri.addEventListener('input', function () { f.regiao = ri.value.replace(/\|/g, '').trim(); montar(); });
		j.jan.appendChild(linha);
		rr = rodape(j, t, d.href, function () {
			var s = montarLinhaFase(f);
			salvar(d.pagina, d.titulo, s, d.titulo + ': ' + s, rr, t);
		});
		mudou();
	}

	// anything else: the line in a text box
	function editorTexto(a) {
		var caixa = a.closest('.qb-tree, .qb-best') || a.closest('.mw-parser-output');
		var t = textos(caixa), d = lerLink(a), rr;
		var j = janela(caixa, '✎ ' + d.titulo);
		j.jan.appendChild(criar('div', 'qb-ed-k', t('linha')));
		var ta = criar('textarea', 'qb-ed-ta');
		ta.value = d.linha;
		ta.rows = 4;
		j.jan.appendChild(ta);
		rr = rodape(j, t, d.href, function () {
			var s = ta.value.replace(/\s*\n\s*/g, ' ').trim();
			salvar(d.pagina, d.titulo, s, d.titulo + ': ' + s, rr, t);
		});
	}

	function interceptar(root) {
		// visitors without an account keep the normal links (Fandom asks them to sign in)
		if (!mw.config.get('wgUserName') || root.getAttribute('data-qb-ed')) { return; }
		root.setAttribute('data-qb-ed', '1');
		root.addEventListener('click', function (e) {
			var a = e.target.closest && e.target.closest('.qb-info-ed a, .qb-plus a, .qb-cr-ed a, .qb-fase-ed a, .qb-fase-vazia a, .qb-fase-inc a');
			if (!a || !a.href || a.href.indexOf('preloadparams') < 0) { return; }
			if (e.ctrlKey || e.metaKey || e.shiftKey) { return; }   // new tab: the normal edit page
			e.preventDefault();
			var titulo = lerLink(a).titulo;
			if (a.closest('.qb-tree')) { editorNo(a); }
			else if (/^Creature:/.test(titulo)) { editorBicho(a); }
			else if (/^Stage /.test(titulo)) { editorFase(a); }
			else { editorTexto(a); }
		});
	}

	/* ---------- 5) Bestiary table: search and filters ---------- */
	function filtrosTabela(tab) {
		if (tab.getAttribute('data-qb-f')) { return; }
		tab.setAttribute('data-qb-f', '1');
		var linhas = lista(tab, 'tr[data-nome]');
		if (!linhas.length) { return; }
		var t = textos(tab, document.querySelector('.qb-best'));
		var estado = { q: '' }, grupos = [];
		var bar = criar('div', 'qb-tf');
		bar.setAttribute('lang', linguaDe(tab));
		var busca = criar('input', 'qb-tf-q');
		busca.type = 'search';
		busca.placeholder = t('buscar');
		busca.addEventListener('input', function () { estado.q = norm(busca.value); aplicar(); });
		bar.appendChild(busca);
		function grupo(rotulo, attr, ordem, nomes) {
			var conta = {}, chaves = [];
			linhas.forEach(function (tr) {
				String(tr.getAttribute(attr) || '').split('|').forEach(function (v) {
					if (!v) { return; }
					if (!conta[v]) { conta[v] = 0; if (ordem.indexOf(v) < 0) { chaves.push(v); } }
					conta[v]++;
				});
			});
			chaves = ordem.filter(function (k) { return conta[k]; }).concat(chaves);
			if (!chaves.length) { return; }
			estado[attr] = '';
			var g = criar('div', 'qb-tf-g');
			g.appendChild(criar('span', 'qb-tf-k', rotulo));
			var bts = [];
			function chip(valor, texto) {
				var b = botao('qb-tf-c' + (valor ? '' : ' qb-tf-on'), texto, function () {
					estado[attr] = valor;
					bts.forEach(function (x) { x.classList.toggle('qb-tf-on', x === b); });
					aplicar();
				});
				b.setAttribute('data-v', valor);
				bts.push(b);
				g.appendChild(b);
			}
			chip('', t('todos'));
			chaves.forEach(function (k) { chip(k, (nomes[k] || k) + ' · ' + conta[k]); });
			bar.appendChild(g);
			grupos.push({ attr: attr, bts: bts });
		}
		grupo(t('classe'), 'data-cls', CLASSES.map(function (c) { return c[0]; }), json(tab, 'data-f-cls'));
		grupo(t('estilo'), 'data-est', ESTILOS.map(function (c) { return c[0]; }), json(tab, 'data-f-est'));
		grupo(t('elem'), 'data-ele', ELEMS.map(function (c) { return c[0]; }), json(tab, 'data-f-ele'));
		grupo(t('regiao'), 'data-reg', [], json(tab, 'data-f-reg'));
		var pe = criar('div', 'qb-tf-p');
		var n = criar('span', 'qb-tf-n');
		var limpar = botao('qb-tf-x', t('limparf'), function () {
			busca.value = '';
			estado.q = '';
			grupos.forEach(function (g) {
				estado[g.attr] = '';
				g.bts.forEach(function (b) { b.classList.toggle('qb-tf-on', !b.getAttribute('data-v')); });
			});
			aplicar();
		});
		pe.appendChild(n);
		pe.appendChild(limpar);
		bar.appendChild(pe);
		tab.parentNode.insertBefore(bar, tab);
		function aplicar() {
			var vis = 0, algum = !!estado.q;
			linhas.forEach(function (tr) {
				var ok = true;
				if (estado.q) {
					var nm = tr.querySelector('.qb-tab-nome');
					ok = norm((nm ? nm.textContent : '') + ' ' + tr.getAttribute('data-nome')).indexOf(estado.q) >= 0;
				}
				grupos.forEach(function (g) {
					var v = estado[g.attr];
					if (v) {
						algum = true;
						if (String(tr.getAttribute(g.attr) || '').split('|').indexOf(v) < 0) { ok = false; }
					}
				});
				tr.style.display = ok ? '' : 'none';
				if (ok) { vis++; }
			});
			n.textContent = fmt(t('mostrando'), vis, linhas.length);
			limpar.style.visibility = algum ? '' : 'hidden';
		}
		aplicar();
	}

	/* ---------- 6) rune calculator (Calculators page) ---------- */
	// numbers as people type them: "8,75", "+2%", " 12.5 " -> number; anything else -> null
	function numCalc(s) {
		s = String(s === undefined || s === null ? '' : s).replace(/[%+\s]/g, '').replace(',', '.');
		if (s === '' || !/^-?\d*\.?\d+$/.test(s)) { return null; }
		var n = parseFloat(s);
		return isFinite(n) ? n : null;
	}
	function calculadora(el) {
		var D;
		try { D = JSON.parse(el.getAttribute('data-calc') || '{}'); } catch (e) { return; }
		if (!D || !D.rar || !D.rar.length || !D.stats) { return; }
		var app = el.querySelector('.qb-calc-app');
		if (!app) { return; }
		el.classList.add('qb-calc-js');
		var t = function (k) { return (D.tx && D.tx[k]) || EN[k] || k; };
		var ST = {};
		D.stats.forEach(function (s) { ST[s.k] = s; });
		var N = D.rar.length;
		// the items of Equipment/Data (Module:Itens): name, type, class, level, rarity seen (r) and its attributes there
		var ITENS = (D.itens instanceof Array) ? D.itens.filter(function (x) { return x && x.n && x.a instanceof Array; }) : [];
		var PORNOME = {};
		ITENS.forEach(function (x) { PORNOME[x.n] = x; });
		var LG = el.getAttribute('lang') || 'en';
		var QL = (LG !== 'en') ? 'uselang=' + LG : '';
		var EXEMPLO = { ex: 'Arma dos Botões Perdidos', tipo: 'weapon', cls: 'universal', nivel: '11', rar: 2, alvo: 3, valor: '1053',
			atr: [{ k: 'damage', v: '8.75' }, { k: 'critchance', v: '2.66' }, { k: 'critdamage', v: '9.68' }], bon: [{ k: 'critchance', v: '2' }] };
		function novo() { return { tipo: '', cls: '', nivel: '', rar: 0, alvo: 0, valor: '', atr: [{ k: 'damage', v: '' }], bon: [] }; }
		function copia(o) { return JSON.parse(JSON.stringify(o)); }
		function valido(it) {
			if (!it || typeof it !== 'object' || !(it.atr instanceof Array) || !(it.bon instanceof Array)) { return null; }
			it.rar = Math.max(0, Math.min(N - 1, parseInt(it.rar, 10) || 0));
			it.alvo = Math.max(it.rar, Math.min(N - 1, parseInt(it.alvo, 10) || 0));
			it.atr = it.atr.filter(function (l) { return l && ST[l.k]; });
			it.bon = it.bon.filter(function (l) { return l && ST[l.k]; });
			// a card tied to an item takes its numbers again (the data page may have changed)
			if (it.item) { preencher(it); }
			return it;
		}
		var est = null;
		try { est = JSON.parse(window.localStorage.getItem('qb-calc') || 'null'); } catch (e) { est = null; }
		if (!est || !valido(est.a)) { est = { a: copia(EXEMPLO), b: null }; }
		est.b = est.b ? valido(est.b) : null;
		function guardarCalc() {
			try { window.localStorage.setItem('qb-calc', JSON.stringify(est)); } catch (e) { /* not remembered */ }
		}
		// ?item=Name&rar=epic: the "Open in the rune calculator" link of the item pages fills item A
		(function () {
			var p = null;
			if (window.qbPedido) {   // the kit's preview
				p = window.qbPedido;
				window.qbPedido = null;
			} else {
				var u = null;
				try { u = new URL(location.href); } catch (e) { u = null; }
				if (u) { p = { item: u.searchParams.get('item'), rar: u.searchParams.get('rar') }; }
				if (p && p.item) {   // out of the address, so that reloading the page keeps what the reader typed
					try {
						u.searchParams.delete('item');
						u.searchParams.delete('rar');
						history.replaceState(history.state, '', u.toString());
					} catch (e) { /* the address keeps it: no harm */ }
				}
			}
			if (!p || !p.item) { return; }
			var x = PORNOME[p.item];
			if (!x) {
				ITENS.forEach(function (y) { if (!x && (norm(y.n) === norm(p.item) || (y.p && norm(y.p) === norm(p.item)))) { x = y; } });
			}
			if (!x) { return; }
			var a = novo();
			D.rar.forEach(function (r, i) { if (r.k === p.rar) { a.rar = i; } });
			a.alvo = a.rar;
			a.item = x.n;
			preencher(a);
			est.a = a;
			guardarCalc();
		})();

		// --- math ---
		function mult(i) { var r = D.rar[i]; return (r && typeof r.m === 'number') ? r.m : null; }
		function multV(i) { var r = D.rar[i]; return (r && typeof r.v === 'number') ? r.v : null; }
		function fator(i, j) {
			if (i === j) { return 1; }
			var a = mult(i), b = mult(j);
			return (a && b) ? b / a : null;
		}
		function peso(k) { var s = ST[k]; return (s && typeof s.a === 'number' && s.a > 0) ? 100 / s.a : null; }
		// an attribute of item x at rarity j (null = not known yet)
		function valorItem(x, v, j) {
			if (j === x.r) { return v; }
			var a = mult(x.r), b = mult(j);
			return (a && b) ? v * b / a : null;
		}
		// the number as the game writes it
		function escrito(v, k) {
			var s = v.toFixed(casas(k));
			return (s.indexOf('.') >= 0) ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
		}
		// a card tied to an item: its type, class, level, attributes and sell value at the card's rarity
		// (the exact number stays in "x", so the Gear Score is the same as on the item's page)
		function preencher(it) {
			var x = PORNOME[it.item];
			if (!x) { delete it.item; return; }
			it.tipo = x.t || '';
			it.cls = x.c || '';
			it.nivel = x.l ? String(x.l) : '';
			it.atr = x.a.filter(function (a) { return a && ST[a[0]] && typeof a[1] === 'number'; }).map(function (a) {
				var v = valorItem(x, a[1], it.rar);
				return (v === null) ? { k: a[0], v: '' } : { k: a[0], v: escrito(v, a[0]), x: v };
			});
			var vm = multV(it.rar);
			it.valor = (vm && x.l && typeof D.vpn === 'number') ? String(Math.round(D.vpn * x.l * vm)) : '';
		}
		// the item at rarity j: main lines (multiplied), bonus lines (as they are), Gear Score, sell value, totals per attribute
		function estado(it, j) {
			var f = fator(it.rar, j), r = { linhas: [], bonus: [], gs: 0, valor: null, total: {}, f: f, vazio: true };
			function somar(k, v) { r.total[k] = (r.total[k] || 0) + v; }
			it.atr.forEach(function (l) {
				var v0 = (typeof l.x === 'number' && isFinite(l.x)) ? l.x : numCalc(l.v);
				if (v0 === null) { return; }
				r.vazio = false;
				var v1 = (f === null) ? null : v0 * f;
				r.linhas.push({ k: l.k, v0: v0, v1: v1 });
				if (v1 === null || r.gs === null) { r.gs = null; } else {
					var w = peso(l.k);
					r.gs = (w === null) ? null : r.gs + v1 * w;
				}
				if (v1 !== null) { somar(l.k, v1); } else { r.total[l.k] = null; }
			});
			it.bon.forEach(function (l) {
				var v = numCalc(l.v);
				if (v === null) { return; }
				r.vazio = false;
				r.bonus.push({ k: l.k, v: v });
				if (r.gs !== null) {
					var w = peso(l.k);
					r.gs = (w === null) ? null : r.gs + v * w;
				}
				if (r.total[l.k] !== null) { somar(l.k, v); }
			});
			var val = numCalc(it.valor), x = it.item && PORNOME[it.item];
			if (x && x.l && typeof D.vpn === 'number') {   // an item of the wiki: the game's own rule (value per level × rarity)
				var vj = multV(j);
				r.valor = vj ? Math.round(D.vpn * x.l * vj) : null;
			} else if (val !== null) {
				var a = multV(it.rar), b = multV(j);
				r.valor = (it.rar === j) ? val : ((a && b) ? val * b / a : null);
			}
			return r;
		}
		function casas(k) { return (ST[k] && ST[k].d) || 2; }
		function fmtN(v, k) {
			if (v === null || v === undefined) { return '?'; }
			var d = casas(k), s = v.toFixed(d);
			if (d !== 3 && s.indexOf('.') >= 0) { s = s.replace(/0+$/, '').replace(/\.$/, ''); }
			return s + ((ST[k] && ST[k].p) ? '%' : '');
		}
		function fmtGS(v) { return (v === null) ? '?' : String(Math.round(v)); }
		function nomeRar(i) { return D.rar[i] ? D.rar[i].n : '?'; }
		function nomeItem(lado) { return t(lado === 'a' ? 'itemA' : 'itemB'); }

		// --- drawing ---
		function rotulo(texto, dica) {
			var k = criar('div', 'qbc-k', texto);
			if (dica) { k.appendChild(document.createTextNode(' ')); k.appendChild(criar('small', '', '(' + dica + ')')); }
			return k;
		}
		function chip(i, ligado, acao, desligado) {
			var r = D.rar[i];
			var b = botao('qb-rb qb-t-' + r.t + (ligado ? ' qb-on' : ''), '', acao);
			b.appendChild(icone(r.t));
			b.appendChild(criar('span', 'qb-rn', r.n));
			if (mult(i) === null) { b.appendChild(criar('span', 'qb-rb-q', '?')); }
			if (desligado) { b.disabled = true; }
			b.setAttribute('aria-pressed', ligado ? 'true' : 'false');
			return b;
		}
		function seletor(opcoes, valor, vazio, aoMudar) {
			var s = criar('select', 'qbc-sel');
			if (vazio) { s.appendChild(new Option(vazio, '')); }
			opcoes.forEach(function (o) { s.appendChild(new Option(o[1], o[0])); });
			s.value = valor || '';
			s.addEventListener('change', function () { aoMudar(s.value); });
			return s;
		}
		function entrada(valor, exemplo, modo, aoMudar) {
			var i = criar('input', 'qbc-in');
			i.type = 'text';
			i.value = valor || '';
			i.placeholder = exemplo || '';
			i.setAttribute('inputmode', modo || 'decimal');
			i.addEventListener('input', function () { aoMudar(i.value); });
			return i;
		}
		function linhas(it, qual) {
			var caixa = criar('div', 'qbc-ls');
			it[qual].forEach(function (l, n) {
				var row = criar('div', 'qbc-l');
				row.appendChild(icone(ST[l.k].i));
				row.appendChild(seletor(D.stats.map(function (s) { return [s.k, s.n]; }), l.k, null, function (v) {
					l.k = v; mexeu(it, qual === 'atr'); guardarCalc(); desenhar();
				}));
				row.appendChild(entrada(l.v, ST[l.k].p ? '2.5' : '10', 'decimal', function (v) {
					l.v = v; delete l.x; mexeu(it, qual === 'atr'); guardarCalc(); atualizar();
				}));
				row.appendChild(criar('span', 'qbc-pct', ST[l.k].p ? '%' : ''));
				var x = botao('qbc-x', '✕', function () { it[qual].splice(n, 1); mexeu(it, qual === 'atr'); guardarCalc(); desenhar(); });
				x.title = t('remover');
				x.setAttribute('aria-label', t('remover'));
				row.appendChild(x);
				caixa.appendChild(row);
			});
			return caixa;
		}
		// "proprio": the item's own numbers changed, so it is no longer the item of the wiki
		function mexeu(it, proprio) {
			delete it.ex;
			if (proprio) { delete it.item; }
		}
		var areas = {}, caixasIt = {}, escAberta = {};
		function imagemItem(nome, caixa) {
			var img = criar('img');
			img.alt = '';
			img.loading = 'lazy';
			img.addEventListener('error', function () {
				if (img.parentNode) { img.parentNode.removeChild(img); }
				caixa.classList.add('qbc-semimg');
				caixa.textContent = '?';
			});
			img.src = (typeof window.qbImagem === 'function') ? (window.qbImagem(nome) || '') : urlPagina('Special:FilePath/' + nome + '.png');
			return img;
		}
		// the "Choose an item" button, or the item the card is tied to
		function desenharItem(lado) {
			var it = est[lado], ib = caixasIt[lado];
			if (!it || !ib) { return; }
			var nome = (it.item && PORNOME[it.item]) ? it.item : '';
			if (ib.qbNome === nome) { return; }
			ib.qbNome = nome;
			ib.textContent = '';
			if (!ITENS.length) { return; }
			if (!nome) {
				var pb = botao('qbc-pick', '', function () { escolherItem(lado); });
				pb.appendChild(icone('inventario'));
				pb.appendChild(criar('span', '', t('escolheritem')));
				ib.appendChild(pb);
				return;
			}
			var row = criar('div', 'qbc-it');
			var fig = criar('span', 'qbc-it-img');
			fig.appendChild(imagemItem(nome, fig));
			row.appendChild(fig);
			var tx = criar('div', 'qbc-it-tx');
			var a = criar('a', 'qbc-it-n', nome);
			a.href = urlPagina(nome, QL);
			tx.appendChild(a);
			tx.appendChild(criar('div', 'qbc-it-d', t('itemdica')));
			row.appendChild(tx);
			row.appendChild(botao('qbc-mini', t('trocar'), function () { escolherItem(lado); }));
			ib.appendChild(row);
		}
		function escolher(lado, x) {
			var it = est[lado];
			if (!it) { return; }
			if (it.ex || (it.item && it.item !== x.n)) { it.bon = []; }   // the bonus lines of the example or of another item
			delete it.ex;
			it.item = x.n;
			preencher(it);
			if (it.alvo < it.rar) { it.alvo = it.rar; }
			guardarCalc();
			desenhar();
		}
		// the window with every item of the wiki: search, type and class
		function escolherItem(lado) {
			var it = est[lado];
			if (!it || !ITENS.length) { return; }
			var jn = janela(el, t('escolheritem'));
			jn.jan.className += ' qb-ed-larga qbc-pk';
			var tit = jn.jan.firstChild;
			var cab = criar('div', 'qbc-pk-cab');
			jn.jan.insertBefore(cab, tit);
			cab.appendChild(tit);
			var fx = botao('qbc-pk-x', '✕', function () { jn.fechar(); });
			fx.title = t('fechar');
			fx.setAttribute('aria-label', t('fechar'));
			tit.appendChild(fx);
			var salvo = {};
			try { salvo = JSON.parse(ler('qb-calc-pk') || '{}') || {}; } catch (e) { salvo = {}; }
			var barra = criar('div', 'qbc-pk-f');
			var q = criar('input', 'qbc-in qbc-pk-q');
			q.type = 'search';
			q.placeholder = t('buscaitem');
			q.setAttribute('aria-label', t('buscaitem'));
			var st = seletor(D.tipos || [], salvo.t, t('todostipos'), function () { aplicar(); lembrar(); });
			var sc = seletor(D.cls || [], salvo.c, t('todasclasses'), function () { aplicar(); lembrar(); });
			var cont = criar('div', 'qbc-pk-n');
			[q, st, sc, cont].forEach(function (e) { barra.appendChild(e); });
			cab.appendChild(barra);
			var nomeCls = {};
			(D.cls || []).forEach(function (c) { nomeCls[c[0]] = c[1]; });
			var g = criar('div', 'qbc-pk-g');
			var grupos = [];
			(D.tipos || []).forEach(function (tp) {
				var grupo = { h: criar('div', 'qbc-pk-h', tp[1]), itens: [] };
				ITENS.forEach(function (x) {
					if (x.t !== tp[0]) { return; }
					var b = botao('qbc-pk-i' + (x.n === it.item ? ' qb-ed-on' : ''), '', function () { jn.fechar(); escolher(lado, x); });
					b.title = x.n + (x.p ? ' · ' + x.p : '');
					var fig = criar('span', 'qbc-pk-img');
					fig.appendChild(imagemItem(x.n, fig));
					b.appendChild(fig);
					b.appendChild(criar('span', 'qbc-pk-nm', x.n));
					b.appendChild(criar('span', 'qbc-pk-s', fmt(t('nivelc'), x.l || '?') + ' · ' + (nomeCls[x.c] || x.c || '')));
					grupo.itens.push({ el: b, x: x, busca: norm(x.n + ' ' + (x.p || '')) });
				});
				if (!grupo.itens.length) { return; }
				g.appendChild(grupo.h);
				grupo.itens.forEach(function (o) { g.appendChild(o.el); });
				grupos.push(grupo);
			});
			jn.jan.appendChild(g);
			// a class shows its own items and the universal ones (both can be equipped)
			function aplicar() {
				var termo = norm(q.value), tp = st.value, cl = sc.value, vis = 0, unico = null;
				grupos.forEach(function (gr) {
					var n = 0;
					gr.itens.forEach(function (o) {
						var ok = (!termo || o.busca.indexOf(termo) >= 0) && (!tp || o.x.t === tp) &&
							(!cl || o.x.c === cl || (cl !== 'universal' && o.x.c === 'universal'));
						o.el.style.display = ok ? '' : 'none';
						if (ok) { n++; unico = o.x; }
					});
					gr.h.style.display = n ? '' : 'none';
					vis += n;
				});
				cont.textContent = vis ? fmt(t('itensach'), vis) : t('semitem');
				return (vis === 1) ? unico : null;
			}
			function lembrar() { guardar('qb-calc-pk', JSON.stringify({ t: st.value, c: sc.value })); }
			q.addEventListener('input', function () { aplicar(); });
			q.addEventListener('keydown', function (e) {
				if (e.key !== 'Enter') { return; }
				var x = aplicar();
				if (x) { jn.fechar(); escolher(lado, x); }
			});
			aplicar();
			// the item already chosen in view; the search box ready on computers (on phones it would open the keyboard)
			var on = g.querySelector('.qb-ed-on');
			if (on && on.style.display !== 'none' && on.scrollIntoView) { on.scrollIntoView({ block: 'center' }); }
			if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) { q.focus(); }
		}
		function cartao(lado) {
			var it = est[lado];
			var c = criar('div', 'qbc-card qbc-' + lado);
			var h = criar('div', 'qbc-h');
			h.appendChild(criar('span', 'qbc-badge', lado.toUpperCase()));
			h.appendChild(criar('span', 'qbc-t', nomeItem(lado)));
			h.appendChild(criar('span', 'qbc-sp'));
			if (lado === 'a') {
				h.appendChild(botao('qbc-mini', t('exemplo'), function () { est.a = copia(EXEMPLO); guardarCalc(); desenhar(); }));
				h.appendChild(botao('qbc-mini', t('limpar'), function () { est.a = novo(); guardarCalc(); desenhar(); }));
			} else {
				h.appendChild(botao('qbc-mini', t('semcomparar'), function () { est.b = null; guardarCalc(); desenhar(); }));
			}
			c.appendChild(h);
			var ib = criar('div', 'qbc-itbox');
			c.appendChild(ib);
			caixasIt[lado] = ib;
			if (it.ex) { c.appendChild(criar('div', 'qbc-ex', fmt(t('exdica'), it.ex))); }
			var row = criar('div', 'qbc-row');
			var lt = criar('label', 'qbc-f', t('tipo'));
			lt.appendChild(seletor(D.tipos || [], it.tipo, t('escolher'), function (v) { it.tipo = v; mexeu(it, true); guardarCalc(); atualizar(); }));
			var lc = criar('label', 'qbc-f', t('classe'));
			lc.appendChild(seletor(D.cls || [], it.cls, t('escolher'), function (v) { it.cls = v; mexeu(it, true); guardarCalc(); atualizar(); }));
			var ln = criar('label', 'qbc-f', t('nivel'));
			ln.appendChild(entrada(it.nivel, '13', 'numeric', function (v) { it.nivel = v; mexeu(it, true); guardarCalc(); atualizar(); }));
			row.appendChild(lt); row.appendChild(lc); row.appendChild(ln);
			c.appendChild(row);
			c.appendChild(rotulo(t('rar')));
			var rars = criar('div', 'qbc-rars');
			D.rar.forEach(function (r, i) {
				rars.appendChild(chip(i, i === it.rar, function () {
					it.rar = i;
					if (it.alvo < i) { it.alvo = i; }
					if (it.item) { preencher(it); }   // the item of the wiki at this rarity
					mexeu(it); guardarCalc(); desenhar();
				}));
			});
			c.appendChild(rars);
			c.appendChild(rotulo(t('atrs'), t('atrsdica')));
			c.appendChild(linhas(it, 'atr'));
			c.appendChild(botao('qbc-add', t('addatr'), function () {
				it.atr.push({ k: 'damage', v: '' }); mexeu(it, true); guardarCalc(); desenhar();
			}));
			c.appendChild(rotulo(t('bons'), t('bonsdica')));
			c.appendChild(linhas(it, 'bon'));
			c.appendChild(botao('qbc-add', t('addbon'), function () {
				it.bon.push({ k: 'critchance', v: '' }); mexeu(it); guardarCalc(); desenhar();
			}));
			var lv = criar('label', 'qbc-k', t('valorop'));
			lv.appendChild(entrada(it.valor, '1053', 'numeric', function (v) { it.valor = v; mexeu(it, true); guardarCalc(); atualizar(); }));
			c.appendChild(lv);
			c.appendChild(rotulo(t('evoluir')));
			var runas = criar('div', 'qbc-runes');
			var sem = botao('qb-rb qbc-sem' + (it.alvo === it.rar ? ' qb-on' : ''), t('semruna'), function () {
				it.alvo = it.rar; guardarCalc(); desenhar();
			});
			runas.appendChild(sem);
			D.rar.forEach(function (r, j) {
				if (j === 0 || !r.u) { return; }   // only the rarities that have a rune (no rune is known for Unique and Ultra Secret)
				var b = chip(j, j === it.alvo && j !== it.rar, function () { it.alvo = j; guardarCalc(); desenhar(); }, j <= it.rar);
				b.title = r.u; b.querySelector('.qb-rn').textContent = r.u;
				runas.appendChild(b);
			});
			c.appendChild(runas);
			var res = criar('div', 'qbc-res');
			c.appendChild(res);
			areas[lado] = res;
			return c;
		}
		function linhaRes(classe, ico, nome, valor, delta) {
			var r = criar('div', 'qbc-r ' + (classe || ''));
			if (ico) { r.appendChild(icone(ico)); }
			r.appendChild(criar('span', 'qbc-r-n', nome));
			var v = criar('span', 'qbc-r-v');
			if (valor instanceof Array) {
				v.appendChild(criar('s', '', valor[0]));
				v.appendChild(document.createTextNode(' → ' + valor[1]));
			} else {
				v.textContent = valor;
			}
			r.appendChild(v);
			if (delta) { r.appendChild(criar('span', 'qbc-up', delta)); }
			return r;
		}
		function notaDesconhecido(chave) {
			var p = criar('div', 'qbc-nota');
			var partes = t(chave || 'desconhecido').split('%s');
			p.appendChild(document.createTextNode(partes[0]));
			var a = criar('a', '', D.dados || 'Calculators/Data');
			a.href = D.dadosurl || '#';
			p.appendChild(a);
			p.appendChild(document.createTextNode(partes.slice(1).join('%s')));
			return p;
		}
		function evolucao(it, agora, depois) {
			var out = criar('div', 'qbc-out');
			var tt = criar('div', 'qbc-out-t');
			tt.appendChild(document.createTextNode(t('resultado') + ': '));
			var cor = criar('span', 'qb-t-' + D.rar[it.alvo].t);
			cor.appendChild(criar('span', 'qb-rn', nomeRar(it.alvo)));
			tt.appendChild(cor);
			out.appendChild(tt);
			depois.linhas.forEach(function (l) {
				var d = (l.v1 === null) ? '' : '+' + fmtN(l.v1 - l.v0, l.k);
				out.appendChild(linhaRes('', ST[l.k].i, ST[l.k].n, [fmtN(l.v0, l.k), fmtN(l.v1, l.k)], d));
			});
			depois.bonus.forEach(function (l) {
				out.appendChild(linhaRes('qbc-r-bon', ST[l.k].i, ST[l.k].n + ' (' + t('bons').toLowerCase() + ')', '+' + fmtN(l.v, l.k), ''));
			});
			var dg = (agora.gs !== null && depois.gs !== null) ? '+' + Math.round(depois.gs - agora.gs) : '';
			out.appendChild(linhaRes('qbc-r-gs', 'gs', t('gs'), [fmtGS(agora.gs), fmtGS(depois.gs)], dg));
			if (agora.valor !== null) {
				out.appendChild(linhaRes('qbc-r-val qb-t-ouro', 'ouro', t('valor'),
					[String(Math.round(agora.valor)), depois.valor === null ? '?' : (it.item ? '' : '~') + Math.round(depois.valor)], ''));
			}
			if (depois.f === null) { out.appendChild(notaDesconhecido()); }
			out.appendChild(criar('div', 'qbc-nota', t('novobonus')));
			return out;
		}
		function resultado(lado) {
			var it = est[lado], area = areas[lado];
			if (!it || !area) { return; }
			area.textContent = '';
			var agora = estado(it, it.rar), depois = estado(it, it.alvo);
			var g = criar('div', 'qbc-gs');
			g.appendChild(icone('gs'));
			g.appendChild(document.createTextNode(t('gs') + ': '));
			g.appendChild(criar('b', '', agora.vazio ? '—' : fmtGS(agora.gs)));
			area.appendChild(g);
			if (agora.vazio) {
				area.appendChild((it.item && mult(it.rar) === null) ? notaDesconhecido('rardesc') : criar('div', 'qbc-nota', t('nada')));
				return;
			}
			if (it.alvo !== it.rar) { area.appendChild(evolucao(it, agora, depois)); }
			// the item at every rarity from the current one up
			var det = criar('details', 'qbc-esc');
			det.open = !!escAberta[lado];
			det.addEventListener('toggle', function () { escAberta[lado] = det.open; });
			det.appendChild(criar('summary', '', t('escada')));
			var tw = criar('div', 'qbc-tw');
			var tab = criar('table', 'qbc-tab');
			var cab = criar('tr');
			cab.appendChild(criar('th', '', ''));
			var cols = [];
			for (var j = it.rar; j < N; j++) {
				cols.push(estado(it, j));
				var th = criar('th', 'qb-t-' + D.rar[j].t);
				th.appendChild(criar('span', 'qb-rn', D.rar[j].n));
				cab.appendChild(th);
			}
			tab.appendChild(cab);
			function linhaTab(nome, valores) {
				var tr = criar('tr');
				tr.appendChild(criar('td', '', nome));
				valores.forEach(function (v) { tr.appendChild(criar('td', v === '?' ? 'qbc-q' : '', v)); });
				tab.appendChild(tr);
			}
			agora.linhas.forEach(function (l, n) {
				linhaTab(ST[l.k].n, cols.map(function (c) { return fmtN(c.linhas[n].v1, l.k); }));
			});
			linhaTab(t('gs'), cols.map(function (c) { return fmtGS(c.gs); }));
			if (agora.valor !== null) {
				linhaTab(t('valor'), cols.map(function (c) { return c.valor === null ? '?' : String(Math.round(c.valor)); }));
			}
			tw.appendChild(tab);
			det.appendChild(tw);
			area.appendChild(det);
		}
		var areaCmp = null;
		function comparacao() {
			if (!areaCmp) { return; }
			areaCmp.textContent = '';
			if (!est.b) { return; }
			var A = estado(est.a, est.a.alvo), B = estado(est.b, est.b.alvo);
			var h = criar('div', 'qbc-h');
			h.appendChild(criar('span', 'qbc-t', t('comparacao')));
			areaCmp.appendChild(h);
			var chaves = [];
			D.stats.forEach(function (s) {
				if ((s.k in A.total) || (s.k in B.total)) { chaves.push(s.k); }
			});
			var tw = criar('div', 'qbc-tw');
			var tab = criar('table', 'qbc-tab qbc-tab-c');
			var cab = criar('tr');
			cab.appendChild(criar('th', '', ''));
			[['a', est.a], ['b', est.b]].forEach(function (x) {
				var th = criar('th', 'qb-t-' + D.rar[x[1].alvo].t);
				th.appendChild(criar('span', 'qbc-badge', x[0].toUpperCase()));
				th.appendChild(document.createTextNode(' '));
				th.appendChild(criar('span', 'qb-rn', nomeRar(x[1].alvo)));
				cab.appendChild(th);
			});
			cab.appendChild(criar('th', '', t('diferenca')));
			tab.appendChild(cab);
			function linha(nome, ico, va, vb, f) {
				var tr = criar('tr');
				var td0 = criar('td');
				if (ico) { td0.appendChild(icone(ico)); td0.appendChild(document.createTextNode(' ')); }
				td0.appendChild(document.createTextNode(nome));
				tr.appendChild(td0);
				var a = (va === undefined) ? 0 : va, b = (vb === undefined) ? 0 : vb;
				var ca = criar('td', '', f(a)), cb = criar('td', '', f(b));
				var dif = (a === null || b === null) ? null : a - b;
				if (dif !== null && Math.abs(dif) > 1e-9) { (dif > 0 ? ca : cb).className = 'qbc-win'; }
				tr.appendChild(ca); tr.appendChild(cb);
				tr.appendChild(criar('td', dif === null ? 'qbc-q' : '', dif === null ? '?' : ((dif > 0 ? 'A +' : dif < 0 ? 'B +' : '') + f(Math.abs(dif)))));
				tab.appendChild(tr);
			}
			chaves.forEach(function (k) {
				linha(ST[k].n, ST[k].i, A.total[k], B.total[k], function (v) { return fmtN(v, k); });
			});
			// Gear Score is compared as the game shows it (whole numbers)
			function inteiro(v) { return (v === null) ? null : Math.round(v); }
			linha(t('gs'), 'gs', A.vazio ? 0 : inteiro(A.gs), B.vazio ? 0 : inteiro(B.gs), fmtGS);
			tw.appendChild(tab);
			areaCmp.appendChild(tw);
			areaCmp.appendChild(criar('div', 'qbc-nota', t('total')));
			if (A.gs !== null && B.gs !== null && !A.vazio && !B.vazio) {
				var d = Math.round(A.gs) - Math.round(B.gs);
				areaCmp.appendChild(criar('div', 'qbc-ver', d === 0 ? t('empate') :
					fmt(t('melhor'), d > 0 ? nomeItem('a') + ' (A)' : nomeItem('b') + ' (B)', String(Math.abs(d)))));
			}
		}
		function atualizar() {
			desenharItem('a');
			resultado('a');
			if (est.b) { desenharItem('b'); resultado('b'); }
			comparacao();
		}
		function desenhar() {
			app.textContent = '';
			areas = {};
			caixasIt = {};
			var raiz = criar('div', 'qbc');
			var cards = criar('div', 'qbc-cards' + (est.b ? ' qbc-2' : ''));
			cards.appendChild(cartao('a'));
			if (est.b) { cards.appendChild(cartao('b')); }
			raiz.appendChild(cards);
			if (!est.b) {
				raiz.appendChild(botao('qbc-cmpb', t('comparar'), function () {
					est.b = novo();
					est.b.rar = est.a.alvo; est.b.alvo = est.a.alvo;
					guardarCalc(); desenhar();
				}));
				areaCmp = null;
			} else {
				areaCmp = criar('div', 'qbc-cmp');
				raiz.appendChild(areaCmp);
			}
			app.appendChild(raiz);
			atualizar();
		}
		desenhar();
	}

	/* ---------- styles of everything above ---------- */
	var PX = 'font-family:Silkscreen,"Pixelify Sans",monospace;';
	mw.util.addCSS(
		// edit window
		'.qb-ed-raiz{margin:0;padding:0;border:0}' +
		'.qb-ed-fundo{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.6)}' +
		'.qb-ed{width:min(560px,100%);max-height:90vh;overflow:auto;box-sizing:border-box;padding:14px 16px;background:#1b120b;color:#f3e3c3;border:3px solid #6b4423;border-radius:6px;box-shadow:0 0 0 2px #2a1a0e,0 12px 30px rgba(0,0,0,.6)}' +
		'.qb-ed.qb-ed-larga{width:min(700px,100%)}' +
		'.qb-ed-t{margin:0 0 10px;' + PX + 'font-size:14px;letter-spacing:.05em;text-transform:uppercase;color:#ffd76a}' +
		'.qb-ed-k{display:block;margin:12px 0 5px;font-size:12px;color:#d9c3a0}' +
		'.qb-ed-grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:5px}' +
		'.qb-ed-esc{display:flex;flex-wrap:wrap;gap:5px}' +
		'.qb-ed-tipo{display:flex;align-items:center;gap:7px;padding:4px 8px 4px 5px;text-align:left;font:inherit;font-size:12px;color:#f3e3c3;background:#24180f;border:1px solid #3d2716;border-radius:3px;cursor:pointer}' +
		'.qb-ed-tipo:hover{border-color:#8a6a3a}.qb-ed-on{border-color:#ffd76a;box-shadow:0 0 0 2px rgba(255,215,106,.35);background:#2f2114}' +
		'.qb-ed .qb-ico-p,.qb-fbar .qb-ico-p{position:relative;display:inline-block;flex:0 0 auto;width:20px;height:20px}' +
		'.qb-ed-in,.qb-ed-ta{display:block;width:100%;box-sizing:border-box;margin-top:4px;padding:8px;font:inherit;font-size:14px;color:#fff3d6;background:#120c07;border:2px solid #4a3019;border-radius:4px}' +
		'.qb-ed-in:disabled{opacity:.45}' +
		'.qb-ed-ch{display:block;margin:10px 0 0;font-size:13px}' +
		'.qb-ed-dica{margin:4px 0 0;font-size:12px;color:#a88d68}' +
		'.qb-ed-rem{margin-top:12px;padding:5px 9px;font:inherit;font-size:12px;color:#ffb3a6;background:transparent;border:1px solid #7a3a2e;border-radius:3px;cursor:pointer}' +
		'.qb-ed-linha{display:block;margin:12px 0 0;padding:6px 8px;font-size:12px;color:#ffe2a0;background:#2b1d12;border-radius:3px;overflow-wrap:anywhere}' +
		'.qb-ed-pre{max-height:170px;overflow:auto;margin:0;padding:8px;font-size:12px;line-height:1.5;color:#ffe2a0;background:#2b1d12;border:0;border-radius:3px;white-space:pre-wrap}' +
		'.qb-ed-msg{min-height:1.2em;margin-top:8px;font-size:13px;color:#ffcf5c}' +
		'.qb-ed-b{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:10px}' +
		'.qb-ed-ok,.qb-ed-nao{padding:8px 14px;' + PX + 'font-size:11px;text-transform:uppercase;border-radius:3px;cursor:pointer}' +
		'.qb-ed-ok{color:#fff6dc;background:linear-gradient(#5fae54,#2f6a2a);border:2px solid #1d3d1a}.qb-ed-ok:disabled{opacity:.5;cursor:default}' +
		'.qb-ed-nao{color:#ffeab0;background:linear-gradient(#8a5a30,#5c3a1f);border:2px solid #2a1a0e}' +
		'.qb-ed-full{margin-left:auto;font-size:12px;color:#ffcf5c}' +
		'.qb-ed-atr{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:5px}' +
		'.qb-ed-atr-l{display:flex;align-items:center;gap:7px;padding:3px 4px 3px 6px;background:#24180f;border:1px solid #3d2716;border-radius:3px}' +
		'.qb-ed-atr-n{flex:1;min-width:0;font-size:12px;color:#d9c3a0}' +
		'.qb-ed-atr-in{flex:0 0 74px;width:74px;box-sizing:border-box;padding:5px 6px;font:inherit;font-size:13px;color:#fff3d6;background:#120c07;border:1px solid #4a3019;border-radius:3px}' +
		'.qb-ed-lista{margin:8px 0 0;padding:0;list-style:none;counter-reset:qbl}' +
		'.qb-ed-li{display:flex;align-items:center;gap:7px;margin:0 0 4px;padding:4px 6px;background:#24180f;border:1px solid #3d2716;border-radius:3px;counter-increment:qbl}' +
		'.qb-ed-li::before{content:counter(qbl);min-width:16px;' + PX + 'font-size:10px;color:#a88d68;text-align:right}' +
		'.qb-ed-th{display:flex;align-items:center;justify-content:center;flex:0 0 40px;width:40px;height:30px;overflow:hidden;background:#15110d;border:1px solid #2e1f13;border-radius:3px;color:#5d4a35;font-size:12px}' +
		'.qb-ed-th img{width:40px;height:auto;image-rendering:pixelated}' +
		'.qb-ed-li-n{flex:1;min-width:0;font-size:13px}.qb-ed-li-n small{display:block;font-size:11px;color:#a88d68}' +
		'.qb-ed-mini{flex:0 0 auto;min-width:30px;padding:4px 8px;font:inherit;font-size:13px;color:#ffeab0;background:#3a2612;border:1px solid #5c3a1f;border-radius:3px;cursor:pointer}' +
		'.qb-ed-mini:disabled{opacity:.3;cursor:default}' +
		'.qb-ed-add{display:flex;gap:6px;margin-top:8px}.qb-ed-add .qb-ed-in{flex:1;margin-top:0}' +
		'.qb-ed-addb{flex:0 0 auto;padding:6px 12px;font:inherit;font-size:13px;color:#fff6dc;background:linear-gradient(#5fae54,#2f6a2a);border:2px solid #1d3d1a;border-radius:3px;cursor:pointer}' +
		// bar above the map: filters and group edit
		'.qb-fbar{display:flex;flex-direction:column;gap:6px;margin:0 0 8px;padding:8px 10px;background:#1b120b;border:2px solid #4a3019;border-radius:4px;font-size:13px;color:#f3e3c3}' +
		'.qb-fbar-l{display:flex;flex-wrap:wrap;align-items:center;gap:6px}' +
		'.qb-fbar-k{' + PX + 'font-size:10px;letter-spacing:.04em;text-transform:uppercase;color:#d9c3a0}' +
		'.qb-fbar-chips{display:contents}' +
		'.qb-fchip{display:inline-flex;align-items:center;gap:6px;padding:3px 8px 3px 4px;font:inherit;font-size:12px;color:#fff3d6;background:#2f2114;border:1px solid #ffd76a;border-radius:3px;cursor:pointer}' +
		'.qb-fbar-sel{padding:4px 6px;font:inherit;font-size:12px;color:#f3e3c3;background:#24180f;border:1px solid #4a3019;border-radius:3px}' +
		'.qb-fbar-b{padding:4px 9px;font:inherit;font-size:12px;color:#f3e3c3;background:#24180f;border:1px solid #4a3019;border-radius:3px;cursor:pointer}' +
		'.qb-fbar-b:hover{border-color:#8a6a3a}.qb-fbar-b.qb-on{color:#2a1608;background:#ffd76a;border-color:#ffd76a}' +
		'.qb-fbar-x{color:#ffb3a6;border-color:#7a3a2e;background:transparent}' +
		'.qb-fbar-n{font-size:12px;color:#ffd76a}' +
		'.qb-fbar-g{margin-left:auto;color:#d8efff;border-color:#2f6f9f;background:#122434}' +
		'.qb-fbar-g.qb-on{color:#06233a;background:#7cc8ff;border-color:#7cc8ff}' +
		'.qb-fbar-dica{font-size:12px;color:#a88d68}' +
		'.qb-tree.qb-filtrando .qb-c:not(.qb-ok):not(.qb-plus){opacity:.14}' +
		'.qb-tree.qb-filtrando .qb-c.qb-ok .qb-cell .qb-tile{box-shadow:0 0 0 2px #fff3d6,0 0 10px rgba(255,243,214,.8)}' +
		'.qb-leg-i[data-qb-f]{cursor:pointer}.qb-leg-i[data-qb-f]:hover{border-color:#8a6a3a}' +
		'.qb-leg-i.qb-leg-on{border-color:#ffd76a;background:#2f2114;box-shadow:0 0 0 2px rgba(255,215,106,.35)}' +
		// path from the start
		'.qb-tree.qb-com-cam .qb-c:not(.qb-cam):not(.qb-plus) .qb-cell .qb-tile{opacity:.4}' +
		'.qb-tree .qb-c.qb-cam .qb-cell .qb-tile{opacity:1;box-shadow:0 0 0 2px #ffd76a,0 0 10px rgba(255,215,106,.9)}' +
		'.qb-tree .qb-lr.qb-cam-l,.qb-tree .qb-ld.qb-cam-l{background:#fff1b0;box-shadow:0 0 8px #ffd76a}' +
		'.qb-info-cam{color:#ffd76a}' +
		// group edit
		'.qb-tree.qb-grupo{box-shadow:0 0 0 2px #2a1a0e,0 0 0 5px #4fb3ff}' +
		'.qb-tree.qb-grupo .qb-info{display:none !important}' +
		'.qb-tree.qb-grupo .qb-scroll{cursor:crosshair}' +
		'.qb-tree .qb-cell{-webkit-touch-callout:none}' +
		'.qb-tree .qb-c.qb-sel .qb-cell .qb-tile{outline:3px solid #4fb3ff;outline-offset:2px;box-shadow:0 0 12px #4fb3ff}' +
		'.qb-tree .qb-plus.qb-sel a{background:rgba(79,179,255,.35);border-color:#4fb3ff;border-style:solid}' +
		'.qb-gbar{position:fixed;left:50%;bottom:14px;z-index:900;transform:translateX(-50%);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;' +
		'width:max-content;max-width:calc(100% - 24px);box-sizing:border-box;padding:8px 10px;background:#1b120b;border:3px solid #4fb3ff;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.6);color:#f3e3c3;font-size:13px}' +
		'.qb-gbar-n{margin-right:4px;' + PX + 'font-size:11px;color:#9fd8ff}' +
		'.qb-gbar button{padding:6px 10px;font:inherit;font-size:12px;color:#ffeab0;background:linear-gradient(#8a5a30,#5c3a1f);border:2px solid #2a1a0e;border-radius:3px;cursor:pointer}' +
		'.qb-gbar button:disabled{opacity:.4;cursor:default}' +
		'.qb-gbar .qb-gbar-ok{color:#fff6dc;background:linear-gradient(#5fae54,#2f6a2a);border-color:#1d3d1a}' +
		'.qb-gbar .qb-gbar-x{color:#ffb3a6;background:transparent;border-color:#7a3a2e}' +
		'.qb-gbar-dica{flex:0 0 100%;text-align:center;font-size:12px;color:#a88d68}' +
		// Bestiary table filters
		'.qb-tf{display:flex;flex-direction:column;gap:7px;margin:8px 0;padding:10px;background:#1b120b;border:2px solid #4a3019;border-radius:4px;color:#f3e3c3}' +
		'.qb-tf-q{width:100%;max-width:340px;box-sizing:border-box;padding:7px 9px;font:inherit;font-size:14px;color:#fff3d6;background:#120c07;border:2px solid #4a3019;border-radius:4px}' +
		'.qb-tf-g{display:flex;flex-wrap:wrap;align-items:center;gap:5px}' +
		'.qb-tf-k{min-width:120px;' + PX + 'font-size:9px;letter-spacing:.04em;text-transform:uppercase;color:#a88d68}' +
		'.qb-tf-c{padding:4px 10px;font:inherit;font-size:12px;color:#f3e3c3;background:#24180f;border:1px solid #4a3019;border-radius:12px;cursor:pointer}' +
		'.qb-tf-c:hover{border-color:#8a6a3a}.qb-tf-c.qb-tf-on{color:#2a1608;background:#ffd76a;border-color:#ffd76a}' +
		'.qb-tf-p{display:flex;align-items:center;gap:10px;font-size:12px;color:#d9c3a0}' +
		'.qb-tf-x{padding:3px 8px;font:inherit;font-size:12px;color:#ffb3a6;background:transparent;border:1px solid #7a3a2e;border-radius:3px;cursor:pointer}' +
		// rune calculator
		'.qbc{display:flex;flex-direction:column;gap:12px;margin:0 0 6px}' +
		'.qbc-cards{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}' +
		'.qbc-cards.qbc-2{grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))}' +
		'.qbc-cards:not(.qbc-2) .qbc-card{max-width:820px}' +
		'.qbc-cmp{max-width:820px}' +
		'.qbc-card{min-width:0;box-sizing:border-box;padding:12px 14px;background:#1b120b;border:3px solid #6b4423;border-radius:6px;box-shadow:0 0 0 2px #2a1a0e;color:#f3e3c3}' +
		'.qbc-card.qbc-b{border-color:#2f6f9f}' +
		'.qbc-h{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 8px}' +
		'.qbc-badge{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;padding:0 4px;box-sizing:border-box;' + PX + 'font-size:11px;color:#2a1608;background:#ffd76a;border-radius:3px}' +
		'.qbc-b .qbc-badge,.qbc-tab-c th:nth-child(3) .qbc-badge{background:#7cc8f5}' +
		'.qbc-t{' + PX + 'font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:#ffd76a}' +
		'.qbc-sp{flex:1}' +
		'.qbc-mini{padding:5px 10px;font:inherit;font-size:12px;color:#ffeab0;background:#3a2612;border:1px solid #5c3a1f;border-radius:3px;cursor:pointer}' +
		'.qbc-mini:hover{background:#4a3019}' +
		'.qbc-ex{margin:0 0 8px;padding:6px 9px;font-size:12px;line-height:1.4;color:#d9c3a0;background:#2a1d10;border-left:3px solid #ffd76a;border-radius:2px}' +
		'.qbc-row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(64px,.6fr);gap:6px}' +
		'.qbc-f{display:flex;flex-direction:column;gap:3px;min-width:0;font-size:12px;color:#d9c3a0}' +
		'.qbc-k{display:block;margin:12px 0 5px;font-size:12px;color:#d9c3a0}' +
		'.qbc-k small{font-size:11px;color:#8f7758}' +
		'.qbc-in,.qbc-sel{display:block;width:100%;min-width:0;box-sizing:border-box;margin:0;padding:7px 8px;font:inherit;font-size:14px;color:#fff3d6;background:#120c07;border:2px solid #4a3019;border-radius:4px}' +
		'.qbc-k .qbc-in{margin-top:4px;max-width:200px}' +
		'.qbc-rars,.qbc-runes{display:flex;flex-wrap:wrap;gap:5px}' +
		'.qbc-sem{padding-left:9px}' +
		'.qbc-sem.qb-on{background:#2f2114;border-color:#ffd76a;box-shadow:0 0 0 2px rgba(255,215,106,.35)}' +
		'.qbc-ls{display:flex;flex-direction:column;gap:5px}' +
		'.qbc-l{display:flex;align-items:center;gap:6px}' +
		'.qbc-l .qbc-sel{flex:1 1 auto}' +
		'.qbc-l .qbc-in{flex:0 0 92px;width:92px}' +
		'.qbc-pct{flex:0 0 12px;font-size:13px;color:#a88d68}' +
		'.qbc-x{flex:0 0 auto;width:30px;height:32px;padding:0;font:inherit;font-size:13px;color:#ffb3a6;background:transparent;border:1px solid #7a3a2e;border-radius:3px;cursor:pointer}' +
		'.qbc-add{margin:6px 0 0;padding:5px 10px;font:inherit;font-size:12px;color:#ffeab0;background:transparent;border:1px dashed #6b4423;border-radius:3px;cursor:pointer}' +
		'.qbc-add:hover{border-style:solid}' +
		'.qbc .qb-ico-p{flex:0 0 auto}' +
		'.qbc-gs{display:flex;align-items:center;gap:8px;margin:14px 0 0;padding:7px 10px;background:#231b07;border:1px solid #7a5f1e;border-radius:4px;font-size:13px;color:#d9c3a0}' +
		'.qbc-gs b{' + PX + 'font-weight:400;font-size:15px;color:#ffd76a}' +
		'.qbc-out{margin:10px 0 0;padding:10px 12px;background:#24180f;border:2px solid #4a3019;border-radius:5px}' +
		'.qbc-out-t{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 6px;font-size:12px;color:#d9c3a0}' +
		'.qbc-r{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #3a2616;font-size:13px}' +
		'.qbc-r-n{flex:1;min-width:0;color:#d9c3a0}' +
		'.qbc-r-v{' + PX + 'font-size:12px;color:#fff3d6;white-space:nowrap}' +
		'.qbc-r-v s{color:#8f7758;text-decoration:none}' +
		'.qbc-up{min-width:58px;text-align:right;' + PX + 'font-size:11px;color:#7fe597;white-space:nowrap}' +
		'.qbc-r-bon .qbc-r-n{color:#c9a6ff}' +
		'.qbc-r-gs .qbc-r-v{color:#ffd76a}' +
		'.qbc-nota{margin:8px 0 0;font-size:12px;line-height:1.45;color:#bfa27c}' +
		'.qbc-nota a{color:#ffcf5c}' +
		'.qbc-esc{margin:10px 0 0}' +
		'.qbc-esc summary{cursor:pointer;font-size:13px;color:#ffcf5c}' +
		'.qbc-tw{overflow-x:auto;margin-top:6px}' +
		'.qbc-tab{border-collapse:collapse;font-size:12px}' +
		'.qbc-tab th,.qbc-tab td{border:1px solid #4a3019;padding:5px 8px;text-align:right;white-space:nowrap}' +
		'.qbc-tab th{background:#2b1d12;font-weight:400}' +
		'.qbc-tab th .qb-rn{font-size:9px}' +
		'.qbc-tab td:first-child,.qbc-tab th:first-child{text-align:left}' +
		'.qbc-tab td:first-child .qb-ico-p{vertical-align:middle}' +
		'.qbc-tab .qbc-q{color:#7d6a52}' +
		'.qbc-tab .qbc-win{color:#7fe597;font-weight:700}' +
		'.qbc-cmpb{align-self:flex-start;padding:9px 14px;' + PX + 'font-size:11px;text-transform:uppercase;color:#d8efff;background:#122434;border:2px solid #2f6f9f;border-radius:4px;cursor:pointer}' +
		'.qbc-cmpb:hover{background:#183247}' +
		'.qbc-cmp{padding:12px 14px;background:#101c26;border:3px solid #2f6f9f;border-radius:6px;color:#e3f1ff}' +
		'.qbc-cmp .qbc-t{color:#9fd8ff}' +
		'.qbc-cmp .qbc-tab{background:#0c1620}' +
		'.qbc-cmp .qbc-tab th{background:#14283a}' +
		'.qbc-cmp .qbc-tab th,.qbc-cmp .qbc-tab td{border-color:#2a4a66}' +
		'.qbc-ver{margin:10px 0 0;' + PX + 'font-size:12px;line-height:1.6;color:#ffd76a}' +
		// the item of the wiki in a card, and the window to choose it
		'.qbc-itbox{margin:0 0 8px}.qbc-itbox:empty{display:none}' +
		'.qbc-pick{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;box-sizing:border-box;padding:9px 12px;font:inherit;font-size:13px;color:#ffeab0;background:#2a1d10;border:2px dashed #8a6a3a;border-radius:4px;cursor:pointer}' +
		'.qbc-pick:hover{border-style:solid;background:#33230f}' +
		'.qbc-it{display:flex;align-items:center;gap:10px;padding:6px 8px;background:#24180f;border:1px solid #6b4423;border-radius:4px}' +
		'.qbc-it-img,.qbc-pk-img{display:flex;align-items:center;justify-content:center;flex:0 0 auto;color:#7d6a52;font-size:16px}' +
		'.qbc-it-img{width:48px;height:48px;background:#15110d;border:1px solid #2e1f13;border-radius:3px}' +
		'.qbc-it-img img{max-width:44px;max-height:44px;image-rendering:pixelated}' +
		'.qbc-it-tx{flex:1;min-width:0}' +
		'.qbc a.qbc-it-n{font-weight:700;color:#ffcf5c;overflow-wrap:anywhere}' +
		'.qbc-it-d{margin-top:2px;font-size:11px;line-height:1.35;color:#a88d68}' +
		'.qbc-pk-cab{position:sticky;top:-14px;z-index:2;margin:-14px -16px 8px;padding:14px 16px 8px;background:#1b120b;border-bottom:1px solid #3d2716}' +
		'.qbc-pk .qb-ed-t{display:flex;align-items:center;gap:8px}' +
		'.qbc-pk-x{margin-left:auto;width:32px;height:30px;padding:0;font:inherit;font-size:14px;color:#ffeab0;background:#3a2612;border:1px solid #5c3a1f;border-radius:3px;cursor:pointer}' +
		'.qbc-pk-f{display:flex;flex-wrap:wrap;align-items:center;gap:6px}' +
		'.qbc-pk-f .qbc-pk-q{flex:1 1 200px;width:auto}.qbc-pk-f .qbc-sel{flex:0 1 auto;width:auto;max-width:48%}' +
		'.qbc-pk-n{flex:0 0 100%;font-size:12px;color:#ffd76a}' +
		'.qbc-pk-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:6px}' +
		'.qbc-pk-h{grid-column:1 / -1;margin:8px 0 0;' + PX + 'font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#ffd76a}' +
		'.qbc-pk-h:first-child{margin-top:0}' +
		'.qbc-pk-i{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;padding:6px 4px 7px;font:inherit;color:#f3e3c3;text-align:center;background:#24180f;border:1px solid #3d2716;border-radius:4px;cursor:pointer}' +
		'.qbc-pk-i:hover,.qbc-pk-i:focus-visible{border-color:#ffd76a;background:#2f2114}' +
		'.qbc-pk-img{width:56px;height:56px}.qbc-pk-img img{max-width:56px;max-height:56px;image-rendering:pixelated}' +
		'.qbc-pk-nm{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:100%;font-size:12px;line-height:1.25;color:#fff3d6}' +
		'.qbc-pk-s{max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:11px;color:#a88d68}' +
		// item pages: the link to the rune calculator
		'.qb-it a.qb-it-calc{display:inline-flex;align-items:center;gap:7px;margin:10px 0 0;padding:6px 12px 6px 7px;font-size:13px;color:#d8efff;text-decoration:none;background:#122434;border:2px solid #2f6f9f;border-radius:4px}' +
		'.qb-it a.qb-it-calc:hover{background:#183247}' +
		'@media (max-width:600px){.qbc-card{padding:10px}.qbc-row{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.qbc-row .qbc-f:last-child{grid-column:1 / -1}.qbc-l .qbc-in{flex-basis:76px;width:76px}}' +
		'@media (max-width:600px){.qb-tf-k{min-width:0;flex:0 0 100%}.qb-gbar{bottom:8px}.qb-ed-atr{grid-template-columns:minmax(0,1fr)}}' +
		// the pixel font has no Vietnamese or Russian letters
		'.qb-ed-t:lang(vi),.qb-ed-ok:lang(vi),.qb-ed-nao:lang(vi),.qb-fbar-k:lang(vi),.qb-gbar-n:lang(vi),.qb-tf-k:lang(vi),.qbc-t:lang(vi),.qbc-badge:lang(vi),.qbc-r-v:lang(vi),.qbc-up:lang(vi),.qbc-gs b:lang(vi),.qbc-cmpb:lang(vi),.qbc-ver:lang(vi),.qbc-pk-h:lang(vi){font-family:VT323,monospace;font-size-adjust:.5}' +
		'.qb-ed-t:lang(ru),.qb-ed-ok:lang(ru),.qb-ed-nao:lang(ru),.qb-fbar-k:lang(ru),.qb-gbar-n:lang(ru),.qb-tf-k:lang(ru),.qbc-t:lang(ru),.qbc-cmpb:lang(ru),.qbc-ver:lang(ru),.qbc-pk-h:lang(ru){font-family:"Pixelify Sans",monospace}'
	);

	/* ---------- 7) Equipment page: search and filters; administrators create the missing item pages ---------- */
	function equipamentos(el) {
		var F = json(el, 'data-f');
		var tx = F.tx || {};
		var t = function (k) { return tx[k] || k; };
		var area = el.querySelector('.qb-eq-busca');
		var linhas = lista(el, 'tr.qb-eq-r');
		var secoes = lista(el, '.qb-eq-sec');
		if (!area || !linhas.length) { return; }
		var q = criar('input');
		q.type = 'search';
		q.placeholder = t('busca');
		var lq = criar('label', 'qb-eq-q');
		lq.appendChild(q);
		function seletorF(rotulo, opcoes) {
			var l = criar('label', '', rotulo);
			var s = criar('select');
			var o = criar('option', '', t('todos'));
			o.value = '';
			s.appendChild(o);
			(opcoes || []).forEach(function (op) {
				var x = criar('option', '', op[1]);
				x.value = op[0];
				s.appendChild(x);
			});
			l.appendChild(s);
			return { l: l, s: s };
		}
		var st = seletorF(t('tipo'), F.tipos), sc = seletorF(t('classe'), F.classes);
		var ln = criar('label', '', t('nivel'));
		var lv0 = criar('input', 'qb-eq-lvin'), lv1 = criar('input', 'qb-eq-lvin');
		[lv0, lv1].forEach(function (x) { x.type = 'number'; x.min = '1'; x.inputMode = 'numeric'; });
		lv0.placeholder = t('de');
		lv1.placeholder = t('ate');
		var lw = criar('span');
		lw.appendChild(lv0);
		lw.appendChild(document.createTextNode(' – '));
		lw.appendChild(lv1);
		ln.appendChild(lw);
		var n = criar('div', 'qb-eq-n');
		function aplicar() {
			var termo = norm(q.value), tp = st.s.value, cl = sc.s.value;
			var a = parseInt(lv0.value, 10), b = parseInt(lv1.value, 10), vis = 0;
			linhas.forEach(function (r) {
				var lv = parseInt(r.getAttribute('data-l'), 10) || 0, c = r.getAttribute('data-c');
				// a class shows its own items and the universal ones (both can be equipped)
				var ok = (!termo || norm(r.getAttribute('data-n')).indexOf(termo) >= 0) &&
					(!tp || r.getAttribute('data-t') === tp) &&
					(!cl || c === cl || (cl !== 'universal' && c === 'universal')) &&
					(isNaN(a) || lv >= a) && (isNaN(b) || lv <= b);
				r.classList.toggle('qb-off', !ok);
				if (ok) { vis++; }
			});
			secoes.forEach(function (s) { s.classList.toggle('qb-off', !s.querySelector('tr.qb-eq-r:not(.qb-off)')); });
			n.textContent = vis ? fmt(t('achados'), vis) : t('nada');
		}
		// the filters are remembered (not the search text)
		function guardarF() { guardar('qb-eq', JSON.stringify({ t: st.s.value, c: sc.s.value, a: lv0.value, b: lv1.value })); }
		var salvo = {};
		try { salvo = JSON.parse(ler('qb-eq') || '{}') || {}; } catch (e) { salvo = {}; }
		st.s.value = salvo.t || '';
		sc.s.value = salvo.c || '';
		lv0.value = salvo.a || '';
		lv1.value = salvo.b || '';
		var limpar = botao('', t('limpar'), function () {
			q.value = ''; st.s.value = ''; sc.s.value = ''; lv0.value = ''; lv1.value = '';
			aplicar(); guardarF();
		});
		[lq, st.l, sc.l, ln, limpar, n].forEach(function (x) { area.appendChild(x); });
		var tot = el.querySelector('.qb-eq-tot');
		if (tot) { tot.style.display = 'none'; }
		[q, lv0, lv1].forEach(function (x) { x.addEventListener('input', function () { aplicar(); guardarF(); }); });
		[st.s, sc.s].forEach(function (x) { x.addEventListener('change', function () { aplicar(); guardarF(); }); });
		aplicar();
		if (ehAdmin()) { geradorItens(el, t); }
	}
	function geradorItens(el, t) {
		var g = el.querySelector('.qb-eq-gen');
		if (!g) { return; }
		var nomes = json(g, 'data-itens'), redir = json(g, 'data-redir');
		var paginas = (Array.isArray(nomes) ? nomes : []).map(function (x) { return { t: x, txt: '{{Item}}' }; });
		Object.keys(redir).forEach(function (pt) { paginas.push({ t: pt, txt: '#REDIRECT [[' + redir[pt] + ']]' }); });
		if (!paginas.length) { return; }
		var api = new mw.Api();
		var s = criar('span', 'qb-eq-gen-s');
		var b = botao('', t('gerar'));
		g.appendChild(b);
		g.appendChild(s);
		b.addEventListener('click', function () {
			b.disabled = true;
			s.textContent = '…';
			var faltam = [], i = 0;
			function criarTodas() {
				if (!faltam.length) { s.textContent = t('jatem'); return; }
				var k = 0, feitas = 0, erros = [];
				function proxima() {
					if (k >= faltam.length) {
						s.textContent = fmt(t('gerado'), feitas) + (erros.length ? ' ' + t('erro') + ' ' + erros.join(', ') : '');
						return;
					}
					var x = faltam[k++];
					s.textContent = fmt(t('gerando'), k, faltam.length);
					api.postWithToken('csrf', { action: 'edit', title: x.t, text: x.txt, summary: 'Item page (from Equipment/Data)', createonly: 1, formatversion: 2 })
						.then(function () { feitas++; setTimeout(proxima, 700); },
							function (code) { erros.push(x.t + ' (' + code + ')'); setTimeout(proxima, 700); });
				}
				proxima();
			}
			// which pages already exist, 50 titles per question
			function checar() {
				if (i >= paginas.length) { criarTodas(); return; }
				var lote = paginas.slice(i, i + 50);
				i += 50;
				api.get({ action: 'query', titles: lote.map(function (x) { return x.t; }).join('|'), formatversion: 2 }).then(function (r) {
					var existe = {}, norma = {};
					((r.query && r.query.pages) || []).forEach(function (pg) { if (!pg.missing) { existe[pg.title] = true; } });
					((r.query && r.query.normalized) || []).forEach(function (x) { norma[x.from] = x.to; });
					lote.forEach(function (x) { if (!existe[norma[x.t] || x.t]) { faltam.push(x); } });
					checar();
				}, function (code) { s.textContent = t('erro') + ' ' + code; b.disabled = false; });
			}
			checar();
		});
	}

	/* ---------- 8) Item pages: enchantment level, and the item in the rune calculator ---------- */
	function paginaItem(el) {
		var F = json(el, 'data-f');
		var area = el.querySelector('.qb-it-enc');
		if (!area) { return; }
		encantamento(el, F, area);
		if (!F.calcurl) { return; }
		var a = criar('a', 'qb-it-calc');
		a.href = F.calcurl;
		a.appendChild(icone('calc'));
		a.appendChild(criar('span', '', F.calc || 'Open in the rune calculator'));
		// the rarity chosen on this page goes along (#r-epic -> &rar=epic)
		a.addEventListener('click', function () {
			var m = /^#r-([a-z]+)$/.exec(location.hash || '');
			try {
				var u = new URL(F.calcurl, location.href);
				if (m) { u.searchParams.set('rar', m[1]); } else { u.searchParams.delete('rar'); }
				a.href = u.toString();
			} catch (e) { /* the plain address still works */ }
		});
		area.appendChild(a);
	}
	function encantamento(el, F, area) {
		var pct = parseFloat(el.getAttribute('data-enc')) || 0;
		if (!pct) { return; }
		var bar = criar('div', 'qb-it-encb');
		bar.appendChild(criar('span', '', (F.encanto || 'Enchantment') + ':'));
		var nivel = 0, chips = [];
		var vals = lista(el, '.qb-itc-v[data-v]'), gss = lista(el, '.qb-itc-gsv[data-v]');
		vals.forEach(function (s) { s.qbPct = /%$/.test(s.textContent); });
		function numero(v, k) {
			if (k === 'attackspeed') { return v.toFixed(3); }
			return (Math.round(v * 100) / 100).toFixed(2).replace(/\.?0+$/, '');
		}
		function aplicar() {
			var f = 1 + nivel * pct / 100;
			vals.forEach(function (s) {
				s.textContent = numero(parseFloat(s.getAttribute('data-v')) * f, s.getAttribute('data-k')) + (s.qbPct ? '%' : '');
				s.classList.toggle('qb-enc', nivel > 0);
			});
			gss.forEach(function (s) {
				s.textContent = String(Math.round(parseFloat(s.getAttribute('data-v')) * f));
				s.classList.toggle('qb-enc', nivel > 0);
			});
			chips.forEach(function (c, i) { c.classList.toggle('qb-on', i === nivel); });
		}
		function chipEnc(nv) {
			var c = botao('qb-rb', (nv ? '+' : '') + nv, function () { nivel = nv; aplicar(); });
			chips.push(c);
			bar.appendChild(c);
		}
		for (var i = 0; i <= 10; i++) { chipEnc(i); }
		area.appendChild(bar);
		aplicar();
	}

	/* ---------- start ---------- */
	var idiomaFeito = false;
	mw.hook('wikipage.content').add(function ($conteudo) {
		var root = $conteudo[0] || document;
		if (!idiomaFeito) { idiomaFeito = true; lembrarIdioma(); }
		lista(root, '.qb-tree').forEach(function (tree) {
			if (tree.getAttribute('data-qb-js')) { return; }
			tree.setAttribute('data-qb-js', '1');
			var scroll = tree.querySelector('.qb-scroll');
			if (!scroll) { return; }
			arrastar(scroll);
			indice(tree);
			scroll.addEventListener('focusin', function (e) {
				if (tree.classList.contains('qb-grupo')) { return; }
				var cel = e.target.closest && e.target.closest('.qb-cell');
				if (cel && cel.parentNode.qbNo) { mostrarCaminho(tree, cel.parentNode.qbNo); }
			});
			scroll.addEventListener('focusout', function (e) {
				if (!e.relatedTarget || !tree.contains(e.relatedTarget)) { limparCaminho(tree); }
			});
			barraMapa(tree);
			legenda(tree);
			if (ehAdmin()) { modoGrupo(tree, scroll); }
		});
		lista(root, 'table.qb-tab').forEach(filtrosTabela);
		lista(root, '.qb-calc').forEach(function (c) {
			if (!c.getAttribute('data-qb-js')) { c.setAttribute('data-qb-js', '1'); calculadora(c); }
		});
		lista(root, '.qb-eq').forEach(function (e) {
			if (!e.getAttribute('data-qb-js')) { e.setAttribute('data-qb-js', '1'); equipamentos(e); }
		});
		lista(root, '.qb-it').forEach(function (e) {
			if (!e.getAttribute('data-qb-js')) { e.setAttribute('data-qb-js', '1'); paginaItem(e); }
		});
		interceptar(root);
	});
});