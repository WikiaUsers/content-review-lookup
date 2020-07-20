// User-tags changes
window.UserTagsJS = {
	modules: { 
                mwGroups: ['burocrata', 'patrulheiro', 'rollback'],
                metafilter: {	
                       sysop: ['burocrata'],
                       chatmoderator: ['rollback'],
                }
        },
	tags: {
                rollback: { u:'Patrulheiro' }
        }
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});