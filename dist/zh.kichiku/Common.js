if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !getParamValue('diff')
) {
    impart('MediaWiki:Common.js/LinkImagePopup.js');
}