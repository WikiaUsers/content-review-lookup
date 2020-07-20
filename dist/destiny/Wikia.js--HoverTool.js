/*
 * Authors: T3CHNOCIDE (http://community.wikia.com/wiki/User:T3CHNOCIDE)
 * Website: Destiny Wiki (http://destiny.wikia.com)
 * License: CC-BY-SA 3.0
 * Version: v1.0 (4 September 2016)
 * Function:
 *      Fetches item data on hover over of ns-0 article links through an onsite JSON database - see Project:HoverTool
 *      Displays basic item information in tool tip which follows cursor.
 *      To reduce load time, item database is split in alphabetical order.
 *
 * History:
 *      4 September 2016 - 1.0 Enters beta phase.
 *      28 September 2016 - 1.01 Minor fix and linted.
 *
 * To Do:
 *      1) Correct tool tip HTML so description is in italics and titles appear without padding.
 *      2) Include Ambiguous items into database as currently no tool tip will generate.
 *      3) Include quests, bounties & characters into database.
 *
 * Additional Details:
 *      This JavaScript extension requires additional CSS to function as expected.
 *      Below is a list of the CSS classes used.
 *      - hovertool
 *      - hovertool p
 *      - hovertool-exotic
 *      - hovertool-legendary
 *      - hovertool-rare
 *      - hovertool-uncommon
 *      - hovertool-common
 *      - hovertool-opacity-exotic
 *      - hovertool-opacity-legendary
 *      - hovertool-opacity-rare
 *      - hovertool-opacity-uncommon
 *      - hovertool-opacity-common
 */

//Inserts hovertool div to document body
$("body").append("<div class='hovertool' id='hovertool'></div>");

