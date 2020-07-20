/* SpeedyComments.js
   A script to add speedy deletion buttons for blog comments.
   Authored by http://callofduty.wikia.com/wiki/User:Sactage <sactage@sactage.com>, 2012
   Please maintain this notice if you use this code elsewhere.
*/


function BlogCommentSpeedyDeleteButtons() {
    var deleteOptions = {
	'None': 'None',
	'Spam/Nonsense': 'Spam',
	'Flaming': 'Flame',
	'Off-topic': 'OffTopic'
    };
    var deleteoptstr = '';
    for (var i in deleteOptions) {
	deleteoptstr += '<option value="' + i + '" style="text-align:center;">' + deleteOptions[i] + '</option>';
    }
    var html = '<select class="blog-comment-speedy" style="font-size:10px;font-color:black;">' + deleteoptstr + '</select><a class="blog-speedy-button" style="cursor:pointer; margin-left:5px;">Delete (Speedy)</a>';
    var commentArray = $('#article-comments-ul li .tools');
    for (var i = 0; i < commentArray.length; i++) {
	$(commentArray[i]).append(html);
	$(commentArray[i]).children('.blog-speedy-button').click( function(event) {
	     var select = this.previousSibling;
	     var pagename = this.parentElement.getElementsByClassName("article-comm-delete")[0].href.split("/wiki/")[1].split("?")[0];
	     if (select.options[select.selectedIndex].innerHTML != "None") {
			$.post("api.php", {action: 'delete', title: pagename, reason: select.options[select.selectedIndex].value, indexpageids: "", token: mw.user.tokens.values.editToken}, function() {
				window.location = wgServer + '/index.php?title=' + wgPageName + '&action=purge';});
	     } else {
		alert('Please select a delete reason.');
	     }
   	});
    }
}
if (wgNamespaceNumber == 500) {
    addOnloadHook(BlogCommentSpeedyDeleteButtons);
}