// <nowiki>
/* Script for adding commonly used action buttons to Oasis' bottom toolbar
 * Version 0.7
 * Script by User:Porter21 (http://fallout.wikia.com)
 * i18n function by User:Dantman
 */

function addOasisToolbarButtons () {
   var encodedPagename = encodeURIComponent(wgPageName);
   var pageControls = (wgNamespaceNumber == 2 || wgNamespaceNumber == 3) ? $('#WikiaUserPagesHeader') : $('#WikiaPageHeader');
   var toolbar = $('#WikiaFooter ul.tools');
   var toolbarButtons = '';
   // Configuration
   var userconfig = (window.OasisToolbarButtonsConfig) ? window.OasisToolbarButtonsConfig : {};
   var config = $.extend(true, {
      purgeOnly: true,
      userLang: true,
      // Deutsch
      de: {
         addTopic: "Thema hinzuf.",
         deleteThis: "Löschen",
         edit: "Bearbeiten",
         editWithForm: "Form.",
         history: "Versionen",
         move: "Verschieben",
         protect: "Schützen",
         purge: "Neu laden",
         undelete: "Wiederherst.",
         unprotect: "Freigeben",
         viewSource: "Quelltext",
         whatLinksHere: "Links"
      },
      // English
      en: {
         addTopic: "Add topic",
         deleteThis: "Delete",
         edit: "Edit",
         editWithForm: "form",
         history: "History",
         move: "Move",
         protect: "Protect",
         purge: "Purge",
         undelete: "Undelete",
         unprotect: "Unprotect",
         viewSource: "View source",
         whatLinksHere: "What links here"
      },
      // Español
      es: {
         addTopic: "Añadir tema",
         deleteThis: "Borrar",
         edit: "Editar",
         editWithForm: "form.",
         history: "Historial",
         move: "Mover",
         protect: "Proteger",
         purge: "Purgar",
         undelete: "Restaurar",
         unprotect: "Desproteger",
         viewSource: "Código fuente",
         whatLinksHere: "Lo que enlaza aquí"
      },
      // Français
      fr: {
         addTopic: "Ajouter disc.",
         deleteThis: "Supprimer",
         edit: "Modifier",
         editWithForm: "form.",
         history: "Historique",
         move: "Renommer",
         protect: "Protéger",
         purge: "Purger",
         undelete: "Restaurer",
         unprotect: "Déprotéger",
         viewSource: "Texte source",
         whatLinksHere: "Pages liées"
      }
   }, userconfig);

   // Function for multi-language support (by Daniel Friesen aka User:Dantman)
   function msg(name) {
      if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] )
         return config[wgUserLanguage][name];
      if ( wgContentLanguage in config && name in config[wgContentLanguage] )
         return config[wgContentLanguage][name];
      return config.en[name];
   }

   // Function for adding a custom toolbar button
   function createToolbarLink (createButton, buttonName, linkAction, linkPrefix, addText) {
      var result = '<a href="/index.php?title=' + ((linkPrefix) ? linkPrefix : '') + encodedPagename + ((linkAction) ? '&action=' + linkAction : '') + '">' + msg((buttonName) ? buttonName : '') + '</a>' + ((addText) ? addText : '');

      if (createButton) {
         toolbarButtons += '<li>' + result + '</li>';
      } else {
         return result;
      }
   }

   // Adding buttons
   if (wgNamespaceNumber != -1) {
	  if (typeof wgRestrictionEdit == "undefined") { // Fix for purge button causing editor to hang on loading while creating page
         var canEdit = (wgRestrictionEdit[0] && $.inArray(wgRestrictionEdit[0], wgUserGroups) == -1) ? false : true;
         var canMove = (wgRestrictionMove[0] && $.inArray(wgRestrictionMove[0], wgUserGroups) == -1) ? false : true;
	  } else {
	     var canEdit = (wgRestrictionCreate[0] && $.inArray(wgRestrictionCreate[0], wgUserGroups == -1) ? false: true; // wgRestrictionCreate is defined as opposed to wgRestrictionEdit when creating a page
		 var canMove = false; // Can't possible move a non-existant page
	  }
      var isSysop = $.inArray("sysop", wgUserGroups) > -1 ? true : false;
 
      if (!config.purgeOnly) {
         if (canEdit) {
            // "Edit" button
            createToolbarLink (true, 'edit', 'edit', '', (($('a[data-id="form-edit"]', pageControls).length > 0) ? ' (' + createToolbarLink (false, 'editWithForm', 'formedit') + ')' : ''));

            // "Add topic" button (talk pages)
            if (wgNamespaceNumber % 2 == 1) {
               createToolbarLink (true, 'addTopic', 'edit&section=new');
            }
         } else {
            // "View source" button
            createToolbarLink (true, 'viewSource', 'edit');
         }

         // "Move" button
         if (canMove) {
            createToolbarLink (true, 'move', '', 'Special:MovePage/');
         }

         if (isSysop) { 
            // "(Un)Protect" button
            if (wgNamespaceNumber != 8 && (wgRestrictionEdit != "" || wgRestrictionMove != "")) {
               createToolbarLink (true, 'unprotect', 'unprotect');
            } else {
               createToolbarLink (true, 'protect', 'protect');
            }

            // "(Un)Delete" button
            if ($('a[data-id="undelete"]', pageControls).length > 0) {
               createToolbarLink (true, 'undelete', '', 'Special:Undelete&target=');
            } else {
               createToolbarLink (true, 'deleteThis', 'delete');
            }
         }
      }

      // "Purge" button
      createToolbarLink (true, 'purge', 'purge');

      if (!config.purgeOnly) {
         // "History" button
         createToolbarLink (true, 'history', 'history');

         // "What links here" button
         createToolbarLink (true, 'whatLinksHere', '', 'Special:WhatLinksHere/');
      }

      // Add buttons to toolbar
      if (config.purgeOnly) {
         $('#my-tools-menu', toolbar).parent().before(toolbarButtons);
      } else {
         toolbar.prepend(toolbarButtons);
      }
   }
}

jQuery(function($) {
   if (skin == 'oasis' || skin == 'wikia') {
      addOasisToolbarButtons ();
   }
});
// </nowiki>