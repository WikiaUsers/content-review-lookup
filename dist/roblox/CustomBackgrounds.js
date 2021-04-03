const pages = {
    // Individual pages
    "Fast & Furious: Spy Racers": "https://vignette.wikia.nocookie.net/roblox/images/5/5c/FastAndFuriousBG.jpg/revision/latest?cb=20200129220701",
    "Egg Hunt 2020: Agents of E.G.G.": "https://vignette.wikia.nocookie.net/roblox/images/4/4f/Space.jpg/revision/latest",
    "Nimblz": "https://vignette.wikia.nocookie.net/roblox/images/8/8c/NimblzBG.png/revision/latest?cb=20200604053437",
    "Roblox Developers Conference 2020": "https://vignette.wikia.nocookie.net/roblox/images/c/cb/RDC2020Background.png/revision/latest",
    
    // Wonder Woman
    "Wonder Woman: The Themyscira Experience": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman Shorts": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Cloak": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Golden Axe": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Shield": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Tiara and Hair": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Hair": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Lasso of Truth": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Silver Armor": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Classic Armor": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Royal Tiara": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Bracelets of Victory": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Diana's Ponytail": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Sword of Hephaestus": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Themysciran Armor": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Armor": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Armored Skirt": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    "Wonder Woman's Sword & Shield": "https://vignette.wikia.nocookie.net/roblox/images/3/30/WonderwomanBG.png/revision/latest?cb=20200705034456",
    
    // The Island of Move
    "Build It, Play It: The Island of Move": "https://vignette.wikia.nocookie.net/roblox/images/9/95/BuildItPlayItBG.jpg/revision/latest",
    "Build It Backpack": "https://vignette.wikia.nocookie.net/roblox/images/9/95/BuildItPlayItBG.jpg/revision/latest",
    "Hustle Hat": "https://vignette.wikia.nocookie.net/roblox/images/9/95/BuildItPlayItBG.jpg/revision/latest",
    "Speedy Shades": "https://vignette.wikia.nocookie.net/roblox/images/9/95/BuildItPlayItBG.jpg/revision/latest",
    "Cardio Cans": "https://vignette.wikia.nocookie.net/roblox/images/9/95/BuildItPlayItBG.jpg/revision/latest",
    "Kinetic Staff": "https://vignette.wikia.nocookie.net/roblox/images/9/95/BuildItPlayItBG.jpg/revision/latest",
}

var pageName = mw.config.get("wgTitle");
if (pages[pageName]) {
    mw.util.addCSS('body.background-dynamic.skin-oasis::after, body.background-dynamic.skin-oasis::before {background-image: none;}');
    document.body.style.backgroundImage = "url(\""+pages[pageName]+"\")";
}