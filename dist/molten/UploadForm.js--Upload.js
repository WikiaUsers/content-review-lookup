//This script creates the upload form at Special:Upload. It forms part of a larger script.

//Global variable used for tracking form status.
var ufInput = {
    typeCategory: [],
    typeName: [],
    game: [],
    subject: [],
    description: "",
    source: "",
    holder: "",
    license: []
};

//Generates section HTML.
function ufSection(header, description, content) {
    "use strict";
    var data = {
        header: header,
        description: description,
        content: content
    }
    var tpl = "<div class='uf-header'>{{header}}</div>{{{description}}}<div class='uf-section'>{{#content}}{{{content}}}{{/content}}</div>";
    return Mustache.render(tpl, data);
}

//Generates button HTML.
function ufButton(data, purpose) {
    "use strict";
    var d = {
        purpose: purpose,
        description: data.description,
        name: data.name
    }
    if (purpose === "license") {
        d["value"] = data.template;
    }
    else {
        d["value"] = data.category;
    }

    var tpl ="<div class='uf-button' onclick='ufSelect(this,\"{{purpose}}\",\"{{value}}\");' title='{{description}}'>{{name}}</div>";

    return Mustache.render(tpl, d);
}

//Generates expanding button html.
function ufMoreButton(name, description, data, purpose) {
    "use strict";
    return "<div class='uf-more-buttons'><div class='uf-button uf-expander' onclick='ufExpand(this);' title='" + description + "'data-selected='0' data-name='" + name + "'>" + name + " +</div><div class='uf-buttons uf-hide'>" + ufButtons(data, purpose) + "</div></div>";
}

//Generates lots of buttons.
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

//Generate text area html
function ufTextArea(id, placeholder) {
    "use strict";
    var data = {
        id: id,
        placeholder: placeholder
    }
    var tpl = "<textarea class='uf-textarea' id='{{id}}' placeholder='{{placeholder}}' rows='2' cols='80' spellcheck='true'></textarea>";
    return Mustache.render(tpl, data);
}

//Toggle expand for expandable button
function ufExpand(sender) {
    "use strict";
    var name = $(sender).attr("data-name");
    if ($(sender).parent().children(".uf-buttons").hasClass("uf-hide")) {
        $(sender).text("← " + name);
    }
    else {
        $(sender).text(name + " +");
    }
    $(sender).parent().children(".uf-buttons").toggleClass("uf-hide");
    //Toggle class for surounding elements
    $(sender).parent().parent().children().toggleClass("uf-hide");
    $(sender).parent().toggleClass("uf-hide");
}

function ufSelectCascade(sender, selected) {
    var selectedChildren = parseInt($(sender).attr("data-selected"), 10);
    if (selected) {
        //Child has been seleceted.
        selectedChildren++;
        $(sender).addClass("uf-selected");
    }
    else {
        //child has been deselected.
        selectedChildren--;
        if (selectedChildren === 0) {
            $(sender).removeClass("uf-selected");
        }
    }
    $(sender).attr("data-selected", selectedChildren);
    if ($(sender).parent().parent().parent().hasClass("uf-more-buttons")) {
        ufSelectCascade($(sender).parent().parent().parent().children(".uf-expander"), selected);
    }
}

function ufSelect(sender, purpose, value) {
    "use strict";
    //Check if selected or deselected
    var selected = !$(sender).hasClass("uf-selected");

    //Check if selected and in expander, handle cascade.
    if ($(sender).parent().parent().hasClass("uf-more-buttons")) {
        ufSelectCascade($(sender).parent().parent().children(".uf-expander"), selected);
    }
    
    //Toggle selection state.
    $(sender).toggleClass("uf-selected");
    
    //Get button name
    var name = $(sender).text();
    
    //Make changes to input variable.
    if (selected) {
        //Add
        switch (purpose) {
            case "type":
                ufInput.typeCategory.push(value);
                ufInput.typeName.push(name);
                break;
            case "game":
                ufInput.game.push(value);
                break;
            case "subject":
                ufInput.subject.push(value);
                break;
            case "license":
                ufInput.license.push(value);
                break;
        }
    }
    else if (!selected)
    {
        //Remove
        //Assume i is never -1.
        switch (purpose) {
            case "type":
                var i = ufInput.typeCategory.indexOf(value);
                ufInput.typeCategory.splice(i, 1);
                i = ufInput.typeName.indexOf(name);
                ufInput.typeName.splice(i, 1);
                break;
            case "game":
                var i = ufInput.game.indexOf(value);
                ufInput.game.splice(i, 1);
                break;
            case "subject":
                var i = ufInput.subject.indexOf(value);
                ufInput.subject.splice(i, 1);
                break;
            case "license":
                var i = ufInput.license.indexOf(value);
                ufInput.license.splice(i, 1);
                break;
        }
    }
    ufUpdateDescription();
}

