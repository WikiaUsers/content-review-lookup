///Skrypt na nazwę użytkownika

if (wgUserName != null/* && span.insertusername != undefined*/)
{
$("span.insertusername").html(wgUserName);
};

/*$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});*/

//Skrypt na Prima Aprilis.
 /*
function podmiana (nowaNazwa){
$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(nowaNazwa);
}
 
$(function(){
var pocz=new Date("1 April 2014");
var koniec=new Date("2 April 2014");
var today = new Date();
if (pocz<today&&today<koniec)
  {
var tablicaPodmianA = {
"Applejack": "Fantazja",
"Apple Bloom": "Alwa",
"Akademia Wonderbolts": "Akademia Cudnych Gromów",
"Angel": "Aniołek",
"Amethyst Star": "Gwiazdeczka",
"Alula": "Lotka",
"Apple Bumpkin": "Jabłonka",
"Apple Fritter": "Grzanka",
"Apple Cobbler": "Idea",
"Apple Rose": "Odra",
"Apple Cider": "Słomka"
};
 
var tablicaPodmianB = {
"Bobasy Cake": "Bobasy Ciasteckich",
"Bon Bon": "Słodyjka",
"Berry Punch": "Jagódka",
"Big Macintosh": "Delikates",
"Babs Seed": "Alka",
"Berry Pinch": "Drobinka",
"Braeburn": "Jabłecznik",
"Bulk Biceps": "Śnieg",
"Babcia Smith": "Babcia Szmit"
};
 
var tablicaPodmianC = {
"Canterlot": "Cwałowice",
"Cheerilee": "Wesołka",
"Caramel": "Karmel",
"Cherry Berry": "Wisienka",
"Ciocia i Wujek Orange": "Ciocia i Wujek Pomarańczko",
"Cloudsdale": "Chmurowo",
"Ciocia Applesauce": "Ciocia Konfitura",
"Cloud Kicker": "Wydmuszka",
"Cranky Doodle Osioł": "Kamil Dionizy Osioł",
"Cotton Cloudy": "Śnieżka",
"Caramel Apple": "Kandyzja",
"Comet Tail": "Meteor",
"Cherry Jubilee": "Dryla"
};
 
var tablicaPodmianD = {
"Discord": "‎Zamęt",
"Daisy": "Stokrotka",
"Derpy": "Gapka",
"Doctor Hooves": "Doktor Ktopyto",
"Diamond Tiara": "Tiara",
"Dumb-Bell, Hoops i Score": "Hantel, Wsad i Punkt",
"Dinky Doo": "Malusia",
"DJ Pon-3": "DJ Qcyk",
"Diamond Mint": "Polerka"
};
 
var tablicaPodmianE = {
"Equestria": "Kucostan"
};
 
var tablicaPodmianF = {
"Fluttershy": "Trzepotka",
"Flitter i Cloudchaser": "Wichurka i Chmurka",
"Fancypants": "Frak",
"Fleur Dis Lee": "Lilijka",
"Featherweight": "Wietrzyk",
"Filthy Rich": "Szmal",
"Florina": "Miętka",
"Flash Sentry": "Blask"
};
 
var tablicaPodmianG = {
"Golden Harvest": "Marchewka",
"Gummy": "Dziąseł",
"Garble": "Przekręt",
"Gilda": "Złotodzioba",
"Goldengrape": "Aromat",
"Golden Delicious": "Smak",
"Goldie Delicious": "Reneta",
};
 
var tablicaPodmianH = {
"Huraganowa Fluttershy": "Huraganowa Trzepotka",
"Hoity Toity": "Bal",
"Hayseed Rzepa": "Hejsid Rzepa",
};
 
var tablicaPodmianI = {
"Igneous Rock i Cloudy Quartz": "Wulkan i Żyła",
"Iron Will": "Tytan",
};
 
var tablicaPodmianJ = {
"Jet Set i Upper Crust": "Szyk i Klasa",
"Joe": "Jaś",
};
 
var tablicaPodmianK = {
"Księżniczka Cadance": "‎Księżniczka Kadencja",
"Książę Blueblood": "Książę Błękitnożyły",
"Księżniczka Platinium": "Księżniczka Platyna",
"Kanclerz Puddinghead": "Kanclerz Kremoluba",
};
 
var tablicaPodmianL = {
"Lightning Dust": "Błyskawica",
"Lily Valley": "Lilia",
"Lyra Heartstrings": "Lira",
"Lemon Hearts": "Cytrynka",
"Lyrica Lilac": "Liryka",
};
 
var tablicaPodmianM = {
"Minuette": "Minutka",
"Magnum i Pearl": "Góra i Perła",
"Meadow Song": "Naciąg",
"Merry May": "Gaja",
"Matilda": "Matylda",
"Maud Pie": "Mada",
};
 
var tablicaPodmianN = {
"Noi": "Noja",
"Noteworthy": "Takt",
"Night Light i Twilight Velvet": "Mrok i Świeczka",
"Nurse Redheart": "Siostra Pasja",
};
 
var tablicaPodmianO = {
"Octavia Melody": "Oktawia",
};
 
var tablicaPodmianP = {
"Pinkie Pie": "Pysia",
"Ponyville": "Kucykowo",
"Pound Cake i Pumpkin Cake": "Keks i Dynia",
"Photo Finish": "Aparatka",
"Pan i Pani Cake": "Państwo Ciasteccy",
"Parasprite": "Paramuszka",
"Parasol": "Parasolka",
"Panna Harshwhinny": "Panna Surżecka",
"Piña Colada": "Palemka",
"Pipsqueak": "Pisk",
"Panna Peachbottom": "Śliwka",
"Parasol": "Parasolka",
"Peachy Pie": "Brzoskwinka",
};
 
var tablicaPodmianR = {
"Rarity": "Klejnotka",
"Rainbow Dash": "Tęczynka",
"Rose": "Róża",
"Rodzina Apple": "Rodzina Jabłczyńskich",
"Rainbowshine": "Zorza",
"Rumble": "Huk",
"Rodzina Cake": "Rodzina Ciasteckich",
"Royal Ribbon": "Wstążka",
};
 
var tablicaPodmianS = {
"Scootaloo": "Hulajka",
"Sweetie Belle": "Melodyjka",
"Spike": "Zębuś",
"Ślub w Canterlocie": "‎Ślub w Cwałowicach",
"Spike do usług": "‎Zębuś do usług",
"Shining Armor": "Lśniący Pancerz",
"Silver Spoon": "Łyżeczka",
"Spitfire": "Pożoga",
"Soarin": "Szybowiec",
"Star Swirl Brodaty": "Gwiazdobrody",
"Sassaflash": "Błyskotka",
"Snails": "Śluz",
"Snips": "Ciach",
"Sapphire Shores": "Muszelka",
"Sekrety Ponyville": "Sekrety Kucykowa",
"Sunshower Raindrops": "Kropelka",
"Sprinkle Medley": "Mgiełka",
"Shoeshine": "Podkówka",
"Sea Swirl": "Foczka",
"Surprise": "Niespodzianka",
"Shadowbolts": "Mroczne Gromy",
"Sunny Daze": "Słoncowitka",
"Stinking Rich": "Hajs",
};
 
var tablicaPodmianT = {
"Twilight Sparkle": "Iskierka",
"Transkrypty/Ślub w Canterlocie": "‎Transkrypty/Ślub w Cwałowicach",
"Transkrypty/Zjazd rodziny Apple": "‎Transkrypty/Zjazd rodziny Jabłczyńskich",
"Transkrypty/Wszędzie Pinkie Pie": "Transkrypty/‎Wszędzie Pysia",
"Transkrypty/Spike do usług": "Transkrypty/‎Zębuś do usług",
"Transkrypty/Akademia Wonderbolts": "Transkrypty/Akademia Cudnych Gromów",
"Transkrypty/Bobasy Cake": "Transkrypty/Bobasy Ciasteckich",
"Transkrypty/Huraganowa Fluttershy": "Transkrypty/Huraganowa Trzepotka",
"Transkrypty/Sekrety Ponyville": "Transkrypty/Sekrety Kucykowa",
"Transkrypty/Tylko spokojnie Fluttershy": "Transkrypty/Tylko spokojnie Trzepotko",
"Tylko spokojnie Fluttershy": "Tylko spokojnie Trzepotko",
"Trixie": "Iluzja",
"Twinkleshine": "Migotka",
"Twist": "Wanilia",
"Tank": "Czołg",
"Thunderlane": "Grom",
"Tornado Bolt": "Bryza",
"Tootsie Flute": "Nutka",
};
 
var tablicaPodmianW = {
"Wszędzie Pinkie Pie": "‎Wszędzie Pysia",
"Wonderbolts": "Cudne Gromy",
"Winona": "Wiktoria",
"Wildfire": "Werwa",
"Written Script": "Zwój",
};
 
var tablicaPodmianZ = {
"Zjazd rodziny Apple": "‎Zjazd rodziny Jabłczyńskich",
};
 
var tablicaPodmian = {
"A": tablicaPodmianA,
"B": tablicaPodmianB,
"C": tablicaPodmianC,
"D": tablicaPodmianD,
"E": tablicaPodmianE,
"F": tablicaPodmianF,
"G": tablicaPodmianG,
"H": tablicaPodmianH,
"I": tablicaPodmianI,
"J": tablicaPodmianJ,
"K": tablicaPodmianK,
"L": tablicaPodmianL,
"M": tablicaPodmianM,
"N": tablicaPodmianN,
"O": tablicaPodmianO,
"P": tablicaPodmianP,
"R": tablicaPodmianR,
"S": tablicaPodmianS,
"Ś": tablicaPodmianS,
"T": tablicaPodmianT,
"W": tablicaPodmianW,
"Z": tablicaPodmianZ
};
 
var tablicaPodmian = tablicaPodmian[wgTitle[0]];
 
 if (wgTitle.match("/Galeria")=="/Galeria"&&tablicaPodmian[wgTitle.replace("/Galeria", "")]!=undefined)
 { 
   podmiana(tablicaPodmian[wgTitle.replace("/Galeria", "")] + "/Galeria");
}
else{
podmiana(tablicaPodmian[wgTitle]);
};
}
});*/