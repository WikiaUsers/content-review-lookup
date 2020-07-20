/* Any JavaScript here will be loaded for all users on every page load. */

/* 
////////////////////////////////////////////////////////////////////
// Twitter Follow Button
////////////////////////////////////////////////////////////////////
*/
$(function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/redwallwiki" class="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @Redwallwiki</a><script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script>');
});
 
/* 
////////////////////////////////////////////////////////////////////
// Google+ and YouTube elements
////////////////////////////////////////////////////////////////////
*/
importScriptPage('PlusOneButton/code.js', 'dev');


if(mwCustomEditButtons)
  mwCustomEditButtons.push({
    "imageFile": "http://images.wikia.com/redwall/images/c/c9/Button_strike.png",
    "speedTip": "Strike",
    "tagOpen": "<s>",
    "tagClose": "</s>",
    "sampleText": "Strike-through text"
  });

importScript('MediaWiki:Functions.js');

/*
function onLoad(){
    initFunctionsJS();

    addHideButtons();

    if(window.storagePresent)
        initVisibility();

}

function initVisibility(){
    var storage = globalStorage[window.location.hostname];

    var page = window.pageName.replace(/\W/g,'_');    
    var hidables = getElementsByClass('hidable');
    
    for(var i = 0; i < hidables.length; i++){
        show = storage.getItem('hidableshow-' + i  + '_' + page);
        
        if(show == 'false'){
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
            
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display != 'none'){
                button[0].onclick('bypass');
            }
        }
        else if(show == 'true'){
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
            
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display == 'none'){
                button[0].onclick('bypass');
            }
        }
    }
}

function addHideButtons(){
    var hidables = getElementsByClass('hidable');
    
    for(var i = 0; i < hidables.length; i++){
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');
        
        if(button != null && button.length > 0){
            button = button[0];
            
            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Hide]'));

            if(new ClassTester('start-hidden').isMatch(box))
                button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage){
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;
    
    if(content != null && content.length > 0){
        content = content[0];
        
        if(content.style.display == 'none'){
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Hide]';
            nowShown = true;
        }
        else{
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Show]';
            nowShown = false;
        }
        
        if(window.storagePresent && (typeof(bypassStorage) == 'undefined' || bypassStorage != 'bypass')){
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;
            
            for(var i = 0; i < items.length; i++){
                if(items[i] == parent){
                    item = i;
                    break;
                }
            }
            
            if(item == -1){
                return;
            }
        
            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}
*/

$(function() {
    if (skin == 'oasis') {
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Redwall_News">Redwall News</a></li><li><a class="subnav-2a" href="/wiki/AboutRedwallWiki">About Us</a></li>');
    }
});
/*
//Blog link retrieval
(function($, mw) {
    if ((mw.config.get('wgServer') !== 'http://redwall.wikia.com') || (document.getElementsByClassName('bloglist').length === 0)) {
        return;
    }
 
    var regex = /\d+/;
    var blogs = Array.prototype.map.call(
        document.getElementsByClassName('bloglist'),
        function(ev) {
            return ev.innerText;
        }
    );
 
    function getData(callback) {
        new mw.Api().get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:News_posts',
            cmsort: 'timestamp',
            cmdir: 'desc',
            cmlimit: 5,
            format: 'json'
        }).done(function(d) {
            if(!d.error) {
                callback(d);
            }
        });
    }
 
    function processData(result) {
        var data = result.query.categorymembers;
        blogs.forEach(function(value) {
            regex.exec(value).forEach(function(result) {
                var blog = data[Number(result) - 1].title;
                var edited = blog.split('/')[1]; //Kinda janked, may not always work
                var link = mw.config.get('wgArticlePath').replace('$1', mw.util.wikiUrlencode(blog));
                var requiredElement = document.getElementsByClassName('bloglist')[Number(result) - 1];
                $(requiredElement).html('<a href="' + link + '">' + edited + '</a>');
            });
        });
    }
 
    getData(processData);
})(this.jQuery, this.mediaWiki);*/

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.2
// **************************************************
// Embed with a span class="countdowntimer", eg:
// <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
// default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // catch negative dates
  if(diff<0) {
    diff = -diff;
    var left = 'ago since';
  } else {
    var left = 'until';
  }

  // calcuate the diff
  left = (diff%60) + ' seconds ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  tim[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  var untimers = getElementsByClassName(document, 'span', 'notimer');
  for(var i=0;i < untimers.length; i++) {
    untimers[i].style.display = 'none';    
  }
  timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
  tim = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i=0;i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* Solution to [[Forum:QT streaming/embedding]]
Author: Jesús Martínez Novo "Ciencia Al Poder"

License: http://www.gnu.org/copyleft/gpl.html GNU General Public Licence 2.0 or later

Use on a page:

