/* Any JavaScript here will be loaded for all users on every page load. */

// 
 
  function liveClock() {
  	var link = wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge';
  	if (skin == 'monobook') {
  		$('#p-personal .pBody ul').append('<li id="utcdate"><a href="'+link+'"></a></li>');
  	} else if (skin == 'oasis') {
  		$('#WikiaPage #WikiHeader div.buttons').prepend('<div id="utcdate"><a href="'+link+'"></a></div>');
  	}
  	$('#utcdate').css({fontSize: 'larger', fontWeight: 'bolder', textTransform: 'none'});
 
  	showTime();        
  }
  addOnloadHook(liveClock);
 
  function showTime() {
  	var now = new Date();
  	var hh = now.getUTCHours();
  	var mm = now.getUTCMinutes();
  	var ss = now.getUTCSeconds();
  	var dd = now.getUTCDate();
  	var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  	    month  = months[now.getUTCMonth()];
  	var year   = now.getUTCFullYear();
  	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss ) + ', ' + ( dd < 10 ? '0' + dd : dd ) + ' ' + month + ' ' + year + ' (UTC)';
  	$('#utcdate a').text(time);
 
  	window.setTimeout(showTime, 1000);
  }
 
  //

function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags
 
    rights["Styracosaurus Rider"] = ["The Guy Who Fools Around In This Place"];
 
  // END List of Accounts Given Extra User Rights Icons

// BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New

};