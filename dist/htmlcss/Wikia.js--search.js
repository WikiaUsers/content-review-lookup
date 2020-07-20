/**
 * @module          WikiSearch
 * @description     Creates a search box for the main page
 * @author          Ultimate Dark Carnage
 * @version         1.0.0
 * @license         CC-BY-SA
 **/

// Initializing the object via an anonymous function
(function($, mw, config){
    // Double-run prevention
    if (typeof window.WikiSearch !== 'undefined') return;
    
    /**
     * @class           WikiSearch
     * @description     The primary object for the search box
     **/
    var WikiSearch = {};
    
    /**
     * @member {Object}     config
     * @description         This is the configuration object
     * @memberof            WikiSearch
     **/
    WikiSearch.config = $.extend({
        searchLimit: 15,
        selector: 'div.search-container',
        createBox: true,
        placeholder: 'Search ' + mw.config.get('wgSiteName')
    }, config);
    
    /**
     * @member {Object)     Api
     * @description         The API object for the WikiSearch
     * @memberof            WikiSearch
     **/
    WikiSearch.Api = new mw.Api();
    
    /**
     * @method              createSearchUI
     * @description         The function to create the search UI
     **/
    
}(jQuery, mediaWiki, $.extend({}, window.WikiSearchConfig)));