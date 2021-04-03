if (wgNamespaceNumber === 2 || wgNamespaceNumber === 3) { $(function() {

   var i, len, html, rights = {
"Cotton Candy Coconut": ["Nickelodeon Admin"], "Damien583": ["Nickelodeon Admin"], "Insert ArianaGrandeForever": ["Nickelodeon Admin"],

       "BoriLovah": ["Nickelodeon Admin"],
"Cotton Candy Coconut": ["The Nick Queen"], "Cheese45": ["Nickelodeon Rollback"], "Insert username here": ["Rollback"], "Insert username here": ["Rollback"]

   };
   rights = rights[wgTitle];
   if (typeof rights !== "undefined") {
       len = rights.length;
       html = "";
       // remove old rights
       //$('.UserProfileMasthead .masthead-info span.group').remove();
       for (i = 0; i ' + rights[i] + ;
       }
       $(html).appendTo('.masthead-info hgroup');
   }
}); }