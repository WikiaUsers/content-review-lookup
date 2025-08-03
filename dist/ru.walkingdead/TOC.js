/**
 * Скрипт для улучшения оглавления (TOC) на вики
 * Назначение: Автоматическое сворачивание вложенных разделов TOC и будущие улучшения
 * Применяется на всех страницах, где есть __TOC__
 * Автор: [[Участник:DALunaa]]
 */

mw.loader.using('jquery', function () {
	$(function () {
		function enhanceTOC($toc) {
			$toc.find('ul li').each(function () {
				const $li = $(this);
				const $subList = $li.children('ul');
				const $link = $li.children('a').first();

				if ($subList.length && $link.length && !$li.hasClass('toc-processed')) {
					$li.addClass('toc-processed');

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
		}

		// Применяем к обычному TOC
		const $toc = $('#toc');
		if ($toc.length) {
			enhanceTOC($toc);
		}

		// Настраиваем наблюдатель за появлением Sticky TOC
		const observer = new MutationObserver((mutations, obs) => {
			const $stickyTOC = $('#sticky-toc');
			if ($stickyTOC.length) {
				if (!$stickyTOC.hasClass('toc-enhanced')) {
					$stickyTOC.addClass('toc-enhanced');
					enhanceTOC($stickyTOC);
				}
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
});