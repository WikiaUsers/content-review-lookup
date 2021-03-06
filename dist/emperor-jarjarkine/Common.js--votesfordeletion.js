//Global variables.
var closeApprove;
var globalID;
var demarcationID;

/* For the "Votes for deletion" page. Used to show "close" and "delete".
 * Also, for the show/hide feature, as well as the show/hide all one.
 * By: [[User:KettleMeetPot|KettleMeetPot]]
 */

function closeAppear() {
  if ( wgPageName == "Emperor Jarjarkine_Wiki:Votes_for_deletion" && $(".discussions").length > 0 && wgAction != "edit" ) {
    var sAll = 0;
    var modeAll = 2;
    $(".discussions.cls-discuss").hide();
    $(".show-a").html('<a href="javascript:void(0)">[show]</a>');
    $(".hide-a").html('<a href="javascript:void(0)">[hide]</a>');
    $(".s-all").html('<a href="javascript:void(0)">show/hide</a>');
    $(".mode-all").html('(<a href="javascript:void(0)">all</a>)');
    $(".show-a, .hide-a").click(function() {
      var IDa = $(this).attr("id");
      var ClassA = $(this).attr("class").slice(0,6);
      var ClassB = $(this).attr("class").slice(6);
      var dID = "d-" + IDa.slice(-IDa.length + 2);
      if ( IDa.indexOf(".") != -1 || IDa.indexOf(":") != -1) {
       IDa = IDa.replace(/\./g,"").replace(/:/g,"");
       $(this).attr("id",IDa);
       dID = dID.replace(/\./g,"\\.").replace(/:/g,"\\:");
       $("#" + dID).attr("id","d-" + IDa.slice(-IDa.length + 2));
       dID = "d-" + IDa.slice(-IDa.length + 2);
      }
      if ( ClassA == "show-a" ) {
        $("#" + IDa).html('<a href="javascript:void(0)">[hide]</a>');
        $("#" + IDa).attr("class","hide-a" + ClassB);
        $("#" + dID).show();
      }
      if ( ClassA == "hide-a" ) {
        $("#" + IDa).html('<a href="javascript:void(0)">[show]</a>');
        $("#" + IDa).attr("class","show-a" + ClassB);
        $("#" + dID).hide();
      }
    });
    $(".s-all").click(function() {
      if ( modeAll == 0 ) { 
        if ( sAll == 0 ) {
          $(".show-a.open-d").html('<a href="javascript:void(0)">[hide]</a>');
          $(".show-a.open-d").attr("class","hide-a open-d");
          $(".discussions.o-discuss").show();
          sAll = 1;
        }
        else if ( sAll == 1 ) {
          $(".hide-a.open-d").html('<a href="javascript:void(0)">[show]</a>');
          $(".hide-a.open-d").attr("class","show-a open-d");
          $(".discussions.o-discuss").hide();
          sAll = 0;
        }
      }
      if ( modeAll == 1 ) { 
        if ( sAll == 0 ) {
          $(".show-a.closed-d").html('<a href="javascript:void(0)">[hide]</a>');
          $(".show-a.closed-d").attr("class","hide-a closed-d");
          $(".discussions.cls-discuss").show();
          sAll = 1;
        }
        else if ( sAll == 1 ) {
          $(".hide-a.closed-d").html('<a href="javascript:void(0)">[show]</a>');
          $(".hide-a.closed-d").attr("class","show-a closed-d");
          $(".discussions.cls-discuss").hide();
          sAll = 0;
        }
      }
      if ( modeAll == 2 ) { 
        if ( sAll == 0 ) {
          $(".show-a").html('<a href="javascript:void(0)">[hide]</a>');
          $(".show-a.open-d").attr("class","hide-a open-d");
          $(".show-a.closed-d").attr("class","hide-a closed-d");
          $(".discussions").show();
          sAll = 1;
        }
        else if ( sAll == 1 ) {
          $(".hide-a").html('<a href="javascript:void(0)">[show]</a>');
          $(".hide-a.open-d").attr("class","show-a open-d");
          $(".hide-a.closed-d").attr("class","show-a closed-d");
          $(".discussions").hide();
          sAll = 0;
        }
      }
    });
    $(".mode-all").click(function() {
      if ( modeAll == 0 ) {
        $(".mode-all").html('(<a href="javascript:void(0)">closed</a>)');
        modeAll = 1;
      }
      else if ( modeAll == 1 ) {
        $(".mode-all").html('(<a href="javascript:void(0)">all</a>)');
        modeAll = 2;
      }
      else if ( modeAll == 2 ) {
        $(".mode-all").html('(<a href="javascript:void(0)">open</a>)');
        modeAll = 0;
      }
    });
    if ( $.inArray("sysop", wgUserGroups) != -1) {
      $(".Dates").replaceWith(' • <span class="cDelete"><a href="javascript:void(0)">delete</a></span>');
      $(".cDiscuss").html('<a href="javascript:void(0)">close</a>');
      $(".tool-descriptor").html("Administrator toolbar");
      $(".sys-tool").html('<b><a href="javascript:void(0)">archive all</a></b>');
      $(".sys-tool").prepend('<span class="close-select"><b><a href="javascript:void(0)">close select</a></b></span> • ');
      closeApprove = true;  
      archiveClick();
    }
    if ( $(".AJAXRefresh").length > 0 ) {
      $(".AJAXRefresh").html('<a href="javascript:void(0)">Refresh</a>');
      $(".AJAXRefresh").click(function() {
        $(".archive").html('<div style="text-align:center; padding:8px"><img src="https://images.wikia.nocookie.net/__cb61992/common/skins/common/images/ajax.gif"/></div>');
        $.ajax({
          type: "GET",
          url: "http://emperor-jarjarkine.wikia.com/index.php",
          data: { action:'render', title:'Avatar Wiki:Votes for deletion' },
          success: function( data ) {
            var startChar = data.indexOf('<div class="FRow archive" id="Demarc0">');
            var finishChar = data.lastIndexOf('</div>');
            var processedData = data.slice(startChar,finishChar);
            $(".archive").html( processedData );
            closeAppear();
            closeClick();
          }
        });
      });
    }
  }
  else if ( wgPageName == "Emperor Jarjarkine_Wiki:Votes_for_deletion" ) {
    $(".AJAXRefresh").html('<a href="javascript:void(0)">Refresh</a>');
    $(".AJAXRefresh").click(function() {
      $(".archive").html('<div style="text-align:center; padding:8px"><img src="https://images.wikia.nocookie.net/__cb61992/common/skins/common/images/ajax.gif"/></div>');
      $.ajax({
        type: "GET",
        url: "http://emperor-jarjarkine.wikia.com/index.php",
        data: { action:'render', title:'Emperor Jarjarkine:Votes for deletion' },
        success: function( data ) {
          var startChar = data.indexOf('<div class="FRow archive" id="Demarc0">');
          var finishChar = data.lastIndexOf('</div>');
          var processedData = data.slice(startChar,finishChar);
          $(".archive").html( processedData );
          closeAppear();
          closeClick();
        }
      });
    });
  }
}
addOnloadHook(closeAppear);

