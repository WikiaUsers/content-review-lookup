//<nowiki>
(function ($, mw) {
  var iTurl='https://itunes.apple.com/';
  var apAlbum;
  var aaImg;
  var a = null; // iT results array
  var blankimg = "https://images.wikia.nocookie.net/lyricwiki/images/1/1d/Icon_-_NewAlbum.png"; // blank img
  var faarr = {}; // array of key-value pairs for feat.artists links (2b dropped on every currentArtist change)
  var currentArtist ='' // changing on every search for a new artist
  var styleSheet= '<style> \
    body {margin:20px;}\
    #ITW {background-color:#FDF6E3;border:thin solid silver;font-family: helvetica, arial;width:100%;padding:3px;min-width:710px;} \
    table {min-width:362px;width:100%; font-size: 10pt;} \
    th {font-size: 16pt;background-color: #EAEAE0;} \
    td {padding:0 2 0 2;} \
    fieldset {border:thin solid silver; padding:3px;} \
    #country, #btnUpload, #aimg {width:100px} \
    #mList {background-color: #FDFAE6;min-height:100px;height:400px;width:100%; border:1px solid silver; color: #3F3A3A;} \
    .rlspan {font-size: 10pt;float:right;} \
    #resList {background-color: rgb(253, 250, 230); min-height:200px !important; max-height:1000px !important;height:600px; max-width:1200px !important; width:99% !important; color: #004080;font-family: monospace;font-size: 10pt;} \
  </style>'

  function LoadWikifyer() {
    var storeShortNames = new Array("ar", "au", "at", "be", "br", "ca", "cl", "cn", "co", "cr", "hr", "cz", "dk", "do", "ec", "eg", "sv", "ee", "fi", "fr", "de", "gr", "gt", "hn", "hk", "hu", "in", "id", "ie", "il", "it", "jm", "jp", "kz", "kr", "kw", "lv", "lb", "lt", "lu", "mo", "my", "mt", "mx", "md", "nl", "nz", "ni", "no", "pk", "pa", "py", "pe", "ph", "pl", "pt", "qa", "ro", "ru", "sa", "sg", "sk", "si", "za", "es", "lk", "se", "ch", "tw", "th", "tr", "ae", "gb", "us", "uy", "ve", "vn");
    var storeLongNames = new Array("Argentina", "Australia", "Austria", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Czech Republic", "Denmark", "Dominican Rep.", "Ecuador", "Egypt", "El Salvador", "Estonia", "Finland", "France", "Germany", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Kazakstan", "Korea, Republic Of", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Macau", "Malaysia", "Malta", "Mexico", "Moldova, Republic Of", "Netherlands", "New Zealand", "Nicaragua", "Norway", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "Slovakia", "Slovenia", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam");
    var itStores;
    $.each (storeShortNames, function (i, val){
      itStores +='<option value="' + val + '">' + storeLongNames[i] + '</option>';
    });
    var ITform ='<form id="ITW" action=""><table><tr><th colspan="2">iTunes Wikifyer<span class="rlspan">Goto: <a href="//lyrics.wikia.com/wiki/User:Senvaikis/SpWikifyer">Spotify Wikifyer</a> or  <a href="//lyrics.wikia.com/wiki/Special:Wikify">MB Wikifyer</a></span></th></tr><tr><td colspan="2"><fieldset> <Button type="button" id ="btnSrch">Search</Button> by Artist <input id="tbart"> Album <input id="tbalb"> Song <input id="tbsong"> in store <select id="country" style="width:100px;">' + itStores + '</select><Button id ="btnCopy" type="button" title="Copy wikified tracklist into Clipboard" style="float:right;">Copy</Button></fieldset></td></tr><tr><td> <input id="chkImg" name="chkImg" checked="checked" type="checkbox" title="Autoload image"><label for="chkImg">Autoload image</label> <input id="chkWf" name="chkWf" checked="checked" type="checkbox" title="Autowikify"><label for="chkWf">Autowikify</label> <Button id ="btnWf" type="button" title="Wikify selected album" style="float:right;">Wikify</Button></td><td rowspan="3" valign="top" style="width:60%"><textarea id="resList" ></textarea></td></tr><tr><td valign="middle" style="width:40%;"><fieldset><table style="min-width:363px;"><colgroup><col style="width:112px;"/><col/><col style="width:100%;"/></colgroup><tr><td valign="middle" rowspan="5" style="padding-right:10px;text-align:center;"><img id="aimg" src="' + blankimg  + '" title="Preview image" style="cursor: pointer; width:100px; height:100px;"><br/><Button id ="btnUpload"  type="button" title="Upload image to LW" disabled style="width:100%;">Upload</Button></td><td class ="rl"><span id="artLink" style="color:blue;cursor: pointer;" title="Open artist LW page">Artist</span></td><td><input id="iTart" style="width:100%;"></td></tr><tr><td class ="rl">Album</td><td><input id="iTalb" style="width:100%;"></td></tr><tr><td class ="rl">Year</td><td nowrap><input id="iTyear" style="width:40px;"> ID <input id="iTid" class="autosel" style="width:137px;"></td></tr><tr><td class ="rl">Genre</td><td nowrap><input id="iTgen"  style="width:126px;"> Dur. <input id="iTdur" style="width:40px;"></td></tr><tr><td class ="rl">Label</td><td><input id="iTLbl" style="width:100%;"></td></tr><tr><td><label for="chckSort">Sort by date</label><input type="checkbox" id="chckSort"></td><td class ="rl">Info</td><td><input id="tbInfo" style="width:100%;"></td></tr><tr><td class ="rl">Image File name</td><td colspan="2"><input id="tbFname" style="width:100%;"></td></tr></table></fieldset></td></tr><tr><td style="width:40%"><select id="mList" size="16"></select></td></tr><tr><td colspan="2"><div> Status <span id="resdiv" style="border:thin solid silver;">Ready.</span></div></td></tr></table><img id="imgPrev" style="position:absolute;left:120px;top:10px;background-color:gray;display: none;cursor: pointer;" src="" width="600" height="600" title="Close preview"></form>';

    $('head').append(styleSheet);
    $('body').html(ITform);
    $('#country option[value="us"]').prop('selected', 'selected').change();
    $('#mList').click(getITtracks);
    $('#btnSrch').click(getITalbs);
    $('#btnCopy').click(ClpBrd);
    $('#btnUpload').click(uploadImage);
    $('#btnWf').click(wikifyIt);
    $('.autosel').on("click", function () {$(this).select();});
    $('#aimg').click(previewImg);
    $('#imgPrev').click(hidePreview);
    $('#artLink').click(openArtPage);
    $('#chckSort').click(DoSortMlist);
    $("form input").keypress(function (e) {
      if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
          getITalbs();
          return false;
      } else {
          return true;
      }
    });
    
    $('#ITW')
      .on('dragover', false) 
      .on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();         
        var page = decodeURIComponent(e.originalEvent.dataTransfer.getData("Text")).replace(/_/g, ' ');
        var m = page.match(/https?:\/\/lyrics\.wikia\.com\/wiki\/(.+)$/i);
        if (m){
          ClearAllFilelds();
          SetSearchFields(m[1]);
          getITalbs();
        }
        return false;
    });
    GetUrlParams();
  }

  function openArtPage(){
    var nWin = window.open('//lyrics.wikia.com/wiki/' + $('#iTart').val(), "name='Preview'");
    if (window.focus) nWin.focus();
    return false;
  }

  function ClpBrd() {
    if ($('#chkWf').prop('checked')) $('#resList').select();
    document.execCommand("Copy", false, null);
    $('#resdiv').html('Copied to the Clipboard.');
  }

  function getITalbs() {
    $('#resdiv').html('Searching iTunes...');
    var art = $('#tbart').val();
    var alb = $('#tbalb').val();
    var song = $('#tbsong').val();
    var country = $('#country').val();
    var mList = $('#mList');
    if (currentArtist != art) {
      currentArtist=art;
      faarr = {}; //reset faarr on every new artist search
    }
    var entity = ((song === '') ? 'album' : 'song');
    mList.children().remove();
    $.ajax({
      url: iTurl + 'search',
      dataType: "json",
      data: {
        term: art + ' ' + alb + ' ' + song,
        media: "music",
        entity: entity,
        country: country
      },
      error: function (jqXHR, textStatus, message) {
        $('#resdiv').html(message);
      },
      success: function (data, textStatus, jqXHR) {
        if (data.hasOwnProperty('results')){
          var a=data.results;
          if (a.length > 0) {
            var lart=art.toLowerCase();
            var lalb=alb.toLowerCase();
            for (var i in a) {
              //if (lart ==='' || a[i].artistName.toLowerCase().indexOf(lart) !== -1){
                var ttalb=a[i].collectionName;
                if ((ttalb) && (alb ==='' || ttalb.toLowerCase().indexOf(lalb) !== -1)){
                  mList[0].appendChild(new Option(a[i].artistName + ':' + ttalb + ' (' + a[i].releaseDate.substr(0,4) + ')', a[i].collectionId));
                }
              //}
            }
            DoSortMlist();
            $('#resdiv').html(mList[0].options.length + '/' + a.length + ' matches found.');
            $('#mList option')[0].selected = true;
            getITtracksByID($('#mList').val())
          }
          else {
            ClearAlbFilelds();
            $('#resdiv').html('No matches found');
          }
        }
      }
    });
  }

  function getITtracks() {
    getITtracksByID(this.value);
  }

  function getITtracksByID(tid) {
    a = null;
    var albDur = 0;  // total length of album tracks, ms
    //var tid = this.value;
    $('#aimg').attr('src', blankimg);
    $('#tbInfo').val('');
    $("#resList").val('');
    var country = $('#country').val();
    $.ajax({
      url: iTurl + 'lookup',
      dataType: "json",
      data: {
        id: tid,
        media: "music",
        entity: "song",
        country: country
      },
      error: function (jqXHR, textStatus, message) {
        $('#resdiv').html(message);
      },
      success: function (data, textStatus, jqXHR) {
        if (data.hasOwnProperty('results')){
          a=data.results;
          if ($('#chkImg').prop('checked') && a[0].artworkUrl100){
            $('#aimg').attr('src', a[0].artworkUrl100.replace('100x100','600x600'));
            $("#btnUpload").removeAttr('disabled');
            $('#resdiv').html('ArtistID: ' + a[0].artistId);
          }
          else {$("#btnUpload").prop("disabled", true);}
          //tid = 'id' + tid;
          if (country != 'us'){
            tid += "&cc=" + country;
          }
          $("#iTid").val(tid);
          var aArtist = iniCaps(a[0].artistName);
          var aTitle = a[0].collectionName.replace(/\[/g,'(').replace(/\]/g,')');
          aTitle = aTitle.replace(/ \([^\)]*?(edition|version|ep|single|live|remastered|deluxe|anniversary|digital|compilation|mix|recording|session|demo|bonus tracks?|unissued)\)/gi,'').replace(/ - (single|ep|compilation)$/i,'');
          $('#iTart').val(aArtist);
          $('#iTalb').val(aTitle);
          $('#iTyear').val(a[0].releaseDate.substr(0,4));
          $('#iTgen').val(a[0].primaryGenreName);
          $('#iTLbl').val(a[0].copyright);
          for (var i in a) {
            try{
              if (a[i].trackTimeMillis){
                albDur += a[i].trackTimeMillis;
              }
            }
            catch(err) {}
          }
          $("#iTdur").val(ms2MinSecs(albDur));
          if ($('#chkWf').prop('checked')) {wikifyIt();}
          else {trackifyIt();}
        }
      }
    });
  }

  function trackifyIt(){
    if (a){
      var trcklist='';
      var albId= a[0].collectionId;
      var cc = $('#country').val();
      cc = (cc == 'us') ? '' : '&cc=' + cc;
      for (var i in a) {
        if (a[i].wrapperType == 'track'){
          try{trcklist += albId + '?i=' + a[i].trackId + cc + ' ' + a[i].trackName + '\n';}
          catch(err) {}
        }
      }
      $("#resList").val(trcklist);
      var song = $('#tbsong').val();
      if (song.length >0){
        var idList = $('#resList')[0];
        var pos =idList.value.toLowerCase().indexOf(song.toLowerCase());
        var linesArr = idList.value.substr(0, pos).split("\n");
        var lineText = linesArr[linesArr.length-1];
        var m = lineText.match(/(\d+\?i=\d+(&cc=..)?)/i);
        if (m){
          $("#resList").setSelection(m[1]);
        }  
      }
    }
  }

  function wikifyIt(){
    if (a){
      var aArtist;     // album artist
      var aTitle = ''; // album title
      var apTitle;     // album page title
      var aSuff = '';  // album notation
      var tSuff = '';  // track notation
      var aYear;       // album date
      var tArtist;     // track artist
      var tTit;        // track title
      var albtext='';  // wikified tracklist text
      var albFaStr = '';
      var albFaArr = [];
      var trFaStr = '';
      $("#resList").val("Parsing...");
      aArtist = $('#iTart').val(); 
      aTitle = $('#iTalb').val();
      var m = aTitle.match(/ \((ft\.|feat\S*) (.+?)\)/i);
      if (m){
        aTitle = aTitle.replace(m[0],'');
        aSuff += "* ''Featuring " + m[2] + "''\n";
      }  
      aYear = $('#iTyear').val();
      aArtist= ((aArtist == 'Various Artists') ? '' : aArtist);
      var picname = aTitle.replace(/[:?*/]/g, '-');
      aaImg=picname + '.jpg';
      if (aArtist === '') {picname = aaImg;}
      else {
        aaImg= aArtist + ' - ' + aaImg;
        if (picname == aTitle) picname = '';
        else picname = aaImg;
      }
      $("#tbFname").val(aaImg);
      var apArtist = ((aArtist === '') ? '' : aArtist + ':');
      apTitle = aTitle + ' (' + aYear + ')';
      apAlbum = apArtist + iniCaps(apTitle);
      albtext = '==[[' + apAlbum + "|" + apTitle + ']]==\n';
      albtext += '{{Album Art|' + picname + '|' + aTitle + '}}\n';
      if (aSuff !==''){
        albtext += aSuff;
      }
      $.each(a,function(){ // didn't know how to filter by wrapperType...
        tSuff = "";
        if (this.wrapperType == 'track'){
          try {
            if (this.trackTimeMillis){
            }
            tArtist = iniCaps(this.artistName);
            tTit = this.trackName.replace(/\[/g,'(').replace(/\]/g,')');
            var m = tTit.match(/ \([^\)]*?(live|acoustic|alternative|original|video|mix|remix|take|edit|version|session|demo|unissued)[^\)]*?\)/gi);
            if (m){
              tTit = tTit.replace(m[0],'');
              tSuff=m[0];
            }  
            m = tTit.match(/ \(((ft\.|feat\S*|duet( with)?|with)) ([^\]\)]+?)\)/i);
            if (m){
              tTit = tTit.replace(m[0],'');
              if (m[1][0].toLowerCase()=='f'){
                trFaStr = m[4].replace(/(, | & )/g, '|');
                albFaArr.push(trFaStr);
                tSuff += ' {{feat|' + trFaStr + '}}';
              }
              else {
                trFaStr = m[4];
                albFaArr.push(trFaStr);
                tSuff += ' {{feat|t=with|' + trFaStr + '}}';
              }
            }  
            if (tArtist != aArtist) {
              if (aArtist === ''){tSuff += ' by [[' + tArtist + ']]';}
              else if (tArtist.indexOf(aArtist) === 0){
                var sf = tArtist.replace(aArtist, '').trim();
                m = sf.match(/^(,|&|and|with|feat\S*) (.+)$/i);
                if (m){
                  if (m[1][0].toLowerCase()=='f'){
                    trFaStr = m[2].replace(/(, | & )/g, '|');
                    albFaArr.push(trFaStr);
                    tSuff += ' {{feat|' + trFaStr + '}}';
                  }
                  else {
                    trFaStr = m[2].replace(/(, | & )/g, '|');
                    albFaArr.push(trFaStr);
                    tSuff += ' {{feat|t=with|' + trFaStr + '}}';
                  }
                }
                else {tSuff += ' by [[' + tArtist + ']]';}
              }
              else {tSuff += ' by [[' + tArtist + ']]';}
            }
            albtext += "# '''[[" + tArtist + ':' + iniCaps(tTit) + "|" + tTit + "]]'''" + tSuff + "\n";
          }
          catch(err) {  
            alert(err);
            alert(this.wrapperType);
          } 
        }
      });
      albtext += '{{Clear}}\n\n';
      albFaStr = albFaArr.join('|');
      if (albFaStr === '') {
        $("#resList").val(albtext);
      }
      else {
        albFaArr = albFaStr.split('|');
        var newArtList = GetUniqueFaStr(albFaArr);
        if (newArtList === ''){MakeLinks(albtext);}
        else {LwArtLink(albFaStr,albtext);}
      }
      $("#resList").setSelection($('#tbsong').val());
    }
  }

  $.fn.setSelection = function(seltext) {
    if(this.lengh === 0 || seltext.lengh === 0) return this;
    input = this[0];
    var selectionStart=input.value.toLowerCase().indexOf(seltext.toLowerCase());
    if (selectionStart < 0) return this;
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
  };

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

  function DoSortMlist(){
    var mList = $('#mList');
    var options = Array.prototype.slice.call(mList[0].options);
    var sorter = $('#chckSort').prop('checked') ? SortMlistByYear : SortMlist;
    options.sort(sorter);
    mList.empty().append(options);
  }
 
  function SortMlistByYear(a, b) {
    return a.text.substr(a.text.length-5,4)-b.text.substr(b.text.length-5,4);
  }
 
  function SortMlist(a, b) {
    return a.text > b.text ? 1 : a.text < b.text ? -1 : 0;
  }
  
