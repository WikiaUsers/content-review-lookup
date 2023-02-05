/* <nowiki> */

/**
 * Script for adding a floating toolbar to the bottom of the page
 * Version 2.01
 * Script by User:Porter21 (http://www.falloutwiki.com)
 */

function floatingToolbar () {
   // i18n
   var ftbLabels = {
      purge: 'Purge',
      showMessages: 'Show message names',
      toggle: 'Show/hide toolbar',
      toTop: 'Back to top'
   };
   // Caching
   window.ftbToolbarState = $.cookie('ftb-toolbar-state');
   var ftbPageName = mw.util.wikiUrlencode(mw.config.get('wgPageName'));
   var ftbWrapper = $('#global-wrapper');

   // If no cookie, set default state
   if (window.ftbToolbarState === null) {
      window.ftbToolbarState = "show";
      $.cookie('ftb-toolbar-state', window.ftbToolbarState, {'expires': 365, 'path': '/'});
   }

   // Copy & modify "views"
   var ftbButtons = new Array();
   var ftbButtonsOut = '';

   $('#p-views > ul > li').each(function () {
      thisList = $(this);
      thisLink = thisList.find('span:first > a:first');

      ftbButtons[ftbButtons.length] = new Array (thisLink.text(), thisLink.attr('href'), 'ftb-' + thisList.attr('id'));
   });

   // Copy & modify "actions"
   $('#p-cactions > .menu > ul > li').each(function () {
      thisList = $(this);
      thisLink = thisList.children('a:first');

      ftbButtons[ftbButtons.length] = new Array (thisLink.text(), thisLink.attr('href'), 'ftb-' + thisList.attr('id'));
   });

   // Create output for "views" & "actions" 
   $.each(ftbButtons, function(index) {
      ftbButtonsOut += '<li id="' + ftbButtons[index][2] + '" class="ftb-button"><a href="' + ftbButtons[index][1] + '">' + ftbButtons[index][0] + '</a></li>';
   });

   // Copy & modify "toolbox"
   var ftbToolbox = new Array();
   var ftbToolboxOut = '';

   $('#p-tb > .body > ul > li').each(function () {
      thisList = $(this);
      thisLink = thisList.children('a:first');

      ftbToolbox[ftbToolbox.length] = new Array (thisLink.text(), thisLink.attr('href'), 'ftb-' + thisList.attr('id'));
   });

   // Create output for "toolbox" 
   $.each(ftbToolbox, function(index) {
      ftbToolboxOut += '<li id="' + ftbToolbox[index][2] + '" class="ftb-toolbox-item"><a href="' + ftbToolbox[index][1] + '">' + ftbToolbox[index][0] + '</a></li>';
   });

   // Assemble toolbar
   var ftbInner =
      '<div id="ftb-toolbar-inner">'
      + (ftbButtonsOut ? '<ul id="ftb-buttons">' + ftbButtonsOut + '</ul>' : '')
      + (ftbToolboxOut ? '<div id="ftb-toolbox">'
         + '<div id="ftb-toolbox-button">' + $('#p-tb > h5').text() + ' '+ vaultConfig.chevronUp + '</div>'
         + '<ul id="ftb-toolbox-menu">' + ftbToolboxOut + '</ul>'
         + '</div>' : '')
      + '</div>';

   var ftbButtonToTop =
      '<div id="ftb-button-totop" class="ftb-button-fixed" title="'
      + ftbLabels.toTop
      + '"><div class="ftb-button-fixed-icon"></div></div>';

   var ftbButtonToggle =
      '<div id="ftb-button-toggle" class="ftb-button-fixed" title="'
      + ftbLabels.toggle
      + '"><div class="ftb-button-fixed-icon"></div></div>';

   var ftbToolbar = 
      '<div id="ftb-toolbar-anchor" class="noprint">'
      + '<div id="ftb-toolbar"' + (window.ftbToolbarState == "hide" ? ' class="ftb-toolbar-collapsed"' : '') + '>'
      + ftbButtonToTop
      + ftbInner
      + ftbButtonToggle
      + '</div></div>';

   // Insert toolbar
   ftbWrapper.append(ftbToolbar);

   // Set up "click" event for "toggle toolbar"
   $('#ftb-button-toggle').click(function() {
      $('#ftb-toolbar-inner').animate({ height: "toggle" }, "fast", function () {
         $('#ftb-toolbar').toggleClass('ftb-toolbar-collapsed');
         window.ftbToolbarState = (window.ftbToolbarState == "show" ? "hide" : "show");
         $.cookie('ftb-toolbar-state', window.ftbToolbarState, {'expires': 365, 'path': '/'});
      });
   });

   // Set up "click" event for "back to top"
   $('#ftb-button-totop').click(function() {
      $('html, body').scrollTop(0);
   });

   // Set up "hoverIntent" event for toolbox
   $('#ftb-toolbox').hoverIntent(function () {
      $(this).addClass('ftb-toolbox-active');
   }, function () {
      $(this).removeClass('ftb-toolbox-active');
   });
}

jQuery(function($) {
   if (mw.config.get('skin') == 'vector') {
      floatingToolbar();
   }
});

/* </nowiki> */