function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    rights["Ynkrdlevin17"] = ["Ex-KGB", "President of the United States of ERBOH", "Pokemon Master"];
    rights["Mrpietcaptain"] = ["Ex-KGB", "Swagman"];
    rights["J1coupe"] = ["Wikia Star", "The Doctor", "DigiDestined", "King of Despair", "Ex-KGB"];
    rights["Meatholl"] = ["Ex-KGB"];
    rights["Loygansono55"] = ["Commander of the Third Reich", "EpicLLOYG", "Edgar Allan Poe x Carl Grimes", "Kigt", "Froyg", "Ligy"];
    rights["DudeWithASuit"] = ["Ex-KGB", "Dwassy G", "Leader of the DWAS ERA"];
    rights["Scrawland Scribblescratch"] = ["War Doctor", "Grandmaster"];
    rights["WonderPikachu12"] = ["Administrator", "Unbearable"];
    rights["Wachowman"] = ["Ex-KGB", "Macho Man"];
    rights["BackToTheFuturama86"] = ["Ex-KGB"];
    rights["Mystical Trixter"] = ["Rap Mod", "Daughter of Sparda", "Global Saturation", "Kazekage"];
    rights["ShoopDaKev"] = ["Ex-KGB", "Deadpool"];
    rights["Captain Warrior"] = ["Iron Man"];
    rights["JPhil2.0"] = ["Sci Fi Aficionado", "International Man of Mystery"];
    rights["TheSteelerNation2"] = ["Wiki Owner", "Ex-KGB"];
    rights["Hoagy"] = ["Ex-KGB"];
    rights["Intrudgero98"] = ["Ex-KGB"];
    rights["MrAwesome300"] = ["Ex-KGB", "Knucklehead McSpazatron"];
    rights["AnimaShaun"] = ["Ex-KGB"];
    rights["YouTubeKorea"] = ["The Raggedy Man", "Asian Matt Smith"];
    rights["Ximena 13"] = ["Ex-KGB"];
    rights["Minipop56"] = ["Mathematician"];
    rights["TKandMit"] = ["#MitasMoe"];
    rights["Tigerisnormal"] = ["Rollback", "Rap Mod", "Tigger", "MunKitteh"];
    rights["Bluesocks"] = ["Rap Mod", "ERB Creator",];
    rights["TheEpicLLOYD"] = ["Rap Mod", "ERB Creator"];
    rights["Epicnail"] = ["Ex-KGB"];
    rights["Silent Mocker"] = ["Mocker Bird", "007"];
    rights["Awesomesix"] = ["Ex-KGB", "TDERB Writer"];
    rights["Tesla Man"] = ["Impeccably Dressed"];
    rights["MetalFire"] = ["Chat-Maud", "Metalgawea"];
    rights["Bobdave"] = ["Hey Jude", "Cheeky Nando's Eater", "Top Lad", "Big Bang Smasher"];
    rights["BreZ"] = ["Lion King"];
    rights["Andrew0218"] = ["Davy"];
    rights["Tkid115"] = ["Assassin-pool", "Night-Shift", "E-dubbled", "Sexy Comic"];
    rights["RazzyRaven"] = ["Master Yee", "The Razmanian Rebel"];
    rights["Joeaikman"] = ["User of Fiction"];
    rights["The Flatwoods Monster"] = ["Unclear how many dogs this count as"];
    rights["Bantha117"] = ["Administrator", "Munkee", "MunKitteh"];
    rights["Tesla D"] = ["Dante Cimadamore", "Give me motion"];
    rights["Betette"] = ["ERB Writer"];
    rights["WaltDzl"] = ["Walter Downing", "DjWaltDzl"];
    rights["Forrest Whaley"] = ["Forrestfire101"];
    rights["Baby GG"] = ["Rollback", "Dinasur"];
    rights["Jella141"] = ["Post-apocalyptic Cop"];
    rights["Iamthelegion"] = ["Roman Army", "I-Block Enthusiast", "#ConsoleMasterRace"];
    rights["TheAssyrianAssassin1337"] = ["Stannis"];
    rights["CaveJohnson333"] = ["Cave The Rock Johnson"];
    rights["ERBofSmoshery"] = ["Prison Breaker", "Sheriff's Deputy"];
    rights["GravityMan"] = ["Gravy Boat"];
    rights["AttackEyebrows12"] = ["The Other Other Doctor"];
    rights["Avatar XIII"] = ["Korra"];
    
  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

// importScriptPage("User:Madnessfan34537/multikick.js","cod")