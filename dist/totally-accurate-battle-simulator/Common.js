window.UserTagsJS = {
	modules: {},
	tags: {
	headbureaucrat: { u: 'Head Bureucrat' }
		security: { u: 'Wiki Security' }
		topuser: { u: 'Top User' }
		founder: { u: 'Wiki Founder' }
		vetran: { u: 'Vetran User' }
		owner: { u: 'Wiki Owner' }
		tech: { u: 'Technician' }
	}
};
 
UserTagsJS.modules.custom = {
    'PvZGwchampion': ['headbureaucrat, security, tech, topuser']
    'Lieutenant Jozev, 1st Air Hussars Squadron, Hettic Royal Flying Service': ['founder']
    'Mister Kad': ['owner, vetran']
    'ShadowLeviathanKing': ['security']
    'Im somebody': ['vetran']
    'Fireboyy44': ['vetran, security']
    'Jimmy2004Backup': ['tech']

};
 
UserTagsJS.modules.metafilter = False
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator'];

 
window.MessageWallUserTags = {
    tagColor: 'Lightgreen',
    txtSize: '10px',
    glow: false,
    glowSize: '5px',
    glowColor: '#C51111',
    users: {
    'PvZGwchampion': 'Head Bureaucrat'
    }
};
 
/* Any JavaScript here will be loaded for all users on every page load. */

// Custom user tag names
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback'];
window.UserTagsJS = {
	modules: {},
	tags: {
		blocked: { u:'Defeated By Blue Team', order:-1/0 },
		sysop: { u: 'Admin' },
		threadmoderator: { u: 'Discussions Moderator' }
	}
};

// No license warning config
window.NoLicenseWarning = {
    forceLicense: true
};

// Prevents existing tags from being hidden
// https://dev.fandom.com/wiki/ProfileTags
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

window.MessageWallUserTags = {
    tagColor: '#F2D02B',
    txtSize: '10px',
    glow: false,
    glowSize: '5px',
    glowColor: '#C51111',
    users: {
        'Mister Kad': 'Founder',
        
    }
};
// These functions add the polls to their elements on the main page so you can take the poll and view results.
$(function() {$('#ColorPollContainer').html('<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSefQzLCgniTs_pVQJ6HkYdncYVD4gdL_gklHdB2rmmmFJ-QKw/viewform?embedded=true" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>');});
$(function() {$('#ColorPollResultsContainer').html('<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRAenbVxZ6MToIEeAPGwXREYikcAgqC23fbycZA7LIhZtMleaw30R8pYRudxCOnLMPLSTfaYaP-05nC/pubhtml?widget=true&amp;headers=false" width="100%" height="500px"></iframe>');});

document.addEventListener("DOMContentLoaded", function () {
    // Observe for changes in the <body> class
    const body = document.body;
    const observer = new MutationObserver(() => {
        if (body.classList.contains('is-content-expanded')) {
            // Apply background change when expanded
            const header = document.querySelector('.resizable-container > div:first-child');
            if (header) {
                header.style.backgroundImage = "url('https://static.wikia.nocookie.net/totally-accurate-battle-simulator/images/8/82/TABS_Header.png')";
            }
        }
    });

    // Start observing the <body> element for class changes
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
});