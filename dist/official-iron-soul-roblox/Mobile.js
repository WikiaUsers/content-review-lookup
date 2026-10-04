/* All JavaScript here will be loaded for users of the mobile site */

// Please tell us the line if theres any problem thank you!

/* =========================================================
 * COMMON.JS LOADED TEST
 * ========================================================= */

var commonJsTest = document.createElement('div');

commonJsTest.innerHTML = '✅ COMMON.JS IS LOADED';

commonJsTest.style.position = 'fixed';
commonJsTest.style.top = '80px';
commonJsTest.style.left = '10px';
commonJsTest.style.zIndex = '999999';
commonJsTest.style.background = '#00aa55';
commonJsTest.style.color = '#ffffff';
commonJsTest.style.padding = '12px 18px';
commonJsTest.style.borderRadius = '8px';
commonJsTest.style.fontSize = '16px';
commonJsTest.style.fontWeight = 'bold';

document.body.appendChild(commonJsTest);

alert('COMMON.JS IS LOADED');


/* =========================================================
 * PLAYFAIR DISPLAY
 * ========================================================= */

(function () {

  var link = document.createElement('link');

  link.rel = 'stylesheet';

  link.href =
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap';

  document.head.appendChild(link);

})();


/* =========================================================
 * UNIVERSAL ITEM SYSTEM
 * ========================================================= */

