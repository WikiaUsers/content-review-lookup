/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
// NOTE: support for NavFrames has been removed. Please use mw-collapsible instead.
//   For details see http://community.wikia.com/wiki/Help:Collapsing
// Please contact an administrator if you are still using NavFrame on this wiki.

///////////////////
// CONFIGURATION //
///////////////////

window.deadVideosCategories = [
  '', 'Buatan penggemar', 'Non-MLP', 'MLP Lain', 'Promosi', 'Acara', 'Kutipan', 'Adegan', 'Lagu', 'Lagu internasional',
  'Lagu internasional Equestria Girls', 'Lagu internasional musim 1', 'Lagu internasional musim 2',
  'Lagu internasional musim 3', 'Lagu internasional musim 4'
];

// Shortcut for importArticle
function impart(article) {
    importArticle({ type: 'script', article: article });
}

/////////////
// IMPORTS //
/////////////

// http://dev.wikia.com/wiki/Language_Notification
impart('w:c:dev:LWN/code.js');

// http://dev.wikia.com/wiki/DupImageList
if (mw.config.get('wgPageName') === "My_Little_Pony_Wikia:Gambar_duplikat") {
    impart('w:c:dev:DupImageList/code.js');
}

// http://dev.wikia.com/wiki/UserRightsRecord
if ($('.rightsrecord').length) {
    impart('w:c:dev:UserRightsRecord/code.js');
}

// Custom user rights icons on userpages
if (
  {'User':1, 'User_blog':1, 'User_talk':1}[mw.config.get('wgCanonicalNamespace')] ||
  mw.config.get('wgPageName').indexOf('Istimewa:Kontribusi_pengguna') !== -1
){
    impart('MediaWiki:Common.js/userRightsIcons.js');
}

// Special:BlankPage-based scripts
//   PonyStats by Bobogoobo - http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=ponystats
//   All transcript lister by Bobogoobo - http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=transcripts
//   Non-720p image lister by Bobogoobo - http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=non720
//   Dead video lister by Bobogoobo - http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=deadvideos
if (mw.config.get('wgPageName') === 'Istimewa:Halaman_kosong' && mw.util.getParamValue('blankspecial')) {
    impart('MediaWiki:Common.js/' + {
            'ponystats': 'PonyStats.js',
            'transcripts': 'Transcripts.js',
            'non720': 'Non720.js',
            'deadvideos': 'DeadVideos.js'
        }[mw.util.getParamValue('blankspecial')]
    );
}

// Imports LinkImagePopup by Bobogoobo
// Shows a popup image of a character/episode/location when hovering over a link to it
// Lists of categories in the script need to be updated manually
// To delete stored data: window.sessionStorage.removeItem('linkPopupStorage');
// To disable the script: in your Special:MyPage/wikia.js add: window.linkImagePopupDisabled = true;
// To disable sessionStorage caching: window.linkImagePopupCachingDisabled = true;
if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !mw.util.getParamValue('diff')
) {
    impart('MediaWiki:Common.js/LinkImagePopup.js');
}

// Imports PonyDesigns by Bobogoobo
// Used on [[Project:Pony Designs]] to aid in finding design matches among characters
if (
  mw.config.get('wgPageName') === 'User:Bobogoobo/sandbox/PonyDesign' &&
  !mw.util.getParamValue('action') &&
  !mw.util.getParamValue('diff')
) {
    impart('MediaWiki:Common.js/PonyDesigns.js');
}

//////////////////////
// TEMPLATE SUPPORT //
//////////////////////

// Support for [[Template:Title]]
$(function() {
    if ($('#title-meta').length) {
        var newTitle = mw.html.escape($("#title-meta").html());
        // Allow italics
        newTitle = newTitle.replace(/&lt;(\/?i)&gt;/g, '<$1>');
        var edits = $("#user_masthead_since").text();
        $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
        $("#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
    }
});

// Support for [[Template:USERNAME]]
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

// Support for [[Template:Emote]] by Bobogoobo
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
              new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' + 
              emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
              ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img />', {'src':url, 'alt':emote, 'height':19, 'width':19 }));
            }
        }

        var emotes = '';
        $.getJSON('/id/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['28113'].revisions[0]['*'];
            // 28113 is the wgArticleId of MediaWiki:Emoticons

            $('.emote-template').each(function() {
                emotify($(this));
            });
        });

        $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
            if ($('.emote-template').length === $('.emote-template img').length) {
                return;
            }

            $('#WikiaArticleFooter .emote-template').each(function() {
                if (!($(this).children('img').length)) {
                    emotify($(this));
                }
            });
        });
    });
}

// Automatically expand relevant section in [[Template:Character galleries]]
$(function(){
    if ($('table.character-galleries').length) {
        $('.character-galleries .selflink').closest('.mw-collapsible').find('.mw-collapsible-toggle a').click();
    }
});

// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
// TODO: needs fixing
$(function(){
  if ($(".toc-multicol #toc").size() !== 0) {
    $(function(){
		var x, tdToAppend, listToAppend, showtext = 'show', hidetext = 'hide';
		$("#toc").css("width","100%"); //need to subtract 12px from this for padding for some reason
		$("#toc ul").html("<table><tr><td>" + $("#toc ul").html() + "</td></tr></table>");
		var liList = $("#toc ul li").toArray();

		$('table#toc ul').remove();
		if (liList.length % 3 === 0) {
			x = 0;
		}else{
			x = 3 - (liList.length % 3);
		}
		var perCol = (liList.length + x) / 3;
		var tempElement;

		for (var colNum=0; colNum < 3; colNum++){
			listToAppend = "";
			for (var i=0+(colNum*perCol); i<(perCol*(colNum+1)); i++){
				if (typeof(liList[i]) == "undefined"){break;}
				tempElement = document.createElement("div");
				tempElement.appendChild(liList[i]);
				listToAppend += tempElement.innerHTML;
			}
			tdToAppend += '<td style="vertical-align: top; width: 33%;"><ul><table><tbody><tr><td><table><tbody><tr><td><table><tbody><tr><td>'+listToAppend+'</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></ul></td>';
		}

		$('#toc tbody').append('<tr>'+tdToAppend+'</tr>');
		$('#toc tbody tr:eq(0) td').attr("colspan", "3");
		var indentFactor = 10;
		$("head").append("<style>.toclevel-1{padding-left: "+(indentFactor*1)+"px !important}.toclevel-2{padding-left: "+(indentFactor*2)+"px !important}.toclevel-3{padding-left: "+(indentFactor*3)+"px !important}.toclevel-4{padding-left: "+(indentFactor*4)+"px !important}</style>");
		$("#togglelink").off("click").click(function(e){e.preventDefault(); $('#toc ul').slideToggle("fast");
			if ($(this).text() === showtext) { $(this).text(hidetext); } else { $(this).text(showtext); } });
		if (!$('#toc ul').is(':hidden') && $('#togglelink').text() === showtext) {
			$('#togglelink').text(hidetext);
		}
    });
  }
});

///////////////////
// MISC. SCRIPTS //
///////////////////

// Fix lazy-loaded tabbified profile images
if ($("div.profile-image img.lzyPlcHld").length > 0){
    $("div.profile-image img.lzyPlcHld").each(function(){
        $(this).attr("src", $(this).attr("data-src"));
    });
}

// Change links pointing to specific list of ponies entries to go to /full.
// Please do not link there manually.
$('a[href^="/wiki/List_of_ponies#"]').each(function() {
    $(this).attr('href', $(this).attr('href').replace('#', '/full#'));
});

// Automatically uncheck "Leave a redirect behind" on files
if (mw.config.get('wgPageName').indexOf('Special:MovePage/File:') !== -1) {
    $('input#wpLeaveRedirect').removeAttr('checked');
}


// Automatically uncheck "Unlock further protect options" when protecting a page
if (mw.config.get('wgAction') === 'protect') {
    $('#mwProtectUnchained').removeAttr('checked');
}

// Auto-insert link from anchor on [[Help:Red links]]
// Please report anything that still doesn't work right, it may need more exceptions
$(document).ready(function(){
    var redlink = window.location.hash;
    if (mw.config.get('wgPageName') === 'Help:Red_links' && redlink !== '') {
        redlink = redlink.slice(1);
        if (redlink.charAt(0) === ':') { redlink = redlink.substring(1); }
        if (redlink.substr(0, 5) !== 'File:') {
            redlink = redlink.replace(/\./g, '%');
        } else {
            var head = redlink.substring(0, redlink.lastIndexOf('.'));
            var tail = redlink.substring(redlink.lastIndexOf('.'));
            redlink = head.replace(/\./g, '%') + tail;
        }
        $("#insertredlink a").attr(
            "href", "/wiki/" + decodeURIComponent(redlink).replace(/\?/g, '%3F') + "?action=history"
        );
        $("#insertredlink a").css("font-weight", "bold");
    }
});

// Add a "view source" button when the Edit button goes to Special:SignUp
$(function() {
    var $a = $('a[data-id="edit"]');
    if ($a.length && $a.attr('href').indexOf('Special:SignUp') !== -1) {
        $a.parent().children('ul.WikiaMenuElement').prepend(
            '<li><a href="/wiki/' + mw.config.get('wgPageName') + 
            '?action=edit">Lihat sumber</a></li>'
        );
    }
});

// File name validation for possible FANMADE images by Ozuzanna
$(function(){
    if (mw.config.get('wgCanonicalSpecialPageName') == "Upload" || mw.config.get('wgCanonicalSpecialPageName') == "MultipleUpload") {
        var uploadStage = -1;
     
        $('.mw-htmlform-submit').click(function(e) {
            var wordRegex = new RegExp (/((_| )oc(_| )|author|fanmade|(_| )by(_| ))/gi);
            if (mw.config.get('wgCanonicalSpecialPageName') == "Upload") {
                var filename = $('#wpDestFile').val(),
                nameStart = filename.substring(0,7);
                $('#wpDestFile').val($('#wpDestFile').val().replace('.PNG','.png').replace('.GIF','.gif').replace('.jpeg','.jpg').replace('.JPG','.jpg').replace('.JPEG','.jpg'));
                if (nameStart != "FANMADE" && wordRegex.test(filename) && uploadStage !== 0) {
                    e.preventDefault();
                    alert('Nama berkas yang kamu pilih mungkin memerlukan "FANMADE" di bagian depan. Silakan periksa sebelum mengunggah dengan nama saat ini.');
                    uploadStage++;
                }
            } else { 
                var filenames = [],
                nameStarts = [],
                fileNo = $('.mw-htmlform-field-HTMLTextField').length;
                for (var i = 0; i < fileNo; i++) {
                    filenames.push($('#wpDestFile'+i).val());
                    nameStarts.push($('#wpDestFile'+i).val().substring(0,7));
                    $('#wpDestFile'+i).val($('#wpDestFile'+i).val().replace('.PNG','.png').replace('.GIF','.gif').replace('.jpeg','.jpg').replace('.JPG','.jpg').replace('.JPEG','.jpg'));
                }
                if (nameStarts.indexOf("FANMADE") == -1 && wordRegex.test(filenames) && uploadStage !== 0) {
                    e.preventDefault();
                    alert('Satu atau lebih dari nama berkas yang kamu pilih mungkin memerlukan "FANMADE" di bagian depan. Silakan periksa sebelum mengunggah dengan nama saat ini.');
                    uploadStage++;
                }
            }
        });
    }
});

