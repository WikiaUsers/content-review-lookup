/* Any JavaScript here will be loaded for all users on every page load. */
x = document.getElementsByClassName("tableGrid");
if (x.length > 0) {
    for (i = 0; i < x.length; i++) {

        var recipe = JSON.parse(x[i].dataset.recipe);
        for (j = 0; j < recipe.ingredients.length; j++) {
            //==================================== RECIPE ========================================
            if (typeof recipe.ingredients[j].id === "undefined") {
                //slot is empty. Write empty slot
                x[i].innerHTML += "<div class = 'tableCell'></div>";
            } else {
                //slot is full - populate slot.
                tooltip = "";
                if (typeof recipe.ingredients[j].Name === "undefined") {
                    tooltip = recipe.ingredients[j].id.replace(/_/g, " ");
                    tooltip = tooltip.replace(/\w\S*/g, function(txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                } else {
                    tooltip = recipe.ingredients[j].Name;
                }
                if (typeof recipe.ingredients[j].DisplayName !== "undefined") {
                    tooltip = "<i>" + recipe.ingredients[j].DisplayName; + "</i>";
                }

                if (recipe.ingredients[j].id.indexOf("record_") !== -1) {
                    if (typeof recipe.ingredients[j].DisplayName === "undefined") {
                        tooltip = "<span class=&#x27;enchTitle&#x27;>Music Disc</span>";
                    }
                    if (typeof recipe.ingredients[j].Lore === "undefined") {
                        recordSub = recipe.ingredients[j].id.replace("record_", "");
                        tooltip += "<br><span class=&#x27;ench&#x27;>C418 - " + recordSub + "</span>";
                    }
                }

                if (recipe.ingredients[j].hasOwnProperty('ench')) {
                    tooltip = "<span class=&#x27;enchTitle&#x27;>" + tooltip + "</span>";
                    for (k = 0; k < recipe.ingredients[j].ench.length; k++) {
                        tooltip += "<br><span class=&#x27;ench&#x27;>" + recipe.ingredients[j].ench[k] + "</span>";
                    }
                }
                if (recipe.ingredients[j].hasOwnProperty('CustomPotionEffects')) {
                    for (k = 0; k < recipe.ingredients[j].CustomPotionEffects.length; k++) {
                        duration = "";
                        if (recipe.ingredients[j].CustomPotionEffects[k].hasOwnProperty('Duration')) {
                            duration = " (" + recipe.ingredients[j].CustomPotionEffects[k].Duration + ")";
                        }
                        Amplifier = "";
                        if (recipe.ingredients[j].CustomPotionEffects[k].hasOwnProperty('Amplifier')) {
                            {
                                Amplifier = " " + recipe.ingredients[j].CustomPotionEffects[k].Amplifier;
                            }
                        }
                        potId = recipe.ingredients[j].CustomPotionEffects[k].Id;
                        if (potId == "Slowness" || potId == "Mining Fatigue" || potId == "Instant Damage" || potId == "Nausea" || potId == "Blindness" || potId == "Hunger" || potId == "Weakness" || potId == "Poison" || potId == "Wither") {
                            tooltip += "<br><span class=&#x27;negPot&#x27;>" + recipe.ingredients[j].CustomPotionEffects[k].Id + Amplifier + duration + "</span>";
                        } else {
                            tooltip += "<br><span class=&#x27;ench&#x27;>" + recipe.ingredients[j].CustomPotionEffects[k].Id + Amplifier + duration + "</span>";
                        }
                    }
                }

                if (recipe.ingredients[j].hasOwnProperty('Lore')) {
                    for (k = 0; k < recipe.ingredients[j].Lore.length; k++) {
                        tooltip += "<br><span class=&#x27;lore customText&#x27;>" + recipe.ingredients[j].Lore[k] + "</span>";
                    }
                }
                itemDamage = 0; //the damage value of the item. All items have a damage of 0 by default.
                if (typeof recipe.ingredients[j].Damage !== "undefined") {
                    itemDamage = recipe.ingredients[j].Damage;
                }
                itemCount = 1; //item count is 1 by default. Count is only displayed if itemCount > 1
                if (typeof recipe.ingredients[j].Count !== "undefined") {
                    itemCount = recipe.ingredients[j].Count;
                }

                imageURL = "http://www.gm4.co/gamemode4/images/recipeTiles/" + recipe.ingredients[j].id + "_" + itemDamage + ".png";
                if (recipe.ingredients[j].hasOwnProperty('CustomImage')) {
                    imageURL = recipe.ingredients[j].CustomImage;
                }
                if (itemCount > 1) {
                    itemCount = "<div class = 'itemCount'>" + itemCount + "</div>";
                } else {
                    itemCount = "";
                }
                x[i].innerHTML += "<div class = 'tableCell masterTooltip' title = '" + tooltip + "' style = 'background-image:url(" + imageURL + ");background-repeat:no-repeat;content:;'>" + itemCount + "</div>";
            }
        }
    }
}

$(function() {
// Tooltip only Text
    $('.masterTooltip').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip">' + title + '</p>')
        //.text(title + "\n1")
        .appendTo('body')
        .show();
    }, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY - 40; //Get Y coordinates
        $('.tooltip').css({ top: mousey, left: mousex });
    });
});

 /*
 This code has been found on:
    http://undertale.wikia.com
and was written by "Kocka" who helped installing this code on our Wikia.
You can find him on the "Wikia Develoers" discord
 join now at:
    https://discord.gg/wPrVUj4
 
 */
$.get(mw.util.wikiScript('load'), {
    mode: 'articles',
    articles: 'MediaWiki:Custom-user-tags',
    only: 'styles'
}, function(d) {
    window.UserTagsJS = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:UserTags/code.js' });
});

$(function(){
    $.get("https://vignette.wikia.nocookie.net/gamemode4/images/a/af/Dimensions.svg/revision/latest",function(e){
        $($("#dimensionSVG").html(e).children()[0]).css("width","650").css("font-size",32);
    });
});