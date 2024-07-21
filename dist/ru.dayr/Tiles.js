/*$(document).ready(function() {
    function activateTab(tab) {
        var tabId = tab.data('tab');

        $('.tile-link').removeClass('active');
        $('.tab-content').removeClass('active');

        tab.addClass('active');
        $('#' + tabId).addClass('active');
    }

    $('.tile-link').on('click', function(e) {
        e.preventDefault();
        activateTab($(this));
    });

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        $('.tile-link').on('touchstart', function(e) {
            e.preventDefault();
            var tab = $(this);
            activateTab(tab);
        });

        $('.tile-link').on('touchmove', function(e) {
            e.preventDefault();
            var tab = $(this);
            activateTab(tab);
        });
    }
});
*/
/*$(function() {
    const tabs = $('.tile-link');
    const contents = $('.tab-content');

    tabs.each(function() {
        $(this).on('click', function() {
            tabs.removeClass('active');
            contents.removeClass('active');

            $(this).addClass('active');
            const tabId = $(this).data('tab');
            $('#' + tabId).addClass('active');
        });
    });
});*/

$(document).ready(function() {
    function activateTab(hash) {
        var tabElement = $('[id="' + hash + '"], [data-original-label="' + hash + '"]');
        if (tabElement.length) {
            var parent = tabElement.closest('.wds-tabber');
            var tabs = parent.find('.wds-tabs__tab');
            var contents = parent.find('.wds-tab__content');

            tabs.removeClass('wds-is-current');
            contents.removeClass('wds-is-current');

            tabElement.addClass('wds-is-current');
            var dataTab = tabElement.attr('data-tab');
            $('[data-tab-content="' + dataTab + '"]').addClass('wds-is-current');
        }
    }

    function transliterate(text) {
        var translit = {
            'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E', 'Ж': 'Zh',
            'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
            'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts',
            'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
            'Я': 'Ya', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
            'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh',
            'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e',
            'ю': 'yu', 'я': 'ya'
        };
        return text.replace(/./g, function(ch) {
            return translit[ch] || ch;
        });
    }

    function checkHash() {
        if (window.location.hash) {
            var hash = decodeURIComponent(window.location.hash.substring(1)).replace(/ /g, "_");
            var translitHash = transliterate(hash).toLowerCase();
            activateTab(translitHash);
        }
    }

    $(window).on('load', function() {
        checkHash();
    });

    $(window).on('hashchange', function() {
        checkHash();
    });

    $('.wds-tabs__tab').click(function(e) {
        var tabId = $(this).attr('data-original-label').replace(/ /g, "_");
        history.replaceState(null, null, '#' + tabId);
        activateTab(tabId);
        e.preventDefault();
    });
});