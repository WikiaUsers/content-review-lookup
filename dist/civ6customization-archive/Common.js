/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Adds support for tooltips
 */
var wst = wst || {
    dataSubpageTitle: '/Tooltip',
    loadingTemplate: 'Template:Tooltip loading',
    loadedTemplate: '',
    checkCategory: 'Category: Tooltip in page',
    inPageSection: 'section=tooltip',
    categoriesToUseInfobox: 'Category:Policies|Category:Technology',
    loadingHtml: null ,
    classPrefix: 'wst-tooltip-',
    articlePath: null ,
    fullScriptPath: null ,
    scriptPath: null ,
    dataTitlesToCheck: Array(),
    dataTitlesToCheckCategories: Array(),
    dataTitlesToCheckCategoriesInfobox: Array(),
    contentTitlesTooltipPage: Array(),
    contentTitlesInPage: Array(),
    contentTitlesInPageInfobox: Array(),
    dataTitles: Array(),
    encodeAllSpecial: function(unencoded) {
        var encoded = "";
        var c;
        var safeChars = /[0-9A-Za-z]/;
        for (var i = 0; i < unencoded.length; i++) {
            c = unencoded.charAt(i);
            if (safeChars.test(c)) {
                encoded = encoded + c;
            } else {
                encoded = encoded + '_' + c.charCodeAt().toString(16) + '-';
            }
        }
        return encoded;
    },
    getTitleFromHref: function(href) {
        var end;
        var result = null ;
        if (href.indexOf(wst.fullScriptPath) === 0) {
            end = href.substring(wst.fullScriptPath.length);
            result = (new RegExp('title=([^&]*)')).exec(end);
        } else if (href.indexOf(wst.scriptPath) === 0) {
            end = href.substring(wst.scriptPath.length);
            result = (new RegExp('title=([^&]*)')).exec(end);
        } else if (href.indexOf(wst.articlePath) !== -1) {
            end = href.substring(wst.articlePath.length + href.indexOf(wst.articlePath));
            result = (new RegExp('([^?]*)')).exec(end);
        }
        if (result) {
            if (result[1].substring(0, 8) !== "Special:") {
                return decodeURIComponent(result[1]);
            } else {
                return null ;
            }
        } else {
            return null ;
        }
    },
    getTitlesAndContentLinks: function() {
        var links = $('#mw-content-text a[href]');
        var uniqueTitles = {};
        var title;
        for (var i = 0; i < links.length; i++) {
            if (title = wst.getTitleFromHref(links[i].href)) {
                uniqueTitles[title] = null ;
            }
        }
        for (uniqueTitle in uniqueTitles) {
            wst.dataTitlesToCheck.push(uniqueTitle + wst.dataSubpageTitle);
        }
    },
    beginLinkSetup: function() {
        wst.articlePath = mw.config.get('wgServer') + mw.config.get('wgArticlePath').replace(/\$1/, '');
        wst.fullScriptPath = mw.config.get('wgServer') + mw.config.get('wgScript');
        wst.scriptPath = mw.config.get('wgScript');
        wst.getTitlesAndContentLinks();
        if (wst.dataTitlesToCheck.length > 0) {
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'parse',
                    format: 'json',
                    text: '{{:' + wst.loadingTemplate + '}}'
                },
                dataType: 'json',
                success: wst.midLinkSetup
            });
        }
    },
    midLinkSetup: function(jsonData) {
        wst.loadingHtml = jsonData.parse.text['*'];

        // TEST
        wst.loadingHtml = '';

        wst.startQueryPageExistence();
    },
    startQueryPageExistence: function() {
        var titleSubset = Array();
        for (i = 0; i < 50 && wst.dataTitlesToCheck.length > 0; i++) {
            titleSubset.push(wst.dataTitlesToCheck.pop());
        }
        var titles = titleSubset.join('|');
        $.ajax({
            type: 'POST',
            url: mw.util.wikiScript('api'),
            data: {
                action: 'query',
                format: 'json',
                titles: titles
            },
            dataType: 'json',
            success: wst.finishQueryPageExistence
        });
    },
    finishQueryPageExistence: function(jsonData) {
        wst.filterTitles(jsonData.query.pages);
        if (wst.dataTitlesToCheck.length > 0) {
            wst.startQueryPageExistence();
        } else {
            wst.startQueryPageCategories();
        }
    },
    filterTitles: function(pageData) {
        var result, title;
        for (index in pageData) {
            result = pageData[index];
            if (result.missing === undefined) {
                title = result.title.replace(/ /g, '_');
                wst.dataTitles.push(title);
                wst.contentTitlesTooltipPage.push(title.substring(0, title.length - wst.dataSubpageTitle.length));
            }
            else {
                wst.dataTitlesToCheckCategories.push(result.title.replace(wst.dataSubpageTitle, ''));
            }
        }
    },
    startQueryPageCategories: function() {
        var titleSubset = Array();
        for (i = 0; i < 500 && wst.dataTitlesToCheckCategories.length > 0; i++) {
            titleSubset.push(wst.dataTitlesToCheckCategories.pop());
        }
        if(titleSubset.length > 0) {
            var titles = titleSubset.join('|');
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'query',
                    prop  : 'categories',
                    clcategories: wst.checkCategory,
                    format: 'json',
                    titles: titles,
                    cllimit: 'max'
                },
                dataType: 'json',
                success: wst.finishQueryPageCategories
            });
        }
        else {
            wst.startQueryPageCategoriesInfobox();
        }
    },
    finishQueryPageCategories: function(jsonData) {
        wst.filterTitlesCategories(jsonData.query.pages);
        if (wst.dataTitlesToCheckCategories.length > 0) {
            wst.startQueryPageCategories();
        } else {
            wst.startQueryPageCategoriesInfobox();
        }
    },
    filterTitlesCategories: function(pageData) {
        var result, title;
        for (index in pageData) {
            result = pageData[index];
            if (result.hasOwnProperty('categories')) {
                title = result.title.replace(/ /g, '_');
                wst.dataTitles.push(title);
                wst.contentTitlesInPage.push(title);
            }
            else {
                wst.dataTitlesToCheckCategoriesInfobox.push(result.title.replace(wst.dataSubpageTitle, ''));
            }
        }
    },
    startQueryPageCategoriesInfobox: function() {
        var titleSubset = Array();
        for (i = 0; i < 500 && wst.dataTitlesToCheckCategoriesInfobox.length > 0; i++) {
            titleSubset.push(wst.dataTitlesToCheckCategoriesInfobox.pop());
        }
        if(titleSubset.length > 0) {
            var titles = titleSubset.join('|');
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'query',
                    prop  : 'categories',
                    clcategories: wst.categoriesToUseInfobox,
                    format: 'json',
                    titles: titles,
                    cllimit: 'max'
                },
                dataType: 'json',
                success: wst.finishQueryPageCategoriesInfobox
            });
        }
        else {
            wst.finishLinkSetup();
        }
    },
    finishQueryPageCategoriesInfobox: function(jsonData) {
        wst.filterTitlesCategoriesInfobox(jsonData.query.pages);
        if (wst.dataTitlesToCheckCategoriesInfobox.length > 0) {
            wst.startQueryPageCategoriesInfobox();
        } else {
            wst.finishLinkSetup();
        }
    },
    filterTitlesCategoriesInfobox: function(pageData) {
        var result, title;
        for (index in pageData) {
            result = pageData[index];
            if (result.hasOwnProperty('categories')) {
                title = result.title.replace(/ /g, '_');
                wst.dataTitles.push(title);
                wst.contentTitlesInPageInfobox.push(title);
            }
        }
    },
    finishLinkSetup: function() {
        for (var i = 0; i < wst.contentTitlesTooltipPage.length; i++) {
            $('body').append('<div id="' + wst.classPrefix + wst.encodeAllSpecial(wst.contentTitlesTooltipPage[i]) + '" style="display: none; position: absolute; z-index: 10000;">' + wst.loadingHtml.replace(/\$1/, wst.contentTitlesTooltipPage[i].replace(/_/, " ")) + '</div>');
        }
        for (var i = 0; i < wst.contentTitlesInPage.length; i++) {
            $('body').append('<div id="' + wst.classPrefix + wst.encodeAllSpecial(wst.contentTitlesInPage[i]) + '" style="display: none; position: absolute; z-index: 10000;">' + wst.loadingHtml.replace(/\$1/, wst.contentTitlesInPage[i].replace(/_/, " ")) + '</div>');
        }
        for (var i = 0; i < wst.contentTitlesInPageInfobox.length; i++) {
            $('body').append('<div id="' + wst.classPrefix + wst.encodeAllSpecial(wst.contentTitlesInPageInfobox[i]) + '" style="display: none; position: absolute; z-index: 10000;">' + wst.loadingHtml.replace(/\$1/, wst.contentTitlesInPageInfobox[i].replace(/_/, " ")) + '</div>');
        }
        var title, id;
        var links = $('#mw-content-text a[href]');
        for (var i = 0; i < links.length; i++) {
            title = wst.getTitleFromHref(links[i].href);
            if (title !== null && ($.inArray(title, wst.contentTitlesTooltipPage) !== -1 || $.inArray(title, wst.contentTitlesInPage) !== -1 || $.inArray(title, wst.contentTitlesInPageInfobox) !== -1)) {
                id = wst.classPrefix + wst.encodeAllSpecial(title);
                links.eq(i).on('mouseover', {
                    id: id,
                    title: title
                }, function(event) {
                    wst.showTooltip(event);
                });
                links.eq(i).on('mousemove', {
                    id: id
                }, function(event) {
                    wst.moveTooltip(event);
                });
                links.eq(i).on('mouseout', {
                    id: id
                }, function(event) {
                    wst.hideTooltip(event);
                });
            }
        }
    },
    showTooltip: function(event) {
        tooltipBox = $('#' + event.data.id);
        wst.positionTooltip(event.data.id, event.pageX, event.pageY);
        tooltipBox.show();
        if (!tooltipBox.hasClass('loaded') && !tooltipBox.hasClass('loading')) {
            tooltipBox.addClass(wst.classPrefix + 'loading');
            wst.beginLoadTooltip(event.data.id, event.data.title);
        }
    },
    beginLoadTooltip: function(id, title) {
        var formattedTitle = title.replace(/ /g, '_');
        var text;


        if($.inArray(formattedTitle, wst.contentTitlesInPageInfobox) !== -1) {
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'parse',
                    format: 'json',
                    page: title
                },
                dataType: 'json',
                success: function(jsonData) {
                    wst.finishLoadTooltip(id, jsonData, true);
                }
            });
        }
        else {
            if($.inArray(formattedTitle, wst.contentTitlesTooltipPage) !== -1) {
                text = '{{:' + title + wst.dataSubpageTitle + '}}';
            }
            else if($.inArray(formattedTitle, wst.contentTitlesInPage) !== -1) {
                text = '{{:' + title + '|' + wst.inPageSection + '}}';
            }

            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'parse',
                    format: 'json',
                    title: title.replace(/_/, ' '),
                    text: text
                },
                dataType: 'json',
                success: function(jsonData) {
                    wst.finishLoadTooltip(id, jsonData, false);
                }
            });
        }
    },
    finishLoadTooltip: function(id, jsonData, getInfobox) {
        console.log(id);
        tooltipBox = $('#' + id);
        tooltipBox.addClass('loaded');
        tooltipBox.removeClass('loading');

        var html = '';

        if(getInfobox) {
            html = $.filter('.infobox', $.parseHTML(jsonData.parse.text["*"]))[0].outerHTML;
        }
        else {
            html = jsonData.parse.text['*'];
        }

        tooltipBox.html(html);
    },
    moveTooltip: function(event) {
        wst.positionTooltip(event.data.id, event.pageX, event.pageY);
    },
    positionTooltip: function(id, pageX, pageY) {
        var tooltip = $('#' + id);
        var bodyOffsets = document.body.getBoundingClientRect();
        var bodyX = pageX - bodyOffsets.left;
        var bodyY = pageY - bodyOffsets.top;
        var scrollX = $(document).scrollLeft();
        var scrollY = $(document).scrollTop();
        var bodyWidth = $('body').width();
        var bodyHeight = $('body').height();
        var viewWidth = $(window).width();
        var viewHeight = $(window).height();
        var topAdjust = 6;
        if (tooltip.width() * 1.1 > pageX - scrollX) {
            tooltip.css({
                'left': bodyX - scrollX + 15,
                'right': 'auto'
            });
            topAdjust = 36;
        } else {
            tooltip.css({
                'right': bodyWidth - bodyX + scrollX + 6,
                'left': 'auto'
            });
        }
        if (tooltip.height() * 1.5 > pageY - scrollY) {
            tooltip.css({
                'top': bodyY - scrollY + topAdjust,
                'bottom': 'auto'
            });
        } else {
            tooltip.css({
                'bottom': bodyHeight - bodyY + scrollY + 3,
                'top': 'auto'
            });
        }
    },
    hideTooltip: function(event) {
        $('#' + event.data.id).hide();
    }
};
mw.loader.using( 'mediawiki.util' ).then( function() {
	wst.beginLinkSetup();
} );

