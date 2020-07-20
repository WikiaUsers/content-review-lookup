if (mw.config.get("wgCanonicalNamespace") == "") {
    var BGbackground;
    var BGcategories = mw.config.get("wgCategories");
    var k = 0;
    console.log(BGcategories);
    for (var ct = 0; ct < BGcategories.length; ct++) {
        if (BGcategories[ct] == "Five Nights at Freddy's") {
            BGbackground = "https://i.imgur.com/cwB8xpX.png";
        } else if (BGcategories[ct] == "Five Nights at Freddy's 2") {
            BGbackground = "https://i.imgur.com/JyJFxQo.png";
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 3") {
            BGbackground = "https://i.imgur.com/agMazEM.png";
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's 4") {
            BGbackground = "https://i.imgur.com/t70FP1K.png";
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's World") {
            BGbackground = "https://i.imgur.com/tiQEsXc.jpg";
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's: Sister Location") {
            BGbackground = "https://i.imgur.com/DZVEYSQ.png";
            break;
        } else if (BGcategories[ct] == "Freddy Fazbear's Pizzeria Simulator") {
            BGbackground = "https://i.imgur.com/Z0TUaGe.png";
            break;
        } else if (BGcategories[ct] == "Ultimate Custom Night") {
            BGbackground = "https://i.imgur.com/2e3BTqg.png";
            break;
        } else if (BGcategories[ct] == "Five Nights at Freddy's VR: Help Wanted") {
            BGbackground = "https://i.imgur.com/zS6zaCa.jpg";
            break;
        } else if (BGcategories[ct] == ("Книги" || "Персонажи книг")) {
            BGbackground = "https://i.imgur.com/dg7fH8X.png";
            break;
        }
    }
    $("body.skin-oasis").css("background", '#000 url(' + BGbackground + ') fixed');
    $("body.skin-oasis").css("background-size", 'cover');
}