mw.loader.using(['mediawiki.util', 'ext.fandom.ContentReview.legacyLoaders.js'], () => {
  const { classList } = document.body;
  const coldPages = [
    'page-Artelurr',
    'page-Frostbitten_Ridge',
    'page-Christmas_2024',
    'page-Santa_s_Workshop'
  ];

  if (
    mw.user.options.get('gadget-SnowStorm') &&
    coldPages.some(cls =>
        Array.from(classList).some(bodyCls => bodyCls.startsWith(cls))
    )
  ) {
    importArticles({
      type: 'script',
      articles: ['u:dev:MediaWiki:SnowStorm.js']
    });
  }
});

/* Config */
window.snowStorm = { 
	excludeMobile: true,
	flakesMax: 36,
	flakesMaxActive: 36,
	animationInterval: 100,
	followMouse: false,
	snowColor: '#fff',
	snowStick: true,
	useMeltEffect: true,
	usePositionFixed: true,
	vMaxX: 4,
	vMaxY: 3,
	zIndex: -2, /* Behind everything except the background, including ads. */
};