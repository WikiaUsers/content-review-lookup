// ============================================================ 
// wikiSidething 
// from Brickipedia 
// Function: Adds a new sidebar element 
// ============================================================

$(function() { 
  if(skin == "oasis") { var $sidebar = $('.WikiaPagesOnWikiModule:first'); var comboString = "<div id='mosbox' style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>So you want to join? EXCELLENT. Just contribute to a page and your Wikian Monk journey will begin. <br /></td><td style='text-align:right'><a href='http://shengonwu.wikia.com/wiki/Xiaolinpedia:Manual of Style' target='_top'><img src='https://images.wikia.nocookie.net/__cb20120213064318/shengonwu/images/thumb/4/4a/Dojo.png/210px-Dojo.png' alt='The Dojo seal of approval' border=0 /></a></td></tr></table></div>";

$sidebar.html($sidebar.html() + comboString); } else if(skin == "monobook") { var $sidebar = $('#p-wikicities-nav'); var comboString = "<div id='mosbox' style='margin:5px'><h5>A few Notes</h5><div style='margin-top:5px; margin-bottom:5px;background-color:#ececec'><table style='width:100%'><td style='*'><a href='http://tardis.wikia.com/wiki/Game of Rassilon'><strong>The Game of Rassilon</strong></a> isn't available in this skin, but you <a href='http://tardis.wikia.com/wiki/Special:Leaderboard?useskin=wikia'>can check your score without leaving Monobook.</a><hr> Also, you can <strong>join the chat</strong> by <a href='http://tardis.wikia.com/wiki/Special:Chat?useskin=wikia'>clicking here.</a></a></td></table></div></div>"; $sidebar.html($sidebar.html() + comboString); } });