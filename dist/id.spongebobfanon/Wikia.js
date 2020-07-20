$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_")
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});

var WikiaNotificationMessage = ""; importScriptPage('WikiaNotification/code.js', 'dev');

//Social Buttons

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color"
};
importScriptPage('SocialIcons/code.js','dev');

function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2

  rights["Fake Kage"] = ["Pendiri","Ketua","Birokrat","Pengurus"];

 if (wgCanonicalSpecialPageName == "Kontribusi") {
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

/* Barang Ekstra Obrolan: Dibuat oleh Fake Kage */
 
var newElement = [
 '<section class="module">',
 '   <h1>Ruang Obrolan Jaringan SpongeBobia</h1>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: #FFF;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: #FFF;">',
 '         <tr>',
 '            <td style="text-align: center;">',
 '               <img src="https://images.wikia.nocookie.net/__cb20140730235002/spongebobfanon/images/f/f1/SBNetwork.png"/>',
 '            </td>',
 '         </tr>',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: left; margin-right: 20px;" href="http://id.spongebob.wikia.com/wiki/Special:Chat" class="wikia-button">Bergabung dengan Obrolan</a>',
 '               <a style="float: left;" href="http://id.spongebob.wikia.com/wiki/Spongebob Wiki:Kebijakan Obrolan" class="wikia-button">Kebijakan obrolan</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);