$(document).ready(function() {
    function activateTab(tab) {
        var tabId = tab.data('tab');

        $('.tile-link').removeClass('active');
        $('.tab-content').removeClass('active');

        tab.addClass('active');
        $('#' + tabId).addClass('active');
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
            var translitHash = transliterate(hash).replace(/%20/g, '_').replace(/ /g, '_');
            var tabElement = $('[data-tab="' + translitHash + '"], [data-original-label="' + translitHash + '"]');
            if (tabElement.length) {
                activateTab(tabElement);
            }
        }
    }

    $(window).on('load', function() {
        checkHash();
    });

    $(window).on('hashchange', function() {
        checkHash();
    });

    var touchTimeout;

    function handleTouchClick(e) {
        e.preventDefault();

        var tab = $(this);

        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(function() {
            var tabId = tab.attr('data-original-label').replace(/ /g, "_");
            history.replaceState(null, null, '#' + tabId);
            activateTab(tab);
        }, 200);
    }

    $('.tile-link').on('click touchstart', handleTouchClick);
});