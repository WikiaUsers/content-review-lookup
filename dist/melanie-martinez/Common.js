importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
//Explicit alert config
SpoilerAlert = {
    question: 'This page is for a song that is explicit, meaning that the lyrics may not be appropriate for—and may even be offensive to—younger readers.<br />Do you wish to proceed anyway?',
    yes: 'Yes',
    no: 'No',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Explicit');
    }
};
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});
window.railWAM = {
    logPage:"Project:WAM Log"
};
//page/link previews
window.pPreview=window.pPreview||{};
window.pPreview.RegExp=window.pPreview.RegExp||{};
window.pPreview.RegExp.iclasses = ['image'];
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */