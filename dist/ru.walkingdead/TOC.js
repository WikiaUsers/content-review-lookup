/**
 * Скрипт для улучшения оглавления (TOC) на вики
 * Назначение: Автоматическое сворачивание вложенных разделов TOC и будущие улучшения
 * Применяется на всех страницах, где есть __TOC__
 * Автор: [[Участник:DALunaa]]
 */


mw.loader.using('jquery', function () {
	$(function () {
		const $toc = $('#toc');
		if (!$toc.length) return;

		$toc.find('ul li').each(function () {
			const $li = $(this);
			const $subList = $li.children('ul');
			const $link = $li.children('a').first();

			if ($subList.length && $link.length) {
				$subList.hide();

				const $wrapper = $('<span class="toc-link-wrapper" style="display: inline-flex; justify-content: space-between; align-items: center; width: 100%;"></span>');
				const $toggle = $('<span class="toc-toggle" style="cursor:pointer; margin-left:auto; margin-right:4px;">[+]</span>');

				$toggle.on('click', function (e) {
					e.stopPropagation();
					e.preventDefault();
					$subList.toggle();
					$toggle.text($subList.is(':visible') ? '[–]' : '[+]');
				});

				$link.wrap($wrapper);
				$link.parent().append($toggle);
			}
		});
	});
});