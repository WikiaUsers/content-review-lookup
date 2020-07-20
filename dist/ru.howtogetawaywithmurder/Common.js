/*global require */
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Карусель */
require(['jquery'], function($) {
	$('.carousel-slider').each(function() {
		var $this = $(this);
		if ($this.hasClass('not-carousel')) 
            return;
		
		$this
		.prepend('<button class="prev"></button>')
		.append('<button class="next"></button>');
 
		var scroll;
		var $overflow = $this.find('.overflow'),
			$next = $this.find('.next'),
			$prev = $this.find('.prev'),
			$slides = $this.find('ul'),
			scrolling = $overflow.width();
 
		// Кнопки
		$next.click(function() {
			if ($overflow.is(':animated'))
				return;
			scroll = $overflow.scrollLeft() + scrolling;
			$overflow.animate({
				scrollLeft: scroll
			}, 500);
			scroll = $overflow.scrollLeft();
			if (scroll + $overflow.innerWidth() + scrolling >= $overflow[0].scrollWidth)
				$next.hide();
			$prev.show();
		});
		$prev.hide().click(function() {
			if ($overflow.is(':animated'))
				return;
			scroll = $overflow.scrollLeft() - scrolling;
			$overflow.animate({
				scrollLeft: scroll
			}, 500);
			scroll = $overflow.scrollLeft();
			if (scroll <= scrolling)
				$prev.hide();
			$next.show();
		});
	});
});