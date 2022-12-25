/*
 * @module        Ripple.js
 * @description   Adds a ripple effect to most buttons.
 * @author        Polymeric
 * @license       CC-BY-SA 3.0
 * @notes         Please install Ripple.css for complete functionality.
 *                - Allow users to disable pre-defined ripples (so you can add
 *                  it only to an element, e.g. a button that another scripts
 *                  adds), but also allow wikis to re-enable them.
 *                - Add possibility to delay ripple end animation through a css
 *                  variable.
 * 
 *                Feel free to update this script if you want to adress any of
 *                these tasks!
*/

mw.hook('wikipage.content').add(function() {
  'use strict';

  // Double run protection.
  if (window.ripplesLoaded) return;

  window.ripplesLoaded = true;

  if (typeof ripplesConfig.noCSS === 'boolean' && ripplesConfig.noCSS !== true) importArticle({ article: 'u:dev:MediaWiki:Ripple.css' });

  // Defining CSSConfig here so all functions have access to it.
  var isKeyPressed = false;
  var CSSConfig = {
    'duration': '',
    'endDuration': '',
    'maxRadius': '',
    'minDuration': '',
    'timingFunction': ''
  };

  // Default elements that will get ripples.
  var rippleTypes = {
    'normal': Array.from(document.querySelectorAll('button:not([disabled], :disabled), .wds-button:not(.wds-is-active, .wds-is-disabled, [disabled], :disabled), #toc a, #sticky-toc a, .wds-tabs__tab, .ui-button, .oo-ui-buttonElement:not(.oo-ui-widget-disabled) .oo-ui-buttonElement-button, .oo-ui-menuOptionWidget.oo-ui-optionWidget, .mw-ui-button:not([disabled], :disabled), .wds-dropdown__content .wds-list.wds-is-linked > li > a:not(.wds-button), .global-navigation__signout-button, .user-profile-navigation__link, .unified-search__profiles__profile, .sub-head--done, .infobox-builder-button, .wikiEditor-ui .wikiEditor-ui-toolbar .group .tool-select .menu .options .option, .wikiEditor-ui .wikiEditor-ui-toolbar, ul.categories a .booklet .index div, #my-tools-menu a, [data-ripple]')),
    'unbounded': Array.from(document.querySelectorAll('.page-side-tool, .page-header__actions .wds-dropdown > .wds-dropdown__toggle, .page-header__actions > .page-header__action-button:first-child, .wikia-bar-collapse, .wds-floating-button:not(.wds-is-disabled, [disabled], :disabled), [data-unbounded]')),
    'recentered': Array.from(document.querySelectorAll('.wiki-tools.wds-button-group > .wds-button, .unified-search-pagination a, .wds-button.wds-is-square, .sub-head--cancel, .tool.oo-ui-buttonElement-frameless.oo-ui-iconElement, #msupload-container, .wikiEditor-ui .wikiEditor-ui-toolbar .page-characters div span, .category-layout-selector > li, [data-recentered]')),
    'noInk': Array.from(document.querySelectorAll('[data-no-ink]'))
  }

  // If the user has specified custom elements to have/not have ripples,
  // concadenate or subtract nodes from the list accordingly before doing
  // anything else.
  if (typeof ripplesConfig === 'object') {
    var customNormalRipples = typeof ripplesConfig.normalRipples === 'object' ? Array.from(ripplesConfig.normalRipples) : [];
    var customUnboundedRipples = typeof ripplesConfig.unboundedRipples === 'object' ? Array.from(ripplesConfig.unboundedRipples) : [];
    var customRecenteredRipples = typeof ripplesConfig.recenteredRipples === 'object' ? Array.from(ripplesConfig.recenteredRipples) : [];
    var customNoInkRipples = typeof ripplesConfig.noInk === 'object' ? Array.from(ripplesConfig.noInk) : [];

    // Combining both pre-defined and user-defined arrays of elements to
    // apply ripples to all of them with each variant respectvely.
    rippleTypes.normal = rippleTypes.normal.concat(customNormalRipples);
    rippleTypes.unbounded = rippleTypes.unbounded.concat(customUnboundedRipples);
    rippleTypes.recentered = rippleTypes.recentered.concat(customRecenteredRipples);
    rippleTypes.noInk = rippleTypes.noInk.concat(customNoInkRipples);
    var allRipples = new Set(rippleTypes.normal.concat(rippleTypes.unbounded, rippleTypes.recentered));
  } else {
    // Combine pre-defined arrays of all ripple elements into one.
    var allRipples = new Set(rippleTypes.normal.concat(rippleTypes.unbounded, rippleTypes.recentered));
  }

  // Looks for elements with data-attributes so those are replaced with the
  // actual attributes that makes ripples work for them. It also
  // initializes all ripple functions.
  rippleTypes.noInk.forEach(function(elem) {
    if (elem.hasAttribute('data-no-ink')) elem.removeAttribute('data-no-ink');
    elem.setAttribute('no-ink', '');
  });

  allRipples.forEach(function(elem) {
    if (elem.hasAttribute('data-ripple')) elem.removeAttribute('data-ripple');
    if (!elem.hasAttribute('no-ink')) ripplesInit(elem);
  });

  rippleTypes.unbounded.forEach(function(elem) {
    if (elem.hasAttribute('data-unbounded')) elem.removeAttribute('data-unbounded');
    elem.setAttribute('unbounded', '');
  });

  rippleTypes.recentered.forEach(function(elem) {
    if (elem.hasAttribute('data-recentered')) elem.removeAttribute('data-recentered');
    elem.setAttribute('recentered', '');
  });

  // Set up elements so they can have ripples.
  // Note: the original script works by creating a shadow DOM element so it's
  // isolated from any light DOM styles and scripts. That's a ES6 thing so
  // it's not possible to do that here.
  function rippleSetup(elem) {
    var rippleContainer = document.createElement('div');
    rippleContainer.classList.add('ripple-surface');
    elem.appendChild(rippleContainer);
    elem.setAttribute('ripple', '');

    // Make it also respond to "Enter"/"Space" key presses (maybe we could
    // add a small countdown here to prevent users from spamming it?).
    elem.addEventListener('keydown', function(event) {
      if (event.code === 'Space' || event.code === 'Enter') {
        isKeyPressed = true;
        showRipple(elem);
      }
    });
  }

  // Initializes ripple's behavior on selected elements.
  function ripplesInit(elem) {
    // Set up ripples.
    rippleSetup(elem);

    // Show ripple animation on click.
    elem.addEventListener('mousedown', function(e) {
      showRipple(elem, e);
    });

    // Hide ripple on mouse up/leave or when focus is lost.
    ['mouseup', 'mouseleave', 'focusout'].forEach(function(events) {
      elem.addEventListener(events, function() {
        hideRipple(elem);
      });
    });
  }

  // Shows ripple when the user clicks on setted-up elements.
  // Here we get the X and Y center coordinates which will be mostly used in
  // case the ripple's type is either unbounded/centered (grows from the
  // center of the element to the borders) or re-centered (grows from where
  // you clicked, but the ink will go to the center of the element during the
  // animation). If it's neither of those, it will grow from where you
  // clicked and it will stay there.
  //
  // It uses the logarithm of the element's radius multiplied by the radius
  // itself to give a slow-down effect as the ripple reaches the element's
  // borders enhanced by the cubic-bezier timing function that further
  // smooths the animation out. It also uses the distance from the cursor
  // to the borders to calculate the ripple's radius and, thus, the
  // animaiton's duration.
  function showRipple(elem, e) {
    // Add configurations based off of CSS custom properties' values to
    // make it easy to customize a ripple on a per-element basis and as a
    // group of elements as well.
    CSSConfig = {
      'duration':       getComputedStyle(elem).getPropertyValue('--ripple-config__duration--ms'),
      'endDuration':    getComputedStyle(elem).getPropertyValue('--ripple-config__end-duration--ms'),
      'maxRadius':      getComputedStyle(elem).getPropertyValue('--ripple-config__max-radius--px'),
      'minDuration':    getComputedStyle(elem).getPropertyValue('--ripple-config__min-duration--ms'),
      'timingFunction': getComputedStyle(elem).getPropertyValue('--ripple-config__timing-function')
    };

    var centered = elem.hasAttribute('unbounded');
    var recentered = elem.hasAttribute('recentered');

    var MAX_RADIUS_PX = numVal(CSSConfig.maxRadius) || 300;
    var MIN_DURATION_MS = numVal(CSSConfig.minDuration) || 800;
    var rect = elem.getBoundingClientRect();

    var roundedCenterX = function() {
      return Math.round(rect.width / 2);
    };

    var roundedCenterY = function() {
      return Math.round(rect.height / 2);
    };

    if (centered || isKeyPressed) {
      var x = roundedCenterX();
      var y = roundedCenterY();
    } else {
      var sourceEvent = e;
      var x = Math.round(sourceEvent.clientX - rect.left);
      var y = Math.round(sourceEvent.clientY - rect.top);
    }

    var corners = [
      { x: 0, y: 0 },
      { x: rect.width, y: 0 },
      { x: 0, y: rect.height },
      { x: rect.width, y: rect.height }
    ];

    var distance = function(x1, y1, x2, y2) {
      var xDelta = x1 - x2;
      var yDelta = y1 - y2;
      return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
    };

    var cornerDistances = corners.map((function(corner) {
      return Math.round(distance(x, y, corner.x, corner.y));
    }));

    var radius = Math.min(MAX_RADIUS_PX, Math.max.apply(Math, cornerDistances));
    var startTranslate = x - radius + 'px, ' + (y - radius) + 'px';

    if (recentered) {
      // Moves ripple to the center of the element.
      var endTranslate = roundedCenterX() - radius + 'px, ' + (roundedCenterY() - radius) + 'px';
    } else {
      // Keeps ripple where the click happened.
      var endTranslate = startTranslate;
    }

    // Create ripple element.
    var rippleContainer = elem.querySelector('.ripple-surface');
    var ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.height = ripple.style.width = 2 * radius + 'px';
    rippleContainer.appendChild(ripple);

    ripple.animate({
      transform: [
        'translate(' + startTranslate + ') scale(0)', 'translate(' + endTranslate + ') scale(1)'
      ]
    }, {
      duration: numVal(CSSConfig.duration) || Math.max(MIN_DURATION_MS, Math.log(radius) * radius) || 0,
      // Unfortunately there's no built-in function in js that checks wether
      // a string is a valid timing function or not, and given the amount of
      // params and combnations you can put in it, I feel like we'd end up
      // with a unnecessarily big function to just check for that.
      easing: CSSConfig.timingFunction || 'cubic-bezier(.2, .9, .1, .9)',
      fill: 'forwards'
    });

    var opacity = getComputedStyle(ripple).opacity;

    if (!opacity.length) {
      removeRipple();
    }

    function removeRipple() {
      ripple.remove();
    }

    // Prevent stacking up tons of ripples when using keyboard controls.
    if (isKeyPressed) hideRipple(elem);
  }

  // Hides ripple with a short fade-out animation before removing it from
  // the DOM. It's triggered upon mouse-up, mouse-leave, or focus-out from
  // the element (see rippleInit()).
  function hideRipple(elem) {
    var ripple = elem.querySelectorAll('.ripple');

    ripple.forEach(function(elem) {
      var opacity = getComputedStyle(elem).opacity;

      var animation = elem.animate({
        opacity: [opacity, 0] }, {
        duration: numVal(CSSConfig.endDuration) || handleOpacityDecayDuration(),
        fill: 'forwards'
      });

      animation.addEventListener('finish', removeRipple);
      animation.addEventListener('cancel', removeRipple);

      function removeRipple() {
        elem.remove();
      }
    });

    function handleOpacityDecayDuration() {
      if (isKeyPressed) {
        isKeyPressed = false;
        return 400;
      } else {
        return 150;
      }
    }
  }

  // Helper function that returns "false" if the value can't be converted to
  // a number or its value is NaN (Number.isNan() returns "true"), which
  // will make situations that need it use a fallback number when that
  // happens. Otherwise it will return the (positive) number itself.
  // This is to prevent strings returned from custom properties's values in
  // CSSConfig() to be anything that is not "false" or a number, which
  // would cause errors.
  function numVal(num) {
    if (Number.isNaN(parseInt(num))) {
      return false;
    } else {
      return Math.abs(parseInt(num));
    }
  }

  // Add ripples to lazy-loaded elements.
  // Thanks to Arashiryuu#3000 for the feedback!
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(elem) {
        var lazyElements = new Set(Array.from(elem.querySelectorAll(':is(.wds-button, .user-profile-navigation__link, .wds-floating-button, .wds-dropdown__toggle, .ViewMoreReplies, .content-size-toggle, [class^="ActionItem_action-item"], li, [class*="EntityTopBar_icon-trash-open"], .rich-text-editor__toolbar__icon-controls, .rich-text-editor__toolbar__icon-wrapper, button, .wikiEditor-ui-toolbar .oo-ui-buttonElement-button, .editOptions .oo-ui-buttonElement-button, .oo-ui-tool-link, .oo-ui-popupToolGroup-handle, .ui-button, .wikiEditor-ui-toolbar .page-characters div span, .wikiEditor-ui-toolbar .booklet > .index > div, .ve-fd-header__actions a, .ve-ui-summaryPanel-checkboxActionRow .oo-ui-buttonElement-button, .ve-ui-summaryPanel-checkboxActionRow .oo-ui-buttonElement):not([ripple], [no-ink])')));
        lazyElements.forEach(function(elem) {
          ripplesInit(elem);
        });
      });
    });
  });
  observer.observe(document.querySelector('.page__main'), { childList: true, subtree: true });
});