/* Any JavaScript here will be loaded for all users on every page load */
/* ----[FILTER AND SEARCH]---- */
importScript('MediaWiki:CustomFilters.js');

// Scroll bar
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ScrollUpButton.js',
    ]
});

//Design//
if (mw.config.get('wgPageName') === 'User:XxImMortalV1ruSxX' && mw.config.get('wgAction') !== 'edit') {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:SnowStorm.js',
        ]
    });
}

//tooltip//
window.tooltips_config = {
    events: ['CustomEvent'],
    noCSS: true,
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};

window.tooltips_list = [
    {
        classname: 'custom-tooltip',
        delay: 500,
        parse: function(elem) {
            return '{' + '{Tooltip|' + $(elem).data('name') + '|' + $(elem).data('value') + '}}';
        }
    }
];

// Custom hover effect for move-boxes
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".move-box").forEach(function (box) {
        box.addEventListener("mouseover", function () {
            this.classList.add("stay-open");
        });
    });
});