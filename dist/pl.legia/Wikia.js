// 14:39, November 25, 2011 (UTC)
 // <source lang="JavaScript">
 // CODE WRITTEN BY USER:RAPPY_4187
  
 $(function() {
   var rights = {};
  
   // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
  
     // Biurokraci,Boty
  
   rights["DominElektryk"]                     = ["Biurokrata"],
   rights["Wojciech Wawrzyńczak"]                    = ["Biurokrata"],
   rights[""]                = [""],
   rights["DominElektryk.bot"]                      = ["Bot"];
  
   // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
  
   if (typeof rights[wgTitle] != "undefined") {
     // Usunięcie poprzednich opisów grup
     $('.UserProfileMasthead .masthead-info span.group').remove();
  
     for( var i=0, len=rights[wgTitle].length; i < len; i++) {
       // add new rights
 $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
     }
   }
 });
  
 // </source>