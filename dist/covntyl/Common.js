window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);
window.pPreview.defimage = 'https://static.wikia.nocookie.net/covntyl/images/3/31/Soleil_Umbreon.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/covntyl/images/3/31/Soleil_Umbreon.png';