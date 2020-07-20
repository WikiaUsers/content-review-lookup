// ==========================================================================
// Collapse
//    Implements expandable/collapsable regions in the same style as
//    the all wiki activity page
//
// Version 1.0.0
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function ($) {
    /*global mw*/
    'use strict';

    var rightImageSrc = mw.config.get('stylepath') + '/common/images/Arr_r.png';
    var downImageSrc = mw.config.get('stylepath') + '/common/images/Arr_d.png';

    function clickArrow() {
        /*jshint -W040 */ // allow old school jquery use of this
        var that = $(this);
        var collapsee = that.closest('.mdw-collapse-row').find('.mdw-collapsable');
        if (that.hasClass('mdw-expanded')) {
            that.removeClass('mdw-expanded').children(':first').attr('src', rightImageSrc);
            collapsee.hide();
        } else {
            that.addClass('mdw-expanded').children(':first').attr('src', downImageSrc);
            collapsee.fadeIn(300).find('a').attr('target', '_blank');
        }
    }

    function initialize() {
        $('.mdw-arrow-collapse')
            .html($('<img>', {src: rightImageSrc}))
            .click(clickArrow);
    }

    $(document).ready(initialize);

}(jQuery));