(function () {

  'use strict';


  var initializedGrids = [];


  /* ---------------------------------------------------------
   * HELPERS
   * --------------------------------------------------------- */

  function getValue(card, names) {

    for (var i = 0; i < names.length; i++) {

      var value =
        card.getAttribute(
          'data-' + names[i]
        );

      if (
        value !== null &&
        String(value).trim() !== ''
      ) {

        return String(value).trim();

      }

    }

    return '';

  }


  function capitalizeWord(s) {

    if (!s) return '';

    return s
      .split('-')
      .map(function (w) {

        return (
          w.charAt(0).toUpperCase() +
          w.slice(1)
        );

      })
      .join(' ');

  }


  function safeImageSrc(url) {

    if (
      typeof url !== 'string' ||
      !url
    ) {

      return '';

    }


    if (
      url.indexOf(
        'https://static.wikia.nocookie.net/'
      ) === 0
    ) {

      return url;

    }


    if (
      url.indexOf(
        'https://static.miraheze.org/'
      ) === 0
    ) {

      return url;

    }


    if (
      url.indexOf(
        'https://static.wikia.nocookie.net'
      ) === 0
    ) {

      return url;

    }


    return url;

  }


  function resolveImageSrc(card) {

    /*
     * First try a data-image/data-img attribute.
     */

    var direct =
      getValue(
        card,
        [
          'image',
          'img',
          'icon'
        ]
      );


    if (direct) {

      var directSrc =
        safeImageSrc(
          direct
        );


      if (directSrc) {

        return directSrc;

      }

    }


    /*
     * Then find the rendered image inside the card.
     */

    var img =
      card.querySelector(
        'img'
      );


    if (img) {

      return (
        img.currentSrc ||
        img.src ||
        img.getAttribute('src') ||
        ''
      );

    }


    return '';

  }


  function setCardImage(
    wrapEl,
    imgEl,
    src
  ) {

    if (!wrapEl || !imgEl) return;


    wrapEl.classList.remove(
      'isd-no-image'
    );


    imgEl.style.display =
      '';


    imgEl.removeAttribute(
      'src'
    );


    if (!src) {

      wrapEl.classList.add(
        'isd-no-image'
      );

      imgEl.style.display =
        'none';

      return;

    }


    imgEl.onerror =
      function () {

        wrapEl.classList.add(
          'isd-no-image'
        );

        imgEl.style.display =
          'none';

      };


    imgEl.onload =
      function () {

        wrapEl.classList.remove(
          'isd-no-image'
        );

        imgEl.style.display =
          '';

      };


    imgEl.src =
      src;

  }


  function setSection(
    section,
    element,
    value
  ) {

    if (!section || !element) return;


    if (
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ''
    ) {

      section.style.display =
        '';

      element.textContent =
        value;

    } else {

      section.style.display =
        'none';

      element.textContent =
        '';

    }

  }


  function getRobuxImageSrc() {

    var images =
      document.querySelectorAll(
        'img'
      );


    for (
      var i = 0;
      i < images.length;
      i++
    ) {

      var img =
        images[i];


      var src =
        img.src || '';


      var alt =
        img.alt || '';


      if (
        alt
          .toLowerCase()
          .indexOf('robux') !== -1 ||
        src
          .toLowerCase()
          .indexOf('robux.png') !== -1
      ) {

        return src;

      }

    }


    return '';

  }


  function setObtainment(
    element,
    obtainment
  ) {

    if (!element) return;


    element.textContent =
      obtainment || '';

  }


  /* =========================================================
   * CREATE MODAL
   * ========================================================= */

  var oldModal =
    document.querySelector(
      '.isd-item-modal-overlay'
    );


  if (oldModal) {

    oldModal.remove();

  }


  var overlay =
    document.createElement(
      'div'
    );


  overlay.className =
    'isd-item-modal-overlay';


  overlay.innerHTML =

    '<div class="isd-item-modal">' +

      '<div class="isd-item-modal-header">' +

        '<span class="isd-item-modal-title"></span>' +

        '<span class="isd-item-modal-close">&times;</span>' +

      '</div>' +


      '<div class="isd-item-modal-img-wrap">' +

        '<img class="isd-item-modal-img" src="" alt="">' +

        '<div class="isd-item-modal-img-fallback">No image yet</div>' +

      '</div>' +


      '<div class="isd-item-modal-section isd-m-basic-section">' +

        '<div class="isd-item-modal-value isd-item-modal-rarity"></div>' +

        '<div class="isd-item-modal-value isd-m-category"></div>' +

      '</div>' +


      '<div class="isd-item-modal-section isd-m-description-section">' +

        '<div class="isd-item-modal-value isd-m-description"></div>' +

      '</div>' +


      '<div class="isd-item-modal-section isd-m-stats-section">' +

        '<div class="isd-item-modal-label">Stats</div>' +

        '<div class="isd-item-modal-value isd-m-stats"></div>' +

      '</div>' +


      '<div class="isd-item-modal-section isd-m-equipment-section">' +

        '<div class="isd-item-modal-label">Equipment Slot</div>' +

        '<div class="isd-item-modal-value isd-m-equipment"></div>' +

      '</div>' +


      '<div class="isd-item-modal-section isd-m-appearance-section">' +

        '<div class="isd-item-modal-label">Appearance Type</div>' +

        '<div class="isd-item-modal-value isd-m-appearance"></div>' +

      '</div>' +


      '<div class="isd-item-modal-section isd-m-robux-section">' +

        '<div class="isd-item-modal-label">Price</div>' +

        '<div class="isd-item-modal-value isd-m-robux"></div>' +

      '</div>' +


      '<div class="isd-item-modal-section isd-m-obtainment-section">' +

        '<div class="isd-item-modal-label">Obtainment</div>' +

        '<div class="isd-item-modal-value isd-item-modal-obtainment"></div>' +

      '</div>' +

    '</div>';


  document.body.appendChild(
    overlay
  );


  function closeModal() {

    overlay.classList.remove(
      'isd-active'
    );

  }


  overlay.addEventListener(
    'click',
    function (e) {

      if (
        e.target === overlay
      ) {

        closeModal();

      }

    }
  );


  var closeButton =
    overlay.querySelector(
      '.isd-item-modal-close'
    );


  if (closeButton) {

    closeButton.addEventListener(
      'click',
      closeModal
    );

  }


  /* =========================================================
   * OPEN MODAL
   * ========================================================= */

  function openModal(card) {

    var name =
      getValue(
        card,
        [
          'name',
          'title'
        ]
      );


    var image =
      resolveImageSrc(
        card
      );


    var rarity =
      getValue(
        card,
        [
          'rarity'
        ]
      );


    var category =
      getValue(
        card,
        [
          'category',
          'type'
        ]
      );


    var description =
      getValue(
        card,
        [
          'description',
          'desc'
        ]
      );


    var stats =
      getValue(
        card,
        [
          'stats',
          'stat'
        ]
      );


    var equipment =
      getValue(
        card,
        [
          'equipment',
          'equipment-slot',
          'slot'
        ]
      );


    var appearance =
      getValue(
        card,
        [
          'appearance',
          'appearance-type'
        ]
      );


    var robux =
      getValue(
        card,
        [
          'robux',
          'price-robux',
          'robux-price'
        ]
      );


    var obtainment =
      getValue(
        card,
        [
          'obtainment',
          'source',
          'obtained-from'
        ]
      );


    /*
     * NAME
     */

    overlay
      .querySelector(
        '.isd-item-modal-title'
      )
      .textContent =
        name;


    /*
     * IMAGE
     */

    setCardImage(

      overlay.querySelector(
        '.isd-item-modal-img-wrap'
      ),

      overlay.querySelector(
        '.isd-item-modal-img'
      ),

      image

    );


    /*
     * RARITY
     */

    var rarityEl =
      overlay.querySelector(
        '.isd-item-modal-rarity'
      );


    if (rarity) {

      rarityEl.style.display =
        '';

      rarityEl.textContent =
        capitalizeWord(
          rarity
        );

    } else {

      rarityEl.style.display =
        'none';

      rarityEl.textContent =
        '';

    }


    /*
     * CATEGORY
     */

    var categoryEl =
      overlay.querySelector(
        '.isd-m-category'
      );


    if (category) {

      categoryEl.style.display =
        '';

      categoryEl.textContent =
        capitalizeWord(
          category
        );

    } else {

      categoryEl.style.display =
        'none';

      categoryEl.textContent =
        '';

    }


    /*
     * DESCRIPTION
     */

    setSection(

      overlay.querySelector(
        '.isd-m-description-section'
      ),

      overlay.querySelector(
        '.isd-m-description'
      ),

      description

    );


    /*
     * STATS
     */

    setSection(

      overlay.querySelector(
        '.isd-m-stats-section'
      ),

      overlay.querySelector(
        '.isd-m-stats'
      ),

      stats

    );


    /*
     * EQUIPMENT
     */

    setSection(

      overlay.querySelector(
        '.isd-m-equipment-section'
      ),

      overlay.querySelector(
        '.isd-m-equipment'
      ),

      equipment

    );


    /*
     * APPEARANCE
     */

    setSection(

      overlay.querySelector(
        '.isd-m-appearance-section'
      ),

      overlay.querySelector(
        '.isd-m-appearance'
      ),

      appearance

    );


    /*
     * ROBUX
     */

    var robuxSection =
      overlay.querySelector(
        '.isd-m-robux-section'
      );


    var robuxEl =
      overlay.querySelector(
        '.isd-m-robux'
      );


    robuxEl.textContent =
      '';


    if (robux) {

      robuxSection.style.display =
        '';


      var robuxImgSrc =
        getRobuxImageSrc();


      if (robuxImgSrc) {

        var robuxImg =
          document.createElement(
            'img'
          );


        robuxImg.src =
          robuxImgSrc;

        robuxImg.alt =
          'Robux';

        robuxImg.className =
          'isd-robux-icon';


        robuxEl.appendChild(
          robuxImg
        );

      }


      var robuxText =
        document.createElement(
          'span'
        );


      robuxText.textContent =
        robux;


      robuxEl.appendChild(
        robuxText
      );

    } else {

      robuxSection.style.display =
        'none';

    }


    /*
     * OBTAINMENT
     */

    var obtainmentSection =
      overlay.querySelector(
        '.isd-m-obtainment-section'
      );


    var obtainmentEl =
      overlay.querySelector(
        '.isd-item-modal-obtainment'
      );


    if (obtainment) {

      obtainmentSection.style.display =
        '';

      setObtainment(
        obtainmentEl,
        obtainment
      );

    } else {

      obtainmentSection.style.display =
        'none';

      obtainmentEl.textContent =
        '';

    }


    /*
     * SHOW
     */

    overlay.classList.add(
      'isd-active'
    );

  }


  /* =========================================================
   * CREATE TOOLTIP
   * ========================================================= */

  var oldTooltip =
    document.querySelector(
      '.isd-item-tooltip'
    );


  if (oldTooltip) {

    oldTooltip.remove();

  }


  var tooltip =
    document.createElement(
      'div'
    );


  tooltip.className =
    'isd-item-tooltip';


  tooltip.innerHTML =

    '<div class="isd-item-tooltip-header"></div>' +

    '<div class="isd-item-tooltip-img-wrap">' +

      '<img src="" alt="">' +

      '<div class="isd-item-tooltip-img-fallback">No image yet</div>' +

    '</div>' +


    '<div class="isd-item-tooltip-section isd-tt-basic-section">' +

      '<div class="isd-item-tooltip-rarity"></div>' +

      '<div class="isd-item-tooltip-category"></div>' +

    '</div>' +


    '<div class="isd-item-tooltip-section isd-tt-description-section">' +

      '<div class="isd-item-tooltip-value isd-tt-description"></div>' +

    '</div>' +


    '<div class="isd-item-tooltip-section isd-tt-stats-section">' +

      '<div class="isd-item-tooltip-label">Stats</div>' +

      '<div class="isd-item-tooltip-value isd-tt-stats"></div>' +

    '</div>' +


    '<div class="isd-item-tooltip-section isd-tt-equipment-section">' +

      '<div class="isd-item-tooltip-label">Equipment Slot</div>' +

      '<div class="isd-item-tooltip-value isd-tt-equipment"></div>' +

    '</div>' +


    '<div class="isd-item-tooltip-section isd-tt-appearance-section">' +

      '<div class="isd-item-tooltip-label">Appearance Type</div>' +

      '<div class="isd-item-tooltip-value isd-tt-appearance"></div>' +

    '</div>' +


    '<div class="isd-item-tooltip-section isd-tt-robux-section">' +

      '<div class="isd-item-tooltip-label">Price</div>' +

      '<div class="isd-item-tooltip-value isd-tt-robux"></div>' +

    '</div>' +


    '<div class="isd-item-tooltip-section isd-tt-obtainment-section">' +

      '<div class="isd-item-tooltip-label">Obtainment</div>' +

      '<div class="isd-item-tooltip-value isd-tt-obtainment"></div>' +

    '</div>';


  document.body.appendChild(
    tooltip
  );


  /* =========================================================
   * RARITY COLORS
   * ========================================================= */

  var rarityColors = {

    common:
      '#9a9a9a',

    uncommon:
      '#4caf50',

    rare:
      '#3b82f6',

    epic:
      '#a855f7',

    legendary:
      '#d98c2b',

    mythical:
      '#ec4899'

  };


  /* =========================================================
   * SHOW TOOLTIP
   * ========================================================= */

  function showTooltip(card) {

    var name =
      getValue(
        card,
        [
          'name',
          'title'
        ]
      );


    var image =
      resolveImageSrc(
        card
      );


    var rarity =
      getValue(
        card,
        [
          'rarity'
        ]
      );


    var category =
      getValue(
        card,
        [
          'category',
          'type'
        ]
      );


    var description =
      getValue(
        card,
        [
          'description',
          'desc'
        ]
      );


    var stats =
      getValue(
        card,
        [
          'stats',
          'stat'
        ]
      );


    var equipment =
      getValue(
        card,
        [
          'equipment',
          'equipment-slot',
          'slot'
        ]
      );


    var appearance =
      getValue(
        card,
        [
          'appearance',
          'appearance-type'
        ]
      );


    var robux =
      getValue(
        card,
        [
          'robux',
          'price-robux',
          'robux-price'
        ]
      );


    var obtainment =
      getValue(
        card,
        [
          'obtainment',
          'source',
          'obtained-from'
        ]
      );


    /*
     * NAME
     */

    tooltip
      .querySelector(
        '.isd-item-tooltip-header'
      )
      .textContent =
        name;


    /*
     * IMAGE
     */

    setCardImage(

      tooltip.querySelector(
        '.isd-item-tooltip-img-wrap'
      ),

      tooltip.querySelector(
        '.isd-item-tooltip-img-wrap img'
      ),

      image

    );


    /*
     * RARITY
     */

    var rarityEl =
      tooltip.querySelector(
        '.isd-item-tooltip-rarity'
      );


    if (rarity) {

      rarityEl.style.display =
        '';

      rarityEl.textContent =
        capitalizeWord(
          rarity
        );

      rarityEl.style.color =
        rarityColors[
          rarity.toLowerCase()
        ] ||
        '#e8ddd4';

    } else {

      rarityEl.style.display =
        'none';

      rarityEl.textContent =
        '';

    }


    /*
     * CATEGORY
     */

    var categoryEl =
      tooltip.querySelector(
        '.isd-item-tooltip-category'
      );


    if (category) {

      categoryEl.style.display =
        '';

      categoryEl.textContent =
        capitalizeWord(
          category
        );

    } else {

      categoryEl.style.display =
        'none';

      categoryEl.textContent =
        '';

    }


    /*
     * DESCRIPTION
     */

    setSection(

      tooltip.querySelector(
        '.isd-tt-description-section'
      ),

      tooltip.querySelector(
        '.isd-tt-description'
      ),

      description

    );


    /*
     * STATS
     */

    setSection(

      tooltip.querySelector(
        '.isd-tt-stats-section'
      ),

      tooltip.querySelector(
        '.isd-tt-stats'
      ),

      stats

    );


    /*
     * EQUIPMENT
     */

    setSection(

      tooltip.querySelector(
        '.isd-tt-equipment-section'
      ),

      tooltip.querySelector(
        '.isd-tt-equipment'
      ),

      equipment

    );


    /*
     * APPEARANCE
     */

    setSection(

      tooltip.querySelector(
        '.isd-tt-appearance-section'
      ),

      tooltip.querySelector(
        '.isd-tt-appearance'
      ),

      appearance

    );


    /*
     * ROBUX
     */

    var ttRobuxSection =
      tooltip.querySelector(
        '.isd-tt-robux-section'
      );


    var ttRobuxEl =
      tooltip.querySelector(
        '.isd-tt-robux'
      );


    ttRobuxEl.textContent =
      '';


    if (robux) {

      ttRobuxSection.style.display =
        '';


      var ttRobuxImgSrc =
        getRobuxImageSrc();


      if (ttRobuxImgSrc) {

        var ttRobuxImg =
          document.createElement(
            'img'
          );


        ttRobuxImg.src =
          ttRobuxImgSrc;

        ttRobuxImg.alt =
          'Robux';

        ttRobuxImg.className =
          'isd-robux-icon';


        ttRobuxEl.appendChild(
          ttRobuxImg
        );

      }


      var ttRobuxText =
        document.createElement(
          'span'
        );


      ttRobuxText.textContent =
        robux;


      ttRobuxEl.appendChild(
        ttRobuxText
      );

    } else {

      ttRobuxSection.style.display =
        'none';

    }


    /*
     * OBTAINMENT
     */

    var ttObtainmentSection =
      tooltip.querySelector(
        '.isd-tt-obtainment-section'
      );


    var ttObtainment =
      tooltip.querySelector(
        '.isd-tt-obtainment'
      );


    if (obtainment) {

      ttObtainmentSection.style.display =
        '';

      ttObtainment.textContent =
        obtainment;

    } else {

      ttObtainmentSection.style.display =
        'none';

      ttObtainment.textContent =
        '';

    }


    /*
     * POSITION
     */

    var rect =
      card.getBoundingClientRect();


    var tooltipWidth =
      260;


    var left =
      rect.right + 10;


    if (
      left + tooltipWidth >
      window.innerWidth
    ) {

      left =
        rect.left -
        tooltipWidth -
        10;

    }


    if (left < 5) {

      left = 5;

    }


    tooltip.style.left =
      left + 'px';


    tooltip.style.top =
      rect.top + 'px';


    tooltip.classList.add(
      'isd-active'
    );


    var tooltipRect =
      tooltip.getBoundingClientRect();


    var top =
      rect.top;


    if (
      tooltipRect.bottom >
      window.innerHeight
    ) {

      top =
        window.innerHeight -
        tooltipRect.height -
        10;

    }


    if (top < 5) {

      top = 5;

    }


    tooltip.style.top =
      top + 'px';

  }


  function hideTooltip() {

    tooltip.classList.remove(
      'isd-active',
      'isd-cosmetic-tip'
    );

  }


  /* =========================================================
   * INITIALIZE GRID
   * ========================================================= */

  function initItemList() {

    var grids =
      document.querySelectorAll(
        '.isd-item-grid'
      );


    if (!grids.length) {

      return;

    }


    grids.forEach(
      function (grid) {

        /*
         * Prevent duplicate initialization.
         */

        if (
          grid.getAttribute(
            'data-isd-initialized'
          ) === 'true'
        ) {

          return;

        }


        grid.setAttribute(
          'data-isd-initialized',
          'true'
        );


        var cards =
          grid.querySelectorAll(
            '.isd-item-card'
          );


        /*
         * CARD EVENTS
         */

        cards.forEach(
          function (card) {

            card.addEventListener(
              'click',
              function (e) {

                e.preventDefault();

                e.stopPropagation();

                openModal(
                  card
                );

              }
            );


            card.addEventListener(
              'mouseenter',
              function () {

                showTooltip(
                  card
                );

              }
            );


            card.addEventListener(
              'mouseleave',
              function () {

                hideTooltip();

              }
            );

          }
        );


        /*
         * CATEGORY FILTER
         */

        var categories = [];


        cards.forEach(
          function (card) {

            var category =
              getValue(
                card,
                [
                  'category',
                  'type'
                ]
              );


            if (
              category &&
              categories.indexOf(
                category
              ) === -1
            ) {

              categories.push(
                category
              );

            }

          }
        );


        var toolbar =
          document.createElement(
            'div'
          );


        toolbar.className =
          'isd-item-toolbar';


        var categorySelect =
          null;


        if (
          categories.length > 1
        ) {

          categorySelect =
            document.createElement(
              'select'
            );


          categorySelect.className =
            'isd-item-filter';


          categorySelect.innerHTML =
            '<option value="all">All Types</option>';


          categories.forEach(
            function (category) {

              var option =
                document.createElement(
                  'option'
                );


              option.value =
                category;


              option.textContent =
                capitalizeWord(
                  category
                );


              categorySelect.appendChild(
                option
              );

            }
          );


          toolbar.appendChild(
            categorySelect
          );

        }


        /*
         * SEARCH
         */

        var searchInput =
          document.createElement(
            'input'
          );


        searchInput.type =
          'text';


        searchInput.className =
          'isd-item-search';


        searchInput.placeholder =
          'Enter name...';


        toolbar.appendChild(
          searchInput
        );


        grid.parentNode.insertBefore(
          toolbar,
          grid
        );


        function applyFilters() {

          var term =
            searchInput.value
              .trim()
              .toLowerCase();


          var category =
            categorySelect
              ? categorySelect.value
              : 'all';


          cards.forEach(
            function (card) {

              var name =
                getValue(
                  card,
                  [
                    'name',
                    'title'
                  ]
                )
                .toLowerCase();


              var cardCategory =
                getValue(
                  card,
                  [
                    'category',
                    'type'
                  ]
                );


              var matchesSearch =
                (
                  term === '' ||
                  name.indexOf(term) !== -1
                );


              var matchesCategory =
                (
                  category === 'all' ||
                  category === cardCategory
                );


              card.style.display =
                (
                  matchesSearch &&
                  matchesCategory
                )
                  ? ''
                  : 'none';

            }
          );

        }


        searchInput.addEventListener(
          'input',
          applyFilters
        );


        if (categorySelect) {

          categorySelect.addEventListener(
            'change',
            applyFilters
          );

        }

      }
    );

  }


  /*
   * INITIAL LOAD
   */

  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initItemList
    );

  } else {

    initItemList();

  }


  /*
   * MEDIAWIKI CONTENT HOOK
   *
   * Important for Fandom dynamic page loading.
   */

  if (
    typeof mw !== 'undefined' &&
    mw.hook
  ) {

    mw.hook(
      'wikipage.content'
    ).add(
      function () {

        setTimeout(
          initItemList,
          50
        );

      }
    );

  }

})();


