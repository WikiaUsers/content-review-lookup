/* Questbar wiki — OPTIONAL. Only works on computers, and only after Fandom enables JavaScript on the wiki.
   1) Drag the Skill Tree map with the mouse; the map opens centered on the start.
   2) Edit right on the page: the ✎ and ＋ buttons open a small window (choose the icon, type the value, Save)
      instead of going to the edit page. Without this script (and on phones) the buttons still work:
      they open the edit page with the line already written. */
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
	'use strict';

	/* ---------- 1) drag the map ---------- */
	function arrastar(root) {
		var lista = root.querySelectorAll('.qb-scroll');
		Array.prototype.forEach.call(lista, function (el) {
			var apertado = false, moveu = false, x0, y0, sl, st;
			var inicio = el.querySelector('.qb-start');
			if (inicio && !location.hash) {
				var a = inicio.getBoundingClientRect(), b = el.getBoundingClientRect();
				el.scrollLeft += a.left - b.left - el.clientWidth / 2 + a.width / 2;
				el.scrollTop += a.top - b.top - el.clientHeight / 2 + a.height / 2;
			}
			el.addEventListener('mousedown', function (e) {
				if (e.button !== 0 || e.target.closest('a')) { return; }
				apertado = true; moveu = false;
				x0 = e.clientX; y0 = e.clientY; sl = el.scrollLeft; st = el.scrollTop;
			});
			window.addEventListener('mousemove', function (e) {
				if (!apertado) { return; }
				var dx = e.clientX - x0, dy = e.clientY - y0;
				if (Math.abs(dx) + Math.abs(dy) > 4) { moveu = true; el.style.cursor = 'grabbing'; }
				el.scrollLeft = sl - dx; el.scrollTop = st - dy;
			});
			window.addEventListener('mouseup', function () { apertado = false; el.style.cursor = ''; });
			el.addEventListener('click', function (e) {
				if (moveu) { e.preventDefault(); e.stopPropagation(); moveu = false; }
			}, true);
		});
	}

	/* ---------- 2) edit on the page ---------- */
	// CSS class of each type -> word used in the list
	var TIPOS = [['ouro', 'gold'], ['xp', 'xp'], ['dano', 'damage'], ['velataque', 'attackspeed'], ['critico', 'critchance'],
		['danocritico', 'critdamage'], ['velmov', 'movespeed'], ['alcance', 'range'], ['hp', 'hp'], ['defesa', 'defense'],
		['bloqueio', 'block'], ['esquiva', 'dodge'], ['subjugacao', 'subjugation'], ['drop', 'drop'], ['venda', 'sellprice'],
		['offline', 'offline'], ['inventario', 'inventory'], ['vidasub', 'subjugatedhp'], ['tropa', 'troop'], ['bau', 'chest']];

	function json(el, attr) {
		try { return JSON.parse(el.getAttribute(attr) || '{}'); } catch (e) { return {}; }
	}
	function criar(tag, classe, texto) {
		var el = document.createElement(tag);
		if (classe) { el.className = classe; }
		if (texto !== undefined) { el.textContent = texto; }
		return el;
	}
	function icone(classe) {
		var s = criar('span', 'qb-ico qb-ico-p qb-t-' + classe);
		var t = criar('span', 'qb-tile');
		t.appendChild(criar('span', 'qb-g qb-g-' + classe));
		s.appendChild(t);
		return s;
	}
	// reads what the button would write in the edit box: page, section title and line
	function lerLink(a) {
		var u = new URL(a.href, location.href);
		var m = u.pathname.match(/\/wiki\/(.+)$/);
		return {
			pagina: m ? decodeURIComponent(m[1]).replace(/_/g, ' ') : '',
			titulo: u.searchParams.get('preloadtitle') || '',
			linha: u.searchParams.get('preloadparams[]') || ''
		};
	}

	function abrirEditor(a) {
		var caixa = a.closest('.qb-tree, .qb-best');
		var saida = a.closest('.mw-parser-output') || document.body;
		var tx = json(caixa, 'data-ed');
		var nomes = json(caixa, 'data-nomes');
		var dado = lerLink(a);
		var partes = dado.linha.split('|').map(function (p) { return p.trim(); });
		var ehNo = /^-?\d+\s*,\s*-?\d+$/.test(partes[0] || '');
		var antigo = document.querySelector('.qb-ed-fundo');
		if (antigo) { antigo.parentNode.removeChild(antigo); }

		var fundo = criar('div', 'qb-ed-fundo');
		var jan = criar('div', 'qb-ed');
		fundo.appendChild(jan);
		var cab = ehNo ? ((partes[1] === 'TYPE' ? '＋ ' : '✎ ') + '(' + partes[0].replace(/-/g, '−') + ')') : '✎ ' + dado.titulo;
		jan.appendChild(criar('div', 'qb-ed-t', cab));
		var linhaFinal = criar('code', 'qb-ed-linha');
		var montar;

		if (ehNo) {
			var tipo = (partes[1] && partes[1] !== 'TYPE') ? partes[1] : '';
			var valor = (partes[2] && partes[2] !== 'VALUE') ? partes[2] : '';
			var especial = partes.slice(2).indexOf('special') >= 0;
			if (valor === 'special') { valor = ''; }
			jan.appendChild(criar('div', 'qb-ed-k', tx.tipo || 'Type'));
			var grade = criar('div', 'qb-ed-grade');
			TIPOS.forEach(function (t) {
				var b = criar('button', 'qb-ed-tipo');
				b.type = 'button';
				b.setAttribute('data-palavra', t[1]);
				b.appendChild(icone(t[0]));
				b.appendChild(criar('span', 'qb-ed-n', nomes[t[0]] || t[1]));
				if (t[1] === tipo) { b.className += ' qb-ed-on'; }
				b.addEventListener('click', function () {
					tipo = t[1];
					Array.prototype.forEach.call(grade.children, function (x) { x.classList.toggle('qb-ed-on', x === b); });
					montar();
				});
				grade.appendChild(b);
			});
			jan.appendChild(grade);
			var lv = criar('label', 'qb-ed-k', tx.valor || 'Value');
			var iv = criar('input', 'qb-ed-in');
			iv.type = 'text'; iv.value = valor; iv.placeholder = '+2.8%';
			iv.addEventListener('input', function () { montar(); });
			lv.appendChild(iv);
			jan.appendChild(lv);
			var le = criar('label', 'qb-ed-ch');
			var ce = criar('input');
			ce.type = 'checkbox'; ce.checked = especial;
			ce.addEventListener('change', function () { montar(); });
			le.appendChild(ce);
			le.appendChild(document.createTextNode(' ' + (tx.esp || 'Special')));
			jan.appendChild(le);
			montar = function () {
				var p = [partes[0], tipo || 'TYPE'];
				var v = iv.value.trim();
				if (v || ce.checked) { p.push(v); }
				if (ce.checked) { p.push('special'); }
				linhaFinal.textContent = p.join(' | ');
			};
			if (partes[1] && partes[1] !== 'TYPE') {
				var rem = criar('button', 'qb-ed-rem', tx.remover || 'Remove');
				rem.type = 'button';
				rem.addEventListener('click', function () { salvar(partes[0] + ' | remove'); });
				jan.appendChild(rem);
			}
		} else {
			jan.appendChild(criar('div', 'qb-ed-k', tx.linha || 'Line'));
			var ta = criar('textarea', 'qb-ed-ta');
			ta.value = dado.linha;
			ta.rows = 4;
			ta.addEventListener('input', function () { montar(); });
			jan.appendChild(ta);
			montar = function () { linhaFinal.textContent = ta.value.replace(/\s*\n\s*/g, ' ').trim(); };
		}
		jan.appendChild(linhaFinal);
		var msg = criar('div', 'qb-ed-msg');
		jan.appendChild(msg);
		var botoes = criar('div', 'qb-ed-b');
		var ok = criar('button', 'qb-ed-ok', tx.salvar || 'Save');
		ok.type = 'button';
		var nao = criar('button', 'qb-ed-nao', tx.cancelar || 'Cancel');
		nao.type = 'button';
		var tudo = criar('a', 'qb-ed-full', tx.completo || 'Full editor');
		tudo.href = a.href;
		botoes.appendChild(ok); botoes.appendChild(nao); botoes.appendChild(tudo);
		jan.appendChild(botoes);
		montar();

		function fechar() { if (fundo.parentNode) { fundo.parentNode.removeChild(fundo); } }
		function salvar(linha) {
			if (/\|\s*TYPE\s*(\||$)/.test(linha)) { msg.textContent = '← ' + (tx.tipo || 'Type'); return; }
			ok.disabled = true;
			msg.textContent = tx.salvando || 'Saving…';
			var api = new mw.Api();
			api.postWithToken('csrf', {
				action: 'edit', title: dado.pagina, section: 'new', sectiontitle: dado.titulo,
				text: linha, summary: dado.titulo + ': ' + linha
			}).then(function () {
				return api.post({ action: 'purge', titles: mw.config.get('wgPageName') });
			}).then(function () {
				location.reload();
			}, function (codigo, resp) {
				ok.disabled = false;
				msg.textContent = (tx.erro || 'Error:') + ' ' + ((resp && resp.error && resp.error.info) || codigo);
			});
		}
		ok.addEventListener('click', function () { salvar(linhaFinal.textContent); });
		nao.addEventListener('click', fechar);
		fundo.addEventListener('click', function (e) { if (e.target === fundo) { fechar(); } });
		document.addEventListener('keydown', function esc(e) {
			if (e.key === 'Escape') { fechar(); document.removeEventListener('keydown', esc); }
		});
		saida.appendChild(fundo);
	}

	mw.util.addCSS(
		'.qb-ed-fundo{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.6)}' +
		'.qb-ed{width:min(560px,100%);max-height:90vh;overflow:auto;box-sizing:border-box;padding:14px 16px;background:#1b120b;color:#f3e3c3;border:3px solid #6b4423;border-radius:6px;box-shadow:0 0 0 2px #2a1a0e,0 12px 30px rgba(0,0,0,.6)}' +
		'.qb-ed-t{margin:0 0 10px;font-family:Silkscreen,"Pixelify Sans",monospace;font-size:14px;letter-spacing:.05em;text-transform:uppercase;color:#ffd76a}' +
		'.qb-ed-k{display:block;margin:10px 0 5px;font-size:12px;color:#d9c3a0}' +
		'.qb-ed-grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:5px}' +
		'.qb-ed-tipo{display:flex;align-items:center;gap:7px;padding:4px 6px;text-align:left;font:inherit;font-size:12px;color:#f3e3c3;background:#24180f;border:1px solid #3d2716;border-radius:3px;cursor:pointer}' +
		'.qb-ed-tipo:hover{border-color:#8a6a3a}.qb-ed-on{border-color:#ffd76a;box-shadow:0 0 0 2px rgba(255,215,106,.35);background:#2f2114}' +
		'.qb-ed-in,.qb-ed-ta{display:block;width:100%;box-sizing:border-box;margin-top:4px;padding:8px;font:inherit;font-size:14px;color:#fff3d6;background:#120c07;border:2px solid #4a3019;border-radius:4px}' +
		'.qb-ed-ch{display:block;margin:10px 0 0;font-size:13px}' +
		'.qb-ed-rem{margin-top:10px;padding:5px 9px;font:inherit;font-size:12px;color:#ffb3a6;background:transparent;border:1px solid #7a3a2e;border-radius:3px;cursor:pointer}' +
		'.qb-ed-linha{display:block;margin:12px 0 0;padding:6px 8px;font-size:12px;color:#ffe2a0;background:#2b1d12;border-radius:3px;overflow-wrap:anywhere}' +
		'.qb-ed-msg{min-height:1.2em;margin-top:8px;font-size:13px;color:#ffcf5c}' +
		'.qb-ed-b{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:10px}' +
		'.qb-ed-ok,.qb-ed-nao{padding:8px 14px;font-family:Silkscreen,"Pixelify Sans",monospace;font-size:11px;text-transform:uppercase;border-radius:3px;cursor:pointer}' +
		'.qb-ed-ok{color:#fff6dc;background:linear-gradient(#5fae54,#2f6a2a);border:2px solid #1d3d1a}.qb-ed-ok:disabled{opacity:.6;cursor:wait}' +
		'.qb-ed-nao{color:#ffeab0;background:linear-gradient(#8a5a30,#5c3a1f);border:2px solid #2a1a0e}' +
		'.qb-ed-full{margin-left:auto;font-size:12px;color:#ffcf5c}' +
		'html[lang="vi"] .qb-ed-t,html[lang="vi"] .qb-ed-ok,html[lang="vi"] .qb-ed-nao{font-family:VT323,monospace;font-size-adjust:.5}'
	);

	mw.hook('wikipage.content').add(function ($conteudo) {
		var root = $conteudo[0] || document;
		arrastar(root);
		// visitors without an account keep the normal links (Fandom asks them to sign in)
		if (!mw.config.get('wgUserName') || root.getAttribute('data-qb-ed')) { return; }
		root.setAttribute('data-qb-ed', '1');
		root.addEventListener('click', function (e) {
			var a = e.target.closest && e.target.closest('.qb-info-ed a, .qb-plus a, .qb-cr-ed a, .qb-fase-ed a');
			if (!a || !a.href || a.href.indexOf('preloadparams') < 0) { return; }
			e.preventDefault();
			abrirEditor(a);
		});
	});
});