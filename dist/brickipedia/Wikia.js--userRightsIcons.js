// WRITTEN BY USER:RAPPY_4187 AND MODIFIED BY USER:UltrasonicNXT

$(function() {
  var rights = {};
  var crat      = "<span class='tag'>Bureaucrat</span>";
  var admin     = "<span class='tag'><a style='color:white;' href='http://lego.wikia.com/index.php?title=Brickipedia:Administrators'>Administrator</a></span>";
  var inadmin   = "<span class='tag'>Inactive Administrator</span>";
  var bot       = "<span class='tag'><a style='color:white;' href='http://lego.wikia.com/wiki/Brickipedia:Bots'>Bot</a></span>";
  var inbot     = "<span class='tag'>Inactive Bot</span>";
  var founder   = "<span class='tag'>Founder</span>";
  var checkuser = "<span class='tag'>Checkuser</span>";

  rights["ToaMatau2004"]  = crat;
  
  rights["GOLDNINJAMX"] = crat;

  rights["DocDoom2"]       = admin;

  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();

    $(".masthead-info hgroup").append(rights[wgTitle])
  }
});