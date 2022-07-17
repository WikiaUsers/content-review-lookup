/* Any JavaScript here will be loaded for all users on every page load. */

//UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: {link:'Project:Staff', title:'This user is a bureaucrat.' },
		inactive: {u: 'Has not edited recently' },
		Founder: {u: 'Founder', order:-1},
		'Awesome Penguin': {u: 'Awesome Penguin', order:-2}
	}
};

UserTagsJS.modules.custom = {
	'TaNk8k': ['Founder', 'Awesome Penguin']
};

//LinkPreview
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);

window.pPreview.defimage = 'https://static.wikia.nocookie.net/rocketbotroyale/images/f/f8/Loading_image.gif';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/rocketbotroyale/images/a/af/Image_not_found.jpg';
window.pPreview.tlen = 500;