'use strict';
mw.loader.using(['mediawiki.api', 'mediawiki.user'], () => {
	mw.user.getRights(rights => {
		const limit = rights.includes('apihighlimits') ? 5000 : 500;
		init(limit);
	});
});

function init(limit){
	const api = new mw.Api();
	const titles = {
		list: [],
		numberOfResults: 10,
		canceled: false,
		mode: undefined,
	};
	const myModal = $('<form id="myModal">')
		.append($('<label for="myModalCount">').text('Number of results'))
		.append($('<textarea id="myModalCount" rows="4">').text('10'))
		.append($('<label for="myModalResults">').text('Results'))
		.append($('<textarea id="myModalResults" rows="4" disabled>'))
		.append(button('myModalLong', 'Find longest titles'))
		.append(button('myModalShort', 'Find shortest titles'))
		.append(button('myModalCancel', 'Cancel', true))
		.append(button('myModalClose', 'Close', true));
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
	
	function initalizer(){
		if (titles.canceled){
			return;
		}
		
		titles.list = [];
		titles.numberOfResults = Number($('#myModalCount').val());
		$('#myModalResults').text('');
		requestSome();
	}
	
	function requestSome(continueParameter){
		api.get({
			action: 'query',
			list: 'allpages',
			aplimit: limit,
			apcontinue: continueParameter,
		}).done(result => {
			result.query.allpages.forEach(p => titles.list.push(p.title));
			
			if (titles.canceled){
				return;
			}
			
			if (result['continue']){
				requestSome(result['continue'].apcontinue);
			} else {
				if (titles.mode === 'long'){
					titles.list.sort((a, b) => b.length - a.length);
				} else {
					titles.list.sort((a, b) => a.length - b.length);
				}
				
				for (const title of titles.list){
					$('#myModalResults').append(`# [[${title}]]\n`);
				}
			}
		});
	}
}

function button(id, txt, secondary = false){
	const classes = ['wds-button'];
	if (secondary){
		classes.push('wds-is-secondary');
	}
	const classString = classes.join(' ');
	return $(`<button class="${classString}" id="${id}">`).text(txt);
}

function submitForm(e){
	e.preventDefault();
}