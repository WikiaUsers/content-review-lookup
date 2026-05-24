// Taken from wikicorporate RU https://wikicorporate.fandom.com/ru/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%B9%D0%BD%D1%8B%D0%B9_%D0%9A%D0%BE%D1%80%D0%BF%D0%BE%D1%80%D0%B0%D1%82_%D0%92%D0%B8%D0%BA%D0%B8

const $window = $(window);
const $document = $(document);
const $html = $('html');

const isPastHalfway = () => {
    const breakY = ($document.height() - $window.height()) * 0.5;
    return $window.scrollTop() > breakY;
};

const scrollButton = $('<a>', {
    class: 'scroll-button scroll-button--bottom',
}).appendTo('#WikiaBar');

const handleScrollTo = (e) => {
    e.preventDefault();
    const reachHalf = isPastHalfway();
    $html.animate({ scrollTop: reachHalf ? 0 : $document.height() }, 10);
};

scrollButton.on('click', handleScrollTo);

let ticking = false;

$window.on('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const reachHalf = isPastHalfway();
            
            if (reachHalf) {
                scrollButton.removeClass('scroll-button--bottom').addClass('scroll-button--top');
            } else {
                scrollButton.removeClass('scroll-button--top').addClass('scroll-button--bottom');
            }
            
            ticking = false;
        });
        ticking = true;
    }
});