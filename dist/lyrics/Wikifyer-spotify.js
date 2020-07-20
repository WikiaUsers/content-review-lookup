//<nowiki>
(function ($, mw) {
  var apAlbum;
  var aaImg;
  var OAuthToken;
  var a = null; // Sp results array
  var blankimg = "https://images.wikia.nocookie.net/lyricwiki/images/1/1d/Icon_-_NewAlbum.png"; // blank img

  var styleSheet= '<style> \
    .WikiaMainContentContainer {height:630px;} \
    #ITW {background-color:#FDF6E3;border:thin solid silver;font-family: helvetica, arial;width:95%;padding:3px;min-width:710px;} \
    table {min-width:362px;width:100%; font-size: 10pt;} \
    th {font-size: 16pt;background-color: #EAEAE0;} \
    td {padding:0 2 0 2;} \
    fieldset {border:thin solid silver; padding:3px;} \
    #country, #btnUpload, #aimg {width:100px} \
    #mList {background-color: #FDFAE6;min-height:100px;height:340px;width:100%; border:1px solid silver; color: #3F3A3A;} \
    #resList {background-color: rgb(253, 250, 230); min-height:200px !important; max-height:1000px !important;height:500px; max-width:1200px !important; width:98% !important; color: #004080;font-family: monospace;font-size: 10pt;} \
  </style>'

  function LoadWikifyer() {
    var SpForm ='(Sorry, but now requires <a href="https://developer.spotify.com/web-api/console/get-album/">Spotify OAuth token</a> to be pasted). Or go to: <a href="//lyrics.wikia.com/wiki/User:Senvaikis/Wikifyer">iTunes Wikifyer</a> or  <a href="//lyrics.wikia.com/wiki/Special:Wikify">MB Wikifyer</a> (both - without Oauth).<br/><form id="ITW" action=""><table style="min-width:500px;"><tr><td colspan="2"><fieldset> <Button type="button" id ="btnSrch">Search</Button> by Artist <input id="tbart"> Album <input id="tbalb"> Song <input id="tbsong"> <Button id ="btnOAuth" type="button" title="Set OAuth Token">Set OAuth Token</Button> <input id="tbOAuth"><Button id ="btnCopy" type="button" title="Copy wikified tracklist into Clipboard" style="float:right;">Copy</Button></fieldset></td></tr><tr><td> <input id="chkImg" name="chkImg" checked="checked" type="checkbox" title="Autoload image"><label for="chkImg">Autoload img</label> of <input name="imgType" id="ImgTypeArt" value="off" type="radio"><label for="ImgTypeArt">artist</label> <input name="imgType" id="ImgTypeAlb" value="on" checked="checked" type="radio"><label for="ImgTypeAlb">album</label> <input id="chkWf" name="chkWf" checked="checked" type="checkbox" title="Autowikify"><label for="chkWf">Autowikify</label> <Button id ="btnWf" type="button" title="Wikify selected album" style="float:right;">Wikify</Button></td><td rowspan="3" valign="top" style="width:60%"><textarea id="resList" ></textarea></td></tr><tr><td valign="middle"><fieldset><table style="min-width:363px;"><colgroup><col style="width:112px;"/><col/><col style="width:100%;"/></colgroup><tr><td valign="middle" rowspan="5" style="padding-right:10px;text-align:center;"><img id="aimg" src="' + blankimg  + '" title="Preview image" style="cursor: pointer; width:100px; height:100px;"><br/><Button id ="btnUpload"  type="button" title="Upload image to LW" disabled style="width:100%;">Upload</Button></td><td class ="rl"><span id="artLink" style="color:blue;cursor: pointer;" title="Open artist LW page">Artist</span></td><td><input id="iTart" style="width:100%;"></td></tr><tr><td class ="rl">ArtID</td><td><input id="spArtId" class="autosel" style="width:100%;"></td></tr><tr><td class ="rl">Album</td><td><input id="iTalb" style="width:100%;"></td></tr><tr><td class ="rl">AlbID</td><td><input id="iTid" class="autosel" style="width:100%;"></td></tr><tr><td class ="rl">Year</td><td><input id="iTyear" style="width:40px;"> Duration<input id="iTdur" style="width:50px;"></td></tr></table></fieldset></td></tr><tr><td style="width:40%"><select id="mList" size="16"></select></td></tr><tr><td colspan="2"><div> Status <span id="resdiv" style="border:thin solid silver;">Ready.</span></div></td></tr></table></form>';

    $('head').append(styleSheet);
    $('#WikiaMainContentContainer, #content').html(SpForm);
    $('#country option[value="us"]').prop('selected', 'selected').change();
    $('#mList').click(getSptracks);
    $('#btnSrch').click(getSpalbs);
    $('#btnCopy').click(ClpBrd);
    $('#chkImg').click(togImgEnable);
    $('#btnUpload').click(uploadImage);
    $('#btnWf').click(wikifyIt);
    $('.autosel').on("click", function () {$(this).select();});
    $('#aimg').click(previewImg);
    $('#artLink').click(openArtPage);
    $('#btnOAuth').click(SetOAuthToken);
    $("form input").keypress(function (e) {
      if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
          getSpalbs();
          return false;
      } else {
          return true;
      }
    });

    try {
      var token = localStorage.getItem('wikifyer-spotify-token');
      if (token) {
        $('#tbOAuth').val(token);
        SetOAuthToken();
      }
    } catch (err) {}
  }

  function SetOAuthToken(){
    OAuthToken = 'Bearer ' + $('#tbOAuth').val();
    try {
        localStorage.setItem('wikifyer-spotify-token', $('#tbOAuth').val());
    } catch (err) {}
    return false;
  }
  function openArtPage(){
    var nWin = window.open('//lyrics.wikia.com/wiki/' + $('#iTart').val(), "name='Preview'");
    if (window.focus) nWin.focus();
    return false;
  }


  function togImgEnable() {
    if (this.checked) $(':radio').removeAttr('disabled');
    else $(':radio').prop("disabled", true);
  }

  function ClpBrd() {
    $('#resList').select();
    document.execCommand("Copy", false, null);
    $('#resdiv').html('Copied to the Clipboard.');
  }

  function getSpalbs() {
    $('#resdiv').html('Searching Spotify...');
    var art = $('#tbart').val();
    var alb = $('#tbalb').val();
    var song = $('#tbsong').val();
    var country = $('#country').val();
    var mList = $('#mList');
    var srchType = ((song == '') ? 'album' : 'track');
    var spUrl='https://api.spotify.com/v1/search?type=' + srchType + '&limit=50&q=track:"' + song + '" artist:"' + art + '" album:"' + alb + '"';
    $("#resList").val(spUrl);
    mList.children().remove();
    $.ajax({
      url: spUrl,
      headers: {
        "Authorization":OAuthToken
      },
      error: function (jqXHR, textStatus, message) {
        $('#resdiv').html(message);
      },
      success: function (data, textStatus, jqXHR) {
        var lalb=alb.toLowerCase();
        if (data.hasOwnProperty('albums')){
          var albs=data.albums;
          $.each(albs.items, function(key, alb) {
            var ttalb=alb.name;
            if ((ttalb) && (alb ==='' || ttalb.toLowerCase().indexOf(lalb) !== -1)){
              mList[0].appendChild(new Option(ttalb, alb.id));
            }
          });
          $('#resdiv').html(mList[0].options.length + '/' + albs.total + ' matches found.');
        }
        if (data.hasOwnProperty('tracks')){
          var lart=art.toLowerCase();
          var tracks=data.tracks;
          $.each(tracks.items, function(key, track) {
            var ttalb=track.album.name;
            if (lart ==='' || track.artists[0].name.toLowerCase().indexOf(lart) !== -1){
              if ((ttalb) && (alb ==='' || ttalb.toLowerCase().indexOf(lalb) !== -1)){
                mList[0].appendChild(new Option(ttalb, track.album.id));
              }
            }
          });
          $('#resdiv').html(mList[0].options.length + '/' + tracks.total + ' matches found.');
        }
      }
    });
  }

  function getSptracks() {
    a = null;
    var albDur = 0;  // total length of album trakcks , ms
    var tid =this.value;
    var spUrl='https://api.spotify.com/v1/albums/' + tid;
    $('#aimg').attr('src', blankimg);
    $("#resList").val('');
    $.ajax({
      url: spUrl,
      headers: {
        "Authorization":OAuthToken
      },
      // dataType: "jsonp",
      error: function (jqXHR, textStatus, message) {
        $('#resdiv').html(message);
      },
      success: function (data, textStatus, jqXHR) {
        if (data.hasOwnProperty('tracks')){
          var artArr=data.artists;
          $("#spArtId").val(artArr[0].id);
          if ($('#chkImg').prop('checked') && data.images) {
            if ($('#ImgTypeAlb').prop('checked')) {
              $('#aimg').attr('src', data.images[0].url);
            }
            else getArtImg();
            $("#btnUpload").removeAttr('disabled');
          }
          else {$("#btnUpload").prop("disabled", true);}
          $("#iTid").val(tid);
          var aArtist = getArtist(artArr);
          var aTitle = data.name.replace(/\[/g,'(').replace(/\]/g,')');
          aTitle = aTitle.replace(/ \([^\)]*?(edition|version|ep|single|live|remastered|deluxe|anniversary|digital|compilation|mix|recording|session|demo|bonus tracks?|unissued)\)/gi,'').replace(/ - (single|ep|compilation)$/i,'');
          $('#iTart').val(aArtist);
          $('#iTalb').val(aTitle);
          $('#iTyear').val(data.release_date.substr(0,4));
          $('#iTgen').val(data.genres[0]);
          a=data.tracks.items;
          $.each(a, function(key, track) {
            try{
              if (track.duration_ms){
                albDur += track.duration_ms;
              }
            }
            catch(err) {}
          });
          $("#iTdur").val(ms2MinSecs(albDur));
          $('#resdiv').html('Available: ' + data.available_markets.join(' '));
          if ($('#chkWf').prop('checked')) {wikifyIt();}
          else {trackifyIt();}
        }
      }
    });
  }

  function getArtImg(){
    var spUrl='https://api.spotify.com/v1/artists/' + $("#spArtId").val();
    $('#resdiv').html($('#ImgTypeAlb').prop(spUrl));
    $.ajax({
      url: spUrl,
      headers: {
        "Authorization":OAuthToken
      },
      error: function (jqXHR, textStatus, message) {
        $('#resdiv').html(message);
      },
      success: function (data, textStatus, jqXHR) {
        if (data.hasOwnProperty('images')){
          $('#aimg').attr('src', data.images[0].url);
        }
      }
    });
  }

  function getArtist(artArr){
    var aArtist = '';
    var artCount=artArr.length;
    if (artCount==1) {aArtist = artArr[0].name;}
    else {
      if (artCount==2) {aArtist = artArr[0].name + ' & ' + artArr[1].name;}
      else {
        for (var i=0; i < artCount-2; i++) {
          aArtist += artArr[i].name + ', ';
        }
        aArtist += artArr[artCount-2].name + ' & ' + artArr[artCount-2].name;
      }
    }
    return iniCaps(aArtist);
  }

  function trackifyIt(){
    if (a){
      var trcklist='';
      $.each(a, function(key, track) {
        try{trcklist += track.id + ' ' + track.name + '\n';}
        catch(err) {}
      });
      $("#resList").val(trcklist);
    }
  }

  function wikifyIt(){
    if (a){
      var aArtist;     // album artist
      var aTitle = ''; // album title
      var apTitle;     // album page title
      var aSuff = '';  // album notation
      var tSuff;       // track notation
      var aYear;       // album date
      var tArtist;     // track artist
      var tTit;        // track title
      var albtext='';  // wikified tracklist text
      aArtist = $('#iTart').val();
      aTitle = $('#iTalb').val();
      aYear = $('#iTyear').val();
      aArtist= ((aArtist == 'Various Artists') ? '' : aArtist);
      var picname = aTitle.replace(/[:?*/]/g, '-');
      aaImg=picname + '.jpg';
      if (aArtist == '') {picname = aaImg;}
      else {
        aaImg= aArtist + ' - ' + aaImg;
        if (picname == aTitle) picname = '';
        else picname = aaImg;
      }
      var apArtist = ((aArtist == '') ? '' : aArtist + ':');
      apTitle = aTitle + ' (' + aYear + ')';
      apAlbum = apArtist + iniCaps(apTitle)
      var albtext = '==[[' + apAlbum + "|" + apTitle + ']]==\n';
      albtext += '{{Album Art|' + picname + '|' + aTitle + '}}\n'
      if (aSuff !==''){
        albtext += aSuff;
      }
      $.each(a,function(){
        tSuff = "";
          try {
            tArtist = getArtist(this.artists);
            tTit = this.name.replace(/\[/g,'(').replace(/\]/g,')');
            var m = tTit.match(/ \([^\)]*?(live|acoustic|alternative|original|video|mix|remix|take|edit|version|session|demo|unissued)[^\)]*?\)/gi);
            if (m){
              tTit = tTit.replace(m[0],'');
              tSuff=m[0];
            }
            m = tTit.match(/ \(((ft\.|feat\S*|duet( with)?|with)) ([^\]\)]+?)\)/i);
            if (m){
              tTit = tTit.replace(m[0],'');
              if (m[1][0].toLowerCase()=='f'){
                tSuff += ' {{feat|[[' + m[4].replace(/, /g, ']]|[[') + ']]}}';
              }
              else {
                tSuff += ' {{feat|t=with|[[' + m[4] + ']]}}';
              }
            }
            if (tArtist != aArtist) {
              if (aArtist == ''){tSuff += ' by [[' + tArtist + ']]';}
              else if (tArtist.indexOf(aArtist) == 0){
                var sf = tArtist.replace(aArtist, '').trim();
                m = sf.match(/^(,|&|and|with|feat\S*) (.+)$/i);
                if (m){
                  if (m[1][0].toLowerCase()=='f'){tSuff += ' {{feat|[[' + m[2].replace(/, /g, ']]|[[') + ']]}}';}
                  else {tSuff += ' {{feat|t=with|[[' + m[2].replace(/, /g, ']]|[[') + ']]}}';}
                }
                else {tSuff += ' by [[' + tArtist + ']]';}
              }
              else {tSuff += ' by [[' + tArtist + ']]';}
            }
            albtext += "# '''[[" + tArtist + ':' + iniCaps(tTit) + "|" + tTit + "]]'''" + tSuff + "\n";
          }
          catch(err) {
            alert(err);
          }
      });
      albtext += '{{Clear}}\n\n';
      $("#resList").val(albtext);
      $("#resList").setSelection($('#tbsong').val());
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

  function iniCaps(tit){
    return tit.replace(/(['\^!?\/\s\(\"])(\w)/g, iniCap);
  }

  function iniCap(m, p1, p2) {
    if (p1 === "'") {return m;}
    return p1 + p2.toUpperCase();
  }


  function ms2MinSecs(ms) {
    var mins = Math.floor(ms / 60000);
    var secs = ((ms % 60000) / 1000).toFixed(0);
    return mins + ":" + (secs < 10 ? '0' : '') + secs;
  }


// ***************Image*************
  function previewImg(){
    var nWin = window.open($('#aimg')[0].src, "name='Preview'");
    if (window.focus) nWin.focus();
    return false;
  }

  var img=new Image();
  img.crossOrigin='anonymous';
  img.onload=function(){resizeImg(this);};

  function resizeImg(img){
      var c=document.createElement('canvas');
      var ctx=c.getContext('2d');
      var iw=img.width;
      var ih=img.height;
      var maxDim = Math.max(iw,ih);
      var scale = 500 / maxDim;
      scale = (scale>=1) ? 1 : scale;
      c.width=iw*scale;
      c.height=ih*scale;
      ctx.drawImage(img,0,0,iw*scale,ih*scale);
      uploadImg(c.toDataURL('image/jpeg'));
  }

function aaDescription(){
  var aad = '{{AlbumCover\n|page   = ' + apAlbum +'\n|source = [' + $('#aimg')[0].src + ' spotify]\n|info   = uploaded using Wikifyer\n}}';
  return aad;
}

function apDescription(){
  var apd = '{{ArtistPhoto\n|artist = ' + $('#iTart').val() +'\n|site   = spotify.com\n|url    = https://open.spotify.com/artist/' + $('#spArtId').val()  + '\n|dirurl = ' + $('#aimg')[0].src + ' spotify\n|info   = uploaded using Wikifyer\n}}';
  return apd;
}

  function uploadImage(){
    $('#resdiv').html('Uploading image...');
    img.src=$('#aimg')[0].src;
  }

function uploadImg(canvUrl) {
  var fn, descr;
  if ($('#ImgTypeAlb').prop('checked')) {
    fn=aaImg;
    descr = aaDescription();
  }
  else {
    fn=$('#iTart').val() + '.jpg';
    descr = apDescription();
  }
  var blobBin = atob(canvUrl.split(',')[1]);
  var array = [];
  for(var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  var file=new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  fd = new FormData();
  fd.append('action', 'upload');
  fd.append('filename', fn);
  fd.append('token', mw.user.tokens.get('editToken'));
  fd.append("file", file);
  fd.append('text', descr);
  fd.append('format', 'json');

  $.ajax({
      url: mw.util.wikiScript('api'),
      contentType: false,
      processData: false,
      type: 'POST',
      data: fd,
      dataType: 'json',
      async: false,
      success: function (data) {
        if (data.upload.result == 'Warning') {
          if (data.upload.warnings.hasOwnProperty('duplicate')) {alert('Duplicate of existing image');$('#resdiv').html('Duplicate of existing image');}
          else if (data.upload.warnings.hasOwnProperty('exists')) {alert('Img exists: ' + fn);$('#resdiv').html('Img exists: ' + fn);}
          else if (data.upload.warnings.hasOwnProperty('was-deleted')) {alert('Img has been deleted: ' + fn);$('#resdiv').html('Img has been deleted: ' + fn);}
          else {alert('Unknown error');$('#resdiv').html('Unknown error');}
        }
        else {$('#resdiv').html('Image "' + fn + '"has been uploaded.');}
      },
      error: function (xhr, status, error) {
        alert(error);
        $('#resdiv').html('Unknown error');
      }
  });
}

// ********Main****

  function init() {
    if (wgPageName === 'User:Senvaikis/SpWikifyer') {
      LoadWikifyer();
    }
  }

  $(init);

}(jQuery, mediaWiki));