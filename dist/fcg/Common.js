/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

if (skin!='monaco') {
  if (typeof ta == 'undefined') {
    var ta = [];
  }
  ta['ca-nstab-card_gallery'] = ['c','View the card gallery page'];
  ta['ca-nstab-card_rulings'] = ['c','View the card rulings page'];
  ta['ca-nstab-card_errata'] = ['c','View the card eratta page'];
  ta['ca-nstab-card_tips'] = ['c','View the card tips page'];
  ta['ca-nstab-card_appearances'] = ['c','View the card appearances page'];
  ta['ca-nstab-card_trivia'] = ['c','View the card trivia page'];
}
// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================

addOnloadHook(foldingTabsMulti);
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title += ' (click to display)';
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}

// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================
/*</pre>
<pre>*/
if(skin === "monaco") {
switch(wgCanonicalNamespace) {
case "Card_Gallery":
case "Card_Rulings":
case "Card_Errata":
case "Card_Tips":
case "Card_Appearances":
case "Card_Trivia":
case "Card_Names":
case "Card_Lores":
case "Card_Artworks":
  $(function() {
    $('<li class=""/>').append( $('<a id="ca-card" class="">Card</a>').attr({href: wgTitle.replace(/^(.*)$/, wgArticlePath)}) ).prependTo('#page_tabs');
    $('#ca-nstab-'+wgCanonicalNamespace.toLowerCase()).text(wgCanonicalNamespace.replace(/^Card_/, ''));
  });
  break;
}
$('#cardtablelinks a').clone().appendTo('<div id=cardlinks/>').parent().prependTo('.firstHeading:first');
}
/*</pre>*/