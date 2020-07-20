/* Any JavaScript here will be loaded for all users on every page load. */
/* For the "FanonSubModule" page, used for mass posting on message walls
 * This function deals with the aesthetics and functionality of the mainframe
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */

$(document).ready(function () {
 if ( wgPageName == "Avatar_Indonesia_Wiki:FanonSubModule" ) {
  var allowCheck;
  var cooldown;
  $.ajax({
    type: "GET",
    url: "https://avatar.fandom.com/api.php",
    data: { action:'query', prop:'revisions', titles:'Avatar_Indonesia_Wiki:FanonSubModule/CheckPage', rvprop:'content' },
    success: function ( data ) {
      var match = data.search( wgUserName );
      if ( match == -1 || wgUserName == null ) {
        allowCheck = false;
      }
      else {
        allowCheck = true;
        var months = [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ];
        var days = [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu" ];
        var searchTerm = "* '''" + wgUserName + "''': On " + days[new Date().getUTCDay()] + ", " + new Date().getUTCDate() + " " + months[new Date().getUTCMonth()] + " " + new Date().getUTCFullYear();
        $.ajax({
          type: "GET",
          url: "https://avatar.fandom.com/api.php",
          async: false,
          data: { action:'query', prop:'revisions', titles:'Avatar_Indonesia_Wiki:FanonSubModule', rvprop:'content' },
          success: function ( data ) {
            if ( data.indexOf(searchTerm) == -1) {
              cooldown = false;
            }
          }
        });
      }
      if ( allowCheck == true && cooldown == false ) {
        var timer;
        $(".subinputbox").html('<input class="usersearchbox" type="text" tabindex="1" value="" placeholder="Nama pengguna" style="width:102%" dir="ltr">');
        $(".results").html('<select multiple="" size="7" title="Matched users" tabindex="2" style="width:100%" disabled=""></select>');
        $(".endlist").html('<textarea id="endlistmessage" tabindex="3" rows="13" style="resize:none; width:97%" placeholder="i.e Pengguna:Contoh"></textarea>');
        $(".resultsbuttons").html('<input type="button" value="↧" style="height:30px; margin-bottom:4px; margin-left:2px" disabled="disabled">');
        $(".messageform").html('<input type="text" style="width:75%" id="messagetitle" tabindex="4" placeholder="Masukkan judul"><br><textarea id="messagebody" tabindex="5" rows="7" style="resize:none; width:97%" placeholder="Masukkan pesanan"></textarea><button id="messagePreview" class="preview secondary" disabled="disabled">Pratayang</button><button id="messageSubmit" style="margin-left:10px;" class="submit" disabled="disabled">Kirim</button>');
        $(".usersearchbox").keyup(function() {
          clearInterval(timer);
          timer = setTimeout(function() {
            checkSum();
          }, 500);
        });
        $("#messagebody").keyup(function() {
          var messageValue = $("#messagebody").val();
          if ( messageValue == "" ) {
            $("#messagePreview").prop("disabled", true);
            $("#messageSubmit").prop("disabled", true); //Bookmark for change
          }
          else {
            $("#messagePreview").prop("disabled", false);
            $("#messageSubmit").prop("disabled", false); //Bookmark for change
          }
        });
        $("#messagePreview").click(function() {
          var messageValue = $("#messagebody").val();
          var messageTitle = $("#messagetitle").val();
          var documentHeight = $(document).height();
          $("#messagePreview").prop("disabled", true);
          $.ajax({
            type: "POST",
            url: "https://avatar.fandom.com/wikia.php?controller=WallExternal&method=preview&format=json",
            headers: { accept: 'application/json, text/javascript, */*; q=0.01' },
            data: { body: messageValue, convertToFormat:'' , metatitle: messageTitle },
            success: function ( data ) {
              $("body").append('<section class="modalWrapper preview" id="PreviewWrapper" style="bottom: 25%; left: 22.5%; width: 55%; z-index: 2000000002; position: fixed;"><button class="close wikia-chiclet-button"><img src="https://images.wikia.nocookie.net/__cb62025/common/skins/oasis/images/icon_close.png"></button><h1>Pratayang</h1><section class="modalContent"><div><div class="WallPreview" style="font-size:13px; border:1px solid #e5dfc6; min-height: 300px; position: relative;"><div class="WikiaArticle" style="width: 590px; padding-top:10px">' + data["body"] + '</div></div><div class="neutral modalToolbar"><a id="close" class="wikia-button secondary">Kembali</a></div></div></div></section></section><div class="blackout" data-opacity="0.65" style="height: ' + documentHeight + 'px; width: 1263px; z-index: 2000000001; opacity: 0.65; display: block;"></div>');
              $(".msg-title").attr("style","font-weight:bold; font-size:18px;");
              $(".wikia-chiclet-button,.blackout,#close").click(function() {
                $("#PreviewWrapper,.blackout").fadeOut("fast","linear", function () { 
                  $("#PreviewWrapper,.blackout").remove();
                });
                $("#messagePreview").prop("disabled", false);
              });
            }
          });
        });
        $("#messageSubmit").click(function() {
          var messageValue = $("#messagebody").val();
          var messageTitle = $("#messagetitle").val();
          var usersList = $("#endlistmessage").val().split("\n");
          var finalList = usersList.slice(0,50);
          $("#submassform").animate({height:"81px"});
          $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Modul Berlangganan Massa Fanon </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px; padding-left:8px"> <div class="floatleft"><img alt="Informasi" src="http://i1338.photobucket.com/albums/o690/KettleMeetPot/ajax-loader_zps9261ad29.gif" width="35" height="35" style="margin-top:8px"></div> <div style="margin-left:45px"><big><b>Bekerja:</b></big><br> <p> Jangan menyegarkan browser webmu atau meninggalkan halaman. Terima kasih atas kesabaranmu. </p></div> </td></tr></tbody></table>');
          var token = mw.user.tokens.get( 'editToken' );
          for (var i = 0; i < finalList.length; i++) {
            var userToMessage = finalList[i].slice(5);
            $.ajax({
              type: "POST",
              url: "https://avatar.fandom.com/wikia.php?controller=WallExternal&method=postNewMessage&format=json",
              data: { body: messageValue, messagetitle: messageTitle, notifyeveryone:'0', pagenamespace:'1200', pagetitle: userToMessage, token:token },
            });
          }
            $.ajax({
              type: "POST",
              url: "https://avatar.fandom.com/api.php",
              data: { action:'query', prop:'revisions', titles: 'Avatar_Indonesia_Wiki:FanonSubModule', rvprop:'content'},
              success: function( data ) {
                var contentlog = data.split('<span style="color:blue;">&lt;rev xml:space=&quot;preserve&quot;&gt;</span>');
                var content;
                var testerlog = contentlog[1].search("script type");
                if ( testerlog == -1 ) {
                  content = contentlog[1].slice(0,-370).replace(/&amp;quot;/g,'"').replace(/&amp;lt;/g,"<").replace(/&amp;gt;/g,">").replace(/<a href=\"http:\/\/avatar.fandom.com\/wiki\//g,"[").replace(/\">.*\]<\/a>/g,"]");
                }
                else {
                  content = contentlog[1].slice(0,-928).replace(/&amp;quot;/g,'"').replace(/&amp;lt;/g,"<").replace(/&amp;gt;/g,">").replace(/<a href=\"http:\/\/avatar.fandom.com\/wiki\//g,"[").replace(/\">.*\]<\/a>/g,"]]");
                }
                var usersLogger = finalList.join(", ").replace(/User:/g,"");
                var lister = content.split('<!-- Demarkasi -->');
                var logger = lister[0] + "\n* '''" + wgUserName + "''': On {{subst:" + "#time:l, d F Y}}, at " + "{{subst:" + "#time:H:i}}. '''Pesan''': '" + messageTitle + ": <i>" + messageValue + "</i>', '''To''': " + usersLogger  + ".\n<!-- Demarkasi -->\n}}";
                $.ajax({
                  type: "POST",
                  url: "https://avatar.fandom.com/api.php",
                  data: { action:'edit', title: 'Avatar_Indonesia_Wiki:FanonSubModule', text:logger, bot:'true', summary:'Usage of FanonSubModule: adding entry', token: token },
                  success: function( data ) {
                    $("#submassform").removeAttr("style");
                    $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Modul Berlangganan Massa Fanon </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px; padding-left:8px"> <div class="floatleft"><img alt="Informasi" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/90px-Information.png"></div> <div style="margin-left:45px"><big><b>Tindakan Selesai:</b></big><br> <p>' + wgUserName + ', pesananmu telah berhasil dikirim ke pengguna berikut: ' + usersLogger + '. Karena periode tenang, kamu akan dapat menggunakan modul lagi dalam 24 jam. Terima kasih telah menggunakan Modul Pelangganan Fanon Avatar Indonesia Wiki!</p></div> </td></tr></tbody></table></div>');
                  }
                });
              }
            });
        });
      }
      else if ( allowCheck == true && cooldown != false ) {
      $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Modul Berlangganan Massa Fanon </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px"> <div class="floatleft"><a href="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/5/54/Information.png" class="image" data-image-name="Information.png"><img alt="Informasi" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/100px-Information.png" width="100" height="100"></a></div> <big><b>Pemberitahuan:</b></big><br> <p>Halo ' + wgUserName + '. Sayangnya, Anda telah menggunakan layanan Modul Berlangganan Fanon dalam 24 jam terakhir. Karena sistem ini terbatas pada kebijakan sekali pakai per hari, Anda harus menunggu hingga waktu cooldown yang relevan berakhir. Jika Anda memiliki pertanyaan, silakan hubungi <a href="/wiki/Avatar_Indonesia_Wiki:Pengurus" title="Avatar Indonesia Wiki:Pengurus">pengurus</a> lokal untuk informasi lebih lanjut. </p> </td></tr></tbody></table>');
      }
      else if ( wgPageName == "Avatar_Wiki:FanonSubModule" && wgUserName != null ) {
        $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Modul Berlangganan Massa Fanon </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px"> <div class="floatleft"><a href="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/5/54/Information.png" class="image" data-image-name="Information.png"><img alt="Information" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/100px-Information.png" width="100" height="100"></a></div> <big><b>Pemberitahuan:</b></big><br> <p>Hello ' + wgUserName + '. Sayangnya, kamu tidak terdaftar di <a href="/wiki/Avatar_Indonesia_Wiki:FanonSubModule/CheckPage" title="Avatar Indonesia Wiki:FanonSubModule/CheckPage">halaman periksa</a> lokal kami sebagai pengguna yang akan diberikan akses ke Modul Berlangganan Fanon. Silakan hubungi <a href="/wiki/Avatar_Indonesia_Wiki:Pengurus" title="Avatar Indonesia Wiki:Pengurus">pengurus</a> lokal untuk informasi lebih lanjut. </p> </td></tr></tbody></table>');
      }
      else if ( wgPageName == "Avatar_Wiki:FanonSubModule") {
        $("#submassform").html('<table cellspacing="0" style="background-color:#FFEBCD; border-radius:13px 13px 13px 13px;"> <tbody><tr> <th style="background-color:#F5DEB3; padding-left:8px; padding-right:25px; border-radius:13px 0px 20px 0px" colspan="2">Modul Berlangganan Massa Fanon </th><td style="width:60%"> </td></tr> <tr> <td colspan="3" style="padding-top:3px; padding-right:8px"> <div class="floatleft"><a href="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/5/54/Information.png" class="image" data-image-name="Information.png"><img alt="Informasi" src="https://images.wikia.nocookie.net/__cb20090105233017/avatar/images/thumb/5/54/Information.png/100px-Information.png" width="100" height="100"></a></div> <big><b>Pemberitahuan:</b></big><br> <p>Halo pengguna anonim. Sayangnya, untuk menggunakan layanan ini, Anda harus memiliki akun dan terdaftar di <a href="/wiki/Avatar_Indonesia_Wiki:FanonSubModule/CheckPage" title="Avatar Indonesia Wiki:FanonSubModule/CheckPage">halaman periksa</a> untuk Modul Berlangganan Fanon. Silakan hubungi <a href="/wiki/Avatar_Indonesia_Wiki:Pengurus" title="Avatar Indonesia Wiki:Pengurus">pengurus</a> untuk informasi lebih lanjut. </p> </td></tr></tbody></table>');
      }
    }
  });
 }
});

function checkSum () {
  var value = $(".usersearchbox").val();
  if ( value == "" ) {
    $(".results").html('<select multiple="" size="7" title="Pengguna yang cocok" tabindex="2" style="width:100%" disabled=""></select>');
  }
  else {
    $.ajax({
      type: "POST",
      url: "https://avatar.fandom.com/api.php",
      data: { action:'query', list:'allusers', aufrom: value, aurights:'autoconfirmed', auwitheditsonly:'true', aulimit:'7', format:'wddxfm' },
      success: function ( data ) {
        var rawData = data.split('<span style="color:blue;">&lt;string&gt;</span>');
        var processedData = new Array();
        for (i=0; i < rawData.length; i++) {
          processedData[i] = rawData[i].slice(0,-157);
        }
        $(".results").html('<select multiple size="7" id="activechecksum" title="Matched users" tabindex="2" style="width:100%"><option value="1">'+ processedData[1] +'</option><option value="2">' + processedData[3] +'</option><option value="3">'+ processedData[5] +'</option><option value="4">'+ processedData[7] +'</option><option value="5">'+ processedData[9] +'</option><option value="6">'+ processedData[11] +'</option><option value="7">'+ processedData[13] +'</option></select>');
        $("#activechecksum").dblclick(function () {
          var option = $("#activechecksum > option:selected").html();
          var currentString = $("#endlistmessage").val();
          if ( currentString.length < 8 ) {
            $("#endlistmessage").val("User:"+ option);
          }
          else {
            $("#endlistmessage").val( currentString + "\nUser:" + option);
          }
        });
      }
    });
  }
}

/*
$(document).ready(function () { 
  if ( wgPageName == "Special:RecentChanges" ) {
   return;
  }
});
*/