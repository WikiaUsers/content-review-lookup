/*
 * jQuery outerHTML
 *
 * Copyright (c) 2008 Ca-Phun Ung <caphun at yelotofu dot com>
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://yelotofu.com/labs/jquery/snippets/outerhtml/
 *
 * outerHTML is based on the outerHTML work done by Brandon Aaron
 * But adds the ability to replace an element.
 */
(function ($) {
    "use strict";
    $.fn.outerHTML = function (s) {
        return (s) ? this.before(s).remove() : $("<p>").append(this.eq(0).clone()).html();
    }
})(jQuery);

/*
 * Authors: T3CHNOCIDE (http://community.wikia.com/wiki/User:T3CHNOCIDE)
 *          Silicon Soldier (http://community.wikia.com/wiki/User:Silicon_Soldier)
 * Website: Destiny Wiki (http://destiny.wikia.com)
 * License: CC-BY-SA 3.0
 * Version: v2.0 (.. July 2016)
 * Function:
 *      Modifies Special:Upload to include a graphical form which allows users to select
 *      pre-defined options that describe the image and enfore entry of information such as 
 *      image source and licensing. From the collected data, the script autofills the
 *      description box with image information and categories.
 * History:
 *      29 January 2014 - 1.0 Finalised
 *      23 October 2015 - Updated to use JS object to hold category data.
 *      15 April 2016   - Minor fix.
 *      .. July 2016    - 2.0 Beta Released
 * To Do:
 *      1) Store provided data in cookie to enable recovery in event of accidental page closure.
 *      2) Retain provided data when image upload rejected. EG: False positive duplicate image.
 *      3) Implement caching of generated HTML.
 * Additional Details:
 *      This JavaScript extension requires additional CSS to function as expected.
 *      Below is a list of the CSS classes used.
 *      - uf-header
 *      - uf-section
 *      - uf-hide
 *      - uf-selected
 *      - uf-button
 *      - uf-expander
 *      - uf-more-buttons
 */

var ufInput = {
    type: [],
    game: [],
    subject: [],
    description: "",
    source: "",
    holder: "",
    license: []
};

function ufSection(header, description, content) {
    "use strict";
    return "<div class=\"uf-header\">" + header + "</div>" + description + "<div class=\"uf-section\">" + content + "</div>";
}


function ufButton(data, purpose) {
    "use strict";
    if (purpose === "type") {
        return "<div class=\"uf-button\" onclick=\"ufSelect(this);\" title=\"" + data.description + "\" data-type=\"" + data.category + "\">" + data.name + "</div>";
    }
    else if (purpose === "game") {
        return "<div class=\"uf-button\" onclick=\"ufSelect(this);\" title=\"" + data.description + "\" data-game=\"" + data.category + "\">" + data.name + "</div>";
    }
    else if (purpose === "subject") {
        return "<div class=\"uf-button\" onclick=\"ufSelect(this);\" title=\"" + data.description + "\" data-subject=\"" + data.category + "\">" + data.name + "</div>";
    }
    else if (purpose === "license") {
        return "<div class=\"uf-button\" onclick=\"ufSelect(this);\" title=\"" + data.description + "\" data-license=\"" + data.template + "\">" + data.name + "</div>";
    }/*
    else if (purpose === "source") {
        return "<div class=\"uf-button\" onclick=\"ufSelect(this);\" title=\"" + description + "\" data-source=\"" + data + "\">" + name + "</div>";
    }*/
    return "Error!";
}
function ufMoreButton(name, description, data, purpose) {
    "use strict";
    return "<div class=\"uf-more-buttons\">" + "<div class=\"uf-button uf-expander\" onclick=\"ufExpand(this);\" title=\"" + description + "\" data-selected=\"0\">" + name + "</div>" + "<div class=\"uf-button uf-hide\" onclick=\"ufExpand(this);\">&larr;</div><div class=\"uf-buttons uf-hide\">" + ufButtons(data, purpose) + "</div></div>";
}
function ufButtons(data, purpose) {
    "use strict";
    var returnData = "";
    for (var prop in data) {
        if (data[prop].more === true) {
            returnData += ufMoreButton(data[prop].name, data[prop].description, data[prop].list, purpose);
        }
        else {
            returnData += ufButton(data[prop], purpose);
        }
    }
    return returnData;
}


