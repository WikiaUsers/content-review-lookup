/* Any JavaScript here will be loaded for all users on every page load */
/* ----[FILTER AND SEARCH]--- */
$(function () {
  // Search box
  $('#search').html(
    '<input id="searchInput" class="rsw-search" placeholder="Filter name...">'
  );


  const filtersConfig = {
    sea:    { attr: 'sea',    options: [['','All Seas'],['sea-first','First Sea'],['sea-second','Second Sea'],['sea-third','Third Sea']] },
    type:   { attr: 'type',   options: [['','All Fruits'],['fruit-paramecia','Paramecia'],['fruit-zoan','Zoan'],['fruit-logia','Logia']] },
    haki:   { attr: 'haki',   options: [['','All Haki'],['armament','Armament'],['observation','Observation'],['conquerors','Conquerors']] },
    mob:    { attr: 'mob',    options: [['','All Mobs'],['hostile','Hostile'],['friendly','Friendly'],['neutral','Neutral']] },
    weapon: { attr: 'weapon', options: [['','All Weapons'],['ranged','Ranged'],['heavy','Heavy'],['medium','Medium'],['light','Light']] },
    grade:  { attr: 'grade',  options: [['','All Grades'],['grade-a','Grade A'],['grade-b','Grade B'],['grade-c','Grade C'],['grade-d','Grade D'],['grade-e','Grade E'],['grade-f','Grade F']] },
    bosses:  { attr: 'bosses',  options: [['','All Bosses'],['mini-boss','Mini Bosses'],['greater-boss','Greater Bosses'],['world-boss','World Bosses']] },
    wildlife:{ attr: 'wildlife',options: [['','All Wildlife'],['sea-life','Sea Life'],['land-life','Land Life']] },
    mounts:  { attr: 'mounts',  options: [['','All Mounts'],['terrestrial','Terrestrial'],['aquatic','Aquatic'],['aerial','Aerial']] },
    posters: { attr: 'posters', options: [['','All Posters'],['agile','Agile'],['tactic','Tactic'],['fierce','Fierce']] }
  };

  // Build <select> inside each filter div
  Object.entries(filtersConfig).forEach(([key, cfg]) => {
    const selectId = `sel-${key}`;
    const html =
      `<select id="${selectId}" class="rsw-filter">` +
      cfg.options.map(([val, label]) => `<option value="${val}">${label}</option>`).join('') +
      `</select>`;
    $(`#filter-${key}`).html(html);
  });

  // Filtering logic
  function filterItems () {
    const search = ($('#searchInput').val() || '').trim().toLowerCase();

    // Collect filter values
    const active = {};
    Object.keys(filtersConfig).forEach(key => {
      active[key] = $(`#sel-${key}`).val();
    });

    $('#itemList > div').each(function () {
      const $t = $(this);

      // text search
      const textOk =
        !search ||
        (($t.attr('id') || '').toLowerCase().includes(search)) ||
        $t.text().toLowerCase().includes(search);

      const catsOk = Object.entries(filtersConfig).every(([key, cfg]) => {
        const wanted = active[key];
        if (!wanted) return true;
        const attrVal = ($t.data(cfg.attr) || '').toString().trim();
        if (!attrVal) return false;
        return attrVal.split(/\s+/).includes(wanted);
      });

      $t.toggle(textOk && catsOk);
    });
  }

  $(document).on('input change', '#searchInput, .rsw-filter', filterItems);
  filterItems();
});


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