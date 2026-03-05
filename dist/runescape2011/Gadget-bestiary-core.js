//<nowiki>
    'use strict';
var queryDefaults = {
    members: 'any',
    style: 'any',
    weakness: 'any',
    restriction: 'surface',
    other: 'none',
    level_min: 0,
    level_max: 100000,
    level_min_enabled: false,
    level_max_enabled: false,
    extended: 'standard',
    page: 0
},
queryMap = {
	members: [ 'any', 'yes', 'no' ],
	restriction: [ 'any', 'surface', 'dg', 'quest', 'minigame' ],
	other: [ 'none', 'slayer', 'poisonous', 'aggressive', 'stun', 'poison', 'deflect', 'drain' ],
	style: [ 'any', 'melee', 'magic', 'ranged', 'dragonfire', 'typeless' ],
	weakness: [ 'any', 'none', 'melee', 'stab', 'slash', 'crush', 'magic', 'air', 'water', 'earth', 'fire', 'ranged', 'arrows', 'bolts', 'thrown' ],
	extended: [ 'standard', 'extended' ]
},
currentQuery,
api = new mw.Api(),
$selector, $messages, $results,
loadingGif;

var form, fieldset, membersSelect, weaknessSelect, styleSelect, restrictionSelect, otherDropdown, levelMinCheck, levelMaxCheck, levelMinSelect, levelMaxSelect, extendedSelect, submitButton, resetButton, toggleAdvButton, copyPermalinkButton, pageButtons, pageFirstButton, pagePrevButton, pageNextButton, resultsLabel;

var offset=0, limit=500, currentPage=0, maxResThisPage=500, morePages=false;

function makeShortLink(q) {
	var link = new mw.Uri(mw.util.getUrl('Bestiary')), query = [];
	query.push('s');
	query.push(Math.max(0,queryMap.style.indexOf(q.style)));
	query.push('w');
	query.push(Math.max(0,queryMap.weakness.indexOf(q.weakness)));
	query.push('m');
	query.push(Math.max(0,queryMap.members.indexOf(q.members)));
	query.push('r');
	query.push(Math.max(0,queryMap.restriction.indexOf(q.restriction)));
	query.push('o');
	query.push(Math.max(0,queryMap.other.indexOf(q.other)));
	query.push('d');
	query.push(Math.max(0,queryMap.extended.indexOf(q.extended)));
	if (q.level_min_enabled) {
		query.push('l');
		query.push(q.level_min);
	}
	if (q.level_max_enabled) {
		query.push('u');
		query.push(q.level_max);
	}
	link.query = { l: query.join('') };
	return link.toString();
}

