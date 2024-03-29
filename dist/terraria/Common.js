/**
 * For language wikis, use
 * <code> mw.loader.load("https://terraria.fandom.com/wiki/MediaWiki:Common.js?action=raw\u0026ctype=text/javascript"); </code>
 * as the content of common.js to import from this script.
 *
 * See [https://terraria.fandom.com/zh/wiki/MediaWiki:Common.js zh wiki] for example.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * common l10n factory
 */
var l10nFactory = function($lang, $data) {
    return function ($key) {
        return $data[$key] && ($data[$key][$lang] || $data[$key]['en']) || '';
    };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Original image
 */
$(function(){
    //portable infobox images
    $(".pi-image-thumbnail").each(function(){
        var srcsetvar = $(this).attr("srcset");
        var srcarray = srcsetvar.split(" ");
        $(this).attr("srcset", srcarray[0]+"&format=original");
    });
    //other images, image links
    var pattern = /(?:static|vignette|images)\.wikia\.nocookie\.net/;
    $("img").add($("a > img").parent()).each(function(){
        var $this = $(this);
        var srcattr = ($this.prop('tagName')==='A') ? 'href' : ($this.hasClass('lazyload') ? 'data-src' : 'src');
        var srcvar = $this.attr(srcattr);
        if (srcvar && !srcvar.endsWith('format=original') && pattern.exec(srcvar)) {
            $this.attr(srcattr, srcvar+(srcvar.includes('?')?'&':'?')+'format=original');
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * image size fix for <gallery>
 */
$(function(){
    $(".mw-gallery-traditional .thumb").each(function(){
        var $this = $(this);
        /* $this.css('display', 'flex'); // do this in common.css: .mw-gallery-traditional .thumb{ display: flex; } */
        $this.css('height', $this.height()+'px').find('>div').css('margin', 'auto');
        var $img = $this.find('img').first();
        if(!$img.length){
            return;
        }
        var $width = $img.attr('width') - 0; //cast to number.
        var $filewidth = $img.attr('data-file-width') - 0;
        if($filewidth < $width){
            var $fileheight = $img.attr('data-file-height');
            if( $filewidth * 2 > $width){
                $img.attr({'width': $filewidth, 'height': $fileheight});
            }else{
                $img.attr({'width': $filewidth*2, 'height': $fileheight*2});
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * login status mark
 */
if(mw.config.get("wgUserName") !== null){
    $('body').addClass('logged-in');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * AJAX tables
 */
$(function() {
    var l10n = l10nFactory(mw.config.get('wgUserLanguage'),{
        showData: {
            'en': 'show data',
            'de': 'Daten anzeigen',
            'fr': 'affiche les données',
            'zh': '显示数据',
            'zh-cn': '显示数据'
        },
        wait: {
            'en': 'Please wait, the content is being loaded...',
            'de': 'Bitte warten, der Inhalt wird geladen...',
            'fr': 'Veuillez patienter pendant le chargement du contenu...',
            'pt': 'Por favor espere, o conteúdo está sendo carregado...',
            'uk': 'Будь ласка, зачекайте вміст завантажиться…',
            'zh': '请稍候，正在加载内容……',
            'zh-cn': '请稍候，正在加载内容……'
        },
        edit: {
            'en': 'edit',
            'de': 'bearbeiten',
            'fr': 'modifier',
            'pt': 'Editar',
            'uk': 'редагувати',
            'zh': '编辑',
            'zh-cn': '编辑'
        },
        hide: {
            'en': 'hide',
            'de': 'verbergen',
            'fr': 'masquer',
            'pt': 'Esconder',
            'uk': 'згорнути',
            'zh': '隐藏',
            'zh-cn': '隐藏'
        },
        show: {
            'en': 'show',
            'de': 'anzeigen',
            'fr': 'afficher',
            'pt': 'Mostrar',
            'uk': 'розгорнути',
            'zh': '显示',
            'zh-cn': '显示',
        },
        error: {
            'en': 'Unable to load table; the source article for it might not exist.',
            'de': 'Kann Tabelle nicht laden; möglicherweise existiert der Quellartikel nicht.',
            'fr': 'Impossible de charger cette table; l\'article originel ne semble pas exister.',
            'pt': 'Não é possível a carregar tabela; o artigo fonte pode não existir.',
            'uk': 'Неможливо завантажити вміст; можливо, цільова сторінка не існує.',
            'zh': '无法加载表格，其源文章可能不存在。',
            'zh-cn': '无法加载表格，其源文章可能不存在。'
        }
    });
    $("table.ajax").each(function (i) {
        var table = $(this).attr("id", "ajaxTable" + i);
        table.find(".nojs-message").remove();
        var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
        var cell = table.find("td").first();
        var needLink = true;
        cell.parent().show();
        if (cell.hasClass("showLinkHere")) {
            var old = cell.html();
            var rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
            if (rep !== old) {
                cell.html(rep);
                needLink = false;
            }
        }
        if (needLink){
            headerLinks.html('[<a href="javascript:;" class="ajax-load-link">'+l10n('showData')+'</a>]');
        }
        table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
            event.preventDefault();
            var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
            cell.text(l10n('wait'));
            $.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
                if (!data) {
                    return;
                }
                cell.html(data);
                cell.find('.ajaxHide').remove();
                cell.find('.terraria:not(.ajaxForceTerraria)').removeClass('terraria');
                if (cell.find("table.sortable").length) {
                    mw.loader.using('jquery.tablesorter', function() {
                        cell.find("table.sortable").tablesorter();
                    });
                }
                headerLinks.text('[');
                headerLinks.append($('<a>'+l10n('edit')+'</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
                headerLinks.append(document.createTextNode(']\u00A0['));
                var shown = true;
                $("<a href='javascript:;'>"+l10n('hide')+"</a>").click(function() {
                    shown = !shown;
                    cell.toggle(shown);
                    $(this).text(shown ? l10n('hide') : l10n('show'));
                }).appendTo(headerLinks);
                headerLinks.append(document.createTextNode(']'));
            }).catch(function() {
                cell.text(l10n('error'));
            });
        });
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * translation project banner
 */
$(window).on('load', function(){
    var $btn = $('#indic-project #indic-project-flag');
    if (!$btn.length) {
        return;
    }
    var $text = $('#indic-project');
    var $indic = $('#mw-indicator-translation-project');
    $btn.css('display', 'inline').on('click', function () {
        $text.toggleClass('collapsed');
        $indic.toggleClass('expanded');
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Content box customization
 */
$(function() {
    /* Disable triggering of new browser tab when clicking URL links that point to internal wiki addresses (purge, edit, etc) */
    $('a[href^="//terraria.fandom.com/"]').removeAttr('target');

    /* Hyperlink required modules in Module namespace */
    // Author: RheingoldRiver
    if (mw.config.get('wgCanonicalNamespace') === 'Module') {
        $('.s1, .s2').each(function () {
            var html = $(this).html();
            // the module name is surrounded by quotes, so we have to remove them
            var quote = html[0];
            var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
            var name = html.replace(quoteRE, ""); // remove quotes
            // link the module name
            if (name.startsWith("Module:")) {
                var target = encodeURIComponent(name);
                var url = mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + target;
                $(this).html(quote + '<a href="' + url + '">' + name + '</a>' + quote);
            }
        });
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * FandomDesktop customization
 */
$(function() {
    if( !$('body.skin-fandomdesktop').length ){
        return;
    }
    /* Automatically expand pages to full-width and hide right bar on FandomDesktop by default */
    //common.js is loaded BEFORE skin.fandomdesktop.js module.
    mw.loader.using("skin.fandomdesktop.js").then(function(){
        if( !$('.is-content-expanded').length ){
            if( ((mw.config.get("wgUserName") === null) ? localStorage.contentwidth : mw.user.options.get('contentwidth')) !== "collapsed"){
                $("button.content-size-toggle").click();
            }
        }
        if( !$('aside.page__right-rail.is-rail-hidden').length ){
            if( (mw.config.get("wgUserName") !== null) && (mw.user.options.get('rightrailvisible') !== "visible") ){
                $("button.right-rail-toggle").click();
            }
        }
    });
    /* page tools into header (place here to init dropdown function properly.) */
    if(!$('aside.page__right-rail.is-rail-hidden').length){
        return;
    }
    var $box = $('.page-header__top');
    if(!$box.length){
        return;
    }
    $("#WikiaRail").on("afterLoad.rail", function(){
        var $pageTools = $('#p-tb');
        if(!$pageTools.length){
            return;
        }
        var $t = $('<div class="page-header__pagetools"><div class="wds-dropdown"><div class="wds-dropdown__toggle">'+$pageTools.find('h2').text()+'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg></div><div class="wds-dropdown__content wds-is-not-scrollable"></div></div></div>');
        $pageTools.find('ul').clone().removeClass().addClass('wds-list wds-is-linked').appendTo($t.find("div.wds-dropdown__content"));
        var $cate = $box.find('.page-header__meta');
        if($cate.length){
            $cate.after($t);
        }
        else{
            $box.prepend($t);
        }
    });

    /* make FandomDesktop works for touch */
    // deal with :hover, make them can toggled by click/tap.
    if(!("ontouchstart" in window)){
        return;
    }
    //duplicate css rules
    var procRule = function($rule){
        switch($rule.constructor.name){
            case "CSSStyleRule":
                if( $rule.selectorText.indexOf(':hover') == -1){
                    return;
                }
                $rule.selectorText = $rule.selectorText.split(',').map(function($item){
                    if($item.indexOf(':hover')){
                        return $item + ', ' + $item.replace(':hover', '.hoverhover');
                    }else{
                        return $item;
                    }
                }).join(', ');
                break;
            case "CSSMediaRule":
                for (var i = 0; i < $rule.cssRules.length; i++) {
                    procRule( $rule.cssRules[i]);
                }
                break;
            default:
                break;
        }
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
        var styleSheet = document.styleSheets[i];
        try{
            for (var j = 0; j < styleSheet.cssRules.length; j++) {
                procRule( styleSheet.cssRules[j], styleSheet );

            }
        }
        catch(e){//cross domain
            //console.log('Access to stylesheet %s is denied. Ignoring...', styleSheet.href);
        }
    }
    //local nav dropdown lists workaround:
    $(".fandom-community-header__local-navigation .wds-dropdown__content .wds-list.wds-is-linked .wds-dropdown-level-2").on("click", function(event){
        $(this).toggleClass("expanded");
        event.preventDefault();
        event.stopPropagation();
    });
    $(".fandom-community-header__local-navigation .wds-dropdown__content .wds-list.wds-is-linked .wds-dropdown-level-2 > div").on("click", function(event){
        event.stopPropagation();
    });
    var $hoverhoverElement = null;
    $("body, .fandom-community-header__local-navigation .more-menu .wds-dropdown__toggle").on("click", function(){
        if(!$hoverhoverElement){
            return;
        }
        $hoverhoverElement.removeClass('hoverhover');
        $hoverhoverElement.find('.expanded').removeClass('expanded');
        $hoverhoverElement = null;
    });
    //wds-dropdown workaround: click -> hover
    $('body').delegate(".wds-dropdown:not(.more-menu) .wds-dropdown__toggle", "click", function(event){
        var $box = $(this).closest(".wds-dropdown");
        if($hoverhoverElement && ($hoverhoverElement.get(0) != $box.get(0))){
            $hoverhoverElement.removeClass('hoverhover');
            $hoverhoverElement = null;
        }
        $box.toggleClass('hoverhover');
        if($box.hasClass('hoverhover')){
            $hoverhoverElement = $box;
        }
        event.preventDefault();
        event.stopPropagation();
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * custom control for {{Template:sound}}
 * Original ported from https://minecraft.gamepedia.com/MediaWiki:Gadget-sound.js.
 */
$(function(){
    var l10n = l10nFactory(mw.config.get( 'wgUserLanguage' ),{
        'playTitle': {
            'en': 'Click to play',
            'de': 'Zum Abspielen anklicken',
            'fr': 'Cliquer pour jouer',
            'pt': 'Clique para jogar',
            'pl': 'Naciśnij by odtworzyć',
            'ru': 'Щёлкните, чтобы воспроизвести',
            'zh': '点击播放',
            'zh-cn': '点击播放'
        },
        'stopTitle': {
            'en': 'Click to stop',
            'de': 'Zum Beenden anklicken',
            'fr': 'Cliquer pour arrêter',
            'pt': 'Clique para parar',
            'pl': 'Naciśnij by zatrzymać',
            'ru': 'Щёлкните, чтобы остановить',
            'zh': '点击停止',
            'zh-cn': '点击停止'
        }
    });

    $('.mw-parser-output .sound').prop('title', l10n('playTitle')).on('click', function(e){
        // Ignore links
        if (e.target.tagName === 'A') {
            return;
        }
        var audio = $(this).find('.sound-audio')[0];
        if (audio) {
            audio.paused ? audio.play() : audio.pause();
        }
    }).find('.sound-audio').on('play', function(){
        // Stop any already playing sounds
        var playing = $('.sound-playing .sound-audio')[0];
        playing && playing.pause();
        $(this).closest('.sound').addClass('sound-playing').prop('title', l10n('stopTitle'));
    }).on('pause', function(){
        // Reset back to the start
        this.currentTime = 0;
        $(this).closest('.sound').removeClass('sound-playing').prop('title', l10n('playTitle'));
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * l10n_data_table for [[template:l10n_subtemplate]]
 */
$(function() {
    $('.l10n-data-table th.lang').on('click', function(){
        var $this = $(this);
        var $lang = $this.attr('lang');
        if($lang === 'en'){
            return;
        }
        $this.toggleClass('shrinked')
            .closest('table.l10n-data-table').find('td.'+$lang).toggleClass('shrinked');
    });
    $('.l10n-data-table th.all-lang').on('click', function(){
        var $this = $(this);
        $this.toggleClass('shrinked');
        if($this.hasClass('shrinked')){
            $this.closest('table.l10n-data-table').find('td.l, th.lang').addClass('shrinked');
            $this.closest('table.l10n-data-table').find('td.en, th.en').removeClass('shrinked');
        }else{
            $this.closest('table.l10n-data-table').find('td.l, th.lang').removeClass('shrinked');
        }
    });
    //only expand current language
    $('.l10n-data-table').each(function(){
        var $this = $(this);
        var $lang = $this.attr('lang');
        if($lang === 'en'){
            return;
        }
        var $th = $this.find('th.lang.'+$lang);
        if ($th.length){
            $this.find('th.all-lang').click();
            $th.click();
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * for other templates
 */
$(function(){
    /* Select links to new tabs for [[Template:ilnt]] and [[Template:elnt]] */
    $('.linkNewTab a').attr('target','_blank');

    /* mode tabs switch for [[Template:npcinfobox]] and [[Template:npcinfobtable]] and so on */
    $('.modesbox .modetabs .tab').on('click', function(){
        var $this = $(this);
        if($this.hasClass('current')){
            return;
        }
        $this.parent().children().removeClass('current');
        $this.addClass('current');
        $this.closest('.modesbox').removeClass('c-expert c-master c-normal').addClass($this.hasClass('normal')?'c-normal':($this.hasClass('expert')?'c-expert':'c-master'));
    });

    /* [[template:spoiler]] */
    $('.spoiler-content').on('click', function(){
        $(this).toggleClass('show');
    });

    /* [[template:toggleBox]] */
    $('.trw-togglehandle').on('click', function(){
        $(this).closest('.trw-toggleable').toggleClass(['toggled', 'not-toggled']);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Main page layout helper
 */
$(function() {
    /* Main page responsive breakpoints. */
    // Since the width of the content box may vary under FandomDesktop skin, we can not use media query.
    // These values are ported from hydra skin.
    var $btn = $('#box-wikiheader #box-wikiheader-toggle-link');
    if(!$btn.length) {
        return;
    }
    var $content = $('#content');
    var $header = $('#box-wikiheader');
    $(window).on('resize', function(){
        var $width = $content.width();
        // $offset is (fullwidth - content width) under hydra skin.
        // Therefore ($width - $offset) is the width of content box.
        var $offset = $width > 980 ? 250 : ($width > 500 ? 42: 12);

        //header
        $header.toggleClass('collapsable', $width < 1300);
        $header.toggleClass('collapsed', $width < 730);

        //row breaks of flexboxes
        $content
            .toggleClass('box-row-l', ($width <= 3500-$offset) && ($width >= 2400-$offset) )
            .toggleClass('box-row-m', ($width <= 2399-$offset) && ($width >= 1670-$offset) )
            .toggleClass('box-row-s', ($width <= 1669-$offset) );

        $('#box-game')
            .toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
            .toggleClass('width-b', ($width <= 3249-$offset) && ($width >= 1670-$offset) )
            .toggleClass('width-c', ($width <= 1669-$offset) )
            .toggleClass('width-d', ($width <= 1200-$offset) )
            .toggleClass('width-e', ($width <= 1160-$offset) )
            .toggleClass('width-f', ($width <=  700-$offset) )
            .toggleClass('width-g', ($width <=  540-$offset) );

        $('#box-news')
            .toggleClass('width-a', ($width >= 1750-$offset) || ($width <= 1669-$offset) )
            .toggleClass('width-b', ($width <=  400-$offset) );

        $('#box-items')
            .toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
            .toggleClass('width-b', ($width <= 1769-$offset) )
            .toggleClass('width-c', ($width <= 1669-$offset) )
            .toggleClass('width-d', ($width <= 1320-$offset) )
            .toggleClass('width-e', ($width <= 1140-$offset) )
            .toggleClass('width-f', ($width <= 1040-$offset) )
            .toggleClass('width-g', ($width <=  980-$offset) )
            .toggleClass('width-h', ($width <=  870-$offset) )
            .toggleClass('width-i', ($width <=  620-$offset) )
            .toggleClass('width-j', ($width <=  450-$offset) );

        $('#box-biomes')
            .toggleClass('width-a', ($width <= 3250-$offset) && ($width >= 2560-$offset) )
            .toggleClass('width-b', ($width <= 1769-$offset) )
            .toggleClass('width-c', ($width <= 1669-$offset) )
            .toggleClass('width-d', ($width <= 1320-$offset) )
            .toggleClass('width-e', ($width <= 1140-$offset) )
            .toggleClass('width-f', ($width <= 1040-$offset) )
            .toggleClass('width-g', ($width <=  980-$offset) )
            .toggleClass('width-h', ($width <=  830-$offset) )
            .toggleClass('width-i', ($width <=  630-$offset) )
            .toggleClass('width-j', ($width <=  428-$offset) );

        $('#box-mechanics')
            .toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) || $width <= 1470-$offset )
            .toggleClass('width-b', ($width <= 1769-$offset) && ($width >= 1670-$offset) )
            .toggleClass('width-c', ($width <= 1080-$offset) )
            .toggleClass('width-d', ($width <=  750-$offset) )
            .toggleClass('width-e', ($width <=  550-$offset) )
            .toggleClass('width-f', ($width <=  359-$offset) );

        $('#box-npcs')
            .toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
            .toggleClass('width-b', ($width <= 3249-$offset) && ($width >= 2560-$offset) )
            .toggleClass('width-c', ($width <= 1470-$offset) )
            .toggleClass('width-d', ($width <= 1080-$offset) )
            .toggleClass('width-e', ($width <=  720-$offset) )
            .toggleClass('width-f', ($width <=  570-$offset) )
            .toggleClass('width-g', ($width <=  350-$offset) );

        $('#box-bosses')
            .toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
            .toggleClass('width-b', ($width <= 3249-$offset) && ($width >= 2560-$offset) )
            .toggleClass('width-c', ($width <= 1669-$offset) )
            .toggleClass('width-d', ($width <= 1365-$offset) )
            .toggleClass('width-e', ($width <=  800-$offset) )
            .toggleClass('width-f', ($width <=  720-$offset) )
            .toggleClass('width-g', ($width <=  480-$offset) );

        $('#box-events')
            .toggleClass('width-a', ($width <= 4500-$offset) && ($width >= 3250-$offset) )
            .toggleClass('width-b', ($width <= 1669-$offset) )
            .toggleClass('width-c', ($width <= 1365-$offset) )
            .toggleClass('width-d', ($width <=  800-$offset) )
            .toggleClass('width-e', ($width <=  720-$offset) )
            .toggleClass('width-f', ($width <=  650-$offset) )
            .toggleClass('width-g', ($width <=  540-$offset) );

        $('#sect-ext')
            .toggleClass('width-a', $width >= 2300-$offset );

        $('#box-software')
            .toggleClass('width-a', ($width <= 2299-$offset) )
            .toggleClass('width-b', ($width <= 1100-$offset) )
            .toggleClass('width-c', ($width <=  680-$offset) );

        $('#box-wiki')
            .toggleClass('width-a', ($width <= 2299-$offset) )
            .toggleClass('width-b', ($width <= 1499-$offset) )
            .toggleClass('width-c', ($width <=  680-$offset) );
    }).triggerHandler('resize');
    $btn.on('click', function(){
        $header.toggleClass('collapsed');
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
 * Hair Dyes slider, for [[Hair Dyes]] page.
 */
$(function() {
    var $sliders = $(".hair-dye-slider-wrapper .slider");
    if(!$sliders.length){
        return;
    }
    var l10n = l10nFactory(mw.config.get( 'wgPageContentLanguage' ), {
        // time format: prefix + <time> + postfix
        amPrefix:{
            'en': "",
            'zh': "上午&nbsp;",
            'zh-cn': "上午&nbsp;"
        },
        amPostfix:{
            'en': "&nbsp;AM",
            'zh': "",
            'zh-cn': ""
        },
        pmPrefix:{
            'en': "",
            'zh': "下午&nbsp;",
            'zh-cn': "下午&nbsp;"
        },
        pmPostfix:{
            'en': "&nbsp;PM",
            'zh': "",
            'zh-cn': ""
        }
    });
    var textTime = function(slidervalue) {
        var time = slidervalue*864 + 16200;
        time -= (time > 86400 ? 86400 : 0);
        if (time < 3600) {
            return l10n('amPrefix')
                + Math.floor(time/3600 + 12) + ":" + Math.round((time/3600 + 12 - Math.floor(time/3600 + 12))*60).toString().padStart(2,0)
                + l10n('amPostfix');
        } else if (time < 43200) {
            return l10n('amPrefix')
                + Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0)
                + l10n('amPostfix');
        } else if (time < 46800) {
            return l10n('pmPrefix')
                + Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0)
                + l10n('pmPostfix');
        } else {
            return l10n('pmPrefix')
                + Math.floor(time/3600 - 12) + ":" + Math.round((time/3600 - 12 - Math.floor(time/3600 - 12))*60).toString().padStart(2,0)
                + l10n('pmPostfix');
        }
    };
    var colorSpeed = function(slidervalue) {
        var num = slidervalue * 0.1;
        var num2 = 10;
        var num3 = num / num2;
        var num4 = 1 - num3;
        var playerHairColor = { "R": 215, "G": 90, "B": 55 };
        var newColor = { "R": 255, "G": 255, "B": 255 };
        newColor.R = (75 * num3 + playerHairColor.R * num4);
        newColor.G = (255 * num3 + playerHairColor.G * num4);
        newColor.B = (200 * num3 + playerHairColor.B * num4);
        return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
    };
    var colorTime = function(slidervalue) {
        var time = slidervalue*864 + 16200;
        time -= (time > 86400 ? 86400 : 0);
        var color4 = { "R": 1, "G": 142, "B": 255 };
        var color5 = { "R": 255, "G": 255, "B": 0 };
        var color6 = { "R": 211, "G": 45, "B": 127 };
        var color7 = { "R": 67, "G": 44, "B": 118 };
        var newColor = { "R": 255, "G": 255, "B": 255 };
        if (time >= 16200 && time < 70200) {
            if (time < 43200) {
                var num5 = time / 43200;
                var num6 = 1 - num5;
                newColor.R = (color4.R * num6 + color5.R * num5);
                newColor.G = (color4.G * num6 + color5.G * num5);
                newColor.B = (color4.B * num6 + color5.B * num5);
            } else {
                var num7 = 43200;
                var num8 = ((time - num7) / (70200 - num7));
                var num9 = 1 - num8;
                newColor.R = (color5.R * num9 + color6.R * num8);
                newColor.G = (color5.G * num9 + color6.G * num8);
                newColor.B = (color5.B * num9 + color6.B * num8);
            }
        } else {
            if (time >= 70200 && time < 86400) {
                var num10 = (time / 86400);
                var num11 = 1 - num10;
                newColor.R = (color6.R * num11 + color7.R * num10);
                newColor.G = (color6.G * num11 + color7.G * num10);
                newColor.B = (color6.B * num11 + color7.B * num10);
            } else {
                var num12 = 0;
                var num13 = ((time - num12) / (16200 - num12));
                var num14 = 1 - num13;
                newColor.R = (color7.R * num14 + color4.R * num13);
                newColor.G = (color7.G * num14 + color4.G * num13);
                newColor.B = (color7.B * num14 + color4.B * num13);
            }
        }
        return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
    };
    var colorFunc = function ($type, $value) {
        switch($type) {
            case "health":
                return "rgb(" + ($value * 2.35 + 20) + ",20,20)";
            case "mana":
                return "rgb(" + (250 - $value * 2) + "," + (255 - $value * 1.80) + ",255)";
            case "speed":
                return colorSpeed($value);
            case "time":
                return colorTime($value);
            default:
                return "#0ff";
        }
    };
    var textFunc = function ($type, $value) {
        // return the function from the textFunctions table if the id is correct
        // otherwise, return a fallback function that just returns the raw, unchanged slider value
        switch($type) {
            case "speed":
                return (($value === 100) ? "≥ 51" : Math.round($value/10 * 3.75*(15/11)));
            case "time":
                return textTime($value);
            default:
                return $value;
        }
    };
    var update = function($slider){
        var $value = parseInt($slider.data('input').val());
        var $type = $slider.data('type');
        // update color display
        $slider.data('colorBox').css('background-color', colorFunc($type, $value));
        // update text display
        $slider.data('valueBox').html(textFunc($type, $value));
    };
    // create all sliders and make them visible
    $sliders.each(function(){
        var $slider = $(this).append($("<input type='range' style='margin: auto 0.5em'/>"));
        var $wrapper = $slider.parents('.hair-dye-slider-wrapper').show();
        var $valueBox = $wrapper.find(".inputvalue");
        var $input = $slider.find('input').val($valueBox.text()).on('input', function() {
            update($slider);
        });
        $slider.val($valueBox.text()).data({
            valueBox: $valueBox,
            colorBox: $wrapper.find(".color-box"),
            input: $input,
            type: $wrapper.attr('id')
        });
        update($slider);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
 * Boss HP Calculator
 * Script by [[User:Wormix Game]]
 */
$(function(){
	var bossName = "";
	var hpModuleInvokeResult = null;
	var maxAsyncWaitForResultCount = 10;
	var maxChecksForCalcSpan = 5;
	
	var l10n_boss_calc = l10nFactory(mw.config.get( 'wgPageContentLanguage' ), {
	        // time format: prefix + <time> + postfix
	        unstableConnection:{
	            'en': "ERROR: unstable connection"
	        },
	        error:{
	        	'en': "ERROR"
	        },
	        loading:{
	        	'en': "Loading..."
	        },
	        incorrectValue:{
	        	'en': "The value should be between 1 and 256."
	        },
	        incorrectType:{
	        	'en': "The value should be an integer number."
	        },
	        players:{
	        	'en': "Players"
	        },
	        calculate:{
	        	'en': "Calculate"
	        }
	    });
	
	function checkResult(currentRequestCount){
		var spanToWriteResult = $("#calcResult")[0];
		if (hpModuleInvokeResult == null){
			if (currentRequestCount != maxAsyncWaitForResultCount){
				setTimeout(checkResult, 1000, currentRequestCount + 1);
			}else{
				spanToWriteResult.innerHTML = l10n_boss_calc('unstableConnection');
			}
		}else{
			spanToWriteResult.innerHTML = hpModuleInvokeResult;
		}
	}
	
	window.getBossHp = function() {
		var spanToWriteResult = $("#calcResult")[0];
		var playersCount = Number($("#players-count-field")[0].value);
		var resultText = l10n_boss_calc('error'); // Print "ERROR" by default
		if (!isNaN(playersCount)){
			if (0 < playersCount && playersCount <= 256){
				var api = new mw.Api();
				hpModuleInvokeResult = null;
				api.get({
					action: 'expandtemplates',
					text: '{{Boss hp calculator/table|' + bossName + '|players=' +  playersCount + '}}'
				}).done(function(data) {
					hpModuleInvokeResult = data.expandtemplates['*'];
				});
				resultText = l10n_boss_calc('loading');
				checkResult(1);
			}else{
				resultText = l10n_boss_calc('incorrectValue');
			}
		}else{
			resultText = l10n_boss_calc('incorrectType');
		}
		spanToWriteResult.innerHTML = resultText;
	}
	
	var timeUntilNewCheck = 1000;
	var currentCheck = 1;
	
	function checkSpan(){
		var spanToInsertControls = $("#calc")[0];
		if (spanToInsertControls !== undefined){
			bossName = $("#calc")[0].innerText;
			if (bossName !== "") {
				spanToInsertControls.innerHTML = "";
			}
			$('<input id="players-count-field" type="number" max="256" min="2" placeholder="' + l10n_boss_calc('players') + '" value="2" maxlength="3">').appendTo(spanToInsertControls);
			$('<input id="calculate-hp-boss" onclick="getBossHp()" type="button" value="' + l10n_boss_calc('calculate') + '">').appendTo(spanToInsertControls);
		}else{
			timeUntilNewCheck += 2000;
			if (currentCheck != maxChecksForCalcSpan){
				currentCheck += 1;
				setTimeout(checkSpan, timeUntilNewCheck);
			}
		}
	}
	
	checkSpan();
});