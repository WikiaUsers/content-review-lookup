/**
 * @module          FandomizedChat
 * @description     This script modernizes and updates the wiki's chat
 *                  in order to add more features.
 *                  -- Legend --
 *                  ~   Legacy features
 *                  +   Updated features
 *                  *   New Features
 * @version         4.1.1
 * @author          Ultimate Dark Carnage
 * @license         CC-BY-SA (Creative Commons)
 **/

// Initializing the FandomizedChat script
(function($, mw, mainRoom, config){
	/**
	 * Checking if the FandomizedChat script has been disabled
	 * and preventing the script from running twice.
	 **/
	if (typeof FandomizedChat !== 'undefined' || config.disabled === true) return;
	
	/**
	 * @class 			FandomizedChat
	 * @description		This is the main object for the FandomizedChat script
	 **/
	var FandomizedChat = {};
	
	/**
	 * @member {Object}			variables
	 * @description				+ This object allows variables to be used within
	 *							the script and be parsed in the chat.
	 * @memberof				FandomizedChat
	 **/
	FandomizedChat.variables = $.extend({}, config.variables);
	
	/**
	 * @member {Object}			fns
	 * @description				+ This object allows functions to be used within the
	 *							script and parsed in the chat.
	 * @memberof				FandomizedChat
	 **/
	FandomizedChat.fns = $.extend({}, config.fns);
	
	/**
	 * @member {Object}			i18n
	 * @description				~ This object allows for translations within the script
	 * @memberof				FandomizedChat
	 **/
	FandomizedChat.i18n = $.extend({}, config.i18n);
	
	/**
	 * @member {Object}			msg
	 * @description				~ This object sets the default object for the messages
	 * @memberof				FandomizedChat
	 **/
	FandomizedChat.msg = (function(i18n){
        var lang = mw.config.get('wgUserLanguage');
        if (typeof lang == 'undefined' || lang === '' || lang === null){
            lang = mw.config.get('wgContentLanguage');
            if (typeof lang == 'undefined' || lang === '' || lang === null){
                lang = 'en';
            }
        }
        return i18n[lang];
    }(FandomizedChat.i18n));
	
	/**
	 * @member {String[]}		plugins
	 * @description				The default plugins (CSS and JavaScript) to load
	 * @memberof				FandomizedChat
	 **/
	FandomizedChat.plugins = (Array.isArray(config.plugins) ? config.plugins : []).concat(['actions.js', 'library.js', 'ui.js', 'options.js', 'core.css', 'ui.css']);
	
	/**
	 * @method					init
	 * @description				Function to load the script
	 * @memberof				FandomizedChat
	 **/
	FandomizedChat.init = function(){
		
	};
}(jQuery, mediaWiki, mainRoom, $.extend({}, window.FC_Config)));