;(function ($, mw) {
    'use strict';
 
    // add module for the upcoming SpongeBob year
    function addNNModule() {
        $('<section>')
            .attr({
                'id': 'anniversary',
                'class': 'rsw-custom-module rail-module'
            })
            .append(
                $('<div />').append(
                    $('<h2 />').text('Drop by and celebrate!'),
                    $('<p />').text(
                        'After nearly twenty years of success, SpongeBob SquarePants will broadcast a new set of episodes, season twelve. Reflecting on accomplishments and memories. Celebrating the twentieth anniversary. And awaiting the premiere of the third SpongeBob SquarePants movie.'
                    ),
                    $('<div />').append(
                        $('<a />')
                            .attr('href', 'https://www.spongebob.wikia.com/wiki/Portal:Anniversary')
                            .addClass('wds-button')
                            .text('Learn more')
                    )
                )
            )
            .insertBefore('#wikia-recent-activity');
    }
    $(window).load(function(){
        addNNModule();
    });
})(window.jQuery, window.mediaWiki);

// Add template to the upload page
// @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
// @author: Golfpecks256 (http://spongebob.wikia.com/wiki/User:Golfpecks256)
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' || mw.config.get('wgCanonicalSpecialPageName') === 'Images' || mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload') && !$('#wpUploadDescription').val()) {
        jQuery(function ($) {
            'use strict';
            $('#wpUploadDescription').val('[[Category:Images]]');
        });
    }
}