function makeForm(params) {
	currentQuery = params;
    //membership
    membersSelect = new OO.ui.ButtonSelectWidget({
        items: [
            new OO.ui.ButtonOptionWidget({ data: 'any', label: 'Any' }),
            new OO.ui.ButtonOptionWidget({ data: 'yes', label: 'Members\' only' }),
            new OO.ui.ButtonOptionWidget({ data: 'no', label: 'Free-to-play only' }),
        ],
        align: 'left',
		classes: [ 'flexbox' ]
    });
    membersSelect.selectItemByData(params.members);

    //tradeable
    weaknessSelect = new OO.ui.ButtonSelectWidget({
        items: [
            new OO.ui.ButtonOptionWidget({ data: 'any', label: 'Any', title: 'Any weakness', classes: [ 'weakness-row-all' ] }),
            new OO.ui.ButtonOptionWidget({ data: 'none', label: 'No weakness', classes: ['endRight', 'weakness-row-all'] }),
            new OO.ui.ButtonOptionWidget({ data: 'melee', label: 'General melee', title: 'Monsters for which the melee affinity is the highest (may not be the same class as the specific weakness)', classes: ['lbBeforeHere', 'endLeft', 'afterBr', 'weakness-row-melee' ]}),
            new OO.ui.ButtonOptionWidget({ data: 'stab', label: 'Stab', classes: ['afterBr', 'weakness-row-melee'] }),
            new OO.ui.ButtonOptionWidget({ data: 'slash', label: 'Slash', classes: ['afterBr', 'weakness-row-melee'] }),
            new OO.ui.ButtonOptionWidget({ data: 'crush', label: 'Crush', classes: ['afterBr', 'endRight', 'weakness-row-melee'] }),
            new OO.ui.ButtonOptionWidget({ data: 'magic', label: 'General magic', title: 'Monsters for which the magic affinity is the highest (may not be the same class as the specific weakness)', classes: ['lbBeforeHere', 'endLeft', 'afterBr', 'weakness-row-magic'] }),
            new OO.ui.ButtonOptionWidget({ data: 'air', label: 'Air', classes: ['afterBr', 'weakness-row-magic'] }),
            new OO.ui.ButtonOptionWidget({ data: 'water', label: 'Water', classes: ['afterBr', 'weakness-row-magic'] }),
            new OO.ui.ButtonOptionWidget({ data: 'earth', label: 'Earth', classes: ['afterBr', 'weakness-row-magic'] }),
            new OO.ui.ButtonOptionWidget({ data: 'fire', label: 'Fire', classes: ['afterBr', 'endRight', 'weakness-row-magic'] }),
            new OO.ui.ButtonOptionWidget({ data: 'ranged', label: 'General ranged', title: 'Monsters for which the ranged affinity is the highest (may not be the same class as the specific weakness)', classes: ['lbBeforeHere', 'endLeft', 'afterBr', 'weakness-row-ranged'] }),
            new OO.ui.ButtonOptionWidget({ data: 'arrows', label: 'Arrows', classes: ['afterBr', 'weakness-row-ranged'] }),
            new OO.ui.ButtonOptionWidget({ data: 'bolts', label: 'Bolts', classes: ['afterBr', 'weakness-row-ranged'] }),
            new OO.ui.ButtonOptionWidget({ data: 'thrown', label: 'Thrown', classes: ['afterBr', 'endRight', 'weakness-row-ranged'] }),
        ],
        align: 'left',
        classes: ['weakness-select']
    });
    weaknessSelect.selectItemByData(params.weakness);


    //class
    styleSelect = new OO.ui.ButtonSelectWidget({
        items: [
            new OO.ui.ButtonOptionWidget({ data: 'any', label: 'Any', title: 'Any combat style' }),
            new OO.ui.ButtonOptionWidget({ data: 'melee', label: 'Melee' }),
            new OO.ui.ButtonOptionWidget({ data: 'magic', label: 'Magic' }),
            new OO.ui.ButtonOptionWidget({ data: 'ranged', label: 'Ranged' }),
            new OO.ui.ButtonOptionWidget({ data: 'dragonfire', label: 'Dragonfire' }),
            new OO.ui.ButtonOptionWidget({ data: 'typeless', label: 'Typeless' }),
        ],
        align: 'left',
		classes: [ 'flexbox' ]
    });
    styleSelect.selectItemByData(params.style);

    //TODO
    //restriction
	restrictionSelect = new OO.ui.ButtonSelectWidget({
		items: [
			new OO.ui.ButtonOptionWidget({ data: 'any', label: 'Any', title: 'No location restriction' }),
			new OO.ui.ButtonOptionWidget({ data: 'surface', label: 'Unrestricted only' }),
			new OO.ui.ButtonOptionWidget({ data: 'dg', label: 'Dungeoneering only' }),
			new OO.ui.ButtonOptionWidget({ data: 'quest', label: 'Quests only' }),
			new OO.ui.ButtonOptionWidget({ data: 'minigame', label: 'Minigames only' }),
			],
		classes: [ 'flexbox' ]
	});
	restrictionSelect.selectItemByData(params.restriction);
	
	otherDropdown = new OO.ui.DropdownInputWidget({
		options: [
			{ data: 'none' , label: 'None' },
			{ data: 'slayer' , label: 'Slayer targets' },
			{ data: 'poisonous' , label: 'Is poisonous' },
			{ data: 'aggressive' , label: 'Is aggressive' },
			{ data: 'stun' , label: 'Can be stunned' },
			{ data: 'poison' , label: 'Can be poisoned' },
			{ data: 'deflect' , label: 'Can take deflection damage' },
			{ data: 'drain' , label: 'Can have levels drained' }
		],
		value: params.other,
		align: 'left'
	});

	levelMinCheck = new OO.ui.CheckboxInputWidget({
		selected: params.level_min_enabled
	});
	levelMaxCheck = new OO.ui.CheckboxInputWidget({
		selected: params.level_max_enabled
	});
	
	levelMinCheck.on('change', function(){
		levelMinSelect.setDisabled(!levelMinCheck.isSelected());
	});
	levelMaxCheck.on('change', function(){
		levelMaxSelect.setDisabled(!levelMaxCheck.isSelected());
	});
    //tierMin
    levelMinSelect = new OO.ui.NumberInputWidget({
        min: 0,
        max: 100000,
        value: params.level_min,
        align: 'left',
        disabled:  !params.level_min_enabled
    });
    //tierMax
    levelMaxSelect = new OO.ui.NumberInputWidget({
        min: 0,
        max: 100000,
        value: params.level_max,
        align: 'left',
        disabled:  !params.level_max_enabled
    });
    
    
    //extended
    extendedSelect = new OO.ui.ButtonSelectWidget({
        items: [
            new OO.ui.ButtonOptionWidget({ data: 'standard', label: 'Standard' }),
            new OO.ui.ButtonOptionWidget({ data: 'extended', label: 'Extended' }),
        ],
        align: 'left'
    });
    extendedSelect.selectItemByData(params.extended);

    //submit
    submitButton = new OO.ui.ButtonInputWidget({
        label: 'Search',
        flags: ['primary', 'progressive'],
        align: 'left',
        icon: 'search'
    });

    submitButton.on('click', submitForm);

    //reset
    resetButton = new OO.ui.ButtonInputWidget({
        label: 'Reset form',
        title: 'Reset the form to default values',
        align: 'left',
        icon: 'clear'
    });

    resetButton.on('click', function () {
        //don't reset slot
        membersSelect.selectItemByData(queryDefaults.members);
        restrictionSelect.selectItemByData(queryDefaults.restriction);
        otherDropdown.selectItemByData(queryDefaults.other);
        weaknessSelect.selectItemByData(queryDefaults.weakness);
        styleSelect.selectItemByData(queryDefaults.style);
        levelMinSelect.setValue(queryDefaults.level_min);
        levelMaxSelect.setValue(queryDefaults.level_max);
        extendedSelect.selectItemByData(queryDefaults.extended);
		levelMinCheck.setValue(queryDefaults.level_min_enabled);
		levelMaxCheck.setValue(queryDefaults.level_max_enabled);
    });

    //copy link
    copyPermalinkButton = new OO.ui.ButtonInputWidget({
        label: 'Copy short link',
        title: 'Copy a permalink to the current results set to the clipboard. This is a shortened link for easy sharing.',
        align: 'left',
        icon: 'link'
    });

    //clipboard api pls arrive sooner
    copyPermalinkButton.on('click', function () {
        var txt = document.createElement('textarea'), $txt = $(txt);
        $txt.text(makeShortLink(currentQuery)).css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '2em',
            heigh: '2em',
            padding: 0,
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent'
        }).appendTo('body');
        txt.select();
        try {
            document.execCommand('copy');
            mw.notify('Copied short link to the clipboard', {tag: 'bestiaryCopyLink'});
        } catch (err) { }
        $txt.remove();
    });
    
    //pagination
    
    pageFirstButton = new OO.ui.ButtonWidget({
        label: 'First page',
        align: 'left',
        icon: 'first',
        data: -10000,
    });
    pagePrevButton = new OO.ui.ButtonWidget({
        label: 'Previous',
        align: 'left',
        icon: 'previous',
        data: -1,
    });
    pageNextButton = new OO.ui.ButtonWidget({
        label: 'Next',
        align: 'left',
        icon: 'next',
        data: 1,
    });
    
	var onClickPages = function (button) {
		currentQuery.page = Math.max(0, currentQuery.page + button.getData());
		doSearch(currentQuery);
	};
	pageFirstButton.on('click', function(){ onClickPages(pageFirstButton)});
	pagePrevButton.on('click', function(){ onClickPages(pagePrevButton)});
	pageNextButton.on('click', function(){ onClickPages(pageNextButton)});
    
    pageButtons = new OO.ui.ButtonGroupWidget({
        items: [ pageFirstButton, pagePrevButton, pageNextButton ],
        align: 'left'
    });
    
    pageFirstButton.toggle(false);
    pagePrevButton.toggle(false);
    pageNextButton.toggle(false);
    
    resultsLabel = new OO.ui.LabelWidget({
    	label: '',
    }); 
    
    resultsLabel.toggle(false);
    
    //fieldset
    fieldset = new OO.ui.FieldsetLayout({
        label: 'Bestiary search filter selection',
        id: 'bestiaryTableFilterSelector'
    });

    var buttons = [resetButton, copyPermalinkButton];
    fieldset.addItems([
        new OO.ui.FieldLayout(membersSelect, { label: 'Membership', align: 'left' }),
        new OO.ui.FieldLayout(restrictionSelect, { label: 'Restriction', align: 'left' }),
        new OO.ui.FieldLayout(styleSelect, { label: 'Attack style', align: 'left' }),
        new OO.ui.FieldLayout(weaknessSelect, { label: 'Weakness', align: 'left' }),
        new OO.ui.FieldLayout(otherDropdown, { label: 'Other filters', align: 'left' }),
        new OO.ui.FieldLayout(extendedSelect, { label: 'Data display', align: 'left', help: "Show a basic amount or a large amount of information about each monster. Warning: Extended display is very wide and may cause issues on smaller displays." }),
		new OO.ui.LabelWidget({label: 'Level filters', classes: ['bestiary-level-label']}),
		new OO.ui.HorizontalLayout({
			items: [
				new OO.ui.FieldLayout(levelMinCheck, { label: 'Enable minimum level filter', align: 'inline' }),
				new OO.ui.FieldLayout(levelMinSelect, { label: 'Minimum level', align: 'top' })
			]
		}),
		new OO.ui.HorizontalLayout({
			items: [
				new OO.ui.FieldLayout(levelMaxCheck, { label: 'Enable maximum level filter', align: 'inline' }),
				new OO.ui.FieldLayout(levelMaxSelect, { label: 'Maximum level', align: 'top' })
			]
		}),
        new OO.ui.FieldLayout(submitButton),
        new OO.ui.FieldLayout(new OO.ui.ButtonGroupWidget({ items: buttons })),
        new OO.ui.FieldLayout(resultsLabel),
        new OO.ui.FieldLayout(pageButtons)
    ]);
    fieldset.$element.find('.lbBeforeHere').removeClass('lbBeforeHere').before($('<br />'));
}


