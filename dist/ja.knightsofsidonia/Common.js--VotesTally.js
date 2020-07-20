/* Any JavaScript here will be loaded for all users on every page load. */
var supportNum = $("img[data-image-name='Voting-support.svg']").length - $("div.quote img[data-image-name='Voting-support.svg']").length - $("li.SpeechBubble.message.hide.message-removed img[data-image-name='Voting-support.svg']").length + $("li.SpeechBubble.message.hide.message-removed div.quote img[data-image-name='Voting-support.svg']").length - 2;

var neutralNum = $("img[data-image-name='Voting-neutral.svg']").length - $("div.quote img[data-image-name='Voting-neutral.svg']").length - $("li.SpeechBubble.message.hide.message-removed img[data-image-name='Voting-neutral.svg']").length + $("li.SpeechBubble.message.hide.message-removed div.quote img[data-image-name='Voting-neutral.svg']").length - 2;

var opposeNum = $("img[data-image-name='Voting-oppose.svg']").length - $("div.quote img[data-image-name='Voting-oppose.svg']").length - $("li.SpeechBubble.message.hide.message-removed img[data-image-name='Voting-oppose.svg']").length + $("li.SpeechBubble.message.hide.message-removed div.quote img[data-image-name='Voting-oppose.svg']").length - 2;
 
if (supportNum == 1) { $("#support_num").html(supportNum + " 票"); }
else { $("#support_num").html(supportNum + " 票"); }
if (neutralNum == 1) { $("#neutral_num").html(neutralNum + " 票"); }
else { $("#neutral_num").html(neutralNum + " 票"); }
if (opposeNum == 1) { $("#oppose_num").html(opposeNum + " 票"); }
else { $("#oppose_num").html(opposeNum + " 票"); }
 
var supportBar = (supportNum / (supportNum + neutralNum + opposeNum)) * 100;
var neutralBar = (neutralNum / (supportNum + neutralNum + opposeNum)) * 100;
var opposeBar = (opposeNum / (supportNum + neutralNum + opposeNum)) * 100;
 
$("#support_bar").width(supportBar + "%");
$("#neutral_bar").width(neutralBar + "%");
$("#oppose_bar").width(opposeBar + "%");