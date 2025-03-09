const smallTreeCount = 5;
const buttonClass = 'show-hide-button';
$('h2:contains("Appearances and references") + ul').wrap('<div class="collapsible-list">');
$('h2:contains("Appearances and references") + section > ul').wrap('<div class="collapsible-list">');
$('h2:contains("Bibliography") + ul').wrap('<div class="collapsible-list">');
$('h2:contains("Bibliography") + section > ul').wrap('<div class="collapsible-list">');
$('h2:contains("Credits") + ul').wrap('<div class="collapsible-list">');
$('h2:contains("Credits") + section > ul').wrap('<div class="collapsible-list">');
$('h2:contains("Contents") + ul').wrap('<div class="collapsible-list">');
$('h2:contains("Contents") + section > ul').wrap('<div class="collapsible-list">');

$('.collapsible-list').each((index, currentTree) => {
	const currentButtonID = `mainButton-${index}`;
	const numberOfSubLists = $(currentTree).find('ul li ul').length;
	const total = $(currentTree).find('ul li').length - numberOfSubLists;
	const buttonLabel = (total > smallTreeCount) ? 'show all' : 'hide all';
	const buttonAttributes = {
		'id': currentButtonID,
		'class': buttonClass,
	};
	const button = $('<small>').html(`(${$('<a>').attr(buttonAttributes).text(buttonLabel).prop('outerHTML')})`);
	const buttonString = (numberOfSubLists === 0) ? '' : ` ${button.prop('outerHTML')}`;
	const desc = $('<div>').html(`This list includes ${total} items${buttonString}.`);
	
	$(currentTree).prepend(desc);
	
	if (total > smallTreeCount){
		$(currentTree).find('ul li ul').hide();
	}
	
	$(`#${currentButtonID}`).on('click', (event) => {
		if ($(event.currentTarget).text() === 'show all'){
			$(currentTree).find('ul li ul').show();
		} else {
			$(currentTree).find('ul li ul').hide();
		}
		
		$(event.currentTarget).text(($(event.currentTarget).text() === 'show all') ? 'hide all' : 'show all');
	});
});

$('.collapsible-list li ul').each((index, currentTree) => {
	const currentButtonID = `pane-${index}`;
	const total = $(currentTree).find('li').length - $(currentTree).find('ul').length;
	const buttonAttributes = {
		'id': currentButtonID,
		'class': buttonClass,
	};
	const button = $('<a>').attr(buttonAttributes).text(total);
	$(currentTree).before($('<small>').html(` (${button.prop('outerHTML')})`));
	
	$(`#${currentButtonID}`).on('click', () => {
		$(currentTree).toggle();
	});
});