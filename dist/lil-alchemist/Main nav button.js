var image2 = document.getElementById("myImage");

image2.onclick = function() {
    var image = document.getElementById('myImage');
    if (image.src.match("bulbon")) {
        image.innerHTML = "File:Card List.png";
    } else {
        image.innerHTML = "File:Card List3.png";
    }
};