// Removes trailing hidden characters on Special:WantedFiles
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Wantedfiles') {
        $('.mw-spcontent li').each(function() {
            $(this).html($(this).html().replace(/[^\x20-\x7E]+/g, ''));
        });
    }
});

// IRC and CVNIRC login
$(function() {
    if ($('#IRClogin').length || $('#CVNIRClogin').length) {
        var nick = '';
        if (mw.config.get('wgUserName') === null) {
            nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            nick = mw.config.get('wgUserName').replace(/ /g, "_");
        }

        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=reddit-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');

        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});

/////////////
// NOTICES //
/////////////

// Alert contributors when they are editing with their bot flag set
if ((mediaWiki.config.get("wgAction") === "edit" || mediaWiki.config.get("wgAction") === "submit") && mediaWiki.config.get("wgUserGroups").indexOf("bot") !== -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: red; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">CATATAN: Kamu saat ini sedang mengedit dengan set bendera botmu.</div>');
}

// Notice not to add video descriptions when editing the file page
if (
  (mw.config.get("wgAction") === "edit" || mw.config.get("wgAction") === "submit") &&
  mw.config.get('wgCanonicalNamespace') === "File" &&
  !(/.(png|gif|jp(e)?g|ogg|pdf)/gi.test(mw.config.get('wgPageName'))) &&
  mw.config.get('wgUserGroups').indexOf('sysop') === -1
) {
    $("#EditPageHeader").after('<div style="background-color: red; color:white; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">Harap jangan menambahkan deskripsi ke video kecuali jika diperlukan seperti untuk tujuan mengutip atau sumber.</div>');
}

// Notice not to make one-use user templates
if (
  mw.config.get('wgCanonicalNamespace') === "Template" &&
  !$('#wpTextbox1').val() &&
  (mw.config.get('wgAction') === "edit" || mw.config.get('wgAction') === "submit") &&
  mw.config.get('wgUserGroups').indexOf('sysop') === -1
) {
    $("#EditPageHeader").after('<div style="background-color: red; color:white; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">Tolong jangan membuat templat pengguna di ruang nama Templat. Jika ini akan menjadi pengguna atau templat tanda tangan, <a href="/wiki/User:'+mw.config.get('wgUserName')+'/'+mw.config.get('wgPageName').slice(9)+'?action=edit">harap buat di sini sebagai gantinya</a>.</div>');
}

// Video Module [[FW:DN]] notice when uploading
$('#VideoEmbedUrlSubmit').click(function() {
    setTimeout(function() { 
        if ($('#VideoEmbedThumb').length) {
            $('#VideoEmbedNameRow').before('Harap pastikan nama mematuhi to the <a href="/wiki/Help:Descriptive_name">kebijakan nama deskriptif</a> sebelum mengunggah.'); 
        }
    }, 1000);
});

//////////////////////
// ADVANCED SCRIPTS //
//////////////////////

// Auto-redirect on Special:Search for SXXEXX by Bobogoobo
$(function() {
    var search = mw.util.getParamValue('query');
    if (
      mw.config.get('wgPageName') === 'Special:Search' &&
      search.length <= 6 &&
      /S\d+E\d+/i.test(search)
    ) {
        $('.results-wrapper p').html('Mengarahkan kembali ke episode...');

        var s, e;
        s = search.toLowerCase().split('e')[0].substr(1);
        e = search.toLowerCase().split('e')[1];
        $.getJSON('/id/api.php?action=edit&action=parse&text={{mengubahnama|' + 
          s + '|' + e + '}}&format=json', function(data) {
            var episode = (data.parse.text['*'].match(/\>(.*)\n\</) || [0, 0])[1];
            if (episode && episode !== 'Akan diumumkan' && episode.indexOf('<span class="error">') === -1) {
                $('.results-wrapper p').append($('<a />', {
                    'href':'/wiki/' + encodeURIComponent(episode),
                    'text':episode
                }));

                window.location.href = window.location.href.substring(0, 
                  window.location.href.lastIndexOf('/') + 1) + episode;
            } else {
                $('.results-wrapper p').html('Episode tidak ditemukan.');
            }
        });
    }
});

// Automatically add categories on Special:Upload, by Bobogoobo
// To delete stored data: window.sessionStorage.removeItem('characterCategories')
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Upload' ||
      mw.util.getParamValue('wpForReUpload')) {
        return;
    }

    var $summary = $('#wpUploadDescription'), $filename = $('#wpDestFile'), eptest = /S\d+E\d+/i,
      charCats = [], charCatsEG = [], shortcuts = {'EG':{}}, pending = 0,
      nicknames = {'Lyra Heartstrings':'Lyra', 'Putri Luna':'Nightmare Moon'}, //be careful
      ccStorage = window.sessionStorage.characterCategories;

    function nameCat(input) {
        return input.substring(9).replace('Gambar ', '');
        //return 'Mr. Fluffykins';
    }

    function cat(str) {
        if ($summary.val().indexOf('[[' + 'Kategori:' + str + ']]') === -1) {
            $summary.val($summary.val() + ($summary.val() ? '\n' : '') + 
              '[[' + 'Kategori:' + str + ']]');
        }
    }

    function profile() { //profile images
        if (/\sID(?:\s|\.png|\.jpg)/i.test($filename.val().replace(/_/g, ' '))) {
            cat('Gambar profil');
        }
    }

    function findCats(filename, isEG) {
        var arr = isEG ? charCatsEG : charCats;

        for (var i = 0; i < arr.length; i++) {
            if (filename.indexOf(nameCat(arr[i])) !== -1) {
                cat(arr[i].substring(9) + (isEG ? '/EG' : '')); //meow
            }
        }
        if (isEG) {
            $.each(shortcuts.EG, function(key, value) {
                if (filename.indexOf(nameCat(key)) !== -1) {
                    cat(value.substring(9) + '/EG');
                }
            });
        } else {
            $.each(shortcuts, function(key, value) {
                if (filename.indexOf(nameCat(key)) !== -1 && key !== 'EG') {
                    cat(value.substring(9));
                }
            });
        }
    }

    $('#wpUploadDescription').closest('tr').after(
      '<tr><td></td><td id="char-cat-warning"><p><strong>Catatan:</strong> ' +
      'skrip kategori karakter hanya akan menambahkan karakter yang sepenuhnya disebutkan dalam nama berkas.<br />' +
      'Harap perbaiki kategori yang salah dan tambahkan yang hilang. Laporkan masalah apa pun ' +
      '<a href="/wiki/Pembicaraan_Pengguna:Ivan_the_Brony_Kaiju" title="Pembicaraan Pengguna:Ivan the Brony Kaiju">di sini</a>.<br />' +
      'Pemuatan basis data kategori karakter...</p></td></tr>'
    );

    if (typeof ccStorage !== 'undefined') {
        charCats = JSON.parse(ccStorage).charCats;
        charCatsEG = JSON.parse(ccStorage).charCatsEG;
        shortcuts = JSON.parse(ccStorage).shortcuts;
        $('#char-cat-warning p').append('diambil dari penyimpanan.');
    }

    if (typeof window.sessionStorage !== 'undefined' && !window.sessionStorage.characterCategories) {
    $.getJSON('/id/api.php?action=query&list=categorymembers&cmtitle=Kategori:Gambar karakter' +
      '&cmprop=title&cmlimit=max&format=json', function(data) { //will need update if we get over 500 of these
        pending += 1;

        function checkComplete() {
            if (pending === 0 && charCats.length > 0) {
                $('#char-cat-warning p').append('done!');
                if (typeof window.sessionStorage !== 'undefined') {
                    window.sessionStorage.characterCategories = JSON.stringify({
                        'charCats': charCats,
                        'charCatsEG': charCatsEG,
                        'shortcuts': shortcuts
                    });
                    $('#char-cat-warning p').append(' Disimpan ke penyimpanan sesi browser.');
                }
            }
        }

        function fEach(response) {
            pending += response.query.categorymembers.length;
            $.each(response.query.categorymembers, function(index, value) {
                if (value.title === 'Category:Gambar Cutie Mark Crusaders' ||
                  value.title === 'Category:Gambar karakter Equestria Girls') {
                    pending -= 1;
                    return; //saw the EG category after doing everything else :P This is probably easier anyway
                }

                if (value.title.substring(value.title.length - 3) === '/EG') {
                    charCatsEG.push(value.title.replace('/EG', ''));
                    if (value.title.indexOf('Putri') !== -1) {
                        shortcuts.EG[value.title.replace('Putri ',
                          '').replace('/EG', '')] = value.title.replace('/EG', '');
                    }
                } else {
                    charCats.push(value.title);
                    if (value.title.indexOf('Putri') !== -1) {
                        shortcuts[value.title.replace('Putri ', '')] = value.title;
                    }
                    if (nicknames[nameCat(value.title)]) {
                        shortcuts['Kategori:' + 'Gambar ' + nicknames[nameCat(value.title)]] = value.title;
                    }
                }
                fGet(value.title);
            });
        }

        function fGet(title) {
            $.getJSON('/id/api.php?action=query&list=categorymembers&cmtitle=' + title +
              '&cmprop=title&cmtype=subcat&cmlimit=max&format=json', function(response) {
                if (response.query.categorymembers.length) {
                    fEach(response);
                }
                pending -= 1;
                checkComplete();
            });
        }

        fEach(data);
        pending -= 1;
        checkComplete();
    });}

    $filename.change(function() {
        var name = $filename.val().replace(/_/g, ' ');

        if ($summary.val().indexOf('[[Kategori:') !== -1) {
            return;
        } else if (name.substring(0, 6) === 'SLIDER') { //front page sliders
            cat('Peluncuran halaman utama');
        } else if (eptest.test(name)) { //episodes
            var match = name.match(eptest)[0].split(/e/i);

            $.getJSON('/id/api.php?action=parse&text={{Mengubahnama|' + 
              match[0].substr(1) + '|' + match[1] + '}}&format=json', function(data) {
                var episode = (data.parse.text['*'].match(/>(.*)\n</) || [0, 0])[1];
                if (episode &&
                    episode !== 'Akan diumumkan' && 
                    episode.indexOf('<span class="error">') === -1
                ) {
                    cat('Gambar ' + episode);
                    findCats(name, false);
                    profile();
                }
            });
        } else if (/\sEG(?:\s|\.png)/i.test(name)) { //Equestria Girls
            cat('Gambar Equestria Girls');
            findCats(name, true);
            profile();
        } else if ({'Comic ':1, 'Comics':1}[name.substring(0, 6)]) {
            cat('Gambar komik');
            profile();
        } else if (name.substring(0, 7) === 'FANMADE') { //fanmade images
            cat('Gambar buatan penggemar');
        }
    });

    $('#mw-upload-form').on('DOMNodeInserted', '#mw-upload-thumbnail', function(ev) {
        if (ev.target.id === 'mw-upload-thumbnail') {
            $filename.change();
        }
    });
});

