var treeNames = [
    "angriff",
    "abwehr",
    "wissen",
];
var treeOffsets = [
    0,
    data[0].length,
    data[0].length + data[1].length
];
var MAX_POINTS = 30;
var TREE_OFFSET = 305;
var HEIGHT_GAP = 26;
var BUTTON_SIZE = 56;
var state = [{}, {}, {}];
var totalPoints = 0;
var buttonClasses = ["unavailable", "available", "full"];
var rankClasses = ["num-unavailable", "num-available", "num-full"];

function drawCalculator() {
    for (var tree = 0; tree < 3; tree++)
        for (var index = 0; index < data[tree].length; index++)
            drawButton(tree, index);

    // make tooltip
    var tip, maxDims = {width: $("#calculator").parent().width(), height: $("#calculator").parent().height()};
    $("#calculator")
        .contextmenu(function(event){ event.preventDefault() })
        .append(
            $("<div>")
                .attr('id', "tooltip")
                .append($("<strong>"))
                .append(
                    $("<div>")
                        .addClass("rank")
                )
                .append(
                    $("<div>")
                        .addClass("req")
                )
                .append(
                    $("<p>")
                        .addClass("tooltip-text")
                        .addClass("first")
                )
                .append(
                    $("<p>")
                        .addClass("tooltip-text")
                        .addClass("second")
                        .append(
                            $("<div>")
                                .addClass("nextRank")
                                .text("Nächster Rang:")
                        )
                        .append(
                            $("<div>")
                                .addClass("content")
                        )
                )
        );

    // mousemove event global since it follows tooltip visibility
    var anchor = $("#calculator");
    $(window)
        .mousemove(function(event){
            if (tip.is(":visible")) {
                // boundary checking for tooltip (right and bottom sides)
                var pos = anchor.offset();
                var offsetX = 20, offsetY = 20;
                if (event.pageX - pos.left + tip.width() > maxDims.width - 30)
                    offsetX = -tip.width() - 20;
                if (event.pageY - pos.top + tip.height() > maxDims.height )
                    offsetY = -tip.height() - 20;
                tip.css({
                    left: event.pageX - pos.left + offsetX,
                    top:  event.pageY - pos.top + offsetY,
                });
            }
        });
    tip = $("#tooltip");

    $("#points>.count").text(MAX_POINTS);
}

