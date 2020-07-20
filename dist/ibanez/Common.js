/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// BEGIN Template:Titlebox
// ============================================================

// Description: Add titlebox to top right corner of articles
// Credit:      User:Porter21 of fallout.wikia.com

function addTitlePortal() {
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
         $('#title-portal').css('display', 'block').prependTo(insertTarget);
      }
   }
}

addOnloadHook(addTitlePortal);


// ============================================================
// END Template:Titlebox
// ============================================================