// List of ponies stripping script for [[list of ponies/fast]] by Bobogoobo
//   AKA Ultra Fast Pony (wacarb don't sue me pls)
// TODO: when fixing this for the full list of ponies, hardcode whatever I want in the lead section
//   (old text: http://mlp.wikia.com/wiki/List_of_ponies?oldid=1403315 )
$(function() {
    if (
      mw.config.get('wgPageName') !== 'Daftar_poni/kecepatan' ||
      mw.util.getParamValue('action') ||
      mw.util.getParamValue('oldid')
    ) {
        return;
    }

    var page = mw.util.getParamValue('loppage') || 'Daftar_poni',
      fastpony = window.fastpony || [1, 9],
      ponycols = window.fastcolumns || ($.inArray(8, fastpony) > -1 ? 1 : 1);
        //change last 1 to 2 to enable multi-columns by default. Currently very slow.

    if (page !== 'Daftar_poni') {
        $('#lop-backlink').html('Kembali ke ').append($('<a />', {
            'href': '/wiki/Daftar_poni/kecepatan',
            'title': 'Daftar_poni/kecepatan',
            'text': 'daftar kecepatan penuh'
        })).append('.');

        $('#lop-thislink').html('Lihat ').append($('<a />', {
            'href': '/wiki/' + page + (window.location.hash ? window.location.hash : ''),
            'title': page.replace(/_/g, ' '),
            'text': 'versi penuh halaman ini'
        })).append('.');
    }

    $('#mw-content-text').after($('<img />', {
        'id': 'lopspinner',
        'style': 'margin:auto;',
        'src': 'https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif'
    }));

    $.getJSON('/id/api.php?action=parse&page=' + page + '&prop=text&format=json', function(data) {
        if (data.error) {
            $('#mw-content-text').append($('<span />', {
                'class': 'error',
                'html': data.error.info
            }));
            $('#lop-thislink').remove();
            return;
        }

        var $html = $('<div>' + data.parse.text['*'] + '</div>'),
          charpage = /Lihat <a.*>(.*)<\/a>\./, newTitle,
          $thead, $tbody, $newTable, newRows = '<tr>';

        newTitle = ($('#title-meta', $html).html() || page.replace(/_/g, ' ')) + ' (kecepatan)';
        $('#WikiaPageHeader h1:first').html(newTitle);
        document.title = newTitle + ' - ' + mw.config.get('wgSitename');

        if (page === 'Daftar_poni') {
            $('#toc', $html).parent().remove();
            $('.listofponies', $html).nextUntil('noscript').remove();

            $('a[href^="/wiki/Daftar_"]', $html).each(function() {
                $(this).attr('href', '/wiki/Daftar_poni/kecepatan?loppage=' + 
                  $(this).attr('href').replace('/wiki/', ''));
            });
        }

        $('.wikitable:first', $html).prev().remove();
        $('.wikitable:first', $html).remove();
        $('.listofponies', $html).css('width', 'auto');

        $('.listofponies tr', $html).each(function() {
            var $first = $(this).children('td:nth-child(1)'),
              $desc = $(this).children('td:nth-child(8)'),
              match, link, toRemove;

            if (
              $.inArray(8, fastpony) === -1 &&
              charpage.test($desc.html()) &&
              $desc.children('a:first').attr('title') !== 'Daftar poni' //maybe duplicates should be marked somehow?
            ) {
                match = $desc.html().match(charpage)[1];
                link = $('<a />', {
                    'href': '/wiki/' + encodeURIComponent(match.replace(/ /g, '_')),
                    'title': match,
                    'text': $first.text()
                })[0].outerHTML;

                if ($first.children('b').length) {
                    $first.html($(link).wrapInner('<b></b>'));
                } else if ($first.children('a').length) {
                    $first.children('a:first').text('(poll)');
                    $first.html(link + ' ' + $first.html());
                } else {
                    $first.html(link);
                }
            }

            toRemove = $(this).children();
            for (var i = 0; i < fastpony.length; i++) {
                toRemove = toRemove.not(':nth-child(' + fastpony[i] + ')');
            }
            toRemove.remove();
        });

        if (ponycols > 1) {
            $newTable = $('.listofponies', $html).clone().empty();

            $thead = $('tr:first', $html);
            for (var i = 1; i < ponycols; i++) {
                $thead.append('<th class="unsortable" style="width:1em;"></th>');
                for (var j = 0; j < fastpony.length; j++) {
                    $thead.append($thead.children('th').eq(j).clone());
                }
            }
            $newTable.append($thead);

            $tbody = $('tr:not(:first) td', $html);
            for (var k = 1; k < $tbody.length + 1; k++) {
                if (k % (fastpony.length * ponycols) === 0) {
                    newRows += $tbody[k-1].outerHTML + '</tr><tr>';
                } else if (k % fastpony.length === 0) {
                    newRows += $tbody[k-1].outerHTML + '<td></td>';
                } else {
                    newRows += $tbody[k-1].outerHTML;
                }
            }
            $newTable.append(newRows + '</tr>');

            $('.listofponies', $html).replaceWith($newTable);
        }

        $('#mw-content-text').append($html.html());

        // Load sortability, from Wikia/app/resources/mediawiki.page/mediawiki.page.ready.js
        mw.loader.using('jquery.tablesorter', function() {
            $('table.sortable').tablesorter();
        });

        if (window.location.hash) { window.location.hash = window.location.hash; } // go to anchor if present
    }).fail(function() {
        $('#mw-content-text').append($('<span />', {
            'class': 'error',
            'html': 'Terjadi kesalahan. Coba segarkan halaman.'
        }));
    }).always(function() {
        $('#lopspinner').remove();
    });
});