/* =========================================================
 * SIDEBAR
 * ========================================================= */

(function () {

  function fixSidebarPosition() {

    var content =
      document.querySelector(
        '#mw-content-text .mw-parser-output'
      );


    if (!content) return;


    var sidebar =
      content.querySelector(
        '.isd-sidebar'
      );


    if (!sidebar) return;


    if (
      content.firstElementChild ===
      sidebar
    ) return;


    content.insertBefore(
      sidebar,
      content.firstChild
    );

  }


  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      fixSidebarPosition
    );

  } else {

    fixSidebarPosition();

  }

})();


/* =========================================================
 * COPY CODE BUTTON
 * ========================================================= */

mw.hook('wikipage.content').add(
  function ($content) {

    $content.on(
      'click',
      '.copy-btn',
      function () {

        var btn =
          $(this);


        if (
          btn.hasClass('copied')
        ) return;


        var code =
          btn.attr(
            'data-code'
          );


        function onSuccess() {

          btn
            .text('Copied!')
            .addClass('copied');


          setTimeout(
            function () {

              btn
                .text('Copy')
                .removeClass('copied');

            },
            2000
          );

        }


        function onFail() {

          btn.text(
            'Failed!'
          );


          setTimeout(
            function () {

              btn.text(
                'Copy'
              );

            },
            2000
          );

        }


        if (
          navigator.clipboard &&
          window.isSecureContext
        ) {

          navigator.clipboard
            .writeText(code)
            .then(onSuccess)
            .catch(
              function () {

                fallbackCopy(
                  code,
                  onSuccess,
                  onFail
                );

              }
            );

        } else {

          fallbackCopy(
            code,
            onSuccess,
            onFail
          );

        }

      }
    );


    function fallbackCopy(
      code,
      onSuccess,
      onFail
    ) {

      var temp =
        $('<textarea>')
          .css({

            position:
              'fixed',

            top:
              0,

            left:
              0,

            opacity:
              0,

            pointerEvents:
              'none'

          });


      $('body').append(
        temp
      );


      temp
        .val(code)
        .focus()
        .select();


      try {

        document.execCommand(
          'copy'
        );

        onSuccess();

      } catch (e) {

        onFail();

      }


      temp.remove();

    }

  }
);


