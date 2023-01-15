/* Any JavaScript here will be loaded for all users on every page load. */
/* Start Level 4 navigation javascript -------------------------------------- */
/* See also: MediaWiki:Wiki-navigation -------------------------------------- */
/* -------------------------------------------------------------------------- */
$(function() {
  //Classes
  var imgChevron = '<img height="0" width="0" class="chevron-right" ' +
    'src="data:image/gif;base64,' +
    'R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D">';

  // Buildings submenu
  var subnav3 = $('.WikiHeader nav').find('a[href="/wiki/Buildings"] + .subnav-3');
  subnav3.addClass("subnav-3-with-subnav-4");

  subnav3.html(
    '<li><a href="Defensive_Buildings" class="subnav-3a">Defensive Buildings' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Cannon">Cannon</a></li>' +
      '<li><a href="/wiki/Archer_Tower">Archer Tower</a></li>' +
      '<li><a href="/wiki/Mortar">Mortar</a></li>' +
      '<li><a href="/wiki/Air_Defense">Air Defense</a></li>' +
      '<li><a href="/wiki/Wizard_Tower">Wizard Tower</a></li>' +
      '<li><a href="/wiki/Hidden_Tesla">Hidden Tesla</a></li>' +
      '<li><a href="/wiki/X-Bow">X-Bow</a></li>' +
      '<li><a href="/wiki/Inferno_Tower">Inferno Tower</a></li>' +
      '<li><a href="/wiki/Walls">Walls</a></li>' +
      '<li class="subnav-5p">' + 
        '<li><a href="/wiki/Traps">Traps' + imgChevron + '</a>' +
        '<ul class="subnav-5">' +
        '<li><a href="/wiki/Traps#Bomb">Bomb</a></li>' +
        '<li><a href="/wiki/Traps#Spring Trap">Spring Trap</a></li>' +
        '<li><a href="/wiki/Traps#Giant Bomb">Giant Bomb</a></li>' +
        '<li><a href="/wiki/Traps#Air Bomb">Air Bomb</a></li>' +
        '<li><a href="/wiki/Traps#Seeking Air Mine">Seeking Air Mine</a></li>' +
        '</ul></li>' +
    '</ul></li>' +

    '<li><a href="Resource_Buildings" class="subnav-3a">Resource Buildings' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Gold_Mine">Gold Mine</a></li>' +
      '<li><a href="/wiki/Elixir_Collector">Elixir Collector</a></li>' +
      '<li><a href="/wiki/Dark_Elixir_Drill">Dark Elixir Drill</a></li>' +
      '<li><a href="/wiki/Gold_Storage">Gold Storage</a></li>' +
      '<li><a href="/wiki/Elixir_Storage">Elixir Storage</a></li>' +
      '<li><a href="/wiki/Dark_Elixir_Storage">Dark Elixir Storage</a></li>' +
      '<li><a href="/wiki/Builder' + "'" + 's_Hut">Builder&apos;s Hut</a></li>' +
    '</ul></li>' +

    '<li><a href="Army_Buildings" class="subnav-3a">Army Buildings' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Army_Camp">Army Camp</a></li>' +
      '<li><a href="/wiki/Barracks">Barracks</a></li>' +
      '<li><a href="/wiki/Dark_Barracks">Dark Barracks</a></li>' +
      '<li><a href="/wiki/Laboratory">Laboratory</a></li>' +
      '<li><a href="/wiki/Spell_Factory">Spell Factory</a></li>' +
      '<li><a href="/wiki/Barbarian_King_Altar">Barbarian King Altar</a></li>' +
      '<li><a href="/wiki/Archer_Queen_Altar">Archer Queen Altar</a></li>' +
    '</ul></li>' +

    '<li><a href="Other_Buildings" class="subnav-3a">Other Buildings' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Town_Hall">Town Hall</a></li>' +
      '<li><a href="/wiki/Clan_Castle">Clan Castle</a></li>' +
      '<li><a href="/wiki/Decorations">Decorations</a></li>' +
      '<li><a href="/wiki/Obstacles">Obstacles</a></li>' +
    '</ul></li>');

  // Troops submenu
  subnav3 = $('.WikiHeader nav').find('a[href="/wiki/Troops"] + .subnav-3');
  subnav3.addClass("subnav-3-with-subnav-4");

  subnav3.html(
    '<li><a href="Tier_1" class="subnav-3a">Tier 1' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Barbarian">Barbarian</a></li>' +
      '<li><a href="/wiki/Archer">Archer</a></li>' +
      '<li><a href="/wiki/Goblin">Goblin</a></li>' +
    '</ul></li>' +

    '<li><a href="Tier_2" class="subnav-3a">Tier 2' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Giant">Giant</a></li>' +
      '<li><a href="/wiki/Wall_Breaker">Wall Breaker</a></li>' +
      '<li><a href="/wiki/Balloon">Balloon</a></li>' +
      '<li><a href="/wiki/Wizard">Wizard</a></li>' +
    '</ul></li>' +

    '<li><a href="Tier_3" class="subnav-3a">Tier 3' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Healer">Healer</a></li>' +
      '<li><a href="/wiki/Dragon">Dragon</a></li>' +
      '<li><a href="/wiki/P.E.K.K.A">P.E.K.K.A</a></li>' +
    '</ul></li>' +

    '<li><a href="Dark_Elixir_Troops" class="subnav-3a">Dark Elixir Troops' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Minion">Minion</a></li>' +
      '<li><a href="/wiki/Hog_Rider">Hog Rider</a></li>' +
      '<li><a href="/wiki/Valkyrie">Valkyrie</a></li>' +
      '<li class="subnav-5p">' +
        '<a href="/wiki/Golem" class="subnav-4a">Golem' + imgChevron + '</a>' +
        '<ul class="subnav-5">' +
        '<li><a href="/wiki/Golem/Golemite">Golemite</a></li>' +
        '</ul></li>' +
      '<li class="subnav-5p">' +
        '<a href="/wiki/Witch" class="subnav-4a">Witch' + imgChevron + '</a>' +
        '<ul class="subnav-5">' +
        '<li><a href="/wiki/Witch/Skeleton">Skeleton</a></li>' +
        '</ul></li>' +
    '</ul></li>' +

    '<li><a href="Heroes" class="subnav-3a">Heroes' +
    imgChevron + '</a>' +
    '<ul class="subnav-4">' +
      '<li><a href="/wiki/Barbarian_King">Barbarian King</a></li>' +
      '<li><a href="/wiki/Archer_Queen">Archer Queen</a></li>' +
    '</ul></li>');
});

/* </source> */