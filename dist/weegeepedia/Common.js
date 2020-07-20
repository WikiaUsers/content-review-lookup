/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

//Classic-Edit Button (lightly modified version of Grunny's EditIntroButton)
//Adds a button to the Edit Dropdown that allows the user to edit in classic-visual mode. Allows users to have source-editor as the default, since both classic and new visualeditor are options.
//Modified by Sophiedp (see https://dev.wikia.com/wiki/Thread:17269)
(function() {
    $('.UserProfileActionButton  > .wikia-menu-button > ul, .page-header__contribution-buttons .wds-list').append(
        $('<li>').append(
            $('<a>', {
                href: mw.util.getUrl(mw.config.get('wgPageName'), {
                    action: 'edit',
                    useeditor: 'visual'
                }),
                text: 'Classic Editor',
                title: 'Edit with the Classic rich-text editor'
            })
        )
    );
})();
// <source lang="JavaScript">

// Adapted by Rappy 4187

$(function() {
  var rights = {};

  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();

    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

// </source>


// Pages along with their namespace (if any) will go here.
var pages = ['User_talk:GoWeegeeGo', 'User:GoWeegeeGo', 'Hypneegee'];
 
// URL of the images will go here.
// Remember URL of the logo of 'My Page 1' will be the first, 'My Page 2' will be the second and so on.
var wordmarks = ['https://images.wikia.nocookie.net/__cb20140716163924/chatlabs/images/8/85/Wiki-wordmark_%283%29.png', 'https://images.wikia.nocookie.net/__cb20140716163924/chatlabs/images/8/85/Wiki-wordmark_%283%29.png', 'https://images.wikia.nocookie.net/__cb20141119223025/awesome-club/images/8/80/Wiki-wordmark_%284%29.png'];
 
// Iterate for all the pages in the above array
for (i = 0; i < pages.length; i++) {
  /* check for the name of the page */
  if (mw.config.get('wgPageName') == pages[i]) {
    /* replace the image */
    $('#WikiHeader .wordmark a img').attr('src', wordmarks[i]);
  }
}

/* Preload Templates Case-by-case*/
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
preloadTemplates_subpage = "case-by-case";