window.SpoilerAlert = {
    question: 'This page contains content that is NSFW (Not Safe For Work) and may not be suitable for all audiences. Do you wish to continue to view this page?',
    yes: 'Yes, I do',
    no: 'No, I do not',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('NSFW');
    }
};