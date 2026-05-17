/* Any JavaScript here will be loaded for all users on every page load. */
// Template:Tabs
$(function() {
	// If a sub-tab is 'selected', also make the parent tabs also 'selected'
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabs
		var $TabsHeight = $(this).height();

		// Increase bottom margin of main tabs
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// END of Template:Tabs
// tooltip thing
window.tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: false,
};
// end of tooltip thing

//* UserTags *//
window.UserTagsJS = {
	modules: {},
	tags: {
		/* group: { associated tag data } */
		// staff ranks
		'head-of-wiki': {u:'Head of Wiki', order:-1},
		'founder': {u:'Founder', order:-1},
		'bureaucrat': {u:'Bureaucrat', order:1},
		'administrator': {u:'Administrator', order:1},
		'dual-moderator': {u:'Dual Moderator', order:2},
		'threadmoderator': {u:'Discussions Moderator', order:2},
		'content-moderator': {u:'Content Moderator', order:2},
		// non-staff tags
		'wiki-contributor': {u:'Wiki Contributor', order:9e9},
		'retired-staff': {u:'Former Wiki Staff', order:9e9},
		'ron-hos': {u:'RON Head of Staff', order:9e9},
		'ron-senior-administrator': {u:'RON Senior Administrator', order:9e9},
	}
};

UserTagsJS.modules.implode = {
	// Merge sysop/mod ranks into a single tag
	'administrator': ['sysop'],
	'dual-moderator': ['content-moderator', 'threadmoderator'],
};

UserTagsJS.modules.metafilter = {
	// Hide redundant lower ranks when a higher rank is present
	'administrator':     ['bureaucrat'],
	'sysop':             ['bureaucrat', 'ron-hos'],
	'content-moderator': ['administrator', 'dual-moderator'],
	'threadmoderator':   ['administrator', 'dual-moderator'],
	'dual-moderator':    ['administrator'],
};

UserTagsJS.modules.custom = {
	/* 'user': [groups] */
	// Current Staff
	
	// Bureaucrats
	'SuperGlitchyTheo': ['head-of-wiki','bureaucrat'],
	'3meraldKv': ['founder'],
	'Standoffiish': ['bureaucrat'],
	// Administrators
	'Dxrknrg': ['administrator','wiki-contributor'],
	'Antiverta': ['administrator','wiki-contributor'],
	
	// Dual Moderators

	// Content Moderators
	'Mysþıc': ['content-moderator','wiki-contributor'],
	'Sorayaann': ['content-moderator','wiki-contributor'],
	// Junior Content Moderators

	// Discussions Moderators
	'YugoMafia': ['threadmoderator'],
	'Kaiyie': ['threadmoderator'],
	'The Shashophille': ['threadmoderator'],
	'RXRunner27': ['threadmoderator'],
	// Junior Discussion Moderators

	// Retired Wiki Staff
	// Retired Bureaucrats
	'RabbyDevs': ['retired-staff'],
	'Aurawra': ['retired-staff'],
	'TheRichSeries': ['retired-staff'],
	'ZackRoN00': ['retired-staff'],
	'MP1Player': ['retired-staff'],
	'HolyMoa': ['retired-staff'],
	
	// Retired Administrators
	'GrayshaValor': ['retired-staff'],
	'Man with no name or life': ['retired-staff'],
	'RedElephantKing': ['retired-staff'],
	'Arrokotth': ['retired-staff'],
	'Vector Sigma': ['retired-staff'],
	'Zidium': ['retired-staff'],
	'OfficialKhrome': ['retired-staff'],
	'DefoNotSyki': ['retired-staff'],
	'LollipopWut': ['retired-staff'],
	
	// Retired Dual Moderators
	'Awsomemysticcheese': ['retired-staff'],
	'YesIHaveAnAccount': ['retired-staff'],
	'Alvin': ['retired-staff'],
	'Polloloko0o': ['retired-staff'],
	
	// Retired Content Moderators
	'Bazyli123': ['retired-staff'],
	'PenguinTech': ['retired-staff'],
	'Eddy0725': ['retired-staff'],
	'Nikograd': ['retired-staff'],
	'Jjc0308': ['retired-staff'],
	'Piteous': ['retired-staff'],
	'CrusaderRosehip': ['retired-staff'],
	'Pancake1824': ['retired-staff'],
	'imnotacan': ['retired-staff'],
	'JHRacer': ['retired-staff'],
	'NoobINFe': ['retired-staff'],
	'S9 Closing Logo WikiReturnss': ['retired-staff'],
	'TheSeal27': ['retired-staff'],
	'Mylan389': ['retired-staff'],
	'The Ukulele Man': ['retired-staff'],
	'Alan Builder': ['retired-staff'],
	'Kaisergluck': ['retired-staff'],
	'Therealusman': ['retired-staff'],
	'DragooNit': ['retired-staff'],
	'Silkened': ['retired-staff'],
	
	// Retired Discussions Moderators
	'CreeperSPG': ['retired-staff'],
	'CrunchMCMunch': ['retired-staff'],
	'Feepemaster': ['retired-staff'],
	'Adogeeats25': ['retired-staff'],
	'Nexandr': ['retired-staff'],
	'Hisslandia': ['retired-staff'],
	
	// RON Senior Staff
	'FamicomBruv': ['ron-senior-administrator','retired-staff'],
	
	// Wiki Contributors
	'Cipherusxzy': ['wiki-contributor'],
	'HaHaBlah': ['wiki-contributor'],
	'RyeThePies': ['wiki-contributor'],
	'Thethingiforgor': ['wiki-contributor'],
	'Pro10boy2228': ['wiki-contributor'],
	'FourCer5': ['wiki-contributor'],
};

//* LockOldComments.js Configuration *//
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

//* Modifier Searcher *//
mw.hook('wikipage.content').add(function() {
  if ($('#modifier-search-container').length === 0) return;
  $('#modifier-search-container').css({'width': '100%'});
  var modifiers = ['Tax Income', 'Manpower Increase', 'Base Stability', 'Stability Gain', 'Political Power Gain', 'War Exhaustion Gain', 'Building Speed','City Resistance', 'Base Research', 'Research Power Gain', 'Infantry Attack Against Tanks', 'Military Power Gain'];
  $('#modifier-search-container').html(
    '<div style="position:relative;width:100%;box-sizing:border-box;">' +
      '<input id="modifier-search" type="text" placeholder="Search modifier..." style="width:100%;padding:8px 12px;font-size:14px;box-sizing:border-box;display:block;" />' +
      '<div id="modifier-suggestions" style="position:absolute;top:100%;left:0;right:0;background:#1a1a1b;border:1px solid #3a3a3b;z-index:9999;display:none;box-sizing:border-box;"></div>' +
    '</div>' +
    '<div id="modifier-results"></div>'
  );
  $('#modifier-search').on('input', function() {
    var query = $(this).val().toLowerCase();
    $('#modifier-suggestions').hide().empty();
    $('#modifier-results').empty();
    if (query.length < 1) return;
    var hits = modifiers.filter(function(m) {
      return m.toLowerCase().includes(query);
    });
    if (hits.length === 0) return;
    hits.forEach(function(hit) {
      $('<div>')
        .text(hit)
        .css({padding:'9px 12px', cursor:'pointer', color:'#ccc', fontSize:'13px', borderBottom:'1px solid #2a2a2b'})
        .hover(function(){ $(this).css('background','#2a2a2b'); },
               function(){ $(this).css('background','none'); })
        .on('click', function() {
          $('#modifier-search').val(hit);
          $('#modifier-suggestions').hide().empty();
          $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Modifier/' + hit,
            prop: 'text',
            format: 'json'
          }, function(data) {
            $('#modifier-results').html(data.parse.text['*']);
            mw.loader.using('jquery.makeCollapsible').done(function() {
              $('#modifier-results .mw-collapsible').makeCollapsible();
            });
          });
        })
        .appendTo('#modifier-suggestions');
    });
    $('#modifier-suggestions').show();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#modifier-search-container').length) {
      $('#modifier-suggestions').hide();
    }
  });
});