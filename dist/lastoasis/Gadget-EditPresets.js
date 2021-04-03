if (mw.config.get('wgAction') === 'edit' && !!mw.user.getName()) {
	$('#wpSummaryWidget').after('<div id="preset-edit-buttons"></div>');
	$('<button type="button" id="clear-button" class="preset-edit-button clear-button" title="Clear">Clear</button>#preset-edit-buttons').appendTo('#preset-edit-buttons');
	$('#clear-button').click(function() {
		$('#wpSummary').val('');
	});
	var api = new mw.Api();
	api.get({
		action:'parse',
		page: 'User:' + mw.user.getName() + '/editPresets',
		prop: ['text'],
		format: 'json'
	}).done(function(data) {
		var array = [];
		$(data.parse.text['*']).find('li').each(function(i, t) {
			array.push($(t).text());
		});
		placeButtons(array);
	}).fail(function(err) {
		if (err === 'missingtitle') placeButtons([]);
		else console.error(err);
	});
}

function placeButtons(array) {
	if (!array.length) {
		var $createPresets = $('<button type="button" id="set-presets" title="Set some summary presets">Click to set some custom presets!</button>').appendTo('#preset-edit-buttons');
		return $createPresets.click(createEditPresets);
	}
	var $editPresets = $('<button type="button" id="edit-presets" title="Edit presets">Edit Presets</button>').appendTo('#preset-edit-buttons');
	$editPresets.click(openEditPresets);
	$.each(array, function(i, t) {
		var name = '';
		var text = '';
		if (t.includes('|')) {
			name = t.split('|')[0];
			text = t.split('|')[1];
		} else name = text = t;
		var $button = $('<button type="button" id="' + name + '"class="preset-edit-button" title="' + text + '">' + name + '</button>#preset-edit-buttons').appendTo('#preset-edit-buttons');
		$button.unbind('click');
		$button.click(presetClick);
	});
}

function presetClick(el) {
	var currText = $('#wpSummary').val();
	var text = $(el.target).attr('title');
	if (currText.includes(text)) return;
	if (currText && !/^\/\*\s+\w+\s+\*\/\s*$/.test(currText)) $('#wpSummary').val(currText + ', ' + $(el.target).attr('title'));
	else $('#wpSummary').val(currText + (!!currText ? ' ' : '') + text);
}

function openEditPresets(el) {
	var win = window.open('/User:' + mw.user.getName() + '/editPresets?action=edit', '_blank');
	win.focus();
	$(el.target).text('Reload the page to see your changes!');
	$(el.target).prop('disabled', true);
}

function createEditPresets(el) {
	new mw.Api().postWithToken('csrf', {
		action: 'edit',
		text: '<!-- This page defines presets for edit summaries. You can create a list with * to add new presets\nEx:\n* Preset1\n* Work on formatting\n* Text that is shown on the button|vs Text that is placed into the summary box\n-->',
		title: 'User:' + mw.user.getName() + '/editPresets',
		summary: 'Created editPresets page for ' + mw.user.getName()
	}).done(function(res) {
		var win = window.open('/' + res.edit.title + '?action=edit', '_blank');
		win.focus();
		$(el.target).text('Reload the page to see your changes!');
		$(el.target).prop('disabled', true);
	}).fail(function(err) {
		console.error(err);
	});
}