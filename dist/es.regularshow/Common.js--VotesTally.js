var supportNum = $("img[data-image-name='Voting-support.svg.png']").length - $("div.quote img[data-image-name='Voting-support.svg.png']").length - $("li.SpeechBubble.message.hide.message-removed img[data-image-name='Voting-support.svg.png']").length + $("li.SpeechBubble.message.hide.message-removed div.quote img[data-image-name='Voting-support.svg.png']").length - 2;
 
var neutralNum = $("img[data-image-name='Voting-neutral.svg.png']").length - $("div.quote img[data-image-name='Voting-neutral.svg.png']").length - $("li.SpeechBubble.message.hide.message-removed img[data-image-name='Voting-neutral.svg'.png]").length + $("li.SpeechBubble.message.hide.message-removed div.quote img[data-image-name='Voting-neutral.svg.png']").length - 2;
 
var opposeNum = $("img[data-image-name='Voting-oppose.svg.png']").length - $("div.quote img[data-image-name='Voting-oppose.svg.png']").length - $("li.SpeechBubble.message.hide.message-removed img[data-image-name='Voting-oppose.svg.png']").length + $("li.SpeechBubble.message.hide.message-removed div.quote img[data-image-name='Voting-oppose.svg.png']").length - 2;
 
if (supportNum == 1) { $("#support_num").html(supportNum + " vote"); }
else { $("#support_num").html(supportNum + " votes"); }
if (neutralNum == 1) { $("#neutral_num").html(neutralNum + " vote"); }
else { $("#neutral_num").html(neutralNum + " votes"); }
if (opposeNum == 1) { $("#oppose_num").html(opposeNum + " vote"); }
else { $("#oppose_num").html(opposeNum + " votes"); }
 
var supportBar = (supportNum / (supportNum + neutralNum + opposeNum)) * 100;
var neutralBar = (neutralNum / (supportNum + neutralNum + opposeNum)) * 100;
var opposeBar = (opposeNum / (supportNum + neutralNum + opposeNum)) * 100;
 
$("#support_bar").width(supportBar + "%");
$("#neutral_bar").width(neutralBar + "%");
$("#oppose_bar").width(opposeBar + "%");