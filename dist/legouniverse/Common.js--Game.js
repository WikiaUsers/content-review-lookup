/* Any JavaScript here will be loaded for all users on every page load. */
// *************************
// Template:Game positioning
// *************************

// credit to Fallout wiki

function addTitleIcons() {
   if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
      var insertTarget;

      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'monaco':
            insertTarget = $('#article > h1.firstHeading');
            break;
         case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
               insertTarget = $('#WikiaArticle');
            }
            break;
      }

      if (insertTarget) {
         $('#gametemplate').css('display', 'block').prependTo(insertTarget);
      }
   }
}

jQuery(function($) {
   addTitleIcons();
});