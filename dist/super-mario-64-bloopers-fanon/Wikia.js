// Cancel Edit button
 
$(function addCancel () {
  if (typeof(wgIsEditPage) != 'undefined') { 
    $('<span id="cancelbutton" class="button" style="margin-top:2px, text-decoration: none;"><a id="cancelbuttontext" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF; text-decoration:none;">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});

 
// Adds a "Logs" tab to User Mastheads
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

// Back To Top Button Config
 
window.BackToTopText = "Jump to top";
window.BackToTopSpeed = 600;
window.BackToTopStart = 800;

// Makes ProfileTags overrride existing tags

(window.dev = window.dev || {}).profileTags = { noHideTags: false };