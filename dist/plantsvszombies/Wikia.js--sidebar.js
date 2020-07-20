;(function ($, mw) {
    'use strict';
 
    // add module for net neutrality
    function addNNModule() {
        $('<section>')
            .attr({
                'id': 'net-neutrality',
                'class': 'rsw-custom-module rail-module'
            })
            .append(
                $('<div />').append(
                    $('<h2 />').text('Save the open Internet'),
                    $('<p />').text(
                        'On 14 December, the FCC will vote to abolish net neutrality and hand power over the content you browse to your internet providers. This will have a lasting impact worldwide – help save the open Internet by clicking below.'
                    ),
                    $('<div />').append(
                        $('<a />')
                            .attr('href', 'https://www.battleforthenet.com/')
                            .addClass('wds-button')
                            .text('Learn more')
                    )
                )
            )
            .insertBefore('#wikia-recent-activity');
    }
    addNNModule();
})(window.jQuery, window.mediaWiki);