<div class="DisplayQTMovie" style="width:320px; height:240px;">
[http://example.com/a_quick_time_movie.mov View the movie]
</div>

You can modify the width, height and href to fit the width, height and location of the movie.
 */
$(function parseQTMovies(){
  var divs = document.getElementById('bodyContent');
  if(divs === null) return false;
  divs = divs.getElementsByTagName('div');
  var qtobjcode = '';
  if (window.ActiveXObject){ // IE
    qtobjcode += '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" width="{width}" height="{height}" codebase="http://www.apple.com/qtactivex/qtplugin.cab">';
  }else{
    qtobjcode += '<object type="video/quicktime" data="{src}" width="{width}" height="{height}">';
  }
  qtobjcode += '<param name="src" VALUE="{src}" /><param name="src" value="{src}" /> <param name="AUTOPLAY" value="false" /> <param name="CONTROLLER" value="true" /> Download the required <a href="http://www.apple.com/quicktime/download/">QuickTime Plug-in</a> to view <a href="{src}">the movie</a>. </object>';
  for (var i = 0; i < divs.length; i++){
    if ((' DisplayQTMovie ').indexOf(' '+divs[i].className+' ') != -1){
      try{
        var qtdiv = divs[i];
        var width = qtdiv.style.width.replace('px','');
        var height = qtdiv.style.width.replace('px','');
        var src = qtdiv.getElementsByTagName('a')[0].href;
        var movie = qtobjcode.replace(/\{width\}/g,width).replace(/\{height\}/g,height).replace(/\{src\}/g,src);
        qtdiv.innerHTML = movie;
       }catch(e){}
    }
  }
});

//END QT STREAMING

//**************************************************
//Player for DailyMotion.com Videos by LordTBT 2007
//**************************************************
//Inspired by Ciencia Al Poder
/*
<div class="DisplayDM" style="width:320px; height:256px;">
[http://www.dailymotion.com/swf/3MGPqCoORG9q3pM0U View the video]
</div>

You can modify the width, height and href to fit the width, height and location of the movie.
 */
$(function playDailyMotion(){
 var ddivs = document.getElementById('bodyContent');
 if(ddivs==null) return false;
 ddivs = ddivs.getElementsByTagName('div');
  var dmobjcode = '';
  if (window.ActiveXObject){ // IE
    dmobjcode += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="{width}" height="{height}" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0">';
  }else{
    dmobjcode += '<object type="application/x-shockwave-flash" data="{src}" width="{width}" height="{height}">';
  }
  dmobjcode += '<param name="movie" VALUE="{src}" /><param name="movie" value="{src}" /> <param name="allowFullscreen" value="true" /> <param name="allowScriptAccess" value="always" /> Download the required <a href="http://www.macromedia.com/">Flash Plug-in</a> to view <a href="{src}">the movie</a>. </object>';
  for (var i = 0; i < ddivs.length; i++){
    if ((' DisplayDM ').indexOf(' '+ddivs[i].className+' ') != -1){
      try{
        var dmdiv = ddivs[i];
        var width = dmdiv.style.width.replace('px','');
        var height = dmdiv.style.width.replace('px','');
        var src = dmdiv.getElementsByTagName('a')[0].href;
        var movie = dmobjcode.replace(/\{width\}/g,width).replace(/\{height\}/g,height).replace(/\{src\}/g,src);
        dmdiv.innerHTML = movie;
       }catch(e){}
    }
  }
});

//End Daily Motion Code

/*Author: Jesús Martínez Novo "Ciencia Al Poder"

License: http://www.gnu.org/copyleft/gpl.html GNU General Public Licence 2.0 or later

Use on a page:

<div class="Docstoc" style="width:670px; height:550px;">
[http://www.docstoc.com/docs/document-preview.aspx?doc_id=4597192&mem_id=6076 View the doc]
</div>

You can modify the width, height and href to fit the width, height and location of the movie.
 */
$(function playDocstoc(){
	var divs = document.getElementById('bodyContent');
	if(divs==null) return false;
	divs = divs.getElementsByTagName('div');
	var dsobjcode = '';
	if (window.ActiveXObject){ // IE
		dsobjcode += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}" data="http://viewer.docstoc.com/" width="{width}" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">';
	}else{
		dsobjcode += '<object type="application/x-shockwave-flash" data="http://viewer.docstoc.com/" width="{width}" height="{height}">';
	}
	dsobjcode += '<param name="movie" value="http://viewer.docstoc.com/" /><param value="always" name="allowScriptAccess"><param value="true" name="allowFullScreen"><param value="transparent" name="wmode"><param value="doc_id={doc}&amp;mem_id={mem}&amp;embed=0&amp;showrelated=0&amp;showotherdocs=0" name="flashvars"> Download the required <a href="http://get.adobe.com/flashplayer/">FlashPlayer Plug-in</a> to view <a href="{src}">the doc</a>. </object>';
	for (var i = 0; i < divs.length; i++){
		if ((' Docstoc ').indexOf(' '+divs[i].className+' ') != -1){
			try{
				var dsdiv = divs[i];
				var width = dsdiv.style.width.replace('px','');
				var height = dsdiv.style.width.replace('px','');
				var src = dsdiv.getElementsByTagName('a')[0].href;
				var doc = '';
				var mem = '';
				if (src.indexOf('?') < 0) continue;
				var qsparam = src.substring(src.indexOf('?')+1,src.length).split('&');
				for (var i=0; i < qsparam.length; i++){
					var parg = qsparam[i].split('=');
					if (parg[0] == 'doc_id') doc = parg[1];
					if (parg[0] == 'mem_id') mem = parg[1];
				}
				var movie = dsobjcode.replace(/\{width\}/g,width).replace(/\{height\}/g,height).replace(/\{src\}/g,src).replace(/\{doc\}/g,doc).replace(/\{mem\}/g,mem);
				dsdiv.innerHTML = movie;
			}catch(e){};
		}
	}
});