//Sets hovertool functin on link hover
$("a").mouseover(function (kmouse) {
    "use strict";

    //Gets first character of a link & full page name
    var pageName = $(this).attr("href").split("/wiki/")[1];
    //Exit if not an article url.
    if (pageName === undefined) {
        return;
    }
    var dbIndex = $(this).attr("href").split("/wiki/")[1][0].toLowerCase();

    //Checks if page is non-article namespace through prefix. Exits if non-article.
    if (pageName.split(":").length > 1) {
        if ($.inArray(pageName.split(":")[0].toLowerCase().replace(/_/g, " "), ["media", "special", "main", "talk", "user", "user talk", "project", "project talk", "file", "file talk", "mediawiki", "mediawiki talk", "template", "template talk", "help", "help talk", "category", "category talk", "forum", "forum talk", "destiny wiki", "destiny wiki talk"]) > -1) {
            return;
        }
    }

    //If first character is not a letter, assign to db 0, otherwise get matching database
    var dbTitle = "Project:HoverTool/0";
    if (new RegExp("[a-z]").test(dbIndex)) {
        dbTitle = "Project:HoverTool/" + dbIndex;
    }

    //Download JSON database
    //Performs synchronous get request for page contents of database
    var dbFetch = JSON.parse(
		$.ajax({
			url: mw.util.wikiScript("api"),
			data: { action: "query", format: "json", prop: "revisions", titles: dbTitle, rvprop: "timestamp|content" },
			async: false
		})
		.responseText
	);

    //Parses database from get request and converts to JSON
    var dbJSON = JSON.parse(dbFetch["query"]["pages"][Object.keys(dbFetch.query.pages)[0]]["revisions"][0]["*"]);

    //Checks if item exists in database
    if (dbJSON[pageName.replace(/_/g, " ")]) {

        //Remove title attribute to stop title tooltip
        $(this).removeAttr("title");

        //Generates hovertool HTML mark up
        var hoverToolContents = "<table style='background:rgba(0,0,0,0.8); border-spacing:0px; width:350px;'><tr><td class='hovertool-" + dbJSON[pageName.replace(/_/g, " ")]["rarity"].toLowerCase() + "'><table style='width:100%;'><tr><td colspan='2' style='font-size:200%; padding:10px 10px 5px 10px;'>" + dbJSON[pageName.replace(/_/g, " ")]["name"] + "</td></tr><tr><td style='padding-left:10px; padding-bottom:10px; font-size:120%;' class='hovertool-opacity-" + dbJSON[pageName.replace(/_/g, " ")]["rarity"].toLowerCase() + "'>" + dbJSON[pageName.replace(/_/g, " ")]["type"] + "</td><td style='padding-right:10px; padding-bottom:10px; text-align:right; font-size:120%;' class='hovertool-opacity-" + dbJSON[pageName.replace(/_/g, " ")]["rarity"].toLowerCase() + "'>" + dbJSON[pageName.replace(/_/g, " ")]["rarity"] + "</td></tr></table></td></tr><tr><td style='color:rgba(255,255,255,0.8); padding:15px 10px 10px 10px;'><table style='width:100%; border-padding:0px;'>";

        //Adds attack/defense stat to hovertool
        if ($.inArray("Defense", Object.keys(dbJSON[pageName.replace(/_/g, " ")]["stats"])) > -1) {
            hoverToolContents += "<tr><td style='font-size:300%; font-weight:bold; color: rgba(255,255,255,1) !important; padding-bottom:0px;'>" + dbJSON[pageName.replace(/_/g, " ")]["stats"]["Defense"] + "</td></tr><tr><td style='padding-top:0px; font-size:130%; text-transform:uppercase;'>defense</td></tr>";
        } else if ($.inArray("Attack", Object.keys(dbJSON[pageName.replace(/_/g, " ")]["stats"])) > -1) {
            hoverToolContents += "<tr><td style='font-size:300%; font-weight:bold; color: rgba(255,255,255,1) !important; padding-bottom:0px;'>" + dbJSON[pageName.replace(/_/g, " ")]["stats"]["Attack"] + "</td></tr><tr><td style='padding-top:0px; font-size:130%; text-transform:uppercase;'>attack</td></tr>";
        }

        //Adds descripion to hover tool if it exists
        if ($.inArray("description", Object.keys(dbJSON[pageName.replace(/_/g, " ")])) > -1) {
            hoverToolContents += "<tr><td style='font-size:110%; padding:5px 0px 5px 0px;'><i>" + dbJSON[pageName.replace(/_/g, " ")]["description"] + "</i></td></tr>";
        }

        //Checks if item has stats section
        if (Object.keys(dbJSON[pageName.replace(/_/g, " ")]["stats"]).length > 0) {

            var magazineStat = "";

            //Cycles through each stat in stats list and adds to hovertool
            hoverToolContents += "<tr><td style='font-size:110%; padding:5px 0px 5px 0px; border-top:1px solid rgba(255,255,255,0.3);'><table style='width:100%;'>";
            $.each(dbJSON[pageName.replace(/_/g, " ")]["stats"], function (statname, statvalue) {

                //If item is armor display only values
                if ($.inArray("Defense", Object.keys(dbJSON[pageName.replace(/_/g, " ")]["stats"])) > -1 && statname !== "Defense") {

                    //Adds stat name & stat value to stat section 
                    hoverToolContents += "<tr><td style='width:30%;'>" + statname + "</td><td>" + statvalue + "</td></tr>";

                    //If item is weapon display bars
                } else if ($.inArray("Attack", Object.keys(dbJSON[pageName.replace(/_/g, " ")]["stats"])) > -1 && statname !== "Attack") {

                    if (statname !== "Magazine") {

                        //Adds stat name & stat bar to stat section 
                        hoverToolContents += "<tr><td style='width:30%;'>" + statname + "</td><td><table style='width:100%; height:20px; border-spacing:0px;'><tr><td style='width:" + statvalue + "%; background:rgba(255,255,255,0.8);'></td><td style='background:rgba(155,155,155,0.6);'></td></tr></table></td></tr>";

                    } else {

                        //Adds stat name & stat bar to stat section 
                        magazineStat = "<tr><td style='width:30%; height:20px;'>" + statname + "</td><td>" + statvalue + "</td></tr>";

                    }

                }

            });

            //If magazine exists, adds at far end.
            hoverToolContents += magazineStat;

            //Adds end of stats table 
            hoverToolContents += "</table></td></tr>";

        }

        //Checks if item has perks section
        if (Object.keys(dbJSON[pageName.replace(/_/g, " ")]["perks"]).length > 0) {

            //Cycles through each perk in perk list and adds to hovertool
            hoverToolContents += "<tr><td style='font-size:110%; padding:5px 0px 5px 0px; border-top:1px solid rgba(255,255,255,0.3);'><table style='width:100%;'>";
            $.each(dbJSON[pageName.replace(/_/g, " ")]["perks"], function (perkIndex, perkJson) {

                //Stops loop after 4th perk
                if (perkIndex < 4) {
                    //Adds perk icon & description to perk section
                    hoverToolContents += "<tr><td style='width:50px;'><img src='https://www.bungie.net" + perkJson["icon"] + "' width='30' height='30'/></td><td style='font-size:95%;'><i>" + perkJson["description"] + "</i></td></tr>";
                }

            });
            hoverToolContents += "</table></td></tr>";

        }

        hoverToolContents += "</td></tr></table>";

        //Sets hover tool X and Y distance from mouse
        var toolX = 15;
        var toolY = 15;

        //If hovertool exceeds window resets Y distance to fit in screen
        if ((kmouse.clientY + $("#hovertool").height() + 15) > $(window).height()) {
            toolY = kmouse.pageY - ((kmouse.pageY + ($(window).height() - kmouse.clientY)) - $("#hovertool").height());
            var bottomBarTrim = $("#WikiaBarWrapper").height();
            if ($("#WikiaBarWrapper").hasClass("hidden")) {
                bottomBarTrim = 0;
            }
            toolY = toolY + bottomBarTrim;
            toolY = -toolY;
        }

        //If hovertool exceeds window resets X value to fit in screen
        if ((kmouse.pageX + $("#hovertool").width() + 15) > $(window).width()) {
            toolX = kmouse.pageX - ($(window).width() - $("#hovertool").width());
            toolX = -toolX;
        }

        //Adds hovertool to document and distances from mouse
        $("#hovertool").html(hoverToolContents).css({ left: toolX, top: toolY }).fadeIn(400);

    }

}).mousemove(function (kmouse) {
    "use strict";

    //Sets hover tool X and Y distance from mouse
    var toolX = 15;
    var toolY = 15;

    //If hovertool exceeds window resets Y distance to fit in screen
    if ((kmouse.clientY + $("#hovertool").height() + 15) > $(window).height()) {
        toolY = kmouse.pageY - ((kmouse.pageY + ($(window).height() - kmouse.clientY)) - $("#hovertool").height());
        var bottomBarTrim = $("#WikiaBarWrapper").height();
        if ($("#WikiaBarWrapper").hasClass("hidden")) {
            bottomBarTrim = 0;
        }
        toolY = toolY + bottomBarTrim;
        toolY = -toolY;
    }

    //If hovertool exceeds window resets X value to fit in screen
    if ((kmouse.pageX + $("#hovertool").width() + 15) > $(window).width()) {
        toolX = kmouse.pageX - ($(window).width() - $("#hovertool").width());
        toolX = -toolX;
    }

    //Adds hovertool to document and distances from mouse
    $("#hovertool").css({ left: kmouse.pageX + toolX, top: kmouse.pageY + toolY });

}).mouseout(function () {
    "use strict";

    $("#hovertool").stop().fadeOut(400);

});