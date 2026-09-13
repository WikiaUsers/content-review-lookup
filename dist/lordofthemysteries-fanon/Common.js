$(function () {

    /*
     * =========================================================
     * SHARED HOVER POSITIONING
     * =========================================================
     */

    function positionHover(card, event) {
        var offsetX = 16;
        var offsetY = 26;

        var left = event.clientX + offsetX;
        var top = event.clientY + offsetY;

        card.show();

        var cardWidth = card.outerWidth();
        var cardHeight = card.outerHeight();

        // Move left if the card would go off-screen
        if (left + cardWidth > window.innerWidth - 10) {
            left = event.clientX - cardWidth - offsetX;
        }

        // Move upward if the card would go off-screen
        if (top + cardHeight > window.innerHeight - 10) {
            top = event.clientY - cardHeight - offsetY;
        }

        card.css({
            left: left + 'px',
            top: top + 'px'
        });
    }



    /*
     * =========================================================
     * PATHWAY HOVERS
     * =========================================================
     *
     * Uses delegated events so pathway links continue working
     * even if Fandom reloads or rebuilds page content.
     * =========================================================
     */

    function preparePathwayCard(hover) {

        var card = hover.data('pathway-hover-card');

        /*
         * If we've already prepared this card,
         * just return it.
         */

        if (card && card.length) {
            return card;
        }


        /*
         * Find the card while it is still inside
         * the pathway-hover wrapper.
         */

        card = hover.find('.pathway-hover-card').first();

        if (!card.length) {
            return null;
        }


        /*
         * Save reference before moving it to body.
         */

        hover.data('pathway-hover-card', card);


        /*
         * Put card directly under body.
         */

        card.appendTo(document.body);


        /*
         * CARD
         */

        card.css({
            position: 'fixed',
            zIndex: 99999,

            width: '315px',
            padding: '11px 13px 13px',

            background: 'rgba(38, 38, 38, 0.58)',

            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',

            border: '1px solid rgba(190, 190, 190, 0.32)',
            borderRadius: '5px',

            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.24)',

            color: '#d5d5d5',
            textAlign: 'left',

            pointerEvents: 'none',
            display: 'none'
        });


        /*
         * PATHWAY TITLE
         */

        card.find('.pathway-hover-title').css({
            display: 'block',

            marginBottom: '7px',

            fontSize: '17px',
            fontWeight: '650',
            lineHeight: '1.2',

            textAlign: 'center',
            textTransform: 'uppercase'
        });


        /*
         * PATHWAY BODY
         */

        card.find('.pathway-hover-body').css({
            display: 'flex',
            alignItems: 'center',

            minHeight: '72px'
        });


        /*
         * PATHWAY SYMBOL
         */

        card.find('.pathway-hover-symbol').css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            width: '76px',
            minWidth: '76px',

            marginRight: '11px'
        });


        card.find('.pathway-hover-symbol img').css({
            width: '70px',
            height: '70px',

            maxWidth: '70px',
            maxHeight: '70px',

            objectFit: 'contain'
        });


        /*
         * PATHWAY DESCRIPTION
         */

        card.find('.pathway-hover-description').css({
            display: 'block',

            flex: '1',
            minWidth: '0',

            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '1.42',

            color: 'rgba(215, 215, 215, 0.82)'
        });


        return card;
    }



    /*
     * =========================================================
     * PATHWAY EVENTS
     * =========================================================
     */

    $(document)
        .off('.pathwayHover')

        /*
         * ENTER
         */

        .on(
            'mouseenter.pathwayHover',
            '.pathway-hover',
            function () {

                var hover = $(this);

                /*
                 * Remove normal browser tooltip.
                 */

                hover
                    .find('[title]')
                    .addBack('[title]')
                    .removeAttr('title');

                preparePathwayCard(hover);
            }
        )


        /*
         * FOLLOW CURSOR
         */

        .on(
            'mousemove.pathwayHover',
            '.pathway-hover',
            function (event) {

                var hover = $(this);

                var card = preparePathwayCard(hover);

                if (!card || !card.length) {
                    return;
                }

                positionHover(card, event);
            }
        )


        /*
         * HIDE CARD
         */

        .on(
            'mouseleave.pathwayHover',
            '.pathway-hover',
            function () {

                var hover = $(this);

                var card = hover.data('pathway-hover-card');

                if (card && card.length) {
                    card.hide();
                }
            }
        );



    /*
     * =========================================================
     * SEQUENCE HOVER
     * =========================================================
     *
     * ONE hover card is reused for every Sequence link.
     *
     * This avoids creating hundreds of hidden cards
     * on pages such as List of Beyonders.
     *
     * It also uses delegated events so Fandom can
     * dynamically reload page content without breaking it.
     * =========================================================
     */


    var sequenceCard = $('<div>')
        .addClass('sequence-hover-generated-card')
        .appendTo(document.body)
        .hide();


    sequenceCard.css({
        position: 'fixed',
        zIndex: 99999,

        width: '315px',
        padding: '11px 13px',

        background: 'rgba(38, 38, 38, 0.58)',

        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',

        border: '1px solid rgba(190, 190, 190, 0.32)',
        borderRadius: '5px',

        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.24)',

        color: '#d5d5d5',

        pointerEvents: 'none',
        display: 'none'
    });



    /*
     * =========================================================
     * BUILD SEQUENCE CARD
     * =========================================================
     */

    function buildSequenceCard(hover) {

        var pathway =
            hover.attr('data-pathway') || '';

        var rank =
            hover.attr('data-sequence-rank') || '';

        var sequenceName =
            hover.attr('data-sequence-name') || '';

        var symbolFile =
            hover.attr('data-symbol-file') || '';

        var hoverType =
            hover.attr('data-hover-type') || 'sequence';


        /*
         * JavaScript does NOT decide Great Old One colors.
         *
         * Module:Sequence supplies data-goo-color.
         */

        var titleColor =
            hover.attr('data-goo-color') || '#ffffff';


        /*
         * EMPTY OLD CARD
         */

        sequenceCard.empty();


        /*
         * BODY
         */

        var body = $('<div>')
            .css({
                display: 'flex',
                alignItems: 'center',

                minHeight: '72px'
            })
            .appendTo(sequenceCard);


        /*
         * SYMBOL AREA
         */

        var symbolArea = $('<div>')
            .css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                width: '70px',
                minWidth: '70px',

                marginRight: '12px'
            })
            .appendTo(body);


        /*
         * SYMBOL IMAGE
         */

        if (symbolFile) {

            $('<img>')
                .attr(
                    'src',
                    mw.util.getUrl(
                        'Special:Redirect/file/' + symbolFile
                    )
                )
                .css({
                    width: '60px',
                    height: '60px',

                    maxWidth: '60px',
                    maxHeight: '60px',

                    objectFit: 'contain'
                })
                .appendTo(symbolArea);

        }


        /*
         * TEXT AREA
         */

        var info = $('<div>')
            .css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',

                flex: '1',
                minWidth: '0'
            })
            .appendTo(body);


        /*
         * PATHWAY TITLE
         */

        $('<div>')
            .text(pathway)
            .css({
                marginBottom: '12px',

                fontSize: '17px',
                fontWeight: '700',
                lineHeight: '1.2',

                textTransform: 'uppercase',

                color: titleColor
            })
            .appendTo(info);


        /*
         * SEQUENCE INFORMATION
         */

        var bottomText = '';

        if (hoverType === 'ats') {

            bottomText = rank;

        } else {

            bottomText =
                'Sequence ' +
                rank +
                ' - ' +
                sequenceName;

        }


        $('<div>')
            .text(bottomText)
            .css({
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '1.35',

                color: 'rgba(220, 220, 220, 0.88)'
            })
            .appendTo(info);
    }



    /*
     * =========================================================
     * SEQUENCE EVENTS
     * =========================================================
     */

    $(document)
        .off('.sequenceHover')

        /*
         * ENTER
         */

        .on(
            'mouseenter.sequenceHover',
            '.sequence-hover',
            function () {

                var hover = $(this);

                /*
                 * Remove native browser tooltip.
                 */

                hover
                    .find('[title]')
                    .addBack('[title]')
                    .removeAttr('title');

                buildSequenceCard(hover);
            }
        )


        /*
         * FOLLOW CURSOR
         */

        .on(
            'mousemove.sequenceHover',
            '.sequence-hover',
            function (event) {

                var hover = $(this);

                /*
                 * Rebuild if we're hovering
                 * a different sequence link.
                 */

                if (
                    sequenceCard.data('current-hover') !== this
                ) {

                    sequenceCard.data(
                        'current-hover',
                        this
                    );

                    buildSequenceCard(hover);
                }

                positionHover(
                    sequenceCard,
                    event
                );

            }
        )


        /*
         * HIDE CARD
         */

        .on(
            'mouseleave.sequenceHover',
            '.sequence-hover',
            function () {

                sequenceCard.hide();

                sequenceCard.removeData(
                    'current-hover'
                );

            }
        );

});