//End Docstoc code

//**************************************************
//Twitter Widget Implementation by LordTBT 2009
//**************************************************
//Licensed under GNU
/*
<div class="Twitter" style="width:290px; height:350px;">
[http://www.twitter.com/ Twitter]
</div>
 */
function playTwitter(){
	var divs = document.getElementById('bodyContent');
	if(divs == null) return false;
	divs = divs.getElementsByTagName('div');
	var twobjcode = '';
	if (window.ActiveXObject){ // IE
		twobjcode += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="{width}" height="{height}" id="TwitterWidget" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" align="middle">';
	}else{
		twobjcode += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="{width}" height="{height}" id="TwitterWidget" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" align="middle">';
	}
	twobjcode += '<param name="movie" value="http://static.twitter.com/flash/widgets/profile/TwitterWidget.swf" /><param value="always" name="allowScriptAccess"><param value="false" name="allowFullScreen"><param value="high" name="quality"><param value="#000000" name="bgcolor"><param value="userID=36320432&styleURL=http://static.twitter.com/flash/widgets/profile/revo.xml" name="flashvars"><embed src="http://static.twitter.com/flash/widgets/profile/TwitterWidget.swf" quality="high" bgcolor="#000000" width="{width}" height="{height}" name="TwitterWidget" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="userID=36320432&styleURL=http://static.twitter.com/flash/widgets/profile/revo.xml"/></object>';
	for (var i = 0; i < divs.length; i++){
		if ((' Twitter ').indexOf(' '+divs[i].className+' ') != -1){
			try{
				var twdiv = divs[i];
				var width = twdiv.style.width.replace('px','');
				var height = twdiv.style.width.replace('px','');
				var src = twdiv.getElementsByTagName('a')[0].href;
                                var movie = twobjcode.replace(/\{width\}/g,width).replace(/\{height\}/g,height).replace(/\{src\}/g,src);
				twdiv.innerHTML = movie;
			}catch(e){ window._customTWerror = e; }
		}
	}
}

//addOnloadHook(playTwitter);

//**************************************************
//Twitter Widget Second Implementation by LordTBT 2009
//**************************************************
//Credit to designisphilosophy
/*
<div class="Twitter2" style="width:290px; height:350px;">
[http://www.twitter.com/ Twitter]
</div>
 */
$(function playTwitter2(){
    importScriptURI('http://twitter.com/javascripts/blogger.js');
    importScriptURI('http://twitter.com/statuses/user_timeline/redwallwiki.json?callback=twitterCallback2&count=5');
});

