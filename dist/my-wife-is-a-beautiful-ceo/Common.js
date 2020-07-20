importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

$(function addPageBottom() {
        $("#WikiaRail").append('<div style="width:auto; height:auto; margin-bottom:10px; border:0px solid #0D2139; background-color: trasparent; padding:2px 5px; text-align:center; color: white; font-size:130%;"><div style="color: #800080; font-size: 150%; font-weight: bold; margin-bottom:-15px;">COUNTDOWN</div><br><span data-end="callback" data-callback="myFunction" class="countdown" style="color: #000; display:none;">Approximately <spn style="font-weight:bold; color: #000;"><span data-options="no-leading-zeros short-format" class="countdown" style="display:none;"><span class="countdowndate">September 02 2021 00:00:00</span></span></spn> left until <spn style="font-weight:bold; color: #000;">MWIABCEO TL</spn> Completion</span></div>');
});
window.countdownTimer = {
    myFunction: function () {
       $(this).text('MWIABCEO TL has been completed!');
    }
};