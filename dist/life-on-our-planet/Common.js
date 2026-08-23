window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 28;

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.mline = 20;
window.pPreview.textAlign = 'justify';
window.pPreview.RegExp.iclasses = ['image', '.lightbox', '.thumb', '.gallery-image-wrapper', '.mw-userlink', '.userlink', '.recent-wiki-activity__username', '.edit-info-user', '.EntityHeader_name__PAxYW', '.UserProfilePopup__processed'];
window.pPreview.RegExp.noinclude = ['.non-previewable', '.icon-tab-group', '.icon-tab-unit', '.icon-tab-unit-icon', '.icon-tab-unit-text', '.quote_box', '.quote_box_quote', '.banner_box', 'img', 'ref', 'references', '.references', '.reference', '.sup.reference', '.mw-ext-cite-error', '.error', '.reference', '.mw-userlink', '.userlink', '.recent-wiki-activity__username', '.edit-info-user', '.EntityHeader_name__PAxYW', '.UserProfilePopup__processed'];
window.pPreview.defimage = 'https://static.wikia.nocookie.net/life-on-our-planet/images/e/e6/Site-logo.png/revision/latest';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/life-on-our-planet/images/e/e6/Site-logo.png/revision/latest';
Settings.suppressTitle !== undefined ? Settings.suppressTitle : true;