// Recreate the list of ponies on a subpage so that the full list can be displayed;
//   template include size limit is exceeded. By Bobogoobo
// http://mlp.wikia.com/wiki/List_of_ponies/full
$(function() {
    if (mw.config.get('wgPageName') !== 'Daftar_poni/penuh' || mw.util.getParamValue('action')) {
        return;
    }

    var code, templates = [], $html;

    $('#mw-content-text').html('<p>Teks ini akan diganti ketika daftar selesai memuat.</p>');

    $.getJSON('/id/api.php?action=query&prop=revisions&titles=Daftar poni&rvprop=content&rvlimit=1&format=json',
      function(data) {
        var match, search = /#lst/g, headings;

        code = data.query.pages['3151'].revisions[0]['*'];
        code = code.substring(code.indexOf('{|'), code.indexOf('\n|}') + 3);

        headings = code.substring(0, code.indexOf('|-', code.indexOf('|-') + 1));
        code = code.substring(headings.length - 1);

        $.getJSON('/id/api.php?action=parse&prop=text&disablepp=true&format=json&text=' + encodeURIComponent(headings),
          function(result) {
            headings = result.parse.text['*'];

            $('#mw-content-text').append(headings + '</th></tr></table>');

            while ((match = search.exec(code)) !== null) {
                templates.push(code.substring(match.index - 2, code.indexOf('}', match.index) + 2).replace('#', '%23'));
            }

            $html = $('#mw-content-text table.listofponies');

            $.getJSON('/id/api.php?action=parse&text={{lop legend}}&format=json&prop=text&disablepp=true', function(stuff) {
                $html.before($('<div>' + stuff.parse.text['*'] + '</div>').children('table'));
            });

            insertLists(0, finalize);
        });

        function insertLists(index, callback) {
            $.getJSON('/id/api.php?action=parse&prop=text&disablepp=true&format=json&text=' + templates[index],
              function(result) {
                var replace = {'||style':'</td><td style', '||align':'</td><td align', '||':'</td><td>',
                  '|-':'</tr><tr>', '|id':'<td id', '|data-':'<td data-', '|<':'<td><', '\\n|(\\w)':'<td>$1', 
                  '|':'>', '^(\\w*</td><td>)':'<td>$1'};

                result = result.parse.text['*'].substring(3, result.parse.text['*'].length - 4);
                $.each(replace, function(key, value) {
                    result = result.replace(new RegExp(key.replace(/([|-])/g, '\\$1'), 'g'), value);
                });// remove p tag added by parse, parse the parse

                if (index === templates.length - 1) {
                    $html.append('</td></tr><tr><td ' + result + '</td></tr>');
                    callback();
                } else if (index === 0) {
                    $html.append('<tr><td ' + result);
                    insertLists(index + 1, callback);
                } else {
                    $html.append('</td></tr><tr><td ' + result);
                    insertLists(index + 1, callback);
                }
            });
        }

        function finalize() {
            // Load sortability, from Wikia/app/resources/mediawiki.page/mediawiki.page.ready.js
            mw.loader.using('jquery.tablesorter', function() {
                $('table.sortable').tablesorter();
            });

            $('#mw-content-text > p').remove();
            $('#mw-content-text').prepend('<p>Ini adalah daftar lengkap poni sehingga setiap poni dapat dilihat ' +
              'dan disortir sekaligus. Silakan laporkan kesalahan apa pun <a href="/wiki/Pembicaraan_Pengguna:Ivan_the_Brony_Kaiju" ' +
              'title="Pembicaraan Pengguna:Ivan the Brony Kaiju">here</a>. Lihat halaman induk untuk tautan ke subdaftar dan halaman terkait.' +
              '<br /></p>');

            if (window.location.hash) { window.location.hash = window.location.hash; } // go to anchor if present
        }
    });
});

