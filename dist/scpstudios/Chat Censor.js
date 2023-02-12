function chatCensor() {
var chatInputContents = document.getElementsByName('message')[0].value;
for (i=0; i<badwordslist.length-1; i++) {
var badword = new RegExp(badwordslist[i], 'gi');
chatInputContents = chatInputContents.replace(badword, "**");
}
document.getElementsByName('message')[0].value = chatInputContents;
}
 
document.getElementsByName('message')[0].setAttribute('onkeyup','chatCensor();');
document.getElementsByName('message')[0].setAttribute('onchange','chatCensor();');
var badwords = document.createElement('div');
var badwordslist
badwords.setAttribute('id', 'badwords');
$(badwords).load("http://scpstudios.wikia.com/wiki/MediaWiki:Badwords?action=render", function() {
badwordslist = badwords.children[0].innerHTML.split('\n');
});