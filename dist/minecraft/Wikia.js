/* Users blocked infinite */
window.addEventListener('load', function() {
    // Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
    setTimeout(function() {
        if (document.getElementById('UserProfileMasthead') === null) return;
        var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
        if (blockTag === null) return;
        new mw.Api().get({
            action: 'query',
            list: 'blocks',
            bkprop: 'expiry',
            bktimestamp: new Date().getTime(),
            bkusers: wgTitle
        }).done(function(d) {
            if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
                blockTag.innerHTML = 'Blocked';
            }
        });
    }, 250);
});
 
/* ###################### */
/* ##   EDIT BUTTONS   ## */
/* ###################### */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/minecraft/images/c/c8/Button_redirect.png/revision/latest?cb=20190413112710",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/c/c9/Button_strike.png",
            "speedTip": "Strike",
            "tagOpen": "<s>",
            "tagClose": "</s>",
            "sampleText": "Strike-through text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/1/13/Button_enter.png",
            "speedTip": "Line break",
            "tagOpen": "<br>",
            "tagClose": "",
            "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/7/74/Button_comment.png",
            "speedTip": "Comment visible only for editors",
            "tagOpen": "<!-- ",
            "tagClose": " -->",
            "sampleText": "Insert comment here"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133936/videogame/images/1/11/Button_category.png",
            "speedTip": "Category",
            "tagOpen": "[[Category:",
            "tagClose": "]]",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133936/videogame/images/2/23/Button_code.png",
            "speedTip": "Code",
            "tagOpen": "<code>",
            "tagClose": "</code>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133936/videogame/images/7/73/Button_code_nowiki.png",
            "speedTip": "Code Nowiki",
            "tagOpen": "<code><nowiki>",
            "tagClose": "</nowiki></code>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/3/3c/Button_pre.png",
            "speedTip": "Pre",
            "tagOpen": "<pre>",
            "tagClose": "</pre>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133939/videogame/images/7/7b/Button_pre_nowiki.png",
            "speedTip": "Pre Nowiki",
            "tagOpen": "<pre><nowiki>",
            "tagClose": "</nowiki></pre>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133936/videogame/images/5/56/Button_big.png",
            "speedTip": "Big text",
            "tagOpen": "<big>",
            "tagClose": "</big>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/5/58/Button_small.png",
            "speedTip": "Small text",
            "tagOpen": "<small>",
            "tagClose": "</small>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/6/6a/Button_sup_letter.png",
            "speedTip": "Sup",
            "tagOpen": "<sup>",
            "tagClose": "</sup>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/a/aa/Button_sub_letter.png",
            "speedTip": "Sub",
            "tagOpen": "<sub>",
            "tagClose": "</sub>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/f/fd/Button_underline.png",
            "speedTip": "Underline",
            "tagOpen": "<u>",
            "tagClose": "</u>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133938/videogame/images/d/d5/Button_noinclude.png",
            "speedTip": "Noinclude",
            "tagOpen": "<noinclude>",
            "tagClose": "</noinclude>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133937/videogame/images/7/79/Button_include.png",
            "speedTip": "Includeonly",
            "tagOpen": "<includeonly>",
            "tagClose": "</includeonly>",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133937/videogame/images/0/0c/Button_Link_DifferentName.png",
            "speedTip": "Link with a different name",
            "tagOpen": "[[",
            "tagClose": "]]",
            "sampleText": "Insert text|Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/3/3b/Button_template_alt.png",
            "speedTip": "Template",
            "tagOpen": "{{",
            "tagClose": "}}",
            "sampleText": "Insert text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/videogame/images/6/60/Button_support.png",
            "speedTip": "Support",
            "tagOpen": "{{",
            "tagClose": "}}",
            "sampleText": "support"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133938/videogame/images/9/98/Button_oppose.png",
            "speedTip": "Oppose",
            "tagOpen": "{{",
            "tagClose": "}}",
            "sampleText": "oppose"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110822133938/videogame/images/4/4f/Button_neutral.png",
            "speedTip": "Neutral",
            "tagOpen": "{{",
            "tagClose": "}}",
            "sampleText": "neutral"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110526120322/minecraft/images/d/d9/Heart.png",
            "speedTip": "Heart",
            "tagOpen": "{{",
            "tagClose": "}}",
            "sampleText": "heart"
    };
}
 
// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) {
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' second';
  } else {
    left = (diff%60) + ' seconds';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' minute, and ' + left;
    } else {
      left = (diff%60) + ' minutes, and ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' hour, ' + left;
    } else {
      left = (diff%24) + ' hours, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' day, ' + left;
    } else {
      left = diff + ' days, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************