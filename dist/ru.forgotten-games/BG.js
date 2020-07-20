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
        if (BGcategories[ct] == "The Desolate Hope") {
            BGbackground = BG('TDH.png');
        } else if (BGcategories[ct] == "Chipper & Sons Lumber Co.") {
            BGbackground = BG('TimePlace.jpg');
            break;
        } else if (BGcategories[ct] == "The Pilgrim's Progress: The Video Game") {
            BGbackground = BG('Boloto.png');
            break;
        } else if (BGcategories[ct] == "The Legacy of Flan") {
            BGbackground = BG('Lof4bat.png');
            break;
        } else if (BGcategories[ct] == "There is no Pause Button!") {
            BGbackground = BG('Screen-6.jpg');
            break;
        } else if (BGcategories[ct] == "Sit 'N Survive") {
            BGbackground = BG('SnS.jpg');
            break;
        } else if (BGcategories[ct] == "Bogart") {
            BGbackground = BG('Bogart.jpg');
            break;
        } else if (BGcategories[ct] == "The Powermon Adventure") {
            BGbackground = BG('TPA.png');
            break;
        }
    }
 
    if (BGbackground) {
        $("body.skin-oasis").css("background", '#000 url(' + BGbackground + ') fixed');
        $("body.skin-oasis").css("background-size", 'cover');
    }
}