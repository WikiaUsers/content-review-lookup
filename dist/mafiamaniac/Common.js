/* Any JavaScript here will be loaded for all users on every page load. */
/* show/hide collapsible stuff */
var ShowHideConfig = { autoCollapse: 3};
importScriptPage('ShowHide/code.js', 'dev');

/*Ambox template*/
importStylesheet("Template:Ambox/code.css");

/*remove tooltips from links on navbuttonmenu - facepalm*/
   //Nana commented out code below 12/8/14 to fix inline images disappearing
   //wgAfterContentAndJS.push(function() {
   //$(".buttonmenu").find("a").removeAttr("title");
/*remove secondary links in RSS feeds*/
   //$("a:contains('?')").parent().hide();
   //});

/*testing jquery use - work in progress*/
 wgAfterContentAndJS.push(function() {

/*History of Mafia column hide*/
$("table.history").prepend("<tr><th colspan=8><span class='collapseButton'>  [<span tabindex='0' class='minLink' style='cursor: pointer;'>Click to hide roster</span><span tabindex='0' class='maxLink' style='cursor: pointer;'>Click to show the complete roster for Games</span>]</span></span></th></tr>");
$('.minLink').click(function(){
  $('.minLink').hide();
  $('.maxLink').show();
  $('td:nth-child(4)').hide();
});
$('.maxLink').click(function(){
  $('.maxLink').hide();
  $('.minLink').show();
  $('td:nth-child(4)').show();
});
$('.minLink').trigger('click');


 if(skin=="oasis")
 {

  //Force CKEditor to go to Source view
  if (wgAction=="edit" && wgIsEditPage)
   { 
     //this is a terrible way of doing it :( 
     //No longer working since September 2011 because of Wikia upgrade :(
     $('body').bind('rteready',function() {
      if(RTEInitMode=="wysiwyg") {
        RTE.modeSwitch("wysiwyg");}
      });

    //not working
    //if(RTEInitMode=="wysiwyg")   { $("#cke_21").click(); }
    
    //Show the MM Custom Toolbox
    $(".mw-editTools").show();
   }


  //for logged in users
  if (wgIsLogin)
   {
    //Force add edit button
    $('ul.tools:not(:contains("Edit"))').prepend("<li class='overflow'><a href='http://mafiamaniac.wikia.com/?title="+wgPageName+"&action=edit'>Edit</a></li>");

    //Quick-preview Monobook skin.
     $('ul.tools').append("<li class='overflow'><a class='tools-changeskin' href='http://mafiamaniac.wikia.com/?title="+wgPageName+"&useskin=monobook'>Light preview</a></li>");

    /*$('ul.tools').append("<li class='skin-choose menu' id='skin-choose'><a href='#'><img height='16' width='16' class='gear-icon' src='https://images.wikia.nocookie.net/__cb34568/common/skins/common/blank.gif'>Change skin</a><ul id='skin-change-menu' class='tools-menu'><li class='overflow'><a class='tools-changeskin' href='http://mafiamaniac.wikia.com/?title="+wgPageName+"&useskin=monobook'>Light Skin</a></li></ul></li>");
    new HoverMenu("#skin-choose");*/

    //add a link to the MM forum - smaller pic to avoid browser resize from 24px to 16px!
    $('ul.tools').append("<li class='overflow'><a href='http://forum.mafiamaniac.net/' target='_blank'><img height='16' width='16' class='icon' src='http://mafiamaniac.net/img/Misc/mmfav16.png'>Forum</a></li>");
   }
   //else not logged in
 } 
 //else skin==monobook
 });