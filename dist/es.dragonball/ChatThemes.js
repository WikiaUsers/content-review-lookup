/**chatThemes
 * 
 * @author: Saektide <astreuk0saektide@gmail.com>
 * @desc: change the Chat theme with a simple button
 * @version: 1.1
**/
;if (mw.config.get("wgCanonicalSpecialPageName") == "Chat") {
    var chatThemes = {};
    chatThemes.darkActive = false;
    chatThemes.alt = function() {
        if (chatThemes.darkActive !== true) {
            $(".ChatWindow").addClass("nightMode");
            chatThemes.darkActive = true,
            $('.change-theme-button').text('Modo diurno');
        } else {
            $(".ChatWindow").removeClass("nightMode");
            chatThemes.darkActive = false;
            $('.change-theme-button').text('Modo nocturno');
        }
    };
    chatThemes.init = function() {
        $('.Rail').append('<div class="change-theme-button button">Modo nocturno</div>');
        mw.util.addCSS('.change-theme-button {position: absolute;bottom: 0;left: 0;right: 0;text-align: center;}');
    };
    chatThemes.init();
    $('.change-theme-button').click(chatThemes.alt);
}