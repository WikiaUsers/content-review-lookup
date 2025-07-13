/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});
/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if ( window.mwCustomEditButtons ) {
  mwCustomEditButtons.push( {
     "imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png",
     "speedTip": "Quote",
     "tagOpen": "{{Quote|",
     "tagClose": "|}}",
     "sampleText": ""} );
     
  mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Character",
     "tagOpen": "{{Char temp\r|image1 = \r|title1 = \r|chinese = \r|pinyin = \r|aliases = \r\r|vital_status = \r|killed_by = \r|cause_of_death = \r|age = \r|gender = \r|species = \r|hair_color = \r|eye_color = \r|height = \r|weight = \r|body = \r|bloodline = \r\r|spouse(s) = \r|relatives = \r|friend(s) = \r|enemie(s) = \r|allies = \r|pets = \r|disciple(s) = \r|master(s) = \r\r|occupation(s) = \r|affiliation(s)  = \r|sect(s)  = \r\r|universe = \r|realm = \r|planet = \r|contient = \r|empire = \r|country =  \r|region = \r|village = \r\r|cultivation_base = \r|fleshly_body = \r|battle_prowess = \r|soul =\r\r|book = \r|novel = \r|manhua = \r",
     "tagClose": "}}",
     "sampleText": ""} );
     
      mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Chapter",
     "tagOpen": "{{Chapters\r|title1 = \r|link = \r|book = \r|chapter = \r|posted_on = \r|translator = \r|pc = \r|nc  = \r",
     "tagClose": "}}",
     "sampleText": ""} );
     
}

if (mw.config.get('wgPageName') === 'User:Godof.FlameWater' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}

window.UserTagsJS = {
    modules: {},
    tags: {
        founder: { u: 'Founder', order: 1 },
        bureaucrat: { u: 'God', order: 2 },
        'former-bureaucrat': { u: 'Retired Bureaucrat', order: 3 },
        sysop: { u: 'Saint', order: 4 },
        'former-sysop': { u: 'Retired Administrator', order: 5 },
        'bot-global': { u: 'Global Bot', order: 6 },
        bot: { u: 'Bot', order: 7 },
        'content-moderator': { u: 'Law Domain', order: 10 },
        threadmoderator: { u: 'Nascent Source', order: 11 },
        rollback: { u: 'Rollback', order: 13 },
        bannedfromchat: { u: 'Banned from Chat', order: 20 },
        inactive: { u: 'Inactive', order: Infinity } 
    }
};

// Inactive users module (using UserTagsJS)
UserTagsJS.modules.inactive = {
    days: 30, 
    text: 'Inactive', 
    warning: {
        text: 'This user has been inactive for %s days.', 
        days: 7 
    }
};

// Autoconfirmed users module
UserTagsJS.modules.autoconfirmed = true;

// New user module
UserTagsJS.modules.newuser = {
    computation: function(days, edits) {
        // Users are considered "new" if they have less than 5 days AND less than 20 edits
        return days < 5 && edits < 20;
    }
};

// MediaWiki groups to include
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bot',
    'bot-global',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'bannedfromchat'
];