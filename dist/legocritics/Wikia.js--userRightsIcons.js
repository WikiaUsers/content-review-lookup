// WRITTEN BY USER:Bob_Bricks

$(function() {
  var rights = {};
  var crat      = "<span class='group'>Bureaucrat</span>";
  var admin     = "<span class='group'><a style='color:white;' 
  var inadmin   = "<span class='group'>Inactive Administrator</span>";
  var bot       = "<span class='group'><a style='color:white;' 
  var inbot     = "<span class='group'>Inactive Bot</span>";
  var founder   = "<span class='group'>Founder</span>";
  var checkuser = "<span class='group'>Checkuser</span>";
  var pres      = "<span class='group'>President</span>";
  var staff     = "<span class='group'>Brick Critics Staff</span>";
  var vp        = "<span class='group'>Vice President</span>";
  var evp        = "<span class='group'>Executive Vice President</span>";

  rights["Mr.Legos"]         = inadmin + founder + staff;
  rights["Bob Bricks"]       = pres + crat + staff + council;
  rights["Prisinorzero"]     = crat + checkuser + evp + staff;
  rights["Legofan100"]       = crat + staff + vp;
  rights["Br1ck animat0r"]   = crat + staff + vp;
  rights["Cligra"]           = crat;
  rights["King of Nynrah"]   = crat;

  rights["Creeper S"]        = crat + staff + coucil;
  rights["Darth henry"]      = crat + staff + coucil;
  rights["SKP4472"]          = crat + staff + coucil;

  rights["Jeyo"]             = staff;
  rights["717dif"]           = staff;
  rights["Bob bricks3"]      = staff;
  rights["Bob bricks2"]      = staff;

  rights["Lego Critics Bot"] = bot + staff;

 

 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.group').remove();

    $(".masthead-info hgroup").append(rights[wgTitle])
  }
});