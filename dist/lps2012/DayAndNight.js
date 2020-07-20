function init(){
    var currentHour = new Date().getHours();
    var bkg = "";
    if ( (currentHour >= 21) || (currentHour < 6) ) {
        bkg = 'https://vignette.wikia.nocookie.net/lps2012/images/7/7e/PF_Background.png/revision/latest?cb=20150329182257';
        $(".wds-community-header").toggleClass("bannerNight");
        $("#backgroundLayer1").toggleClass("divBackgroundNight");
        $(".nav-item").toggleClass("HeaderLinksNight");
    } else {
        bkg = 'https://vignette.wikia.nocookie.net/lps2012/images/8/80/Background_day.png/revision/latest?cb=20151122195408';
        $(".wds-community-header").toggleClass("bannerDay");
        $("#backgroundLayer1").toggleClass("divBackgroundDay");
    }
    var imgObj = document.createElement('img');
    imgObj.style.top = '50px'; 
    imgObj.style.left = '20px';
    imgObj.src = bkg;
    var obj = document.createElement('div');
    obj.className = "skiplinkcontainer";
    obj.innerHTML = "";
    document.getElementsByTagName('body')[0].appendChild(obj);
    obj.appendChild(imgObj);
    obj.style.left = 0 + '%';
    obj.style.backgroundSize = 'contain';
    imgObj.style.width = $(window).width() + 'px';
    obj.style.zIndex = -1;
}