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

/* Extra Chat Stuff: Created by JosephHawk */
 
var newElement = [
 '<section class="module">',
 '   <h1>SpongeBobia Network Chat Room</h1>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: #FFF;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: #FFF;">',
 '         <tr>',
 '            <td style="text-align: center;">',
 '               <img src="https://images.wikia.nocookie.net/__cb20140730235002/spongebobfanon/images/f/f1/SBNetwork.png"/>',
 '            </td>',
 '         </tr>',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '               <a style="float: left; margin-right: 20px;" href="http://spongebob.wikia.com/wiki/Special:Chat" class="wikia-button">Join the chat</a>',
 '               <a style="float: left;" href="http://spongebob.wikia.com/wiki/ESB:Chat_policy" class="wikia-button">Chat policy</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);