function drawButton(tree, index) {
    var spritePos = masterySpritePos(tree, index);
    var buttonPos = masteryButtonPosition(tree, index);
    var status = data[tree][index].index < 5 ? "available" : "unavailable";
    var rank = 0;

    // Check if we need to draw the requirement
    var parent = data[tree][index].parent;
    var parentLink = null;
    if (parent != undefined) {
        var parentPos = masteryButtonPosition(tree, parent);
        $("#calculator").append(parentLink = 
            $("<div>")
                .addClass("requirement")
                .addClass("unavailable")
                // height is one gap and button for each in between them, plus an extra gap 
                .css({
                    height: (HEIGHT_GAP + BUTTON_SIZE) * 
                            (data[tree][index].index/4 - data[tree][parent].index/4 - 1) + HEIGHT_GAP + 5,
                    left: parentPos.x + 18,
                    top: parentPos.y + BUTTON_SIZE - 2,
                })
        );
    }

    $("#calculator").append(
        $("<div>")
            .addClass("iconbuttons")
            .addClass(status)
            .data("parentLink", parentLink)
            .css({
                left: buttonPos.x+"px",
                top: buttonPos.y+"px",
                // Sprite has two columns: 0px is color and -58px is black and white
                backgroundPosition: (status != "unavailable" ? -2 : -60) + "px " + 
                                    (spritePos - 2) + "px",
            })
            .append(
                $("<div>")
                    .addClass("counter")
                    .addClass("num-"+status)
                    .text("0/" + data[tree][index].ranks)
            )
            .mouseover(function(event){
                var tooltipText = masteryTooltip(tree, index, rank);
                formatTooltip($("#tooltip").show(), tooltipText);
                $(this).data("hover", true);
                $(this).parent().mousemove();
            })
            .mouseout(function(){
                $("#tooltip").hide();
                $(this).data("hover", false);
            })
            .mousedown(function(event){
                switch (event.which) {
                    case 1:
                        // Left click
                        if (isValidState(tree, index, rank, +1)) {
                            setState(tree, index, rank, +1);
                        }
                        break;
                    case 3:
                        // Right click
                        if (isValidState(tree, index, rank, -1)) {
                            setState(tree, index, rank, -1);
                        }
                        break;
                }
            })
            .data("update", function() {
                rank = state[tree][index] || 0;
                if (rank == data[tree][index].ranks) {
                    status = "full";
                } else {
                    // check if available
                    if (masteryPointReq(tree, index) <= treePoints(tree) && masteryParentReq(tree, index))
                        status = "available";
                    else
                        status = "unavailable";

                    // check if points spent
                    if (totalPoints >= MAX_POINTS)
                        if (rank > 0)
                            status = "available";
                        else
                            status = "unavailable";
                }
                // change status class
                if ( !$(this).hasClass(status) ) {
                    $(this)
                        .removeClass(buttonClasses.join(" "))
                        .addClass(status)
                        .css({
                            backgroundPosition: (status != "unavailable" ? -2 : -60) + "px " + 
                                                (spritePos - 2) + "px",
                        });
                }
                // adjust counter
                var counter = $(this).find(".counter").text(rank + "/" + data[tree][index].ranks);
                if ( !counter.hasClass("num-"+status) ) {
                    counter
                        .removeClass(rankClasses.join(" "))
                        .addClass("num-"+status)
                }

                // change parent status
                var parentLink = $(this).data("parentLink");
                if (parentLink != null) {
                    if ( !parentLink.hasClass(status) ) {
                        parentLink
                            .removeClass(buttonClasses.join(" "))
                            .addClass(status);
                    }
                }
                // force tooltip redraw
                if ($(this).data("hover"))
                    $(this).mouseover();
            })
    );
}

function customTooltip(tooltip, tooltipText) {
    tooltip.addClass("custom");
    tooltip.children(":not(p.first)").hide();
    tooltip.find("p.first").text(tooltipText);
}

function formatTooltip(tooltip, tooltipText) {
    tooltip.removeClass("custom");

    var head = tooltip.find("strong").text(tooltipText.header).show();
    if ( !head.hasClass(treeNames[tooltipText.tree]) ) {
        head
            .removeClass(treeNames.join(" "))
            .addClass(treeNames[tooltipText.tree]);
    }

    var rank = tooltip.find(".rank").text(tooltipText.rank).show();
    if ( !rank.hasClass(tooltipText.rankClass) ) {
        rank
            .removeClass(rankClasses.join(" "))
            .addClass(tooltipText.rankClass)
    }

    tooltip.find(".req").text(tooltipText.req).show();
    tooltip.find("p.first").html(tooltipText.body);

    var second = tooltip.find("p.second");
    if (tooltipText.bodyNext == null) {
        second.hide();
    } else {
        second
            .show()
            .find(".content")
                .html(tooltipText.bodyNext);
    }
}

function masteryTooltip(tree, index, rank) {
    var mastery = data[tree][index];
    // second flags whether there are two tooltips (one for next rank)
    var showNext = !(rank < 1 || rank >= mastery.ranks);

    // parse text
    var text = {
        tree: tree,
        header: mastery.name,
        rank: "Rank: " + rank + "/" + mastery.ranks,
        rankClass: (rank < mastery.ranks ? rankClasses[1] : rankClasses[2]),
        req: masteryTooltipReq(tree, index),
        body: masteryTooltipBody(mastery, rank),
        bodyNext: showNext ? masteryTooltipBody(mastery, rank+1) : null,
    };

    return text;
}

