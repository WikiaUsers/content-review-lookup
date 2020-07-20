/* recent edits */
  if(wgCanonicalSpecialPageName == 'Chat') {
    window.Version['RecentEdits'] = "2014-08-02 - fixed URI encoding";
  }
  function RecentEdits(forceupdate) {
    if (chatOptions.options.recentEditList == false) {
      return;
      window.clearInterval(window.timerRecentEdits);
    }
 
    if (forceupdate || !window.lastChangeTimestamp) window.lastChangeTimestamp = "1"; // rcend cannot be 0, so lastChangeTimestamp is set to 1 by default.
    $('#RecentEdits').addClass("wait"); // adds hourglass
 
  $.getJSON('/api.php?action=query&format=json&list=recentchanges&rclimit=13&rcshow=!bot'
  +'&rcprop=user|title|ids|timestamp|loginfo&rcexcludeuser='+wgUserName+'&rcend='+window.lastChangeTimestamp, 
  function(result) { 
     if (typeof result == "undefined") return;
     recentchanges = result.query.recentchanges;
     if (!recentchanges.length) return;
 
      if (window.lastChangeTimestamp == "1") {
        $('#RecentEdits').addClass("hover");
        $('#RecentEdits').empty();              // forceupdate, clear old entries
      }
      if (window.lastChangeTimestamp < recentchanges[0].timestamp) {  // if there is a new change
        if (!$('#RecentEdits').size())
          $('#WikiaPage').before('<div id="RecentEdits"></div>');
        if (!$('#RecentEdits').html()) {
          $('#RecentEdits').html('<span id="refresh"><a class="button">force refresh</a></span><span id="label"><span id="X">(close)</span> Last edit: </span>');
          $('#RecentEdits #refresh').click(function() { RecentEdits(1); })
          $('#RecentEdits #X').click(function() { $('#RecentEdits').remove() });
        }
        window.lastChangeTimestamp = recentchanges[0].timestamp;
      }
      if ($('#RecentEdits').size()) {
        recentchanges.reverse();                            //so entries are prepended in the right order
        $(recentchanges).each(function( index, value ) {
          if (!$('#RecentEdits #rcid'+value.rcid).size()) {                  //if entry does not exist
            var linkText = value.title,
                linkHref = encodeURI(value.title.replace(/ /g, "_")).replace(/\?/g, "%3F");
 
            if (value.ns == wgNamespaceIds['thread'] || value.ns == wgNamespaceIds['board_thread']) {
              value.type = "(<a href='/"+linkHref+"?diff=curr'>"+value.type+"</a>) ";
              linkHref = 'Thread:'+value.pageid;
            } else if (value.type == "edit") { 
              linkHref = linkHref+'?diff=prev&oldid='+value.revid;
              value.type = "";
            } else if (value.type == "new") { 
              value.type = " (<a href='/"+linkHref+"?action=history'>new</a>) ";
            } else {
              value.type = " (<a href='/index.php?title=Special:Log&page="+linkHref+"'>"+value.logtype+"</a>) ";
            }
 
            commentType = [];
            commentType[wgNamespaceIds['thread']]            = {1:"Message",    2:"Message reply"};
            commentType[wgNamespaceIds['board_thread']]      = {1:"Forum post", 2:"Forum reply"};
            commentType[wgNamespaceIds['user_blog_comment']] = {1:"Comment",    2:"Comment reply"};
 
            if (value.title.split("/@comment").length > 1) {
              linkHref2 = value.title.split("/@comment")[0]
                         .replace(" comment:", ":")
                         .replace(" talk:", ":")
                         .replace("Board Thread:", "Board:")
                         .replace("Thread:", "Message Wall:");
 
              linkFull = '<a href="/'+linkHref+'" target="_blank">'
                         +commentType[value.ns][value.title.split("/@comment").length-1]
                         +'</a> on <a href="/'+linkHref2+'" target="_blank">'
                         +linkHref2+'</a>';
            } else {
              linkFull = '<a href="/'+linkHref+'" target="_blank">'+linkText+'</a>';
            }
 
            $('#RecentEdits #label').after(
               '<span id="rcid'+value.rcid+'">'
               +value.type 
               +linkFull
               +' by <a href="/Special:Contributions/'+value.user+'" target="_blank">'+value.user+'</a> '
               +' <i class="ago" title="'+value.timestamp+'">'+Math.floor((new Date().getTime()-(new Date(value.timestamp)).getTime())/60000)+' mins ago</i>'
               +'</span>'
            );
          }
        });
 
        $('#RecentEdits .ago').each(function() { //update timestamps
          $(this).html(Math.floor((new Date().getTime()-(new Date($(this).prop("title"))).getTime())/60000)+"  mins ago");
        });
      }
      $('#RecentEdits').removeClass("wait");                                          // removes hourglass
      $('#RecentEdits').removeClass("hover");
  });
 
 
  }
  $(function () {
    window.timerRecentEdits = setInterval('RecentEdits()', 60000);
    RecentEdits();
  });