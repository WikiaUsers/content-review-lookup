/*BackToTopButton*/
window.BackToTopModern = true;
/*UploadMultipleFiles*/
mw.config.set('UMFBypassLicenseCheck', true);
/*AddRailModule*/
window.AddRailModule = ['Template:RailModule', 'Template:NewPagesModule'];
/*Quiz*/
window.quizName = "Shadow Slave Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Better luck next time, Teacher Julius is disappointed...You need to study more!",
    "That could still be improved! Check out the pages of this wiki again!",
    "Congratulations, you've got the HIGHEST score. You're a true student of Teacher Julius!, A true scholar!" 
];
window.questions = [
    ["Nightmare Spell carriers experience an overwhelming desire to sleep, once they sleep they are moved to First Nightmare.",
    "TRUE",
    "FALSE",
    "Maybe",
    "None of the Above"],
    
    ["_________ are trials created by the Spell that contains central conflict that has to be resolve in order to end.",
    "Nightmares",
    "Boogeyman",
    "Trials of Nightmare Spell",
    "Dream Trials"],

    ["The Spell brought those who survived the first trial in what ruined magical world populated by Nightmare Creatures.",
    "Dream Realm",
    "Nightmares",
    "Dreamland",
    "Real World"],
    
    ["______ are people who have passed the first trial of the Spell and established a connection to the Dream Realm.",
    "Awakened",	
    "Aspirants",
    "Dormants",
    "Dreamers"],
    
    ["What serves as both an anchor and exit point for Awakened to enter and exit Dream Realm?",
    "Gateway",
    "Gate",
    "Dream Portal",
    "World Portal"],
    
    ["What do human fortress built around a conquered gateway in Dream Realm called?",
    "Citadel",
    "Settlement",
    "Castle",
    "City Fort"],
    
    ["What is the magical item that is created from Soul Essence and assume physical form when summoned?",
    "Memory",
    "Shard",	
    "Enchantment",
    "Echo"],
    
    ["This is the magical quality of a Memory.",
    "Enchantment",	
    "Shard",
    "Attribute",
    "Soul Fragment"],
    
    ["What is the magical copy of a slain Nightmare Creature called?",
    "Echo",
    "Shard",
    "Memory",
    "Shadow"],
    
    ["Echoes are capable of limited autonomy but do not possess a soul and thus is alive.",
    "FALSE",
    "TRUE",
    "Maybe",
    "None of the Above"],
    
    ["It is capable of accumulating and storing vast amounts of Soul Essence.",	
    "Soul Core",
    "Soul Sea",
    "Soul Shard",
    "Shadow Core"],
    
    ["What is the mystical title granted by the Spell to the most exceptional Awakened?",
    "True Name",	
    "Soul Name",
    "Alias",
    "Aspect Name"],
    
    ["What is the physical manifestation of a broken Soul Core that contains Soul Essence?",
    "Soul Shard",
    "Soul Sea",	
    "Shadow Fragment",
    "Soul Core"],
    
    ["How many cores does an Awakened Tyrant possess?",
    "five",
    "four",
    "six",	
    "three"],
    
    ["How many cores does a Fallen Terror possess?",
    "six",
    "four",
    "five",
    "three"],
    
    ["Nightmare Creatures of this class are more devastating and possessed some rudimentary, warped form of intelligence.",
    "Monster",
    "Tyrant",
    "Beast",
    "Terror"],
    
    ["This is a rough estimate of a Memory's potency that is based on its source",
    "Tier",
    "Enchantment",
    "Rank",
    "Class"],
    
    ["First Nightmares are unique because each of them is tailored individually.",	
    "TRUE",	
    "FALSE",
    "Maybe",
    "None of the Above"],
    
    ["The Spell communicated with humans using _________.",	
    "Runes",
    "Hieroglyphs",
    "Symbols",
    "Pictographs"],
    
    ["Nightmare Creatures of this class are dangerous and strong but mindless.",
    "Beast",
    "Monster",
    "Terror",
    "Tyrant"]
];

/**
 * filter table rows for specific toggles
 **/
$(function () {
    if (!$('.timeline-toggles').length) {
        return;
    }

    $('.timeline-toggles').find('td > a').click(function () {
        var toggleClass = $(this).parent().attr('class'),
            $targetTable = $('.moddedTable'),
            $targetRows = $targetTable.find('tr.' + toggleClass),
            $allRows = $targetTable.find('tr:not(:first)'); // Select all rows except the first

        if (!$targetRows.length) {
            return;
        }

        // Update the row and toggle text.
        if ($(this).text().indexOf('reset') >= 0) {
            $(this).text($(this).text().replace('reset', 'show'));
            // reset
            $allRows.show();
        } else {
            $(this).text($(this).text().replace('show', 'reset'));
            // Hide all rows first and then show the target rows.
        	$allRows.hide();
        	$targetRows.show();
        }
    });
});


/* Allow direct link to Tabber */
$( function () {
    var hash = window.location.hash.replace('#', '').replace(/_/g, ' ');
    if (hash === '') return;
    $(function() {
        setTimeout(function() {
            var currentTabber = $('.tabbernav > li > a[title^="' + hash + '"]');
            if (currentTabber.length) currentTabber.click();
        }, 100);
    });    
});


/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show Spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide Spoilers');
        }
    }

    button.text('Show Spoilers');
	button.click(toggleText);
});