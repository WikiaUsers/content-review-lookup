/* Add IRC in siderail */

// We create the string from a list of strings and join it.
// This makes it easier for read the code and edit it. Just
// remember to close the '' and add a , for all lines EXCEPT
// the last line. - Albugineous

// Change the px value in line
// '               <a style="float: left; margin-right: 20px;" 
// to the value you want.

var newElement = [
 '<section class="module">',
 '   <h2 style="font-size:20px">Request</h2>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: transparent;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: rgba(250,250,250,.2);">',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: left; margin-right: 20px;" href="http://wlb.wikia.com/wiki/Translate:Requests" class="wikia-button">Translation</a>',
 '               <a style="float: left;" href="http://wlb.wikia.com/wiki/Correct:Requests" class="wikia-button">Correction</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');

$('#WikiaRail').append(newElement);

if ($("#WikiaArticle div").hasClass("templateheader")) {
var languageCode = $("#content_language").text();
$("#ORM-1").html(languageCode);
}


importArticles({type:'script', articles:['u:dev:NullEditButton/code.js']});


// Extended wiki navigation
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

if ($("body").hasClass('ns-118')) {
    $('.wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/wlb/images/c/cc/Wikia_international_spotlights.png/revision/latest');
    $('.wordmark img').parent().attr('href', 'http://wlb.wikia.com/wiki/Spotlight:Requests');
}

// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Standard-bearer
 
  rights["Josep Maria Roca Peña"]  = ["Standard-bearer"];
 
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


// for DiscordIntegrator
$(function() {
    var waaaaaitForIt = setInterval(function() {
        if($(".DiscordIntegratorModule").length > 0) {
            $(".DiscordIntegratorModule .activity-heading").after($("<div></div>").attr('class', 'DiscordIntegratorYataluMadeMeDoThis').html("Please read the <a href='/wiki/Project:Discord'>rules</a> before joining the server").prop("outerHTML"));
            clearInterval(waaaaaitForIt);
        }
    }, 100);
});