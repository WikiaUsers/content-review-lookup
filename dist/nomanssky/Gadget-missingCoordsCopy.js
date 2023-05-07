// adds string and button for admins to quickly mark a page with insufficient coordinate data
$(function() {
	if (document.getElementById('MissingCoordsMacro')) return;
	var inputDiv = $('#editform .oo-ui-layout.oo-ui-horizontalLayout')[0];
	if (!mw.config.get("wgUserGroups").includes("sysop") || !inputDiv) return;
	
	var div = document.createElement('div');
	var button = document.createElement('button');

	button.innerText = 'Copy';
	button.type = 'button';
	button.style.marginLeft = '.5rem';
	button.style.cursor = 'pointer';
	button.classList = 'mw-ui-button mw-ui-progressive';
	button.onclick = (function(e) {
		var btn = e.target;
		btn.style.pointerEvents = 'none';
		var textDiv = $('#MissingCoordsMacro')[0];
		navigator.clipboard.writeText(textDiv.innerText);
		var prevBtnText = btn.innerText;
		btn.innerText = 'Copied!';
		setTimeout(function() {
			btn.innerText = prevBtnText;
			btn.style.pointerEvents = '';
		}, 1000);
	});
	
	var dateCalc = '#time: d F Y | now + 1 month';
	div.id = 'MissingCoordsMacro';
	div.innerText = '{{Missing' + 'Coords|{{subst:' + dateCalc + '}}}}';
	div.style.marginLeft = 'auto';
	
	inputDiv.appendChild(div);
	inputDiv.appendChild(button);
});