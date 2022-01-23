/**
 * SpoilersToggle
 * Works with Template:Spoiler to create a section of the article that
 * can be toggled to show/hide
 * Uses cookies to store the state of the spoilers
 * 
 * @Version 2.1.2
 * @Author Tierrie <https://dragonage.fandom.com/wiki/User:Tierrie>
 */
mw.loader.using(['jquery.cookie']).then(function() { 
    if (window.SpoilersToggleLoaded) {
        return;
    }
    window.SpoilersToggleLoaded = true;

    var cookie_id = 'splr_';

    function removeCookie(key) {
        setCookie(key);
    }

    function setCookie(key, value) {
        if (value == "undefined" || value == "null") value = null;
        $.cookie(cookie_id + key, value, { expires: 150, path: '/' });
    }

    function getCookie(key) {
        return $.cookie(cookie_id + key);
    }

    function toggleSpoilers($content, original) {
        if ($content.is(mw.util.$content) && !original) {
            return;
        }

        $content.find('.sp_banner').click(function() {
            var id = $(this).parent().attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1],
            $wrn = $content.find('.sp_id_' + id + ' .sp_wrn'),
            $txt = $content.find('.sp_id_' + id + ' .sp_txt');

            if( $wrn.css('display') == 'none') {
                $wrn.fadeIn(200, function() {
                    $(this).show(200);
                });
                $txt.hide(0);
                setCookie(id, 'hide');
            } else {
                $wrn.fadeOut(200, function() {
                    $(this).hide(200);
                });
                $txt.delay(200).show(0);
                setCookie(id, 'show');
            }
        });

        var sp_on_page = {};
        $content.find('.sp').each(function() {
            var id = $(this).attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
            sp_on_page[id] = undefined;
        });
        for (var id in sp_on_page) {
            if (getCookie(id) === 'show') {
                $content.find('.sp_id_'+id+' .sp_wrn').hide(0);
                $content.find('.sp_id_'+id+' .sp_txt').show(0);
            } else if (getCookie(id) === 'hide') {
                $content.find('.sp_id_'+id+' .sp_wrn').show(0);
                $content.find('.sp_id_'+id+' .sp_txt').hide(0);

            // if no cookies are set, check to see if the warning is displayed by default
            } else if ($('.sp_id_'+id+' .sp_wrn').attr('display') == 'none') {
                $content.find('.sp_id_'+id+' .sp_wrn').hide(0);
                $content.find('.sp_id_'+id+' .sp_txt').show(0);
            } else {
                $content.find('.sp_id_'+id+' .sp_wrn').show(0);
                $content.find('.sp_id_'+id+' .sp_txt').hide(0);
            }
        }
    }

    $(function() {
        toggleSpoilers(mw.util.$content, true);
        mw.hook('wikipage.content').add(toggleSpoilers);
    });
});