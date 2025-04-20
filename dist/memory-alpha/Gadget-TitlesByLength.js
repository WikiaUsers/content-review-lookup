'use strict';
mw.loader.using(['mediawiki.api'], () => {
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
	const limit = (
		mw.config.get('wgUserGroups').indexOf('bot') === -1 &&
		mw.config.get('wgUserGroups').indexOf('helper') === -1 &&
		mw.config.get('wgUserGroups').indexOf('soap') === -1 &&
		mw.config.get('wgUserGroups').indexOf('staff') === -1 &&
		mw.config.get('wgUserGroups').indexOf('sysop') === -1 &&
		mw.config.get('wgUserGroups').indexOf('wiki-specialist') === -1
	) ? '500' : '5000';
	const findTitles = $('<li><a href="#">Titles by length</a></li>');
	$('#my-tools-menu').prepend(findTitles);
	findTitles.on('click', createModal);
	
	function button(id, txt, secondary = false){
		const classes = ['wds-button'];
		if (secondary){
			classes.push('wds-is-secondary');
		}
		const classString = classes.join(' ');
		return $(`<button class="${classString}" id="${id}">`).text(txt);
	}
	
	function createModal(){
		$('body').append(myModal);
		$('#myModal').on('submit', submitForm);
		$('#myModalLong').on('click', findLongTitles);
		$('#myModalShort').on('click', findShortTitles);
		$('#myModalCancel').on('click', cancel);
		$('#myModalClose').on('click', close);
	}
	
	function submitForm(e){
		e.preventDefault();
	}
	
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
		}).done((result) => {
			result.query.allpages.forEach((p) => titles.list.push(p.title));
			
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
				
				for (let i = 0; i < titles.numberOfResults; i++){
					$('#myModalResults').append(`# [[${titles.list[i]}]]\n`);
				}
			}
		});
	}
});