// Support for showing/hiding of lyrics on [[Songs]] by Bobogoobo
// To specify a custom section name, use the data-lyric-section property.
//   The property should only be used for tables that are
//   without the usual number of columns and without rowspans.
// To specify which column (zero-indexed) the song name is in, use data-lyric-linkcol.
//   Only needed if nearly none of the toggles work.
// Multi-section songs are detected automatically by commas in the length column.
$(function() {
    if (mw.config.get('wgPageName') !== 'Lagu') {
        return;
    }
    
    $('.lyrics-toggle').click(function() {
        var $this = $(this), action = $this.text(), parseText = '',
            hasSection = !!$this.attr('data-lyric-section'),
            $row = $this.closest('tr'), $spanCell = $row,
            colspan = $this.closest('table').find('tr').eq(0).children('th').length,
            hasRowspan = (colspan !== $row.find('td').length),
            linkCol = $this.closest('table').attr('data-lyric-linkcol'),
            $link = $this.closest('tr').find('td').eq(
                    (hasRowspan ? 0 : (linkCol ? linkCol : (colspan !== 7 ? 0 : 1)))
                ).children('a').eq(0),
            title = $link.attr('title'),
            display = $link.text(),
            safeTitle = title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-') + 
                (hasSection ? $('.lyrics-toggle').index($this) : ''),
            section = $this.attr('data-lyric-section') || 'song',
            numParts = (hasSection ?
                section.split('|').length :
                $this.parent().prev().prev().text().split(',').length// "Length" column
            );

        if (action === 'Kembangkan') {
            $this.text('Ciutkan');
            while ($spanCell.children('td').length !== colspan) {
                $spanCell = $spanCell.prev();
            }
            $spanCell = $spanCell.children('td').eq(0);
            if ($spanCell.attr('rowspan')) {
                $spanCell.attr('rowspan', +$spanCell.attr('rowspan') + 1);
            }
            $row.after($('<tr />', {
                'id': 'lyrics-row-' + safeTitle,
                'html': '<td colspan="' + ($spanCell.attr('rowspan') ? colspan - 1 : colspan) + '"></td>'
            }));
            for (var i = 0; i < numParts; i++) {
                if (numParts === 1) {
                    parseText = '{{%23lst:' + title + '|' + section + '}}';
                } else {
                    if (i > 0) {
                        parseText += '<br /><br /><hr style="margin-left:-24px;" /><br />';
                    }
                    parseText += '{{%23lst:' + title + '|';
                    if (numParts === 2 && !hasSection) {
                        parseText += (i ? 'reprise' : 'song') + '}}';
                    } else if (hasSection) {
                        parseText += section.split('|')[i] + '}}';
                    } else {
                        parseText += 'song' + (i + 1) + '}}';
                    }
                }
            }
            $.getJSON('/id/api.php?action=parse&format=json&prop=text&disablepp=true&text=' +
                parseText.replace(/&/g, '%26'),
              function(data) {
                var $newRow = $('#lyrics-row-' + safeTitle);
                if ($newRow.length) {
                    data = data.parse.text['*'];
                    $newRow.children('td').html('<h4 style="padding-left:0;">' +
                      display + '</h4>' + data);
                }
            });
        } else if (action === 'Ciutkan') {
            $this.text('Kembangkan');
            var $removeRow = $('#lyrics-row-' + safeTitle);
            if (+$removeRow.find('td').eq(0).attr('colspan') !== colspan) {
                while ($spanCell.children('td').length !== colspan) {
                    $spanCell = $spanCell.prev();
                }
                $spanCell = $spanCell.children('td').eq(0);
                $spanCell.attr('rowspan', +$spanCell.attr('rowspan') - 1);
            }
            $removeRow.remove();
        }
    });
});