function ufTextArea(id, placeholder) {
    "use strict";
    return "<textarea class=\"uf-textarea ui-autocomplete-input\" id=\"" + id + "\"" + " placeholder=\"" + placeholder + "\" rows=\"2\" cols=\"80\" spellcheck=\"true\"></textarea>";
}

function ufExpand(sender) {
    "use strict";
    $(sender).parent().parent().children().toggleClass("uf-hide");
    $(sender).parent().toggleClass("uf-hide");
    $(sender).parent().children().toggleClass("uf-hide");
}

function ufSelect(sender) {
    "use strict";
    var expanderButton = $(sender).parent().parent().children(".uf-expander");
    if ($(expanderButton).attr("data-selected") >= 0) {
        if ($(sender).hasClass("uf-selected")) {
            $(expanderButton).attr("data-selected", +$(expanderButton).attr("data-selected") - 1);
            if ($(expanderButton).attr("data-selected") > 0) {
                expanderButton.addClass("uf-selected");
            }
            else {
                expanderButton.removeClass("uf-selected");
            }
        }
        else {
            $(expanderButton).attr("data-selected", +$(expanderButton).attr("data-selected") + 1);
            expanderButton.addClass("uf-selected");
        }
    }
    $(sender).toggleClass("uf-selected");
    if ($(sender).hasClass("uf-selected")) {
        if ($(sender).attr("data-type") === undefined) {
            //not type
            if ($(sender).attr("data-game") === undefined) {
                //not game
                if ($(sender).attr("data-subject") === undefined) {
                    //not subject, but license
                    ufInput.license.push($(sender).attr("data-license"));
                }
                else {
                    //subject
                    ufInput.subject.push($(sender).attr("data-subject"));
                }
            }
            else {
                //game
                ufInput.game.push($(sender).attr("data-game"));
            }
        }
        else {
            //type
            ufInput.type.push($(sender).attr("data-type"));
        }
    }
    else {
        if ($(sender).attr("data-type") === undefined) {
            //not type
            if ($(sender).attr("data-game") === undefined) {
                //not game
                if ($(sender).attr("data-subject") === undefined) {
                    //not subject, but license
                    var i = ufInput.license.indexOf($(sender).attr("data-license"));
                    if (i != -1) {
                        ufInput.license.splice(i, 1);
                    }
                }
                else {
                    //subject
                    var i = ufInput.subject.indexOf($(sender).attr("data-subject"));
                    if (i != -1) {
                        ufInput.subject.splice(i, 1);
                    }
                }
            }
            else {
                //game
                var i = ufInput.game.indexOf($(sender).attr("data-game"));
                if (i != -1) {
                    ufInput.game.splice(i, 1);
                }
            }
        }
        else {
            //type
            var i = ufInput.type.indexOf($(sender).attr("data-type"));
            if (i != -1) {
                ufInput.type.splice(i, 1);
            }
        }
    }

    ufInput.description = $("#description").val();
    ufInput.source = $("#source").val();
    ufInput.holder = $("#holder").val();

    ufUpdateDescription();
}

