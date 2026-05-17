'use strict';
(() => {
	const api = new mw.Api({parameters: {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: mw.config.values.wgUserLanguage,
	}});
	const titles = {
		list: [],
		numberOfResults: 10,
	};
	const myModal = $('<form>', {id: 'myModal'}).append(
		$('<label>', {
			for: 'myModalCount',
			text: 'Number of results',
		}),
		$('<textarea>', {
			id: 'myModalCount',
			rows: 4,
			text: titles.numberOfResults,
		}),
		$('<label>', {
			for: 'myModalResults',
			text: 'Results',
		}),
		$('<textarea>', {
			id: 'myModalResults',
			rows: 4,
			disabled: true,
		}),
		button('myModalLong', 'Find longest titles'),
		button('myModalShort', 'Find shortest titles'),
		button('myModalCancel', 'Cancel', true),
		button('myModalClose', 'Close', true),
	);
	const findTitles = $('<li><a href="#">Titles by length</a></li>');
	$('#my-tools-menu').prepend(findTitles);
	findTitles.on('click', () => {
		$('body').append(myModal);
		$('#myModal').on('submit', submitForm);
		$('#myModalLong').on('click', findLongTitles);
		$('#myModalShort').on('click', findShortTitles);
		$('#myModalCancel').on('click', cancel);
		$('#myModalClose').on('click', close);
	});

	function findLongTitles(){
		titles.mode = 'long';
		titles.canceled = false;
		initalizer();
	}

	function findShortTitles(){
		titles.mode = 'short';
		titles.canceled = false;
		initalizer();
	}

	function cancel(){
		titles.canceled = true;
	}

	function close(){
		cancel();
		myModal.remove();
	}

	async function initalizer(){
		if (titles.canceled){
			return;
		}

		titles.numberOfResults = Number($('#myModalCount').val());
		$('#myModalResults').text('');

		if (!titles.list.length){
			await requestSome();
			titles.list.sort((a, b) => b.length - a.length);
		}

		for (let i = 0; i < titles.numberOfResults; i++){
			if (titles.mode === 'long'){
				$('#myModalResults').append(`# [[${titles.list[i]}]]\n`);
			} else {
				$('#myModalResults').append(`# [[${titles.list.at(- i - 1)}]]\n`);
			}
		}
	}

	async function requestSome(continueParameter){
		const result = await api.post({
			list: 'allpages',
			aplimit: 'max',
			apcontinue: continueParameter,
		});

		result.query.allpages.forEach(p => titles.list.push(p.title));

		if (titles.canceled){
			return;
		}

		if (result.continue){
			await requestSome(result.continue.apcontinue);
		}

		return Promise.resolve();
	}
})();

function button(id, txt, secondary = false){
	const classes = ['wds-button'];
	if (secondary){
		classes.push('wds-is-secondary');
	}
	const classString = classes.join(' ');
	return $('<button>', {
		class: classString,
		id: id,
		text: txt,
	});
}

function submitForm(e){
	e.preventDefault();
}

// {{JavaScript category}}