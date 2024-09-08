/** <pre>
 * Reference Tooltips
 *
 * Based on original from [[mw:Reference Tooltips]]
 * @author Cåm
 */

/*jshint
    asi:false, bitwise:true, boss:false, camelcase:true, curly:true,
    eqeqeq:true, es3:false, evil:false, expr:false, forin:true,
    funcscope:false, globalstrict:false, immed:true, indent:4, lastsemic:false,
    latedef:true, laxbreak:false, laxcomma:false, loopfunc:false, multistr:false,
    noarg:true, noempty:true, onevar:true, plusplus:true, quotmark:single,
    undef:true, unused:true, scripturl:false, smarttabs:false, shadow:false,
    strict:true, sub:false, trailing:true, white:true
*/

/*global
    document:true, jQuery:true
*/
(function (document, $) {

    'use strict';

    var tooltipBehaviour = 'hover', // set for testing purposes
        timeout;

    /**
     * Create the tooltip
     */
    function createTooltip(element) {

        var refId,
            tooltipInner,
            tooltipSettings,
            tooltip,
            oH,
            tooltipPos;

        // don't load multiple times
        if ($('.ref-tooltip').length) {
            return;
        }

        // get the id of the element to clone
        refId = element.children[0].href.split('#')[1];

        // clone and remove the link back to the original reference
        tooltipInner = document.getElementById(refId).cloneNode(true);
        tooltipInner.firstElementChild.remove();

        // create the settings link
        tooltipSettings = document.createElement('span');
        tooltipSettings.id = 'rtSettings';
        tooltipSettings.title = 'Open settings';
        tooltipSettings.onclick = function () {
            console.log('open settings');
        };

        // prepend to tooltipInner
        tooltipInner.insertBefore(tooltipSettings, tooltipInner.firstChild);

        // create the tooltip itself
        tooltip = document.createElement('ul');
        tooltip.className = 'ref-tooltip';
        tooltip.appendChild(tooltipInner);

        document.getElementsByTagName('body')[0].appendChild(tooltip);

        oH = tooltip.offsetHeight;

        tooltipPos = $(element).offset();

        $(tooltip).css({
            'top': tooltipPos.top - oH + 5,
            'left': tooltipPos.left - 30
        });

    }

    function hide() {
        timeout = setTimeout(function () {
            $('.ref-tooltip').remove();
        }, 500);
    }

    $(function () {

        // if activated on hover
        if (tooltipBehaviour === 'hover') {

            // from http://stackoverflow.com/a/6638186/1942596
            $('.reference').mouseover(function () {
                clearTimeout(timeout);
                createTooltip(this);
            }).mouseout(hide);

            // this isn't resetting the timeout...
            $('.ref-tooltip').mouseover(function () {
                clearTimeout(timeout);
            }).mouseout(hide);

        }

        // if activated on click
        if (tooltipBehaviour === 'click') {
            $('sup.reference').click(
                function () {
                    createTooltip(this);
                }
            );

            // click away function
            // from http://stackoverflow.com/a/6097052/1942596
            $('body').click(function (e) {
                if (!$(e.target).is('#ref-tooltip')) {
                    $('.ref-tooltip').remove();
                }
            });
        }

    });

}(document, jQuery));

/* </pre> */