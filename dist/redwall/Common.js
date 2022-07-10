/* Any JavaScript here will be loaded for all users on every page load. */

/* 
////////////////////////////////////////////////////////////////////
// Twitter Follow Button
////////////////////////////////////////////////////////////////////
*/
mw.loader.using(['mediawiki.api', 'mediawiki.util'], function() {
    // Pages to fetch from the category.
    // The number of HTTP requests to make rises with the number of pages to fetch,
    // so don't set this to a very high number.
    var NUMBER_OF_PAGES = 10;
    if ($('.bloglist').length + $('.blogimage').length + $('.blogtime').length === 0) {
        return;
    }
    var Bloglist = {
        init: function() {
            ['list', 'image', 'time'].forEach(this.initElement, this);
            this.data = {};
            this.api = new mw.Api();
            this.indices = {};
            this.api.get({
                action: 'query',
                list: 'categorymembers',
                cmtitle: 'Category:News posts',
                cmsort: 'timestamp',
                cmdir: 'desc',
                cmlimit: NUMBER_OF_PAGES,
                formatversion: 2
            }).done(function(data) {
                data.query.categorymembers.reverse().forEach(function(page, index) {
                    this.indices[page.title] = index + 1;
                    this.fetchData(page.title);
                }, this);
            }.bind(this));
        },
        initElement: function(type) {
            this[type] = {};
            $('.blog' + type).each(function(_, element) {
                var $element = $(element);
                var index = $element.text();
                if (!this[type][index]) {
                    this[type][index] = [];
                }
                this[type][index].push($element);
            }.bind(this));
        },
        fetchData: function(title) {
            this.api.get({
                action: 'query',
                titles: title,
                prop: 'images|revisions',
                rvdir: 'newer',
                rvlimit: 1,
                rvprop: 'timestamp',
                imlimit: 500,
                formatversion: 2
            }).done(this.processData.bind(this));
        },
        processData: function(data) {
            var page = data.query.pages[0];
            var index = this.indices[page.title];
            console.log(page, index, this.list[index], this.image[index], this.time[index])
            if (this.list[index]) {
                this.list[index].forEach(function($list) {
                    $list.html($('<a>', {
                        href: mw.util.getUrl(page.title),
                        text: page.title.split(':').splice(1).join(':')
                    }));
                }, this);
            }
            if (this.image[index] && page.images && page.images.length > 0) {
                this.image[index].forEach(function($image) {
                    $image.html($('<img>', {
                        src: mw.util.getUrl('Special:FilePath/' + page.images[0].title)
                    }));
                });
            }
            if (this.time[index]) {
                this.time[index].forEach(function($time) {
                    $time.text(new Date(page.revisions[0].timestamp).toLocaleString());
                });
            }
        }
    };
    Bloglist.init();
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



$(function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/redwallwiki" class="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @Redwallwiki</a><script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script>');
});
 
$(function() {
    if (skin == 'oasis') {
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Redwall_News">Redwall News</a></li><li><a class="subnav-2a" href="/wiki/AboutRedwallWiki">About Us</a></li>');
    }
});


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