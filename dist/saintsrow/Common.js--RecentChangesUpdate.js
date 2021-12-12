//<!--
//Inspired by another script, but written from scratch.

if(typeof debug452 == "function") debug452("start of RecentChangesUpdate");

$(function() {
  if($(".oo-ui-widget").length) return; //UCP has an inferior replacement... that is even lazy loaded.
  if($("#RCUui").length) {
    return; //there can be only one.
  }

  var RCUthrobber = '<img src="https://static.wikia.nocookie.net/saintsrow/images/0/05/Ajax.gif" style="vertical-align:top;height:21px;" border="0" alt="Updating page" title="Updating page" />';
  window.title = $("title").html();
  window.RCUlast = 0; //5 second check
  var RCUstate = 0; //throbber
  var RCUactivity = 1; //backdate check

  $(".rclistfrom a[href*='?from=']").after(' <div id="RCUui" style="display:inline-block;"><input id="RCUbutton" type="button" value="Update" style="cursor: pointer;" title=""><span id="RCUthrobber">'+RCUthrobber+'</span><span id="RCUstatus"></span></div>');
  $("#RCUbutton").on("click", function(){ RCUrefresh("click"); });
  $(document).on('RecentChangesComplete', function(){
    if (typeof $(".mw-collapsible").makeCollapsible == "function") $(".mw-collapsible").makeCollapsible();
    $('a[data-uncrawlable-url], span[data-uncrawlable-url]').off().each(function () {
      $(this).replaceWith($(this).prop('outerHTML').replace("span", "a"));
      $(this).attr('href', window.atob($(this).attr('data-uncrawlable-url')));
    });
  });
  $(window)
   .off("blur").on("blur", function() { window.hasFocus = false; })
   .off("focus").on("focus", function() {
     $("title").html(window.title);
     window.hasFocus = true;
     RCUrefresh("focus");
  });

  function RCUstatus(status, onoff) {
    RCUstate += onoff;
    $("#RCUstatus").html(status+(onoff>0?"":new Date().toISOString()));
    $("#RCUthrobber").css({"display":RCUstate?"inline-block":"none"});
  }
  RCUstatus(" Loaded ", 0);
  function RCUend(details, activity) {
    if(typeof debug452 == "function") debug452("RCUend: "+details+" "+RCUstate);
    RCUactivity = activity?1:0;
    if(!RCUstate) {
      $("#RCUbutton").attr("title","Click to check for new edits");
      $(document).trigger('RecentChangesComplete');
    }
  }
  function RCUrefresh(source) {
    clearTimeout(window.RCUtimeout);
    window.RCUtimeout = setTimeout(function(){ RCUrefresh("timer"); }, 60000);
    if(typeof ajaxTimer != "undefined") clearTimeout(ajaxTimer); //there can be only one.
    localStorage.setItem('AjaxRC-refresh', false);               //there can be only one.
    $("#ajaxRefresh").remove();                                  //there can be only one.

    if(window.RCUlast && new Date().getTime() - window.RCUlast< 5000) {
      if (source == "click") RCUstatus(" Checked "+ ((new Date().getTime() - window.RCUlast)/1000).toFixed(2) +" seconds ago. ", 0);
      return;
    }
    window.RCUlast = new Date().getTime();

    if(RCUstate) {
      if(typeof debug452 == "function") debug452("RCUstate != 0, last request probably timed out.");
      RCUstate = 0;
    }

    d = d0 = ($(".rclistfrom a[href*='?from=']").attr("href").split("from=")[1].split("&")[0]*1)+"";
    if (RCUactivity) d = ((d*1) - ((d.substr(11,1) == 0?0:100)+(d.substr(12,2)*1)))+"";
    //to-do: stop working with d, convert to z
    // The log check sets .attr("timestamp") first, so it should be safe to use this for next check.

    if ($("#RCUui").attr("logtimestamp")) {
      ld = ($("#RCUui").attr("logtimestamp").replace(/[^0-9]/g,"").substr(0,14))+"";
      if (RCUactivity) ld = ((ld*1) - ((ld.substr(11,1) == 0?0:100)+(ld.substr(12,2)*1)))+"";
    } else ld = d;

    var RCUurl = window.location.origin+$(".rclistfrom a[href*='?from=']").attr("href").replace(d0,d);
    var RCUlog = window.location.origin+"/wiki/Special:Log/newusers?dir=prev&type=newusers&offset="+ld;
    z = d.substr(0,4)+"-"+d.substr(4,2)+"-"+d.substr(6,2)+"T"+d.substr(8,2)+":"+d.substr(10,2)+":"+d.substr(12,2)+"Z";
    lz = ld.substr(0,4)+"-"+ld.substr(4,2)+"-"+ld.substr(6,2)+"T"+ld.substr(8,2)+":"+ld.substr(10,2)+":"+ld.substr(12,2)+"Z";
    if(typeof debug452 == "function") debug452(source+" "+d+" "+z+" "+ld+" "+lz);

    RCUstatus(" Checking", 1);
    $.getJSON('/api.php?action=query&format=json&lelimit=1&list=logevents&leaction=newusers/create&leend='+lz, function(result) {
      RCUstatus(" Checked: ", -1);
      if(!result.query.logevents.length) return RCUend("No new newuser logs");
      if($("#RCUui").attr("logtimestamp") == result.query.logevents[0].timestamp) return RCUend("Duplicate newuser logs");
      RCUstatus(" Loading", 1);
      $.get(RCUlog, function(newRClog) {
        RCUstatus(" Updated: ", -1);
        if(!$(".mw-logline-newusers", newRClog).text()) return RCUend("Empty newuser page");
        $("#RCUui").attr("logtimestamp", result.query.logevents[0].timestamp); //set here to avoid timeouts.
        $(".mw-changeslist div").eq(0).prepend($("#mw-content-text>ul",newRClog));

        $(".mw-logline-newusers").each(function(){
          if($(".mw-logline-newusers[data-mw-logid="+$(this).attr("data-mw-logid")+"]").length > 1) {
            if(typeof debug452 == "function") debug452("removed duplicate log "+$(this).attr("data-mw-logid"));
            $(this).remove();
          }
        });
        RCUend("newuser log loaded",1);
      });
    });

    RCUstatus(" Checking", 1);
    $.getJSON('/api.php?action=query&format=json&rclimit=1&list=recentchanges&rcend='+z, function(result) {
      RCUstatus(" Checked: ", -1);
      if(!result.query.recentchanges.length) return RCUend("No new RC logs");
      if($("#RCUui").attr("timestamp") == result.query.recentchanges[0].timestamp) return RCUend("Duplicate RC logs");
      RCUstatus(" Loading", 1);

      $.get(RCUurl, function(newRCpage) {
        RCUstatus(" Loaded: ", -1);
        if(!$(".mw-changeslist", newRCpage).text()) return RCUend("Empty RC page");
        if($("#RCUui").attr("timestamp") == result.query.recentchanges[0].timestamp) return RCUend("Duplicate RC race condition");
        $("#RCUui").attr("timestamp", result.query.recentchanges[0].timestamp); //set here to avoid timeouts.
        RCUstatus(" Formatting", 1);
        $("#mw-content-text").css({"display":"none"});
        $(".mw-changeslist").eq(0).before($(".mw-changeslist", newRCpage));
        $(".rclistfrom a[href*='?from=']")[0].outerHTML = $(".rclistfrom a[href*='?from=']", newRCpage)[0].outerHTML;
        if($(".mw-changeslist h4").eq(0).html() == $(".mw-changeslist h4").eq(1).html()) $(".mw-changeslist h4").eq(1).remove();
        if($(".mw-changeslist h4").eq(1).html() == $(".mw-changeslist h4").eq(2).html()) $(".mw-changeslist h4").eq(2).remove();
        $(".mw-changeslist").css({"min-height":"0", "border-top":""});
        $(".mw-changeslist:first+.mw-changeslist").css({"border-top":"1px dotted black"});
        $(".mw-changeslist:last").css({"border-top":"1px dotted black"});

        $(".mw-changeslist-line", $(".mw-changeslist").eq(0)).each(function(){
          if($(".mw-changeslist-line[data-mw-logid="+$(this).attr("data-mw-logid")+"]").length > 1) {
            if(typeof debug452 == "function") debug452("removed duplicate log "+$(this).attr("data-mw-logid"));
            $(this).remove();
          }
          if($(".mw-changeslist-line[data-mw-revid="+$(this).attr("data-mw-revid")+"]").length > 1) {
            if(typeof debug452 == "function") debug452("removed duplicate "+$(this).attr("data-mw-revid"));
            $(this).remove();
          }
        });

        $("table.mw-changeslist-line.mw-collapsible", $(".mw-changeslist").eq(0)).each(function(){
          $(".mw-changeslist-groupdiff", this).text(($("tr",this).length-1)+" changes");
          if ($("tr",this).length == 1) { //collapsible is empty, contents removed previously
            $(this).remove(); 
          }
          if($("tr",this).length == 2) { //collapsible contains 1 child
            $(".mw-changeslist-separator, .mw-diff-bytes, .changedby", $("tr",this).eq(0)).remove();
            $(".mw-enhanced-rc-time, .mw-changeslist-diff, .mw-changeslist-diff-cur", $("tr",this).eq(1)).remove();
            $("tr .mw-changeslist-line-inner",this).append($(".mw-enhanced-rc-nested[data-target-page]", $("tr",this)).html().replace(" ( | )",""))
            $("tr",this).addClass("mw-collapsed");
            $(".mw-collapsible-arrow",this).removeClass("mw-collapsible-arrow");
          } 
          if($("table.mw-changeslist-line.mw-collapsible[data-mw-ts="+$(this).attr("data-mw-ts")+"]").length > 1) { //should never happen.
            if(mw.config.get("wgUserName") == "452") $(this).css({"background":"yellow"});
          }
        });

        $("#mw-content-text").css({"display":"block"});

        if($(".mw-changeslist").eq(0).html().replace(RegExp("/Special:Block/"+mw.config.get("wgUserName"),"g"),"").indexOf("/Special:Block/") != -1) {
          if(!window.hasFocus) $("title").html("! "+window.title);
        }
        RCUstatus(" Updated: ", -1);

        RCUend("RC Update complete",1);
      });
    });
  } // end RCUrefresh

  RCUrefresh("start");

});