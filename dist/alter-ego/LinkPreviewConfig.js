window.pPreview = $.extend(true, window.pPreview, {
  RegExp: (window.pPreview || {}).RegExp || {}
});

window.pPreview = $.extend(true, window.pPreview, {
  apid: true,
//  debug: true,
  defimage: 'https://static.wikia.nocookie.net/alter-ego/images/f/f7/Place.png/revision/latest',
  noimage: 'https://static.wikia.nocookie.net/tower-defense-sim/images/c/c7/PlaceC.png/revision/latest',
  delay: 500,
  tlen: 155,
  RegExp: {
    onlyinclude: ['.mw-content p:nth-of-type(3)'],
    noinclude: [
      'style[data-mw-deduplicate]',
      '.reference'
    ],
    iimages: [],
    ipages: [],
    ilinks: [],
    iclasses: [],
    iparents: []
  }
});