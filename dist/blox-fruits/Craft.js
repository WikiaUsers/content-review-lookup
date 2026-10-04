mw.hook('wikipage.content').add($c => $c.find('.crafting-table:not(.crafting-ready)').addClass('crafting-ready').each((_, t) => {
	const y = $(t).find('.crafting-result').data('amount'), l = +t.dataset.limit || 99;
	if (2 * y > l) return;
	const format = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const $result = $(t).find('.crafting-result .card-text-sup');
	const materials = $(t).find('.crafting-material').map((_, e) => ({
		amount: +e.dataset.amount,
		stack: +e.dataset.stack || Infinity,
		prefix: e.dataset.stack ? format(+e.dataset.stack) + '/' : '',
		$count: $(e).find('.crafting-count')
	})).get();
	const disable = (b, d) => b.prop('disabled', d).toggleClass('bfw-button-blue', !d).toggleClass('bfw-button-grey', d);
	let q = 1;
	const [minus, plus] = ['-', '+'].map((s, i) => $(`<button type="button" aria-label="${i ? 'In' : 'De'}crease quantity">${s}</button>`).on('click', () => {
		q += i ? 1 : -1;
		for (const m of materials) {
			const n = m.amount * q;
			m.$count.text(m.prefix + format(n)).toggleClass('crafting-over', n > m.stack).toggleClass('crafting-short', n > m.stack + 6);
		}
		$result.text(y * q + 'x');
		disable(minus, q < 2);
		disable(plus, (q + 1) * y > l);
	}));
	$(t).find('.crafting-controls').append(disable(minus, true), disable(plus, false));
}));