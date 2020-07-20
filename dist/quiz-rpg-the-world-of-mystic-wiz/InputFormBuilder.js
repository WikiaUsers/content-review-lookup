/********** UNUSED functions below **********/
/*
function BuildXPForm(){
    function makeLabel(forValue, content) {
        var label = document.createElement("label");
        $(label).attr("for", forValue);
        $(label).append(content);
        return label;
    }
 
    function makeInput(typeValue, idValue) {
        var input = document.createElement("input");
        $(input).attr("type", typeValue);
        if (idValue) {
            $(input).attr("id", idValue);
        }
        return input;
    }
 
    function makeThreeBox(id, content){
        var container = document.createElement("div");
        $(container).addClass("threeBox")
        var i = makeInput("checkbox", id);
        var l = makeLabel(id, false);
        $(l).append(content);
        $(container).append(i)
        $(container).append(l)
        return container
    }
 
    var f = document.createElement("form");
    $(f).addClass("formContainer");
    $(f).attr("id", "XPForm");
 
    var curExp = makeLabel("curExp", "Current Exp: ");
    $(f).append(curExp);
    var curExpInput = makeInput("number", "curExp");
    $(f).append(curExpInput);
    $(f).append(document.createElement("br"))
 
    var rank = makeLabel("targetRank", "Spirit Rank: ");
    $(f).append(rank);
    var rankSelect = document.createElement("select");
    $(rankSelect).attr("name", "Rank");
    $(rankSelect).attr("id", "targetRank");
    $.each( ["SS", "S+", "S", "A+", "A", "B+", "B", "C+"], function( index, value ){
        var opt = document.createElement("option")
        $(opt).append(value)
        $(rankSelect).append(opt)
    });
    $(f).append(rankSelect);
    $(f).append(document.createElement("br"))
 
    $(f).append(makeThreeBox("S_Book", "S Book"))
    $(f).append(makeThreeBox("A_Book", "A Book"))
    $(f).append(makeThreeBox("B_Book", "B Book"))
 
    var bonusXP = document.createElement("div")
    $(bonusXP).addClass("twoBox")
    $(bonusXP).append(makeLabel("bonusExp", "Is it 1.5x Exp?"))
    $(bonusXP).append(makeInput("checkbox", "bonusExp"))
    $(f).append(bonusXP)
 
    var offColor = document.createElement("div")
    $(offColor).addClass("twoBox")
    $(offColor).append(makeLabel("offColor", "Off color?"))
    $(offColor).append(makeInput("checkbox", "offColor"))
    $(f).append(offColor)
    $(f).append(document.createElement("br"))
 
    var submitButton = makeInput("button", "submitExp")
    $(submitButton).attr("value", "Submit")
    $(submitButton).attr("onclick", "calcExp()")
    $(f).append(submitButton)
    return f
}
*/