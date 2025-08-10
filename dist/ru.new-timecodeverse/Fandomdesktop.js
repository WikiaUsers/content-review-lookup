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
        if (BGcategories[ct] == "Мироздание") {
            BGbackgroundD = BG('Ruler A.png');
            BGbackgroundL = BG('Ruler B.png');
            break;
        } else if (BGcategories[ct] == "Персонажи Timecodetale") {
            BGbackgroundD = BG('TCT A.png');
            BGbackgroundL = BG('TCT B.jpg');
            break;
        } else if (BGcategories[ct] == "Хранители времени") {
            BGbackgroundD = BG('TK A.png');
            BGbackgroundL = BG('TK B.jpg');
            break;
        } else if (BGcategories[ct] == "Столпы") {
            BGbackgroundD = BG('H A.png');
            BGbackgroundL = BG('H B.png');
            break;
        } else if (BGcategories[ct] == "Кодовые") {
            BGbackgroundD = BG('Code A.png');
            BGbackgroundL = BG('Code B.png');
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