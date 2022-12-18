/* <nowiki> */

/* ######################################################################## */
/* ### JavaScript here is loaded for users using the Vector skin.       ### */
/* ######################################################################## */

/* ######################################################################## */
/* ### SCRIPT LOADER (VECTOR)                                           ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Loads all Vector-specific scripts                   ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function vaultScriptLoaderVector () {
   mw.loader.using('jquery.hoverIntent', function () {
      usabilityImprovements();
      vectorActionButtons();
   });
   visualVectorFixes();
}

jQuery(function($) {
   vaultScriptLoaderVector();
});

/* ######################################################################## */
/* ### USABILITY IMPROVEMENTS                                           ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Changes to improve usability                        ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function hoverMenuShowHide (action, element, parent) {
   var activeMenuClass = 'va-hover-active';

   if (!action || !element) {
      return;
   }

   if (parent) {
      element = element.parents(parent);
   }

   if (action == 'show') {
      // Add class
      element.addClass(activeMenuClass);

      // Hide search suggestions when hover menus are active
      $('#searchInputSuggest').css('visibility', 'hidden');
      $('div.suggestions').hide();
   } else if (action == 'hide') {
      // Remove class
      element.removeClass(activeMenuClass);
   }
}

function usabilityImprovements () {
   // Replace CSS hover with JS-based hoverIntent
   var hoverIntentElements = $('#mw-panel .portal:not(#p-Explore), #p-personal, #mw-head .vectorMenu');

   $('body').addClass('hoverintent-enabled');

   hoverIntentElements.hoverIntent(function () {
      hoverMenuShowHide('show', $(this));
   }, function () {
      hoverMenuShowHide('hide', $(this));
   });

   $('#p-cactions')
      .find('h5 a')
         .unbind('click')
         .click(function (e) {
            hoverMenuShowHide('show', $(this), 'div.vectorMenu');
            e.preventDefault();
         });

   // Convert tooltips for text inputs to placeholders
   var phSimpleSearch = $('#simpleSearch > #searchInput');
   var phInputs = '';

   if (phSimpleSearch.length) {
      phSimpleSearch.attr('title', '');
   } else {
      phInputs += (phInputs ? ', ' : '') + '#searchInput';
   }

   if (mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') {
      if ($('#wpSummary + #wpTextbox1').length) {
         $('#wpSummary').attr('title', 'Enter the title of your message');
      }

      phInputs += (phInputs ? ', ' : '') + '#wpSummary';
   }

   phInputs = $(phInputs);

   phInputs.each(function () {
      $(this).attr({ placeholder: $(this).attr('title').replace(/ \[.+\]/, ''), title: '' });
   });

   if (!('placeholder' in document.createElement('input'))) {
      phInputs.placeholder();
   } else {
      // FIXME: Check whether still necessary after next Steam browser update
      // Patch broken placeholder support for Steam ingame browser (placeholder text not removed on focus)
      // (Steam browser is significant enough for a gaming wiki, I suppose)
      if (navigator.userAgent.indexOf('Valve Steam GameOverlay') > -1) {
         $('[placeholder]').bind('focus drop keydown paste', function () {
            if ($(this).val() == '') {
               $(this).val('');
            }
         });
      }
   }
}

/* ######################################################################## */
/* ### VECTOR ACTION BUTTONS                                            ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Add action buttons to top navigation                ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */
 
function vectorActionButtons () {
   var vabDefaultOption = 'n-randompage';
   var vabOptionCookie = $.cookie('vab-button-default');
   var vabSplitButton = $('#p-Explore').detach();

   // Get preference for "split" button from cookie & re-save
   if (vabOptionCookie) {
      vabDefaultOption = vabOptionCookie;
   }

   $.cookie('vab-button-default', vabDefaultOption, {'expires': 365, 'path': '/'});

   // Get default option
   vabDefaultOption = vabSplitButton
      .find('#' + vabDefaultOption + ' a:first')
         .clone()
         .removeAttr('accesskey')
         .addClass('vab-default');

   // Rearrange HTML, attach events, re-insert
   vabSplitButton
      .prepend(vabDefaultOption)
      .mouseleave(function() {
         hoverMenuShowHide('hide', $(this));
      })
      .find('a.vab-default')
         .mouseenter(function() {
            hoverMenuShowHide('hide', $(this), 'div.portal');
         })
         .end()
      .find('h5')
         .hoverIntent(function () {
            hoverMenuShowHide('show', $(this), 'div.portal');
         }, function () {
         })
         .html('')
         .wrap('<div class="vab-expand" />')
         .end()
      .find('.body > ul > li > a')
         .click(function() {
            $.cookie('vab-button-default', $(this).parent().attr('id'), {'expires': 365, 'path': '/'});
            return true;
         })
         .end()
      .insertBefore('#p-tb');
}

/* ######################################################################## */
/* ### VISUAL VECTOR FIXES                                              ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Resolves various visual issues with Vector          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function visualVectorFixes () {
   // Move "in other languages" links to bottom of page
   var langLinks = $('#p-lang');

   if (langLinks.length) {
      var catLinks = $('#catlinks');
      var newClass = '';

      if (!(catLinks.length) || catLinks.hasClass('catlinks-allhidden')) {
         newClass = 'p-lang-nocatlinks';
      }

      langLinks.attr('class', newClass).insertBefore($('#bodyContent .visualClear').last());
   }

}

/* </nowiki> */