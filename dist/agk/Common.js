// UserTags settings
window.UserTagsJS = {
    modules: {},
    tags: {
        //technician: { u:'technician', title:'Maintainers of the back-end templates, javascript and stylesheets of this wiki.' },
        patroller: { u:'patroller' },
        notautoconfirmed: { u:'new user' },
        assistant: { u:'assistant'}
    }
};
UserTagsJS.modules.custom = {
   //'KurwaAntics': ['technician'],
   'UsefulAGKHelper': ['patroller'],
   //'GiveMeCovfefe': ['assistant']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.userfilter = {
    'MaZano': ['bureaucrat'],
    'Rcmero': ['bureaucrat'],
    'Thedrapocalypse': ['bureaucrat']
};

// Spoiler alert
SpoilerAlert = {
    categories: 'Spoilers',
};

// SocialBlade Widget
$('.SocialBladeWidget').each(function() {
    var sbname = $(this).data("name");
    $(this).html('<iframe class="sbframe" src="https://widget.socialblade.com/widget.php?v=2&u=' +sbname+ '" scrolling="no" frameBorder="0"></iframe>').show();
});

// Tell users to write summaries in the Visual Editor
if( window.location.href.indexOf('veaction=edit') >= 0 ) {
    $('body').prepend('<div class="ve-edit-summary-alert">'+
    'Hello editor! We would like you to add an edit summary before publishing every edit. Briefly describe what you changed to this article. Thank you!</div>');
}

// Remove all comments from Cansin's page
$('.page-Cansin13 #WikiaArticleComments, .page-Cansin13 .wds-button[href=#WikiaArticleComments]').remove(); // Stop ranting on Cansin. Just leave him alone.

// Standard edit summary
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
};

ItemsToAdd = [
  {
    'Name': 'Unpopular characters',
    'Page': 'Category:Characters that lack popularity',
    'Description': 'These characters are not popular in the Angry German Kid universe. To confirm that your character may be popular, link sources and videos in the page itself.',
  },
  {
    'Name': 'Messy articles',
    'Page': 'Category:Articles requiring cleanup',
    'Description': 'These articles are not following our quality standards, thus they need to be changed to follow our Manual of Style.'
  },
];
AffectsSidebar = true;
window.needsLicense = true;
WallGreetingButtonProtect = true;