/**
 * @module          RequestForRights
 * @description     Creates a "request for rights" form
 * @author          Ultimate Dark Carnage
 * @version         0.1.0
 * @license         CC-BY-SA
 **/

(function($, mw, config){
    // Double-run protection
    if (window.RFA !== undefined) return;
    /**
     * Creating the main object
     * @class RFA
     **/
    var RFA = {};
    /**
     * Configurations for the "request for adminship" form
     * @member {Object} config
     **/
    RFA.config = $.extend({
        officialResponseGroups: ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop'],
        trustedUsers: []
    }, config);
    /**
     * MediaWiki configuration variables
     * @member {Object} wk
     **/
    RFA.wk = {
        name: mw.config.get('wgUserName'),
        server: mw.config.get('wgServer'),
        lang: mw.config.get('wgUserLanguage') || mw.config.get('wgContentLanguage') || 'en',
        groups: mw.config.get('wgUserGroups')
    };
    /**
     * The target page for the RFA form
     * @member {String} targetPage
     **/
    RFA.targetPage = 'Project:Request For Rights';
    /**
     * The target category for the RFA form
     * @member {String} targetCat
     **/
    RFA.targetCategory = 'Category:Requests for Rights';
    /**
     * Initializing the MediaWiki API
     * @member {mw.Api} API
     **/
    RFA.API = new mw.Api();
    /**
     * Wiki page content
     * @member {jQuery} $content
     **/
    RFA.$content = $('.mw-content-text');
    /**
     * Request For Rights container
     * @member {jQuery} $container
     **/
    RFA.$container = $('.rfa-container').eq(0);
    /**
     * Checking to ensure that the user is trusted to provide an official
     * response
     * @method isTrustedUser
     * @param {String} user     The username to check
     **/
    RFA.isTrustedUser = function(user){
        if (RFA.trustedUsers.indexOf(user) > -1){
            return true;
        }
        return false;
    };
    /**
     * Checking to ensure that the user is in the groups allowed to
     * provide an official response
     * @method inORGroup
     * @param {String} user     The username to check
     **/
    RFA.inORGroup = function(user){
        for (var index = 0, items = RFA.officialResponseGroups; index < items.length; index++){
            var groups = RFA.wk.groups;
            if (groups.indexOf(items[index]) > -1){
                return true;
            }
        }
        return false;
    };
    /**
     * Checking to ensure that the user is allowed to provide an
     * official response
     * @method isORUser
     * @param {String} user     The username to check
     **/
    RFA.isORUser = function(user){
        if (RFA.inORGroup(user) || RFA.isTrustedUser(user)) return true;
        return false;
    };
    /**
     * Creating the Request for Rights form
     * @method createForm
     **/
    RFA.createForm = function(){
        RFA.$container.html($.proxy(function(){
            var $wrapper = $('<div />');
        }, RFA));
    };
}(jQuery, mediaWiki, $.extend({}, window.RFAConfig)));