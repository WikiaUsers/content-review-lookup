/**================================================================================
 *    Changing styling for 1st, 2nd, 3rd, 4th and more to sup tag automatically
 *                                  @Author : Zarenth
 * ================================================================================*/
$(document).ready(function() {
    $('table').each(function() {
        $(this).find('td').each(function() {
            var cellText = $(this).html();
            cellText = cellText.replace(/(\d+)(st|nd|rd|th)/g, function(match, p1, p2) {
                return p1 + "<sup>" + p2 + "</sup>";
            });
            $(this).html(cellText);
        });
    });
});
/**================================================================================
 *                 Display None For Reference Headline Without Ref
 *                                  @Author : Zarenth
 * ================================================================================*/
// function hideReferenceHeadline() {
//     var referenceHeadline = document.getElementById('reference-headline');
//     var nextElement = referenceHeadline.nextElementSibling;

//     if (nextElement && nextElement.classList.contains('ScrollBox') && !nextElement.querySelector('.mw-references-wrap')) {
//         referenceHeadline.style.display = 'none';
//     }
// }
// hideReferenceHeadline();
/**================================================================================
 *                        Move Indicator next to edit button
 *         Copied from https://starwars.fandom.com/wiki/MediaWiki:Common.js
 * ================================================================================*/
function indicatorBesideEdit() {
    if ( $( '#article-indicator' ).length && $( '.page-header__actions' ).length ) {
      $( '.page-header__actions' ).first().prepend( $( '#article-indicator' ).show() );
    }
}
indicatorBesideEdit();
/**================================================================================
 *                   Default Fairuse License When Uploading File
 *                                @Author : Zarenth
 * ================================================================================*/
$(document).on("submit", function (e) {
  if (e.target.id == "mw-upload-form") {
    $(e.target)
      .find('[name="wpLicense"] [value=""]:not([disabled])')
      .attr("value", "Fairuse");
  }
});
/**================================================================================
 *                             Link Preview Configuration.
 *                      https://dev.fandom.com/wiki/LinkPreview
 * ================================================================================*/
// window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
// window.pPreview.dock = '#mw-content-text';
// window.pPreview.RegExp.noinclude = ['.nolinkpreview', '#toc', '.mw-headline', '.reference', '.mw-references-wrap', 'li', 'pre', '.mbox'];
/**================================================================================
 *                         No License Warning Configuration
 *                   https://dev.fandom.com/wiki/NoLicenseWarning
 * ================================================================================*/
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
    	'bureaucrat',
        'sysop',
        'content-moderator',
        'bot',
        'rollback'
    ]
};
/**================================================================================
 *                       Auto Create User Pages Configuration 
 *                  https://dev.fandom.com/wiki/AutoCreateUserPages
 * ================================================================================*/
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{'+'{subst:AutoCreateUserPages}}',
        3: '{{AutoCreateUserPages}}',
    },
    summary: 'GSH Wiki: Auto Creating User Page',
    notify: '<a href="/wiki/User:$2">Welcome to Great Sage of Humanity Wiki. Here is a link to your userpage, $1!</a>'
};
/**================================================================================
 *                            User Tags Configuration
 *                      https://dev.fandom.com/wiki/UserTags
 * ================================================================================*/
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: {u:'Bureaucrat', link:'Project:Bureaucrats' },
		'former-bureaucrat': {u: 'Former Bureaucrat'},
		sysop: {u:'Administrator', link:'Project:Administrators' },
		'former-sysop': {u:'Former Administrator' },
		'mini-sysop': { u: 'Half Administrator', },
		'wiki-moderator': { u: 'Wiki Moderator' },
		inactive: { u: 'Inactive User' }
	},
};
// Force grouping B to person A
UserTagsJS.modules.custom = {
	'Livy Caldwell': ['founder','former-bureaucrat','inactive'],
	'ZarenthGuardian': ['inactive'],
	'CreateForDie': ['inactive']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 10,
	edits: 20,
	namespace: [0, 'File', 'Template', 'MediaWiki', 'Module']
};
UserTagsJS.modules.inactive = 20;
// Add bureaucrat group to bureaucrats
UserTagsJS.modules.mwGroups = ['bureaucrat'];
// remove A if they is a B
UserTagsJS.modules.metafilter = {
	'wiki-moderator': ['mini-sysop']
};
// Never Run B module on person A
UserTagsJS.modules.userfilter = {
	'Zarenth': ['inactive']
};
// If they are all B, replace with A
UserTagsJS.modules.implode = {
	'mini-sysop': ['content-moderator', 'rollback', 'threadmoderator']
};
// If they are all B, replace with A
UserTagsJS.modules.explode = {
	'wiki-moderator': ['content-moderator', 'rollback']
};

/**================================================================================
 *                           Disable Rollback Plugin Script
 *                        https://dev.fandom.com/wiki/Rollback
 * ================================================================================*/
window.RollbackWikiDisable = true;
/**================================================================================
 *                                      Imports
 * ================================================================================*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ImportJSPage/code.js',
        'u:dev:MediaWiki:UserTags/code.js',
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
    	// 'u:dev:MediaWiki:LinkPreview/code.js',
        'u:dev:MediaWiki:QuickDiff/code.js',
        'u:dev:MediaWiki:NoLicenseWarning.js',
        'u:dev:MediaWiki:AutoCreateUserPages.js',
        'u:dev:MediaWiki:PreloadTemplates.js',
    ]
});
/* Import for only logged in user*/
mw.loader.using("mediawiki.user").then(function(){
   if (!mw.user.isAnon())
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:CopyTitle.js',
        ]
    });
});
/**================================================================================
 *                                Auto Sorting Table
 * ================================================================================*/
$(document).on('readystatechange', function() {
  if (document.readyState === "complete") {
    $("table.sortable[data-autosort]").each(function() {
      var columnIndex = $(this).attr("data-autosort") - 1;
      $("th", this).eq(columnIndex).trigger("click");
    });
  }
});
/**================================================================================
 *                         Preload Templates Customization
 * ================================================================================*/
$(function () {
    let tries = 0, max = 20;
    let check = setInterval(() => {
        let $label = $('#preload-templates > span');
        if ($label.length) {
            clearInterval(check);
            $label.html('Preload Template (<strong>BEFORE SELECT PRELOAD TEMPLATE PLEASE USE SOURCE EDITOR AT TOP RIGHT</strong>)');
        } else if (++tries >= max) {
            clearInterval(check);
            console.warn('[PreloadTemplates override] Label not found.');
        }
    }, 500);
});