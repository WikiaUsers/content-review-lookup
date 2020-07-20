/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
    var rights = {};
 
    rights["SilverHexxitFights"]   = ["Founder", "Ectopus"];
 
    rights["Jeff16306"]            = ["Administrator"];
 
    rights["652Graystripe"]        = ["Administrator", "Bureaucrat", "Night Mare"];
 
    rights["Hunited"]        = ["Administrator", "The Peacekeeper"];

    rights["TerrariamcSwaggins' Bot"]        = ["Inactive Bot"];

    rights["Arthurtilly"]        = ["Moderator", "Needlord"];

    rights["TheFlamingScyther"]        = ["Administrator", "Duke Moltron"];
    
    rights["ReviLeo"]        = ["Signal Drone"];

    rights["Brick Creeper"]        = ["Bureaucrat", "Mother Board"];

    rights["Moltenfire9113"]        = ["Skeletal Reaper"];

    rights["DemonDestroyerGuild"]        = ["Merfolk Bunny"];

    rights["Heisergroup"]        = ["Time Stomper"];

    rights["Corrupt Moon"]        = ["Werewolf Bunny"];

    rights["XxLegoTadhgxX"]        = ["Time Stomper"];

    rights["TerrariaBoss"]        = ["Werewolf Bunny"];

    rights["TrueCobalion"]        = ["Werewolf Bunny"];
    
    rights["Darthwikia25"]        = ["Content Moderator", "Duke Moltron"];
    
    rights["Dab1029384756"]        = ["Cactus Soldier"];
    
    rights["TheBlazingEye"]        = ["Treeokin"];
    
    rights["Mattlink"]        = ["Demon Slime"];
    
    rights["Kyrupt"]        = ["Fedora Bunny"];
    
    rights["SonicBurst"]        = ["Time Stomper"];
    
    rights["AEG:Terraria Lover"]        = ["Fedora Bunny"];
    
    rights["Pi3.141592"]        = ["Fedora Bunny"];
    
    rights["XanderBond123"]        = ["Fedora Bunny"];
    
    rights["Triplexxx742"]        = ["Treeokin"];
    
    rights["Zofran4"]        = ["Starship Bablyon"];
    
    rights["Awesomeethan1205"]        = ["Commando Vulture"]
    
    rights["Anarchy44"]        = ["Merfolk Bunny"]

    if (typeof rights[wgTitle] != "undefined") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});

/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: [
        '(click to browse)',
        '1.Editing', [
            'Added Information',
            'Removed Information',
            'Updated Information',
            'Cleanup',
            'Corrected spelling/grammar',
            'Formatted',
            'Added Categories',
            'Other (Please Specify Above)'
         ]
         /* etc. */
    ]
};