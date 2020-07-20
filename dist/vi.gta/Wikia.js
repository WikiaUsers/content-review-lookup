// User-tags changes
window.UserTagsJS = {
	modules: { 
                mwGroups: ['bureaucrat', 'canhsat', 'rollback'],
                metafilter: {	
                       sysop: ['bureaucrat'],
                       chatmoderator: ['rollback'],
                }
        },
	tags: {
                rollback: { u:'Cảnh sát' }
        }
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});

//Special side boxes

$(function(){
    $('<section class="RandomModule module"></section>')
    .appendTo('#WikiaRail')
    .load('/vi/index.php?title=Template:RandomModule&action=render');
});