function ufUpdateDescription() {
    var content = "{{Image summary\n|type=";
    if (ufInput.type.length > 1) {
        for (var i in ufInput.type) {
            content += ufInput.type[i] + ", "
        }
    }
    else if (ufInput.type.length > 0) {
        content += ufInput.type[0];
    }
    content += "\n|description=" + ufInput.description + "\n|source=" + ufInput.source + "\n|holder=" + ufInput.holder + "\n|license=";
    for (var i in ufInput.license) {
        content += "{{" + ufInput.license[i] + "}}";
    }
    content += "\n}}\n";
    for (var i in ufInput.subject) {
        content += "[[Category:" + ufInput.subject[i] + "]]\n";
    }
    for (var i in ufInput.type) {
        content += "[[Category:" + ufInput.type[i] + "]]\n";
    }
    for (var i in ufInput.game) {
        content += "[[Category:" + ufInput.game[i] + "]]\n";
    }
    $("#wpUploadDescription").html(content);
}

//Generates and injectes upload form.
function ufInject() {
    "use strict";
    /*mw.config.get('wgCanonicalSpecialPageName') === 'Upload' && !mw.config.get('wpForReUpload') && mw.config.get('wgDBname') === "molten"*/
    if (true) {
        //Minified using http://httputility.net/json-minifier.aspx
        var categoryData = { imageType: [{ name: "3D Render", category: "3D Renders", "description": "Images of 3D game models.\nIncludes: 3D weapon 3D armor models, 3D character models, etc." }, { name: "Advert", category: "Adverts", description: "Images of advertisements." }, { name: "Animation", category: "Animations", description: "Any animated images.\nIncludes: Emote animations, reload animations, etc." }, { name: "Box Art", category: "Box Art", description: "The cover art from merchandise boxes.\nIncludes: Game covers, book covers, sound track covers, etc." }, { name: "Concept Art", category: "Concept Art", description: "Bungie concept art of current and future Destiny series content.\nIncludes: Map concept art, weapon concept art, character concept art, etc." }, { name: "Diagram", category: "Diagrams", description: "Images of diagrams, graphs, or tables.\n Includes: Raid diagrams, weapon damage over distance graphs, and crucible statistic tables." }, { name: "Drawing", category: "Drawings", description: "Pencil, fine pen, or other stylus based drawings of Destiny series content.\nIncludes: Character drawings, weapon drawings, etc." }, { name: "Graphic", category: "Graphics", description: "Images of digital art work, or designs.\nIncludes: Banners, backgrounds, grimoire cards, etc." }, { name: "Icon", category: "Icons", description: "Images representing a specific topic or content.\nIncludes: Inventory item icons, quest icons, perk icons, rating icons, etc." }, { name: "Logo", category: "Logos", description: "Images of in-game or real life logos.\nIncludes: Omolon logo, Bungie logo, etc." }, { name: "Photograph", category: "Photographs", description: "Images taken with a camera.\nIncludes: Employee photos, gaming event photos, etc." }, { name: "Poster", category: "Posters", description: "Images of posters related to the Destiny series.\nIncludes: Destiny poster, Destiny Guardian Fireteam poster, etc." }, { name: "Scan", category: "Scans", description: "Scanned images of physical objects.\nIncludes: Scanned game manual images, scanned documents, etc." }, { name: "Screenshot", category: "Screenshots", description: "Screen capture of computer or in-game image.\nIncludes: Weapon screenshots, armor screenshots, environment screenshots, boss screenshots, etc." }, { name: "Unknown", category: "Unknown Type Images", description: "Images that don't fit into the prior types." }], imageGame: [{ name: "Destiny", description: "All images related to Destiny The Game.\nIf the image is related to a specific expanion for Destiny, select that expansion.", more: true, list: [{ name: "Destiny", category: "Destiny Images", description: "All images related to Destiny The Game.\nIf the image is related to a specific expanion for Destiny, select that expansion." }, { name: "The Dark Below", category: "The Dark Below Images", description: "All images related to The Dark Below expansion." }, { name: "House of Wolves", category: "House of Wolves Images", description: "All images related to the House of Wolves expansion." }, { name: "The Taken King", category: "The Taken King Images", description: "All images related to The Taken King expansion." }, { name: "Rise of Iron", category: "Rise of Iron Images", description: "All images related to the Rise of Iron expansion." }] }], imageSubject: [{ name: "Achievement and Trophy", category: "Achievement and Trophy Images", description: "" }, { name: "Activity", description: "", more: true, list: [{ name: "Activity", category: "Activity Images", description: "" }, { name: "Arena", category: "Arena Images", description: "" }, { name: "Bounty", category: "Bounty Images", description: "" }, { name: "Crucible", category: "Crucible Images", description: "" }, { name: "Event", category: "Event Images", description: "" }, { name: "Patrol", description: "", more: true, list: [{ name: "Patrol", category: "Patrol Images", description: "" }, { name: "Public Event", category: "Public Event Images", description: "" }] }, { name: "Quest", category: "Quest Images", description: "" }, { name: "Raid", category: "Raid Images", description: "" }, { name: "Social Space", category: "Social Space Images", description: "" }, { name: "Story Mission", category: "Story Mission Images", description: "" }, { name: "Strike", category: "Strike Images", description: "" }] }, { name: "Announcement", description: "", more: true, list: [{ name: "Announcement", category: "Announcement Images", description: "" }, { name: "Promotional Event", description: "", more: true, list: [{ name: "Promotional Event", category: "Promotional Event Images", description: "" }, { name: "Alpha Lupi Experience", category: "Alpha Lupi Images", description: "" }, { name: "Destiny First Look Alpha", category: "Destiny First Look Alpha Images", description: "" }, { name: "Destiny Public Beta", category: "Destiny Public Beta Images", description: "" }, { name: "Destiny Selfie", category: "Destiny Selfie Images", description: "" }] }] }, { name: "Character", description: "", more: true, list: [{ name: "Character", category: "Character Images", description: "" }, { name: "Guardian", category: "Guardian Images", description: "" }, { name: "Named Enemy", category: "Named Enemy Images", description: "" }, { name: "Vendor", category: "Vendor Images", description: "" }] }, { name: "Cut Content", category: "Cut Content Images", description: "" }, { name: "Development", category: "Development Images", description: "" }, { name: "Easter Egg", category: "Easter Egg Images", description: "" }, { name: "Faction", category: "Faction Images", description: "" }, { name: "Gameplay", description: "", more: true, list: [{ name: "Gameplay", category: "Gameplay Images", description: "" }, { name: "Ability", category: "Ability Images", description: "" }, { name: "Attribute", category: "Attribute Images", description: "" }, { name: "Class", category: "Class Images", description: "" }, { name: "Combat", category: "Combat Images", description: "" }, { name: "Equipable Relic", category: "Equipable Relic Images", description: "" }, { name: "HUD", category: "HUD Images", description: "" }, { name: "Medal", category: "Medal Images", description: "" }, { name: "Modifier", category: "Modifier Images", description: "" }, { name: "Perk", description: "", more: true, list: [{ name: "Perk", category: "Perk Images", description: "" }, { name: "Armor Perk", category: "Armor Perk Images", description: "" }, { name: "Class Perk", category: "Class Perk Images", description: "" }, { name: "Sparrow Perk", category: "Sparrow Perk Images", description: "" }, { name: "Weapon Perk", category: "Weapon Perk Images", description: "" }] }, { name: "UI", category: "UI Images", description: "" }] }, { name: "Grimoire Card", category: "Grimoire Card Images", description: "" }, { name: "Inventory Item", category: "Inventory Item Images", description: "", more: true, list: [{ name: "Inventory Item", category: "Inventory Item Images", description: "" }, { name: "Class", description: "", more: true, list: [{ name: "Hunter", category: "Hunter Item Images", description: "" }, { name: "Titan", category: "Titan Item Images", description: "" }, { name: "Warlock", category: "Warlock Item Images", description: "" }] }, { name: "Rarity", description: "", more: true, list: [{ name: "Exotic", category: "Exotic Item Images", description: "" }, { name: "Legendary", category: "Legendary Item Images", description: "" }, { name: "Rare", category: "Rare Item Images", description: "" }, { name: "Uncommon", category: "Uncommon Item Images", description: "" }, { name: "Basic", category: "Basic Item Images", description: "" }] }, { name: "Type", description: "", more: true, list: [{ name: "Armor", description: "", more: true, list: [{ name: "Armor", category: "Armor Images", description: "" }, { name: "Armor Set", category: "Armor Set Images", description: "" }, { name: "Artifact", category: "Artifact Images", description: "" }, { name: "Bond", category: "Bond Images", description: "" }, { name: "Chest Armor", category: "Chest Armor Images", description: "" }, { name: "Clock", category: "Cloak Images", description: "" }, { name: "Gauntlets", category: "Gauntlet Images", description: "" }, { name: "Ghost Shell", category: "Ghost Shell Images", description: "" }, { name: "Helmet", category: "Helmet Images", description: "" }, { name: "Leg Armor", category: "Leg Armor Images", description: "" }, { name: "Mark", category: "Mark Images", description: "" }, { name: "Mask", category: "Mask Images", description: "" }] }, { name: "Consumable", description: "", more: true, list: [{ name: "Consumable", category: "Consumable Images", description: "" }, { name: "Ammo Synthesis", category: "Ammo Synthesis Images", description: "" }, { name: "Glimmer-Drop Consumable", category: "Glimmer-Drop Consumable Images", description: "" }, { name: "Sparrow Upgrade", category: "Sparrow Upgrade Images", description: "" }, { name: "Summoning Rune", category: "Summoning Rune Images", description: "" }, { name: "Treasure Key", category: "Treasure Key Images", description: "" }, { name: "Weapon Telemetry", category: "Weapon Telemetry Images", description: "" }] }, { name: "Currency", category: "Currency Images", description: "" }, { name: "Emblem", category: "Emblem Images", description: "" }, { name: "Emote", category: "Emote Images", description: "" }, { name: "Engram", category: "Engram Images", description: "" }, { name: "Material", category: "Material Images", description: "" }, { name: "Mystery Bag", category: "Mystery Bag Images", description: "" }, { name: "Relic", category: "Relic Item Images", description: "" }, { name: "Shader", category: "Shader Images", description: "" }, { name: "Vehicle", description: "", more: true, list: [{ name: "Vehicle", category: "Vehicle Images", description: "" }, { name: "Jumpship", category: "Jumpship Images", description: "" }, { name: "Sparrow", category: "Sparrow Images", description: "" }] }, { name: "Weapon", description: "", more: true, list: [{ name: "Weapon", category: "Weapon Images", description: "" }, { name: "Auto Rifle", category: "Auto Rifle Images", description: "" }, { name: "Fusion Rifle", category: "Fusion Rifle Images", description: "" }, { name: "Hand Cannon", category: "Hand Cannon Images", description: "" }, { name: "Machine Gun", category: "Machine Gun Images", description: "" }, { name: "Pulse Rifle", category: "Pulse Rifle Images", description: "" }, { name: "Rocket Launcher", category: "Rocket Launcher Images", description: "" }, { name: "Scout Rifle", category: "Scout Rifle Images", description: "" }, { name: "Shotgun", category: "Shotgun Images", description: "" }, { name: "Sidearm", category: "Sidearm Images", description: "" }, { name: "Sniper Rifle", category: "Sniper Rifle Images", description: "" }, { name: "Sword", category: "Sword Images", description: "" }] }] }] }, { name: "Leak", category: "Leak Images", description: "" }, { name: "Location", category: "Location Images", description: "" }, { name: "Merchandise", category: "Merchandise Images", description: "" }, { name: "People", category: "People Images", description: "" }, { name: "Species", category: "Species Images", description: "" }, { name: "Unknown", category: "Unknown Subject Images", description: "" }], imageSource: [{ name: "Game", description: "If the image was taken from a game.", explanation: "Enter the name of the game which the image was taken from.<br>Using this example format: ''Destiny: The Taken King''<br>• You can include the mission or activity by using a hyphen, i.e. \" - The King's Fall\".<br>• You can also include the location by using a hyphen again \" - The Tower, Earth\"." }, { name: "Book", description: "If the image was taken from a book.", explanation: "Enter the name of the book and the page number(s) which the image was taken from.<br>Using this example format: '''Destiny Limited Edition Strategy Guide''- ''152''<br>• Use # for one page or #-# for a range of pages." }, { name: "Magazine", description: "If the image was taken from a magazine.", explanation: "Enter the name of the magazine and the page number(s) which the image was taken from.<br>Using this example format: '''Official Xbox Magazine''- ''13-14''<br>• Use # for one page or #-# for a range of pages." }, { name: "Video", description: "If the image was taken from a video.", explanation: "Enter the link to the video and time which the image was taken from.<br>Using this example format: ''https://www.youtube.com/watch?v=SXyMmrgH5d8'' (00:52)<br>• (00:00) is the time of the video when the image was seen.<br>• If there is no link, give the full name of the video." }, { name: "Website", description: "If the image was taken from a website.", explanation: "Enter the link to the website where the image was taken from.<br>Using this example format: ''https://www.bungie.net/en/pub/TheTakenKing''<br>• For images from the API include the whole API call URL with parameters." }, { name: "Other", description: "If the image was taken from somewhere else.", explanation: "Enter as much information as possible about the source of the image, including links and/or titles of the source." }], imageLicense: [{ name: "Copyright", template: "Copyright", description: "If the image is owned by someone but permission was given." }, { name: "Fair Use", template: "Fair Use", description: "If the image is copyrighted but it'll be used to illistrate the article and there's no free version available." }, { name: "Share Alike", template: "Share Alike", description: "If the image has been published under the CC-BY-SA license." }, { name: "GNU GPL", template: "GNU GPL", description: "If the image has been published under the GNU General Public License." }, { name: "Public Domain", template: "Public Domain", description: "If the image has been taken from or published into the public domain." }, { name: "Other", template: "Other", description: "If the image has been published under a different license or you do not know what license the image was published under.\nPlease remember the source of the image." }] };
        //Variable to hold HTML to be injected.
        var htmlToInject;

        //Image Name generation and retrival.
        htmlToInject = ufSection("Name", "", $("[for='wpDestFile']").outerHTML() + $("#wpDestFile").outerHTML());

        //Image Type generation.
        htmlToInject += ufSection("Type", "Select at least 1 image type that best fits the image to be uploaded.", ufButtons(categoryData.imageType, "type"));

        //Image Game generation.
        htmlToInject += ufSection("Game", "Select the game this image is related to.", ufButtons(categoryData.imageGame, "game"));

        //Image Subject generation.
        htmlToInject += ufSection("Subject(s)", "Select the subjects that this image fits.", ufButtons(categoryData.imageSubject, "subject"));

        //Image Description generation.
        htmlToInject += ufSection("Description", "", ufTextArea("description", "Enter a breif description of the image."));

        //Image Source generation.
        htmlToInject += ufSection("Source",  "" /*ufButtons(categoryData.imageSource, "source")*/, ufTextArea("source", "Enter source details here..."))

        //Image Copyright Holder generation.
        htmlToInject += ufSection("Copyright Holder", "Provide the name/username of the individual or company that originally created this image.<br/>Images such as in-game screenshots are considered to be owned by developer. (EG: Bungie)", ufTextArea("holder", "Enter copyright holder here..."));

        //Image License generation.
        htmlToInject += ufSection("License", "Select the license the image is under.", ufButtons(categoryData.imageLicense, "license"));

        //Description
        htmlToInject += ufSection("Page Preview", "",$("#wpUploadDescription").outerHTML());

        //Injection
        $("#mw-htmlform-description").replaceWith(htmlToInject);
    }
}

//Execute ufInject after DOM has loaded.
document.addEventListener("DOMContentLoaded", ufInject, false);