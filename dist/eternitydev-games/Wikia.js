/* Any JavaScript here will be loaded for all users on every page load. */
function customusertags() {
  var usertags = {}, userstars = {}; userstars["Check"] = {}; //variables

/* Adding icons */
    userstars["Check"]["JohnnyHarden"] = ["King."];
/* Icon definitions */
  var stars = {};
  stars = ["Check"];  //Defining available stars, for later.

  var starname = {};   //Set display name 
  starname["Check"] = "Check Mark";

  var starfile = {};   //Set filename 
  starfile["Check"] = "https://vignette.wikia.nocookie.net/errored/images/3/32/V3.png/revision/latest?cb=20181123123137";

  var currentuser = $('.UserProfileMasthead .masthead-info h1').html();
  if (typeof currentuser != "undefined") { //Only proceed if it's a user page

    if (typeof usertags[currentuser] != "undefined") {
      $('.UserProfileMasthead .masthead-info span.tag').remove();  // remove old tags
      for( var i=0, len=usertags[currentuser].length; i < len; i++)
        $('<span class="tag">' + usertags[currentuser][i] + '</span>').appendTo('.masthead-info hgroup');
    }

    for( var i=0, lena=stars.length; i < lena; i++)
      if (typeof userstars[stars[i]][currentuser] != "undefined")
        for( var j=0, lenb=userstars[stars[i]][currentuser].length; j < lenb; j++)
          $('<img src="'+starfile[stars[i]]+'" title="' + userstars[stars[i]][currentuser][j] + '" class="userstar '+stars[i]+'">').appendTo('.masthead-info hgroup');

  }
}
addOnloadHook(customusertags);

// "Logs" tab

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds; $(".tabs-container > ul.tabs").html(news);
});

$(function() {
    $.getJSON('/api.php?action=parse&text={{Random}}&format=json', function(data) {
        $('#WikiaArticle').prepend(data.parse.text['*']);
    });
});

$(function addCancel () { 
  if (typeof(wgIsEditPage) != 'undefined') { 
  $('<span id="cancelbutton" class="button" style="margin-top:2px, ' + 
   'text-decoration:none"><a id="cancelbuttonlink" href="/wiki/' + 
   wgPageName +'"><span style="color:#FFFFFF">Stop Editing</span></a></span>')
   .prependTo('#EditPageHeader h2');}
});

$(function() {
    var newSection = '<div><a href="' + 
      'https://advanced-education-with-viktor-strobovski.wikia.com/wiki/Advanced_Education_With_Viktor_Strobovski_Wiki' + '"><img src="' + 
      'https://vignette.wikia.nocookie.net/whateveryoulike/images/3/33/Vic.png/revision/latest?cb=20181128145822' + '" width="' + 
      '320' + '" height="' + 
      '260' + '" /></a></div>';
    $('#WikiaRail').append(newSection);
});