/* For AJAX refresh checkbox
 * By: [[User:KettleMeetPot|KettleMeetPot]]
 */
$(document).ready(function ajaxCheckbox() {
  if ( wgPageName == "Emperor Jarjarkine_Wiki:Votes_for_deletion" ) {
    var intervalID;
    $(".AJAXrefresher").html('<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" title="Automatically refresh the VfD listing">Auto-refresh:</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxvfdToggle"></span>')
    $("#ajaxvfdToggle").click(function() {
      if ( $("#ajaxvfdToggle").prop("checked") == true ) {
        $(".archive").html('<div style="text-align:center; padding:8px"><img src="https://images.wikia.nocookie.net/__cb61992/common/skins/common/images/ajax.gif"/></div>');
        $.ajax({
          type: "GET",
          url: "http://emperor-jarjarkine.wikia.com/index.php",
          data: { action:'render', title:'Emperor Jarjarkine_Wiki:Votes for deletion' },
          success: function( data ) {
             var startChar = data.indexOf('<div class="FRow archive" id="Demarc0">');
             var finishChar = data.lastIndexOf('</div>');
             var processedData = data.slice(startChar,finishChar);
             $(".archive").html( processedData );
             closeAppear();
             closeClick();
          }
        });
         intervalID = setInterval( function() {
           $(".archive").html('<div style="text-align:center; padding:8px"><img src="https://images.wikia.nocookie.net/__cb61992/common/skins/common/images/ajax.gif"/></div>');
           $.ajax({
             type: "GET",
             url: "http://emperor-jarjarkine.wikia.com/index.php",
             data: { action:'render', title:'Emperor Jarjarkine_Wiki:Votes for deletion' },
             success: function( data ) {
               var startChar = data.indexOf('<div class="FRow archive" id="Demarc0">');
               var finishChar = data.lastIndexOf('</div>');
               var processedData = data.slice(startChar,finishChar);
               $(".archive").html( processedData );
               closeAppear();
               closeClick();
             }
           });           
         }, 60000);
     }
     else {
       clearInterval(intervalID);
     }
    });
  }
});

