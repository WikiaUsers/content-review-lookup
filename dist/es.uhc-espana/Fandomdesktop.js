// McboxSlot: Animación secuencial
$(function() {
    $('.animated').each(function() {
        const $anim = $(this);
        const $frames = $anim.children('span, .mcbox'); // Asegurar compatibilidad con ambos formatos
        if ($frames.length <= 1) return;

        let index = 0;
        let intervalId = null;

        // Función para iniciar la animación
        const startAnimation = () => {
            intervalId = setInterval(() => {
                $frames.eq(index).removeClass('animated-active');
                index = (index + 1) % $frames.length;
                $frames.eq(index).addClass('animated-active');
            }, 2000);
        };

        // Función para detener la animación
        const stopAnimation = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        // Iniciar animación
        $frames.removeClass('animated-active');
        $frames.first().addClass('animated-active');
        startAnimation();

        // Pausar al pasar el ratón
        $anim.on('mouseenter', stopAnimation);
        $anim.on('mouseleave', startAnimation);
    });
});