/* Any JavaScript here will be loaded for all users on every page load. */
function fBox() {
 $('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=349353609807&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);

/* track healthy recipes giveaway */
$(function(){
    if (wgPageName=="Healthy_Recipes_Giveaway") {
        $("map > area[href='/wiki/Special:CreateRecipe']").click(function() { WET.byStr("giveaway/enter/button"); });
        $("table > tbody > tr > td > div > ol > li > a[href='/wiki/Special:Signup']").click(function() { WET.byStr("giveaway/signup"); });
        $("table > tbody > tr > td > div > ol > li > a[href='/wiki/Special:CreateRecipe']").click(function() { WET.byStr("giveaway/enter/text"); });
        $("table > tbody > tr > td > div > p > a[href='/wiki/Giveaway_Official_Rules']").click(function() { WET.byStr("giveaway/rules"); });
        $("table > tbody > tr > td > div > p > a[href='/wiki/Healthy_Recipes_Wiki']").click(function() { WET.byStr("giveaway/homepage"); });
        $("table > tbody > tr > td > div > p > a[href='/wiki/User_talk:Kimberly_McCollister']").click(function() { WET.byStr("giveaway/contact"); });

        var cookie = $.cookies.get("wikiaHRG");
        if (!cookie) {
            $.cookies.set("wikiaHRG", 1, {hoursToLive: 336});
            WET.byStr("giveaway_pv/first");
        } else {
            WET.byStr("giveaway_pv/return");
        }

        if (wgUserName == null) {
            var cookie = $.cookies.get("wikiaHRG24");
            if (!cookie) {
                $.cookies.set("wikiaHRG24", 1, {hoursToLive: 24});
            }
        }
    }

    if (wgPageName == "Special:CreateRecipe") {
        if (wgUserName != null) {
            var cookie = $.cookies.get("wikiaHRG24");
            if (cookie) {
                $("#wpSubmit").click(function() { WET.byStr("giveaway_recipe/" + encodeURIComponent(wgUserName)); });
            }
        }
    }
});