/* =========================================================
 * EXPIRED CODES DROPDOWN
 * ========================================================= */

mw.hook('wikipage.content').add(
  function ($content) {

    $content.on(
      'click',
      '.isd-expired-header',
      function () {

        var $header =
          $(this);


        $header.toggleClass(
          'isd-expired-open'
        );


        $header
          .next(
            '.isd-expired-body'
          )
          .toggleClass(
            'isd-expired-open'
          );

      }
    );

  }
);


/* =========================================================
 * SKILL TREE
 * ========================================================= */

(function () {

  function initSkillTree() {

    var wrap =
      document.getElementById(
        'isd-skills-wrap'
      );


    if (!wrap) return;


    var slots =
      wrap.querySelectorAll(
        '.isd-skill-slot'
      );


    slots.forEach(
      function (slot) {

        slot.addEventListener(
          'click',
          function (e) {

            e.stopPropagation();


            var isActive =
              slot.classList.contains(
                'isd-skill-active'
              );


            slots.forEach(
              function (s) {

                s.classList.remove(
                  'isd-skill-active'
                );

              }
            );


            if (!isActive) {

              slot.classList.add(
                'isd-skill-active'
              );

            }

          }
        );

      }
    );


    document.addEventListener(
      'click',
      function () {

        slots.forEach(
          function (s) {

            s.classList.remove(
              'isd-skill-active'
            );

          }
        );

      }
    );

  }


  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initSkillTree
    );

  } else {

    initSkillTree();

  }

})();


