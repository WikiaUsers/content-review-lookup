// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgAction = mw.config.get( 'wgAction' );
var wgPageName = mw.config.get( 'wgPageName' );

if (wgAction == 'history') {   // Don't do anything unless we're on a History page.

// Grab the Compare buttons, create an empty link after each, and grab the empty links
   var submitButton = $('.historysubmit:submit');
   submitButton.after("<a class='diffURL' style='border:#999 1px dashed; padding:2px 4px 2px 4px;'></a>");
   var displayDiffField = $('.diffURL');

// Grab the initial revision selections
   var displayDiffNew = $('[name="diff"]:checked').slice(0,1).attr('value');
   var displayDiffOld = $('[name="oldid"]:checked').slice(0,1).attr('value');

// Set the initial main diff link URL, text, & tooltip, add arrow between Compare button and link
   displayDiffField.text("http://terraria-fr.gamepedia.com/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
   displayDiffField.attr("href", "http://terraria-fr.gamepedia.com/w/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
   displayDiffField.attr('title', 'http://terraria-fr.gamepedia.com/w/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);
   displayDiffField.before("<b> → </b>");

// Grab initial revision size fields
   var displayDiffSizeNew = $('[name="diff"]:checked').slice(0,1).parent('li').find('.history-size');
   var displayDiffSizeOld = $('[name="oldid"]:checked').slice(0,1).parent('li').find('.history-size');

// Add diff link before initial revision sizes. Using a link contained in a <span> allows us to refer back to the entire added text using its class.
   var displayDiffMobileNew = displayDiffSizeNew.before('<span class="historyDiffLink">(<a href="http://terraria-fr.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">DIFF</a>‎) . . </span>');
   var displayDiffMobileOld = displayDiffSizeOld.before('<span class="historyDiffLink">(<a href="http://terraria-fr.gamepedia.com/w/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">DIFF</a>‎) . . </span>');

// Set tooltip for the size diff link
   $('.historyDiffLink').find('a').attr('title', 'http://terraria-fr.gamepedia.com/w/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

// Set the Click event function for radio buttons
   $(":radio").click(function(){   

   // Clear existing revision size links
      $('.historyDiffLink').remove();

   // Grab the revision selection, place in appropriate var
      if ($(this).attr('name') == 'oldid') displayDiffOld = $(this).attr('value');
      if ($(this).attr('name') == 'diff') displayDiffNew = $(this).attr('value');

   // Update the main diff link URL, text, & tooltip
      displayDiffField.attr("href", "http://terraria-fr.gamepedia.com/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
      displayDiffField.text("http://terraria-fr.gamepedia.com/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
      displayDiffField.attr('title', 'http://terraria-fr.gamepedia.com/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

   // Grab new revision size fields
      displayDiffSizeNew = $('[name="diff"]:checked').slice(0,1).parent('li').find('.history-size');
      displayDiffSizeOld = $('[name="oldid"]:checked').slice(0,1).parent('li').find('.history-size');

   // Add diff link before revision sizes
      var displayDiffMobileNew = displayDiffSizeNew.before('<span class="historyDiffLink">(<a href="http://terraria-fr.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">DIFF</a>)‎ . . </span>');
      var displayDiffMobileOld = displayDiffSizeOld.before('<span class="historyDiffLink">(<a href="http://terraria-fr.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">DIFF</a>) . . </span>');

   // Set tooltip for the size diff link
      $('.historyDiffLink').find('a').attr('title', 'http://terraria-fr.gamepedia.com/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

   });

}