mw.hook( 'wikipage.content' ).add(function() {
	const el = document.querySelector('[data-tabber-initial-tab]:has(.tabber)');

	if (el !== null) {
		const tab = el.querySelector(`.tabber [data-hash="${el.dataset.tabberInitialTab}"]`);

		if (tab === null) {
			const tabOptions = Array.from(document.querySelectorAll('.tabber [data-hash]'), (el) => el.dataset.hash);
			const listFormatter = new Intl.ListFormat('en', { style: 'long', type: 'disjunction' });
			console.warn(`Tab "${el.dataset.tabberInitialTab}" of tabber should be selected but cannot be found. Choose one of: ${listFormatter.format(tabOptions)}`);
		} else {
			tab.click();
		}
	}
});