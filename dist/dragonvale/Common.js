mw.config.set('UMFBypassLicenseCheck', true);

function foldingTabsMulti() {
    var len = 0;
    ftsets = getElementsByClassName(document, 'div', 'foldtabSet'); //global object array thingy
    if (ftsets.length == 0) return

    for (var i = 0; i < ftsets.length; i++) {
        ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
        ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
        ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

        if (ftsets[i].links.length < ftsets[i].boxen.length) {
            len = ftsets[i].boxen.length;
        } else {
            len = ftsets[i].links.length;
        }

        for (var j = 0; j < len; j++) {
            ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
            ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
        }
        showmultitab(i, '0');
        ftsets[i].head.style.display = 'block';
    }
}
$(foldingTabsMulti);

function showmultitab(set, num) {
    for (var j = 0; j < ftsets[set].boxen.length; j++) {
        if (j == num) {
            ftsets[set].boxen[j].style.display = 'block';
        } else {
            ftsets[set].boxen[j].style.display = 'none';
        }
    }
    for (var j = 0; j < ftsets[set].links.length; j++) {
        if (j == num) {
            ftsets[set].links[j].className = 'selected';
            ftsets[set].links[j].blur();
        } else {
            ftsets[set].links[j].className = '';
        }
    }
}

// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (wgNamespaceNumber == 110) {
    disableOldForumEdit();
}

function disableOldForumEdit() {
    if (typeof(enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
        return;
    }
    if (!document.getElementById('old-forum-warning')) {
        return;
    }

    if (skin == 'oasis') {
        $("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href');
        $('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
        return;
    }

    if (!document.getElementById('ca-edit')) {
        return;
    }
    var editLink = null;
    if (skin == 'monobook') {
        editLink = document.getElementById('ca-edit').firstChild;
    } else {
        return;
    }


    editLink.removeAttribute('href', 0);
    editLink.removeAttribute('title', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = 'Archived';

    $('span.editsection-upper').remove();

}

/* Changes the Lock Old Blogs After 30 Days To A Chosen Amount */
window.LockOldBlogs = {
    expiryDays: 500,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'Greetings, Wizard!',
    yes: '<img src="https://images.wikia.nocookie.net/dragonvale/images/a/a5/Enter.png">',
    no: '<img src="https://images.wikia.nocookie.net/dragonvale/images/7/78/BigXIcon.png">',
    isSpoiler: function() {
        return Boolean($('.spoiler').length);
    }
};
/* End Spoiler Alert */

/* Dragon Reference Chart All Drop Down */
$(function() {
    // Add dropdown for element filtering to 'dragon reference chart' page at the right position.
    $('.page-Dragon_Reference_Chart div.var2').last().prepend('<label>&nbsp &nbsp &nbsp Show dragons with the epic element:</label><select id="elementSelector"><option value="epic">All</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="galaxy">Galaxy</option><option value="rift">Rift</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="ornamental">Ornamental</option><option value="aura">Aura</option><option value="chrysalis">Chrysalis</option><option value="hidden">Hidden</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var2 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var2 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'dragon reference chart' page at the right position.
    $('.page-Dragon_Reference_Chart div.var2').last().prepend('<label>&nbsp &nbsp &nbsp Show dragons with the element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="epic">Epic</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var2 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var2 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

/* Assigned Element Drop Down */
$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var1').last().prepend('<label>&nbsp &nbsp &nbsp Show decorations with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var1 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var1 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var2').last().prepend('<label>&nbsp &nbsp &nbsp Show habitats with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var2 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var2 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var3').last().prepend('<label>&nbsp &nbsp &nbsp Show buildings with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var3 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var3 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});

$(function() {
    // Add dropdown for element filtering to 'assigned element chart' page at the left position.
    $('.page-Assigned_Elements div.var4').last().prepend('<label>&nbsp &nbsp &nbsp Show islands with the following element:</label><select id="elementSelector"><option value="all">All</option><option value="plant">Plant</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="cold">Cold</option><option value="lightning">Lightning</option><option value="water">Water</option><option value="air">Air</option><option value="metal">Metal</option><option value="light">Light</option><option value="dark">Dark</option><option value="rainbow">Rainbow</option><option value="moon">Moon</option><option value="sun">Sun</option><option value="treasure">Treasure</option><option value="olympus">Olympus</option><option value="seasonal">Seasonal</option><option value="apocalypse">Apocalypse</option><option value="dream">Dream</option><option value="snowflake">Snowflake</option><option value="monolith">Monolith</option><option value="celebration">Celebration</option><option value="omni">Omni</option><option value="none">None</option></select>');
    $('#elementSelector').on('change', function(event) {
        var newValue = this.value;
        // When the dropdown box changes value, first show all rows
        $('.var4 tbody tr').show();
        // Then hide the rows not matching the selected element
        if (newValue !== 'all') {
            $('.var4 tbody tr:not(.' + newValue + ')').hide();
        }
    });
});