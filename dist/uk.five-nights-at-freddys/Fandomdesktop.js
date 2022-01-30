/*
Автор = https://five-nights-at-freddys.fandom.com/ru/wiki/MediaWiki:Fandomdesktop.js
*/
/* ========== BG.js ========== */
function BG(file) {
    if (file) {
        return encodeURI("/ru/wiki/Служебная:FilePath/" + file);
    } else {
        return null;
    }
}

if (mw.config.get("wgCanonicalNamespace") == "") {
    var BGbackground;
    var BGcategories = mw.config.get("wgCategories");
        for (var ct = 0; ct < BGcategories.length; ct++) {
        if (BGcategories[ct] == "Five Nights at Freddy's") {
            BGbackgroundD = BG('FNaF 1 BG.png');
            BGbackgroundL = BG('FNaF 1 BG L.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 2") {
            BGbackgroundD = BG('FNaF 2 BG.png');
            BGbackgroundL = BG('FNaF 2 BG L.jpg');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 3") {
            BGbackgroundD = BG('FNaF 3 BG.png');
            BGbackgroundL = BG('FNaF 3 BG L.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 4") {
            BGbackgroundD = BG('FNaF 4 BG.png');
            BGbackgroundL = BG('FNaF 4 BG L.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's World") {
            BGbackgroundD = BG('FNaF W BG.png');
            BGbackgroundL = BG('FNaF World BG L.jpeg');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's: Sister Location") {
            BGbackgroundD = BG('FNaF SL BG.png');
            BGbackgroundL = BG('FNaF SL BG L.png');
            break;
        } else if (BGcategories[ct] == "Freddy Fazbear's Pizzeria Simulator") {
            BGbackgroundD = BG('FFPS BG.png');
            BGbackgroundL = BG('FFPS BG L.jpeg');
            break;
        } else if (BGcategories[ct] == "Ultimate Custom Night") {
            BGbackgroundD = BG('UCN BG.png');
            BGbackgroundL = BG('UCN BG L.jpeg');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's: Help Wanted") {
            BGbackgroundD = BG('FNaF HW BG.jpg');
            BGbackgroundL = BG('FNaF HW BG L.jpeg');
            break;
        } else if (BGcategories[ct] == "Freddy in Space 2") {
            BGbackgroundD = BG('FiS 2 BG.png');
            BGbackgroundL = BG('FiS 2 BG L.jpeg');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's AR: Special Delivery") {
            BGbackgroundD = BG('FNaF AR BG.jpg');
            BGbackgroundL = BG('FNaF AR BG L.jpeg');
            break;    
        } else if (BGcategories[ct] == "Security Breach: Fury's Rage") {
            BGbackgroundD = BG('SB FR BG.png');
            BGbackgroundL = BG('SB FR BG L.png');
            break;    
       } else if ((BGcategories[ct] == "Книги") || (BGcategories[ct] == "Персонажи книг")) {
            BGbackgroundD = BG('FNaF Books BG.png');
            BGbackgroundL = BG('B BG L.jpeg');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's: Security Breach") {
            BGbackgroundD = BG('FNaF SB BG.png');
            BGbackgroundL = BG('FNaF SB BG L.jpeg');
            break;    
        }    
}            
         
if ($('body').hasClass('theme-fandomdesktop-light')) {
        $("body.skin-fandomdesktop").css("background", '#000 url(' + BGbackgroundL + ')');
    }
else if ($('body').hasClass('theme-fandomdesktop-dark')) {
        $("body.skin-fandomdesktop").css("background", '#000 url(' + BGbackgroundD + ')');
    }
}

if (BGbackgroundL) {
        $("body.skin-fandomdesktop").css("background-size", 'cover');
        $("body.skin-fandomdesktop").css("background-attachment", 'fixed');
        $(".fandom-community-header__background").css("display", 'none');
    }
if (BGbackgroundD) {
        $("body.skin-fandomdesktop").css("background-size", 'cover');
        $("body.skin-fandomdesktop").css("background-attachment", 'fixed');
        $(".fandom-community-header__background").css("display", 'none');
    }