/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
/* Lock Blog Script */
window.LockOldBlogs = {
    expiryDays: 500,
    expiryMessage: "Este blog é considerado arquivado devido por não ser comentado em mais de <expiryDays> dias. Se você está procurando um lugar para discutir, por favor, olhe através de nossas últimas postagens, o link pode ser encontrado na página principal onde os links dos blogs também estão localizados.",
    nonexpiryCategory: "Open Blogs"
};

if ($('.page-User_Nomedealguém').length !== 0) {
 $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://images.wikia.nocookie.net/fairytail/images/6/65/Jellal_Zeref%27s_Awakening_Full_size.jpg" width="300"></div>');
}
 
// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Clique aqui para limpar o cache'
};

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].

$(function FairUseRationale() {
  if ((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
    document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
  }
});
// ****** END: JavaScript for [[Special:Upload]] ******

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
  $(function() {
    var $tabs = $("#portal_slider").tabs({
      fx: {
        opacity: 'toggle',
        duration: 100
      }
    });
    $("[class^=portal_sliderlink]").click(function() { // bind click event to link
      $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
      return false;
    });
    $('#portal_next').click(function() {
      $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
      return false;
    });
    $('#portal_prev').click(function() { // bind click event to link
      $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
      return false;
    });
  });
});

/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
  if (typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
  $("span.insertusername").html(wgUserName);
});
/* End of the {{Visitor}} replacement */

/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceAfter: ''
};
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: { u:'Burocrata' },
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Burocrata', order:1 },
	},
	oasisPlaceAfter: '> h1'
};	
UserTagsJS.modules.custom = {
	'DannielaServer': ['a']
};
UserTagsJS.modules.custom = {
	'MagnoCosmos': ['a']
};

// Importar conteúdo
importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/displayTimer.js',      // Add UTC clock above articles

        'u:DannielaServer:MediaWiki:Countdown.js',  // Countdown.js
        
        'u:dev:AjaxRC/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:ReferencePopups/code.js',
		'u:dev:SignatureCheck/code.js',
        'u:dev:ShowHide/code.js',                   // Collapsible
        'u:dev:Toggler.js',
        'u:dev:UserTags/code.js',
        'u:dev:YoutubePlayer/code.js' // YoutubePlayer
    ]
});