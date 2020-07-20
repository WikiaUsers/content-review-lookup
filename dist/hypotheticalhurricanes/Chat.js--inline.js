/**
 * 
 * Create custom chat commands in chat
 * 
 * @authors: Pepeal and Orbacal from w:c:pvzcc
 * @scope: Create custom chat commands 
 * 
 **/

var CustomAlerts = {};
var ownusername = wgUserName;
var perf = $("#pseudo-inline-alert").attr("data-user");
 
// command list
CustomAlerts.cmd = {
    // "User has joined/left the chat" commands
    nkech: " Hurricane " + ("CycloneNkechinyer").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CycloneNkechinyer") + " has formed!",
    nkechd: " Hurricane " + ("CycloneNkechinyer").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CycloneNkechinyer") + " has dissipated!",
    nkech2: " Hurricane " + ("Nkechinyer").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Nkechinyer") + " has formed!",
    nkech2d: " Hurricane " + ("Nkechinyer").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Nkechinyer") + " has dissipated!",
    douglas: " Hurricane " + ("Hurricane news").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hurricane_news") + " has formed!",
    douglasd: " Hurricane " + ("Hurricane news").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hurricane_news") + " has dissipated!",
    emma: " Hurricane " + ("Emmaelise401").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Emmaelise401") + " has formed!",
    emmad: " Hurricane " + ("Emmaelise401").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Emmaelise401") + " has dissipated!",
    mabel: " Hurricane " + ("Mabel").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Mabel") + " has formed!",
    mabeld: " Hurricane " + ("Mabel").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Mabel") + " has dissipated",
    bob: " Hurricane " + ("Bobnekaro").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Bobnekaro") + " has formed!",
    bobd: " Hurricane " + ("Bobnekaro").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Bobnekaro") + " has dissipated!",
    sass: " Hurricane " + ("Sassmaster15").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Sassmaster15") + " has formed!",
    sassd: " Hurricane " + ("Sassmaster15").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Sassmaster15") + " has dissipated!",
    cardozo: " Hurricane " + ("SpcardozoComesBack").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SpcardozoComesBack") + " has formed!",
    cardozod: " Hurricane " + ("SpcardozoComesBack").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SpcardozoComesBack") + " has dissipated!",
    layten: " Hurricane " + ("Hurricane Layten").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hurricane Layten") + " has formed!",
    laytend: " Hurricane " + ("Hurricane Layten").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hurricane Layten") + " has dissipated!",
    layten2: " Hurricane " + ("HurricanePatricia2015").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricanePatricia2015") + " has formed!",
    layten2d: " Hurricane " + ("HurricanePatricia2015").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricanePatricia2015") + " has dissipated!",
    playbot: " Hurricane " + ("Playten Bot").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Playten Bot") + " has formed!",
    playbotd: " Hurricane " + ("Playten Bot").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Playten Bot") + " has dissipated!",
    hype: " Hurricane " + ("Hypercane").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hypercane") + " has formed!",
    hyped: " Hurricane " + ("Hypercane").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hypercane") + " has dissipated!",
    hypeteen: " Hurricane " + ("HypercaneTeen").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HypercaneTeen") + " has formed!",
    hypeteend: " Hurricane " + ("HypercaneTeen").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HypercaneTeen") + " has dissipated!",
    sjmaven: " Hurricane " + ("Sjmaven1993").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Sjmaven1993") + " has formed!",
    sjmavend: " Hurricane " + ("Sjmaven1993").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Sjmaven1993") + " has dissipated!",
    ryne: " Hurricane " + ("CycloneRyne94").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CycloneRyne94") + " has formed!",
    ryned: " Hurricane " + ("CycloneRyne94").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CycloneRyne94") + " has dissipated!",
    odile: " Hurricane " + ("HurricaneOdile").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricaneOdile") + " has formed!",
    odiled: " Hurricane " + ("HurricaneOdile").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricaneOdile") + " has dissipated!",
    collin: " Hurricane " + ("SnaggyFTW").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SnaggyFTW") + " has formed!",
    collind: " Hurricane " + ("SnaggyFTW").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SnaggyFTW") + " has dissipated!",
    collin2: " Hurricane " + ("Cyclone-Snaggy123").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Cyclone-Snaggy123") + " has formed!",
    collin2d: " Hurricane " + ("Cyclone-Snaggy123").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Cyclone-Snaggy123") + " has dissipated!",
    keranique: " Hurricane " + ("AGirlCalledKeranique").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AGirlCalledKeranique") + " has formed!",
    keraniqued: " Hurricane " + ("AGirlCalledKeranique").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AGirlCalledKeranique") + " has dissipated!",
    floyd: " Hurricane " + ("StrawberryMaster").link("https://hypotheticalhurricanes.fandom.com/wiki/User:StrawberryMaster") + " has formed!",
    floydd: " Hurricane " + ("StrawberryMaster").link("https://hypotheticalhurricanes.fandom.com/wiki/User:StrawberryMaster") + " has dissipated!",
    pfm: " Hurricane " + ("PassionFruitMaster").link("https://hypotheticalhurricanes.fandom.com/wiki/User:PassionFruitMaster") + " has formed!",
    pfmd: " Hurricane " + ("PassionFruitMaster").link("https://hypotheticalhurricanes.fandom.com/wiki/User:PassionFruitMaster") + " has dissipated!",
    hh: " Hurricane " + ("HypotheticalHurricane").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HypotheticalHurricane") + " has formed!",
    hhd: " Hurricane " + ("HypotheticalHurricane").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HypotheticalHurricane") + " has dissipated!",
    jack: " Hurricane " + ("Leboringjack").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Leboringjack") + " has formed!",
    jackd: " Hurricane " + ("Leboringjack").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Leboringjack") + " has dissipated!",
    steve: " Hurricane " + ("Steve820").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Steve820") + " has formed!",
    steved: " Hurricane " + ("Steve820").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Steve820") + " has dissipated!",
    andrew: " Hurricane " + ("Andrew444").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Andrew444") + " has formed!",
    andrewd: " Hurricane " + ("Andrew444").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Andrew444") + " has dissipated!",
    bittersweet: " Hurricane " + ("A Bittersweet Journey").link("https://hypotheticalhurricanes.fandom.com/wiki/User:A Bittersweet Journey") + " has formed!",
    bittersweetd: " Hurricane " + ("A Bittersweet Journey").link("https://hypotheticalhurricanes.fandom.com/wiki/User:A Bittersweet Journey") + " has dissipated!",
    azure: " Hurricane " + ("AzureAzulCrash").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AzureAzulCrash") + " has formed!",
    azured: " Hurricane " + ("AzureAzulCrash").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AzureAzulCrash") + " has dissipated!",
    darren: " Hurricane " + ("DarrenDude").link("https://hypotheticalhurricanes.fandom.com/wiki/User:DarrenDude") + " has formed!",
    darrend: " Hurricane " + ("DarrenDude").link("https://hypotheticalhurricanes.fandom.com/wiki/User:DarrenDude") + " has dissipated!",
    destiny: " Hurricane " + ("UniversalSolo").link("https://hypotheticalhurricanes.fandom.com/wiki/User:UniversalSolo") + " has formed!",
    destinyd: " Hurricane " + ("UniversalSolo").link("https://hypotheticalhurricanes.fandom.com/wiki/User:UniversalSolo") + " has dissipated!",
    bumblebee: " Hurricane " + ("Bumblebee the transformer").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Bumblebee the transformer") + " has formed!",
    bumblebeed: " Hurricane " + ("Bumblebee the transformer").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Bumblebee the transformer") + " has dissipated!",
    rara: " Hurricane " + ("Raraahahahromaromamagagaoohlala").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Raraahahahromaromamagagaoohlala") + " has formed!",
    rarad: " Hurricane " + ("Raraahahahromaromamagagaoohlala").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Raraahahahromaromamagagaoohlala") + " has dissipated!",
    delete2000pages: " Hurricane " + ("Not David Brown").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Not David Brown") + " has formed!",
    delete2000pagesd: " Hurricane " + ("Not David Brown").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Not David Brown") + " has dissipated!",
    austin: " Hurricane " + ("AustinD-3").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AustinD-3") + " has formed!",
    austind: " Hurricane " + ("AustinD-3").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AustinD-3") + " has dissipated!",
    logan: " Hurricane " + ("HiiTZLoGaN").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HiiTZLoGaN") + " has formed!",
    logand: " Hurricane " + ("HiiTZLoGaN").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HiiTZLoGaN") + " has dissipated!",
    jsky: " Hurricane " + ("Jskylinegtr").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Jskylinegtr") + " has formed!",
    jskyd: " Hurricane " + ("Jskylinegtr").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Jskylinegtr") + " has dissipated!",
    tornado: " Hurricane " + ("HypotheticalTornado").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HypotheticalTornado") + " has formed!",
    tornadod: " Hurricane " + ("HypotheticalTornado").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HypotheticalTornado") + " has dissipated!",
    puffle: " Hurricane " + ("PuffleXTREME").link("https://hypotheticalhurricanes.fandom.com/wiki/User:PuffleXTREME") + " has formed!",
    puffled: " Hurricane " + ("PuffleXTREME").link("https://hypotheticalhurricanes.fandom.com/wiki/User:PuffleXTREME") + " has dissipated!",
    trump: " Hurricane " + ("Donald Trump").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Donald Trump") + " has formed!",
    trumpd: " Hurricane " + ("Donald Trump").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Donald Trump") + " has dissipated!",
    clinton: " Hurricane " + ("Hillary Clinton").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hillary Clinton") + " has formed!",
    clintond: " Hurricane " + ("Hillary Clinton").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hillary Clinton") + " has dissipated!",
    bernie: " Hurricane " + ("Bernie Sanders").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Bernie Sanders") + " has formed!",
    bernied: " Hurricane " + ("Bernie Sanders").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Bernie Sanders") + " has dissipated!",
    kool: " Hurricane " + ("Koolturnip").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Koolturnip") + " has formed!",
    koold: " Hurricane " + ("Koolturnip").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Koolturnip") + " has dissipated!",
    hypebot: " Hurricane " + ("Hypercane Bot").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hypercane Bot") + " has formed!",
    hypebotd: " Hurricane " + ("Hypercane Bot").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hypercane Bot") + " has dissipated!",
    yolo: " Hurricane " + ("Heythereyolo123123123").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Heythereyolo123123123") + " has formed!",
    yolod: " Hurricane " + ("Heythereyolo123123123").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Heythereyolo123123123") + " has dissipated!",
    ef5: " Hurricane " + ("EF5tornado").link("https://hypotheticalhurricanes.fandom.com/wiki/User:EF5tornado") + " has formed!",
    ef5d: " Hurricane " + ("EF5tornado").link("https://hypotheticalhurricanes.fandom.com/wiki/User:EF5tornado") + " has dissipated!",
    h162: " Hurricane " + ("Hurricane162").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hurricane162") + " has formed!",
    h162d: " Hurricane " + ("Hurricane162").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Hurricane162") + " has dissipated!",
    sdt: " Hurricane " + ("SuperDestructiveTwister").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SuperDestructiveTwister") + " has formed!",
    sdtd: " Hurricane " + ("SuperDestructiveTwister").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SuperDestructiveTwister") + " has dissipated!",
    servalpro: " Hurricane " + ("ServalPRO").link("https://hypotheticalhurricanes.fandom.com/wiki/User:ServalPRO") + " has formed!",
    servalprod: " Hurricane " + ("ServalPRO").link("https://hypotheticalhurricanes.fandom.com/wiki/User:ServalPRO") + " has dissipated!",
    wb: " Hurricane " + ("WillyBilly2006").link("https://hypotheticalhurricanes.fandom.com/wiki/User:WillyBilly2006") + " has formed!",
    wbd: " Hurricane " + ("WillyBilly2006").link("https://hypotheticalhurricanes.fandom.com/wiki/User:WillyBilly2006") + " has dissipated!",
    hm: " Hurricane " + ("HurricaneMonster").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricaneMonster") + " has formed!",
    hmd: " Hurricane " + ("HurricaneMonster").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricaneMonster") + " has dissipated!",
    hm99: " Hurricane " + ("HurricaneMaker99").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricaneMaker99") + " has formed!",
    hm99d: " Hurricane " + ("HurricaneMaker99").link("https://hypotheticalhurricanes.fandom.com/wiki/User:HurricaneMaker99") + " has dissipated!",
    maxf: " Hurricane " + ("MaxForce1").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MaxForce1") + " has formed!",
    maxfd: " Hurricane " + ("MaxForce1").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MaxForce1") + " has dissipated!",
    SJmaven: " Hurricane " + ("SJmaven1993").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SJmaven1993") + " has formed!",
    SJmavend: " Hurricane " + ("SJmaven1993").link("https://hypotheticalhurricanes.fandom.com/wiki/User:SJmaven1993") + " has dissipated!",
    lance: " Hurricane " + ("Lancemoon").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Lancemoon") + " has formed!",
    lanced: " Hurricane " + ("Lancemoon").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Lancemoon") + " has dissipated!",
    lucid: " Hurricane " + ("Lucid Upsilon").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Lucid Upsilon") + " has formed!",
    lucidd: " Hurricane " + ("Lucid Upsilon").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Lucid Upsilon") + " has dissipated!",
    icecraft: " Hurricane " + ("IceCraft87941").link("https://hypotheticalhurricanes.fandom.com/wiki/User:IceCraft87941") + " has formed!",
    icecraftd: " Hurricane " + ("IceCraft87941").link("https://hypotheticalhurricanes.fandom.com/wiki/User:IceCraft87941") + " has dissipated!",
    baron: " Hurricane " + ("Baron Kobe").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Baron Kobe") + " has formed!",
    barond: " Hurricane " + ("Baron Kobe").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Baron Kobe") + " has dissipated!",
    ashlyn: " Hurricane " + ("CycloneAshlyn2002").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CycloneAshlyn2002") + " has formed!",
    ashlynd: " Hurricane " + ("CycloneAshlyn2002").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CycloneAshlyn2002") + " has dissipated!",
    neutral: "Hurricane " + ("ENSO Neutral").link("https://hypotheticalhurricanes.fandom.com/wiki/User:ENSO_Neutral") + " has formed!",
    neutrald: "Hurricane " + ("ENSO Neutral").link("https://hypotheticalhurricanes.fandom.com/wiki/User:ENSO_Neutral") + " has dissipated!",
    elnino: "Hurricane " + ("The Hot El Niño").link("https://hypotheticalhurricanes.fandom.com/wiki/User:The_Hot_El_Niño") + " has formed!",
    elninod: "Hurricane " + ("The Hot El Niño").link("https://hypotheticalhurricanes.fandom.com/wiki/User:The_Hot_El_Niño") + " has dissipated!",
    lanina: "Hurricane " + ("The Cool La Niña").link("https://hypotheticalhurricanes.fandom.com/wiki/User:The_Hot_Cool_Niña") + " has formed!",
    laninad: "Hurricane " + ("The Cool La Niña").link("https://hypotheticalhurricanes.fandom.com/wiki/User:The_Cool_La_Niña") + " has dissipated!",
    marcus: " Hurricane " + ("MarcusSanchez").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MarcusSanchez") + " has formed!",
    marcusd: " Hurricane " + ("MarcusSanchez").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MarcusSanchez") + " has dissipated!",
    gala: " Hurricane " + ("Cyclone Gala").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Cyclone_Gala") + " has formed!",
    galad: " Hurricane " + ("Cyclone Gala").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Cyclone_Gala") + " has dissipated!",
    nuno: " Hurricane " + ("NunoLava1998").link("https://hypotheticalhurricanes.fandom.com/wiki/User:NunoLava1998") + " has formed!",
    nunod: " Hurricane " + ("NunoLava1998").link("https://hypotheticalhurricanes.fandom.com/wiki/User:NunoLava1998") + " has dissipated!",
    orlando: " Hurricane " + ("Adolf Coffee").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Adolf_Coffee") + " has formed!",
    orlandod: " Hurricane " + ("Adolf Coffee").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Adolf_Coffee") + " has dissipated!",
    puffle2: " Hurricane " + ("PuffleReturns").link("https://hypotheticalhurricanes.fandom.com/wiki/User:PuffleReturns") + " has formed!",
    puffle2d: " Hurricane " + ("PuffleReturns").link("https://hypotheticalhurricanes.fandom.com/wiki/User:PuffleReturns") + " has dissipated!",
    money: " Hurricane " + ("Money Hurricane").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Money_Hurricane") + " has formed!",
    moneyd: " Hurricane " + ("Money Hurricane").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Money_Hurricane") + " has dissipated!",
    cardozo2: " Hurricane " + ("TheFlyTeen").link("https://hypotheticalhurricanes.fandom.com/wiki/User:TheFlyTeen") + " has formed!",
    cardozo2d: " Hurricane " + ("TheFlyTeen").link("https://hypotheticalhurricanes.fandom.com/wiki/User:TheFlyTeen") + " has dissipated!",
    jd: " Hurricane " + ("Jdcomix").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Jdcomix") + " has formed!",
    jdd: " Hurricane " + ("Jdcomix").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Jdcomix") + " has dissipated!",
    garfield: " Hurricane " + ("MasterGarfield").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MasterGarfield") + " has formed!",
    garfieldd: " Hurricane " + ("MasterGarfield").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MasterGarfield") + " has dissipated!",
    brick: " Hurricane " + ("Brickcraft1").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Brickcraft1") + " has formed!",
    brickd: " Hurricane " + ("Brickcraft1").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Brickcraft1") + " has dissipated!",
    akio: " Hurricane " + ("AkioTheOne").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AkioTheOne") + " has formed!",
    akiod: " Hurricane " + ("AkioTheOne").link("https://hypotheticalhurricanes.fandom.com/wiki/User:AkioTheOne") + " has dissipated!",
    akio2: " Hurricane " + ("EyeOfAkio").link("https://hypotheticalhurricanes.fandom.com/wiki/User:EyeOfAkio") + " has formed!",
    akio2d: " Hurricane " + ("EyeOfAkio").link("https://hypotheticalhurricanes.fandom.com/wiki/User:EyeOfAkio") + " has dissipated!",
    ray: " Hurricane " + ("BeamOfSunlight").link("https://hypotheticalhurricanes.fandom.com/wiki/User:BeamOfSunlight") + " has formed!",
    rayd: " Hurricane " + ("BeamOfSunlight").link("https://hypotheticalhurricanes.fandom.com/wiki/User:BeamOfSunlight") + " has dissipated!",
    tornado2: " Hurricane " + ("TORNADOOFDOOM1").link("https://hypotheticalhurricanes.fandom.com/wiki/User:TORNADOOFDOOM1") + " has formed!",
    tornado2d: " Hurricane " + ("TORNADOOFDOOM1").link("https://hypotheticalhurricanes.fandom.com/wiki/User:TORNADOOFDOOM1") + " has dissipated!",
    roussil: " Hurricane " + ("MonseurRoussil1997").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MonseurRoussil1997") + " has formed!",
    roussild: " Hurricane " + ("MonseurRoussil1997").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MonseurRoussil1997") + " has dissipated!",
    mario: " Hurricane " + ("MarioProtIV").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MarioProtIV") + " has formed!",
    mariod: " Hurricane " + ("MarioProtIV").link("https://hypotheticalhurricanes.fandom.com/wiki/User:MarioProtIV") + " has dissipated!",
    gary: " Hurricane " + ("GaryKJR").link("https://hypotheticalhurricanes.fandom.com/wiki/User:GaryKJR") + " has formed!",
    garyd: " Hurricane " + ("GaryKJR").link("https://hypotheticalhurricanes.fandom.com/wiki/User:GaryKJR") + " has dissipated!",
    derp: " Hurricane " + ("Derpmeister99").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Derpmeister99") + " has formed!",
    derpd: " Hurricane " + ("Derpmeister99").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Derpmeister99") + " has dissipated!",
    cookie: " Hurricane " + ("CookieMonster12391").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CookieMonster12391") + " has formed!",
    cookied: " Hurricane " + ("CookieMonster12391").link("https://hypotheticalhurricanes.fandom.com/wiki/User:CookieMonster12391") + " has dissipated!",
    mc: " Hurricane " + ("Minecraft8369").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Minecraft8369") + " has formed!",
    mcd: " Hurricane " + ("Minecraft8369").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Minecraft8369") + " has dissipated!",
    l1g: " Hurricane " + ("Level 1 Girl").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Level_1_Girl") + " has formed!",
    l1gd: " Hurricane " + ("Level 1 Girl").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Level_1_Girl") + " has dissipated!",
    l1b: " Hurricane " + ("Level 1 Boy").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Level_1_Boy") + " has formed!",
    l1bd: " Hurricane " + ("Level 1 Boy").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Level_1_Boy") + " has dissipated!",
    chap: " Hurricane " + ("Chapsteck4yurlipis").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Chapsteck4yurlipis") + " has formed!",
    chapd: " Hurricane " + ("Chapsteck4yurlipis").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Chapsteck4yurlipis") + " has dissipated!",
    peri: " Subtropical Storm " + ("Perismol").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Perismol") + " has formed!",
    perid: " Subtropical Storm " + ("Perismol").link("https://hypotheticalhurricanes.fandom.com/wiki/User:Perismol") + " has dissipated!",
    // ENSO and AMO commands for roleplay
    VSL: "ENSO: Very Strong La Niña",
    SL: "ENSO: Strong La Niña",
    ML: "ENSO: Moderate La Niña",
    WL: "ENSO: Weak La Niña",
    NEU: "ENSO: Neutral",
    WE: "ENSO: Weak El Niño",
    ME: "ENSO: Moderate El Niño",
    SE: "ENSO: Strong El Niño",
    VSE: "ENSO: Very Strong El Niño",
    MKE: "ENSO: Modoki El Niño",
    wAMO: "AMO: Warm",
    cAMO: "AMO: Cold",
    // !hugUSER commands
    hugSM: "You have been hugged by " + ("StrawberryMaster").link("https://hypotheticalhurricanes.fandom.com/wiki/User:StrawberryMaster") + ".",
    // Miscellaneous
    waffles: "\\ OpieOP / Waffle party! \\ OpieOP /",
    gaben: "ALL HAIL LORD GABEN (gaben)",
    username: wgUserName + " tells everyone to stop spamming. ",
    iam: " You are " + wgUserName + ".",
    id: wgChatRoomId,
    removekebab: "Kebab successfully removed.",
    csgo: "Sponsored by CSGO: Lotto",
    mlg: "(party) (party) SAMPLE MLG TEXT (gorf) (gorf)",
    seizure: ("SEIZURE WARNING!").fontsize(4).fontcolor("red"),
    blargh: ("VOMIT ALERT").fontsize(4).fontcolor("firebrick"),
    trap: ("IT'S A TRAP!").fontsize(2).fontcolor("red"),
    nuke: ("TACTICAL NUKE INCOMING!").fontcolor("red").fontsize(5),
    kawaii_: ("✿(◕‿◕)✿").fontcolor("FF69B4"),
    kawaii: ("In ✿(◕‿◕)✿ we trust desu").fontcolor("FF69B4"),
    illu_: (" (illu) ").fontcolor("darkgreen"),
    illu: (" (illu) Join us. (illu)").fontcolor("darkgreen"),
    plot: (" (dale_) PLOT TWIST (dale) ").fontcolor("blue"),
    salt: (" (illu) In Salt we Trust (illu) ").fontcolor("darkgreen"),
    revolution: (" (illu) THE REVOLUTION IS COMING! (illu) ").fontcolor("darkgreen"),
    grandma: (" (illu) squirm crawl slither writhe today we rise (illu) ").fontcolor("darkgreen"),
    emotes: ("-> List of all chat emotes <-").link("https://hypotheticalhurricanes.fandom.com/wiki/MediaWiki:Emoticons").fontsize(3),
    rules: ("-> Chat rules <-").link("https://hypotheticalhurricanes.fandom.com/wiki/Project:Chat").fontsize(3),
    away: (" You are now away. "),
    unaway: (" You are no longer away. "),
};

