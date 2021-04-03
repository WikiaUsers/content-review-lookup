var obj = document.getElementsByClassName("button-c");
var count1 = document.getElementsByClassName("rotate-c");
var count2 = document.getElementsByClassName("rotate2-c");

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

function func(h) {
    return function() {
        var image = document.getElementById("image-c_" + h);
        if (image.className == 'rotate-c') {
            rotate2(h);
        } else {
            rotate(h);
        }
    };
}
 
if (document.getElementById("72656C6964table")) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].id += "button-c_" + i;
        if (count1.length > 0) {
        	count1[i].id += "_" +  i;
        } else {
        	count2[i].id += "_" +  i;
        }
        if (document.getElementById("button-c_" + i)) {
        	document.getElementById("button-c_" + i).onclick = func(i);
        }
    }
}