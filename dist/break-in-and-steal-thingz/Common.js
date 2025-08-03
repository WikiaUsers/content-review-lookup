$(function() {
    $('.accordion-header').on('click', function() {
        const $header = $(this);
        const targetId = $header.data('target');
        const $content = $(targetId);

        $header.toggleClass('active');
        $content.toggleClass('active');
    });

    function processAccordionIcons() {
        if ($('.accordion-icon-image').length === 0) {
            console.log("No accordion-icon-image elements found.");
            return;
        }

        $('.accordion-icon-image').each(function() {
            const $originalImageContainer = $(this);
            const imgUrl = $originalImageContainer.find('img').attr('src');

            if (!imgUrl) {
                console.warn("accordion-icon-image found but no img src within it.", $originalImageContainer);
                return;
            }

            const $accordionContent = $originalImageContainer.closest('.accordion-content');
            if (!$accordionContent.length) {
                console.warn("accordion-icon-image not inside an .accordion-content.", $originalImageContainer);
                return;
            }

            const contentId = '#' + $accordionContent.attr('id');
            if (!contentId) {
                console.warn(".accordion-content found but no ID attribute.", $accordionContent);
                return;
            }

            const $accordionHeader = $(`[data-target="${contentId}"]`);
            if (!$accordionHeader.length) {
                console.warn(`No matching accordion header found for content ID ${contentId}`);
                return;
            }

            const $accordionTitleSpan = $accordionHeader.find('.accordion-title');
            if ($accordionTitleSpan.length) {
                if ($accordionTitleSpan.find('.accordion-icon').length === 0) {
                    $accordionTitleSpan.prepend(`<img src="${imgUrl}" class="accordion-icon">`);
                    console.log(`Icon added to accordion header for ${contentId}`);
                }
            } else {
                console.warn(`No .accordion-title span found in header for ${contentId}`);
            }

            $originalImageContainer.remove();
        });
    }

    setTimeout(processAccordionIcons, 500);
});