/* Any JavaScript here will be loaded for all users on every page load. */

/****************************/
/***   MASTHEAD LABELS    ***/
/****************************/

$(function() {
 var rights = {};

   //FOUNDERS & BUREAUCRATS
 rights["ObsidianDraconis"]           = ["Founder","Bureaucrat"];
 rights["Leon95"]                     = ["Founder","Bureaucrat"];

  //BUREAUCRATS
 rights["NDenizen"]                   = ["Bureaucrat"];

  
   //ADMINISTRATORS
 rights["Simmons477"]                 = ["Administrator"];
   
   
   //ADMINISTRATORS + AOTM
 rights["Balagog_gro-Nolob"]          = ["Administrator","AOTM - September 2012"];
                
                                      
   //CHAT MODERATORS
 rights["Firedale2002"]               = ["Chat Mod"];

   
   //CHAT MODS + AOTM 
 rights["AeonsLegend"]                = ["Chat Mod","AOTM - January 2013"];

  

    //OTHER AOTM
 rights["Jurass"]                     = ["AOTM - October 2012"];
 rights["Thousand Troops"]            = ["AOTM - November 2012"];
 rights["A91 knightblade"]            = ["AOTM - December 2012"];
 rights["Kagekiwi"]                   = ["AOTM - February 2013"];
 rights["Makendds"]                   = ["AOTM - March 2013"];
 rights["Artirtico"]                  = ["AOTM - April 2013"];
 rights["Montrealmanu"]               = ["AOTM - June 2013"];
 rights["Kraissant"]                  = ["AOTM - September 2013"];
 rights["Brohamond"]                  = ["AOTM - October 2013"];
 rights["BarrelHornet3"]              = ["AOTM - November 2013"]
   

 
/**********************************/
/***  DEFAULT MASTHEAD REMOVAL  ***/
/**********************************/

if (wgPageName.indexOf("Special:Contributions") != -1){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;
 
while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}
 
userName = unfinishedTitle;
 
}else{
userName = wgTitle;
userName.replace("User:", "");
}
 
 if (typeof rights[userName] != "undefined") {
   // remove old rights
   $('.UserProfileMasthead .masthead-info span.tag').remove();
 
   for( var i=0, len=rights[userName].length; i < len; i++) {
     // add new rights
     $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
       '</span>').appendTo('.masthead-info hgroup');
   }
 }
});