// McboxSlot: Animación secuencial
$(function() {
	$('.animated').each(function() {
		const $anim = $(this);
		const $frames = $anim.children('span');
		if ($frames.length <= 1) return;

		let index = 0;
		$frames.removeClass('animated-active');
		$frames.first().addClass('animated-active');

		const interval = setInterval(() => {
			$frames.eq(index).removeClass('animated-active');
			index = (index + 1) % $frames.length;
			$frames.eq(index).addClass('animated-active');
		}, 2000); // Cambia cada 2 segundos

		// Opcional: pausar al pasar el ratón
		$anim.on('mouseenter', () => clearInterval(interval));
		$anim.on('mouseleave', () => {
			clearInterval(interval);
			const newInterval = setInterval(() => {
				$frames.eq(index).removeClass('animated-active');
				index = (index + 1) % $frames.length;
				$frames.eq(index).addClass('animated-active');
			}, 2000);
		});
	});
});