//<nowiki>
(function ($, mw) {

  var request=new XMLHttpRequest();
  var blankimg = "https://images.wikia.nocookie.net/lyricwiki/images/1/1d/Icon_-_NewAlbum.png"; // blank img
  var data = null;            // MB album data
  var aaImg;                  // aa image filename

  var styleSheet= '<style> \
  #MBW {height:90%;} \
  #resList {background-color: #FDFAE6 !important; max-height:1000px !important; height:480px; max-width:1200px !important;\
    width:100% !important;color: #004080;font-family: monospace;font-size: 10pt;} \
  fieldset {border:thin solid silver;padding:1px;} \
  table {width:100%;font-family: helvetica, arial;font-size: 12px;} \
  td {padding:0 2 0 2;} \
  input{padding:1 !important;font-family: helvetica, arial;font-size: 12px;} \
  td.rl {text-align:right;} \
  #mList {background-color: #FDFAE6;color: #3F3A3A;height:300px;width:100%; border:1px solid silver;} \
  span {border:"none;"} \
  </style>'

  var MBform ='Designed to be used as a tool for creating new albums and their cover images (not deadlinks to them). <form id="MBW" action=""><table style="min-width:500px;"><tr><td colspan="2"><fieldset> <Button type="button" id ="btnSrch">Search</Button> by Artist <input id="tbart"> Album <input id="tbalb"> type:<select id="atype"><option value="">All</option><option value="album">Album</option><option value="compilation">Compilation</option><option value="live">Live</option><option value="soundtrack">Soundtrack</option><option value="ep">EP</option><option value="single">Single</option></select> Song <input id="tbsong"> <Button id ="btnCopy" type="button" title="Copy wikified tracklist into Clipboard">Copy</Button></fieldset></td></tr><tr><td> <input id="chkImg" name="chkImg" checked="checked" type="checkbox" title="Autoload image"><label for="chkImg">Autoload image</label> <input id="chkWf" name="chkWf" checked="checked" type="checkbox" title="Autowikify"><label for="chkWf">Autowikify</label> <Button id ="btnWf" type="button" title="Wikify selected album" >Wikify</Button></td><td rowspan="3" valign="top" style="height:100%"><textarea id="resList" ></textarea></td></tr><tr><td valign="middle"><fieldset id="aflds"><table style="min-width:363px;"><colgroup><col style="width:112px;"/><col/><col style="width:100%;"/></colgroup><tr><td valign="middle" rowspan="7" style="padding-right:1px;text-align:center;"><img id="aimg" width="100" height="100" src="' + blankimg  + '"><br/><Button id ="btnUpload" type="button" title="Upload image to LW" style="width:100%;" disabled>View img</Button></td><td class ="rl">Artist</td><td><input id="mbArt" style="width:99%;"></td></tr><tr><td class ="rl">Album</td><td><input id="mbAlb" style="width:99%;"></td></tr><tr><td class ="rl">Year</td><td><input id="albYear" style="width:40px;"> Dur. <input id="albDur" style="width:50px;"> asin <input id="mbAsin" style="width:90px;"></td></tr><tr><td class ="rl">AlbID</td><td><input id="albId" class="autosel" style="width:99%;"></td></tr><tr><td class ="rl">grID</td><td><input class="autosel" id="grId" style="width:99%;"></td></tr><tr><td class ="rl">grYear</td><td><input id="grYear" style="width:40px;"> type <input id="grpType" style="width:55px;"> stype <input id="grsType" style="width:80px;"></td></tr></table></fieldset></td><tr><td style="width:410px;height=100%;"><select id="mList" size="16"></select></td></tr></table></fieldset></td></tr><tr><td colspan="2"><div> Status <span id="resdiv" style="border:thin solid silver;">Ready</span></div></td></tr></table></form>'; 


function addMB(){
  var btn = document.createElement("img");
  btn.src = "https://images.wikia.nocookie.net/lyricwiki/images/9/91/Kingnee_-_Musicbrainz.png";
  btn.title="Get MB album";
  btn.onclick=openMBW;
  $('input[value="musicbrainz"]').after(btn);
}


function openMBW() {
  $.showCustomModal('MB Wikifyer', MBform, {
    id: 'MBW',
    width: 850,
    height: 620
  });
  $('head').append(styleSheet);
  $('#MBW').css({"background-color":"#FDF6E3", border:"thin solid silver;font-family: helvetica, arial;font-size: 12px;"});
  $('#resList').css({"background-color":"#FDF6E3", border:"thin solid silver;font-family: helvetica, arial;font-size: 12px;"});
  $('#mList').click(GetAlbTracks);
  $('#btnSrch').click(getMBalbs);
  $('#btnWf').click(Wikify);
  $('#btnCopy').click(ClpBrd);
  $('#btnUpload').click(viewImage);
  $('.autosel').on("click", function () {$(this).select();});
  $("form input").keypress(function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        getMBalbs();
        return false;
    } else {
        return true;
    }
  });
}

  function ClpBrd() {
    $('#resList').select();
    document.execCommand("Copy", false, null);
    $('#resdiv').html('Copied to the Clipboard.');
  }

  function getMBalbs() {
    $('#resdiv').html('Searching MB...');
    $("#resList").val('');
    $("#aflds input").val('');
    var art = $('#tbart').val();
    var alb = $('#tbalb').val();
    var song = $('#tbsong').val();
    var mList = $('#mList');
    var urlstr;
    if (song ==''){
      urlstr ='https://musicbrainz.org/ws/2/release?limit=100&fmt=json&query=artist:"' + encodeURIComponent(art) + '" AND release:"' + encodeURIComponent(alb) + '" AND status:"official"';
      var atype = $('#atype').val();
      if (atype !=='') urlstr +=' AND type:' + atype;
      request.onreadystatechange = parseMBalbs;
    }
    else {
      urlstr ='https://musicbrainz.org/ws/2/recording?limit=100&fmt=json&query=artist:"' + encodeURIComponent(art) + '" AND release:"' + encodeURIComponent(alb) + '" AND recording:"' + encodeURIComponent(song) + '" AND status:"official"';
      request.onreadystatechange = parseMBrecs;
    }
    $('#mList').children().remove();
    request.open("GET", urlstr, true);
    request.send(null);
    return false;
  }

  function parseMBalbs() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var resp = request.responseText;
        resp=resp.replace(/artist-credit/g, 'artcreds');
        var data = JSON.parse(resp);
        if (data.hasOwnProperty('releases')) {
          var a = data.releases;
          for (var i in a) {
            if(a[i].date){
              var arts = a[i].artcreds;
              var albart = '';
              for (var j in arts){
                albart += arts[j].artist.name;
                if (arts[j].joinphrase){
                  albart += arts[j].joinphrase;
                } 
              }
              mList.appendChild(new Option(albart + ':' + a[i].title + ' (' + a[i].date.substr(0,4) + ')', a[i].id));
            }
          }
          SortMlistByYear();
          $('#resdiv').html(data.releases.length + ' matches found');
        }
        else  {
          $('#resdiv').html('No matches found');
        }
      }
    }
  }

  function parseMBrecs() {
    if (request.readyState == 4) {
      if (request.status == 200) {
      var resp = request.responseText;
      resp=resp.replace(/artist-credit/g, 'artcreds');
      var data = JSON.parse(resp);
      if (data.hasOwnProperty('recordings')) {
        var a = data.recordings;
        for (var i in a) {
          var arts = a[i].artcreds;
          var albart = '';
          for (var k in arts){
            albart += arts[k].artist.name;
            if (arts[k].joinphrase){
              albart += arts[k].joinphrase;
            } 
          }
          var b = a[i].releases;
          for (var j in b) {
            if(b[j].date){
              mList.appendChild(new Option(albart + ':' + b[j].title + ' (' + b[j].date.substr(0,4) + ')', b[j].id));
            }
          }
        }
        SortMlistByYear();
        $('#resdiv').html(mList.options.length + ' matches found');
      }
      }
    }
  }

  function GetAlbTracks() {
    if (this.value){
      $('#aimg').attr('src', blankimg);
      $('#resdiv').html('Getting MB album tracks...');
      $("#resList").val('');
      $("#aflds input").val('');

      var urlstr = 'https://musicbrainz.org/ws/2/release/' + this.value + '?inc=release-groups+recordings+artists+artist-credits&fmt=json';
      request.open("GET", urlstr, true);
      request.onreadystatechange = ParseMbTracks;
      request.send(null);
    }
    return false;
  }

  function Wikify() { //To Do: aaimg !!
    if (data){
      var aArtist;     // album artist
      var aTitle = ''; // album title
      var apTitle;     // album page title
      var aSuff = ''   // album notation
      var tSuff;       // track notation
      var aYear;       // album date
      var tArtist;     // track artist
      var tTit;        // track title
      var albtext='';  // wikified tracklist text
      aArtist = $('#mbArt').val();
      aTitle = $('#mbAlb').val();
      aYear = $('#albYear').val();
      var picname = aTitle.replace(/[:?*/]/g, '-');
      aaImg=picname + '.jpg';
      if (aArtist == '') {picname += '.jpg';}
      else {
        if (picname == aTitle) {picname = '';}
        else picname = aArtist + ' - ' + picname + '.jpg';
      }
      aArtist= ((aArtist == '') ? '' : aArtist + ':');
      aTitle += ' (' + aYear + ')';
      var albtext = '==[[' + aArtist + iniCaps(aTitle) + "|" + aTitle + ']]==\n';
      albtext += '{{Album Art|' + picname + '|' + data.title + '}}\n'
      var a = data.media;
      var dn = data.media.length;
      for (var i = 0; i < dn; i++) {
        if (dn>1){
          var k=i+1;
          albtext +='{{H4|Disc ' + k + '}}\n';
        }
        var b = a[i].tracks;
        for (var j in b) {
          var alt = b[j].title
          var suff ='';
          var m = alt.match(/ \((live.*?|acoustic.*?|alternative.*?|original.*?|video.*?|.*mix.*?|.*take|.*edit|.*version)\)/i);
          if (m){
            alt = alt.replace(m[0],'');
            suff=m[0];
          }  
          var m = alt.match(/ \(((ft\.|feat\S*|duet( with)?|with)) (.+?)\)/i);
          if (m){
            alt = alt.replace(m[0],'');
            if (m[1][0].toLowerCase()=='f'){
              suff += ' {{feat|[[' + m[4] + ']]}}';
            }
            else {
              suff += ' {{feat|t=with|[[' + m[4] + ']]}}';
            }
          }  
          var tarts = b[j].artists;
          
          var tArtist = '';
          for (var k in tarts){
            tArtist += tarts[k].artist.name;
            if (tarts[k].joinphrase){
              tArtist += tarts[k].joinphrase;
            } 
          }
          m = tArtist.match(/ feat\. (.+)$/i);
          if (m){
            tArtist = tArtist.replace(m[0],'');
            suff += ' {{feat|[[' + m[1] + ']]}}';
          }
          albtext += "# '''[[" + iniCaps(tArtist) + ':' + iniCaps(alt) + "|" + alt + "]]'''" + suff + "\n";
        }
      }
      albtext += '{{Clear}}\n\n';
      $("#resList").val(albtext);
      $("#resList").setSelection($('#tbsong').val());
    }
  }
  
  function trackify() {
    var trcklist='';
    var a = data.media;
    for (var i = 0; i < a.length; i++) {
      var b = a[i].tracks;
      for (var j in b) {
        trcklist += b[j].recording.id + ' ' + b[j].title + '\n';
      }
    }
    $("#resList").val(trcklist);
  }

  function ParseMbTracks() {
    var albDur =0;
    $('#resdiv').append(request.readyState + ':');
    $('#resdiv').append(request.status + '; ');
    if (request.readyState == 4) {
      if (request.status == 200) {
        var artistsIDS='';
        var resp = request.responseText;
        resp= resp.replace(/artist-credit/g,'artists').replace(/cover-art-archive/g,'coverart');
        resp= resp.replace(/release-group/g,'releasegroup').replace(/first-release-date/g,'firstreleasedate');
        resp= resp.replace(/primary-type/g,'primarytype').replace(/secondary-types/g,'secondarytypes');
        resp= resp.replace(/’/g,"'").replace(/_/g,' ');    
        data = JSON.parse(resp);
        if (data.hasOwnProperty('media')) {
          if ($('#chkImg').prop('checked') && data.coverart.artwork) {
            $('#aimg').attr('src', 'https://coverartarchive.org/release/' + data.id + '/front-250.jpg');
            $("#btnUpload").removeAttr('disabled');
          }
          else {$("#btnUpload").prop("disabled", true);}
          $('#mbAlb').val(data.title);
          $('#albId').val(data.id);
          $('#albYear').val(data.date.substr(0,4));
          $('#mbAsin').val(data.asin);
          $('#grId').val('release-group/' + data.releasegroup.id);
          $('#grYear').val(data.releasegroup.firstreleasedate.substr(0,4));
          $('#grpType').val(data.releasegroup.primarytype); // + ' ' + data.status
          if (data.releasegroup.secondarytypes){
            $('#grsType').val(data.releasegroup.secondarytypes[0]);
          }
          var a = data.media;
          var dn = a.length;
          for (var i = 0; i < dn; i++) {
            var b = a[i].tracks;
            for (var j in b) {
              if (b[j].length) albDur += b[j].length;
            }
          }
          $("#albDur").val(ms2MinSecs(albDur));
          var arts = data.artists;
          var albArtist = '';
          for (var k in arts){
            albArtist += arts[k].artist.name;
            artistsIDS +=arts[k].artist.name + ' id: ' + arts[k].artist.id;
            if (arts[k].joinphrase){
              artistsIDS +=' , ';
              albArtist += arts[k].joinphrase;
            } 
          }
          $('#mbArt').val(iniCaps(albArtist));
//          $('#resdiv').html('Done.');
          $('#resdiv').html(artistsIDS);
          if ($('#chkWf').prop('checked')) {Wikify();}
          else {trackify();}
        }
      }
    }
  }

  $.fn.setSelection = function(seltext) {
    if(this.lengh == 0 || seltext.lengh ==0) return this;
    input = this[0];
    var selectionStart=input.value.toLowerCase().indexOf(seltext.toLowerCase());
    if (selectionStart <= 0) return this;
    var selectionEnd = selectionStart + seltext.length;
    if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    } else if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    return this;
  }

  function ms2MinSecs(ms) {
    var mins = Math.floor(ms / 60000);
    var secs = ((ms % 60000) / 1000).toFixed(0);
    return mins + ":" + (secs < 10 ? '0' : '') + secs;
  }
  
  function iniCaps(tit){
    return tit.replace(/(['\^!?\/\s\(\"])(\w)/g, iniCap);
  }
 
  function iniCap(m, p1, p2) {
    if (p1 === "'") {return m;}
    return p1 + p2.toUpperCase();
  }

  function SortMlistByYear() {
    var options = mList.options;
    Array.prototype.sort.call(options, function (a, b) {
      return a.text.substr(a.text.length-5,4)-b.text.substr(b.text.length-5,4)
    });
  }
 
 function viewImage(){
    var iurl = $('#aimg')[0].src.replace('front-250','front-500');
    var nWin = window.open(iurl, "name='coverartarchive img preview'");
    if (window.focus) nWin.focus();
    return false;
  }


function init() {
  if (wgPageName === 'Special:Wikify') {
//   alert('p0');
    addMB();
  }    
}
    
  $(init);

}(jQuery, mediaWiki));