/* For the "close" and "delete" functions.
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

function closeClick() {
  if ( wgPageName == "Emperor Jarjarkine_Wiki:Votes_for_deletion" && closeApprove == true) {
    $(".cDiscuss").click(function() {
      var ID = $(this).attr("id").replace(/_/g," ");
      globalID = $(this).attr("id");
      demarcationID = $(".FRow:last").attr("id");
      $.ajax({
        type: "POST",
        url: "http://emperor-jarjarkine.wikia.com/api.php",
        data: { action:'query', prop:'revisions', titles:'Emperor Jarjarkine_Wiki:Votes_for_deletion', rvprop:'content' },
        success: function (data) {
           var fsplit = data.split("{{Discussion navigation}}");
           var secsplit = fsplit[1].split("&amp;lt;/dpl&amp;gt;");
           var content = secsplit[0].replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">").replace(/&amp;amp;/g,"&").replace(/<a href=\"/g,"").replace(/\">http:\/\/emperor-jarjarkine.wikia.com\/wiki\/.*<\/a>/g,"");
           var Sliced = content.split("<!-- Demarcation: Do NOT remove this notice -->");
           var demarcation =  parseInt(demarcationID.slice(6),10) + 1;
           var edittoken = mw.user.tokens.get( 'editToken' );
           var consensus;
           importArticles({
             type: "style",
             article: "MediaWiki:Communitydiscussionpages.css"
           });
           $('<div id="dialog-confirm" title="Measure of consensus">What was the outcome of the discussion?</div>').appendTo('body');
           mw.loader.using( ['jquery.ui.dialog', 'jquery.ui.core', 'jquery.ui.position', 'jquery.ui.button', 'jquery.ui.widget'], function () {
             if ( $.attrFn ) { $.attrFn.text = true; }
             $("#dialog-confirm").dialog({
               resizable: false,
               draggable: false,
               height: "auto",
               closeOnEscape: true,
               modal: true,
               buttons: [ {
                text:"Keep", 
                click: function () {
                  consensus = "Page kept.";
                  $(this).dialog("close");
                } },
                {
                text:"Merge",
                id:"merge-button",
                click: function () {
                  $("#merge-button").prop("disabled", true);
                  $("#dialog-confirm").html("What was the outcome of the discussion?<br><br>")
                  $('<div id="dialog-input" style="width: auto; height: auto;">Merge into: <input type="text" name="title" id="pagename-input" placeholder="fullpagename" style="width:40%; margin-right:8px"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" id="Ok-widget-button" style="margin-bottom:4px"><span class="ui-button-text">Ok</span></button></div>').appendTo("#dialog-confirm");
                  $("#Ok-widget-button").click(function() {
                     boxInput = $("#pagename-input").val();
                     consensus = "Page will be merged with [[" + boxInput + "]].";
                     $("#dialog-confirm").dialog("close");
                  });
                } },
                {
                text:"Delete", click: function () {
                  consensus = "Page deleted.";
                  $(this).dialog("close");
                } },
             ],
                close: function(event, ui) {
                  content = "{{Discussion navigation}}" + Sliced[0] + "| T" + demarcation + " = " + ID + " |\n{{Discussion Closed|" + consensus + "}}\n{{subst:Emperor Jarjarkine_Wiki:Votes for deletion/" + ID + "}}" + "\n<!-- Demarcation: Do NOT remove this notice -->" + Sliced[1] + "</dpl>";
                  $.ajax({
                    type: "POST",
                    url: "http://emperor-jarjarkine.wikia.com/api.php",
                    data: { action:'edit', title:'Emperor Jarjarkine_Wiki:Votes_for_deletion', text: content, summary:'Archiving discussion.', token: edittoken },
                  });
                  $.ajax({
                    type: "POST",
                    url: "http://emperor-jarjarkine.wikia.com/api.php",
                    data: { action:'delete', title:'Emperor Jarjarkine_Wiki:Votes_for_deletion/' + globalID, reason:'Closing discussion.', token: edittoken },
                  });
                  window.location.reload();
                }
             });
           });
        }
      });
    });
    $(".cDelete").click(function() {
      var ID = $(this).parent().children(".cDiscuss").attr("id");
      window.open("http://emperor-jarjarkine.wikia.com/wiki/Emperor Jarjarkine_Wiki:Votes_for_deletion/" + ID +"?action=delete&wpReason=Deleting%20irrelevant%20discussion");
    });
  }
}
addOnloadHook(closeClick);

function closeSubmit () {
  var ID = window.opener.globalID.replace(/\.28/g, "(").replace(/\.29/g, ")").replace(/\.27/g, "'");
  window.location = "http://emperor-jarjarkine.wikia.com/wiki/Emperor Jarjarkine_Wiki:Votes_for_deletion/" + ID + "?action=delete&wpReason=Closing%20discussion";
}

/* Immediate return to community discussion page after editing. 
 * Works via ensuring publish editform does not redirect to the listed action page.
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

$(document).ready(function actionSubmit() {
  if ( wgPageName.slice(0,31) == "Emperor Jarjarkine_Wiki:Votes_for_deletion/" && wgAction == "edit" && window.opener == null) {
    $("#editform").attr("target","formresponse"); //target formresponse is an iframe
    $("#editform").attr("onsubmit","formRedirect()");
    $('<iframe name="formresponse" width="20" height="20">#</iframe>').appendTo("#editform"); //appends iframe to editform
    //When publish is clicked, page does not redirect; it stays static but changes still go through.
  }
});

function formRedirect () {
  if (wgPageName.slice(0,31) == "Emperor Jarjarkine_Wiki:Votes_for_deletion/" && wgAction == "edit" && window.opener == null && $("#wpSave").prop("disabled") == true ) {
    window.location = "http://emperor-jarjarkine.wikia.com/wiki/Avatar_Wiki:Votes_for_deletion";
  }
}

/* For the "archive all" function.
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

function archiveClick() {
  if ( wgPageName == "Emperor Jarjarkine_Wiki:Votes_for_deletion" && closeApprove == true ) {
    $(".sys-tool").click(function() {
      importArticles({
        type: "style",
        article: "MediaWiki:Communitydiscussionpages.css"
      });
      $('<div id="dialog-confirm" title="archive all">Are you sure you would like to archive all closed discussions?</div>').appendTo('body');
      mw.loader.using( ['jquery.ui.dialog', 'jquery.ui.core', 'jquery.ui.position', 'jquery.ui.button', 'jquery.ui.widget'], function () {
        if ( $.attrFn ) { $.attrFn.text = true; }
        $("#dialog-confirm").dialog({
          resizable: false,
          draggable: false,
          height: "auto",
          closeOnEscape: true,
          modal: true,
          buttons: [ {
            text:"Yes", 
            click: function () {
              $.ajax({
                type: "POST",
                url: "http://emperor-jarjarkine.wikia.com/api.php",
                data: { action:'query', prop:'revisions', titles:'Avatar_Wiki:Votes_for_deletion', rvprop:'content' },
                success: function (data) {
                  var split = data.split("|}\n{{Format");
                  var content = split[1].split("&amp;lt;!-- Demarcation: Do NOT remove this notice --&amp;gt;")
                  var edittoken = mw.user.tokens.get( 'editToken' );
                  var archive = split[0].split("}}")
                  var fsplit = split[0].split("{{Discussion navigation}}");
                  var archiveNum = fsplit.split("}}");
                  archiveNum = archiveNum[0].slice(-2).replace(/|/,"");
                  var nextArchive = parseInt(archiveNum) + 1;
                  fsplit = fsplit[1].replace(/\| T\d* =/g,"\n==").replace(/\|\n\{\{/g,"==\n{{").replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">").replace("|" + archiveNum + "}}","|" + nextArchive + "}}");
                  var secsplit = content[1].split("&amp;lt;/dpl&amp;gt;");
                  secsplit = secsplit[0].replace(/\| T\d* =/g,"\n==").replace(/\|\n\{\{/g,"==\n{{").replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">");
                  archive = archive[1].slice(-2).replace(/\|/g,"");
                  archive = parseInt(archive) + 1;
                  content = content[0].replace(/\| T\d* =/g,"\n==").replace(/\|\n\{\{/g,"==\n{{").replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">");
                  $.ajax({
                    type: "POST",
                    url: "http://emperor-jarjarkine.wikia.com/api.php",
                    data: { action:'edit', title:'Emperor Jarjarkine_Wiki:Votes_for_deletion/Archive_' + archive, text:"{{talkarchive}}" + content, summary:'Creating new archive', token: edittoken },
                  });
                  $.ajax({
                    type: "POST",
                    url: "http://emperor-jarjarkine.wikia.com/api.php",
                    data: { action:'edit', title:'Emperor Jarjarkine_Wiki:Votes_for_deletion', text: "{{Discussion navigation}}" + fsplit + "|}\n{{Format\n<!-- Demarcation: Do NOT remove this notice -->\n" + secsplit + "</dpl>", summary:'Creating new archive', token: edittoken },
                  });
                }
              });
              $(this).dialog("close");
            } },
            {
            text:"Cancel", click: function () {
              $(this).dialog("close");
              $("#dialog-confirm").remove();
            } },
          ],
        });
      });
    });
  }
}

/* For system dates.
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

/* function sysdate() {
  if ( wgPageName == "Emperor Jarjarkine_Wiki:Votes_for_deletion" ) {
    mw.api.post( {
      action:"query",
      prop:"revisions"
  }
}
*/