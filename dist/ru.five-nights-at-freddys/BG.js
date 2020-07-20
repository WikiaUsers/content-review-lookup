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
            BGbackground = BG('FNaF 1 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 2") {
            BGbackground = BG('FNaF 2 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 3") {
            BGbackground = BG('FNaF 3 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 4") {
            BGbackground = BG('FNaF 4 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's World") {
            BGbackground = BG('FNaF W BG.jpg');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's: Sister Location") {
            BGbackground = BG('FNaF SL BG.png');
            break;
        } else if (BGcategories[ct] == "Freddy Fazbear's Pizzeria Simulator") {
            BGbackground = BG('FFPS BG.png');
            break;
        } else if (BGcategories[ct] == "Ultimate Custom Night") {
            BGbackground = BG('UCN BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's VR: Help Wanted") {
            BGbackground = BG('FNaF HW BG.jpg');
            break;
        } else if (BGcategories[ct] == "Freddy in Space 2") {
            BGbackground = BG('FiS 2 BG.png');
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's AR: Special Delivery") {
            BGbackground = BG('FNaF AR BG.jpg');
            break;
        } else if (BGcategories[ct] == ("Книги" || "Персонажи книг")) {
            BGbackground = BG('FNaF Books BG.png');
            break;
        }
    }

    if (BGbackground) {
        $("body.skin-oasis").css("background", '#000 url(' + BGbackground + ') fixed');
        $("body.skin-oasis").css("background-size", 'cover');
    }
}