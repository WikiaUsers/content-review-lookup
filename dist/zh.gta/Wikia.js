// User-tags changes
window.UserTagsJS = {
	modules: { 
                mwGroups: ['bureaucrat', 'patroller', 'rollback'],
                metafilter: {	
                       sysop: ['bureaucrat'],
                       chatmoderator: ['rollback'],
                }
        },
	tags: {
                rollback: { u:'Patroller' }
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
    .load('/index.php?title=Template:RandomModule&action=render');
});