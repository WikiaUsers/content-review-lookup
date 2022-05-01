/*Adapted from the World Trigger Wikia*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = "https://static.wikia.nocookie.net/ranger-reject-sentai/images/8/81/Ranger_Reject_Header.jpg/revision/latest?cb=20210331090212";
window.pPreview.noimage = "https://static.wikia.nocookie.net/ranger-reject-sentai/images/8/81/Ranger_Reject_Header.jpg/revision/latest?cb=20210331090212";
window.pPreview.RegExp.noinclude = [".hide-from-preview", ".reference", ".references", ".caption", "h2", ".toc", "sup", "rt", ".wikia-slideshow-wrapper", ".nihongo", ".tabber", ".ruby", "small", ".notice", ".wikia-slideshow" ];
importArticles({type: 'script',articles:['u:dev:MediaWiki:LinkPreview/code.js']});