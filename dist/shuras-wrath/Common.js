importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
$(function addPageBottom() {
        $("#WikiaRail").append('<div style="width:auto; height:auto; margin-bottom:10px; border:0px solid #0D2139; background-color: trasparent; padding:2px 5px; text-align:center; color: white; font-size:130%;"><div style="color: #00e5e5; font-size: 150%; font-weight: bold; margin-bottom:-15px;">COUNTDOWN</div><br><span data-end="callback" data-callback="myFunction" class="countdown" style="display:none;">Only <span class="countdowndate">July 25 2018 00:00:00</span> until <spn style="font-weight:bold;">SW TL</spn> Completion</span></div>');
});
window.countdownTimer = {
    myFunction: function () {
       $(this).text('SW TL has been completed!');
    }
};