function submitForm() {
	var values = {
		page: 0
	}, val;
	
    val = membersSelect.findSelectedItem();
    if (val !== null) {
        values.members = val.getData();
    }
    
    val = restrictionSelect.findSelectedItem();
    if (val !== null) {
        values.restriction = val.getData();
    }
    
    val = styleSelect.findSelectedItem();
    if (val !== null) {
        values.style = val.getData();
    }
    
    val = weaknessSelect.findSelectedItem();
    if (val !== null) {
        values.weakness = val.getData();
    }
    
    val = otherDropdown.getValue();
    if (val !== null) {
        values.other = val;
    }
    
	values.level_min_enabled = levelMinCheck.isSelected();
	values.level_max_enabled = levelMaxCheck.isSelected();
    values.level_min = levelMinSelect.getNumericValue();
    values.level_max = levelMaxSelect.getNumericValue();
    
    val = extendedSelect.findSelectedItem();
    if (val !== null) {
    	values.extended = val.getData();
    }
    
    doSearch($.extend({}, queryDefaults, values));
}

function parseShortLink(l) {
	var retest = /^([swmrdlou]\d{1,6})+$/i;
	if (!retest.test(l)) {
		return null;
	}
	var query = {}, regex = /([swmrdlou])(\d{1,6})/ig, res;
	
	function assignTo(p, n) {
		var val = queryMap[p][n];
		if (val === undefined || val === null) {
			val = queryDefaults[p];
		}
		query[p] = val;
	}
	
	while ((res = regex.exec(l)) !== null) {
		var letter = res[1].toLowerCase(), number = parseInt(res[2], 10);
		if (isNaN(number)) {
			continue;
		}
		switch (letter) {
			case 's': assignTo('style', number); break;
			case 'w': assignTo('weakness', number); break;
			case 'm': assignTo('members', number); break;
			case 'r': assignTo('restriction', number); break;
			case 'd': assignTo('extended', number); break;
			case 'o': assignTo('other', number); break;
			case 'l':
				query.level_min = number;
				query.level_min_enabled = true;
				break;
			case 'u':
				query.level_max = number;
				query.level_min_enabled = true;
				break;
		}
	}
	return $.extend({}, queryDefaults, query);
}

