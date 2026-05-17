$(function () {
	var isAnimating = false;

	$('.mpb-inner[data-link]').click(function () {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		var link = $(this).attr('data-link');
		var $view = $('.mpb-view.mpb-' + link);

		$('.mpb-view.mpb-active-view').removeClass('mpb-active-view');
		$view.addClass('mpb-active-view');

		requestAnimationFrame(function () {
			$('.mpb-slider').addClass('mpb-open');
		});

		setTimeout(function () {
			isAnimating = false;
		}, 300);
	});

	$('.mpb-view-back').click(function () {
		if (isAnimating) {
			return;
		}

		isAnimating = true;

		var $view = $(this).closest('.mpb-view');

		$('.mpb-slider').removeClass('mpb-open');

		setTimeout(function () {
			$view.removeClass('mpb-active-view');
			isAnimating = false;
		}, 300);
	});

	$('.mpb-subcat-link[data-link]').click(function () {
		var link = $(this).attr('data-link');
		var $view = $(this).closest('.mpb-view');

		$(this).parent().find('.mpb-subcat-link').removeClass('mpb-active');
		$view.find('.mpb-subcat').removeClass('mpb-active');

		$(this).addClass('mpb-active');
		$view.find('.mpb-subcat.mpb-' + link).addClass('mpb-active');
	});

	$('.mpb-subcat-link[data-gwent]').click(function () {
		window.open('http://gwint.wikia.com/wiki/Gwint_Wiki', '_blank').focus();
	});

	$('.mpb-subcat-link[data-blog]').click(function () {
		window.open('http://wiedzmin.wikia.com/wiki/Blog_u%C5%BCytkownika:Ruttou/Jak_czyta%C4%87_wied%C5%BAmina%3F', '_blank').focus();
	});
});