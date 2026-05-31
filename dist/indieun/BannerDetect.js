/*
  ============================================================
  Indieun Wiki — BannerDetect.js
  Imported by MediaWiki:Common.js via mw.loader.load().

  Automatically detects missing content and injects visual
  maintenance banners for editors browsing the wiki.

  ▸ Does NOT edit wiki pages — display only.
  ▸ Skips: main page, non-article namespaces, non-view actions.
  ▸ Dismissed banners stay hidden for the browser session.
  ▸ Won't duplicate manually placed maintenance templates.

  Checks:
    Universal  — main page skip, short page, no headings,
                 no links, no categories, duplicate categories,
                 placeholder text, missing bold intro, missing
                 parent link on subpages, no image, no infobox,
                 broken external links, upcoming missing date
    Game pages — missing Overview, Gameplay, Updates/Changelog,
                 Badges, Codes, External Links, Roblox link,
                 navbox, Games/Roblox Games categories
    Person pages — missing Overview, Career, Games section,
                   External Links, wikitable
  ============================================================
*/

( function () {

  /* ── Gate ────────────────────────────────────────────── */

  var cfg = mw.config.get([
    'wgNamespaceNumber',
    'wgPageName',
    'wgAction',
    'wgIsMainPage'
  ]);

  if ( cfg.wgNamespaceNumber !== 0 ) return;
  if ( cfg.wgAction !== 'view' ) return;
  if ( cfg.wgIsMainPage ) return;  /* Skip main page entirely */

  /* Also skip by page name as a fallback for wikis where
     wgIsMainPage may not be set */
  var pageName   = cfg.wgPageName;
  var pageNameLC = pageName.toLowerCase();
  var MAIN_PAGE_NAMES = [ 'main_page', 'home', 'indieun_x_zv_u_wiki', 'wiki' ];
  if ( MAIN_PAGE_NAMES.indexOf( pageNameLC ) !== -1 ) return;

  var isSubpage  = pageName.indexOf( '/' ) !== -1;

  var content = document.getElementById( 'mw-content-text' );
  if ( !content ) return;

  /* ── Page type detection ─────────────────────────────── */

  var catLinks = document.querySelector( '.categories, .articleCategories, #catlinks' );
  var catText  = catLinks ? catLinks.innerText.toLowerCase() : '';

  var isGamePage = catText.indexOf( 'games' ) !== -1
                || catText.indexOf( 'roblox' ) !== -1
                || pageNameLC.indexOf( 'game:' ) !== -1;

  var isPersonPage = catText.indexOf( 'people' ) !== -1
                  || catText.indexOf( 'creator' ) !== -1
                  || catText.indexOf( 'developer' ) !== -1
                  || !!content.querySelector( '.pi-item-type-group' );

  /* ── Helpers ─────────────────────────────────────────── */

  function isDismissed( key ) {
    try { return sessionStorage.getItem( 'maint-' + key ) === '1'; }
    catch (e) { return false; }
  }

  function makeBanner( type, icon, html ) {
    var key = pageName + '-' + type;
    if ( isDismissed( key ) ) return null;

    var wrap = document.createElement( 'div' );
    wrap.className = 'maint-banner maint-' + type;
    wrap.setAttribute( 'data-banner', type );

    var iconEl = document.createElement( 'span' );
    iconEl.className = 'maint-icon';
    iconEl.textContent = icon;

    var textEl = document.createElement( 'span' );
    textEl.className = 'maint-text';
    textEl.innerHTML = html;

    var btn = document.createElement( 'button' );
    btn.className = 'maint-dismiss';
    btn.title = 'Dismiss';
    btn.textContent = '✕';
    btn.addEventListener( 'click', function () {
      wrap.style.display = 'none';
      try { sessionStorage.setItem( 'maint-' + key, '1' ); }
      catch (e) {}
    } );

    wrap.appendChild( iconEl );
    wrap.appendChild( textEl );
    wrap.appendChild( btn );
    return wrap;
  }

  var banners = [];

  function flag( type, icon, html ) {
    /* Skip if a manually placed template already covers this type */
    if ( content.querySelector( '[data-banner="' + type + '"]' ) ) return;
    var b = makeBanner( type, icon, html );
    if ( b ) banners.push( b );
  }

  /* ── Content helpers ─────────────────────────────────── */

  var parser   = content.querySelector( '.mw-parser-output' ) || content;
  var bodyText = parser.innerText || '';
  var bodyHTML = parser.innerHTML || '';

  function hasHeading( text ) {
    var headings = parser.querySelectorAll( 'h2, h3' );
    var t = text.toLowerCase();
    for ( var i = 0; i < headings.length; i++ ) {
      if ( headings[ i ].innerText.toLowerCase().indexOf( t ) !== -1 ) return true;
    }
    return false;
  }

  function wordCount() {
    return bodyText.trim().split( /\s+/ ).filter( Boolean ).length;
  }

  function hasCategory( name ) {
    return catText.indexOf( name.toLowerCase() ) !== -1;
  }

  /* ── ① Short page ────────────────────────────────────── */

  var wc = wordCount();
  if ( wc < 80 ) {
    flag( 'stub', '⚠️',
      '<b>This article is very short</b> (' + wc + ' words). ' +
      'Please expand it with more detail.' );
  }

  /* ── ② No headings ───────────────────────────────────── */

  if ( parser.querySelectorAll( 'h2' ).length === 0 ) {
    flag( 'incomplete', '📝',
      '<b>This article has no sections.</b> ' +
      'Please add headings to organise the content.' );
  }

  /* ── ③ No internal links ─────────────────────────────── */

  var internalLinks = parser.querySelectorAll( 'a[href^="/wiki/"]' );
  var realLinks = Array.prototype.filter.call( internalLinks, function ( a ) {
    return a.closest( '#catlinks, .navbox, .toc, .mw-editsection, .categories' ) === null;
  } );
  if ( realLinks.length === 0 ) {
    flag( 'cleanup', '🔗',
      '<b>This article has no internal links.</b> ' +
      'Please link to related wiki pages where appropriate.' );
  }

  /* ── ④ No categories ─────────────────────────────────── */

  var catItems = document.querySelectorAll(
    '.categories a[href*="/wiki/Category:"], .articleCategories a[href*="/wiki/Category:"]'
  );
  if ( catItems.length === 0 ) {
    flag( 'cleanup', '🗂️',
      '<b>This article has no categories.</b> ' +
      'Please add at least one relevant category.' );
  }

  /* ── ⑤ Duplicate categories ──────────────────────────── */

  if ( catItems.length > 0 ) {
    var catNames = Array.prototype.map.call( catItems, function ( a ) {
      return a.innerText.trim().toLowerCase();
    } );
    var seen = {};
    var dupes = [];
    catNames.forEach( function ( name ) {
      if ( seen[ name ] && dupes.indexOf( name ) === -1 ) dupes.push( name );
      seen[ name ] = true;
    } );
    if ( dupes.length > 0 ) {
      flag( 'cleanup', '♻️',
        '<b>This article has duplicate categories:</b> ' +
        dupes.map( function (d) { return '<code>' + d + '</code>'; } ).join( ', ' ) +
        '. Please remove the duplicates from the page source.' );
    }
  }

  /* ── ⑥ Placeholder text ──────────────────────────────── */

  var placeholders = [
    'to be added', 'tba', 't.b.a', 'todo', 'placeholder',
    'lorem ipsum', 'work in progress', 'wip', 'fill this in',
    'needs content', 'coming soon'
  ];
  var foundPlaceholder = placeholders.some( function ( p ) {
    return bodyText.toLowerCase().indexOf( p ) !== -1;
  } );
  if ( foundPlaceholder ) {
    flag( 'incomplete', '✏️',
      '<b>This article contains placeholder text.</b> ' +
      'Please replace any "TBA", "WIP", or similar text with real content.' );
  }

  /* ── ⑦ No bold intro ─────────────────────────────────── */

  var firstPara = parser.querySelector( 'p' );
  if ( firstPara && !firstPara.querySelector( 'b, strong' ) ) {
    flag( 'cleanup', '📖',
      '<b>This article\'s intro may be missing the subject name in bold.</b> ' +
      'Wiki convention is to bold the article subject on first mention.' );
  }

  /* ── ⑧ Subpage missing parent link ──────────────────── */

  if ( isSubpage ) {
    var parentName = pageName.split( '/' )[ 0 ];
    var parentSlug = parentName.replace( / /g, '_' );
    var hasParentLink = !!parser.querySelector( 'a[href*="' + parentSlug + '"]' );
    if ( !hasParentLink ) {
      flag( 'incomplete', '↩️',
        '<b>This subpage has no link back to its parent page</b> ([[' + parentName + ']]). ' +
        'Consider adding a navigation link or breadcrumb.' );
    }
  }

  /* ── ⑨ No image ──────────────────────────────────────── */

  var hasImage = !!parser.querySelector( 'img, figure, a.image' );
  if ( !hasImage ) {
    flag( 'noimage', '🖼️',
      '<b>This article has no images.</b> ' +
      'Please upload a relevant screenshot, icon, or thumbnail.' );
  }

  /* ── ⑩ No infobox ────────────────────────────────────── */

  var hasInfobox = !!content.querySelector(
    '.portable-infobox, .infobox, table.infobox, .pi-item'
  );
  if ( !hasInfobox ) {
    flag( 'noinfobox', '📋',
      '<b>This article is missing an infobox.</b> ' +
      'Please add the appropriate infobox template to the top of this page.' );
  }

  /* ── ⑪ Broken external links ─────────────────────────── */
  /*
    Flags plain http:// links that may be outdated or broken.
    Excludes known-good domains: roblox.com, youtube.com, twitter.com.
  */

  var extLinks = parser.querySelectorAll( 'a.external[href^="http"]' );
  var SAFE_DOMAINS = [ 'roblox.com', 'youtube.com', 'twitter.com', 'x.com', 'fandom.com' ];
  var suspectLinks = Array.prototype.filter.call( extLinks, function ( a ) {
    var href = a.href || '';
    return !SAFE_DOMAINS.some( function ( d ) { return href.indexOf( d ) !== -1; } );
  } );
  if ( suspectLinks.length > 0 ) {
    flag( 'outdated', '🔗',
      '<b>This article has ' + suspectLinks.length + ' external link' +
      ( suspectLinks.length !== 1 ? 's' : '' ) +
      ' that may be outdated or broken.</b> ' +
      'Please verify they still work and remove or update any that don\'t.' );
  }

  /* ── ⑫ Upcoming template missing date ────────────────── */
  /*
    Detects if {{Upcoming}} was used but rendered without a date.
    The template outputs data-banner="upcoming" — if that banner
    exists but the word "expected" or a year isn't in its text,
    the date param was omitted.
  */

  var upcomingBanner = content.querySelector( '[data-banner="upcoming"]' );
  if ( upcomingBanner ) {
    var upcomingText = upcomingBanner.innerText.toLowerCase();
    var hasDate = /\d{4}|january|february|march|april|may|june|july|august|september|october|november|december|q[1-4]/i.test( upcomingText );
    if ( !hasDate ) {
      flag( 'incomplete', '📅',
        '<b>This upcoming page is missing a release date.</b> ' +
        'Update <code>{{Upcoming}}</code> with a <code>|date=</code> parameter, ' +
        'e.g. <code>{{Upcoming|date=Summer 2025}}</code>.' );
    }
  }

  /* ── ⑬ Game page checks ──────────────────────────────── */

  if ( isGamePage ) {

    if ( !hasHeading( 'overview' ) ) {
      flag( 'incomplete', '📑',
        '<b>This game article is missing an Overview section.</b> ' +
        'Please add a <code>== Overview ==</code> heading.' );
    }

    if ( !hasHeading( 'gameplay' ) ) {
      flag( 'incomplete', '🎮',
        '<b>This game article is missing a Gameplay section.</b> ' +
        'Please add a <code>== Gameplay ==</code> or <code>== Gameplay Summary ==</code> section.' );
    }

    /* Updates / Changelog */
    if ( !hasHeading( 'update' ) && !hasHeading( 'changelog' ) ) {
      flag( 'outdated', '📋',
        '<b>This game article is missing an Updates or Changelog section.</b> ' +
        'Please add a <code>== Updates ==</code> or <code>== Changelog ==</code> section ' +
        'to track game changes over time.' );
    }

    /* Badges */
    if ( !hasHeading( 'badge' ) ) {
      flag( 'incomplete', '🏅',
        '<b>This game article is missing a Badges section.</b> ' +
        'Please add a <code>== Badges ==</code> section listing all obtainable badges.' );
    }

    /* Codes */
    var hasCodesHeading = hasHeading( 'code' );
    var hasCodesLink    = !!parser.querySelector( 'a[href*="/Codes"]' );
    if ( !hasCodesHeading && !hasCodesLink ) {
      flag( 'incomplete', '🎟️',
        '<b>This game article is missing a Codes section or link.</b> ' +
        'Please add a <code>== Codes ==</code> section or link to the Codes subpage.' );
    }

    if ( !hasHeading( 'external' ) ) {
      flag( 'incomplete', '🔗',
        '<b>This game article is missing an External Links section.</b> ' +
        'Please add a <code>== External Links ==</code> section.' );
    }

    var hasRobloxLink = bodyHTML.indexOf( 'roblox.com/games' ) !== -1;
    if ( !hasRobloxLink ) {
      flag( 'incomplete', '🎱',
        '<b>This game article has no link to the Roblox game page.</b> ' +
        'Please add a <code>roblox.com/games/...</code> link.' );
    }

    var hasNavbox = !!content.querySelector( '.navbox, .nav-template' );
    if ( !hasNavbox ) {
      flag( 'incomplete', '🗺️',
        '<b>This game article is missing a navigation box.</b> ' +
        'Please add <code>{{Navbox/Games}}</code> at the bottom of the page.' );
    }

    if ( !hasCategory( 'roblox games' ) ) {
      flag( 'cleanup', '🗂️',
        '<b>This game article is missing the <code>Roblox Games</code> category.</b> ' +
        'Please add <code>[[Category:Roblox Games]]</code>.' );
    }

    if ( !hasCategory( 'games' ) ) {
      flag( 'cleanup', '🗂️',
        '<b>This game article is missing the <code>Games</code> category.</b> ' +
        'Please add <code>[[Category:Games]]</code>.' );
    }

  }

  /* ── ⑭ Person page checks ────────────────────────────── */

  if ( isPersonPage ) {

    if ( !hasHeading( 'overview' ) ) {
      flag( 'incomplete', '📑',
        '<b>This person article is missing an Overview section.</b> ' +
        'Please add a <code>== Overview ==</code> heading.' );
    }

    if ( !hasHeading( 'career' ) ) {
      flag( 'incomplete', '💼',
        '<b>This person article is missing a Career section.</b> ' +
        'Please add a <code>== Career ==</code> heading.' );
    }

    if ( !hasHeading( 'games' ) ) {
      flag( 'incomplete', '🎮',
        '<b>This person article is missing a Games section.</b> ' +
        'Please add a <code>== Games ==</code> heading with a games table.' );
    }

    if ( !hasHeading( 'external' ) ) {
      flag( 'incomplete', '🔗',
        '<b>This person article is missing an External Links section.</b> ' +
        'Please add a <code>== External Links ==</code> section.' );
    }

    var hasTable = !!parser.querySelector( 'table.wikitable' );
    if ( !hasTable ) {
      flag( 'incomplete', '📊',
        '<b>This person article is missing a games table.</b> ' +
        'Please add a <code>wikitable</code> listing their games.' );
    }

  }

  /* ── Inject all banners ──────────────────────────────── */

  if ( banners.length === 0 ) return;

  var VISIBLE_COUNT = 3;
  var wrapper = document.createElement( 'div' );
  wrapper.id = 'maint-banner-wrapper';

  if ( banners.length <= VISIBLE_COUNT ) {

    for ( var i = 0; i < banners.length; i++ ) {
      wrapper.appendChild( banners[ i ] );
    }

  } else {

    for ( var i = 0; i < VISIBLE_COUNT; i++ ) {
      wrapper.appendChild( banners[ i ] );
    }

    var overflow = document.createElement( 'div' );
    overflow.id = 'maint-banner-overflow';
    overflow.style.display = 'none';
    for ( var i = VISIBLE_COUNT; i < banners.length; i++ ) {
      overflow.appendChild( banners[ i ] );
    }

    var toggleRow = document.createElement( 'div' );
    toggleRow.className = 'maint-toggle-row';

    var remaining = banners.length - VISIBLE_COUNT;

    var toggleBtn = document.createElement( 'button' );
    toggleBtn.className = 'maint-toggle-btn';
    toggleBtn.innerHTML =
      '<span class="maint-toggle-icon">▾</span> See ' +
      '<span class="maint-toggle-count">' + remaining + '</span> more warning' +
      ( remaining !== 1 ? 's' : '' );

    var dismissAllBtn = document.createElement( 'button' );
    dismissAllBtn.className = 'maint-dismiss-all-btn';
    dismissAllBtn.textContent = 'Dismiss all';

    toggleBtn.addEventListener( 'click', function () {
      var isOpen = overflow.style.display !== 'none';
      overflow.style.display = isOpen ? 'none' : 'block';
      if ( isOpen ) {
        toggleBtn.innerHTML =
          '<span class="maint-toggle-icon">▾</span> See ' +
          '<span class="maint-toggle-count">' + remaining + '</span> more warning' +
          ( remaining !== 1 ? 's' : '' );
      } else {
        toggleBtn.innerHTML = '<span class="maint-toggle-icon">▴</span> Hide extra warnings';
      }
    } );

    dismissAllBtn.addEventListener( 'click', function () {
      var allBanners = wrapper.querySelectorAll( '.maint-banner' );
      for ( var j = 0; j < allBanners.length; j++ ) {
        allBanners[ j ].style.display = 'none';
        var type = allBanners[ j ].getAttribute( 'data-banner' );
        try { sessionStorage.setItem( 'maint-' + pageName + '-' + type, '1' ); }
        catch (e) {}
      }
      wrapper.style.display = 'none';
    } );

    toggleRow.appendChild( toggleBtn );
    toggleRow.appendChild( dismissAllBtn );
    wrapper.appendChild( overflow );
    wrapper.appendChild( toggleRow );

  }

  content.insertBefore( wrapper, content.firstChild );

}() );