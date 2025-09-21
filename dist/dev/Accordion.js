/*
 * @module        Accordion.js
 * @description   Adds collapsible accordion component into pages.
 * @author        Polymeric
 * @license       CC-BY-SA 3.0
 * @notes         Please install accordion.css for complete functionality.
*/

mw.hook('wikipage.content').add(function() {
  'use strict';

  // Double run protection.
  //if (window.accordionLoaded) return;

  window.accordionLoaded = true;

  importArticle({ article: 'u:dev:MediaWiki:Accordion.css' });

  var accordionWrapper = document.querySelectorAll('.accordions__wrapper');
  var icons = {
    'arrow':  '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000" class="accordion__icon accordion__icon--arrow" aria-hidden="true"><path d="M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z"/></svg>',
    'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#000" class="accordion__icon accordion__icon--plus" aria-hidden="true"><path d="M 19 12.994 L 5 12.994 L 5 10.994 L 19 10.994 L 19 12.994 Z" class="accordion__icon--plus-h"></path><path d="M 5 -13 L 19 -13 L 19 -11 L 5 -11 L 5 -13 Z" class="accordion__icon--plus-v" style="transform: rotate(90deg);"></path></svg>'
  };

  // Upgrade each first-level accordion.
  accordionWrapper.forEach(function(elem) {
    upgradeAccordionDOM(elem);
  });

  // Re-selecting accordion wrappers with upgraded content so we can also
  // upgrade nested accordions.
  accordionWrapper = document.querySelectorAll('.accordions__wrapper.upgraded__accordion');

  accordionWrapper.forEach(function(elem) {
    var nestedAccordion = elem.querySelectorAll('.accordions__wrapper');

    if (nestedAccordion.length > 0) {
      nestedAccordion.forEach(function(elem) {
        upgradeAccordionDOM(elem);

        nestedAccordion = elem.querySelectorAll('.accordions__wrapper .accordion');

        nestedAccordion.forEach(function(elem) {
          elem.classList.add('nested-accordion');
        });
      });
    }

    elem.removeAttribute('data-accordions-type');
    elem.removeAttribute('data-animation-duration');
  });

  function upgradeAccordionDOM(elem) {
    var accordions = elem.querySelectorAll('.accordion');
    var type = elem.getAttribute('data-accordions-type');
    var classes = {
      'main': 'accordion__' + type,
      'header': 'accordion__' + type + '--header',
      'panel': 'accordion__' + type + '--panel'
    };

    elem.classList.add('upgraded__accordion');

    accordions.forEach(function(elem) {
      // Change .accordion's tag from <div> to <section>.
      var section = document.createElement('section');
      section.innerHTML = elem.innerHTML;
      elem.replaceWith(section);

      // Update header and panel classes.
      var nestedAccordion = section.querySelectorAll('.accordions__wrapper');
      var accordionHeader = section.querySelector('.accordion--header');
      var accordionPanel = section.querySelector('.accordion--panel');

      section.classList.add('accordion', classes.main);
      accordionHeader.classList.add(classes.header);
      accordionPanel.classList.add(classes.panel);

      // Adds header icon.
      if (nestedAccordion.length > 0) {
        accordionHeader.insertAdjacentHTML('afterbegin', icons.plus);
      } else {
        accordionHeader.insertAdjacentHTML('afterbegin', icons.arrow);
      }

      // Accordion a11y: respond to clicks and keyboard buttons as well.
      // 
      // SPACE/ENTER: Open selected accordion.
      // ARROW UP/ARROW LEFT: Go to the previous accordion of the list.
      // ARROW DOWN/ARROW RIGHT: Go to the next accordion of the list.
      // HOME: Go to the first accordion of the list.
      // END: Go to the last accordion of the list.
      accordionHeader.addEventListener('click', function() {
        var ariaState = accordionHeader.getAttribute('aria-expanded');

        if (ariaState === 'true') {
          collapseAccordion();
        } else {
          expandAccordion();
        }
      });

      window.addEventListener('keydown', function(event) {
        if (event.target === accordionHeader) keyboardControls(event.code);
      });

      function keyboardControls(code) {
        var prevAccordion = accordionHeader.parentNode.previousElementSibling,
            nextAccordion = accordionHeader.parentNode.nextElementSibling,
            accordionWrapper = accordionHeader.parentNode.parentNode;

        switch(code) {
          case 'Space':
          case 'Enter':
            event.preventDefault();
            accordionHeader.click();
          break;

          case 'ArrowUp':
          case 'ArrowLeft':
            if (prevAccordion !== null) {
              event.preventDefault();
              prevAccordion.querySelector('.accordion--header').focus();
            }
          break;

          case 'ArrowDown':
          case 'ArrowRight':
            if (nextAccordion !== null) {
              event.preventDefault();
              nextAccordion.querySelector('.accordion--header').focus();
            }
          break;

          case 'Home':
            event.preventDefault();
            accordionWrapper.querySelector('.accordion:first-child > .accordion--header').focus();
          break;

          case 'End':
            event.preventDefault();
            accordionWrapper.querySelector('.accordion:last-child > .accordion--header').focus();
          break;
        }
      }

      // We use a data-type attribute so editors can specify the initial
      // state of the accordion component. Then we make it into an actual
      // aria-attribute that also shows/hides it from assistive technologies.
      // Once the aria-attribute has been created with it's respective value,
      // we remove the data-type one as we don't need it anymore.
      var ariaExpandVal = accordionHeader.getAttribute('data-aria-expanded');
      // @todo: Add proper support for animations (like animating closing/
      // opening a panel). Currently only icons are animated.
      var animationDuration = section.parentNode.getAttribute('data-animation-duration');

      if (animationDuration !== null) {
        section.parentNode.style.setProperty('--accordion-animation-duration', ' ' + animationDuration + 'ms');
        section.parentNode.classList.add('is-animated');
      }
      /* var contentsHeight = accordionPanel.offsetHeight; */

      accordionHeader.setAttribute('aria-expanded', ariaExpandVal);

      ariaExpandVal === 'true' ? expandAccordion() : collapseAccordion();
      accordionHeader.removeAttribute('data-aria-expanded');

      function expandAccordion() {
        accordionHeader.setAttribute('aria-expanded', 'true');
        accordionPanel.setAttribute('aria-hidden', 'false');
      }
    
      function collapseAccordion() {
        accordionHeader.setAttribute('aria-expanded', 'false');
        accordionPanel.setAttribute('aria-hidden', 'true');
      }

      // Adds the amount of list elements into the aria-label when the user expands
      // a link accordion. This way the user is always contextualized with the
      // accordion's contents and can determine beforehand wether it's worth
      // navigating through it or not.
      if (section.classList.contains('accordion__links')) {
        var listItems = section.querySelectorAll('.accordion--panel li');
        var header = section.querySelector('.accordion--header');

        header.addEventListener('click', function() {
          var listItemsCount = listItems.length;
          var headerLabel = header.textContent;
          // @todo: i18n these strings.
          // I feel like there's a simpler way to do this but I'm just too
          // dumb/lazy to figure it out. :^)
          var updatedHeaderLabel = {
            'singular': headerLabel + '; Expanded list with ' + listItemsCount + ' element',
            'plural': headerLabel + '; Expanded list with ' + listItemsCount + ' elements'
          };

          if (header.getAttribute('aria-expanded') === 'true' && listItemsCount === 1) {
            // The .replace() method removes a newline generated the
            // "headerLabel" variable.
            header.setAttribute('aria-label', updatedHeaderLabel.singular.replace(/(\r\n|\n|\r)/gm, ''));
          } else if (header.getAttribute('aria-expanded') === 'true' && listItemsCount !== 1) {
            header.setAttribute('aria-label', updatedHeaderLabel.plural.replace(/(\r\n|\n|\r)/gm, ''));
          } else {
            // We remove the "aria-label" attribute if the accordion is collapsed
            // because it should *not* match the element's visible text. 
            header.removeAttribute('aria-label');
          }
        });
      }
    });
  }

  // Give an id to each accordion and update classes based off of it.
  var accordions = document.querySelectorAll('.accordion');

  for (var i = 0; i < accordions.length; i++) {
    accordions[i].id = 'accordion-' + (i + 1);
  }

  accordions.forEach(function(elem) {
    var accordionHeader = elem.querySelector('.accordion--header');
    var accordionPanel = elem.querySelector('.accordion--panel');

    setAttributes(accordionHeader, {
      'id': elem.id + '--header',
      'tabindex': '0',
      'role': 'button'
    });

    setAttributes(accordionPanel, {
      'id': elem.id + '--panel',
      'role': 'region',
      'aria-labelledby': accordionHeader.id
    });

    // Adding this attribute after the rest as it needs to wait for
    // accordionPanel's id to exist before it's value can be applied.
    accordionHeader.setAttribute('aria-controls', accordionPanel.id);
  });

  // Helper function (allows to set multiple attributes at once).
  function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
});