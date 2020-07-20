/* Any JavaScript here will be loaded for all users on every page load. */
// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function () {
    var rights = {};
    var botTag = "<a href='http://warframeturkiye.fandom.com/wiki/WarframeTürkiye_Wiki:Administrators#Bots'>Bot</a>";
    var chatMod = "<a href='http://warframeturkiye.fandom.com/wiki/Project:Administrators'>Chat Moderator</a>";
    var adminTag = "<a href='http://warframeturkiye.fandom.com/wiki/Project:Administrators'>Administrator <img src='https://images.wikia.nocookie.net/__cb20150423210907/warframe/images/c/c7/Wikia_Badge_2.png' alt='Admin' /></a>";
    var bureaucratTag = "<a href='http://warframeturkiye.fandom.com/wiki/Project:Bureaucrats'>Lotus <img src='https://images.wikia.nocookie.net/__cb20150423210907/warframe/images/c/c7/Wikia_Badge_2.png' alt='Admin' /></a>";
    var moderatorTag = "<a href='http://warframeturkiye.fandom.com/wiki/WarframeTürkiye_Wiki:Administrators#Moderators'>Moderator</a>";
    var VSTF = "<a href='http://warframeturkiye.fandom.com/wiki/Help:VSTF'>VSTF</a>";
    var staff = "<a href='http://warframeturkiye.fandom.com/wiki/Help:Wikia_Staff'>Staff</a>";
    var councilor = "<a href='http://warframeturkiye.fandom.com/wiki/Help:Community_Council'>Councilor</a>";
    var star = "<a href='http://www.fandom.com/Stars'>Wiki Star</a>";
    var founder = "<a href='http://warframeturkiye.fandom.com/wiki/Project:Administrators'>Founder</a>";
 
    var disciple = "<a title='Disciple' class='masthead-disciple' href='http://warframeturkiye.fandom.com/wiki/Founders'>Disciple <img src='https://images.wikia.nocookie.net/warframe/images/3/3e/DiscipleBadge.png' alt='Disciple' /></a>";
    var hunter = "<a title='Hunter' class='masthead-hunter' href='http://warframeturkiye.fandom.com/wiki/Founders'>Hunter <img src='https://images.wikia.nocookie.net/warframe/images/2/2d/HunterBadge.png' alt='Hunter' /></a>";
    var master = "<a title='Master' class='masthead-master' href='http://warframeturkiye.fandom.com/wiki/Founders'>Master <img src='https://images.wikia.nocookie.net/warframe/images/d/d2/MasterBadge.png' alt='Master' /></a>";
    var grandmaster = "<a title='Grand Master' class='masthead-grandmaster' href='http://warframeturkiye.fandom.com/wiki/Founders'>Grand Master <img src='https://images.wikia.nocookie.net/warframe/images/f/f2/GrandMasterBadge.png' alt='Grand Master' /></a>";
 
    var lotusguide = "<a title='Guide of the Lotus' class='masthead-lotusguide' href='http://warframeturkiye.fandom.com/wiki/Guides_of_the_Lotus'>Guide of the Lotus <img src='https://images.wikia.nocookie.net/__cb20150408215141/warframe/images/f/f0/LotusGuideBadge.png' alt='Guide of the Lotus' /></a>";
    // Begin list of accounts given extra user rights icons
    //
    // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
 
    rights["MarkvA"]                    = [disciple, hunter, master, grandmaster],
 
    //------------------------------Disciples------------------------------ 
    rights["Dannyful240"]              = [disciple], 
    rights["Thrustor"]                 = [disciple], 
    rights["Pladim"]                   = [disciple], 
    rights["XxSeriaLxX"]               = [disciple], 
    rights["Twilight053"]              = [disciple],
    rights["DMNinja"]                  = [disciple],
    rights["FutureTroll"]              = [disciple],
    rights["VolmWarframe"]             = [disciple],
    rights["Geomemnon"]                = [disciple],
    rights["Aadjuh"]                   = [disciple],
    rights["Nesodos"]                  = [disciple],
    rights["Hoeskioeh"]                = [disciple],
    rights["XQuakerx"]                 = [disciple],
    rights["XJVIayhem"]                = [lotusguide, disciple],
    rights["X-Sarge"]                  = [disciple],
    rights["Leo17453"]                 = [disciple],
    rights["Spencer.deger"]            = [disciple],
 
    //-------------------------------Hunters-------------------------------
    rights["ChickenBar"]               = [hunter],
    rights["Forevener"]                = [hunter],
    rights["HeanWIKI"]                 = [hunter],
    rights["ObsceneSoul"]              = [hunter], 
    rights["Nicholaslimck"]            = [hunter], 
    rights["H3RRD0KT0RWF"]             = [hunter], 
    rights["Ares90000"]                = [hunter], 
    rights["Ice.ps"]                   = [hunter],
    rights["Kaysick"]                  = [hunter],
    rights["Maxshinzo21"]              = [hunter],
    rights["McVolker"]                 = [hunter],
    rights["SmokyBird"]                = [hunter],
    rights["Pureray"]                  = [hunter],
    rights["CoffeeFingers"]            = [hunter],
    rights["Greyf0xuk"]                = [hunter],
    rights["Shadowofmadness"]          = [hunter],
    rights["Jel264"]                   = [hunter],
    rights["Stryp"]                    = [hunter],
    rights["SunDog60"]                 = [hunter],
    rights["Mathematicus"]             = [hunter],
    rights["Nzkora"]                   = [hunter],
    rights["TheFatalFrame"]            = [hunter],
    rights["Metal1520"]                = [hunter],
    rights["Kibaa13"]                  = [hunter],
    rights["Aihoang94"]                = [hunter],
    rights["DRF128"]                   = [hunter],
    rights["Kukicha"]                  = [hunter],
    rights["Bramman111"]               = [hunter],
    rights["Fenrys Wulf"]              = [hunter],
    rights["ForsakenScholar"]          = [hunter],
    rights["NuLycan"]                  = [hunter],
    rights["Conzay755"]                = [hunter],
    rights["The Great Goatsby"]        = [hunter],
    rights["Zerocxp"]                  = [hunter],
    rights["Kirby47"]                  = [hunter],
    rights["Emanuelouch"]              = [hunter],
    rights["Philipes111"]              = [hunter],
    rights["A Group of Tenno"]         = [hunter],
    rights["Lusts"]                    = [hunter],
    rights["KIll3RX15"]                = [hunter],
    rights["Shin Kairi"]               = [hunter],
    rights["Ace of Gods"]              = [hunter],
    rights["PlasmaShock"]              = [hunter],
    rights["VanillaC0coa"]             = [hunter],
    rights["Genevieve Automaton"]      = [hunter],
    rights["Shogunassassin"]           = [hunter],
    rights["Cinnamon Toast King"]      = [hunter],
    rights["Sfalanga42"]               = [hunter],
    rights["Minotaur 10"]              = [hunter],
    rights["Jdjeshaiah"]               = [hunter],
    rights["Mannysantiago"]            = [hunter],
    rights["SoggyCow"]                 = [hunter],
    rights["Diabolyst"]                = [hunter],
    rights["Triburos"]                 = [hunter],
    rights["Shinokami007"]             = [hunter],
    rights["Mktums"]                   = [hunter],
    rights["ColorBeat"]                = [hunter],
    rights["Rezol"]                    = [hunter],
    rights["RealBlobman"]              = [hunter],
    rights["Darkstalix"]               = [hunter],
    rights["KarbonKitt"]               = [hunter],
    rights["CHRONOMEME"]               = [hunter],
    rights["Drache Ushuizi"]           = [hunter],
    rights["RIKENZz"]                  = [hunter],
    rights["Aliifghjkl"]               = [hunter],
    rights["OmegaPaladin"]             = [hunter],
    rights["Blaizeakavan"]             = [hunter],
    rights["DarkBlade6853"]            = [hunter],
    rights["Adamraga"]                 = [hunter],
    rights["ComCray"]                  = [hunter],
    rights["Azerial1337"]              = [hunter],
    rights["Incontrovertible"]         = [hunter],
 
    //-------------------------------Masters-------------------------------
    rights["Juper0"]                   = [master],
    rights["=WSC= Patriarch"]          = [master],
    rights["Fundance"]                 = [master],
    rights["Darthmufin"]               = [master],
    rights["Brodie6"]                  = [master],
    rights["DragonRemix"]              = [master],    
    rights["Eduard.c.deguzman"]        = [master],
    rights["_DARKY"]                   = [master],
    rights["SgtEva01"]                 = [master],
    rights["Ceekur"]                   = [master],
    rights["Servianhorn"]              = [master],
    rights["Ap0morph"]                 = [master],
    rights["Slicer1993"]               = [master],
    rights["RedDrago9"]                = [master],
    rights["TheGreaterAT"]             = [master],
    rights["Hawapino"]                 = [master],
    rights["Crunch3d"]                 = [master],
    rights["KoishiChan"]               = [master],
    rights["Clev86"]                   = [master],
    rights["Seaspartan118"]            = [master],
    rights["PlottingCreeper"]          = [master],
    rights["Darkix"]                   = [master],
    rights["Terry3373"]                = [master],
    rights["DeaShiva"]                 = [master],
    rights["Tveohedman"]               = [master],
    rights["Shliu"]                    = [master],
    rights["Judgetart"]                = [master],
    rights["Frost Prime"]              = [master],
    rights["Endurium"]                 = [master],
    rights["MrMothaTrucka"]            = [master],
    rights["N0lyfe"]                   = [master],
    rights["Tyotukovei"]               = [master],
    rights["TickTockMan"]              = [master],
    rights["Ltjuno"]                   = [master],
    rights["BloodyLucy"]               = [master],
    rights["Taxi366"]                  = [master],
    rights["Dyrak55d"]                 = [master],
    rights["AussiePommy"]              = [master],
    rights["Glasgowsmile853"]          = [master],
    rights["Ninjamander"]              = [master],
    rights["Revan04"]                  = [master],
    rights["Generalthree"]             = [master],
    rights["Yogotiss"]                 = [master],
    rights["LeAtlas"]                  = [master],
    rights["Nasem007"]                 = [master],
    rights["Detrimidexta"]             = [master],
    rights["N4zgul999"]                = [master],
    rights["NovusNova"]                = [lotusguide, master],
    rights["RonanFrost"]               = [master],
    rights["Markanthony1717"]          = [master],
    rights["Saeri17"]                  = [master],
    rights["Raftox"]                   = [master],
    rights["Exan BloodMoon"]           = [master],
    rights["HardBrettyson"]            = [master],
    rights["Drsherman"]                = [master],
    rights["Reptoks"]                  = [master],
    rights["Dai'Kahn"]                 = [master],
    rights["Distortic"]                = [master],
 
 
    //-----------------------------Grandmasters-----------------------------
    rights["MrDESC"]                   = [grandmaster],
    rights["Flaicher"]                 = [grandmaster],
    rights["Raigir"]                   = [grandmaster],
    rights["Thedeer"]                  = [grandmaster],
    rights["Dav36rye"]                 = [grandmaster],
    rights["MueR"]                     = [grandmaster],
    rights["Brizingr5"]                = [grandmaster],
    rights["Voqualin"]                 = [grandmaster],
    rights["Echoshade123"]             = [grandmaster],
    rights["Frydhamstr"]               = [grandmaster],
    rights["Fuzzy c"]                  = [grandmaster],
    rights["Helwig"]                   = [grandmaster],
    rights["DietEbolaCola"]            = [grandmaster],
    rights["YourMoms"]                 = [grandmaster],
    rights["Sgt Kekka"]                = [grandmaster],
    rights["Nikrul"]                   = [grandmaster],
    rights["Shuskei"]                  = [grandmaster],
    rights["41Danny1"]                 = [grandmaster],
    rights["Natey"]                    = [grandmaster],
    rights["Uluu"]                     = [grandmaster],
    rights["Cpt Atroxium"]             = [grandmaster],
    rights["DogManDan"]                = [grandmaster],
    rights["AntoineFlemming"]          = [grandmaster],
    rights["MarlonID"]                 = [grandmaster],
    rights["Layerka"]                  = [grandmaster],
    rights["Jubis"]                    = [grandmaster],
    rights["A trane901"]               = [grandmaster],
    rights["Inuichi"]                  = [grandmaster],
    rights["Etikim"]                   = [grandmaster],
    rights["SSJneo"]                   = [grandmaster],
    rights["N00blShowtek"]             = [grandmaster],
    rights["Daibido1123"]              = [grandmaster],
    rights["Kibblesnbitz"]             = [grandmaster],
    rights["ExplosiveLiberty"]         = [grandmaster],
    rights["Denshibushi"]              = [grandmaster],
    rights["Svenrolic"]                = [grandmaster],
    rights["~~=*ScryTexS*=~~"]         = [grandmaster],
    rights["Lance100usa"]              = [grandmaster],
    rights["DECreeper"]                = [grandmaster],
    rights["Hybrass"]                  = [grandmaster],
    rights["Prime™"]                   = [grandmaster],
    rights["Saske92"]                  = [lotusguide, grandmaster],
    rights["CrookedBullet"]            = [grandmaster],
    rights["ItsXthomasTAG"]            = [grandmaster],
    rights["Seldszar"]                 = [grandmaster],
    rights["Anashar Vicis Educis"]     = [grandmaster],
    rights["Laucivol"]                 = [grandmaster],
    rights["Astray TurnRed"]           = [grandmaster],
    rights["Brazen NL"]                = [grandmaster],
    rights["ZealotOfLuna"]             = [grandmaster],
    rights["Tobiah"]                   = [grandmaster],
    rights["DarkDullahan"]             = [grandmaster],
    rights["Rasinycon"]                = [grandmaster],
    rights["ManihaX"]                  = [grandmaster],
    rights["CobaltRat"]                = [grandmaster],
    rights["Jedaiken"]                 = [grandmaster],
    rights["Jeffman12"]                = [grandmaster],
    rights["Erukanu"]                  = [grandmaster],
    rights["DarkSalad42"]              = [grandmaster],
 
    //Bots
    rights["NAME"]                      = [botTag],
 
    //Chat Moderators
    rights["NAME"]                      = [chatMod, moderatorTag],
 
    //Administrators
    rights["ParsesTR"]                  = [adminTag],
    rights["FINNER"]                    = [adminTag],
    rights["NAME"]                      = [adminTag],
 
    //Bureaucrats
    rights["NAME"]                      = [bureaucratTag],
 
    //Moderator
    rights["NAME"]                      = [moderatorTag],
 
    //Guide of the Lotus
    rights["Somedude1000"]              = [lotusguide],
    rights["IIIDevoidIII"]              = [lotusguide],
 
    //VSTF
    rights["NAME"]                      = [VSTF],
 
    //Staff
    rights["NAME"]                      = [staff],
 
    //Councilor
    rights["NAME"]                      = [councilor],
 
    //Wikia Star
    rights["NAME"]                      = [star],
 
    //Founder
    rights["NAME"]                      = [founder];
 
 
    // End list of accounts given extra user rights icons
 
 
    if (wgPageName.indexOf("Special:Contributions") != -1) {
        // newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
        // unfinishedTitle = newTitle;
 
        while (unfinishedTitle.search("_") > 0) {
            unfinishedTitle = unfinishedTitle.replace("_", " ");
        }
 
        userName = unfinishedTitle;
 
    } else {
        userName = wgTitle;
        userName.replace("User:", "");
    }
 
    if (typeof rights[userName] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[userName].length; i < len; i++) {
            // add new rights
            $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
//***************
// Adds link to Special:Contributions for "Blocked" tags
//***************
 
if ($('span.tag:contains("Blocked")').length == 1) {
    $('span.tag:contains("Blocked")').wrap("<a href='/wiki/Special:Contributions/" + wgTitle.replace(' ', '_') + "' style='color:white;'></a>");
}
 
// </source>