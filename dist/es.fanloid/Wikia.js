importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleActivity.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});
importArticles({
   type: 'script',
   articles: [
       'u:dev:FloatingToc/code.js',
       'u:dev:WallGreetingButton/code.js',
   ]
});
function showAlert_notloggedin() {
	alert('Inicia sesión o regístrate para poder editar esta página.');
}
 
function showAlert() {
	alert('Esta página está protegida, no puedes editarla.');
}
function isProtectedActions() {
	$('#float-edit').removeAttr("href");
	$('#float-edit').attr('onclick', 'showAlert()');
}
function isNotLoggedInActions() {
	$('#float-edit').removeAttr("href");
	$('#float-edit').attr('onclick', 'showAlert_notloggedin()');
}
function setFloatEdit_locked() {
	$('#float-edit').css("background-image", "url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_lock_white_48px.svg)");
}
if (wgNamespaceNumber != -1 && wgNamespaceNumber != 1201 && wgNamespaceNumber != 1200 && wgNamespaceNumber != 8) {
	$("#WikiaPage").append('<a class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" id="float-edit"></a>');
	var editpath = $('a[href*="?action=edit"]').attr('href');
	var canEditProtectedPages = ($.inArray("sysop", wgUserGroups) > -1 || $.inArray("content-moderator", wgUserGroups) > -1 || $.inArray("diseñador", wgUserGroups) > -1 || $.inArray("helper", wgUserGroups) > -1 || $.inArray("staff", wgUserGroups) > -1 || $.inArray("vanguard", wgUserGroups) > -1 || $.inArray("vstf", wgUserGroups) > -1);
	$("#float-edit").attr("href", editpath);
	if ($.inArray("sysop", wgRestrictionEdit) > -1 && canEditProtectedPages === false) {
		setFloatEdit_locked();
		isProtectedActions();
 
	} else if ($.inArray("autoconfirmed", wgRestrictionEdit) > -1 && $.inArray("autoconfirmed", wgUserGroups) === -1) {
		setFloatEdit_locked();
		isProtectedActions();
	} else if (wgUserName === null) {
		setFloatEdit_locked();
		isNotLoggedInActions();
	}
	$(document).scroll(function() {
		var y = $(this).scrollTop();
		if (y > 300) {
			$('#float-edit').fadeIn();
		} else {
			$('#float-edit').fadeOut();
		}
 
	});
}
mw.loader.using(['mediawiki.api','mediawiki.util'], function() {
	if ($('a[data-id="contributions"]').length || !$('.wds-global-navigation__content-bar').length) return;
	var i18n = {
		en: "My Contributions",
		es: "Mis contribuciones"
	};
	i18n = i18n[mw.config.get("wgUserLanguage")] || i18n[mw.config.get("wgContentLanguage")] || i18n.en;
	$('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2)').after('<li><a data-id="contributions" class="wds-global-navigation__dropdown-link" href="' + mw.util.getUrl('Especial:Contribuciones/' + mw.config.get('wgUserName') ) + '">' + i18n + '</a></li>');
});
 if ( $("body").hasClass("editor") ) {
    $(document).keydown(function(event) {
        if((event.ctrlKey || event.metaKey) && event.which == 83) {
            $('#wpSave').click();
            event.preventDefault();
            return false;
        }
    });
}
$(function() {
    $('[name="wpTitle"], #blogPostTitle').keydown(function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            if($("#ok")) {
                $("#ok").click();
            }
        }
    });
});
(function ($, mw) {
    if (mw.config.get('wgNamespaceNumber') !== 2000 || window.threadIndicatorLoaded) {return;}
    window.ThreadIndicator = window.ThreadIndicator || {};
    var ThreadIndicator = $.extend({
         usepics: true,
         padlockImage: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_lock_white_18px.svg',
         padlockTitle: 'Este tema está cerrado',
         padlockText: '(cerrado)',
         highlightImage: 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_star_white_18px.svg',
         highlightTitle: 'Este tema está destacado',
         highlightText: '(destacado)'
    }, window.ThreadIndicator);
    if(ThreadIndicator.usepics === true) {
           var padlock = '<img src="'+mw.html.escape(ThreadIndicator.padlockImage)+'" alt="'+mw.html.escape(ThreadIndicator.padlockText)+'" width="20" height="20" title="'+mw.html.escape(ThreadIndicator.padlockTitle)+'" style="cursor:help;">&nbsp;';
           var highlight = '<img src="'+mw.html.escape(ThreadIndicator.highlightImage)+'" alt="'+mw.html.escape(ThreadIndicator.highlightText)+'" width="20" height="20" title="'+mw.html.escape(ThreadIndicator.highlightTitle)+'" style="cursor:help;">&nbsp;';
    } else {
           var padlock = '<strong>'+mw.html.escape(ThreadIndicator.padlockText)+'</strong>';
           var highlight = '<strong>'+mw.html.escape(ThreadIndicator.highlightText)+'</strong>';
    }
    function update() {
        $('.ThreadList .thread').each(function() {
            var $this = $(this);
            $this.find('a').css({ 
                display: "inline",
                whiteSpace: "pre-line"
            });
            $.get(mw.util.wikiScript('wikia'), {
                controller: 'Forum',
                method: 'brickHeader',
                id: $this.data('id'),
                format: 'json'
            }, function(data) {
                if (data.isClosed) {
                    $this.find('h4 > a').before(padlock);
                }
                if (data.isNotifyeveryone) {
                    $this.find('h4 > a').before(highlight);
                }
            });
        });
    }
    update();
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length || mutations.removedNodes.length) {
                update();
            }
        });
    });
    observer.observe($('.ThreadList')[0], {
        childList: true
    });
    window.threadIndicatorLoaded = true;
}(jQuery, mediaWiki));
$('a[href*="youtu.be"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('.be/')[1].split('?')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});
$('a[href*="youtube.com/watch"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('?v=')[1].split('&')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});

if (mediaWiki.config.get('wgAction') === 'view')(function() {
 
  'use strict';
 
  function createSlider() {
    var scrollPane = $(this),
      scrollPaneWidth = scrollPane.width(),
      scrollContent = scrollPane.find('.scroll-content'),
      scrollContentWidth = 0;
 
    var elems = scrollContent.find('.wikia-gallery-item')
    if (!elems.length) elems = scrollContent.find('img');
 
    elems.each(function() {
      var $this = $(this),
        width = $this.outerWidth();
      if (width) {
        scrollContentWidth += width;
      } else {
        $this.on('load', function() {
          scrollContentWidth += $this.outerWidth();
        });
      }
    });
 
    var scrollbar = scrollPane.find('.scroll-bar').slider({
      slide: function(event, ui) {
        if (scrollContentWidth > scrollPaneWidth) {
          scrollContent.css('margin-left', Math.round(
            ui.value / 100 * (scrollPaneWidth - scrollContentWidth)
          ) + 'px');
        } else {
          scrollContent.css('margin-left', 0);
        }
      }
    });
 
    scrollPane.css("overflow", "hidden");
 
    scrollbar.find('.ui-slider-handle').css({
      width: '60px',
      marginLeft: '-30px'
    });
  }
 
  $(function() {
    var imgSlider = $('.img-slider');
    if (!imgSlider.length) return;
 
    $('head')
      .append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" /><style type="text/css"> .ui-widget-header { background: transparent; border: none; } .scroll-bar-wrap{ width: 500px; margin: 0 auto; padding: 4px; background: transparent; border: none; } .ui-slider { border: 1px solid #333; box-shadow: 0 0 4px #333; background: transparent; } .scroll-bar-wrap .ui-slider-handle {background: white; border: none; } .scroll-bar-wrap .ui-slider-handle:hover { background: none repeat scroll 0 0 white; } .img-slider { overflow: hidden; white-space: nowrap; width: auto; } .img-slider * { margin: 0; padding: 0; } .img-slider figure { display: inline-block; }</style>');
 
    imgSlider
      .wrap('<div class="scroll-pane"></div>')
      .addClass('scroll-content')
      .after('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');
 
    mediaWiki.loader.using('jquery.ui.slider', function() {
      $('.scroll-pane').each(createSlider);
    });
  });
}());
 
// Slider - Portada de administración
 
$(document).ready(function() {
  $("#portada-administracion").each(function() {
    var This = $(this);
    var Nums = This.find(".seccion").size();
    This.find(".seccion:first").addClass("SeccionAct");
    This.append("<div class='control'></div>");
    This.find(".seccion").not(".SeccionAct")
      .css("left", "100%")
    for (i = 0; i < Nums; i++) {
      This.find(".control").append("<span></span>");
    }
    This.find(".control span:eq(0)").addClass("ContActive");
 
    This.find(".control span").click(Reviews);
 
    function Reviews() {
      var loc = $(this).index();
      var ActivLoc = This.find(".ContActive").index();
 
      $(this).addClass("ContActive")
        .siblings().removeAttr("class");
 
      if (loc > ActivLoc) {
        var Dire = '100%'
        var IDire = '-100%'
      }
      if (loc < ActivLoc) {
        var Dire = '-100%'
        var IDire = '100%'
      }
 
      This.find(".seccion").not(".SeccionAct")
        .css("left", Dire);
      This.find(".seccion:eq(" + loc + ")")
        .animate({
          'left': '0'
        }, speed)
        .addClass("SeccionAct")
        .siblings(".SeccionAct")
        .removeClass("SeccionAct")
        .animate({
          'left': IDire
        }, speed);
    }
  });
});
 
speed = 600 // Velocidad