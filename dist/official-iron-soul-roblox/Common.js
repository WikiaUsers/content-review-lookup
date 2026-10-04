// Please tell us the line if theres any problem thank you!

/* Load Playfair Display font */
(function () {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap';
  document.head.appendChild(link);
})();


/* =========================================================
   ITEM SYSTEM
   ONE SINGLE MODAL FOR PC + MOBILE
   ========================================================= */

(function () {

  function initItemSystem() {

    var grids = document.querySelectorAll('.isd-item-grid');

    if (!grids.length) return;


    /* -----------------------------------------------------
       REMOVE OLD ITEM MODALS / TOOLTIP SYSTEMS
       ----------------------------------------------------- */

    var oldSelectors = [
      '.isd-item-modal-overlay',
      '.isd-new-item-overlay',
      '.isd-item-popup',
      '.isd-new-item-popup',
      '.isd-item-tooltip'
    ];

    oldSelectors.forEach(function (selector) {

      document.querySelectorAll(selector).forEach(function (el) {

        el.remove();

      });

    });


    /* -----------------------------------------------------
       REMOVE OLD ITEM STYLE
       ----------------------------------------------------- */

    var oldStyle =
      document.getElementById('isd-new-item-popup-style');

    if (oldStyle) {
      oldStyle.remove();
    }


    var oldTooltipStyle =
      document.getElementById('isd-item-tooltip-style');

    if (oldTooltipStyle) {
      oldTooltipStyle.remove();
    }


    /* =====================================================
       HELPERS
       ===================================================== */

    function safeImageSrc(url) {

      return (
        typeof url === 'string' &&
        url.indexOf(
          'https://static.wikia.nocookie.net/'
        ) === 0
      )
        ? url
        : '';

    }


    function resolveImageSrc(card, data) {

      var direct =
        safeImageSrc(data.image);

      if (direct) {
        return direct;
      }


      var thumb =
        card.querySelector(
          '.isd-grid-img img, .isd-item-card img'
        );


      return thumb
        ? safeImageSrc(thumb.src)
        : '';

    }


    function capitalizeWord(value) {

      if (!value) return '';

      return String(value)
        .split('-')
        .map(function (word) {

          return (
            word.charAt(0).toUpperCase() +
            word.slice(1)
          );

        })
        .join(' ');

    }


    function getRobux(card) {

      var value =
        card.getAttribute('data-robux');


      if (
        value === null ||
        String(value).trim() === ''
      ) {

        value =
          card.getAttribute('data-rbx');

      }


      if (
        value === null ||
        String(value).trim() === ''
      ) {

        value =
          card.getAttribute(
            'data-robux-price'
          );

      }


      return (
        value !== null
          ? String(value).trim()
          : ''
      );

    }


    function setObtainment(
      element,
      price,
      source
    ) {

      element.textContent = '';


      price =
        price !== undefined &&
        price !== null
          ? String(price).trim()
          : '';


      source =
        source !== undefined &&
        source !== null
          ? String(source).trim()
          : '';


      if (price) {

        var priceSpan =
          document.createElement('span');

        priceSpan.className =
          'isd-price';

        priceSpan.textContent =
          price;

        element.appendChild(
          priceSpan
        );


        if (source) {

          element.appendChild(
            document.createTextNode(
              ' from '
            )
          );


          var sourceSpan =
            document.createElement('span');

          sourceSpan.className =
            'isd-source';

          sourceSpan.textContent =
            source;

          element.appendChild(
            sourceSpan
          );

        }

      } else {

        element.textContent =
          source || '—';

      }

    }


    /* =====================================================
       MODAL CSS
       ===================================================== */

    var modalStyle =
      document.createElement('style');

    modalStyle.id =
      'isd-single-item-modal-style';


    modalStyle.textContent = `

      /* ================================================
         OVERLAY
         ================================================ */

      .isd-single-item-overlay {

        position: fixed !important;

        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;

        width: 100vw !important;
        height: 100vh !important;

        display: flex !important;

        align-items: center !important;
        justify-content: center !important;

        padding: 20px !important;

        box-sizing: border-box !important;

        background:
          rgba(0, 0, 0, 0.74) !important;

        opacity: 0 !important;

        visibility: hidden !important;

        pointer-events: none !important;

        transition:
          opacity .18s ease,
          visibility .18s ease !important;

        z-index: 2147483647 !important;

      }


      .isd-single-item-overlay.isd-single-item-open {

        opacity: 1 !important;

        visibility: visible !important;

        pointer-events: auto !important;

      }


      /* ================================================
         MODAL
         ================================================ */

      .isd-single-item-modal {

        position: relative !important;

        width: 100% !important;

        max-width: 430px !important;

        max-height:
          calc(100vh - 40px) !important;

        overflow-y: auto !important;

        box-sizing: border-box !important;

        margin: 0 auto !important;

        background:
          linear-gradient(
            180deg,
            #1c1512 0%,
            #120d0b 100%
          ) !important;

        border:
          1px solid #4a3a30 !important;

        border-radius: 14px !important;

        box-shadow:
          0 25px 70px
          rgba(0,0,0,.72) !important;

        color: #f3e9df !important;

        padding: 18px !important;

        transform:
          scale(.94)
          translateY(8px) !important;

        transition:
          transform .18s ease !important;

        -webkit-overflow-scrolling:
          touch !important;

      }


      .isd-single-item-open
      .isd-single-item-modal {

        transform:
          scale(1)
          translateY(0) !important;

      }


      /* ================================================
         HEADER
         ================================================ */

      .isd-single-item-header {

        display: flex !important;

        align-items: center !important;

        justify-content:
          space-between !important;

        gap: 12px !important;

        margin-bottom: 13px !important;

      }


      .isd-single-item-title {

        flex: 1 1 auto !important;

        min-width: 0 !important;

        font-family:
          'Playfair Display',
          Georgia,
          serif !important;

        font-size: 21px !important;

        font-weight: 800 !important;

        line-height: 1.15 !important;

        color: #f3dfce !important;

        word-break: break-word !important;

      }


      .isd-single-item-close {

        flex:
          0 0 32px !important;

        width: 32px !important;

        height: 32px !important;

        min-width: 32px !important;

        border-radius: 50% !important;

        border:
          1px solid #665044 !important;

        background:
          #211713 !important;

        color: #eadbd0 !important;

        display: flex !important;

        align-items: center !important;

        justify-content: center !important;

        font-size: 22px !important;

        line-height: 1 !important;

        cursor: pointer !important;

        padding: 0 !important;

        -webkit-tap-highlight-color:
          transparent !important;

      }


      .isd-single-item-close:hover {

        background:
          #39251d !important;

      }


      /* ================================================
         IMAGE
         ================================================ */

      .isd-single-item-image-wrap {

        width: 100% !important;

        min-height: 130px !important;

        max-height: 240px !important;

        margin-bottom: 13px !important;

        border-radius: 10px !important;

        background:
          #0d0908 !important;

        border:
          1px solid #3c2d26 !important;

        display: flex !important;

        align-items: center !important;

        justify-content: center !important;

        overflow: hidden !important;

        box-sizing: border-box !important;

      }


      .isd-single-item-image {

        display: block !important;

        max-width: 100% !important;

        max-height: 230px !important;

        width: auto !important;

        height: auto !important;

        object-fit: contain !important;

      }


      .isd-single-item-image-fallback {

        display: none !important;

        color: #8e8179 !important;

        font-size: 13px !important;

      }


      .isd-single-item-image-wrap.isd-no-image
      .isd-single-item-image {

        display: none !important;

      }


      .isd-single-item-image-wrap.isd-no-image
      .isd-single-item-image-fallback {

        display: block !important;

      }


      /* ================================================
         BADGES
         ================================================ */

      .isd-single-item-basic {

        display: flex !important;

        flex-wrap: wrap !important;

        gap: 7px !important;

        margin-bottom: 4px !important;

      }


      .isd-single-item-badge {

        display: inline-flex !important;

        align-items: center !important;

        min-height: 27px !important;

        padding:
          4px 9px !important;

        border-radius: 999px !important;

        background:
          #251b17 !important;

        border:
          1px solid #4a3930 !important;

        font-size: 12px !important;

        font-weight: 700 !important;

        box-sizing: border-box !important;

      }


      /* ================================================
         SECTIONS
         ================================================ */

      .isd-single-item-section {

        border-top:
          1px solid #33251f !important;

        padding:
          11px 0 3px !important;

      }


      .isd-single-item-label {

        font-size: 10px !important;

        text-transform: uppercase !important;

        letter-spacing:
          .08em !important;

        color: #9e8b80 !important;

        font-weight: 700 !important;

        margin-bottom: 4px !important;

      }


      .isd-single-item-value {

        color: #eadfd8 !important;

        font-size: 14px !important;

        line-height: 1.5 !important;

        word-break: break-word !important;

      }


      .isd-single-item-robux {

        color: #f2c978 !important;

        font-weight: 800 !important;

      }


      /* ================================================
         MOBILE
         ================================================ */

      @media (max-width: 700px) {

        .isd-single-item-overlay {

          padding: 10px !important;

        }


        .isd-single-item-modal {

          width:
            100% !important;

          max-width:
            360px !important;

          max-height:
            calc(100vh - 20px) !important;

          padding:
            14px !important;

          border-radius:
            13px !important;

        }


        .isd-single-item-title {

          font-size:
            19px !important;

        }


        .isd-single-item-close {

          flex-basis:
            30px !important;

          width:
            30px !important;

          height:
            30px !important;

          min-width:
            30px !important;

          font-size:
            20px !important;

        }


        .isd-single-item-image-wrap {

          min-height:
            105px !important;

          max-height:
            180px !important;

        }


        .isd-single-item-image {

          max-height:
            170px !important;

        }


        .isd-single-item-value {

          font-size:
            13px !important;

          line-height:
            1.45 !important;

        }


        .isd-single-item-section {

          padding-top:
            9px !important;

        }

      }


      @media (max-width: 380px) {

        .isd-single-item-modal {

          max-width:
            100% !important;

          padding:
            12px !important;

        }


        .isd-single-item-title {

          font-size:
            18px !important;

        }


        .isd-single-item-image-wrap {

          min-height:
            90px !important;

          max-height:
            150px !important;

        }


        .isd-single-item-image {

          max-height:
            140px !important;

        }

      }

    `;


    document.head.appendChild(
      modalStyle
    );


    /* =====================================================
       CREATE ONE SINGLE MODAL
       ===================================================== */

    var overlay =
      document.createElement('div');

    overlay.id =
      'isd-single-item-overlay';

    overlay.className =
      'isd-single-item-overlay';


    overlay.innerHTML =

      '<div class="isd-single-item-modal">' +

        '<div class="isd-single-item-header">' +

          '<div class="isd-single-item-title"></div>' +

          '<button ' +
            'type="button" ' +
            'class="isd-single-item-close" ' +
            'aria-label="Close">' +
            '&times;' +
          '</button>' +

        '</div>' +


        '<div class="isd-single-item-image-wrap">' +

          '<img ' +
            'class="isd-single-item-image" ' +
            'src="" ' +
            'alt="">' +

          '<div class="isd-single-item-image-fallback">' +
            'No image yet' +
          '</div>' +

        '</div>' +


        '<div class="isd-single-item-basic">' +

          '<div class="isd-single-item-badge isd-single-rarity"></div>' +

          '<div class="isd-single-item-badge isd-single-category"></div>' +

        '</div>' +


        '<div class="isd-single-item-section isd-single-description-section">' +

          '<div class="isd-single-item-label">' +
            'Description' +
          '</div>' +

          '<div class="isd-single-item-value isd-single-description"></div>' +

        '</div>' +


        '<div class="isd-single-item-section isd-single-stats-section">' +

          '<div class="isd-single-item-label">' +
            'Stats' +
          '</div>' +

          '<div class="isd-single-item-value isd-single-stats"></div>' +

        '</div>' +


        '<div class="isd-single-item-section isd-single-equipment-section">' +

          '<div class="isd-single-item-label">' +
            'Equipment Slot' +
          '</div>' +

          '<div class="isd-single-item-value isd-single-equipment"></div>' +

        '</div>' +


        '<div class="isd-single-item-section isd-single-obtainment-section">' +

          '<div class="isd-single-item-label">' +
            'Obtainment' +
          '</div>' +

          '<div class="isd-single-item-value isd-single-obtainment"></div>' +

        '</div>' +


        '<div class="isd-single-item-section isd-single-robux-section">' +

          '<div class="isd-single-item-label">' +
            'Robux' +
          '</div>' +

          '<div class="isd-single-item-value isd-single-item-robux"></div>' +

        '</div>' +

      '</div>';


    document.body.appendChild(
      overlay
    );


    /* =====================================================
       RARITY COLORS
       ===================================================== */

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


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeItemModal() {

      overlay.classList.remove(
        'isd-single-item-open'
      );


      document.body.style.overflow = '';

      document.documentElement.style.overflow = '';

    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    function openItemModal(card) {

      var data =
        card.dataset;


      /* NAME */

      overlay.querySelector(
        '.isd-single-item-title'
      ).textContent =
        data.name || '';


      /* IMAGE */

      var imageWrap =
        overlay.querySelector(
          '.isd-single-item-image-wrap'
        );


      var image =
        overlay.querySelector(
          '.isd-single-item-image'
        );


      image.onerror = null;


      var imageSrc =
        resolveImageSrc(
          card,
          data
        );


      imageWrap.classList.remove(
        'isd-no-image'
      );


      if (imageSrc) {

        image.onerror =
          function () {

            imageWrap.classList.add(
              'isd-no-image'
            );

          };


        image.src =
          imageSrc;

      } else {

        image.removeAttribute(
          'src'
        );

        imageWrap.classList.add(
          'isd-no-image'
        );

      }


      /* RARITY */

      var rarity =
        capitalizeWord(
          data.rarity
        );


      var rarityEl =
        overlay.querySelector(
          '.isd-single-rarity'
        );


      if (rarity) {

        rarityEl.style.display =
          'inline-flex';

        rarityEl.textContent =
          rarity;

        rarityEl.style.color =
          rarityColors[
            String(
              data.rarity || ''
            ).toLowerCase()
          ] ||
          '#e8ddd4';

      } else {

        rarityEl.style.display =
          'none';

        rarityEl.textContent =
          '';

      }


      /* CATEGORY */

      var category =
        capitalizeWord(
          data.category
        );


      var categoryEl =
        overlay.querySelector(
          '.isd-single-category'
        );


      if (category) {

        categoryEl.style.display =
          'inline-flex';

        categoryEl.textContent =
          category;

      } else {

        categoryEl.style.display =
          'none';

        categoryEl.textContent =
          '';

      }


      /* DESCRIPTION */

      var descriptionSection =
        overlay.querySelector(
          '.isd-single-description-section'
        );


      var descriptionValue =
        overlay.querySelector(
          '.isd-single-description'
        );


      if (
        data.description &&
        String(
          data.description
        ).trim() !== ''
      ) {

        descriptionSection.style.display =
          '';

        descriptionValue.textContent =
          data.description;

      } else {

        descriptionSection.style.display =
          'none';

        descriptionValue.textContent =
          '';

      }


      /* STATS */

      var statsSection =
        overlay.querySelector(
          '.isd-single-stats-section'
        );


      var statsValue =
        overlay.querySelector(
          '.isd-single-stats'
        );


      if (
        data.stats &&
        String(
          data.stats
        ).trim() !== ''
      ) {

        statsSection.style.display =
          '';

        statsValue.textContent =
          data.stats;

      } else {

        statsSection.style.display =
          'none';

        statsValue.textContent =
          '';

      }


      /* EQUIPMENT SLOT */

      var equipmentSection =
        overlay.querySelector(
          '.isd-single-equipment-section'
        );


      var equipmentValue =
        overlay.querySelector(
          '.isd-single-equipment'
        );


      if (
        data.equipmentSlot &&
        String(
          data.equipmentSlot
        ).trim() !== ''
      ) {

        equipmentSection.style.display =
          '';

        equipmentValue.textContent =
          data.equipmentSlot;

      } else {

        equipmentSection.style.display =
          'none';

        equipmentValue.textContent =
          '';

      }


      /* OBTAINMENT */

      var obtainmentSection =
        overlay.querySelector(
          '.isd-single-obtainment-section'
        );


      var obtainmentValue =
        overlay.querySelector(
          '.isd-single-obtainment'
        );


      var hasObtainment =
        data.obtainment &&
        String(
          data.obtainment
        ).trim() !== '';


      var hasPrice =
        data.price &&
        String(
          data.price
        ).trim() !== '';


      if (
        hasObtainment ||
        hasPrice
      ) {

        obtainmentSection.style.display =
          '';

        setObtainment(
          obtainmentValue,
          data.price,
          data.obtainment
        );

      } else {

        obtainmentSection.style.display =
          'none';

        obtainmentValue.textContent =
          '';

      }


      /* ROBUX */

      var robuxSection =
        overlay.querySelector(
          '.isd-single-robux-section'
        );


      var robuxValue =
        overlay.querySelector(
          '.isd-single-item-robux'
        );


      var robux =
        getRobux(card);


      if (robux) {

        robuxSection.style.display =
          '';

        robuxValue.textContent =
          robux;

      } else {

        robuxSection.style.display =
          'none';

        robuxValue.textContent =
          '';

      }


      /* OPEN */

      overlay.classList.add(
        'isd-single-item-open'
      );


      document.body.style.overflow =
        'hidden';

      document.documentElement.style.overflow =
        'hidden';

    }


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    overlay.querySelector(
      '.isd-single-item-close'
    ).addEventListener(
      'click',
      function (event) {

        event.preventDefault();

        event.stopPropagation();

        closeItemModal();

      }
    );


    /* =====================================================
       CLICK OUTSIDE
       ===================================================== */

    overlay.addEventListener(
      'click',
      function (event) {

        if (
          event.target === overlay
        ) {

          closeItemModal();

        }

      }
    );


    /* =====================================================
       ESC
       ===================================================== */

    document.addEventListener(
      'keydown',
      function (event) {

        if (
          event.key === 'Escape' ||
          event.key === 'Esc'
        ) {

          if (
            overlay.classList.contains(
              'isd-single-item-open'
            )
          ) {

            closeItemModal();

          }

        }

      }
    );


    /* =====================================================
       CARD EVENTS
       ===================================================== */

    grids.forEach(function (grid) {

      var cards =
        grid.querySelectorAll(
          '.isd-item-card'
        );


      cards.forEach(function (card) {

        card.addEventListener(
          'click',
          function (event) {

            event.preventDefault();

            event.stopPropagation();

            openItemModal(card);

          }
        );

      });


      /* ===================================================
         CATEGORY FILTER
         =================================================== */

      var categories = [];


      cards.forEach(function (card) {

        var category =
          card.dataset.category;


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

      });


      function capitalize(value) {

        return String(value)
          .split('-')
          .map(function (word) {

            return (
              word.charAt(0).toUpperCase() +
              word.slice(1)
            );

          })
          .join(' ');

      }


      /* ===================================================
         TOOLBAR
         =================================================== */

      var toolbar =
        document.createElement('div');

      toolbar.className =
        'isd-item-toolbar';


      var categorySelect =
        null;


      if (
        categories.length > 1
      ) {

        categorySelect =
          document.createElement('select');

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
              capitalize(category);

            categorySelect.appendChild(
              option
            );

          }
        );


        toolbar.appendChild(
          categorySelect
        );

      }


      var searchInput =
        document.createElement('input');

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


      /* ===================================================
         FILTER
         =================================================== */

      function applyFilters() {

        var term =
          searchInput.value
            .trim()
            .toLowerCase();


        var selectedCategory =
          categorySelect
            ? categorySelect.value
            : 'all';


        cards.forEach(
          function (card) {

            var name =
              (
                card.dataset.name ||
                ''
              ).toLowerCase();


            var cardCategory =
              card.dataset.category ||
              '';


            var matchesSearch =
              (
                term === '' ||
                name.indexOf(term) !== -1
              );


            var matchesCategory =
              (
                selectedCategory === 'all' ||
                selectedCategory ===
                  cardCategory
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

    });

  }


  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initItemSystem
    );

  } else {

    initItemSystem();

  }

})();

/* =========================
   DESKTOP ITEM TOOLTIP
   ========================= */

(function () {

  function initDesktopItemTooltip() {

    var grids = document.querySelectorAll(
      '.isd-item-grid'
    );

    if (!grids.length) return;


    /* =========================
       HELPERS
       ========================= */

    function safeImageSrc(url) {

      return (
        typeof url === 'string' &&
        url.indexOf(
          'https://static.wikia.nocookie.net/'
        ) === 0
      ) ? url : '';

    }


    function resolveImageSrc(card, d) {

      var direct = safeImageSrc(d.image);

      if (direct) return direct;

      var thumb = card.querySelector(
        '.isd-grid-img img, .isd-item-card img'
      );

      return thumb
        ? safeImageSrc(thumb.src)
        : '';

    }


    function capitalizeWord(s) {

      return s
        ? s.split('-').map(function (w) {

            return (
              w.charAt(0).toUpperCase() +
              w.slice(1)
            );

          }).join(' ')
        : '';

    }


    function getRobux(card) {

      var value = card.getAttribute(
        'data-robux'
      );

      if (
        value === null ||
        String(value).trim() === ''
      ) {

        value = card.getAttribute(
          'data-rbx'
        );

      }

      if (
        value === null ||
        String(value).trim() === ''
      ) {

        value = card.getAttribute(
          'data-robux-price'
        );

      }

      return value !== null
        ? String(value).trim()
        : '';

    }


    function setTooltipImage(wrap, img, src) {

      img.onerror = null;

      wrap.classList.remove(
        'isd-no-image'
      );

      if (!src) {

        wrap.classList.add(
          'isd-no-image'
        );

        img.removeAttribute(
          'src'
        );

        return;

      }

      img.onerror = function () {

        wrap.classList.add(
          'isd-no-image'
        );

      };

      img.src = src;

    }


    function setObtainmentField(
      el,
      price,
      source
    ) {

      el.textContent = '';

      if (price) {

        var priceSpan =
          document.createElement('span');

        priceSpan.className =
          'isd-price';

        priceSpan.textContent =
          price;

        el.appendChild(
          priceSpan
        );


        if (source) {

          el.appendChild(
            document.createTextNode(
              ' from '
            )
          );


          var sourceSpan =
            document.createElement('span');

          sourceSpan.className =
            'isd-source';

          sourceSpan.textContent =
            source;

          el.appendChild(
            sourceSpan
          );

        }

      } else {

        el.textContent =
          source || '—';

      }

    }


    /* =========================
       CREATE DESKTOP TOOLTIP
       ========================= */

    var tooltip =
      document.createElement('div');

    tooltip.className =
      'isd-item-tooltip';


    tooltip.innerHTML =

      '<div class="isd-item-tooltip-header"></div>' +

      '<div class="isd-item-tooltip-img-wrap">' +

        '<img src="" alt="">' +

        '<div class="isd-item-tooltip-img-fallback">' +
          'No image yet' +
        '</div>' +

      '</div>' +

      '<div class="isd-item-tooltip-section">' +

        '<div class="isd-item-tooltip-rarity"></div>' +

        '<div class="isd-item-tooltip-category"></div>' +

      '</div>' +

      '<div class="isd-item-tooltip-section isd-tt-description-section">' +

        '<div class="isd-item-tooltip-label">' +
          'Description' +
        '</div>' +

        '<div class="isd-item-tooltip-value isd-tt-description"></div>' +

      '</div>' +

      '<div class="isd-item-tooltip-section isd-tt-stats-section">' +

        '<div class="isd-item-tooltip-label">' +
          'Stats' +
        '</div>' +

        '<div class="isd-item-tooltip-value isd-tt-stats"></div>' +

      '</div>' +

      '<div class="isd-item-tooltip-section isd-tt-equipment-section">' +

        '<div class="isd-item-tooltip-label">' +
          'Equipment Slot' +
        '</div>' +

        '<div class="isd-item-tooltip-value isd-tt-equipment"></div>' +

      '</div>' +

      '<div class="isd-item-tooltip-section isd-tt-obtainment-section">' +

        '<div class="isd-item-tooltip-label">' +
          'Obtainment' +
        '</div>' +

        '<div class="isd-item-tooltip-value isd-tt-obtainment"></div>' +

      '</div>' +

      '<div class="isd-item-tooltip-section isd-tt-robux-section">' +

        '<div class="isd-item-tooltip-label">' +
          'Robux' +
        '</div>' +

        '<div class="isd-item-tooltip-value isd-tt-robux"></div>' +

      '</div>';


    document.body.appendChild(
      tooltip
    );


    /* =========================
       SHOW TOOLTIP
       ========================= */

    function showTooltip(card) {

      if (window.innerWidth <= 700) {

        return;

      }

      var d = card.dataset;


      /* NAME */

      tooltip.querySelector(
        '.isd-item-tooltip-header'
      ).textContent =
        d.name || '';


      /* IMAGE */

      setTooltipImage(

        tooltip.querySelector(
          '.isd-item-tooltip-img-wrap'
        ),

        tooltip.querySelector(
          '.isd-item-tooltip-img-wrap img'
        ),

        resolveImageSrc(
          card,
          d
        )

      );


      /* RARITY */

      var rarityEl =
        tooltip.querySelector(
          '.isd-item-tooltip-rarity'
        );

      var rarity =
        capitalizeWord(
          d.rarity
        );

      rarityEl.textContent =
        rarity;


      /* CATEGORY */

      var categoryEl =
        tooltip.querySelector(
          '.isd-item-tooltip-category'
        );

      categoryEl.textContent =
        capitalizeWord(
          d.category
        );


      /* DESCRIPTION */

      var descSection =
        tooltip.querySelector(
          '.isd-tt-description-section'
        );

      var descValue =
        tooltip.querySelector(
          '.isd-tt-description'
        );


      if (
        d.description &&
        String(d.description).trim() !== ''
      ) {

        descSection.style.display =
          '';

        descValue.textContent =
          d.description;

      } else {

        descSection.style.display =
          'none';

        descValue.textContent =
          '';

      }


      /* STATS */

      var statsSection =
        tooltip.querySelector(
          '.isd-tt-stats-section'
        );

      var statsValue =
        tooltip.querySelector(
          '.isd-tt-stats'
        );


      if (
        d.stats &&
        String(d.stats).trim() !== ''
      ) {

        statsSection.style.display =
          '';

        statsValue.textContent =
          d.stats;

      } else {

        statsSection.style.display =
          'none';

        statsValue.textContent =
          '';

      }


      /* EQUIPMENT */

      var equipmentSection =
        tooltip.querySelector(
          '.isd-tt-equipment-section'
        );

      var equipmentValue =
        tooltip.querySelector(
          '.isd-tt-equipment'
        );


      if (
        d.equipmentSlot &&
        String(d.equipmentSlot).trim() !== ''
      ) {

        equipmentSection.style.display =
          '';

        equipmentValue.textContent =
          d.equipmentSlot;

      } else {

        equipmentSection.style.display =
          'none';

        equipmentValue.textContent =
          '';

      }


      /* OBTAINMENT */

      var obtainmentSection =
        tooltip.querySelector(
          '.isd-tt-obtainment-section'
        );

      var obtainmentValue =
        tooltip.querySelector(
          '.isd-tt-obtainment'
        );


      if (
        (
          d.obtainment &&
          String(d.obtainment).trim() !== ''
        ) ||
        (
          d.price &&
          String(d.price).trim() !== ''
        )
      ) {

        obtainmentSection.style.display =
          '';

        setObtainmentField(

          obtainmentValue,

          d.price,

          d.obtainment

        );

      } else {

        obtainmentSection.style.display =
          'none';

        obtainmentValue.textContent =
          '';

      }


      /* ROBUX */

      var robuxSection =
        tooltip.querySelector(
          '.isd-tt-robux-section'
        );

      var robuxValue =
        tooltip.querySelector(
          '.isd-tt-robux'
        );

      var robux =
        getRobux(card);


      if (robux) {

        robuxSection.style.display =
          'block';

        robuxValue.textContent =
          robux;

      } else {

        robuxSection.style.display =
          'none';

        robuxValue.textContent =
          '';

      }


      /* =========================
         POSITION TOOLTIP
         ========================= */

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


      /* =========================
         KEEP INSIDE SCREEN
         ========================= */

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


    /* =========================
       HIDE TOOLTIP
       ========================= */

    function hideTooltip() {

      tooltip.classList.remove(
        'isd-active'
      );

    }


    /* =========================
       DESKTOP HOVER
       ========================= */

    grids.forEach(function (grid) {

      var cards =
        grid.querySelectorAll(
          '.isd-item-card'
        );


      cards.forEach(function (card) {

        card.addEventListener(
          'mouseenter',
          function () {

            showTooltip(card);

          }
        );


        card.addEventListener(
          'mouseleave',
          function () {

            hideTooltip();

          }
        );

      });

    });


    /* =========================
       RESIZE
       ========================= */

    window.addEventListener(
      'resize',
      function () {

        if (
          window.innerWidth <= 700
        ) {

          hideTooltip();

        }

      }
    );

  }


  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initDesktopItemTooltip
    );

  } else {

    initDesktopItemTooltip();

  }

})();


