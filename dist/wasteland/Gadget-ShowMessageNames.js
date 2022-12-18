/* <nowiki> */

/**
 * Script for adding "show message names" option to toolbox
 * Version 0.2
 * Script by User:Porter21 (http://www.falloutwiki.com)
 * i18n function by User:Dantman (http://dev.wikia.com)
 * Based on http://en.wikipedia.org/wiki/MediaWiki:Gadget-ShowMessageNames.js
 */

function addMessageNameButton () {
   // Configuration
   var config = window.ShowMessageNamesConfig = $.extend(true, {
      // English
      'en': {
         showMessage: 'Show message names',
         showMessageTip: 'Show this page with messages from the user interface substituted with their names'
      }
   }, window.ShowMessageNamesConfig || {});

   // Function for multi-language support (by Daniel Friesen aka User:Dantman)
   function msg(name) {
      if (config.userLang && mw.config.get('wgUserLanguage') in config
         && name in config[mw.config.get('wgUserLanguage')]) {
         return config[mw.config.get('wgUserLanguage')][name];
      }
      if (mw.config.get('wgContentLanguage') in config 
         && name in config[mw.config.get('wgContentLanguage')]) {
         return config[mw.config.get('wgContentLanguage')][name];
      }
      return config.en[name];
   }

   switch (mw.config.get('skin')) {
      case 'monobook':
      case 'vector':
         $('#p-tb > div > ul').append('<li id="t-messagenames"><a href="' + location.href.replace(location.hash, '') + (location.search ? '&' : '?') + 'uselang=qqx" title="' + msg('showMessageTip') + '">' + msg('showMessage') + '</a></li>');
         break;
   }
}

jQuery(function($) {
   addMessageNameButton();
});

/* </nowiki> */