/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
var evolutionTable, highlightedEvolution;
jQuery(document).ready(function (){
evolutionTable = $("#Evolution").parent().next("table");
highlightedEvolution = $(".evolution-table td:contains(" + $('h1.page-header__title').text() + ")");
$("#Type_Effectiveness").parent().next("table").addClass("type-effectiveness-table");
evolutionTable.addClass("evolution-table");
evolutionTable.removeClass("article-table");
$(".evolution-table td:contains('" + $('h1.page-header__title').text() + "')").addClass("highlight");
highlightedEvolution.css("font-weight", "bold");
$(".highlight").prev().css({"background": "linear-gradient(to right, #ffeed670 0%,#ffa13d70 100%)", "font-family": "Baloo Paaji"});
$(".highlight").next().css({"background": "linear-gradient(to right, #ffa13d70 0%,#ffeed670 100%)", "font-family": "Baloo Paaji"});
if ($(".highlight").attr("rowspan") != null && $(".highlight").next().attr("rowspan") == null) {
  $(".evolution-table tr").each(function () {
  $(this).find("td:not([rowspan]):first").css({"background": "linear-gradient(to right, #ffa13d70 0%,#ffeed670 100%)", "font-family": "Baloo Paaji"});
});
}
});

$(".evolution-table td").each(function () {
    if ($(this).find("img").length === 0 && $(this).text().length > 0) {
        var cellArr = $(this).text().split(" ");
        var lastArr = cellArr[cellArr.length - 1];
        cellArr[cellArr.length-1] = lastArr.replace(lastArr.match(/\b\)|\W/g).join(""),"<span class=\"fas fa-caret-right\" style=\"font-size:16px;vertical-align:middle;\">&nbsp;</span>");
        var linkTxtArr = "";
        if (cellArr[0] != cellArr[0].match(/level/i)){
            var bracketIndex;
            for(var i = 0; i < cellArr.length; i++) {
                if(cellArr[i].indexOf('(') != -1) {
                    bracketIndex = i;
                    break;
                }
            }
            if (cellArr[bracketIndex] != undefined){
                linkTxtArr = cellArr.slice(0, bracketIndex).join(" ");
            } else {
                linkTxtArr = cellArr.slice(0, cellArr.length - 1).join(" ");
				bracketIndex = cellArr.length - 1;
            }
            var linkArr = "<a href=\"/wiki/" + linkTxtArr + "\">" + linkTxtArr + "</a>";
            $(this).html(linkArr + " " + cellArr.slice(bracketIndex,[cellArr.length]).join(" "));
        } else {
            $(this).html(cellArr.join(" "));
        }
        $(this).css("font-family","Baloo Paaji");
    }
});
$("#Type_Effectiveness").parent().next("table").addClass("type-effectiveness-table");
var stopPoint = 0;
var typeEffTitle = ["Weakness","Weaknesses", "Extreme Weakness", "Extreme Weaknesses", "Resistance", "Resistances", "Extreme Resistance", "Extreme Resistances", "Immunity"];
var typeEffTitleColor = ["tomato", "#ff3c1a", "#6696ff", "#1a62ff", "limegreen"];
for (i = 2; i <= ($(".type-effectiveness-table tr").length);i++) {
	var cellText = $(".type-effectiveness-table tr:nth-child("+ i +") td:first-child").text().replace(/\n/g,"");
if (cellText.indexOf("(") > 0) {
	stopPoint = cellText.indexOf("(") - 1;
} else {
	stopPoint = cellText.length;
}
    $(".type-effectiveness-table tr:nth-child("+ i +") td:first-child").css({"color": typeEffTitleColor[Math.ceil((typeEffTitle.indexOf(cellText.substring(0,stopPoint)) + 1) / 2) - 1],"font-weight":"bold"});
}

jQuery(document).ready(function (){
    var upButton;
    $("#WikiaPageBackground").append("<span class=\"back-to-top\" style=\"display:none;\" onclick=\"scrollToTop()\"></span>");
    upButton = $(".back-to-top");
    $(window).on('scroll', function () {
    if ($(window).scrollTop() > 400) {
        upButton.fadeIn("slow", function() {$(this).css({"display":"block","opacity":"1"});});
    } else {
        upButton.fadeOut("slow", function() {$(this).css({"display":"none","opacity":"0"});});
    }
    });
});

