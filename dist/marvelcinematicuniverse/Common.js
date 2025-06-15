importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('PreloadFileDescription/code.js', 'dev');
/* Spoiler Alert */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

// 1. DiscussionTemplates configuration option
window.DiscussionTemplates = {
    templates: {
        '3RR': {
            name: 'Template:3RR',
            title: 'Three-Revert Rule'
        },
        'ImageHelp': {
            name: 'Template:ImageHelp',
            title: 'ImageHelp'
        },
        'MoveWarning': {
        	name: 'Template:MoveWarning',
        	title: 'MoveWarning'
        },
        'New-Images': {
        	name: 'Template:New Images',
        	title: 'New Images'
        },
        'Visual': {
        	name: 'Template:Visual',
        	title: 'Visual'
        },
        'W': {
        	name: 'W',
        	title: 'W'
        },
        'Welcome': {
        	name: 'Welcome',
        	title: 'Welcome'
        },
        'Warning1': {
        	name: 'Warning1',
        	title: 'Warning1'
        },
        'Warning2': {
        	name: 'Warning2',
        	title: 'Warning2'
        },
        'Warning3': {
        	name: 'Warning3',
        	title: 'Warning3'
        },
        'WarningCategory': {
        	name: 'WarningCategory',
        	title: 'Category Warning',
        },
        'WarningTalk': {
            name: 'Template:WarningTalk',
            title: 'Talk Warning'
        }
    },
    allowedGroups: ['sysop', 'content-moderator']
};

// 2. DiscussionTemplates import statement
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:DiscussionTemplates.js'
		]
});

// Configuration for Pathway application form
window.adoptInternational = {
    unsupportedLanguages: window.communityRequestsUnsupportedLangs,
    adoptionConfig: {
        blockDays: 0,
        activeDays: 30,
        permissionTypes: [
            'bureaucrat',
            'sysop',
            'content-mod',
            'thread-mod'
        ],
    },
    pageConfig: {
        namespace: 'Pathway application',
        namespaceId: 118,
        adoptionsPage: 'Pathway:Applications'
    },
    wikitextSchema: "{{bStart}}Pathway application\n" +
    "|1-Wiki User       = {{userName}}\n" +
    "|2-Discord User    = {{{DiscordURL}}}\n" +
    "|3-Rights type     = {{permissionsType}}\n" +
    "|4-Block history   = {{blockDays}}\n" +
    "|5-User activity   = {{activeDays}}\n" +
    "|6-Your motivation = <nowiki>{{comments}}</nowiki>\n" +
    "{{bEnd}}"
};

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
        'threadmoderator',
        'content-moderator',
        'rollback'
    ]
};

// PreloadFileDescription
PFD_templates = '{{Image\n| media = \n| source = \n| artist = \n| note = \n| type = \n}}';

// Transcluding Talk Page Template
$(function () {
  let msSet = 500;
  const firstLine = $('.cm-line').first();
  if (!firstLine.length) {
    msSet = 1200;
  }

  setTimeout(() => {
    const isTalkPage = $('body').hasClass('ns-talk');
    const isEditAction = window.location.search.includes('action=edit');
    let firstLine = $('.cm-line').first();
    if (!firstLine.length) {
       firstLine = $('.ve-ce-branchNode-slug').first();
    }

    const isOnlyBr = firstLine.length &&
                     firstLine.children().length === 1 &&
                     (firstLine.children().is('br') || firstLine.children().is('img')) &&
                     firstLine.text().trim() === '';

    if (isTalkPage && isEditAction && isOnlyBr) {
      const url = new URL(window.location.href);
      if (!url.searchParams.has('preload')) {
        url.searchParams.append('preload', 'Template:TalkTransclude');
        window.location.href = url.toString();
      }
    }
  }, msSet);
});