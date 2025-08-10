/* Any JavaScript here will be loaded for all users on every page load */
/* ---[FILTER AND SEARCH]--- */
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
    noCSS: true,          // Disables default CSS so you can add your own custom styles
    offsetX: 10,          // Adjusts tooltip position from cursor
    offsetY: 10,
    waitForImages: true   // Ensures images load before tooltip appears
};

window.tooltips_list = [
    {
        classname: 'custom-tooltip',    // The custom class to trigger this tooltip
        delay: 500,
        parse: function(elem) {
            return '{' + '{Tooltip|' + $(elem).data('name') + '|' + $(elem).data('value') + '}}';
        }
    }
];

<script>
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".move-box").forEach(function (box) {
      box.addEventListener("mouseover", function () {
        this.classList.add("stay-open");
      });
    });
  });
</script>

<style>
  .move-box .desc-on-hover {
    display: none;
  }
  .move-box.stay-open .desc-on-hover {
    display: block !important;
  }
</style>

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});

(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/* Lukitota trying something silly THIS DOES NOT WORK :cold: */
var hoverSound = new Audio('https://static.wikia.nocookie.net/rell-seasw/images/d/d4/RSW_UI_SFX.mp3/revision/latest?cb=20250808140202');
var navCard = document.querySelector('.nav-card');

navCard.addEventListener('mouseenter', function() {
  hoverSound.currentTime = 0;
  hoverSound.play().catch(e => console.log(e));
});

navCard.addEventListener('mouseleave', function() {
  hoverSound.pause();
  hoverSound.currentTime = 0;
});