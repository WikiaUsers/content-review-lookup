function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  // GROUP 2
 
  rights["Road Runner1"] = ["Founder"];
  rights["Xenos001"] = ["Bureaucrat", "Wiki Adopter"];

 if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
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

/*chat link (modified version of JosephHawk's chat module.)*/
var newElement = [
 '<section class="module">',
 '   <div style="margin-top: -16px; padding: 0; width: 100%;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%;">',
 '         <tr>',
 '            <td style="text-align: center;">',
 '               <img src="https://images.wikia.nocookie.net/__cb20140805201411/spongebobgalaxy/images/f/f0/Logo4_wordmark.png"/>',
 '            </td>',
 '         </tr>',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: center; margin-right: 75px;" href="http://spongebobgalaxy.wikia.com/wiki/Special:Chat" class="wikia-button">Join SBG chat</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);