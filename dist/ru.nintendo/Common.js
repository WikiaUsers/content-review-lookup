// Карусель
require(['wikia.window'], function(window) {
    var document = window.document;
   
    var initialBias = -5; // смещение == отступу первой картинки
    var elementWidth = 170; // настоящая ширина + отступы
    var visibleSlides = 3; // сколько слайдов видно
    var slidingTime = 600; // на сколько блокировать кнопки прокрутки
    var scrollingWidth = elementWidth * visibleSlides;
 
    var $slider = document.querySelector('.carousel-slider');
    var $sliding = $slider.querySelector('ul');
    var $prev = document.createElement('button');
    var $next = document.createElement('button');
 
    $prev.className = 'prev fa fa-arrow-circle-left';
    $next.className = 'next fa fa-arrow-circle-right';
 
    $slider.insertBefore($prev, $slider.firstChild);
    $slider.appendChild($next);
 
    $sliding.style.left = initialBias.toString() + 'px';
    var minBias = initialBias;
    var maxBias = -($sliding.children.length - visibleSlides) * elementWidth;
    var currentBias = initialBias;
    $prev.style.visibility = 'hidden';
 
    function lock_buttons() {
        $prev.disabled = true;
        $next.disabled = true;
    }
 
    function unlock_buttons() {
        $prev.disabled = false;
        $next.disabled = false;
    }
 
    $next.addEventListener('click', function() {
        lock_buttons();
        $prev.style.visibility = 'initial';
        currentBias -= scrollingWidth;
        if (currentBias <= maxBias) {
            currentBias = maxBias;
            $next.style.visibility = 'hidden';
        }
 
        $sliding.style.left = currentBias.toString() + 'px';
        setTimeout(unlock_buttons, slidingTime);
    });
 
    $prev.addEventListener('click', function() {
        lock_buttons();
        $next.style.visibility = 'initial';
        currentBias += scrollingWidth;
        if (currentBias >= minBias) {
            currentBias = minBias;
            $prev.style.visibility = 'hidden';
        }
 
        $sliding.style.left = currentBias.toString() + 'px';
        setTimeout(unlock_buttons, slidingTime);
    });
});