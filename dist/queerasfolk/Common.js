function setHeight(){
    var infobox = $(".infobox-interior").height();
    var image = $(".info-pic").height();
    $(".info-appearances").height( infobox - image + 72);
}

$(window,".info-appearances").resize(setHeight);
setHeight();