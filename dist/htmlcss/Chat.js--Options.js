/* <syntaxhighlight lang="javascript"> */
/* Modified by Ultimate Dark Carnage */
/**
 * ChatOptions
 * Change how Special:Chat looks and functions using an interface.
 * Uses cookies to store the changes.
 * A potential solution to all your chathacks problems.
 *
 * Many thanks to the Call of Duty Wiki Chat,
 * who supported and helped this the whole way through.
 * It has been much appreciated. Thank you!
 *
 * WARNING
 * Make sure you are not loading MediaWiki:Chat.js/load.js 
 * with MediaWiki:Chat-edit-count.
 * Load it with MediaWiki:Chat-welcome-message, or this
 * will malfunction badly.
 * TODO: Improve user interface
 *
 * @version 1.3.1
 * @author Callofduty4
 * @author Madnessfan34537
 * @author Sactage <sactage@gmail.com>
 */

/**
 * Setting the Options object
 */

window.Options = window.Options || {};
 
/**
 * Function to set a cookie
 * @param cookie_name A string representing the cookie's name
 * @param data The value of the cookie to be set
 */

Options.setCookie = Options.setCookie || function setCookie(cookie_name, data){
    var domain = mw.config.get('wgServer', wgServer).split('//')[1];
    document.cookie = 
        cookie_name + '=' + data +
        '; max-age=' + 60 * 60 * 24 * 150 + 
        '; path=/; domain=' + domain;
};

/**
 * Function to get a cookie's value
 * @param cookie_name A string representing the cookie's name
 * @param pos The index of the value to get from the cookie
 * @return The string value of the cookie
 */
 
Options.getCookie = Options.getCookie || function getCookie(cookie_name, pos){
    var x, y, cookie_array = document.cookie.split(";");
	for (var i=0; i < cookie_array.length; i++) {
		x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
		y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookie_name) {
			var style_objects = y.split(", ");
			return unescape(style_objects[pos]);
		}
	}
};

/**
 * Creating object to store chat
 * customization options as an object
 */
 
Options.modules = {
    style: {
        "Font Color": Options.getCookie('customization', 0),
        "Font Face": Options.getCookie('customization', 1),
        "Chat Background": Options.getCookie('customization', 2),
        "Self-Post Color": Options.getCookie('customization', 3),
        "Surround Color": Options.getCookie('customization', 4)
    },
    features: {
        "AFK": {
            element: '#AFK_check',
            enabled: true,
            loaded: false,
            load: function(){
                var afk_button = $('<a />', {
                    'class': 'AFKButton afk-button',
                    'id': 'AFKButton',
                    on: {
                        'click': function(event){
                            
                        }
                    }
                });
                
            }
        },
        "Pings": {
            load: function(){
                var pingModule = '';
                var ping_list = $('<div />', {
                    'class': 'GlobalLink GlobalModuleContainer table-cell',
                    'id': 'PingsLink',
                    html: $('<a />', {
                        'class': 'global-link link',
                        text: 'Pings'
                    })
                }).append( $('<section />', { 'class': 'GlobalModule global-module', html: pingModule }) );
            }
        },
        "Multi-Kick": {},
        "Multi-Ban": {},
        "Multi-PM": {},
        "Stop Side-Scroll": {},
        "Message Blocker": {}
    }
};

Options.update = Options.update || function update(){
    $('body').css('background', ((typeof Options.style['Chat Background'] == 'function') ? Function.prototype.apply.call(Options.style['Chat Background'], window, []) : Options.style['Chat Background']));
};