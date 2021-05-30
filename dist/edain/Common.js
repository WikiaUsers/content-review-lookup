/* Any JavaScript here will be loaded for all users on every page load. */
window.MessageWallUserTags = {
    tagColor: '#000',
    glow: false,
    users: {
        'The Necromancer0': 'Admin',
        'Gandalf7000': 'Admin',
        'OakenShield224': 'Admin',
        'The Necromancer0 Bot': 'Bot',
        'Julio229': 'Admin',
        'Trondheim9': 'Admin',
        'FestustheRed': 'Semi-Admin'
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:BackToTopButton/code.js', /*Back to top*/
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:ReferencePopups/code.js', /*Referencepopups*/
        "u:dev:MediaWiki:Medals/code.js",
    ]
});

/** Extra toolbar options ****************************************************** 
  *
  To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
  */

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
     "speedTip": "Superscript",
     "tagOpen": "<sup>",
     "tagClose": "</sup>",
     "sampleText": "Superscript text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
     "speedTip": "Subscript",
     "tagOpen": "<sub>",
     "tagClose": "</sub>",
     "sampleText": "Subscript text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Small Text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Insert hidden Comment",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Comment"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
     "speedTip": "Insert a picture gallery",
     "tagOpen": "\n<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
     "speedTip": "Insert block of quoted text",
     "tagOpen": "<blockquote>\n",
     "tagClose": "\n</blockquote>",
     "sampleText": "Block quote"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Insert a table",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

window.railWAM = {
    logPage:"Project:WAM Log",
    top5000Mode: false
};

//Tabber Links
 tabberOptions = {
   onLoad: function() {
     if (window.location.hash) {
       var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
       var currentTabber = this;
       $(".tabbernav li a", this.div).each(function(i) { 
         if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
       });
       delete currentTabber;
     }
   }
 };

