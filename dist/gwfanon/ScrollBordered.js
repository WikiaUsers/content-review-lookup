mw.hook('wikipage.content').add(function () {
    $(document).ready(function () {
        var headings = $('h2');

        function generateValidClassName(text) {
            return text.trim()
                       .replace(/\s+/g, '_')     // Replace spaces with underscores
                       .replace(/[^\w-]/g, '')   // Remove all non-word characters except underscores and hyphens
                       .replace(/_+$/g, '');     // Remove trailing underscores
        }

        headings.each(function (index) {
            var heading = $(this);
            var id = heading.attr('id') || generateValidClassName(heading.text());
            heading.attr('id', id); // Ensure the heading has an ID

            var nextHeading = headings.eq(index + 1);
            var content = heading.nextUntil(nextHeading);

            // Find <ul> elements under the headline and add a <div> before each
            content.filter('ul').each(function () {
                var ul = $(this);
                var div = $('<div>').addClass('section-' + id);
                ul.before(div);
                ul.appendTo(div);
            });
        });

        var maxHeight = 299; // Height threshold here

        // For elements with class "scrollBorder"
        $('.scrollBorder').each(function() {
            if ($(this).height() > maxHeight) {
                $(this).addClass('scrollBordered');
            }
        });

        // For elements with class "section-Pojawienia"
        $('.section-Pojawienia').each(function() {
            if ($(this).height() > maxHeight) {
                $(this).addClass('scrollBordered');
            }
        });
    });
});