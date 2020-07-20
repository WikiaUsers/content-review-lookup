// WRITTEN BY USER:RAPPY_4187

$(function() {
  var rights = {};
  var crat      = "<span class='group'>Bureaucrat</span>";
  var admin     = "<span class='group'><a style='color:white;' href='http://yoshi.wikia.com/index.php?title=Yoshi Wiki:Administrators'>Sysop</a></span>";
  var inadmin   = "<span class='group'>Inactive Administrator</span>";
  var incrat    = "<span class='group'>Inactive Bureaucrat</span>";
  var bot       = "<span class='group'><a style='color:white;' href='http://yoshi.wikia.com/wiki/Yoshi_Wiki:Bots'>Bot</a></span>";
  var inbot     = "<span class='group'>Inactive Bot</span>";
  var founder   = "<span class='group'>Founder</span>";
  var checkuser = "<span class='group'>Checkuser</span>";

  rights["Windu223"]         = inadmin;
  rights["MassiveSodaDuck"]  = crat;
  rights["Alxeedo111"]       = crat;
  rights["Seahorseruler"]    = incrat;
  rights["Conker's Bad Fur Day"]    = crat;
  rights["ShermanTheMythran"]= inadmin;
  rights["Booswithanger"]    = admin;
  rights["AquaYoshi"]        = admin;
  rights["Shade487z"]        = founder;

 

 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.group').remove();

    $(".masthead-info hgroup").append(rights[wgTitle])
  }
});