function setSizeApng() {
    var apngs = document.getElementsByClassName('apng');
 
    for (var i = 0, len1 = apngs.length; i < len1; ++i) {
        for (var j = 0, len2 = apngs[i].classList.length; j < len2; ++j) {
            if (/size.*px/.test(apngs[i].classList[j])) {
                var size = apngs[i].classList[j].match(/\d+/g);
                var imgs = apngs[i].getElementsByTagName("img");
 
                apngs[i].setAttribute('style', "width :"+ size + "px");
                for (var k = 0, len3 = imgs.length; k < len3; ++k) {
                    imgs[k].setAttribute('style', "max-width :"+ size + "px");
                }
                break;
            }
        }
    }
}
 
$("#mw-content-text").on('DOMNodeInserted', function(e) {
    var classChild = e.target.classList;
 
    if (classChild && classChild.contains("tabBody")) {
        setSizeApng();
    initiateRatePage();
    }
});

$(function(){
    setSizeApng();
    initiateRatePage();
});