function doSearch(params) {
	mw.log(params);
	var template = [
		'{{Bestiary',
		'|members=' + params.members,
		'|restriction=' + params.restriction,
		'|other=' + params.other,
		'|style=' + params.style,
		'|weakness=' + params.weakness,
		'|level_min=' + params.level_min,
		'|level_max=' + params.level_max,
		'|enable_level_min=' + params.level_min_enabled,
		'|enable_level_max=' + params.level_max_enabled,
	//	'|slayer_category=' + params.slayer_category,
	//	'|slayer_master=' + params.slayer_master,
		'|extended=' + params.extended,
		'|page='+params.page,
		'}}'
	];

	submitButton.setDisabled(true);
    pageFirstButton.setDisabled(true);
    pagePrevButton.setDisabled(true);
    pageNextButton.setDisabled(true);
    
    if (Math.floor(Math.random()*50) === 0) {
    	var msg = '🦀';
    	switch (Math.floor(Math.random()*5)) {
    		case 0:
    			msg = 'Hey are you searching for me?'; break;
    		case 1:
    			msg = 'I\'m searching all of the monsters by claw, just for you.'; break;
    		case 2:
    			msg = 'Do you like this search? Hit me up with some feedback.'; break;
    		case 3:
    			msg = 'You can enable me on every page in preferences, if you have an account :)'; break;
    		case 4:
    			msg = 'Hey how you doin\'?'; break;
    	}
        $messages.append(
        	$('<strong>').text('Loading...'),
        	$('<br />'),
        	$('<div style="color: black; z-index: 999999999;" id="crob"><div style="background-color: #FFFDCC;width: 175px;border: 1px solid black;border-radius: 7px;" id="crob-speech"><div id="crob-speech-text" style="margin: 7px 10px;font-family: Arial;font-size: 13px;">'+msg+'</div></div><div style="width: 0; position: relative; bottom: 3px; left: 110px; border-top: 15px solid #FFFDCC; border-left: 0 solid transparent; border-right: 10px solid transparent; filter: drop-shadow(-1px 1px 0 #000) drop-shadow(0 1px 0 #000);" id="crob-speech-arrow"></div><img src="https://runescape.wiki/images/a/a0/Crob.gif?c8347"></div>')
        );
    
    } else {
        $messages.append(
        	$('<strong>').text('Loading...'),
        	$('<br />'),
        	loadingGif
        );
    }
	currentQuery = params;
	
	api.get({
		action: 'parse',
		title: mw.config.get('wgPageName'),
		prop: 'text',
		text: template.join('\n'),
		maxage: 3600,
		smaxage: 3600
	}).done(displayResults);
}

