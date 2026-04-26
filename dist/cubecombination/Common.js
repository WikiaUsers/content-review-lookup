/* Any JavaScript here will be loaded for all users on every page load. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.defimage = 'https://static.wikia.nocookie.net/cubecombination/images/9/95/Load.gif/revision/latest?cb=20260426063422';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/cubecombination/images/e/e6/Site-logo.png/revision/latest?cb=20240420192905';

window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['LinkPreview'] = window.dev.i18n.overrides['LinkPreview'] || {};

window.dev.i18n.overrides['LinkPreview']['no-image'] = 'https://nocookie.net';