(function() {
	if (!$('.mw-editTools')[0]) return;
	var specialChars = $('#editpage-specialchars')[0];
	specialChars.style.display = 'none';
	var a = document.createElement('a');
	a.innerText = '[Show Special Characters]';
	a.style.textAlign = 'right';
	specialChars.insertAdjacentElement('beforebegin', a);
	a.onclick = (function() {
		if (specialChars.style.display) {
			specialChars.style.display = '';
			a.innerText = '[Hide Special Characters]';
		} else {
			specialChars.style.display = 'none';
			a.innerText = '[Show Special Characters]';
		}
	});
})();