/* Any JavaScript here will be loaded for all users on every page load. */
var maxAccessories = 5;
var selectedAccessories = [];
const stats = [
  'melee-damage', 'ranged-damage', 'magic-damage', 'summon-damage', 'luck-damage', 'critical', 'critical-damage', 'luck-projectile', 'projectile', 'magic-effect', 'casting-speed', 'summon-health', 'summon-count', 'turret-capacity', 'chip-capacity', 'luck', 'soul', 'soul-percent', 'health', 'health-percent', 'speed', 'speed-percent', 'jump', 'jump-percent', 'dr',
  'regen', 'regen-percent', 'cash', 'melee-swing'
];

$(document).ready(function() {
    var searchField = $('<input type="text" autocomplete="on" id="searchInput" placeholder="Lol" style="width: 100%;margin-bottom: 5px">');
    $('#search').append(searchField);
	
	var dropdownBar = $('<select id="category"><option value="all">All</option><option value="Melee">Melee</option><option value="Ranged">Ranged</option><option value="Magic">Magic</option><option value="Summon">Summon</option><option value="Gambler">Gambler</option><option value="Miscellaneous">Miscellaneous</option><option value="Equipped">Equipped</option></select>');
	$('#filter').append(dropdownBar);

	$('#searchInput').on('input', function (event) {
	var visibleAccessories = $('#accessories .myDiv:visible').length;
	var search = $(this).val().toLowerCase();
    accessoriesDivs.each(function() {
    	var item = $(this).text().toLowerCase();
        if (item.includes(search)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    if (visibleAccessories < 24) {
        $('#accessories').css('justify-content', 'flex-start');
    } else {
        $('#accessories').css('justify-content', 'space-between');
    }
    });
    
    $('.myDiv').on('click', function() {
    var index = selectedAccessories.indexOf($(this).attr('id'));

    if (index !== -1) {
        $(this).removeClass('selected');
        selectedAccessories.splice(index);
    } else if (selectedAccessories.length < maxAccessories) {
        $(this).addClass('selected');
        selectedAccessories.push($(this).attr('id'));
    }
    
    const newValues = $('.myDiv.selected').map(function() {
    	const $stat = $(this);
    	const data = {};
		stats.forEach(stat => {
		    data[stat] = parseFloat($stat.data(stat)) || 0;
		});
	return data;
	}).get();
    
    // Subtract or add the values of the newly selected or deselected div
	$('.type').each(function() {
	    var $elem = $(this); 
	    var originalValue =  $(this).data('original-value');
	    var newValue = originalValue;
	    var total = 0;
	
	    newValues.forEach(function(values) {
	        if ($elem.hasClass('magic-damage')) {
	            total += originalValue * values['magic-damage'];
	        }
	        if ($elem.hasClass('melee-damage')) {
	            total += originalValue * values['melee-damage'];
	        }
	        if ($elem.hasClass('ranged-damage')) {
                total += originalValue * values['ranged-damage'];
            }
            if ($elem.hasClass('swing-speed')) {
                newValue *= values['swing-speed'];
            }
            if ($elem.hasClass('critical')) {
                newValue += values.critical;
            }
            if ($elem.hasClass('critical-damage')) {
                newValue += values['critical-damage'];
            }
            if ($elem.hasClass('summon-damage')) {
                total += originalValue * values['summon-damage'];
            }
            if ($elem.hasClass('luck-damage')) {
                total += originalValue * values['luck-damage'];
            }
            if ($elem.hasClass('luck-projectile')) {
                newValue += values['luck-projectile'];	
            }
            if ($elem.hasClass('projectile')) {
                newValue += values.projectile;	
            }
            if ($elem.hasClass('magic-effect')) {
                total += originalValue * values['magic-effect'];
            }
            if ($elem.hasClass('casting-speed')) {
                total += values['casting-speed'];
            }
            if ($elem.hasClass('summon-health')) {
                total += originalValue * values['summon-health'];
            }
            if ($elem.hasClass('summon-count')) {
                newValue += values['summon-count'];
            }
            if ($elem.hasClass('turret-capacity')) {
                newValue += values['turret-capacity'];
            }
            if ($elem.hasClass('chip-capacity')) {
                newValue += values['chip-capacity'];
            }
            if ($elem.hasClass('luck')) {
                newValue += values.luck;
            }
            if ($elem.hasClass('soul')) {
                newValue += values.soul;
            }
            if ($elem.hasClass('soul-percent')) {
                total += originalValue * values['soul-percent'];
            }
            if ($elem.hasClass('health')) {
                newValue += values.health;
            }
            if ($elem.hasClass('health-percent')) {
                total *= newValue * values['health-percent'];
            }
            if ($elem.hasClass('speed')) {
                newValue += values.speed;
            }
            if ($elem.hasClass('speed-percent')) {
                total += originalValue * values['speed-percent'];
            }
            if ($elem.hasClass('jump')) {
                newValue += values.jump;
            }
            if ($elem.hasClass('jump-percent')) {
                total += originalValue * values['jump-percent'];
            }
            if ($elem.hasClass('DR')) {
                total += values.dr;
            }
            if ($elem.hasClass('regen')) {
                newValue += values.regen;
            }
            if ($elem.hasClass('regen-percent')) {
                total += originalValue * values['regen-percent'];
            }
            if ($elem.hasClass('cash')) {
                newValue += values.cash;
            }
	    });
	    newValue += total;
	    $elem.text(newValue % 1 === 0 ? newValue : Number.parseFloat($elem.hasClass('swing-speed') || $elem.hasClass('casting-speed') || $elem.hasClass('magic-effect') ? newValue.toFixed(2) : newValue.toFixed(2)).toLocaleString('en-US')
	    );
	});
});
$(document).on('change', '#category', function() {
    var value = $(this).val().toLowerCase();
    if (value === 'equipped') {
        $(".myDiv:not(.selected)").hide();
        $(".myDiv.selected").show();
    } else if (value === 'all') {
        // If the value is 'all', show all divs
        $(".myDiv").show();
    } else {
        // Hide all divs initially
        $(".myDiv").hide();
        
        // Show only the divs that have the selected class
        $(".myDiv." + value).show();
    }
    var visibleDivCount = $('#accessories .myDiv:visible').length;

    // Check if there is any visible div
    if (visibleDivCount < 24) {
        // If yes, change justify-content to flex-start
        $('#accessories').css('justify-content', 'flex-start');
    } else {
        // If no, reset justify-content to space-between
        $('#accessories').css('justify-content', 'space-between');
    }
});
})();