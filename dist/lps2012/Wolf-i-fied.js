function moveIt(obj, direction, rect) {
    var newTop = obj.style.top;
    var newLeft = '50%';
    if (direction == 1) {
        newLeft = rect.left - parseInt(obj.style.height) * 0.9;
    } else {
        newLeft = rect.right - parseInt(obj.style.height) * 0.3;
    }
    var newDuration = 5000;

    $(obj).animate({
        top: newTop,
        left: newLeft,
    }, newDuration, function () {
        moveItBack(obj, direction, rect);
    });
}

function moveItBack(obj, direction, rect) {
    var newTop = obj.style.top;
    var newLeft = '0';
    if (direction == 1) {
        newLeft = rect.left;
    } else {
        newLeft = rect.right - parseInt(obj.style.height);
    }
    var newDuration = 400;

    $(obj).animate({
        top: newTop,
        left: newLeft,
    }, newDuration, function () {
        obj.style.display = 'none';
        setTimeout(function () {
            setPosition(obj);
        }, Math.floor((Math.random() * 10001) + 5000));
    });
}

function setPosition(obj) {
    var Russell = 'https://vignette.wikia.nocookie.net/lps2012/images/4/49/HowlRussell.png/revision/latest?cb=20151031123426';
    var Penny = 'https://vignette.wikia.nocookie.net/lps2012/images/4/44/HowlPenny_Ling.png/revision/latest?cb=20151031123349';
    var Pepper = 'https://vignette.wikia.nocookie.net/lps2012/images/4/4d/HowlPepper.png/revision/latest?cb=20151031123509';
    var startX = '0';
    var deg = 0;
    var direction = 0;
    obj.style.display = 'block';
    var character = Math.floor((Math.random() * 3) + 1);
    var url = "";
    switch (character) {
        case 1:
            obj.style.backgroundImage = "url('" + Russell + "')";
            break;
        case 2:
            obj.style.backgroundImage = "url('" + Penny + "')";
            break;
        case 3:
            obj.style.backgroundImage = "url('" + Pepper + "')";
            break;
    }
    var rect;
    rect = document.getElementById("WikiaPageBackground").getBoundingClientRect();
    if (Math.floor((Math.random() * 2) + 1) == 1) {
        startX = rect.left;
        deg = 270;
        direction = 1;
    } else {
        startX = rect.right - $(window).width() / 8.03;
        deg = 90;
        direction = 2;
    }
    obj.style.webkitTransform = 'rotate(' + deg + 'deg)';
    obj.style.mozTransform = 'rotate(' + deg + 'deg)';
    obj.style.msTransform = 'rotate(' + deg + 'deg)';
    obj.style.oTransform = 'rotate(' + deg + 'deg)';
    obj.style.transform = 'rotate(' + deg + 'deg)';
    var startY = Math.floor((Math.random() * 96) + 5) + '%';
    obj.style.backgroundSize = 'contain';
    obj.style.backgroundRepeat = 'no-repeat';
    obj.style.left = startX;
    obj.style.top = startY;
    obj.style.width = $(window).width() / 8.03 + 'px';
    obj.style.height = ($(window).width() / 8.03) / (250 / 203) + 'px';
    moveIt(obj, direction, rect);
}

/*main function*/
function init() {
    $(".wds-community-header").toggleClass("bannerHowl-o-ween");
    $("#backgroundLayer1").toggleClass("divBackgroundHowl-o-ween");
    $(".nav-item").toggleClass("HeaderLinksNight");
    var obj = document.createElement('div');
    obj.className = "skiplinkcontainer";
    obj.innerHTML = "";
    document.getElementsByTagName('body')[0].appendChild(obj);
    obj.style.left = 50 + '%';
    var deg = 90;
    obj.style.display = 'none';
    setPosition(obj);
}