function scrollToTop() {
    $('html,body').animate({
        scrollTop: 0
    }, 700);
}
$(".closebtn").on("click", function() {
	var UCTemplate = $(this).parent();
	var UCLine = UCTemplate.next("hr");
	UCTemplate.slideUp();
	UCLine.slideUp();
});
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirect",
		"tagOpen": "#REDIRECT [" + "[",
		"tagClose": "]]",
		"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/1/13/Button_enter.png",
		"speedTip": "Line break",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "//images.wikia.com/central/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://cdn.pixabay.com/photo/2012/04/11/12/26/alignment-27939_960_720.png",
		"speedTip": "Center align selected text",
		"tagOpen": "<center>",
		"tagClose": "</center>",
		"sampleText": "Centered Text"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG",
		"speedTip": "Sprite and Link",
		"tagOpen": "[[File: MS.png]] [[",
		"tagClose": "]]",
		"sampleText": "Pokemon"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://www.babybedding.com/images/fabric/solid-silver-gray-fabric_medium.jpg",
		"speedTip": "Common",
		"tagOpen": "{{Color-Common}}",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://www.rtings.com/images/test-materials/2015/204_Gray_Uniformity.png",
		"speedTip": "Uncommon",
		"tagOpen": "{{Color-Uncommon}}",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://cdn.wallpapersafari.com/43/27/BfyFnY.jpg",
		"speedTip": "Rare",
		"tagOpen": "{{Color-Rare}}",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://cdn.wallpapersafari.com/35/18/sGjl2t.jpg",
		"speedTip": "Rare",
		"tagOpen": "{{Color-Very-Rare}}",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://pngimg.com/uploads/rainbow/rainbow_PNG5570.png",
		"speedTip": "Rare",
		"tagOpen": "{{Color-Legendary}}",
		"tagClose": "",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/2000px-Red.svg.png",
		"speedTip": "Red",
		"tagOpen": "<span style= 'color:tomato;'>'''",
		"tagClose": "'''</span>",
		"sampleText": "Text"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.bzflag.org/bnoran/Dark%20Red%20Suede.png",
		"speedTip": "Dark Red",
		"tagOpen": "<span style= 'color:#ff3c1a;'>'''",
		"tagClose": "'''</span>",
		"sampleText": "Text"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Sky_Blue.png",
		"speedTip": "Blue",
		"tagOpen": "<span style= 'color:#6696ff;'>'''",
		"tagClose": "'''</span>",
		"sampleText": "Text"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Solid_blue.png",
		"speedTip": "Dark Blue",
		"tagOpen": "<span style= 'color:#1a62ff;'>'''",
		"tagClose": "'''</span>",
		"sampleText": "Text"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/uncyclopedia/images/7/72/Green.png/revision/latest?cb=20060327020342",
		"speedTip": "Green",
		"tagOpen": "<span style= 'color:limegreen;'>'''",
		"tagClose": "'''</span>",
		"sampleText": "Text"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://i.stack.imgur.com/QN5I9.png",
		"speedTip": "Color Tag Mini",
		"tagOpen": "{{",
		"tagClose": "-Mini}}",
		"sampleText": " "
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://www.clker.com/cliparts/n/0/t/t/S/k/red-rounded-rectangle-button-yellow-border-hi.png",
		"speedTip": "Color Tag",
		"tagOpen": "{{Color-",
		"tagClose": "}}",
		"sampleText": " "
	};
}
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ArchiveBoards/code.js"
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js"
    ]
});
(function() {
    if(mw.config.get('wgPageName') !== 'Mystery Gift Codes') {
        return;
    }
    var loaded;
    mw.hook('wikipage.content').add(function() {
        if($('#WikiaArticleComments') && !loaded) {
            loaded = true;
            $('#article-comments').prepend(
                $('<div>', {
                    id: 'article-comments-warning'
                }).html('Before you comment: <br> We do NOT make the codes. ')
            );
        }
    });
})();
var links = document.querySelectorAll('.ripple');

for (var i = 0, len = links.length; i < len; i++) {
  links[i].addEventListener('click', function(e) {
    var targetEl = e.target;
    var inkEl = targetEl.querySelector('.ink');

    if (inkEl) {
      inkEl.classList.remove('animate');
    }
    else {
      inkEl = document.createElement('span');
      inkEl.classList.add('ink');
      inkEl.style.width = inkEl.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
      targetEl.appendChild(inkEl);
    }

    inkEl.style.left = (e.offsetX - inkEl.offsetWidth / 2) + 'px';
    inkEl.style.top = (e.offsetY - inkEl.offsetHeight / 2) + 'px';
    inkEl.classList.add('animate');
  }, false);
}

var link2 = document.querySelectorAll('a');

for (var i = 0, len = link2.length; i < len; i++) {
  link2[i].addEventListener('click', function(e) {
    var targetEl = e.target;
    var inkEl = targetEl.querySelector('.ink');

    if (inkEl) {
      inkEl.classList.remove('animate');
    }
    else {
      inkEl = document.createElement('span');
      inkEl.classList.add('ink');
      inkEl.style.width = inkEl.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
      targetEl.appendChild(inkEl);
    }

    inkEl.style.left = (e.offsetX - inkEl.offsetWidth / 2) + 'px';
    inkEl.style.top = (e.offsetY - inkEl.offsetHeight / 2) + 'px';
    inkEl.classList.add('animate');
  }, false);
}