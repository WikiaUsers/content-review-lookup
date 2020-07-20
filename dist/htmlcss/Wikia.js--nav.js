/**
 * @module          Navigation
 * @description     Creating a navigation element through
 *                  AJAX.
 * @author          Ultimate Dark Carnage
 * @version         1.0.0
 * @license         CC-BY-SA (Creative Commons)
 **/
 
// Initializing the function
(function($, mw, API, config){
    // Double-run prevention
    if (typeof window.HCNav !== 'undefined') return;
    /**
     * @class           HCNav
     * @description     This is the main object for the wiki's
     *                  navigation.
     **/
    var HCNav = {};
    /**
     * @member {Number}         limit
     * @description             The maximum amount of links that
     *                          can be shown.
     * @memberof                HCNav
     **/
    HCNav.limit = config.limit || 150;
    /**
     * @member {String}         targetPage
     * @description             The target page to get all category
     *                          members from.
     * @memberof                HCNav
     **/
    HCNav.targetPage = '';
    /**
     * @member {jQuery}         $target
     * @description             The target DOM element to create
     *                          the navigation from
     * @memberof                HCNav
     **/
    HCNav.$target = $('.HCNav-container');
}(jQuery, mediaWiki, new mw.Api(), $.extend({}, window.HCNavConfig)));