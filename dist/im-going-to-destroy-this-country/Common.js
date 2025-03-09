/* Any JavaScript here will be loaded for all users on every page load. */
 mw.hook('wikipage.content').add(function($content) {

        const initCarousel = function() {

            let gallery = $content.find('.fandom-gallery-container');
            
            if (gallery.length) {
                let scrollAmount = 350;

                $content.find('.carousel-next').on('click', function() {
                    gallery.animate({
                        scrollLeft: gallery.scrollLeft() + scrollAmount
                    }, 500);
                });

                $content.find('.carousel-prev').on('click', function() {
                    gallery.animate({
                        scrollLeft: gallery.scrollLeft() - scrollAmount
                    }, 500);
                });
            }

        };

        initCarousel();

        $content.on('DOMNodeInserted', '.fandom-gallery-container', initCarousel);

    });