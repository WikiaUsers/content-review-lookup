var e_all = document.getElementById("expand-all");
var c_all = document.getElementById("collapse-all");
var obj = document.getElementsByClassName("button-c");
var count = document.getElementsByClassName("rotate2-c");
 
$(function() {
    $('#expand-all').html('<a class="wikia-button">Expand All</a>');
    $('#collapse-all').html('<a class="wikia-button" href="#expand-all">Collapse All</a>');
});
 
function rotate(k) {
    var image = document.getElementById("image-c_" + k);
    image.classList.remove("rotate2-c");
    image.classList.add("rotate-c");
}
function rotate2(k) {
    var image = document.getElementById("image-c_" + k);
    image.classList.remove("rotate-c");
    image.classList.add("rotate2-c");
}
 
function findAnchors() {
    var anchors = [];
    for (var k = 0; k < obj.length; k++) {
        var button = document.getElementById("button-c_" + k);
        var classes = '' + button.classList;
        var anchor = classes.replace(/mw-customtoggle-|\s|button-c/g, "");
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
        var image = document.getElementById("image-c_" + h);
        if (image.className == 'rotate-c') {
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
            var image = document.getElementById("image-c_" + h);
            var collapsed = document.getElementById("mw-customcollapsible-" + anchor[h]);
            if (image.className == 'rotate2-c') {
                rotate(h);
                collapsed.classList.remove("mw-collapsed");
                collapsed.style.display = 'block';
            }
        }
    };
}
 
function collapse_all() {
    return function() {
        var anchor = findAnchors();
        for (var h = 0; h < obj.length; h++) {
            var image = document.getElementById("image-c_" + h);
            var collapsed = document.getElementById("mw-customcollapsible-" + anchor[h]);
            if (image.className == 'rotate-c') {
                rotate2(h);
                collapsed.classList.add("mw-collapsed");
                collapsed.style.display = 'none';
            }
        }
    };
}
 
if (document.getElementById("72656C6964table")) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].id += "button-c_" + i;
        count[i].id += "_" +  i;
        document.getElementById("button-c_" + i).onclick = func(i);
    }
    e_all.onclick = expand_all();
    c_all.onclick = collapse_all();
}