/* Untuk lirik bahasa Indonesia */
$(function() {
    if (mw.config.get('wgPageName') !== 'Lagu') {
        return;
    }
    
    $('.lirik-beralih').click(function() {
        var $this = $(this), action = $this.text(), parseText = '',
            hasSection = !!$this.attr('data-lyric-section'),
            $row = $this.closest('tr'), $spanCell = $row,
            colspan = $this.closest('table').find('tr').eq(0).children('th').length,
            hasRowspan = (colspan !== $row.find('td').length),
            linkCol = $this.closest('table').attr('data-lyric-linkcol'),
            $link = $this.closest('tr').find('td').eq(
                    (hasRowspan ? 0 : (linkCol ? linkCol : (colspan !== 7 ? 0 : 1)))
                ).children('a').eq(0),
            title = $link.attr('title'),
            display = $link.text(),
            safeTitle = title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-') + 
                (hasSection ? $('.lirik-beralih').index($this) : ''),
            section = $this.attr('data-lyric-section') || 'lagu',
            numParts = (hasSection ?
                section.split('|').length :
                $this.parent().prev().prev().text().split(',').length// "Length" column
            );

        if (action === 'Kembangkan') {
            $this.text('Ciutkan');
            while ($spanCell.children('td').length !== colspan) {
                $spanCell = $spanCell.prev();
            }
            $spanCell = $spanCell.children('td').eq(0);
            if ($spanCell.attr('rowspan')) {
                $spanCell.attr('rowspan', +$spanCell.attr('rowspan') + 1);
            }
            $row.after($('<tr />', {
                'id': 'lyrics-row-' + safeTitle,
                'html': '<td colspan="' + ($spanCell.attr('rowspan') ? colspan - 1 : colspan) + '"></td>'
            }));
            for (var i = 0; i < numParts; i++) {
                if (numParts === 1) {
                    parseText = '{{%23lst:' + title + '|' + section + '}}';
                } else {
                    if (i > 0) {
                        parseText += '<br /><br /><hr style="margin-left:-24px;" /><br />';
                    }
                    parseText += '{{%23lst:' + title + '|';
                    if (numParts === 2 && !hasSection) {
                        parseText += (i ? 'ulangan' : 'lagu') + '}}';
                    } else if (hasSection) {
                        parseText += section.split('|')[i] + '}}';
                    } else {
                        parseText += 'lagu' + (i + 1) + '}}';
                    }
                }
            }
            $.getJSON('/id/api.php?action=parse&format=json&prop=text&disablepp=true&text=' +
                parseText.replace(/&/g, '%26'),
              function(data) {
                var $newRow = $('#lyrics-row-' + safeTitle);
                if ($newRow.length) {
                    data = data.parse.text['*'];
                    $newRow.children('td').html('<h4 style="padding-left:0;">' +
                      display + '</h4>' + data);
                }
            });
        } else if (action === 'Ciutkan') {
            $this.text('Kembangkan');
            var $removeRow = $('#lyrics-row-' + safeTitle);
            if (+$removeRow.find('td').eq(0).attr('colspan') !== colspan) {
                while ($spanCell.children('td').length !== colspan) {
                    $spanCell = $spanCell.prev();
                }
                $spanCell = $spanCell.children('td').eq(0);
                $spanCell.attr('rowspan', +$spanCell.attr('rowspan') - 1);
            }
            $removeRow.remove();
        }
    });
});

