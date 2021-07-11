/*** DISMISS BUTTON  ***/
(function() {
      var node=document.getElementById("mw-dismissablenotice-anonplace");
          if (node) {
               node.outerHTML="\u003Cdiv class=\"mw-dismissable-notice\"\u003E\u003Cdiv class=\"mw-dismissable-notice-close\"\u003E[\u003Ca tabindex=\"0\"role=\"button\"\u003Edismiss\u003C/a\u003E]\u003C/div\u003E\u003Cdiv class=\"mw-dismissable-notice-body\"\u003E\u003Cdiv id=\"localNotice\" lang=\"en\" dir=\"ltr\"\u003E\u003C/div\u003E\u003C/div\u003E\u003C/div\u003E";
               }
    }
);