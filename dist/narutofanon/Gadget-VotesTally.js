jQuery(function($) {
    "use strict";

    // Votes Tally Script
    // Works with [[Template:VotesTally]]

    var supportNum = $(".support").length - $("div.quote .support").length - $(".SpeechBubble.message-removed .support").length + $(".SpeechBubble.message-removed .quote .support").length - 2,
        neutralNum = $(".neutral-vote").length - $("div.quote .neutral-vote").length - $(".SpeechBubble.message-removed .neutral-vote").length + $(".SpeechBubble.message-removed .quote .neutral-vote").length - 2,
        opposeNum = $(".oppose").length - $("div.quote .oppose").length - $(".SpeechBubble.message-removed .oppose").length + $(".SpeechBubble.message-removed .quote .oppose").length - 2,
        multiplier = 100 / (supportNum + neutralNum + opposeNum);

    $("#support_num").text(supportNum + (supportNum == 1 ? " vote" : " votes"));
    $("#neutral_num").text(neutralNum + (neutralNum == 1 ? " vote" : " votes"));
    $("#oppose_num").text(opposeNum + (opposeNum == 1 ? " vote" : " votes"));

    $("#support_bar").width(supportNum * multiplier + "%");
    $("#neutral_bar").width(neutralNum * multiplier + "%");
    $("#oppose_bar").width(opposeNum * multiplier + "%");
});