
/*

if ($.inArray("CAT NAME", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.ELEMENT').css('background', 'url(PATH/TO/FILE.PNG) top center no-repeat fixed')
 
    $('.skin-oasis').css('background-size', 'cover')
 
    });
}

*/

//The commented code above would set "FILE.PNG" as the "background" for ".ELEMENT" in CSS for all pages in the "CAT NAME" category. The same format is used below to dynamicly change the backgrounds for certain elements.
/*
Another format: 

if (wgNamespaceNumber == IDNUM) { 
 
    $(function () {
 
        "use strict";
 
     $('.ELEMENT').css('background', 'url("PATH/TO/FILE.PNG") POSITION / SIZE')
    });
}

is also used on this page. The commented code above would set "FILE.PNG" as the "background" for ".ELEMENT" in CSS for all pages in the "IDNUM" Namespace ID.

*/
/////////////////////////////////////////////////////////////////////////////////////////


//---NameSpaces ID Ref

        // 0 - Mainspace
        // 1 - Talk
        // 2 - User
        // 3 - User talk
        // 4 - Project
        // 5 - Project talk
        // 6 - Image/File
        // 7 - Image talk/ File talk
        // 8 - MediaWiki
        // 9 - MediaWiki talk
        // 10 - Template
        // 11 - Template talk
        // 12 - Help
        // 13 - Help talk
        // 14 - Category
        // 15 - Category talk
        // 110 - Forum
        // 111 - Forum talk
        // 828 - Module
        // 829 - Module talk
        // 1202 - Message Wall Greeting


if (wgNamespaceNumber == 2) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}
if (wgNamespaceNumber == 3) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}
if (wgNamespaceNumber == 1200) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}
if (wgNamespaceNumber == 1201) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}
if (wgNamespaceNumber == 1202) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}

// ------------ Forums / Community
if (wgNamespaceNumber == 110) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/8/81/Isaac_Shop_Header_Img.png/revision/latest?cb=20170614134957") 100% 15% / 429px 213px')
    });
}
if (wgNamespaceNumber == 111) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/8/81/Isaac_Shop_Header_Img.png/revision/latest?cb=20170614134957") 100% 15% / 429px 213px')
    });
}

if (wgNamespaceNumber == 500) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}
if (wgNamespaceNumber == 501) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}
if (wgNamespaceNumber == 502) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}
if (wgNamespaceNumber == 503) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}

// ------------ MediaWiki / Templates
if (wgNamespaceNumber == 4) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/0/00/DrawScreen_Header_Img.png/revision/latest?cb=20170614153935") 100% 9% / 429px 174px')
    });
}
if (wgNamespaceNumber == 5) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/0/00/DrawScreen_Header_Img.png/revision/latest?cb=20170614153935") 100% 9% / 429px 174px')
    });
}
if (wgNamespaceNumber == 8) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/0/00/DrawScreen_Header_Img.png/revision/latest?cb=20170614153935") 100% 9% / 429px 174px')
    });
}
if (wgNamespaceNumber == 9) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/0/00/DrawScreen_Header_Img.png/revision/latest?cb=20170614153935") 100% 9% / 429px 174px')
    });
}
if (wgNamespaceNumber == 10) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/0/00/DrawScreen_Header_Img.png/revision/latest?cb=20170614153935") 100% 9% / 429px 174px')
    });
}
if (wgNamespaceNumber == 11) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/0/00/DrawScreen_Header_Img.png/revision/latest?cb=20170614153935") 100% 9% / 429px 174px')
    });
}

//----------  Files / Categories Pages
if (wgNamespaceNumber == 6) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/1/10/Image_Video_Header_Img.png") 100% -78% / 437px 257px')
    });
}
if (wgNamespaceNumber == 7) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/1/10/Image_Video_Header_Img.png") 100% -78% / 437px 257px')
    });
}

if (wgNamespaceNumber == 14) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/d/de/Category_Header_Img.png/revision/latest?cb=20170614160952") 100% -172% / 437px 247px')
    });
}
if (wgNamespaceNumber == 15) { 
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/d/de/Category_Header_Img.png/revision/latest?cb=20170614160952") 100% -172% / 437px 247px')
    });
}

//-----------------------Categories--------------

// ------------ SHADOW
if ($.inArray("Shadow", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/5/58/CityGateHeaderImg.png") 100% 88% / 429px 132px')
    
 
    });
}


// ------------ CITY GATE

if ($.inArray("City Gate", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/5/58/CityGateHeaderImg.png") 100% 88% / 429px 132px')
    
 
    });
}
// ------------ BEACH GATE

if ($.inArray("Beach Gate", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/7/77/BeachGateHeaderImg.png") 100% 51% / 429px 193px')
    
 
    });
}

// ------------ FOREST GATE 
if ($.inArray("Forest Gate", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/6/64/ForestGateImg.png") 100% 55% / 429px 211px')
    
 
    });
}

// ------------ SNOW GATE
if ($.inArray("Snow Gate", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/e/ea/SnowGateHeaderImg.png") 100% 3% / 429px 161px')
    
 
    });
}
 


// ------------ WILFRE'S WASTELAND 

if ($.inArray("Wilfre's Wasteland", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/b/b4/WilfresWasteland_Header_Wallpaper_Small.png") 100% 58% / 437px 209px')

 
    });
}

 
// ------------ GALACTIC JUNGLE
if ($.inArray("Galactic Jungle", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/f/ff/Galactic_Jungle_Header_Wallpaper_Small.png") 100% 40% / 437px 255px')
    
 
    });
}
 
 
// ------------ LAVASTEAM
if ($.inArray("Lavasteam", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/d/dd/Lavasteam_Header_Wallpaper_Small.png") 100% 67% / 370px 203px')
    
 
    });
}
 

 
// ------------ WATERSONG
if ($.inArray("Watersong", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
    $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/0/04/Watersong_Header_Wallpaper_Small.png") 100% 52% / 437px 209px')
    
 
    });
}

// ------------ OC
if ($.inArray("OC", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/d/de/OC_Header_Img.png/revision/latest?cb=20170614150525") 100% 45% / 437px 221px')
    });
}

// ------------ Community
if ($.inArray("Community", mw.config.get('wgCategories')) > -1) {
 
    $(function () {
 
        "use strict";
 
     $('.wds-community-header').css('background', 'url("https://vignette.wikia.nocookie.net/drawntolife/images/2/2d/Door_Header_Img.png") 100% 56% / 429px 191px')
    });
}