if ($('#wds-icons-comment-tiny').length == 0) {
	var fignya = document.querySelector('.wds-tabs');
	var fignya2 = document.createElement('li');
	fignya2.className = 'wds-tabs__tab';
	fignya2.innerHTML = '<div class="wds-tabs__tab-label">'+
	'		<a href="//shararam.fandom.com/wiki/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Forum" data-tracking="forum">'+
	'			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon-tiny wds-icon" id="wds-icons-comment-tiny"><defs><path id="comment-tiny" d="M4.5 2c-.668 0-1.293.26-1.757.731A2.459 2.459 0 0 0 2 4.5c0 1.235.92 2.297 2.141 2.47A1 1 0 0 1 5 7.96v.626l1.293-1.293A.997.997 0 0 1 7 7h.5c.668 0 1.293-.26 1.757-.731.483-.476.743-1.1.743-1.769C10 3.122 8.878 2 7.5 2h-3zM4 12a1 1 0 0 1-1-1V8.739A4.52 4.52 0 0 1 0 4.5c0-1.208.472-2.339 1.329-3.183A4.424 4.424 0 0 1 4.5 0h3C9.981 0 12 2.019 12 4.5a4.432 4.432 0 0 1-1.329 3.183A4.424 4.424 0 0 1 7.5 9h-.086l-2.707 2.707A1 1 0 0 1 4 12z"></path></defs><use fill-rule="evenodd" xlink:href="#comment-tiny"></use></svg>			<span>Форум</span>'+
	'		</a>'+
	'	</div>';
	fignya.appendChild(fignya2);
}