/* Any JavaScript here will be loaded for all users on every page load. */
var maxSelections = 5;
var selectedDivs = [];
var isMaxReached = false; // Flag to indicate if max selections have been reached
$(document).ready(function() {
	    // Create the input field
    var searchInput = $('<input type="text" autocomplete="off" id="searchInput" placeholder="Search" style="width: 100%;margin-bottom: 5px">');
    // Append the input field to the search div
    $('#search').append(searchInput);
   var dropdown = $('<select id="category"><option value="all">All</option><option value="Melee">Melee</option><option value="Ranged">Ranged</option><option value="Magic">Magic</option><option value="Summon">Summon</option><option value="Gambler">Gambler</option><option value="Miscellaneous">Miscellaneous</option><option value="Equipped">Equipped</option></select>');
   $('#filter').append(dropdown);
    // Cache jQuery selectors
    var accessoriesDivs = $('#accessories .myDiv');
    var myDivs = $('.myDiv');
    var myNumbers = $('.myNumber');
    var myNumberRank = $('.myNumber.rank');
    var myNumberMagicDamage = $('.myNumber.magic-damage');
    var myNumberMeleeDamage = $('.myNumber.melee-damage');
    var myNumberRangedDamage = $('.myNumber.ranged-damage');
    var myNumberSwingSpeed = $('.myNumber.swing-speed');
    var myNumberCritical = $('.myNumber.critical');
    var myNumberCriticalDamage = $('.myNumber.critical-damage');
    var myNumberSummonDamage = $('.myNumber.summon-damage');
    var myNumberLuckDamage = $('.myNumber.luck-damage');
    var myNumberLuckProjectile = $('.myNumber.luck-projectile');
    var myNumberProjectile = $('.myNumber.projectile');
    var myNumberMagicEffect = $('.myNumber.magic-effect');
    var myNumberCastingSpeed = $('.myNumber.casting-speed');
    var myNumberSummonHealth = $('.myNumber.summon-health');
    var myNumberSummonCount = $('.myNumber.summon-count');
    var myNumberTurretCapacity = $('.myNumber.turret-capacity');
    var myNumberChipCapacity = $('.myNumber.chip-capacity');
    var myNumberLuck = $('.myNumber.luck');
    var myNumberSoul = $('.myNumber.soul');
    var myNumberHealth = $('.myNumber.health');
    var myNumberSpeed = $('.myNumber.speed');
    var myNumberJump = $('.myNumber.jump');
    var myNumberDR = $('.myNumber.dr');
    var myNumberRegen = $('.myNumber.regen');
    var myNumberCash = $('.myNumber.cash');
     // Create the input field
	$('#searchInput').on('input', function (event) {
    var searchTerm = $(this).val().toLowerCase();
    accessoriesDivs.each(function() {
        var $div = $(this);
        var divText = $div.text().toLowerCase();

        if (divText.includes(searchTerm)) {
            $div.show();
        } else {
            $div.hide();
        }
    });
    // Update justify-content property
    var visibleDivCount = $('#accessories .myDiv:visible').length;
    if (visibleDivCount < 24) {
        $('#accessories').css('justify-content', 'flex-start');
    } else {
        $('#accessories').css('justify-content', 'space-between');
    }
    });
    myDivs.on('click', function() {
    var $this = $(this);
    var id = $this.attr('id');
    var index = selectedDivs.indexOf(id);

    if (index !== -1) {
        // If yes, remove it from the selection
        $this.removeClass('selected');
        selectedDivs.splice(index, 1);
    } else {
        // Select the box
        if (selectedDivs.length < maxSelections) {
            $this.addClass('selected');
            selectedDivs.push(id);
        }
    }
    
    // Calculate the new values for each selected div only once
    var newValues = myDivs.filter('.selected').map(function() {
        var $box = $(this);
        var percentageIncrease = parseFloat($box.data('percentage'));
        var rankPercentage = parseFloat($box.data('rank-percentage'));
        var magicPercentage = $box.data('magic-damage') ? parseFloat($box.data('magic-damage')) : 0;
        var meleePercentage = $box.data('melee-damage') ? parseFloat($box.data('melee-damage')) : 0;
        var rangedPercentage = $box.data('ranged-damage') ? parseFloat($box.data('ranged-damage')) : 0;
        var swingPercentage = $box.data('swing-speed') ? parseFloat($box.data('swing-speed')) : 0;
        var criticalPercentage = $box.data('critical') ? parseFloat($box.data('critical')) : 0;
        var criticaldamagePercentage = $box.data('critical-damage') ? parseFloat($box.data('critical-damage')) : 0;
        var summondamagePercentage = $box.data('summon-damage') ? parseFloat($box.data('summon-damage')) : 0;
        var luckdamagePercentage = $box.data('luck-damage') ? parseFloat($box.data('luck-damage')) : 0;
        var luckprojectilePercentage = $box.data('luck-projectile') ? parseFloat($box.data('luck-projectile')) : 0;
        var projectilePercentage = $box.data('projectile') ? parseFloat($box.data('projectile')) : 0;
        var magiceffectPercentage = $box.data('magic-effect') ? parseFloat($box.data('magic-effect')) : 0;
        var castingspeedPercentage = $box.data('casting-speed') ? parseFloat($box.data('casting-speed')) : 0;
        var summonhealthPercentage = $box.data('summon-health') ? parseFloat($box.data('summon-health')) : 0;
        var summoncountPercentage = $box.data('summon-count') ? parseFloat($box.data('summon-count')) : 0;
        var turretcapacityPercentage = $box.data('turret-capacity') ? parseFloat($box.data('turret-capacity')) : 0;
        var chipcapacityPercentage = $box.data('chip-capacity') ? parseFloat($box.data('chip-capacity')) : 0;
        var luckPercentage = $box.data('luck') ? parseFloat($box.data('luck')) : 0;
        var soulPercentage = $box.data('soul') ? parseFloat($box.data('soul')) : 0;
        var soulPercentagepercent = $box.data('soul-percent') ? parseFloat($box.data('soul-percent')) : 0;
        var healthPercentage = $box.data('health') ? parseFloat($box.data('health')) : 0;
        var healthPercentagepercent = $box.data('health-percent') ? parseFloat($box.data('health-percent')) : 0;
        var speedPercentage = $box.data('speed') ? parseFloat($box.data('speed')) : 0;
        var speedPercentagepercent = $box.data('speed-percent') ? parseFloat($box.data('speed-percent')) : 0;
        var jumpPercentage = $box.data('jump') ? parseFloat($box.data('jump')) : 0;
        var DR = $box.data('dr') ? parseFloat($box.data('dr')) : 0;
        var regenPercentage = $box.data('regen') ? parseFloat($box.data('regen')) : 0;
        var regenPercentagepercent = $box.data('regen-percent') ? parseFloat($box.data('regen-percent')) : 0;
        var cashPercent = $box.data('cash') ? parseFloat($box.data('cash')) : 0;
        return {
            percentageIncrease: percentageIncrease,
            rankPercentage: rankPercentage,
            magicPercentage: magicPercentage,
            meleePercentage: meleePercentage,
            rangedPercentage: rangedPercentage,
            swingPercentage: swingPercentage,
            criticalPercentage: criticalPercentage,
            criticaldamagePercentage: criticaldamagePercentage,
            summondamagePercentage: summondamagePercentage,
            luckdamagePercentage: luckdamagePercentage,
            luckprojectilePercentage: luckprojectilePercentage,
            projectilePercentage: projectilePercentage,
            magiceffectPercentage: magiceffectPercentage,
			castingspeedPercentage: castingspeedPercentage,
			summonhealthPercentage: summonhealthPercentage,
			summoncountPercentage: summoncountPercentage,
			turretcapacityPercentage: turretcapacityPercentage,
			chipcapacityPercentage: chipcapacityPercentage,
			luckPercentage: luckPercentage,
			soulPercentage: soulPercentage,
			soulPercentagepercent: soulPercentagepercent,
			healthPercentage: healthPercentage,
			healthPercentagepercent: healthPercentagepercent,
			speedPercentage: speedPercentage,
			speedPercentagepercent: speedPercentagepercent,
			jumpPercentage: jumpPercentage,
			DR: DR,
			regenPercentage: regenPercentage,
			regenPercentagepercent: regenPercentagepercent,
			cashPercent: cashPercent,
        };
    }).get();
    
    // Subtract or add the values of the newly selected or deselected div
        myNumbers.each(function() {
        var $this = $(this);
        var originalNumber = $this.data('original-number');
        var newValue = originalNumber;
        var accumulator = 0; // New variable to accumulate changes

        newValues.forEach(function(values) {
            // Perform different operations based on the class of the element
            if ($this.hasClass('magic-damage')) {
                accumulator += newValue * values.magicPercentage;
            }
            if ($this.hasClass('melee-damage')) {
                accumulator += newValue * values.meleePercentage;
            }
            if ($this.hasClass('ranged-damage')) {
                accumulator += newValue * values.rangedPercentage;
            }
            if ($this.hasClass('swing-speed')) {
                accumulator += values.swingPercentage;
            }
            if ($this.hasClass('critical')) {
                newValue += values.criticalPercentage;
            }
            if ($this.hasClass('critical-damage')) {
                newValue += values.criticaldamagePercentage;
            }
            if ($this.hasClass('summon-damage')) {
                accumulator += newValue * values.summondamagePercentage;
            }
            if ($this.hasClass('luck-damage')) {
                accumulator += newValue * values.luckdamagePercentage;
            }
            if ($this.hasClass('luck-projectile')) {
                newValue += values.luckprojectilePercentage;	
            }
            if ($this.hasClass('projectile')) {
                newValue += values.projectilePercentage;	
            }
            if ($this.hasClass('magic-effect')) {
                accumulator += newValue * values.magiceffectPercentage;
            }
            if ($this.hasClass('casting-speed')) {
                accumulator += values.castingspeedPercentage;
            }
            if ($this.hasClass('summon-health')) {
                accumulator += newValue * values.summonhealthPercentage;
            }
            if ($this.hasClass('summon-count')) {
                newValue += values.summoncountPercentage;
            }
            if ($this.hasClass('turret-capacity')) {
                newValue += values.turretcapacityPercentage;
            }
            if ($this.hasClass('chip-capacity')) {
                newValue += values.chipcapacityPercentage;
            }
            if ($this.hasClass('luck')) {
                newValue += values.luckPercentage;
            }
            if ($this.hasClass('soul')) {
                newValue += values.soulPercentage;
            }
            if ($this.hasClass('soul-percent')) {
                newValue += newValue * values.soulPercentagepercent;
            }
            if ($this.hasClass('health')) {
                newValue += values.healthPercentage;
            }
            if ($this.hasClass('health-percent')) {
                newValue += newValue * values.healthPercentagepercent;
            }
            if ($this.hasClass('speed')) {
                newValue += values.speedPercentage;
            }
            if ($this.hasClass('speed-percent')) {
                newValue += newValue * values.speedPercentagepercent;
            }
            if ($this.hasClass('jump')) {
                newValue += values.jumpPercentage;
            }
            if ($this.hasClass('DR')) {
                newValue += values.DR;
            }
            if ($this.hasClass('regen')) {
                newValue += values.regenPercentage;
            }
            if ($this.hasClass('regen-percent')) {
                newValue += newValue * values.regenPercentagepercent;
            }
            if ($this.hasClass('cash')) {
                newValue += values.cashPercent;
            }
        });
        if ($this.hasClass('positive')) {
    	newValue += newValue * accumulator;
		} else if ($this.hasClass('swing-speed') || $this.hasClass('casting-speed')) {
        newValue *= 1 - accumulator;
		} else {
		 // Otherwise, just add the accumulator to newValue
    	newValue += accumulator;
		}
        // Update the HTML with the new value
        $this.text((newValue % 1 === 0 ? newValue : Number.parseFloat(($this.hasClass('swing-speed') || $this.hasClass('casting-speed') || $this.hasClass('magic-effect')  ? newValue.toFixed(2) : newValue.toFixed(0))).toLocaleString('en-US')));
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