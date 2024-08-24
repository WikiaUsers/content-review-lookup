// Appends 2 buttons to the title to copy the title with/without namespace
// without is on top
// author: RheingoldRiver
// careful if you have other gadgets on your wiki that also append links to #firstHeading, they will enter a race condition & be annoying

$(function() {
	var el = document.createElement('div')
	$(el).attr('id', 'title-copy-outer').html('<div id="title-copy-content" title="Copiar somente título (sem espaço nominal)"></div><div id="title-copy-all" title="Copiar título completo (Inclespaço nominal)"></div>');
	$('#firstHeading').wrapInner('<div id="first-heading-text"></div>');
	$(el).insertAfter(document.getElementById('first-heading-text'));
	$('#title-copy-content').click(function() {
		var text = mw.config.get('wgTitle');
		var copyEl = document.createElement('textarea');
		copyEl.value = text;
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		$('#title-copy-content').css('color','green');
		setTimeout(function() {
			$('#title-copy-content').css('color','');
		}, 2000);
	});
	$('#title-copy-all').click(function() {
		var text = mw.config.get('wgPageName');
		var copyEl = document.createElement('textarea');
		copyEl.value = text;
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		document.execCommand('copy');
		$('#title-copy-all').css('color','green');
		setTimeout(function() {
			$('#title-copy-all').css('color','');
		}, 2000);
	});
});