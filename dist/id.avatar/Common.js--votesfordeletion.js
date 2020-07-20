/* Any JavaScript here will be loaded for all users on every page load. */
//Global variables.
var closeApprove;
var rawID;

/* For the "Votes for deletion" page. Used to show "close" and "delete".
 * Also, for the show/hide feature, as well as the show/hide all one.
 * By: [[User:KettleMeetPot|KettleMeetPot]]
 */

function closeAppear() {
  if ( wgPageName == "Avatar_Indonesia_Wiki:Pemilihan_untuk_penghapusan" && $(".discussions").length > 0 && wgAction != "edit" ) {
    var sAll = 0;
    var modeAll = 2;
    $(".discussions.cls-discuss").hide();
    $(".show-a").html('<a href="javascript:void(0)">[tunjukkan]</a>');
    $(".hide-a").html('<a href="javascript:void(0)">[sembunyikan]</a>');
    $(".s-all").html('<a href="javascript:void(0)">tunjukkan/sembunyikan</a>');
    $(".mode-all").html('(<a href="javascript:void(0)">semua</a>)');
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
        $("#" + IDa).html('<a href="javascript:void(0)">[sembunyikan]</a>');
        $("#" + IDa).attr("class","hide-a" + ClassB);
        $("#" + dID).show();
      }
      if ( ClassA == "hide-a" ) {
        $("#" + IDa).html('<a href="javascript:void(0)">[tunjukkan]</a>');
        $("#" + IDa).attr("class","show-a" + ClassB);
        $("#" + dID).hide();
      }
    });
    $(".s-all").click(function() {
      if ( modeAll == 0 ) { 
        if ( sAll == 0 ) {
          $(".show-a.open-d").html('<a href="javascript:void(0)">[sembunyikan]</a>');
          $(".show-a.open-d").attr("class","hide-a open-d");
          $(".discussions.o-discuss").show();
          sAll = 1;
        }
        else if ( sAll == 1 ) {
          $(".hide-a.open-d").html('<a href="javascript:void(0)">[tunjukkan]</a>');
          $(".hide-a.open-d").attr("class","show-a open-d");
          $(".discussions.o-discuss").hide();
          sAll = 0;
        }
      }
      if ( modeAll == 1 ) { 
        if ( sAll == 0 ) {
          $(".show-a.closed-d").html('<a href="javascript:void(0)">[sembunyikan]</a>');
          $(".show-a.closed-d").attr("class","hide-a closed-d");
          $(".discussions.cls-discuss").show();
          sAll = 1;
        }
        else if ( sAll == 1 ) {
          $(".hide-a.closed-d").html('<a href="javascript:void(0)">[tunjukkan]</a>');
          $(".hide-a.closed-d").attr("class","show-a closed-d");
          $(".discussions.cls-discuss").hide();
          sAll = 0;
        }
      }
      if ( modeAll == 2 ) { 
        if ( sAll == 0 ) {
          $(".show-a").html('<a href="javascript:void(0)">[sembunyikan]</a>');
          $(".show-a.open-d").attr("class","hide-a open-d");
          $(".show-a.closed-d").attr("class","hide-a closed-d");
          $(".discussions").show();
          sAll = 1;
        }
        else if ( sAll == 1 ) {
          $(".hide-a").html('<a href="javascript:void(0)">[tunjukkan]</a>');
          $(".hide-a.open-d").attr("class","show-a open-d");
          $(".hide-a.closed-d").attr("class","show-a closed-d");
          $(".discussions").hide();
          sAll = 0;
        }
      }
    });
    $(".mode-all").click(function() {
      if ( modeAll == 0 ) {
        $(".mode-all").html('(<a href="javascript:void(0)">tutup</a>)');
        modeAll = 1;
      }
      else if ( modeAll == 1 ) {
        $(".mode-all").html('(<a href="javascript:void(0)">semua</a>)');
        modeAll = 2;
      }
      else if ( modeAll == 2 ) {
        $(".mode-all").html('(<a href="javascript:void(0)">buka</a>)');
        modeAll = 0;
      }
    });
    if ( $.inArray("sysop", wgUserGroups) != -1) {
      $(".Dates").replaceWith(' • <span class="cDelete"><a href="javascript:void(0)">hapus</a></span>');
      $(".cDiscuss").html('<a href="javascript:void(0)">tutup</a>');
      $(".tool-descriptor").html("Bilah alat pengurus");
      $(".sys-tool").html('<b><a href="javascript:void(0)">arsip semua</a></b>');
      $(".sys-tool").prepend('<span class="close-select"><b><a href="javascript:void(0)">tutup dipilih</a></b></span> • ');
      closeApprove = true;  
      archiveClick();
    }
    if ( $(".AJAXRefresh").length > 0 ) {
      $(".AJAXRefresh").html('<a href="javascript:void(0)">Refresh</a>');
      $(".AJAXRefresh").click(function() {
        $(".archive").html('<div style="text-align:center; padding:8px"><img src="https://images.wikia.nocookie.net/__cb61992/common/skins/common/images/ajax.gif"/></div>');
        $.ajax({
          type: "GET",
          url: "https://avatar.fandom.com/index.php",
          data: { action:'render', title:'Avatar Indonesia Wiki:Pemilihan untuk penghapusan' },
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
  else if ( wgPageName == "Avatar_Indonesia_Wiki:Pemilihan_untuk_penghapusan" ) {
    $(".AJAXRefresh").html('<a href="javascript:void(0)">Disegarkan</a>');
    $(".AJAXRefresh").click(function() {
      $(".archive").html('<div style="text-align:center; padding:8px"><img src="https://images.wikia.nocookie.net/__cb61992/common/skins/common/images/ajax.gif"/></div>');
      $.ajax({
        type: "GET",
        url: "https://avatar.fandom.com/index.php",
        data: { action:'render', title:'Avatar Indonesia Wiki:Pemilihan untuk penghapusan' },
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
  if ( wgPageName == "Avatar_Indonesia_Wiki:Pemilihan_untuk_penghapusan" ) {
    var intervalID;
    $(".AJAXrefresher").html('<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" title="Secara otomatis menyegarkan daftar Pup">Auto-refresh:</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxvfdToggle"></span>')
    $("#ajaxvfdToggle").click(function() {
      if ( $("#ajaxvfdToggle").prop("checked") == true ) {
        $(".archive").html('<div style="text-align:center; padding:8px"><img src="https://images.wikia.nocookie.net/__cb61992/common/skins/common/images/ajax.gif"/></div>');
        $.ajax({
          type: "GET",
          url: "https://avatar.fandom.com/index.php",
          data: { action:'render', title:'Avatar Indonesia Wiki:Pemilihan untuk penghapusan' },
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
             url: "https://avatar.fandom.com/index.php",
             data: { action:'render', title:'Avatar Indonesia Wiki:Pemilihan untuk penghapusan' },
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
  if ( wgPageName == "Avatar_Indonesia_Wiki:Pemilihan_untuk_penghapusan" && closeApprove == true) {
    $(".cDiscuss").click(function() {
      rawID = $(this).attr("id").replace(/\.28/g, "(").replace(/\.29/g, ")").replace(/\.27/g, "'").replace(/\.2F/g, "/");
      var ID = rawID.replace(/_/g," ");
      var demarcationID = $(".FRow:last").attr("id");
      $.ajax({
        type: "POST",
        url: "https://avatar.fandom.com/api.php",
        data: { action:'query', prop:'revisions', titles:'Avatar_Indonesia_Wiki:Pemilihan_untuk_penghapusan', rvprop:'content' },
        success: function (data) {
           var fsplit = data.split("{{Navigasi diskusi}}");
           var secsplit = fsplit[1].split("&amp;lt;/dpl&amp;gt;");
           var content = secsplit[0].replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">").replace(/&amp;amp;/g,"&").replace(/<a href=\"/g,"").replace(/\">https:\/\/avatar.fandom.com\/wiki\/.*<\/a>/g,"");
           var Sliced = content.split("<!-- Demarkasi: JANGAN hapus pemberitahuan ini -->");
           var demarcation =  parseInt(demarcationID.slice(6),10) + 1;
           var consensus;
           importArticles({
             type: "style",
             article: "MediaWiki:Communitydiscussionpages.css"
           });
           $('<div id="dialog-confirm" title="Ukuran konsensus">Apa hasil diskusi?</br></br>Catatan: Maksimum 20 diskusi tertutup memungkinkan ruang tampilan di halaman PuP.</div>').appendTo('body');
           mw.loader.using( ['jquery.ui.dialog', 'jquery.ui.core', 'jquery.ui.position', 'jquery.ui.button', 'jquery.ui.widget'], function () {
             if ( $.attrFn ) { $.attrFn.text = true; }
             $("#dialog-confirm").dialog({
               resizable: false,
               draggable: false,
               height: "auto",
               closeOnEscape: true,
               modal: true,
               buttons: [ {
                text:"Tetap", 
                click: function () {
                  consensus = "Halaman ditetapkan.";
                  $(this).dialog("close");
                } },
                {
                text:"Gabung",
                id:"merge-button",
                click: function () {
                  $("#merge-button").prop("disabled", true);
                  $("#dialog-confirm").html("Apa hasil diskusi?<br><br>");
                  $('<div id="dialog-input" style="width: auto; height: auto;">Gabung menjadi: <input type="text" name="title" id="pagename-input" placeholder="fullpagename" style="width:40%; margin-right:8px"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" id="Ok-widget-button" style="margin-bottom:4px"><span class="ui-button-text">Ok</span></button></div>').appendTo("#dialog-confirm");
                  $("#Ok-widget-button").click(function() {
                     boxInput = $("#pagename-input").val();
                     consensus = "Halaman akan digabungkan dengan [[" + boxInput + "]].";
                     $("#dialog-confirm").dialog("close");
                  });
                } },
                {
                text:"Hapus", click: function () {
                  consensus = "Halaman dihapuskan.";
                  $(this).dialog("close");
                } },
             ],
                close: function(event, ui) {
                  var edittoken = mw.user.tokens.get( 'editToken' );
                  content = "{{Navigasi diskusi}}" + Sliced[0] + "| T" + demarcation + " = " + ID + " | " + demarcation + " =\n{{Diskusi Ditutup|" + consensus + "}}\n{{subst:Avatar Indonesia Wiki:Pemilihan untuk penghapusan/" + ID + "}}" + "\n<!-- Demarkasi: JANGAN hapus pemberitahuan ini -->" + Sliced[1] + "</dpl>";
                  $.ajax({
                    type: "POST",
                    url: "https://avatar.fandom.com/api.php",
                    data: { action:'edit', title:'Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan', text: content, summary:'Archiving discussion.', token: edittoken },
                    success: function (data) {
                        window.location = "https://avatar.fandom.com/id/wiki/Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan/" + rawID + "?action=delete&wpReason=Menutup%20diskusi";
                    }
                  });
                }
             });
           });
        }
      });
    });
    $(".cDelete").click(function() {
      var deleteID = $(this).parent().children(".cDiscuss").attr("id").replace(/\.28/g, "(").replace(/\.29/g, ")").replace(/\.27/g, "'");
      window.open("https://avatar.fandom.com/id/wiki/Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan/" + deleteID +"?action=delete&wpReason=Menghapus%20diskusi%20yang%20tidak%20relevan");
    });
  }
}
addOnloadHook(closeClick);

/* Immediate return to community discussion page after editing. 
 * Works via ensuring publish editform does not redirect to the listed action page.
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

$(document).ready(function actionSubmit() {
  if ( wgPageName.slice(0,31) == "Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan/" && wgPageName.slice(31,38) != "Arsip" && wgAction == "view" && window.opener === null) {
    window.location = "https://avatar.fandom.com/id/wiki/Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan?action=purge";
    //When publish is clicked, target location is then redirected
  }
});

/* For the "archive all" function.
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

function archiveClick() {
  if ( wgPageName == "Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan" && closeApprove == true ) {
    $(".sys-tool").click(function() {
      importArticles({
        type: "style",
        article: "MediaWiki:Communitydiscussionpages.css"
      });
      $('<div id="dialog-confirm" title="archive all">Apakah kamu yakin ingin mengarsipkan semua diskusi tertutup?</div>').appendTo('body');
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
                url: "https://avatar.fandom.com/api.php",
                data: { action:'query', prop:'revisions', titles:'Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan', rvprop:'content' },
                success: function (data) {
                  var split = data.split("|}\n{{Format");
                  var content = split[1].split("&amp;lt;!-- Demarkasi: JANGAN hapus pemberitahuan ini --&amp;gt;")
                  var edittoken = mw.user.tokens.get( 'editToken' );
                  var archive = split[0].split("}}\n&amp;lt;div")
                  var fsplit = split[0].split("{{Navigasi diskusi}}");
                  var archiveNum = fsplit[1].split("}}");
                  archiveNum = archiveNum[0].slice(-2).replace(/|/g,"");
                  var nextArchive = parseInt(archiveNum) + 1;
                  fsplit = fsplit[1].replace(/\| T\d* =/g,"\n==").replace(/\| \d* =\n\{\{/g,"==\n{{").replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">").replace("|" + archiveNum + "}}","|" + archiveNum + "|" + nextArchive + "}}");
                  var secsplit = content[1].split("&amp;lt;/dpl&amp;gt;");
                  secsplit = secsplit[0].replace(/\| T\d* =/g,"\n==").replace(/\| \d* =\n\{\{/g,"==\n{{").replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">");
                  content = content[0].replace(/\| T\d* =/g,"\n==").replace(/\| \d* =\n\{\{/g,"==\n{{").replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">");
                  $.ajax({
                    type: "POST",
                    url: "https://avatar.fandom.com/api.php",
                    data: { action:'edit', title:'Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan/Arsip_' + nextArchive, text:"{{Arsippembicaraan}}" + content, summary:'Membuat arsip baru', token: edittoken },
                  });
                  $.ajax({
                    type: "POST",
                    url: "https://avatar.fandom.com/api.php",
                    data: { action:'edit', title:'Avatar_Indoneasia_Wiki:Pemilihan_untuk_penghapusan', text: "{{Navigasi diskusi}}" + fsplit + "|}\n{{Format\n<!-- Demarkasi: JANGAN hapus pemberitahuan ini -->\n" + secsplit + "</dpl>", summary:'Buat arsip baru', token: edittoken },
                  });
                }
              });
              $(this).dialog("close");
            } },
            {
            text:"Batal", click: function () {
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
  if ( wgPageName == "Avatar_Wiki:Votes_for_deletion" ) {
    mw.api.post( {
      action:"query",
      prop:"revisions"
  }
}
*/