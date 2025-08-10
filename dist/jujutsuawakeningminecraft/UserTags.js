window.UserTagsJS = {
    modules: {},
    tags: {
        myCustomTag: {
            u: '{{#tag:image|File:VerifiedCheck.png|size=20x20}} Verified'
        }
    }
};

UserTagsJS.modules.custom = {
    'Rip Josh1': ['myCustomTag']
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});