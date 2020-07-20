// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
  var crat      = "<span class='group'>Bureaucrat</span>";
  var admin     = "<span class='group'><a style='color:white;' href='http://ben10.wikia.com/index.php?title=Ben_10_Planet:Administrators'>Administrator</a></span>";
  var bot       = "<span class='group'><a style='color:white;' href='http://ben10.wikia.com/wiki/Ben_10_Planet:Help/Bots'>Bot</a></span>";  
  var founder   = "<span class='group'>Founder</span>";
  var BTSM = "<span class='group'>BTSM</span>";
 
  rights["Simple.PlanNER"]         = founder + crat;
  rights["Gleekobsessed"]       = crat;
  rights["Svwiki99"]      = crat;
  rights["Siradia"]    = crat;
  rights["Gleek4life353"]       = crat;
 
  rights["Ben2themax"]       = admin;
  rights["Costas3"]          = admin;
 
  rights["BTPChatBot"]       = bot;
  rights["BTP maintenance bot"]           = bot;
  rights["BTP CVU Bot"]      = bot;
  rights["WikiaBot"]         = bot;
  rights["Wikia"]            = bot;
  rights["QATestsBot"]       = bot;
  rights["Riley H"]          = bot;
 
  rights["Tenbennyson"]      = BTSM;
  rights["Alien Y"]          = BTSM;
 
 if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    $(".masthead-info hgroup").append(rights[wgTitle])
  }
});