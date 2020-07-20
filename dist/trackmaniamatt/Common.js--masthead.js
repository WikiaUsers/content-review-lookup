$(function() {
 var rights = {};

   //Admin
 rights["DaGrantstanator"]            = ["Doncaster Pacific"];
 rights["EddsWorldFanTordandDom"]          = ["Doncaster Pacific"];
 rights["Mattmomdad3455"]          = ["Doncaster Pacific"];
 rights["Twins9and10"]            = ["Doncaster Pacific"];
 rights["DoncasterA1"]             = ["Doncaster Pacific"];
 
  if (typeof rights[wgTitle] != "undefined") {
      $('.UserProfileMasthead .masthead-info span.tag').remove();
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
});