/* Hiding this as I don't think we plan to use it right now
CustomAlerts.modOnlyCmds = [
	// Anti-spam protection.
	"id",
	"username"
];
*/
 
// observer
CustomAlerts.obs = new MutationObserver(function(a) {
    for (var i in a) {
        for (var j in a[i].addedNodes) {
            var node = a[i].addedNodes[j],
                isMsg = false;
            try {
                if (
                    node.nodeType == 1 &&
                    typeof $(node).attr("data-user") === "string" &&
                    !$(node).hasClass("inline-alert") && // make sure that 'CustomAlerts.implement' doesnt attempt to replace custom alerts when inserted
                    $(node).parents().eq(1).hasClass("Chat")
                ) {
                    // this is a chat message by some user
                    isMsg = true;
                }
            } catch (err) {}
            if (isMsg) {
                var message = $(node).find(".message").html(),
                    cmd = message.match(/^\!(.+)/),
                    user = $(node).attr("data-user");
                if (cmd) {
                    // command pattern found
                    CustomAlerts.implement(node, cmd[1], user);
                }
            }
        }
    }
});
 
// function for replacing a node
CustomAlerts.implement = function(node, cmd, user) {
    if (CustomAlerts.cmd.hasOwnProperty(cmd)) {
        // command exists - replace message with inline alert
        if (!(CustomAlerts.modOnlyCmds.indexOf(cmd) > -1 && !mainRoom.viewUsers.model.users.findByName(user).attributes.isModerator)) {
            // make sure that a non-mod did not attempt to use a mod-only command
            var li = $('<li />');
            $(li).attr({
                "data-user": $(node).attr("data-user"),
                "class": "inline-alert pseudo-inline-alert"
            }).html(WikiaEmoticons.doReplacements(
                CustomAlerts.cmd[cmd],
                ChatView.prototype.emoticonMapping
            ));
            $(node).replaceWith(li);
        }
    }
}
 
// add css to treat continue-messages after an alert as new messages
mw.util.addCSS(
	'.pseudo-inline-alert + .continued {\n' +
		'\tmin-height: 32px;\n' +
		'\tmargin-bottom: 0;\n' +
		'\tpadding-top: 18px;\n' +
		'\ttop: 0;\n' +
	'}\n' +
	'.Chat .pseudo-inline-alert + .continued img, .pseudo-inline-alert + .continued .time {\n' +
		'\tdisplay: inline;\n' +
	'}\n' +
	'.pseudo-inline-alert + .continued .username {\n' +
		'\tdisplay: block;\n' +
	'}'
);
 
// start observing chat
CustomAlerts.obs.observe(document.querySelector("#WikiaPage"), {
    childList: true,
    subtree: true
});