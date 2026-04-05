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