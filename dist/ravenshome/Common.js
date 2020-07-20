/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
    var now = new Date(),
        tpm,
        then = timers[i].eventdate,
        diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    tpm = ' ';
  } else {
    tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left;
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
 
/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        },  
        "content-moderator": {
            u:  'content moderator',
            link: 'Special:ListUsers/content-moderator'
        },
        imagecontrol: {
            u: 'image control',
            link: 'Special:ListUsers/imagecontrol'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'content-moderator',
            'sysop',
            'rollback',
            'bot',
            'imagecontrol'
        ],
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
        newuser: true
    }
};

// Image slider
 
$(function() {
  var slideTotal = $(".cslider ul li").length;
  var slideWidth = $(".cslider ul li").width();
  var slideVideo = $(".cslider").find("figure").parent().index();
  var slideIndex = 0;
  var slideshow = setInterval(function() {
    slideIndex += 1;
    showSlide();
  }, 5500);
 
  function showSlide() {
    if (slideIndex > slideTotal - 1) {
      slideIndex = 0;
    }
 
    if (slideIndex < 0) {
      slideIndex = slideTotal - 1;
    }
 
    $(".cslider-thumbs img").removeClass("active");
    $(".cslider-thumbs img").eq(slideIndex).addClass('active');
 
    $(".cslider-caption").children().hide();
    $(".cslider").css("background-color", "#000").animate({
      height: "415px"
    }, 400);
    $(".cslider ul").stop(true, true).animate({
      left: '-' + slideWidth * slideIndex + 'px'
    }, 600).queue(function(next) {
      $(".cslider-caption").children().fadeToggle('fast');
 
      if (slideIndex == slideVideo) {
        $(".cslider").css("background-color", "transparent").animate({
          height: "506px"
        }, 400);
      }
 
      next();
    });
  }
 
  $(".cslider").mouseover(function() {
    clearInterval(slideshow);
  });
 
  $(".cslider-prev").click(function() {
    clearInterval(slideshow);
    slideIndex -= 1;
    showSlide();
  });
 
  $(".cslider-next").click(function() {
    clearInterval(slideshow);
    slideIndex += 1;
    showSlide();
  });
 
  for (var i = 0; i < slideTotal; i++) {
    var thumbnail = $(".cslider ul li img").eq(i).attr("data-src");
    $(".cslider-thumbs").append("<img src=" + thumbnail + "/>").children().first().addClass("active");
  }
 
  $(".cslider-thumbs img").click(function() {
    clearInterval(slideshow);
    slideIndex = $(this).index();
    $(".cslider-thumbs img").removeClass("active");
    $(this).addClass("active");
    showSlide(slideIndex);
  });
});

importScriptPage('MediaWiki:VideoIntegrator/VideoIntegrator.js', 'dev');