// Combines all of the tables on [[Media animasi Keajaiban Persahabatan]]
//   into a single table for easy sorting.
// Adds a button in the header to show the table.
// Script by Bobogoobo
$(function () {
    if (
        mw.config.get('wgPageName') !== 'Media_animasi_Keajaiban_Persahataban' ||
        mw.util.getParamValue('diff') ||
        mw.util.getParamValue('action')
    ) {
        return;
    }
    // Wait a little bit, because apparently the headings don't exist at the beginning.
    function doStuff () {
        var headerMap = {
            'Musim satu': 'M1',
            'Musim dua': 'M2',
            'Musim tiga': 'M3',
            'Equestria Girls': 'EG01',
            'Musim empat': 'M4',
            'Equestria Girls: Rainbow Rocks': 'EG02',
            'Pendek Prekuel': 'PP',
            'Film': '',
            'Pendek Ulangan': 'PU',
            'Musim lima': 'M5',
            'Equestria Girls: Friendship Games': 'EG03',
            'Pendek animasi': 'PA',
            'Musim enam': 'S6',
            'Equestria Girls: Legend of Everfree': 'EG04',
            'The Movie': 'M1',
        };
        var $table = $('#WikiaArticle table').not('.toc').eq(0).clone();
        var $headers = $('#WikiaArticle table').not('.toc').eq(0).find('thead').clone();
        $headers.find('th').eq(0).after(
            '<th style="width:4.5em;"><span title="Nomor episode saat muncul di ' +
            'DVD, Blu-ray, iTunes, Google Play, Netflix dan rilis internasional" ' +
            'style="cursor:help; border-bottom:1px dotted">P№</span></th>'
        );
        $table.empty().append($headers).append('<tbody></tbody>');
        $('#WikiaArticle table').not('.toc').not('.ambox').each(function () {
            var $this = $(this);
            var $heading = $this.prev(), $parentHeading;
            while (['H2', 'H3'].indexOf($heading.prop('tagName')) === -1) {
                $heading = $heading.prev();
            }
            if ($heading.prop('tagName') === 'H3') {
                $parentHeading = $heading.prev();
                while ($parentHeading.prop('tagName') !== 'H2') {
                    $parentHeading = $parentHeading.prev();
                }
            }
            $heading = $heading.find('.mw-headline');
            if ($parentHeading) {
                $parentHeading = $parentHeading.find('.mw-headline');
            }
            $this.find('tbody tr').each(function () {
                if (!$(this).find('th').length) {
                    var $row = $(this).clone();
                    $row.find('.reference').remove();
                    if ($row.find('td').length === 5) {
                        $row.prepend('<td></td>');
                    }
                    var $fc = $row.find('td').eq(0), prod;
                    $fc.after('<td></td>');
                    if ($fc.find('i').length) {
                        prod = $fc.find('span').attr('title').match(/\d\d/);
                        if (prod) { prod = prod[0]; }
                        $fc.find('span').replaceWith(
                            '<span class="prorder">' + $fc.find('span').text() + '</span>'
                        );
                    }
                    $fc.html($fc.html().trim());
                    $fc.prepend(headerMap[$heading.text().trim()]);
                    if ($parentHeading) {
                        $fc.prepend(headerMap[$parentHeading.text().trim()]);
                    }
                    // Sort EG films in between PS and SS
                    if (
                        $heading.text().indexOf('Equestria Girls') !== -1 ||
                        $heading.text().trim() === 'Film'
                    ) {
                        $fc.attr('data-sort-value', $fc.text() + 'Q');
                    }
                    var $sc = $row.find('td').eq(1);
                    $sc.html($fc.html().replace(/ \(\d{1,3}\)/, ''));
                    if ($sc.find('.prorder')) {
                        $sc.find('.prorder').html(prod);
                    }
                    $table.find('tbody').append($row);
                }
            });
        });
        $table.attr('id', 'full-table');
        $table.hide();
        $table.removeClass('jquery-tablesorter');
        mw.loader.using('jquery.tablesorter', function() {
            $table.tablesorter();
        });
        $('#toc').before($table);
        // Default sort by airdate
        $('#full-table').find('thead th').eq(4).click();
        $('#WikiaPageHeader').append(
            '<a id="view-full-table" class="wikia-button primary">Lihat tabel sortir lengkap</a>'
        );
        $('#view-full-table').click(function () {
            $('#full-table').toggle();
            if ($('#full-table').is(':visible')) {
                $('#view-full-table').text('Sembunyikan tabel penyortiran lengkap');
            } else {
                $('#view-full-table').text('Tampilkan tabel sortir lengkap');
            }
        });
    }
    var to = window.setTimeout(doStuff, 3000);
});

/* 
* YouTube Music Player
* Created by Ozank Cx
* Some code taken from http://dev.wikia.com/wiki/MediaWiki:YoutubePlayer/code.js
*
* Playlist support added by Soap Shadow
* Reference: https://developers.google.com/youtube/player_parameters
*/
$(function() {
    // Make it work only in User, User_talk and User_blog namespaces
	if ($('.YTMP').length && [2,3,500].indexOf(mw.config.get('wgNamespaceNumber')) !== -1) {
		$('.YTMP').each(function() {
			var esc = mw.html.escape,
			obj = $(this),
			id = esc(obj.data('id') || ''),
			autoplay = esc('' + obj.data('autoplay')),
			loop = esc('' + obj.data('loop')),
			playlist = esc('' + obj.data('playlist') || ''),
			start = esc('' + obj.data('start')),
			// Playlist support
			listtype = esc('' + obj.data('listtype')),
			list = esc('' + obj.data('list'));

			// If playlist type and playlist id aren't blank 
			// then create the playlist embed object.
			if (listtype !== '' && list !== '') {
                obj.html('<div class="YTMP-outer"><div class="YTMP-inner"><iframe width="300" height="300" src="//www.youtube.com/embed?feature=player_embedded&listType=' + listtype + '&list=' + list + '&autoplay=' + autoplay + '&loop=' + loop + '&start=' + start + '"></iframe></div></div>');   
			} else {
                // Else create the original video id embed object.
                if (id === '') return;
                obj.html('<div class="YTMP-outer"><div class="YTMP-inner"><iframe width="300" height="300" src="//www.youtube.com/embed/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&loop=' + loop + '&playlist=' + playlist + '&start=' + start + '"></iframe></div></div>');
            }
		});
	}
});