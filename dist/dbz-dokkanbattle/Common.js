/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution
 */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
clocksModuleLabels = ["PST", "UTC", "JST"];
clocksModuleTimezones = ["Pacific/Pitcairn", "Europe/London", "Asia/Tokyo"];
clocksModuleFormat = [
        {local : "en", format : "%H:%M:%S %a \n%m/%d/%Y"},
        {local : "en", format : "%H:%M:%S %a \n%m/%d/%Y"},
        {local : "en", format : "%H:%M:%S %a \n%m/%d/%Y"}
    ];
 
/* Position hover */
var tooltips_config = {
    offsetX: 5,
    offsetY: 5,
    waitForImages: true,
};
 
/*
 ** Function for the calculation of the summon rate page
 */
function computeRate() { //Obtain user inputs
    var bannerType = document.querySelector("#bannerType select").value,
        rateFeaturedSSR = Number(document.querySelector("#rateFeaturedSSR input").value),
        rateNormalSSR = Number(document.querySelector("#rateNormalSSR input").value),
        rateGSSR = 100 - rateFeaturedSSR,
        summonType = document.querySelector("#summonType select").value,
        isMulti = (summonType == "Multi" ? 10 : 1),
        numberFeaturedSSR = Number(document.querySelector("#numberFeaturedSSR input").value),
        numberNormalSSR = Number(document.querySelector("#numberNormalSSR input").value),
        numberFeaturedSSRWanted = Number(document.querySelector("#numberFeaturedSSRWanted input").value),
        numberNormalSSRWanted = Number(document.querySelector("#numberNormalSSRWanted input").value),
        numberSummon = Number(document.querySelector("#numberSummon input").value),
        resultFeatured = 0,
        resultNormal = 0;
 
    // Calculate rate
    if (bannerType == "GFSSR" && summonType == "Multi") {
        resultFeatured = (1 - Math.pow((100 - (rateFeaturedSSR / numberFeaturedSSR * numberFeaturedSSRWanted)) / 100, (9 * numberSummon)) * Math.pow((100 - (100 / numberFeaturedSSR * numberFeaturedSSRWanted)) / 100, numberSummon)) * 100;
    } else {
        resultFeatured = (1 - Math.pow((100 - (rateFeaturedSSR / numberFeaturedSSR * numberFeaturedSSRWanted)) / 100, (isMulti * numberSummon))) * 100;
    }
 
    if (bannerType == "GSSR" && summonType == "Multi") {
        resultNormal = (1 - Math.pow((100 - (rateNormalSSR / numberNormalSSR * numberNormalSSRWanted)) / 100, (9 * numberSummon)) * Math.pow((100 - (rateGSSR / numberNormalSSR * numberNormalSSRWanted)) / 100, numberSummon)) * 100;
    } else if (bannerType == "GFSSR" && summonType == "Multi") {
        resultNormal = (1 - Math.pow((100 - (rateNormalSSR / numberNormalSSR * numberNormalSSRWanted)) / 100, (9 * numberSummon))) * 100;
    } else {
        resultNormal = (1 - Math.pow((100 - (rateNormalSSR / numberNormalSSR * numberNormalSSRWanted)) / 100, (isMulti * numberSummon))) * 100;
    }
 
    //Display the result
    document.getElementById("resultFeatured").innerText = resultFeatured.toFixed(3) + "%";
    document.getElementById("resultNormal").innerText = resultNormal.toFixed(3) + "%";
}
 
function changeRate() {
    var x = document.getElementById("rateTypeSelect").value;
    if (x == "Normal") {
        document.querySelector("#rateFeaturedSSR input").value = 5;
        document.querySelector("#rateNormalSSR input").value = 5;
        return;
    }
 
    if (x == "Type") {
        document.querySelector("#rateFeaturedSSR input").value = 7;
        document.querySelector("#rateNormalSSR input").value = 3;
        return;
    }
 
    if (x == "Double") {
        document.querySelector("#rateFeaturedSSR input").value = 10;
        document.querySelector("#rateNormalSSR input").value = 10;
        return;
    }
}
 
