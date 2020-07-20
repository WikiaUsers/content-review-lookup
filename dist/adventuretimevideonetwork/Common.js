/* Any JavaScript here will be loaded for all users on every page load. */



/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

if (wgNamespaceNumber === 2 || wgNamespaceNumber === 3) {
$(function() {
    var i, len, html, rights = {
	"The Doctor (Infinity)": ["RETIRED"],
        "DudeWhoPlays A.T.Music": ["Dude"],
	"Anime9001": ["Marcus Wuz Here XD Hi Anime Wassup!!!"],
	"M1870": ["Love is Blind"],
	"Katari12": ["Best Person Ever"],
	"Finnandjake12345": ["Best Person Ever"],
        "SweetSugarFionna": ["Bubba Cheeks"],
        "Master of the masters": ["Bureaucrat"],
        "Happy Smoothie": ["Ice cweam lover"],
    };
    rights = rights[wgTitle];
    if (typeof rights !== "undefined") {
        len = rights.length;
        html = "";
        // remove old rights
        //$('.UserProfileMasthead .masthead-info span.group').remove();
        for (i = 0; i < len; i += 1) {
            html += '<span class="group">' + rights[i] + '</span>';
        }
        $(html).appendTo('.masthead-info hgroup');
    }
});
}
/* Add a "Pin It" button to the share bar and image lightbox */
//Get the description from the meta tag
var metas = document.getElementsByTagName('meta'); //All meta tags
for (var x=0,y=metas.length; x<y; x++) { //Run through all meta tags
  if (metas[x].name.toLowerCase() == "description") { //Check which meta tag has description
    description = metas[x]; //Add description to variable
  }
}
 
//Add Pin It button to share box function
function addPinItButton() {
var wordmark = $(".wordmark img").attr("src"); //Wordmark source URL
   $('#SharingToolbar').append('<br /><a href=\"http://pinterest.com/pin/create/button/?url='+ wgServer +'%2Fwiki%2F'+ wgPageName +'&media='+ wordmark +'&description='+ description.content +'...\" class=\"pin-it-button\" count-layout=\"horizontal\">Pin It</a><script type=\"text/javascript\" src=\"http://assets.pinterest.com/js/pinit.js\"></script>'); //Append Pin It button
}
 
addOnloadHook(addPinItButton); //Load the addPinItButton function
 
//Add Pin It to lightbox function
$('#WikiaArticle img').click(function() { 
   setTimeout("var lightboximage = $(\"#lightbox-image img\").attr(\"src\");",999); //Lightbox image source URL
   setTimeout("$('.share-links').before('<br /><a href=\"http://pinterest.com/pin/create/button/?url='+ wgServer +'%2Fwiki%2F'+ wgPageName +'&media='+ lightboximage +'&description='+ description.content +'...\" class=\"pin-it-button\" count-layout=\"horizontal\">Pin It</a><script type=\"text/javascript\" src=\"http://assets.pinterest.com/js/pinit.js\"></script>');",1000); //Add Pin It button
   setTimeout("$('.lightbox-share-area > br').remove()",1001);
});
/* End add a "Pin It" button to the share bar and image lightbox */
 
/* IRC */
 
// *********
    // IRC Login Fixed by Megan
    // *********
    $(document).ready(function () {
        if ($('#IRClogin')) {
            var nick = (wgUserName == null) ? ('Tribute' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
            $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-hungergames&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
        }
    });