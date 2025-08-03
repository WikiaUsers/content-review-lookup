$('.copyform').prepend('<button class="wds-button copybutton" type="button" autocomplete="off" title="Нажатие на эту кнопку скопирует текст в буфер обмена"></button>');
$('.copyform .copybutton').on('click', function () {
	var button = $(this),
		text   = $(this).closest('.copyform').text(),
		elem   = document.createElement('textarea');
	elem.value = text;
	document.body.appendChild(elem);
	elem.select();
	document.execCommand('copy');
	document.body.removeChild(elem);
	button.prop('disabled', true);
	setTimeout(
		() => button.prop('disabled', false), 
		5000
	);
});