//thanks Ciencia
$(function fBox() {
	$('#redwallfbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=84155975777&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
});

$(function fBoxx() {
	$('#redwallfboxx').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/plugins/likebox.php?id=84155975777&width=292&connections=0&stream=0&header=0" allowTransparency="true" align="top" frameborder="0" width="292" height="80" scrolling="no" />');
});

$(function BnVid() {
    $('#bnvid').append('<iframe marginheight="0" marginwidth="0" src="http://media.barnesandnoble.com/linking/index.jsp?skin=oneclip&ehv=http://media.barnesandnoble.com&fr_story=b8b70aefdc0b090c7980696df26e563688d835d1&rf=ev&hl=true" frameborder="0" width="413" height="355" scrolling="no" />');
});

/*
$(function fBooxx() {
	$('#redwallfbooxx').append('<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fredwall.wikia.com&amp;send=true&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"="no" />');
});
*/

//Pcj redundancy removal
/*
$(function() {
if (wgNamespaceNumber == 6) $("#file").html($("#file").html().replace(/<br>.*<br>/i,"<br>"));
});
*/
//**************************************************
//Tweet Button by LordTBT 2010
//**************************************************
/*
<div class="Tweet">
</div>
 */

$(function() {
    $('.tweet').html('<a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-via="redwallwiki">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>');
});


//**************************************************
//Kindle For Web
//**************************************************
//
/*
<div class="Amazon">
[http://www.amazon.com Amazon]
</div>
 */

$(function fill_amazon() {
  $.getScript("http://kindleweb.s3.amazonaws.com/app/KindleReader-min.js", function() {
    amHTML = $("#kindleReaderDiv").html();
    $("#kindleReaderDiv").html("");
    KindleReader.LoadSample({containerID: 'kindleReaderDiv', asin: amHTML, width: '670', height: '700', assoctag: 'redwwiki-20'});
  });
});

$(function addFollowButton() {
   $('#follow-button').append('<a href="http://twitter.com/redwallwiki" class="twitter-follow-button" data-show-count="true">Follow @redwallwiki</a><script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script>');
});

mw.loader.using("mediawiki.api", function() {
    var config = mw.config.get([
        'wgArticlePath',
        'wgServer'
    ]);
    if ($('.bloglist').length + $('.blogimage').length + $('.blogtime').length === 0) {
        return;
    }
    console.log('hm');
    var Bloglist = {
        init: function() {
            mw.loader.using('mediawiki.api').then($.proxy(function() {
                this.api = new mw.Api();
                this.api.get({
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: 'Category:News posts',
                    cmsort: 'timestamp',
                    cmdir: 'desc',
                    cmlimit: 10
                }).done($.proxy(function(d) {
                    if(!d.error) {
                        this.data = {};
                        this.fetchData(d.query.categorymembers.map(function(el) {
                            return el.title;
                        }));
                    }
                }, this));
            }, this));
            ['list', 'image', 'time'].forEach(this.initElement, this);
        },
        initElement: function(t) {
            t = 'blog' + t;
            this[t] = {};
            $('.' + t).each($.proxy(function(_, el) {
                el = $(el);
                this[t][el.text()] = el;
            }, this));
            console.log(this);
        },
        fetchData: function(d) {
            this.api.get({
                action: 'query',
                titles: d.join('|'),
                prop: 'images|revisions',
                rvprop: 'timestamp',
                imlimit: 500
            }).done($.proxy(function(d) {
                console.log(d);
                if(!d.error) {
                    this.processData(d.query.pages);
                }
            }, this));
        },
        processData: function(d) {
            var i = 0;
            $.each(d, $.proxy(function(k, v) {
                ++i;
                if(this.bloglist[i]) {
                    this.bloglist[i].html(mw.html.element('a', {
                        href: config.wgArticlePath.replace('$1', v.title)
                    }, v.title.split(':').splice(1).join(':')));
                }
                if(this.blogimage[i] && v.images && v.images.length > 0) {
                    this.blogimage[i].html(mw.html.element('img', {
                        src: config.wgArticlePath.replace('$1', 'Special:FilePath/' + v.images[0].title)
                    }));
                }
                if(this.blogtime[i]) {
                    this.blogtime[i].text(new Date(v.revisions[0].timestamp).toLocaleString());
                }
            }, this));
        }
    };
    $($.proxy(Bloglist.init, Bloglist));
});

mw.loader.using("mediawiki.api", function() {
 
    var content = document.getElementById('bigimage').textContent;
    var blogNumber = Number(content) - 1;
 
    function getData(number, callback) {
        new mw.Api().get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:News_posts',
            cmsort: 'timestamp',
            cmdir: 'desc',
            cmlimit: 10,
            format: 'json'
        }).done(function(d) {
            if(!d.error) {
                callback(d);
            }
        });
    }
 
    function getImageData(b, callback) {
        new mw.Api().get({
            action: 'query',
            titles: b,
            prop: 'images',
            format: 'json'
        }).done(function(d) {
            if(!d.error) {
                callback(d);
            }
        });
    }
 
    function getImageInfoData(s, callback) {
        new mw.Api().get({
            action: 'query',
            titles: s,
            prop: 'imageinfo',
            iiprop: 'url',
            format: 'json'
        }).done(function(d) {
            if(!d.error) {
                callback(d);
            }
        });
    }
 
    function processData(result) {
        var data = result.query.categorymembers;
        var blog = data[blogNumber].title;
        getImageData(blog, processImageData);
    }
 
    function processImageData(result) {
        var data = result.query.pages;
        var pageId = Object.keys(data);
        var desired = data[pageId].images[0].title;
        getImageInfoData(desired, processImageInfoData);
    }
 
    function processImageInfoData(result) {
        var data = result.query.pages;
        var pageId = Object.keys(data);
        var iiUrl = data[pageId].imageinfo[0].url;
        $('#bigimage').html('<img src="' + iiUrl + '" style="max-height: 700px; max-width: 700px;">' + '</img>');
    }
 
    getData(blogNumber, processData);
});