/* <nowiki> */

/**
 * Script for adding "purge" option to page controls
 * Version 0.1
 * Script by User:Porter21 (http://www.falloutwiki.com)
 * i18n function by User:Dantman (http://dev.wikia.com)
 * Based on http://dev.wikia.com/wiki/PurgeButton
 */

function addPurgeButton () {
   // Configuration
   var config = window.PurgeButtonConfig = $.extend(true, {
      // English
      'en': {
         purge: 'Purge',
         purgeTip: 'Purge this page'
      }
   }, window.PurgeButtonConfig || {});

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

   if (mw.config.get('wgNamespaceNumber') < 0) {
      return;
   }

   switch (mw.config.get('skin')) {
      case 'monobook':
      case 'hydra':
      case 'vector':
         $('#p-cactions > div > ul').append('<li id="ca-purge"><a href="' + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(mw.config.get('wgPageName')) + '&action=purge' + '" title="' + msg('purgeTip') + '">' + msg('purge') + '</a></li>');
         break;
   }
}

jQuery(function($) {
   addPurgeButton();
});

/* </nowiki> */