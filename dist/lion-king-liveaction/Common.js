(function($){

// Prevent double loading
window.hswwiki = window.hswwiki || {};
if (window.hswwiki.themeSelectorLoaded) return;
window.hswwiki.themeSelectorLoaded = true;


// ============================================================
// THEME SETTINGS
// ============================================================

var SELECTED_CACHE_KEY = 'hsw-themeselector-selected';

var stylesheetPrefix =
    'https://lion-king-liveaction.fandom.com/index.php?action=raw&ctype=text/css&title=';

var themes = [

    {
        id: 'default',
        name: 'DEFAULT',
        note: 'Light & Dark',

        image:
            'https://static.wikia.nocookie.net/lion-king-liveaction/images/b/b5/Site-background-light/revision/latest?cb=20260701163821'
    },

    {
        id: 'mufasa',
        name: 'MUFASA',
        note: 'Light & Dark',

        stylesheet:
            stylesheetPrefix + 'Import Themes/Mufasa.css',

        image:
            'YOUR_MUFASA_PREVIEW_IMAGE_URL_HERE'
    }

];


// ============================================================
// THEME SELECTOR ICON
// ============================================================

var TOOLBAR_ICON =
'<svg class="hsw-theme-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">' +
'<path d="M203 15.2c-2.8.7-21.4 18.8-89.6 87.1l-86.2 86.2-4.1 8.5a61.4 61.4 0 0 0 0 57c4.1 8.5 4.4 8.8 67.8 72.3 67.1 67.3 70.7 70.6 84.4 75.6 6.4 2.3 8.7 2.6 20.2 2.6 10.2 0 14.2-.4 18.5-1.9a66.8 66.8 0 0 0 21.5-11.7c3.3-2.6 42.5-41.4 87.2-86.1 56.8-56.8 81.7-82.4 82.8-85a25.4 25.4 0 0 0-.5-18.2c-1.3-2.8-31.4-33.5-92.7-94.8C233.9 28.5 221 16 217.5 15.1a26.5 26.5 0 0 0-14.5.1zm80.8 123.1c57 57 72 72.5 71 73.5-.9.9-33.2 1.2-146 1.2-79.6 0-144.8-.3-144.8-.7C64 211.1 209.4 66 210.5 66c.6 0 33.5 32.5 73.3 72.3zM412.1 257c-5.5 1.3-8.2 4.1-16.3 17.1-15.6 24.8-28.1 50.6-31.4 64.4a53.3 53.3 0 0 0 15 51.1A48.7 48.7 0 0 0 416 405c14.6 0 25.9-4.8 36.6-15.4 16.2-16.1 20.3-36.2 12.3-59.6a356.9 356.9 0 0 0-34.1-64.5c-4.9-7.3-11.2-10.1-18.7-8.5zM53.9 429.3a27.3 27.3 0 0 0-7.4 6.6c-2.7 3.9-3 5-3 12 0 6.8.3 8.2 2.7 11.7 1.5 2.1 4.4 5 6.5 6.4l3.7 2.5h399.2l3.7-2.5c2.1-1.4 5-4.3 6.5-6.4 2.4-3.5 2.7-4.9 2.7-11.6 0-6.7-.3-8.1-2.7-11.6-1.5-2.1-4.4-5-6.5-6.4l-3.7-2.5-198.6-.3-198.7-.2-4.4 2.3z"/>' +
'</svg>';


// ============================================================
// SELECTOR CSS
// ============================================================

var selectorCSS = [

    /* The selector itself */
    '.hsw-theme-selector {',
        'position: relative !important;',
        'display: inline-flex !important;',
        'width: auto !important;',
        'height: auto !important;',
        'overflow: visible !important;',
        'z-index: 1000 !important;',
    '}',

    /* Icon button */
    '.hsw-theme-selector-toggle {',
        'display: flex !important;',
        'align-items: center !important;',
        'justify-content: center !important;',
        'width: 40px !important;',
        'height: 40px !important;',
        'padding: 0 !important;',
        'margin: 0 !important;',
        'border: 0 !important;',
        'background: transparent !important;',
        'cursor: pointer !important;',
        'position: relative !important;',
        'z-index: 1001 !important;',
    '}',

    '.hsw-theme-selector-toggle:hover {',
        'background: rgba(0,0,0,0.08) !important;',
        'border-radius: 4px !important;',
    '}',

    '.hsw-theme-icon {',
        'width: 22px !important;',
        'height: 22px !important;',
        'display: block !important;',
        'fill: currentColor !important;',
        'pointer-events: none !important;',
    '}',

    /* Closed dropdown MUST NOT cover anything */
    '.hsw-theme-selector-content {',
        'display: none !important;',
        'position: absolute !important;',
        'top: calc(100% + 8px) !important;',
        'right: 0 !important;',
        'width: 245px !important;',
        'max-height: 520px !important;',
        'overflow-y: auto !important;',
        'overflow-x: hidden !important;',
        'background: #ffffff !important;',
        'border: 1px solid rgba(0,0,0,0.15) !important;',
        'border-radius: 10px !important;',
        'box-shadow: 0 8px 25px rgba(0,0,0,0.25) !important;',
        'z-index: 99999 !important;',
        'pointer-events: none !important;',
    '}',

    /* Only when OPEN can the dropdown receive clicks */
    '.hsw-theme-selector.is-open .hsw-theme-selector-content {',
        'display: block !important;',
        'pointer-events: auto !important;',
    '}',

    /* Header */
    '.hsw-theme-header {',
        'padding: 12px 14px !important;',
        'font-size: 14px !important;',
        'border-bottom: 1px solid rgba(0,0,0,0.1) !important;',
        'background: #ffffff !important;',
        'position: sticky !important;',
        'top: 0 !important;',
        'z-index: 2 !important;',
    '}',

    /* Theme list */
    '.hsw-theme-list {',
        'list-style: none !important;',
        'padding: 10px !important;',
        'margin: 0 !important;',
    '}',

    '.hsw-theme-list li {',
        'list-style: none !important;',
        'padding: 0 !important;',
        'margin: 0 0 9px 0 !important;',
        'cursor: pointer !important;',
    '}',

    '.hsw-theme-list li:last-child {',
        'margin-bottom: 0 !important;',
    '}',

    /* Theme cards */
    '.hsw-theme-box {',
        'height: 105px !important;',
        'width: 100% !important;',
        'box-sizing: border-box !important;',
        'border-radius: 8px !important;',
        'overflow: hidden !important;',
        'background-size: cover !important;',
        'background-position: center !important;',
        'background-color: #ddd !important;',
        'position: relative !important;',
        'display: flex !important;',
        'flex-direction: column !important;',
        'justify-content: flex-end !important;',
        'padding: 12px !important;',
        'box-shadow: inset 0 -60px 50px rgba(0,0,0,0.55) !important;',
        'box-sizing: border-box !important;',
        'transition: transform 0.15s ease, box-shadow 0.15s ease !important;',
    '}',

    '.hsw-theme-box:hover {',
        'transform: scale(1.02) !important;',
        'box-shadow: inset 0 -60px 50px rgba(0,0,0,0.65), 0 2px 7px rgba(0,0,0,0.25) !important;',
    '}',

    /* Selected theme */
    '.hsw-theme-list li.selected .hsw-theme-box {',
        'outline: 3px solid #d65627 !important;',
        'outline-offset: 2px !important;',
    '}',

    '.hsw-theme-list li.selected .hsw-theme-box:after {',
        'content: "✓" !important;',
        'position: absolute !important;',
        'top: 8px !important;',
        'right: 8px !important;',
        'width: 24px !important;',
        'height: 24px !important;',
        'border-radius: 50% !important;',
        'background: #d65627 !important;',
        'color: white !important;',
        'display: flex !important;',
        'align-items: center !important;',
        'justify-content: center !important;',
        'font-weight: bold !important;',
        'font-size: 14px !important;',
    '}',

    '.hsw-theme-box .theme-title {',
        'color: white !important;',
        'font-weight: bold !important;',
        'font-size: 14px !important;',
        'position: relative !important;',
        'z-index: 1 !important;',
        'text-shadow: 0 1px 3px rgba(0,0,0,0.8) !important;',
    '}',

    '.hsw-theme-box .theme-note {',
        'color: rgba(255,255,255,0.9) !important;',
        'font-size: 11px !important;',
        'position: relative !important;',
        'z-index: 1 !important;',
        'text-shadow: 0 1px 3px rgba(0,0,0,0.8) !important;',
        'margin-top: 2px !important;',
    '}',

    /* Mobile */
    '@media (max-width: 600px) {',
        '.hsw-theme-selector-content {',
            'position: fixed !important;',
            'top: 55px !important;',
            'right: 8px !important;',
            'width: 230px !important;',
            'max-width: calc(100vw - 16px) !important;',
        '}',
    '}'

].join('\n');


// Add our CSS once
if (!document.getElementById('hsw-theme-selector-style')) {

    $('<style>')
        .attr('id', 'hsw-theme-selector-style')
        .text(selectorCSS)
        .appendTo('head');

}


// ============================================================
// START
// ============================================================

function main() {

    updateStylesheets();

    setTimeout(function(){
        initDropdownHtml();
    }, 600);

}


// ============================================================
// CREATE THE SELECTOR
// ============================================================

function initDropdownHtml() {

    $('.hsw-theme-selector').remove();

    var $dropdown = $('<div>')
        .addClass('hsw-theme-selector');

    var $toggle = $('<button>')
        .attr('type', 'button')
        .attr('title', 'Theme Selector')
        .attr('aria-label', 'Theme Selector')
        .addClass('hsw-theme-selector-toggle')
        .html(TOOLBAR_ICON)
        .appendTo($dropdown);

    var $content = $('<div>')
        .addClass('hsw-theme-selector-content')
        .appendTo($dropdown);


    // --------------------------------------------------------
    // INSERT AT THE BEGINNING OF THE TOOLBAR
    // --------------------------------------------------------

    var $firstButton =
        $('.wiki-tools > .wds-button').first();

    if ($firstButton.length) {

        $firstButton.before($dropdown);

    } else {

        $('.wiki-tools').first().prepend($dropdown);

    }


    // --------------------------------------------------------
    // OPEN / CLOSE
    // --------------------------------------------------------

    $toggle.on('click', function(e) {

        e.preventDefault();
        e.stopPropagation();

        $dropdown.toggleClass('is-open');

    });


    // --------------------------------------------------------
    // PREVENT DROPDOWN CLICKS FROM CLOSING IT
    // --------------------------------------------------------

    $content.on('click', function(e) {

        e.stopPropagation();

    });


    // --------------------------------------------------------
    // CLOSE WHEN CLICKING ELSEWHERE
    // --------------------------------------------------------

    $(document).on('click.hswThemeSelector', function() {

        $dropdown.removeClass('is-open');

    });


    update();

}


// ============================================================
// UPDATE EVERYTHING
// ============================================================

function update() {

    updateStylesheets();

    renderThemesList();

}


// ============================================================
// LOAD SELECTED THEME CSS
// ============================================================

function updateStylesheets() {

    clearStylesheets();

    var id = getSelectedId();

    var theme = themes.find(function(t) {

        return t.id == id;

    });

    // IMPORTANT:
    // Default has no stylesheet, so don't try to load "undefined".

    if (theme && theme.stylesheet) {

        addStylesheetToHead(theme.stylesheet);

    }

}


// ============================================================
// DRAW THE THEME CARDS
// ============================================================

function renderThemesList() {

    var selectedId = getSelectedId();

    var $content =
        $('.hsw-theme-selector .hsw-theme-selector-content');

    if (!$content.length) return;

    $content.empty();


    // Header

    $('<div>')
        .addClass('hsw-theme-header')
        .html('<strong>Theme Selector</strong>')
        .appendTo($content);


    // List

    var $list =
        $('<ul>')
            .addClass('hsw-theme-list')
            .appendTo($content);


    themes.forEach(function(theme) {

        var $li =
            $('<li>')
                .addClass(
                    theme.id +
                    (theme.id == selectedId ? ' selected' : '')
                )
                .html(renderThemeBox(theme))
                .appendTo($list);


        $li.on('click', function(e) {

            e.preventDefault();
            e.stopPropagation();

            selectThemeId(theme.id);

            update();

            // Keep the menu open after selecting.
            // This makes it easier to switch themes.

        });

    });

}


// ============================================================
// THEME CARD
// ============================================================

function renderThemeBox(theme) {

    var background = '';

    if (theme.image) {

        background =
            "style=\"background-image:url('" +
            theme.image +
            "');\"";

    }


    return [

        "<div class='hsw-theme-box' " +
            background +
        ">",

        "<div class='theme-title'>" +
            theme.name +
        "</div>",

        theme.note
            ? "<div class='theme-note'>" +
                theme.note +
              "</div>"
            : "",

        "</div>"

    ].join('');

}


// ============================================================
// REMEMBER SELECTED THEME
// ============================================================

function getSelectedId() {

    var id =
        localStorage.getItem(SELECTED_CACHE_KEY);


    var validTheme =
        themes.find(function(t) {

            return t.id == id;

        });


    if (!id || !validTheme) {

        id = 'default';

    }


    return id;

}


function selectThemeId(id) {

    saveSelectedId(
        id == 'default'
            ? null
            : id
    );

}


function saveSelectedId(id) {

    if (id) {

        localStorage.setItem(
            SELECTED_CACHE_KEY,
            id
        );

    } else {

        localStorage.removeItem(
            SELECTED_CACHE_KEY
        );

    }

}


// ============================================================
// STYLESHEET HANDLING
// ============================================================

var STYLESHEET_CLASS =
    'hsw-themeselector-stylesheet';


function addStylesheetToHead(href) {

    if (!href) return;

    $('<link>')
        .attr({
            rel: 'stylesheet',
            href: href,
            type: 'text/css'
        })
        .addClass(STYLESHEET_CLASS)
        .appendTo('head');

}


function clearStylesheets() {

    $('link.' + STYLESHEET_CLASS).remove();

}


// ============================================================
// RUN
// ============================================================

main();


})(jQuery);


// ============================================================
// CREATE PAGES BUTTON
// ============================================================

mw.hook('dev.ct').add(function(addButtons) {

    addButtons([

        {
            link: 'Special:CreatePage',
            placement: 'wiki-tools',
            position: 3,
            text: 'Create Pages',
            icon: 'page'
        }

    ]);

});