/* Slideshow */

if ($('.slide').length) {
    var i = 0,
        s = document.getElementsByClassName("slide");
    mySlider();

    document.getElementById("buttonPrev").onclick = function(){
        s[i-1].style.display= "none";
        i--;
        if (i < 1) {i = s.length}
        s[i-1].style.display = "block";
        $(window).trigger('scroll');
        document.getElementById("numero").innerHTML = i+"/"+s.length;
    };

    document.getElementById("buttonNext").onclick = function(){
        s[i-1].style.display= "none";
        i++;
        if (i > s.length) {i = 1}
        s[i-1].style.display = "block";
        $(window).trigger('scroll');
        document.getElementById("numero").innerHTML = i+"/"+s.length;
    };
}

function mySlider() {
    if(i !== 0) {s[i-1].style.display= "none"}
    i++;
    if (i > s.length) {i = 1;}
    s[i-1].style.display= "block";
    $(window).trigger('scroll');
    document.getElementById("numero").innerHTML = i+"/"+s.length;
    setTimeout(mySlider, 5000); // Cambia immagine ogni 5 secondi
}