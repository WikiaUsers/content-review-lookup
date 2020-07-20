
// DynamicImages Config
DynamicImages = {
    gifImages: true,
    gifGalleryImages: false,
};
 
 
//Auto Message Blocked
var MessageBlock = {
    title : 'Block.',
    message : 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck : true
};
 
// ==============================
importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/plok.js',
        'MediaWiki:Common.js/Waves.js',
		'u:dev:AjaxRC/code.js',
		'u:dev:BackToTopButton/code.js',
        'u:dev:CleanWantedFiles/code.js',
		'u:dev:Countdown/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:FixMultipleUpload/code.js',
		'u:dev:InactiveUsers/code.js',
		'u:dev:ListAdmins/code.js',
		'u:dev:ListFiles/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:MessageBlock/code.js',
		'u:dev:ReferencePopups/code.js',
		'u:dev:RevealAnonIP/code.js',
		'u:dev:ShareMenu/code.js',
		'u:dev:Translator/Translator.js',
    ]
});

 /* AutoEditDropdown */
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
 
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    'Special:WikiActivity',
    'Special:RecentChanges',
    'Special:Log',
    'Special:ListUsers'
    ];
/*
 * Page loader
 *
 * Allows a page to be downloaded and shown within another page.
 * Use with [[Template:LoadPage]]
 */
var loadText = 'load', showText = 'show', hideText = 'hide';
 
$( '.load-page' ).find( '.mw-headline:first' ).append( '<span class="load-page-button" style="margin-left:10px;font-weight:normal">[<span class="jslink">' + loadText + '</span>]</span>' );
 
$('.load-page-button > .jslink').live('click', function() {
    var $this = $(this),
        $body = $this.closest('.load-page'),
        $content = $body.find('.load-page-content');

    if ($body.hasClass('loading')) {
        return;
    }
    if ($this.text() === loadText) {
        $body.addClass('loading');
        $('body').css('cursor', 'progress');
        $.ajax({
            url: window.baseURL + 'api.php',
            data: {
                format: 'json',
                action: 'parse',
                prop: 'text',
                title: mw.config.get('wgPageName'),
                text: '{{:' + $body.data('page') + '}}'
            },
            dataType: 'json',
            timeout: 20000
        }).done(function(data) {
            if (data.error) {
                if ($('#error-dialog').length) {
                    return;
                }
                mw.loader.using('jquery.ui.dialog', function() {
                    $body.removeClass('loading');
                    $('body').css('cursor', 'auto');

                    $('#netbar').after('<div id="error-dialog" />');
                    $('#error-dialog').html('<p><strong>Error:</strong> ' + data.error.info + '</p>').dialog({
                        title: 'Hey! Listen!',
                        resizable: false,
                        width: 400,
                        modal: true,
                        buttons: {
                            'Retry': function() {
                                $this.click();
                                $(this).dialog('destroy');
                                $('#error-dialog').remove();
                            },
                            Cancel: function() {
                                $(this).dialog('destroy');
                                $('#error-dialog').remove();
                                return;
                            }
                        }
                    });
                });
                return;
            }

            $content.html(data.parse.text['*']);
            $this.text(hideText);
            $body.removeClass('loading');
            $('body').css('cursor', 'auto');

            // Add Ajax compatible functions here
            window.animation();
            window.makeCollapsible();
        }).fail(function(error) {
            if ($('#error-dialog').length) {
                return;
            }
            mw.loader.using('jquery.ui.dialog', function() {
                $body.removeClass('loading');
                $('body').css('cursor', 'auto');

                $('#netbar').after('<div id="error-dialog" />');
                if (!error.responseText) {
                    $('#error-dialog').html('<p><strong>Error:</strong> No response from the server</p>');
                } else {
                    $('#error-dialog').html('<p><strong>Error:</strong> ' + error.responseText + '</p>');
                }
                $('#error-dialog').dialog({
                    title: 'Hey! Listen!',
                    resizable: false,
                    width: 400,
                    modal: true,
                    buttons: {
                        'Retry': function() {
                            $this.click();
                            $(this).dialog('destroy');
                            $('#error-dialog').remove();
                        },
                        Cancel: function() {
                            $(this).dialog('destroy');
                            $('#error-dialog').remove();
                            return;
                        }
                    }
                });
            });
        });
    } else if ($this.text() === showText) {
        $content.show();
        $this.text(hideText);
    } else {
        $content.hide();
        $this.text(showText);
    }
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 
$( UserNameReplace );
 
;(function($) {
    var methods = {
        init: function() {
            return this.each(function() {

                // For each set of tabs, we want to keep track of
                // which tab is active and its associated content
                var $this = $(this),
                    window_width = $(window).width();

                    $this.width('100%');
                    // Set Tab Width for each tab
                    var $num_tabs = $(this).children('li').length;
                    $this.children('li').each(function() {
                        $(this).width((100 / $num_tabs) + '%');
                    });

                var $active = $this.find('li'),
                    $links = $this.find('li a'),
                    $tabs_width = $this.width(),
                    $tab_width = $this.find('li').first().outerWidth(),
                    $index = 0;
            });
        }
    };
});

function textTip(){
	if ($(".noTextTip").length) return;
	$("a[title]>img:first-child").each(function(){$(this).parent().addClass("texttip")});
  $(".texttip").tooltip({
    content: function() {
          var text = $( this ).attr("title");
          var s = "";
          var t = text.split("||");
          if (t.length==2) {
            s = "<div style='font-weight: bold;'>"+t[0]+"</div>"+t[1];
          } else {
            s = t[0];
          }
          if (s.indexOf("No.")>=0) {
            s = s.replace("　 ","<br>").replace("（","<br>").replace("）","").replace(" Skill:","<br>Skill:");
          }
          return s;
        },
    position: {
      my: "center top+40",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "ui-tooltip-arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });
}
function gacha(){
	if ($("#resultList").length){
		disableSelection(document.body);
		$("#resultList").isotope({itemSelector:".filterIcon",layoutMode:"fitRows"});
		var palList=[];
		$("#gachaList .d-pal").each(function(i){
			if ($(this).hasClass("r-1")) v=15; else if ($(this).hasClass("r-2")) v=3; else if ($(this).hasClass("r-3")) v=1; else v=1;
			if ($(this).parent().attr("id")!="gachaList") v*=3;
			for (j=0; j<v; j++) palList.push(i);
		});
		var palCount=palList.length;
		$(".gachaButton#pal").click(function(){
			i=$($("#gachaList .d-pal")[palList[Math.floor(Math.random()*palCount)]]).clone();
			$("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800)})).isotope("reloadItems").isotope({sortBy:"original-order"});
		});
 
		var rareList=[];
		$("#gachaList .d-rare").each(function(i){
			if ($(this).parent().attr("id")=="gachaList") v=1; else v=3;
			if ($(this).hasClass("r-3")) v*=12; else if ($(this).hasClass("r-4")) v*=3; else if ($(this).hasClass("r-5")) v*=1; else v=1;
			for (j=0; j<v; j++) rareList.push(i);
		});
		var rareCount=rareList.length;
		$(".gachaButton#rare").click(function(){
			i=$($("#gachaList .d-rare")[rareList[Math.floor(Math.random()*rareCount)]]).clone();
			$("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800)})).isotope("reloadItems").isotope({sortBy:"original-order"});
		});
		$("#clearGacha").click(function(){
			$("#resultList").isotope("remove", $("#resultList>.filterIcon"));
		});
	}
}