/* Infobox tooltip with Template:Link */
// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb;
var activeHoverLink = null;
var tipCache = new Object();

// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
  activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
  $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $tfb.not(":empty").css("visibility","visible");
  moveTip(e);
}

// moves the tooltip
function moveTip(e) {
  $ct = $tfb.not(":empty");
  var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($ct.innerHeight()+20):20);
  var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
  $ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
  var $t=$(this);
  activeHoverLink = $t;
  $p=$t.parent();
  if ($p.hasClass("selflink")==false) {
    $t.removeAttr("title");
    $p.removeAttr("title");
    var url = "/index.php?title="+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"&action=render .tooltip-content";
    if (tipCache[url] != null) {
      $tfb.html(tipCache[url]);
      displayTip(e);
      return;
    }
    $tfb.load(url,function () {
      if ($t != activeHoverLink) return;
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      tipCache[url] = $tfb.html();
      displayTip(e);
    });
  }
}

function bindTT() {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
  }
}

// check to see if it is active then do it
function ttMouseOver() {
  if (tooltipsOn) {
    $("#bodyContent").append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $("#bodyContent span.ajaxttlink").each(bindTT);
  }
}

$(ttMouseOver);

$(function() {
	$('.rolloverToggle').hover(
		function() {
			$('.rolloverItem', this).hide();
			$('.rolloverB', this).show();
		},
		function()  {
			$('.rolloverItem', this).hide();
			$('.rolloverA', this).show();
	});
});

$(function() {
	$('.tabdiv > div').hide();
	$('.tabdiv').each(function() {
		$(this).find('> ul li:first').addClass('active');
		$(this).find('> div:first').show();
	});

	$('.tabdiv > ul li a').each(function() {
		var target = $(this).attr('href');
		$(this).attr('href', ''); // Opera hates real hrefs
		$(this).parent().click(function() {
			$(this).parent().find('> li').removeClass('active');
			$(this).parent().parent().find('> div').hide();
			$(this).addClass('active');
			$(target).show();
			return false;
		});
	});
});