function displayResults(data){
	$results.empty().append($(data.parse.text['*']));
	var info = {
		offset: 0,
		count: 0,
		limit: 0,
		page: 0
	},
	table = $results.find('table.bestiary');
	
	resultsLabel.setLabel('');
	
	if (!$('.no-results-found').length && table.length) {
		info = {
    		offset: parseInt(table.attr('data-offset'), 10),
    		count: parseInt(table.attr('data-count'), 10),
    		page: parseInt(table.attr('data-page'), 10),
    		limit: parseInt(table.attr('data-limit'), 10)
    	};
		resultsLabel.toggle(true).setLabel(new OO.ui.HtmlSnippet('<strong>Showing pages '+(info.offset+1)+' – '+ (info.offset+info.count) +'</strong> (may be more or less rows)'));
		if (mw.config.get('skin') !== 'minerva') {
			mw.loader.using('jquery.tablesorter', function () {
				$results.find('table.bestiary.sortable').tablesorter();
			});
		}
	}
    pageFirstButton.toggle(true).setDisabled(info.page < 1);
    pagePrevButton.toggle(true).setDisabled(info.page < 1).setLabel('Previous '+info.limit);
    pageNextButton.toggle(true).setDisabled(info.count < info.limit).setLabel('Next '+info.limit);
	
	submitButton.setDisabled(false);
	$messages.empty();
}

function init() {
	var uri = new mw.Uri();
	var search = false, parsed;
	loadingGif = $('#bestiarySelector #bestiaryLoadingGif img').clone();
	if (typeof(uri.query.l) === 'string') {
		parsed = parseShortLink(uri.query.l);
		makeForm(parsed);
		search = true;
	} else {
    	makeForm(queryDefaults);
	}
    $selector = $('#bestiarySelector');
    $messages = $('<div id="bestiaryMessages">');
    $results = $('<div id="bestiaryResults">');
    $selector.empty().append(fieldset.$element).after($results).after($messages);
    if (search) {
    	doSearch(parsed);
    }
}

$(init);

// </nowiki>