// ***************Image*************
  function previewImg(){
    //var nWin = window.open($('#aimg')[0].src, "name='Preview'");
    //if (window.focus) nWin.focus();
    $('#imgPrev').attr('src', this.src);
    $('#imgPrev').toggle();
    return false;
  }

  function hidePreview(){
    $('#imgPrev').toggle();
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
    var aad = '{{AlbumCover\n|page   = ' + apAlbum +'\n|source = [' + $('#aimg')[0].src + ' iTunes]\n|info   = ' +  $('#tbInfo').val() + '\n}}';
    return aad;
  }

  function uploadImage(){
    $('#resdiv').html('Uploading image...');
    img.src=$('#aimg')[0].src;
  }

function uploadImg(canvUrl) {
  //var fn=aaImg;
  var fn=$("#tbFname").val();
  var descr = aaDescription();
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

//**** form utils***
  function SetSearchFields(page){
    var m = page.match(/((.+?):(?! ))?(.+?)( \((\d{4})\))?(\?redlink=.+)?$/i);
    if (m){
      if (m[5]) {
        $('#tbart').val(m[2]);
        $('#tbalb').val(m[3]);
      }
      else if (m[2]) {
        $('#tbart').val(m[2]);
        $('#tbsong').val(m[3]);
      }
      else $('#tbart').val(m[3]);
      getITalbs();
    }
  }
  
  function GetUrlParams(){
    var urlStr=decodeURIComponent(window.location.toString());
    var m = urlStr.match(/\?page=(.+)$/);
    if (m){
      SetSearchFields(m[1].replace(/_/g, ' '));
    }
    return false;
  }

  function ClearAllFilelds(){
    $('#ITW').find('input:text').val('');
    $('#aimg').attr('src', blankimg);
    $('#resList').val('');
    $('#mList').find('option').remove();
  }
  
  function ClearAlbFilelds(){
    $('#iTart').val('');
    $('#iTalb').val('');
    $('#iTyear').val('');
    $('#iTid').val('');
    $('#iTgen').val('');
    $('#iTdur').val('');
    $('#iTLbl').val('');
    $('#tbInfo').val('');
    $('#aimg').attr('src', blankimg);
    $('#resList').val('');
  }

//****featured artists link stuf, experimental:

  Array.prototype.unique = function() {
    var sorted = this;
    sorted.sort();
    return sorted.filter(function(value, index, arr){
      if(index < 1) 
        return true;
      else
        return value != arr[index-1];
    });
  };

  function GetLink(art) {
    if (faarr.hasOwnProperty(art)) {return faarr[art]}
    else {return art}
  }

  function MakeLinks(albtext) {
    var re = /{{feat(\|t=[^|]+)?(\|[^}]+)}}/ig;
    var m;
    while (m = re.exec(albtext)) {
      var rpl = m[2];
      var re1 = /(\|([^|}]+))/ig;
      var m1;
      while (m1 = re1.exec(m[2])) {
        rpl = rpl.replace(m1[0],'|' + GetLink(m1[2]));
      }
      rpl=m[0].replace(m[2],rpl);
      albtext=albtext.replace(m[0],rpl);
    }
    $("#resList").val(albtext);
  }


  function GetUniqueFaStr(arr){
    var rezArr = [];
    var rezStr='';
    arr=arr.unique();
    arr.forEach( function(s) { 
    if (!faarr.hasOwnProperty(s)) {rezArr.push(s)}
    });
    rezStr= rezArr.join('|'); 
    return rezStr;
  }

  function LwArtLink(artList,albtext) {
    var urlstr ="//lyrics.wikia.com/api.php?action=query&redirects=1&format=json&titles=" + encodeURIComponent(artList);
    var rez = '';
    var tit = '';
    var titLink = '';
    $.ajax({
      url: urlstr,
      dataType: "jsonp",
      success: function (data, textStatus, jqXHR) {
        if (data.hasOwnProperty("query")) {
          var a = data.query.redirects;
          if (a) {
            for (var i in a) {
              tit = a[i].from;
              faarr[tit] = '[[' + a[i].to + '|' + a[i].from + ']]';
            }
          }
          a = data.query.pages;
          for (var j in a) {
            tit = a[j].title;
            if (a[j].hasOwnProperty("missing")) {
              titLink = tit;
            }
              else {
              titLink='[[' + tit + ']]';
            }
            if (!faarr.hasOwnProperty(tit)) {faarr[tit]=titLink}
          }
        }
        MakeLinks(albtext);
      }
    });
  }


// ********Main****

  function init() {
    if (wgPageName === 'User:Senvaikis/Wikifyer') {
      LoadWikifyer();
    }
  }

  $(init);

}(jQuery, mediaWiki));