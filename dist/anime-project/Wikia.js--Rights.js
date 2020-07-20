// 09:06, June 3, 2014 (UTC)
// <source lang="JavaScript">

// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

function addMastheadTags() {
  var rights = {};

  // BEGIN List of Accounts Given Extra User Rights Icons

       //  Bureaucrats //
    rights["Ultimate Dark Carnage"] = ["Founder", "President", "Supreme Kai", "Overlord", "Commander"]
    rights["HypercaneTeen"]         = ["Vice President", "Bureaucrat", "Administrator", "God of Weather"]
    rights["Kururu117"]             = ["Bureaucrat", "Administrator", "Crimson Alchemist"]
    
   
        // Administrators //
    rights["JjBlueDreamer1"]        = ["Head Administrator", "Realm of Light"]
    rights["Niklaus Mikaelson"]     = ["Administrator", "Original Hybrid"]
    
   
// END List of Accounts Given Extra User Rights Icons

  // BEGIN Script to Remove Old Rights Icons & Insert New

   // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else if (wgCanonicalSpecialPageName == "Following") {
      var user = wgUserName;
    } else {
      var user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
            // Helper Tag
        $('span.tag').each(function(){
           // Helper Tag
           if (this.innerHTML.match(/Helper/)){
              $(this).addClass('helper-tag');
           }
           // VSTF Tag
           if (this.innerHTML.match(/VSTF/)){
              $(this).addClass('vstf-tag');
           }
           // Founder Tag
           if (this.innerHTML.match(/Founder/)){
              $(this).addClass('founder-tag');
           }
           // President Tag
           if (this.innerHTML.match(/President/)){
              $(this).addClass('president-tag');
           }
           // Bureaucrat Tag
           if (this.innerHTML.match(/Vice President|Bureaucrat/)){
              $(this).addClass('crat-tag');
           }
           // Sysop Tag
           if (this.innerHTML.match(/Administrator|Head Administrator/)){
              $(this).addClass('sysop-tag');
           }
        });
      }
    }

  // END Script to Remove Old Rights Icons & Insert New

};

$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

// </source>