// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
    var rights = {};
 
    // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Legoclones"]             = ["Retired","Marshal Commander","Commanding Officer","Comlink Technician"],
    rights["Blyndblitz"]             = ["Battalion Commander","Commanding Officer","Kotep Squad Leader","Comlink Technician"],
    rights["Jep Do Tenko"]           = ["Sergeant Major","Senior Non-Commissioned Officer","Comlink Technician"],
    rights["Maurice.136"]            = ["Sergeant Major","Non-Commissioned Officer","Comlink Technician"],
    rights["Nitrodax"]               = ["Inactive"],
    rights["TheGoldenPatrik"]        = ["Inactive"],
    rights["Fazbear2475"]            = ["Private"],
    rights["Ther 'Vadam"]            = ["Retired", "Corporal","Non-commissioned Officer"],
    rights["Clonetrooper3434"]       = ["Inactive"],
    rights["Keplers"]                = ["Inactive"],
    rights["TreshersliderOfficial"]  = ["Inactive"],
    rights["Code red2002"]           = ["Inactive"],
    rights["Colbyjames2"]            = ["Inactive"],
    rights["TreshersliderFilms"]     = ["Inactive"],
    rights["FivesARC"]               = ["Inactive"],
    rights["Rex55555"]               = ["Inactive"],
    rights["SapphireStardust"]       = ["Inactive","Disabled Account"],
    rights["Sapphire Stardusts"]     = ["Inactive"],
    rights["Claws Bane"]             = ["Inactive"],
    rights["Evanf"]                  = ["Inactive"],
    rights["HenryDuckFan"]           = ["Inactive"],
    rights["Ramenisgood"]            = ["Scrub"],
    rights["Anomanzor"]              = ["Master Sifo-Dyas"],
 
    // END List of Accounts Given Extra User Rights Icons
 
    rights["Non-existent User"]  = ["Do not remove this line"];
 
    // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       // remove old rights
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         // add new rights
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
           '</span>').appendTo('.masthead-info hgroup');
       }
    } 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

/* Chat update */
 
/* var newElement = [
 '<section class="module">',
 '   <h1>617th Attack Battalion</h1>',
 '   <div style="margin-top: 5px; padding: 0; width: 100%; background-color: ;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 100%; background-color: ;">',
 '         <tr>',
 '            <td style="text-align: center;">',
 '               <img src="https://vignette.wikia.nocookie.net/c__/images/b/bd/Chat_Image.jpeg/revision/latest/scale-to-width/212?cb=20150606222616&path-prefix=clone"/>',
 '            </td>',
 '         </tr>',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: left; margin-right: 20px;" href="http://clonetrooper.wikia.com/wiki/Special:Chat" class="wikia-button">Enter the comlink</a>',
 '               <a style="float: left;" href="http://clonetrooper.wikia.com/wiki/Clone_Wiki%3AComlink_Guide" class="wikia-button">Comlink Guide</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');

$('#WikiaRail').append(newElement);

*/