function ufUpdateDescription() {
    //use mustache!
    ufInput.description = $("#description").val();
    ufInput.source = $("#source").val();
    ufInput.holder = $("#holder").val();
    var customMustacheTags = [ "<<", ">>" ];
    var tpl = "{{=<< >>=}}{{Image summary\n|type=<<#typeName>><<.>><</typeName>>\n|description=<<description>>\n|source=<<source>>\n|holder=<<holder>>\n|license=<<#license>>{{<<.>>}}<</license>>\n}}\n<<#subject>>[[Category:<<.>>]]\n<</subject>><<#typeCategory>>[[Category:<<.>>]]<</typeCategory>>\n<<#game>>[[Category:<<.>>]]\n<</game>>";
    //Mustache.parse(tpl, customMustacheTags);
    $("#wpUploadDescription").html(Mustache.render(tpl, ufInput));
}

//Implement warning messages.
function ufWarnings(event) {
    ufUpdateDescription();
    if (wgUserGroups.indexOf("sysop") == -1) {
        //Make sure description is up-to-date.
        var response = "";
        var totalWarnings = 0;
        //Check that 1, and only 1 image type selected.
        if (ufInput.typeCategory.length != 1){
            totalWarnings++;
            response += "Select 1 (and only 1) image type.\n";
        }
        //Need to add an override.
        if (ufInput.game.length != 1){
            totalWarnings++;
            response += "Select 1 (and only 1) game or expansion.\n";
        }
        if (ufInput.subject.length < 1){
            totalWarnings++;
            response += "Select the subject(s) the image is related to.\n";
        }
        if (ufInput.description === ""){
            totalWarnings++;
            response += "Provide a description.\n";
        }
        if (ufInput.source === ""){
            totalWarnings++;
            response += "Provide the image source.\n";
        }
        if (ufInput.holder === ""){
            totalWarnings++;
            response += "Provide the images copyright holder (owner).\n";
        }
        if (ufInput.license.length != 1){
            totalWarnings++;
            response += "Select 1 (and only 1) license.\n";
        }
        if (response !== "") {
            alert("Error(s) has been found.\n\n" + response + "\nPlease fix before submitting.");
            return false;
        }
    }
    return true;
}

function ufEntry() {
    //Asynchronously get data, and send to ufExecute.
    //Async means will not block page usage.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            data = JSON.parse(data["query"]["pages"][Object.keys(data["query"]["pages"])[0]]["revisions"][0]["*"]);
            ufCreateForm(data);
        }
    }
    request.open("GET", mw.util.wikiScript("api") + "?action=query&format=json&titles=Data:UploadForm&prop=revisions&rvprop=content", true);
    request.send();
}

function ufCreateForm(data) {
    "use strict";
    
    //Variable to hold HTML to be injected.
    var htmlToInject;

    //Image Name generation and retrival. Note about form being rebuilt will be removed 1 week after code has gone live.
    $(".mw-htmlform-field-HTMLTextField").before("<tr><td colspan=\"2\">" + "<div class=\"insights-module\" style=\"padding:10px;text-align:center;\">Please fill out the form to upload. If you have any problems, or have suggestions for improvement, contact <a href=\"http://destiny.wikia.com/wiki/Message_Wall:Silicon_Soldier\">Silicon Soldier</a>.</div>" + ufSection("Name") + "</td></tr>");

    //Image Type generation.
    htmlToInject += "<tr><td colspan=\"2\">" + ufSection("Type", "Select the image type that best fits the image to be uploaded.", ufButtons(data.imageType, "type"));

    //Image Game generation.
    htmlToInject += ufSection("Game", "Select the game or expansion this image is related to.", ufButtons(data.imageGame, "game"));

    //Image Subject generation.
    htmlToInject += ufSection("Subject(s)", "Select the subjects that this image fits.<br/>For inventory items, select 1 rarity tier, 1 type, and if the item has a player class restriction like most armor, select 1 class.", ufButtons(data.imageSubject, "subject"));

    //Image Description generation.
    htmlToInject += ufSection("Description", "Enter a brief description about the image.", ufTextArea("description", "Enter description here."));

    //Image Source generation.
    htmlToInject += ufSection("Source",  "Enter as much detail as possible about the images source.<br/>For images retrived from websites, provide the URL the image came from.", ufTextArea("source", "Enter source details here..."));

    //Image Copyright Holder generation.
    htmlToInject += ufSection("Copyright Holder", "Provide the name/username of the individual or company that originally created this image.<br/>Images such as in-game screenshots are considered to be owned by developer. (EG: Bungie)", ufTextArea("holder", "Enter copyright holder here..."));

    //Image License generation.
    htmlToInject += ufSection("License", "Select the license the image is under.", ufButtons(data.imageLicense, "license"));
        
    //Description
    htmlToInject += ufSection("Page Preview", "", "") + "</td></tr>";
        
    $(".mw-htmlform-field-HTMLTextAreaField").before(htmlToInject);
        
    $(".mw-htmlform-field-Licenses").remove();
        
    //Attach warning event to submit button.
    $("#mw-upload-form").submit(ufWarnings);
}

$(document).ready(ufEntry());