/* Function for adding form to the summon rate calculation page */
var isAlreadyInitiate = false;
function initiateRatePage() {
    if (isAlreadyInitiate !== false)
        return false ;
 
    computeRateButton = document.getElementById('ComputeRate');
    if (computeRateButton) {
        isAlreadyInitiate = true;
 
        $('<select>' +
            '<option value="GSSR" selected="">Guaranteed SSR</option>' +
            '<option value="GFSSR">Guaranteed Featured SSR</option>' +
            '<option value="no">No Guaranteed SSR</option>' +
            '</select>').appendTo(document.getElementById("bannerType")); //modify for select
 
        $('<input type="number" value="7"/>').appendTo(document.getElementById("numberFeaturedSSR"));
        $('<input type="number" value="150"/>').appendTo(document.getElementById("numberNormalSSR"));
 
        $('<select id="rateTypeSelect" onchange="changeRate()">' +
            '<option value="Normal" selected="">Normal banner</option>' +
            '<option value="Type">Mono Type banner</option>' +
            '<option value="Double">Double-rate banner</option>' +
            '</select>').appendTo(document.getElementById("rateType")); //modify for select
 
        $('<input type="number" value="5"/>').appendTo(document.getElementById("rateFeaturedSSR"));
        $('<input type="number" value="5"/>').appendTo(document.getElementById("rateNormalSSR"));
 
        $('<select>' +
            '<option value="Mono">Single Summon</option>' +
            '<option value="Multi" selected="">Multi-Summon</option>' +
            '</select>').appendTo(document.getElementById("summonType")); //modify for select
 
        $('<input type="number" value="1"/>').appendTo(document.getElementById("numberSummon"));
        $('<input type="number" value="0"/>').appendTo(document.getElementById("numberFeaturedSSRWanted"));
        $('<input type="number" value="0"/>').appendTo(document.getElementById("numberNormalSSRWanted"));
        computeRateButton.addEventListener("click", function() {
            computeRate();
            return false;
        });
    }
}
 
$(document).ready(function () {
    tabberTab = document.getElementsByClassName('tabbertab');
    tabberNav = document.querySelectorAll('ul.tabbernav li');
 
    var changeTab = function( event ) {
        var selectedTab = null;
        var otherTabs = [];
 
        for (i = 0; i < tabberNav.length; ++i) {
            if (tabberNav[i].getElementsByTagName("a")[0].title == this.title) {
                selectedTab = tabberNav[i];
                break ;
            }
        }
        if (selectedTab.classList.contains("tabberactive")) {
            $(selectedTab).toggleClass("tabberactive");
        }
 
        otherTabs = $(selectedTab).siblings("li");
        for (i = 0; i <otherTabs.length; ++i) {
            if (otherTabs[i].classList.contains("tabberactive")) {
                $(otherTabs[i]).toggleClass("tabberactive");
            }
        }
        $(selectedTab).toggleClass("tabberactive");
        window.scrollBy(0, -1);
        window.scrollBy(0, 1);
 
        for (i = 0; i < tabberTab.length; ++i) {
            if (tabberTab[i].title == this.title) {
                selectedTab = tabberTab[i];
            }
        }
 
        otherTabs = $(selectedTab).siblings("div");
        for (i = 0; i <otherTabs.length; ++i) {
            $(otherTabs[i]).hide();
        }
        $(selectedTab).show();
    };
 
    imagesTabber = document.getElementsByClassName('imageTabber');
    for (j = 0; j < imagesTabber.length; ++j) {
        var images = imagesTabber[j].getElementsByTagName("a");
 
        for (i = 0; i < images.length; ++i) {
            images[i].addEventListener("click", changeTab);
        }
    }
});
function setSizeApng() {
    var apngs = document.getElementsByClassName('apng');
 
    for (var i = 0, len1 = apngs.length; i < len1; ++i) {
        for (var j = 0, len2 = apngs[i].classList.length; j < len2; ++j) {
            if (/size.*px/.test(apngs[i].classList[j])) {
                var size = apngs[i].classList[j].match(/\d+/g);
                var imgs = apngs[i].getElementsByTagName("img");
 
                $(apngs[i]).width(size);
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

if (window.mediaWiki.config.get('skin') === 'oasis' && window.mediaWiki.config.get('wgAction') === 'edit') {
    $(window).on('EditPageAfterRenderPreview', function(ev, popup) {
        
        function setSizeApng() {
            var apngs = document.getElementsByClassName('apng');
 
            for (var i = 0, len1 = apngs.length; i < len1; ++i) {
                for (var j = 0, len2 = apngs[i].classList.length; j < len2; ++j) {
                    if (/size.*px/.test(apngs[i].classList[j])) {
                        var size = apngs[i].classList[j].match(/\d+/g);
                        var imgs = apngs[i].getElementsByTagName("img");
 
                        $(apngs[i]).width(size);
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
            }
        });
 
        $(function(){
            setSizeApng();
        });
    });
}

//<tabber> extension req
//v2.0, 2017, user:fngplg.
//set active tab: https://dbz-dokkanbattle.fandom.com/page#activeTab
(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    //convert wiki-utf 2 ansi
    nstarget = nstarget.replace(/\./g, '%');
    nstarget = decodeURIComponent(nstarget).replace(/_/g, ' ');
    //console.log('trgt:'+nstarget);
    $(function(){
        setTimeout(function() {
            var $nt2a = $('.tabberlive>.tabbernav>Li>a[title="' + nstarget + '"]');
            $nt2a.click();
        }, 100);//settimeout
    });//doc.rdy    
})(jQuery);


/* Auto old thread lock configuration */
window.LockForums = {
    disableOn: ["355557", "583706", "594999"]
};

/*Copy template button*/
window.copyButtonPosition = "div.CopyButton";
window.syntaxHighLightArea = "div.SectionCopy";