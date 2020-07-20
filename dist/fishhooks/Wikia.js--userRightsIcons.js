// WRITTEN BY USER:RAPPY_4187

$(function() {
  var rights = {};
  var crat      = "<span class='group'><a style='color:black;' href='http://fishhooks.wikia.com/index.php?title=Fish Hooks Wiki:Administrators'>Bureaucrat</a></span>";
  var admin     = "<span class='group'><a style='color:black;' href='http://fishhooks.wikia.com/index.php?title=Fish Hooks Wiki:Administrators'>Sysop</a></span>";
  var roll      = "<span class='group'><a style='color:black;' href='http://fishhooks.wikia.com/index.php?title=Help:Recent changes patrol'>Recent changes patrol</a></span>";
  var bot       = "<span class='group'>Bot</span>";
  var founder   = "<span class='group'>Founder</span>";
  var checkuser = "<span class='group'>Checkuser</span>";
  var cmod      = "<span class='group'>Chat Moderator</span>";

  rights["Ayranci"]= admin;
  rights["Lagom"]  = founder;
  rights["Jihye"]  = crat;

 

 
  if (typeof rights[wgTitle] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.group').remove();

    $(".masthead-info hgroup").append(rights[wgTitle])
  }
});