// JavaScript for placing the image template inside the summary box on [[Special:Upload]].
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Image\n|description=\n|source=\n|purpose=\n|resolution=\n|replaceability=\n|other information=\n}}';
	}
});

// Back to top button looks nice
window.BackToTopModern = true;

//================================
//          jQuery Slider
//================================

// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js created by "Tierrie"

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");

  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });

  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});

//Code for classes "rotate2-button" and "rotate-button"
var e_all = document.getElementById("expand-all");
var c_all = document.getElementById("collapse-all");
var obj = document.getElementsByClassName("button-1");
var count = document.getElementsByClassName("rotate2-button");

$(function() {
    $('#expand-all').html('<a class="wikia-button">Expand All</a>');
    $('#collapse-all').html('<a class="wikia-button">Collapse All</a>');
});

function rotate(k) {
    var image = document.getElementById("image-1_" + k);
    image.classList.remove("rotate2-button");
    image.classList.add("rotate-button");
}
function rotate2(k) {
    var image = document.getElementById("image-1_" + k);
    image.classList.remove("rotate-button");
    image.classList.add("rotate2-button");
}

function findAnchors() {
    var anchors = [];
    for (var k = 0; k < obj.length; k++) {
        var button = document.getElementById("button-1_" + k);
        var classes = '' + button.classList;
        var anchor = classes.replace(/mw-customtoggle-|\s|button-1/g, "");
        anchors[k] = anchor;
    }
    return anchors;
}

function jump(k) {
    var anchor = findAnchors();
    var top = document.getElementById("" + anchor[k]).scrollIntoView(true);
}

function func(h) {
    return function() {
        var image = document.getElementById("image-1_" + h);
        if (image.className == 'rotate-button') {
            rotate2(h);
            jump(h);
        } else {
            rotate(h);
        }
    };
}

function expand_all() {
    return function() {
        var anchor = findAnchors();
        for (var h = 0; h < obj.length; h++) {
            var image = document.getElementById("image-1_" + h);
            var collapsed = document.getElementById("mw-customcollapsible-" + anchor[h]);
            if (image.className == 'rotate2-button') {
                rotate(h);
                collapsed.classList.remove("mw-collapsed");
                collapsed.style.display = 'block';
            }
        }
    };
}

if (document.getElementById("customcollapsetable")) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].id += "button-1_" + i;
        count[i].id += "_" +  i;
        document.getElementById("button-1_" + i).onclick = func(i);
    }
    e_all.onclick = expand_all();
    c_all.onclick = collapse_all();
}