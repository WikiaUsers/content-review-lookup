// Logos dans les profils des utilisateurs

var pages = [
    'Utilisateur:John_Trololo', 
    'Utilisateur:Capitaine_Jack_Sparrow', 
    'Utilisateur:Stern_Ritter', 
    'Utilisateur:Gol_D.Manuel', 
    'Utilisateur:SCaRFaCe-96', 
    'Utilisateur:MossLuffy',
];

var wordmarks = [
    'http://sournoishack.com/uploads/1162829562john.png',
    'https://images.wikia.nocookie.net/__cb20140401181054/bacasable/fr/images/4/43/Jack_Sparrow_2.png',
    'https://images.wikia.nocookie.net/__cb20140401165734/bacasable/fr/images/1/1a/Stern.png',
    'https://images.wikia.nocookie.net/__cb20140404121703/bacasable/fr/images/e/e0/Manu.png',
    'https://images.wikia.nocookie.net/__cb20140404124817/bacasable/fr/images/b/ba/Scarface.png',
    'https://images.wikia.nocookie.net/__cb20140406070257/bacasable/fr/images/3/3d/Mossluffyv2.png',
];

for (i = 0; i < pages.length; i++)
    if (mw.config.get('wgPageName') == pages[i])
        $('#WikiHeader .wordmark a img').attr('src', wordmarks[i]);