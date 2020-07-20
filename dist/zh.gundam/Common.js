/*
所有用戶在加載任何頁面時，這裡的JavaScript都會加載
*/

mw.log.deprecate( window, 'JSConfig', {} );

mw.loader.using(['mediawiki.util', 'ext.gadget.site-lib'], function () {
  (function ($, mw) {

    /* 當需要時載入對應的 scripts */
    if (wgAction == "edit" || wgAction == "submit" || wgCanonicalSpecialPageName == 'Search') { // scripts specific to editing pages
      importScript('MediaWiki:Common.js/edit.js');
    }

    // wiki URL
    window.wgProjectURL = {
      en: '//en.wikipedia.org',
      de: '//de.wikipedia.org',
      fr: '//fr.wikipedia.org',
      pl: '//pl.wikipedia.org',
      ja: '//ja.wikipedia.org',
      it: '//it.wikipedia.org',
      nl: '//nl.wikipedia.org',
      pt: '//pt.wikipedia.org',
      es: '//es.wikipedia.org',
      sv: '//sv.wikipedia.org',
      // 僅列前十名其它語言百科
      m: '//meta.wikimedia.org',
      b: '//zh.wikibooks.org',
      q: '//zh.wikiquote.org',
      n: '//zh.wikinews.org',
      wikt: '//zh.wiktionary.org',
      mw: '//www.mediawiki.org',
      commons: '//commons.wikimedia.org'
    };

    /** 将页面名称转换为URL
     *
     * @param page 页面名称
     * @param paras 附加后缀对象，用空对象{}做参数可以取得源码
     */
    window.getWikiPath = function (page, paras) {
      var reg = /^[a-z]+:/;
      var pre = page.match(reg);
      pre = pre && wgProjectURL[pre[0].replace(/:$/, '').toLowerCase()];
      if (pre) {
        page = page.replace(reg, '');
      } else {
        pre = wgServer;
      } // 保障没有相对路径，以照顾在线代理。
      var url = pre + wgScript + '?title=' + encodeURI(page.replace(' ', '_'));
      if (typeof paras == 'object') {
        paras.ctype = paras.ctype || 'text';
        paras.dontcountme = paras.dontcountme || 's';
        paras.action = paras.action || 'raw';
        for (var k in paras) {
          url += '&' + k + '=' + paras[k];
        }
      }
      return url;
    };

    /**
     * Load scripts specific to Internet Explorer
     */
    if ( $.client.profile().name === 'msie' ) {
        importScript( 'MediaWiki:Common.js/IEFixes.js' );
    }

    /* Fixes for Windows XP font rendering */
    if (navigator.appVersion.search(/windows nt 5/i) != -1) {
        mw.util.addCSS('.IPA {font-family: "Lucida Sans Unicode", "Arial Unicode MS";} ' + 
                       '.Unicode {font-family: "Arial Unicode MS", "Lucida Sans Unicode";}');
    }
    
  /* 特色條目優良與條目鏈接顯示 */ 
 /**
 * Interwiki links to featured articles ***************************************
 *
 * Description: Highlights interwiki links to featured articles (or
 *              equivalents) by changing the bullet before the interwiki link
 *              into a star.
 * Maintainers: [[:en:User:R. Koot]]
 */
function LinkFA() {
    if ( document.getElementById( 'p-lang' ) ) {
        var InterwikiLinks = document.getElementById( 'p-lang' ).getElementsByTagName( 'li' );
 
        for ( var i = 0; i < InterwikiLinks.length; i++ ) {
            var className = InterwikiLinks[i].className.match(/interwiki-[-\w]+/);
            if ( document.getElementById( className + '-fa' ) && InterwikiLinks[i].className.indexOf( 'badge-featuredarticle' ) === -1 ) {
                InterwikiLinks[i].className += ' FA';
                InterwikiLinks[i].title = wgULS("此条目在此语言版本中为特色条目", "此條目在此語言版本中為特色條目");
            } else if ( document.getElementById( className + '-ga' ) && InterwikiLinks[i].className.indexOf( 'badge-goodarticle' ) === -1 ) {
                InterwikiLinks[i].className += ' GA';
                InterwikiLinks[i].title = wgULS("此条目在此语言版本中为优良条目", "此條目在此語言版本中為優良條目");
            }
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( LinkFA );


    // 修正摺疊後定位變化
    hookEvent("load", function () {
      if (location.hash) {
        location.href = location.hash;
      }
    });

    /** metaBox
     *
     * Funcionament de la Plantilla:Metacaixa
     * Implementat per: Usuari:Peleguer.
     * Actualitzat per Joanjoc seguint les indicacions d'en Martorell
     */
    function MetaCaixaInit() {
      // S'executa al carregar-se la pàgina, si hi ha metacaixes,
      // s'assignen els esdeveniments als botons
      //alert("MetaCaixaInit");
      var i = 0 // Inicialitzem comptador de caixes
      for (i = 0; i <= 9; i++) {
        var vMc = document.getElementById("mc" + i);
        if (!vMc) break;
        //alert("MetaCaixaInit, trobada Metacaixa mc"+i);
        var j = 1 // Inicialitzem comptador de botons dins de la caixa
        var vPsIni = 0 // Pestanya visible inicial
        for (j = 1; j <= 9; j++) {
          var vBt = document.getElementById("mc" + i + "bt" + j);
          if (!vBt) break;
          //alert("MetaCaixaInit, trobat botó mc"+i+"bt"+j);
          vBt.onclick = MetaCaixaMostraPestanya; // A cada botó assignem l'esdeveniment onclick
          //alert (vBt.className);
          if (vBt.className == "mcBotoSel") vPsIni = j; // Si tenim un botó seleccionat, en guardem l'index
        }
        //alert ("mc="+i+", ps="+j+", psini="+vPsIni );
        if (vPsIni == 0) { // Si no tenim cap botó seleccionat, n'agafem un aleatòriament
          vPsIni = 1 + Math.floor((j - 1) * Math.random());
          //alert ("Activant Pestanya a l'atzar; _mc"+i+"bt"+vPsIni +"_");
          document.getElementById("mc" + i + "ps" + vPsIni).style.display = "block";
          document.getElementById("mc" + i + "ps" + vPsIni).style.visibility = "visible";
          document.getElementById("mc" + i + "bt" + vPsIni).className = "mcBotoSel";
        }
      }
    }

    function MetaCaixaMostraPestanya() {
      // S'executa al clicar una pestanya,
      // aquella es fa visible i les altres s'oculten
      var vMcNom = this.id.substr(0, 3); // A partir del nom del botó, deduïm el nom de la caixa
      var vIndex = this.id.substr(5, 1); // I l'index
      var i = 1
      for (i = 1; i <= 9; i++) { // busquem totes les pestanyes d'aquella caixa
        //alert(vMcNom+"ps"+i);
        var vPsElem = document.getElementById(vMcNom + "ps" + i);
        if (!vPsElem) break;
        if (vIndex == i) { // Si és la pestanya bona la mostrem i canviem la classe de botó
          vPsElem.style.display = "block";
          vPsElem.style.visibility = "visible";
          document.getElementById(vMcNom + "bt" + i).className = "mcBotoSel";
        } else { // Sinó, l'ocultem i canviem la classe de botó
          vPsElem.style.display = "none";
          vPsElem.style.visibility = "hidden";
          document.getElementById(vMcNom + "bt" + i).className = "mcBoto";
        }
      }
      return false; // evitem la recàrrega de la pàgina
    }
    addOnloadHook(MetaCaixaInit);

    /* 智能讨论页编辑（新建） */
    $(function () {
      var catalk = $('#ca-talk');
      if (catalk.hasClass('new') && wgNamespaceNumber != 2) {
        var a = $('a:first', catalk);
        a.attr('href', a.attr('href') + '&section=new');
      }
    });

    /** Magic editintros
     *
     * Description: Adds editintros on disambiguation pages and BLP pages.
     * Maintainers: [[:en:User:RockMFR]], [[User:PhiLiP]]
     */
    var addEditIntro = function (name) {
      $('#ca-edit, .editsection').each(function () {
        $('a', this).attr('href',
        $('a', this).attr('href') + '&editintro=' + mw.util.wikiUrlencode(name));
      });
    };

    if (wgNamespaceNumber == 0) {
      $(function () {
        var uei = $('#useeditintro, .useeditintro');
        if (uei.length) {
          addEditIntro(uei.eq(-1).attr('title'));
          uei.attr('title', '');
        }
      });
    }

    /* Top icon: [[Template:Topicon]] */
    $(function () {
      // what's the problem on modern?
      $('<div />').css('float', 'right').append($('.topicon').css({
        'float': 'right',
        'position': 'static'
      }).show()).insertBefore('#firstHeading span[dir=auto]');
    });

    /* 引用錯誤標籤名字解碼 */
    $(function () {
      $('.anchordecodeme').each(function () {
        $(this).text(decodeURIComponent($(this).text().replace(/\.([0-9A-F]{2})/g, '%$1')));
      });
    });

    /** &withCSS= and &withJS= URL parameters
     * Allow to try custom scripts from MediaWiki space 
     * without editing personal .css or .js files
     */
    {
      var extraCSS = mw.util.getParamValue("withCSS");
      if ( extraCSS && extraCSS.match(/^MediaWiki:[^&<>=%]*\.css$/i) ) {
        importStylesheet(extraCSS);
      }
      var extraJS = mw.util.getParamValue("withJS");
      if ( extraJS && extraJS.match(/^MediaWiki:[^&<>=%]*\.js$/i) ) {
        importScript(extraJS);
      }
      var extraModule = mw.util.getParamValue("withModule");
      if ( extraModule ) {
        mw.loader.load(extraModule.split('|'));
      }
    }

    /* 页面历史加&hilight=高亮 */
    {
       var hilight = mw.util.getParamValue('hilight');
       if (wgAction === 'history' && hilight) {
          $.each(hilight.split(','), function (_, v) {
             $('input[name=oldid][value=' + v + ']').parent().addClass('not-patrolled');
          });
       }
    }

    /* Main page hacks */
    if ( mw.config.get( 'wgIsMainPage' ) && mw.config.get( 'wgAction' ) == 'view' ) {
        /* 维基百科语言列表 */
        $( function () {
            mw.util.addPortletLink(
                'p-lang',
                mw.util.getUrl( 'Wikipedia:维基百科语言列表' ),
                wgULS( '维基百科语言列表', '維基百科語言列表' ),
                'interwiki-completelist',
                wgULS( '维基百科的完整各语言列表', '維基百科的完整各語言列表' )
            );
        } );
        /* Remove red links */
        $( 'a.new' ).contents().unwrap();
    }
  })(jQuery, mediaWiki);
});

/* Check for any client-side simplified/traditional Chinese conversion */
/* This routine must be placed here to make sure the field is inserted in time */
$('#antispam-container').append(
    $('<input type="text" />').attr({
        id: 'wpAntiConv',
        value: '\u6c49\u6f22'
    })
);

// Results from Wikidata
// [[File:Wdsearch_script_screenshot.png]]
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === '搜索' ||  ( mw.config.get( 'wgArticleId' ) === 0 && mw.config.get( 'wgCanonicalSpecialPageName' ) === false ) ) {
        importScriptURI("//en.wikipedia.org/w/index.php?title=MediaWiki:Wdsearch.js&action=raw&ctype=text/javascript");
}

window.oc15t = true;