function masteryTooltipBody(mastery, rank)  {
    // Rank 1 is index 0, but Rank 0 is also index 0
    rank = Math.max(0, rank - 1);
    var desc = mastery.desc;
    desc = desc.replace(/#/, mastery.rankInfo[rank]);
    desc = desc.replace(/\n/g, "<br>");
    desc = desc.replace(/\|(.+?)\|/g, "<span class='highlight'>$1</span>");
    if (mastery.perlevel) {
        desc = desc.replace(/#/, Math.round(mastery.rankInfo[rank]*180)/10);
    }
    if (mastery.rankInfo2) {
        desc = desc.replace(/#/, mastery.rankInfo2[rank]);
    }
    return desc;
}

function masteryTooltipReq(tree, index) {
    var missing = [];
    var pointReq = masteryPointReq(tree, index)
    if (pointReq > treePoints(tree))
        missing.push("Benötigt " + pointReq + " Punkte in " + treeNames[tree][0].toUpperCase() + treeNames[tree].slice(1));
    if (!masteryParentReq(tree, index)) {
        var parent = data[tree][index].parent;
        missing.push("Benötigt " + data[tree][parent].ranks + " Punkte in " + data[tree][parent].name);
    }

    return missing.join("\n");
}

function masteryButtonPosition(tree, index) {
    var idx = data[tree][index].index - 1;
    var ix = idx % 4;
    var iy = Math.floor(idx / 4);
    var x=0, y=0;

    // padding for tree
    x += TREE_OFFSET * tree;
    // base padding
    x += 20;
    y += 18;
    // padding for spacing
    x += ix * (BUTTON_SIZE + 15);
    y += iy * (BUTTON_SIZE + HEIGHT_GAP);

    return {x: x, y: y};
}

function masterySpritePos(tree, index) {
    return 0 - 58 * (treeOffsets[tree] + index);
}

function masteryTier(tree, index) {
    return Math.floor((data[tree][index].index-1) / 4);
}

function masteryPointReq(tree, index) {
    return masteryTier(tree, index) * 4;
}

function masteryParentReq(tree, index) {
    var parent = data[tree][index].parent;
    if (parent && (state[tree][parent] || 0) < data[tree][parent].ranks)
        return false;
    return true;
}

function treePoints(tree, tier) {
    var points = 0;
    for (var i in state[tree])
        if (!tier || tier > masteryTier(tree, i))
            points += state[tree][i];
    return points;
}

function isValidState(tree, index, rank, mod) {
    var mastery = data[tree][index];
    if (rank+mod < 0 || rank+mod > mastery.ranks)
        return false;

    // Incrementing
    if (mod > 0) {
        // Check max points
        if (totalPoints + mod > MAX_POINTS)
            return false;

        // Check this mastery's rank requirements: never account for current rank
        if (masteryPointReq(tree, index) > treePoints(tree) - rank)
            return false;

        // Check this mastery's parent requirements
        if (!masteryParentReq(tree, index))
            return false;
    }

    // Decrementing
    if (mod < 0) {
        // Check tree rank requirements
        for (var i in state[tree])
            if (i != index)
                // Figure out tier, multiply by 4 to get req points
                if (state[tree][i] > 0 && 
                    // Calculate points in this tree up to this tier, and
                    // subtract one if we're removing from this portion
                    masteryPointReq(tree, i) > treePoints(tree, masteryTier(tree, i)) - (masteryTier(tree, index) < masteryTier(tree, i)))
                    return false;

        // Check child requirements
        for (var i in state[tree])
            if (i != index)
                if (state[tree][i] > 0 && data[tree][i].parent == index)
                    return false;
    }

    return true;
}

function setState(tree, index, rank, mod) {
    state[tree][index] = rank + mod;
    totalPoints += mod;

    updateButtons();
    updateLabels();
    updateLink();
}

// If quiet flag is true, does not call updates
function resetStates(quiet) {
    for (var tree=0; tree<3; tree++)
        resetTree(tree);

    if (quiet != true) {
        updateButtons();
        updateLabels();
        updateLink();
    }
}

// Used in both resetStates and via panel
function resetTree(tree, update) {
    totalPoints -= treePoints(tree);
    for (var index in state[tree])
        state[tree][index] = 0;
}

function updateButtons() {
    $("#calculator .iconbuttons").each(function(){
        $(this).data("update").call(this, 0);
    });
}

function updateLabels() {
    for (var tree=0; tree<3; tree++) {
        $("div[data-idx="+tree+"]").text(treePoints(tree));
        $("#points>.count").text(MAX_POINTS - totalPoints);
    }
}

function updateLink() {
    var hash = exportMasteries();
    // Do not show link for empty trees
    if (hash.length <= 3) hash = '';
    hash = '#' + hash;

    // Update link and url only if we have to
    $("#exportLink").attr("href", document.location.pathname + hash);
    if (document.location.hash != hash) {
        // Using replace() causes no change in browser history
        document.location.replace(hash);
        $('#masteries_link').attr('value', document.URL);
        // Temporarily unbind change
        $(window).unbind('hashchange');
        setTimeout(function(){
            $(window).bind('hashchange', updateMasteries);
        }, 500);
    }
}

// There are max 4 points per mastery, or 3 bits each. There is a 1 bit padding
// that is a flag to determine whether the following 5 bits are a sequence of
// mastery codes or an index increase. We greedily take masteries until the next
// one would put us over capacity, at which point we flush the buffer. You will
// always flush at the end of a tree.
var maxbits = 5;
var exportChars = "WvlgUCsA7pGZ3zSjakbP2x0mTB6htH8JuKMq1yrnwEQDLY5IVNXdcioe9fF4OR_-";
var bitlen = function(tree, index) {
    if (data[tree][index] == undefined)
        return 0;
    return Math.floor(data[tree][index].ranks/2)+1;
}
// returns how many of the next masteries can fit in size bits
var bitfit = function(tree, index, bits) {
    var start = index;
    while (true) {
        var len = bitlen(tree, index);
        if (len > bits || len == 0)
            return index - start;
        bits -= len;
        index++;
    }
}
function exportMasteries() {
    var str = "";
    var bits = 0;
    var collected = 0; // number of bits collected in this substr
    var tree, jumpStart = -1; // jumpStart is the start of the index, which we can turn to a bool by comparing >-1
    var flush = function() {
        str += exportChars[(jumpStart>-1) << maxbits | bits];
        bits = 0;
        collected = 0;
        jumpStart = -1;
    }
    for (tree = 0; tree < 3; tree++) {
        for (var index = 0; index < data[tree].length; index++) {
            var space = bitfit(tree, index, maxbits - collected);

            // check if we should flush
            if (space < 1) {
                flush();
                space = bitfit(tree, index, maxbits);
            }

            // if we are collecting or the condition is right for collecting:
            // - if we are jumping and this is 0, SKIP. 
            if (jumpStart > -1 && !(state[tree][index] > 0))
                continue;
            // otherwise:
            // - either we were collecting already (and haven't flushed)
            // - or we can collect any within the next subset that would fit in
            //   this bit. we do this with some cool filter/map/reduce
            if (collected > 0 || 
                [0,1,2,3,4]
                    .filter(function(a){ return a < space; })
                    .map(function(a){ return state[tree][index+a] || 0; })
                    .some(function(a){ return a > 0; })){
                // check if we are at the end of a jump
                if (jumpStart > -1) {
                    bits = index - jumpStart;
                    flush();
                }
                    
                // collect more
                var len = bitlen(tree, index);
                bits = (bits << len) | (state[tree][index] || 0);
                collected += len;
            } else if(jumpStart < 0) {
                // this is the start of a jump
                // check for flush
                if (collected > 0)
                    flush();
                jumpStart = index;
            }
        }
        // before switching trees, flush unless we just did
        if (jumpStart > -1) {
            bits = index - jumpStart;
            flush();
        } else if (collected > 0) {
            flush();
        }
    }

    return str;
}

// Because we used a random string, we need to reverse it
var importChars = {}
for (var i=0; i<exportChars.length; i++) {
    importChars[exportChars[i]] = i;
}
function importMasteries(str) {
    resetStates(true);

    var tree = 0;
    var index = 0;
    for (var i=0; i<str.length; i++) {
        var cur = importChars[str[i]];
        // check for bad input
        if (cur == undefined) 
            return;
        // if the first bit is a 0, we know it's not a jump (using octal)
        if ((cur & 040) == 0) {
            // extract data
            var num = bitfit(tree, index, maxbits); // how many we can fit
            var sizes = [0, 1, 2, 3, 4] // an array of each mastery held in this char
                            .filter(function(a){ return a < num; })
                            .map(function(a){ return bitlen(tree, index+a); });
            for (var j=0; j<sizes.length; j++, index++) {
                // shift amount is the sum of all elements to the right of this one
                var shift = sizes.slice(j + 1).reduce(function(a, b){ return a + b; }, 0);
                // shift off the bits we don't want and AND it with a bit mask
                var value = (cur >> shift) & ((1 << sizes[j]) - 1);

                state[tree][index] = value;
                totalPoints += value;
            }
        } else {
            // jump
            var dist = cur & 037;
            index += dist;
        }

        // increment when we're done with a tree
        if (index >= data[tree].length) {
            tree++;
            index = 0;
            // break when we're done with all trees
            if (tree >= data.length)
                break;
        }
    }

    updateButtons();
    updateLabels();
    updateLink();
}

function updateMasteries() {
    importMasteries(document.location.hash.slice(1));
}

$(function(){
    // Calculator
    drawCalculator();

    // Panel
    $("#return").click(resetStates);
    for (var tree = 0; tree < 3; tree++) {
        $("#panel>#tree-summaries").append(
            $("<div>")
                .addClass("tree-summary")
                .addClass(treeNames[tree])
                .attr("data-idx", tree)
                .text(0)
                .css({
                    left: TREE_OFFSET * tree + 126,
                    cursor: "pointer",
                })
                .mouseover(function(){
                    customTooltip($("#tooltip").show(), "Doppelklicken um den Baum zurückzusetzen");
                })
                .mouseout(function(){
                    $("#tooltip").hide();
                })
                .dblclick(function(){
                    resetTree($(this).attr("data-idx"), true);
                    updateButtons();
                    updateLabels();
                    updateLink();
                })
        )
        .append(
            $("<div>")
        );
    }

		$(document).ready(function(){
$('#masteries_link, #masteries_embed').click(function(){$(this).select();});
$('#masteries_link').val($('base').attr('href')+'hash')
$('.masteries_icon_box').click(function(){
$('#masteries_link').val($('base').attr('href')+'hash'+MasteriesForumulateURI());
$('#masteries_embed').val('<iframe src="'+
$('base').attr('href')+'masteries/iframe/?points='+MasteriesForumulateURI()
+'" width="760" style="overflow: hidden;"></iframe>');
});
$('button.reset').click(function(){MasteriesResetPoints();
$('#masteries_link').val($('base').attr('href')+'masteries/'+MasteriesForumulateURI());
$('#masteries_embed').val('<iframe src="'+
$('base').attr('href')+'masteries/iframe/?points='+MasteriesForumulateURI()
+'" width="760" style="wverflow: hidden;"></iframe>');return false;});
$('#masteries_link').val($('base').attr('href')+'masteries/'+MasteriesForumulateURI());
$('#masteries_embed').val('<iframe src="'+
$('base').attr('href')+'masteries/iframe/?points='+MasteriesForumulateURI()
+'" width="760" style="overflow: hidden;"></iframe>');
});

    // Once set up, load if hash present
    if (document.location.hash != "")
        updateMasteries();

    // Listen for hash changes
    $(window).bind('hashchange', updateMasteries);
});