SpoilerAlert = {
    question: 'This page may contain strong language, are you sure you want to keep going?',
    yes: 'Yes, I understand.',
    no: 'No, get me out!',
    isSpoiler: function () {
        return Boolean($('.mature').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

//DROP DOWN MENU
function ddm() {

    // Variables, change these in case you need to set other class names (mmhide_ for 
    // contribute users for example)
    var parentClass = 'isParent'; //gets applied when the LI has a nested UL
    var activeParentClass = 'isActive'; //gets applied when the nested UL is visible
    var preventHoverClass = 'nohover'; //denotes a navigation that should not get any hover effects
    var indicateJSClass = 'dhtml'; //gets applied to the main navigation when Javascript is available
    var toHideClass = 'hiddenChild'; //gets applied to hide the nested UL
    var toShowClass = 'shownChild'; //gets applied to show the nested UL
    var currentClass = 'current'; //denotes the current active sub element and prevents collapsing
    var d = document.getElementById('nav'); //denotes the navigation element 

    // if DOM is not available stop right here.
    if (!document.getElementById && !document.createTextNode) {
        return;
    }

    // if the navigation element is available, apply the class denoting DHTML capabilities
    if (d) {
        d.className += d.className == '' ? indicateJSClass : ' ' + indicateJSClass;
        var lis, i, firstUL, j, apply;

        // loop through all LIs and check which ones have a nested UL
        lis = d.getElementsByTagName('li');
        for (i = 0; i < lis.length; i++) {
            firstUL = lis[i].getElementsByTagName('ul')[0];
                // if there is a nested UL, deactivate the first nested link and apply the class to show 
                // there is a nested list
            if (firstUL) {
                lis[i].childNodes[0].onclick = function() {
                    return false;
                };
                lis[i].className += lis[i].className == '' ? parentClass : ' ' + parentClass;
                // check if there is a "current" element 
                apply = true;
                if (new RegExp('\\b' + currentClass + '\\b').test(lis[i].className)) {
                    apply = false;
                }
                if (apply) {
                    for (j = 0; j < firstUL.getElementsByTagName('li').length; j++) {
                        if (new RegExp('\\b' + currentClass + '\\b').test(firstUL.getElementsByTagName('li')[j].className)) {
                            apply = false;
                            break;
                        }
                    }
                }
                // if there is no current element, apply the class to hide the nested list
                if (apply) {
                    firstUL.className += firstUL.className == '' ? toHideClass : ' ' + toHideClass;
                    // check if there is a class to prevent hover effects and only apply the function
                    // onclick if that is the case, otherwise apply it onclick and onhover
                    if (new RegExp('\\b' + preventHoverClass + '\\b').test(d.className)) {
                        lis[i].onclick = function() {
                            doddm(this);
                        };
                    } else {
                        lis[i].onclick = function() {
                            doddm(this);
                        };
                        lis[i].onmouseover = function() {
                            doddm(this);
                        };
                        lis[i].onmouseout = function() {
                            doddm(null);
                        };
                    }
                    // if there is a current element, define the list as being kept open and apply the 
                    // classes to show the nested list and define the parent LI as an active one
                } else {
                    lis[i].keepopen = 1;
                    firstUL.className += firstUL.className == '' ? toShowClass : ' ' + toShowClass;
                    lis[i].className = lis[i].className.replace(parentClass, activeParentClass);
                }
            }
        }
    }
    // function to show and hide the nested lists and add the classes to the parent LIs
    function doddm(o) {
        var childUL, isobj, swap;

        // loop through all LIs of the navigation       
        lis = d.getElementsByTagName('li');
        for (i = 0; i < lis.length; i++) {
            isobj = lis[i] == o;
            // function to exchange class names in an object
            swap = function(tmpobj, tmporg, tmprep) {
                tmpobj.className = tmpobj.className.replace(tmporg, tmprep);
            };
            // if the current LI does not have an indicator to be kept visible
            if (!lis[i].keepopen) {
                childUL = lis[i].getElementsByTagName('ul')[0];
                // check if there is a nested UL and if the current LI is not the one clicked on
                // and exchange the classes accordingly (ie. hide all other nested lists and 
                // make the LIs parent rather than active.
                if (childUL) {
                    if (new RegExp('\\b' + preventHoverClass + '\\b').test(d.className)) {
                        if (new RegExp('\\b' + activeParentClass + '\\b').test(lis[i].className)) {
                            swap(childUL, isobj ? toShowClass : toHideClass, isobj ? toHideClass : toShowClass);
                            swap(lis[i], isobj ? activeParentClass : parentClass, isobj ? parentClass : activeParentClass);
                        } else {

                            swap(childUL, isobj ? toHideClass : toShowClass, isobj ? toShowClass : toHideClass);
                            swap(lis[i], isobj ? parentClass : activeParentClass, isobj ? activeParentClass : parentClass);
                        }
                    } else {
                        swap(childUL, isobj ? toHideClass : toShowClass, isobj ? toShowClass : toHideClass);
                        swap(lis[i], isobj ? parentClass : activeParentClass, isobj ? activeParentClass : parentClass);
                    }
                }
            }
        }
    }
}
window.onload = function() {
    ddm();
    // add other functions to be called onload below
};

function restartSlideshow(sliderId, interval) {
  var timer = null;
  var sliderElem = $('#wikiaPhotoGallery-slider-body-' + sliderId);
  sliderElem.find('.nav.selected').click();
  sliderElem.find('.nav').off('click').click(function (e) {
    if (sliderElem.find('.wikiaPhotoGallery-slider').queue().length === 0) {
      clearInterval(timer);
      WikiaPhotoGallerySlider.scroll($(this));
    }
  });
  $(window).unbind('EditPagePreviewClosed').bind('EditPagePreviewClosed', function () {
    WikiaPhotoGallerySlider.killSlider(timer);
  });
  if (sliderElem.find('ul').children().length > 1) {
    timer = setInterval(function () {
      WikiaPhotoGallerySlider.slideshow(sliderId);
    }, interval);
  }
}

$(function () {
  $('.wikiaPhotoGallery-slider-body').each(function () {
    restartSlideshow(this.id.split('-').pop(), 10000);
  })
});