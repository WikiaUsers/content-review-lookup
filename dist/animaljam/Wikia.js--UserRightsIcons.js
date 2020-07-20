// WRITTEN BY USER:RAPPY_4187 AND MODIFIED BY USER:Dalekst

$(function() {
  var rights = {};
  var crat      = "<span class='tag'>Bureaucrat</span>";
  var admin     = "<span class='tag'>Administrator</span>";
  var inadmin   = "<span class='tag'>Inactive Administrator</span>";
  var bot       = "<span class='tag'><a style='color:white;' href='http://animaljam.wikia.com/wiki/Animal Jam Wiki:Bots'>Bot</a></span>";
  var inbot     = "<span class='tag'>Inactive Bot</span>";
  var founder   = "<span class='tag'>Founder</span>";
  var checkuser = "<span class='tag'>Checkuser</span>";

  rights["Sageleaf"]      = inadmin;
  rights["652Graystripe"]  = crat + checkuser;
  rights["Cheif Spiritstone"]            = crat;

  rights["Roadhawk"]      = admin;
  rights["UniversalGalaxies"]      = admin;
  rights["Randomized"]   = admin;
  rights["Diamonddragon88"]         = admin;

  rights["JaguarStar190"]        = inadmin;
  rights["Ghost Pony"]    = indadmin;

  rights["Jayina"]           = bot;
  rights["Hawkbot"]           = bot;

 

  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();

    $(".masthead-info hgroup").append(rights[wgTitle])
  }
});