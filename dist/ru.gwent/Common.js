/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Колода: добавить в MediaWiki:Common.js (без него шаблон тоже работает, через :target) */
mw.hook('wikipage.content').add(function ($content) {
	$content.find('.gd-wrap').each(function () {
		var wrap = this, $wrap = $(this), justClicked = false;
		$wrap.addClass('gd-js');

		function show(id) {
			var target = document.getElementById(id);
			if (!target || target.parentNode !== wrap) { return null; }
			var oldMid = $wrap.children('.gd-state').filter(function () { return this.style.display !== 'none'; }).find('.gd-mid')[0];
			var scroll = oldMid ? oldMid.scrollTop : 0;
			$wrap.children('.gd-state').each(function () {
				this.style.display = (this === target) ? 'block' : 'none';
			});
			var mid = $(target).find('.gd-mid')[0];
			if (mid) { mid.scrollTop = scroll; }
			return target;
		}

		function clearGreen() { $wrap.find('.gd-green').removeClass('gd-green'); }

		// клик по кнопке: открыть состояние, новую кнопку подсветить зелёным
		$wrap.on('click', 'a[href^="#gd-"]', function (e) {
			e.preventDefault();
			var target = show(this.getAttribute('href').slice(1));
			if (!target) { return; }
			clearGreen();
			$(target).find('.gd-new').addClass('gd-green');
			justClicked = true;
		});

		// клик в любое другое место: зелёное становится жёлтым (выбрано)
		$(document).on('click', function () {
			if (justClicked) { justClicked = false; return; }
			clearGreen();
		});

		// если открыли страницу со ссылкой вида #gd-a-armor
		var hash = (location.hash || '').slice(1);
		if (hash.indexOf('gd-') === 0 && show(hash)) {
			history.replaceState(null, '', location.pathname + location.search);
		}
	});
});