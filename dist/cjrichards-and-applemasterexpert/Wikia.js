

/* Any JavaScript here will be loaded for all users on every page load. */

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 14,
	edits: 30,
};
/*Color for user tags*/
UserTagsJS.modules.mwGroups = ['bureaucrat'];
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'AK_World': 'Bureaucrat • Administrator',
        'JoJoMKWUTeam': 'Administrator',
        'IloGaming4': 'Administrator',
        'Ejeleina': 'Administrator',
    }
};
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
window.ArticleRating = {
    title: 'Rate This Article',
    values: ['Terrible', 'Bad', 'Average', 'Good', 'Great'],
    starSize: [24, 24],
    starColor: ['#ccc', '#ffba01'],
    starStroke: '#000',
    location: 'top-rail',
}