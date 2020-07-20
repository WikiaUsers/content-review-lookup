/* <nowiki> */

/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */

/* ######################################################################## */
/* ### CHAT IMPROVEMENTS                                                ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Improvements for Special:Chat                       ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */
 
function openChatWindow() {
   vaultChatWindow = window.open('/wiki/Special:Chat', 'wikiachat', 'width=600, height=600, location=no, menubar=no, resizable=yes, scrollbars=no, status=no, toolbar=no');
   return vaultChatWindow;
}
 
function rewriteChatLink() {
   $('#WikiHeader > nav > ul > li > ul.subnav > li > a[href="/wiki/Special:Chat"]').click(function(e){
      e.preventDefault();
      openChatWindow();
      return false;
   });
}

/* ######################################################################## */
/* ### ReferencePopups                                                  ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Creates an inline pop-up box with the contents      ### */
/* ###              of a reference when you hover over the citation     ### */
/* ###              marker.                                             ### */
/* ### Credit:      Lunarity                                            ### */
/* ######################################################################## */
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js'
    ]
});

/* </nowiki> */