/* =========================
   SIDEBAR
   ========================= */

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
    ) {

      return;

    }


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


/* =========================
   COPY CODE BUTTON
   ========================= */

mw.hook(
  'wikipage.content'
).add(
  function ($content) {

    $content.on(
      'click',
      '.copy-btn',
      function () {

        var btn =
          $(this);


        if (
          btn.hasClass('copied')
        ) {

          return;

        }


        var code =
          btn.attr('data-code');


        function onSuccess() {

          btn.text(
            'Copied!'
          ).addClass(
            'copied'
          );


          setTimeout(
            function () {

              btn.text(
                'Copy'
              ).removeClass(
                'copied'
              );

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
        $('<textarea>').css({

          position: 'fixed',

          top: 0,

          left: 0,

          opacity: 0,

          pointerEvents:
            'none'

        });


      $('body').append(
        temp
      );


      temp.val(code)
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


/* =========================
   EXPIRED CODES DROPDOWN
   ========================= */

mw.hook(
  'wikipage.content'
).add(
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


        $header.next(
          '.isd-expired-body'
        ).toggleClass(
          'isd-expired-open'
        );

      }
    );

  }
);

/* =========================
   SKILL TREE
   ========================= */

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


/* =========================
   SHOP
   ========================= */

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
            name.indexOf(query) !== -1;


          var matchesCat =
            (
              cat === 'All'
            ) ||
            (
              cardCat === cat
            );


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


/* =========================
   SEPARATE COSMETIC TOOLTIP
   ========================= */

$(function () {

  var cosmeticTip =
    document.createElement(
      'div'
    );


  cosmeticTip.className =
    'isd-item-tooltip isd-cosmetic-tooltip';


  document.body.appendChild(
    cosmeticTip
  );


  function showCosmeticTip(card) {

    if (
      window.innerWidth <= 700
    ) {

      return;

    }


    var desc =
      card.querySelector(
        '.desc'
      );


    if (!desc) return;


    cosmeticTip.innerHTML =
      desc.innerHTML;


    cosmeticTip.classList.add(
      'isd-cosmetic-tip'
    );


    var rect =
      card.getBoundingClientRect();


    var tipW =
      210;


    var left =
      rect.right + 12;


    if (
      left + tipW >
      window.innerWidth
    ) {

      left =
        rect.left -
        tipW -
        12;

    }


    if (left < 5) {

      left = 5;

    }


    cosmeticTip.style.left =
      left + 'px';


    cosmeticTip.style.top =
      rect.top + 'px';


    cosmeticTip.classList.add(
      'isd-active'
    );


    var tipRect =
      cosmeticTip.getBoundingClientRect();


    var top =
      rect.top;


    if (
      tipRect.bottom >
      window.innerHeight
    ) {

      top =
        window.innerHeight -
        tipRect.height -
        10;

    }


    if (top < 5) {

      top = 5;

    }


    cosmeticTip.style.top =
      top + 'px';

  }


  function hideCosmeticTip() {

    cosmeticTip.classList.remove(
      'isd-active',
      'isd-cosmetic-tip'
    );

  }


  $(document)

    .on(
      'mouseenter',
      '.isd-grid-item,.iss-card',
      function () {

        showCosmeticTip(this);

      }
    )

    .on(
      'mouseleave',
      '.isd-grid-item,.iss-card',
      function () {

        hideCosmeticTip();

      }
    );


});


/* =========================
   REMOVE OLD ITEM MODALS
   ========================= */

(function () {

  function removeOldItemModals() {

    var selectors = [
      '.isd-item-modal-overlay',
      '.isd-cosmetics-modal-overlay',
      '.isd-item-modal',
      '.isd-cosmetics-modal',
      '.item-modal-overlay',
      '.cosmetics-modal-overlay'
    ];


    selectors.forEach(
      function (selector) {

        document
          .querySelectorAll(selector)
          .forEach(
            function (el) {

              /*
               * Do not remove the new modal.
               */
              if (
                !el.classList.contains(
                  'isd-new-item-overlay'
                )
              ) {

                el.remove();

              }

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
      removeOldItemModals
    );

  } else {

    removeOldItemModals();

  }

})();


/* =========================
   FINAL MOBILE MODAL SAFETY
   ========================= */

(function () {

  function setupMobileModalSafety() {

    var overlay =
      document.querySelector(
        '.isd-new-item-overlay'
      );


    if (!overlay) return;


    /*
     * Make sure the new modal always
     * stays centered on the screen.
     */

    overlay.style.alignItems =
      'center';

    overlay.style.justifyContent =
      'center';


    function checkScreen() {

      if (
        window.innerWidth <= 700
      ) {

        overlay.style.alignItems =
          'center';

        overlay.style.justifyContent =
          'center';

      } else {

        overlay.style.alignItems =
          'center';

        overlay.style.justifyContent =
          'center';

      }

    }


    checkScreen();


    window.addEventListener(
      'resize',
      checkScreen
    );

  }


  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      setupMobileModalSafety
    );

  } else {

    setupMobileModalSafety();

  }

})();


/* =========================
   PLEASE DISREGARD PREVIOUS SENT FOR REVIEW. THIS WOULD BE OUR TEMPORARY FINAL JS
   ========================= */