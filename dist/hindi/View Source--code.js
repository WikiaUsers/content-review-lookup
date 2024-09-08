
//<pre>
/**
 * View Source
 *
 * © Peter Coester 2013 [[User_talk:Pecoes|Pecoes]]
 *
 * documentation and examples at:
 * https://dev.fandom.com/wiki/View_Source
 */

/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, regexp:false, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki, importArticle */
(function (module, mw, $) {

    'use strict';

    if (module.loadSource) return;

    var config = mw.config.get([
        'wgAction',
        'wgArticleId',
        'wgArticlePath',
        'wgContentLanguage',
        'wgCurRevisionId',
        'wgFormattedNamespaces',
        'wgNamespaceIds',
        'wgPageContentModel',
        'wgPageName',
        'wgUserLanguage',
        'wgVersion'
    ]),
    

    parserFunctions = {
        '#expr': 'Help:Extension:ParserFunctions#.23expr',
        '#if': 'Help:Extension:ParserFunctions#.23if',
        '#ifeq': 'Help:Extension:ParserFunctions#.23ifeq',
        '#iferror': 'Help:Extension:ParserFunctions#.23iferror',
        '#ifexpr': 'Help:Extension:ParserFunctions#.23ifexpr',
        '#ifexist': 'Help:Extension:ParserFunctions#.23ifexist',
        '#rel2abs': 'Help:Extension:ParserFunctions#.23rel2abs',
        '#switch': 'Help:Extension:ParserFunctions#.23switch',
        '#time': 'Help:Extension:ParserFunctions#.23time',
        '#timel': 'Help:Extension:ParserFunctions#.23timel',
        '#titleparts': 'Help:Extension:ParserFunctions#.23titleparts',
        'subst': 'Help:Substitution',
        'safesubst': 'Help:Substitution',
        '#len': 'Extension:StringFunctions#.23len:',
        '#pos': 'Extension:StringFunctions#.23pos:',
        '#rpos': 'Extension:StringFunctions#.23rpos:',
        '#sub': 'Extension:StringFunctions#.23sub:',
        '#pad': 'Extension:StringFunctions#.23pad:',
        '#replace': 'Extension:StringFunctions#.23replace:',
        '#explode': 'Extension:StringFunctions#.23explode:',
        '#urlencode': 'Extension:StringFunctions#.23urlencode:_and_.23urldecode:',
        '#urldecode': 'Extension:StringFunctions#.23urlencode:_and_.23urldecode:',
        '#invoke': 'Extension:Scribunto#Usage',
        '#lst': 'Extension:Labeled_Section_Transclusion#How_it_works',
        '#lsth': 'Extension:Labeled_Section_Transclusion#How_it_works',
        '#lstx': 'Extension:Labeled_Section_Transclusion#How_it_works',
        '#var': 'Extension:Variables#.23var',
        '#var_final': 'Extension:Variables#.23var_final',
        '#vardefine': 'Extension:Variables#.23vardefine',
        '#vardefineecho': 'Extension:Variables#.23vardefineecho',
        '#varexists': 'Extension:Variables#.varexists',
        '#dpl': 'Extension:DynamicPageList_(third-party)',

        // -> https://www.mediawiki.org/wiki/Help:Magic_words
        '#dateformat': 'Help:Magic_words#Formatting',
        '#formatdate': 'Help:Magic_words#Formatting',
        'lc': 'Help:Magic_words#Formatting',
        'lcfirst': 'Help:Magic_words#Formatting',
        'uc': 'Help:Magic_words#Formatting',
        'ucfirst': 'Help:Magic_words#Formatting',
        '#language': 'Help:Magic_words#Miscellaneous',
        '#special': 'Help:Magic_words#Miscellaneous',
        '#tag': 'Help:Magic_words#Miscellaneous',
        'ns': 'Help:Magic_words#Namespaces',
        'PAGESINCAT': 'Help:Magic_words#Statistics',
        'PAGESINCATEGORY': 'Help:Magic_words#Statistics',
        'DEFAULTSORT': 'Help:Magic_words#Technical_metadata',
        'DISPLAYTITLE': 'Help:Magic_words#Technical_metadata',
        'int': 'Help:Magic_words#Transclusion_modifiers'
    },

    parserTags = {
        activityfeed: 'https://community.fandom.com/wiki/Help:Wiki_Activity',
        aoaudio: 'https://community.fandom.com/wiki/Help:Video',
        aovideo: 'https://community.fandom.com/wiki/Help:Video',
        bloglist: 'https://community.fandom.com/wiki/Help:Blog_article/Bloglist',
        categorytree: 'https://www.mediawiki.org/wiki/Categorytree',
        charinsert: 'https://www.mediawiki.org/wiki/Extension:CharInsert',
        chat: 'https://community.fandom.com/wiki/Help:Chat',
        choose: 'https://www.mediawiki.org/wiki/Extension:RandomSelection',
        createbox: 'https://www.mediawiki.org/wiki/Extension:CreateBox',
        dpl: 'https://community.fandom.com/wiki/Help:DynamicPageList',
        'fb:facepile': 'https://community.fandom.com/wiki/Help:Social_media_integration#Adding_Facebook_widgets',
        'fb:follow': 'https://community.fandom.com/wiki/Help:Social_media_integration#Adding_Facebook_widgets',
        'fb:like': 'https://community.fandom.com/wiki/Help:Social_media_integration#Adding_Facebook_widgets',
        'fb:likebox': 'https://community.fandom.com/wiki/Help:Social_media_integration#Adding_Facebook_widgets',
        'fb:recommendations': 'https://community.fandom.com/wiki/Help:Social_media_integration#Adding_Facebook_widgets',
        'fb:share-button': 'https://community.fandom.com/wiki/Help:Social_media_integration#Adding_Facebook_widgets',
        forum: 'https://community.fandom.com/wiki/Help:Wiki-style_forums',
        gallery: 'https://www.mediawiki.org/wiki/Gallery#Rendering_a_gallery_of_images',
        ggtube: 'https://community.fandom.com/wiki/Help:Video',
        googlespreadsheet: 'https://www.mediawiki.org/wiki/Extension:GoogleDocs4MW',
        gtrailer: 'https://community.fandom.com/wiki/Help:Video',
        gvideo: 'https://community.fandom.com/wiki/Help:Video',
        helper: 'https://community.fandom.com/wiki/Help:Volunteers_and_Helpers#Helpers',
        hiero: 'https://www.mediawiki.org/wiki/Hiero',
        imagemap: 'https://www.mediawiki.org/wiki/Imagemap',
        includeonly: 'https://www.mediawiki.org/wiki/Templates',
        infobox: 'https://community.fandom.com/wiki/Help:Infoboxes',
        inputbox: 'https://www.mediawiki.org/wiki/Inputbox',
        'mainpage-endcolumn': 'https://community.fandom.com/wiki/Help:Main_page_column_tags',
        'mainpage-leftcolumn-start': 'https://community.fandom.com/wiki/Help:Main_page_column_tags',
        'mainpage-rightcolumn-start': 'https://community.fandom.com/wiki/Help:Main_page_column_tags',
        math: 'https://www.mediawiki.org/wiki/Math',
        nicovideo: 'https://community.fandom.com/wiki/Help:Video',
        noinclude: 'https://www.mediawiki.org/wiki/Templates',
        nowiki: 'https://meta.wikimedia.org/wiki/Help:Wikitext_examples#Just_show_what_I_typed',
        onlyinclude: 'https://www.mediawiki.org/wiki/Templates',
        poem: 'https://www.mediawiki.org/wiki/Extension:Poem',
        poll: 'https://www.mediawiki.org/wiki/Extension:AJAXPoll',
        pre: 'https://meta.wikimedia.org/wiki/Help:Wikitext_examples#Just_show_what_I_typed',
        randomimage: 'https://www.mediawiki.org/wiki/Extension:RandomImage',
        ref: 'https://www.mediawiki.org/wiki/Ref',
        references: 'https://www.mediawiki.org/wiki/Ref',
        rss: 'https://community.fandom.com/wiki/Help:Feeds',
        section: 'https://www.mediawiki.org/wiki/Extension:Labeled_Section_Transclusion',
        source: 'https://www.mediawiki.org/wiki/Extension:SyntaxHighlight_GeSHi',
        syntaxhighlight: 'https://www.mediawiki.org/wiki/Extension:SyntaxHighlight_GeSHi',
        staff: 'https://community.fandom.com/wiki/Community_Central:Staff',
        tabber: 'https://community.fandom.com/wiki/Help:Tabber',
        tabview: 'https://community.fandom.com/wiki/Help:Tab_view',
        tangler: 'https://community.fandom.com/wiki/Help:Video',
        timeline: 'https://www.mediawiki.org/wiki/Extension:Timeline',
        twitter: 'https://community.fandom.com/wiki/Help:Social_media_integration#Adding_a_Twitter_timeline',
        verbatim: 'https://community.fandom.com/wiki/Help:Verbatim_tags',
        videogallery: 'https://community.fandom.com/wiki/Help:Video',
        wegame: 'https://community.fandom.com/wiki/Help:Video',
        youtube: 'https://community.fandom.com/wiki/Help:Video'
    },

    interwikiMap = {
        w: 'https://community.fandom.com/wiki/$1',
        community: 'https://community.fandom.com/wiki/$1',
        bugzilla: 'https://bugzilla.wikimedia.org/show_bug.cgi?id=$1',
        commons: 'https://commons.wikimedia.org/wiki/$1',
        creativecommons: 'https://creativecommons.org/licenses/$1',
        creativecommonswiki: 'https://wiki.creativecommons.org/$1',
        dictionary: 'http://www.dict.org/bin/Dict?Database=*&Form=Dict1&Strategy=*&Query=$1', // http only
        dict: 'http://www.dict.org/bin/Dict?Database=*&Form=Dict1&Strategy=*&Query=$1', // http only
        docbook: 'http://wiki.docbook.org/topic/$1', // http only
        download: 'https://download.wikimedia.org/$1',
        dbdump: 'https://download.wikimedia.org/$1/latest/',
        dreamhost: 'http://wiki.dreamhost.com/index.php/$1', // http only
        finalfantasy: 'https://finalfantasy.wikia.com/wiki/$1',
        flickruser: 'https://www.flickr.com/people/$1',
        flickrphoto: 'https://www.flickr.com/photo.gne?id=$1',
        foundation: 'https://wikimediafoundation.org/wiki/$1',
        gerrit: 'https://gerrit.wikimedia.org/r/$1',
        it: 'https://gerrit.wikimedia.org/r/gitweb?p=mediawiki/$1;a=log;h=refs/heads/master',
        google: 'https://www.google.com/search?q=$1',
        googledefine: 'https://www.google.com/search?q=define:$1',
        googlegroups: 'https://groups.google.com/groups?q=$1',
        guildwiki: 'https://guildwars.wikia.com/wiki/$1',
        gutenberg: 'https://www.gutenberg.org/etext/$1',
        gutenbergwiki: 'https://www.gutenberg.org/wiki/$1',
        h2wiki: 'http://halowiki.net/p/$1', // http only, site parked
        imdbname: 'https://www.imdb.com/name/nm$1/',
        imdbtitle: 'https://www.imdb.com/title/tt$1/',
        imdbcompany: 'https://www.imdb.com/company/co$1/',
        imdbcharacter: 'https://www.imdb.com/character/ch$1/',
        incubator: 'https://incubator.wikimedia.org/wiki/$1',
        infosecpedia: 'http://infosecpedia.org/wiki/$1', // site down
        irc: 'irc://irc.freenode.net/$1',
        ircrc: 'irc://irc.wikimedia.org/$1',
        rcirc: 'irc://irc.wikimedia.org/$1',
        'iso639-3': 'https://www.sil.org/iso639-3/documentation.asp?id=$1',
        issn: 'https://www.worldcat.org/issn/$1',
        javanet: 'http://wiki.java.net/bin/view/Main/$1', // site down
        javapedia: 'http://wiki.java.net/bin/view/Javapedia/$1', // site down
        lostpedia: 'https://lostpedia.wikia.com/wiki/$1',
        mail: 'https://lists.wikimedia.org/mailman/listinfo/$1',
        mailarchive: 'https://lists.wikimedia.org/pipermail/$1',
        mariowiki: 'https://www.mariowiki.com/$1',
        marveldatabase: 'http://www.marveldatabase.com/wiki/index.php/$1', // http only
        mediawikiwiki: 'https://www.mediawiki.org/wiki/$1',
        mediazilla: 'https://bugzilla.wikimedia.org/$1',
        memoryalpha: 'http://memory-alpha.org/wiki/$1', // http only
        metawiki: 'http://sunir.org/apps/meta.pl?$1', // http only
        metawikipedia: 'https://meta.wikimedia.org/wiki/$1',
        mozcom: 'https://mozilla.wikia.com/wiki/$1',
        mozillawiki: 'https://wiki.mozilla.org/$1',
        mozillazinekb: 'http://kb.mozillazine.org/$1', // http only
        musicbrainz: 'https://musicbrainz.org/doc/$1',
        mw: 'https://www.mediawiki.org/wiki/$1',
        mwod: 'https://www.merriam-webster.com/cgi-bin/dictionary?book=Dictionary&va=$1',
        mwot: 'https://www.merriam-webster.com/cgi-bin/thesaurus?book=Thesaurus&va=$1',
        nost: 'https://nostalgia.wikipedia.org/wiki/$1',
        nostalgia: 'https://nostalgia.wikipedia.org/wiki/$1',
        openfacts: 'http://openfacts.berlios.de/index-en.phtml?title=$1', // site down
        openlibrary: 'https://openlibrary.org/$1',
        openstreetmap: 'https://wiki.openstreetmap.org/wiki/$1',
        openwetware: 'https://openwetware.org/wiki/$1',
        openwiki: 'http://openwiki.com/?$1', // http only, site parked
        osmwiki: 'https://wiki.openstreetmap.org/wiki/$1',
        otrs: 'https://ticket.wikimedia.org/otrs/index.pl?Action=AgentTicketZoom&TicketID=$1',
        otrswiki: 'https://otrs-wiki.wikimedia.org/wiki/$1',
        perlnet: 'http://perl.net.au/wiki/$1', // http only, site parked
        phpwiki: 'http://phpwiki.sourceforge.net/phpwiki/index.php?$1', // http only
        pyrev: 'https://www.mediawiki.org/wiki/Special:Code/pywikipedia/$1',
        pythoninfo: 'https://www.python.org/cgi-bin/moinmoin/$1',
        pythonwiki: 'http://www.pythonwiki.de/$1', // http only
        pywiki: 'http://c2.com/cgi/wiki?$1', // http only
        rev: 'https://www.mediawiki.org/wiki/Special:Code/MediaWiki/$1',
        revo: 'https://purl.org/NET/voko/revo/art/$1.html',
        rfc: 'https://tools.ietf.org/html/rfc$1',
        robowiki: 'http://robowiki.net/?$1', // http only
        reuterswiki: 'http://glossary.reuters.com/index.php/$1', // http only
        slashdot: 'https://slashdot.org/article.pl?sid=$1',
        sourceforge: 'https://sourceforge.net/$1',
        species: 'https://species.wikimedia.org/wiki/$1',
        strategy: 'https://strategy.wikimedia.org/wiki/$1',
        strategywiki: 'https://strategywiki.org/wiki/$1',
        sulutil: 'https://toolserver.org/~quentinv57/sulinfo/$1',
        svn: 'https://svn.wikimedia.org/viewvc/mediawiki/$1?view=log',
        svgwiki: 'http://wiki.svg.org/index.php/$1', // http only
        technorati: 'http://www.technorati.com/search/$1', // http only, site parked
        tenwiki: 'https://ten.wikipedia.org/wiki/$1',
        testwiki: 'https://test.wikipedia.org/wiki/$1',
        ticket: 'https://ticket.wikimedia.org/otrs/index.pl?Action=AgentTicketZoom&TicketNumber=$1',
        tools: 'https://toolserver.org/$1',
        tswiki: 'https://wiki.toolserver.org/view/$1',
        translatewiki: 'https://translatewiki.net/wiki/$1',
        tvtropes: 'https://www.tvtropes.org/pmwiki/pmwiki.php/Main/$1',
        unreal: 'https://wiki.beyondunreal.com/wiki/$1',
        urbandict: 'https://www.urbandictionary.com/define.php?term=$1',
        usemod: 'http://www.usemod.com/cgi-bin/wiki.pl?$1', // http only
        usability: 'https://usability.wikimedia.org/wiki/$1',
        webisodes: 'http://www.webisodes.org/$1', // http only, site parked
        wg: 'https://wg.en.wikipedia.org/wiki/$1',
        wiki: 'http://c2.com/cgi/wiki?$1', // http only
        wikia: 'https://www.wikia.com/wiki/c:$1',
        wikiasite: 'https://www.wikia.com/wiki/c:$1',
        wikibooks: 'https://en.wikibooks.org/wiki/$1',
        wikichat: 'http://www.wikichat.org/$1', // http only
        wikicities: 'https://www.wikia.com/wiki/$1',
        wikicity: 'https://www.wikia.com/wiki/c:$1',
        wikihow: 'https://www.wikihow.com/$1',
        wikiindex: 'https://wikiindex.org/$1',
        wikimedia: 'https://wikimediafoundation.org/wiki/$1',
        wikinews: 'https://en.wikinews.org/wiki/$1',
        wikipedia: 'https://en.wikipedia.org/wiki/$1',
        wikipediawikipedia: 'https://en.wikipedia.org/wiki/Wikipedia:$1',
        wikiquote: 'https://en.wikiquote.org/wiki/$1',
        wikischool: 'https://www.wikischool.de/wiki/$1',
        wikisource: 'https://en.wikisource.org/wiki/$1',
        wikispecies: 'https://species.wikimedia.org/wiki/$1',
        wikispot: 'http://wikispot.org/?action=gotowikipage&v=$1', // http only
        wikitech: 'https://wikitech.wikimedia.org/view/$1',
        wikiversity: 'https://en.wikiversity.org/wiki/$1',
        betawikiversity: 'https://beta.wikiversity.org/wiki/$1',
        wiktionary: 'https://en.wiktionary.org/wiki/$1',
        wmar: 'https://www.wikimedia.org.ar/wiki/$1',
        wmau: 'https://wikimedia.org.au/wiki/$1',
        wmbd: 'https://bd.wikimedia.org/wiki/$1',
        wmbe: 'https://be.wikimedia.org/wiki/$1',
        wmbr: 'https://br.wikimedia.org/wiki/$1',
        wmca: 'https://wikimedia.ca/wiki/$1',
        wmch: 'https://www.wikimedia.ch/$1',
        wmcz: 'https://meta.wikimedia.org/wiki/Wikimedia_Czech_Republic/$1',
        wmdc: 'https://wikimediadc.org/wiki/$1',
        securewikidc: 'https://secure.wikidc.org/$1',
        wmde: 'https://wikimedia.de/wiki/$1',
        wmfi: 'https://fi.wikimedia.org/wiki/$1',
        wmfr: 'https://wikimedia.fr/$1',
        wmhk: 'https://wikimedia.hk/index.php/$1',
        wmhu: 'http://wiki.media.hu/wiki/$1', // http only
        wmid: 'https://www.wikimedia.or.id/wiki/$1',
        wmil: 'https://www.wikimedia.org.il/$1',
        wmin: 'https://wiki.wikimedia.in/$1',
        wmit: 'https://wiki.wikimedia.it/wiki/$1',
        wmmx: 'https://mx.wikimedia.org/wiki/$1',
        wmnl: 'https://nl.wikimedia.org/wiki/$1',
        wmnyc: 'https://nyc.wikimedia.org/wiki/$1',
        wmno: 'https://no.wikimedia.org/wiki/$1',
        wmpl: 'https://pl.wikimedia.org/wiki/$1',
        wmrs: 'https://rs.wikimedia.org/wiki/$1',
        wmru: 'https://ru.wikimedia.org/wiki/$1',
        wmse: 'https://se.wikimedia.org/wiki/$1',
        wmtw: 'https://wikimedia.tw/wiki/index.php5/$1',
        wmua: 'https://ua.wikimedia.org/wiki/$1',
        wmuk: 'https://uk.wikimedia.org/wiki/$1',
        wmf: 'https://wikimediafoundation.org/wiki/$1',
        wmfblog: 'https://blog.wikimedia.org/$1',
        wookieepedia: 'https://starwars.wikia.com/wiki/$1',
        wowwiki: 'http://www.wowwiki.com/$1' // http only
    },

    i18n, $content, $list, $source, $a, $toc, headers = [];

    // Return if content model is not wikitext.
    if (config.wgVersion !== '1.19.24' && config.wgPageContentModel !== 'wikitext') {
        return;
    }

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:View_Source.css'
    });

    function addButton () {
        $a = $('<a>', {
            id: 'ca-view-source',
            text: i18n.msg('viewSource').plain()
        }).data('source', false).click(function () {
            $a.closest('.wikia-menu-button')
            .removeClass('active');
            module[$a.data('source') ? 'hideSource' : 'loadSource']();
        });

        $('<li>').append($a).appendTo($list);
    }

    function init (i18nInstance) {
        i18n = i18nInstance;
        $content = $('#mw-content-text');
        $list = $('.page-header__contribution-buttons .wds-list, .UserProfileActionButton .WikiaMenuElement');

        if ($content.length && $list.length) {
            addButton();
            if (mw.util.getParamValue('view') === 'source') {
                module.loadSource();
            }
        }
    }

    function joinHrefParts (parts) {
        for (var i = 0; i < parts.length; i++) {
            parts[i] = encodeURIComponent(parts[i]);
        }
        return parts.join(':').replace(/ /g, '_');
    }

    function createHref (link) {

        var parts, hash = '';

        if (link.indexOf('#') !== -1) {
            parts = link.split(/\#/);
            link = parts.shift();
            if (!link.length) link = config.wgPageName;
            hash = '#' + parts.pop();
        }

        if (link[0] === '/') link = config.wgPageName + link;

        parts = link.split(/\:/);

        /*if ( parts.length > 2 && parts[0] === 'w' && parts[1] === 'c') {
            parts = parts.slice(2);
            return '//' + parts.shift() + '.wikia.com/wiki/' + joinHrefParts(parts) + hash;
        } else*/ if (parts.length > 1 && interwikiMap[parts[0].toLowerCase()]) {
            return interwikiMap[parts.shift().toLowerCase()].replace(/\$1/, joinHrefParts(parts) + hash);
        }
        return config.wgArticlePath.replace('$1', joinHrefParts(parts) + hash);
    }

    function replaceTag (all, delim, tag) {
        if (!parserTags[tag])
            if (/\//g.test(all)) return '&lt;/' + tag;
            else return '&lt;' + tag;
        return delim + '<a href="' + parserTags[tag] + '">' + tag + '</a>';
    }

    function replaceHeaders (m) {
        headers.push(m);
        return '<a name="h' + (headers.length-1) + '"></a>' + m;
    }

    function replaceWikiLink (all, link, title) {
        title = title || '';
        return '[[<a href="' + createHref(link) + '">' + link + '</a>'+ title + ']]';
    }

    function replaceTemplates (all, delim, name) {
        var href, m = name.match(/^(\#?)(\w+)(\:.*)/),
            fn = m && parserFunctions[m[1] + m[2]];
        if (fn) {
            return delim + m[1] + '<a href="https://www.mediawiki.org/wiki/' + fn + '">' + m[2] + '</a>' + m[3];
        }
        // remove <!--.*--> from template name. otherwise .match will failed
        name = name.replace(/&lt;\!\-\-[\s\S]*\-\-&gt;/, '');
        m = name.match(/^(\s*)(.+)(\s*)$/);
        if (m[2][0] === ':') {
            href = m[2].substring(1);
        } else if(m[2].indexOf('w:') === 0) {
            href = 'w:' + (m[2][2] === ':' ?
                m[2].substring(3) :
                'Template:' + m[2].substring(2));
            console.log(href);
        } else if (m[2][0] === '/') {
            href = mw.config.values.wgPageName + m[2];
        } else {
            var templ = config.wgFormattedNamespaces[10] + ':';

            if(m[2].indexOf(':') !== -1) {

                var pagenamePrefix = m[2].split(':')[0];
                if (config.wgNamespaceIds.hasOwnProperty(pagenamePrefix.toLowerCase())) {
                    href = m[2];
                } else {
                    href = templ + m[2];
                }

            } else {
                href = templ + m[2];
            }
        }
        return delim + m[1] + '<a href="' + createHref(href) + '">' + m[2] + '</a>' + m[3];
    }

    function replaceRegularLinks (all, link, title) {
        title = title || '';
        return '[<a href="' + link + '">' + link + '</a>'+ title + ']';
    }

    function replaceModules (all, prefix, title, postfix) {
        // experimental stuff. doesn't recognize {{#invoke:module{{{var}}}}}
        // /({{#invoke:)([\s\S]*?)(\||})/igm
        var page = config.wgFormattedNamespaces[828] + ':' + title.trim();
        return (prefix + '<a href="' + createHref(page) + '">' + title.trim() + '</a>' + postfix);
    }

    function createPseudoToc () {
        var $rail = $('#WikiaRail'), toc, $ads;
        if (headers.length && $source.height() > $(window).height() && $rail[0] && $rail.filter('.loaded, .is-ready')[0]) {
            toc = '<ul>';
            for (var i = 0; i < headers.length; i++) {
                toc += '<li><a href="#h' + i + '">' + headers[i] + '</a></li>';
            }
            toc += '</ul>';
            $toc = $('<section id="source-toc" class="rail-module">' + toc + '</section>');
            $ads = $rail.find('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();
            if ($ads[0]) {
                $ads.after($toc);
            } else {
                $rail.prepend($toc);
            }
        }
    }

    module.loadSource = function () {
        $a.text(i18n.msg('viewArticle').plain())
        .data('source', true);
        if ($source) {
            $source.show();
            $content.hide();
            if ($toc) $toc.show();
        } else {
            $.get(mw.util.getUrl(config.wgPageName, {
                action: 'raw',
                maxage: '0',
                smaxage: '0',
                oldid: mw.util.getParamValue('diff') || mw.util.getParamValue('oldid') || config.wgCurRevisionId
            }))
            .done(function (wikitext) {
                $source = $('<pre id="source-code">' +
                    wikitext
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;' )
                    .replace(/>/g, '&gt;' )
                    .replace(/({{#invoke:)([\s\S]*?)(\||})/igm, replaceModules)
                    .replace(/(&lt;\/?)([\w\:\-]+)/g, replaceTag)
                    .replace(/^((=+)[^\[\]\{\}]+?\2)/gm, replaceHeaders)
                    .replace(/\[{2}([^\[\]\{\}\|]+)(\|[^\]]+)?\]{2}/g, replaceWikiLink)
                    .replace(/\[(https?:\/\/[^ \]]+)([^\]]*)\]/g, replaceRegularLinks)
                    .replace(/((?:^|[^\{])\{\{)([^\{\|\}]+)/g, replaceTemplates)
                    .replace(/\r\n|\r|\n/g, '<br />') +
                '</pre>')
                .insertBefore($content.css('display', 'none'));

                createPseudoToc();
            });
        }
    };

    module.hideSource = function () {
        if (!$source) return;
        $a.text(i18n.msg('viewSource').plain())
        .data('source', false);
        $source.hide();
        $content.show();
        if ($toc) $toc.hide();
    };

    if (config.wgAction === 'view' && config.wgArticleId !== 0) {
        mw.hook('dev.i18n').add(function () {
            window.dev.i18n.loadMessages('View Source').done(init);
        });

        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }

}((window.dev = window.dev || {}).viewSource = window.dev.viewSource || {}, mediaWiki, jQuery));