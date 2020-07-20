/*
 * This script includes general locations for NPCs.
 *
 * Usage is as follows:
 *
 * tibiawiki.core.npc.getLocation('Sam')
 *   Gets the location of Sam: "Thais".
 */
tibiawiki_parent_module('tibiawiki.core.npc', (function () {
    'use strict';
    /*
     * We use an anonymous closure to prevent direct name access to outsiders. It's not too bad if
     * these data are dynamically changed, but we generally don't want this to be done.
     */
 
    /*
     * The following data should be reflected by [[Template:NPC_Trades/City]].
     */
    var npcs_locations = {
        'A Bearded Woman': 'Carlin*',
        'A Beautiful Girl': 'Yalahar*',
        'A Confused Frog': 'Thais*',
        'A Dark Priestess': 'Edron*',
        'A Dead Bureaucrat': 'Venore*',
        'A Dwarven Ghost': 'Kazordoon*',
        'A Fading Memory': 'Yalahar*',
        'A Fluffy Squirrel': 'Carlin*',
        'A Frog': 'Thais*',
        'A Ghostly Guardian': 'Venore*',
        'A Ghostly Knight': 'Venore*',
        'A Ghostly Sage': 'Venore*',
        'A Ghostly Woman': 'Ca