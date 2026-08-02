mw.hook('wikipage.content').add(function () {
    $(document).ready(function () {
        var headings = $('h2');

        function generateValidClassName(text) {
            return text.trim()
                .replace(/\s+/g, '_')    // Zamienia spacje na podkreślniki
                .replace(/[^\w-]/g, '')  // Usuwa znaki inne niż litery, cyfry, _ i -
                .replace(/_+$/g, '');    // Usuwa końcowe podkreślniki
        }

        headings.each(function (index) {
            var heading = $(this);
            var id = heading.attr('id') ||
                generateValidClassName(heading.text());

            // Upewnia się, że nagłówek ma ID
            heading.attr('id', id);

            var nextHeading = headings.eq(index + 1);
            var content;

            if (nextHeading.length) {
                content = heading.nextUntil(nextHeading);
            } else {
                content = heading.nextAll();
            }

            // Znajduje listy <ul> bezpośrednio pod danym nagłówkiem
            content.filter('ul').each(function () {
                var ul = $(this);
                var sectionClass = 'section-' + id;

                // Zapobiega ponownemu opakowywaniu tej samej listy
                if (!ul.parent().hasClass(sectionClass)) {
                    var div = $('<div>').addClass(sectionClass);

                    ul.before(div);
                    ul.appendTo(div);
                }
            });
        });

        var maxHeight = 299;

        /**
         * Sprawdza wysokość wskazanych elementów.
         *
         * Klasa jest wyłącznie dodawana, a nie usuwana,
         * ponieważ ukryty element może chwilowo mieć wysokość 0.
         */
        function updateScrollBorders(scope) {
            var elements;

            if (scope && scope.length) {
                elements = scope
                    .find('.scrollBorder, .section-Pojawienia')
                    .add(
                        scope.filter(
                            '.scrollBorder, .section-Pojawienia'
                        )
                    );
            } else {
                elements = $(
                    '.scrollBorder, .section-Pojawienia'
                );
            }

            elements.each(function () {
                var element = $(this);

                if (element.height() > maxHeight) {
                    element.addClass('scrollBordered');
                }
            });
        }

        /*
         * Stary mechanizm:
         * sprawdza od razu wszystkie istniejące szablony,
         * dokładnie tak jak wcześniej.
         */
        updateScrollBorders($(document));

        /*
         * Nowy mechanizm:
         * ponownie sprawdza elementy po rozwinięciu
         * dowolnego mw-collapsible.
         */
        $(document)
            .off(
                'afterExpand.mw-collapsible.scrollBorder'
            )
            .on(
                'afterExpand.mw-collapsible.scrollBorder',
                '.mw-collapsible',
                function () {
                    updateScrollBorders($(this));
                }
            );

        /*
         * Zapasowa obsługa dla niestandardowego przełącznika
         * dolnych sekcji na wypadek, gdyby Fandom nie przekazał
         * zdarzenia afterExpand do delegowanego handlera.
         */
        $(document)
            .off(
                'click.scrollBorderFallback',
                '.dolna-sekcja__nagłówek'
            )
            .on(
                'click.scrollBorderFallback',
                '.dolna-sekcja__nagłówek',
                function () {
                    var section = $(this).closest(
                        '.dolna-sekcja'
                    );

                    setTimeout(function () {
                        if (
                            !section.hasClass('mw-collapsed')
                        ) {
                            updateScrollBorders(section);
                        }
                    }, 0);
                }
            );
    });
});