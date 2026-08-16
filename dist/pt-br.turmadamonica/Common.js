/* =========================================================
   NOVOS BOTÕES NA BARRA DE FERRAMENTAS
   ========================================================= */

/* Botão Redirecionamento — protegido para não interromper o Common.js. */
mw.hook('wikipage.editform').add(function () {
	if (typeof window.addCustomButton !== 'function') {
		return;
	}

	window.addCustomButton(
		'https://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
		'Redirecionamento',
		'#REDIRECIONAMENTO [[',
		']]',
		'nome do destino',
		'mw-editbutton-redirect'
	);
});


/* =========================================================
   ÚLTIMA ABA DAS INFOBOXES
   ========================================================= */

/* O código propriamente dito fica em MediaWiki:Gadget-piLastTab.js. */
mw.loader.load('ext.gadget.piLastTab');


/* =========================================================
   REFERENCE POP-UPS
   ========================================================= */

if (typeof window.importScriptPage === 'function') {
	window.importScriptPage('ReferencePopups/code.js', 'dev');
}


/* =========================================================
   CHECKLIST DA PREDEFINIÇÃO:CAIXA DICA
   ========================================================= */

mw.hook('wikipage.content').add(function ($content) {
	var items = $content[0].querySelectorAll('.dica-check');

	Array.prototype.forEach.call(items, function (item) {
		if (item.dataset.dicaBound) {
			return;
		}

		item.dataset.dicaBound = '1';
		item.setAttribute('role', 'checkbox');
		item.setAttribute('aria-checked', 'false');
		item.setAttribute('tabindex', '0');

		function toggle() {
			var marcado = item.classList.toggle('dica-check--marcado');

			item.setAttribute(
				'aria-checked',
				marcado ? 'true' : 'false'
			);
		}

		item.addEventListener('click', toggle);

		item.addEventListener('keydown', function (event) {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				toggle();
			}
		});
	});
});