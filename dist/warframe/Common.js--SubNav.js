/* <source lang="javascript"> */

/* Start Level 4 navigation javascript -------------------------------------- */
/* See also: MediaWiki:Wiki-navigation -------------------------------------- */
/* -------------------------------------------------------------------------- */
$(function() {

    var adminList, nav = $('.WikiHeader nav'),
        chevron = '<img height="0" width="0" class="chevron-right" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" />';
        
    // Administrators
    adminList = ['Brizingr5', 'ChickenBar', 'Twilight053', 'Voqualin'];
    
    for (var i = 0, list = '', name; i < adminList.length; i++) {
        name = adminList[i];
        list += '<li><a href="/wiki/User:' + name + '" class="subnav-3a"><span style="color: #FFF; font-weight: normal;">' + name.replace('_', ' ') +'</span>' + chevron + '</a><ul><li><a href="/wiki/User:' + name + '"><span style="color: #FFF; font-weight: normal;">Profile</span></a></li><li><a href="/wiki/User_talk:' + name + '">Talk Page</a></li><li><a href="/wiki/User_blog:' + name + '">Blog</a></li><li><a href="/wiki/Special:Contributions/' + name + '">Contributions</a></li><li><a href="/wiki/Special:Log/' + name + '">Log</a></li></ul></li>';
    }

    $('.WikiHeader nav').find('a[href="/wiki/Terraria_Wiki:Administrators"] + .subnav-3').html('<li><a href="/wiki/Board:Administrator%27s_Noticeboard">Contact an Administrator</a></li>' + list);


    // Updates
    nav.find('a[href="/wiki/Category:Updates"] + .subnav-3').html('<li><a href="/wiki/Update 16" class="subnav-3a">Update 16: Sanctuary Update' + chevron + '</a><ul><li><a href="/wiki/Update 16#Update 16.4">Update 16.4: Operation False Profit</a></li><li><a href="/wiki/Update 16#Update 16.3.1">Tactical Alert:Blackout</a></li><li><a href="/wiki/Update 16#Update 16.3">Update 16.3: The New Protocols</a></li><li><a href="/wiki/Update 16#Update 16.1.2">Update 16.1.2: Second Anniversary</a></li><li><a href="/wiki/Update 16#Update 16.1">Update 16.1: Volt Prime</a></li><li><a href="/wiki/Update 16">Update 16: Sanctuary Update</a></li>   </ul><li><a href="/wiki/Category:Map_Builders" class="subnav-3a">Map Builders' + chevron + '</a><ul><li><a href="/wiki/Mod:Buildaria">Buildaria</a></li><li><a href="/wiki/Mod:Omnitool">Omnitool</a></li><li><a href="/wiki/Mod:TEdit">tEdit</a></li><li><a href="/wiki/Mod:Terrafirma">TerraFirma</a></li></ul></li><li><a href="/wiki/Category:Inventory_Editors" class="subnav-3a">Inventory Editors' + chevron + '</a><ul><li><a href="/wiki/Mod:Omnitool">Omnitool</a></li><li><a href="/wiki/Mod:TerrariViewer">TerrariViewer</a></li></ul></li><li><a href="/wiki/Category:Server_Tools" class="subnav-3a">Server Tools' + chevron + '</a><ul><li><a href="/wiki/Mod:TShock">TShock</a></li></ul></li><li><a href="/wiki/Category:Miscellaneous_Mods" class="subnav-3a">Other' + chevron + '</a><ul><li><a href="/wiki/Mod:Game_Launcher">Game Launcher</a></li><li><a href="/wiki/Mod:TConfig">tConfig</a></li></ul></li><li><a href="/wiki/Special:Random/Mod" class="subnav-3a">Surprise me!</a></li>');

    // Environments
    nav.find('a[href="/wiki/Environments"] + .subnav-3').html('<li><a href="/wiki/Environments#Forest" class="subnav-3a">Forest</a></li><li><a href="/wiki/The_Underground" class="subnav-3a">Underground' + chevron + '</a><ul><li><a href="/wiki/The_Underground#Dirt_Layer">Dirt Layer</a></li><li><a href="/wiki/The_Underground#Rocky_Dirt_Layer">Rocky Dirt Layer</a></li><li><a href="/wiki/The_Underground#Stone_Layer">Stone Layer</a></li><li><a href="/wiki/The_Underground#Glowing_Mushroom_Biome">Glowing Mushroom Biome</a></li></ul></li><li><a href="/wiki/The_Jungle" class="subnav-3a">Jungle' + chevron + '</a><ul><li><a href="/wiki/The_Jungle">Surface Jungle</a></li><li><a href="/wiki/Underground_Jungle">Underground Jungle</a></li></ul></li><li><a href="/wiki/The_Corruption" class="subnav-3a">The Corruption' + chevron + '</a><ul><li><a href="/wiki/The_Corruption">Surface Corruption</a></li><li><a href="/wiki/Underground_Corruption">Underground Corruption</a></li><li><a href="/wiki/Corrupted_Desert">Corrupted Desert</a></li></ul><li><a href="/wiki/The_Crimson" class="subnav-3a">The Crimson</a></li></li><li><a href="/wiki/The_Hallow" class="subnav-3a">The Hallow' + chevron + '</a><ul><li><a href="/wiki/The_Hallow">Surface Hallow</a></li><li><a href="/wiki/Underground_Hallow">Underground Hallow</a></li><li><a href="/wiki/Hallowed_Desert">Hallowed Desert</a></li></ul></li><li><a href="/wiki/Desert" class="subnav-3a">Desert' + chevron + '</a><ul><li><a href="/wiki/Desert">The Desert</a></li><li><a href="/wiki/Corrupted_Desert">Corrupted Desert</a></li><li><a href="/wiki/Hallowed_Desert">Hallowed Desert</a></li></ul></li><li><a href="/wiki/Dungeon" class="subnav-3a">Dungeon</a></li><li><a href="/wiki/Floating_Islands" class="subnav-3a">Floating Island</a></li><li><a href="/wiki/The_Underworld" class="subnav-3a">The Underworld</a></li><li><a href="/wiki/Meteorite" class="subnav-3a">Meteorite</a></li><li><a href="/wiki/Ocean" class="subnav-3a">Ocean</a></li><li><a href="/wiki/Snow_Biome" class="subnav-3a">Snow Biome</a></li>');

});

/* </source> */