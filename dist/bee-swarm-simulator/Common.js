/* Any JavaScript here will be loaded for all users on every page load. */

//parallax
$(window).scroll(function(){    
    var wScroll=$(this).scrollTop();
    $('.para-content-profile').css({'transform':'translate(0px, '+wScroll/16+'%)'});
    $('.para-content-profile2').css({'transform':'translate(0px, -'+wScroll/16+'%)'});
    $('.bees').css({'transform':'translate(0px, -'+wScroll/14+'%)'});
    $('.checkmark').css({'transform':'translate(0px, -'+wScroll/24+'%)'});
    $('.hstorm').css({'transform':'translate('+wScroll/120+'%, '+wScroll/34+'%)'});
    $('.bokeh').css({'transform':'translate(0px, -'+wScroll+'px)'});
    $('.scrollthing1').css({'transform':'translate(0px, -'+wScroll/5+'%)'});
    $('#scroll-counter').text(wScroll*2);
});
var velocity = 0.15;

function update(){ 
    var pos = $(window).scrollTop(); 
    $('.move-bg').each(function() { 
        var $element = $(this);
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px'); 
    }); 
    $('.move-bg-inverted').each(function() { 
        var $element = $(this);
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + -Math.round((height - pos) * velocity + 300) + 'px'); 
    }); 
}


$(window).bind('scroll', update);

//Template:Username
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

// Render tags on message wall messages
mw.loader.using(['mediawiki.util', 'mediawiki.Title']).then(function () {
	function getUserTags() {
		var url = mw.util.wikiScript(),
			params = {
			action: 'raw',
			title: 'MediaWiki:ProfileTags'
		},
			map = new Map();
		
		jQuery.get(url, params, function(data) {
			if (!data.length) return;
			regex = new RegExp('(?:^|\\n)\\s*(.*?)\\s*\\|\\s*(.*?)\\s*(?:\\n|$)', "gm");
			var array = [...data.matchAll(regex)];
			
			if (array.length == 0) return;
			for (var i = 0; i < array.length; i++) {
				map.set(array[i][1].trim(),
						array[i][2].trim().split(/\s*,\s*/));
			}
		});
		return map;
	}

	function getTagClass(tag) {
        var tagClass = 'tag-' + tag.toLowerCase().replace(/\s/g, '_');
        return tagClass;
    }
	
	function getLinkTag($span, tag) {
        var re = /\[\[(.+?)\|(.+?)\]\]/,
            match = re.exec(tag),
            href = mw.util.getUrl(match[1]),
            text = match[2],
            $a = $('<a>')
                .attr('href', href)
                .css('color', 'inherit')
                .text(text);

        $span.addClass(getTagClass(tag)).append($a);
        return $span;
    }
	
	function generateTag(tag) {
		var $span = $('<span>').addClass('bss-user-message-header__tag');
		var linkTestRegex = /\[\[.+?\|.+?\]\]/;
		
		if (linkTestRegex.test(tag)) {
			$span = getLinkTag($span, tag);
		} 
		else {
			$span.addClass(getTagClass(tag)).text(tag);
		}
		return $span;
	}
	
	function insertTags($e, tags) {
		tags.forEach(function(tag) {
			$e.append(generateTag(tag));
		});
	}
	
	const userTags = getUserTags();
	setInterval(function() {
		$("div[class^='EntityHeader_entity-header__']:not(.bss-hasAppendedTag)").each(function() {
			var $this = $(this);
			var username = this.querySelector("a[class^='EntityHeader_name__']").innerText;
			if (userTags.has(username)) {
				insertTags($this, userTags.get(username));
			}
			$this.addClass("bss-hasAppendedTag");
		});
	}, 1000);
});

//BlockLog config
TBL_GROUP = "roblox-en";

///Testing this script
var quizName = "Bee Swarm Simulator's Quiz";
var quizLang = "en";
var resultsTextArray = [ 
    "You better learn more about bees!",
    "You know a little about bees, you rare bee!",
    "All your questions were right. You're a legendary bee!" 
];
var questions = [
    ["Which was the first event bee introduced?",
    "The Bear Bee",
    "The Tabby Bee",
    "The Photon Bee",
    "The Diamond Bee"], 
 
    ["Which of these is a rare bee?",
    "The Hasty Bee",
    "The Baby Bee",
    "The Buble Bee",
    "The Gummy Bee"],
 
    ["Who is the Bee Swarm Simulator's creator?",
    "Onett",
    "Onnet",
    "Onet",
    "Onnett"]
];


// background clip to text class
$(function(){
    $('.background-clip-text').css({'-webkit-background-clip':'text',
                                        '-webkit-text-fill-color':'transparent',
                             'background-clip':'text'
    });
});


importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;