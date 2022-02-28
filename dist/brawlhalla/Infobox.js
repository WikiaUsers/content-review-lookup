"use strict";
console.log("Infobox Script loaded.\nBuild:\t2/26/22");
$(function () {
    $(".infobox").each(function (_i, elem) {
        var e = $(elem);

        if(!e.hasClass("no-stances")){
	        function clickFunction(stat) {
	            return (function () {
	                if ($(this).parent().attr("active")) {
	                    e.find("span.stats").hide();
	                    e.find("span.base").show();
	                    $(this).parent().attr("active", "").css("background", "initial");
	                }
	                else {
	                    $('td[active="true"]').attr("active", "").css("background", "initial");
	                    $(this).parent().attr("active", "true").css("background", "green");
	                    e.find("span.stats").hide();
	                    e.find("span." + stat).show();
	                }
	            });
	        }
	        e.find('img[alt="Strength"]').on("click", clickFunction("atk"));
	        e.find('img[alt="Dexterity"]').on("click", clickFunction("dex"));
	        e.find('img[alt="Defence"]').on("click", clickFunction("def"));
	        e.find('img[alt="Speed"]').on("click", clickFunction("spe"));
        }
        
        e.find(".infobox-swapper-button.pose").on("click", function () {
            e.find(".infobox-swapper.pose").show();
            e.find(".infobox-swapper.art").hide();
        });
        e.find(".infobox-swapper-button.art").on("click", function () {
            e.find(".infobox-swapper.pose").hide();
            e.find(".infobox-swapper.art").show();
        });
    });
});