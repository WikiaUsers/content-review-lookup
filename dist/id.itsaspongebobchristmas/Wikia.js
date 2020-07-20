importArticle( { type: 'script', article: 'u:community.wikia.com:MediaWiki:Snow.js' } );

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
        buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');

// BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2

  rights["Fake Kage"] = ["Pendiri", "Ketua", "Birokrat", "Pengurus", "Moderator Obrolan", "Rollback"];

/* Chat Room: Created by Fake Kage */
 
var newElement = [
 '<section class="module">',
 '   <h1>Ruangan Obrolan Jaringan SpongeBobia</h1>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: ;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: ;">',
 '         <tr>',
 '            <td style="text-align: center;">',
 '               <img src="https://images.wikia.nocookie.net/__cb20140730235002/spongebobfanon/images/f/f1/SBNetwork.png"/>',
 '            </td>',
 '         </tr>',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: left; margin-right: 20px;" href="http://spongebob.wikia.com/wiki/Special:Chat" class="wikia-button">Bergabung ke obrolan</a>',
 '               <a style="float: left;" href="http://spongebob.wikia.com/wiki/ESB:Chat_Policy" class="wikia-button">Kebijakan obrolan</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);