/* =========================================================
 * SHOP
 * ========================================================= */

(function () {

  function initShop() {

    var root =
      document.getElementById(
        'isd-shop-root'
      );


    if (!root) return;


    var tabs =
      root.querySelectorAll(
        '.isd-shop-tab'
      );


    var panels =
      root.querySelectorAll(
        '.isd-shop-panel'
      );


    var toolbar =
      document.getElementById(
        'isd-shop-toolbar'
      );


    if (!toolbar) return;


    var searchInput =
      document.createElement(
        'input'
      );


    searchInput.type =
      'text';


    searchInput.className =
      'isd-shop-search-input';


    searchInput.placeholder =
      'Search items...';


    var categorySelect =
      document.createElement(
        'select'
      );


    categorySelect.className =
      'isd-shop-category-select';


    var categories = [
      'All',
      'Potions',
      'Ores',
      'Items'
    ];


    categories.forEach(
      function (cat) {

        var opt =
          document.createElement(
            'option'
          );


        opt.value =
          cat;


        opt.textContent =
          cat;


        categorySelect.appendChild(
          opt
        );

      }
    );


    toolbar.appendChild(
      searchInput
    );


    toolbar.appendChild(
      categorySelect
    );


    function getActivePanel() {

      var activeTab =
        root.querySelector(
          '.isd-shop-tab-active'
        );


      if (!activeTab) return null;


      return root.querySelector(
        '.isd-shop-panel[data-panel="' +
        activeTab.getAttribute(
          'data-tab'
        ) +
        '"]'
      );

    }


    function applyFilters() {

      var query =
        searchInput.value
          .trim()
          .toLowerCase();


      var cat =
        categorySelect.value;


      var panel =
        getActivePanel();


      if (!panel) return;


      var cards =
        panel.querySelectorAll(
          '.isd-shop-card'
        );


      var visibleCount =
        0;


      cards.forEach(
        function (card) {

          var name =
            (
              card.getAttribute(
                'data-name'
              ) || ''
            ).toLowerCase();


          var cardCat =
            card.getAttribute(
              'data-category'
            ) || '';


          var matchesSearch =
            name.indexOf(
              query
            ) !== -1;


          var matchesCat =
            cat === 'All' ||
            cardCat === cat;


          if (
            matchesSearch &&
            matchesCat
          ) {

            card.style.display =
              '';

            visibleCount++;

          } else {

            card.style.display =
              'none';

          }

        }
      );


      var emptyMsg =
        panel.querySelector(
          '.isd-shop-empty-msg'
        );


      if (emptyMsg) {

        emptyMsg.style.display =
          visibleCount === 0
            ? 'block'
            : 'none';

      }

    }


    tabs.forEach(
      function (tab) {

        tab.addEventListener(
          'click',
          function () {

            tabs.forEach(
              function (t) {

                t.classList.remove(
                  'isd-shop-tab-active'
                );

              }
            );


            tab.classList.add(
              'isd-shop-tab-active'
            );


            var target =
              tab.getAttribute(
                'data-tab'
              );


            panels.forEach(
              function (panel) {

                panel.style.display =
                  (
                    panel.getAttribute(
                      'data-panel'
                    ) === target
                  )
                    ? ''
                    : 'none';

              }
            );


            applyFilters();

          }
        );

      }
    );


    searchInput.addEventListener(
      'input',
      applyFilters
    );


    categorySelect.addEventListener(
      'change',
      applyFilters
    );

  }


  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initShop
    );

  } else {

    initShop();

  }

})();


/* =========================================================
 * IMPORTANT:
 * NO COSMETIC TOOLTIP OVERRIDE HERE
 *
 * The old code was replacing the universal tooltip's
 * innerHTML with .desc, which broke the universal item
 * tooltip. It has intentionally been removed.
 * ========================================================= */