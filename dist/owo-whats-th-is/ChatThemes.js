/**
 * 
 * ChatThemes
 * ----------
 * Switches a theme with a simple button.
 * NOTE: This only work on Chat.
 * 
 * @version 1.0
 * @author Saektide <astreuk0saektide@gmail.com>
**/

;if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
    // Obj
    var chatThemes = {
        themes: [ // Default theme
            night = {
                name: 'Nightmode',
                class: 'nightmode'
            }
        ],
        func: {}, //Functions
        count: 0, //Count
        i18n: { //i18n support
            en: {
                current: 'Current theme',
                change: 'Change theme',
                require_err: 'ChatThemes requires at least 1 theme.',
                bydefault: 'Default'
            },
            es: {
                current: 'Tema actual',
                change: 'Cambiar tema',
                require_err: 'ChatThemes requiere por lo menos 1 tema.',
                bydefault: 'Por defecto'
            }
        }
    };
    // Check if local wiki uses custom themes
    try {
		var config = window.ChatThemes;
		if (config.themes instanceof Object) {
			chatThemes.themes = config.themes;
		}
	} catch(err) {}
	// Check lang, default is "en"
    var lang = chatThemes.i18n[mw.config.get('wgUserLanguage')] || chatThemes.i18n.en;
    // Switch theme
    chatThemes.func.setTheme = function(){
        // If count == max number
        if (chatThemes.count == chatThemes.themes.length) {
            $('.ChatWindow').removeClass(chatThemes.themes[chatThemes.count - 1].class);
            chatThemes.count = 0;
            console.log(lang.current+': '+lang.bydefault);
            return;
        }
        // Add class
        $('.ChatWindow').addClass(chatThemes.themes[chatThemes.count].class);
        // Remove class
        if (chatThemes.count >=1) {
            $('.ChatWindow').removeClass(chatThemes.themes[chatThemes.count - 1].class);
        }
        
        currentTheme = chatThemes.themes[chatThemes.count].name;
        console.log(lang.current+': '+currentTheme);
        
        chatThemes.count += 1;
    };
    // Init function
    chatThemes.func.init = function(){
        $('.Rail').append('<div class="change-theme-button button">'+lang.change+'</div>');
        mw.util.addCSS('.change-theme-button {position: absolute; bottom: 0; left: 0; right: 0; text-align: center;}');
    };
    // If theme list is empty
    if (chatThemes.themes.length === 0) {
        console.error(lang.require_err);
    } else {
        chatThemes.func.init();
        $('.change-theme-button').click(chatThemes.func.setTheme);
    }
}