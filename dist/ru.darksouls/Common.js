/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.onload = function () {
if (wgUserName !== 'null') {
        $('.insertusername').html(wgUserName);
    }
};

/**
 * Импорт калькулятора душ с http://jakebarnes.com.au/ds2sm/
 */
$(function() {
    if (mw.config.get('wgPageName') !== 'Калькулятор_Памяти_Душ') {return}
    $('#mw-content-text').html('<section id="content"><div id="container"><input id="my-sm" type="text" value="0"/><span id="p1">No Item Selected</span><span id="p2">+ Именное кольцо</span><span id="p3">Lorem ipsum dolor sit amet</span></div><article><canvas id="chart" width="704" height="700"></canvas></article></section>');
    importArticles({type: 'style', article: ['MediaWiki:DS2_calculator.css']}, {type: 'script', article: ['MediaWiki:DS2_calculator.js']});
});


// Настройка кнопки галереи
// http://dev.wikia.com/wiki/CustomGalleryButton

(function ($) {
    var galleryButtonText = window.galleryButtonText || 'Добавить файл в галерею',
        galleryButtonIcon = window.galleryButtonIcon || 'https://images.wikia.nocookie.net/dev/images/a/af/Gallery-add-photo.gif',
        galleryButtonIconHidden = window.galleryButtonIconHidden || true;
    if (galleryButtonIconHidden) {
        $('.wikia-photogallery-add').text(galleryButtonText);
    } else {
        $('.wikia-photogallery-add').html('<img src="' + galleryButtonIcon + '" />&nbsp;' + galleryButtonText);
    }
}(jQuery));

/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(document).ready(function() {
        var $tabs = $("#portal_slider").tabs({ fx: { opacity: 'toggle', duration: 100 } });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});