$(function() {
  var rights = {};
  var crat      = "<span class='tag'>Bureaucrat</span>";
  var admin     = "<span class='tag'><a style='color:white;'</span>";
  var inadmin   = "<span class='tag'>Lunk</span>";
  var bot       = "<span class='tag'><a style='color:white;</span>";
  var inbot     = "<span class='tag'>Inactive Bot</span>";
  var founder   = "<span class='tag'>Founder</span>";
  var checkuser = "<span class='tag'>Checkuser</span>";
  
  rights["ToaMatau2004"]  = inadmin;

  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();

    $(".masthead-info hgroup").append(rights[wgTitle])
  }
});