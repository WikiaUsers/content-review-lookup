/*jshint browser:true jquery:true laxbreak:true smarttabs:true */
/*global mediaWiki importArticle */
 
importArticle({ type: 'script', article: 'w:dev:VisualSpellCheck/code.js' });
 
// HACK: Multiple backgrounds don't work in IE8. Only Wikia supported browser that
//    doesn't support it. Unfortunately, I can't seem to get it to fallback with pure
//    CSS.
jQuery('head').append('<!--[if lt IE 9]><style type="text/css">body { background-image: url("https://images.wikia.nocookie.net/slightlydamned/images/4/41/MediusSky_SiteBackgroundTile.jpg"); background-repeat: repeat }</style><![endif]-->');